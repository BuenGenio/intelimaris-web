import { describe, expect, it } from 'vitest'
import { NM_PER_CELL, PLACES } from './waterRouter'
import { buildTrack, durationLabel, fixAt, minutesLeft, nextGate, nmBetween, speedAt, trafficAt, CRUISE_KN, NO_WAKE_KN, NO_WAKE, ageLabel, onWater, snapToWater, DEBRIS, TRAFFIC } from './helm-view-scene'

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

  it('names the next gate on the line: the no-wake zone, then the marina approach', () => {
    const start = nextGate(track, fixAt(track, 0))
    expect(start.label).toBe('No wake')
    expect(start.inside).toBe(false)
    expect(start.nm).toBeGreaterThan(0)
    expect(start.nm).toBeLessThan(track.lengthNm)
    /* sail up to the zone: the gate distance runs down to zero, then we are inside it */
    const inside = fixAt(track, start.nm + 0.01)
    expect(nextGate(track, inside).inside).toBe(true)
    /* past it, only the approach is left, and its distance is what remains */
    let s = start.nm
    while (s < track.lengthNm && nextGate(track, fixAt(track, s)).label !== 'Approach') s += 0.02
    const last = fixAt(track, s)
    expect(nextGate(track, last)).toEqual({ label: 'Approach', nm: last.remainingNm, inside: false })
  })

  it('keeps every vessel and every hazard on the water', () => {
    /* a smoothed corner or a bridge may sit a hair off the mask; roaming over land is a cell or more */
    const strays = (p: { u: number; v: number }) => nmBetween(p, snapToWater(p)) / NM_PER_CELL
    for (const d of DEBRIS) expect(onWater(d)).toBe(true)
    for (const v of TRAFFIC) {
      for (let t = 0; t < v.periodS; t += v.periodS / 40) expect(strays(trafficAt(v, t).at)).toBeLessThan(2.5)
    }
    /* the own track ducks under the Las Olas bridge, a couple of cells of land by design */
    for (let s = 0; s <= track.lengthNm; s += track.lengthNm / 60) expect(strays(fixAt(track, s).at)).toBeLessThan(2.5)
  })

  it('snaps a point ashore to the nearest water and leaves one afloat alone', () => {
    const afloat = PLACES.sunriseBay
    expect(snapToWater(afloat)).toBe(afloat)
    const ashore = { u: 0.05, v: 0.05 }
    const snapped = snapToWater(ashore, 400)
    expect(onWater(snapped)).toBe(true)
  })

  it('moves traffic out along its track and back, turning round at the far end', () => {
    const v = TRAFFIC[0]!
    const start = trafficAt(v, (0 - v.phase) * v.periodS).at
    const far = trafficAt(v, (0.5 - v.phase) * v.periodS).at
    const back = trafficAt(v, (1 - v.phase) * v.periodS).at
    expect(nmBetween(start, back)).toBeLessThan(0.01)
    expect(nmBetween(start, far)).toBeGreaterThan(0.2)
    const outHeading = trafficAt(v, (0.25 - v.phase) * v.periodS).headingDeg
    const backHeading = trafficAt(v, (0.75 - v.phase) * v.periodS).headingDeg
    expect(Math.abs(((outHeading - backHeading + 360) % 360) - 180)).toBeLessThan(60)
  })

  it('labels durations and ages in plain words', () => {
    expect(durationLabel(38)).toBe('38 min')
    expect(durationLabel(65)).toBe('1 h 05 min')
    expect(ageLabel(0)).toBe('just now')
    expect(ageLabel(3 * 60_000)).toBe('3 min ago')
    expect(ageLabel(2 * 3_600_000)).toBe('2 h ago')
  })
})
