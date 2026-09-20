import type { ScreenGroup } from './types'

/** The marina office's operations, messages and reports, plus the private dock's own front door. */
export const MARINA_OPS: ScreenGroup = {
  id: 'marina-ops', label: 'Marina: operations', kind: 'marina', app: 'WaterWayz Marina', frame: 'desktop', slug: 'bahia-mar',
  doors: [
    { id: 'dashboard', label: 'Today' }, { id: 'bookings', label: 'Bookings' }, { id: 'berths', label: 'Berths' }, { id: 'crm', label: 'Customers' }, { id: 'finance', label: 'Finance' },
    { id: 'sales', label: 'Rates' }, { id: 'operations', label: 'Operations' }, { id: 'comms', label: 'Messages' }, { id: 'reports', label: 'Reports' }, { id: 'settings', label: 'Settings' },
  ],
  screens: [
    // Operations
    { id: 'marina-ops-incidents', label: 'Incidents', path: '/w/bahia-mar/incidents', door: 'operations', summary: 'The incident log: kind, severity, where and when, resolved with a sentence that stays on the record.', load: () => import('@/components/screens/marina-ops/Incidents.vue') },
    { id: 'marina-ops-staff', label: 'Staff and duty', path: '/w/bahia-mar/staff', door: 'operations', summary: 'Who is on the dock this minute, today’s shift log and everyone in the workspace with their role.', load: () => import('@/components/screens/marina-ops/StaffDuty.vue') },
    { id: 'marina-ops-urgent', label: 'Urgent work', path: '/w/bahia-mar/urgent', door: 'operations', summary: 'The tasks and incidents blocking the day, soonest deadline first, each with an owner or a gap where one should be.', load: () => import('@/components/screens/marina-ops/UrgentWork.vue') },
    { id: 'marina-ops-handover', label: 'Handover', path: '/w/bahia-mar/handover', door: 'operations', summary: 'What the next shift must know: risks, late arrivals and the commitments made today.', load: () => import('@/components/screens/marina-ops/Handover.vue') },
    { id: 'marina-ops-tasks', label: 'Tasks', path: '/w/bahia-mar/tasks', door: 'operations', summary: 'Every task with an assignee, a due time and the evidence it was done.', load: () => import('@/components/screens/marina-ops/Tasks.vue') },
    { id: 'marina-ops-dockwalks', label: 'Dock walks', path: '/w/bahia-mar/dockwalks', door: 'operations', summary: 'A walk down C dock: what the board said against what the walker saw, berth by berth.', load: () => import('@/components/screens/marina-ops/DockWalks.vue') },
    { id: 'marina-ops-assets', label: 'Site assets', path: '/w/bahia-mar/assets', door: 'operations', summary: 'Pontoons, pedestals, pumps and safety equipment as maintainable things with a condition and an inspection due.', load: () => import('@/components/screens/marina-ops/SiteAssets.vue') },
    { id: 'marina-ops-workorders', label: 'Work orders', path: '/w/bahia-mar/workorders', door: 'operations', summary: 'Work orders with their estimate, labour, parts and the invoice raised on close.', load: () => import('@/components/screens/marina-ops/WorkOrders.vue') },
    { id: 'marina-ops-utilities', label: 'Utilities and meters', path: '/w/bahia-mar/utilities', door: 'operations', summary: 'The meter register, this cycle’s readings and the charge each one justifies; an unread meter raises nothing.', load: () => import('@/components/screens/marina-ops/UtilitiesMeters.vue') },
    { id: 'marina-ops-lifts', label: 'Launch and lift schedule', path: '/w/bahia-mar/lifts', door: 'operations', summary: 'Crane, forklift and staging berths as bookable capacity, laid out across the day.', load: () => import('@/components/screens/marina-ops/LaunchLift.vue') },
    // Messages
    { id: 'marina-ops-chat', label: 'Staff channel', path: '/w/bahia-mar/chat', door: 'comms', summary: 'The workspace’s own channel, newest at the bottom like a radio log, with the composer under it.', load: () => import('@/components/screens/marina-ops/StaffChannel.vue') },
    { id: 'marina-ops-guestinbox', label: 'Guest inbox', path: '/w/bahia-mar/guestinbox', door: 'comms', summary: 'Guest threads tied to the stay or contract they concern, with the reply landing on the record.', load: () => import('@/components/screens/marina-ops/GuestInbox.vue') },
    { id: 'marina-ops-templates', label: 'Templates', path: '/w/bahia-mar/templates', door: 'comms', summary: 'Pre-arrival, renewal and payment reminders written once, with the fields that fill from the stay.', load: () => import('@/components/screens/marina-ops/Templates.vue') },
    { id: 'marina-ops-announcements', label: 'Announcements', path: '/w/bahia-mar/announcements', door: 'comms', summary: 'A message to a reviewable recipient group, with who has no contact listed before the send.', load: () => import('@/components/screens/marina-ops/Announcements.vue') },
    { id: 'marina-ops-delivery', label: 'Delivery exceptions', path: '/w/bahia-mar/delivery', door: 'comms', summary: 'What failed to send, why, who owns it, and whether it can be resent or the contact needs fixing.', load: () => import('@/components/screens/marina-ops/DeliveryExceptions.vue') },
    // Reports
    { id: 'marina-ops-revenue', label: 'Revenue', path: '/w/bahia-mar/revenue', door: 'reports', summary: 'Realised, booked, invoiced and collected as four separate figures, by day and by line.', load: () => import('@/components/screens/marina-ops/Revenue.vue') },
    { id: 'marina-ops-debt', label: 'Debt and ageing', path: '/w/bahia-mar/debt', door: 'reports', summary: 'Who owes what and for how long, bucketed by age, with a call, a message and a statement one tap away.', load: () => import('@/components/screens/marina-ops/DebtAgeing.vue') },
    { id: 'marina-ops-deposits-held', label: 'Deposits held', path: '/w/bahia-mar/deposits-held', door: 'reports', summary: 'The deposit liability: held, taken, applied and refunded, separate from revenue.', load: () => import('@/components/screens/marina-ops/DepositsHeld.vue') },
    { id: 'marina-ops-renewals-report', label: 'Renewals', path: '/w/bahia-mar/renewals-report', door: 'reports', summary: 'Conversion and retention against the book for the season’s expiring contracts, with the uplift.', load: () => import('@/components/screens/marina-ops/RenewalsReport.vue') },
    { id: 'marina-ops-utilities-report', label: 'Utilities recovery', path: '/w/bahia-mar/utilities-report', door: 'reports', summary: 'Power bought against power recharged, by month and by dock, and the readings nobody took.', load: () => import('@/components/screens/marina-ops/UtilitiesRecovery.vue') },
    { id: 'marina-ops-work-report', label: 'Work profitability', path: '/w/bahia-mar/work-report', door: 'reports', summary: 'Labour, parts and service revenue against each other by kind of work, and where the margin leaks.', load: () => import('@/components/screens/marina-ops/WorkProfitability.vue') },
    { id: 'marina-ops-portfolio', label: 'Portfolio comparison', path: '/w/bahia-mar/portfolio', door: 'reports', summary: 'Occupancy, revenue per berth and debt across the sites this person is authorised to see.', load: () => import('@/components/screens/marina-ops/PortfolioComparison.vue') },
    // The private dock's front door
    { id: 'marina-ops-private-dock', label: 'Private dock dashboard', path: '/w/isle-of-venice/dashboard', door: 'dashboard', summary: 'A private dock’s day: requests waiting, its three berths and their availability windows, and the co-host who answers when the owner is away.', load: () => import('@/components/screens/marina-ops/PrivateDockDashboard.vue') },
  ],
}
