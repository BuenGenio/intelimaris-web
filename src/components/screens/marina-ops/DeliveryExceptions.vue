<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Delivery exceptions</h1>
        <p class="scr-sub">What failed to send, owned by someone, and resendable.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <span class="scr-pill" data-tone="danger">5 failed · 2 unowned</span>
        <button type="button" class="scr-btn">Resend all retryable</button>
      </div>
    </div>

    <div class="scr-kpis" style="margin-bottom: 14px">
      <div class="scr-stat"><span class="scr-stat-label">Sent · 7 d</span><span class="scr-stat-value">318</span><span class="scr-stat-delta">text 201 · email 117</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Delivered</span><span class="scr-stat-value">311</span><span class="scr-stat-delta" data-tone="safe">97.8%</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Failed</span><span class="scr-stat-value">5</span><span class="scr-stat-delta" data-tone="danger">3 bad numbers</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Still trying</span><span class="scr-stat-value">2</span><span class="scr-stat-delta" data-tone="warn">next attempt in 12 min</span></div>
    </div>

    <table class="scr-table">
      <thead><tr><th>Message</th><th>To</th><th>Failed</th><th>Why</th><th>Owner</th><th></th></tr></thead>
      <tbody>
        <tr v-for="e in rows" :key="e.msg + e.to">
          <td><span class="scr-strong">{{ e.msg }}</span><span class="scr-item-sub">{{ e.channel }}</span></td>
          <td>{{ e.to }}<span class="scr-item-sub scr-num">{{ e.addr }}</span></td>
          <td class="scr-num scr-muted">{{ e.at }}</td>
          <td><span class="scr-pill" :data-tone="e.tone">{{ e.why }}</span></td>
          <td :class="{ 'scr-muted': !e.owner }">{{ e.owner || 'Nobody yet' }}</td>
          <td><button type="button" class="scr-btn scr-btn--sm" :class="{ 'scr-btn--ghost': !e.retry }">{{ e.retry ? 'Resend' : 'Fix contact' }}</button></td>
        </tr>
      </tbody>
    </table>
    <p class="scr-micro scr-muted" style="margin-top: 8px">A failure stays here until someone owns it and it either lands or the contact is corrected on the customer.</p>
  </div>
</template>

<script setup lang="ts">
const rows = [
  { msg: 'Fuel dock closes 18:00 Sunday', channel: 'Announcement · text', to: 'Two Cats', addr: '+1 305 555 0000', at: '3 Oct, 16:02', why: 'Number not in service', tone: 'danger', owner: '', retry: false },
  { msg: 'Fuel dock closes 18:00 Sunday', channel: 'Announcement · text', to: 'Osprey · Mike Chen', addr: '+1 786 555 0151', at: '3 Oct, 16:02', why: 'Carrier rejected', tone: 'warn', owner: 'Rosa Delgado', retry: true },
  { msg: 'Payment reminder · $1,240.00', channel: 'Template · email', to: 'Marlin II · J. Barros', addr: 'jbarros@oldmail.example', at: '3 Oct, 09:00', why: 'Mailbox does not exist', tone: 'danger', owner: 'Priya Nair', retry: false },
  { msg: 'Pre-arrival · Kestrel', channel: 'Template · text', to: 'Chris Park', addr: '+1 305 555 0199', at: '3 Oct, 08:15', why: 'No answer from provider', tone: 'warn', owner: 'You', retry: true },
  { msg: 'Renewal offer · 2026–27', channel: 'Template · email', to: 'Halcyon · Dana Whitfield', addr: 'dana.w@example.com', at: '28 Sep, 10:00', why: 'Bounced, mailbox full', tone: 'warn', owner: '', retry: true },
]
</script>
