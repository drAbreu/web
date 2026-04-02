'use client';
import type { Adapter } from '@/lib/simulator/types';
import { directlyCompatible } from '@/lib/simulator/compatibility';

interface Props {
  outThread: string | null;
  inThread: string | null;
  adapters: Adapter[];
}

export default function ConnectionRow({ outThread, inThread, adapters }: Props) {
  if (!outThread && !inThread) return null;

  const ok = outThread && inThread && directlyCompatible(outThread, inThread);
  const mismatch = outThread && inThread && !ok;

  const suggested = mismatch
    ? adapters
        .filter(a => {
          const cIn = a.connectionIn;
          const cOut = a.connectionOut;
          return (
            (cIn === outThread && cOut === inThread) ||
            (cIn === inThread && cOut === outThread)
          );
        })
        .sort((a, b) => a.price - b.price)
        .slice(0, 1)
    : [];

  return (
    <div className="flex flex-col items-start gap-1 px-3 py-1">
      <div className="flex items-center gap-1.5 text-xs">
        {outThread && (
          <span className="px-1.5 py-0.5 rounded text-white text-[10px] font-mono"
            style={{ background: 'var(--sim-thread-out)' }}>
            Out: {outThread}
          </span>
        )}
        {outThread && inThread && <span style={{ color: 'var(--sim-muted)' }}>→</span>}
        {inThread && (
          <span className="px-1.5 py-0.5 rounded text-white text-[10px] font-mono"
            style={{ background: 'var(--sim-thread-in)' }}>
            In: {inThread}
          </span>
        )}
        {ok && <span className="text-[10px]">✅</span>}
        {mismatch && !suggested.length && <span className="text-[10px]" style={{ color: 'var(--sim-error)' }}>❌ No adapter</span>}
        {mismatch && suggested.length > 0 && <span className="text-[10px]" style={{ color: 'var(--sim-warn)' }}>⚠️</span>}
      </div>
      {mismatch && suggested.length > 0 && (
        <a
          href={suggested[0].url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 flex items-center gap-1.5 px-2 py-1 rounded text-[11px] transition-opacity hover:opacity-80"
          style={{ background: 'var(--sim-chip)', color: 'var(--sim-number)' }}
        >
          <span>{suggested[0].name}</span>
          <span style={{ color: 'var(--sim-accent)' }}>€{suggested[0].price}</span>
          <span style={{ color: 'var(--sim-muted)' }}>↗</span>
        </a>
      )}
      {!outThread && !inThread && null}
    </div>
  );
}
