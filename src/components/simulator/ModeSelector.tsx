'use client';
import type { SimulatorMode } from '@/lib/simulator/types';

interface Props {
  mode: SimulatorMode;
  onChange: (mode: SimulatorMode) => void;
}

const MODES: { value: SimulatorMode; label: string; icon: string }[] = [
  { value: 'visual',           label: 'Visual',          icon: '👁' },
  { value: 'planetary_color',  label: 'Planetary Color', icon: '🪐' },
  { value: 'planetary_mono',   label: 'Planetary Mono',  icon: '◎' },
  { value: 'dso_color',        label: 'DSO Color',       icon: '🌌' },
  { value: 'dso_mono',         label: 'DSO Mono',        icon: '✦' },
];

export default function ModeSelector({ mode, onChange }: Props) {
  return (
    <div
      className="flex items-center gap-0 overflow-x-auto scrollbar-hide border-b"
      style={{ background: 'var(--sim-panel)', borderColor: 'var(--sim-border)' }}
    >
      {MODES.map(m => (
        <button
          key={m.value}
          onClick={() => onChange(m.value)}
          className="shrink-0 px-5 py-3 text-sm font-medium transition-colors whitespace-nowrap"
          style={{
            color: mode === m.value ? 'var(--sim-accent)' : 'var(--sim-muted)',
            borderBottom: mode === m.value ? '2px solid var(--sim-accent)' : '2px solid transparent',
            background: 'transparent',
          }}
        >
          <span className="mr-1.5 text-base leading-none">{m.icon}</span>{m.label}
        </button>
      ))}
    </div>
  );
}
