'use client';
import { useState, useMemo, useEffect } from 'react';
import type {
  SlotKey, RigChain, LensItem, Telescope, Camera, Barlow, Corrector,
  ADC, Mount, Eyepiece, Filter, FilterWheel, Focuser, OAG, Diagonal,
  GuideScope, Controller, OpticsResult,
} from '@/lib/simulator/types';
import { calcEyepieceFOV, getLensFactor } from '@/lib/simulator/optics';
import { normalizeConn } from '@/lib/simulator/compatibility';
import { TELESCOPES }    from '@/data/simulator/telescopes';
import { CAMERAS }       from '@/data/simulator/cameras';
import { BARLOWS }       from '@/data/simulator/barlows';
import { CORRECTORS }    from '@/data/simulator/correctors';
import { ADCS }          from '@/data/simulator/adcs';
import { MOUNTS }        from '@/data/simulator/mounts';
import { EYEPIECES }     from '@/data/simulator/eyepieces';
import { FILTERS }       from '@/data/simulator/filters';
import { FILTER_WHEELS } from '@/data/simulator/filter_wheels';
import { FOCUSERS }      from '@/data/simulator/focusers';
import { OAGS }          from '@/data/simulator/oags';
import { DIAGONALS }     from '@/data/simulator/diagonals';
import { GUIDE_SCOPES }  from '@/data/simulator/guide_scopes';
import { CONTROLLERS }   from '@/data/simulator/controllers';
import EquipmentCard from './EquipmentCard';
import PickerFilters, { type FilterState } from './PickerFilters';
import EquipmentDetailModal from './EquipmentDetailModal';

type AnyItem = Telescope | Camera | LensItem | ADC | Mount | Eyepiece | Filter | FilterWheel | Focuser | OAG | Diagonal | GuideScope | Controller;

interface Props {
  slot: SlotKey;
  rig: RigChain;
  optics: OpticsResult | null;
  owned: Set<string>;
  wanted: Set<string>;
  onToggleOwned: (id: string) => void;
  onToggleWanted: (id: string) => void;
  onSelect: (slot: SlotKey, item: AnyItem | null) => void;
  onBack: () => void;
}

const SLOT_LABELS: Record<SlotKey, string> = {
  telescope:   'Telescope',
  diagonal:    'Diagonal',
  lens:        'Lens',
  adc:         'ADC',
  filterWheel: 'Filter Wheel',
  filters:     'Filter',
  oag:         'OAG',
  focuser:     'Focuser / EAF',
  camera:      'Camera',
  eyepiece:    'Eyepiece',
  mount:       'Mount',
  controller:  'Controller',
  guideScope:  'Guide Scope',
  guideCamera: 'Guide Camera',
};

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

function getItems(slot: SlotKey): AnyItem[] {
  switch (slot) {
    case 'telescope':   return TELESCOPES;
    case 'camera':      return CAMERAS;
    case 'guideCamera': return CAMERAS.filter(c => c.category === 'planetary' || c.category === 'guiding');
    case 'lens':        return [...BARLOWS, ...CORRECTORS] as LensItem[];
    case 'adc':         return ADCS;
    case 'mount':       return MOUNTS;
    case 'eyepiece':    return EYEPIECES;
    case 'filters':     return FILTERS;
    case 'filterWheel': return FILTER_WHEELS;
    case 'focuser':     return FOCUSERS;
    case 'oag':         return OAGS;
    case 'diagonal':    return DIAGONALS;
    case 'guideScope':  return GUIDE_SCOPES;
    case 'controller':  return CONTROLLERS;
    default:            return [];
  }
}

function getSelectedId(slot: SlotKey, rig: RigChain): string | null {
  const v = rig[slot as keyof RigChain];
  if (!v || Array.isArray(v)) return null;
  return (v as { id?: string }).id ?? null;
}

function uniqueSorted(arr: (string | null | undefined)[]): string[] {
  const filtered = arr.filter((v): v is string => typeof v === 'string' && v.length > 0);
  return Array.from(new Set(filtered)).sort();
}

function getFilterConfig(slot: SlotKey) {
  switch (slot) {
    case 'telescope': return {
      sub1Label: 'Design',
      getSub1: (i: AnyItem) => (i as Telescope).design,
      sub2Label: undefined, getSub2: undefined,
    };
    case 'camera':
    case 'guideCamera': return {
      sub1Label: 'Type',
      getSub1: (i: AnyItem) => (i as Camera).category,
      sub2Label: 'Color/Mono',
      getSub2: (i: AnyItem) => (i as Camera).color ? 'Color' : 'Mono',
    };
    case 'lens': return {
      sub1Label: 'Type',
      getSub1: (i: AnyItem) => 'correctorType' in i ? (i as Corrector).correctorType : 'Barlow',
      sub2Label: undefined, getSub2: undefined,
    };
    case 'mount': return {
      sub1Label: 'Type',
      getSub1: (i: AnyItem) => (i as Mount).mountType ?? '',
      sub2Label: undefined, getSub2: undefined,
    };
    case 'eyepiece': return {
      sub1Label: 'Barrel',
      getSub1: (i: AnyItem) => {
        const b = (i as Eyepiece).barrel;
        return b ? `${b}"` : '';
      },
      sub2Label: 'AFOV',
      getSub2: (i: AnyItem) => {
        const a = (i as Eyepiece).afov;
        return a ? `${a}°` : '';
      },
    };
    case 'filters': return {
      sub1Label: 'Type',
      getSub1: (i: AnyItem) => (i as Filter).filterType,
      sub2Label: undefined, getSub2: undefined,
    };
    case 'filterWheel': return {
      sub1Label: 'Positions',
      getSub1: (i: AnyItem) => {
        const p = (i as FilterWheel).positions;
        return p ? `${p}-pos` : '';
      },
      sub2Label: undefined, getSub2: undefined,
    };
    case 'controller': return {
      sub1Label: 'Type',
      getSub1: (i: AnyItem) => (i as Controller).category,
      sub2Label: undefined, getSub2: undefined,
    };
    default: return {
      sub1Label: 'Type', getSub1: () => '', sub2Label: undefined, getSub2: undefined,
    };
  }
}

function formatFov(deg: number): string {
  if (deg < 1) {
    return `${(deg * 60).toFixed(0)}′ FOV`;
  }
  return `${deg.toFixed(2)}° FOV`;
}

function computeFovLabel(item: AnyItem, slot: SlotKey, rig: RigChain): string | undefined {
  const tel = rig.telescope;
  if (!tel) return undefined;
  const lens = rig.lens;
  const effectiveFL = tel.fl * getLensFactor(lens);

  if (slot === 'camera') {
    const cam = item as Camera;
    const R2D = 180 / Math.PI;
    const fovW = (cam.w / effectiveFL) * R2D;
    const fovH = (cam.h / effectiveFL) * R2D;
    return `${formatFov(fovW)} × ${formatFov(fovH)}`.replace(/ FOV/g, '').replace(/°/g, '°') + ' FOV';
  }

  if (slot === 'eyepiece') {
    const ep = item as Eyepiece;
    const afov = ep.afov ?? 60;
    const trueFov = calcEyepieceFOV(effectiveFL, ep.fl, afov);
    return formatFov(trueFov);
  }

  return undefined;
}

const DEFAULT_FILTERS: FilterState = {
  search: '', brand: '', sub1: '', sub2: '', showIncompatible: false, sortOrder: 'price_asc',
};

export default function PickerPanel({
  slot, rig, optics, owned, wanted, onToggleOwned, onToggleWanted, onSelect, onBack,
}: Props) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [detailItem, setDetailItem] = useState<AnyItem | null>(null);

  // Reset filters whenever we switch to a different slot
  useEffect(() => {
    setFilters(DEFAULT_FILTERS);
    setDetailItem(null);
  }, [slot]);

  const allItems = useMemo(() => getItems(slot), [slot]);
  const cfg = useMemo(() => getFilterConfig(slot), [slot]);

  const brands = useMemo(
    () => uniqueSorted(allItems.map(i => i.brand)),
    [allItems],
  );

  const sub1Options = useMemo(
    () => uniqueSorted(allItems.map(i => cfg.getSub1(i))),
    [allItems, cfg],
  );

  const sub2Options = useMemo(
    () => cfg.getSub2 ? uniqueSorted(allItems.map(i => cfg.getSub2!(i))) : [],
    [allItems, cfg],
  );

  const selectedId = getSelectedId(slot, rig);

  const filtered = useMemo(() => {
    const q = filters.search.toLowerCase();
    const base = allItems.filter(item => {
      if (q && !item.name.toLowerCase().includes(q) && !item.brand.toLowerCase().includes(q)) return false;
      if (filters.brand && item.brand !== filters.brand) return false;
      if (filters.sub1) {
        const v = cfg.getSub1(item);
        if (v !== filters.sub1) return false;
      }
      if (filters.sub2 && cfg.getSub2) {
        const v = cfg.getSub2(item);
        if (v !== filters.sub2) return false;
      }
      return true;
    });
    switch (filters.sortOrder) {
      case 'price_asc':  return [...base].sort((a, b) => a.price - b.price);
      case 'price_desc': return [...base].sort((a, b) => b.price - a.price);
      case 'name_asc':   return [...base].sort((a, b) => a.name.localeCompare(b.name));
      default:           return base;
    }
  }, [allItems, filters, cfg]);

  // FOV context line for camera/eyepiece slots
  const showFovContext = (slot === 'camera' || slot === 'eyepiece') && rig.telescope != null;

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--sim-bg)' }}>
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: 'var(--sim-border)', background: 'var(--sim-panel)' }}>
        <span className="text-base">{SLOT_ICONS[slot]}</span>
        <span className="text-sm font-semibold" style={{ color: 'var(--sim-number)' }}>
          Select {SLOT_LABELS[slot]}
        </span>
        <div className="ml-auto flex items-center gap-2">
          {getSelectedId(slot, rig) && (
            <button
              onClick={() => onSelect(slot, null)}
              className="text-[10px] px-2 py-1 rounded"
              style={{ color: 'var(--sim-error)', background: 'var(--sim-chip)' }}
            >
              Clear
            </button>
          )}
          <button
            onClick={onBack}
            className="text-[10px] px-2 py-1 rounded"
            style={{ color: 'var(--sim-muted)', background: 'var(--sim-chip)' }}
          >
            ← Rig
          </button>
        </div>
      </div>

      {/* FOV context line */}
      {showFovContext && (
        <div className="px-3 py-1.5 text-[10px]" style={{ background: 'rgba(0,229,160,0.05)', borderBottom: '1px solid rgba(0,229,160,0.15)', color: 'var(--sim-good)' }}>
          With {rig.telescope!.name} (FL {Math.round(getLensFactor(rig.lens) * rig.telescope!.fl)}mm) — FOV shown per item
        </div>
      )}

      {/* Controller info note */}
      {slot === 'controller' && (
        <div className="px-3 py-1.5 text-[10px]" style={{ background: 'rgba(245,166,35,0.05)', borderBottom: '1px solid rgba(245,166,35,0.15)', color: 'var(--sim-muted)' }}>
          Informational only — ASIAir works with ZWO cameras; Mini PC / RPi support all brands
        </div>
      )}

      {/* Filters */}
      <PickerFilters
        slot={slot}
        brands={brands}
        sub1Options={sub1Options}
        sub1Label={cfg.sub1Label}
        sub2Options={sub2Options.length > 0 ? sub2Options : undefined}
        sub2Label={cfg.sub2Label}
        filters={filters}
        onChange={f => setFilters(f)}
      />

      {/* Card grid */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="grid grid-cols-2 gap-2">
          {filtered.map(item => (
            <EquipmentCard
              key={item.id}
              item={item as AnyItem}
              slot={slot}
              selected={item.id === selectedId}
              onSelect={() => onSelect(slot, item as AnyItem)}
              onInfo={() => setDetailItem(item as AnyItem)}
              fovLabel={showFovContext ? computeFovLabel(item, slot, rig) : undefined}
              isOwned={owned.has(item.id)}
              isWanted={wanted.has(item.id)}
              onToggleOwned={e => { e.stopPropagation(); onToggleOwned(item.id); }}
              onToggleWanted={e => { e.stopPropagation(); onToggleWanted(item.id); }}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-xs" style={{ color: 'var(--sim-muted)' }}>
            No equipment matches your filters.
          </div>
        )}
        <div className="py-1 text-center text-[10px]" style={{ color: 'var(--sim-muted)' }}>
          {filtered.length} of {allItems.length} shown
        </div>
      </div>

      {/* Detail popup */}
      {detailItem && (
        <EquipmentDetailModal
          item={detailItem}
          slot={slot}
          selected={detailItem.id === selectedId}
          onSelect={() => onSelect(slot, detailItem)}
          onClose={() => setDetailItem(null)}
          isOwned={owned.has(detailItem.id)}
          isWanted={wanted.has(detailItem.id)}
          onToggleOwned={() => onToggleOwned(detailItem.id)}
          onToggleWanted={() => onToggleWanted(detailItem.id)}
        />
      )}
    </div>
  );
}
