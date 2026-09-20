/**
 * Sample vessels, control ranges and the plan wrapper for the
 * "Plan your own passage" journey. Everything here is illustrative and is
 * labelled so on the surface where it is shown.
 */
import { GRID_W, PLACES, route, type Point, type RouteResult } from './waterRouter'

export interface Vessel {
  lengthFt: number
  draftFt: number
  airDraftFt: number
}

export interface SampleVessel extends Vessel {
  id: string
  name: string
}

/** Three sample vessels. The sailboat's air draft is over the bridge on purpose. */
export const SAMPLE_VESSELS: readonly SampleVessel[] = [
  { id: 'sail', name: '34 ft sailboat', lengthFt: 34, draftFt: 5.5, airDraftFt: 52 },
  { id: 'trawler', name: '42 ft trawler', lengthFt: 42, draftFt: 4, airDraftFt: 21 },
  { id: 'console', name: '28 ft centre console', lengthFt: 28, draftFt: 2.5, airDraftFt: 9 },
] as const

export const CONTROLS = {
  lengthFt: { min: 20, max: 80, step: 1, label: 'Length' },
  draftFt: { min: 1, max: 10, step: 0.5, label: 'Draft' },
  airDraftFt: { min: 4, max: 70, step: 1, label: 'Air draft' },
} as const

/** Planning speed used for the ETA, in knots. */
export const PLAN_SPEED_KN = 8.4

/** The only bridge on this chart that the water mask closes over. */
export const BRIDGE = {
  u: 220 / (GRID_W - 1),
  v: 137 / 269,
  clearanceFt: 22,
  label: 'Las Olas Boulevard bridge',
} as const

/** The passage the "Plan the sample passage" button draws. */
export const SAMPLE_PASSAGE = {
  from: { u: PLACES.sunriseBay.u, v: PLACES.sunriseBay.v },
  to: { u: PLACES.bahiaMar.u, v: PLACES.bahiaMar.v },
} as const

/* The router lets a track cross land at a cost so it can pass under a bridge.
   A crossing this long is the beach, not a bridge; there is no inlet on this
   chart, so the sea and the Intracoastal do not join. Refuse and say so. */
const MAX_BRIDGE_CELLS = 6

export interface Plan extends RouteResult {
  /** what to do next; present only when the reason does not already say */
  hint?: string
  /** bridge crossings as runs of consecutive cells, each with a midpoint */
  crossings: Point[]
}

export function bridgeCrossings(bridges: number[]): Point[] {
  const runs: number[][] = []
  for (const c of bridges) {
    const last = runs[runs.length - 1]
    const x = c % GRID_W
    const y = Math.floor(c / GRID_W)
    const prev = last?.[last.length - 1]
    if (last && prev !== undefined && Math.hypot(x - (prev % GRID_W), y - Math.floor(prev / GRID_W)) <= 1.5) last.push(c)
    else runs.push([c])
  }
  return runs.map((run) => {
    const mid = run[Math.floor(run.length / 2)]!
    return { u: (mid % GRID_W) / (GRID_W - 1), v: Math.floor(mid / GRID_W) / 269 }
  })
}

export function planPassage(from: Point, to: Point, vessel: Vessel): Plan {
  const r = route({ from, to, draftFt: vessel.draftFt, airDraftFt: vessel.airDraftFt })
  if (r.ok && r.bridges.length > MAX_BRIDGE_CELLS) {
    return {
      ok: false,
      reason: 'That track would have to cross the beach. There is no inlet on this chart, so the sea and the Intracoastal do not join here.',
      hint: 'Start inside the waterway, or keep both points at sea.',
      points: [],
      cells: [],
      lengthNm: 0,
      minDepthFt: 0,
      bridges: [],
      crossings: [],
    }
  }
  const plan: Plan = { ...r, crossings: bridgeCrossings(r.bridges) }
  if (!r.ok && r.reason && !/Pick|Lower|leave/.test(r.reason)) {
    plan.hint = 'Reduce the draft, or pick a start nearer the channel.'
  }
  return plan
}

/** ETA at the planning speed, as "15 min" or "1 h 05 min". */
export function formatEta(lengthNm: number, speedKn = PLAN_SPEED_KN): string {
  const minutes = Math.max(1, Math.round((lengthNm / speedKn) * 60))
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h} h ${String(m).padStart(2, '0')} min`
}

/** Chaikin corner cutting so a grid path reads as a track, not a staircase. */
export function smoothTrack(points: Point[], passes = 2): Point[] {
  let pts = points
  for (let k = 0; k < passes && pts.length > 2; k++) {
    const out: Point[] = [pts[0]!]
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i]!
      const b = pts[i + 1]!
      out.push({ u: a.u * 0.75 + b.u * 0.25, v: a.v * 0.75 + b.v * 0.25 })
      out.push({ u: a.u * 0.25 + b.u * 0.75, v: a.v * 0.25 + b.v * 0.75 })
    }
    out.push(pts[pts.length - 1]!)
    pts = out
  }
  return pts
}
