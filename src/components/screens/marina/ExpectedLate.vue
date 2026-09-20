<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Expected late</h1>
        <p class="scr-sub">Past their ETA and not yet alongside. Today · phase 2 of the PMS plan.</p>
      </div>
      <div class="scr-row"><span class="scr-pill">Scaffold</span><button class="scr-btn scr-btn--ghost scr-btn--sm">PMS map</button></div>
    </div>

    <div class="scr-alert" data-tone="warn">
      <ScrIcon name="clock" />
      <div><strong>3 vessels past their ETA</strong>The ETA comes from the vessel's own passage when she shares it, otherwise from the booking. A berth held for a late arrival stays held until someone here releases it.</div>
    </div>

    <div class="scr-kpis scr-section">
      <div class="scr-stat"><span class="scr-stat-label">Past ETA</span><span class="scr-stat-value">3</span><span class="scr-stat-delta" data-tone="warn">berths held for them</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Reached</span><span class="scr-stat-value">1</span><span class="scr-stat-delta">of 3 · by phone or chat</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Sharing a passage</span><span class="scr-stat-value">2</span><span class="scr-stat-delta" data-tone="safe">live ETA on the map</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Sunset</span><span class="scr-stat-value">18:52</span><span class="scr-stat-delta">14 Oct · Fort Lauderdale</span></div>
    </div>

    <div class="scr-section scr-table-wrap">
      <table class="scr-table">
        <thead><tr><th>Vessel</th><th>Berth held</th><th>ETA</th><th>Now</th><th>Last heard</th><th></th></tr></thead>
        <tbody>
          <tr v-for="r in rows" :key="r.vessel">
            <td><span class="scr-strong">{{ r.vessel }}</span><br /><span class="scr-small scr-muted">{{ r.contact }}</span></td>
            <td class="scr-num">{{ r.berth }}</td>
            <td class="scr-num">{{ r.eta }}</td>
            <td><span class="scr-pill" :data-tone="r.tone">{{ r.state }}</span></td>
            <td class="scr-small scr-muted">{{ r.heard }}</td>
            <td><div class="scr-row"><button class="scr-btn scr-btn--sm">Message</button><button class="scr-btn scr-btn--ghost scr-btn--sm">Release</button></div></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const rows = [
  { vessel: 'Wanderer · 42 ft Sabre', contact: 'Sam Miller · +1 305 555 0123', berth: 'C-14', eta: '15:00 → 17:40', state: 'Underway · 1 h 20 min late', tone: 'warn', heard: 'AIS 4 min ago · 6.1 kn off Port Everglades' },
  { vessel: 'Sea Change · 55 ft', contact: 'R. Alvarez · +1 954 555 0188', berth: 'none held', eta: '14:00', state: 'No word', tone: 'danger', heard: 'Not sharing a passage · called 16:05, no answer' },
  { vessel: 'Kestrel · 31 ft', contact: 'J. Okafor · +1 561 555 0142', berth: 'B-9', eta: '13:30 → 19:10', state: 'Waiting on the 17th St bridge', tone: 'info', heard: 'Chat 12 min ago · "holding for the 19:00 opening"' },
]
</script>
