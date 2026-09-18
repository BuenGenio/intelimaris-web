import { describe, expect, it } from 'vitest'
import {
  SENSORS,
  STALE_AFTER_MS,
  UNKNOWN_AFTER_MS,
  formatAge,
  formatValue,
  nextValue,
  periodFor,
  sparkPoints,
  stageFor,
  staleCopy,
} from './aging-reading-model'

const BANNED = /\b(intelligent|smart|ai-powered|seamless|guarantee|always|never|100%)\b/i

describe('aging-reading model', () => {
  it('formats an age the way the brand stamps it', () => {
    expect(formatAge(0)).toBe('0 s')
    expect(formatAge(12_400)).toBe('12 s')
    expect(formatAge(60_000)).toBe('1 min')
    expect(formatAge(72_000)).toBe('1 min 12 s')
    expect(formatAge(14 * 60_000)).toBe('14 min')
    expect(formatAge(2 * 3_600_000 + 5 * 60_000)).toBe('2 h 5 min')
    expect(formatAge(3 * 86_400_000)).toBe('3 d')
    expect(formatAge(-5)).toBe('0 s')
  })

  it('turns stale at 1 min and unknown at 5 min', () => {
    expect(stageFor(STALE_AFTER_MS - 1)).toBe('fresh')
    expect(stageFor(STALE_AFTER_MS)).toBe('stale')
    expect(stageFor(UNKNOWN_AFTER_MS - 1)).toBe('stale')
    expect(stageFor(UNKNOWN_AFTER_MS)).toBe('unknown')
  })

  it('writes stale copy that ends with what to do, calmly', () => {
    for (const stage of ['stale', 'unknown'] as const) {
      for (const reason of ['link', 'sensor'] as const) {
        const c = staleCopy(stage, reason, 'read', '1 min 12 s')
        expect(c.headline).toBe('Last read 1 min 12 s ago')
        expect(c.body).toMatch(/^.*Check .*\.$/)
        expect(c.body).not.toMatch(/!/)
        expect(c.body).not.toMatch(BANNED)
      }
    }
    expect(staleCopy('stale', 'link', 'sounded', '1 min').headline).toBe('Last sounded 1 min ago')
  })

  it('steps readings within each sensor’s range and precision', () => {
    let seed = 7
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
    for (const def of SENSORS) {
      let v = def.start
      for (let i = 0; i < 200; i++) {
        v = nextValue(def, v, rand, i % 5 === 0)
        expect(v).toBeGreaterThanOrEqual(def.min)
        expect(v).toBeLessThanOrEqual(def.max)
        expect(Number(v.toFixed(def.decimals))).toBe(v)
      }
      const p = periodFor(def, rand)
      expect(p).toBeGreaterThanOrEqual(def.period[0])
      expect(p).toBeLessThanOrEqual(def.period[1])
    }
  })

  it('names pump states in words and numbers with their decimals', () => {
    const pump = SENSORS.find((s) => s.id === 'pump')!
    const volts = SENSORS.find((s) => s.id === 'voltage')!
    expect(formatValue(pump, 0)).toBe('Off')
    expect(formatValue(pump, 1)).toBe('On')
    expect(formatValue(volts, 13.3)).toBe('13.3')
  })

  it('draws a sparkline that spans the box and copes with flat data', () => {
    const pts = sparkPoints([1, 2, 3], 100, 28).split(' ')
    expect(pts).toHaveLength(3)
    expect(pts[0]).toBe('0.0,25.0')
    expect(pts[2]).toBe('100.0,3.0')
    expect(sparkPoints([2, 2, 2]).split(' ').every((p) => p.endsWith(',14.0'))).toBe(true)
    expect(sparkPoints([1])).toBe('')
  })
})
