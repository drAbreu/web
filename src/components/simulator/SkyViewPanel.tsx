'use client';
import { useRef, useEffect, useState } from 'react';
import type {
  OpticsResult, AnyTarget, DSO, SolarSystemObject, Comet, TargetCategory, SimulatorMode,
} from '@/lib/simulator/types';
import { isPhotoMode } from '@/lib/simulator/types';
import TargetSelector from './TargetSelector';
import StatsOverlay from './StatsOverlay';
import StatsPanel from './StatsPanel';

/**
 * Fixed angular reference for the sky view canvas.
 * URL only changes per target → browser caches perfectly across equipment changes.
 * Moon = 30 arcmin, Sun = 30 arcmin. With SOLAR_VIEW_ARCMIN = 60 both fill ~50% of canvas.
 */
const DSO_VIEW_ARCMIN   = 120;  // 2° — DSO + comet targets
const SOLAR_VIEW_ARCMIN =  60;  // 1° — solar system (Moon fills 50%, planets scaled down)

/**
 * Wikipedia Commons public-domain images for each solar system object.
 * Displayed at angular size proportional to SOLAR_VIEW_ARCMIN (60 arcmin).
 */
const PLANET_IMAGES: Record<string, string> = {
  sun:     'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/600px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg',
  moon:    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/600px-FullMoon2010.jpg',
  mercury: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_color_-_Prockter07-edit1.jpg/600px-Mercury_in_color_-_Prockter07-edit1.jpg',
  venus:   'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/600px-Venus-real_color.jpg',
  mars:    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/600px-OSIRIS_Mars_true_color.jpg',
  jupiter: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/600px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg',
  saturn:  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/800px-Saturn_during_Equinox.jpg',
  uranus:  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Uranus_as_seen_by_NASA%27s_Voyager_2_%28remastered%29_-_JPEG_converted.jpg/600px-Uranus_as_seen_by_NASA%27s_Voyager_2_%28remastered%29_-_JPEG_converted.jpg',
  neptune: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg/600px-Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg',
};

interface Props {
  mode: SimulatorMode;
  optics: OpticsResult | null;
  target: AnyTarget | null;
  targetCategory: TargetCategory;
  onTargetChange: (t: AnyTarget, c: TargetCategory) => void;
}

function isDSO(t: AnyTarget): t is DSO { return 'size_arcmin' in t && 'type' in t; }
function isSolar(t: AnyTarget): t is SolarSystemObject { return 'typicalSize_arcsec' in t; }

export default function SkyViewPanel({ mode, optics, target, targetCategory, onTargetChange }: Props) {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imgSrc,    setImgSrc]    = useState<string | null>(null);
  const [imgError,  setImgError]  = useState(false);
  const [loading,   setLoading]   = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ w: 800, h: 500 });

  const isSolarTarget = !!(target && isSolar(target));
  const refArcmin = isSolarTarget ? SOLAR_VIEW_ARCMIN : DSO_VIEW_ARCMIN;

  // Track container size → update canvas pixel dimensions
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(entries => {
      const r = entries[0]?.contentRect;
      if (r) setCanvasSize({ w: Math.round(r.width), h: Math.round(r.height) });
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // DSS URL — square crop, fixed size; only changes per target, not per optics.
  useEffect(() => {
    if (!target) return;

    let ra: number | null = null;
    let dec: number | null = null;

    if (isDSO(target))        { ra = target.ra; dec = target.dec; }
    else if (!isSolar(target)) { ra = (target as Comet).ra; dec = (target as Comet).dec; }

    if (ra === null || dec === null) { setImgSrc(null); setLoading(false); return; }

    // Square crop — scale = min(W,H) / DSO_VIEW_ARCMIN keeps all FOV circles correct
    const url = `/api/dss?ra=${ra}&dec=${dec}&width=${DSO_VIEW_ARCMIN}&height=${DSO_VIEW_ARCMIN}`;
    setLoading(true);
    setImgError(false);
    setImgSrc(url);
  }, [target]); // ← no optics dependency — image stable across equipment changes

  // Draw FOV overlay on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvasSize.w;
    const H = canvasSize.h;
    ctx.clearRect(0, 0, W, H);
    if (!optics) return;

    const cx = W / 2;
    const cy = H / 2;
    // pixels per arcmin — min(W,H) spans refArcmin so the square image scales correctly
    const scale  = Math.min(W, H) / refArcmin;
    const ACCENT = '#00e5a0';

    // ── Photo mode: camera sensor rectangle ───────────────────────────────────
    if (isPhotoMode(mode) && optics.fovW_arcmin > 0 && optics.fovH_arcmin > 0) {
      const rw = optics.fovW_arcmin * scale;
      const rh = optics.fovH_arcmin * scale;
      const x  = cx - rw / 2;
      const y  = cy - rh / 2;

      ctx.strokeStyle = ACCENT;
      ctx.lineWidth   = 1.5;
      ctx.strokeRect(x, y, rw, rh);

      ctx.lineWidth   = 0.5;
      ctx.strokeStyle = 'rgba(0,229,160,0.3)';
      ctx.beginPath();
      ctx.moveTo(x + rw / 3, y);     ctx.lineTo(x + rw / 3, y + rh);
      ctx.moveTo(x + 2 * rw / 3, y); ctx.lineTo(x + 2 * rw / 3, y + rh);
      ctx.moveTo(x, y + rh / 3);     ctx.lineTo(x + rw, y + rh / 3);
      ctx.moveTo(x, y + 2 * rh / 3); ctx.lineTo(x + rw, y + 2 * rh / 3);
      ctx.stroke();
    }

    // ── Visual mode: eyepiece FOV rings ───────────────────────────────────────
    if (!isPhotoMode(mode)) {
      const telFL = optics.effectiveFL;
      const mag   = optics.magnification;

      if (telFL > 0 && mag > 0) {
        // Derive selected eyepiece FL: epFL = telFL / magnification
        const epFL = telFL / mag;

        // Faint rings: same FL as selected eyepiece, all 7 standard AFOV values
        // → shows "what you'd see with a different AFOV eyepiece at the same FL"
        // Uses proper formula: 2×arctan(tan(afov/2)×epFL/telFL) to match Stellarium
        const D2R = Math.PI / 180;
        const trueFovDeg = (afovDeg: number) =>
          (2 * Math.atan(Math.tan((afovDeg * D2R) / 2) * (epFL / telFL))) / D2R;
        const AFOV_RINGS = [50, 52, 62, 82, 92, 100, 120];
        AFOV_RINGS.forEach((afov, i) => {
          const trueFovArcmin = trueFovDeg(afov) * 60;
          const r = (trueFovArcmin / 2) * scale;
          if (r < 2) return;
          const alpha = 0.07 + (i / AFOV_RINGS.length) * 0.28;
          ctx.strokeStyle = `rgba(0,229,160,${alpha.toFixed(2)})`;
          ctx.lineWidth   = 1;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, 2 * Math.PI);
          ctx.stroke();
        });

        // Bright ring: actual selected eyepiece (its AFOV × epFL / telFL)
        const actualArcmin = optics.fovW_deg * 60;
        if (actualArcmin > 0) {
          const r = (actualArcmin / 2) * scale;
          if (r >= 2) {
            ctx.strokeStyle = ACCENT;
            ctx.lineWidth   = 2.5;
            ctx.shadowColor = 'rgba(0,229,160,0.35)';
            ctx.shadowBlur  = 5;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }
    }

    // ── DSO angular size — dashed white circle ─────────────────────────────────
    if (target && isDSO(target) && target.size_arcmin > 0) {
      const r = (target.size_arcmin / 2) * scale;
      if (r >= 2) {
        ctx.strokeStyle = 'rgba(255,255,255,0.18)';
        ctx.lineWidth   = 1;
        ctx.setLineDash([4, 5]);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // ── Solar system: thin outline circle (planet image handles the visual) ─────
    if (target && isSolar(target)) {
      const sizeArcmin = (target as SolarSystemObject).typicalSize_arcsec / 60;
      const r = Math.max((sizeArcmin / 2) * scale, 3);
      ctx.strokeStyle = 'rgba(245,166,35,0.4)';
      ctx.lineWidth   = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }, [optics, mode, target, refArcmin, canvasSize]);

  return (
    <div className="relative flex flex-col h-full" style={{ background: 'var(--sim-bg)' }}>
      <div className="relative flex-1 overflow-hidden" ref={containerRef}>

        {/* Loading skeleton */}
        {loading && !imgError && !isSolarTarget && (
          <div className="absolute inset-0 animate-pulse" style={{ background: 'var(--sim-panel)' }} />
        )}

        {/* Error */}
        {imgError && !isSolarTarget && (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-center px-4"
            style={{ color: 'var(--sim-muted)' }}>
            Sky image unavailable — calculations still work
          </div>
        )}

        {/* DSS image — square 120×120 arcmin fetch, object-cover displays it */}
        {imgSrc && !isSolarTarget && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgSrc}
            alt="DSS sky image"
            className="absolute inset-0 w-full h-full object-cover"
            onLoad={() => setLoading(false)}
            onError={() => { setLoading(false); setImgError(true); }}
          />
        )}

        {/* Solar system — dark starfield background */}
        {isSolarTarget && (
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 40% 40%, #0d111e 0%, #000 100%)' }}
          />
        )}

        {/* Planet image — centered, sized to angular size relative to 60-arcmin reference */}
        {isSolarTarget && target && (() => {
          const sol = target as SolarSystemObject;
          const img = PLANET_IMAGES[sol.id];
          if (!img) return null;
          // size in % of min(W,H): (angularSize_arcmin / SOLAR_VIEW_ARCMIN) × 100
          const sizeArcmin = sol.typicalSize_arcsec / 60;
          // min display size 40px equivalent; expressed as % of container's short side
          const pct = Math.max((sizeArcmin / SOLAR_VIEW_ARCMIN) * 100, 4);
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={sol.id}
              src={img}
              alt={sol.name}
              className="absolute object-contain"
              style={{
                width:  `${pct}%`,
                top:  '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                imageRendering: sizeArcmin < 2 ? 'pixelated' : 'auto',
                boxShadow: `0 0 ${Math.round(pct)}px rgba(245,200,100,0.25)`,
              }}
            />
          );
        })()}

        {/* Canvas overlay — pixel resolution matches container */}
        <canvas
          ref={canvasRef}
          width={canvasSize.w}
          height={canvasSize.h}
          className="absolute inset-0 pointer-events-none"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Target selector */}
        <TargetSelector target={target} targetCategory={targetCategory} onChange={onTargetChange} />

        {/* Stats overlay */}
        <StatsOverlay mode={mode} optics={optics} onClick={() => setShowStats(true)} />

        {/* Top-left: DSO fit + scale label */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 pointer-events-none">
          {optics?.dsoFit && (
            <div
              className="text-[10px] px-2 py-0.5 rounded"
              style={{
                background: 'rgba(8,8,16,0.82)',
                border: '1px solid var(--sim-border)',
                color: optics.dsoFit.status === 'good'    ? 'var(--sim-good)'
                     : optics.dsoFit.status === 'too_big' ? 'var(--sim-error)'
                     : 'var(--sim-muted)',
                fontFamily: 'monospace',
              }}
            >
              {optics.dsoFit.label}
            </div>
          )}
          <div
            className="text-[9px] px-1.5 py-0.5 rounded"
            style={{
              background: 'rgba(8,8,16,0.55)',
              color: 'rgba(255,255,255,0.25)',
              fontFamily: 'monospace',
            }}
          >
            {refArcmin >= 60 ? `${(refArcmin / 60).toFixed(0)}° view` : `${refArcmin}′ view`}
          </div>
        </div>

        {/* Solar system notes */}
        {isSolarTarget && (
          <div className="absolute bottom-14 left-0 right-0 text-center px-4 pointer-events-none">
            <div className="text-xs" style={{ color: 'var(--sim-muted)' }}>
              {(target as SolarSystemObject).notes}
            </div>
            <div className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Position changes daily — use Stellarium for today&apos;s coordinates
            </div>
          </div>
        )}

        {/* Expanded stats panel */}
        {showStats && optics && (
          <StatsPanel mode={mode} optics={optics} onClose={() => setShowStats(false)} />
        )}
      </div>
    </div>
  );
}
