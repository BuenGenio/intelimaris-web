<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Announcements</h1>
        <p class="scr-sub">A reviewable recipient group — "vessels on Dock B" — not a blind send.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <button type="button" class="scr-btn scr-btn--primary">New announcement</button>
      </div>
    </div>

    <div class="scr-split">
      <div class="scr-card">
        <p class="scr-card-title">Draft · Wind tonight</p>
        <div class="scr-grid-2" style="margin-bottom: 10px">
          <div class="scr-field"><span class="scr-label">Recipients</span><select class="scr-select"><option>Vessels alongside on A dock and the T-head</option><option>Everyone alongside tonight</option><option>Residents only</option><option>Vessels on Dock B</option></select></div>
          <div class="scr-field"><span class="scr-label">Channel</span><select class="scr-select"><option>Text, email copy</option><option>Email only</option><option>In-app only</option></select></div>
        </div>
        <div class="scr-field"><span class="scr-label">Message</span><textarea class="scr-textarea" style="min-height: 90px">Wind 25 kn from the east expected after 22:00 tonight. Please double up bow lines and check fenders on the piling side. Night desk is on VHF 71 and +1 954 555 0140.</textarea></div>
        <div class="scr-alert" style="margin-top: 10px"><ScrIcon name="users" /><div><strong>14 recipients, reviewed before send</strong>11 by text, 3 by email only (no phone on file). 2 vessels on A dock have no contact at all and are listed below.</div></div>
        <ul style="margin-top: 8px">
          <li v-for="r in recipients" :key="r.vessel" class="scr-kv"><span><span class="scr-strong">{{ r.vessel }}</span> · {{ r.berth }} · {{ r.who }}</span><span class="scr-pill" :data-tone="r.tone">{{ r.how }}</span></li>
        </ul>
        <div class="scr-row" style="margin-top: 12px"><button type="button" class="scr-btn scr-btn--primary">Send to 14</button><button type="button" class="scr-btn scr-btn--ghost">Save draft</button></div>
      </div>

      <div class="scr-card">
        <p class="scr-card-title">Sent</p>
        <ul class="scr-timeline">
          <li v-for="s in sent" :key="s.title" class="scr-tl">
            <span class="scr-dot" :data-tone="s.tone"></span>
            <div><span class="scr-strong">{{ s.title }}</span><span class="scr-item-sub">{{ s.to }} · {{ s.delivered }}</span></div>
            <span class="scr-micro scr-muted scr-num">{{ s.at }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const recipients = [
  { vessel: 'Halcyon', berth: 'A-01 T-head', who: 'Dana Whitfield', how: 'Text', tone: 'safe' },
  { vessel: 'Two Cats', berth: 'A-04', who: 'Owner unknown', how: 'No contact', tone: 'danger' },
  { vessel: 'Osprey', berth: 'A-06', who: 'Mike Chen', how: 'Email only', tone: 'warn' },
  { vessel: 'Wanderer', berth: 'C-14 (tonight)', who: 'Sam Miller', how: 'Text', tone: 'safe' },
]
const sent = [
  { title: 'Fuel dock closes 18:00 Sunday', to: 'Everyone alongside · 61', delivered: '58 delivered, 3 failed', tone: 'warn', at: '3 Oct' },
  { title: 'Pump-out cart out of service, D dock', to: 'Vessels on Dock D · 22', delivered: '22 delivered', tone: 'safe', at: '2 Oct' },
  { title: 'Renewal window opens', to: 'Residents · 48', delivered: '48 delivered', tone: 'safe', at: '28 Sep' },
  { title: 'Tropical storm watch lifted', to: 'Everyone alongside · 70', delivered: '69 delivered, 1 failed', tone: 'warn', at: '19 Sep' },
]
</script>
