import { describe, expect, it } from 'vitest'
import { PLACES } from './waterRouter'
import { buildTrack, durationLabel, fixAt, minutesLeft, nmBetween, speedAt, trafficAt, CRUISE_KN, NO_WAKE_KN, NO_WAKE, ageLabel } from './helm-view-scene'

describe('helm view scene', () => {
  const track = buildTrack()

  it('sails a real track from Sunrise Bay to Bahia Mar', () => {
    expect(track.ok).toBe(true)
    expect(track.points.length).toBeGreaterThan(10)
    expect(track.lengthNm).toBeGreaterThan(1)
    expect(track.lengthNm).toBeLessThan(5)
    expect(nmBetween(track.points[0]!, PLACES.sunriseBay)).toBeLessThan(0.05)
    expect(nmBetween(track.points[track.points.length - 1]!, PLACES.bahiaMar)).toBeLessThan(0.05)
  })

  it('places the vessel along the track and keeps the sums honest', () => {
    const start = fixAt(track, 0)
    const mid = fixAt(track, track.lengthNm / 2)
    const end = fixAt(track, track.lengthNm + 1)
    expect(start.remainingNm).toBeCloseTo(track.lengthNm, 5)
    expect(mid.sailedNm + mid.remainingNm).toBeCloseTo(track.lengthNm, 5)
    expect(end.remainingNm).toBe(0)
    expect(end.at).toEqual(track.points[track.points.length - 1])
    expect(start.headingDeg).toBeGreaterThanOrEqual(0)
    expect(start.headingDeg).toBeLessThan(360)
  })

  it('slows in the no-wake ring and counts the time that costs', () => {
    expect(speedAt(NO_WAKE)).toBe(NO_WAKE_KN)
    expect(speedAt(PLACES.sunriseBay)).toBe(CRUISE_KN)
    const mins = minutesLeft(track, fixAt(track, 0))
    expect(mins).toBeGreaterThan((track.lengthNm / CRUISE_KN) * 60)
    expect(mins).toBeLessThan((track.lengthNm / NO_WAKE_KN) * 60)
    expect(minutesLeft(track, fixAt(track, track.lengthNm))).toBe(0)
  })

  it('moves traffic out and back along its line', () => {
    const v = { id: 'x', name: 'x', friend: false, from: { u: 0, v: 0 }, to: { u: 0.1, v: 0 }, periodS: 100, phase: 0 }
    expect(trafficAt(v, 0).at.u).toBeCloseTo(0)
    expect(trafficAt(v, 50).at.u).toBeCloseTo(0.1)
    expect(trafficAt(v, 100).at.u).toBeCloseTo(0)
    expect(trafficAt(v, 25).headingDeg).toBeCloseTo(90)
    expect(trafficAt(v, 75).headingDeg).toBeCloseTo(270)
  })

  it('labels durations and ages in plain words', () => {
    expect(durationLabel(38)).toBe('38 min')
    expect(durationLabel(65)).toBe('1 h 05 min')
    expect(ageLabel(0)).toBe('just now')
    expect(ageLabel(3 * 60_000)).toBe('3 min ago')
    expect(ageLabel(2 * 3_600_000)).toBe('2 h ago')
  })
})
