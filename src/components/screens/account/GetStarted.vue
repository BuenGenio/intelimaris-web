<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Welcome, Sam.</h1>
        <p class="scr-sub">One tap to your chart. Workspaces are how WaterWayz is organized — one per vessel, marina, dock or business.</p>
      </div>
    </div>

    <div class="scr-card scr-card--accent scr-stack" style="--scr-accent: #4274bb">
      <div class="scr-row">
        <span class="scr-item-icon" data-tone="accent"><ScrIcon name="vessel" /></span>
        <div><h2 class="scr-h3">Find your vessel</h2><p class="scr-small scr-muted">Type its name or MMSI. Its workspace is born with it — hull, draft and live data.</p></div>
      </div>
      <label class="scr-field">
        <span class="scr-label">Vessel name or MMSI</span>
        <input class="scr-input" value="Wanderer" readonly />
      </label>
      <ul class="scr-list" aria-label="Vessels found">
        <li class="scr-item scr-item--plain"><span><span class="scr-item-title">Wanderer</span><span class="scr-item-sub">MMSI 367 123 456 · Unclaimed</span></span><span class="scr-item-end"><ScrIcon name="chevron" /></span></li>
        <li class="scr-item scr-item--plain"><span><span class="scr-item-title">Wanderer II</span><span class="scr-item-sub">MMSI 338 204 771 · Claimed — ask to join</span></span><span class="scr-item-end"><ScrIcon name="chevron" /></span></li>
      </ul>
      <button type="button" class="scr-btn scr-btn--primary scr-btn--block"><ScrIcon name="search" /> Create its workspace</button>
    </div>

    <div class="scr-section scr-card scr-stack">
      <div><h2 class="scr-h3">Join with a code</h2><p class="scr-small scr-muted">Someone already in a workspace can give you an 8-character code.</p></div>
      <div class="scr-code" aria-label="Invite code"><span>W</span><span>A</span><span>Y</span><span>Z</span><span>3</span><span>K</span><span>7</span><span>M</span></div>
      <button type="button" class="scr-btn scr-btn--primary scr-btn--block">Join workspace</button>
      <p class="scr-micro scr-muted">Codes are read aloud across docks, so they never contain I, O, 0 or 1. Try WAYZ-3K7M (Wanderer) or BMAR-58QK (Bahia Mar Marina).</p>
    </div>

    <div class="scr-section scr-card scr-stack">
      <div><h2 class="scr-h3">Or a marina, dock, business or yard</h2><p class="scr-small scr-muted">Pick the kind of workspace you need. You can create more later, of any type.</p></div>
      <ul class="scr-list">
        <li v-for="t in TYPES" :key="t.label" class="scr-item"><span class="scr-item-icon" :style="{ color: t.color, background: `color-mix(in srgb, ${t.color} 14%, #fff)` }"><ScrIcon :name="t.icon" /></span><span><span class="scr-item-title">{{ t.label }}</span><span class="scr-item-sub">{{ t.audience }}</span></span><span class="scr-item-end"><ScrIcon name="chevron" /></span></li>
      </ul>
    </div>

    <div class="scr-section scr-card scr-row scr-row--between">
      <p class="scr-small scr-muted">Not ready? Look around first — the map works without a workspace.</p>
      <button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Skip for now</button>
    </div>

    <ul class="scr-section scr-list">
      <li class="scr-item scr-item--plain"><span><span class="scr-item-title">Add a photo to your card</span><span class="scr-item-sub">Profile 60% complete</span></span><span class="scr-item-end"><span class="scr-num scr-accent">+15%</span><ScrIcon name="x" /></span></li>
      <li class="scr-item scr-item--plain"><span><span class="scr-item-title">Say who to call about you</span><span class="scr-item-sub">Emergency contact</span></span><span class="scr-item-end"><span class="scr-num scr-accent">+10%</span><ScrIcon name="x" /></span></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const TYPES = [
  { label: 'Marina', audience: 'Commercial marina operators', icon: 'anchor', color: '#14919b' },
  { label: 'Private marina', audience: 'Private dock and marina owners', icon: 'home', color: '#1f6e5e' },
  { label: 'Business', audience: 'Restaurants, fuel docks, tackle stores and other on-water businesses', icon: 'store', color: '#b8860b' },
  { label: 'Maintenance', audience: 'Maintenance and service companies', icon: 'wrench', color: '#b7472a' },
]
</script>
