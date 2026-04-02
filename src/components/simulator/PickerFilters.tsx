'use client';
import type { SlotKey } from '@/lib/simulator/types';

export interface FilterState {
  search: string;
  brand: string;
  sub1: string;   // design / type / correctorType / etc.
  sub2: string;   // second filter (e.g. size, payload range)
  showIncompatible: boolean;
  sortOrder: 'price_asc' | 'price_desc' | 'name_asc';
}

interface Props {
  slot: SlotKey;
  brands: string[];
  sub1Options: string[];
  sub1Label: string;
  sub2Options?: string[];
  sub2Label?: string;
  filters: FilterState;
  onChange: (f: FilterState) => void;
}

function Select({
  label, value, options, onChange,
}: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  if (options.length === 0) return null;
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="text-xs px-2 py-1 rounded"
      style={{ background: 'var(--sim-chip)', color: value ? 'var(--sim-number)' : 'var(--sim-muted)', border: '1px solid var(--sim-border)' }}
    >
      <option value="">{label} ▾</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export default function PickerFilters({
  slot, brands, sub1Options, sub1Label, sub2Options, sub2Label, filters, onChange,
}: Props) {
  const set = (patch: Partial<FilterState>) => onChange({ ...filters, ...patch });
  const anyActive = filters.search || filters.brand || filters.sub1 || filters.sub2;

  return (
    <div className="flex flex-col gap-2 px-3 py-2" style={{ borderBottom: '1px solid var(--sim-border)' }}>
      {/* Search */}
      <input
        type="text"
        placeholder={`Search ${slot}...`}
        value={filters.search}
        onChange={e => set({ search: e.target.value })}
        className="w-full text-xs px-3 py-1.5 rounded"
        style={{ background: 'var(--sim-chip)', color: 'var(--sim-number)', border: '1px solid var(--sim-border)' }}
      />
      {/* Dropdowns row */}
      <div className="flex flex-wrap gap-1.5 items-center">
        <Select label="Brand" value={filters.brand} options={brands} onChange={v => set({ brand: v })} />
        <Select label={sub1Label} value={filters.sub1} options={sub1Options} onChange={v => set({ sub1: v })} />
        {sub2Options && sub2Label && (
          <Select label={sub2Label} value={filters.sub2} options={sub2Options} onChange={v => set({ sub2: v })} />
        )}
        {/* Sort */}
        <select
          value={filters.sortOrder}
          onChange={e => set({ sortOrder: e.target.value as FilterState['sortOrder'] })}
          className="text-xs px-2 py-1 rounded"
          style={{ background: 'var(--sim-chip)', color: 'var(--sim-number)', border: '1px solid var(--sim-border)' }}
        >
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
          <option value="name_asc">Name A–Z</option>
        </select>
        {anyActive && (
          <button
            onClick={() => onChange({ search: '', brand: '', sub1: '', sub2: '', showIncompatible: filters.showIncompatible, sortOrder: filters.sortOrder })}
            className="text-[10px] px-2 py-1 rounded"
            style={{ color: 'var(--sim-error)', background: 'var(--sim-chip)' }}
          >
            Clear ×
          </button>
        )}
      </div>
      {/* Show incompatible toggle */}
      <label className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: 'var(--sim-muted)' }}>
        <span
          className="w-8 h-4 rounded-full relative transition-colors"
          style={{ background: filters.showIncompatible ? 'var(--sim-accent)' : 'var(--sim-chip)', border: '1px solid var(--sim-border)' }}
          onClick={() => set({ showIncompatible: !filters.showIncompatible })}
        >
          <span
            className="absolute top-0.5 w-3 h-3 rounded-full transition-transform"
            style={{
              background: 'white',
              left: filters.showIncompatible ? '16px' : '2px',
            }}
          />
        </span>
        Show incompatible
      </label>
    </div>
  );
}
