<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Workspaces</h1>
        <p class="scr-sub">Every workspace on the platform, with the account it lives in and its members. Changes here act on someone else's tenancy and are recorded against your operator identity.</p>
      </div>
      <button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="activity" /> Refresh</button>
    </div>

    <div class="scr-toolbar">
      <input class="scr-input scr-input--search" placeholder="Name or slug…" aria-label="Search workspaces by name or slug" style="max-width: 320px" />
      <button type="button" class="scr-chip">Type: Any <span aria-hidden="true">⌄</span></button>
    </div>

    <table class="scr-table" aria-label="Every workspace on the platform">
      <thead><tr><th>Workspace</th><th>Type</th><th class="scr-num">Members</th><th>Created</th></tr></thead>
      <tbody>
        <tr v-for="w in rows" :key="w.slug">
          <td><span class="scr-strong">{{ w.name }}</span><div class="scr-small scr-muted scr-num">{{ w.slug }}</div></td>
          <td><span class="scr-pill scr-pill--bare" :style="{ background: w.bg, color: w.fg }">{{ w.type }}</span></td>
          <td class="scr-num">{{ w.members }}</td>
          <td class="scr-small scr-muted scr-num">{{ w.created }}</td>
        </tr>
      </tbody>
    </table>
    <div class="scr-row scr-row--between" style="margin-top: 8px">
      <span class="scr-micro scr-muted">Showing 1–8 of 1,208</span>
      <span class="scr-row" style="gap: 6px"><button type="button" class="scr-btn scr-btn--sm" disabled>Previous</button><button type="button" class="scr-btn scr-btn--sm">Next</button></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const K = {
  vessel: { type: 'Vessel', bg: '#dce6f4', fg: '#2b4c82' },
  marina: { type: 'Marina', bg: '#dff3f4', fg: '#0f6b72' },
  private: { type: 'Private marina', bg: '#e3f3f0', fg: '#1f6e5e' },
  business: { type: 'Business', bg: '#f7edd3', fg: '#7a5a08' },
  maintenance: { type: 'Maintenance', bg: '#f8e3dc', fg: '#8a341e' },
}
const rows = [
  { name: 'Wanderer', slug: 'wanderer', members: 2, created: '3 Mar 2026', ...K.vessel },
  { name: 'Bahia Mar', slug: 'bahia-mar', members: 14, created: '18 Jan 2026', ...K.marina },
  { name: 'Isle of Venice dock', slug: 'isle-of-venice-dock', members: 2, created: '29 Sep 2026', ...K.private },
  { name: 'Coconuts', slug: 'coconuts', members: 2, created: '22 Apr 2026', ...K.business },
  { name: 'Lauderdale Marine Service', slug: 'lauderdale-marine-service', members: 9, created: '7 May 2026', ...K.maintenance },
  { name: 'Pier Sixty-Six Marina', slug: 'pier-66', members: 21, created: '9 Dec 2025', ...K.marina },
  { name: 'Sea Fever', slug: 'sea-fever', members: 4, created: '11 Feb 2026', ...K.vessel },
  { name: 'Halcyon', slug: 'halcyon', members: 1, created: '6 Oct 2026', ...K.vessel },
]
</script>
