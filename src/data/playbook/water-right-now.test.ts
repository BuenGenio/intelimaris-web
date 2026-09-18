import { beforeEach, describe, expect, it } from 'vitest'
import { MARINAS } from './water-right-now-marinas'
import {
  ageLabel,
  cachedJson,
  compassPoint,
  coopsStamp,
  levelAt,
  nearestMarina,
  nextSunEvents,
  parseGmt,
  parseObservation,
  parseObserved,
  parsePredictions,
  resetCache,
  sunTimes,
  tideNow,
  untilLabel,
} from './water-right-now-conditions'

const EDT = -4 * 3600000

describe('sun times', () => {
  it('lands within a few minutes of the almanac for Fort Lauderdale on 18 Sep 2026', () => {
    const noonUtc = Date.UTC(2026, 8, 18, 16, 0)
    const s = sunTimes(noonUtc, 26.113, -80.107)
    // Almanac: sunrise 07:08, sunset 19:20 EDT (give or take a minute).
    const sunrise = Date.UTC(2026, 8, 18, 7, 8) - EDT
    const sunset = Date.UTC(2026, 8, 18, 19, 20) - EDT
    expect(Math.abs(s.sunrise! - sunrise)).toBeLessThan(5 * 60000)
    expect(Math.abs(s.sunset! - sunset)).toBeLessThan(5 * 60000)
  })

  it('reports no rise or set inside the polar night', () => {
    const s = sunTimes(Date.UTC(2026, 11, 21, 12), 80, 0)
    expect(s.sunrise).toBeNull()
    expect(s.sunset).toBeNull()
  })

  it('finds the next sunrise after sunset', () => {
    const lateEvening = Date.UTC(2026, 8, 19, 2, 0) // 22:00 EDT on the 18th
    const n = nextSunEvents(lateEvening, 26.113, -80.107)
    expect(n.sunrise).not.toBeNull()
    expect(n.sunrise!).toBeGreaterThan(lateEvening)
    expect(n.sunrise! - lateEvening).toBeLessThan(12 * 3600000)
    expect(n.sunset! - lateEvening).toBeGreaterThan(12 * 3600000)
  })
})

describe('tide maths', () => {
  const curve = Array.from({ length: 61 }, (_, i) => ({ t: i * 600000, v: Math.sin((i / 60) * Math.PI) * 2 }))

  it('interpolates inside the curve and refuses outside it', () => {
    // halfway between points 0 and 1: linear, so half of 2·sin(π/60)
    expect(levelAt(curve, 300000)).toBeCloseTo(Math.sin(Math.PI / 60), 3)
    expect(levelAt(curve, -1)).toBeNull()
    expect(levelAt(curve, 61 * 600000)).toBeNull()
  })

  it('says rising on the way up and falling on the way down, with the next extreme', () => {
    const extremes = [
      { t: 30 * 600000, v: 2, type: 'H' as const },
      { t: 60 * 600000, v: 0, type: 'L' as const },
    ]
    const up = tideNow(curve, extremes, 10 * 600000)
    expect(up.trend).toBe('rising')
    expect(up.rate!).toBeGreaterThan(0)
    expect(up.next?.type).toBe('H')
    const down = tideNow(curve, extremes, 45 * 600000)
    expect(down.trend).toBe('falling')
    expect(down.next?.type).toBe('L')
    expect(down.prev?.type).toBe('H')
  })

  it('says unknown with no curve', () => {
    expect(tideNow([], [], 0).trend).toBe('unknown')
  })
})

describe('parsing', () => {
  it('reads CO-OPS GMT stamps and writes them back', () => {
    const t = parseGmt('2026-09-18 18:00')
    expect(t).toBe(Date.UTC(2026, 8, 18, 18, 0))
    expect(coopsStamp(t)).toBe('20260918 18:00')
  })

  it('parses predictions and the latest observation', () => {
    const pts = parsePredictions({ predictions: [{ t: '2026-09-18 18:00', v: '2.669' }, { t: 'bad', v: 'x' }] })
    expect(pts).toEqual([{ t: Date.UTC(2026, 8, 18, 18), v: 2.669 }])
    expect(parseObserved({ data: [{ t: '2026-09-18 22:00', v: '2.369' }] })).toEqual({ t: Date.UTC(2026, 8, 18, 22), v: 2.369 })
    expect(parseObserved({ error: { message: 'No data was found.' } })).toBeNull()
  })

  it('parses an NWS observation and keeps nulls honest', () => {
    const w = parseObservation(
      {
        properties: {
          timestamp: '2026-09-18T21:45:00+00:00',
          textDescription: 'Light Rain',
          temperature: { value: 24 },
          windSpeed: { value: 0 },
          windGust: { value: null },
          windDirection: { value: 0 },
        },
      },
      'KFLL',
      'Fort Lauderdale',
      1,
    )
    expect(w?.tempC).toBe(24)
    expect(w?.windKmh).toBe(0)
    expect(w?.gustKmh).toBeNull()
    expect(parseObservation({}, 'KFLL', 'x', 1)).toBeNull()
  })
})

describe('labels', () => {
  it('ages and countdowns read the way the brand writes them', () => {
    expect(ageLabel(10000)).toBe('just now')
    expect(ageLabel(6 * 60000)).toBe('6 min ago')
    expect(ageLabel(125 * 60000)).toBe('2 h 5 min ago')
    expect(ageLabel(3 * 86400000)).toBe('3 d ago')
    expect(untilLabel(43 * 60000)).toBe('in 43 min')
    expect(untilLabel(72 * 60000)).toBe('in 1 h 12 min')
  })

  it('names compass points', () => {
    expect(compassPoint(0)).toBe('N')
    expect(compassPoint(45)).toBe('NE')
    expect(compassPoint(359)).toBe('N')
    expect(compassPoint(200)).toBe('SSW')
  })
})

describe('marinas', () => {
  it('has six, each with a tide station and a zone', () => {
    expect(MARINAS).toHaveLength(6)
    for (const m of MARINAS) {
      expect(m.tide.id).toMatch(/^\d{7}$/)
      expect(m.tz).toBe('America/New_York')
    }
  })

  it('picks the nearest of the six to a point', () => {
    const near = nearestMarina(MARINAS, 25.79, -80.13) // downtown Miami
    expect(near.marina.id).toBe('miami-beach')
    expect(near.km).toBeLessThan(5)
  })
})

describe('cache', () => {
  beforeEach(() => resetCache())

  it('asks a URL once per session window', async () => {
    let calls = 0
    const fake = (async () => {
      calls++
      return { ok: true, status: 200, json: async () => ({ n: calls }) } as Response
    }) as unknown as typeof fetch
    const a = await cachedJson('https://example.test/a', {}, fake)
    const b = await cachedJson('https://example.test/a', {}, fake)
    expect(a).toEqual(b)
    expect(calls).toBe(1)
  })

  it('surfaces a failure rather than hanging', async () => {
    const fake = (async () => ({ ok: false, status: 503, json: async () => ({}) }) as Response) as unknown as typeof fetch
    await expect(cachedJson('https://example.test/down', {}, fake)).rejects.toThrow('503')
  })
})
