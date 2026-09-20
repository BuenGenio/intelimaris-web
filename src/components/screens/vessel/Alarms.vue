<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Alarm centre</h1><p class="scr-sub scr-small">Decide what the vessel is allowed to wake you for, and see what is armed right now.</p></div>
      <span class="scr-pill" data-tone="warn">Scaffold</span>
    </div>
    <div class="scr-row al-actions"><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Underway</button></div>

    <section class="scr-section al-first">
      <p class="scr-ov">Navigation alarms</p>
      <p class="scr-small scr-muted al-desc">Each reads a source that may be absent. A disabled toggle states why.</p>
      <div class="scr-list">
        <div v-for="a in NAV" :key="a.name" class="scr-item scr-item--plain al-row">
          <span>
            <span class="scr-item-title">{{ a.name }} <span class="scr-pill" :data-tone="a.tone">{{ a.state }}</span></span>
            <span class="scr-item-sub">{{ a.detail }}</span>
            <span class="scr-item-sub scr-micro">Source · {{ a.source }}</span>
          </span>
          <button type="button" class="scr-switch" :class="{ 'is-on': a.armed }" :disabled="a.absent" :aria-label="`Arm ${a.name}`" :title="a.absent ? a.detail : undefined" @click="a.armed = !a.armed"></button>
        </div>
      </div>
    </section>

    <section class="scr-section">
      <div class="scr-row scr-row--between"><p class="scr-ov">Sensor alarms</p><span class="scr-pill scr-pill--bare" data-tone="info">Sample</span></div>
      <p class="scr-small scr-muted al-desc">Raised by the platform from readings and predictions. Severity is data; a Tier 1 takes the screen.</p>
      <div class="scr-list">
        <div v-for="s in SENSOR" :key="s.name" class="scr-item">
          <span class="scr-item-icon" :data-tone="s.tone"><ScrIcon :name="s.icon" /></span>
          <span><span class="scr-item-title">{{ s.name }}</span><span class="scr-item-sub">{{ s.where }} · {{ s.age }}</span></span>
          <span class="scr-item-end"><span class="scr-pill" :data-tone="s.tone">{{ s.tier }}</span><ScrIcon name="chevron" /></span>
        </div>
      </div>
      <p class="scr-micro scr-muted al-foot">No alarm lane exists yet (DEV-257). Open one to see the Tier 1 screen.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const NAV = reactive([
  { name: 'Anchor drag', state: 'Cannot arm', tone: 'offline', detail: 'Set from Anchor watch. Off — nothing is watching.', source: 'Device fix', armed: false, absent: true },
  { name: 'Depth below margin', state: 'Armed', tone: 'safe', detail: 'Fires when under-keel drops below your 2.0 ft margin.', source: 'Sounder channel · 4 s ago', armed: true, absent: false },
  { name: 'Route deviation', state: 'Armed', tone: 'safe', detail: 'Fires 0.1 NM off the planned corridor.', source: 'Planned passage + fix', armed: true, absent: false },
  { name: 'AIS CPA', state: 'Cannot arm', tone: 'offline', detail: 'No AIS feed on this vessel. The alarm has nothing to watch.', source: 'AIS feed', armed: false, absent: true },
])
const SENSOR = [
  { name: 'Smoke detected', where: 'Engine room · IM-DEMO-0001', age: '12 s ago', tier: 'Tier 1', tone: 'danger', icon: 'alert' },
  { name: 'House battery low', where: 'House bank · 11.8 V', age: '4 min ago', tier: 'Tier 2', tone: 'warn', icon: 'battery' },
  { name: 'Bilge pump cycling', where: 'Aft bilge · 6 cycles/h', age: '38 min ago', tier: 'Tier 3', tone: '', icon: 'drop' },
]
</script>

<style scoped>
.al-actions { margin: -6px 0 4px; }
.al-first { margin-top: 8px; }
.al-desc { margin-bottom: 8px; }
.al-row { align-items: center; }
.al-row .scr-pill { margin-left: 4px; vertical-align: 1px; }
.scr-switch:disabled { opacity: 0.4; cursor: not-allowed; }
.al-foot { margin-top: 8px; }
</style>
