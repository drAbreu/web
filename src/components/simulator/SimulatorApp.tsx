'use client';
import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import type {
  SimulatorMode, RigChain, SlotKey, AnyTarget, TargetCategory,
  LensItem, Telescope, Camera, Barlow, Corrector,
  ADC, Mount, Eyepiece, Filter, FilterWheel, Focuser, OAG, Diagonal,
  GuideScope, Controller,
} from '@/lib/simulator/types';
import {
  emptyRig, getSlotsForMode, isPhotoMode, isMonoMode,
} from '@/lib/simulator/types';
import { computeOptics } from '@/lib/simulator/optics';
import { checkCompatibility } from '@/lib/simulator/compatibility';
import { useItemTags } from '@/hooks/useItemTags';
import { ADAPTERS }      from '@/data/simulator/adapters';
import { TELESCOPES }    from '@/data/simulator/telescopes';
import { CAMERAS }       from '@/data/simulator/cameras';
import { EYEPIECES }     from '@/data/simulator/eyepieces';
import { MOUNTS }        from '@/data/simulator/mounts';
import { BARLOWS }       from '@/data/simulator/barlows';
import { CORRECTORS }    from '@/data/simulator/correctors';
import { ADCS }          from '@/data/simulator/adcs';
import { FILTER_WHEELS } from '@/data/simulator/filter_wheels';
import { FOCUSERS }      from '@/data/simulator/focusers';
import { OAGS }          from '@/data/simulator/oags';
import { DIAGONALS }     from '@/data/simulator/diagonals';
import { FILTERS }       from '@/data/simulator/filters';
import { GUIDE_SCOPES }  from '@/data/simulator/guide_scopes';
import { CONTROLLERS }   from '@/data/simulator/controllers';
import { DSO_CATALOG }   from '@/data/simulator/dso-catalog';

import ModeSelector   from './ModeSelector';
import RigChainPanel  from './RigChainPanel';
import PickerPanel    from './PickerPanel';
import SkyViewPanel   from './SkyViewPanel';
import StatusBar      from './StatusBar';
import { PRESETS, type Preset } from './PresetsPanel';

type AnyEquipment = Telescope | Camera | LensItem | ADC | Mount | Eyepiece | Filter | FilterWheel | Focuser | OAG | Diagonal | GuideScope | Controller;

// ── LocalStorage ─────────────────────────────────────────────────────────────

const STORAGE_KEY = 'datastar-sim-rig-v1';

interface StoredState {
  mode: SimulatorMode;
  telescopeId: string | null;
  cameraId: string | null;
  eyepieceId: string | null;
  diagonalId: string | null;
  lensId: string | null;
  adcId: string | null;
  filterWheelId: string | null;
  oagId: string | null;
  focuserId: string | null;
  mountId: string | null;
  controllerId: string | null;
  guideScopeId: string | null;
  guideCameraId: string | null;
  filterIds: string[];
  targetId: string | null;
  targetCategory: TargetCategory | null;
}

function rigToStored(rig: RigChain, target: AnyTarget | null, targetCategory: TargetCategory): StoredState {
  return {
    mode: rig.mode,
    telescopeId:   rig.telescope?.id    ?? null,
    cameraId:      rig.camera?.id       ?? null,
    eyepieceId:    rig.eyepiece?.id     ?? null,
    diagonalId:    rig.diagonal?.id     ?? null,
    lensId:        rig.lens?.id         ?? null,
    adcId:         rig.adc?.id          ?? null,
    filterWheelId: rig.filterWheel?.id  ?? null,
    oagId:         rig.oag?.id          ?? null,
    focuserId:     rig.focuser?.id      ?? null,
    mountId:       rig.mount?.id        ?? null,
    controllerId:  rig.controller?.id   ?? null,
    guideScopeId:  rig.guideScope?.id   ?? null,
    guideCameraId: rig.guideCamera?.id  ?? null,
    filterIds:     rig.filters?.map(f => f.id) ?? [],
    targetId:      (target as { id?: string })?.id ?? null,
    targetCategory,
  };
}

function storedToRig(s: StoredState): RigChain {
  const rig = emptyRig(s.mode);
  rig.telescope   = TELESCOPES.find(t => t.id === s.telescopeId)      ?? null;
  rig.camera      = CAMERAS.find(c => c.id === s.cameraId)            ?? null;
  rig.eyepiece    = EYEPIECES.find(e => e.id === s.eyepieceId)        ?? null;
  rig.diagonal    = DIAGONALS.find(d => d.id === s.diagonalId)        ?? null;
  rig.lens        = (BARLOWS.find(b => b.id === s.lensId) as LensItem | undefined)
                 ?? (CORRECTORS.find(c => c.id === s.lensId) as LensItem | undefined)
                 ?? null;
  rig.adc         = ADCS.find(a => a.id === s.adcId)                  ?? null;
  rig.filterWheel = FILTER_WHEELS.find(f => f.id === s.filterWheelId) ?? null;
  rig.oag         = OAGS.find(o => o.id === s.oagId)                  ?? null;
  rig.focuser     = FOCUSERS.find(f => f.id === s.focuserId)          ?? null;
  rig.mount       = MOUNTS.find(m => m.id === s.mountId)              ?? null;
  rig.controller  = CONTROLLERS.find(c => c.id === s.controllerId)    ?? null;
  rig.guideScope  = GUIDE_SCOPES.find(g => g.id === s.guideScopeId)   ?? null;
  rig.guideCamera = CAMERAS.find(c => c.id === s.guideCameraId)       ?? null;
  rig.filters     = s.filterIds.map(id => FILTERS.find(f => f.id === id)).filter(Boolean) as Filter[];
  return rig;
}

// ── Defaults ──────────────────────────────────────────────────────────────────

const DEFAULT_EYEPIECE = EYEPIECES.find(e => e.id === '11169')
  ?? EYEPIECES.find(e => e.fl === 30 && e.afov === 50)
  ?? null;

function defaultRig(mode: SimulatorMode): RigChain {
  const rig = emptyRig(mode);
  const tel = TELESCOPES.find(t => t.aperture && t.fl && t.rear) ?? TELESCOPES[0] ?? null;
  rig.telescope = tel;
  if (mode === 'visual') rig.eyepiece = DEFAULT_EYEPIECE;
  if (isPhotoMode(mode)) {
    rig.camera = CAMERAS.find(c => c.w && c.h && c.px) ?? null;
  }
  return rig;
}

// Clear slots that don't exist in the new mode
function migrateRig(rig: RigChain, newMode: SimulatorMode): RigChain {
  const slots = getSlotsForMode(newMode);
  return {
    ...rig,
    mode: newMode,
    diagonal:    slots.includes('diagonal')    ? rig.diagonal    : null,
    adc:         slots.includes('adc')         ? rig.adc         : null,
    filterWheel: slots.includes('filterWheel') ? rig.filterWheel : null,
    oag:         slots.includes('oag')         ? rig.oag         : null,
    focuser:     slots.includes('focuser')     ? rig.focuser     : null,
    camera:      slots.includes('camera')      ? rig.camera      : null,
    eyepiece:    slots.includes('eyepiece')    ? rig.eyepiece    : null,
    controller:  slots.includes('controller')  ? rig.controller  : null,
    guideScope:  slots.includes('guideScope')  ? rig.guideScope  : null,
    guideCamera: slots.includes('guideCamera') ? rig.guideCamera : null,
  };
}

const DEFAULT_TARGET = DSO_CATALOG.find(d => d.id === 'M31') ?? DSO_CATALOG[0];

// ── Component ─────────────────────────────────────────────────────────────────

export default function SimulatorApp() {
  const searchParams = useSearchParams();
  const { owned, wanted, toggleOwned, toggleWanted } = useItemTags();

  const [mode, setMode] = useState<SimulatorMode>('visual');
  const [rig, setRig] = useState<RigChain>(() => defaultRig('visual'));
  const [target, setTarget] = useState<AnyTarget>(DEFAULT_TARGET);
  const [targetCategory, setTargetCategory] = useState<TargetCategory>('dso');
  const [activeSlot, setActiveSlot] = useState<SlotKey>('telescope');
  const [showPicker, setShowPicker] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  // Column widths
  const [rigWidth, setRigWidth]       = useState(280);
  const [pickerWidth, setPickerWidth] = useState(340);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<{ col: 'rig' | 'picker'; startX: number; startW: number } | null>(null);
  const hasHydrated = useRef(false);

  // ── Restore from URL params or localStorage on mount ──
  useEffect(() => {
    const telId  = searchParams?.get('tel');
    const camId  = searchParams?.get('cam');
    const epId   = searchParams?.get('ep');
    const modeParam = searchParams?.get('mode') as SimulatorMode | null;
    const hasUrlParams = !!(telId || camId || epId || modeParam);

    if (hasUrlParams) {
      const urlMode = modeParam ?? 'visual';
      const urlRig = emptyRig(urlMode);
      if (telId) urlRig.telescope = TELESCOPES.find(t => t.id === telId) ?? null;
      if (camId) urlRig.camera    = CAMERAS.find(c => c.id === camId)    ?? null;
      if (epId)  urlRig.eyepiece  = EYEPIECES.find(e => e.id === epId)   ?? null;
      setMode(urlMode);
      setRig(urlRig);
    } else {
      try {
        const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
        if (raw) {
          const s: StoredState = JSON.parse(raw);
          const restoredMode = s.mode ?? 'visual';
          const restoredRig = storedToRig(s);
          setMode(restoredMode);
          setRig(restoredRig);
          if (s.targetId && s.targetCategory) {
            const t = DSO_CATALOG.find(d => d.id === s.targetId);
            if (t) { setTarget(t); setTargetCategory(s.targetCategory); }
          }
        }
      } catch { /* ignore corrupt data */ }
    }
    hasHydrated.current = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Save to localStorage on every change ──
  useEffect(() => {
    if (!hasHydrated.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rigToStored(rig, target, targetCategory)));
    } catch { /* quota exceeded or private browsing */ }
  }, [rig, target, targetCategory]);

  // ── Esc closes picker ──
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && showPicker) setShowPicker(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showPicker]);

  // ── Column drag ──
  const onDividerMouseDown = useCallback((col: 'rig' | 'picker') => (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = { col, startX: e.clientX, startW: col === 'rig' ? rigWidth : pickerWidth };
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [rigWidth, pickerWidth]);

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!dragging.current) return;
      const delta = e.clientX - dragging.current.startX;
      if (dragging.current.col === 'rig') {
        setRigWidth(Math.max(180, Math.min(420, dragging.current.startW + delta)));
      } else {
        setPickerWidth(Math.max(220, Math.min(500, dragging.current.startW + delta)));
      }
    }
    function onMouseUp() {
      if (!dragging.current) return;
      dragging.current = null;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // ── Auto-switch DSO color ↔ mono when camera changes ──
  useEffect(() => {
    if (!rig.camera) return;
    if (mode === 'dso_color' && !rig.camera.color) {
      setMode('dso_mono');
      setRig(r => migrateRig(r, 'dso_mono'));
    } else if (mode === 'dso_mono' && rig.camera.color) {
      setMode('dso_color');
      setRig(r => migrateRig(r, 'dso_color'));
    }
  }, [rig.camera, mode]);

  const optics = useMemo(
    () => computeOptics(rig, target, targetCategory),
    [rig, target, targetCategory],
  );

  const issues = useMemo(
    () => checkCompatibility(rig, optics, ADAPTERS),
    [rig, optics],
  );

  // ── Handlers ──

  function handleModeChange(newMode: SimulatorMode) {
    setMode(newMode);
    setRig(r => migrateRig(r, newMode));
    const slots = getSlotsForMode(newMode);
    if (!slots.includes(activeSlot)) setActiveSlot('telescope');
    setShowPicker(false);
  }

  function handleSlotClick(slot: SlotKey) {
    setActiveSlot(slot);
    setShowPicker(true);
  }

  function handleSelect(slot: SlotKey, item: AnyEquipment | null) {
    setRig(r => {
      const next = { ...r };
      switch (slot) {
        case 'telescope':   next.telescope   = item as Telescope | null; break;
        case 'camera':      next.camera      = item as Camera | null; break;
        case 'lens':        next.lens        = item as LensItem | null; break;
        case 'diagonal':    next.diagonal    = item as Diagonal | null; break;
        case 'adc':         next.adc         = item as ADC | null; break;
        case 'filterWheel': next.filterWheel = item as FilterWheel | null; break;
        case 'oag':         next.oag         = item as OAG | null; break;
        case 'focuser':     next.focuser     = item as Focuser | null; break;
        case 'eyepiece':    next.eyepiece    = item as Eyepiece | null; break;
        case 'mount':       next.mount       = item as Mount | null; break;
        case 'controller':  next.controller  = item as Controller | null; break;
        case 'guideScope':  next.guideScope  = item as GuideScope | null; break;
        case 'guideCamera': next.guideCamera = item as Camera | null; break;
        case 'filters':     break;
      }
      return next;
    });
  }

  function handleTargetChange(t: AnyTarget, c: TargetCategory) {
    setTarget(t);
    setTargetCategory(c);
  }

  function handleApplyPreset(preset: Preset) {
    const newRig = emptyRig(preset.mode);
    newRig.telescope = TELESCOPES.find(t => t.id === preset.telescopeId) ?? null;
    if (preset.eyepieceId) newRig.eyepiece = EYEPIECES.find(e => e.id === preset.eyepieceId) ?? null;
    if (preset.cameraId)   newRig.camera   = CAMERAS.find(c => c.id === preset.cameraId) ?? null;
    if (preset.mountId)    newRig.mount    = MOUNTS.find(m => m.id === preset.mountId) ?? null;
    if (preset.lensId) {
      newRig.lens = (BARLOWS.find(b => b.id === preset.lensId) as LensItem | undefined)
                 ?? (CORRECTORS.find(c => c.id === preset.lensId) as LensItem | undefined)
                 ?? null;
    }
    setMode(preset.mode);
    setRig(newRig);
    setActiveSlot('telescope');
    setShowPicker(false);
  }

  function handleShare() {
    const params = new URLSearchParams();
    if (rig.telescope) params.set('tel', rig.telescope.id);
    if (rig.camera)    params.set('cam', rig.camera.id);
    if (rig.eyepiece)  params.set('ep',  rig.eyepiece.id);
    params.set('mode', mode);
    const url = `${window.location.origin}/simulator?${params.toString()}`;
    navigator.clipboard.writeText(url).catch(() => {});
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2000);
  }

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ background: 'var(--sim-bg)', color: 'var(--sim-number)' }}
    >
      {/* Mode tabs */}
      <ModeSelector mode={mode} onChange={handleModeChange} />

      {/* Main body */}
      <div className="flex flex-1 min-h-0" ref={containerRef}>

        {/* ── Col 1: Rig Chain ── */}
        <div
          className={`shrink-0 overflow-y-auto flex-col ${showPicker ? 'hidden lg:flex' : 'flex'}`}
          style={{ width: `${rigWidth}px`, borderRight: 'none' }}
        >
          <RigChainPanel
            mode={mode}
            rig={rig}
            optics={optics}
            activeSlot={activeSlot}
            adapters={ADAPTERS}
            issues={issues}
            onSlotClick={handleSlotClick}
            onApplyPreset={handleApplyPreset}
          />
        </div>

        {/* ── Drag divider 1 ── */}
        <div
          className="hidden lg:flex shrink-0 items-center justify-center cursor-col-resize select-none"
          style={{ width: '5px', background: 'var(--sim-border)', flexShrink: 0 }}
          onMouseDown={onDividerMouseDown('rig')}
        >
          <div style={{ width: '1px', height: '40px', background: 'var(--sim-muted)', borderRadius: '2px', opacity: 0.5 }} />
        </div>

        {/* ── Col 2: Picker ── */}
        <div
          className={`overflow-hidden flex-col ${showPicker ? 'flex' : 'hidden lg:flex'}`}
          style={{ width: `${pickerWidth}px`, flexShrink: 0, borderRight: 'none' }}
        >
          <PickerPanel
            slot={activeSlot}
            rig={rig}
            optics={optics}
            owned={owned}
            wanted={wanted}
            onToggleOwned={toggleOwned}
            onToggleWanted={toggleWanted}
            onSelect={(slot, item) => handleSelect(slot, item as AnyEquipment | null)}
            onBack={() => setShowPicker(false)}
          />
        </div>

        {/* ── Drag divider 2 ── */}
        <div
          className="hidden lg:flex shrink-0 items-center justify-center cursor-col-resize select-none"
          style={{ width: '5px', background: 'var(--sim-border)', flexShrink: 0 }}
          onMouseDown={onDividerMouseDown('picker')}
        >
          <div style={{ width: '1px', height: '40px', background: 'var(--sim-muted)', borderRadius: '2px', opacity: 0.5 }} />
        </div>

        {/* ── Col 3: Sky View ── */}
        <div className="flex-1 min-w-0 hidden lg:block relative">
          <SkyViewPanel
            mode={mode}
            optics={optics}
            target={target}
            targetCategory={targetCategory}
            onTargetChange={handleTargetChange}
          />
          {/* Share button */}
          <button
            onClick={handleShare}
            className="absolute bottom-3 right-3 text-[10px] px-2.5 py-1 rounded transition-colors"
            style={{
              background: shareToast ? 'var(--sim-good)' : 'rgba(8,8,16,0.75)',
              color: shareToast ? '#000' : 'var(--sim-muted)',
              border: '1px solid var(--sim-border)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {shareToast ? 'Link copied!' : '⎋ Share rig'}
          </button>
        </div>
      </div>

      {/* Status bar */}
      <StatusBar mode={mode} optics={optics} />
    </div>
  );
}
