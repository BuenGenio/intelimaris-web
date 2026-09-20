/**
 * Scene and arithmetic for the "Underway at the helm" journey: the WaterWayz
 * main screen as a working demo. The component owns state and drawing; this
 * module owns the passage, where the vessel is along it, and the numbers the
 * cards show, so they can be tested on their own.
 *
 * Everything is illustrative and says so on the surface where it is shown.
 */
import { GRID_H, GRID_W, NM_PER_CELL, PLACES, route, type Point } from './waterRouter'
import { smoothTrack } from './passage-planner-vessels'

export const CRUISE_KN = 8.4
export const NO_WAKE_KN = 5

/** How much faster than life the demo runs: a quarter-hour passage in under a minute. */
export const TIME_SCALE = 24

export type ViewMode = 'helm' | 'above' | '3d'
export const VIEW_MODES: readonly { id: ViewMode; label: string; hint: string }[] = [
  { id: 'above', label: 'Above', hint: 'North up. The whole passage in view.' },
  { id: 'helm', label: 'Helm', hint: 'Course up. The water ahead is ahead.' },
  { id: '3d', label: '3D', hint: 'Tilted, ahead of the bow.' },
]

export const VESSEL = { name: 'SV Meridian', lengthFt: 42, draftFt: 4, airDraftFt: 21 } as const

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
  { id: 'tide', label: 'Tide', value: '2.1', unit: 'ft', note: 'Rising · ↑ 0.3 ft/hr', ageMs: 6 * 60_000 },
  { id: 'wind', label: 'Wind', value: 'SE 9', unit: 'kn', note: 'Gusts 14 kn', ageMs: 4 * 60_000 },
  { id: 'debris', label: 'Debris alerts', value: '2', note: 'Nearby', ageMs: 18 * 60_000 },
  { id: 'traffic', label: 'Vessels nearby', value: '6', note: '2 friends', ageMs: 20_000 },
  { id: 'nowake', label: 'No-wake zones', value: '1', note: 'On route', ageMs: 0 },
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

/** Debris the strip counts, sitting just off the track. */
export const DEBRIS: readonly (Point & { label: string })[] = [
  { u: 0.462, v: 0.46, label: 'Floating debris · reported 18 min ago' },
  { u: 0.585, v: 0.66, label: 'Submerged log · confirmed' },
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

/** The passage the vessel sails: Sunrise Bay to Bahia Mar for this vessel. */
export function buildTrack(): Track {
  const r = route({ from: PLACES.sunriseBay, to: PLACES.bahiaMar, draftFt: VESSEL.draftFt, airDraftFt: VESSEL.airDraftFt })
  const points = r.ok ? smoothTrack(r.points) : [PLACES.sunriseBay, PLACES.bahiaMar]
  const cum = [0]
  for (let i = 1; i < points.length; i++) cum.push(cum[i - 1]! + nmBetween(points[i - 1]!, points[i]!))
  return { points, cum, lengthNm: cum[cum.length - 1]!, ok: r.ok }
}

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

/** Where a traffic vessel is at demo time `t` seconds, and which way it points. */
export function trafficAt(v: Traffic, t: number): { at: Point; headingDeg: number } {
  const cycle = ((t / v.periodS + v.phase) % 1 + 1) % 1
  /* out and back */
  const k = cycle < 0.5 ? cycle * 2 : 2 - cycle * 2
  const out = cycle < 0.5
  const a = out ? v.from : v.to
  const b = out ? v.to : v.from
  const at = { u: v.from.u + (v.to.u - v.from.u) * k, v: v.from.v + (v.to.v - v.from.v) * k }
  const dx = (b.u - a.u) * (GRID_W - 1)
  const dy = (b.v - a.v) * (GRID_H - 1)
  return { at, headingDeg: ((Math.atan2(dx, -dy) * 180) / Math.PI + 360) % 360 }
}

/** "just now", "3 min ago", "2 h ago". */
export function ageLabel(ms: number): string {
  const m = Math.floor(ms / 60_000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m} min ago`
  return `${Math.floor(m / 60)} h ago`
}
