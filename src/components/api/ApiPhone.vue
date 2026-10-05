<template>
  <figure class="api-phone">
    <div class="api-phone-device">
      <div class="api-phone-status" aria-hidden="true"><span>9:41</span><span class="api-phone-notch"></span><span class="api-phone-signal"><i></i><i></i><i></i></span></div>
      <div class="api-phone-top" aria-hidden="true">
        <span class="api-phone-app"><span class="api-phone-mark"></span>InteliWaterwayz</span>
        <span class="api-phone-online"><span class="scr-dot" data-tone="safe"></span>Online</span>
      </div>
      <div class="api-phone-screen"><slot /></div>
      <div class="api-phone-tabs" aria-hidden="true">
        <span v-for="t in TABS" :key="t.label" :class="{ 'is-on': t.label === tab }"><ScrIcon :name="t.icon" /><span>{{ t.label }}</span></span>
      </div>
    </div>
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
defineProps<{ tab: string; caption?: string }>()
const TABS = [
  { label: 'Map', icon: 'map' },
  { label: 'Plan', icon: 'compass' },
  { label: 'Stays', icon: 'calendar' },
  { label: 'Vessel', icon: 'vessel' },
  { label: 'More', icon: 'dots' },
]
</script>

<style scoped>
.api-phone { margin: 0; display: grid; justify-items: center; gap: 12px; }
.api-phone-device { position: relative; width: 340px; max-width: 100%; height: 660px; display: grid; grid-template-rows: auto auto minmax(0, 1fr) auto; overflow: hidden; border-radius: 44px; border: 10px solid #111827; background: #f3f5f9; color: #182036; box-shadow: 0 30px 70px rgba(17, 45, 76, .25), 0 0 0 1px rgba(255, 255, 255, .06) inset; }
[data-theme='dark'] .api-phone-device { box-shadow: 0 30px 70px rgba(0, 0, 0, .55), 0 0 0 1px rgba(255, 255, 255, .12); }
.api-phone-status { display: flex; justify-content: space-between; align-items: center; padding: 10px 22px 2px; font: 600 12.5px var(--font-text); }
.api-phone-notch { width: 92px; height: 22px; border-radius: 12px; background: #111827; }
.api-phone-signal { display: inline-flex; gap: 2px; align-items: flex-end; }
.api-phone-signal i { display: block; width: 3px; background: #182036; border-radius: 1px; }
.api-phone-signal i:nth-child(1) { height: 5px; } .api-phone-signal i:nth-child(2) { height: 8px; } .api-phone-signal i:nth-child(3) { height: 11px; }
.api-phone-top { display: flex; justify-content: space-between; align-items: center; padding: 8px 14px 6px; font: 600 12px var(--font-text); }
.api-phone-app { display: inline-flex; align-items: center; gap: 7px; padding: 4px 10px 4px 7px; border-radius: 999px; background: #fff; border: 1px solid #dce1ea; }
.api-phone-mark { width: 14px; height: 14px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #4274bb, #2c3d68); }
.api-phone-online { display: inline-flex; align-items: center; gap: 6px; font-weight: 500; color: #66708a; font-size: 11px; }
.api-phone-screen { overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; }
.api-phone-screen > :deep(.scr) { min-height: 100%; }
/* The page's editorial headings would otherwise win over the app kit's. */
.api-phone-screen :deep(.scr h1.scr-h1) { font: 800 22px/1.2 var(--font-text); letter-spacing: -0.02em; color: #182036; }
.api-phone-screen :deep(.scr p) { line-height: 1.45; }
.api-phone-tabs { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; padding: 8px 6px 16px; background: #fff; border-top: 1px solid #dce1ea; }
.api-phone-tabs > span { display: grid; justify-items: center; gap: 3px; font: 500 10px var(--font-text); color: #66708a; }
.api-phone-tabs > span.is-on { color: #2c3d68; font-weight: 600; }
.api-phone figcaption { font-size: .78rem; color: var(--text-muted); text-align: center; max-width: 34ch; }
</style>
