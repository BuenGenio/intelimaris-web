<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Audit trail</h1>
        <p class="scr-sub">Every write the platform's lanes made, newest first, across every workspace — who, what, when, and the sentence the service wrote at the time.</p>
      </div>
    </div>

    <div class="scr-toolbar scr-row--wrap">
      <span class="scr-input scr-input--search au-search scr-muted">Actor — user:&lt;sub&gt;, admin:&lt;sub&gt;, system:&lt;job&gt;…</span>
      <span class="scr-chip">Service · Every service <span aria-hidden="true">⌄</span></span>
      <span class="scr-chip">Lane · Every lane <span aria-hidden="true">⌄</span></span>
      <span class="scr-input au-input scr-muted">Action — stay.confirm, berth.create…</span>
      <span class="scr-input au-input au-ws scr-muted scr-num">Workspace id</span>
      <span class="scr-row scr-small scr-muted">From <span class="scr-input au-date scr-num">2026-10-01</span></span>
      <span class="scr-row scr-small scr-muted">To <span class="scr-input au-date scr-num">2026-10-14</span></span>
      <span class="scr-spacer"></span>
      <span class="scr-small scr-muted">7 shown — older ones behind</span>
    </div>

    <div class="scr-table-wrap">
      <table class="scr-table">
        <thead><tr><th>When</th><th>Action</th><th>What happened</th><th>By</th><th>Via</th><th>Subject</th></tr></thead>
        <tbody>
          <tr v-for="e in events" :key="e.id">
            <td class="scr-small scr-muted scr-num au-nowrap">{{ e.at }}</td>
            <td><span class="scr-row au-nowrap"><span class="scr-pill scr-pill--bare">{{ e.label }}</span><span class="scr-micro scr-muted scr-num">{{ e.action }}</span></span></td>
            <td><p>{{ e.summary }}</p><p v-if="e.detail" class="scr-micro scr-muted scr-num au-detail">{{ e.detail }}</p></td>
            <td><span class="au-col"><span>{{ e.who }}</span><span class="scr-micro scr-muted scr-num">{{ e.actor }}</span></span></td>
            <td class="scr-small scr-muted au-nowrap">{{ e.via }}</td>
            <td><a href="#" class="scr-small scr-num scr-strong au-nowrap">{{ e.subject }}</a></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="scr-row scr-row--between scr-section"><span></span><button type="button" class="scr-btn scr-btn--sm">Older</button></div>
  </div>
</template>

<script setup lang="ts">
const events = [
  { id: 'a1', at: 'Oct 14, 2026, 2:16 PM', label: 'Stay request', action: 'stay.request', summary: 'Wanderer asked to stay 3 nights at Isle of Venice dock · east face', detail: '{"nights":3,"quote_cents":28500}', who: 'Sam Miller', actor: 'user:7f3a9c21-4b0e', via: 'DockPass · public', subject: 'Stay stay_01J9Z8' },
  { id: 'a2', at: 'Oct 14, 2026, 1:58 PM', label: 'Hazard clear', action: 'hazard.clear', summary: 'Cleared the floating-debris report at 26.11980, -80.10322', detail: '{"cleared_via":"admin","note":"Verified gone on the water"}', who: 'Sam Miller (operator)', actor: 'admin:2c11e8d0-9a7f', via: 'Places · admin', subject: 'Hazard hz_8823' },
  { id: 'a3', at: 'Oct 14, 2026, 11:04 AM', label: 'Invite send', action: 'invite.send', summary: 'Invited crew@example.com to Wanderer as crew', detail: '', who: 'Sam Miller', actor: 'user:7f3a9c21-4b0e', via: 'Workspace · public', subject: 'Workspace 3b8e51f0' },
  { id: 'a4', at: 'Oct 13, 2026, 5:40 PM', label: 'Claim approve', action: 'claim.approve', summary: 'Approved the business claim on Coconuts — marked Verified', detail: '{"kind":"business"}', who: 'Sam Miller (operator)', actor: 'admin:2c11e8d0-9a7f', via: 'Places · admin', subject: 'Place coconuts' },
  { id: 'a5', at: 'Oct 12, 2026, 8:30 PM', label: 'Stay confirm', action: 'stay.confirm', summary: 'Bahia Mar confirmed Sea Change for Oct 14–15 and held C-14', detail: '{"berth_id":"C-14"}', who: 'Dockmaster', actor: 'user:b4h1am4r-0c22', via: 'DockPass · public', subject: 'Stay stay_01J9WQ' },
  { id: 'a6', at: 'Oct 12, 2026, 3:22 PM', label: 'Bridge correct', action: 'bridge.correct', summary: 'Corrected closed_clearance_m on Las Olas Boulevard Bridge to 9.4', detail: '{"field":"closed_clearance_m","from":null,"to":9.4}', who: 'Sam Miller (operator)', actor: 'admin:2c11e8d0-9a7f', via: 'Route · admin', subject: 'Bridge las-olas-blvd' },
  { id: 'a7', at: 'Oct 12, 2026, 4:00 AM', label: 'Populate run', action: 'populate.run', summary: 'Refreshed depth-cells for florida — 18 402 cells, 1 210 resounded', detail: '', who: 'Populator', actor: 'system:populator', via: 'Sensors · system', subject: 'Layer depth-cells' },
]
</script>

<style scoped>
.au-search { flex: 1 1 260px; display: flex; align-items: center; min-width: 0; }
.au-input { width: 210px; min-height: 36px; font-size: 12px; }
.au-ws { width: 130px; }
.au-date { width: 110px; min-height: 32px; padding: 4px 8px; font-size: 12px; }
.au-nowrap { white-space: nowrap; }
.au-col { display: grid; gap: 2px; }
.au-detail { max-width: 240px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
