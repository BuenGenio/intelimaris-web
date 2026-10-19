import { describe, expect, it } from 'vitest'
import { DEMO_FLEET, FLEET_MARKETS, filterFleet, fleetFix } from './fleet-scene'

describe('fleet demonstration reports', () => {
  it('keeps a stale fix and historical speed unchanged while the report ages', () => {
    const vessel = DEMO_FLEET.find(v => v.status === 'Stale')!
    const before = fleetFix(vessel, 0), after = fleetFix(vessel, 120)
    expect(after.point).toEqual(before.point)
    expect(after.path).toEqual(before.path)
    expect(after.speedKn).toBe(3.8)
    expect(after.ageS).toBe(before.ageS + 120)
    expect(after.status).toBe('Stale')
  })
  it('moves recent reports at the stated speed on the 12× replay clock and stops at arrival', () => {
    const vessel = DEMO_FLEET[0]!
    const before = fleetFix(vessel, 0), after = fleetFix(vessel, 5)
    expect(before.remainingNm - after.remainingNm).toBeCloseTo(vessel.speedKn * 5 * 12 / 3600)
    expect(after.point).not.toEqual(before.point)
    const arrived = fleetFix(vessel, 36000)
    expect(arrived.point).toEqual(vessel.track.at(-1))
    expect(arrived.status).toBe('Alongside')
    expect(arrived.speedKn).toBe(0)
  })
  it('includes every target market and composes search, market and attention filters', () => {
    for (const market of FLEET_MARKETS) expect(filterFleet(market.id, '', false).length).toBeGreaterThan(0)
    expect(filterFleet('rental', '', false).map(v => v.id)).toEqual(['rental-07', 'rental-12'])
    expect(filterFleet('rental', '', true).map(v => v.id)).toEqual(['rental-12'])
    expect(filterFleet('all', '  ct-204  ', false).map(v => v.id)).toEqual(['meridian'])
    expect(filterFleet('freight', 'meridian', false)).toEqual([])
  })
})
