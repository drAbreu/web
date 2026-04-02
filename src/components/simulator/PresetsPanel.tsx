'use client';
import type { SimulatorMode } from '@/lib/simulator/types';

export interface Preset {
  id: string;
  label: string;
  description: string;
  icon: string;
  mode: SimulatorMode;
  telescopeId: string;
  eyepieceId?: string;
  cameraId?: string;
  mountId?: string;
  lensId?: string;
}

export const PRESETS: Preset[] = [
  {
    id: 'beginner_visual',
    label: 'Beginner Visual',
    description: 'Refractor + AltAz + Plössl',
    icon: '👁',
    mode: 'visual',
    telescopeId: '7888',   // Celestron AC 70/900 Astromaster 70 AZ
    eyepieceId:  '43864',  // 1.25" 32mm Plössl
  },
  {
    id: 'planetary',
    label: 'Planetary',
    description: 'SCT 8" + color camera',
    icon: '🪐',
    mode: 'planetary_color',
    telescopeId: '25104',  // Celestron SC 203/2032 NexStar 8 SE
    cameraId:    '80612',  // Bresser T130 PLUS Colour
  },
  {
    id: 'dso_visual',
    label: 'DSO Visual',
    description: 'Dobsonian 8" + wide eyepiece',
    icon: '🌌',
    mode: 'visual',
    telescopeId: '83303',  // Skywatcher Dobson 203/1200 Skyliner FlexTube
    eyepieceId:  '43864',  // 1.25" 32mm Plössl
  },
  {
    id: 'dso_imaging',
    label: 'DSO Imaging',
    description: 'APO 72mm + EQ5 + cooled cam',
    icon: '📸',
    mode: 'dso_color',
    telescopeId: '56994',  // Skywatcher AP 72/420 EvoStar 72 ED DS OTA
    cameraId:    '80354',  // ZWO veTEC 585 C Color cooled
    mountId:     '16081',  // Skywatcher EQ5
  },
];

interface Props {
  onApply: (preset: Preset) => void;
}

export default function PresetsPanel({ onApply }: Props) {
  return (
    <details className="group mx-2 mt-1 mb-2 rounded overflow-hidden" style={{ border: '1px solid var(--sim-border)' }}>
      <summary
        className="flex items-center gap-1.5 px-3 py-1.5 cursor-pointer select-none text-[10px] font-semibold uppercase tracking-wide list-none"
        style={{ background: 'var(--sim-chip)', color: 'var(--sim-muted)' }}
      >
        <span className="text-[10px]">▶</span>
        <span className="group-open:hidden">Quick Start</span>
        <span className="hidden group-open:inline">Quick Start</span>
        <span className="ml-auto opacity-50 text-[9px] font-normal normal-case tracking-normal">load a preset rig</span>
      </summary>
      <div className="grid grid-cols-2 gap-1.5 p-2" style={{ background: 'var(--sim-bg)' }}>
        {PRESETS.map(p => (
          <button
            key={p.id}
            onClick={() => onApply(p)}
            className="flex flex-col items-start gap-0.5 px-2 py-2 rounded text-left transition-colors"
            style={{ background: 'var(--sim-card)', border: '1px solid var(--sim-border)' }}
          >
            <span className="text-base leading-none">{p.icon}</span>
            <span className="text-[10px] font-semibold mt-1" style={{ color: 'var(--sim-number)' }}>{p.label}</span>
            <span className="text-[9px] leading-tight" style={{ color: 'var(--sim-muted)' }}>{p.description}</span>
          </button>
        ))}
      </div>
    </details>
  );
}
