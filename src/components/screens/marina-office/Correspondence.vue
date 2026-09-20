<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Correspondence</h1>
        <p class="scr-sub">Every message this customer was sent, and whether it arrived.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><button type="button" class="scr-btn scr-btn--primary">Send a message</button></div>
    </div>

    <div class="scr-split">
      <div>
        <div class="scr-toolbar">
          <input class="scr-input scr-input--search" style="max-width: 280px" placeholder="Customer, vessel or subject" aria-label="Search correspondence" />
          <span class="scr-chip is-on">All channels</span>
          <span class="scr-chip">Email</span>
          <span class="scr-chip">SMS</span>
          <span class="scr-chip">Failed</span>
        </div>
        <table class="scr-table">
          <thead><tr><th>Sent</th><th>To</th><th>Subject</th><th>Channel</th><th>Delivery</th></tr></thead>
          <tbody>
            <tr v-for="m in messages" :key="m.sent + m.subject" :class="{ 'is-selected': m.selected }">
              <td class="scr-num scr-muted">{{ m.sent }}</td>
              <td class="scr-strong">{{ m.to }}</td>
              <td>{{ m.subject }}<span class="scr-item-sub">{{ m.kind }}</span></td>
              <td>{{ m.channel }}</td>
              <td><span class="scr-pill" :data-tone="m.tone">{{ m.delivery }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="scr-card">
        <div class="scr-row scr-row--between"><p class="scr-card-title" style="margin: 0">Arrival instructions · C-14</p><span class="scr-pill" data-tone="safe">Opened</span></div>
        <p class="scr-micro scr-muted">To Sam Miller · sam@example.com · sent 14 Oct 2026 09:12 by Dockmaster</p>
        <div class="scr-divider"></div>
        <p style="margin-bottom: 8px">Hi Sam, Wanderer is in C-14 from Friday 16 Oct. Approach depth 8 ft MLLW at the fuel dock; call on VHF 71 when you pass the Bahia Mar bridge and a hand will meet you on the finger. Power is 50 A on the port side.</p>
        <p class="scr-micro scr-muted">Template: Arrival instructions · merged fields: berth, dates, VHF, power</p>
        <div class="scr-timeline" style="margin-top: 10px">
          <div class="scr-tl"><span class="scr-dot" data-tone="safe"></span><span>Queued</span><span class="scr-num scr-muted">09:12</span></div>
          <div class="scr-tl"><span class="scr-dot" data-tone="safe"></span><span>Accepted by provider</span><span class="scr-num scr-muted">09:12</span></div>
          <div class="scr-tl"><span class="scr-dot" data-tone="safe"></span><span>Delivered</span><span class="scr-num scr-muted">09:13</span></div>
          <div class="scr-tl"><span class="scr-dot" data-tone="safe"></span><span>Opened</span><span class="scr-num scr-muted">09:41</span></div>
        </div>
        <div class="scr-row" style="margin-top: 10px">
          <button type="button" class="scr-btn scr-btn--sm">Resend</button>
          <button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Open the customer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const messages = [
  { sent: '14 Oct 09:12', to: 'Sam Miller', subject: 'Arrival instructions · C-14', kind: 'Template · Arrival instructions', channel: 'Email', delivery: 'Opened', tone: 'safe', selected: true },
  { sent: '13 Oct 17:30', to: 'Sam Miller', subject: 'Your stay is confirmed · 16–19 Oct', kind: 'Booking confirmation', channel: 'SMS', delivery: 'Delivered', tone: 'safe', selected: false },
  { sent: '13 Oct 08:05', to: 'Blue Water Yacht Management', subject: 'Insurance expires 19 Oct · Halcyon', kind: 'Document reminder', channel: 'Email', delivery: 'Delivered', tone: 'safe', selected: false },
  { sent: '12 Oct 11:48', to: 'Tom Okafor', subject: 'Invoice INV-2026-0412 · $486.00', kind: 'Invoice', channel: 'Email', delivery: 'Bounced', tone: 'danger', selected: false },
  { sent: '11 Oct 16:20', to: 'Ana Ruiz', subject: 'Slip agreement renewal · C-11', kind: 'Renewal notice', channel: 'Email', delivery: 'Sent', tone: 'info', selected: false },
  { sent: '10 Oct 07:00', to: 'All residents', subject: 'Fuel dock closed Sat 07:00–11:00', kind: 'Announcement', channel: 'SMS', delivery: '61 of 64 delivered', tone: 'warn', selected: false },
]
</script>
