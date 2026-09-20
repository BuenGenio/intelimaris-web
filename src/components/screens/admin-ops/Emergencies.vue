<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <div class="scr-row"><h1 class="scr-h1">Emergencies</h1><span class="scr-pill" data-tone="warn">Scaffold</span></div>
        <p class="scr-sub">Every raised call, newest first, with bearing and distance from the booth. The alert range is the one control here: vessels inside it are told.</p>
      </div>
      <button type="button" class="scr-btn scr-btn--sm" @click="showSample = !showSample">{{ showSample ? 'Hide sample rows' : 'Show sample rows' }}</button>
    </div>

    <div class="scr-alert" data-tone="warn" role="note">
      <ScrIcon name="wrench" />
      <span><strong>Scaffold — no lane behind this yet. DEV-426</strong>Raising, responding and standing down are real-time work on a container-class service that does not exist yet. Nothing on this screen is live; the rows are samples when shown.</span>
    </div>

    <div class="scr-card scr-row scr-row--wrap em-range">
      <div class="scr-field">
        <span class="scr-label">Alert range</span>
        <div class="scr-row"><span class="scr-input em-input scr-num">5.0</span><span class="scr-muted">NM</span></div>
        <span class="scr-hint">Stored as alert_range_m — 5.0 NM (9,260 m)</span>
      </div>
      <div class="scr-row em-save">
        <button type="button" class="scr-btn scr-btn--primary scr-btn--sm" disabled>Save range</button>
        <span class="scr-small scr-muted">No lane to store it — DEV-426.</span>
      </div>
    </div>

    <div class="scr-toolbar">
      <span class="scr-chip">Status · Every call <span aria-hidden="true">⌄</span></span>
      <span class="scr-chip">Type · Any <span aria-hidden="true">⌄</span></span>
    </div>

    <table class="scr-table">
      <thead><tr><th>Type</th><th>Vessel</th><th>From booth</th><th>Raised</th><th>Responders</th><th>Status</th></tr></thead>
      <tbody v-if="showSample">
        <tr v-for="r in rows" :key="r.id">
          <td><span class="scr-row"><strong>{{ r.type }}</strong><span class="scr-pill scr-pill--bare">Sample</span></span></td>
          <td>{{ r.vessel }}</td>
          <td class="scr-num">{{ r.fromBooth }}</td>
          <td class="scr-small scr-muted scr-num">{{ r.raised }}</td>
          <td>{{ r.responders }}</td>
          <td><span class="scr-pill" :data-tone="r.tone">{{ r.status }}</span></td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr><td colspan="6" class="scr-muted em-empty">No lane answers here yet, so this board is unknown rather than empty — it is not saying there are no emergencies.</td></tr>
      </tbody>
    </table>
    <p class="scr-micro scr-muted em-foot">Booth: Bahia Mar, 26.1135, -80.1063. Bearing and distance are from that point, because a responder reads a position as a heading to steer.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const showSample = ref(true)
const rows = [
  { id: 'e1', type: 'Man overboard', vessel: 'Wanderer', fromBooth: '2.7 NM at 121°', raised: '2:14:08 PM', responders: 'No responders yet', status: 'Raised', tone: 'danger' },
  { id: 'e2', type: 'Taking water', vessel: 'Sea Change', fromBooth: '1.9 NM at 336°', raised: '1:56:40 PM', responders: '2 responders', status: 'Responding', tone: 'warn' },
  { id: 'e3', type: 'Aground', vessel: 'Blue Heron', fromBooth: '0.8 NM at 204°', raised: '12:31:02 PM', responders: '1 responder', status: 'Stood down', tone: 'offline' },
]
</script>

<style scoped>
.em-range { align-items: flex-end; gap: 16px; }
.em-input { width: 110px; display: inline-flex; align-items: center; }
.em-save { padding-bottom: 22px; }
.em-empty { padding: 22px 14px; }
.em-foot { margin-top: 10px; }
</style>
