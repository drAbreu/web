import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import SimulatorApp from '@/components/simulator/SimulatorApp';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Telescope Simulator — DATASTAR',
  description: 'Build your astrophotography or visual rig. Pick equipment slot by slot, check connections, and see live FOV on real sky images.',
};

export default function SimulatorPage() {
  // Only available when SIMULATOR_ENABLED=true (set in .env.local, not in Vercel)
  if (process.env.SIMULATOR_ENABLED !== 'true') notFound();

  return (
    <Suspense fallback={null}>
      <SimulatorApp />
    </Suspense>
  );
}
