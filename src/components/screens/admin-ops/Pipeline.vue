<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Pipeline</h1>
        <p class="scr-sub">What the populator is supposed to do and what it actually did: how often each layer refreshes, when it last managed it, and what it retrieved. Cadence limits are the sources' own — the control offers only what the platform will accept.</p>
      </div>
    </div>

    <div class="scr-toolbar">
      <span class="scr-input pi-region scr-muted">Region — florida, show, bs…</span>
      <span class="scr-spacer"></span>
      <span class="scr-small scr-muted">5 layers, 4 refreshing.</span>
    </div>

    <div class="scr-table-wrap">
      <table class="scr-table">
        <thead><tr><th>Layer</th><th>Upstream</th><th>Cadence</th><th>Run</th><th>Next</th><th>Last run</th></tr></thead>
        <tbody>
          <tr v-for="r in layers" :key="r.id">
            <td><span class="pi-col"><strong class="scr-small scr-num">{{ r.id }} — {{ r.region }}</strong><span class="scr-small scr-muted">{{ r.what }}</span></span></td>
            <td><span class="pi-col"><span v-for="u in r.upstream" :key="u" class="scr-small scr-muted">{{ u }}</span><span class="scr-micro scr-muted">no faster than {{ r.floor }}</span></span></td>
            <td><span class="scr-select pi-select">{{ r.cadence }} <span aria-hidden="true">⌄</span></span></td>
            <td><span class="pi-col"><button type="button" class="scr-btn scr-btn--sm" :disabled="r.run !== 'Refresh now'">{{ r.run }}</button><span v-if="r.notice" class="scr-micro scr-muted">{{ r.notice }}</span></span></td>
            <td><span class="scr-pill" :data-tone="r.nextTone">{{ r.next }}</span></td>
            <td>
              <span v-if="r.last" class="pi-col">
                <span class="scr-row"><span class="scr-pill" :data-tone="r.last.tone">{{ r.last.outcome }}</span><span class="scr-small scr-muted">{{ r.last.when }}</span></span>
                <span v-if="r.last.detail" class="scr-micro scr-muted scr-num">{{ r.last.detail }}</span>
                <span v-if="r.last.error" class="scr-micro pi-error">{{ r.last.error }}</span>
              </span>
              <span v-else class="scr-small scr-muted">Never run</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2 class="scr-h3 scr-section pi-h">Recent runs</h2>
    <table class="scr-table">
      <thead><tr><th>Layer</th><th>Outcome</th><th>Started</th><th>Asked by</th><th>Retrieved</th></tr></thead>
      <tbody>
        <tr v-for="run in runs" :key="run.id">
          <td><strong class="scr-small scr-num">{{ run.layer }}</strong></td>
          <td><span class="scr-pill" :data-tone="run.tone">{{ run.outcome }}</span></td>
          <td class="scr-small scr-muted">{{ run.started }}</td>
          <td class="scr-small scr-muted">{{ run.by }}</td>
          <td class="scr-small scr-muted scr-num">{{ run.detail }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const layers = [
  { id: 'bridges', region: 'florida', what: 'Bridges and their closed clearances along the ICW corridors', upstream: ['NOAA ENC — bridge and cable features', 'OpenStreetMap — bridge nodes'], floor: 'weekly', cadence: 'Weekly', run: 'Refresh now', notice: '', next: 'Due in 3 days', nextTone: 'safe', last: { outcome: 'Succeeded', tone: 'safe', when: '4 days ago', detail: 'bridges 41 · updated 2 · unchanged 39', error: '' } },
  { id: 'lnm-events', region: 'florida', what: 'Closures and restrictions from the Local Notice to Mariners', upstream: ['USCG District 7 — LNM weekly'], floor: 'daily', cadence: 'Daily', run: 'Running', notice: '', next: 'Running now', nextTone: 'info', last: { outcome: 'Running', tone: 'info', when: '2 minutes ago', detail: '', error: '' } },
  { id: 'places', region: 'florida', what: 'Fuel docks, pump-outs and dock-and-dine places', upstream: ['OpenStreetMap — amenity and seamark tags'], floor: 'daily', cadence: 'Daily', run: 'Queued', notice: 'Asked 6 minutes ago — the next tick will pick it up.', next: 'Queued 6 minutes ago', nextTone: 'info', last: { outcome: 'Failed', tone: 'danger', when: '1 day ago', detail: '', error: 'Overpass timed out after 180 s' } },
  { id: 'depth-cells', region: 'florida', what: 'Sounded depth per H3 cell from the survey lane', upstream: ['NOAA BlueTopo — bathymetry tiles', 'WaterWayz surveys — own soundings'], floor: '6-hourly', cadence: '6-hourly', run: 'Refresh now', notice: '', next: 'Due in 2 hours', nextTone: 'safe', last: { outcome: 'Succeeded', tone: 'safe', when: '4 hours ago', detail: 'cells 18 402 · resounded 1 210', error: '' } },
  { id: 'marinas', region: 'show', what: 'Marina outlines and berth counts for the show basin', upstream: ['Curated — operator corrections'], floor: 'daily', cadence: 'Off', run: 'Refresh now', notice: '', next: 'Off', nextTone: 'offline', last: null },
]
const runs = [
  { id: 'r1', layer: 'lnm-events — florida', outcome: 'Running', tone: 'info', started: '2 minutes ago', by: 'The schedule', detail: '' },
  { id: 'r2', layer: 'depth-cells — florida', outcome: 'Succeeded', tone: 'safe', started: '4 hours ago', by: 'The schedule', detail: 'cells 18 402 · resounded 1 210' },
  { id: 'r3', layer: 'places — florida', outcome: 'Failed', tone: 'danger', started: '1 day ago', by: 'sam@example.com', detail: 'Overpass timed out after 180 s' },
  { id: 'r4', layer: 'lnm-events — florida', outcome: 'Nothing to do', tone: 'offline', started: '1 day ago', by: 'The schedule', detail: 'LNM 41/26 already applied' },
  { id: 'r5', layer: 'bridges — florida', outcome: 'Succeeded', tone: 'safe', started: '4 days ago', by: 'An operator', detail: 'bridges 41 · updated 2 · unchanged 39' },
]
</script>

<style scoped>
.pi-region { width: 240px; }
.pi-col { display: grid; gap: 2px; }
.pi-select { width: auto; min-width: 110px; min-height: 32px; padding: 5px 9px; font-size: 12px; display: inline-flex; justify-content: space-between; gap: 8px; }
.pi-error { color: var(--danger); }
.pi-h { margin-bottom: 8px; }
</style>
