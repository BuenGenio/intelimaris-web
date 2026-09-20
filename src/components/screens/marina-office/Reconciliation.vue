<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Reconciliation</h1>
        <p class="scr-sub">Provider, terminal and bank against what was recorded.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><span class="scr-chip"><ScrIcon name="calendar" /> 13 Oct 2026</span><button type="button" class="scr-btn scr-btn--primary">Close the day</button></div>
    </div>

    <div class="scr-grid-3">
      <div v-for="s in sources" :key="s.name" class="scr-card">
        <div class="scr-row scr-row--between"><p class="scr-card-title" style="margin: 0">{{ s.name }}</p><span class="scr-pill" :data-tone="s.tone">{{ s.state }}</span></div>
        <p class="scr-micro scr-muted" style="margin-bottom: 8px">{{ s.sub }}</p>
        <div class="scr-kv"><span>Recorded here</span><span class="scr-num">{{ s.recorded }}</span></div>
        <div class="scr-kv"><span>{{ s.name }} says</span><span class="scr-num">{{ s.reported }}</span></div>
        <div class="scr-kv"><span class="scr-strong">Difference</span><span class="scr-num scr-strong" :style="s.diff !== '$0.00' ? 'color: var(--danger)' : ''">{{ s.diff }}</span></div>
      </div>
    </div>

    <div class="scr-section">
      <p class="scr-h3">Unmatched items</p>
      <table class="scr-table">
        <thead><tr><th>Source</th><th>Reference</th><th>What it looks like</th><th class="scr-num">Amount</th><th>Suggested match</th><th></th></tr></thead>
        <tbody>
          <tr v-for="u in unmatched" :key="u.ref">
            <td>{{ u.source }}</td>
            <td class="scr-num scr-strong">{{ u.ref }}</td>
            <td>{{ u.what }}</td>
            <td class="scr-num">{{ u.amount }}</td>
            <td><span v-if="u.match" class="scr-num">{{ u.match }}</span><span v-else class="scr-muted">None</span></td>
            <td><button type="button" class="scr-btn scr-btn--sm" :class="u.match ? 'scr-btn--primary' : ''">{{ u.match ? 'Match' : 'Record' }}</button></td>
          </tr>
        </tbody>
      </table>
      <p class="scr-micro scr-muted" style="margin-top: 8px">The day cannot close with a difference. Cash was counted at 17:40 by Front desk; the terminal batch settled at 23:05.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const sources = [
  { name: 'Card provider', sub: 'Stripe · batch of 13 Oct · 19 charges', state: 'Matched', tone: 'safe', recorded: '$4,206.40', reported: '$4,206.40', diff: '$0.00' },
  { name: 'Terminal', sub: 'Office terminal · 7 taps', state: '1 unmatched', tone: 'warn', recorded: '$1,118.20', reported: '$1,163.20', diff: '$45.00' },
  { name: 'Bank', sub: 'Operating account · 3 transfers in', state: '1 unmatched', tone: 'warn', recorded: '$1,770.00', reported: '$3,540.00', diff: '$1,770.00' },
]
const unmatched = [
  { source: 'Terminal', ref: 'T-13-0042 · 16:12', what: 'Visa ···8811 · contactless', amount: '$45.00', match: '' },
  { source: 'Bank', ref: 'ACH 2026-10-13-07', what: 'Transfer from Ruiz Charters', amount: '$1,770.00', match: 'INV-2026-0416 · remaining half' },
  { source: 'Recorded', ref: 'RCP-3392', what: 'Cash · walk-in · fuel dock', amount: '$400.00', match: '' },
]
</script>
