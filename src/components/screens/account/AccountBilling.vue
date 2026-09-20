<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Account</h1><p class="scr-sub">You, across every workspace you are in.</p></div>
      <span class="scr-pill" data-tone="warn">Scaffold</span>
    </div>
    <div class="scr-card scr-row">
      <span class="scr-avatar scr-avatar--lg">SM</span>
      <div><p class="scr-strong">Sam Miller</p><p class="scr-small scr-muted">sam@example.com</p><p class="scr-small">Coastal cruising · Fort Lauderdale</p></div>
    </div>
    <div class="scr-chips scr-chips--scroll acb-tabs">
      <span v-for="t in TABS" :key="t" class="scr-chip" :class="{ 'is-on': t === 'Billing' }">{{ t }}</span>
    </div>

    <p class="scr-alert scr-small"><ScrIcon name="receipt" /><span>Subscriptions are read from billing; nothing here charges.</span></p>

    <div class="scr-section scr-card scr-card--flush">
      <div style="padding: 12px 14px 6px"><h2 class="scr-h3">Subscriptions</h2><p class="scr-small scr-muted">One row per account you belong to. The account carries the subscription — features, sliders, cadence — for every workspace in it.</p></div>
      <ul class="scr-list" style="border: 0; border-radius: 0">
        <li v-for="s in SUBS" :key="s.account" class="scr-item scr-item--plain">
          <span>
            <span class="scr-item-title">{{ s.account }}</span>
            <span class="scr-item-sub">{{ s.role }} · {{ s.cadence }} · {{ s.features }}</span>
            <span v-if="s.held" class="scr-item-sub scr-num">{{ s.held }}</span>
          </span>
          <span class="scr-item-end"><span class="scr-pill" :data-tone="s.tone">{{ s.status }}</span><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">{{ s.bills ? 'Manage' : 'Open' }}</button></span>
        </li>
      </ul>
      <p class="scr-micro scr-muted" style="padding: 6px 14px 12px">Pricing is a function of the cadence, the features and the quantities, and lives only in the billing service — it is not shown yet.</p>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <div><h2 class="scr-h3">Payment method</h2><p class="scr-small scr-muted">Held by the payment provider, never by this app. You will add or change a card on its hosted page.</p></div>
      <div class="scr-alert" data-tone="warn"><ScrIcon name="alert" /><div><strong>Not wired</strong><span class="scr-small">No payment provider is connected. When Stripe is, this card shows the last four digits and the expiry it reports — nothing more is stored here.</span></div></div>
      <button type="button" class="scr-btn scr-btn--block" disabled>Add a payment method</button>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <div class="scr-row scr-row--between">
        <div><h2 class="scr-h3">Invoices</h2><p class="scr-small scr-muted">Every charge, with the account it was for.</p></div>
        <button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">All invoices</button>
      </div>
      <ul class="scr-list">
        <li class="scr-item scr-item--plain"><span><span class="scr-item-title">Sam Miller · October 2026</span><span class="scr-item-sub">1–31 Oct · Monthly</span></span><span class="scr-item-end"><span class="scr-num scr-strong">$48.00</span><span class="scr-pill" data-tone="safe">Paid</span></span></li>
        <li class="scr-item scr-item--plain"><span><span class="scr-item-title">Sam Miller · September 2026</span><span class="scr-item-sub">1–30 Sep · Monthly</span></span><span class="scr-item-end"><span class="scr-num scr-strong">$48.00</span><span class="scr-pill" data-tone="safe">Paid</span></span></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const TABS = ['Profile', 'On the water', 'Emergency contact', 'Privacy', 'Notifications', 'Preferences', 'Sign-in and security', 'Workspaces', 'Accounts', 'Billing', 'About & legal']
const SUBS = [
  { account: 'Sam Miller', role: 'Owner', cadence: 'Monthly', features: 'Routing, Sensor monitoring, DockPass', held: '1 of 2 vessels · 1 of 1 private docks · 3 of 4 sensor units', status: 'Active', tone: 'accent', bills: true },
  { account: 'Bahia Mar Marina', role: 'Member', cadence: 'Annual', features: 'Marina bookings, Chat, Routing', held: '2 of 2 marinas · 14 of 20 seats', status: 'Active', tone: 'accent', bills: false },
  { account: 'Coconuts Dock & Dine LLC', role: 'Member', cadence: 'Monthly', features: 'Chat', held: '1 of 1 businesses', status: 'Active', tone: 'accent', bills: false },
  { account: 'Miller family', role: 'Owner', cadence: 'no subscription', features: 'the account can hold no workspace until it has one', held: '', status: 'None', tone: 'warn', bills: true },
]
</script>

<style scoped>
.acb-tabs { margin: 12px 0; }
</style>
