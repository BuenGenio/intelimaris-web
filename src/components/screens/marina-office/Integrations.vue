<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Integrations</h1>
        <p class="scr-sub">Accounting, payments and webhooks, with their failures visible.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><button type="button" class="scr-btn scr-btn--primary">Connect</button></div>
    </div>

    <div class="scr-grid-3">
      <div v-for="i in integrations" :key="i.name" class="scr-card">
        <div class="scr-row scr-row--between">
          <span class="scr-row" style="gap: 8px"><span class="scr-item-icon" :data-tone="i.tone === 'danger' ? 'danger' : 'accent'"><ScrIcon :name="i.icon" /></span><span><span class="scr-item-title">{{ i.name }}</span><span class="scr-item-sub">{{ i.role }}</span></span></span>
          <span class="scr-pill" :data-tone="i.tone">{{ i.state }}</span>
        </div>
        <div class="scr-divider"></div>
        <div class="scr-kv"><span>Last sync</span><span class="scr-num">{{ i.last }}</span></div>
        <div class="scr-kv"><span>Failures · 7 d</span><span class="scr-num" :style="i.failures !== '0' ? 'color: var(--danger)' : ''">{{ i.failures }}</span></div>
      </div>
    </div>

    <div class="scr-split scr-section">
      <div>
        <p class="scr-h3">Webhook deliveries</p>
        <table class="scr-table">
          <thead><tr><th>When</th><th>Event</th><th>To</th><th>Response</th><th>Status</th><th></th></tr></thead>
          <tbody>
            <tr v-for="d in deliveries" :key="d.when + d.event">
              <td class="scr-num scr-muted">{{ d.when }}</td>
              <td class="scr-num scr-strong">{{ d.event }}</td>
              <td>{{ d.to }}</td>
              <td class="scr-num">{{ d.response }}</td>
              <td><span class="scr-pill" :data-tone="d.tone">{{ d.status }}</span></td>
              <td><button v-if="d.tone === 'danger'" type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Retry</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="scr-card">
        <p class="scr-card-title">Endpoints</p>
        <div v-for="e in endpoints" :key="e.url" class="scr-kv" style="align-items: center"><span><span class="scr-num scr-strong" style="font-size: 12px">{{ e.url }}</span><span class="scr-item-sub">{{ e.events }}</span></span><span class="scr-pill" :data-tone="e.tone">{{ e.state }}</span></div>
        <div class="scr-alert" data-tone="danger" style="margin-top: 10px">
          <ScrIcon name="alert" />
          <span><strong>Channel manager has failed 6 times since 13 Oct 02:14</strong>Retries back off to every 4 hours; the endpoint is paused after 24 hours of failures and inventory stops syncing to it.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const integrations = [
  { name: 'QuickBooks Online', role: 'Accounting', icon: 'receipt', state: 'Connected', tone: 'safe', last: '14 Oct 02:00', failures: '2' },
  { name: 'Stripe', role: 'Payments and payouts', icon: 'lock', state: 'Connected', tone: 'safe', last: '4 min ago', failures: '0' },
  { name: 'Channel manager', role: 'Inventory to third-party sites', icon: 'radio', state: 'Failing', tone: 'danger', last: '13 Oct 02:14', failures: '6' },
  { name: 'Twilio', role: 'SMS delivery', icon: 'message', state: 'Connected', tone: 'safe', last: '11 min ago', failures: '0' },
  { name: 'Mailgun', role: 'Email delivery', icon: 'message', state: 'Connected', tone: 'safe', last: '2 min ago', failures: '1' },
  { name: 'Gate controller', role: 'Dock gate codes', icon: 'settings', state: 'Not connected', tone: 'offline', last: '—', failures: '—' },
]
const deliveries = [
  { when: '14 Oct 09:41', event: 'stay.confirmed', to: 'channel manager', response: '502 in 30.0 s', status: 'Failed', tone: 'danger' },
  { when: '14 Oct 09:41', event: 'stay.confirmed', to: 'ops.example/hooks', response: '200 in 0.3 s', status: 'Delivered', tone: 'safe' },
  { when: '14 Oct 09:12', event: 'message.sent', to: 'ops.example/hooks', response: '200 in 0.2 s', status: 'Delivered', tone: 'safe' },
  { when: '13 Oct 17:30', event: 'invoice.paid', to: 'ops.example/hooks', response: '200 in 0.4 s', status: 'Delivered', tone: 'safe' },
  { when: '13 Oct 06:14', event: 'berth.released', to: 'channel manager', response: '502 in 30.0 s', status: 'Failed', tone: 'danger' },
  { when: '12 Oct 10:04', event: 'receipt.taken', to: 'ops.example/hooks', response: '200 in 0.3 s', status: 'Delivered', tone: 'safe' },
]
const endpoints = [
  { url: 'https://ops.example/hooks/waterwayz', events: 'All events · signed', state: 'Healthy', tone: 'safe' },
  { url: 'https://cm.example/v2/inbound', events: 'stay.*, berth.* · signed', state: 'Failing', tone: 'danger' },
]
</script>
