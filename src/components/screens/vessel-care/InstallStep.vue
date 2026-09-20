<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">I-03 · Bind the unit</h1>
        <p class="scr-sub">Eight characters from the label; I, O, 0 and 1 are never used. A queued claim is not a claim.</p>
      </div>
      <span class="scr-pill scr-pill--bare">Scaffold</span>
    </div>
    <div class="scr-chips scr-chips--scroll" style="margin-bottom: 14px">
      <span v-for="(s, i) in steps" :key="s" class="scr-chip" :class="{ 'is-on': i === 2 }">{{ i + 1 }}. {{ s }}</span>
    </div>

    <div class="scr-card">
      <div class="scr-row scr-row--between"><h2 class="scr-card-title">Wanderer · PWTS-03</h2><span class="scr-pill" data-tone="info">Aft bilge</span></div>
      <p class="scr-small scr-muted" style="margin-bottom: 12px">Mount the box above the bilge high-water line, serial label facing out, then read the claim code.</p>
      <p class="scr-label" style="margin-bottom: 6px">Unit claim code</p>
      <div class="scr-code"><span v-for="(c, i) in code" :key="i">{{ c }}</span></div>
      <div class="scr-row" style="margin-top: 12px"><span class="scr-pill" data-tone="warn">Queued · no signal</span><span class="scr-micro scr-muted">Sends when this device has signal. Until then nothing is bound.</span></div>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">Bound on this vessel</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 4px">One row per bound unit, with each binding's since.</p>
      <div v-for="u in bound" :key="u.serial" class="scr-kv"><span class="scr-num scr-strong">{{ u.serial }}</span><span class="scr-row"><span class="scr-pill" :data-tone="u.tone">{{ u.state }}</span><span class="scr-micro scr-muted">{{ u.since }}</span></span></div>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">I-08 · Refused</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 8px">Rendered in this step's result slot, in the service's own words. No toast, no modal, no Retry on a refusal retrying cannot fix.</p>
      <p class="scr-small scr-num" style="padding: 8px 10px; background: var(--ink-50); border-radius: var(--scr-r-sm)">this unit is disabled — contact support before it can be claimed</p>
      <p class="scr-micro scr-muted" style="margin-top: 6px">Disabled is reversible, but only from the office. Fit another box and note this serial on the job.</p>
    </div>

    <div class="scr-bar"><button class="scr-btn scr-btn--primary scr-btn--block">Bind</button><button class="scr-btn">Next: Uplink</button></div>
  </div>
</template>

<script setup lang="ts">
const steps = ["Today's installs", 'Site survey', 'Bind the unit', 'Uplink verification', 'Coverage walk', 'Channel mapping', 'Photo evidence', 'Sign-off and handover']
const code = ['7', 'K', 'M', '4', 'Q', 'X', 'R', '9']
const bound = [
  { serial: 'PWTS-01', state: 'Reporting', tone: 'safe', since: 'since 2 Oct' },
  { serial: 'PWTS-02', state: 'Reporting', tone: 'safe', since: 'since 2 Oct' },
  { serial: 'PWTS-04', state: 'Silent', tone: 'warn', since: 'since 6 Oct' },
]
</script>

<style scoped>
.scr-code span { font-family: var(--font-mono, monospace); }
</style>
