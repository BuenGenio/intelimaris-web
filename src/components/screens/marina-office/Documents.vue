<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Documents</h1>
        <p class="scr-sub">Insurance and registration, with expiry that chases itself.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><button type="button" class="scr-btn scr-btn--primary"><ScrIcon name="plus" /> Request a document</button></div>
    </div>

    <div class="scr-kpis">
      <div class="scr-stat"><span class="scr-stat-label">On file</span><span class="scr-stat-value">118</span><span class="scr-stat-delta">across 64 vessels</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Expiring in 30 days</span><span class="scr-stat-value">7</span><span class="scr-stat-delta" data-tone="warn">4 reminders sent</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Expired</span><span class="scr-stat-value">3</span><span class="scr-stat-delta" data-tone="danger">2 vessels in the basin</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Missing</span><span class="scr-stat-value">5</span><span class="scr-stat-delta">no insurance on record</span></div>
    </div>

    <div class="scr-section">
      <div class="scr-toolbar">
        <div class="scr-tabs" style="max-width: 420px">
          <button v-for="t in tabs" :key="t" type="button" class="scr-tab" :class="{ 'is-on': tab === t }" @click="tab = t">{{ t }}</button>
        </div>
        <span class="scr-spacer"></span>
        <input class="scr-input scr-input--search" style="max-width: 240px" placeholder="Vessel or customer" aria-label="Search documents" />
      </div>
      <table class="scr-table">
        <thead><tr><th>Vessel</th><th>Customer</th><th>Document</th><th>Expires</th><th>Status</th><th></th></tr></thead>
        <tbody>
          <tr v-for="d in shown" :key="d.vessel + d.doc">
            <td class="scr-strong">{{ d.vessel }}</td>
            <td>{{ d.customer }}</td>
            <td>{{ d.doc }}<span class="scr-item-sub">{{ d.ref }}</span></td>
            <td class="scr-num">{{ d.expires }}</td>
            <td><span class="scr-pill" :data-tone="d.tone">{{ d.status }}</span></td>
            <td><button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">{{ d.tone === 'safe' ? 'View' : 'Remind' }}</button></td>
          </tr>
        </tbody>
      </table>
      <p class="scr-micro scr-muted" style="margin-top: 8px">A reminder goes out 30 days before expiry and again at 7; the vessel's next arrival is held until a current certificate is on file.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const tabs = ['All', 'Expiring', 'Expired', 'Missing']
const tab = ref('All')
const docs = [
  { vessel: 'Wanderer', customer: 'Sam Miller', doc: 'Hull insurance', ref: 'Chubb · policy 88-4412', expires: '2027-04-30', status: 'Current', tone: 'safe' },
  { vessel: 'Wanderer', customer: 'Sam Miller', doc: 'USCG documentation', ref: 'No. 1287744', expires: '2027-05-31', status: 'Current', tone: 'safe' },
  { vessel: 'Salt & Light', customer: 'Ana Ruiz Charters LLC', doc: 'Charter liability', ref: 'Markel · policy CL-2201', expires: '2026-10-28', status: 'Expires in 12 d', tone: 'warn' },
  { vessel: 'Halcyon', customer: 'Blue Water Yacht Management', doc: 'Hull insurance', ref: 'Pantaenius · 70-0193', expires: '2026-10-19', status: 'Expires in 3 d', tone: 'warn' },
  { vessel: 'Osprey', customer: 'Tom Okafor', doc: 'Hull insurance', ref: '', expires: '2026-09-30', status: 'Expired', tone: 'danger' },
  { vessel: 'Tidewater', customer: 'Priya Natarajan', doc: 'State registration', ref: 'FL 4471 PN', expires: '2026-08-31', status: 'Expired', tone: 'danger' },
  { vessel: 'Osprey', customer: 'Tom Okafor', doc: 'State registration', ref: '', expires: '—', status: 'Missing', tone: 'offline' },
]
const shown = computed(() => {
  if (tab.value === 'Expiring') return docs.filter((d) => d.tone === 'warn')
  if (tab.value === 'Expired') return docs.filter((d) => d.tone === 'danger')
  if (tab.value === 'Missing') return docs.filter((d) => d.tone === 'offline')
  return docs
})
</script>
