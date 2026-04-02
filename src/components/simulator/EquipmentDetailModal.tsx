'use client';
import { useEffect } from 'react';
import type {
  Telescope, Camera, Barlow, Corrector, ADC, Mount, Eyepiece,
  Filter, FilterWheel, Focuser, OAG, Diagonal, GuideScope, Controller,
  SlotKey, LensItem,
} from '@/lib/simulator/types';

type AnyEquipment =
  | Telescope | Camera | Barlow | Corrector | ADC | Mount | Eyepiece
  | Filter | FilterWheel | Focuser | OAG | Diagonal | GuideScope | Controller;

interface Props {
  item: AnyEquipment;
  slot: SlotKey;
  selected: boolean;
  onSelect: () => void;
  onClose: () => void;
  isOwned?: boolean;
  isWanted?: boolean;
  onToggleOwned?: () => void;
  onToggleWanted?: () => void;
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  if (value === null || value === undefined || value === '') return null;
  return (
    <div className="flex justify-between items-baseline gap-4 py-1.5"
      style={{ borderBottom: '1px solid var(--sim-border)' }}>
      <span className="text-[11px] shrink-0" style={{ color: 'var(--sim-muted)' }}>{label}</span>
      <span className="text-xs text-right font-medium" style={{ color: 'var(--sim-number)' }}>{value}</span>
    </div>
  );
}

const SLOT_ICONS: Partial<Record<SlotKey, string>> = {
  telescope: '🔭', camera: '📷', eyepiece: '👁', mount: '⛰',
  guideScope: '🔭', guideCamera: '📡', controller: '💻',
};

function getSpecs(item: AnyEquipment, slot: SlotKey): Array<{ label: string; value: React.ReactNode }> {
  switch (slot) {
    case 'telescope': {
      const t = item as Telescope;
      return [
        { label: 'Design', value: t.design },
        { label: 'Aperture', value: `${t.aperture} mm` },
        { label: 'Focal length', value: `${t.fl} mm` },
        { label: 'Focal ratio', value: `f/${t.fr}` },
        { label: 'Rear connection', value: t.rear },
        { label: 'Backfocus', value: t.bf !== null ? `${t.bf} mm` : null },
        { label: 'Weight', value: t.weight_kg ? `${t.weight_kg} kg` : null },
        { label: 'Imaging capable', value: t.imaging === true ? 'Yes' : t.imaging === false ? 'No' : null },
        { label: 'Config', value: t.is_ota_only ? 'OTA only' : `Bundled with ${t.bundled_mount_type?.replace(/_/g, ' ') ?? 'mount'}` },
      ];
    }
    case 'camera':
    case 'guideCamera': {
      const c = item as Camera;
      return [
        { label: 'Category', value: c.category },
        { label: 'Sensor', value: `${c.w} × ${c.h} mm` },
        { label: 'Pixel size', value: `${c.px} µm` },
        { label: 'Resolution', value: c.mpx ? `${c.mpx.toFixed(1)} MP` : null },
        { label: 'Color/Mono', value: c.color ? 'Color' : 'Mono' },
        { label: 'Cooling', value: c.cooling ? 'Yes' : 'No' },
        { label: 'Connection', value: c.connection },
        { label: 'Flange dist.', value: `${c.flange} mm` },
      ];
    }
    case 'lens': {
      if ('correctorType' in item) {
        const c = item as Corrector;
        return [
          { label: 'Type', value: c.correctorType },
          { label: 'Factor', value: `${c.factor}×` },
          { label: 'Connection in', value: c.connectionIn },
          { label: 'Connection out', value: c.connectionOut },
          { label: 'Backfocus', value: c.backfocus ? `${c.backfocus} mm` : null },
        ];
      } else {
        const b = item as Barlow;
        return [
          { label: 'Magnification', value: `${b.factor}×` },
          { label: 'Barrel', value: `${b.barrel}"` },
          { label: 'Connection in', value: b.connectionIn },
          { label: 'Connection out', value: b.connectionOut },
        ];
      }
    }
    case 'eyepiece': {
      const e = item as Eyepiece;
      return [
        { label: 'Focal length', value: `${e.fl} mm` },
        { label: 'AFOV', value: e.afov ? `${e.afov}°` : null },
        { label: 'Barrel', value: e.barrel ? `${e.barrel}"` : null },
        { label: 'Eye relief', value: e.eye_relief ? `${e.eye_relief} mm` : null },
      ];
    }
    case 'mount': {
      const m = item as Mount;
      return [
        { label: 'Type', value: m.mountType?.replace(/_/g, ' ') },
        { label: 'Payload', value: m.payload_kg ? `${m.payload_kg} kg` : null },
        { label: 'Includes tripod', value: m.includes_tripod === true ? 'Yes' : m.includes_tripod === false ? 'No' : 'Unknown' },
      ];
    }
    case 'filters': {
      const f = item as Filter;
      return [
        { label: 'Type', value: f.filterType },
        { label: 'Size', value: f.size_mm ? `${f.size_mm} mm` : null },
        { label: 'Barrel', value: f.barrel ? `${f.barrel}"` : null },
      ];
    }
    case 'filterWheel': {
      const fw = item as FilterWheel;
      return [
        { label: 'Positions', value: fw.positions },
        { label: 'Filter size', value: fw.filterSize },
        { label: 'Connection in', value: fw.connectionIn },
        { label: 'Connection out', value: fw.connectionOut },
        { label: 'Optical path', value: fw.opticalPath ? `${fw.opticalPath} mm` : null },
      ];
    }
    case 'focuser': {
      const f = item as Focuser;
      return [
        { label: 'Type', value: f.focuserType },
        { label: 'Travel', value: f.travel_mm ? `${f.travel_mm} mm` : null },
        { label: 'Motorized', value: f.is_motorized === true ? 'Yes' : f.is_motorized === false ? 'No' : null },
        { label: 'Connection', value: f.connection },
      ];
    }
    case 'adc': {
      const a = item as ADC;
      return [
        { label: 'Connection in', value: a.connectionIn },
        { label: 'Connection out', value: a.connectionOut },
      ];
    }
    case 'oag': {
      const o = item as OAG;
      return [
        { label: 'Connection in', value: o.connectionIn },
        { label: 'Connection out', value: o.connectionOut },
        { label: 'Optical path', value: o.opticalPath ? `${o.opticalPath} mm` : null },
      ];
    }
    case 'diagonal': {
      const d = item as Diagonal;
      return [
        { label: 'Type', value: d.diagonalType },
        { label: 'Connection in', value: d.connectionIn },
        { label: 'Connection out', value: d.connectionOut },
        { label: 'Optical path', value: d.opticalPath ? `${d.opticalPath} mm` : null },
      ];
    }
    case 'guideScope': {
      const g = item as GuideScope;
      return [
        { label: 'Aperture', value: g.aperture ? `${g.aperture} mm` : null },
        { label: 'Focal length', value: `${g.fl} mm` },
        { label: 'Connection', value: g.connection },
        { label: 'Weight', value: g.weight_kg ? `${g.weight_kg} kg` : null },
      ];
    }
    case 'controller': {
      const c = item as Controller;
      return [
        { label: 'Category', value: c.category.toUpperCase() },
        { label: 'Notes', value: c.notes },
      ];
    }
    default:
      return [];
  }
}

export default function EquipmentDetailModal({
  item, slot, selected, onSelect, onClose,
  isOwned, isWanted, onToggleOwned, onToggleWanted,
}: Props) {
  const imageUrl = ('image_url' in item ? (item as { image_url?: string | null }).image_url : null) ?? null;
  const specs = getSpecs(item, slot);
  const slotIcon = SLOT_ICONS[slot] ?? '🔩';

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)' }}
      onClick={onClose}
    >
      {/* Panel */}
      <div
        className="relative flex flex-col rounded-lg overflow-hidden shadow-2xl"
        style={{
          background: 'var(--sim-panel)',
          border: '1px solid var(--sim-border)',
          width: '100%',
          maxWidth: '440px',
          maxHeight: '90vh',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 w-7 h-7 rounded flex items-center justify-center text-sm transition-opacity hover:opacity-70"
          style={{ background: 'var(--sim-chip)', color: 'var(--sim-muted)' }}
        >
          ✕
        </button>

        {/* Image */}
        <div
          className="flex-shrink-0 flex items-center justify-center overflow-hidden"
          style={{ height: '200px', background: '#1a2845' }}
        >
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={item.name}
              className="w-full h-full object-contain p-4"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          ) : (
            <span className="text-6xl select-none opacity-30">{slotIcon}</span>
          )}
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-4 py-3 min-h-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide" style={{ color: 'var(--sim-muted)' }}>
                {item.brand}
              </div>
              <div className="text-sm font-semibold leading-snug" style={{ color: 'var(--sim-number)' }}>
                {item.name}
              </div>
            </div>
            {/* Own / Want buttons */}
            {onToggleOwned && onToggleWanted && (
              <div className="flex gap-1.5 shrink-0">
                <button
                  className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors"
                  style={{
                    background: isOwned ? 'rgba(0,229,160,0.15)' : 'var(--sim-chip)',
                    color: isOwned ? 'var(--sim-good)' : 'var(--sim-muted)',
                    border: `1px solid ${isOwned ? 'var(--sim-good)' : 'var(--sim-border)'}`,
                  }}
                  onClick={onToggleOwned}
                >
                  ✓ {isOwned ? 'Owned' : 'Own'}
                </button>
                <button
                  className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-colors"
                  style={{
                    background: isWanted ? 'rgba(245,166,35,0.15)' : 'var(--sim-chip)',
                    color: isWanted ? 'var(--sim-warn)' : 'var(--sim-muted)',
                    border: `1px solid ${isWanted ? 'var(--sim-warn)' : 'var(--sim-border)'}`,
                  }}
                  onClick={onToggleWanted}
                >
                  ★ {isWanted ? 'Wanted' : 'Want'}
                </button>
              </div>
            )}
          </div>

          {/* Specs */}
          <div className="mb-4">
            {specs.map(({ label, value }) =>
              value !== null && value !== undefined && value !== ''
                ? <Row key={label} label={label} value={value} />
                : null
            )}
          </div>
        </div>

        {/* Footer: price + actions */}
        <div
          className="flex-shrink-0 flex items-center justify-between gap-3 px-4 py-3"
          style={{ borderTop: '1px solid var(--sim-border)' }}
        >
          <span className="text-base font-bold" style={{ color: 'var(--sim-number)' }}>
            €{item.price}
          </span>
          <div className="flex gap-2">
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded text-xs transition-opacity hover:opacity-80"
                style={{ background: 'var(--sim-chip)', color: 'var(--sim-number)' }}
              >
                View on AstroShop ↗
              </a>
            )}
            <button
              onClick={() => { onSelect(); onClose(); }}
              className="px-3 py-1.5 rounded text-xs font-medium transition-opacity hover:opacity-80"
              style={{
                background: selected ? 'var(--sim-accent)' : 'rgba(0,229,160,0.2)',
                color: selected ? 'var(--sim-bg)' : 'var(--sim-accent)',
                border: '1px solid var(--sim-accent)',
              }}
            >
              {selected ? '✓ Selected' : 'Select'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
