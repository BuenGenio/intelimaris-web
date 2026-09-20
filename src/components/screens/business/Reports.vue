<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Reports</h1>
        <p class="scr-sub">What vessels say about you — first-hand and perishable. A count and an age, never a score.</p>
      </div>
      <span class="scr-pill" data-tone="accent">5 live</span>
    </div>

    <div class="scr-split">
      <div class="scr-card">
        <h2 class="scr-card-title">Active reports</h2>
        <p class="scr-small scr-muted">Each expires on its kind's clock unless another vessel confirms it. Who filed is never shown.</p>
        <ul class="scr-stack scr-stack--tight" style="margin-top: 10px">
          <li v-for="r in active" :key="r.kind + r.age" class="rep-row">
            <span class="scr-strong">{{ r.kind }}</span>
            <span v-if="r.value">{{ r.value }}</span>
            <span class="scr-small scr-muted">{{ r.age }}</span>
            <span v-if="r.confirmations" class="scr-small scr-muted">confirmed {{ r.confirmations }} {{ r.confirmations === 1 ? 'time' : 'times' }}</span>
            <span class="scr-spacer"></span>
            <span class="scr-pill" :data-tone="r.tone">{{ r.status }}</span>
            <span v-if="r.note" class="scr-small scr-muted" style="width: 100%">{{ r.note }}</span>
          </li>
        </ul>
        <p class="scr-micro scr-muted" style="margin-top: 10px">Only the newest are shown.</p>
      </div>

      <div class="scr-card">
        <h2 class="scr-card-title">By kind</h2>
        <p class="scr-small scr-muted">Every kind your category takes, with who has said so and how recently.</p>
        <ul class="scr-stack scr-stack--tight" style="margin-top: 10px">
          <li v-for="k in kinds" :key="k.label" class="rep-row">
            <span style="flex: 1; min-width: 0"><span class="scr-strong">{{ k.label }}</span><br /><span class="scr-small scr-muted">{{ k.line }}</span></span>
            <span class="scr-pill" :data-tone="k.count > 0 ? 'accent' : 'offline'">{{ k.count }}</span>
          </li>
        </ul>
      </div>
    </div>

    <p class="scr-small scr-muted scr-section">A wrong report is cleared by an operator, not edited by anyone. A wrong price is answered by publishing your own — both then stand with their own authors.</p>
  </div>
</template>
<script setup lang="ts">
const kinds = [
  { label: 'Courtesy berth free', line: '3 vessels say · newest 2 hours ago', count: 3 },
  { label: 'Approach depth', line: '1 vessel says · newest 3 days ago', count: 1 },
  { label: 'Fuel price', line: '4 vessels say · newest 5 hours ago', count: 4 },
  { label: 'Closed on arrival', line: 'Nobody has said so yet', count: 0 },
  { label: 'Dock full', line: 'Nobody has said so yet', count: 0 },
]
const active = [
  { kind: 'Courtesy berth free', value: '', age: '2 hours ago', confirmations: 2, status: 'Active', tone: 'safe', note: '' },
  { kind: 'Fuel price', value: '$4.75 per gal (diesel)', age: '5 hours ago', confirmations: 2, status: 'Active', tone: 'safe', note: '' },
  { kind: 'Courtesy berth free', value: '', age: '9 hours ago', confirmations: 0, status: 'Active', tone: 'safe', note: 'Two berths open at 6 PM on a Sunday.' },
  { kind: 'Fuel price', value: '$4.89 per gal (diesel)', age: '45 hours ago', confirmations: 0, status: 'Expiring', tone: 'warn', note: '' },
  { kind: 'Approach depth', value: '6.5 ft', age: '3 days ago', confirmations: 1, status: 'Expiring', tone: 'warn', note: 'Sounded 3 d ago at low water, inside the last marker.' },
]
</script>
<style scoped>
.rep-row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; padding: 9px 0; border-top: 1px solid var(--ink-100); }
.rep-row:first-child { border-top: 0; padding-top: 0; }
</style>
