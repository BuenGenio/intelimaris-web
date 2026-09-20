<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Track</h1><p class="scr-sub scr-small">Where she has been — by day or by date range — from GPS, AIS and her sensors.</p></div>
      <span class="scr-pill" data-tone="warn">Scaffold</span>
    </div>
    <div class="scr-row tk-actions"><span class="scr-pill scr-pill--bare">{{ VIS[visibility] }}</span><span class="scr-spacer"></span><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Map</button></div>

    <section class="scr-section tk-first">
      <p class="scr-ov">Day or range</p>
      <p class="scr-small scr-muted tk-desc">One day at a time, or a range. The map draws the track; this page lists its legs.</p>
      <div class="scr-row">
        <label class="scr-field tk-day"><span class="scr-label">Day</span><span class="scr-input scr-num">12 Oct 2026</span></label>
        <button type="button" class="scr-btn tk-show">Show this day</button>
      </div>
    </section>

    <ScrMap variant="chart" :height="150" class="tk-map" :track="TRACK" :pins="[{ x: 70, y: 200, tone: 'info' }, { x: 320, y: 44, tone: 'safe' }]">
      <span class="scr-map-overlay scr-map-overlay--bl scr-map-chip scr-micro">12 Oct · 6.4 NM · 14:00–14:43</span>
    </ScrMap>

    <section class="scr-section">
      <p class="scr-ov">Legs</p>
      <p class="scr-small scr-muted tk-desc">Each leg says which source it came from — GPS, AIS or a sensor — and its distance in NM.</p>
      <div class="scr-list">
        <div v-for="l in LEGS" :key="l[0]" class="scr-item">
          <span class="scr-item-icon" :data-tone="l[4]"><ScrIcon :name="l[3]" /></span>
          <span><span class="scr-item-title scr-num">{{ l[0] }}</span><span class="scr-item-sub">{{ l[1] }}</span></span>
          <span class="scr-item-end scr-num">{{ l[2] }}</span>
        </div>
      </div>
    </section>

    <section class="scr-section">
      <p class="scr-ov">Visibility</p>
      <p class="scr-small scr-muted tk-desc">Private by default. Friends see it named; public sees it anonymised, fading with age.</p>
      <div class="scr-list">
        <button v-for="(label, key) in VIS_OPTIONS" :key="key" type="button" class="scr-item scr-item--plain" @click="visibility = key">
          <span class="scr-item-title">{{ label }}</span><span class="scr-radio" :class="{ 'is-on': visibility === key }"></span>
        </button>
      </div>
      <p class="scr-micro scr-muted tk-foot">The choice above is not stored anywhere yet. This page never shows another vessel's track.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

type Vis = 'private' | 'friends' | 'public'
const VIS: Record<Vis, string> = { private: 'Private', friends: 'Friends', public: 'Public' }
const VIS_OPTIONS: Record<Vis, string> = { private: 'Only this workspace', friends: 'Friends — named', public: 'Everyone — anonymised' }
const visibility = ref<Vis>('private')
const TRACK = 'M70 200 C 120 170, 170 160, 200 120 S 280 70, 320 44'
const LEGS: [string, string, string, string, string][] = [
  ['14:00–14:09 · Bahia Mar → Las Olas', 'GPS · 7.2 kn avg · held 4 min at the bridge', '1.1 NM', 'pin', 'accent'],
  ['14:09–14:19 · Las Olas → Port Everglades', 'GPS · 7.8 kn avg', '1.3 NM', 'pin', 'accent'],
  ['14:19–14:33 · Port Everglades → Haulover', 'AIS · 8.1 kn avg · outside', '2.6 NM', 'radio', ''],
  ['14:33–14:43 · Haulover → Miami Beach Marina', 'Sensor · engine hours +0.7', '1.4 NM', 'activity', ''],
]
</script>

<style scoped>
.tk-actions { margin: -6px 0 4px; }
.tk-first { margin-top: 8px; }
.tk-desc { margin-bottom: 8px; }
.tk-day { flex: 1; }
.tk-show { align-self: end; min-height: 38px; }
.tk-map { margin-top: 12px; }
.tk-foot { margin-top: 8px; }
</style>
