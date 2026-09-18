import raw from './voyage-bahia-mar.json'

export interface VoyagePoint {
  /** normalised position on the basemap, 0–1 */
  u: number
  v: number
  /** along-track fraction, 0–1 */
  f: number
  speed: number
  heading: number
  depth: number
  voltage: number
  bilge: number
  etaMin: number
  runNm: number
}

export interface VoyageStage {
  key: 'plan' | 'underway' | 'approach' | 'berth'
  from: number
  to: number
}

export interface Voyage {
  vessel: { name: string; loa: number; beam: number; draft: number; airDraft: number }
  from: string
  to: string
  distanceNm: number
  durationMin: number
  arrival: string
  basemap: { width: number; height: number }
  route: VoyagePoint[]
  bridge: { f: number; name: string; clearance: number; datum: string; state: string }
  berth: { id: string; entry: number; mode: string; tie: string; depth: number; datum: string }
  stages: VoyageStage[]
}

/** A replay of one real passage, captured from the router rather than mocked. */
export default raw as Voyage
