<template>
  <div class="scr">
    <ol class="scr-chips scr-chips--scroll onb-rail" aria-label="Onboarding progress">
      <li class="scr-chip"><ScrIcon name="check" /> The ground rules</li>
      <li class="scr-chip is-on">2 · Home port</li>
      <li class="scr-chip">3 · Your crew card</li>
      <li class="scr-chip">4 · Get started</li>
    </ol>
    <p class="scr-ov onb-taps">2 taps to your chart</p>

    <div class="scr-row onb-title">
      <span class="onb-ring"><b class="scr-num">25%</b><i>complete</i></span>
      <div>
        <h1 class="scr-h2">Home port</h1>
        <p class="scr-sub scr-small">Where you keep the vessel. The chart opens there, and so does your first workspace.</p>
        <div class="scr-chips" style="margin-top: 6px"><span class="scr-pill" data-tone="info">Set your home port</span></div>
      </div>
    </div>

    <div class="scr-card scr-stack">
      <label class="scr-field">
        <span class="scr-label">Where do you keep the vessel?</span>
        <div class="scr-row">
          <input class="scr-input scr-input--search" value="Bahia Mar, Fort Lauderdale" readonly />
          <button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="pin" /> Near me</button>
        </div>
        <span class="scr-hint">Picked from the directory. The chart is centred on it.</span>
      </label>

      <ul class="scr-list" aria-label="Matching marinas">
        <li class="scr-item is-on"><span class="scr-item-icon" data-tone="accent"><ScrIcon name="pin" /></span><span><span class="scr-item-title">Bahia Mar Marina · Fort Lauderdale</span><span class="scr-item-sub">242 berths · VHF 16/71</span></span><span class="scr-item-end"><ScrIcon name="check" /></span></li>
        <li class="scr-item"><span class="scr-item-icon"><ScrIcon name="pin" /></span><span><span class="scr-item-title">Las Olas Marina · Fort Lauderdale</span><span class="scr-item-sub">0.4 nm from Bahia Mar</span></span><span class="scr-item-end scr-num">0.4 nm</span></li>
        <li class="scr-item"><span class="scr-item-icon"><ScrIcon name="pin" /></span><span><span class="scr-item-title">Pier Sixty-Six Marina · Fort Lauderdale</span><span class="scr-item-sub">1.1 nm from Bahia Mar</span></span><span class="scr-item-end scr-num">1.1 nm</span></li>
      </ul>

      <ScrMap :height="190" :pins="[{ x: 200, y: 120, tone: 'safe' }, { x: 168, y: 96 }, { x: 236, y: 150 }]">
        <div class="scr-map-overlay scr-map-overlay--tl">
          <button type="button" class="scr-map-chip" @click="units = units === 'us' ? 'metric' : 'us'"><span class="scr-ov">Sample depth</span> <b class="scr-num">{{ units === 'us' ? '7.9 ft' : '2.4 m' }}</b> <span class="scr-accent scr-micro">Tap for {{ units === 'us' ? 'metres' : 'feet' }}</span></button>
        </div>
        <div class="scr-map-overlay scr-map-overlay--br"><span class="scr-map-chip"><ScrIcon name="check" /> Bahia Mar Marina</span></div>
      </ScrMap>
      <p class="scr-micro scr-muted">Charts, depths and lengths read in {{ units === 'us' ? 'feet and °F' : 'metres and °C' }} — so a 40 ft vessel reads {{ units === 'us' ? '40 ft' : '12.2 m' }}. Speed stays in knots and distance in nautical miles either way. Change it any time in Preferences.</p>
    </div>

    <div class="scr-bar">
      <button type="button" class="scr-btn scr-btn--primary scr-btn--block">Open the chart here</button>
      <button type="button" class="scr-btn scr-btn--ghost">Skip this</button>
    </div>
    <p class="scr-small scr-muted" style="text-align: right; margin-top: 8px"><a>Skip the rest for now</a></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'
const units = ref<'us' | 'metric'>('us')
</script>

<style scoped>
.onb-rail { margin-bottom: 8px; }
.onb-rail .scr-chip { min-height: 26px; font-size: 11px; padding-inline: 10px; }
.onb-taps { margin-bottom: 12px; }
.onb-title { align-items: flex-start; margin-bottom: 14px; }
.onb-ring { display: grid; place-content: center; text-align: center; width: 64px; height: 64px; flex-shrink: 0; border-radius: 50%; background: conic-gradient(var(--wave) 0 25%, var(--ink-200) 25% 100%); position: relative; }
.onb-ring::before { content: ''; position: absolute; inset: 6px; border-radius: 50%; background: var(--ink-50); }
.onb-ring b, .onb-ring i { position: relative; line-height: 1.1; }
.onb-ring b { font-size: 14px; }
.onb-ring i { font-style: normal; font-size: 9px; color: var(--ink-500); }
.scr-map-chip { border: 0; cursor: pointer; }
</style>
