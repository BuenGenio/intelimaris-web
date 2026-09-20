<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Waiting list</h1>
        <p class="scr-sub">Fit-matched queue with an offer that expires. Planning & berths · phase 2.</p>
      </div>
      <div class="scr-row"><span class="scr-pill">Scaffold</span><button class="scr-btn scr-btn--primary scr-btn--sm">Add to the list</button></div>
    </div>

    <div class="scr-kpis">
      <div class="scr-stat"><span class="scr-stat-label">Waiting</span><span class="scr-stat-value">12</span><span class="scr-stat-delta">for a resident berth</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Offers out</span><span class="scr-stat-value">2</span><span class="scr-stat-delta" data-tone="warn">expire in 48 h</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Frees next</span><span class="scr-stat-value">D-5</span><span class="scr-stat-delta">30 Nov · 60 ft</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Median wait</span><span class="scr-stat-value">7<small>mo</small></span><span class="scr-stat-delta">40–50 ft band</span></div>
    </div>

    <div class="scr-section scr-table-wrap">
      <table class="scr-table">
        <thead><tr><th>#</th><th>Vessel</th><th>Wants</th><th>Since</th><th>Fits</th><th>Offer</th><th></th></tr></thead>
        <tbody>
          <tr v-for="(r, i) in rows" :key="r.vessel" :class="{ 'is-selected': r.offer }">
            <td class="scr-num scr-muted">{{ i + 1 }}</td>
            <td><span class="scr-strong">{{ r.vessel }}</span><br /><span class="scr-small scr-muted">{{ r.who }}</span></td>
            <td class="scr-small">{{ r.wants }}</td>
            <td class="scr-small scr-num">{{ r.since }}</td>
            <td class="scr-small">{{ r.fits }}</td>
            <td><span v-if="r.offer" class="scr-pill" data-tone="warn">{{ r.offer }}</span><span v-else class="scr-muted">—</span></td>
            <td><button class="scr-btn scr-btn--sm" :class="{ 'scr-btn--primary': !r.offer }">{{ r.offer ? 'Withdraw' : 'Offer a berth' }}</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="scr-section scr-small scr-muted">An offer holds the berth for 48 hours. Declined or lapsed, it goes to the next vessel the berth fits, not the next in line.</p>
  </div>
</template>

<script setup lang="ts">
const rows = [
  { vessel: 'Wanderer · 42 ft', who: 'Sam Miller · +1 305 555 0123', wants: 'Annual · Dock C · 50 A', since: '12 Mar 2026', fits: 'C-13, C-14, B-9', offer: 'C-14 · expires 16 Oct 09:00' },
  { vessel: 'Meridian · 62 ft', who: 'P. Natarajan', wants: 'Winter · Nov–Mar', since: '2 Jun 2026', fits: 'D-5 (from 30 Nov), Face 7', offer: 'D-5 · expires 15 Oct 17:00' },
  { vessel: 'Kestrel · 31 ft', who: 'J. Okafor', wants: 'Annual · any dock', since: '19 Jul 2026', fits: '14 berths', offer: '' },
  { vessel: 'Northern Light · 84 ft', who: 'Yacht Mgmt Intl', wants: 'Annual · face dock · 100 A', since: '3 Aug 2026', fits: 'Face 1–3 only', offer: '' },
  { vessel: 'Dulcinea · 40 ft', who: 'A. Moreau', wants: 'Six months · Dock A or B', since: '28 Sep 2026', fits: '9 berths', offer: '' },
]
</script>
