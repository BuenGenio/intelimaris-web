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
    <div class="scr-chips scr-chips--scroll aci-tabs">
      <span v-for="t in TABS" :key="t" class="scr-chip" :class="{ 'is-on': t === 'Billing' }">{{ t }}</span>
    </div>

    <p class="scr-small" style="margin-bottom: 10px"><a><ScrIcon name="back" style="vertical-align: -4px" /> Billing</a></p>

    <div class="scr-kpis">
      <div class="scr-stat"><span class="scr-stat-label">Paid in 2026</span><span class="scr-stat-value">$432<small>USD</small></span></div>
      <div class="scr-stat"><span class="scr-stat-label">Open</span><span class="scr-stat-value">$0</span><span class="scr-stat-delta" data-tone="safe">Nothing due</span></div>
    </div>

    <div class="scr-section scr-card scr-card--flush">
      <div class="scr-row scr-row--between" style="padding: 12px 14px 6px">
        <div><h2 class="scr-h3">Invoices</h2><p class="scr-small scr-muted">Newest first. Each carries the period, the account, the amount and its status.</p></div>
        <span class="scr-pill scr-pill--bare" data-tone="offline"><span class="scr-num">{{ INVOICES.length }}</span> on record</span>
      </div>
      <div class="scr-chips scr-chips--scroll" style="padding: 0 14px 8px; margin-inline: 0">
        <button v-for="f in FILTERS" :key="f" type="button" class="scr-chip" :class="{ 'is-on': filter === f }" @click="filter = f">{{ f }}</button>
      </div>
      <ul class="scr-list" style="border: 0; border-radius: 0">
        <li v-for="i in shown" :key="i.id" class="scr-item scr-item--plain">
          <span>
            <span class="scr-item-title">{{ i.account }} · {{ i.period }}</span>
            <span class="scr-item-sub scr-num">{{ i.id }} · {{ i.range }} · {{ i.cadence }}</span>
          </span>
          <span class="scr-item-end"><span class="scr-num scr-strong">{{ i.amount }}</span><span class="scr-pill" :data-tone="i.tone">{{ i.status }}</span><ScrIcon name="download" /></span>
        </li>
      </ul>
      <p class="scr-micro scr-muted" style="padding: 6px 14px 12px">When a subscription bills, its invoice lands here with a PDF the provider renders — this app never rewrites an invoice.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const TABS = ['Profile', 'On the water', 'Emergency contact', 'Privacy', 'Notifications', 'Preferences', 'Sign-in and security', 'Workspaces', 'Accounts', 'Billing', 'About & legal']
const FILTERS = ['All', 'Sam Miller', 'Miller family']
const filter = ref('All')
const INVOICES = [
  { id: 'INV-2026-0142', account: 'Sam Miller', period: 'October 2026', range: '1–31 Oct', cadence: 'Monthly', amount: '$48.00', status: 'Paid', tone: 'safe' },
  { id: 'INV-2026-0128', account: 'Sam Miller', period: 'September 2026', range: '1–30 Sep', cadence: 'Monthly', amount: '$48.00', status: 'Paid', tone: 'safe' },
  { id: 'INV-2026-0113', account: 'Sam Miller', period: 'August 2026', range: '1–31 Aug', cadence: 'Monthly', amount: '$48.00', status: 'Paid', tone: 'safe' },
  { id: 'INV-2026-0097', account: 'Sam Miller', period: 'July 2026', range: '1–31 Jul', cadence: 'Monthly', amount: '$36.00', status: 'Paid', tone: 'safe' },
  { id: 'INV-2026-0081', account: 'Sam Miller', period: 'June 2026', range: '1–30 Jun', cadence: 'Monthly', amount: '$36.00', status: 'Refunded', tone: 'offline' },
  { id: 'INV-2026-0064', account: 'Sam Miller', period: 'May 2026', range: '1–31 May', cadence: 'Monthly', amount: '$36.00', status: 'Paid', tone: 'safe' },
]
const shown = computed(() => INVOICES.filter((i) => filter.value === 'All' || i.account === filter.value))
</script>

<style scoped>
.aci-tabs { margin: 12px 0; }
</style>
