<template>
  <section class="plan-bar" aria-label="Plan a passage">
    <form class="editorial-shell plan-form" @submit.prevent="plan">
      <label class="plan-field plan-field--place">
        <span>Where from?</span>
        <select v-model="from">
          <option v-for="f in FROMS" :key="f" :value="f">{{ f }}</option>
        </select>
      </label>
      <label class="plan-field plan-field--place">
        <span>Where to?</span>
        <select v-model="to">
          <option v-for="t in tos" :key="t" :value="t">{{ t }}</option>
        </select>
      </label>
      <label class="plan-field">
        <span>When?</span>
        <select v-model.number="departMin">
          <option v-for="m in TIMES" :key="m" :value="m">Tomorrow, {{ fmtClock(m) }}</option>
        </select>
      </label>
      <label class="plan-field">
        <span>Draft</span>
        <select v-model.number="draftFt">
          <option v-for="d in DRAFTS" :key="d" :value="d">{{ d }} ft</option>
        </select>
      </label>
      <button type="submit" class="plan-go">Plan the passage</button>
    </form>

    <div v-if="result" class="editorial-shell plan-result" aria-live="polite">
      <div class="plan-result-head">
        <p><strong>{{ result.from }} → {{ result.to }}</strong> · tomorrow</p>
        <span class="plan-sample">Sample plan</span>
      </div>
      <ul class="plan-facts">
        <li><small>Leave</small><b>{{ clock(result.p.departs_at) }}</b></li>
        <li><small>Arrive</small><b>{{ clock(result.p.arrives_at) }}</b></li>
        <li><small>Distance</small><b>{{ (result.p.distance_m / 1852).toFixed(1) }} nm</b></li>
        <li><small>Waiting</small><b>{{ result.p.waits.length ? result.p.waits.map(w => `${w.minutes} min · ${w.near}`).join(', ') : 'None' }}</b></li>
        <li><small>Depth</small><b>{{ Math.round(result.p.clear_prob_at_margin * 100) }}% sure at {{ result.p.pinch_points[0]?.name }}</b></li>
      </ul>
      <div class="plan-result-actions">
        <button type="button" class="editorial-button" @click="start(undefined, $event.currentTarget as HTMLElement)">Plan it for real <span aria-hidden="true">→</span></button>
        <RouterLink :to="{ path: '/api', query: { q: 'passage' } }" class="editorial-text-link">See how the API answers <span aria-hidden="true">→</span></RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useOnboarding } from '@/composables/useOnboarding'
import { fmtClock, PASSAGE_ROUTES, samplePassage, type SamplePassage } from '@/data/api-explorer'

const { start } = useOnboarding()

const FROMS = [...new Set(PASSAGE_ROUTES.map(r => r.from))]
const TIMES = Array.from({ length: 25 }, (_, i) => 360 + i * 30)
const DRAFTS = [3, 3.5, 4, 4.6, 5, 5.5, 6, 7, 8]

const from = ref(FROMS[0]!)
const tos = computed(() => PASSAGE_ROUTES.filter(r => r.from === from.value).map(r => r.to))
const to = ref(tos.value[0]!)
watch(from, () => { if (!tos.value.includes(to.value)) to.value = tos.value[0]! })
const departMin = ref(510)
const draftFt = ref(4.6)

/* A plan is a snapshot of the bar when it was asked, like a search. */
const result = ref<{ from: string; to: string; p: SamplePassage['passage'] } | null>(null)
function plan() {
  const route = PASSAGE_ROUTES.find(r => r.from === from.value && r.to === to.value)
  if (!route) return
  const answer = samplePassage({ route: route.id, depart_min: departMin.value, speed_kn: 6, draft_ft: draftFt.value, margin_ft: 2 }, new Date())
  result.value = { from: from.value, to: to.value, p: answer.passage }
}

const clock = (s: string) => new Intl.DateTimeFormat('en-GB', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' }).format(new Date(s))
</script>

<style scoped>
.plan-bar { padding: 0; background: var(--surface-page); border-bottom: 1px solid var(--border-subtle); }
.plan-form { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1.3fr) minmax(0, 1fr) minmax(0, .7fr) auto; gap: 12px; align-items: end; padding: 18px 0 20px; }
.plan-field { display: grid; gap: 6px; }
.plan-field span { font-size: .82rem; font-weight: 700; color: var(--text-primary); }
.plan-field select { min-height: 46px; width: 100%; padding: 0 12px; border: 1px solid var(--border-medium); border-radius: 4px; background: var(--surface-page); color: var(--text-primary); font: 500 .92rem var(--font-text); }
.plan-field select:focus-visible { outline: 2px solid var(--domain); outline-offset: 1px; }
.plan-go { min-height: 46px; padding: 0 22px; border: 0; border-radius: 4px; background: var(--maris-deep); color: #fff; font: 700 .9rem var(--font-text); cursor: pointer; white-space: nowrap; }
[data-theme='dark'] .plan-go { background: var(--maris-night); color: #071221; }
.plan-go:hover { background: var(--domain); color: #fff; }

.plan-result { padding: 0 0 22px; }
.plan-result-head { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px; margin-bottom: 12px; }
.plan-result-head p { margin: 0; font-size: 1rem; }
.plan-sample { padding: 2px 10px; border-radius: var(--radius-pill); background: var(--domain-soft); color: var(--domain-ink); font-size: .72rem; font-weight: 600; }
.plan-facts { list-style: none; margin: 0 0 14px; padding: 0; display: grid; grid-template-columns: repeat(5, minmax(0, auto)); gap: 0; border: 1px solid var(--border-subtle); border-radius: 12px; overflow: hidden; }
.plan-facts li { display: grid; gap: 2px; padding: 12px 16px; border-left: 1px solid var(--border-subtle); }
.plan-facts li:first-child { border-left: 0; }
.plan-facts small { font-size: .72rem; color: var(--text-muted); font-weight: 600; letter-spacing: .04em; text-transform: uppercase; }
.plan-facts b { font-size: .95rem; font-weight: 600; }
.plan-result-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 24px; }

@media (max-width: 1000px) {
  .plan-form { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  .plan-go { grid-column: 1 / -1; }
  .plan-facts { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  .plan-facts li { border-left: 0; border-top: 1px solid var(--border-subtle); }
  .plan-facts li:nth-child(-n + 2) { border-top: 0; }
  .plan-facts li:nth-child(even) { border-left: 1px solid var(--border-subtle); }
}
</style>
