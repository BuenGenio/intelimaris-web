<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Renewals</h1>
        <p class="scr-sub">Conversion and retention against the book.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <span class="scr-chip">Season 2026–27</span>
        <button type="button" class="scr-btn scr-btn--ghost">Residents board</button>
      </div>
    </div>

    <div class="scr-kpis" style="margin-bottom: 14px">
      <div class="scr-stat"><span class="scr-stat-label">Contracts ending</span><span class="scr-stat-value">48</span><span class="scr-stat-delta">by 31 Oct 2026</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Offered</span><span class="scr-stat-value">44<small>/ 48</small></span><span class="scr-stat-delta" data-tone="warn">4 not yet sent</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Accepted</span><span class="scr-stat-value">31</span><span class="scr-stat-delta" data-tone="safe">70% of offered</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Declined</span><span class="scr-stat-value">5</span><span class="scr-stat-delta" data-tone="danger">3 cited the uplift</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Average uplift</span><span class="scr-stat-value">4.8<small>%</small></span><span class="scr-stat-delta">accepted offers</span></div>
    </div>

    <div class="scr-split">
      <div class="scr-card">
        <p class="scr-card-title">Where the 48 stand</p>
        <div class="scr-bars">
          <div v-for="s in stages" :key="s.name"><span>{{ s.name }}</span><div class="scr-progress"><i :style="{ width: `${(s.n / 48) * 100}%`, background: s.color }"></i></div><span class="scr-num">{{ s.n }}</span></div>
        </div>
        <p class="scr-micro scr-muted" style="margin-top: 10px">Retention by berths, not people: 31 of 48 home berths keep their vessel for another season; 8 are still a question.</p>
      </div>
      <div class="scr-card">
        <p class="scr-card-title">Accepted, by month offered</p>
        <div class="scr-sparkline" style="height: 70px"><i v-for="(v, i) in offered" :key="i" :style="{ height: `${v}%` }"></i></div>
        <div class="scr-row scr-row--between scr-micro scr-muted" style="margin-top: 4px"><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span></div>
        <p class="scr-micro scr-muted" style="margin-top: 8px">Offers sent in June converted at 86%; September's at 41% so far.</p>
      </div>
    </div>

    <table class="scr-table" style="margin-top: 14px">
      <thead><tr><th>Resident</th><th>Berth</th><th>Ends</th><th class="scr-num">Current</th><th class="scr-num">Offered</th><th class="scr-num">Uplift</th><th>State</th></tr></thead>
      <tbody>
        <tr v-for="r in rows" :key="r.who">
          <td><span class="scr-strong">{{ r.who }}</span><span class="scr-item-sub">{{ r.vessel }}</span></td><td class="scr-num">{{ r.berth }}</td><td class="scr-num scr-muted">{{ r.ends }}</td><td class="scr-num">{{ r.current }}</td><td class="scr-num">{{ r.offered }}</td><td class="scr-num">{{ r.uplift }}</td><td><span class="scr-pill" :data-tone="r.tone">{{ r.state }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const stages = [
  { name: 'Accepted', n: 31, color: 'var(--safe)' },
  { name: 'Proposed', n: 8, color: 'var(--info)' },
  { name: 'Declined', n: 5, color: 'var(--danger)' },
  { name: 'Not offered', n: 4, color: 'var(--warn)' },
]
const offered = [86, 78, 64, 41, 10]
const rows = [
  { who: 'Dana Whitfield', vessel: 'Halcyon · 62 ft', berth: 'A-01', ends: '31 Oct', current: '$3,720 / mo', offered: '$3,900 / mo', uplift: '+4.8%', state: 'Proposed', tone: 'info' },
  { who: 'Mike Chen', vessel: 'Osprey · 44 ft', berth: 'A-06', ends: '31 Oct', current: '$2,640 / mo', offered: '$2,760 / mo', uplift: '+4.5%', state: 'Accepted', tone: 'safe' },
  { who: 'J. Barros', vessel: 'Marlin II · 48 ft', berth: 'C-13', ends: '31 Oct', current: '$2,880 / mo', offered: '—', uplift: '—', state: 'Not offered · debt', tone: 'warn' },
  { who: 'Priya and Tom Alvarez', vessel: 'Two Cats · 40 ft cat', berth: 'A-04', ends: '31 Oct', current: '$3,100 / mo', offered: '$3,350 / mo', uplift: '+8.1%', state: 'Declined', tone: 'danger' },
  { who: 'Ruiz Charters', vessel: 'Blue Heron · 38 ft', berth: 'D-02', ends: '30 Nov', current: '$2,280 / mo', offered: '$2,380 / mo', uplift: '+4.4%', state: 'Accepted', tone: 'safe' },
  { who: 'Sam Miller', vessel: 'Wanderer · 42 ft', berth: 'C-14', ends: 'Transient', current: '$2.40 / ft / night', offered: 'Resident offer', uplift: '—', state: 'Proposed', tone: 'info' },
]
</script>
