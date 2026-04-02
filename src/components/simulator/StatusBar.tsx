'use client';
import type { OpticsResult, SimulatorMode } from '@/lib/simulator/types';
import { isPhotoMode } from '@/lib/simulator/types';

interface Props {
  mode: SimulatorMode;
  optics: OpticsResult | null;
}

function n(v: number, dp = 2): string {
  return v.toFixed(dp);
}

function samplingColor(ratio: number): string {
  if (ratio < 0.5) return 'var(--sim-error)';
  if (ratio < 1) return 'var(--sim-warn)';
  if (ratio <= 3) return 'var(--sim-good)';
  if (ratio <= 5) return 'var(--sim-warn)';
  return 'var(--sim-error)';
}

export default function StatusBar({ mode, optics }: Props) {
  if (!optics) {
    return (
      <div
        className="px-4 py-2 text-xs border-t"
        style={{ background: 'var(--sim-panel)', borderColor: 'var(--sim-border)', color: 'var(--sim-muted)', fontFamily: 'monospace' }}
      >
        Select a telescope to see calculations
      </div>
    );
  }

  const { effectiveFR, rayleigh, maxUsefulMag } = optics;

  if (isPhotoMode(mode)) {
    const { fovW_deg, fovH_deg, imageScale, sampling } = optics;
    return (
      <div
        className="flex flex-wrap gap-x-4 gap-y-1 px-4 py-2 text-xs border-t"
        style={{ background: 'var(--sim-panel)', borderColor: 'var(--sim-border)', color: 'var(--sim-number)', fontFamily: 'monospace' }}
      >
        <span>FOV: {n(fovW_deg, 2)}°×{n(fovH_deg, 2)}°</span>
        <span style={{ color: 'var(--sim-muted)' }}>·</span>
        <span>Scale: {n(imageScale)}"/px</span>
        <span style={{ color: 'var(--sim-muted)' }}>·</span>
        <span>f/{n(effectiveFR, 1)}</span>
        <span style={{ color: 'var(--sim-muted)' }}>·</span>
        <span>Rayleigh: {n(rayleigh)}″</span>
        <span style={{ color: 'var(--sim-muted)' }}>·</span>
        <span>Nyquist: {n(rayleigh / 2)}"/px</span>
        <span style={{ color: 'var(--sim-muted)' }}>·</span>
        <span>Max mag: {maxUsefulMag.typical}×</span>
        {sampling && (
          <>
            <span style={{ color: 'var(--sim-muted)' }}>·</span>
            <span style={{ color: samplingColor(sampling.ratio) }}>
              Sampling: {sampling.label}
            </span>
          </>
        )}
      </div>
    );
  }

  // Visual mode
  const { magnification, exitPupil, fovW_deg } = optics;
  const overMag = magnification > maxUsefulMag.typical;
  return (
    <div
      className="flex flex-wrap gap-x-4 gap-y-1 px-4 py-2 text-xs border-t"
      style={{ background: 'var(--sim-panel)', borderColor: 'var(--sim-border)', color: 'var(--sim-number)', fontFamily: 'monospace' }}
    >
      <span>Magnification: {n(magnification, 0)}×</span>
      <span style={{ color: 'var(--sim-muted)' }}>·</span>
      <span>True FOV: {n(fovW_deg, 2)}°</span>
      <span style={{ color: 'var(--sim-muted)' }}>·</span>
      <span>Exit pupil: {n(exitPupil, 1)}mm</span>
      <span style={{ color: 'var(--sim-muted)' }}>·</span>
      <span>Rayleigh: {n(rayleigh)}″</span>
      <span style={{ color: 'var(--sim-muted)' }}>·</span>
      <span style={{ color: overMag ? 'var(--sim-warn)' : 'var(--sim-number)' }}>
        Max useful: {maxUsefulMag.typical}× {overMag ? '⚠️' : ''}
      </span>
    </div>
  );
}
