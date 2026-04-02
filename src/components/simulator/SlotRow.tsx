'use client';
import type { SlotKey, RigChain, LensItem, MountType, GuideScope, Controller } from '@/lib/simulator/types';
import { normalizeConn } from '@/lib/simulator/compatibility';

interface Props {
  slot: SlotKey;
  rig: RigChain;
  active: boolean;
  optional: boolean;
  onClick: () => void;
}

const SLOT_ICONS: Record<SlotKey, string> = {
  telescope:   '🔭',
  diagonal:    '✳️',
  lens:        '🔩',
  adc:         '🌈',
  filterWheel: '🎡',
  filters:     '💧',
  oag:         '🎯',
  focuser:     '🔧',
  camera:      '📷',
  eyepiece:    '👁',
  mount:       '⛰',
  controller:  '💻',
  guideScope:  '🔭',
  guideCamera: '📡',
};

const SLOT_LABELS: Record<SlotKey, string> = {
  telescope:   'Telescope',
  diagonal:    'Diagonal',
  lens:        'Lens',
  adc:         'ADC',
  filterWheel: 'Filter Wheel',
  filters:     'Filter',
  oag:         'OAG',
  focuser:     'Focuser / EAF',
  camera:      'Camera',
  eyepiece:    'Eyepiece',
  mount:       'Mount',
  controller:  'Controller',
  guideScope:  'Guide Scope',
  guideCamera: 'Guide Camera',
};

function getSlotValue(slot: SlotKey, rig: RigChain): { name: string | null; detail: string | null } {
  // Mount is special: may show "Included" even when rig.mount is null
  if (slot === 'mount') {
    const m = rig.mount;
    if (m) return { name: m.name, detail: m.mountType?.replace('_', ' ') ?? null };
    const bmt = rig.telescope?.bundled_mount_type as MountType | null | undefined;
    if (!rig.telescope?.is_ota_only && bmt) {
      const MOUNT_LABELS: Record<string, string> = {
        altaz: 'AltAz', altaz_goto: 'AltAz GoTo', eq_manual: 'EQ Manual',
        eq_goto: 'EQ GoTo', dobsonian: 'Dobsonian',
      };
      const label = MOUNT_LABELS[bmt] ?? bmt.replace(/_/g, ' ');
      return { name: `Included — ${label}`, detail: 'Bundled with telescope' };
    }
    return { name: null, detail: null };
  }

  const v = rig[slot as keyof RigChain];
  if (!v || Array.isArray(v)) return { name: null, detail: null };

  const item = v as unknown as Record<string, unknown>;
  const name = (item.name as string) ?? null;

  switch (slot) {
    case 'telescope': {
      const t = rig.telescope;
      if (!t) return { name: null, detail: null };
      return { name: t.name, detail: `${t.aperture}mm · f/${t.fr}` };
    }
    case 'camera': {
      const c = rig.camera;
      if (!c) return { name: null, detail: null };
      return { name: c.name, detail: `${c.px}µm · ${c.color ? 'color' : 'mono'}` };
    }
    case 'lens': {
      const l = rig.lens;
      if (!l) return { name: null, detail: null };
      const factor = (l as LensItem).factor;
      return { name: l.name, detail: `${factor}×` };
    }
    case 'eyepiece': {
      const e = rig.eyepiece;
      if (!e) return { name: null, detail: null };
      return { name: e.name, detail: `${e.fl}mm${e.afov ? ` · ${e.afov}°` : ''}` };
    }
    case 'guideScope': {
      const g = rig.guideScope as GuideScope | null;
      if (!g) return { name: null, detail: null };
      return { name: g.name, detail: g.aperture ? `${g.aperture}mm · ${g.fl}mm FL` : `${g.fl}mm FL` };
    }
    case 'guideCamera': {
      const gc = rig.guideCamera;
      if (!gc) return { name: null, detail: null };
      return { name: gc.name, detail: `${gc.px}µm · ${gc.color ? 'color' : 'mono'}` };
    }
    case 'controller': {
      const c = rig.controller as Controller | null;
      if (!c) return { name: null, detail: null };
      return { name: c.name, detail: c.category.toUpperCase() };
    }
    default:
      return { name, detail: null };
  }
}

/** Returns the connection string(s) to display for a filled slot. */
function getConnDisplay(slot: SlotKey, rig: RigChain): { connIn: string | null; connOut: string | null } {
  switch (slot) {
    case 'telescope': {
      const t = rig.telescope;
      if (!t) return { connIn: null, connOut: null };
      return { connIn: null, connOut: normalizeConn(t.rear) };
    }
    case 'diagonal': {
      const d = rig.diagonal;
      if (!d) return { connIn: null, connOut: null };
      return { connIn: normalizeConn(d.connectionIn), connOut: normalizeConn(d.connectionOut) };
    }
    case 'lens': {
      const l = rig.lens;
      if (!l) return { connIn: null, connOut: null };
      const connIn = 'connectionIn' in l ? normalizeConn((l as { connectionIn?: string | null }).connectionIn)
        : ('barrel' in l ? ((l as { barrel: number }).barrel >= 2 ? '2inch' : '1.25inch') : null);
      const connOut = 'connectionOut' in l ? normalizeConn((l as { connectionOut?: string | null }).connectionOut) : 'T2';
      return { connIn, connOut };
    }
    case 'adc': {
      const a = rig.adc;
      if (!a) return { connIn: null, connOut: null };
      return { connIn: normalizeConn(a.connectionIn), connOut: normalizeConn(a.connectionOut) };
    }
    case 'filterWheel': {
      const fw = rig.filterWheel;
      if (!fw) return { connIn: null, connOut: null };
      return { connIn: normalizeConn(fw.connectionIn), connOut: normalizeConn(fw.connectionOut) };
    }
    case 'oag': {
      const o = rig.oag;
      if (!o) return { connIn: null, connOut: null };
      return { connIn: normalizeConn(o.connectionIn), connOut: normalizeConn(o.connectionOut) };
    }
    case 'camera': {
      const c = rig.camera;
      if (!c) return { connIn: null, connOut: null };
      return { connIn: normalizeConn(c.connection), connOut: null };
    }
    case 'eyepiece': {
      const e = rig.eyepiece;
      if (!e) return { connIn: null, connOut: null };
      const barrel = e.barrel ? (e.barrel >= 2 ? '2inch' : '1.25inch') : null;
      return { connIn: barrel, connOut: null };
    }
    case 'focuser': {
      const f = rig.focuser;
      if (!f) return { connIn: null, connOut: null };
      return { connIn: normalizeConn(f.connection), connOut: null };
    }
    default:
      return { connIn: null, connOut: null };
  }
}

function ConnBadge({ label, value, dir }: { label: string; value: string; dir: 'in' | 'out' }) {
  return (
    <span
      className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[9px] font-mono"
      style={{
        background: dir === 'out' ? 'rgba(80,160,255,0.15)' : 'rgba(0,229,160,0.12)',
        color: dir === 'out' ? 'rgba(120,180,255,0.9)' : 'rgba(0,229,160,0.85)',
        border: `1px solid ${dir === 'out' ? 'rgba(80,160,255,0.25)' : 'rgba(0,229,160,0.2)'}`,
      }}
    >
      <span style={{ opacity: 0.65 }}>{label}:</span> {value}
    </span>
  );
}

export default function SlotRow({ slot, rig, active, optional, onClick }: Props) {
  const { name, detail } = getSlotValue(slot, rig);
  const filled = !!name;
  const { connIn, connOut } = filled ? getConnDisplay(slot, rig) : { connIn: null, connOut: null };
  const hasConn = connIn || connOut;

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-3 py-2 rounded transition-colors text-left"
      style={{
        background: active ? 'rgba(0,229,160,0.08)' : 'transparent',
        border: `1px solid ${active ? 'var(--sim-accent)' : 'transparent'}`,
      }}
    >
      <span className="text-base shrink-0">{SLOT_ICONS[slot]}</span>
      <div className="flex-1 min-w-0">
        {filled ? (
          <>
            <div className="text-xs font-medium truncate" style={{ color: 'var(--sim-number)' }}>{name}</div>
            {detail && <div className="text-[10px]" style={{ color: 'var(--sim-muted)' }}>{detail}</div>}
            {hasConn && (
              <div className="flex flex-wrap gap-1 mt-0.5">
                {connIn  && <ConnBadge label="in"  value={connIn}  dir="in"  />}
                {connOut && <ConnBadge label="out" value={connOut} dir="out" />}
              </div>
            )}
          </>
        ) : (
          <div className="text-xs" style={{ color: optional ? 'var(--sim-muted)' : 'var(--sim-warn)' }}>
            {optional ? `+ Add ${SLOT_LABELS[slot]}` : `Select ${SLOT_LABELS[slot]}`}
          </div>
        )}
      </div>
      {active && <span className="text-[10px]" style={{ color: 'var(--sim-accent)' }}>◀</span>}
    </button>
  );
}
