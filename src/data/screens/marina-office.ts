import type { ScreenGroup } from './types'

export const MARINA_OFFICE: ScreenGroup = {
  id: 'marina-office', label: 'Marina: the office', kind: 'marina', app: 'WaterWayz Marina', frame: 'desktop', slug: 'bahia-mar',
  doors: [
    { id: 'dashboard', label: 'Today' }, { id: 'bookings', label: 'Bookings' }, { id: 'berths', label: 'Berths' }, { id: 'crm', label: 'Customers' }, { id: 'finance', label: 'Finance' },
    { id: 'sales', label: 'Rates' }, { id: 'operations', label: 'Operations' }, { id: 'comms', label: 'Messages' }, { id: 'reports', label: 'Reports' }, { id: 'settings', label: 'Settings' },
  ],
  screens: [
    /* Customers */
    { id: 'marina-office-customers', label: 'Customers', path: '/w/bahia-mar/customers', door: 'crm', summary: 'The directory an operator lives in when the phone rings: search the account, add a walk-in, review look-alike records.', load: () => import('@/components/screens/marina-office/Customers.vue') },
    { id: 'marina-office-customer-profile', label: 'Customer profile', path: '/w/bahia-mar/customers/miller', door: 'crm', summary: 'One customer: have we seen them before, their contacts, the vessels they hold and the stays matched through them.', load: () => import('@/components/screens/marina-office/CustomerProfile.vue') },
    { id: 'marina-office-contacts', label: 'Contacts', path: '/w/bahia-mar/contacts', door: 'crm', summary: 'Owner, skipper, payer and emergency contact for each vessel in the basin, read from the vessel.', load: () => import('@/components/screens/marina-office/Contacts.vue') },
    { id: 'marina-office-documents', label: 'Documents', path: '/w/bahia-mar/documents', door: 'crm', summary: 'Insurance and registration on file, with expiry dates that send their own reminders.', load: () => import('@/components/screens/marina-office/Documents.vue') },
    { id: 'marina-office-correspondence', label: 'Correspondence', path: '/w/bahia-mar/correspondence', door: 'crm', summary: 'Every message a customer was sent, on which channel, and whether it arrived.', load: () => import('@/components/screens/marina-office/Correspondence.vue') },
    /* Finance */
    { id: 'marina-office-folios', label: 'Folios', path: '/w/bahia-mar/folios', door: 'finance', summary: 'Open charges per stay before they are invoiced, with the deposit applied and the balance to bill.', load: () => import('@/components/screens/marina-office/Folios.vue') },
    { id: 'marina-office-invoices', label: 'Invoices', path: '/w/bahia-mar/invoices', door: 'finance', summary: 'Issued invoices numbered per billing entity, with what is outstanding and what is overdue.', load: () => import('@/components/screens/marina-office/Invoices.vue') },
    { id: 'marina-office-receipts', label: 'Receipts', path: '/w/bahia-mar/receipts', door: 'finance', summary: 'Payments taken by card, cash and transfer, and which invoice each one settles.', load: () => import('@/components/screens/marina-office/Receipts.vue') },
    { id: 'marina-office-deposits', label: 'Deposits', path: '/w/bahia-mar/deposits', door: 'finance', summary: 'Deposits held, applied and refunded, carried as a liability until they are used.', load: () => import('@/components/screens/marina-office/Deposits.vue') },
    { id: 'marina-office-credit-notes', label: 'Credit notes', path: '/w/bahia-mar/credits', door: 'finance', summary: 'Corrections against an issued invoice that leave the original intact, with the approval they need.', load: () => import('@/components/screens/marina-office/CreditNotes.vue') },
    { id: 'marina-office-refunds', label: 'Refunds', path: '/w/bahia-mar/refunds', door: 'finance', summary: 'Refunds awaiting approval by threshold, the provider fee kept, and what the customer gets back.', load: () => import('@/components/screens/marina-office/Refunds.vue') },
    { id: 'marina-office-statements', label: 'Statements', path: '/w/bahia-mar/statements', door: 'finance', summary: 'A customer account over a period: every document, the running balance and the ageing position.', load: () => import('@/components/screens/marina-office/Statements.vue') },
    { id: 'marina-office-reconciliation', label: 'Reconciliation', path: '/w/bahia-mar/reconciliation', door: 'finance', summary: 'The day closed against the card provider, the terminal and the bank, with unmatched items to resolve.', load: () => import('@/components/screens/marina-office/Reconciliation.vue') },
    { id: 'marina-office-accounting-exports', label: 'Accounting exports', path: '/w/bahia-mar/exports', door: 'finance', summary: 'Export runs to the ledger, mapped by account, with rejected documents retried one by one.', load: () => import('@/components/screens/marina-office/AccountingExports.vue') },
    { id: 'marina-office-payouts', label: 'Payouts', path: '/w/bahia-mar/payouts', door: 'finance', summary: 'DockPass revenue by stay and when it settles: the balance, the next transfer and the account it goes to.', load: () => import('@/components/screens/marina-office/Payouts.vue') },
    /* Rates */
    { id: 'marina-office-tariffs', label: 'Tariffs', path: '/w/bahia-mar/rates', door: 'sales', summary: 'The price list: nightly bands by vessel length, instant book or not, with retired bands kept for the stays they priced.', load: () => import('@/components/screens/marina-office/Tariffs.vue') },
    { id: 'marina-office-packages', label: 'Packages', path: '/w/bahia-mar/packages', door: 'sales', summary: 'Bundles sold as one thing, what each includes, and how many went this month.', load: () => import('@/components/screens/marina-office/Packages.vue') },
    { id: 'marina-office-discounts', label: 'Discounts', path: '/w/bahia-mar/discounts', door: 'sales', summary: 'Standing discounts, who may give them, and the thresholds above which a discount needs approval.', load: () => import('@/components/screens/marina-office/Discounts.vue') },
    { id: 'marina-office-channels', label: 'Channels', path: '/w/bahia-mar/channels', door: 'sales', summary: 'Direct against DockPass, walk-in and agents: which channel sold each night and on what terms.', load: () => import('@/components/screens/marina-office/Channels.vue') },
    /* Settings */
    { id: 'marina-office-profile', label: 'Marina profile', path: '/w/bahia-mar/profile', door: 'settings', summary: 'What the directory says about the marina, where each fact came from, and the corrections on top.', load: () => import('@/components/screens/marina-office/Profile.vue') },
    { id: 'marina-office-policies', label: 'Policies', path: '/w/bahia-mar/policy', door: 'settings', summary: 'Confirmation, cancellation and no-show rules stated once and rendered into what the guest reads.', load: () => import('@/components/screens/marina-office/Policies.vue') },
    { id: 'marina-office-document-templates', label: 'Document templates', path: '/w/bahia-mar/doc-templates', door: 'settings', summary: 'The agreements and notices the marina sends, versioned, with their merge fields and a preview.', load: () => import('@/components/screens/marina-office/DocumentTemplates.vue') },
    { id: 'marina-office-integrations', label: 'Integrations', path: '/w/bahia-mar/integrations', door: 'settings', summary: 'Accounting, payments, messaging and webhooks, each with its last sync and its failures in view.', load: () => import('@/components/screens/marina-office/Integrations.vue') },
    { id: 'marina-office-localisation', label: 'Localisation', path: '/w/bahia-mar/localization', door: 'settings', summary: 'Timezone, currency, tax and formats for the site itself; units stay per person.', load: () => import('@/components/screens/marina-office/Localisation.vue') },
    { id: 'marina-office-audit', label: 'Audit', path: '/w/bahia-mar/audit', door: 'settings', summary: 'Who changed what, when, and through which door, in a log nobody can edit.', load: () => import('@/components/screens/marina-office/Audit.vue') },
  ],
}
