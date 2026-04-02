'use client';
import type {
  SlotKey, RigChain, SimulatorMode, Adapter,
  CompatibilityIssue, OpticsResult, Controller,
} from '@/lib/simulator/types';
import { getSlotsForMode, OPTIONAL_SLOTS, isDSOMode, isPhotoMode } from '@/lib/simulator/types';
import { normalizeConn } from '@/lib/simulator/compatibility';
import SlotRow from './SlotRow';
import ConnectionRow from './ConnectionRow';
import SessionEssentials from './SessionEssentials';
import GuidingNote from './GuidingNote';
import PresetsPanel, { type Preset } from './PresetsPanel';

interface Props {
  mode: SimulatorMode;
  rig: RigChain;
  optics: OpticsResult | null;
  activeSlot: SlotKey;
  adapters: Adapter[];
  issues: CompatibilityIssue[];
  onSlotClick: (slot: SlotKey) => void;
  onApplyPreset: (preset: Preset) => void;
}

function computeRigPrice(rig: RigChain): number {
  const items = [
    rig.telescope, rig.diagonal, rig.lens, rig.adc,
    rig.filterWheel, rig.oag, rig.focuser, rig.camera, rig.eyepiece, rig.mount,
    rig.controller, rig.guideScope, rig.guideCamera,
    ...(rig.filters ?? []),
  ];
  return items.reduce((sum, item) => sum + ((item as { price?: number })?.price ?? 0), 0);
}

function computeRigWeight(rig: RigChain): { scopeKg: number; payloadKg: number | null } {
  const scopeKg = rig.telescope?.weight_kg ?? 0;
  const payloadKg = rig.mount?.payload_kg ?? null;
  return { scopeKg, payloadKg };
}

function getOutThread(slot: SlotKey, rig: RigChain): string | null {
  switch (slot) {
    case 'telescope': return normalizeConn(rig.telescope?.rear ?? null);
    case 'diagonal':  return normalizeConn(rig.diagonal?.connectionOut ?? null);
    case 'lens':      return rig.lens && 'connectionOut' in rig.lens ? normalizeConn((rig.lens as { connectionOut?: string | null }).connectionOut) : 'T2';
    case 'adc':       return normalizeConn(rig.adc?.connectionOut ?? null);
    case 'filterWheel': return normalizeConn(rig.filterWheel?.connectionOut ?? null);
    case 'oag':       return normalizeConn(rig.oag?.connectionOut ?? null);
    default:          return null;
  }
}

function getInThread(slot: SlotKey, rig: RigChain): string | null {
  switch (slot) {
    case 'diagonal':    return normalizeConn(rig.diagonal?.connectionIn ?? null);
    case 'lens':        return rig.lens && 'connectionIn' in rig.lens ? normalizeConn((rig.lens as { connectionIn?: string | null }).connectionIn) : null;
    case 'adc':         return normalizeConn(rig.adc?.connectionIn ?? null);
    case 'filterWheel': return normalizeConn(rig.filterWheel?.connectionIn ?? null);
    case 'oag':         return normalizeConn(rig.oag?.connectionIn ?? null);
    case 'camera':      return normalizeConn(rig.camera?.connection ?? null);
    case 'eyepiece':    return rig.eyepiece?.barrel ? (rig.eyepiece.barrel >= 2 ? '2inch' : '1.25inch') : null;
    default:            return null;
  }
}

export default function RigChainPanel({
  mode, rig, optics, activeSlot, adapters, issues, onSlotClick, onApplyPreset,
}: Props) {
  const slots = getSlotsForMode(mode);

  const mountContextNote = (() => {
    if (mode === 'visual') return 'AZ is easier for beginners. EQ not required.';
    if (isDSOMode(mode)) return 'EQ mount required for long exposures.';
    return 'Both AZ and EQ work for planetary.';
  })();

  const controllerNote = (() => {
    const c = rig.controller as Controller | null;
    if (!c) return null;
    if (c.category === 'asiair') return 'ASIAir: ZWO cameras only — works great if your rig is ZWO end-to-end.';
    if (c.category === 'minipc') return 'Mini PC + N.I.N.A supports all camera brands via ASCOM.';
    if (c.category === 'rpi') return 'RPi + INDI supports most cameras via Linux drivers. Lightweight & affordable.';
    return null;
  })();

  const bf = optics?.backfocus ?? null;
  const bfColor = !bf ? 'var(--sim-muted)'
    : bf.status === 'over'  ? 'var(--sim-error)'
    : bf.status === 'tight' ? 'var(--sim-warn)'
    : 'var(--sim-good)';

  return (
    <div className="flex flex-col h-full overflow-y-auto" style={{ background: 'var(--sim-panel)' }}>

      {/* Quick start presets */}
      <PresetsPanel onApply={onApplyPreset} />

      <div className="px-2 py-2 space-y-0.5">

        {/* Compatibility errors at top */}
        {issues.filter(i => i.severity === 'error').length > 0 && (
          <div className="px-3 py-2 rounded mb-2 text-xs" style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid var(--sim-error)', color: 'var(--sim-error)' }}>
            {issues.filter(i => i.severity === 'error').map((issue, idx) => (
              <div key={idx}>⚠ {issue.message}</div>
            ))}
          </div>
        )}

        {slots.map((slot, i) => {
          const prevSlot = i > 0 ? slots[i - 1] : null;
          const showConnection = prevSlot !== null && slot !== 'mount' && slot !== 'controller' && slot !== 'guideScope' && slot !== 'guideCamera';

          const outThread = prevSlot ? getOutThread(prevSlot, rig) : null;
          const inThread = getInThread(slot, rig);

          return (
            <div key={slot}>
              {showConnection && outThread && inThread && (
                <ConnectionRow
                  outThread={outThread}
                  inThread={inThread}
                  adapters={adapters}
                />
              )}
              <SlotRow
                slot={slot}
                rig={rig}
                active={activeSlot === slot}
                optional={OPTIONAL_SLOTS.has(slot)}
                onClick={() => onSlotClick(slot)}
              />
            </div>
          );
        })}

        {/* Mount contextual note */}
        <div className="px-3 pt-1 pb-1">
          <div className="text-[10px]" style={{ color: 'var(--sim-muted)' }}>{mountContextNote}</div>
          {rig.mount?.includes_tripod === null && (
            <div className="text-[10px] mt-0.5" style={{ color: 'var(--sim-warn)' }}>
              ⚠ Verify tripod/pier is included
            </div>
          )}
        </div>

        {/* Controller workflow note */}
        {controllerNote && (
          <div className="px-3 py-1.5 mx-0 rounded text-[10px]" style={{ background: 'rgba(245,166,35,0.06)', border: '1px solid rgba(245,166,35,0.2)', color: 'var(--sim-muted)' }}>
            💻 {controllerNote}
          </div>
        )}

        {/* Info issues */}
        {issues.filter(i => i.severity === 'info' || i.severity === 'warning').length > 0 && (
          <div className="mt-2 space-y-1">
            {issues.filter(i => i.severity !== 'error').map((issue, idx) => (
              <div
                key={idx}
                className="px-2 py-1.5 rounded text-[10px]"
                style={{
                  background: issue.severity === 'warning' ? 'rgba(245,166,35,0.08)' : 'rgba(0,229,160,0.05)',
                  border: `1px solid ${issue.severity === 'warning' ? 'rgba(245,166,35,0.3)' : 'var(--sim-border)'}`,
                  color: issue.severity === 'warning' ? 'var(--sim-warn)' : 'var(--sim-muted)',
                }}
              >
                {issue.message}
                {issue.action && <div className="mt-0.5 opacity-70">{issue.action}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price + Weight + Backfocus summary */}
      {(() => {
        const totalPrice = computeRigPrice(rig);
        const { scopeKg, payloadKg } = computeRigWeight(rig);
        const weightPct = (payloadKg && scopeKg) ? scopeKg / payloadKg : null;
        const weightColor = !weightPct ? 'var(--sim-muted)'
          : weightPct > 0.85 ? 'var(--sim-error)'
          : weightPct > 0.65 ? 'var(--sim-warn)'
          : 'var(--sim-good)';
        if (!totalPrice && !payloadKg && !bf) return null;
        return (
          <div className="mx-2 mt-2 mb-1 px-3 py-2 rounded text-[10px]" style={{ background: 'var(--sim-chip)', border: '1px solid var(--sim-border)' }}>
            {totalPrice > 0 && (
              <div className="flex justify-between items-center">
                <span style={{ color: 'var(--sim-muted)' }}>Estimated cost</span>
                <span className="font-mono font-semibold" style={{ color: 'var(--sim-number)' }}>
                  €{totalPrice.toLocaleString('en', { maximumFractionDigits: 0 })}
                </span>
              </div>
            )}
            {payloadKg !== null && scopeKg > 0 && (
              <div className="flex justify-between items-center mt-0.5">
                <span style={{ color: 'var(--sim-muted)' }}>Scope / payload</span>
                <span className="font-mono" style={{ color: weightColor }}>
                  {scopeKg.toFixed(1)} / {payloadKg} kg{weightPct ? ` (${Math.round(weightPct * 100)}%)` : ''}
                </span>
              </div>
            )}
            {bf !== null && (
              <div className="flex justify-between items-center mt-0.5">
                <span style={{ color: 'var(--sim-muted)' }}>Backfocus</span>
                <span className="font-mono" style={{ color: bfColor }}>
                  {bf.available_mm}mm avail / {bf.used_mm.toFixed(1)}mm used
                  {' → '}
                  {bf.remaining_mm >= 0
                    ? `${bf.remaining_mm.toFixed(1)}mm ${bf.status === 'tight' ? 'tight' : 'free'}`
                    : `${Math.abs(bf.remaining_mm).toFixed(1)}mm OVER`}
                </span>
              </div>
            )}
          </div>
        );
      })()}

      {/* Bottom collapsibles */}
      <div className="mt-auto px-2 pb-3 space-y-1">
        <SessionEssentials />
        {isDSOMode(mode) && <GuidingNote />}
      </div>
    </div>
  );
}
