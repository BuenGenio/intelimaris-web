import type { ScreenGroup } from './types'

/** The yard: a maintenance company serving vessels through engagements (DEV-457). */
export const YARD: ScreenGroup = {
  id: 'yard', label: 'Yard: maintenance', kind: 'maintenance', app: 'WaterWayz Yard', frame: 'desktop', slug: 'lauderdale-marine',
  doors: [
    { id: 'dashboard', label: 'Dashboard' }, { id: 'work', label: 'Work' }, { id: 'technicians', label: 'Technicians' }, { id: 'chat', label: 'Chat' }, { id: 'settings', label: 'Settings' },
  ],
  screens: [
    { id: 'yard-dashboard', label: 'Dashboard', path: '/w/lauderdale-marine/dashboard', door: 'dashboard', summary: 'Which vessels the yard serves and what is due on each, with the engagement requests waiting on it.', load: () => import('@/components/screens/yard/Dashboard.vue') },
    { id: 'yard-work', label: 'Work', path: '/w/lauderdale-marine/work', door: 'work', summary: 'The cross-vessel worklist: every open work order and every reminder due, filtered by vessel, system and status.', load: () => import('@/components/screens/yard/Work.vue') },
    { id: 'yard-technicians', label: 'Technicians', path: '/w/lauderdale-marine/technicians', door: 'technicians', summary: 'The roster and who is assigned to which served vessel.', load: () => import('@/components/screens/yard/Technicians.vue') },
    { id: 'yard-served-vessels', label: 'Served vessels', path: '/w/lauderdale-marine/vessels', door: 'dashboard', summary: 'Every engagement the yard has, active, requested and settled, with hours, technicians and what is open.', load: () => import('@/components/screens/yard/ServedVessels.vue') },
    { id: 'yard-company', label: 'Company', path: '/w/lauderdale-marine/company', door: 'settings', summary: 'The company as the directory shows it: specialties, service area, contact and whether it is listed.', load: () => import('@/components/screens/yard/Company.vue') },
    { id: 'yard-chat', label: 'Chat', path: '/w/lauderdale-marine/chat', door: 'chat', summary: 'The staff channel and the service channels the yard shares with each vessel it serves.', load: () => import('@/components/screens/yard/YardChat.vue') },
    { id: 'yard-technician-monitoring', label: 'Technician: monitoring', path: '/w/wanderer/monitoring', door: 'work', frame: 'phone', summary: 'A served vessel as her technician sees it: live readings by system and the model claims about her.', load: () => import('@/components/screens/yard/TechnicianMonitoring.vue') },
    { id: 'yard-technician-maintenance', label: 'Technician: maintenance', path: '/w/wanderer/maintenance', door: 'work', frame: 'phone', summary: 'The vessel upkeep door through the engagement: reminders, work orders, service history and the yard that serves her.', load: () => import('@/components/screens/yard/TechnicianMaintenance.vue') },
  ],
}
