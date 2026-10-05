<template>
  <div class="apx">
    <div class="apx-questions" role="tablist" aria-label="Questions">
      <button
        v-for="q in API_QUERIES"
        :id="`apx-q-${q.id}`"
        :key="q.id"
        type="button"
        role="tab"
        class="apx-question"
        :aria-selected="q.id === active.id"
        aria-controls="apx-panel"
        @click="select(q.id)"
      >
        <span class="apx-question-icon" aria-hidden="true"><ScrIcon :name="q.icon" /></span>
        <span>{{ q.question }}</span>
      </button>
    </div>

    <div id="apx-panel" class="apx-panel" role="tabpanel" :aria-labelledby="`apx-q-${active.id}`">
      <section class="apx-inputs" aria-label="Change the details">
        <p class="apx-label">1 · Change the details</p>
        <h3>{{ active.question }}</h3>
        <p class="apx-plain">{{ active.plain }}</p>

        <div v-if="active.presets" class="apx-presets">
          <span class="apx-field-label">Try a vessel</span>
          <div class="apx-chips">
            <button v-for="p in active.presets" :key="p.label" type="button" class="apx-chip" :aria-pressed="isPreset(p.values)" @click="applyPreset(p.values)">{{ p.label }}</button>
          </div>
        </div>

        <div v-for="input in active.inputs" :key="input.key" class="apx-field">
          <template v-if="input.type === 'select'">
            <label class="apx-field-label" :for="`apx-${active.id}-${input.key}`">{{ input.label }}</label>
            <select :id="`apx-${active.id}-${input.key}`" v-model="values[input.key]" class="apx-select">
              <option v-for="o in input.options" :key="o.value" :value="o.value">{{ o.label }}</option>
            </select>
          </template>
          <template v-else-if="input.type === 'chips'">
            <span class="apx-field-label">{{ input.label }}</span>
            <div class="apx-chips" role="group" :aria-label="input.label">
              <button v-for="o in input.options" :key="o.value" type="button" class="apx-chip" :aria-pressed="values[input.key] === o.value" @click="values[input.key] = o.value">{{ o.label }}</button>
            </div>
          </template>
          <template v-else-if="input.type === 'range'">
            <label class="apx-field-label apx-range-label" :for="`apx-${active.id}-${input.key}`">{{ input.label }} <output>{{ input.format(Number(values[input.key])) }}</output></label>
            <input :id="`apx-${active.id}-${input.key}`" v-model.number="values[input.key]" type="range" class="apx-range" :min="input.min" :max="input.max" :step="input.step" />
          </template>
          <template v-else-if="input.type === 'date'">
            <label class="apx-field-label" :for="`apx-${active.id}-${input.key}`">{{ input.label }}</label>
            <input :id="`apx-${active.id}-${input.key}`" v-model="values[input.key]" type="date" class="apx-select" />
          </template>
          <label v-else class="apx-toggle">
            <input v-model="values[input.key]" type="checkbox" />
            <span class="apx-switch" aria-hidden="true"></span>
            <span>{{ input.label }}</span>
          </label>
          <p v-if="input.help" class="apx-help">{{ input.help }}</p>
        </div>
        <button type="button" class="apx-reset" @click="reset">Reset</button>
      </section>

      <section class="apx-app" aria-label="In the app">
        <p class="apx-label">2 · See it in the app</p>
        <ApiPhone :tab="TAB[active.id] ?? 'Map'" caption="Drawn from the answer on the right, the way InteliWaterwayz™ shows it.">
          <ApiScreen :id="active.id" :response="response" :v="values" :now="now" :options="optionLabels" />
        </ApiPhone>
        <figure v-if="active.shot" class="apx-shot">
          <ShotImage :id="active.shot" sizes="320px" />
          <figcaption>The real InteliWaterwayz™ screen for this</figcaption>
        </figure>
      </section>

      <section class="apx-api" aria-label="How the API answers">
        <p class="apx-label">3 · How the API answers</p>
        <div class="apx-tabs" role="tablist" aria-label="Request and answer">
          <button v-for="t in ['request', 'answer'] as const" :key="t" type="button" role="tab" class="apx-tab" :aria-selected="view === t" @click="view = t">{{ t === 'request' ? 'The request' : 'The answer' }}</button>
        </div>

        <div v-if="view === 'request'" class="apx-request">
          <p class="apx-url"><span class="apx-method" :data-method="request.method">{{ request.method }}</span><code>{{ request.path }}</code></p>
          <p class="apx-op">Operation <code>{{ active.operation }}</code> · public, no sign-in needed</p>
          <table class="apx-params">
            <caption class="sr-only">What each part of the request means</caption>
            <thead><tr><th scope="col">Parameter</th><th scope="col">Value</th><th scope="col">Means</th></tr></thead>
            <tbody>
              <tr v-for="p in [...request.query, ...(request.bodyParams ?? [])]" :key="p.name">
                <th scope="row"><code>{{ p.name }}</code></th>
                <td><code>{{ p.value }}</code></td>
                <td>{{ p.meaning }}</td>
              </tr>
            </tbody>
          </table>
          <JsonView v-if="request.body" :value="request.body" label="Request body" />
          <div class="apx-curl">
            <pre><code>{{ curl }}</code></pre>
            <button type="button" class="apx-copy" @click="copy">{{ copied ? 'Copied' : 'Copy' }}</button>
          </div>
          <p class="apx-help">Paste it into a terminal to ask the live API yourself. Coverage there is still growing, so its answer may be smaller than the sample here.</p>
        </div>

        <div v-else class="apx-answer">
          <p class="apx-data"><span>{{ active.data === 'directory' ? 'Live directory snapshot' : 'Sample answer' }}</span>{{ active.data === 'directory' ? 'Marinas from the live directory; distances worked out here.' : 'Computed in your browser from sample data, in the API’s own shape.' }}</p>
          <JsonView :value="response" label="Response body" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import ApiPhone from '@/components/api/ApiPhone.vue'
import ApiScreen from '@/components/api/ApiScreen.vue'
import JsonView from '@/components/api/JsonView.vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
import ShotImage from '@/components/v2/ShotImage.vue'
import { API_QUERIES, curlCommand, type Values } from '@/data/api-explorer'

const props = defineProps<{ now: Date; initial?: string }>()
const emit = defineEmits<{ select: [id: string] }>()

const TAB: Record<string, string> = { fit: 'Map', stay: 'Stays', passage: 'Plan', hazards: 'Map', events: 'More', traffic: 'Map', marinas: 'Map' }

const activeId = ref(API_QUERIES.some(q => q.id === props.initial) ? props.initial! : API_QUERIES[0]!.id)
const active = computed(() => API_QUERIES.find(q => q.id === activeId.value)!)
/* Each question keeps its own details while you move between them. */
const store = reactive<Record<string, Values>>(Object.fromEntries(API_QUERIES.map(q => [q.id, q.defaults(props.now)])))
const values = computed(() => store[activeId.value]!)
const view = ref<'request' | 'answer'>('request')

const request = computed(() => active.value.request(values.value, props.now))
const response = computed(() => active.value.respond(values.value, props.now))
const curl = computed(() => curlCommand(request.value))
const optionLabels = computed(() => Object.fromEntries(active.value.inputs.flatMap(i => (i.type === 'select' ? [[i.key, i.options.find(o => o.value === values.value[i.key])?.label ?? '']] : []))))

function select(id: string) {
  activeId.value = id
  emit('select', id)
}
watch(() => props.initial, id => { if (id && API_QUERIES.some(q => q.id === id)) activeId.value = id })

const isPreset = (p: Values) => Object.entries(p).every(([k, v]) => values.value[k] === v)
const applyPreset = (p: Values) => Object.assign(store[activeId.value]!, p)
const reset = () => { store[activeId.value] = active.value.defaults(props.now) }

const copied = ref(false)
async function copy() {
  try { await navigator.clipboard.writeText(curl.value) } catch { return }
  copied.value = true
  setTimeout(() => { copied.value = false }, 1600)
}
</script>

<style scoped>
.apx-questions { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 28px; }
.apx-question { display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px 10px 10px; border: 1px solid var(--border-medium); border-radius: var(--radius-pill); background: var(--surface-page); color: var(--text-primary); font: 600 .9rem var(--font-text); cursor: pointer; }
.apx-question:hover { border-color: var(--domain); }
.apx-question[aria-selected='true'] { background: var(--domain); border-color: var(--domain); color: #fff; }
.apx-question-icon { display: inline-grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; background: var(--domain-soft); color: var(--domain-ink); }
.apx-question[aria-selected='true'] .apx-question-icon { background: rgba(255, 255, 255, .18); color: #fff; }
.apx-question-icon :deep(svg) { width: 16px; height: 16px; }

.apx-panel { display: grid; grid-template-columns: minmax(250px, 300px) 360px minmax(0, 1fr); gap: 32px; align-items: start; }
/* The site pads every <section>; these three are columns, not page sections. */
.apx-inputs, .apx-app, .apx-api { padding: 0; }
.apx-label { font-size: .68rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: var(--domain-ink); margin: 0 0 14px; }

.apx-inputs h3 { font-size: 1.45rem; margin-bottom: 8px; }
.apx-plain { margin: 0 0 22px; font-size: .92rem; color: var(--text-secondary); }
.apx-field { margin-bottom: 18px; }
.apx-field-label { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 8px; font-size: .82rem; font-weight: 600; color: var(--text-primary); }
.apx-range-label output { font-variant-numeric: tabular-nums; color: var(--domain-ink); }
.apx-select { width: 100%; min-height: 44px; padding: 0 12px; border: 1px solid var(--border-medium); border-radius: var(--radius-sm); background: var(--surface-page); color: var(--text-primary); font: 500 .9rem var(--font-text); }
.apx-range { width: 100%; accent-color: var(--domain); }
.apx-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.apx-chip { padding: 7px 12px; border: 1px solid var(--border-medium); border-radius: var(--radius-pill); background: transparent; color: var(--text-primary); font: 500 .8rem var(--font-text); cursor: pointer; }
.apx-chip[aria-pressed='true'] { background: var(--domain-soft); border-color: var(--domain); color: var(--domain-ink); font-weight: 600; }
.apx-presets { margin-bottom: 20px; }
.apx-toggle { display: flex; align-items: center; gap: 10px; font-size: .88rem; font-weight: 600; cursor: pointer; }
.apx-toggle input { position: absolute; opacity: 0; width: 1px; height: 1px; }
.apx-switch { position: relative; width: 40px; height: 24px; flex-shrink: 0; border-radius: 999px; background: var(--surface-strong); border: 1px solid var(--border-medium); transition: background .2s; }
.apx-switch::after { content: ''; position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%; background: #fff; box-shadow: 0 1px 3px rgba(0, 0, 0, .25); transition: transform .2s; }
.apx-toggle input:checked + .apx-switch { background: var(--domain); border-color: var(--domain); }
.apx-toggle input:checked + .apx-switch::after { transform: translateX(16px); }
.apx-toggle input:focus-visible + .apx-switch { outline: 2px solid var(--domain); outline-offset: 2px; }
.apx-help { margin: 6px 0 0; font-size: .78rem; color: var(--text-muted); line-height: 1.5; }
.apx-reset { padding: 0; border: 0; background: none; color: var(--domain-ink); font: 600 .84rem var(--font-text); cursor: pointer; }

.apx-app { display: grid; justify-items: center; }
.apx-app .apx-label { justify-self: start; }
.apx-shot { margin: 20px 0 0; width: 100%; }
.apx-shot :deep(img) { display: block; width: 100%; height: auto; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); }
.apx-shot figcaption { margin-top: 6px; font-size: .76rem; color: var(--text-muted); }

.apx-tabs { display: inline-flex; padding: 3px; margin-bottom: 16px; border-radius: var(--radius-pill); background: var(--surface-strong); }
.apx-tab { padding: 7px 16px; border: 0; border-radius: var(--radius-pill); background: transparent; color: var(--text-secondary); font: 600 .84rem var(--font-text); cursor: pointer; }
.apx-tab[aria-selected='true'] { background: var(--surface-page); color: var(--text-primary); box-shadow: var(--shadow-sm); }
.apx-url { display: flex; align-items: center; gap: 10px; margin: 0 0 6px; flex-wrap: wrap; }
.apx-url code { font: 500 .84rem ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; word-break: break-all; }
.apx-method { padding: 3px 9px; border-radius: 6px; background: color-mix(in srgb, #2f9e6a 18%, transparent); color: #1f7a50; font: 700 .72rem ui-monospace, monospace; }
.apx-method[data-method='POST'] { background: color-mix(in srgb, #d98a1c 18%, transparent); color: #9a5a06; }
[data-theme='dark'] .apx-method { color: #6fd3a2; }
[data-theme='dark'] .apx-method[data-method='POST'] { color: #f2b45e; }
.apx-op { margin: 0 0 14px; font-size: .78rem; color: var(--text-muted); }
.apx-op code { font: 500 .76rem ui-monospace, monospace; }
.apx-params { width: 100%; border-collapse: collapse; margin-bottom: 14px; font-size: .82rem; }
.apx-params th, .apx-params td { padding: 8px 8px 8px 0; border-bottom: 1px solid var(--border-subtle); text-align: left; vertical-align: top; }
.apx-params thead th { font-size: .7rem; letter-spacing: .08em; text-transform: uppercase; color: var(--text-muted); font-weight: 600; }
.apx-params code { font: 500 .78rem ui-monospace, monospace; color: var(--domain-ink); word-break: break-all; }
.apx-params th code { white-space: nowrap; word-break: normal; }
.apx-params td:last-child { color: var(--text-secondary); }
.apx-curl { position: relative; margin-top: 14px; }
.apx-curl pre { margin: 0; padding: 14px 70px 14px 16px; border-radius: var(--radius-sm); background: var(--navy); color: #d6e2ef; font: 400 .76rem/1.6 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; white-space: pre-wrap; word-break: break-all; }
[data-theme='dark'] .apx-curl pre { background: #060b14; border: 1px solid var(--border-subtle); }
.apx-copy { position: absolute; top: 10px; right: 10px; padding: 5px 11px; border: 1px solid rgba(255, 255, 255, .25); border-radius: var(--radius-pill); background: rgba(255, 255, 255, .08); color: #fff; font: 600 .74rem var(--font-text); cursor: pointer; }
.apx-data { display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px; margin: 0 0 12px; font-size: .8rem; color: var(--text-muted); }
.apx-data span { padding: 2px 9px; border-radius: var(--radius-pill); background: var(--domain-soft); color: var(--domain-ink); font-weight: 600; font-size: .72rem; }
.apx-answer :deep(.json-view) { max-height: 620px; }

@media (max-width: 1240px) {
  .apx-panel { grid-template-columns: minmax(0, 1fr) 360px; }
  .apx-api { grid-column: 1 / -1; }
}
@media (max-width: 760px) {
  .apx-panel { grid-template-columns: minmax(0, 1fr); gap: 24px; }
  /* One row you can swipe, rather than seven stacked pills. */
  .apx-questions { flex-wrap: nowrap; overflow-x: auto; margin: 0 -18px 20px; padding: 2px 18px 8px; scrollbar-width: none; }
  .apx-question { flex-shrink: 0; padding: 8px 14px 8px 8px; font-size: .84rem; }
}
</style>
