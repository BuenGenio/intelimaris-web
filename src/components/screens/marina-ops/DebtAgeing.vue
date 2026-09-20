<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Debt and ageing</h1>
        <p class="scr-sub">Who owes what, for how long, with a way in.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <span class="scr-pill" data-tone="danger">$22,385 outstanding</span>
        <button type="button" class="scr-btn">Send reminders</button>
      </div>
    </div>

    <div class="scr-kpis" style="margin-bottom: 14px">
      <div class="scr-stat"><span class="scr-stat-label">Current</span><span class="scr-stat-value">$9,410</span><span class="scr-stat-delta">not yet due</span></div>
      <div class="scr-stat"><span class="scr-stat-label">1–30 days</span><span class="scr-stat-value">$6,120</span><span class="scr-stat-delta" data-tone="warn">5 accounts</span></div>
      <div class="scr-stat"><span class="scr-stat-label">31–60 days</span><span class="scr-stat-value">$3,615</span><span class="scr-stat-delta" data-tone="high">2 accounts</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Over 60 days</span><span class="scr-stat-value">$3,240</span><span class="scr-stat-delta" data-tone="danger">1 account · on hold</span></div>
    </div>

    <div class="scr-card" style="margin-bottom: 14px">
      <p class="scr-card-title">Ageing profile</p>
      <div class="scr-bars">
        <div v-for="b in buckets" :key="b.name"><span>{{ b.name }}</span><div class="scr-progress"><i :style="{ width: `${b.pct}%`, background: b.color }"></i></div><span class="scr-num">${{ b.amount }}</span></div>
      </div>
    </div>

    <table class="scr-table">
      <thead><tr><th>Customer</th><th>Vessel · berth</th><th class="scr-num">Owed</th><th>Oldest</th><th>Last chased</th><th>Way in</th></tr></thead>
      <tbody>
        <tr v-for="d in rows" :key="d.who">
          <td><span class="scr-strong">{{ d.who }}</span><span class="scr-item-sub">{{ d.contact }}</span></td>
          <td class="scr-muted">{{ d.vessel }}</td>
          <td class="scr-num scr-strong">${{ d.owed }}</td>
          <td><span class="scr-pill" :data-tone="d.tone">{{ d.oldest }}</span></td>
          <td class="scr-muted">{{ d.chased }}</td>
          <td><span class="scr-row" style="gap: 4px"><button type="button" class="scr-btn scr-btn--sm scr-btn--icon" aria-label="Call"><ScrIcon name="phone" /></button><button type="button" class="scr-btn scr-btn--sm scr-btn--icon" aria-label="Message"><ScrIcon name="message" /></button><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Statement</button></span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const buckets = [
  { name: 'Current', pct: 42, amount: '9,410', color: 'var(--safe)' },
  { name: '1–30 days', pct: 27, amount: '6,120', color: 'var(--warn)' },
  { name: '31–60 days', pct: 16, amount: '3,615', color: 'var(--high)' },
  { name: 'Over 60', pct: 15, amount: '3,240', color: 'var(--danger)' },
]
const rows = [
  { who: 'J. Barros', contact: 'jbarros@oldmail.example · bounced', vessel: 'Marlin II · C-13', owed: '3,240', oldest: '74 days', tone: 'danger', chased: '3 Oct · email failed' },
  { who: 'Ana Ruiz Charters LLC', contact: '+1 305 555 0188', vessel: 'Blue Heron · D-02', owed: '2,410', oldest: '48 days', tone: 'high', chased: '29 Sep · text' },
  { who: 'Dana Whitfield', contact: 'dana.w@example.com', vessel: 'Halcyon · A-01', owed: '1,205', oldest: '35 days', tone: 'high', chased: 'Never' },
  { who: 'Mike Chen', contact: 'mike.chen@example.com', vessel: 'Osprey · A-06', owed: '2,880', oldest: '22 days', tone: 'warn', chased: '1 Oct · email' },
  { who: 'Chris Park', contact: '+1 305 555 0199', vessel: 'Kestrel · unassigned', owed: '1,650', oldest: '12 days', tone: 'warn', chased: 'Never' },
  { who: 'Sam Miller', contact: 'sam@example.com', vessel: 'Wanderer · C-14', owed: '412', oldest: 'Not due', tone: 'safe', chased: '—' },
]
</script>
