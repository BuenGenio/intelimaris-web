/**
 * Bahia Mar berths for the "Which berths fit you" journey.
 *
 * Berth ids and length limits are as the product shows them for Bahia Mar
 * (A-01 18 m, A-02 24 m, A-03 30 m, A-04 15 m, B-01 25 m, B-02 22 m, C-01 no
 * stated limit, D-01 20 m closed). Everything else per berth — beam limit,
 * depth and datum, sounding age, entry heading and mode, tie side, kind,
 * hardware, the seven-day occupancy and the plan geometry — is sample data.
 */

export type OccupancyState = 'closed' | 'resident' | 'courtesy' | 'assigned' | 'free'
export type BerthKind = 'slip' | 'side-to' | 'med-moor' | 'mooring ball' | 'dry stack' | 'lift'
export type EntryMode = 'bow-in' | 'stern-in' | 'alongside'
export type TieSide = 'port' | 'starboard' | 'either'
export type Access = 'assigned' | 'resident' | 'courtesy'

/** Plan units: the SVG viewBox is 900 × 600 and one metre is PLAN_SCALE px. */
export const PLAN_W = 900
export const PLAN_H = 600
export const PLAN_SCALE = 4.5

export interface BerthGeometry {
  x: number
  y: number
  w: number
  h: number
  /** the long axis of a vessel lying in the berth */
  axis: 'ns' | 'ew'
  /** the edge of the rectangle that touches the pier or quay */
  dock: 'n' | 's' | 'e' | 'w'
  /** rotation of the drawn vessel, 0 = bow up the plan, clockwise */
  bow: number
}

export interface Berth {
  id: string
  pier: string
  kind: BerthKind
  /** stated maximum length overall in metres; null = no stated limit */
  maxLoaM: number | null
  /** stated maximum beam in metres; null = no stated limit (sample) */
  maxBeamM: number | null
  /** depth at the berth in metres at the datum (sample) */
  depthM: number
  datum: string
  /** sounding age, e.g. "12 d ago" (sample) */
  sounded: string
  /** overhead clearance in metres for a covered berth; null = open sky (sample) */
  overheadM: number | null
  entryDeg: number
  mode: EntryMode
  tie: TieSide
  power: string
  mooring: string
  access: Access
  /** one state per day for the next seven days, today first (sample) */
  week: OccupancyState[]
  /** why the berth is closed, when it is (sample) */
  closedNote?: string
  geom: BerthGeometry
}

const m = (metres: number) => metres * PLAN_SCALE

/* Pier A hangs its slips south of a pier at y 120–132; pier B at y 330–342. */
const PIER_A_Y = 132
const PIER_B_Y = 342

export const BERTHS: Berth[] = [
  {
    id: 'A-01',
    pier: 'Pier A',
    kind: 'slip',
    maxLoaM: 18,
    maxBeamM: 5.5,
    depthM: 2.4,
    datum: 'MLLW',
    sounded: '12 d ago',
    overheadM: null,
    entryDeg: 330,
    mode: 'bow-in',
    tie: 'port',
    power: '50 A · 125 V',
    mooring: 'cleats · finger pier',
    access: 'assigned',
    week: ['assigned', 'assigned', 'free', 'free', 'free', 'assigned', 'assigned'],
    geom: { x: 742, y: PIER_A_Y, w: m(7.5), h: m(18), axis: 'ns', dock: 'n', bow: 0 },
  },
  {
    id: 'A-02',
    pier: 'Pier A',
    kind: 'slip',
    maxLoaM: 24,
    maxBeamM: 6.5,
    depthM: 2.7,
    datum: 'MLLW',
    sounded: '12 d ago',
    overheadM: null,
    entryDeg: 330,
    mode: 'stern-in',
    tie: 'starboard',
    power: '50 A · 250 V',
    mooring: 'cleats · finger pier',
    access: 'assigned',
    week: ['free', 'free', 'assigned', 'assigned', 'assigned', 'free', 'free'],
    geom: { x: 696, y: PIER_A_Y, w: m(8.5), h: m(24), axis: 'ns', dock: 'n', bow: 180 },
  },
  {
    id: 'A-03',
    pier: 'Pier A',
    kind: 'slip',
    maxLoaM: 30,
    maxBeamM: 8,
    depthM: 3.2,
    datum: 'MLLW',
    sounded: '12 d ago',
    overheadM: null,
    entryDeg: 330,
    mode: 'stern-in',
    tie: 'either',
    power: '100 A · 250 V',
    mooring: 'cleats · pilings',
    access: 'assigned',
    week: ['assigned', 'free', 'free', 'free', 'free', 'free', 'assigned'],
    geom: { x: 642, y: PIER_A_Y, w: m(10), h: m(30), axis: 'ns', dock: 'n', bow: 180 },
  },
  {
    id: 'A-04',
    pier: 'Pier A',
    kind: 'slip',
    maxLoaM: 15,
    maxBeamM: 5,
    depthM: 1.8,
    datum: 'MLLW',
    sounded: '12 d ago',
    overheadM: 4.5,
    entryDeg: 330,
    mode: 'bow-in',
    tie: 'port',
    power: '30 A · 125 V',
    mooring: 'cleats · finger pier',
    access: 'resident',
    week: ['resident', 'resident', 'resident', 'resident', 'resident', 'resident', 'resident'],
    geom: { x: 598, y: PIER_A_Y, w: m(7), h: m(15), axis: 'ns', dock: 'n', bow: 0 },
  },
  {
    id: 'B-01',
    pier: 'Pier B',
    kind: 'slip',
    maxLoaM: 25,
    maxBeamM: 7,
    depthM: 2.4,
    datum: 'MLLW',
    sounded: '3 d ago',
    overheadM: null,
    entryDeg: 330,
    mode: 'stern-in',
    tie: 'starboard',
    power: '100 A · 250 V',
    mooring: 'cleats · pilings',
    access: 'assigned',
    week: ['free', 'assigned', 'assigned', 'free', 'free', 'free', 'free'],
    geom: { x: 736, y: PIER_B_Y, w: m(9), h: m(25), axis: 'ns', dock: 'n', bow: 180 },
  },
  {
    id: 'B-02',
    pier: 'Pier B',
    kind: 'slip',
    maxLoaM: 22,
    maxBeamM: 6.5,
    depthM: 2.1,
    datum: 'MLLW',
    sounded: '3 d ago',
    overheadM: null,
    entryDeg: 330,
    mode: 'bow-in',
    tie: 'port',
    power: '50 A · 250 V',
    mooring: 'cleats · finger pier',
    access: 'courtesy',
    week: ['free', 'courtesy', 'courtesy', 'courtesy', 'free', 'free', 'free'],
    geom: { x: 686, y: PIER_B_Y, w: m(8.5), h: m(22), axis: 'ns', dock: 'n', bow: 0 },
  },
  {
    id: 'C-01',
    pier: 'T-head, pier B',
    kind: 'side-to',
    maxLoaM: null,
    maxBeamM: null,
    depthM: 3.6,
    datum: 'MLLW',
    sounded: '3 d ago',
    overheadM: null,
    entryDeg: 330,
    mode: 'alongside',
    tie: 'starboard',
    power: '100 A · 480 V · 3-phase',
    mooring: 'bollards · cleats',
    access: 'assigned',
    week: ['free', 'free', 'assigned', 'assigned', 'assigned', 'assigned', 'free'],
    geom: { x: 498, y: 226, w: m(11), h: m(44), axis: 'ns', dock: 'e', bow: 0 },
  },
  {
    id: 'D-01',
    pier: 'South quay',
    kind: 'side-to',
    maxLoaM: 20,
    maxBeamM: null,
    depthM: 2.6,
    datum: 'MLLW',
    sounded: '27 d ago',
    overheadM: null,
    entryDeg: 240,
    mode: 'alongside',
    tie: 'port',
    power: '50 A · 250 V',
    mooring: 'cleats',
    access: 'assigned',
    week: ['closed', 'closed', 'closed', 'closed', 'closed', 'free', 'free'],
    closedNote: 'closed for pile repair',
    geom: { x: 596, y: 492, w: m(20), h: m(9.5), axis: 'ew', dock: 's', bow: 270 },
  },
]

export interface VesselDims {
  /** all in feet */
  loa: number
  beam: number
  draft: number
  airDraft: number
}

export interface SampleVessel extends VesselDims {
  id: string
  name: string
}

/** Sample vessels the visitor can pick instead of typing. */
export const SAMPLE_VESSELS: SampleVessel[] = [
  { id: 'cruiser', name: '35 ft cruiser', loa: 35, beam: 12, draft: 3, airDraft: 14 },
  { id: 'sail', name: '50 ft sailing yacht', loa: 50, beam: 14.5, draft: 7, airDraft: 68 },
  { id: 'sportfish', name: '62 ft sportfish', loa: 62, beam: 18, draft: 5.5, airDraft: 32 },
  { id: 'catamaran', name: '45 ft catamaran', loa: 45, beam: 25, draft: 4, airDraft: 62 },
  { id: 'motoryacht', name: '78 ft motor yacht', loa: 78, beam: 20, draft: 6.5, airDraft: 26 },
]

export const STATE_LABEL: Record<OccupancyState, string> = {
  free: 'free',
  assigned: 'assigned',
  resident: 'resident',
  courtesy: 'courtesy',
  closed: 'closed',
}
