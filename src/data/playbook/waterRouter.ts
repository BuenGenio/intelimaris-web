/**
 * Client-side routing over the playbook basemap's water mask.
 *
 * The mask is a 480×270 bit grid derived from the satellite render. Depth is
 * a distance-from-shore proxy and is labelled illustrative wherever it is
 * shown; the real router uses charted bathymetry, tides and bridge gates
 * server-side. This module exists so a visitor can plan and re-plan a passage
 * in the browser with no account and no round trip.
 */
import raw from './water-mask.json'

export interface Point {
  /** normalised 0–1 across the basemap */
  u: number
  v: number
}

export interface RouteOptions {
  from: Point
  to: Point
  /** grid cells the route must avoid, e.g. reported hazards */
  blocked?: Iterable<number>
  /** vessel draft in feet; cells shallower than this are refused */
  draftFt?: number
  /** vessel air draft in feet; bridge cells lower than this are refused */
  airDraftFt?: number
  /** what a land cell costs to cross (a bridge); Infinity keeps the track on the water */
  landCost?: number
}

export interface RouteResult {
  ok: boolean
  /** why the planner refused, in the brand's voice */
  reason?: string
  points: Point[]
  cells: number[]
  lengthNm: number
  /** shallowest illustrative depth along the track, in feet */
  minDepthFt: number
  /** cells where the track crosses a bridge */
  bridges: number[]
}

export const GRID_W: number = raw.width
export const GRID_H: number = raw.height

/* ~77.6 grid cells per nautical mile, from the Las Olas bridge to Bahia Mar. */
export const NM_PER_CELL = 1 / 77.6

const bits = Uint8Array.from(atob(raw.bits), (c) => c.charCodeAt(0))

export const cellIndex = (x: number, y: number): number => y * GRID_W + x
export const cellOf = (p: Point): number =>
  cellIndex(
    Math.min(GRID_W - 1, Math.max(0, Math.round(p.u * (GRID_W - 1)))),
    Math.min(GRID_H - 1, Math.max(0, Math.round(p.v * (GRID_H - 1)))),
  )
export const pointOf = (cell: number): Point => ({
  u: (cell % GRID_W) / (GRID_W - 1),
  v: Math.floor(cell / GRID_W) / (GRID_H - 1),
})

export function isWater(x: number, y: number): boolean {
  if (x < 0 || y < 0 || x >= GRID_W || y >= GRID_H) return false
  const i = cellIndex(x, y)
  return (bits[i >> 3]! & (1 << (i & 7))) !== 0
}

/* Distance from the nearest shore, in cells, by two-pass chamfer. */
let shoreDistance: Uint16Array | null = null
export function distanceToShore(): Uint16Array {
  if (shoreDistance) return shoreDistance
  const INF = 60000
  const d = new Uint16Array(GRID_W * GRID_H)
  for (let y = 0; y < GRID_H; y++)
    for (let x = 0; x < GRID_W; x++) d[cellIndex(x, y)] = isWater(x, y) ? INF : 0
  const relax = (x: number, y: number, dx: number, dy: number) => {
    const nx = x + dx
    const ny = y + dy
    if (nx < 0 || ny < 0 || nx >= GRID_W || ny >= GRID_H) return
    const v = d[cellIndex(nx, ny)]! + (dx && dy ? 3 : 2)
    if (v < d[cellIndex(x, y)]!) d[cellIndex(x, y)] = v
  }
  for (let y = 0; y < GRID_H; y++)
    for (let x = 0; x < GRID_W; x++)
      if (d[cellIndex(x, y)]) {
        relax(x, y, -1, 0)
        relax(x, y, 0, -1)
        relax(x, y, -1, -1)
        relax(x, y, 1, -1)
      }
  for (let y = GRID_H - 1; y >= 0; y--)
    for (let x = GRID_W - 1; x >= 0; x--)
      if (d[cellIndex(x, y)]) {
        relax(x, y, 1, 0)
        relax(x, y, 0, 1)
        relax(x, y, 1, 1)
        relax(x, y, -1, 1)
      }
  shoreDistance = d
  return d
}

/** Illustrative depth in feet: shallow at the shore, deepening mid-channel. */
export function depthAt(cell: number): number {
  const d = distanceToShore()[cell]! / 2
  return Math.min(24, Math.round((2.5 + d * 2.1) * 10) / 10)
}

/* Bridges are the thin land crossings the water mask closes over; crossing
   one is allowed at a cost so the planner passes under, never over land. */
const BRIDGE_CLEARANCE_FT = 22

export function route(options: RouteOptions): RouteResult {
  const start = cellOf(options.from)
  const goal = cellOf(options.to)
  const blocked = new Set(options.blocked ?? [])
  const draft = options.draftFt ?? 0
  const airDraft = options.airDraftFt ?? 0
  const landCost = options.landCost ?? 55
  const shore = distanceToShore()

  const fail = (reason: string): RouteResult => ({
    ok: false,
    reason,
    points: [],
    cells: [],
    lengthNm: 0,
    minDepthFt: 0,
    bridges: [],
  })

  const sx = start % GRID_W
  const sy = Math.floor(start / GRID_W)
  const gx = goal % GRID_W
  const gy = Math.floor(goal / GRID_W)
  if (!isWater(sx, sy)) return fail('That start is on land. Pick a point on the water.')
  if (!isWater(gx, gy)) return fail('That destination is on land. Pick a berth or open water.')
  if (depthAt(goal) < draft) return fail(`Water at the destination is about ${depthAt(goal)} ft; your draft is ${draft} ft. Pick deeper water.`)
  if (airDraft > BRIDGE_CLEARANCE_FT) {
    /* No route here avoids a bridge; say so rather than draw a line. */
    return fail(`Every route here passes under a ${BRIDGE_CLEARANCE_FT} ft bridge; your air draft is ${airDraft} ft. Lower the mast or leave by sea.`)
  }

  const N = GRID_W * GRID_H
  const g = new Float32Array(N).fill(Infinity)
  const came = new Int32Array(N).fill(-1)
  const closed = new Uint8Array(N)
  g[start] = 0

  /* binary heap on (f, cell) */
  const heapF: number[] = []
  const heapC: number[] = []
  const push = (f: number, c: number) => {
    heapF.push(f)
    heapC.push(c)
    let i = heapF.length - 1
    while (i > 0) {
      const p = (i - 1) >> 1
      if (heapF[p]! <= heapF[i]!) break
      ;[heapF[p], heapF[i]] = [heapF[i]!, heapF[p]!]
      ;[heapC[p], heapC[i]] = [heapC[i]!, heapC[p]!]
      i = p
    }
  }
  const pop = (): number => {
    const c = heapC[0]!
    const lf = heapF.pop()!
    const lc = heapC.pop()!
    if (heapF.length) {
      heapF[0] = lf
      heapC[0] = lc
      let i = 0
      for (;;) {
        const l = 2 * i + 1
        const r = l + 1
        let m = i
        if (l < heapF.length && heapF[l]! < heapF[m]!) m = l
        if (r < heapF.length && heapF[r]! < heapF[m]!) m = r
        if (m === i) break
        ;[heapF[m], heapF[i]] = [heapF[i]!, heapF[m]!]
        ;[heapC[m], heapC[i]] = [heapC[i]!, heapC[m]!]
        i = m
      }
    }
    return c
  }
  const h = (c: number) => Math.hypot((c % GRID_W) - gx, Math.floor(c / GRID_W) - gy)

  push(h(start), start)
  const dirs = [
    [1, 0, 1],
    [-1, 0, 1],
    [0, 1, 1],
    [0, -1, 1],
    [1, 1, Math.SQRT2],
    [1, -1, Math.SQRT2],
    [-1, 1, Math.SQRT2],
    [-1, -1, Math.SQRT2],
  ] as const

  let found = false
  while (heapF.length) {
    const cur = pop()
    if (closed[cur]) continue
    closed[cur] = 1
    if (cur === goal) {
      found = true
      break
    }
    const cx = cur % GRID_W
    const cy = Math.floor(cur / GRID_W)
    for (const [dx, dy, step] of dirs) {
      const nx = cx + dx
      const ny = cy + dy
      if (nx < 0 || ny < 0 || nx >= GRID_W || ny >= GRID_H) continue
      const nb = cellIndex(nx, ny)
      if (closed[nb] || blocked.has(nb)) continue
      let cost: number
      if (isWater(nx, ny)) {
        if (depthAt(nb) < draft) continue
        /* hug the channel centre */
        cost = step + Math.max(0, 8 - shore[nb]! / 2) * 0.9
      } else {
        if (landCost === Infinity) continue
        cost = step + landCost
      }
      const ng = g[cur]! + cost
      if (ng < g[nb]!) {
        g[nb] = ng
        came[nb] = cur
        push(ng + h(nb), nb)
      }
    }
  }
  if (!found) return fail('No water route joins those two points for a vessel of this draft.')

  const cells: number[] = []
  for (let c = goal; c !== -1; c = came[c]!) cells.push(c)
  cells.reverse()

  let length = 0
  let minDepth = Infinity
  const bridges: number[] = []
  for (let i = 0; i < cells.length; i++) {
    const c = cells[i]!
    const x = c % GRID_W
    const y = Math.floor(c / GRID_W)
    if (i > 0) {
      const p = cells[i - 1]!
      length += Math.hypot(x - (p % GRID_W), y - Math.floor(p / GRID_W))
    }
    if (isWater(x, y)) minDepth = Math.min(minDepth, depthAt(c))
    else bridges.push(c)
  }

  return {
    ok: true,
    points: cells.map(pointOf),
    cells,
    lengthNm: Math.round(length * NM_PER_CELL * 10) / 10,
    minDepthFt: minDepth === Infinity ? 0 : minDepth,
    bridges,
  }
}

/** Grid cells within `radius` of a point — for reporting a hazard. */
export function disc(center: Point, radius: number): number[] {
  const c = cellOf(center)
  const cx = c % GRID_W
  const cy = Math.floor(c / GRID_W)
  const out: number[] = []
  for (let y = cy - radius; y <= cy + radius; y++)
    for (let x = cx - radius; x <= cx + radius; x++)
      if (x >= 0 && y >= 0 && x < GRID_W && y < GRID_H && Math.hypot(x - cx, y - cy) <= radius)
        out.push(cellIndex(x, y))
  return out
}

/* Named places on this basemap, normalised. */
export const PLACES = {
  bahiaMar: { u: 0.5923, v: 0.6974, label: 'Bahia Mar Resort and Yachting Center' },
  lasOlasBridge: { u: 0.505, v: 0.585, label: 'Las Olas Boulevard Bridge' },
  sunriseBay: { u: 0.4346, v: 0.3009, label: 'Sunrise Bay' },
} as const
