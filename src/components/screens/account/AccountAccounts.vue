<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Account</h1><p class="scr-sub">You, across every workspace you are in.</p></div>
    </div>
    <div class="scr-card scr-row">
      <span class="scr-avatar scr-avatar--lg">SM</span>
      <div><p class="scr-strong">Sam Miller</p><p class="scr-small scr-muted">sam@example.com</p><p class="scr-small">Coastal cruising · Fort Lauderdale</p></div>
    </div>
    <div class="scr-chips scr-chips--scroll aca-tabs">
      <span v-for="t in TABS" :key="t" class="scr-chip" :class="{ 'is-on': t === 'Accounts' }">{{ t }}</span>
    </div>

    <div class="scr-card scr-card--flush">
      <div style="padding: 12px 14px 6px"><h2 class="scr-h3">Your accounts</h2><p class="scr-small scr-muted">An account pays the bill, holds the people, and contains its workspaces — a marina and its restaurant, a yard and its rental vessels, or just your own vessel.</p></div>
      <ul class="scr-list" style="border: 0; border-radius: 0">
        <li v-for="a in ACCOUNTS" :key="a.name" class="scr-item scr-item--plain">
          <span>
            <span class="scr-item-title">{{ a.name }}</span>
            <span class="scr-item-sub">{{ a.role }} · <span class="scr-num">{{ a.workspaces }}</span> workspaces · <span class="scr-num">{{ a.members }}</span> members</span>
            <span class="scr-item-sub">{{ a.plan }}</span>
          </span>
          <span class="scr-item-end"><span class="scr-pill" :data-tone="a.tone">{{ a.status }}</span><ScrIcon name="chevron" /></span>
        </li>
      </ul>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <div><h2 class="scr-h3">Sam Miller · subscription</h2><p class="scr-small scr-muted">Monthly · Routing, Sensor monitoring, DockPass. Features and quantities apply to every workspace in the account.</p></div>
      <div class="scr-bars">
        <div><span>Vessels</span><div class="scr-progress"><i style="width: 50%"></i></div><span class="scr-num">1 of 2</span></div>
        <div><span>Private docks</span><div class="scr-progress"><i style="width: 100%"></i></div><span class="scr-num">1 of 1</span></div>
        <div><span>Sensor units</span><div class="scr-progress"><i style="width: 75%"></i></div><span class="scr-num">3 of 4</span></div>
        <div><span>Seats</span><div class="scr-progress"><i style="width: 60%"></i></div><span class="scr-num">6 of 10</span></div>
      </div>
      <button type="button" class="scr-btn scr-btn--sm">Manage subscription</button>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <div><h2 class="scr-h3">New account</h2><p class="scr-small scr-muted">Name it, set its subscription with the price in view, then create workspaces in it. You become its owner.</p></div>
      <label class="scr-field"><span class="scr-label">Account name</span><input class="scr-input" placeholder="Bahia Mar Marina, or your own name" /></label>
      <button type="button" class="scr-btn scr-btn--primary scr-btn--block"><ScrIcon name="plus" /> New account</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const TABS = ['Profile', 'On the water', 'Emergency contact', 'Privacy', 'Notifications', 'Preferences', 'Sign-in and security', 'Workspaces', 'Accounts', 'Billing', 'About & legal']
const ACCOUNTS = [
  { name: 'Sam Miller', role: 'Owner', workspaces: 2, members: 4, plan: 'Monthly · Routing, Sensor monitoring, DockPass', status: 'Active', tone: 'accent' },
  { name: 'Bahia Mar Marina', role: 'Member', workspaces: 2, members: 14, plan: 'Annual · Marina bookings, Chat, Routing', status: 'Active', tone: 'accent' },
  { name: 'Coconuts Dock & Dine LLC', role: 'Member', workspaces: 1, members: 5, plan: 'Monthly · Chat', status: 'Active', tone: 'accent' },
  { name: 'Lauderdale Marine Service', role: 'Admin', workspaces: 1, members: 7, plan: 'Monthly · Chat, Routing', status: 'Active', tone: 'accent' },
  { name: 'Miller family', role: 'Owner', workspaces: 0, members: 2, plan: 'No subscription — the account can hold no workspace until it has one', status: 'No subscription', tone: 'warn' },
]
</script>

<style scoped>
.aca-tabs { margin: 12px 0; }
</style>
