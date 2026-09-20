import type { ScreenGroup } from './types'

/** A waterfront business: the claimed listing, its lanes and the people behind it (DEV-193/198/461/462). */
export const BUSINESS: ScreenGroup = {
  id: 'business', label: 'Waterfront business', kind: 'business', app: 'WaterWayz Business', frame: 'desktop', slug: 'coconuts',
  doors: [
    { id: 'overview', label: 'Overview' }, { id: 'listing', label: 'Listing' }, { id: 'berths', label: 'Berths' }, { id: 'reports', label: 'Reports' }, { id: 'settings', label: 'Settings' },
  ],
  screens: [
    { id: 'business-overview', label: 'Overview', path: '/w/coconuts/overview', door: 'overview', summary: 'Where the claim stands, what the chart shows for the place, and who is holding a courtesy berth right now.', load: () => import('@/components/screens/business/Overview.vue') },
    { id: 'business-listing', label: 'Listing', path: '/w/coconuts/listing', door: 'listing', summary: 'The resolved listing a vessel sees, every field with its provenance and every perishable value with its age.', load: () => import('@/components/screens/business/Listing.vue') },
    { id: 'business-listing-editor', label: 'Listing editor', path: '/w/coconuts/listing/edit', door: 'listing', summary: 'Correcting the listing: base fields with provenance, the details that are yours alone, and the category extras from the taxonomy.', load: () => import('@/components/screens/business/ListingEditor.vue') },
    { id: 'business-requests', label: 'Requests', path: '/w/coconuts/requests', door: 'berths', summary: 'Guests asking for a night on the dock, waiting on an answer, and the ones already decided.', load: () => import('@/components/screens/business/Requests.vue') },
    { id: 'business-fuel-prices', label: 'Fuel prices', path: '/w/coconuts/fuel-prices', door: 'listing', summary: 'The prices the business publishes, how fresh they are, and the separate lane of what vessels report paying.', load: () => import('@/components/screens/business/FuelPrices.vue') },
    { id: 'business-reports', label: 'Reports', path: '/w/coconuts/reports', door: 'reports', summary: 'What vessels say about the place, a count and an age per kind, never a score.', load: () => import('@/components/screens/business/Reports.vue') },
    { id: 'business-people', label: 'People', path: '/w/coconuts/settings/people', door: 'settings', summary: 'Everyone in the workspace with their role and standing, open invites and the invite code.', load: () => import('@/components/screens/business/People.vue') },
  ],
}
