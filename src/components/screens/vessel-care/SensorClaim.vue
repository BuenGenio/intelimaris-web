<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Claim a unit</h1>
        <p class="scr-sub">Type the code from the box and this unit starts reporting to Wanderer.</p>
      </div>
      <button class="scr-btn scr-btn--ghost scr-btn--sm">Sensors</button>
    </div>

    <div class="scr-card">
      <h2 class="scr-card-title">The code is printed on the box — eight characters</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 12px">Letters I and O and the digits 0 and 1 are never used; if it looks like one, it is the other. Case and separators are forgiven.</p>
      <p class="scr-label" style="margin-bottom: 6px">Unit claim code</p>
      <div class="scr-code"><span v-for="(c, i) in code" :key="i" :class="{ 'clm-blank': !c }">{{ c }}</span></div>
      <div class="scr-row" style="margin-top: 14px">
        <button class="scr-btn scr-btn--primary" :disabled="filled < 8">Claim this unit</button>
        <button class="scr-btn scr-btn--ghost" disabled><ScrIcon name="camera" /> Scan the label</button>
      </div>
      <p class="scr-micro scr-muted" style="margin-top: 8px">Camera entry arrives with a QR format on the label. Typing works regardless and is never the fallback of last resort.</p>

      <div class="scr-alert" data-tone="safe" style="margin-top: 14px">
        <ScrIcon name="check" />
        <div>
          <strong>PWTS-03 is yours</strong>
          <span class="scr-small">Claimed for Wanderer at 09:38. Waiting for its first uplink — a new box shows as Waiting until it speaks.</span>
          <div class="scr-row" style="margin-top: 8px"><button class="scr-btn scr-btn--sm">Open the unit</button><span class="scr-micro">Sensors service · PWTS-03 · status active</span></div>
        </div>
      </div>
    </div>

    <div class="scr-section scr-card">
      <p class="scr-ov" style="margin-bottom: 8px">How a refusal reads</p>
      <div class="scr-alert" data-tone="danger">
        <ScrIcon name="alert" />
        <div>
          <strong>Held by another workspace</strong>
          <span class="scr-small">This unit is claimed by another workspace. The refusal names the condition, never the holder.</span>
          <span class="scr-micro" style="display: block; margin-top: 4px">Sensors service · refused this claim</span>
        </div>
      </div>
    </div>

    <p class="scr-micro scr-muted" style="margin-top: 14px">Unit lists never show claim codes — a claim code on screen beside a serial is a credential leak. A box another workspace holds is refused by name and the refusal does not say who holds it.</p>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const code = ['7', 'K', 'M', '4', 'Q', 'X', 'R', '9']
const filled = code.filter(Boolean).length
</script>

<style scoped>
.clm-blank { color: var(--ink-300); }
.scr-code span { font-family: var(--font-mono, monospace); }
</style>
