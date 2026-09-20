<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Sensor fleet</h1>
        <p class="scr-sub">Unit identities leave the line here: serial in, claim code out. Binding to a vessel happens in the owner's workspace with that code, not in this console.</p>
      </div>
    </div>

    <div class="scr-card" style="margin-bottom: 12px">
      <h2 class="scr-h3 scr-row" style="margin-bottom: 8px"><ScrIcon name="plus" /> Provision a unit</h2>
      <div class="scr-grid-2">
        <label class="scr-field"><span class="scr-label">Serial (the label on the box)</span><input class="scr-input" placeholder="IM-2026-0042" /></label>
        <label class="scr-field"><span class="scr-label">Hardware revision (optional)</span><input class="scr-input" placeholder="r2" /></label>
      </div>
      <div class="scr-row" style="margin-top: 10px"><button type="button" class="scr-btn scr-btn--sm scr-btn--primary">Provision</button></div>
      <div class="scr-alert" data-tone="safe" style="margin-top: 10px">
        <ScrIcon name="check" />
        <div><strong>IM-2026-0311 provisioned — this claim code goes on the box, and this is the moment to write it down.</strong><span class="scr-num" style="font-family: monospace; font-size: 15px; letter-spacing: 0.08em">KQ7N-4W2D</span></div>
      </div>
    </div>

    <div class="scr-toolbar scr-row--wrap">
      <input class="scr-input scr-input--search" placeholder="Serial or claim code — what is printed on the box" aria-label="Search the fleet by serial or claim code" style="max-width: 340px" />
      <button type="button" class="scr-chip">Status <span aria-hidden="true">⌄</span></button>
      <button type="button" class="scr-chip">Binding <span aria-hidden="true">⌄</span></button>
      <span class="scr-micro scr-muted" style="margin-left: auto">312 units · active 241 · provisioned 58 · disabled 9 · retired 4</span>
    </div>

    <div class="scr-table-wrap">
      <table class="scr-table" aria-label="The sensor fleet">
        <thead><tr><th>Serial</th><th>Status</th><th>Claim code</th><th>Hardware</th><th>Bound to</th><th>Change status</th></tr></thead>
        <tbody>
          <tr v-for="u in units" :key="u.serial">
            <td class="scr-strong scr-num" style="font-family: monospace">{{ u.serial }}</td>
            <td><span class="scr-pill" :data-tone="TONE[u.status]" :title="HELP[u.status]">{{ u.status }}</span></td>
            <td class="scr-num scr-muted" style="font-family: monospace">{{ u.code }}</td>
            <td class="scr-small scr-muted">{{ u.hw }}</td>
            <td><span v-if="u.bound" class="scr-small"><span class="scr-strong">{{ u.bound }}</span><span class="scr-micro scr-muted"> · since {{ u.since }}</span></span><span v-else class="scr-muted" title="Not bound to any vessel">on the shelf</span></td>
            <td><span v-if="u.status === 'retired'" class="scr-micro scr-muted" :title="HELP.retired">final</span><select v-else class="scr-select" style="min-height: 30px; padding: 3px 8px; width: auto" :aria-label="`Change status of ${u.serial}`"><option>{{ u.status }} →</option><option v-for="n in NEXT[u.status]" :key="n">{{ n }}</option></select></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const TONE: Record<string, string> = { provisioned: 'offline', active: 'safe', disabled: 'warn', retired: 'danger' }
const HELP: Record<string, string> = {
  provisioned: 'Registered, not yet commissioned — no binding, no ingest.',
  active: 'Commissioned and allowed to ingest.',
  disabled: 'Temporarily blocked — ingest refused by name, reversible.',
  retired: 'Permanently out of service — history stays, ingest never returns.',
}
const NEXT: Record<string, string[]> = { provisioned: ['active', 'retired'], active: ['disabled', 'retired'], disabled: ['active', 'retired'], retired: [] }
const units = [
  { serial: 'IM-2026-0311', status: 'provisioned', code: 'KQ7N-4W2D', hw: 'r2', bound: null, since: '' },
  { serial: 'IM-2026-0042', status: 'active', code: 'H3ZP-9M6T', hw: 'r2', bound: 'Wanderer · bilge', since: '14 Mar 2026' },
  { serial: 'IM-2026-0043', status: 'active', code: 'B8RW-2K1F', hw: 'r2', bound: 'Wanderer · battery bank', since: '14 Mar 2026' },
  { serial: 'IM-2026-0044', status: 'active', code: 'X4LC-7D8Q', hw: 'r2', bound: 'Wanderer · engine bay', since: '15 Mar 2026' },
  { serial: 'IM-2025-0918', status: 'disabled', code: 'T2VN-5G3J', hw: 'r1', bound: 'Sea Fever · bilge', since: '2 Nov 2025' },
  { serial: 'IM-2025-0602', status: 'retired', code: 'M9QA-1R4Y', hw: 'r1', bound: null, since: '' },
  { serial: 'IM-2026-0288', status: 'provisioned', code: 'P6JD-3S7W', hw: 'r2', bound: null, since: '' },
  { serial: 'IM-2026-0197', status: 'active', code: 'C1UE-8N2H', hw: 'r2', bound: 'Halcyon · shore power', since: '20 Aug 2026' },
]
</script>
