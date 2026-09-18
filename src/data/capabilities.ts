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
  status?: string
}

export const CAPABILITIES: Capability[] = [
  {
    id: 'navigation', label: 'Navigation', product: 'WaterWayz™',
    headline: 'Navigate with the bigger picture.',
    summary: 'Find your next stop, understand the water around you and keep the passage in view. Charts, vessel position and available traffic information share the same context.',
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
    id: 'route-planning', label: 'Route planning', product: 'WaterWayz™',
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
    id: 'hazard-reporting', label: 'Hazards & reporting', product: 'WaterWayz™',
    headline: 'A clearer picture of what lies ahead.', status: 'Hazard viewing · Reporting in development',
    summary: 'See reported hazards in the context of your passage, with enough detail to judge how recent and well supported the information is. Community reporting is being developed alongside the existing viewing tools.',
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
    id: 'monitoring', label: 'Vessel monitoring', product: 'InteliMARIS™ connected systems',
    headline: 'Stay connected to the vessel you care about.',
    summary: 'See what supported sensors are telling you about power, water and conditions aboard. WaterWayz™ brings the readings, available history and the people looking after the vessel into one connected experience.',
    shot: 'waterwayz-sensors', caption: 'Voltage, current, bilge level and temperature with reading freshness.',
    availability: 'Vessel sensor and monitoring surfaces are implemented. Readings require compatible hardware and connectivity; the fleet overview currently contains sample data.',
    steps: [
      { title: 'Connect the right sensors', body: 'Choose compatible hardware for the systems you want to monitor. The MX MariWavz™ radio network links compatible devices and gateways; a suitable uplink carries data onward. Confirm the installation’s radio compatibility and coverage.' },
      { title: 'Read value and freshness together', body: 'A stale reading should not look current. Review the age of the data and investigate missing or delayed readings before relying on a value.' },
      { title: 'Bring service into the picture', body: 'Use monitoring alongside maintenance reminders and service records. Assigned technicians can inspect the vessel through their service engagement.' },
    ],
    available: ['Vessel sensor inventory, readings and available channel history', 'Reading freshness and connection context', 'Monitoring access for assigned service technicians', 'Hardware catalog for installation planning'],
    pending: ['The consolidated fleet dashboard and its predictions use sample data today. Discuss deployment-specific monitoring requirements with the team.'],
    related: ['maintenance', 'navigation'],
  },
  {
    id: 'marina-pms', label: 'InteliMarina / PMS', product: 'InteliMarina + Dock Pass',
    headline: 'Better arrivals. A clearer working day.', status: 'Core marina workflows · Advanced PMS in development',
    summary: 'InteliMarina brings berth layouts, arrivals, residents and staff together. Dock Pass connects the vessel’s request with the host’s stay record, so the office, dock team and arriving crew can work from the right information.',
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
    id: 'dockpass', label: 'Dockage & Dock Pass', product: 'InteliMarina + Dock Pass',
    headline: 'Know the berth before you arrive.',
    summary: 'Find a suitable marina or private dock, request a stay and carry confirmed arrival details into the passage. Vessel requirements and approach information help make the next conversation with the host more useful.',
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
    id: 'emergency-assistance', label: 'Emergency Assistance', product: 'WaterWayz™',
    headline: 'When every minute matters.',
    summary: 'Clear information can help you explain where you are and which vessel needs assistance. WaterWayz brings the device’s position and vessel context into an emergency information screen.',
    status: 'Information tools available · Access-routing concepts planned',
    shot: 'waterwayz-marina-card', caption: 'Marina context in WaterWayz. This is a destination view, not the emergency screen.',
    availability: 'The current emergency screen shows device coordinates, position age, a copy control, vessel-name context and communication references. It does not dispatch responders or broadcast an alert to nearby vessels.',
    steps: [
      { title: 'Make the position clear', body: 'Read the device position in the formats shown, with its age visible. The screen distinguishes a current fix from a last-known position; it cannot supply a position the device does not have.' },
      { title: 'Put the vessel in context', body: 'The current screen brings the vessel name together with information for communicating a request for help. WaterWayz is an assistance and information tool; established emergency communication channels remain essential.' },
      { title: 'Close the last-mile gap', body: 'A marina address may not explain how to reach a particular vessel. We are exploring a richer information pack with vessel identity, dock and slip, contacts and landside access guidance. Shareable access-to-vessel routes are a proposed integration.' },
    ],
    available: ['Device position with visible freshness', 'Copyable coordinates and vessel-name context', 'Emergency communication reference information'],
    pending: ['Nearby-vessel distress broadcast is not connected', 'Vessel-photo, contact and marina-access information pack', 'Shareable routes from landside access or staging areas to a vessel', 'No emergency dispatch or responder-system integration is offered'],
    related: ['navigation', 'dockpass'],
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
