/**
 * "A reading that ages" — the pure model behind the tiles.
 * Sample vessel, sample readings; nothing here is live product data.
 */

export type SensorKind = 'number' | 'state'
export type AgeVerb = 'read' | 'sounded' | 'reported'
export type Stage = 'fresh' | 'stale' | 'unknown'
export type StaleReason = 'link' | 'sensor'

export interface SensorDef {
  id: string
  label: string
  /** the verb the age line uses: "read 12 s ago", "sounded 12 s ago" */
  verb: AgeVerb
  unit: string
  kind: SensorKind
  decimals: number
  /** the first value the visitor sees */
  start: number
  /** numeric: half-width of the step noise; state: probability of being on */
  drift: number
  min: number
  max: number
  /** reporting cadence, ms */
  period: [number, number]
  /** for kind 'state': the words for 0 and 1 */
  states?: [string, string]
}

export const VESSEL = {
  name: 'Wanderer',
  note: 'sample vessel, sample readings',
  unit: 'Bilge unit · LoRaWAN',
}

export const STALE_AFTER_MS = 60_000
export const UNKNOWN_AFTER_MS = 300_000

export const SENSORS: SensorDef[] = [
  {
    id: 'voltage',
    label: 'Battery voltage',
    verb: 'read',
    unit: 'V',
    kind: 'number',
    decimals: 1,
    start: 13.3,
    drift: 0.08,
    min: 12.6,
    max: 13.8,
    period: [20_000, 32_000],
  },
  {
    id: 'current',
    label: 'Battery current',
    verb: 'read',
    unit: 'A',
    kind: 'number',
    decimals: 1,
    start: 2.5,
    drift: 0.35,
    min: 0.4,
    max: 6.5,
    period: [22_000, 36_000],
  },
  {
    id: 'bilge',
    label: 'Bilge water level',
    verb: 'sounded',
    unit: 'cm',
    kind: 'number',
    decimals: 1,
    start: 2.5,
    drift: 0.25,
    min: 0.4,
    max: 4.8,
    period: [26_000, 40_000],
  },
  {
    id: 'cabin',
    label: 'Cabin temperature',
    verb: 'read',
    unit: '°C',
    kind: 'number',
    decimals: 1,
    start: 31.4,
    drift: 0.12,
    min: 29.5,
    max: 33.5,
    period: [30_000, 40_000],
  },
  {
    id: 'pump',
    label: 'Bilge pump',
    verb: 'reported',
    unit: '',
    kind: 'state',
    decimals: 0,
    start: 0,
    drift: 0.12,
    min: 0,
    max: 1,
    period: [20_000, 30_000],
    states: ['Off', 'On'],
  },
]

export const PREDICTION = {
  label: 'Prediction',
  text: 'Bilge pump likely to run within 2 h',
  model: 'bilge-v3.2',
  /** how long before mount the model last ran, ms */
  computedAgoMs: 4 * 60_000 + 12_000,
}

export function stageFor(ageMs: number): Stage {
  if (ageMs >= UNKNOWN_AFTER_MS) return 'unknown'
  if (ageMs >= STALE_AFTER_MS) return 'stale'
  return 'fresh'
}

/** "12 s", "1 min 12 s", "14 min", "2 h 5 min", "3 d" — the brand's age stamp. */
export function formatAge(ageMs: number): string {
  const s = Math.max(0, Math.floor(ageMs / 1000))
  if (s < 60) return `${s} s`
  const m = Math.floor(s / 60)
  if (m < 10) return s % 60 ? `${m} min ${s % 60} s` : `${m} min`
  if (m < 60) return `${m} min`
  const h = Math.floor(m / 60)
  if (h < 24) return h < 6 && m % 60 ? `${h} h ${m % 60} min` : `${h} h`
  return `${Math.floor(h / 24)} d`
}

export function periodFor(def: SensorDef, rand: () => number = Math.random): number {
  const [lo, hi] = def.period
  return Math.round(lo + rand() * (hi - lo))
}

/**
 * The next reading: a random step with mild pull back toward the start
 * value, clamped to the sensor's range. The pump, when on, drains the bilge
 * and draws current.
 */
export function nextValue(
  def: SensorDef,
  prev: number,
  rand: () => number = Math.random,
  pumpOn = false,
): number {
  if (def.kind === 'state') return rand() < def.drift ? 1 : 0
  let v = prev + (def.start - prev) * 0.2 + (rand() * 2 - 1) * def.drift
  if (pumpOn && def.id === 'bilge') v -= 0.7
  if (pumpOn && def.id === 'current') v += 1.6
  v = Math.min(def.max, Math.max(def.min, v))
  return Number(v.toFixed(def.decimals))
}

export function formatValue(def: SensorDef, value: number): string {
  if (def.kind === 'state') return def.states?.[value ? 1 : 0] ?? String(value)
  return value.toFixed(def.decimals)
}

const PAST: Record<AgeVerb, string> = { read: 'read', sounded: 'sounded', reported: 'reported' }

/** The stale tile's copy. Calm, and it ends with what to do. */
export function staleCopy(
  stage: Stage,
  reason: StaleReason,
  verb: AgeVerb,
  age: string,
): { headline: string; body: string } {
  const headline = `Last ${PAST[verb]} ${age} ago`
  if (stage === 'unknown') {
    return {
      headline,
      body:
        reason === 'link'
          ? 'Treat this reading as unknown. Check the unit’s antenna, then its power.'
          : 'Treat this reading as unknown. Check the sensor lead, then the sensor.',
    }
  }
  return {
    headline,
    body:
      reason === 'link'
        ? 'The reading shown is from before that. Check the unit’s antenna.'
        : 'The unit is reporting; this sensor is not. Check the sensor lead.',
  }
}

/** Polyline points for a compact sparkline of the last readings. */
export function sparkPoints(values: number[], w = 100, h = 28, pad = 3): string {
  if (values.length < 2) return ''
  let lo = Math.min(...values)
  let hi = Math.max(...values)
  if (hi - lo < 1e-9) {
    lo -= 0.5
    hi += 0.5
  }
  const span = hi - lo
  const step = w / (values.length - 1)
  return values
    .map((v, i) => {
      const x = i * step
      const y = pad + (1 - (v - lo) / span) * (h - pad * 2)
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}
