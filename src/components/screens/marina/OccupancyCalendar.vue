<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Occupancy calendar</h1>
        <p class="scr-sub">Forward occupancy by berth and date, not just today. Planning & berths · phase 2.</p>
      </div>
      <div class="scr-row"><span class="scr-pill">Scaffold</span><div class="scr-chips"><span class="scr-chip">Dock A</span><span class="scr-chip">Dock B</span><span class="scr-chip is-on">Dock C</span><span class="scr-chip">Dock D</span></div></div>
    </div>

    <div class="scr-row scr-row--between" style="margin-bottom: 8px">
      <div class="scr-row"><button class="scr-btn scr-btn--sm scr-btn--icon"><ScrIcon name="back" /></button><span class="scr-strong">12 – 25 October 2026</span><button class="scr-btn scr-btn--sm scr-btn--icon"><ScrIcon name="chevron" /></button></div>
      <div class="scr-row scr-small scr-muted"><span class="scr-dot" data-tone="info"></span>Assigned <span class="scr-dot" style="background: #cdb98b"></span>Resident <span class="scr-dot" data-tone="safe"></span>Courtesy <span class="scr-dot" data-tone="danger"></span>Closed</div>
    </div>

    <div class="scr-card scr-card--flush oc-grid">
      <div class="oc-head"><span class="oc-berth">Berth</span><span v-for="d in days" :key="d" class="oc-day scr-micro scr-num" :class="{ 'is-today': d === 14 }">{{ d }}</span></div>
      <div v-for="b in berths" :key="b.label" class="oc-line">
        <span class="oc-berth scr-num scr-strong">{{ b.label }}</span>
        <span class="oc-cells"><span v-for="s in b.spans" :key="s.from" class="oc-span" :data-tone="s.tone" :style="{ gridColumn: `${s.from - 11} / span ${s.len}` }">{{ s.name }}</span></span>
      </div>
    </div>
    <p class="scr-micro scr-muted" style="margin-top: 8px">Physical, reserved and sellable are three different numbers; this grid draws reserved. Sellable nights on Dock C in this window: 61.</p>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const days = Array.from({ length: 14 }, (_, i) => 12 + i)
const berths = [
  { label: 'C-11', spans: [{ from: 12, len: 14, name: 'Windward · resident', tone: 'resident' }] },
  { label: 'C-12', spans: [{ from: 12, len: 14, name: 'Serenity · resident', tone: 'resident' }] },
  { label: 'C-13', spans: [{ from: 18, len: 4, name: 'Meridian', tone: 'info' }] },
  { label: 'C-14', spans: [{ from: 14, len: 3, name: 'Wanderer', tone: 'info' }, { from: 21, len: 5, name: 'Halcyon', tone: 'info' }] },
  { label: 'C-15', spans: [{ from: 12, len: 6, name: 'Closed · piling repair', tone: 'danger' }] },
  { label: 'C-16', spans: [{ from: 12, len: 14, name: 'Courtesy · Coconuts patrons', tone: 'safe' }] },
  { label: 'C-2', spans: [{ from: 21, len: 5, name: 'Andiamo', tone: 'info' }] },
]
</script>

<style scoped>
.oc-head, .oc-line { display: grid; grid-template-columns: 60px minmax(0, 1fr); align-items: center; border-top: 1px solid var(--ink-100); }
.oc-head { border-top: 0; background: var(--ink-50); grid-template-columns: 60px repeat(14, minmax(0, 1fr)); }
.oc-berth { padding: 8px 10px; font-size: 12px; }
.oc-day { text-align: center; padding: 6px 0; color: var(--ink-500); }
.oc-day.is-today { color: var(--scr-accent); font-weight: 700; }
.oc-cells { display: grid; grid-template-columns: repeat(14, minmax(0, 1fr)); gap: 3px 0; min-height: 34px; align-content: center; background-image: linear-gradient(90deg, var(--ink-100) 1px, transparent 1px); background-size: calc(100% / 14) 100%; }
.oc-span { grid-row: 1; height: 24px; margin: 0 2px; padding: 0 8px; border-radius: 6px; font-size: 11px; line-height: 24px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; background: var(--wave-100); color: var(--wave-700); }
.oc-span[data-tone='resident'] { background: #efe4c8; color: #6b5220; }
.oc-span[data-tone='safe'] { background: #e6f5ea; color: #1f6d36; }
.oc-span[data-tone='danger'] { background: #fbe6e5; color: #9b2620; }
</style>
