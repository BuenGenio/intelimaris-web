<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Urgent work</h1>
        <p class="scr-sub">Tasks and incidents blocking the day.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <span class="scr-pill" data-tone="danger">4 blocking</span>
        <button type="button" class="scr-btn scr-btn--ghost">PMS map</button>
      </div>
    </div>

    <div class="scr-kpis" style="margin-bottom: 14px">
      <div class="scr-stat"><span class="scr-stat-label">Blocking an arrival</span><span class="scr-stat-value">2</span><span class="scr-stat-delta" data-tone="danger">both before 15:00</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Open incidents</span><span class="scr-stat-value">3</span><span class="scr-stat-delta" data-tone="warn">1 major</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Overdue tasks</span><span class="scr-stat-value">1</span><span class="scr-stat-delta">since yesterday</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Unowned</span><span class="scr-stat-value">1</span><span class="scr-stat-delta" data-tone="warn">needs a name</span></div>
    </div>

    <div class="scr-card">
      <p class="scr-card-title">Blocking now</p>
      <p class="scr-sub scr-small" style="margin-bottom: 8px">Soonest deadline first. Each one names what it holds up, who owns it, and when it stops mattering.</p>
      <table class="scr-table">
        <thead><tr><th>Item</th><th>Holds up</th><th>Owner</th><th>Due</th><th>State</th></tr></thead>
        <tbody>
          <tr v-for="r in rows" :key="r.item">
            <td><span class="scr-strong">{{ r.item }}</span><span class="scr-item-sub">{{ r.kind }}</span></td>
            <td class="scr-muted">{{ r.holds }}</td>
            <td>{{ r.owner || '—' }}</td>
            <td class="scr-num">{{ r.due }}</td>
            <td><span class="scr-pill" :data-tone="r.tone">{{ r.state }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="scr-alert" data-tone="warn" style="margin-top: 14px"><ScrIcon name="alert" /><div><strong>Not built yet</strong>Today · Run the current shift from one place. No issue owns this lane; it is sequenced in phase 4 of the PMS plan and sits in band 2 for the show.</div></div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const rows = [
  { item: 'Pedestal C-14 no shore power', kind: 'Task · electrical', holds: 'Wanderer arriving 14:30', owner: 'Luis Ortega', due: '14:00', state: 'In progress', tone: 'info' },
  { item: 'Clear D-07 after collision', kind: 'Incident · moderate', holds: 'Sea Change move to D-07', owner: 'Rosa Delgado', due: '15:00', state: 'Open', tone: 'warn' },
  { item: 'Anti-slip strip on B dock finger', kind: 'Incident · major', holds: 'Contractor access on B', owner: '', due: 'Today', state: 'Unowned', tone: 'danger' },
  { item: 'Pump-out hose leaking at coupling', kind: 'Task · plumbing', holds: 'Pump-out service', owner: 'Marcus Lee', due: 'Yesterday 17:00', state: 'Overdue', tone: 'high' },
  { item: 'Fuel dock sheen absorbents restock', kind: 'Task · supplies', holds: 'Nothing yet', owner: 'Sam Miller', due: '17:00', state: 'Queued', tone: undefined },
]
</script>
