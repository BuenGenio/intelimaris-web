<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Tasks</h1>
        <p class="scr-sub">Assignee, due time, and evidence it was done.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <span class="scr-pill">7 open</span>
        <button type="button" class="scr-btn scr-btn--primary">New task</button>
      </div>
    </div>

    <div class="scr-toolbar">
      <div class="scr-tabs" style="max-width: 360px">
        <button v-for="t in tabs" :key="t" type="button" class="scr-tab" :class="{ 'is-on': tab === t }" @click="tab = t">{{ t }}</button>
      </div>
      <span class="scr-spacer"></span>
      <span class="scr-chip">Assignee: Anyone</span>
      <span class="scr-chip">Due: Today</span>
    </div>

    <table class="scr-table">
      <thead><tr><th></th><th>Task</th><th>Where</th><th>Assignee</th><th>Due</th><th>Evidence</th></tr></thead>
      <tbody>
        <tr v-for="t in shown" :key="t.title">
          <td style="width: 34px"><span class="scr-check" :class="{ 'is-on': t.done }"><ScrIcon v-if="t.done" name="check" /></span></td>
          <td><span class="scr-strong">{{ t.title }}</span><span class="scr-item-sub">{{ t.kind }}</span></td>
          <td class="scr-muted">{{ t.where }}</td>
          <td><span class="scr-row" style="gap: 6px"><span class="scr-avatar" style="width: 24px; height: 24px; font-size: 10px">{{ t.initials }}</span>{{ t.who }}</span></td>
          <td class="scr-num"><span class="scr-pill scr-pill--bare" :data-tone="t.dueTone">{{ t.due }}</span></td>
          <td class="scr-muted scr-small">{{ t.evidence }}</td>
        </tr>
      </tbody>
    </table>
    <p class="scr-micro scr-muted" style="margin-top: 8px">A task closes with evidence — a photo, a reading or a sentence — not with a tick alone.</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const tabs = ['Open', 'Done today', 'All']
const tab = ref('Open')
const rows = [
  { title: 'Restore shore power at C-14', kind: 'Electrical', where: 'C dock', who: 'Luis Ortega', initials: 'LO', due: '14:00', dueTone: 'danger', evidence: 'Photo of pedestal reading', done: false },
  { title: 'Cone off B dock finger', kind: 'Safety', where: 'B-03', who: 'Marcus Lee', initials: 'ML', due: 'Done 08:10', dueTone: 'safe', evidence: '2 photos', done: true },
  { title: 'Replace pump-out coupling', kind: 'Plumbing', where: 'D dock cart', who: 'Marcus Lee', initials: 'ML', due: 'Yesterday', dueTone: 'high', evidence: 'None yet', done: false },
  { title: 'Read meters on C dock', kind: 'Utilities', where: 'C-01 to C-20', who: 'Sam Miller', initials: 'SM', due: '16:00', dueTone: 'warn', evidence: '20 readings', done: false },
  { title: 'Restock absorbent pads', kind: 'Supplies', where: 'Fuel dock', who: 'Sam Miller', initials: 'SM', due: '17:00', dueTone: undefined, evidence: 'Count on the shelf', done: false },
  { title: 'Check T-head lines before the wind', kind: 'Dock walk', where: 'A dock', who: 'Rosa Delgado', initials: 'RD', due: '21:00', dueTone: undefined, evidence: 'Walk record', done: false },
  { title: 'Send gate code to Wanderer', kind: 'Guest', where: 'C-14', who: 'Rosa Delgado', initials: 'RD', due: 'Done 13:22', dueTone: 'safe', evidence: 'Message delivered', done: true },
]
const shown = computed(() => (tab.value === 'Open' ? rows.filter((r) => !r.done) : tab.value === 'Done today' ? rows.filter((r) => r.done) : rows))
</script>
