<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Account</h1><p class="scr-sub">You, across every workspace you are in.</p></div>
    </div>
    <div class="scr-card scr-row">
      <span class="scr-avatar scr-avatar--lg">SM</span>
      <div><p class="scr-strong">Sam Miller</p><p class="scr-small scr-muted">sam@example.com</p><p class="scr-small">Coastal cruising · Fort Lauderdale</p></div>
    </div>
    <div class="scr-chips scr-chips--scroll acn-tabs">
      <span v-for="t in TABS" :key="t" class="scr-chip" :class="{ 'is-on': t === 'Notifications' }">{{ t }}</span>
    </div>

    <div class="scr-card scr-stack scr-stack--tight">
      <div><h2 class="scr-h3">Channels</h2><p class="scr-small scr-muted">Switch a channel off and nothing goes out on it — the inbox still records what was skipped.</p></div>
      <label class="scr-row acn-toggle"><button type="button" class="scr-switch" :class="{ 'is-on': email }" @click="email = !email"></button><span><span class="scr-strong scr-small">Email</span><span class="scr-item-sub">Invites, join requests, claim verdicts and stay decisions, to the address you sign in with.</span></span></label>
      <label class="scr-row acn-toggle"><button type="button" class="scr-switch" :class="{ 'is-on': push }" @click="push = !push"></button><span><span class="scr-strong scr-small">Push</span><span class="scr-item-sub">The same, to every device on the list below.</span></span></label>
    </div>

    <div class="scr-section scr-card scr-card--flush">
      <div style="padding: 12px 14px 4px"><h2 class="scr-h3">Your devices</h2><p class="scr-small scr-muted">Where push notifications go — every phone that has opened the app signed in as you. Remove one you no longer have.</p></div>
      <ul class="scr-list" style="border: 0; border-radius: 0">
        <li class="scr-item scr-item--plain"><span><span class="scr-item-title">Sam's iPhone</span><span class="scr-item-sub">iPhone / iPad · seen 4 min ago</span></span><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Remove</button></li>
        <li class="scr-item scr-item--plain"><span><span class="scr-item-title">Helm tablet</span><span class="scr-item-sub">Android · seen 3 d ago</span></span><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Remove</button></li>
        <li class="scr-item scr-item--plain"><span><span class="scr-item-title">Chrome on MacBook</span><span class="scr-item-sub">Web · seen 2 h ago</span></span><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Remove</button></li>
      </ul>
      <p class="scr-micro scr-muted" style="padding: 6px 14px 12px">1 device stopped answering and will be registered again the next time the app opens there.</p>
    </div>

    <div v-for="c in CATEGORIES" :key="c.label" class="scr-section scr-card scr-stack scr-stack--tight">
      <div class="scr-row scr-row--between">
        <div><h2 class="scr-h3">{{ c.label }}</h2><p class="scr-small scr-muted">{{ c.hint }}</p></div>
        <span v-if="!c.silenceable" class="scr-pill" data-tone="warn">Always on</span>
      </div>
      <div class="scr-chips">
        <span v-for="ch in CHANNELS" :key="ch" class="scr-chip" :class="{ 'is-on': c.on.includes(ch) }">{{ c.on.includes(ch) ? '✓ ' : '' }}{{ ch }}</span>
      </div>
    </div>

    <div class="scr-section scr-card scr-row scr-row--between">
      <div><h2 class="scr-h3">Inbox</h2><p class="scr-small scr-muted">Everything that was sent to you, newest first, one row per channel.</p></div>
      <button type="button" class="scr-btn scr-btn--sm">Open the inbox</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const TABS = ['Profile', 'On the water', 'Emergency contact', 'Privacy', 'Notifications', 'Preferences', 'Sign-in and security', 'Workspaces', 'Accounts', 'Billing', 'About & legal']
const CHANNELS = ['Push', 'Email', 'SMS']
const CATEGORIES = [
  { label: 'Safety alerts', hint: 'Hazards, weather and no-wake changes on a route you are running.', silenceable: false, on: ['Push', 'SMS'] },
  { label: 'Sensor alerts', hint: 'A unit crossing a threshold — water where water should not be.', silenceable: false, on: ['Push', 'Email', 'SMS'] },
  { label: 'Messages', hint: 'Crew and marina conversations.', silenceable: true, on: ['Push'] },
  { label: 'Bookings and dock requests', hint: 'Berth confirmations, arrival windows, cancellations.', silenceable: true, on: ['Push', 'Email'] },
  { label: 'Workspace and membership', hint: 'Invites, role changes, people joining and leaving.', silenceable: true, on: ['Email'] },
  { label: 'Product news', hint: 'Release notes and the occasional email. Off is fine.', silenceable: true, on: [] },
]
const email = ref(true)
const push = ref(true)
</script>

<style scoped>
.acn-tabs { margin: 12px 0; }
.acn-toggle { align-items: flex-start; padding: 6px 0; }
</style>
