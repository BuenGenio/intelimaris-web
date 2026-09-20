<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Handover</h1>
        <p class="scr-sub">What the next shift must know: risks, late arrivals, commitments.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <span class="scr-pill">Day → Night · 4 Oct</span>
        <button type="button" class="scr-btn scr-btn--primary">Hand over at 18:00</button>
      </div>
    </div>

    <div class="scr-split">
      <div class="scr-stack">
        <div class="scr-card">
          <p class="scr-card-title">Risks</p>
          <p class="scr-sub scr-small" style="margin-bottom: 6px">Anything that can go wrong before morning, and what to do if it does.</p>
          <ul class="scr-list" style="border: 0">
            <li v-for="r in risks" :key="r.title" class="scr-item" style="padding-inline: 0">
              <span class="scr-item-icon" :data-tone="r.tone"><ScrIcon name="alert" /></span>
              <div><span class="scr-item-title">{{ r.title }}</span><span class="scr-item-sub">{{ r.sub }}</span></div>
              <span class="scr-pill" :data-tone="r.tone">{{ r.pill }}</span>
            </li>
          </ul>
        </div>
        <div class="scr-card">
          <p class="scr-card-title">Late arrivals</p>
          <p class="scr-sub scr-small" style="margin-bottom: 6px">Past their ETA, or expected after the office closes.</p>
          <table class="scr-table">
            <thead><tr><th>Vessel</th><th>ETA</th><th>Berth</th><th>Note</th></tr></thead>
            <tbody>
              <tr><td class="scr-strong">Wanderer · 42 ft Sabre</td><td class="scr-num">21:30</td><td>C-14</td><td class="scr-muted">Pedestal fixed at 15:10; gate code sent to Sam Miller</td></tr>
              <tr><td class="scr-strong">Blue Heron · 38 ft</td><td class="scr-num">Was 16:00</td><td>D-02</td><td class="scr-muted">No contact since 14:00; call +1 305 555 0177 before releasing</td></tr>
              <tr><td class="scr-strong">Kestrel · 55 ft</td><td class="scr-num">Tomorrow 08:00</td><td>Unassigned</td><td class="scr-muted">Needs 6 ft; D-05 or D-06 once Sea Change moves</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="scr-stack">
        <div class="scr-card">
          <p class="scr-card-title">Commitments made today</p>
          <ul>
            <li v-for="c in commitments" :key="c" class="scr-kv"><span class="scr-check is-on"><ScrIcon name="check" /></span><span style="flex: 1; text-align: left">{{ c }}</span></li>
          </ul>
        </div>
        <div class="scr-card">
          <p class="scr-card-title">Note for the night desk</p>
          <textarea class="scr-textarea" style="min-height: 96px">Fuel dock closed 18:00; pump-out hose still leaking, use the D dock cart. Marcus has the incident phone.</textarea>
          <p class="scr-hint" style="margin-top: 6px">Signed off by Rosa Delgado · read by nobody yet</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const risks = [
  { title: 'Wind 25 kn from the east after 22:00', sub: 'Check lines on the T-head and the two catamarans on A dock', tone: 'warn', pill: 'Weather' },
  { title: 'B dock finger without anti-slip', sub: 'Cones out; contractor booked 07:00', tone: 'danger', pill: 'Open incident' },
  { title: 'Pedestal C-12 tripped twice last week', sub: 'Guest cord replaced; if it trips again, move the vessel to C-16', tone: 'low', pill: 'Watch' },
]
const commitments = [
  'Sea Change moves to D-07 by 15:00 tomorrow, no charge for the move',
  'Sam Miller gets the late-arrival gate code by text before 20:00',
  'Kestrel gets a 6 ft berth tomorrow morning or a call by 07:30',
  'Coconuts dock-and-dine berths held for the 19:00 seating',
]
</script>
