/**
 * Sample berths for the "Orbit the scan" journey.
 *
 * The ids and length limits are Bahia Mar's, as the product lists them. The
 * scan they sit on is a different basin (HFAX_PC.las, centred on
 * 29.206° N 81.014° W — the Halifax River at Daytona Beach), so the positions,
 * entry headings, tie sides, depths and today's states are illustrative and
 * the component says so on the surface.
 */

export type BerthState = 'free' | 'assigned' | 'resident' | 'courtesy' | 'closed'
export type BerthKind = 'slip' | 'side-to' | 'Med-moor'
export type EntryMode = 'bow-in' | 'stern-in' | 'alongside'
export type TieSide = 'port-to' | 'starboard-to' | 'either'

export interface ScanBerth {
  id: string
  /** LOA limit in metres as the product shows it; null = no stated limit */
  loaM: number | null
  kind: BerthKind
  entryDeg: number
  mode: EntryMode
  tie: TieSide
  depthM: number
  datum: 'MLLW'
  soundedDaysAgo: number
  state: BerthState
  /** metres east, north and up from the scan's centre and ground level */
  anchor: [number, number, number]
}

export const SCAN = {
  metaUrl: '/assets/demo/hfax.json',
  file: 'HFAX_PC.las',
  place: 'Halifax River, Daytona Beach',
  lat: 29.206,
  lon: -81.014,
} as const

export const BERTHS: ScanBerth[] = [
  { id: 'A-01', loaM: 18, kind: 'slip', entryDeg: 205, mode: 'bow-in', tie: 'port-to', depthM: 2.6, datum: 'MLLW', soundedDaysAgo: 3, state: 'free', anchor: [-154.5, -88.5, 2.4] },
  { id: 'A-02', loaM: 24, kind: 'slip', entryDeg: 240, mode: 'stern-in', tie: 'starboard-to', depthM: 2.4, datum: 'MLLW', soundedDaysAgo: 3, state: 'free', anchor: [-94.5, -115.5, 2.4] },
  { id: 'A-03', loaM: 30, kind: 'slip', entryDeg: 240, mode: 'stern-in', tie: 'either', depthM: 3.1, datum: 'MLLW', soundedDaysAgo: 3, state: 'assigned', anchor: [-64.5, -175.5, 2.3] },
  { id: 'A-04', loaM: 15, kind: 'slip', entryDeg: 240, mode: 'bow-in', tie: 'port-to', depthM: 2.1, datum: 'MLLW', soundedDaysAgo: 3, state: 'resident', anchor: [-28.5, -199.5, 1.2] },
  { id: 'B-01', loaM: 25, kind: 'side-to', entryDeg: 250, mode: 'alongside', tie: 'starboard-to', depthM: 3.4, datum: 'MLLW', soundedDaysAgo: 9, state: 'free', anchor: [-76.5, -238.5, 4.1] },
  { id: 'B-02', loaM: 22, kind: 'side-to', entryDeg: 250, mode: 'alongside', tie: 'port-to', depthM: 3.0, datum: 'MLLW', soundedDaysAgo: 9, state: 'courtesy', anchor: [-22.5, -277.5, 2.4] },
  { id: 'C-01', loaM: null, kind: 'slip', entryDeg: 315, mode: 'stern-in', tie: 'either', depthM: 3.6, datum: 'MLLW', soundedDaysAgo: 21, state: 'free', anchor: [49.5, -19.5, 2.2] },
  { id: 'D-01', loaM: 20, kind: 'slip', entryDeg: 315, mode: 'bow-in', tie: 'starboard-to', depthM: 2.2, datum: 'MLLW', soundedDaysAgo: 40, state: 'closed', anchor: [76.5, -43.5, 2.0] },
]

/** The day-board line: "A-02 · enter 240° stern-in · starboard-to · 2.4 m MLLW". */
export function approachBrief(b: ScanBerth): string {
  return `${b.id} · enter ${b.entryDeg}° ${b.mode} · ${b.tie} · ${b.depthM.toFixed(1)} m ${b.datum}`
}

export function loaLabel(b: ScanBerth): string {
  return b.loaM === null ? 'no stated length limit' : `up to ${b.loaM} m LOA`
}

export function soundedLabel(days: number): string {
  if (days === 0) return 'sounded today'
  if (days === 1) return 'sounded 1 d ago'
  return `sounded ${days} d ago`
}

export const STATE_LABEL: Record<BerthState, string> = {
  free: 'Free today',
  assigned: 'Assigned today',
  resident: 'Resident',
  courtesy: 'Courtesy today',
  closed: 'Closed',
}

/** What the state means for a guest, ending with what to do. */
export const STATE_NOTE: Record<BerthState, string> = {
  free: 'Nothing on it today. Request the marina and the dockmaster assigns it.',
  assigned: 'Held for a vessel arriving today. Ask the dockmaster for another berth.',
  resident: 'A resident berth, not offered to guests. Ask the dockmaster for another berth.',
  courtesy: 'Short stays only today. Check the limit with the dockmaster before you tie up.',
  closed: 'Closed for works. Ask the dockmaster for another berth.',
}
