import type { ShotId } from './shots'

export interface Solution {
  id: string
  label: string
  eyebrow: string
  headline: string
  summary: string
  status: string
  statusDetail: string
  shot?: ShotId
  caption?: string
  steps: { title: string; body: string }[]
  currentTitle: string
  current: string[]
  nextTitle: string
  next: string[]
  links: { label: string; to: string }[]
  cta: string
}

export const SOLUTIONS: Solution[] = [
  {
    id: 'pwts', label: 'PWTS', eyebrow: 'InteliMARIS™ connected systems',
    headline: 'Your vessel never stops communicating.',
    summary: 'Power, Water, Temperature & Switching: a connected view of the systems that keep your vessel working. Start with the things you want to know, then choose the sensors that can tell you.',
    status: 'Connected hardware · Installation dependent',
    statusDetail: 'PWTS brings a family of devices together. The readings and controls available to you depend on the hardware, gateway, connectivity and software configured for your vessel.',
    shot: 'waterwayz-sensors', caption: 'A product view of vessel readings, with the age of each value visible.',
    steps: [
      { title: 'Choose what matters aboard', body: 'Build coverage around battery and shore power, leaks and bilge levels, temperature, humidity and other supported systems. PWTS is the foundation for vessel awareness, rather than a single sensor.' },
      { title: 'Connect the vessel', body: 'Compatible devices communicate through the MX MariWavz™ radio network and gateway infrastructure. The radio carries the data; the InteliMARIS technology Stack organizes it for the application.' },
      { title: 'See the information in WaterWayz™', body: 'Review connected readings, their age and available history. Share the relevant view with your crew or assigned service technician, so a reading can lead to an informed decision.' },
    ],
    currentTitle: 'Plan your coverage',
    current: ['Battery and DC electrical monitoring', 'Shore power presence and water ingress', 'Temperature, humidity and compatible safety sensors', 'Switching hardware with installation-specific controls'],
    nextTitle: 'Keep the layers clear',
    next: ['Local device behavior depends on the installed hardware and firmware.', 'Remote visibility needs a working sensor, gateway and uplink.', 'Cross-sensor interpretation and advanced recommendations are developing software capabilities.'],
    links: [{ label: 'Explore the sensor catalog', to: '/products' }, { label: 'See vessel monitoring', to: '/capabilities/monitoring' }, { label: 'Explore InteliBilge', to: '/intelibilge' }, { label: 'Explore InteliBMS', to: '/intelibms' }],
    cta: 'Plan your vessel monitoring',
  },
  {
    id: 'intelibilge', label: 'InteliBilge', eyebrow: 'InteliMARIS™ connected systems',
    headline: 'Local protection first. Connected awareness second.',
    summary: 'Water-ingress monitoring and bilge-pump supervision, with the vessel’s local protection at the center. WaterWayz™ adds visibility into supported readings and history when connected.',
    status: 'System configuration · Confirm installation scope',
    statusDetail: 'Select and validate the sensor, pump, controller and alarms for the vessel. Cloud connectivity and developing analytics must not be treated as the local pump controller or a guarantee against flooding.',
    shot: 'waterwayz-sensors', caption: 'Connected bilge readings alongside the other systems aboard.',
    steps: [
      { title: 'Start in the bilge', body: 'Choose appropriate water-level sensing, pump capacity, control thresholds and local alarms. The installed hardware and firmware determine how local protection operates.' },
      { title: 'Bring the information aboard and ashore', body: 'Compatible sensing and gateway equipment can bring bilge information into the connected vessel view. Remote visibility depends on the installed configuration and connectivity.' },
      { title: 'Keep a useful service record', body: 'Use available readings and history alongside inspection and maintenance records. Pump-cycle analysis and unusual-ingress interpretation are developing capabilities that need validation.' },
    ],
    currentTitle: 'Discuss the installation',
    current: ['Solid-state water-level sensing with the IM601 family', 'Vessel-specific pump and local control requirements', 'High-water indication and local alarm configuration', 'Connected readings through the vessel monitoring workflow'],
    nextTitle: 'Developing intelligence',
    next: ['Pump-cycle and ingress-pattern analysis', 'Context-aware maintenance recommendations', 'Marina escalation and additional remote notification workflows; availability must be confirmed'],
    links: [{ label: 'View IM601 sensor details', to: '/products/im601' }, { label: 'See the system specification', to: '/products/intelibilge' }, { label: 'Explore vessel maintenance', to: '/capabilities/maintenance' }],
    cta: 'Discuss your bilge installation',
  },
  {
    id: 'intelibms', label: 'InteliBMS', eyebrow: 'InteliMARIS™ connected systems',
    headline: 'Know what your batteries are telling you.',
    summary: 'Battery and shunt monitoring brings electrical information into the vessel’s wider picture. Understand supported measurements, follow available history and give your service team better context.',
    status: 'Battery monitoring · Configuration dependent',
    statusDetail: 'InteliBMS is the battery-awareness family around DC shunt and battery-monitor hardware. Supported values depend on the installed monitor, calibration and connected data channels.',
    shot: 'waterwayz-sensors', caption: 'Electrical values belong alongside the vessel’s other systems and their data freshness.',
    steps: [
      { title: 'Measure the bank', body: 'Choose the monitor and shunt for your battery system. Voltage, current and other supported channels provide the foundation; estimates such as state of charge depend on setup and calibration.' },
      { title: 'Read the history', body: 'Use WaterWayz™ to view the connected readings and available history. A measurement, an estimate and a model prediction should always be distinguishable.' },
      { title: 'Make service more informed', body: 'Share relevant monitoring access with an assigned technician. Check the installation when readings are missing, stale or unexpected.' },
    ],
    currentTitle: 'Build from measured data',
    current: ['Battery and shunt hardware selection', 'Supported voltage, current and battery-state channels', 'Connected vessel monitoring and available channel history', 'Service access through an active engagement'],
    nextTitle: 'Developing, subject to validation',
    next: ['Long-term battery-health and anomaly analysis', 'Predictive maintenance and context-aware recommendations', 'No claim of autonomous battery isolation or validated thermal-runaway prevention'],
    links: [{ label: 'View IM501 battery monitor', to: '/products/im501' }, { label: 'View DC power monitoring', to: '/products/im801' }, { label: 'Understand developing intelligence', to: '/intelligence' }],
    cta: 'Discuss your battery monitoring',
  },
  {
    id: 'intelligence', label: 'AI-powered intelligence', eyebrow: 'Inside the InteliMARIS technology Stack',
    headline: 'More context. Better-informed decisions.',
    summary: 'A single reading tells part of the story. We are developing intelligence that can connect vessel data, history and operating context, helping the right person understand what may need attention.',
    status: 'In development',
    statusDetail: 'The vessel monitoring interface can display model predictions with their source and age. That capability does not mean every model, recommendation or proposed integration is validated or available for every vessel.',
    shot: 'waterwayz-sensors', caption: 'Measured vessel readings are the starting point for developing analysis.',
    steps: [
      { title: 'Monitor and analyze', body: 'Receive supported vessel data and examine it alongside available history. Event correlation and trend analysis belong in the software and data infrastructure.' },
      { title: 'Detect and assess', body: 'Develop methods for identifying unusual patterns, then add vessel state, location and environmental context where reliable data is available.' },
      { title: 'Inform the right person', body: 'Present useful information through WaterWayz™ to an authorized user. Keep the source, age and uncertainty visible, so a prediction is never mistaken for a measurement.' },
    ],
    currentTitle: 'The foundation in the product',
    current: ['Connected readings and channel history', 'Visible freshness and missing-data states', 'A monitoring view for predictions with model identity, version and time'],
    nextTitle: 'Areas being developed',
    next: ['Cross-sensor event correlation and anomaly detection', 'Maintenance intelligence and contextual recommendations', 'Combining supported vessel, marina and waterway information'],
    links: [{ label: 'See the connected architecture', to: '/software' }, { label: 'Explore vessel monitoring', to: '/capabilities/monitoring' }],
    cta: 'Discuss an intelligence use case',
  },
  {
    id: 'geospatial', label: 'Drone & geospatial intelligence', eyebrow: 'Marine mapping / With Pilot Byte',
    headline: 'See the place. Understand the approach.',
    summary: 'Aerial imagery and survey data can reveal the detail around a marina: docks, walkways, seawalls and the routes between them. InteliMARIS is developing this geospatial story in collaboration with Pilot Byte.',
    status: 'Survey demonstration · Integrations in development',
    statusDetail: 'Explore a real LiDAR dataset in the existing technology demo. Automated marina surveys, live occupancy and WaterWayz™ survey-layer integrations are developing concepts, rather than operational services demonstrated by that viewer.',
    steps: [
      { title: 'Fly and capture', body: 'Scope appropriate aerial imagery, geo-coded video, photogrammetry or LiDAR for the location and task. Capture methods, permissions and deliverables depend on the survey.' },
      { title: 'Map and analyze', body: 'Turn the available data into views of the environment. Inspect structure, height and access context; confirm the dataset’s origin, date and limits before applying it to a site.' },
      { title: 'Connect the useful detail', body: 'The proposed next step is to bring suitable layers into WaterWayz™ for marina layouts, approach context and landside access planning. These integrations remain in development.' },
    ],
    currentTitle: 'What you can explore here',
    current: ['An interactive viewer using real aerial LiDAR survey data', 'Height, intensity and derived structure views', 'A sample marina page that explains the source and limits of its demonstration data'],
    nextTitle: 'Proposed workflows',
    next: ['Repeatable slip and occupancy surveys', 'Incident awareness and marina infrastructure inspection workflows', 'Marina access-to-vessel routing and future arrival guidance', 'Bathymetric material only after equipment, dataset and coverage are confirmed'],
    links: [{ label: 'Explore the survey demonstration', to: '/demo/marina/bahia-mar' }, { label: 'See the technology demo', to: '/demo' }, { label: 'Explore emergency assistance', to: '/capabilities/emergency-assistance' }],
    cta: 'Discuss a marina survey',
  },
  {
    id: 'vision', label: 'InteliVision / Docking & Vision', eyebrow: 'Future concepts',
    headline: 'A clearer view of the last few metres.',
    summary: 'We are exploring camera-based visual awareness, docking assistance and route-to-slip concepts within the InteliMARIS ecosystem.',
    status: 'Coming soon · Concept',
    statusDetail: 'Hardware, software release scope and operating workflows have not been confirmed. This is a preview of the direction, with no release date or autonomous docking capability promised.',
    steps: [
      { title: 'Understand the surroundings', body: 'Explore how visual information could add context around the vessel and berth.' },
      { title: 'Support the approach', body: 'Investigate how an assigned slip and approach information could work with future visual-assistance tools.' },
      { title: 'Keep the operator in control', body: 'Evaluate the hardware, data and operational limits before any assistance feature is presented as available.' },
    ],
    currentTitle: 'Explore today', current: ['Marina information and vessel-aware passage planning', 'Host-confirmed stays and marina berth assignment'],
    nextTitle: 'Concepts only', next: ['Camera-based situational awareness', 'Docking-assist experiences', 'Visual route-to-slip guidance'],
    links: [{ label: 'Explore arrival workflows', to: '/capabilities/dockpass' }, { label: 'Discover InteliMarina', to: '/marinas' }],
    cta: 'Talk about future docking tools',
  },
]

export function findSolution(id: unknown) { return SOLUTIONS.find(solution => solution.id === id) }
export function solutionLink(id: string) { return `/${id}` }
