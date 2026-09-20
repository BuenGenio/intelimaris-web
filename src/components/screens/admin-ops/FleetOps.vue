<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Fleet operations</h1>
        <p class="scr-sub">Every vessel workspace on the platform, its sensor units, how long since each vessel last reported, and what the models claim about it. Composed from the workspace directory and the sensor fleet — each column reads its own source and fails on its own.</p>
      </div>
      <button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="activity" /> Refresh</button>
    </div>

    <div class="scr-toolbar">
      <span class="scr-input scr-input--search fo-search scr-muted">Workspace name or slug — vessel workspaces only</span>
    </div>

    <div class="scr-card">
      <div class="scr-row scr-row--between fo-cardhead">
        <h2 class="scr-h3 scr-row"><ScrIcon name="vessel" /> Vessel workspaces</h2>
        <span class="scr-small scr-muted scr-num">Showing 1–5 of 23</span>
      </div>
      <div class="scr-table-wrap">
        <table class="scr-table">
          <thead><tr><th>Workspace</th><th>Vessel</th><th>Units</th><th>Last uplink</th><th>Model claims</th></tr></thead>
          <tbody>
            <tr v-for="r in rows" :key="r.slug">
              <td><span class="fo-col"><strong>{{ r.workspace }}</strong><span class="scr-micro scr-muted scr-num">{{ r.slug }}</span><span class="scr-micro scr-muted">Vessel · {{ r.members }} {{ r.members === 1 ? 'member' : 'members' }}</span></span></td>
              <td><span v-if="r.vessel" class="fo-col"><strong>{{ r.vessel }}</strong><span class="scr-micro scr-muted scr-num">{{ r.detail }}</span></span><span v-else class="scr-small scr-muted">no vessel registered</span></td>
              <td>
                <span v-if="r.units.length" class="fo-col">
                  <span class="scr-row scr-row--wrap fo-units"><span v-for="u in r.units" :key="u.serial" class="scr-row fo-unit"><span class="scr-micro scr-muted scr-num">{{ u.serial }}</span><span class="scr-pill" :data-tone="u.tone">{{ u.status }}</span></span></span>
                  <span class="scr-micro scr-muted scr-num">{{ r.ingesting }} of {{ r.units.length }} may ingest</span>
                </span>
                <span v-else class="scr-small scr-muted">no unit bound</span>
              </td>
              <td>
                <span v-if="r.vessel" class="fo-col"><span class="scr-pill fo-self" :data-tone="r.freshTone">{{ r.fresh }}</span><span class="scr-micro scr-muted scr-num">{{ r.freshDetail }}</span></span>
                <span v-else class="scr-small scr-muted">no vessel registered</span>
              </td>
              <td>
                <span v-if="r.vessel" class="fo-col">
                  <span class="scr-row"><span class="scr-pill" :data-tone="r.claimTone">{{ r.claim }}</span><span v-if="r.claimCount" class="scr-micro scr-muted scr-num">{{ r.claimCount }}</span></span>
                  <span class="scr-micro scr-muted">{{ r.claimDetail }}</span>
                  <span v-if="r.model" class="scr-micro scr-muted scr-num">{{ r.model }}</span>
                </span>
                <span v-else class="scr-small scr-muted">no vessel registered</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="scr-row scr-row--between fo-foot">
        <span class="scr-micro scr-muted">3 provisioned units are bound to no vessel — they belong to no row here.<br />4 bound units sit in 2 workspaces this view is not showing — another page, a workspace this filter excludes, or one that is not a vessel workspace at all.</span>
        <div class="scr-row"><button type="button" class="scr-btn scr-btn--sm" disabled>Previous</button><button type="button" class="scr-btn scr-btn--sm">Next</button></div>
      </div>
    </div>

    <p class="scr-micro scr-muted fo-note"><ScrIcon name="radio" /> <span><strong>Model claims carry no severity.</strong> The sensors contract has no severity field — a prediction has a model-declared <span class="scr-num">kind</span> and an opaque <span class="scr-num">output</span>. Claims therefore read <span class="scr-num">unranked</span> unless a model declares a severity in its own payload, and this console never derives one from a score.</span></p>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const rows = [
  { workspace: 'Wanderer', slug: 'wanderer', members: 3, vessel: 'Wanderer', detail: 'Sabre sloop · 12.8 m LOA', units: [{ serial: 'IM-0417', status: 'active', tone: 'safe' }, { serial: 'IM-0418', status: 'active', tone: 'safe' }], ingesting: 2, fresh: 'live', freshTone: 'safe', freshDetail: '4 min ago · 9 channels', claim: 'warning', claimTone: 'warn', claimCount: 'worst of 3', claimDetail: 'bilge_rate: rising 0.8 L/min over 40 min', model: 'bilge-trend@1.4 · Oct 14, 2026, 2:10 PM' },
  { workspace: 'Sea Change', slug: 'sea-change', members: 2, vessel: 'Sea Change', detail: 'Catamaran · 13.7 m LOA', units: [{ serial: 'IM-0391', status: 'active', tone: 'safe' }], ingesting: 1, fresh: 'recent', freshTone: 'warn', freshDetail: '2 h ago · 6 channels', claim: 'unranked', claimTone: 'offline', claimCount: '1 claim', claimDetail: 'battery_health: 0.92', model: 'battery-soh@2.0 · Oct 14, 2026, 11:52 AM' },
  { workspace: 'Blue Heron', slug: 'blue-heron', members: 1, vessel: 'Blue Heron', detail: 'Trawler · 11.2 m LOA', units: [{ serial: 'IM-0402', status: 'disabled', tone: 'warn' }], ingesting: 0, fresh: 'stale', freshTone: 'danger', freshDetail: '6 d ago · 4 channels', claim: 'no claims', claimTone: 'offline', claimCount: '', claimDetail: 'the AI loop has written nothing back yet', model: '' },
  { workspace: 'Osprey', slug: 'osprey', members: 4, vessel: 'Osprey', detail: 'Sportfish · 16.5 m LOA', units: [], ingesting: 0, fresh: 'never', freshTone: 'offline', freshDetail: 'has never reported', claim: 'no claims', claimTone: 'offline', claimCount: '', claimDetail: 'the AI loop has written nothing back yet', model: '' },
  { workspace: 'Kestrel', slug: 'kestrel', members: 1, vessel: '', detail: '', units: [{ serial: 'IM-0420', status: 'provisioned', tone: 'offline' }], ingesting: 0, fresh: '', freshTone: '', freshDetail: '', claim: '', claimTone: '', claimCount: '', claimDetail: '', model: '' },
]
</script>

<style scoped>
.fo-search { flex: 1; display: flex; align-items: center; min-width: 0; }
.fo-cardhead { padding-bottom: 10px; }
.fo-col { display: grid; gap: 2px; }
.fo-units { gap: 6px; }
.fo-unit { gap: 4px; }
.fo-self { justify-self: start; }
.fo-foot { padding-top: 10px; gap: 16px; align-items: flex-start; }
.fo-note { display: flex; gap: 6px; align-items: flex-start; margin-top: 12px; }
</style>
