<template>
  <section class="role-table-section editorial-shell" aria-labelledby="role-table-title">
    <h2 id="role-table-title" class="role-table-title">The more of the day you connect, the more you see.</h2>
    <div class="role-table-scroll">
      <table class="role-table">
        <caption class="sr-only">Which parts of the platform each role uses</caption>
        <template v-for="group in GROUPS" :key="group.title">
          <thead>
            <tr>
              <th scope="col" class="role-group"><span class="role-group-icon" aria-hidden="true"><ScrIcon :name="group.icon" /></span>{{ group.title }}</th>
              <th v-for="c in COLUMNS" :key="c.id" scope="col" class="role-col">{{ c.label }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="id in group.rows" :key="id">
              <th scope="row"><RouterLink :to="capabilityLink(id)">{{ label(id) }}</RouterLink></th>
              <td v-for="c in COLUMNS" :key="c.id" :style="{ '--cell': c.color }">
                <span v-if="c.features.has(id)" class="role-dot" role="img" :aria-label="`${c.label}: yes`"></span>
                <span v-else class="sr-only">{{ c.label }}: no</span>
              </td>
            </tr>
          </tbody>
        </template>
      </table>
    </div>
    <p class="role-table-note">From each role’s guide. Choose yours above to see it in full.</p>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
import { AUDIENCES } from '@/data/audiences'
import { capabilityLink, findCapability } from '@/data/capabilities'

/* The six perspectives of the role showcase, each the union of its roles' guides. */
const PERSPECTIVES = [
  { id: 'passage', label: 'Captains & guests', roles: ['captains', 'passengers'], color: '#93c7ea' },
  { id: 'vessel', label: 'Owners & crew', roles: ['fleet-owners', 'crew'], color: '#a5d3c6' },
  { id: 'marina', label: 'Marina teams', roles: ['marina-owners', 'marina-teams'], color: '#c6c3ee' },
  { id: 'service', label: 'Service & technicians', roles: ['maintenance'], color: '#ead0a6' },
  { id: 'dock', label: 'Private dock hosts', roles: ['private-docks'], color: '#b8d3df' },
  { id: 'business', label: 'Waterfront businesses', roles: ['waterfront-businesses'], color: '#d7dba4' },
]
const COLUMNS = PERSPECTIVES.map(p => ({ ...p, features: new Set(AUDIENCES.filter(a => p.roles.includes(a.id)).flatMap(a => a.features)) }))

const GROUPS = [
  { title: 'On the water', icon: 'compass', rows: ['navigation', 'route-planning', 'hazard-reporting', 'emergency-assistance'] },
  { title: 'Aboard', icon: 'vessel', rows: ['monitoring', 'maintenance'] },
  { title: 'Alongside', icon: 'anchor', rows: ['dockpass', 'marina-pms'] },
]
const label = (id: string) => findCapability(id)?.label ?? id
</script>

<style scoped>
.role-table-section { padding: 72px 0 24px; }
.role-table-title { text-align: center; margin: 0 auto 36px !important; max-width: 22ch; }
.role-table-scroll { overflow-x: auto; }
.role-table { width: 100%; min-width: 820px; border-collapse: separate; border-spacing: 3px; font-size: .9rem; }
.role-table thead th { padding: 26px 8px 8px; font-weight: 700; text-align: center; vertical-align: bottom; }
.role-table tbody + thead th { padding-top: 34px; }
.role-table .role-group { text-align: left; font-size: 1.15rem; white-space: nowrap; }
.role-group-icon { display: inline-grid; vertical-align: -5px; margin-right: 8px; color: var(--maris-deep); }
[data-theme='dark'] .role-group-icon { color: var(--maris-night); }
.role-group-icon :deep(svg) { width: 22px; height: 22px; }
.role-col { font-size: .82rem; width: 13%; }
.role-table tbody th { padding: 11px 16px; text-align: left; font-weight: 500; background: var(--surface-soft); }
.role-table tbody th a { color: var(--text-primary); text-decoration: none; }
.role-table tbody th a:hover { color: var(--domain-ink); text-decoration: underline; text-underline-offset: 3px; }
.role-table td { background: var(--cell); text-align: center; padding: 11px 6px; }
[data-theme='dark'] .role-table td { background: color-mix(in srgb, var(--cell) 55%, #0b1220); }
.role-dot { display: inline-block; width: 11px; height: 11px; border-radius: 50%; background: #0b1220; vertical-align: middle; }
[data-theme='dark'] .role-dot { background: #fff; }
.role-table-note { margin: 16px 0 0; text-align: center; font-size: .85rem; color: var(--text-muted); }
</style>
