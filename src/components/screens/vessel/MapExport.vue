<template>
  <div class="scr">
    <ScrMap variant="chart" :height="170" :track="'M96 176 C 140 140, 220 130, 300 40'" :pins="[{ x: 300, y: 40, tone: 'safe' }]" :self="{ x: 96, y: 176, heading: 40 }">
      <!-- the crop frame the print presets draw over the live map -->
      <div class="mx-crop" :class="{ 'mx-crop--portrait': isPrint }" aria-hidden="true">
        <span class="mx-crop-label">{{ current.label }} · {{ current.px }}</span>
        <span v-if="current.dead" class="mx-dead">Hidden by the stand · §8.4</span>
      </div>
    </ScrMap>

    <div class="scr-card mx-panel">
      <div class="scr-row scr-row--between mx-head"><h2 class="scr-h2">Export this view</h2><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Close</button></div>
      <p class="scr-small scr-muted">Camera, heading, tilt and every layer switch are captured as they are now.</p>

      <p class="scr-ov mx-h">Screen</p>
      <div class="scr-stack mx-sizes">
        <button v-for="s in SIZES.filter((x) => x.group === 'screen')" :key="s.id" type="button" class="mx-size" :class="{ 'is-on': s.id === selected }" @click="selected = s.id">
          <span><span class="scr-strong">{{ s.label }}</span><span class="scr-micro scr-muted mx-note">{{ s.note }}</span></span><span class="scr-micro scr-muted scr-num">{{ s.px }}</span>
        </button>
      </div>

      <p class="scr-ov mx-h">Print</p>
      <div class="scr-stack mx-sizes">
        <button v-for="s in SIZES.filter((x) => x.group === 'print')" :key="s.id" type="button" class="mx-size" :class="{ 'is-on': s.id === selected }" @click="selected = s.id">
          <span><span class="scr-strong">{{ s.label }}</span><span class="scr-micro scr-muted mx-note">{{ s.note }}</span></span><span class="scr-micro scr-muted scr-num">{{ s.px }}</span>
        </button>
      </div>

      <div v-if="isPrint" class="scr-alert mx-callout" data-tone="warn"><ScrIcon name="alert" /><span class="scr-small">This ground is a third party's imagery. Our own bundled ground is the one cleared for print; anything else needs its licence checked before the file goes to a printer.</span></div>
      <div v-if="isPrint" class="scr-alert mx-callout"><ScrIcon name="list" /><span class="scr-small">sRGB PNG, trim plus bleed. §8.1 wants FOGRA39 or GRACoL with a proof at final size — that conversion happens in the print pipeline, not here.</span></div>

      <button type="button" class="scr-btn scr-btn--primary scr-btn--block mx-go"><ScrIcon name="download" />Export PNG</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const SIZES = [
  { id: 'viewport', group: 'screen', label: 'Viewport', note: 'Exactly what is on screen now', px: '390×724', dead: false },
  { id: 'viewport2', group: 'screen', label: 'Viewport · 2×', note: 'Retina capture, for a slide or a doc', px: '780×1448', dead: false },
  { id: 'booth', group: 'screen', label: 'Booth monitor · 1920 × 1080', note: '§8.5 minimum. Type reads at 2 m.', px: '1920×1080', dead: false },
  { id: 'booth4k', group: 'screen', label: 'Booth monitor 4K · 3840 × 2160', note: '§8.5 preferred. Same frame, twice the detail.', px: '3840×2160', dead: false },
  { id: 'a5', group: 'print', label: 'A5 flyer · 148 × 210 mm', note: '§8.3, 300 dpi, 3 mm bleed', px: '1819×2551', dead: false },
  { id: 'a4', group: 'print', label: 'A4 · 210 × 297 mm', note: 'One-pager, hand-out, proof print', px: '2551×3579', dead: false },
  { id: 'a3', group: 'print', label: 'A3 · 297 × 420 mm', note: 'Poster, easel card, wall plan', px: '3579×5031', dead: false },
  { id: 'banner', group: 'print', label: 'Pull-up banner · 850 × 2000 mm', note: '150 dpi · the bottom fifth sits in the stand', px: '5020×11811', dead: true },
]
const selected = ref('a4')
const current = computed(() => SIZES.find((s) => s.id === selected.value) ?? SIZES[0]!)
const isPrint = computed(() => current.value.group === 'print')
</script>

<style scoped>
.mx-crop { position: absolute; inset: 8px 8px 8px 8px; z-index: 1; outline: 2px solid rgba(255, 255, 255, 0.9); box-shadow: 0 0 0 100vmax rgba(3, 6, 18, 0.45); }
.mx-crop--portrait { inset: 8px 30% 8px 30%; }
.mx-crop-label { position: absolute; top: 4px; left: 6px; font-size: 10px; font-weight: 600; color: #fff; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6); white-space: nowrap; }
.mx-dead { position: absolute; left: 0; right: 0; bottom: 0; height: 20%; display: grid; place-items: end center; border-top: 1px dashed rgba(255, 255, 255, 0.7); background: rgba(3, 6, 18, 0.45); font-size: 9px; text-transform: uppercase; color: rgba(255, 255, 255, 0.85); padding-bottom: 2px; }
.mx-panel { margin-top: 10px; }
.mx-head { margin-bottom: 4px; }
.mx-h { margin: 12px 0 6px; }
.mx-sizes { gap: 4px; }
.mx-size { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; width: 100%; padding: 7px 10px; border: 1px solid transparent; border-radius: 10px; background: transparent; text-align: left; cursor: pointer; }
.mx-size.is-on { border-color: var(--scr-accent); background: var(--wave-50); }
.mx-note { display: block; }
.mx-callout { margin-top: 8px; padding: 8px 10px; }
.mx-go { margin-top: 12px; }
</style>
