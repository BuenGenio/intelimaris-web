import type { ShotId } from './shots'

/** Marketing audiences, not authorization roles. Source mapping: docs/audience-content-audit.md. */
export interface Audience {
  id: string
  group: 'aboard' | 'ashore'
  label: string
  short: string
  intent: string
  headline: string
  intro: string
  shot: ShotId
  caption: string
  features: string[]
  steps: { title: string; body: string }[]
  access: string
  cta: string
}

export const AUDIENCES: Audience[] = [
  {
    id: 'captains', group: 'aboard', label: 'Captain / navigator', short: 'Captains & navigators',
    intent: 'Plan the passage. Take the helm.', headline: 'Your vessel. Your passage. The detail that matters.',
    intro: 'Build a passage around your vessel’s dimensions, inspect the route and arrive with the berth details in hand. WaterWayz™ brings the decisions before departure and the view underway together.',
    shot: 'waterwayz-route', caption: 'A passage, its conditions and the destination in one view.',
    features: ['route-planning', 'navigation', 'hazard-reporting', 'dockpass', 'emergency-assistance'],
    steps: [
      { title: 'Start with your vessel', body: 'Keep length, beam, draft and air draft in the vessel workspace. Choose a departure and destination; you can plan from somewhere other than your current position.' },
      { title: 'Read the answer before leaving', body: 'Review the route, duration and constraints. Where the planner cannot find a passage or evaluate a clearance, it explains the gap instead of treating unknown as safe.' },
      { title: 'Keep the arrival connected', body: 'Explore marinas, inspect approach information and request suitable dockage. An assigned berth brings its approach brief with it.' },
    ],
    access: 'Create or join a vessel workspace. The owner or administrator manages access; your granted permissions determine which actions are available.',
    cta: 'Discuss your first passage',
  },
  {
    id: 'passengers', group: 'aboard', label: 'Passenger / guest', short: 'Passengers & guests',
    intent: 'Understand the trip you’re joining.', headline: 'A place in the journey. A clearer view of the day.',
    intro: 'Get familiar with the destination, understand the passage and ask the captain about shared access. You do not need to own a vessel to find your way around WaterWayz™.',
    shot: 'waterwayz-marina-card', caption: 'Explore the destination before you step aboard.',
    features: ['navigation', 'dockpass', 'emergency-assistance'],
    steps: [
      { title: 'Explore where you are going', body: 'Browse the map and marina information to get to know the destination and the services around it.' },
      { title: 'Ask the captain for an invitation', body: 'A vessel owner or administrator can invite you with appropriate access. Read-only access lets you see the workspace without changing it.' },
      { title: 'Keep decisions with the helm', body: 'Use the shared information to follow the day. Passage decisions, vessel settings and berth changes remain with the people authorized to make them.' },
    ],
    access: 'Join by invitation, with access set by the vessel owner or administrator. Read-only access lets you follow the shared information without changing it. A public live-trip link is not currently offered.',
    cta: 'Ask about guest access',
  },
  {
    id: 'crew', group: 'aboard', label: 'Crew member', short: 'Crew members',
    intent: 'Stay connected to the vessel and team.', headline: 'One vessel. A crew on the same page.',
    intro: 'Join the vessel workspace for its map, systems, crew and conversations. See the information relevant to your work, with access set by the people responsible for the vessel.',
    shot: 'waterwayz-map', caption: 'The same vessel and operating picture for the people aboard.',
    features: ['navigation', 'monitoring', 'emergency-assistance', 'maintenance'],
    steps: [
      { title: 'Join the right vessel', body: 'Accept an invitation from the owner or administrator. Each vessel has its own workspace, so information and membership stay with that vessel.' },
      { title: 'Read the situation together', body: 'Open the map, review system readings and use the workspace’s crew channel. Data age helps distinguish a recent reading from one that needs checking.' },
      { title: 'Work within your access', body: 'Crew membership gives the team its operational view. Management, billing and service work remain controlled by the permissions granted to each person.' },
    ],
    access: 'Your vessel administrator sets crew access. Inviting a service company gives assigned technicians a separate service view and keeps private crew conversations with the crew.',
    cta: 'Talk about your crew setup',
  },
  {
    id: 'fleet-owners', group: 'aboard', label: 'Vessel / fleet owner', short: 'Vessel & fleet owners',
    intent: 'Organize vessels, people and upkeep.', headline: 'A home for every vessel. Control across your account.',
    intro: 'Bring your vessels under one account while keeping each vessel’s crew, systems, passages and service history in its own workspace.',
    shot: 'waterwayz-sensors', caption: 'Vessel monitoring with the age of each reading visible.',
    features: ['monitoring', 'maintenance', 'route-planning', 'dockpass'],
    steps: [
      { title: 'Give each vessel its own workspace', body: 'A vessel workspace represents one vessel. Add further vessels to the same account and invite the people who need access to each.' },
      { title: 'Connect readings to upkeep', body: 'Review installed sensors, keep service history and track reminders by date and engine hours. Engage a maintenance company when outside help is needed.' },
      { title: 'Grant access deliberately', body: 'Separate account ownership, administration and billing from each vessel’s working team. Service engagements let assigned technicians work without joining private crew conversations.' },
    ],
    access: 'Multiple vessel workspaces and account-level access are supported. The consolidated fleet-monitoring screen currently uses sample data; it is not a live fleet control center.',
    cta: 'Plan your vessel setup',
  },
  {
    id: 'marina-owners', group: 'ashore', label: 'Marina owner / operator', short: 'Marina owners & operators',
    intent: 'Run the basin and welcome arrivals.', headline: 'The whole basin. One working day.',
    intro: 'Connect your berth layout, arriving vessels, residents and staff. InteliMarina brings the office and the pontoon into the same operating picture, while Dock Pass keeps arrival requests and stays connected.',
    shot: 'pms-berth-layout', caption: 'Your real basin, with berth dimensions and availability.',
    features: ['marina-pms', 'dockpass', 'monitoring'],
    steps: [
      { title: 'Make the marina yours', body: 'Claim the marina, maintain its profile and draw the berth layout over satellite imagery. Keep dimensions and approach details with each berth.' },
      { title: 'Work the day', body: 'See arrivals and departures, handle short stays, manage residents and assign berths. The duty roster tells the team who is working now.' },
      { title: 'Set the operating rules', body: 'Configure length-based rates, staff access and resident arrangements. Keep closed, resident, courtesy, assigned and free berths distinct.' },
    ],
    access: 'Owners and administrators manage the workspace. Dockmaster, front desk, accounts, auditor, staff and viewer roles give the team different responsibilities. Finance and several planning boards remain in development.',
    cta: 'Arrange a marina walkthrough',
  },
  {
    id: 'marina-teams', group: 'ashore', label: 'Dockmaster / marina team', short: 'Dockmasters & marina teams',
    intent: 'Handle arrivals, berths and the handover.', headline: 'From the front desk to the end of the dock.',
    intro: 'Find the next arrival, see the assigned berth and keep the team informed. Work from the marina’s shared day board with the access appropriate to your role.',
    shot: 'pms-dashboard', caption: 'Today’s arrivals, waiting requests and on-duty team.',
    features: ['marina-pms', 'dockpass'],
    steps: [
      { title: 'Start with today', body: 'Use the dashboard to see arrivals, departures, occupancy and requests needing attention. Check the roster before calling for help on the dock.' },
      { title: 'Give every arrival a place', body: 'Dockmasters assign and move berths. Front-desk colleagues take and amend bookings and check guests in, without automatically gaining berth-assignment authority.' },
      { title: 'Keep the record together', body: 'Use staff chat and the incident log to share what the next person needs to know. Resident and short-stay records stay attached to the marina.' },
    ],
    access: 'Ask your marina administrator for the correct role. Accounts and auditor roles exist, but that does not mean all finance or audit screens are available; check the PMS availability details.',
    cta: 'See the marina team workflow',
  },
  {
    id: 'maintenance', group: 'ashore', label: 'Maintenance / technician', short: 'Service companies & technicians',
    intent: 'Organize service across the vessels you help.', headline: 'Know what is due. Bring the right person aboard.',
    intro: 'Bring the company’s worklist, technician assignments and each vessel’s service record together. Access follows the engagement between the vessel owner and the service company.',
    shot: 'waterwayz-sensors', caption: 'System readings provide context for a vessel’s service work.',
    features: ['maintenance', 'monitoring'],
    steps: [
      { title: 'Set up the service company', body: 'Create a maintenance workspace for your company profile, team and worklist. The company serves vessels through engagements; it does not own their workspaces.' },
      { title: 'Assign the technician', body: 'A vessel owner engages the company, which assigns its own technicians. Assigned people get the vessel’s monitoring, service information and engagement conversation.' },
      { title: 'Keep the service history useful', body: 'Filter work by vessel, system and status. Move work orders forward, log completed work and review reminders due by calendar date or engine hours.' },
    ],
    access: 'Technician access is carried by an active service engagement. It excludes the vessel’s crew view and settings, and ends with the engagement or assignment.',
    cta: 'Discuss your service operation',
  },
  {
    id: 'private-docks', group: 'ashore', label: 'Private dock owner', short: 'Private dock owners',
    intent: 'Put your dock on the map.', headline: 'Your dock. Clear details. Better arrivals.',
    intro: 'Draw the dock, describe the berth and manage incoming requests. Private dock owners get tools suited to hosting, without needing to run a commercial marina.',
    shot: 'pms-dock-editor', caption: 'Draw dock lines and berths over the place you know.',
    features: ['dockpass', 'navigation'],
    steps: [
      { title: 'Describe the place', body: 'Create a private dock workspace and draw its layout. Add vessel limits and approach notes so visitors can judge whether the berth fits their needs.' },
      { title: 'List and review', body: 'Manage listings, dates and booking requests from the host dashboard. Keep the request and the resulting stay together.' },
      { title: 'Prepare for the arrival', body: 'Share the berth and approach information. Track the stay, keep a host conversation and record incidents when necessary.' },
    ],
    access: 'The private-dock workspace supports owners, administrators, members and viewers. Commercial marina rate cards, resident management and events are separate marina features.',
    cta: 'Talk about listing your dock',
  },
  {
    id: 'waterfront-businesses', group: 'ashore', label: 'Waterfront business', short: 'Waterfront businesses',
    intent: 'Help nearby vessels find you.', headline: 'Be part of the passage. Become the destination.',
    intro: 'For restaurants, fuel docks, chandleries and other businesses on the water: maintain the information vessels see when they find your place on the map.',
    shot: 'waterwayz-discover', caption: 'The map connects destinations with the vessels nearby.',
    features: ['navigation', 'dockpass'],
    steps: [
      { title: 'Claim the right place', body: 'Create a business workspace and claim the existing place. Listing edits open after the claim is approved.' },
      { title: 'Keep the useful details current', body: 'Maintain the facts relevant to your business category. Fuel-price tools and category-specific fields help visitors understand what is available and how recent the information is.' },
      { title: 'Explain the arrival', body: 'Where appropriate, draw courtesy berths for visiting patrons. Clear waterfront and approach information helps people plan their stop.' },
    ],
    access: 'Business workspaces have owner, administrator, editor and viewer access. A business listing is not a commercial marina workspace, and a claim is not approved automatically.',
    cta: 'Discuss your waterfront listing',
  },
]

export function findAudience(value: unknown): Audience | undefined {
  return typeof value === 'string' ? AUDIENCES.find(a => a.id === value) : undefined
}

export function audienceLink(id: string) { return `/for/${id}` }

export function contactLink(audience?: Audience, topic?: string) {
  return { path: '/contact', query: { ...(audience ? { audience: audience.id } : {}), ...(topic ? { topic } : {}) } }
}
