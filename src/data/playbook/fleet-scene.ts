/** Fictional fleet and recorded-track illustration. No network or operational claims. */
export const FLEET_MARKETS = [
  { id: 'company', label: 'Company', title: 'Company operations', detail: 'Keep work vessels and their teams in one operating picture.' },
  { id: 'rental', label: 'Rental', title: 'Rental & charter', detail: 'Follow each departure, return and last report across the hire fleet.' },
  { id: 'freight', label: 'Freight', title: 'Freight', detail: 'See the vessel carrying each job and its progress along the water.' },
  { id: 'logistics', label: 'Logistics', title: 'Marine logistics', detail: 'Coordinate transfers, service runs and arrivals from the same map.' },
  { id: 'safety', label: 'Safety', title: 'Safety & support', detail: 'Locate support vessels and distinguish an active report from an old fix.' },
] as const
export type FleetMarket = typeof FLEET_MARKETS[number]['id']
export type FleetPoint = readonly [number, number]
export type FleetStatus = 'Underway' | 'Alongside' | 'Attention' | 'Stale'
export interface DemoFleetVessel {
  id: string
  name: string
  market: FleetMarket
  job: string
  destination: string
  speedKn: number
  status: FleetStatus
  ageS: number
  note: string
  progress: number
  /** Normalized positions over the existing Fort Lauderdale satellite basemap. */
  track: readonly FleetPoint[]
}
export const DEMO_FLEET: readonly DemoFleetVessel[] = [
  { id: 'meridian', name: 'Meridian', market: 'company', job: 'Crew transfer · CT-204', destination: 'Bahia Mar', speedKn: 5.2, status: 'Underway', ageS: 4, progress: 0.40, note: 'Crew transfer in progress. Review the reported path before the next handover.', track: [[.34,.13],[.38,.21],[.40,.34],[.43,.46],[.47,.57],[.52,.70],[.58,.86]] },
  { id: 'rental-07', name: 'Rental 07', market: 'rental', job: 'Afternoon hire · RN-107', destination: 'Sunrise Bay', speedKn: 4.1, status: 'Underway', ageS: 8, progress: 0.55, note: 'Returning north. The duty team can compare the last report with the agreed return.', track: [[.57,.83],[.51,.69],[.46,.55],[.42,.43],[.39,.30],[.37,.18],[.32,.12]] },
  { id: 'atlas', name: 'Atlas', market: 'freight', job: 'Coastal freight · FR-312', destination: 'Port Everglades approach', speedKn: 10.8, status: 'Underway', ageS: 12, progress: 0.38, note: 'Coastal transit. Cargo and job labels in this demonstration are fictional.', track: [[.79,.12],[.81,.29],[.83,.46],[.86,.64],[.89,.84]] },
  { id: 'harbour-04', name: 'Harbour 04', market: 'logistics', job: 'Supply run · LG-082', destination: 'Bahia Mar service berth', speedKn: 0, status: 'Alongside', ageS: 6, progress: 1, note: 'Alongside for a scheduled supply handover. A stopped vessel is distinct from a missing report.', track: [[.45,.52],[.49,.63],[.54,.76],[.60,.81],[.62,.80]] },
  { id: 'sentinel', name: 'Sentinel', market: 'safety', job: 'Support patrol · SF-016', destination: 'Las Olas sector', speedKn: 6.3, status: 'Attention', ageS: 3, progress: .72, note: 'Example advisory: review the patrol check-in with the duty team. This demo does not send or dispatch an alert.', track: [[.37,.16],[.39,.27],[.42,.40],[.45,.51],[.49,.62]] },
  { id: 'rental-12', name: 'Rental 12', market: 'rental', job: 'Day hire · RN-112', destination: 'Last report: Intracoastal', speedKn: 3.8, status: 'Stale', ageS: 840, progress: .24, note: 'Position updates stopped 14 minutes before this example began. Its marker stays at the last reported fix; speed is historical.', track: [[.57,.84],[.54,.76],[.50,.65],[.46,.55],[.42,.43]] },
]

const distance = (a: FleetPoint, b: FleetPoint) => Math.hypot((a[0] - b[0]) * 479, (a[1] - b[1]) * 269) / 77.6

/** At 12× replay speed, movement follows the stated knots; stale fixes never advance. */
export function fleetFix(vessel: DemoFleetVessel, elapsedS: number) {
  const segments = vessel.track.slice(1).map((point, i) => distance(vessel.track[i]!, point))
  const totalNm = segments.reduce((sum, n) => sum + n, 0)
  const travelledNm = Math.min(totalNm, vessel.progress * totalNm + (vessel.status === 'Stale' ? 0 : Math.max(0, elapsedS) * 12 * vessel.speedKn / 3600))
  let remaining = travelledNm
  let index = 0
  while (index < segments.length - 1 && remaining > segments[index]!) remaining -= segments[index++]!
  const from = vessel.track[index]!
  const to = vessel.track[index + 1]!
  const t = segments[index]! > 0 ? Math.min(1, remaining / segments[index]!) : 0
  const point: FleetPoint = [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t]
  const arrived = travelledNm >= totalNm
  return {
    point,
    path: [...vessel.track.slice(0, index + 1), point],
    course: (Math.atan2((to[0] - from[0]) * 16, -(to[1] - from[1]) * 9) * 180 / Math.PI + 360) % 360,
    speedKn: arrived && vessel.status !== 'Stale' ? 0 : vessel.speedKn,
    status: arrived && vessel.status === 'Underway' ? 'Alongside' as const : vessel.status,
    remainingNm: Math.max(0, totalNm - travelledNm),
    ageS: vessel.ageS + (vessel.status === 'Stale' ? Math.max(0, elapsedS) : 0),
  }
}
export function filterFleet(market: string, query: string, attentionOnly: boolean) {
  const search = query.trim().toLowerCase()
  return DEMO_FLEET.filter(v => (market === 'all' || v.market === market)
    && (!attentionOnly || v.status === 'Attention' || v.status === 'Stale')
    && `${v.name} ${v.job} ${v.destination}`.toLowerCase().includes(search))
}
export function fleetAge(seconds: number) {
  return seconds < 60 ? `${Math.floor(seconds)} s ago` : `${Math.floor(seconds / 60)} min ago`
}
