'use client';
import type {
  Telescope, Camera, Barlow, Corrector, ADC, Mount, Eyepiece,
  Filter, FilterWheel, Focuser, OAG, Diagonal, GuideScope, Controller, SlotKey,
} from '@/lib/simulator/types';

type AnyEquipment =
  | Telescope | Camera | Barlow | Corrector | ADC | Mount | Eyepiece
  | Filter | FilterWheel | Focuser | OAG | Diagonal | GuideScope | Controller;

interface Props {
  item: AnyEquipment;
  slot: SlotKey;
  selected: boolean;
  onSelect: () => void;
  onInfo: () => void;
  fovLabel?: string;
  isOwned?: boolean;
  isWanted?: boolean;
  onToggleOwned?: (e: React.MouseEvent) => void;
  onToggleWanted?: (e: React.MouseEvent) => void;
}

const SLOT_ICONS: Record<SlotKey, string> = {
  telescope:   '🔭',
  diagonal:    '✳️',
  lens:        '🔩',
  adc:         '🌈',
  filterWheel: '🎡',
  filters:     '💧',
  oag:         '🎯',
  focuser:     '🔧',
  camera:      '📷',
  eyepiece:    '👁',
  mount:       '⛰',
  controller:  '💻',
  guideScope:  '🔭',
  guideCamera: '📡',
};

function getChips(item: AnyEquipment, slot: SlotKey): string[] {
  const chips: string[] = [];
  switch (slot) {
    case 'telescope': {
      const t = item as Telescope;
      chips.push(`${t.aperture}mm`, `f/${t.fr}`, `${t.fl}mm FL`);
      if (t.weight_kg) chips.push(`${t.weight_kg}kg`);
      if (t.design) chips.push(t.design);
      break;
    }
    case 'camera':
    case 'guideCamera': {
      const c = item as Camera;
      chips.push(`${c.px}µm`, c.color ? 'Color' : 'Mono');
      if (c.mpx) chips.push(`${c.mpx.toFixed(1)}MP`);
      if (c.category) chips.push(c.category);
      if (c.cooling) chips.push('Cooled');
      break;
    }
    case 'lens': {
      if ('correctorType' in item) {
        const c = item as Corrector;
        chips.push(c.correctorType || 'Corrector');
        if (c.factor !== 1.0) chips.push(`${c.factor}×`);
        if (c.connectionIn) chips.push(`${c.connectionIn}→${c.connectionOut ?? '?'}`);
      } else {
        const b = item as Barlow;
        chips.push(`${b.factor}×`, 'Barlow', `${b.barrel}"`);
      }
      break;
    }
    case 'eyepiece': {
      const e = item as Eyepiece;
      chips.push(`${e.fl}mm`);
      if (e.afov) chips.push(`${e.afov}°`);
      if (e.barrel) chips.push(`${e.barrel}"`);
      break;
    }
    case 'filters': {
      const f = item as Filter;
      if (f.filterType) chips.push(f.filterType);
      if (f.barrel) chips.push(`${f.barrel}"`);
      else if (f.size_mm) chips.push(`${f.size_mm}mm`);
      break;
    }
    case 'filterWheel': {
      const fw = item as FilterWheel;
      if (fw.positions) chips.push(`${fw.positions}-pos`);
      if (fw.filterSize) chips.push(fw.filterSize);
      if (fw.connectionIn) chips.push(`${fw.connectionIn}→${fw.connectionOut ?? '?'}`);
      break;
    }
    case 'focuser': {
      const f = item as Focuser;
      if (f.focuserType) chips.push(f.focuserType);
      if (f.travel_mm) chips.push(`${f.travel_mm}mm travel`);
      if (f.is_motorized) chips.push('Motorized');
      break;
    }
    case 'mount': {
      const m = item as Mount;
      if (m.mountType) chips.push(m.mountType.replace('_', ' '));
      if (m.payload_kg) chips.push(`${m.payload_kg}kg payload`);
      break;
    }
    case 'guideScope': {
      const g = item as GuideScope;
      if (g.aperture) chips.push(`${g.aperture}mm`);
      chips.push(`${g.fl}mm FL`);
      if (g.weight_kg) chips.push(`${g.weight_kg}kg`);
      break;
    }
    case 'controller': {
      const c = item as Controller;
      chips.push(c.category.toUpperCase());
      break;
    }
    case 'adc':
    case 'oag':
    case 'diagonal': {
      const a = item as { connectionIn?: string | null; connectionOut?: string | null };
      if (a.connectionIn) chips.push(`${a.connectionIn}→${a.connectionOut ?? '?'}`);
      break;
    }
  }
  return chips.slice(0, 4);
}

const FALLBACK_BG: Record<SlotKey, string> = {
  telescope:   '#1a2845',
  diagonal:    '#1a2845',
  lens:        '#1a2845',
  adc:         '#1a2845',
  filterWheel: '#1a2845',
  filters:     '#1a2845',
  oag:         '#1a2845',
  focuser:     '#1a2845',
  camera:      '#1a2845',
  eyepiece:    '#1a2845',
  mount:       '#1a2845',
  controller:  '#1a2845',
  guideScope:  '#1a2845',
  guideCamera: '#1a2845',
};

export default function EquipmentCard({
  item, slot, selected, onSelect, onInfo,
  fovLabel, isOwned, isWanted, onToggleOwned, onToggleWanted,
}: Props) {
  const chips = getChips(item, slot);
  const imageUrl = ('image_url' in item ? (item as { image_url?: string | null }).image_url : null) ?? null;
  const showTagButtons = onToggleOwned && onToggleWanted;

  return (
    <div
      className="rounded overflow-hidden flex flex-col cursor-pointer transition-all"
      style={{
        background: 'var(--sim-card)',
        border: `1px solid ${selected ? 'var(--sim-accent)' : 'var(--sim-border)'}`,
        boxShadow: selected ? '0 0 0 1px var(--sim-accent)' : 'none',
      }}
      onClick={onInfo}
    >
      {/* Image area */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{ background: FALLBACK_BG[slot], height: '120px' }}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={item.name}
            className="w-full h-full object-contain p-2"
            onError={e => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <span className="text-4xl select-none">{SLOT_ICONS[slot]}</span>
        )}

        {/* Own / Want tag buttons */}
        {showTagButtons && (
          <div className="absolute top-1 right-1 flex flex-col gap-0.5">
            <button
              className="w-5 h-5 rounded flex items-center justify-center text-[11px] leading-none transition-colors"
              style={{
                background: isOwned ? 'rgba(0,229,160,0.25)' : 'rgba(0,0,0,0.45)',
                color: isOwned ? 'var(--sim-good)' : 'var(--sim-muted)',
                border: `1px solid ${isOwned ? 'var(--sim-good)' : 'transparent'}`,
              }}
              title={isOwned ? 'I own this (click to remove)' : 'Mark as owned'}
              onClick={onToggleOwned}
            >
              ✓
            </button>
            <button
              className="w-5 h-5 rounded flex items-center justify-center text-[11px] leading-none transition-colors"
              style={{
                background: isWanted ? 'rgba(245,166,35,0.25)' : 'rgba(0,0,0,0.45)',
                color: isWanted ? 'var(--sim-warn)' : 'var(--sim-muted)',
                border: `1px solid ${isWanted ? 'var(--sim-warn)' : 'transparent'}`,
              }}
              title={isWanted ? 'On wishlist (click to remove)' : 'Add to wishlist'}
              onClick={onToggleWanted}
            >
              ★
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 p-2 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: 'var(--sim-muted)' }}>
          {item.brand}
        </div>
        <div className="text-xs font-medium leading-snug line-clamp-2" style={{ color: 'var(--sim-number)' }}>
          {item.name}
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {chips.map(c => (
            <span
              key={c}
              className="px-1 py-0.5 rounded text-[9px]"
              style={{ background: 'var(--sim-chip)', color: 'var(--sim-muted)' }}
            >
              {c}
            </span>
          ))}
          {fovLabel && (
            <span
              className="px-1 py-0.5 rounded text-[9px] font-semibold"
              style={{ background: 'rgba(0,229,160,0.12)', color: 'var(--sim-good)', border: '1px solid rgba(0,229,160,0.25)' }}
            >
              {fovLabel}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-xs font-semibold" style={{ color: 'var(--sim-number)' }}>
            €{item.price}
          </span>
          <button
            className="text-[10px] px-2 py-1 rounded font-medium transition-colors"
            style={{
              background: selected ? 'var(--sim-accent)' : 'var(--sim-chip)',
              color: selected ? 'var(--sim-bg)' : 'var(--sim-number)',
            }}
            onClick={e => { e.stopPropagation(); onSelect(); }}
          >
            {selected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  );
}
