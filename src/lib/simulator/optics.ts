// Optics engine — pure functions only, no React imports
import type {
  Telescope, Camera, LensItem, Eyepiece,
  DSO, SolarSystemObject, Comet, AnyTarget,
  OpticsResult, SamplingResult, SeeingCase, MaxMagResult, DSOFit,
  BackfocusResult, RigChain, TargetCategory,
} from './types';
import { isPhotoMode } from './types';

// ── Resolution ─────────────────────────────────────────────────────────────────

/** Rayleigh resolution limit in arcsec: 138 / aperture_mm */
export function calcRayleigh(aperture: number): number {
  return 138 / aperture;
}

/** Dawes limit in arcsec (double stars only): 116 / aperture_mm */
export function calcDawes(aperture: number): number {
  return 116 / aperture;
}

/** Nyquist sampling limit: half the Rayleigh resolution */
export function calcNyquistLimit(rayleigh: number): number {
  return rayleigh / 2;
}

// ── Imaging mode ───────────────────────────────────────────────────────────────

/** FOV in degrees and arcmin: sensor_mm / fl_mm × (180/π) */
export function calcFOV(fl: number, w: number, h: number) {
  const R2D = 180 / Math.PI;
  const fovW_deg = (w / fl) * R2D;
  const fovH_deg = (h / fl) * R2D;
  return {
    fovW_deg,
    fovH_deg,
    fovW_arcmin: fovW_deg * 60,
    fovH_arcmin: fovH_deg * 60,
  };
}

/** Plate scale: 206.265 × pixel_um / fl_mm  (arcsec/px) */
export function calcImageScale(fl: number, px: number): number {
  return (206.265 * px) / fl;
}

function seeingCase(
  seeing_arcsec: number,
  label: string,
  imageScale: number,
): SeeingCase {
  // Ideal plate scale to Nyquist-sample this seeing: seeing/2
  const idealPx_arcsec = seeing_arcsec / 2;
  const ratio = imageScale / idealPx_arcsec;
  let assessment: SeeingCase['assessment'];
  let description: string;
  if (ratio < 0.5) {
    assessment = 'oversampled';
    description = 'Significantly oversampled — pixels finer than needed';
  } else if (ratio <= 1.5) {
    assessment = 'matched';
    description = 'Well matched — pixels close to ideal for this seeing';
  } else {
    assessment = 'undersampled';
    description = 'Undersampled — pixels too coarse for available detail';
  }
  return {
    seeing_arcsec,
    label,
    idealPixelSize_um: idealPx_arcsec,
    assessment,
    description,
  };
}

export function calcSampling(imageScale: number, rayleigh: number): SamplingResult {
  const nyquistLimit = rayleigh / 2;
  const ratio = imageScale / nyquistLimit;
  let status: SamplingResult['status'];
  let label: string;
  if (ratio < 0.5) {
    status = 'over'; label = `${ratio.toFixed(2)}× (heavily oversampled)`;
  } else if (ratio <= 1) {
    status = 'over'; label = `${ratio.toFixed(2)}× (slightly oversampled)`;
  } else if (ratio <= 3) {
    status = 'good'; label = `${ratio.toFixed(2)}× ✅`;
  } else if (ratio <= 5) {
    status = 'under'; label = `${ratio.toFixed(2)}× (slightly undersampled)`;
  } else {
    status = 'under'; label = `${ratio.toFixed(2)}× (heavily undersampled)`;
  }
  return {
    ratio,
    status,
    label,
    nyquistLimit,
    seeingLimited: {
      good:    seeingCase(0.5, 'Good (0.5")',    imageScale),
      average: seeingCase(1.0, 'Average (1.0")', imageScale),
      poor:    seeingCase(2.0, 'Poor (2.0")',    imageScale),
    },
  };
}

// ── Visual mode ────────────────────────────────────────────────────────────────

/**
 * True FOV in degrees using the proper optical formula:
 *   trueFOV = 2 × arctan(tan(afov/2) × epFL / telFL)
 * The simplified (afov × epFL / telFL) under-reads wide-angle eyepieces (~21% error at 82°).
 * This matches Stellarium's calculation.
 */
export function calcEyepieceFOV(telFL: number, eyepieceFL: number, afovDeg: number): number {
  const D2R = Math.PI / 180;
  return (2 * Math.atan(Math.tan((afovDeg * D2R) / 2) * (eyepieceFL / telFL))) / D2R;
}

/** All 7 AFOV ring values for concentric-ring display */
export const AFOV_RINGS = [50, 52, 62, 82, 92, 100, 120] as const;

/** Returns true FOV in degrees for each AFOV ring */
export function calcEyepieceRings(
  telFL: number,
  eyepieceFL: number,
): Array<{ afov: number; trueFov_deg: number; trueFov_arcmin: number }> {
  return AFOV_RINGS.map(afov => {
    const trueFov_deg = calcEyepieceFOV(telFL, eyepieceFL, afov);
    return { afov, trueFov_deg, trueFov_arcmin: trueFov_deg * 60 };
  });
}

// ── Magnification ─────────────────────────────────────────────────────────────

export function calcMaxUsefulMagnification(aperture: number): MaxMagResult {
  const theoretical = aperture * 2;
  const rayleighLimit = aperture / 0.7;
  const typical = Math.round(theoretical * 0.7);
  const exitPupilAt = aperture / typical;
  return { theoretical, rayleighLimit, typical, exitPupilAt };
}

/** Exit pupil = aperture / magnification = eyepieceFL / focalRatio */
export function calcExitPupil(eyepieceFL: number, effectiveFR: number): number {
  return eyepieceFL / effectiveFR;
}

// ── DSO fit ───────────────────────────────────────────────────────────────────

export function assessDSOFit(fovW_arcmin: number, fovH_arcmin: number, size_arcmin: number): DSOFit {
  const shortSide = Math.min(fovW_arcmin, fovH_arcmin);
  const fillPct = Math.round((size_arcmin / shortSide) * 100);
  let status: DSOFit['status'];
  let label: string;
  if (fillPct > 90) {
    status = 'too_big'; label = `Too large (${fillPct}% of frame)`;
  } else if (fillPct >= 30) {
    status = 'good'; label = `Good fit (${fillPct}% of frame)`;
  } else if (fillPct >= 10) {
    status = 'small'; label = `Small (${fillPct}% of frame)`;
  } else {
    status = 'tiny'; label = `Tiny (${fillPct}% of frame)`;
  }
  return { status, label, fillPct };
}

// ── Solar system angular size ──────────────────────────────────────────────────

export function solarSystemSizeArcmin(obj: SolarSystemObject): number {
  return obj.typicalSize_arcsec / 60;
}

// ── Effective lens factor ─────────────────────────────────────────────────────

export function getLensFactor(lens: LensItem | null): number {
  if (!lens) return 1;
  // Both Barlow and Corrector have a `factor` field
  return lens.factor ?? 1;
}

// ── Backfocus budget ──────────────────────────────────────────────────────────

/**
 * Compute the backfocus budget for an imaging rig.
 * available = corrector.backfocus ?? telescope.bf ?? null
 * used = (oag.opticalPath ?? 0) + (filterWheel.opticalPath ?? 0) + (camera.flange || 17.5)
 */
export function computeBackfocus(rig: RigChain): BackfocusResult | null {
  const { telescope, lens, oag, filterWheel, camera } = rig;
  if (!telescope || !camera) return null;

  // Determine available backfocus
  let available: number | null = null;
  if (lens && 'backfocus' in lens && (lens as { backfocus?: number | null }).backfocus != null) {
    available = (lens as { backfocus: number }).backfocus;
  } else if (telescope.bf != null && telescope.bf > 0) {
    available = telescope.bf;
  }
  if (available == null) return null;

  // Compute used backfocus
  const used =
    (oag?.opticalPath ?? 0) +
    (filterWheel?.opticalPath ?? 0) +
    (camera.flange > 0 ? camera.flange : 17.5);  // T2 default

  const remaining = available - used;
  const status: BackfocusResult['status'] =
    remaining < 0 ? 'over' : remaining <= 10 ? 'tight' : 'ok';

  return { available_mm: available, used_mm: used, remaining_mm: remaining, status };
}

// ── Main compute function ─────────────────────────────────────────────────────

function getDSOFit(
  target: AnyTarget | null,
  targetCategory: TargetCategory,
  fovW_arcmin: number,
  fovH_arcmin: number,
): DSOFit | null {
  if (!target) return null;
  let size_arcmin = 0;
  if (targetCategory === 'dso') {
    size_arcmin = (target as DSO).size_arcmin;
  } else if (targetCategory === 'solar_system') {
    size_arcmin = solarSystemSizeArcmin(target as SolarSystemObject);
  } else if (targetCategory === 'comet') {
    size_arcmin = (target as Comet).size_arcsec / 60;
  }
  if (size_arcmin <= 0) return null;
  return assessDSOFit(fovW_arcmin, fovH_arcmin, size_arcmin);
}

export function computeOptics(rig: RigChain, target: AnyTarget | null, targetCategory: TargetCategory): OpticsResult | null {
  const { telescope, camera, lens, mode, eyepiece } = rig;

  if (!telescope) return null;

  const lensFactor = getLensFactor(lens);
  const effectiveFL = telescope.fl * lensFactor;
  const effectiveFR = effectiveFL / telescope.aperture;

  const rayleigh = calcRayleigh(telescope.aperture);
  const dawes = calcDawes(telescope.aperture);
  const maxUsefulMag = calcMaxUsefulMagnification(telescope.aperture);

  if (isPhotoMode(mode)) {
    if (!camera) return null;

    const { fovW_deg, fovH_deg, fovW_arcmin, fovH_arcmin } = calcFOV(effectiveFL, camera.w, camera.h);
    const imageScale = calcImageScale(effectiveFL, camera.px);
    const sampling = calcSampling(imageScale, rayleigh);
    const dsoFit = getDSOFit(target, targetCategory, fovW_arcmin, fovH_arcmin);
    const backfocus = computeBackfocus(rig);

    return {
      effectiveFL, effectiveFR,
      fovW_deg, fovH_deg, fovW_arcmin, fovH_arcmin,
      imageScale, sampling,
      magnification: 0, exitPupil: 0,
      rayleigh, dawes, maxUsefulMag, dsoFit, backfocus,
    };
  }

  // Visual mode
  const eyepieceFL = eyepiece?.fl ?? 25;  // fallback 25mm if none selected
  const magnification = effectiveFL / eyepieceFL;
  const exitPupil = calcExitPupil(eyepieceFL, effectiveFR);
  const trueFov_deg = calcEyepieceFOV(effectiveFL, eyepieceFL, eyepiece?.afov ?? 60);
  const trueFov_arcmin = trueFov_deg * 60;
  const dsoFit = getDSOFit(target, targetCategory, trueFov_arcmin, trueFov_arcmin);

  return {
    effectiveFL, effectiveFR,
    fovW_deg: trueFov_deg, fovH_deg: trueFov_deg,
    fovW_arcmin: trueFov_arcmin, fovH_arcmin: trueFov_arcmin,
    imageScale: 0, sampling: null,
    magnification, exitPupil,
    rayleigh, dawes, maxUsefulMag, dsoFit, backfocus: null,
  };
}
