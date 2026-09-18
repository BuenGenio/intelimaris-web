import { describe, expect, it } from 'vitest'
import {
  CRUISE_KN,
  HAZARD_TYPES,
  NO_WAKE_KN,
  RADIUS_MAX,
  RADIUS_MIN,
  SAMPLE_HAZARDS,
  TO,
  deltaText,
  hazardEffect,
  makeHazard,
  passageMinutes,
  plan,
  pointAlong,
  trackLengthNm,
} from './hazard-reroute-plan'

const planned = plan([])

describe('hazard-reroute plan', () => {
  it('plans the passage with no hazards', () => {
    expect(planned.result.ok).toBe(true)
    expect(planned.lengthNm).toBeGreaterThan(1.5)
    expect(planned.minutes).toBeCloseTo((planned.lengthNm / CRUISE_KN) * 60, 5)
    expect(planned.slowNm).toBe(0)
  })

  it('keeps every type radius inside the picker range', () => {
    for (const t of HAZARD_TYPES) {
      expect(t.radius).toBeGreaterThanOrEqual(RADIUS_MIN)
      expect(t.radius).toBeLessThanOrEqual(RADIUS_MAX)
    }
    expect(makeHazard(1, 'shoal', TO, 99, 0).radius).toBe(RADIUS_MAX)
  })

  it('routes around a blocking hazard dropped mid-track', () => {
    const mid = pointAlong(planned.result.points, 0.5)
    const h = makeHazard(1, 'shoal', mid, 5, 0)
    const p = plan([h])
    expect(p.result.ok).toBe(true)
    const ring = new Set(h.cells)
    expect(p.result.cells.some((c) => ring.has(c))).toBe(false)
    expect(p.lengthNm).toBeGreaterThan(planned.lengthNm)
    expect(hazardEffect(h, p, planned).onPlanned).toBe(true)
    expect(hazardEffect(h, p, planned).onTrack).toBe(false)
    expect(deltaText(p, planned)).toMatch(/^\+\d\.\d NM · (\+\d+ min|same time) at 8\.4 kn$/)
  })

  it('does not reroute for a no-wake zone, but costs time', () => {
    const mid = pointAlong(planned.result.points, 0.5)
    const h = makeHazard(2, 'no-wake', mid, 6, 0)
    const p = plan([h])
    expect(p.result.ok).toBe(true)
    expect(p.result.cells).toEqual(planned.result.cells)
    expect(p.slowNm).toBeGreaterThan(0)
    expect(p.minutes).toBeGreaterThan(planned.minutes)
    const effect = hazardEffect(h, p, planned)
    expect(effect.onTrack).toBe(true)
    expect(effect.text).toContain(`${NO_WAKE_KN} kn`)
    expect(deltaText(p, planned)).toMatch(/^same distance · \+\d+ min 5 kn in the zone$/)
  })

  it('relaxes back when the hazard is cleared', () => {
    const mid = pointAlong(planned.result.points, 0.5)
    const h = makeHazard(3, 'debris', mid, 4, 0)
    h.status = 'cleared'
    const p = plan([h])
    expect(p.result.cells).toEqual(planned.result.cells)
    expect(hazardEffect(h, p, planned).text).toMatch(/Cleared/)
  })

  it('refuses with the router reason when the destination is inside a ring', () => {
    const h = makeHazard(4, 'dredging', TO, 6, 0)
    const p = plan([h])
    expect(p.result.ok).toBe(false)
    expect(p.result.reason).toBeTruthy()
    expect(hazardEffect(h, p, planned).text).toMatch(/^Covers Bahia Mar\. No route reaches the berth\.$/)
    /* an innocent hazard elsewhere is not blamed for the refusal */
    const bystander = makeHazard(5, 'debris', pointAlong(planned.result.points, 0.5), 3, 0)
    const p2 = plan([h, bystander])
    expect(p2.result.ok).toBe(false)
    expect(hazardEffect(bystander, p2, planned).text).toBe('On the planned track.')
  })

  it('times a track from its cells', () => {
    const cells = planned.result.cells
    const nm = trackLengthNm(cells)
    expect(passageMinutes(cells, new Set())).toBeCloseTo((nm / CRUISE_KN) * 60, 6)
    expect(passageMinutes(cells, new Set(cells))).toBeCloseTo((nm / NO_WAKE_KN) * 60, 6)
  })

  it('has sample hazards that each land on the water', () => {
    for (const s of SAMPLE_HAZARDS) {
      const at = pointAlong(planned.result.points, s.fraction)
      const p = plan([makeHazard(9, s.kind, at, s.radius, 0)])
      expect(p.result.ok, s.kind).toBe(true)
    }
  })
})
