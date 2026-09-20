<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Dockpass</h1>
        <p class="scr-sub">Your stays — booked, requested and past.</p>
      </div>
      <button class="scr-btn scr-btn--primary scr-btn--sm"><ScrIcon name="search" /> Find a berth</button>
    </div>

    <div class="scr-tabs" style="margin-bottom: 12px">
      <button v-for="t in tabs" :key="t" class="scr-tab" :class="{ 'is-on': t === tab }" @click="tab = t">{{ t }}</button>
    </div>

    <p class="scr-ov" style="margin-bottom: 8px">Your stays</p>
    <div class="scr-list">
      <div v-for="s in shown" :key="s.id" class="scr-item">
        <span class="scr-item-icon" :data-tone="s.icon"><ScrIcon :name="s.private ? 'home' : 'anchor'" /></span>
        <div><span class="scr-item-title">{{ s.where }}</span><span class="scr-item-sub">{{ s.dates }} · {{ s.quote }}</span></div>
        <div class="scr-item-end"><span class="scr-pill" :data-tone="s.tone">{{ s.status }}</span><ScrIcon name="chevron" /></div>
      </div>
      <div v-if="shown.length === 0" class="scr-empty" style="border: 0"><strong>No stays yet</strong>Search for a berth and the request lands here.</div>
    </div>
    <p class="scr-micro scr-muted" style="margin-top: 8px">Cancel appears on a stay only where the served state machine allows it.</p>

    <div class="scr-section scr-card scr-card--accent">
      <div class="scr-row scr-row--between"><h2 class="scr-card-title">Next up</h2><span class="scr-pill" data-tone="safe">Confirmed</span></div>
      <p class="scr-small">Bahia Mar, berth C-14 · Fri 16 Oct → Sun 18 Oct · 2 nights</p>
      <div class="scr-grid-3" style="margin-top: 10px">
        <div><span class="scr-ov">VHF</span><p class="scr-strong scr-num">16 / 71</p></div>
        <div><span class="scr-ov">Approach</span><p class="scr-strong scr-num">8 ft MLLW</p></div>
        <div><span class="scr-ov">Tie</span><p class="scr-strong">Port, bow in</p></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const tabs = ['All', 'Booked', 'Requested', 'Past']
const tab = ref('All')
const stays = [
  { id: 'bk-2041', where: 'Bahia Mar', dates: '16 → 18 Oct · 2 nights', quote: '$254.00', status: 'Confirmed', tone: 'safe', icon: 'accent', private: false, group: 'Booked' },
  { id: 'bk-2044', where: 'Isle of Venice dock', dates: '23 → 24 Oct · 1 night', quote: '$95.00', status: 'Requested', tone: 'warn', icon: 'warn', private: true, group: 'Requested' },
  { id: 'bk-2046', where: 'Coconuts · dock and dine', dates: 'Sat 31 Oct · 3 h', quote: '$0.00', status: 'Requested', tone: 'warn', icon: 'warn', private: false, group: 'Requested' },
  { id: 'bk-2030', where: 'Isle of Venice dock', dates: '12 → 13 Oct · 1 night', quote: '$95.00', status: 'Completed', tone: 'offline', icon: '', private: true, group: 'Past' },
  { id: 'bk-2018', where: 'Bahia Mar', dates: '2 → 4 Oct · 2 nights', quote: '$254.00', status: 'Completed', tone: 'offline', icon: '', private: false, group: 'Past' },
  { id: 'bk-2009', where: 'Haulover Marine Center', dates: '27 Sep', quote: '$127.00', status: 'Cancelled', tone: 'offline', icon: '', private: false, group: 'Past' },
]
const shown = computed(() => (tab.value === 'All' ? stays : stays.filter((s) => s.group === tab.value)))
</script>
