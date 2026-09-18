/**
 * Geometry and model for the "Draw your own water" journey.
 *
 * Everything lives in the frame of the basin crop: 1200 × 900 user units,
 * north up. A unit is a fixed fraction of the image, so a layout survives
 * resizing; metres are a sample scale, labelled so wherever they show.
 */

export interface Pt {
  x: number
  y: number
}

export const FRAME = { w: 1200, h: 900 } as const

/** Sample scale of the basin crop. Approximate, and said so on the map. */
export const M_PER_UNIT = 0.28
export const unitsOf = (metres: number): number => metres / M_PER_UNIT

export type BerthKind = 'slip' | 'side-to' | 'med-moor' | 'mooring'
export type EntryMode = 'bow-in' | 'stern-in'
export type TieSide = 'port' | 'starboard' | 'either'
export type Access = 'assigned' | 'resident' | 'courtesy'
export type Occupancy = 'free' | 'assigned' | 'resident' | 'courtesy' | 'closed'

export interface Dock {
  id: string
  letter: string
  points: Pt[]
  /** next berth number on this dock line */
  next: number
}

export interface Vessel {
  name: string
  loaM: number
}

export interface Berth {
  id: string
  name: string
  kind: BerthKind
  dockId: string | null
  /** where the berth meets the dock line (or the ball, for a mooring) */
  foot: Pt
  /** unit vector along the dock line */
  dir: Pt
  /** unit vector away from the dock line, into the water */
  normal: Pt
  lengthM: number
  beamM: number
  loaM: number
  depthM: number
  datum: 'MLLW'
  entryDeg: number
  entryMode: EntryMode
  tieSide: TieSide
  access: Access
  closed: boolean
  vessel: Vessel | null
  /** mooring balls only */
  swingM: number
}

export interface Layout {
  docks: Dock[]
  berths: Berth[]
  nextMooring: number
}

export const emptyLayout = (): Layout => ({ docks: [], berths: [], nextMooring: 1 })

export const SAMPLE_VESSELS: readonly Vessel[] = [
  { name: 'Sea Change', loaM: 11.6 },
  { name: 'Kestrel', loaM: 9.8 },
  { name: 'Halcyon', loaM: 10.4 },
  { name: 'Marlin Two', loaM: 8.9 },
  { name: 'Windward', loaM: 7.6 },
]

/* --- Vectors --------------------------------------------------------------- */

export const sub = (a: Pt, b: Pt): Pt => ({ x: a.x - b.x, y: a.y - b.y })
export const add = (a: Pt, b: Pt): Pt => ({ x: a.x + b.x, y: a.y + b.y })
export const scale = (a: Pt, k: number): Pt => ({ x: a.x * k, y: a.y * k })
export const dot = (a: Pt, b: Pt): number => a.x * b.x + a.y * b.y
export const len = (a: Pt): number => Math.hypot(a.x, a.y)
export const dist = (a: Pt, b: Pt): number => len(sub(a, b))
export const unit = (a: Pt): Pt => {
  const l = len(a) || 1
  return { x: a.x / l, y: a.y / l }
}
/** Rotate a quarter turn clockwise on screen (y down): the starboard side of a heading. */
export const starboardOf = (d: Pt): Pt => ({ x: -d.y, y: d.x })

/** Compass bearing of a screen vector, north up, in whole degrees 0–359. */
export const bearingDeg = (d: Pt): number => {
  const deg = (Math.atan2(d.x, -d.y) * 180) / Math.PI
  return (Math.round(deg) + 360) % 360
}

/** Unit screen vector for a compass bearing. */
export const vectorOf = (deg: number): Pt => {
  const r = (deg * Math.PI) / 180
  return { x: Math.sin(r), y: -Math.cos(r) }
}

export const pad3 = (deg: number): string => String(((Math.round(deg) % 360) + 360) % 360).padStart(3, '0')

/**
 * Snap the end of a segment so it sits on a multiple of 15° from its start
 * when it is already within `tolerance` degrees of one.
 */
export function snapAngle(from: Pt, to: Pt, tolerance = 4): Pt {
  const d = sub(to, from)
  const l = len(d)
  if (l < 1) return to
  const deg = bearingDeg(d)
  const nearest = Math.round(deg / 15) * 15
  const diff = Math.abs(((deg - nearest + 540) % 360) - 180)
  if (diff > tolerance) return to
  return add(from, scale(vectorOf(nearest), l))
}

/* --- Dock lines ------------------------------------------------------------ */

export interface Projection {
  point: Pt
  segment: number
  /** distance along the segment from its start, in units */
  along: number
  segmentLength: number
  distance: number
  dir: Pt
}

/** Nearest point on a polyline to `p`. */
export function projectToPolyline(points: Pt[], p: Pt): Projection | null {
  let best: Projection | null = null
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i]!
    const b = points[i + 1]!
    const ab = sub(b, a)
    const l = len(ab)
    if (l < 1e-6) continue
    const d = scale(ab, 1 / l)
    const along = Math.max(0, Math.min(l, dot(sub(p, a), d)))
    const point = add(a, scale(d, along))
    const distance = dist(point, p)
    if (!best || distance < best.distance) best = { point, segment: i, along, segmentLength: l, distance, dir: d }
  }
  return best
}

export interface NearestDock {
  dock: Dock
  projection: Projection
}

export function nearestDock(docks: Dock[], p: Pt, within: number): NearestDock | null {
  let best: NearestDock | null = null
  for (const dock of docks) {
    const projection = projectToPolyline(dock.points, p)
    if (!projection || projection.distance > within) continue
    if (!best || projection.distance < best.projection.distance) best = { dock, projection }
  }
  return best
}

/* --- Berths ---------------------------------------------------------------- */

export const DEFAULTS = {
  lengthM: 12,
  beamM: 4.5,
  loaM: 12,
  depthM: 2.4,
  swingM: 25,
  /** water between neighbouring slips, in metres */
  gapM: 0.6,
} as const

const berthBase = (id: string, name: string): Berth => ({
  id,
  name,
  kind: 'slip',
  dockId: null,
  foot: { x: 0, y: 0 },
  dir: { x: 1, y: 0 },
  normal: { x: 0, y: 1 },
  lengthM: DEFAULTS.lengthM,
  beamM: DEFAULTS.beamM,
  loaM: DEFAULTS.loaM,
  depthM: DEFAULTS.depthM,
  datum: 'MLLW',
  entryDeg: 0,
  entryMode: 'bow-in',
  tieSide: 'starboard',
  access: 'assigned',
  closed: false,
  vessel: null,
  swingM: DEFAULTS.swingM,
})

/** Default entry heading and tie side for a berth's geometry and kind. */
export function defaultApproach(b: Pick<Berth, 'kind' | 'dir' | 'normal'>): Pick<Berth, 'entryDeg' | 'entryMode' | 'tieSide'> {
  if (b.kind === 'side-to') {
    const toDock = scale(b.normal, -1)
    const tieSide: TieSide = dot(toDock, starboardOf(b.dir)) > 0 ? 'starboard' : 'port'
    return { entryDeg: bearingDeg(b.dir), entryMode: 'bow-in', tieSide }
  }
  if (b.kind === 'mooring') return { entryDeg: 0, entryMode: 'bow-in', tieSide: 'either' }
  return {
    entryDeg: bearingDeg(scale(b.normal, -1)),
    entryMode: b.kind === 'med-moor' ? 'stern-in' : 'bow-in',
    tieSide: b.kind === 'med-moor' ? 'either' : 'starboard',
  }
}

/** The pitch between neighbouring berths along the dock, in units. */
const pitchOf = (b: Pick<Berth, 'kind' | 'beamM' | 'lengthM'>): number =>
  unitsOf((b.kind === 'side-to' ? b.lengthM : b.beamM) + DEFAULTS.gapM)

export interface DropResult {
  layout: Layout
  berth: Berth
  snapped: boolean
}

/**
 * Drop a berth where `p` meets the nearest dock line. The berth sits on the
 * side of the line the pointer is on and snaps flush against a neighbour
 * when it lands close to one.
 */
export function dropBerth(layout: Layout, p: Pt, kind: Exclude<BerthKind, 'mooring'>, within: number): DropResult | null {
  const hit = nearestDock(layout.docks, p, within)
  if (!hit) return null
  const { dock, projection } = hit
  const { dir } = projection
  const side = dot(sub(p, projection.point), starboardOf(dir)) >= 0 ? 1 : -1
  const normal = scale(starboardOf(dir), side)

  const id = `${dock.id}-${dock.next}`
  const berth = { ...berthBase(id, `${dock.letter}-${String(dock.next).padStart(2, '0')}`), kind, dockId: dock.id, dir, normal }
  const pitch = pitchOf(berth)
  const half = pitch / 2
  let along = Math.max(half, Math.min(projection.segmentLength - half, projection.along))
  let snapped = false

  const a = dock.points[projection.segment]!
  const neighbours = layout.berths
    .filter((b) => b.dockId === dock.id && dot(b.normal, normal) > 0.99 && Math.abs(dot(sub(b.foot, a), starboardOf(dir))) < 1)
    .map((b) => ({ b, along: dot(sub(b.foot, a), dir), pitch: pitchOf(b) }))
  for (const n of neighbours) {
    const offset = (n.pitch + pitch) / 2
    for (const candidate of [n.along + offset, n.along - offset]) {
      if (Math.abs(candidate - along) < pitch * 0.75 && candidate >= half && candidate <= projection.segmentLength - half) {
        const taken = neighbours.some((o) => Math.abs(o.along - candidate) < (o.pitch + pitch) / 2 - 0.5)
        if (!taken) {
          along = candidate
          snapped = true
        }
      }
    }
    if (snapped) break
  }

  berth.foot = add(a, scale(dir, along))
  Object.assign(berth, defaultApproach(berth))
  const docks = layout.docks.map((d) => (d.id === dock.id ? { ...d, next: d.next + 1 } : d))
  return { layout: { ...layout, docks, berths: [...layout.berths, berth] }, berth, snapped }
}

export function dropMooring(layout: Layout, p: Pt): DropResult {
  const n = layout.nextMooring
  const berth: Berth = {
    ...berthBase(`M-${n}`, `M-${String(n).padStart(2, '0')}`),
    kind: 'mooring',
    foot: p,
    loaM: 14,
    depthM: 3.1,
    ...defaultApproach({ kind: 'mooring', dir: { x: 1, y: 0 }, normal: { x: 0, y: 1 } }),
  }
  return { layout: { ...layout, nextMooring: n + 1, berths: [...layout.berths, berth] }, berth, snapped: false }
}

export function addDock(layout: Layout, points: Pt[]): { layout: Layout; dock: Dock } {
  const index = layout.docks.length
  const letter = String.fromCharCode(65 + (index % 26)) + (index >= 26 ? String(Math.floor(index / 26)) : '')
  const dock: Dock = { id: `dock-${index + 1}-${letter}`, letter, points, next: 1 }
  return { layout: { ...layout, docks: [...layout.docks, dock] }, dock }
}

/** Corner polygon for a slip, side-to or Med-moor berth, in frame units. */
export function berthPolygon(b: Berth): Pt[] {
  const L = unitsOf(b.lengthM)
  const B = unitsOf(b.beamM)
  const { foot: f, dir: d, normal: n } = b
  if (b.kind === 'side-to') {
    const a = add(f, scale(d, -L / 2))
    const c = add(f, scale(d, L / 2))
    return [a, c, add(c, scale(n, B)), add(a, scale(n, B))]
  }
  const a = add(f, scale(d, -B / 2))
  const c = add(f, scale(d, B / 2))
  return [a, c, add(c, scale(n, L)), add(a, scale(n, L))]
}

export const polygonPath = (pts: Pt[]): string =>
  pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + ' Z'

export const berthCentre = (b: Berth): Pt => {
  if (b.kind === 'mooring') return b.foot
  const poly = berthPolygon(b)
  return scale(poly.reduce((acc, p) => add(acc, p), { x: 0, y: 0 }), 1 / poly.length)
}

/** Where the size handle sits: the outer end of the berth. */
export const berthHandle = (b: Berth): Pt => {
  if (b.kind === 'mooring') return add(b.foot, { x: unitsOf(b.swingM), y: 0 })
  if (b.kind === 'side-to') return add(b.foot, scale(b.dir, unitsOf(b.lengthM) / 2))
  return add(b.foot, scale(b.normal, unitsOf(b.lengthM)))
}

/** Resize from a dragged handle position; length snaps to half metres. */
export function resizeFromHandle(b: Berth, p: Pt): Partial<Berth> {
  const snapHalf = (m: number, min: number, max: number) => Math.max(min, Math.min(max, Math.round(m * 2) / 2))
  if (b.kind === 'mooring') return { swingM: snapHalf(dist(p, b.foot) * M_PER_UNIT, 8, 60) }
  if (b.kind === 'side-to') return { lengthM: snapHalf(Math.abs(dot(sub(p, b.foot), b.dir)) * 2 * M_PER_UNIT, 6, 60) }
  return { lengthM: snapHalf(dot(sub(p, b.foot), b.normal) * M_PER_UNIT, 6, 60) }
}

/* --- The day board --------------------------------------------------------- */

export function occupancy(b: Berth): Occupancy {
  if (b.closed) return 'closed'
  if (b.access === 'resident') return 'resident'
  if (b.access === 'courtesy') return 'courtesy'
  return b.vessel ? 'assigned' : 'free'
}

export function approachBrief(b: Berth): string {
  const depth = `${b.depthM.toFixed(1)} m ${b.datum}`
  if (b.kind === 'mooring') return `${b.name} · mooring ball · swing ${b.swingM} m · ${depth}`
  const tie = b.tieSide === 'either' ? 'either side' : `${b.tieSide}-to`
  const mode = b.kind === 'side-to' ? 'alongside' : b.entryMode
  return `${b.name} · enter ${pad3(b.entryDeg)}° ${mode} · ${tie} · ${depth}`
}

export interface Counts {
  drawn: number
  free: number
  assigned: number
  resident: number
  courtesy: number
  closed: number
}

export function countBoard(berths: Berth[]): Counts {
  const c: Counts = { drawn: berths.length, free: 0, assigned: 0, resident: 0, courtesy: 0, closed: 0 }
  for (const b of berths) c[occupancy(b)] += 1
  return c
}

export const countLine = (c: Counts): string => {
  const parts = [`${c.drawn} drawn`]
  if (c.assigned) parts.push(`${c.assigned} assigned`)
  if (c.resident) parts.push(`${c.resident} resident`)
  if (c.courtesy) parts.push(`${c.courtesy} courtesy`)
  if (c.closed) parts.push(`${c.closed} closed`)
  parts.push(`${c.free} free`)
  return parts.join(' · ')
}

/** The next sample vessel that fits the berth and is not already alongside. */
export function pickVessel(b: Berth, berths: Berth[]): Vessel | null {
  const busy = new Set(berths.map((o) => o.vessel?.name).filter(Boolean))
  return SAMPLE_VESSELS.find((v) => !busy.has(v.name) && v.loaM <= b.loaM) ?? null
}

/* --- The sample layout, for keyboard and for a quick look --------------------- */

export function sampleLayout(): Layout {
  let layout = emptyLayout()
  layout = addDock(layout, [
    { x: 400, y: 470 },
    { x: 720, y: 390 },
  ]).layout
  const dock = layout.docks[0]!
  const a = dock.points[0]!
  const d = unit(sub(dock.points[1]!, a))
  const pitch = unitsOf(DEFAULTS.beamM + DEFAULTS.gapM)
  for (let i = 0; i < 3; i++) {
    const p = add(add(a, scale(d, 80 + i * pitch)), scale(starboardOf(d), 12))
    const dropped = dropBerth(layout, p, 'slip', 40)
    if (dropped) layout = dropped.layout
  }
  return layout
}
