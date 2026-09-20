<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Storm prep</h1>
        <p class="scr-sub">Weather is coming. Move everyone who is exposed, somewhere they can actually get to.</p>
      </div>
      <div class="scr-row"><span class="scr-pill">Scaffold</span><span class="scr-pill" data-tone="warn">Tropical storm watch</span><button class="scr-btn scr-btn--ghost">Arrivals</button></div>
    </div>

    <div class="scr-alert" data-tone="warn">
      <ScrIcon name="alert" />
      <div><strong>NHC advisory 14 · 14 Oct 11:00</strong>Tropical storm conditions possible from Fri 16 Oct 18:00. Sustained 45 kn from the east; surge 2–4 ft. The face dock and Dock D are exposed.</div>
    </div>

    <div class="scr-kpis scr-section">
      <div class="scr-stat"><span class="scr-stat-label">Exposed</span><span class="scr-stat-value">47</span><span class="scr-stat-delta" data-tone="warn">vessels in exposed berths</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Can move inside</span><span class="scr-stat-value">31</span><span class="scr-stat-delta" data-tone="safe">fit found on A–C</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Need to leave</span><span class="scr-stat-value">9</span><span class="scr-stat-delta" data-tone="danger">no berth fits · haul-out or river</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Bridge window</span><span class="scr-stat-value">Thu 05:00</span><span class="scr-stat-delta">17th St · last low-tide opening</span></div>
    </div>

    <div class="scr-split scr-section">
      <div class="scr-card">
        <h2 class="scr-card-title">Affected vessels</h2>
        <p class="scr-sub scr-small">Every vessel in an exposed berth before the weather lands, resolved berth by berth.</p>
        <div class="scr-divider"></div>
        <div v-for="v in vessels" :key="v.name" class="scr-row sp-row">
          <span class="scr-check" :class="{ 'is-on': v.on }"><ScrIcon v-if="v.on" name="check" /></span>
          <span class="scr-num scr-strong" style="width: 48px">{{ v.berth }}</span>
          <div style="min-width: 0; flex: 1"><span class="scr-item-title">{{ v.name }}</span><span class="scr-item-sub">{{ v.line }}</span></div>
          <span class="scr-pill" :data-tone="v.tone">{{ v.plan }}</span>
        </div>
        <p class="scr-micro scr-muted" style="margin-top: 8px">Showing 6 of 47. Refusals are shown as refusals and named, never silently dropped.</p>
      </div>
      <div class="scr-card">
        <h2 class="scr-card-title">The plan</h2>
        <p class="scr-sub scr-small">In this order. Plain language over technical: "air draft close to bridge clearance; wait for the tide window."</p>
        <ol class="scr-timeline" style="margin-top: 8px">
          <li v-for="(s, i) in steps" :key="s" class="scr-tl"><span class="scr-dot" :data-tone="i < 3 ? 'safe' : undefined"></span><span class="scr-small">{{ s }}</span><span class="scr-micro scr-muted scr-num">{{ i + 1 }}</span></li>
        </ol>
        <div class="scr-row" style="margin-top: 10px">
          <button class="scr-btn scr-btn--primary" disabled title="The bulk reassign lane is DEV-381's, after DEV-377 and DEV-379.">Reassign the selected set</button>
          <button class="scr-btn" disabled title="Undo as one operation needs DEV-379.">Undo</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const vessels = [
  { on: true, berth: 'D-2', name: 'Tidewater · 60 ft', line: 'draft 5.5 ft · air draft 24 ft', plan: 'To C-15 · fits', tone: 'safe' },
  { on: true, berth: 'D-8', name: 'Meridian · 62 ft', line: 'draft 6 ft · air draft 30 ft', plan: 'To B-30 · fits', tone: 'safe' },
  { on: true, berth: 'Face 2', name: 'Northern Light · 84 ft', line: 'draft 7 ft · air draft 55 ft', plan: 'Leave · no berth fits · river via 17th St', tone: 'danger' },
  { on: true, berth: 'D-5', name: 'Osprey II · 60 ft', line: 'at Lauderdale Marine Service · hauled', plan: 'Already out', tone: undefined },
  { on: false, berth: 'D-11', name: 'Kestrel · 31 ft', line: 'draft 4 ft · air draft 18 ft', plan: 'To A-4 · fits', tone: 'safe' },
  { on: true, berth: 'C-14', name: 'Wanderer · 42 ft', line: 'draft 4.6 ft · air draft 21 ft · arriving 17:40', plan: 'Sheltered · stays', tone: 'info' },
]
const steps = [
  'Filter to the vessels affected: exposed berths, arriving before it lands.',
  'Select the set.',
  'Ask where each one can go: berth fit for dimensions and services, the route engine for access at the tide and bridge windows.',
  'Reassign in bulk, with the refusals shown as refusals and named, never silently dropped.',
  'Notify the affected berth holders.',
  'Undo the whole thing as one operation if the forecast turns.',
]
</script>

<style scoped>
.sp-row { padding: 7px 0; }
.sp-row + .sp-row { border-top: 1px solid var(--ink-100); }
</style>
