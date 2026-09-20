import type { ScreenGroup } from './types'

/** The vessel workspace on the phone: the water, the passage, what wakes you. */
export const VESSEL: ScreenGroup = {
  id: 'vessel', label: 'Aboard: the water', kind: 'vessel', app: 'WaterWayz', frame: 'phone', slug: 'wanderer',
  doors: [
    { id: 'overview', label: 'Overview' }, { id: 'map', label: 'Map' }, { id: 'sensors', label: 'Sensors' }, { id: 'crew', label: 'Crew' }, { id: 'dockpass', label: 'Dockpass' },
    { id: 'vessel', label: 'Vessel' }, { id: 'maintenance', label: 'Maintenance' }, { id: 'chat', label: 'Chat' }, { id: 'settings', label: 'Settings' },
  ],
  screens: [
    { id: 'vessel-map', label: 'Map', path: '/w/wanderer/map', door: 'map', summary: 'The travel map: the ground, the camera, who is near, and the marina, route and today cards on the shelf.', load: () => import('@/components/screens/vessel/Map.vue') },
    { id: 'vessel-passage-planner', label: 'Passage planner', path: '/w/wanderer/map', door: 'map', summary: 'Two ends, the vessel envelope, and the engine\'s answer: the ribbon, the waits, the pinch points and other departures.', load: () => import('@/components/screens/vessel/PassagePlanner.vue') },
    { id: 'vessel-ride-along', label: 'Ride along', path: '/w/wanderer/map', door: 'map', summary: 'The planned passage ridden from the helm on route time, with under-keel, tide, wind and sea at each step.', load: () => import('@/components/screens/vessel/RideAlong.vue') },
    { id: 'vessel-marina-view', label: 'Marina view', path: '/w/wanderer/marina/bahia-mar', door: 'map', summary: 'The map\'s marina mode: the basin straight down, its facts, its courtesy berth and the two ends a passage can take from it.', load: () => import('@/components/screens/vessel/MarinaView.vue') },
    { id: 'vessel-today', label: 'Today on the water', path: '/w/wanderer/today', door: 'map', summary: 'Tide, wind, sea and light for the day, each with its source and age, plus the notices on your water.', load: () => import('@/components/screens/vessel/Today.vue') },
    { id: 'vessel-emergency', label: 'Emergency', path: '/w/wanderer/emergency', door: 'map', summary: 'Your position in the form a VHF call uses, the Mayday script, channel 16 and the number to call.', load: () => import('@/components/screens/vessel/Emergency.vue') },
    { id: 'vessel-hazards', label: 'Hazards', path: '/w/wanderer/hazards', door: 'map', summary: 'Community reports nearest first, worst first, with the report sheet for what you just saw.', load: () => import('@/components/screens/vessel/Hazards.vue') },
    { id: 'vessel-chart-sheet', label: 'Chart sheet', path: '/w/wanderer/chart-sheet', door: 'map', summary: 'The planned passage as a printable PDF: waypoints, bearings, distances and gates.', load: () => import('@/components/screens/vessel/ChartSheet.vue') },
    { id: 'vessel-departure', label: 'Departure window', path: '/w/wanderer/departure', door: 'map', summary: 'When to leave: each departure the engine offers, its clear probability at your margin and the waits it attributed.', load: () => import('@/components/screens/vessel/Departure.vue') },
    { id: 'vessel-float-plan', label: 'Float plan', path: '/w/wanderer/float-plan', door: 'map', summary: 'Tell someone ashore where you are going, who is aboard and when to worry.', load: () => import('@/components/screens/vessel/FloatPlan.vue') },
    { id: 'vessel-gpx', label: 'GPX', path: '/w/wanderer/gpx', door: 'map', summary: 'Routes and waypoints in from your chartplotter, planned passages back out as .gpx.', load: () => import('@/components/screens/vessel/Gpx.vue') },
    { id: 'vessel-underway', label: 'Underway', path: '/w/wanderer/underway', door: 'map', summary: 'The passage in progress: speed, heading, under-keel, the next gate and what is armed.', load: () => import('@/components/screens/vessel/Underway.vue') },
    { id: 'vessel-anchor-watch', label: 'Anchor watch', path: '/w/wanderer/anchor-watch', door: 'map', summary: 'A drop point, a swing radius and the verdict: holding or dragging.', load: () => import('@/components/screens/vessel/AnchorWatch.vue') },
    { id: 'vessel-mob', label: 'Man overboard', path: '/w/wanderer/mob', door: 'map', summary: 'One press marks the spot; range and bearing back to it, and the position to read over the radio.', load: () => import('@/components/screens/vessel/Mob.vue') },
    { id: 'vessel-alarms', label: 'Alarm centre', path: '/w/wanderer/alarms', door: 'map', summary: 'What the vessel is allowed to wake you for: navigation alarms with their sources, and the sensor alarms raised by the platform.', load: () => import('@/components/screens/vessel/Alarms.vue') },
    { id: 'vessel-alarm-detail', label: 'Alarm', path: '/w/wanderer/alarms/low-battery', door: 'map', summary: 'One alarm taking the screen: what it read, what to do, and that acknowledging is recorded.', load: () => import('@/components/screens/vessel/AlarmDetail.vue') },
    { id: 'vessel-track', label: 'Track', path: '/w/wanderer/track', door: 'map', summary: 'Where she has been by day, leg by leg with its source, and who may see it.', load: () => import('@/components/screens/vessel/Track.vue') },
    { id: 'vessel-fuel-prices', label: 'Fuel prices', path: '/w/wanderer/fuel-prices', door: 'dockpass', summary: 'Report what you paid at the pump beside the dock\'s published price, and confirm what others reported.', load: () => import('@/components/screens/vessel/FuelPrices.vue') },
    { id: 'vessel-dock-and-dine', label: 'Dock and dine', path: '/w/wanderer/dock-and-dine', door: 'dockpass', summary: 'A waterfront restaurant, whether its courtesy berth is free right now, and a hold while you come in.', load: () => import('@/components/screens/vessel/DockAndDine.vue') },
    { id: 'vessel-map-export', label: 'Map export', path: '/w/wanderer/map', door: 'map', summary: 'The view as a PNG at screen or print sizes, with the crop frame and the licence notes a print needs.', load: () => import('@/components/screens/vessel/MapExport.vue') },
  ],
}
