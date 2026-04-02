'use client';
import { useState } from 'react';

export default function SessionEssentials() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2 rounded" style={{ border: '1px solid var(--sim-border)', background: 'var(--sim-panel)' }}>
      <button
        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium"
        style={{ color: 'var(--sim-muted)' }}
        onClick={() => setOpen(o => !o)}
      >
        <span>🗒 Session Essentials</span>
        <span>{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div className="px-3 pb-3 space-y-3 text-xs" style={{ color: 'var(--sim-muted)' }}>
          <div>
            <div className="font-semibold mb-1" style={{ color: 'var(--sim-number)' }}>🔋 Power supply</div>
            <p>Portable battery (TalentCell / Jackery) for field. AC adapter for home. Mount + camera + dew heaters all need power.</p>
          </div>
          <div>
            <div className="font-semibold mb-1" style={{ color: 'var(--sim-number)' }}>💧 Dew heaters + controller</div>
            <p>Essential in most climates. Strips for objective lens, controller to regulate temperature.</p>
          </div>
          <div>
            <div className="font-semibold mb-1" style={{ color: 'var(--sim-number)' }}>🔩 Backfocus spacers</div>
            <p>M42/M48 extension rings for exact flange distance with reducers and flatteners.</p>
          </div>
          <div>
            <div className="font-semibold mb-1" style={{ color: 'var(--sim-number)' }}>🗼 Tripod / pier</div>
            <p>Some mounts sell head and tripod separately. Verify your mount includes a tripod.</p>
          </div>
        </div>
      )}
    </div>
  );
}
