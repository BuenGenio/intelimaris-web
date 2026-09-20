/**
 * Planning for the "Drop a hazard, watch the route move" journey.
 *
 * Pure functions over the shared water router: which cells a set of hazards
 * blocks, which cells they slow, how long the passage takes at cruise speed,
 * and what each hazard does to the track. The component owns state and
 * drawing; this module owns the arithmetic so it can be tested on its own.
 *
 * Timing is illustrative: one cruise speed, one no-wake speed, no tide.
 */
import {
  NM_PER_CELL,
  PLACES,
  GRID_W,
  cellOf,
  disc,
  isWater,
  route,
  type Point,
  type RouteResult,
} from './waterRouter'

/* The kinds the product serves from its taxonomy, by their served keys; the five a
   passage on this water can meet. Severity is a word before it is a colour: a storm
   cell or a disabled vessel rings red, everything else rings the chart's magenta. */
export type HazardKind = 'debris' | 'shallow' | 'disabled_vessel' | 'storm' | 'wildlife'
export type HazardStatus = 'reported' | 'confirmed' | 'cleared'

export interface HazardType {
  kind: HazardKind
  label: string
  /** one line, plain words, what it does to your passage */
  meaning: string
  /** default ring radius in grid cells */
  radius: number
  /** true: the planner routes around it; false: it slows you but the track stays */
  blocks: boolean
  /** live and severe: the ring is red, not magenta */
  severe: boolean
}

export const CRUISE_KN = 8.4
export const NO_WAKE_KN = 5
export const RADIUS_MIN = 3
export const RADIUS_MAX = 8
/** one grid cell is about 24 m on this basemap */
export const METRES_PER_CELL = Math.round(1852 * NM_PER_CELL)

export const HAZARD_TYPES: readonly HazardType[] = [
  { kind: 'debris', label: 'Debris', meaning: 'Something is in the water here. The planner goes around it.', radius: 3, blocks: true, severe: false },
  { kind: 'shallow', label: 'Shoaling', meaning: 'Shallow water. The planner goes around it.', radius: 5, blocks: true, severe: false },
  { kind: 'disabled_vessel', label: 'Disabled vessel', meaning: 'An obstruction, live. The planner goes around it.', radius: 4, blocks: true, severe: true },
  { kind: 'storm', label: 'Storm cell', meaning: 'Do not go through here. The planner goes around it.', radius: 6, blocks: true, severe: true },
  { kind: 'wildlife', label: 'Manatee zone', meaning: `A rule applies here: ${NO_WAKE_KN} kn inside. The track stays.`, radius: 6, blocks: false, severe: false },
]

export const typeOf = (kind: HazardKind): HazardType => HAZARD_TYPES.find((t) => t.kind === kind)!

export interface Hazard {
  id: number
  kind: HazardKind
  at: Point
  radius: number
  status: HazardStatus
  /** ms timestamps for age on the card and for the ring's fade */
  reportedAt: number
  confirmedAt?: number
  clearedAt?: number
  /** the ring's cells, computed once */
  cells: number[]
}

export const FROM = PLACES.sunriseBay
export const TO = PLACES.bahiaMar

export const clampRadius = (r: number): number => Math.min(RADIUS_MAX, Math.max(RADIUS_MIN, Math.round(r)))

export const onWater = (p: Point): boolean => {
  const c = cellOf(p)
  return isWater(c % GRID_W, Math.floor(c / GRID_W))
}

export function makeHazard(id: number, kind: HazardKind, at: Point, radius: number, now: number): Hazard {
  const r = clampRadius(radius)
  return { id, kind, at, radius: r, status: 'reported', reportedAt: now, cells: disc(at, r) }
}

export const isActive = (h: Hazard): boolean => h.status !== 'cleared'

/** cells the planner must avoid: every active blocking hazard */
export function blockedCells(hazards: readonly Hazard[]): Set<number> {
  const out = new Set<number>()
  for (const h of hazards) if (isActive(h) && typeOf(h.kind).blocks) for (const c of h.cells) out.add(c)
  return out
}

/** cells where you slow to the no-wake speed */
export function slowCells(hazards: readonly Hazard[]): Set<number> {
  const out = new Set<number>()
  for (const h of hazards) if (isActive(h) && !typeOf(h.kind).blocks) for (const c of h.cells) out.add(c)
  return out
}

const stepNm = (a: number, b: number): number =>
  Math.hypot((a % GRID_W) - (b % GRID_W), Math.floor(a / GRID_W) - Math.floor(b / GRID_W)) * NM_PER_CELL

/** unrounded track length in NM (the router rounds to 0.1, too coarse for a delta) */
export function trackLengthNm(cells: readonly number[]): number {
  let nm = 0
  for (let i = 1; i < cells.length; i++) nm += stepNm(cells[i - 1]!, cells[i]!)
  return nm
}

/** distance along the track that runs inside slow cells, in NM */
export function slowDistanceNm(cells: readonly number[], slow: ReadonlySet<number>): number {
  let nm = 0
  for (let i = 1; i < cells.length; i++) if (slow.has(cells[i]!)) nm += stepNm(cells[i - 1]!, cells[i]!)
  return nm
}

/** minutes for the passage at cruise speed, at the no-wake speed inside slow cells */
export function passageMinutes(cells: readonly number[], slow: ReadonlySet<number>): number {
  const total = trackLengthNm(cells)
  const inZone = slowDistanceNm(cells, slow)
  return ((total - inZone) / CRUISE_KN + inZone / NO_WAKE_KN) * 60
}

export interface Plan {
  result: RouteResult
  lengthNm: number
  minutes: number
  slowNm: number
}

export function plan(hazards: readonly Hazard[]): Plan {
  const result = route({ from: FROM, to: TO, blocked: blockedCells(hazards) })
  const slow = slowCells(hazards)
  return {
    result,
    lengthNm: trackLengthNm(result.cells),
    minutes: passageMinutes(result.cells, slow),
    slowNm: slowDistanceNm(result.cells, slow),
  }
}

export interface HazardEffect {
  /** the planned track (before any hazard) ran through this ring */
  onPlanned: boolean
  /** the current track runs through this ring */
  onTrack: boolean
  /** one sentence for the card */
  text: string
}

export function hazardEffect(h: Hazard, current: Plan, planned: Plan): HazardEffect {
  const ring = new Set(h.cells)
  /* while the planner refuses there is no current track; judge against the planned one */
  const track = current.result.ok ? current.result.cells : planned.result.cells
  const onPlanned = planned.result.cells.some((c) => ring.has(c))
  const onTrack = track.some((c) => ring.has(c))
  const type = typeOf(h.kind)
  if (h.status === 'cleared') return { onPlanned, onTrack, text: 'Cleared. The track relaxes back.' }
  if (type.blocks) {
    if (ring.has(cellOf(TO))) return { onPlanned, onTrack, text: 'Covers Bahia Mar. No route reaches the berth.' }
    if (ring.has(cellOf(FROM))) return { onPlanned, onTrack, text: 'Covers Sunrise Bay. No route leaves it.' }
    if (!current.result.ok) return { onPlanned, onTrack, text: onPlanned ? 'On the planned track.' : 'Off the track.' }
    if (onPlanned) return { onPlanned, onTrack, text: 'On the planned track. The route goes around it.' }
    return { onPlanned, onTrack, text: 'Off the track. No detour needed.' }
  }
  if (onTrack) {
    const nm = slowDistanceNm(track, ring)
    const extra = (nm / NO_WAKE_KN - nm / CRUISE_KN) * 60
    return {
      onPlanned,
      onTrack,
      text: `On the track. ${nm.toFixed(2)} NM at ${NO_WAKE_KN} kn, about +${Math.max(1, Math.round(extra))} min.`,
    }
  }
  return { onPlanned, onTrack, text: 'Off the track. No change.' }
}

export const signed = (n: number, digits: number): string => `${n >= 0 ? '+' : '−'}${Math.abs(n).toFixed(digits)}`

/** "+0.2 NM · +1 min at 8.4 kn" — or, for a zone, the slower speed */
export function deltaText(current: Plan, planned: Plan): string {
  const dNm = current.lengthNm - planned.lengthNm
  const dMin = Math.round(current.minutes - planned.minutes)
  const nmPart = Math.abs(dNm) < 0.05 ? 'same distance' : `${signed(dNm, 1)} NM`
  const minPart = dMin === 0 ? 'same time' : `${signed(dMin, 0)} min`
  const speed = current.slowNm > 0 ? `${NO_WAKE_KN} kn in the zone` : `at ${CRUISE_KN} kn`
  return `${nmPart} · ${minPart} ${speed}`
}

/** the point a fraction of the way along a track */
export function pointAlong(points: readonly Point[], fraction: number): Point {
  const i = Math.min(points.length - 1, Math.max(0, Math.round((points.length - 1) * fraction)))
  return points[i] ?? FROM
}

/** what the keyboard button drops, in order, so the re-plan is reachable without a pointer */
export const SAMPLE_HAZARDS: readonly { kind: HazardKind; fraction: number; radius: number }[] = [
  { kind: 'shallow', fraction: 0.5, radius: 5 },
  { kind: 'wildlife', fraction: 0.72, radius: 7 },
  { kind: 'debris', fraction: 0.27, radius: 4 },
  { kind: 'disabled_vessel', fraction: 0.6, radius: 6 },
]
