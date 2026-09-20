<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <div class="scr-row"><h1 class="scr-h1">Billing</h1><span class="scr-pill" data-tone="warn">Scaffold</span></div>
        <p class="scr-sub">Who pays for what: every workspace bills through its account, and each account carries one subscription. DockPass payouts sit beside it. Read-only — the subscription belongs to each account's owner and billing roles.</p>
      </div>
    </div>

    <div class="scr-alert" data-tone="warn" role="note">
      <ScrIcon name="wrench" />
      <span><strong>Scaffold — no lane behind this yet. DEV-134</strong>Account subscriptions are live below — every workspace bills through its account, so there is no separate workspace plan to read. The DockPass payouts ledger (DEV-132) has no admin read yet; that section is shape only.</span>
    </div>

    <h2 class="scr-h3 bi-h">Account subscriptions</h2>
    <div class="scr-toolbar">
      <span class="scr-input scr-input--search bi-search scr-muted">Account name or slug…</span>
      <span class="scr-chip">Subscription · Every account <span aria-hidden="true">⌄</span></span>
      <span class="scr-spacer"></span>
      <span class="scr-small scr-muted">6 accounts · 4 active · 1 cancelled · 1 unsubscribed</span>
    </div>

    <table class="scr-table">
      <thead><tr><th>Account</th><th>Covers</th><th>Subscription</th><th>Cadence</th><th>Features &amp; sliders</th></tr></thead>
      <tbody>
        <tr v-for="a in accounts" :key="a.id">
          <td><a href="#" class="scr-strong">{{ a.name }}</a></td>
          <td class="scr-muted">{{ a.covers }}</td>
          <td><span class="scr-pill" :data-tone="a.tone">{{ a.subscription }}</span></td>
          <td class="scr-muted">{{ a.cadence }}</td>
          <td><a href="#" class="scr-small">On the account</a></td>
        </tr>
      </tbody>
    </table>

    <div class="scr-grid-2 scr-section">
      <div class="scr-card">
        <h2 class="scr-h3">Workspace plans</h2>
        <p class="scr-muted bi-p">There are none to list: every workspace bills through its account, and a workspace has no subscription of its own. What a workspace is entitled to is its account's subscription, above.</p>
      </div>
      <div class="scr-card">
        <h2 class="scr-h3">DockPass payouts</h2>
        <p class="scr-muted bi-p">What hosts are owed and what has been paid, per booking. No payouts lane exists (DEV-132, Stripe) — nothing to read, and nothing to reconcile yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const accounts = [
  { id: 'a1', name: 'Sam Miller', covers: '2 workspaces · 3 members', subscription: 'Active', tone: 'safe', cadence: 'Monthly' },
  { id: 'a2', name: 'Bahia Mar Yachting Center', covers: '1 workspace · 12 members', subscription: 'Active', tone: 'safe', cadence: 'Yearly' },
  { id: 'a3', name: 'Lauderdale Marine Service', covers: '1 workspace · 8 members', subscription: 'Active', tone: 'safe', cadence: 'Yearly' },
  { id: 'a4', name: 'Coconuts', covers: '1 workspace · 2 members', subscription: 'Active', tone: 'safe', cadence: 'Monthly' },
  { id: 'a5', name: 'Osprey Charters', covers: '1 workspace · 4 members', subscription: 'Cancelled', tone: 'offline', cadence: 'Monthly' },
  { id: 'a6', name: 'Kestrel', covers: '1 workspace · 1 member', subscription: 'No subscription', tone: 'warn', cadence: '—' },
]
</script>

<style scoped>
.bi-h { margin-bottom: 8px; }
.bi-search { flex: 1; display: flex; align-items: center; min-width: 0; }
.bi-p { margin-top: 4px; }
</style>
