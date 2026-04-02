'use client';
import type { AnyTarget, DSO, SolarSystemObject, Comet, TargetCategory } from '@/lib/simulator/types';
import { DSO_CATALOG, SOLAR_SYSTEM, COMETS } from '@/data/simulator/dso-catalog';

interface Props {
  target: AnyTarget | null;
  targetCategory: TargetCategory;
  onChange: (target: AnyTarget, category: TargetCategory) => void;
}

function isDSO(t: AnyTarget): t is DSO {
  return 'size_arcmin' in t && 'type' in t;
}
function isSolar(t: AnyTarget): t is SolarSystemObject {
  return 'typicalSize_arcsec' in t;
}

export default function TargetSelector({ target, onChange }: Props) {
  const currentId = target?.id ?? '';

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const id = e.target.value;
    const dso = DSO_CATALOG.find(d => d.id === id);
    if (dso) { onChange(dso, 'dso'); return; }
    const ss = SOLAR_SYSTEM.find(s => s.id === id);
    if (ss) { onChange(ss, 'solar_system'); return; }
    const comet = COMETS.find(c => c.id === id);
    if (comet) { onChange(comet, 'comet'); return; }
  }

  const label = target
    ? isDSO(target)
      ? `${target.id} — ${target.name}`
      : isSolar(target)
        ? target.name
        : (target as Comet).name
    : 'Select target';

  return (
    <div className="absolute top-2 right-2 z-10">
      <select
        value={currentId}
        onChange={handleChange}
        className="text-xs px-2 py-1 rounded"
        style={{
          background: 'rgba(8,8,16,0.85)',
          border: '1px solid var(--sim-border)',
          color: 'var(--sim-number)',
          backdropFilter: 'blur(4px)',
          maxWidth: '180px',
        }}
        aria-label="Select sky target"
      >
        <option value="" disabled>{label}</option>
        <optgroup label="── Deep Sky Objects ──">
          {DSO_CATALOG.map(d => (
            <option key={d.id} value={d.id}>{d.id} — {d.name}</option>
          ))}
        </optgroup>
        <optgroup label="── Solar System ──">
          {SOLAR_SYSTEM.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </optgroup>
        <optgroup label="── Comets ──">
          {COMETS.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}
