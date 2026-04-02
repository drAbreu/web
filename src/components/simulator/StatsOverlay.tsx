'use client';
import type { OpticsResult, SimulatorMode } from '@/lib/simulator/types';
import { isPhotoMode } from '@/lib/simulator/types';

interface Props {
  mode: SimulatorMode;
  optics: OpticsResult | null;
  onClick: () => void;
}

function samplingColor(ratio: number): string {
  if (ratio < 0.5) return 'var(--sim-error)';
  if (ratio < 1) return 'var(--sim-warn)';
  if (ratio <= 3) return 'var(--sim-good)';
  if (ratio <= 5) return 'var(--sim-warn)';
  return 'var(--sim-error)';
}

export default function StatsOverlay({ mode, optics, onClick }: Props) {
  if (!optics) return null;

  return (
    <button
      onClick={onClick}
      className="absolute bottom-2 left-2 text-left px-2 py-1.5 rounded text-[11px] transition-opacity hover:opacity-90"
      style={{
        background: 'rgba(8,8,16,0.85)',
        border: '1px solid var(--sim-border)',
        fontFamily: 'monospace',
        color: 'var(--sim-number)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {isPhotoMode(mode) ? (
        <>
          <div>FOV {optics.fovW_deg.toFixed(2)}°×{optics.fovH_deg.toFixed(2)}°</div>
          <div>f/{optics.effectiveFR.toFixed(1)} · {optics.imageScale.toFixed(2)}"/px</div>
          {optics.sampling && (
            <div style={{ color: samplingColor(optics.sampling.ratio) }}>
              Sampling {optics.sampling.label}
            </div>
          )}
        </>
      ) : (
        <>
          <div>{optics.magnification.toFixed(0)}× · FOV {optics.fovW_deg.toFixed(2)}°</div>
          <div>Exit pupil {optics.exitPupil.toFixed(1)} mm</div>
        </>
      )}
      <div className="mt-0.5 text-[9px]" style={{ color: 'var(--sim-muted)' }}>tap for details</div>
    </button>
  );
}
