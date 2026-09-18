/**
 * Pure helpers for the "Orbit the scan" stage: easing, byte formatting, the
 * slate-to-maris height ramp, orbit nudging and the depth packing used for
 * pin occlusion. No three.js here so it stays testable and tree-shakeable.
 */

export interface Vec3 { x: number; y: number; z: number }

export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3)

export function formatBytes(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} MB`
  if (n >= 1_000) return `${Math.round(n / 1_000)} kB`
  return `${n} B`
}

/** Height ramp, low to high: slate, maris deep, maris day, maris night, maris tint. */
export const RAMP_HEX = ['#242C38', '#112D4C', '#1B5E9E', '#3D8EE0', '#BBCFE2'] as const
export const RAMP_MAX_M = 14

export function hexToRgb01(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255]
}

export const rampCss = (): string => `linear-gradient(90deg, ${RAMP_HEX.join(', ')})`

/** Bit depth packed into two bytes; distance is a fraction of the max range. */
export function unpackDepth(hi: number, lo: number, maxDist: number): number {
  return ((hi * 256 + lo) / 65535) * maxDist
}

const MIN_ELEVATION = 0.03
const MAX_ELEVATION = Math.PI / 2 - 0.02

/**
 * Rotate a camera offset (camera minus target, z up) by an azimuth and an
 * elevation step. Distance is preserved; elevation is clamped so the camera
 * never goes below the water or over the pole.
 */
export function nudgeOrbit(offset: Vec3, dAzimuth: number, dElevation: number): Vec3 {
  const r = Math.hypot(offset.x, offset.y, offset.z) || 1
  const horiz = Math.hypot(offset.x, offset.y)
  let az = Math.atan2(offset.y, offset.x) + dAzimuth
  let el = Math.atan2(offset.z, horiz) + dElevation
  el = Math.min(MAX_ELEVATION, Math.max(MIN_ELEVATION, el))
  if (horiz < 1e-6) az = -Math.PI / 2
  return { x: r * Math.cos(el) * Math.cos(az), y: r * Math.cos(el) * Math.sin(az), z: r * Math.sin(el) }
}

/** An offset at a given distance and elevation that keeps the current azimuth. */
export function frameOffset(offset: Vec3, distance: number, elevation: number): Vec3 {
  const horiz = Math.hypot(offset.x, offset.y)
  const az = horiz < 1e-6 ? -Math.PI / 2 : Math.atan2(offset.y, offset.x)
  const el = Math.min(MAX_ELEVATION, Math.max(MIN_ELEVATION, elevation))
  return { x: distance * Math.cos(el) * Math.cos(az), y: distance * Math.cos(el) * Math.sin(az), z: distance * Math.sin(el) }
}
