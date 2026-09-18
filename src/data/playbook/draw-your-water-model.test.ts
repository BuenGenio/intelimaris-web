import { describe, expect, it } from 'vitest'
import {
  addDock,
  approachBrief,
  bearingDeg,
  berthPolygon,
  countBoard,
  countLine,
  dropBerth,
  dropMooring,
  emptyLayout,
  occupancy,
  pickVessel,
  resizeFromHandle,
  sampleLayout,
  snapAngle,
  unitsOf,
} from './draw-your-water-model'

describe('draw-your-water model', () => {
  it('reads compass bearings north-up', () => {
    expect(bearingDeg({ x: 0, y: -1 })).toBe(0)
    expect(bearingDeg({ x: 1, y: 0 })).toBe(90)
    expect(bearingDeg({ x: 0, y: 1 })).toBe(180)
    expect(bearingDeg({ x: -1, y: 0 })).toBe(270)
  })

  it('snaps a nearly-straight segment onto 15° steps and leaves others alone', () => {
    const snapped = snapAngle({ x: 0, y: 0 }, { x: 100, y: 3 })
    expect(Math.abs(snapped.y)).toBeLessThan(0.01)
    const free = snapAngle({ x: 0, y: 0 }, { x: 100, y: 14 })
    expect(free.y).toBe(14)
  })

  it('names berths per dock line and sets an entry heading square to it', () => {
    let layout = addDock(emptyLayout(), [
      { x: 100, y: 500 },
      { x: 500, y: 500 },
    ]).layout
    const first = dropBerth(layout, { x: 200, y: 520 }, 'slip', 40)!
    layout = first.layout
    expect(first.berth.name).toBe('A-01')
    // the berth hangs south of an east-west dock, so a vessel enters heading north
    expect(first.berth.entryDeg).toBe(0)
    const second = dropBerth(layout, { x: 300, y: 520 }, 'slip', 40)!
    expect(second.berth.name).toBe('A-02')
    expect(dropBerth(layout, { x: 300, y: 700 }, 'slip', 40)).toBeNull()
    const other = addDock(second.layout, [
      { x: 100, y: 100 },
      { x: 100, y: 300 },
    ]).layout
    expect(dropBerth(other, { x: 90, y: 200 }, 'slip', 40)!.berth.name).toBe('B-01')
  })

  it('snaps a berth flush against its neighbour', () => {
    const layout = addDock(emptyLayout(), [
      { x: 100, y: 500 },
      { x: 700, y: 500 },
    ]).layout
    const a = dropBerth(layout, { x: 300, y: 520 }, 'slip', 40)!
    const pitch = unitsOf(4.5 + 0.6)
    const b = dropBerth(a.layout, { x: 300 + pitch * 1.3, y: 520 }, 'slip', 40)!
    expect(b.snapped).toBe(true)
    expect(b.berth.foot.x).toBeCloseTo(300 + pitch, 5)
    const poly = berthPolygon(b.berth)
    expect(poly).toHaveLength(4)
    expect(Math.max(...poly.map((p) => p.y))).toBeCloseTo(500 + unitsOf(12), 5)
  })

  it('writes the approach brief in the product voice', () => {
    const layout = addDock(emptyLayout(), [
      { x: 100, y: 500 },
      { x: 500, y: 500 },
    ]).layout
    const { berth } = dropBerth(layout, { x: 200, y: 480 }, 'slip', 40)!
    expect(approachBrief(berth)).toBe('A-01 · enter 180° bow-in · starboard-to · 2.4 m MLLW')
    const ball = dropMooring(layout, { x: 50, y: 50 }).berth
    expect(approachBrief(ball)).toBe('M-01 · mooring ball · swing 25 m · 3.1 m MLLW')
  })

  it('keeps only free meaning free on the day board', () => {
    const layout = sampleLayout()
    expect(layout.berths).toHaveLength(3)
    expect(countLine(countBoard(layout.berths))).toBe('3 drawn · 3 free')
    const [a, b, c] = layout.berths as [typeof layout.berths[0], typeof layout.berths[0], typeof layout.berths[0]]
    const vessel = pickVessel(a, layout.berths)!
    expect(vessel.loaM).toBeLessThanOrEqual(a.loaM)
    a.vessel = vessel
    b.access = 'resident'
    c.closed = true
    expect([a, b, c].map(occupancy)).toEqual(['assigned', 'resident', 'closed'])
    expect(countLine(countBoard(layout.berths))).toBe('3 drawn · 1 assigned · 1 resident · 1 closed · 0 free')
    expect(pickVessel({ ...a, loaM: 5 }, layout.berths)).toBeNull()
  })

  it('resizes from the handle in half metres', () => {
    const layout = addDock(emptyLayout(), [
      { x: 100, y: 500 },
      { x: 500, y: 500 },
    ]).layout
    const { berth } = dropBerth(layout, { x: 200, y: 520 }, 'slip', 40)!
    expect(resizeFromHandle(berth, { x: 200, y: 500 + unitsOf(15.2) })).toEqual({ lengthM: 15 })
    expect(resizeFromHandle(berth, { x: 200, y: 500 })).toEqual({ lengthM: 6 })
  })
})
