// Sky image proxy — CDS hips2fits service (uses pre-cached HiPS tiles, much faster than STScI)
// GET /api/dss?ra=83.82&dec=-5.39&width=120&height=120  (arcmin)
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const CACHE_SECS = 60 * 60 * 24 * 7; // 7 days (DSS tiles never change)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ra = searchParams.get('ra');
  const dec = searchParams.get('dec');
  const w = searchParams.get('width');   // arcmin
  const h = searchParams.get('height');  // arcmin

  if (!ra || !dec || !w || !h) {
    return new Response('Missing parameters: ra, dec, width, height (arcmin)', { status: 400 });
  }

  // Convert arcmin → degrees for hips2fits
  const fovW = (parseFloat(w) / 60).toFixed(5);
  const fovH = (parseFloat(h) / 60).toFixed(5);

  // CDS hips2fits — serves pre-cached DSS2 red tiles from European CDN
  // Docs: https://alasky.cds.unistra.fr/hips-image-services/hips2fits
  const url =
    `https://alasky.cds.unistra.fr/hips-image-services/hips2fits` +
    `?hips=CDS%2FP%2FDSS2%2Fred` +
    `&ra=${encodeURIComponent(ra)}&dec=${encodeURIComponent(dec)}` +
    `&fov=${fovW}&width=800&height=800` +
    `&format=jpg&projection=TAN`;

  try {
    const res = await fetch(url, { next: { revalidate: CACHE_SECS } });
    if (!res.ok) {
      return new Response('Failed to fetch sky image', { status: 502 });
    }
    const buffer = await res.arrayBuffer();
    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': `public, max-age=${CACHE_SECS}, s-maxage=${CACHE_SECS}`,
      },
    });
  } catch {
    return new Response('Sky image fetch error', { status: 502 });
  }
}
