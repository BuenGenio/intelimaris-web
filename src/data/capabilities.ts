import type { ShotId } from './shots'

export interface Capability {
  id: string
  label: string
  product: string
  headline: string
  summary: string
  shot: ShotId
  caption: string
  availability: string
  steps: { title: string; body: string }[]
  available: string[]
  pending: string[]
  related: string[]
  chart?: boolean
}

export const CAPABILITIES: Capability[] = [
  {
    id: 'navigation', label: 'Navigation', product: 'WaterWAYZ',
    headline: 'Read the water. Keep the context.',
    summary: 'Bring the vessel, chart, destinations and available traffic information into one view. Switch perspective without losing the passage you are following.',
    shot: 'waterwayz-map', caption: 'The Above view: vessel, route and nearby places on the same chart.',
    availability: 'Map and vessel views are implemented. Layer coverage, connectivity and data freshness affect what can be shown.',
    steps: [
      { title: 'Find your destination', body: 'Search for a marina or place, open its details and start a passage from that result. See the approach information before deciding to go.' },
      { title: 'Choose the view that helps', body: 'Helm, Above and 3D cameras give different perspectives. Available map, satellite, nautical and seamark layers show the same vessel and route in context.' },
      { title: 'Understand the information', body: 'Inspect charted depths, available vessel traffic and nearby hazards. Unknown depths or clearances remain unknown; a map view is not a guarantee of a safe passage.' },
    ],
    available: ['Destination search and marina details', 'Vessel position and route views', 'Chart, satellite and available nautical layers', 'Passage replay using the planned route’s timing'],
    pending: ['Coverage and offline content depend on the data bundle and area. Confirm the required region before departure.'],
    related: ['route-planning', 'hazard-reporting', 'dockpass'], chart: true,
  },
  {
    id: 'route-planning', label: 'Route planning', product: 'WaterWAYZ',
    headline: 'A passage planned for your vessel.',
    summary: 'Choose the two ends of a passage and let the planner evaluate the route against your vessel’s dimensions and the available waterway information.',
    shot: 'waterwayz-route', caption: 'Review the passage, arrival time and conditions before setting off.',
    availability: 'The planner and route-service integration are implemented. Results depend on mapped coverage, vessel inputs and available environmental data.',
    steps: [
      { title: 'Choose both ends', body: 'Plan from your current area or a different departure. Swap the ends or change either marina without rebuilding the vessel profile.' },
      { title: 'Use the right vessel figures', body: 'Length, beam, draft and air draft inform the passage. Review tide, bridge and weather constraints where the necessary data is available.' },
      { title: 'Inspect the result, including refusals', body: 'Review distance, duration, waits and the route. If a corridor is not routable or a bridge cannot be cleared, the reason is part of the answer. Omitted or unknown inputs are not silently treated as safe.' },
    ],
    available: ['Departure and destination selection', 'Vessel-specific planning inputs', 'Route distance, duration and constraint information', 'Ride Along playback on the route’s own clock'],
    pending: ['Route coverage is not universal. Unknown bridge clearance, missing air draft and incomplete chart data need the operator’s attention.'],
    related: ['navigation', 'hazard-reporting', 'dockpass'], chart: true,
  },
  {
    id: 'hazard-reporting', label: 'Hazards & reporting', product: 'WaterWAYZ',
    headline: 'Know what was reported. Know how recently.',
    summary: 'Read nearby hazards with their severity, status and provenance. Community reporting is the next part of the workflow, and its availability is stated separately.',
    shot: 'waterwayz-map', caption: 'Hazards belong in the context of the water and the passage.',
    availability: 'Hazard viewing is implemented. Submitting, confirming and clearing community reports are in development in the current web app.',
    steps: [
      { title: 'Read the hazard', body: 'Inspect its type, severity, status and the age of the report. Distance and bearing use a position fix when available; otherwise the view identifies its reference area.' },
      { title: 'Judge the evidence', body: 'A report and a confirmed observation are different facts. Use source and freshness information alongside official notices and your own observations.' },
      { title: 'Contribute when reporting is available', body: 'The intended workflow is to place a report, add context, confirm it when still present and clear it when gone. Those submission actions are not yet connected in the web interface.' },
    ],
    available: ['Nearby hazard list', 'Severity, category and status', 'Report age and provenance', 'Distance and bearing with the reference location identified'],
    pending: ['Place and submit a new report', 'Confirm another person’s report', 'Clear a hazard when it is gone'],
    related: ['navigation', 'route-planning'], chart: true,
  },
  {
    id: 'monitoring', label: 'Vessel monitoring', product: 'InteliMARIS',
    headline: 'Understand the reading behind the alert.',
    summary: 'Bring installed vessel sensors into a shared view. Read system values alongside their age, then connect what needs attention with the people looking after the vessel.',
    shot: 'waterwayz-sensors', caption: 'Voltage, current, bilge level and temperature with reading freshness.',
    availability: 'Vessel sensor and monitoring surfaces are implemented. Readings require compatible hardware and connectivity; the fleet overview currently contains sample data.',
    steps: [
      { title: 'Connect the right sensors', body: 'Choose compatible hardware for the systems you want to monitor. LoRaWAN provides the sensor link; a suitable gateway and uplink are part of the installation.' },
      { title: 'Read value and freshness together', body: 'A stale reading should not look current. Review the age of the data and investigate missing or delayed readings before relying on a value.' },
      { title: 'Bring service into the picture', body: 'Use monitoring alongside maintenance reminders and service records. Assigned technicians can inspect the vessel through their service engagement.' },
    ],
    available: ['Vessel sensor inventory and readings', 'Reading freshness and connection context', 'Monitoring access for assigned service technicians', 'Hardware catalog for installation planning'],
    pending: ['The consolidated fleet dashboard and its predictions use sample data today. Discuss deployment-specific monitoring requirements with the team.'],
    related: ['maintenance', 'navigation'],
  },
  {
    id: 'marina-pms', label: 'Marina / PMS', product: 'Marina operations',
    headline: 'Every arrival has a place. Every team has a view.',
    summary: 'Run the marina’s working day from a shared basin layout, booking records and duty roster. Give the office and dock team the information and authority each needs.',
    shot: 'pms-berth-layout', caption: 'A berth layout over the actual basin, connected to the day’s work.',
    availability: 'Core marina operations are implemented. The full reservation, finance and reporting suite is still being built.',
    steps: [
      { title: 'Build the basin', body: 'Claim the marina, edit its profile and draw dock structures and berths. Record dimensions and approach details where the team can use them.' },
      { title: 'Run arrivals and stays', body: 'Work arrivals, departures and short stays. Guests book the marina; the dockmaster assigns the berth. Track residents and record absence and resale consent separately.' },
      { title: 'Coordinate the people', body: 'Set staff roles, maintain the duty roster, use staff chat and record incidents. Owners, dockmasters and front-desk colleagues have different responsibilities.' },
    ],
    available: ['Today dashboard, arrivals and departures', 'Short stays, berth assignment and layout', 'Residents and absence records, with some agreement workflows still partial', 'Length-based rate cards; some seasonal rules still partial', 'Staff roles, duty roster, chat, events and incidents'],
    pending: ['Full occupancy calendar and reservation board', 'Folios, invoicing, payments and reconciliation', 'Guest inbox and automated correspondence', 'Revenue, debt and portfolio reports', 'Dedicated audit view and advanced operating workflows'],
    related: ['dockpass', 'monitoring', 'maintenance'],
  },
  {
    id: 'dockpass', label: 'Dockage & DockPass', product: 'WaterWAYZ · Hosts',
    headline: 'From finding a berth to finding your way in.',
    summary: 'Bring berth discovery, requests and stays into the same journey. Vessel users see the destination; marina and private-dock hosts work the other side of the request.',
    shot: 'waterwayz-marina-card', caption: 'A destination’s details lead into planning and dockage.',
    availability: 'Dockage search, request and host-management surfaces are implemented. Listing availability and confirmation depend on the host and deployment.',
    steps: [
      { title: 'Find a suitable stop', body: 'Explore marina and private-dock listings. Check vessel limits and approach information; a directory entry is not proof of a bookable berth.' },
      { title: 'Request and confirm', body: 'Choose dates and submit the request through the vessel workspace. The host manages the request and confirmation; requesting a stay does not by itself confirm it.' },
      { title: 'Carry the approach with you', body: 'A confirmed stay and assigned berth keep arrival details together. Commercial marinas assign the berth, while private hosts manage their own listings and stays.' },
    ],
    available: ['Vessel-side listing search and booking requests', 'Booking details and stay records', 'Private-host listings and incoming requests', 'Marina-side berth assignment and approach details'],
    pending: ['Do not assume online payment collection, instant confirmation or a complete marina finance suite. Confirm the host’s booking arrangements.'],
    related: ['route-planning', 'marina-pms', 'navigation'], chart: true,
  },
  {
    id: 'maintenance', label: 'Maintenance & service', product: 'Vessels · Service companies',
    headline: 'The next service. The last repair. One useful history.',
    summary: 'Keep upkeep with the vessel and organize the service team around the work. Track what is due, who is assigned and what was completed.',
    shot: 'waterwayz-sensors', caption: 'Monitoring provides context; work orders and service records carry the work.',
    availability: 'Vessel maintenance and service-company workflows are implemented. Access depends on an active engagement and technician assignment.',
    steps: [
      { title: 'Track both clocks', body: 'Maintain reminders by calendar date and engine hours. Keep the service history attached to the vessel, even as people or service providers change.' },
      { title: 'Engage the company', body: 'The vessel owner opens the engagement. The service company assigns its technicians, granting access to monitoring, vessel information, maintenance and the engagement conversation.' },
      { title: 'Work across assigned vessels', body: 'Review open orders and due reminders by vessel, system and status. Assigned technicians move work forward and record completion in the service history.' },
    ],
    available: ['Date and engine-hour reminders', 'Vessel service records and work orders', 'Company worklist and technician assignments', 'Engagement-scoped vessel access'],
    pending: ['Marina site-asset work orders, service profitability and integrated invoicing are separate PMS workflows still in development.'],
    related: ['monitoring', 'marina-pms'],
  },
]

export function findCapability(id: unknown) { return CAPABILITIES.find(c => c.id === id) }
export function capabilityLink(id: string) { return id === 'marina-pms' ? '/marinas' : `/capabilities/${id}` }
