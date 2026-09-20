<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Movements</h1>
        <p class="scr-sub">Planned moves against moves actually recorded. Planning & berths · phase 2.</p>
      </div>
      <div class="scr-row"><span class="scr-pill">Scaffold</span><label class="scr-field"><input class="scr-input" type="date" value="2026-10-14" readonly /></label></div>
    </div>

    <div class="scr-kpis">
      <div class="scr-stat"><span class="scr-stat-label">Planned today</span><span class="scr-stat-value">9</span><span class="scr-stat-delta">arrivals, departures, shifts</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Recorded</span><span class="scr-stat-value">5</span><span class="scr-stat-delta" data-tone="safe">stamped at the dock</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Not as planned</span><span class="scr-stat-value">2</span><span class="scr-stat-delta" data-tone="warn">a different berth, or not yet</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Unplanned</span><span class="scr-stat-value">1</span><span class="scr-stat-delta" data-tone="danger">seen on a dock walk</span></div>
    </div>

    <div class="scr-section scr-table-wrap">
      <table class="scr-table">
        <thead><tr><th>Time</th><th>Vessel</th><th>Move</th><th>Planned</th><th>Recorded</th><th>By</th></tr></thead>
        <tbody>
          <tr v-for="m in rows" :key="m.time + m.vessel">
            <td class="scr-num">{{ m.time }}</td>
            <td class="scr-strong">{{ m.vessel }}</td>
            <td class="scr-small">{{ m.move }}</td>
            <td class="scr-num scr-small">{{ m.planned }}</td>
            <td><span class="scr-pill" :data-tone="m.tone">{{ m.recorded }}</span></td>
            <td class="scr-small scr-muted">{{ m.by }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const rows = [
  { time: '07:10', vessel: 'Halcyon', move: 'Depart', planned: 'A-3 → out', recorded: 'Departed 07:04', tone: 'safe', by: 'Dockmaster R. Ortiz' },
  { time: '08:30', vessel: 'Serenity', move: 'Shift for piling repair', planned: 'A-12 → A-9', recorded: 'A-12 → A-10', tone: 'warn', by: 'Dockhand K. Lee · A-9 pedestal dead' },
  { time: '09:00', vessel: 'Osprey II', move: 'Depart to yard', planned: 'D-5 → Lauderdale Marine Service', recorded: 'Departed 09:12', tone: 'safe', by: 'Dockmaster R. Ortiz' },
  { time: '11:00', vessel: 'Blue Heron', move: 'Arrive', planned: '→ B-7', recorded: 'Arrived 10:48', tone: 'safe', by: 'Front desk' },
  { time: '12:00', vessel: 'Tidewater', move: 'Depart, overstaying', planned: 'D-2 → out', recorded: 'Not yet', tone: 'warn', by: '—' },
  { time: '13:40', vessel: 'Unknown · about 30 ft', move: 'Tied up on the face dock', planned: '—', recorded: 'Seen on dock walk', tone: 'danger', by: 'Dockhand K. Lee' },
  { time: '15:00', vessel: 'Wanderer', move: 'Arrive', planned: '→ C-14 · enter 240° stern-in', recorded: 'Underway · ETA 17:40', tone: 'info', by: 'AIS 4 min ago' },
]
</script>
