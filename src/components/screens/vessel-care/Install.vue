<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">I-01 · Today's installs</h1>
        <p class="scr-sub">Field mode: big targets, everything works with no network and the queue says what is pending.</p>
      </div>
      <span class="scr-pill scr-pill--bare">Scaffold</span>
    </div>
    <div class="scr-row scr-row--between" style="margin-bottom: 12px">
      <span class="scr-pill" data-tone="info">2 steps saved on this device · syncs when you have signal</span>
      <button class="scr-btn scr-btn--ghost scr-btn--sm">Sensors</button>
    </div>

    <div class="scr-chips scr-chips--scroll" style="margin-bottom: 14px">
      <span v-for="(s, i) in steps" :key="s" class="scr-chip" :class="{ 'is-on': i === 0 }">{{ i + 1 }}. {{ s }}</span>
    </div>

    <p class="scr-ov" style="margin-bottom: 8px">Tuesday 14 Oct 2026</p>
    <div class="scr-stack scr-stack--tight">
      <div v-for="j in jobs" :key="j.where" class="scr-card">
        <div class="scr-row scr-row--between">
          <div><span class="scr-item-title">{{ j.where }}</span><span class="scr-item-sub">{{ j.what }}</span></div>
          <span class="scr-pill" :data-tone="j.tone">{{ j.state }}</span>
        </div>
        <div class="scr-row scr-row--between scr-micro scr-muted" style="margin-top: 8px"><span>{{ j.time }}</span><span>last synced {{ j.synced }}</span></div>
        <div class="scr-progress" style="margin-top: 8px"><i :style="{ width: j.done + '%' }"></i></div>
      </div>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">Today</h2>
      <p class="scr-small scr-muted">One card per job: site, berth or vessel, what is being fitted, its state, when it last synced. You are an admin of this vessel's workspace for the duration of the job — everything you can see here, the owner can see too.</p>
      <div class="scr-row" style="margin-top: 8px"><span class="scr-pill" data-tone="warn">Not built</span><span class="scr-micro scr-muted">There is no job service yet; what is real is the unit list per workspace you belong to.</span></div>
    </div>

    <div class="scr-bar"><button class="scr-btn scr-btn--primary scr-btn--block">Open the next job</button></div>
  </div>
</template>

<script setup lang="ts">
const steps = ["Today's installs", 'Site survey', 'Bind the unit', 'Uplink verification', 'Coverage walk', 'Channel mapping', 'Photo evidence', 'Sign-off and handover']
const jobs = [
  { where: 'Wanderer · Bahia Mar C-14', what: '2 units: bilge and battery · engine room and aft bilge', state: 'In progress', tone: 'accent', time: '08:30 – 11:00', synced: '4 min ago', done: 45 },
  { where: 'Isle of Venice dock', what: 'Gateway siting and coverage walk', state: 'Next', tone: 'info', time: '13:00 – 15:00', synced: '1 h ago', done: 0 },
  { where: 'Bahia Mar · Dock A head', what: 'Gateway swap, hardware rev B2', state: 'Queued', tone: 'offline', time: '15:30', synced: 'never', done: 0 },
]
</script>
