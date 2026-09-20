<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Accounting exports</h1>
        <p class="scr-sub">Mapped, retryable, and reconcilable against the ledger.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><button type="button" class="scr-btn scr-btn--ghost">Account mapping</button><button type="button" class="scr-btn scr-btn--primary">Run an export</button></div>
    </div>

    <div class="scr-split">
      <div>
        <table class="scr-table">
          <thead><tr><th>Run</th><th>Period</th><th>To</th><th>Documents</th><th>Status</th><th></th></tr></thead>
          <tbody>
            <tr v-for="r in runs" :key="r.run" :class="{ 'is-selected': r.run === 'EXP-0092' }">
              <td class="scr-num scr-strong">{{ r.run }}<span class="scr-item-sub">{{ r.when }}</span></td>
              <td class="scr-num">{{ r.period }}</td>
              <td>{{ r.to }}</td>
              <td class="scr-num">{{ r.docs }}</td>
              <td><span class="scr-pill" :data-tone="r.tone">{{ r.status }}</span></td>
              <td><button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">{{ r.tone === 'danger' ? 'Retry' : 'Open' }}</button></td>
            </tr>
          </tbody>
        </table>
        <p class="scr-micro scr-muted" style="margin-top: 8px">A run is idempotent per document: retrying sends only what did not land. Nothing is exported twice.</p>
      </div>

      <div class="scr-stack">
        <div class="scr-card">
          <div class="scr-row scr-row--between"><p class="scr-card-title" style="margin: 0">EXP-0092 · 1–13 Oct</p><span class="scr-pill" data-tone="danger">2 rejected</span></div>
          <p class="scr-micro scr-muted">To QuickBooks Online · run 14 Oct 02:00 · 118 documents</p>
          <div class="scr-divider"></div>
          <div class="scr-kv"><span>Invoices</span><span class="scr-num">64 sent</span></div>
          <div class="scr-kv"><span>Receipts</span><span class="scr-num">41 sent</span></div>
          <div class="scr-kv"><span>Credit notes</span><span class="scr-num">5 sent</span></div>
          <div class="scr-kv"><span>Deposits</span><span class="scr-num">6 sent · <span style="color: var(--danger)">2 rejected</span></span></div>
          <div class="scr-alert" data-tone="danger" style="margin-top: 10px">
            <ScrIcon name="alert" />
            <span><strong>DEP-0918 and DEP-0921: no liability account mapped</strong>"Customer deposits" has no counterpart in the chart of accounts. Map it and retry; the 116 that landed are not resent.</span>
          </div>
          <div class="scr-row" style="margin-top: 12px">
            <button type="button" class="scr-btn scr-btn--primary scr-btn--sm">Retry the 2</button>
            <button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Fix the mapping</button>
          </div>
        </div>
        <div class="scr-card">
          <p class="scr-card-title">Mapping</p>
          <div class="scr-kv"><span>Berthing revenue</span><span class="scr-num">4010</span></div>
          <div class="scr-kv"><span>Utilities recovery</span><span class="scr-num">4030</span></div>
          <div class="scr-kv"><span>Sales tax payable</span><span class="scr-num">2200</span></div>
          <div class="scr-kv"><span>Customer deposits</span><span class="scr-pill" data-tone="danger">Unmapped</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const runs = [
  { run: 'EXP-0092', when: '14 Oct 02:00', period: '1–13 Oct 2026', to: 'QuickBooks Online', docs: '118', status: '2 rejected', tone: 'danger' },
  { run: 'EXP-0091', when: '7 Oct 02:00', period: '1–6 Oct 2026', to: 'QuickBooks Online', docs: '52', status: 'Landed', tone: 'safe' },
  { run: 'EXP-0090', when: '1 Oct 02:00', period: 'September 2026', to: 'QuickBooks Online', docs: '431', status: 'Landed', tone: 'safe' },
  { run: 'EXP-0089', when: '1 Oct 02:00', period: 'September 2026', to: 'CSV · auditor', docs: '431', status: 'Landed', tone: 'safe' },
  { run: 'EXP-0088', when: '15 Sep 02:00', period: '1–14 Sep 2026', to: 'QuickBooks Online', docs: '204', status: 'Landed after retry', tone: 'safe' },
  { run: 'EXP-0087', when: '1 Sep 02:00', period: 'August 2026', to: 'QuickBooks Online', docs: '398', status: 'Landed', tone: 'safe' },
]
</script>
