<template>
  <div class="scr">
    <ol class="scr-chips scr-chips--scroll onb-rail" aria-label="Onboarding progress">
      <li class="scr-chip is-on">1 · The ground rules</li>
      <li class="scr-chip">2 · Home port</li>
      <li class="scr-chip">3 · Your crew card</li>
      <li class="scr-chip">4 · Get started</li>
    </ol>
    <p class="scr-ov onb-taps">3 taps to your chart</p>

    <div class="scr-row onb-title">
      <span class="onb-ring"><b class="scr-num">10%</b><i>complete</i></span>
      <div>
        <h1 class="scr-h2">The ground rules</h1>
        <p class="scr-sub scr-small">What you are agreeing to, and the one thing WaterWayz is not.</p>
        <p class="scr-micro scr-muted">Nothing on this step changes your profile — the ring starts moving on the next one.</p>
      </div>
    </div>

    <div class="scr-card scr-stack">
      <div class="scr-alert" data-tone="warn">
        <ScrIcon name="alert" />
        <div>
          <strong>WaterWayz is not a certified navigation system.</strong>
          <span class="scr-small">It plans against your draft, and it will tell you what it knows about the water ahead. It does not replace official charts, a working depth sounder, or your judgement. Always navigate with official charts.</span>
        </div>
      </div>
      <p class="scr-small scr-muted">The short version: your account is yours, your workspace data is yours, and we do not sell it. Sensor readings from your vessel are used to tell you things about your vessel. The long version is in the documents.</p>
      <ul class="scr-stack scr-stack--tight scr-small">
        <li><a class="scr-strong">Terms of service</a> <span class="scr-micro scr-muted">version 2026-09</span></li>
        <li><a class="scr-strong">Privacy policy</a> <span class="scr-micro scr-muted">version 2026-09</span></li>
      </ul>
      <label class="scr-row onb-consent" @click="accepted = !accepted">
        <span class="scr-check" :class="{ 'is-on': accepted }"><ScrIcon v-if="accepted" name="check" /></span>
        <span class="scr-small">I accept the terms of service and the privacy policy, and I understand WaterWayz is not a certified navigation system.</span>
      </label>
      <p v-if="!accepted" class="scr-micro scr-muted">Tick the box to continue.</p>
    </div>

    <div class="scr-bar">
      <button type="button" class="scr-btn scr-btn--primary scr-btn--block">Agree and continue</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const accepted = ref(false)
</script>

<style scoped>
.onb-rail { margin-bottom: 8px; }
.onb-rail .scr-chip { min-height: 26px; font-size: 11px; padding-inline: 10px; }
.onb-taps { margin-bottom: 12px; }
.onb-title { align-items: flex-start; margin-bottom: 14px; }
.onb-ring { display: grid; place-content: center; text-align: center; width: 64px; height: 64px; flex-shrink: 0; border-radius: 50%; background: conic-gradient(var(--wave) 0 10%, var(--ink-200) 10% 100%); position: relative; }
.onb-ring::before { content: ''; position: absolute; inset: 6px; border-radius: 50%; background: var(--ink-50); }
.onb-ring b, .onb-ring i { position: relative; line-height: 1.1; }
.onb-ring b { font-size: 14px; }
.onb-ring i { font-style: normal; font-size: 9px; color: var(--ink-500); }
.onb-consent { align-items: flex-start; cursor: pointer; }
.onb-consent .scr-check { margin-top: 2px; }
</style>
