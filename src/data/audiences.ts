import type { ShotId } from './shots'

/** Website audiences are preferences, not app permissions. See docs/content-review-2026-09-20.md. */
export interface Audience {
  id: string
  group: 'aboard' | 'ashore'
  label: string
  short: string
  intent: string
  headline: string
  intro: string
  seoTitle: string
  seoDescription: string
  shot: ShotId
  caption: string
  journey: string
  initialScreen?: string
  demoTitle: string
  demoIntro: string
  primary: string
  relatedDemos: { label: string; to: string }[]
  features: string[]
  steps: { title: string; body: string }[]
  access: string
  availability?: string
  cta: string
}

export const AUDIENCES: Audience[] = [
  {
    "id": "captains",
    "group": "aboard",
    "label": "Captain / navigator",
    "short": "Captains & navigators",
    "intent": "Review your passage and prepare the arrival.",
    "headline": "Your vessel. Your passage. The detail that matters.",
    "intro": "Before you leave, you want to know whether the route suits your vessel and what could change the plan. WaterWayz brings passage planning, the surrounding water and your next stop into the same view.",
    "seoTitle": "Passage planning for captains and navigators",
    "seoDescription": "Plan around your vessel's draft and height, review passage constraints and prepare your arrival. Try the WaterWayz passage and berth demos.",
    "shot": "waterwayz-route",
    "caption": "A passage, its conditions and the destination in one view.",
    "journey": "passage-planner",
    "demoTitle": "One passage, different vessels",
    "demoIntro": "Choose a sample vessel in the planner and compare its draft and height with another. Then try the ride-along view and the berth-fit demo to see how the passage connects to the arrival.\n\nThe website examples use illustrative routes, conditions and berth details. WaterWayz is not a certified navigation system. Always cross-check official charts and local notices.",
    "primary": "Try the passage planner",
    "relatedDemos": [
      {
        "label": "Try the view underway",
        "to": "/waterwayz#try-helm-view"
      },
      {
        "label": "Find a berth that fits",
        "to": "/capabilities/dockpass#try-berth-fit"
      }
    ],
    "features": [
      "route-planning",
      "navigation",
      "hazard-reporting",
      "dockpass",
      "emergency-assistance"
    ],
    "steps": [
      {
        "title": "Start with the vessel you are taking",
        "body": "Keep the vessel's dimensions and cruising details in its workspace. The planner can use those saved figures, so you do not start from an empty form each time. Draft tells you how much water the vessel needs; air draft is its height above the waterline and matters when you approach a bridge.\n\nChoose your departure and destination, including a departure away from your current position. Review the figures before planning."
      },
      {
        "title": "Read the answer before you cast off",
        "body": "Review the route, distance, expected duration and any waits or constraints the planner can evaluate. Depth, tide, bridge and weather information depend on the route and the available data.\n\nIf the planner cannot find a supported passage, or cannot assess a clearance, it tells you. That gives you a specific point to investigate before departure."
      },
      {
        "title": "See the next stop in context",
        "body": "Switch between Above, Helm and 3D views. Explore marina details, available traffic information and reported hazards around the passage. Where dockage is offered, request a stay and review the host's confirmation and berth assignment.\n\nA useful arrival brief includes where to approach, how to enter the berth and which side to tie alongside, where those details have been supplied."
      }
    ],
    "access": "Create or join a vessel workspace. The owner or administrator manages access; your granted permissions determine which actions are available.",
    "cta": "Discuss your first passage"
  },
  {
    "id": "passengers",
    "group": "aboard",
    "label": "Passenger / guest",
    "short": "Passengers & guests",
    "intent": "Get to know the destination and follow the day.",
    "headline": "Feel part of the journey.",
    "intro": "Where are we heading? What is at the marina? What are the conditions nearby? WaterWayz helps you get familiar with the day ahead, whether it is your first trip aboard or a place you know well.",
    "seoTitle": "Follow the day on the water",
    "seoDescription": "Get to know your destination, explore local conditions and learn how to join a vessel's shared view as a passenger or guest.",
    "shot": "waterwayz-marina-card",
    "caption": "Explore the destination before you step aboard.",
    "journey": "water-right-now",
    "demoTitle": "A look at the day ahead",
    "demoIntro": "Choose one of the six marinas in the conditions demo. Compare the predicted tide, available wind observation and sunset time. A nearby weather station may describe different conditions from those at the berth; the source and location are shown with the information.",
    "primary": "Explore the conditions demo",
    "relatedDemos": [
      {
        "label": "Follow a sample passage",
        "to": "/waterwayz#try-helm-view"
      }
    ],
    "features": [
      "navigation",
      "dockpass",
      "emergency-assistance"
    ],
    "steps": [
      {
        "title": "Get to know the destination",
        "body": "Explore marina information and places along the waterfront. Find out what is nearby before you arrive, so you can take part in planning the stop.\n\nIn the conditions demo, choose a marina to see the public observations and tide predictions available for that location. The view names the source and shows the age of observations, helping you understand what you are looking at."
      },
      {
        "title": "Ask the captain to bring you aboard",
        "body": "You do not need to own a vessel to join its workspace. Ask the owner or administrator for an invitation with suitable access. Read-only access lets you see shared information without changing the vessel's records.\n\nThe information you can see depends on the access you have been given. Invitations are the way to join; a public link that tracks a live trip is not currently available."
      },
      {
        "title": "Follow along at your own pace",
        "body": "Try the sample ride-along to see how the route and destination appear together. Change the view and open the marina details. It is a simple way to become familiar with the screen before joining a trip.\n\nYour captain remains the person to ask about the passage and decisions aboard."
      }
    ],
    "access": "Join by invitation, with access set by the vessel owner or administrator. Read-only access lets you follow the shared information without changing it. A public live-trip link is not currently offered.",
    "cta": "Ask about joining a vessel"
  },
  {
    "id": "crew",
    "group": "aboard",
    "label": "Crew member",
    "short": "Crew members",
    "intent": "Keep vessel information and crew conversations together.",
    "headline": "One vessel. A crew on the same page.",
    "intro": "Keep the information you need for the vessel close to the conversation about it. WaterWayz brings the map, supported system readings and upkeep into the vessel's shared workspace.",
    "seoTitle": "Vessel information for the whole crew",
    "seoDescription": "Bring the vessel's map, supported sensor readings, maintenance records and crew conversation together. Explore the monitoring demo.",
    "shot": "waterwayz-map",
    "caption": "The same vessel and operating picture for the people aboard.",
    "journey": "aging-reading",
    "demoTitle": "Watch a reading get older",
    "demoIntro": "Pause the sample sensor or cut its simulated connection. Watch the reading's age and status change. The demo speeds up time so you can see the difference between a current value and an old one.\n\nThe values and prediction shown are examples. Real readings depend on the equipment and connection fitted aboard.",
    "primary": "Try the monitoring demo",
    "relatedDemos": [
      {
        "label": "Explore the vessel screens",
        "to": "/demo#try-app-screens"
      }
    ],
    "features": [
      "navigation",
      "monitoring",
      "emergency-assistance",
      "maintenance"
    ],
    "steps": [
      {
        "title": "Start with the same information",
        "body": "Join the vessel by invitation and open the information available to your role. The map, vessel details and crew channel stay with that vessel, making it easier to find the right context when you move between boats."
      },
      {
        "title": "Know when a reading needs checking",
        "body": "Review the onboard measurements supported by the installed sensors, such as battery voltage, bilge level and temperature. Each reading shows its age.\n\nIf a sensor stops reporting, the last value remains visible with its status. That helps you distinguish a recent measurement from information that needs checking aboard."
      },
      {
        "title": "Keep upkeep and conversations together",
        "body": "Review what is due, check the service history and work with maintenance records where your access allows. Use the crew conversation for the vessel's working day.\n\nWhen an outside service company is engaged, assigned technicians have a separate service conversation and access to the information needed for their work. Private crew conversations remain with the crew."
      }
    ],
    "access": "Your vessel administrator sets crew access. Inviting a service company gives assigned technicians a separate service view and keeps private crew conversations with the crew.",
    "cta": "Talk about your crew setup"
  },
  {
    "id": "fleet-owners",
    "group": "aboard",
    "label": "Vessel / fleet owner",
    "short": "Vessel & fleet owners",
    "intent": "Keep each vessel’s people, readings and upkeep organized.",
    "headline": "Keep the vessel's care in view.",
    "intro": "Whether you own one vessel or several, the details matter: who has access, what the sensors last reported and which service is due next. InteliMARIS and WaterWayz bring that information together around each vessel.",
    "seoTitle": "Vessel monitoring and upkeep for owners",
    "seoDescription": "Keep each vessel's readings, service history and people organized. Explore monitoring and maintenance for one vessel or several.",
    "shot": "waterwayz-sensors",
    "caption": "Vessel monitoring with the age of each reading visible.",
    "journey": "aging-reading",
    "demoTitle": "See how monitoring handles a lost connection",
    "demoIntro": "Pause a reading in the monitoring demo, then cut the sample link. Notice how the old number and its age remain visible. Use the product screen explorer to look at vessel details and maintenance alongside monitoring.",
    "primary": "Try the monitoring demo",
    "relatedDemos": [
      {
        "label": "Explore connected systems",
        "to": "/pwts"
      },
      {
        "label": "See vessel upkeep",
        "to": "/capabilities/maintenance"
      }
    ],
    "features": [
      "monitoring",
      "maintenance",
      "route-planning",
      "dockpass"
    ],
    "steps": [
      {
        "title": "Give every vessel its own place",
        "body": "Keep each vessel's profile, crew, sensor inventory and service records in its own workspace. Multiple vessels can belong to the same account, with access assigned to the people who look after each one.\n\nThe vessel's saved dimensions also support passage planning and berth checks, connecting ownership information with everyday use."
      },
      {
        "title": "Check the readings and when they arrived",
        "body": "Choose monitoring equipment around what matters aboard: power, water, temperature or other supported systems. View the available measurements and history through WaterWayz.\n\nA value comes with its age. If a unit goes quiet, the view makes that visible so you know when further checking is needed. Remote visibility depends on a working sensor, gateway and onward connection."
      },
      {
        "title": "Keep service history with the vessel",
        "body": "Track reminders by date, engine hours or both. Review completed work and open work orders. When engine hours are unavailable, the system says so.\n\nYou can manage upkeep yourself or engage a service company. Assigned technicians receive a service view for that engagement, while your crew conversations and track history stay separate."
      },
      {
        "title": "Start with one vessel, then add others",
        "body": "The account supports multiple vessel workspaces. The separate consolidated fleet dashboard currently uses sample data, so the working story today is individual vessel information under a shared account."
      }
    ],
    "access": "Multiple vessel workspaces and account-level access are supported. The consolidated fleet-monitoring screen currently uses sample data; it is not a live fleet control center.",
    "cta": "Plan your vessel setup"
  },
  {
    "id": "marina-owners",
    "group": "ashore",
    "label": "Marina owner / operator",
    "short": "Marina owners & operators",
    "intent": "Bring berths, stays, residents and staff together.",
    "headline": "The whole basin. One working day.",
    "intro": "Your team needs to know what is coming in, what is leaving and which berths are available. InteliMarina brings the berth layout, stays, residents and people together, with Dock Pass connecting incoming requests to the arrival record.",
    "seoTitle": "Berths, arrivals and marina operations",
    "seoDescription": "Connect your berth layout, stays, residents, customer records and staff. Try the marina layout demo and explore the survey viewer.",
    "shot": "pms-berth-layout",
    "caption": "Your real basin, with berth dimensions and availability.",
    "journey": "draw-your-water",
    "demoTitle": "From layout to day board",
    "demoIntro": "Draw a sample dock and berths, or load the example layout. Mark a sample vessel as arrived and watch the berth's state change. Then explore the survey demo to see how recorded aerial data can help explain a site.\n\nThe survey demonstration uses a Halifax Harbor scan with separately labeled sample berth information. It is not a live survey of Bahia Mar.",
    "primary": "Try the layout demo",
    "relatedDemos": [
      {
        "label": "Check which berths fit",
        "to": "/for/marina-teams#try-berth-fit"
      },
      {
        "label": "Explore the recorded survey",
        "to": "/demo/marina/bahia-mar"
      }
    ],
    "features": [
      "marina-pms",
      "dockpass",
      "monitoring"
    ],
    "steps": [
      {
        "title": "Put your marina on its own map",
        "body": "Claim your marina and, once approved, maintain the information your team and visitors use. Draw docks and berths over the available imagery. Record dimensions, supplied depth information, entry direction, tie side and facilities where known.\n\nThe layout becomes a working reference for the people making assignments and the people meeting vessels on the dock."
      },
      {
        "title": "Connect a request to a stay",
        "body": "Handle incoming requests and staff-entered stays. Review arrivals and departures, assign suitable berths and record when vessels come alongside or leave.\n\nKeep customer records available to the colleagues who need them. Length-based rate cards support marina stay quotes, while the dock team handles the physical berth assignment."
      },
      {
        "title": "Keep residents and visitors clear",
        "body": "Record resident berths, absence dates and closures. An empty-looking berth may still belong to a resident or be reserved for courtesy use. Availability needs to reflect those arrangements.\n\nWhere a resident's berth may be offered during an absence, record the permission separately from the dates they are away."
      },
      {
        "title": "Give the team the right tools",
        "body": "Set access for dockmasters, front-desk colleagues and other staff. Check who is on duty, use the staff conversation and keep an incident record the team can refer to."
      }
    ],
    "access": "Owners and administrators manage the workspace. Dockmaster, front desk, accounts, auditor, staff and viewer roles give the team different responsibilities. Finance and several planning boards remain in development.",
    "cta": "Arrange a marina walkthrough",
    "availability": "Core berth, stay, resident and staff workflows are implemented. Advanced reservation boards, marina finance, payments and broader reporting are still being developed. A walkthrough can establish what fits your operation now."
  },
  {
    "id": "marina-teams",
    "group": "ashore",
    "label": "Dockmaster / marina team",
    "short": "Dockmasters & marina teams",
    "intent": "Know who is arriving, where they fit and who is on duty.",
    "headline": "From the front desk to the end of the dock.",
    "intro": "Who is arriving next? Where will the vessel fit? What does the crew need to know? InteliMarina puts those questions alongside the marina's stays, berth map and staff information.",
    "seoTitle": "Arrivals and berth assignments for marina teams",
    "seoDescription": "See the next arrival, check vessel fit, review berth approach details and keep the marina team informed. Try the interactive berth demo.",
    "shot": "pms-dashboard",
    "caption": "Today’s arrivals, waiting requests and on-duty team.",
    "journey": "berth-fit",
    "demoTitle": "Same marina, different vessel",
    "demoIntro": "Choose a sample cruiser, sailing yacht, sportfish, catamaran or motor yacht. Watch the fit result change. Choose a day and open a berth to inspect its approach details or the reason it does not fit.\n\nThe layout, occupancy and depth figures are illustrative. The demo compares stated dimensions; it does not reserve a berth or verify conditions at a real dock.",
    "primary": "Try the berth-fit demo",
    "relatedDemos": [
      {
        "label": "Work the sample day board",
        "to": "/marinas#try-draw-your-water"
      }
    ],
    "features": [
      "marina-pms",
      "dockpass"
    ],
    "steps": [
      {
        "title": "Start with the shift ahead",
        "body": "Check arrivals, departures and vessels still needing a berth. Open the relevant stay and review the vessel details. Use the duty roster to see who is working before calling for help on the dock."
      },
      {
        "title": "Find a berth that fits and is available",
        "body": "Compare the vessel's dimensions with the recorded berth limits. Length, width, draft and overhead clearance can all matter. A berth also needs to be available for the intended stay.\n\nKeep closed berths, resident berths and courtesy spaces distinct from free capacity. The dockmaster makes the assignment using the information available and knowledge of the marina."
      },
      {
        "title": "Give the arrival a useful brief",
        "body": "Open the berth's approach details: entry direction, bow-in or stern-in approach, tie side and supplied depth information. Record arrival when the vessel comes alongside and departure when it leaves, keeping the stay and berth state aligned."
      },
      {
        "title": "Keep the next person informed",
        "body": "Use staff chat and the incident log to leave useful context. Front-desk colleagues can manage booking work with the access they have been granted; berth assignments belong to the people authorized to make them."
      }
    ],
    "access": "Ask your marina administrator for the correct role. Accounts and auditor roles exist, but that does not mean all finance or audit screens are available; check the PMS availability details.",
    "cta": "See the marina team workflow"
  },
  {
    "id": "maintenance",
    "group": "ashore",
    "label": "Maintenance / technician",
    "short": "Service companies & technicians",
    "intent": "Coordinate service work across the vessels you serve.",
    "headline": "Know what is due. Bring the right person aboard.",
    "intro": "Keep the company's worklist connected to the vessels you serve. InteliMARIS brings technician assignments, maintenance reminders and service records together, with supported vessel readings available to the people doing the work.",
    "seoTitle": "Vessel service work and technician assignments",
    "seoDescription": "Organize vessel maintenance, assign technicians and keep service records together. Review due work and supported monitoring through agreed service access.",
    "shot": "waterwayz-sensors",
    "caption": "System readings provide context for a vessel’s service work.",
    "journey": "app-screens",
    "demoTitle": "See the work across your vessels",
    "demoIntro": "Start with the sample company worklist, then explore technician assignments and vessel service records. These screens use sample data and do not create a real work order.",
    "primary": "Explore the service screens",
    "relatedDemos": [
      {
        "label": "Try the monitoring demo",
        "to": "/capabilities/monitoring#try-aging-reading"
      }
    ],
    "features": [
      "maintenance",
      "monitoring"
    ],
    "steps": [
      {
        "title": "Agree the work relationship",
        "body": "Create a maintenance workspace for your yard, service company or mobile team. A vessel owner and a service company can agree a service engagement: the relationship that gives the company access to work on that vessel.\n\nEither side can propose it; the other accepts. The company then assigns its own technicians to the vessel."
      },
      {
        "title": "See the information needed for the job",
        "body": "Assigned technicians can review the vessel's profile, supported monitoring, maintenance records and the conversation for that engagement. Private crew conversations and track history remain separate.\n\nAccess ends when the engagement or assignment ends. Each job relationship has its own conversation, keeping the context with the vessel being serviced."
      },
      {
        "title": "Work from both service clocks",
        "body": "Review reminders based on calendar dates, engine hours or both. See what is due and what is coming up. If no connected source provides engine hours, that gap stays visible.\n\nMove work orders through their stages and record completed work in the vessel's service history. The record stays with the vessel as people and service providers change."
      },
      {
        "title": "Organize the company workload",
        "body": "Review due items and open work across the vessels your company serves. Assign technicians and open the vessel's records from the worklist. Technicians can focus on the work assigned to them."
      }
    ],
    "access": "Technician access is carried by an active service engagement. It excludes the vessel’s crew view and settings, and ends with the engagement or assignment.",
    "cta": "Discuss your service operation",
    "initialScreen": "yard-work"
  },
  {
    "id": "private-docks",
    "group": "ashore",
    "label": "Private dock owner",
    "short": "Private dock owners",
    "intent": "Describe your berth and prepare for visiting vessels.",
    "headline": "Your dock. Clear details. Better arrivals.",
    "intro": "Help a visiting vessel understand your dock before it arrives. Draw the berth, record its limits and approach details, and handle incoming Dock Pass requests from your own workspace.",
    "seoTitle": "Private dock listings and arrival requests",
    "seoDescription": "Describe your private berth, review Dock Pass requests and prepare visitors for arrival. Explore the interactive dock layout demo.",
    "shot": "pms-dock-editor",
    "caption": "Draw dock lines and berths over the place you know.",
    "journey": "draw-your-water",
    "demoTitle": "Draw a dock and receive a sample vessel",
    "demoIntro": "Use the layout demo to add berths or load its sample layout. Inspect one berth's entry direction and tie side, then mark a sample arrival to see its state change.\n\nThe demo is labeled as a marina example, but it demonstrates the layout ideas used for private docks. It does not publish a listing or take a booking.",
    "primary": "Try the dock layout demo",
    "relatedDemos": [
      {
        "label": "Compare vessel and berth dimensions",
        "to": "/capabilities/dockpass#try-berth-fit"
      }
    ],
    "features": [
      "dockpass",
      "navigation"
    ],
    "steps": [
      {
        "title": "Describe the berth you can offer",
        "body": "Draw the dock and its berths. Record the available space, vessel limits, utilities and approach details where known. A listing can refer to a berth on your map, keeping the place offered and its physical details together.\n\nVisitors need to understand how to approach, which side to tie to and what information is still unknown."
      },
      {
        "title": "Review the vessel and the request",
        "body": "Read incoming requests and their dates. Confirm or decline using the available host controls, and keep the booking record with the berth it relates to.\n\nA request, a confirmed booking and a vessel that has arrived are different stages. Clear records help everyone understand what has been agreed."
      },
      {
        "title": "Prepare for a straightforward arrival",
        "body": "Use the berth details to explain the approach. Give a co-host suitable access if someone else helps manage the dock. Keep the relevant stay and incident records in the same place."
      }
    ],
    "access": "The private-dock workspace supports owners, administrators, members and viewers. Commercial marina rate cards, resident management and events are separate marina features.",
    "cta": "Talk about listing your dock",
    "availability": "Talk through the setup available for your dock. Online payments and host payouts are not connected in the reviewed build, and editing, pausing or retiring an existing listing remains in development."
  },
  {
    "id": "waterfront-businesses",
    "group": "ashore",
    "label": "Waterfront business",
    "short": "Waterfront businesses",
    "intent": "Help people arriving by water plan their next stop.",
    "headline": "Be part of the passage. Become the destination.",
    "intro": "A good waterfront listing answers the questions people ask before turning toward you: Are you open? What can we get there? Where can we tie up? WaterWayz helps you keep those details with your place on the map.",
    "seoTitle": "Help boaters find your waterfront business",
    "seoDescription": "Keep your waterfront listing, fuel information and courtesy dockage details useful to boaters planning their next stop with WaterWayz.",
    "shot": "waterwayz-discover",
    "caption": "The map connects destinations with the vessels nearby.",
    "journey": "app-screens",
    "demoTitle": "See your place through a visitor’s eyes",
    "demoIntro": "Explore the sample listing, then choose Fuel prices or Reports in the Waterfront business group. These examples show the information a business can maintain; they do not change a real listing.",
    "primary": "Explore the business screens",
    "relatedDemos": [
      {
        "label": "Explore nearby conditions",
        "to": "/capabilities/navigation#try-water-right-now"
      }
    ],
    "features": [
      "navigation",
      "dockpass"
    ],
    "steps": [
      {
        "title": "Make the listing yours",
        "body": "Find your restaurant, fuel dock, chandlery or other waterfront business and request ownership of its listing. If it is missing, submit it for review. Once the claim is approved, update the information relevant to your business.\n\nKeep contact details, opening hours, services and waterfront access useful to people planning a stop."
      },
      {
        "title": "Keep changing information current",
        "body": "For a fuel dock, a price is useful only when visitors know how recently it was supplied. Publish supported fuel-price information with its update time.\n\nReview first-hand reports about your place, such as a price paid or a service being unavailable. These are factual reports with an age, rather than a star-rating system."
      },
      {
        "title": "Help customers arrive by water",
        "body": "Where your restaurant offers courtesy dockage, describe the berths and their limits. The dock-and-dine workflow supports a short hold on an available courtesy berth while a vessel approaches.\n\nA courtesy hold is time-limited and unpaid. It is separate from an overnight Dock Pass booking, and depends on the business having the relevant berth setup."
      }
    ],
    "access": "Business workspaces have owner, administrator, editor and viewer access. A business listing is not a commercial marina workspace, and a claim is not approved automatically.",
    "cta": "Discuss your waterfront listing",
    "initialScreen": "business-listing"
  }
]

export function findAudience(value: unknown): Audience | undefined {
  return typeof value === 'string' ? AUDIENCES.find(a => a.id === value) : undefined
}

export function audienceLink(id: string) { return `/for/${id}` }

export function contactLink(audience?: Audience, topic?: string) {
  return { path: '/contact', query: { ...(audience ? { audience: audience.id } : {}), ...(topic ? { topic } : {}) } }
}

export function isMarinaAudience(audience?: Audience) { return audience?.id === 'marina-owners' || audience?.id === 'marina-teams' }
