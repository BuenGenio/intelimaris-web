<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Quotations</h1>
        <p class="scr-sub">A priced offer that expires, with its terms recorded. Bookings & contracts · phase 3.</p>
      </div>
      <div class="scr-row"><span class="scr-pill">Scaffold</span><button class="scr-btn scr-btn--ghost scr-btn--sm">Enquiries</button></div>
    </div>

    <div class="scr-kpis">
      <div class="scr-stat"><span class="scr-stat-label">Open</span><span class="scr-stat-value">4</span><span class="scr-stat-delta">awaiting an answer</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Expiring this week</span><span class="scr-stat-value">2</span><span class="scr-stat-delta" data-tone="warn">then the price lapses</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Accepted · Oct</span><span class="scr-stat-value">9</span><span class="scr-stat-delta" data-tone="safe">$14,620 booked</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Declined · Oct</span><span class="scr-stat-value">3</span><span class="scr-stat-delta">2 on price</span></div>
    </div>

    <div class="scr-section scr-table-wrap">
      <table class="scr-table">
        <thead><tr><th>Ref</th><th>Customer</th><th>Nights</th><th class="scr-num">Total</th><th>Terms</th><th>Expires</th><th>Status</th></tr></thead>
        <tbody>
          <tr v-for="q in rows" :key="q.ref">
            <td class="scr-num">{{ q.ref }}</td>
            <td><span class="scr-strong">{{ q.who }}</span><br /><span class="scr-small scr-muted">{{ q.vessel }}</span></td>
            <td class="scr-small">{{ q.nights }}</td>
            <td class="scr-num scr-strong">{{ q.total }}</td>
            <td class="scr-small scr-muted">{{ q.terms }}</td>
            <td class="scr-small scr-num">{{ q.expires }}</td>
            <td><span class="scr-pill" :data-tone="q.tone">{{ q.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const rows = [
  { ref: 'Q-2026-0141', who: 'Sam Miller', vessel: 'Wanderer · 42 ft', nights: '14–17 Oct · 3', total: '$294.00', terms: '40–45 ft band · $98/night · 30% deposit', expires: '13 Oct 18:00', status: 'Accepted', tone: 'safe' },
  { ref: 'Q-2026-0142', who: 'Priya Natarajan', vessel: 'Meridian · 62 ft', nights: '1 Nov – 31 Mar · monthly', total: '$17,250.00', terms: '$23/ft/month · first month on signing', expires: '20 Oct', status: 'Sent', tone: 'info' },
  { ref: 'Q-2026-0143', who: 'Charter Yachts of FLL', vessel: '6 berths · 40–60 ft', nights: '21–25 Oct · 4', total: '$6,480.00', terms: 'show-week rate · no refunds after 18 Oct', expires: '16 Oct', status: 'Sent', tone: 'info' },
  { ref: 'Q-2026-0139', who: 'Luis Ferreira', vessel: 'Andiamo · 48 ft', nights: '28 Oct – 1 Nov · 4', total: '$560.00', terms: 'extension at the same band', expires: '15 Oct', status: 'Expiring', tone: 'warn' },
  { ref: 'Q-2026-0136', who: 'D. Whitfield', vessel: 'Tidewater · 60 ft', nights: '12–19 Oct · 7', total: '$1,596.00', terms: 'prior balance must clear first', expires: '11 Oct', status: 'Declined', tone: 'danger' },
]
</script>
