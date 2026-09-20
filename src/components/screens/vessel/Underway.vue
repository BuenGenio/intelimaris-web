<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Underway</h1><p class="scr-sub">What is ahead, how deep, how fast, and what needs you now.</p></div>
      <span class="scr-pill" data-tone="warn">Scaffold</span>
    </div>
    <div class="scr-row uw-actions">
      <button type="button" class="scr-btn scr-btn--danger scr-btn--pill"><ScrIcon name="alert" />MOB</button>
      <span class="scr-spacer"></span>
      <button type="button" class="scr-btn scr-btn--sm">Leave underway</button>
    </div>

    <section class="scr-section uw-first">
      <p class="scr-ov">Telemetry</p>
      <p class="scr-small scr-muted uw-desc">Value at full size, unit as a muted suffix. Unknown is —.</p>
      <div class="scr-grid-2">
        <div v-for="t in TELE" :key="t[0]" class="scr-stat"><span class="scr-stat-label">{{ t[0] }}</span><span class="scr-stat-value">{{ t[1] }}<small>{{ t[2] }}</small></span><span class="scr-stat-delta" :data-tone="t[4]">{{ t[3] }}</span></div>
      </div>
    </section>

    <section class="scr-section">
      <p class="scr-ov">Next gate</p>
      <p class="scr-small scr-muted uw-desc">The next bridge, tide or weather gate on the passage, and its window.</p>
      <div class="scr-card scr-card--dark">
        <div class="scr-row scr-row--between"><span class="scr-h3">Las Olas Bridge</span><span class="scr-pill" data-tone="warn">Opens 2:30 PM</span></div>
        <p class="scr-small scr-muted uw-gate">1.1 NM ahead · 24 ft closed against your 21 ft air draft · hold 26 min or make the 2:30 opening at 8 kn</p>
        <div class="scr-progress uw-prog"><i style="width: 36%"></i></div>
        <div class="scr-row scr-row--between scr-micro scr-muted"><span>Bahia Mar</span><span>Miami Beach Marina · ETA 2:41 PM</span></div>
        <button type="button" class="scr-btn scr-btn--sm uw-ride">Ride Along on the map</button>
      </div>
    </section>

    <section class="scr-section">
      <div class="scr-row scr-row--between"><p class="scr-ov">Alarms</p><span class="scr-pill" data-tone="safe">2 armed</span></div>
      <p class="scr-small scr-muted uw-desc">What the vessel is allowed to wake you for.</p>
      <div class="scr-list">
        <div v-for="a in ALARMS" :key="a[0]" class="scr-item">
          <span class="scr-item-icon" :data-tone="a[3]"><ScrIcon :name="a[2]" /></span>
          <span><span class="scr-item-title">{{ a[0] }}</span><span class="scr-item-sub">{{ a[1] }}</span></span>
          <span class="scr-item-end"><ScrIcon name="chevron" /></span>
        </div>
      </div>
      <div class="scr-row uw-more"><button type="button" class="scr-btn scr-btn--sm">Alarm centre</button><button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="anchor" />Anchor watch</button><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm" disabled>Night mode</button></div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const TELE = [['SOG', '7.4', 'kn', 'fix 3 s ago', 'safe'], ['HDG', '174', '°', 'true', ''], ['Under keel', '6.8', 'ft', 'sounder · 4 s ago', 'safe'], ['ETA', '2:41', 'PM', '38 min · Miami Beach', '']]
const ALARMS: [string, string, string, string][] = [
  ['Depth below margin', 'Armed · fires under 2.0 ft under keel', 'wave', 'safe'],
  ['Route deviation', 'Armed · fires 0.1 NM off the corridor', 'map', 'safe'],
  ['Anchor drag', 'Off — nothing is watching', 'anchor', ''],
]
</script>

<style scoped>
.uw-actions { margin: -6px 0 4px; }
.uw-first { margin-top: 8px; }
.uw-desc { margin-bottom: 8px; }
.uw-gate { margin: 6px 0 10px; }
.uw-prog { background: rgba(255, 255, 255, 0.2); margin-bottom: 6px; }
.uw-prog i { background: #fff; }
.uw-ride { margin-top: 10px; }
.uw-more { margin-top: 10px; flex-wrap: wrap; }
</style>
