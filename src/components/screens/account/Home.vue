<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Hello, Sam</h1><p class="scr-sub">Things needing you, across all your workspaces.</p></div>
      <span class="scr-pill scr-pill--bare" data-tone="offline">Sample</span>
    </div>

    <div class="scr-card">
      <div class="scr-row scr-row--between"><h2 class="scr-h3">Your logbook</h2><span class="scr-small scr-muted scr-num">3 of 5 firsts logged</span></div>
      <ul class="scr-stack scr-stack--tight" style="margin-top: 10px">
        <li v-for="e in LOGBOOK" :key="e.label" class="scr-row hm-log" :class="{ 'is-done': e.done }">
          <span class="hm-log-mark"><ScrIcon v-if="e.done" name="check" /></span>
          <span class="scr-small">{{ e.label }}</span>
          <span class="scr-spacer"></span>
          <span v-if="e.weight" class="scr-micro scr-num scr-accent scr-strong">+{{ e.weight }}%</span>
        </li>
      </ul>
    </div>

    <div class="scr-section scr-card scr-card--flush">
      <div class="scr-row scr-row--between" style="padding: 12px 14px 4px"><h2 class="scr-h3">Needs attention</h2><span class="scr-small scr-muted"><span class="scr-num">3</span> open across your workspaces</span></div>
      <ul class="scr-list" style="border: 0; border-radius: 0">
        <li v-for="a in ATTENTION" :key="a.title" class="scr-item scr-item--plain">
          <span><span class="scr-ov">{{ a.kind }}</span><span class="scr-item-title">{{ a.title }}</span><span class="scr-pill" :data-tone="a.tone" style="margin-top: 5px">{{ a.workspace }}</span></span>
          <button type="button" class="scr-btn scr-btn--sm">{{ a.action }} <ScrIcon name="chevron" /></button>
        </li>
      </ul>
      <p class="scr-micro scr-muted" style="padding: 8px 14px 12px">Each card switches you into the owning workspace on open — Home aggregates across memberships, never around them.</p>
    </div>

    <div class="scr-section">
      <div class="scr-row scr-row--between" style="margin-bottom: 8px">
        <div><h2 class="scr-h3">Your workspaces</h2><p class="scr-small scr-muted"><span class="scr-num">5</span> across <span class="scr-num">5</span> types</p></div>
        <button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="plus" /> New workspace</button>
      </div>
      <ul class="scr-stack scr-stack--tight">
        <li v-for="w in WORKSPACES" :key="w.name" class="scr-card hm-ws" :style="{ '--ws': w.color }">
          <div class="scr-row"><ScrIcon :name="w.icon" /><span class="scr-strong">{{ w.name }}</span><span class="scr-spacer"></span><span class="scr-pill scr-pill--bare" :style="{ background: `color-mix(in srgb, ${w.color} 14%, #fff)`, color: w.color }">{{ w.type }}</span></div>
          <p class="scr-small scr-muted">{{ w.subtitle }}</p>
          <p class="scr-micro scr-muted">{{ w.role }} · <span class="scr-num">{{ w.people }}</span> people</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const LOGBOOK = [
  { label: 'Home port set', done: true },
  { label: 'First vessel', done: true },
  { label: 'In a workspace', done: true },
  { label: 'Add a photo to your card', done: false, weight: 15 },
  { label: 'Say who to call about you', done: false, weight: 10 },
]
const ATTENTION = [
  { kind: 'Vessel alert', title: 'Bilge water rising in the aft compartment', workspace: 'Wanderer', tone: 'warn', action: 'Open' },
  { kind: 'Booking', title: 'Berth C-14 confirmed for 12–14 Oct', workspace: 'Bahia Mar', tone: 'safe', action: 'Open' },
  { kind: 'Review', title: 'A 3-star review is waiting for a reply', workspace: 'Coconuts', tone: 'offline', action: 'Reply' },
]
const WORKSPACES = [
  { name: 'Wanderer', type: 'Vessel', subtitle: 'Sabre 42 · 42 ft · draft 4.6 ft', role: 'Owner', people: 4, icon: 'vessel', color: '#4274bb' },
  { name: 'Bahia Mar', type: 'Marina', subtitle: '242 berths · VHF 16/71', role: 'Dockmaster', people: 11, icon: 'anchor', color: '#14919b' },
  { name: 'Isle of Venice dock', type: 'Private marina', subtitle: '2 berths · DockPass host', role: 'Owner', people: 2, icon: 'home', color: '#1f6e5e' },
  { name: 'Coconuts', type: 'Business', subtitle: 'Dock and dine · open daily 11:00 AM – 10:00 PM', role: 'Staff', people: 5, icon: 'store', color: '#b8860b' },
  { name: 'Lauderdale Marine Service', type: 'Maintenance', subtitle: 'Diesel, electrical, rigging', role: 'Admin', people: 7, icon: 'wrench', color: '#b7472a' },
]
</script>

<style scoped>
.hm-log { padding: 7px 10px; border: 1px solid var(--ink-200); border-radius: var(--scr-r-sm); background: var(--ink-0); }
.hm-log.is-done { border-color: #bfe5c9; background: #f1faf3; }
.hm-log-mark { display: grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; border: 2px dashed var(--ink-300); flex-shrink: 0; }
.hm-log.is-done .hm-log-mark { border: 0; background: #d5efdc; color: var(--safe); }
.hm-log-mark svg { width: 13px; height: 13px; }
.hm-ws { display: grid; gap: 3px; border-left: 4px solid var(--ws); }
.hm-ws > .scr-row > svg:first-child { color: var(--ws); }
</style>
