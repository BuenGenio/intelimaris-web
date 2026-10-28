export interface BahiaMarDockLabel {
  readonly label: string
  /** Metres from the survey anchor: x east, y up, z south. */
  readonly position: readonly [x: number, y: number, z: number]
}

/**
 * Bahia Mar's nine main docks and the quay joining its two basins.
 *
 * Source: the existing marina-map response captured on 2026-10-27 at
 * https://api.waterwayz.dev/v0/marina/marinas/bahia-mar-resort-and-yachting-center-wfxpluj/map
 * (Experience2 snapshot e40b99946413562709dd44fb39dbfe501f3e4fe38ef1ab04c26187a8a01840c6).
 * The same centerlines are recorded in workspace/services/db/seed/dev-seed.sql,
 * with the chart reading documented in workspace/scripts/bahia-mar-chart.ts.
 *
 * These are the existing operator-drawn reference labels: letters from the
 * marina's published chart, centerlines traced on USDA NAIP flown 2023-01-11,
 * not yet marina-confirmed. Each anchor is the arc-length midpoint of its
 * centerline, converted using the scene-frame Mercator transform at
 * [-80.1071341, 26.1132454], the 2026-09-09 survey's own anchor. y = 1 is a
 * display anchor above the model's water zero, not a measured dock elevation.
 * Finger piers belong to their main dock; no extra letters are invented.
 */
export const BAHIA_MAR_DOCK_LABELS = [
  { label: 'A', position: [116.31, 1, 164.07] },
  { label: 'B', position: [60.67, 1, 170.66] },
  { label: 'C', position: [-2.53, 1, 162.23] },
  { label: 'D', position: [-119.68, 1, 144.65] },
  { label: 'E', position: [-159.99, 1, 129.94] },
  { label: 'F', position: [-112.61, 1, -192.06] },
  { label: 'G', position: [-0.73, 1, -181.85] },
  { label: 'H', position: [75.46, 1, -176.79] },
  { label: 'I', position: [131.61, 1, -173.04] },
  { label: 'Outer wall', position: [-136.27, 1, -37.12] },
] as const satisfies readonly BahiaMarDockLabel[]
