import type { Berth, VesselDims } from './berth-fit-berths'

export const FT_TO_M = 0.3048

/** Under-keel margin the demo asks for at the datum, in metres. */
export const KEEL_MARGIN_M = 0.3

export const toM = (ft: number) => ft * FT_TO_M
export const fmtM = (metres: number, digits = 1) => `${metres.toFixed(digits)} m`
export const fmtFt = (ft: number) => (Number.isInteger(ft) ? `${ft} ft` : `${ft.toFixed(1)} ft`)

export interface FitReason {
  /** which dimension fails */
  dim: 'loa' | 'beam' | 'draft' | 'airDraft'
  /** short sentence, plain words, numbers with units */
  text: string
}

export interface FitResult {
  fits: boolean
  reasons: FitReason[]
  /** metres of berth length left over; null when the berth states no limit */
  loaSpareM: number | null
  /** metres of beam left over; null when the berth states no limit */
  beamSpareM: number | null
  /** metres of water under the keel at the datum */
  keelM: number
}

/**
 * Decide whether a vessel fits a berth, and say why not in the product's words:
 * "A-12 takes 18.0 m; this vessel is 19.4 m". Stated figures only, no tide credited,
 * compared at the datum. The dockmaster decides.
 */
export function fitCheck(vessel: VesselDims, berth: Berth): FitResult {
  const loa = toM(vessel.loa)
  const beam = toM(vessel.beam)
  const draft = toM(vessel.draft)
  const air = toM(vessel.airDraft)
  const reasons: FitReason[] = []

  const loaSpareM = berth.maxLoaM === null ? null : berth.maxLoaM - loa
  if (loaSpareM !== null && loaSpareM < 0) {
    reasons.push({
      dim: 'loa',
      text: `${berth.id} takes ${fmtM(berth.maxLoaM!)}; this vessel is ${fmtM(loa)}`,
    })
  }

  const beamSpareM = berth.maxBeamM === null ? null : berth.maxBeamM - beam
  if (beamSpareM !== null && beamSpareM < 0) {
    reasons.push({
      dim: 'beam',
      text: `${berth.id} takes ${fmtM(berth.maxBeamM!)} of beam; this vessel is ${fmtM(beam)} wide`,
    })
  }

  const keelM = berth.depthM - draft
  if (keelM < 0) {
    reasons.push({
      dim: 'draft',
      text: `${berth.id} has ${fmtM(berth.depthM)} of water at ${berth.datum}; this vessel draws ${fmtM(draft)} — ${fmtM(-keelM)} less water than it draws`,
    })
  } else if (keelM < KEEL_MARGIN_M) {
    reasons.push({
      dim: 'draft',
      text: `${berth.id} has ${fmtM(berth.depthM)} of water at ${berth.datum}; this vessel draws ${fmtM(draft)} — ${fmtM(keelM)} under the keel, short of the ${fmtM(KEEL_MARGIN_M)} asked for`,
    })
  }

  if (berth.overheadM !== null && air > berth.overheadM) {
    reasons.push({
      dim: 'airDraft',
      text: `${berth.id} has ${fmtM(berth.overheadM)} of cover; this vessel's air draft is ${fmtM(air)}`,
    })
  }

  return { fits: reasons.length === 0, reasons, loaSpareM, beamSpareM, keelM }
}

const TIE_WORD = { port: 'port-to', starboard: 'starboard-to', either: 'either side-to' } as const

/** The one-line approach brief the day board carries, e.g. "B-01 · enter 240° stern-in · starboard-to · 2.4 m MLLW". */
export function approachBrief(berth: Berth): string {
  const heading = `${String(berth.entryDeg).padStart(3, '0')}°`
  return `${berth.id} · enter ${heading} ${berth.mode} · ${TIE_WORD[berth.tie]} · ${fmtM(berth.depthM)} ${berth.datum}`
}
