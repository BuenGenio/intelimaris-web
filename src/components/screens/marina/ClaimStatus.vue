<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Marina status</h1>
        <p class="scr-sub">Where did my claim, or my request to add the marina, get to, and what do I do about it?</p>
      </div>
      <button class="scr-btn scr-btn--ghost">Find your marina</button>
    </div>

    <div class="scr-card scr-row" style="gap: 16px; padding: 18px">
      <span class="cs-beacon"><ScrIcon name="check" /></span>
      <div>
        <h2 class="scr-h2">Bahia Mar Yachting Center · Approved</h2>
        <p class="scr-sub scr-small">Approved 3 Oct 2026 by the operator console. This workspace runs the marina; the profile, the berth map and the boards read and write against it.</p>
      </div>
    </div>

    <div class="scr-card scr-section">
      <h2 class="scr-card-title">What you can do now</h2>
      <div class="scr-row scr-row--wrap"><button class="scr-btn">Draw the berth map</button><button class="scr-btn">People</button><button class="scr-btn">Correct the profile</button></div>
    </div>

    <div class="scr-grid-2 scr-section">
      <div class="scr-card">
        <h2 class="scr-card-title">Claim history</h2>
        <p class="scr-sub scr-small">Every claim this workspace ever filed, newest first.</p>
        <div class="scr-divider"></div>
        <div v-for="c in claims" :key="c.filed" class="scr-row scr-row--wrap cs-row">
          <span class="scr-pill" :data-tone="c.tone">{{ c.status }}</span>
          <span class="scr-strong">{{ c.subject }}</span>
          <span class="scr-small scr-muted">filed {{ c.filed }}{{ c.decided ? ` · decided ${c.decided}` : '' }}</span>
          <span v-if="c.note" class="scr-micro scr-muted" style="width: 100%">{{ c.note }}</span>
        </div>
      </div>
      <div class="scr-card">
        <h2 class="scr-card-title">Requests to add a marina</h2>
        <p class="scr-sub scr-small">Every registration this workspace ever filed, newest first.</p>
        <div class="scr-divider"></div>
        <p class="scr-muted">None. The marina was in the directory, so nothing needed adding.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const claims = [
  { status: 'Approved', tone: 'safe', subject: 'Bahia Mar Yachting Center', filed: '29 Sep 2026', decided: '3 Oct 2026', note: 'Verified on the office line; domain email matched.' },
  { status: 'Rejected', tone: 'danger', subject: 'Bahia Mar Yachting Center', filed: '14 Sep 2026', decided: '18 Sep 2026', note: 'No evidence attached; the phone given was a mobile with no answer. Refile with the office line.' },
]
</script>

<style scoped>
.cs-beacon { display: grid; place-items: center; width: 56px; height: 56px; border-radius: 50%; background: #e6f5ea; color: var(--safe); box-shadow: 0 0 0 6px rgba(46, 155, 78, 0.12), 0 0 0 12px rgba(46, 155, 78, 0.06); }
.cs-beacon svg { width: 24px; height: 24px; }
.cs-row { padding: 8px 0; }
.cs-row + .cs-row { border-top: 1px solid var(--ink-100); }
</style>
