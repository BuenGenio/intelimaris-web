import { describe, expect, it } from 'vitest'
import { PLACES, cellOf, depthAt, disc, isWater, route } from './waterRouter'

describe('waterRouter', () => {
  it('knows the named places are on the water', () => {
    for (const p of Object.values(PLACES)) {
      const c = cellOf(p)
      expect(isWater(c % 480, Math.floor(c / 480)), p.label).toBe(true)
    }
  })

  it('routes from Sunrise Bay to Bahia Mar', () => {
    const r = route({ from: PLACES.sunriseBay, to: PLACES.bahiaMar, draftFt: 4 })
    expect(r.ok).toBe(true)
    expect(r.points.length).toBeGreaterThan(20)
    expect(r.lengthNm).toBeGreaterThan(1)
    expect(r.minDepthFt).toBeGreaterThanOrEqual(4)
  })

  it('refuses and says why', () => {
    const r = route({ from: PLACES.sunriseBay, to: PLACES.bahiaMar, airDraftFt: 40 })
    expect(r.ok).toBe(false)
    expect(r.reason).toMatch(/air draft/)
  })

  it('re-plans around a hazard', () => {
    const base = route({ from: PLACES.sunriseBay, to: PLACES.bahiaMar })
    const mid = base.cells[Math.floor(base.cells.length / 2)]!
    const blocked = disc({ u: (mid % 480) / 479, v: Math.floor(mid / 480) / 269 }, 4)
    const r = route({ from: PLACES.sunriseBay, to: PLACES.bahiaMar, blocked })
    expect(r.ok).toBe(true)
    expect(r.cells.some((c) => blocked.includes(c))).toBe(false)
  })

  it('reports deeper water away from shore', () => {
    const c = cellOf(PLACES.bahiaMar)
    expect(depthAt(c)).toBeGreaterThan(2)
  })
})
