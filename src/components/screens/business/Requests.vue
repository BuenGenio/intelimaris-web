<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Requests</h1>
        <p class="scr-sub">Guests waiting on an answer.</p>
      </div>
      <span class="scr-pill" data-tone="warn">3 waiting</span>
    </div>

    <div class="scr-card">
      <h2 class="scr-card-title">Waiting</h2>
      <p class="scr-small scr-muted">2 requests ask for the same nights — whichever you confirm takes them.</p>
      <ul class="scr-stack scr-stack--tight" style="margin-top: 10px">
        <li v-for="r in waiting" :key="r.vessel" class="req-row">
          <span style="flex: 1; min-width: 0"><span class="scr-strong">{{ r.vessel }}</span><br /><span class="scr-small scr-muted">{{ r.listing }} · {{ r.dates }} · {{ r.quote }}</span><br v-if="r.note" /><span v-if="r.note" class="scr-small scr-muted">“{{ r.note }}”</span></span>
          <span class="scr-row"><button class="scr-btn scr-btn--primary scr-btn--sm">Confirm</button><button class="scr-btn scr-btn--danger scr-btn--sm">Decline</button></span>
        </li>
      </ul>
    </div>

    <div class="scr-card scr-section">
      <h2 class="scr-card-title">Decided</h2>
      <p class="scr-small scr-muted">Confirmed, completed, declined or cancelled.</p>
      <table class="scr-table" style="margin-top: 10px">
        <thead><tr><th>Status</th><th>Vessel</th><th>Listing</th><th>Nights</th><th class="scr-num">Quote</th><th></th></tr></thead>
        <tbody>
          <tr v-for="d in decided" :key="d.vessel + d.dates">
            <td><span class="scr-pill" :data-tone="d.tone">{{ d.status }}</span></td>
            <td class="scr-strong">{{ d.vessel }}</td>
            <td class="scr-muted">{{ d.listing }}</td>
            <td>{{ d.dates }}</td>
            <td class="scr-num">{{ d.quote }}</td>
            <td style="text-align: right"><button v-if="d.move" class="scr-btn scr-btn--ghost scr-btn--sm">{{ d.move }}</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
const waiting = [
  { vessel: 'Wanderer', listing: 'Coconuts dock · overnight', dates: 'Sat 11 Oct → Sun 12 Oct · 1 night', quote: '$85.00', note: '42 ft Sabre, draft 4.6 ft. Dinner for four at 7.' },
  { vessel: 'Sea Change', listing: 'Coconuts dock · overnight', dates: 'Sat 11 Oct → Mon 13 Oct · 2 nights', quote: '$170.00', note: '' },
  { vessel: 'Vessel on the platform', listing: 'Coconuts dock · overnight', dates: 'Fri 17 Oct → Sat 18 Oct · 1 night', quote: '$85.00', note: 'Need 50 A shore power.' },
]
const decided = [
  { status: 'Confirmed', tone: 'safe', vessel: 'Tern', listing: 'Coconuts dock · overnight', dates: '9 → 10 Oct · 1', quote: '$85.00', move: 'Mark completed' },
  { status: 'Completed', tone: 'offline', vessel: 'Blue Hour', listing: 'Coconuts dock · overnight', dates: '3 → 5 Oct · 2', quote: '$170.00', move: '' },
  { status: 'Declined', tone: 'danger', vessel: 'Halcyon', listing: 'Coconuts dock · overnight', dates: '4 → 5 Oct · 1', quote: '$85.00', move: '' },
  { status: 'Cancelled', tone: 'offline', vessel: 'Kestrel', listing: 'Coconuts dock · overnight', dates: '1 → 2 Oct · 1', quote: '$85.00', move: '' },
]
</script>
<style scoped>
.req-row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; padding: 9px 0; border-top: 1px solid var(--ink-100); }
.req-row:first-child { border-top: 0; padding-top: 0; }
</style>
