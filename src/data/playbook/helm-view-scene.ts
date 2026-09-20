/**
 * Scene and arithmetic for the "Underway at the helm" journey: the WaterWayz
 * main screen as a working demo. The component owns state and drawing; this
 * module owns the passage, where the vessel is along it, and the numbers the
 * cards show, so they can be tested on their own.
 *
 * Everything is illustrative and says so on the surface where it is shown.
 */
import { GRID_H, GRID_W, NM_PER_CELL, PLACES, isWater, pointOf, route, type Point } from './waterRouter'
import { smoothTrack } from './passage-planner-vessels'

export const CRUISE_KN = 8.4
export const NO_WAKE_KN = 5

/** How much faster than life the demo runs: a quarter-hour passage in under a minute. */
export const TIME_SCALE = 24

export type ViewMode = 'helm' | 'above' | '3d'
export const VIEW_MODES: readonly { id: ViewMode; label: string; hint: string }[] = [
  { id: 'above', label: 'Above', hint: 'Straight down, north up — the chart as a plan.' },
  { id: 'helm', label: 'Helm', hint: 'The view from the helm — heading up, the water ahead is ahead.' },
  { id: '3d', label: '3D', hint: 'The chart at an angle — buildings and depth stand up.' },
]

/* A 42 ft trawler: the same hull the passage planner offers, so the two journeys agree. */
export const VESSEL = { name: 'MV Meridian', lengthFt: 42, draftFt: 4, airDraftFt: 21 } as const

export const DESTINATION = {
  ...PLACES.bahiaMar,
  short: 'Bahia Mar',
  kind: 'Marina',
  approachDepthFt: 13.1,
  berth: 'B-14',
  phone: '+1 954 627 6309',
} as const

/** A slow zone the track crosses near the bridge, in grid cells. */
export const NO_WAKE = { u: PLACES.lasOlasBridge.u, v: PLACES.lasOlasBridge.v + 0.03, radius: 8, label: 'No wake · Las Olas' } as const

export interface Reading {
  id: string
  label: string
  value: string
  unit?: string
  note: string
  /** how old the reading was when the page loaded, in ms */
  ageMs: number
}

/** The "Today on the water" strip: each number with its unit and its age. */
export const CONDITIONS: readonly Reading[] = [
  { id: 'tide', label: 'Tide', value: '2.1', unit: 'ft MLLW', note: 'Rising ↑ 0.3 ft/hr', ageMs: 6 * 60_000 },
  { id: 'wind', label: 'Wind', value: 'SE 9', unit: 'kn', note: 'Gusts 14 kn', ageMs: 4 * 60_000 },
  { id: 'hazards', label: 'Hazards', value: '2', note: 'Near your line', ageMs: 18 * 60_000 },
  { id: 'traffic', label: 'Vessels nearby', value: '6', note: '2 friends', ageMs: 20_000 },
  { id: 'nowake', label: 'No-wake zones', value: '1', note: 'On the line', ageMs: 0 },
]

/** Other vessels moving on the water, each a fraction along a short line. */
export interface Traffic {
  id: string
  name: string
  friend: boolean
  from: Point
  to: Point
  /** seconds per full pass in demo time */
  periodS: number
  phase: number
}

export const TRAFFIC: readonly Traffic[] = [
  { id: 't1', name: 'MY Latitude', friend: true, from: { u: 0.47, v: 0.42 }, to: { u: 0.52, v: 0.56 }, periodS: 140, phase: 0.2 },
  { id: 't2', name: 'Tender 7', friend: false, from: { u: 0.61, v: 0.64 }, to: { u: 0.57, v: 0.72 }, periodS: 90, phase: 0.6 },
  { id: 't3', name: 'Reel Time', friend: false, from: { u: 0.44, v: 0.36 }, to: { u: 0.41, v: 0.29 }, periodS: 120, phase: 0.1 },
  { id: 't4', name: 'Sea Note', friend: true, from: { u: 0.5, v: 0.62 }, to: { u: 0.47, v: 0.47 }, periodS: 160, phase: 0.8 },
  { id: 't5', name: 'Pilot 2', friend: false, from: { u: 0.55, v: 0.74 }, to: { u: 0.6, v: 0.68 }, periodS: 70, phase: 0.4 },
  { id: 't6', name: 'Wanderer', friend: false, from: { u: 0.49, v: 0.33 }, to: { u: 0.5, v: 0.5 }, periodS: 200, phase: 0.5 },
]

/** Is this point on the water mask? */
export const onWater = (p: Point): boolean => {
  const x = Math.round(p.u * (GRID_W - 1))
  const y = Math.round(p.v * (GRID_H - 1))
  return x >= 0 && y >= 0 && x < GRID_W && y < GRID_H && isWater(x, y)
}

/** The nearest water cell to a point, searched in growing rings; the point itself when it is afloat. */
export function snapToWater(p: Point, maxRing = 40): Point {
  if (onWater(p)) return p
  const cx = Math.round(p.u * (GRID_W - 1))
  const cy = Math.round(p.v * (GRID_H - 1))
  for (let r = 1; r <= maxRing; r++) {
    let best: Point | null = null
    let bestD = Infinity
    for (let dx = -r; dx <= r; dx++) {
      for (const dy of dx === -r || dx === r ? Array.from({ length: 2 * r + 1 }, (_, i) => i - r) : [-r, r]) {
        const x = cx + dx
        const y = cy + dy
        if (x < 0 || y < 0 || x >= GRID_W || y >= GRID_H || !isWater(x, y)) continue
        const d = dx * dx + dy * dy
        if (d < bestD) {
          bestD = d
          best = pointOf(y * GRID_W + x)
        }
      }
    }
    if (best) return best
  }
  return p
}

/** A hazard report as the chart draws it: a caution rings magenta, a live severe one rings red. */
export interface HazardMark extends Point {
  label: string
  status: 'reported' | 'confirmed'
  severe: boolean
}

/** The hazards the strip counts, sitting just off the track. */
export const DEBRIS: readonly HazardMark[] = [
  { ...snapToWater({ u: 0.462, v: 0.46 }), label: 'Floating debris', status: 'reported', severe: false },
  { ...snapToWater({ u: 0.585, v: 0.66 }), label: 'Submerged log', status: 'confirmed', severe: true },
]

export interface Track {
  points: Point[]
  /** cumulative length to each point, in nautical miles */
  cum: number[]
  lengthNm: number
  ok: boolean
}

/** Distance between two normalised points, in nautical miles. */
export const nmBetween = (a: Point, b: Point): number =>
  Math.hypot((a.u - b.u) * (GRID_W - 1), (a.v - b.v) * (GRID_H - 1)) * NM_PER_CELL

/** A track along the water between two points, or the straight line when the router finds none. */
export function trackBetween(from: Point, to: Point, vessel: { draftFt?: number; airDraftFt?: number; landCost?: number } = {}): Track {
  const a = snapToWater(from)
  const b = snapToWater(to)
  const r = route({ from: a, to: b, draftFt: vessel.draftFt, airDraftFt: vessel.airDraftFt, landCost: vessel.landCost })
  const points = r.ok && r.points.length > 1 ? smoothTrack(r.points) : [a, b]
  const cum = [0]
  for (let i = 1; i < points.length; i++) cum.push(cum[i - 1]! + nmBetween(points[i - 1]!, points[i]!))
  return { points, cum, lengthNm: cum[cum.length - 1]!, ok: r.ok }
}

/** The passage the vessel sails: Sunrise Bay to Bahia Mar for this vessel. */
export const buildTrack = (): Track => trackBetween(PLACES.sunriseBay, PLACES.bahiaMar, VESSEL)

export interface Fix {
  at: Point
  /** degrees clockwise from north, screen-north being up on the chart */
  headingDeg: number
  /** distance sailed and left, in nautical miles */
  sailedNm: number
  remainingNm: number
}

/** Where the vessel is after sailing `sailedNm` along the track. */
export function fixAt(track: Track, sailedNm: number): Fix {
  const s = Math.min(track.lengthNm, Math.max(0, sailedNm))
  const { points, cum } = track
  let i = 1
  while (i < cum.length - 1 && cum[i]! < s) i++
  const a = points[i - 1]!
  const b = points[i]!
  const seg = cum[i]! - cum[i - 1]!
  const t = seg > 0 ? (s - cum[i - 1]!) / seg : 0
  const at = { u: a.u + (b.u - a.u) * t, v: a.v + (b.v - a.v) * t }
  /* look a little ahead so the heading does not jitter on short segments */
  const j = Math.min(points.length - 1, i + 3)
  const ahead = points[j]!
  const dx = (ahead.u - a.u) * (GRID_W - 1)
  const dy = (ahead.v - a.v) * (GRID_H - 1)
  const headingDeg = ((Math.atan2(dx, -dy) * 180) / Math.PI + 360) % 360
  return { at, headingDeg, sailedNm: s, remainingNm: Math.max(0, track.lengthNm - s) }
}

/** Is the point within the no-wake ring? */
export const inNoWake = (p: Point): boolean =>
  Math.hypot((p.u - NO_WAKE.u) * (GRID_W - 1), (p.v - NO_WAKE.v) * (GRID_H - 1)) <= NO_WAKE.radius

/** Speed over ground the vessel keeps at this point. */
export const speedAt = (p: Point): number => (inNoWake(p) ? NO_WAKE_KN : CRUISE_KN)

/** Minutes to run for the distance left at the speeds along the way, roughly. */
export function minutesLeft(track: Track, fix: Fix): number {
  let mins = 0
  const step = 0.05
  for (let s = fix.sailedNm; s < track.lengthNm; s += step) {
    const d = Math.min(step, track.lengthNm - s)
    mins += (d / speedAt(fixAt(track, s).at)) * 60
  }
  return mins
}

export interface Gate {
  /** what comes next on the line */
  label: string
  /** distance to it in nautical miles; 0 while inside it */
  nm: number
  /** true while the vessel is inside a slow zone */
  inside: boolean
}

/** The next thing on the line that changes the passage: the no-wake zone, then the marina approach. */
export function nextGate(track: Track, fix: Fix): Gate {
  if (inNoWake(fix.at)) return { label: `No wake · ${NO_WAKE_KN} kn`, nm: 0, inside: true }
  const step = 0.02
  for (let s = fix.sailedNm; s < track.lengthNm; s += step) {
    if (inNoWake(fixAt(track, s).at)) return { label: 'No wake', nm: Math.max(0, s - fix.sailedNm), inside: false }
  }
  return { label: 'Approach', nm: fix.remainingNm, inside: false }
}

/** "2:41 PM" for now plus some minutes, in the viewer's clock. */
export function clockAfter(now: number, minutes: number, locale?: string): string {
  return new Date(now + minutes * 60_000).toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' })
}

/** "38 min" or "1 h 05 min". */
export function durationLabel(minutes: number): string {
  const m = Math.max(0, Math.round(minutes))
  if (m < 60) return `${m} min`
  return `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, '0')} min`
}

const trafficTracks = new Map<string, Track>()
/** The water-only line a traffic vessel works, routed once and kept. */
export const trafficTrack = (v: Traffic): Track => {
  let t = trafficTracks.get(v.id)
  if (!t) {
    /* land is all but forbidden to other vessels: dear enough that a corner is never cut,
       possible only where the mask leaves no water way at all (the bridge, a thin gap) */
    t = trackBetween(v.from, v.to, { landCost: 400 })
    trafficTracks.set(v.id, t)
  }
  return t
}

/** Where a traffic vessel is at demo time `t` seconds, and which way it points: out along its track, then back. */
export function trafficAt(v: Traffic, t: number): { at: Point; headingDeg: number } {
  const track = trafficTrack(v)
  const cycle = ((t / v.periodS + v.phase) % 1 + 1) % 1
  const out = cycle < 0.5
  const k = out ? cycle * 2 : 2 - cycle * 2
  const fix = fixAt(track, k * track.lengthNm)
  return { at: fix.at, headingDeg: out ? fix.headingDeg : (fix.headingDeg + 180) % 360 }
}

/** "just now", "3 min ago", "2 h ago". */
export function ageLabel(ms: number): string {
  const m = Math.floor(ms / 60_000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m} min ago`
  return `${Math.floor(m / 60)} h ago`
}
