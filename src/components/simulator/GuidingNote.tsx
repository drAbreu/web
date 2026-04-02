'use client';
import { useState } from 'react';

export default function GuidingNote() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2 rounded" style={{ border: '1px solid var(--sim-border)', background: 'var(--sim-panel)' }}>
      <button
        className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium"
        style={{ color: 'var(--sim-muted)' }}
        onClick={() => setOpen(o => !o)}
      >
        <span>🔭 Autoguiding</span>
        <span>{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div className="px-3 pb-3 text-xs space-y-2" style={{ color: 'var(--sim-muted)' }}>
          <p>Autoguiding significantly improves DSO results but depends on your mount, software, and budget. It is beyond the scope of this tool.</p>
          <div className="grid grid-cols-2 gap-1">
            {[
              { label: 'PHD2', url: 'https://openphdguiding.org' },
              { label: 'ASIAIR', url: 'https://www.zwoastro.com/asiair/' },
              { label: 'N.I.N.A.', url: 'https://nighttime-imaging.eu' },
              { label: 'Ekos/KStars', url: 'https://indilib.org/about/ekos.html' },
            ].map(({ label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-1 rounded text-center text-xs transition-colors hover:opacity-80"
                style={{ background: 'var(--sim-chip)', color: 'var(--sim-accent)' }}
              >
                → {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
