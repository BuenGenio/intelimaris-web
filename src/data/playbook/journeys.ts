import type { Component } from 'vue'
import { defineAsyncComponent } from 'vue'

export interface Journey {
  id: string
  index: number
  title: string
  /** what the visitor does */
  action: string
  /** what the visitor can learn */
  proves: string
  /** related product context, without implying the demo is connected */
  backend: string
  dataLabel: string
  dataNote: string
  component: Component
}

export const JOURNEYS: Journey[] = [
  {
    id: 'passage-planner',
    index: 1,
    title: 'Plan a sample passage',
    action: 'Switch between sample vessels or adjust their draft and height. Watch the route update or explain why it cannot proceed, then try a different departure or destination.',
    proves: 'See why vessel dimensions belong in the plan, and why a refusal can be a useful answer.',
    backend: 'WaterWayz plans around saved vessel dimensions and the waterway information available for the region.',
    dataLabel: 'Interactive example.',
    dataNote: 'Routes use a simplified map and illustrative depth and bridge limits. They are not navigation guidance.',
    component: defineAsyncComponent(() => import('@/components/playbook/PassagePlanner.vue')),
  },
  {
    id: 'aging-reading',
    index: 2,
    title: 'Watch a reading get older',
    action: 'Pause the sample sensor or cut its connection. Watch the age and status change, then restore the link.',
    proves: 'A last known value is useful when you can see how old it is. A prediction is labeled separately from a measurement.',
    backend: 'Connected vessel monitoring needs compatible equipment and a working connection. Reading history and age help people judge the information.',
    dataLabel: 'Simulated sensor.',
    dataNote: 'Values, connection changes and predictions are examples. Time runs faster here; no vessel is connected.',
    component: defineAsyncComponent(() => import('@/components/playbook/AgingReading.vue')),
  },
  {
    id: 'berth-fit',
    index: 3,
    title: 'Find a berth that fits',
    action: 'Choose a sample vessel and day. Open a berth to see its approach details or the reason it does not fit.',
    proves: 'Vessel dimensions and berth availability answer different questions. An arrival needs both.',
    backend: 'Marina berth records can carry vessel limits and approach details. The host confirms the stay and makes the berth assignment.',
    dataLabel: 'Sample berth data.',
    dataNote: 'The Bahia Mar layout, occupancy, depths and limits are illustrative. This demo does not reserve a berth.',
    component: defineAsyncComponent(() => import('@/components/playbook/BerthFit.vue')),
  },
  {
    id: 'draw-your-water',
    index: 4,
    title: 'Draw a dock. Work the day board.',
    action: 'Draw a dock and add berths, or load the sample layout. Mark a sample arrival and see the berth state change.',
    proves: 'A shared layout gives the office and dock team a common place to record assignments and arrivals.',
    backend: 'Marina and private-dock workspaces keep the layout and berth records together. Available workflows depend on the workspace.',
    dataLabel: 'Interactive example.',
    dataNote: 'Edits and arrivals stay in this demo. They do not change a real marina, publish a dock listing or make a booking.',
    component: defineAsyncComponent(() => import('@/components/playbook/DrawYourWater.vue')),
  },
  {
    id: 'hazard-reroute',
    index: 5,
    title: 'See how a hazard can change a route',
    action: 'Place a sample hazard on the chart. Watch the route respond, then confirm or clear the report.',
    proves: 'A changing passage needs context: where a report came from, how old it is and whether it is still relevant.',
    backend: 'WaterWayz can show reported hazards. Community submission, confirmation and clearing are still being developed.',
    dataLabel: 'Simulated reporting.',
    dataNote: 'These reports and route changes stay in the demo. Hazard viewing exists in WaterWayz; report, confirm and clear actions are still in development.',
    component: defineAsyncComponent(() => import('@/components/playbook/HazardReroute.vue')),
  },
  {
    id: 'orbit-the-scan',
    index: 6,
    title: 'Explore a recorded marina scan',
    action: 'Rotate the survey, change the view and open a sample berth to read its approach details.',
    proves: 'Survey imagery adds context around structures and access. Berth records provide the separate details needed for an arrival.',
    backend: 'Recorded survey imagery can be shown on supported marina maps where a survey bundle is available. Live occupancy analysis is still developing.',
    dataLabel: 'Recorded survey + sample berths.',
    dataNote: 'The real scan is from Halifax Harbor. The Bahia Mar berth overlay is a separate illustration, not a survey of those berths or a live occupancy feed.',
    component: defineAsyncComponent(() => import('@/components/playbook/OrbitTheScan.vue')),
  },
  {
    id: 'water-right-now',
    index: 7,
    title: 'Check the conditions nearby',
    action: 'Choose one of six marinas. Compare the tide prediction, available wind observation and sunset time, with sources and observation ages.',
    proves: 'The source, location and age help you judge what a reading can tell you about your next stop.',
    backend: 'A place in the directory is a starting point for discovery. Available observations, routing coverage and bookable dockage vary by place.',
    dataLabel: 'Public feeds + calculated times.',
    dataNote: 'NOAA supplies tide predictions and NWS supplies weather observations where available. Sunset is calculated. Nearby stations may differ from conditions at the berth.',
    component: defineAsyncComponent(() => import('@/components/playbook/WaterRightNow.vue')),
  },
  {
    id: 'helm-view',
    index: 8,
    title: 'Follow a sample passage',
    action: 'Ride along, switch between Above, Helm and 3D, then open Marina View to explore the destination.',
    proves: 'Keep the passage, vessel information and next stop together as you change your view.',
    backend: 'The app connects route views, available vessel information and destinations. Coverage and freshness determine what can be shown.',
    dataLabel: 'Animated example.',
    dataNote: 'The vessel, traffic, conditions and arrival are sample data. Hazard and emergency controls do not submit reports or contact emergency services.',
    component: defineAsyncComponent(() => import('@/components/playbook/HelmView.vue')),
  },
  {
    id: 'app-screens',
    index: 9,
    title: 'Explore the product screens',
    action: 'Browse vessel, marina, private dock, service-company and business screens. Use the screen picker to follow the work that interests you.',
    proves: 'Different people work with the same vessel and place through views suited to their responsibilities.',
    backend: 'Vessels, marinas, private docks, service companies and businesses each have a workspace with access suited to their people.',
    dataLabel: 'Product preview with sample data.',
    dataNote: 'Screens are redrawn from the app and include features still in development. They do not create bookings, payments, work orders or account changes. The operator console is an internal administration view.',
    component: defineAsyncComponent(() => import('@/components/playbook/AppScreens.vue')),
  },
]

export const findJourney = (id: string | undefined): Journey | undefined =>
  id ? JOURNEYS.find((j) => j.id === id) : undefined
