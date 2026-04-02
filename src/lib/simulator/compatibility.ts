// Compatibility engine — checks equipment chain and generates issue list
import type {
  Telescope, Camera, LensItem, ADC, Mount,
  Eyepiece, Adapter, FilterWheel, OAG, Diagonal,
  MountType, OpticsResult,
  CompatibilityIssue, SimulatorMode, RigChain,
} from './types';
import { isDSOMode, isPlanetaryMode, isPhotoMode } from './types';

// ── Connection normalization ───────────────────────────────────────────────────

export function normalizeConn(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const s = raw.trim();
  if (/T[\s-]?2|M42/i.test(s)) return 'T2';
  if (/SCT|SC[\s]Thread|Schmidt/i.test(s)) return 'SCT';
  if (/1[,.]25|1¼/i.test(s)) return '1.25inch';
  if (/^2[\s""]|^2$|2[\s-]inch/i.test(s)) return '2inch';
  const m = s.match(/^(M\d+)/i);
  if (m) return m[1].toUpperCase();
  return s;
}

/**
 * Returns true if these two normalized connection strings are directly
 * compatible (no adapter needed).
 */
export function directlyCompatible(a: string | null, b: string | null): boolean {
  if (!a || !b) return false;
  if (a === b) return true;
  // T2 fits into 1.25" focusers via compression ring
  if ((a === 'T2' && b === '1.25inch') || (a === '1.25inch' && b === 'T2')) return true;
  // 2" ↔ 1.25" via standard included adapter
  if ((a === '2inch' && b === '1.25inch') || (a === '1.25inch' && b === '2inch')) return true;
  // 2inch ↔ M48
  if ((a === '2inch' && b === 'M48') || (a === 'M48' && b === '2inch')) return true;
  // Large focuser drawtube threads (M92, M63, M68, M54) → 2" or 1.25" via included adapters
  const FOCUSER_THREADS = ['M92', 'M63', 'M68', 'M54'];
  if (FOCUSER_THREADS.includes(a) && (b === '2inch' || b === '1.25inch')) return true;
  if (FOCUSER_THREADS.includes(b) && (a === '2inch' || a === '1.25inch')) return true;
  return false;
}

// ── Adapter search ────────────────────────────────────────────────────────────

export function findAdapters(
  from: string | null,
  to: string | null,
  adapters: Adapter[],
): Adapter[] {
  if (!from || !to) return [];
  return adapters
    .filter(a => {
      const cIn = normalizeConn(a.connectionIn);
      const cOut = normalizeConn(a.connectionOut);
      return (cIn === from && cOut === to) || (cIn === to && cOut === from);
    })
    .sort((a, b) => a.price - b.price)
    .slice(0, 3);
}

// ── Get connection out of a slot ───────────────────────────────────────────────

function getLensOut(lens: LensItem | null): string | null {
  if (!lens) return null;
  if ('connectionOut' in lens) return normalizeConn(lens.connectionOut);
  return null;
}

function getLensIn(lens: LensItem | null): string | null {
  if (!lens) return null;
  if ('connectionIn' in lens) return normalizeConn(lens.connectionIn);
  // Barlow without connectionIn: derive from barrel
  if ('barrel' in lens) return (lens as { barrel: number }).barrel >= 2 ? '2inch' : '1.25inch';
  return null;
}

// ── Check pair ────────────────────────────────────────────────────────────────

function checkPair(
  out: string | null,
  into: string | null,
  slotName: string,
  adapters: Adapter[],
  issues: CompatibilityIssue[],
) {
  if (!out || !into) return;
  if (!directlyCompatible(out, into)) {
    const suggested = findAdapters(out, into, adapters);
    issues.push({
      type: 'adapter',
      severity: 'error',
      message: `${slotName}: out (${out}) does not match in (${into}).`,
      action: suggested.length
        ? `Adapter needed. Cheapest: ${suggested[0].name} €${suggested[0].price}`
        : 'No standard adapter found — check forums.',
      suggestedAdapters: suggested,
    });
  }
}

// ── Main compatibility check ──────────────────────────────────────────────────

export function checkCompatibility(
  rig: RigChain,
  optics: OpticsResult | null,
  adapters: Adapter[],
): CompatibilityIssue[] {
  const { telescope, camera, lens, adc, diagonal, filterWheel, oag, eyepiece, mount, mode } = rig;
  const issues: CompatibilityIssue[] = [];

  if (!telescope) return issues;

  const telRear = normalizeConn(telescope.rear);

  // ── Connection chain ──────────────────────────────────────────────────────

  if (isPhotoMode(mode)) {
    // telescope → [lens] → [adc] → [filterWheel] → [oag] → camera
    let currentOut = telRear;

    if (lens) {
      checkPair(currentOut, getLensIn(lens), 'Telescope → Lens', adapters, issues);
      currentOut = getLensOut(lens);
    }
    if (adc) {
      checkPair(currentOut, normalizeConn(adc.connectionIn), 'Lens/Scope → ADC', adapters, issues);
      currentOut = normalizeConn(adc.connectionOut);
    }
    if (filterWheel) {
      checkPair(currentOut, normalizeConn(filterWheel.connectionIn), 'ADC/Lens → Filter Wheel', adapters, issues);
      currentOut = normalizeConn(filterWheel.connectionOut);
    }
    if (oag) {
      checkPair(currentOut, normalizeConn(oag.connectionIn), 'Filter Wheel → OAG', adapters, issues);
      currentOut = normalizeConn(oag.connectionOut);
    }
    if (camera) {
      checkPair(currentOut, normalizeConn(camera.connection), 'Chain → Camera', adapters, issues);
    }
  } else {
    // visual: telescope → [diagonal] → [lens] → eyepiece
    let currentOut = telRear;

    if (diagonal) {
      checkPair(currentOut, normalizeConn(diagonal.connectionIn), 'Telescope → Diagonal', adapters, issues);
      currentOut = normalizeConn(diagonal.connectionOut);
    }
    if (lens) {
      checkPair(currentOut, getLensIn(lens), 'Diagonal/Scope → Lens', adapters, issues);
      currentOut = getLensOut(lens);
    }
    if (eyepiece && eyepiece.barrel) {
      const epConn = eyepiece.barrel >= 2 ? '2inch' : '1.25inch';
      checkPair(currentOut, epConn, 'Chain → Eyepiece', adapters, issues);
    }
  }

  // ── Rule: DSO mode requires EQ mount ─────────────────────────────────────
  if (isDSOMode(mode) && mount) {
    const mt: MountType | null = mount.mountType;
    if (mt === 'altaz' || mt === 'dobsonian') {
      issues.push({
        type: 'mount',
        severity: 'error',
        message: 'DSO imaging requires equatorial (EQ) tracking. Alt-Az mounts cause field rotation.',
        action: 'Switch to an EQ mount for long exposures.',
      });
    } else if (mt === 'altaz_goto') {
      issues.push({
        type: 'mount',
        severity: 'warning',
        message: 'Alt-Az Goto can track but causes field rotation in exposures > 60s.',
        action: 'Use short subs (<60s) with rotation correction, or switch to an EQ mount.',
      });
    }
  }

  // ── Rule: Planetary camera + slow focal ratio → suggest Barlow ────────────
  if (isPlanetaryMode(mode) && camera && optics) {
    if (camera.category === 'planetary' && optics.effectiveFR < 15 && !lens) {
      issues.push({
        type: 'focal_ratio',
        severity: 'info',
        message: `Effective f/${optics.effectiveFR.toFixed(1)} — planetary cameras work best at f/15–f/30.`,
        action: 'Consider adding a 2× or 3× Barlow to increase effective focal length.',
      });
    }
  }

  // ── Rule: DSO camera + slow focal ratio → suggest reducer ─────────────────
  if ((mode === 'dso_color' || mode === 'dso_mono') && camera && optics) {
    if (camera.category === 'dso' && optics.effectiveFR > 8 && !lens) {
      issues.push({
        type: 'focal_ratio',
        severity: 'info',
        message: `Effective f/${optics.effectiveFR.toFixed(1)} — DSO cameras work best at f/4–f/8.`,
        action: 'Consider a focal reducer to shorten the focal ratio and increase FOV.',
      });
    }
  }

  // ── Rule: Nyquist / sampling ──────────────────────────────────────────────
  if (isPhotoMode(mode) && optics?.sampling) {
    const { ratio } = optics.sampling;
    if (ratio < 0.5) {
      issues.push({
        type: 'sampling',
        severity: 'warning',
        message: `Heavily oversampled (${ratio.toFixed(2)}×) — pixels finer than optics resolve.`,
        action: 'Use a focal reducer or camera with larger pixels.',
      });
    } else if (ratio > 5) {
      issues.push({
        type: 'sampling',
        severity: 'info',
        message: `Undersampled (${ratio.toFixed(2)}×) — losing some optical resolution.`,
        action: 'Add a Barlow or use a camera with smaller pixels.',
      });
    }
  }

  // ── Rule: Refractor without flattener ─────────────────────────────────────
  if (isPhotoMode(mode) && camera && !lens) {
    const design = telescope.design?.toLowerCase() ?? '';
    if (design.includes('refractor') || design.includes('apo') || design.includes('achromat')) {
      issues.push({
        type: 'flattener',
        severity: 'info',
        message: 'Refractors need a field flattener for sharp stars edge-to-edge in imaging.',
        action: 'Add a dedicated flattener or reducer-flattener for this telescope.',
      });
    }
  }

  // ── Rule: Newtonian / Dobsonian in photo mode without coma corrector ───────
  if (isPhotoMode(mode) && camera && !lens) {
    const design = telescope.design?.toLowerCase() ?? '';
    if (design.includes('newtonian') || design.includes('newton') || design.includes('dobson')) {
      issues.push({
        type: 'recommendation',
        severity: 'warning',
        message: 'Newtonians produce coma in photo mode without a coma corrector.',
        action: 'Add a coma corrector for sharp stars across the frame.',
      });
    }
  }

  // ── Rule: Backfocus ───────────────────────────────────────────────────────
  if (isPhotoMode(mode) && camera && telescope.bf !== null) {
    const remaining = telescope.bf - camera.flange;
    if (remaining < 0) {
      issues.push({
        type: 'backfocus',
        severity: 'error',
        message: `Backfocus deficit: camera flange (${camera.flange}mm) exceeds telescope BF (${telescope.bf}mm).`,
        action: 'Use extension tubes or a different camera/corrector combination.',
      });
    } else if (remaining < 5) {
      issues.push({
        type: 'backfocus',
        severity: 'warning',
        message: `Only ${remaining.toFixed(0)}mm backfocus remaining — add M42/M48 spacers.`,
        action: 'Add backfocus extension rings to reach exact flange distance.',
      });
    }
  }

  // ── Rule: Barlow + corrector simultaneously ────────────────────────────────
  // (lens can only be one item, but in case of future changes)

  // ── Rule: ADC missing in planetary mode ───────────────────────────────────
  if (isPlanetaryMode(mode) && !adc) {
    issues.push({
      type: 'recommendation',
      severity: 'info',
      message: 'An ADC (Atmospheric Dispersion Corrector) significantly improves planetary detail.',
      action: 'Add an ADC between the telescope and camera for better results.',
    });
  }

  // ── Rule: DSO mode without EAF ────────────────────────────────────────────
  if (isDSOMode(mode) && !rig.focuser) {
    issues.push({
      type: 'recommendation',
      severity: 'info',
      message: 'An EAF (Electronic Auto Focuser) improves focus consistency during long sessions.',
      action: 'Add a motorized focuser for automated focus correction.',
    });
  }

  return issues;
}
