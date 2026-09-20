<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Have a look around</h1><p class="scr-sub">The chart, the hazards and every marina we know about — no workspace needed.</p></div>
      <span class="scr-pill" data-tone="warn">Scaffold</span>
    </div>
    <p class="scr-pill scr-pill--bare" data-tone="offline" style="margin-bottom: 12px">You are exploring — nothing is saved to a vessel yet</p>

    <div class="scr-card scr-card--flush">
      <ScrMap :height="200" :pins="[{ x: 180, y: 110, tone: 'info' }, { x: 230, y: 150, tone: 'info' }, { x: 150, y: 160, tone: 'warn' }, { x: 260, y: 90, tone: 'info' }]">
        <div class="scr-map-overlay scr-map-overlay--tl"><span class="scr-map-chip"><ScrIcon name="pin" /> Fort Lauderdale</span></div>
        <div class="scr-map-overlay scr-map-overlay--b scr-row">
          <span class="scr-map-chip"><span class="scr-dot" data-tone="info"></span> 3 marinas</span>
          <span class="scr-map-chip"><span class="scr-dot" data-tone="warn"></span> 1 hazard · shoaling, reported 3 d ago</span>
        </div>
      </ScrMap>
      <div class="scr-stack scr-stack--tight" style="padding: 12px 14px">
        <div><h2 class="scr-h3">The map</h2><p class="scr-small scr-muted">Public marina, business and hazard layers. Every datum carries its source.</p></div>
        <button type="button" class="scr-btn scr-btn--primary scr-btn--block"><ScrIcon name="map" /> Open the map</button>
        <p class="scr-micro scr-muted">Not for navigation. WaterWayz is an aid, not a certified chart.</p>
      </div>
    </div>

    <div class="scr-section scr-card scr-card--flush">
      <div style="padding: 12px 14px 4px"><h2 class="scr-h3">What a workspace adds</h2><p class="scr-small scr-muted">Sensors, crew and dock bookings live in a workspace — one vessel per workspace, one marina per workspace.</p></div>
      <ul class="scr-list" style="border: 0; border-radius: 0">
        <li v-for="row in LOCKED" :key="row.title" class="scr-item">
          <span class="scr-item-icon"><ScrIcon name="lock" /></span>
          <span><span class="scr-item-title">{{ row.title }}</span><span class="scr-item-sub">{{ row.why }}</span></span>
          <span class="scr-pill scr-pill--bare" data-tone="offline">Needs a workspace</span>
        </li>
      </ul>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <div><h2 class="scr-h3">When you are ready</h2><p class="scr-small scr-muted">This is the only route out of exploring, so it does not dismiss.</p></div>
      <button type="button" class="scr-btn scr-btn--primary scr-btn--block">Create a workspace</button>
      <button type="button" class="scr-btn scr-btn--block">I have an invite code</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'
const LOCKED = [
  { title: 'Sensors and monitoring', why: 'Readings belong to a vessel, and a vessel is a workspace.' },
  { title: 'Saved passages', why: 'A plan is kept against the vessel it was planned for.' },
  { title: 'DockPass bookings', why: 'A booking names the vessel that is coming.' },
  { title: 'Crew', why: 'People are seated in a workspace, one vessel per workspace.' },
]
</script>
