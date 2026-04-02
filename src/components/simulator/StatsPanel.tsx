'use client';
import type { OpticsResult, SimulatorMode } from '@/lib/simulator/types';
import { isPhotoMode } from '@/lib/simulator/types';

interface Props {
  mode: SimulatorMode;
  optics: OpticsResult;
  onClose: () => void;
}

function Row({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1 border-b" style={{ borderColor: 'var(--sim-border)' }}>
      <span style={{ color: 'var(--sim-muted)' }} className="text-xs">{label}</span>
      <span style={{ color: 'var(--sim-number)', fontFamily: 'monospace' }} className="text-xs font-medium">
        {value}
        {note && <span style={{ color: 'var(--sim-muted)' }} className="ml-2 text-[10px]">{note}</span>}
      </span>
    </div>
  );
}

function samplingStatus(ratio: number) {
  if (ratio < 0.5) return { color: 'var(--sim-error)', icon: '🔴' };
  if (ratio < 1) return { color: 'var(--sim-warn)', icon: '🟡' };
  if (ratio <= 3) return { color: 'var(--sim-good)', icon: '✅' };
  if (ratio <= 5) return { color: 'var(--sim-warn)', icon: '🟡' };
  return { color: 'var(--sim-error)', icon: '🔴' };
}

export default function StatsPanel({ mode, optics, onClose }: Props) {
  const {
    effectiveFL, effectiveFR, rayleigh, dawes, maxUsefulMag,
    imageScale, sampling, magnification, exitPupil,
  } = optics;

  return (
    <div
      className="absolute inset-0 z-20 overflow-y-auto rounded"
      style={{ background: 'var(--sim-panel)', border: '1px solid var(--sim-border)' }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--sim-border)' }}>
        <span className="text-sm font-semibold" style={{ color: 'var(--sim-number)' }}>Optics Analysis</span>
        <button
          onClick={onClose}
          className="text-xs px-2 py-1 rounded"
          style={{ color: 'var(--sim-muted)', background: 'var(--sim-chip)' }}
        >
          ✕ Close
        </button>
      </div>
      <div className="p-4 space-y-4">

        {/* Telescope */}
        <section>
          <div className="text-xs font-semibold mb-2" style={{ color: 'var(--sim-accent)' }}>Telescope</div>
          <Row label="Effective FL" value={`${effectiveFL.toFixed(0)} mm`} />
          <Row label="Effective f/" value={effectiveFR.toFixed(1)} />
        </section>

        {/* Resolution limits */}
        <section>
          <div className="text-xs font-semibold mb-2" style={{ color: 'var(--sim-accent)' }}>Resolution limits</div>
          <Row label="Rayleigh" value={`${rayleigh.toFixed(2)}″`} note="used for Nyquist + sampling" />
          <Row label="Dawes" value={`${dawes.toFixed(2)}″`} note="double stars only" />
          <Row label="Nyquist limit" value={`${(rayleigh / 2).toFixed(2)}"/px`} />
        </section>

        {/* Max magnification */}
        <section>
          <div className="text-xs font-semibold mb-2" style={{ color: 'var(--sim-accent)' }}>Max magnification</div>
          <Row label="Theoretical (50×/in)" value={`${maxUsefulMag.theoretical.toFixed(0)}×`} />
          <Row label="Rayleigh (0.7mm EP)" value={`${maxUsefulMag.rayleighLimit.toFixed(0)}×`} />
          <Row label="Practical ceiling" value={`${maxUsefulMag.typical}×`} note="recommended" />
        </section>

        {isPhotoMode(mode) && imageScale > 0 && (
          <>
            {/* Imaging */}
            <section>
              <div className="text-xs font-semibold mb-2" style={{ color: 'var(--sim-accent)' }}>Imaging</div>
              <Row label="Image scale" value={`${imageScale.toFixed(2)}"/px`} />
              {sampling && (
                <>
                  <Row
                    label="Sampling ratio"
                    value={`${sampling.ratio.toFixed(2)}×`}
                    note={samplingStatus(sampling.ratio).icon}
                  />
                  <Row label="Nyquist limit" value={`${sampling.nyquistLimit.toFixed(2)}"/px`} />
                </>
              )}
            </section>

            {/* Seeing analysis */}
            {sampling && (
              <section>
                <div className="text-xs font-semibold mb-2" style={{ color: 'var(--sim-accent)' }}>Seeing analysis</div>
                <div className="text-[10px] mb-1" style={{ color: 'var(--sim-muted)', fontFamily: 'monospace' }}>
                  Seeing · Ideal scale · Yours · Result
                </div>
                {[sampling.seeingLimited.good, sampling.seeingLimited.average, sampling.seeingLimited.poor].map(s => (
                  <div key={s.label} className="flex items-center justify-between py-1 border-b text-xs" style={{ borderColor: 'var(--sim-border)' }}>
                    <span style={{ color: 'var(--sim-muted)' }}>{s.label}</span>
                    <span style={{ color: 'var(--sim-number)', fontFamily: 'monospace' }}>
                      {s.idealPixelSize_um.toFixed(2)}"/px
                    </span>
                    <span style={{
                      color: s.assessment === 'matched' ? 'var(--sim-good)'
                        : s.assessment === 'oversampled' ? 'var(--sim-warn)'
                        : 'var(--sim-error)',
                      fontFamily: 'monospace',
                    }} className="text-xs">
                      {s.assessment === 'matched' ? '✅ Matched' : s.assessment === 'oversampled' ? 'Over' : 'Under'}
                    </span>
                  </div>
                ))}
              </section>
            )}
          </>
        )}

        {!isPhotoMode(mode) && (
          <section>
            <div className="text-xs font-semibold mb-2" style={{ color: 'var(--sim-accent)' }}>Visual</div>
            <Row label="Magnification" value={`${magnification.toFixed(0)}×`} />
            <Row label="Exit pupil" value={`${exitPupil.toFixed(1)} mm`} />
          </section>
        )}
      </div>
    </div>
  );
}
