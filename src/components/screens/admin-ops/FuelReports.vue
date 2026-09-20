<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <div class="scr-row"><h1 class="scr-h1">Fuel reports</h1><span class="scr-pill" data-tone="warn">Scaffold</span></div>
        <p class="scr-sub">What vessels say they paid at one place — each report its own claim, a count and an age per grade, never an average. Name a place to read its lane.</p>
      </div>
    </div>

    <div class="scr-alert" data-tone="warn" role="note">
      <ScrIcon name="wrench" />
      <span><strong>Scaffold — no lane behind this yet. DEV-393</strong>The read is the public per-place lane, as written; there is no browse across places yet. Clear is the operator's moderation lane — a note is required and recorded against your account, and the community's own clear stays a separate act.</span>
    </div>

    <div class="scr-toolbar">
      <span class="scr-input scr-input--search fr-search scr-num">bahia-mar-fuel-dock</span>
      <span class="scr-chip">Status · Every report <span aria-hidden="true">⌄</span></span>
      <span class="scr-spacer"></span>
      <span class="scr-small scr-muted">5 active reports</span>
    </div>

    <ul class="scr-chips fr-grades">
      <li v-for="g in grades" :key="g" class="scr-chip">{{ g }}</li>
    </ul>

    <table class="scr-table">
      <thead><tr><th>Grade</th><th class="scr-num">Reported price</th><th>Reported</th><th class="scr-num">Confirmed</th><th>Status</th><th>Note</th><th>Moderate</th></tr></thead>
      <tbody>
        <tr v-for="r in reports" :key="r.id">
          <td><strong>{{ r.grade }}</strong></td>
          <td class="scr-num">{{ r.price }}</td>
          <td class="scr-small scr-muted">{{ r.reported }}</td>
          <td class="scr-num">{{ r.confirmations }}</td>
          <td><span class="scr-pill" :data-tone="r.tone">{{ r.status }}</span></td>
          <td class="scr-small scr-muted">{{ r.note || '—' }}</td>
          <td>
            <span v-if="r.status === 'cleared'" class="scr-small scr-muted">Cleared</span>
            <div v-else-if="r.id === clearing" class="scr-stack scr-stack--tight fr-clear">
              <div class="scr-textarea fr-textarea scr-muted">Why this report is false or stale — required</div>
              <div class="scr-row"><button type="button" class="scr-btn scr-btn--primary scr-btn--sm" disabled>Clear it</button><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm" @click="clearing = ''">Keep</button></div>
            </div>
            <button v-else type="button" class="scr-btn scr-btn--sm" @click="clearing = r.id">Clear</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const clearing = ref('')
const grades = ['Diesel — 3 reports, latest 2.5 h ago', 'Gasoline — 2 reports, latest 40 min ago', 'Ethanol-free — no reports']
const reports = [
  { id: 'f1', grade: 'Gasoline', price: '5.89 per gal', reported: '40 minutes ago', confirmations: 2, status: 'confirmed', tone: 'safe', note: 'Pump 3, non-ethanol was out' },
  { id: 'f2', grade: 'Diesel', price: '4.62 per gal', reported: '2 hours ago', confirmations: 4, status: 'confirmed', tone: 'safe', note: '' },
  { id: 'f3', grade: 'Diesel', price: '4.55 per gal', reported: '19 hours ago', confirmations: 0, status: 'reported', tone: 'warn', note: 'Cash price at the high-speed pump' },
  { id: 'f4', grade: 'Gasoline', price: '5.79 per gal', reported: '2 days ago', confirmations: 1, status: 'expiring', tone: 'warn', note: '' },
  { id: 'f5', grade: 'Diesel', price: '3.99 per gal', reported: '3 days ago', confirmations: 0, status: 'cleared', tone: 'offline', note: 'Typo — pump receipt says 4.59' },
]
</script>

<style scoped>
.fr-search { flex: 1; display: flex; align-items: center; min-width: 0; }
.fr-grades { margin-bottom: 12px; }
.fr-grades .scr-chip { cursor: default; }
.fr-clear { min-width: 200px; }
.fr-textarea { min-height: 48px; font-size: 11.5px; }
</style>
