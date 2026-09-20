<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Account</h1><p class="scr-sub">You, across every workspace you are in.</p></div>
    </div>
    <div class="scr-card scr-row">
      <span class="scr-avatar scr-avatar--lg">SM</span>
      <div><p class="scr-strong">Sam Miller</p><p class="scr-small scr-muted">sam@example.com</p><p class="scr-small">Coastal cruising · Fort Lauderdale</p></div>
    </div>
    <div class="scr-chips scr-chips--scroll acw-tabs">
      <span v-for="t in TABS" :key="t" class="scr-chip" :class="{ 'is-on': t === 'Workspaces' }">{{ t }}</span>
    </div>

    <div class="scr-card scr-card--flush">
      <div class="scr-row scr-row--between" style="padding: 12px 14px 6px">
        <div><h2 class="scr-h3">Your memberships</h2><p class="scr-small scr-muted">You can be in any number of workspaces, of any type.</p></div>
      </div>
      <ul class="scr-list" style="border: 0; border-radius: 0">
        <li v-for="w in WORKSPACES" :key="w.name" class="scr-item">
          <span class="scr-item-icon" :style="{ color: w.color, background: `color-mix(in srgb, ${w.color} 14%, #fff)` }"><ScrIcon :name="w.icon" /></span>
          <span><span class="scr-item-title">{{ w.name }}</span><span class="scr-item-sub">{{ w.type }} · {{ w.role }} · {{ w.account }}</span></span>
          <span class="scr-item-end">
            <button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Open</button>
            <button type="button" class="scr-btn scr-btn--ghost scr-btn--sm" :disabled="w.role === 'Owner'" :title="w.role === 'Owner' ? 'An owner hands the workspace over before leaving' : undefined">Leave</button>
          </span>
        </li>
      </ul>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <h2 class="scr-h3">Pending</h2>
      <ul class="scr-list">
        <li class="scr-item"><span class="scr-item-icon" data-tone="warn"><ScrIcon name="clock" /></span><span><span class="scr-item-title">Marlin</span><span class="scr-item-sub">Join request sent 2 d ago · waiting on the owner</span></span><span class="scr-pill" data-tone="warn">Requested</span></li>
        <li class="scr-item"><span class="scr-item-icon" data-tone="accent"><ScrIcon name="message" /></span><span><span class="scr-item-title">Pelican Harbour Marina</span><span class="scr-item-sub">Invited as Front desk · expires 27 Oct</span></span><button type="button" class="scr-btn scr-btn--sm scr-btn--primary">Accept</button></li>
      </ul>
    </div>

    <div class="scr-bar"><button type="button" class="scr-btn scr-btn--primary scr-btn--block"><ScrIcon name="plus" /> New workspace</button></div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const TABS = ['Profile', 'On the water', 'Emergency contact', 'Privacy', 'Notifications', 'Preferences', 'Sign-in and security', 'Workspaces', 'Accounts', 'Billing', 'About & legal']
const WORKSPACES = [
  { name: 'Wanderer', type: 'Vessel', role: 'Owner', account: 'Sam Miller', icon: 'vessel', color: '#4274bb' },
  { name: 'Bahia Mar', type: 'Marina', role: 'Dockmaster', account: 'Bahia Mar Marina', icon: 'anchor', color: '#14919b' },
  { name: 'Isle of Venice dock', type: 'Private marina', role: 'Owner', account: 'Sam Miller', icon: 'home', color: '#1f6e5e' },
  { name: 'Coconuts', type: 'Business', role: 'Staff', account: 'Coconuts Dock & Dine LLC', icon: 'store', color: '#b8860b' },
  { name: 'Lauderdale Marine Service', type: 'Maintenance', role: 'Admin', account: 'Lauderdale Marine Service', icon: 'wrench', color: '#b7472a' },
]
</script>

<style scoped>
.acw-tabs { margin: 12px 0; }
</style>
