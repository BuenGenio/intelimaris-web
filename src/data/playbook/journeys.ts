import type { Component } from 'vue'
import { defineAsyncComponent } from 'vue'

export interface Journey {
  id: string
  index: number
  title: string
  /** what the visitor does */
  action: string
  /** what it proves about the product */
  proves: string
  /** the backend capability it stands on */
  backend: string
  component: Component
}

export const JOURNEYS: Journey[] = [
  {
    id: 'passage-planner',
    index: 1,
    title: 'Plan your own passage',
    action: 'Tap a start and a marina, set your draft and air draft, and watch the route go where you would actually fit.',
    proves: 'Routing that reads your vessel, not a form — and refuses, and says why, rather than draw a line it does not believe.',
    backend: 'Route service: corridors, bridges, tides and weather gates computed server-side against the vessel workspace.',
    component: defineAsyncComponent(() => import('@/components/playbook/PassagePlanner.vue')),
  },
  {
    id: 'aging-reading',
    index: 2,
    title: 'A reading that ages',
    action: 'Watch one live sensor tile grow older in front of you, and see what the tile does when the reading goes stale.',
    proves: 'Every reading carries its age. An old number says so on the face of the tile; it is never dressed as live, and nothing is invented when the unit goes silent.',
    backend: 'Sensors service over LoRaWAN: readings with a staleness stamp, predictions stamped with model and version.',
    component: defineAsyncComponent(() => import('@/components/playbook/AgingReading.vue')),
  },
  {
    id: 'berth-fit',
    index: 3,
    title: 'Which berths fit you',
    action: 'Enter length, draft and air draft; the Bahia Mar berths light up or grey out, and each one carries its approach brief.',
    proves: 'Only free means free, and a vessel only ever sees berths she fits.',
    backend: 'Marina service: berth kinds, limits, entry heading and mode, tie side, depth with datum, access; per-date occupancy.',
    component: defineAsyncComponent(() => import('@/components/playbook/BerthFit.vue')),
  },
  {
    id: 'draw-your-water',
    index: 4,
    title: 'Draw your own water',
    action: 'Drag a dock line and drop two berths over the satellite, then see the day board those berths produce.',
    proves: 'A marina draws its own layout in minutes, and the day board falls out of it.',
    backend: 'Marina layout editor: dock lines, fields, racks, yards; berths with limits and hardware; the Today board.',
    component: defineAsyncComponent(() => import('@/components/playbook/DrawYourWater.vue')),
  },
  {
    id: 'hazard-reroute',
    index: 5,
    title: 'Drop a hazard, watch the route move',
    action: 'Tap the chart to report a hazard and the passage re-plans around it. Confirm it, or clear it.',
    proves: 'Dynamic routing around live conditions, hazards and zones — the thing nobody else does.',
    backend: 'Hazard report, confirm and clear; the route service re-plans against live hazards and regulatory zones.',
    component: defineAsyncComponent(() => import('@/components/playbook/HazardReroute.vue')),
  },
  {
    id: 'orbit-the-scan',
    index: 6,
    title: 'Orbit the scan',
    action: 'Orbit a LiDAR scan of a marina and click a berth to read its approach brief.',
    proves: 'Survey and the PMS share one scene; the berth map is measured, not guessed.',
    backend: 'Marina survey point clouds (LAS) and the berth layout with per-berth approach data.',
    component: defineAsyncComponent(() => import('@/components/playbook/OrbitTheScan.vue')),
  },
  {
    id: 'water-right-now',
    index: 7,
    title: 'Your water, right now',
    action: 'Pick a marina and see tide, wind and sunset as they are now, each number with its unit and its age.',
    proves: 'We say what we know, how old it is, and when we know nothing.',
    backend: 'Places and events services: 27,000 marinas, conditions with timestamps; public NOAA and NWS feeds for the demo.',
    component: defineAsyncComponent(() => import('@/components/playbook/WaterRightNow.vue')),
  },
  {
    id: 'helm-view',
    index: 8,
    title: 'Underway at the helm',
    action: 'Ride along on a live passage: switch between Above, Helm and 3D, report a hazard ahead, and open Marina View on the marina you are bound for.',
    proves: 'The passage, the vessel, the water around you and the arrival share one screen; the view underway is the plan, kept honest.',
    backend: 'Ride Along on the route service’s clock; places and conditions with their ages; hazard reports and AIS traffic from vessels nearby.',
    component: defineAsyncComponent(() => import('@/components/playbook/HelmView.vue')),
  },
  {
    id: 'app-screens',
    index: 9,
    title: 'Every screen of the app',
    action: 'Pick any screen of WaterWayz, the marina console, the yard, a waterfront business or the operator console and see it as the people who use it do, with sample data.',
    proves: 'One product from the helm to the marina office: the same vessel, berth and person on every screen.',
    backend: 'The workspace catalog: one app, one shell, and the surfaces each kind of workspace has, served by the platform’s services.',
    component: defineAsyncComponent(() => import('@/components/playbook/AppScreens.vue')),
  },
]

export const findJourney = (id: string | undefined): Journey | undefined =>
  id ? JOURNEYS.find((j) => j.id === id) : undefined
