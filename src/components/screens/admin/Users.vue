<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">People</h1>
        <p class="scr-sub">Everyone the platform knows: every membership, plus everyone who has written a profile. Names and countries come from a profile a person may never have filled in — a blank here is an absence, not a fact about them.</p>
      </div>
    </div>

    <div class="scr-toolbar scr-row--wrap">
      <input class="scr-input scr-input--search" placeholder="Display name or user id…" aria-label="Search people by display name or user id" style="max-width: 280px" />
      <button type="button" class="scr-chip">Role: Any role <span aria-hidden="true">⌄</span></button>
      <button type="button" class="scr-chip">In a: Any workspace <span aria-hidden="true">⌄</span></button>
      <button type="button" class="scr-chip is-on">Country: United States <span aria-hidden="true">⌄</span></button>
      <button type="button" class="scr-chip">Membership <span aria-hidden="true">⌄</span></button>
    </div>
    <p class="scr-micro scr-muted" style="margin-bottom: 8px">1 of 7 on this page belong to no workspace.</p>

    <div class="scr-split" style="grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr)">
      <div>
        <table class="scr-table" aria-label="Everyone the platform knows">
          <thead><tr><th>Person</th><th>Country</th><th>Belongs to</th><th>Roles held</th><th>Last joined</th></tr></thead>
          <tbody>
            <tr v-for="p in people" :key="p.id" :class="{ 'is-selected': p.id === 'u_7f3a' }">
              <td><span :class="p.name ? 'scr-strong' : 'scr-muted'" :style="p.name ? '' : 'font-style: italic'">{{ p.name ?? 'No display name' }}</span> <span class="scr-micro scr-muted scr-num">{{ p.id }}</span></td>
              <td class="scr-small scr-muted" style="white-space: nowrap">{{ p.country }}</td>
              <td class="scr-small scr-muted" :style="p.world === 'No workspace' ? 'font-style: italic' : ''">{{ p.world }}</td>
              <td><span class="scr-chips"><span v-for="r in p.roles" :key="r" class="scr-pill" :data-tone="r === 'Owner' ? 'info' : undefined">{{ r }}</span><span v-if="p.roles.length === 0" class="scr-muted">—</span></span></td>
              <td class="scr-small scr-muted scr-num">{{ p.joined }}</td>
            </tr>
          </tbody>
        </table>
        <div class="scr-row scr-row--between" style="margin-top: 8px">
          <span class="scr-micro scr-muted">Showing 1–7 of 2,418</span>
          <span class="scr-row" style="gap: 6px"><button type="button" class="scr-btn scr-btn--sm" disabled>Previous</button><button type="button" class="scr-btn scr-btn--sm">Next</button></span>
        </div>
      </div>

      <aside class="scr-card scr-card--flush">
        <div class="scr-row scr-row--between" style="padding: 12px 14px; border-bottom: 1px solid var(--ink-200)">
          <div><h2 class="scr-h3">Sam Miller</h2><p class="scr-micro scr-muted scr-num">u_7f3a2c91-4e0b-4b7e-9a1d-3c5f8e2a6b10</p></div>
          <button type="button" class="scr-btn scr-btn--sm scr-btn--icon" aria-label="Close"><ScrIcon name="x" /></button>
        </div>
        <div style="padding: 12px 14px">
          <dl class="scr-grid-2" style="gap: 10px 12px; padding-bottom: 12px; border-bottom: 1px solid var(--ink-200)">
            <div><dt class="scr-ov">Country</dt><dd class="scr-small">🇺🇸 United States</dd></div>
            <div><dt class="scr-ov">Home port</dt><dd class="scr-small">Fort Lauderdale</dd></div>
            <div><dt class="scr-ov">Profile</dt><dd class="scr-small">Public</dd></div>
            <div><dt class="scr-ov">First joined</dt><dd class="scr-small">3 Mar 2026</dd></div>
          </dl>
          <p class="scr-ov" style="margin-top: 12px">Workspaces (2)</p>
          <div class="scr-stack scr-stack--tight" style="margin-top: 8px">
            <div v-for="w in memberships" :key="w.slug" class="scr-card" style="padding: 10px 12px">
              <div class="scr-row scr-row--wrap" style="gap: 8px"><span class="scr-dot" :style="{ background: w.colour }"></span><a class="scr-strong" style="color: var(--ink-900)">{{ w.name }}</a><span class="scr-pill" :data-tone="w.tone">{{ w.role }}</span></div>
              <p class="scr-micro scr-muted" style="margin-top: 4px"><span class="scr-num">{{ w.slug }}</span> · joined {{ w.joined }}</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const people: { id: string; name: string | null; country: string; world: string; roles: string[]; joined: string }[] = [
  { id: 'u_7f3a', name: 'Sam Miller', country: '🇺🇸 United States', world: 'Vessel and Private marina', roles: ['Owner'], joined: '29 Sep 2026' },
  { id: 'u_91be', name: 'Jordan Miller', country: '🇺🇸 United States', world: 'Vessel and Private marina', roles: ['Member', 'Viewer'], joined: '29 Sep 2026' },
  { id: 'u_c04d', name: 'Maria Ortega', country: '🇺🇸 United States', world: 'Marina', roles: ['Dockmaster'], joined: '18 Jan 2026' },
  { id: 'u_2e77', name: 'Dev Patel', country: '🇺🇸 United States', world: 'Marina', roles: ['Front desk'], joined: '2 Feb 2026' },
  { id: 'u_5a19', name: 'Luis Ferreira', country: '🇺🇸 United States', world: 'Maintenance', roles: ['Technician'], joined: '7 May 2026' },
  { id: 'u_d3c8', name: null, country: '🇺🇸 United States', world: 'No workspace', roles: [], joined: '—' },
  { id: 'u_8b42', name: 'Nina Rossi', country: '🇺🇸 United States', world: 'Business', roles: ['Admin'], joined: '22 Apr 2026' },
]
const memberships = [
  { name: 'Wanderer', slug: 'wanderer', role: 'Owner', tone: 'info', colour: '#4274bb', joined: '3 Mar 2026' },
  { name: 'Isle of Venice dock', slug: 'isle-of-venice-dock', role: 'Owner', tone: 'info', colour: '#1f6e5e', joined: '29 Sep 2026' },
]
</script>
