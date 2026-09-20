<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Reservation board</h1>
        <p class="scr-sub">Assign across berth and time in one grid. Planning & berths · phase 2.</p>
      </div>
      <div class="scr-row"><span class="scr-pill">Scaffold</span><button class="scr-btn scr-btn--ghost scr-btn--sm">Arrivals</button></div>
    </div>

    <div class="scr-split">
      <div class="scr-card">
        <div class="scr-row scr-row--between"><h2 class="scr-card-title">Dock C · 14 – 20 Oct</h2><span class="scr-small scr-muted">drag a stay onto a berth; refusals are named</span></div>
        <div class="scr-table-wrap">
          <table class="scr-table rb-table">
            <thead><tr><th>Berth</th><th v-for="d in days" :key="d" class="scr-num" style="text-align: center">{{ d }}</th></tr></thead>
            <tbody>
              <tr v-for="r in grid" :key="r.berth">
                <td class="scr-num scr-strong">{{ r.berth }}</td>
                <td v-for="(c, i) in r.cells" :key="i"><span v-if="c" class="rb-cell" :data-tone="c.tone">{{ c.name }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="scr-card">
        <h2 class="scr-card-title">Without a berth</h2>
        <p class="scr-sub scr-small">Confirmed, nothing held. Drop one on the grid.</p>
        <div class="scr-divider"></div>
        <div v-for="u in unassigned" :key="u.name" class="scr-row scr-row--between rb-row">
          <div><span class="scr-item-title">{{ u.name }}</span><span class="scr-item-sub">{{ u.line }}</span></div>
          <span class="scr-pill" :data-tone="u.tone">{{ u.fit }}</span>
        </div>
        <div class="scr-alert" data-tone="danger" style="margin-top: 10px">
          <ScrIcon name="x" />
          <div><strong>Refused: Sea Change → C-13</strong>C-13 is 45 ft LOA; Sea Change states 55 ft. The service refused by name; nothing was moved.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
type Cell = { name: string; tone?: string } | null
const days = ['14', '15', '16', '17', '18', '19', '20']
const A = (name: string, tone?: string): Cell => ({ name, tone })
const grid: { berth: string; cells: Cell[] }[] = [
  { berth: 'C-12', cells: [A('Serenity', 'offline'), A('Serenity', 'offline'), A('Serenity', 'offline'), A('Serenity', 'offline'), A('Serenity', 'offline'), A('Serenity', 'offline'), A('Serenity', 'offline')] },
  { berth: 'C-13', cells: [null, null, null, null, A('Meridian'), A('Meridian'), A('Meridian')] },
  { berth: 'C-14', cells: [A('Wanderer'), A('Wanderer'), A('Wanderer'), null, null, null, null] },
  { berth: 'C-15', cells: [A('Closed', 'danger'), A('Closed', 'danger'), A('Closed', 'danger'), A('Closed', 'danger'), null, null, null] },
  { berth: 'C-16', cells: [A('Courtesy', 'safe'), A('Courtesy', 'safe'), A('Courtesy', 'safe'), A('Courtesy', 'safe'), A('Courtesy', 'safe'), A('Courtesy', 'safe'), A('Courtesy', 'safe')] },
  { berth: 'C-2', cells: [null, A('Blue Heron'), null, null, null, null, null] },
]
const unassigned = [
  { name: 'Sea Change · 55 ft', line: '14–20 Oct · 6 nights · draft 5.2 ft', fit: '3 berths fit', tone: 'safe' },
  { name: 'Osprey · 36 ft', line: '14–15 Oct · 1 night', fit: '11 berths fit', tone: 'safe' },
  { name: 'Northern Light · 84 ft', line: '16–19 Oct · 3 nights', fit: 'Face dock only', tone: 'warn' },
]
</script>

<style scoped>
.rb-table td { padding: 4px 6px; }
.rb-cell { display: block; padding: 3px 6px; border-radius: 5px; background: var(--wave-100); color: var(--wave-700); font-size: 11px; font-weight: 600; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rb-cell[data-tone='offline'] { background: var(--ink-100); color: var(--ink-500); }
.rb-cell[data-tone='safe'] { background: #e6f5ea; color: #1f6d36; }
.rb-cell[data-tone='danger'] { background: #fbe6e5; color: #9b2620; }
.rb-row { padding: 8px 0; }
.rb-row + .rb-row { border-top: 1px solid var(--ink-100); }
</style>
