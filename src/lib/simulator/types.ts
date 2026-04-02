// Simulator — shared types
// Field names match the actual JSON source data (Phase 1 verified)

// ── Modes ──────────────────────────────────────────────────────────────────────

export type SimulatorMode =
  | 'visual'
  | 'planetary_color'
  | 'planetary_mono'
  | 'dso_color'
  | 'dso_mono';

/** True when the mode involves a camera (not eyepiece) */
export function isPhotoMode(mode: SimulatorMode): boolean {
  return mode !== 'visual';
}

/** True when the mode is for deep sky objects (requires EQ mount) */
export function isDSOMode(mode: SimulatorMode): boolean {
  return mode === 'dso_color' || mode === 'dso_mono';
}

/** True when the mode uses a filter wheel (mono modes) */
export function isMonoMode(mode: SimulatorMode): boolean {
  return mode === 'planetary_mono' || mode === 'dso_mono';
}

/** True when the mode uses an ADC (planetary modes) */
export function isPlanetaryMode(mode: SimulatorMode): boolean {
  return mode === 'planetary_color' || mode === 'planetary_mono';
}

export type MountType = 'none' | 'altaz' | 'altaz_goto' | 'eq_manual' | 'eq_goto' | 'dobsonian';
export type TargetCategory = 'dso' | 'solar_system' | 'comet';

// ── Equipment ─────────────────────────────────────────────────────────────────

export interface Telescope {
  id: string;
  name: string;
  brand: string;
  design: string;
  aperture: number;         // aperture_mm
  fl: number;               // focal_length_mm
  fr: number;               // focal_ratio
  rear: string | null;      // rear_connection_thread (normalized)
  bf: number | null;        // backfocus_available_mm
  weight_kg: number | null; // tube_weight_kg or total_weight_kg
  image_url: string | null; // product image (null until scraper updated)
  price: number;
  url: string;
  imaging: boolean | null;
  is_ota_only: boolean;              // false means the scope comes bundled with a mount
  bundled_mount_type: MountType | null; // mount type included, only set when is_ota_only=false
}

export interface Camera {
  id: string;
  name: string;
  brand: string;
  w: number;                // sensor_width_mm
  h: number;                // sensor_height_mm
  px: number;               // pixel_size_um
  mpx: number | null;       // resolution_mpx
  color: boolean;           // is_color
  cooling: boolean;         // cooling
  connection: string | null; // telescope_connection (normalized)
  flange: number;           // flange_focal_distance_mm (0 if unknown)
  category: string;         // camera_category
  image_url: string | null;
  price: number;
  url: string;
}

export interface Barlow {
  id: string;
  name: string;
  brand: string;
  factor: number;           // magnification
  barrel: number;           // barrel_diameter_inch
  connectionIn: string | null;  // derived from barrel
  connectionOut: string | null; // camera_connection (default T2)
  image_url: string | null;
  price: number;
  url: string;
}

export interface Corrector {
  id: string;
  name: string;
  brand: string;
  correctorType: string;    // Reducer / Flattener / Coma corrector / etc.
  factor: number;           // focal_reduction (1.0 for pure flatteners)
  connectionIn: string | null;
  connectionOut: string | null;
  backfocus: number | null; // focal_plane_distance_mm
  image_url: string | null;
  price: number;
  url: string;
}

/** Union type for the Lens slot (Barlow or Corrector) */
export type LensItem = Barlow | Corrector;

export interface Adapter {
  id: string;
  name: string;
  brand: string;
  connectionIn: string | null;
  connectionOut: string | null;
  opticalPath: number | null;
  price: number;
  url: string;
}

export interface ADC {
  id: string;
  name: string;
  brand: string;
  connectionIn: string | null;
  connectionOut: string | null;
  image_url: string | null;
  price: number;
  url: string;
}

export interface Mount {
  id: string;
  name: string;
  brand: string;
  mountType: MountType | null;
  payload_kg: number | null;
  includes_tripod: boolean | null;
  image_url: string | null;
  price: number;
  url: string;
}

export interface Eyepiece {
  id: string;
  name: string;
  brand: string;
  fl: number;               // focal_length_mm
  afov: number | null;      // afov_deg
  barrel: number | null;    // barrel_diameter_inch
  eye_relief: number | null; // eye_relief_mm
  image_url: string | null;
  price: number;
  url: string;
}

export interface Filter {
  id: string;
  name: string;
  brand: string;
  filterType: string;       // filter_type (planetary / LP / narrowband / etc.)
  size_mm: number | null;
  barrel: number | null;    // barrel_diameter_inch
  image_url: string | null;
  price: number;
  url: string;
}

export interface FilterWheel {
  id: string;
  name: string;
  brand: string;
  positions: number | null; // slot_count
  filterSize: string;       // filter_slot_size
  connectionIn: string | null;
  connectionOut: string | null;
  opticalPath: number | null;
  image_url: string | null;
  price: number;
  url: string;
}

export interface Focuser {
  id: string;
  name: string;
  brand: string;
  focuserType: string;
  travel_mm: number | null;
  connection: string | null;
  is_motorized: boolean | null;
  image_url: string | null;
  price: number;
  url: string;
}

export interface OAG {
  id: string;
  name: string;
  brand: string;
  connectionIn: string | null;
  connectionOut: string | null;
  opticalPath: number | null;
  image_url: string | null;
  price: number;
  url: string;
}

export interface Diagonal {
  id: string;
  name: string;
  brand: string;
  diagonalType: string;
  connectionIn: string | null;
  connectionOut: string | null;
  opticalPath: number | null;
  image_url: string | null;
  price: number;
  url: string;
}

export interface GuideScope {
  id: string;
  name: string;
  brand: string;
  aperture: number | null;
  fl: number;
  connection: string | null;
  weight_kg: number | null;
  image_url: string | null;
  price: number;
  url: string;
}

export type ControllerCategory = 'asiair' | 'minipc' | 'rpi';

export interface Controller {
  id: string;
  name: string;
  brand: string;
  category: ControllerCategory;
  price: number;
  notes: string;
  image_url: string | null;
  url: string;
}

// ── Sky targets ───────────────────────────────────────────────────────────────

export interface DSO {
  id: string;
  name: string;
  type: 'galaxy' | 'nebula' | 'cluster' | 'other';
  ra: number;               // degrees
  dec: number;              // degrees
  size_arcmin: number;
  mag: number;
}

export interface SolarSystemObject {
  id: string;
  name: string;
  minSize_arcsec: number;
  maxSize_arcsec: number;
  typicalSize_arcsec: number;
  notes: string;
  isSun?: boolean;
}

export interface Comet {
  id: string;
  name: string;
  ra: number;
  dec: number;
  size_arcsec: number;      // coma diameter
  notes: string;
}

export type AnyTarget = DSO | SolarSystemObject | Comet;

// ── Optics results ────────────────────────────────────────────────────────────

export interface SeeingCase {
  seeing_arcsec: number;
  label: string;
  idealPixelSize_um: number;
  assessment: 'oversampled' | 'matched' | 'undersampled';
  description: string;
}

export interface SamplingResult {
  ratio: number;
  status: 'over' | 'good' | 'under';
  label: string;
  nyquistLimit: number;
  seeingLimited: {
    good: SeeingCase;
    average: SeeingCase;
    poor: SeeingCase;
  };
}

export interface MaxMagResult {
  theoretical: number;
  rayleighLimit: number;
  typical: number;
  exitPupilAt: number;
}

export interface DSOFit {
  status: 'too_big' | 'good' | 'small' | 'tiny';
  label: string;
  fillPct: number;
}

export interface BackfocusResult {
  available_mm: number;
  used_mm: number;
  remaining_mm: number;
  status: 'ok' | 'tight' | 'over'; // >10mm / 0–10mm / <0mm
}

export interface OpticsResult {
  effectiveFL: number;
  effectiveFR: number;
  // Imaging mode
  fovW_deg: number;
  fovH_deg: number;
  fovW_arcmin: number;
  fovH_arcmin: number;
  imageScale: number;       // arcsec/px
  sampling: SamplingResult | null;
  // Visual mode
  magnification: number;   // telescope FL / eyepiece FL
  exitPupil: number;       // eyepiece fl / effective fr (mm)
  // Shared
  rayleigh: number;
  dawes: number;
  maxUsefulMag: MaxMagResult;
  dsoFit: DSOFit | null;
  backfocus: BackfocusResult | null;
}

// ── Compatibility ─────────────────────────────────────────────────────────────

export interface CompatibilityIssue {
  type:
    | 'adapter'
    | 'backfocus'
    | 'mount'
    | 'sampling'
    | 'focal_ratio'
    | 'flattener'
    | 'recommendation'
    | 'combo';
  severity: 'error' | 'warning' | 'info';
  message: string;
  action?: string;
  suggestedAdapters?: Adapter[];
}

// ── Rig chain state ───────────────────────────────────────────────────────────

export interface RigChain {
  mode: SimulatorMode;
  telescope: Telescope | null;
  diagonal: Diagonal | null;   // visual only
  lens: LensItem | null;       // Barlow or Corrector
  adc: ADC | null;             // planetary modes
  filterWheel: FilterWheel | null; // mono modes
  filters: Filter[];
  oag: OAG | null;             // dso_mono
  focuser: Focuser | null;     // dso modes (EAF)
  camera: Camera | null;       // photo modes
  eyepiece: Eyepiece | null;   // visual only
  mount: Mount | null;
  controller: Controller | null; // photo modes — informational
  guideScope: GuideScope | null; // dso modes
  guideCamera: Camera | null;    // dso modes
}

/** Slot keys that appear in the rig chain */
export type SlotKey =
  | 'telescope'
  | 'diagonal'
  | 'lens'
  | 'adc'
  | 'filterWheel'
  | 'filters'
  | 'oag'
  | 'focuser'
  | 'camera'
  | 'eyepiece'
  | 'mount'
  | 'controller'
  | 'guideScope'
  | 'guideCamera';

/** Returns the ordered list of slot keys for a given mode */
export function getSlotsForMode(mode: SimulatorMode): SlotKey[] {
  switch (mode) {
    case 'visual':
      return ['telescope', 'diagonal', 'lens', 'filters', 'eyepiece', 'mount'];
    case 'planetary_color':
      return ['telescope', 'lens', 'adc', 'filters', 'camera', 'mount', 'controller'];
    case 'planetary_mono':
      return ['telescope', 'lens', 'adc', 'filterWheel', 'filters', 'camera', 'mount', 'controller'];
    case 'dso_color':
      return ['telescope', 'lens', 'filters', 'focuser', 'camera', 'mount', 'controller', 'guideScope', 'guideCamera'];
    case 'dso_mono':
      return ['telescope', 'lens', 'filterWheel', 'filters', 'oag', 'focuser', 'camera', 'mount', 'controller', 'guideScope', 'guideCamera'];
  }
}

/** Optional slots (can be absent without breaking the chain) */
export const OPTIONAL_SLOTS = new Set<SlotKey>([
  'diagonal', 'lens', 'adc', 'filterWheel', 'filters', 'oag', 'focuser',
  'controller', 'guideScope', 'guideCamera',
]);

export function emptyRig(mode: SimulatorMode): RigChain {
  return {
    mode,
    telescope: null,
    diagonal: null,
    lens: null,
    adc: null,
    filterWheel: null,
    filters: [],
    oag: null,
    focuser: null,
    camera: null,
    eyepiece: null,
    mount: null,
    controller: null,
    guideScope: null,
    guideCamera: null,
  };
}
