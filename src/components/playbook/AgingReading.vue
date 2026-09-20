<template>
  <section class="ar" aria-label="A reading that ages">
    <div class="ar-topline">
      <p class="t-overline ar-eyebrow">InteliMaris · monitoring · sample readings</p>
      <p class="t-caption ar-hint">Live under 1 min · stale after 1 min · silent after 5 min, compressed for the demo</p>
    </div>

    <div class="ar-stage" :data-link="linkState">
      <header class="ar-head">
        <div>
          <p class="ar-overline">{{ VESSEL.name }} · {{ VESSEL.note }}</p>
          <p class="ar-unit">{{ VESSEL.unit }}</p>
        </div>
        <p class="ar-link" role="status" aria-live="polite">
          <span class="ar-link-dot" aria-hidden="true"></span>
          <span v-if="linkState === 'up'">Link up</span>
          <span v-else-if="linkState === 'joining'">Joining the network</span>
          <span v-else>Link down · <span class="ar-num">{{ downFor }}</span></span>
        </p>
      </header>

      <div class="ar-grid">
        <article
          v-for="t in tiles"
          :key="t.def.id"
          class="tile"
          :data-stage="t.stage"
          :data-kind="t.def.kind"
          :class="{ 'is-settling': settling, 'is-on': t.def.kind === 'state' && t.value === 1 }"
        >
          <header class="tile-head">
            <span class="tile-label">{{ t.def.label }}</span>
            <span class="tile-dot" aria-hidden="true"></span>
          </header>

          <!-- On a phone the control sits under the label so the numbers stay aligned across the row. -->
          <button
            v-if="t.def.id === PAUSABLE"
            type="button"
            class="tile-btn tile-btn--top"
            :aria-pressed="paused.has(t.def.id)"
            @click="togglePause(t.def.id)"
          >
            {{ paused.has(t.def.id) ? 'Resume the sensor' : 'Pause the sensor' }}
          </button>

          <div class="tile-body">
            <div :key="t.at" class="tile-value">
              <span class="tile-num">{{ t.text }}</span>
              <span v-if="t.def.unit" class="tile-unit">{{ t.def.unit }}</span>
            </div>
            <p v-if="t.stage === 'live'" class="tile-age">
              {{ t.def.verb }} <span class="ar-num">{{ t.age }}</span> ago · live
            </p>
            <div v-else class="tile-stale">
              <p class="tile-stale-head">{{ t.copy.headline }}</p>
              <p class="tile-stale-body">{{ t.copy.body }}</p>
            </div>
          </div>

          <div class="tile-foot">
            <svg
              v-if="t.def.kind === 'number'"
              class="spark"
              viewBox="0 0 100 28"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polyline :points="t.spark" />
            </svg>
            <div v-else class="ticks" aria-hidden="true">
              <span v-for="(h, i) in t.history" :key="i" class="tick" :data-on="h === 1"></span>
            </div>
            <button
              v-if="t.def.id === PAUSABLE"
              type="button"
              class="tile-btn tile-btn--foot"
              :aria-pressed="paused.has(t.def.id)"
              @click="togglePause(t.def.id)"
            >
              {{ paused.has(t.def.id) ? 'Resume the sensor' : 'Pause the sensor' }}
            </button>
          </div>
        </article>

        <article class="tile tile--prediction" :data-stage="predictionStage" :class="{ 'is-settling': settling }">
          <header class="tile-head">
            <span class="tile-label">{{ PREDICTION.label }}</span>
            <span class="tile-dot" aria-hidden="true"></span>
          </header>
          <div class="tile-body">
            <p class="tile-forecast">{{ PREDICTION.text }}</p>
            <p class="tile-age ar-num">
              {{ PREDICTION.model }} @ {{ PREDICTION.version }} · window {{ PREDICTION.window }} · <span class="ar-num">{{ predictionAge }}</span> ago
            </p>
          </div>
          <div class="tile-foot">
            <p v-if="predictionStage !== 'live'" class="tile-note">
              Built on readings from before the link dropped. Read it as a claim about then, not now.
            </p>
            <p v-else class="tile-note">A prediction is a claim: it carries who made it, which version, and over which window.</p>
          </div>
        </article>
      </div>

      <div class="ar-bar">
        <button
          type="button"
          class="switch"
          role="switch"
          :aria-checked="linkState !== 'up'"
          :disabled="linkState === 'joining'"
          @click="toggleLink"
        >
          <span class="switch-track" aria-hidden="true"><span class="switch-knob"></span></span>
          <span class="switch-text">
            <span class="switch-label">Cut the link</span>
            <span class="switch-hint">{{ linkHint }}</span>
          </span>
        </button>
        <button v-if="anyStale || linkState === 'down' || paused.size > 0" type="button" class="ghost" @click="skipAhead">
          Skip ahead 1 min
        </button>
      </div>
    </div>

    <p class="ar-foot">
      In the product a reading is live for 10 min and stale after an hour; a unit that stops reporting is Silent, never
      "offline". The old number stays on the tile and says so. Readings arrive on their own cadence, so each age resets
      at its own moment.
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import {
  PREDICTION,
  SENSORS,
  VESSEL,
  formatAge,
  formatValue,
  nextValue,
  periodFor,
  sparkPoints,
  stageFor,
  staleCopy,
  type SensorDef,
} from '@/data/playbook/aging-reading-model'

interface Reading {
  at: number
  value: number
}
interface Live {
  def: SensorDef
  history: Reading[]
  nextAt: number
}

const HISTORY = 14
const PAUSABLE = 'voltage'
const JOIN_MS = 900

/* The clock. "Skip ahead" adds to it; every timestamp in here is on this clock. */
const skew = ref(0)
const now = ref(Date.now())
const clock = () => Date.now() + skew.value

type LinkState = 'up' | 'down' | 'joining'
const linkState = ref<LinkState>('up')
const cutAt = ref(0)
const paused = reactive(new Set<string>())
const settlingUntil = ref(0)
const predictionAt = ref(0)

const seed = (def: SensorDef): Live => {
  const period = periodFor(def)
  const lastAt = clock() - Math.floor(Math.random() * period)
  const history: Reading[] = []
  let v = def.start
  for (let i = HISTORY - 1; i >= 0; i--) {
    history.push({ at: lastAt - i * period, value: v })
    v = nextValue(def, v)
  }
  history[history.length - 1]!.value = def.start
  return { def, history, nextAt: lastAt + periodFor(def) }
}

const live = reactive<Live[]>(SENSORS.map(seed))

const latest = (s: Live): Reading => s.history[s.history.length - 1]!
const pumpOn = () => {
  const pump = live.find((s) => s.def.id === 'pump')
  return pump ? latest(pump).value === 1 : false
}

const push = (s: Live, at: number) => {
  s.history.push({ at, value: nextValue(s.def, latest(s).value, Math.random, pumpOn()) })
  if (s.history.length > HISTORY) s.history.shift()
}

/* One tick a second: advance the clock and let due sensors report, catching
   up honestly (at their due time) after the tab was hidden or time skipped. */
const tick = () => {
  const t = clock()
  now.value = t
  if (linkState.value !== 'up') return
  for (const s of live) {
    if (paused.has(s.def.id)) continue
    let guard = 0
    while (s.nextAt <= t && guard++ < 16) {
      push(s, s.nextAt)
      s.nextAt += periodFor(s.def)
    }
  }
}

let timer: ReturnType<typeof setInterval> | null = null
let joinTimer: ReturnType<typeof setTimeout> | null = null

const start = () => {
  if (timer) return
  tick()
  timer = setInterval(tick, 1000)
}
const stop = () => {
  if (timer) clearInterval(timer)
  timer = null
}
const onVisibility = () => (document.hidden ? stop() : start())

onMounted(() => {
  predictionAt.value = clock() - PREDICTION.computedAgoMs
  start()
  document.addEventListener('visibilitychange', onVisibility)
})
onBeforeUnmount(() => {
  stop()
  if (joinTimer) clearTimeout(joinTimer)
  document.removeEventListener('visibilitychange', onVisibility)
})

/* Controls. */
const toggleLink = () => {
  if (linkState.value === 'up') {
    linkState.value = 'down'
    cutAt.value = clock()
    return
  }
  if (linkState.value !== 'down') return
  linkState.value = 'joining'
  joinTimer = setTimeout(() => {
    joinTimer = null
    const t = clock()
    for (const s of live) {
      if (paused.has(s.def.id)) continue
      push(s, t)
      s.nextAt = t + periodFor(s.def)
    }
    predictionAt.value = t
    settlingUntil.value = t + 1000
    linkState.value = 'up'
    tick()
  }, JOIN_MS)
}

const togglePause = (id: string) => {
  const s = live.find((x) => x.def.id === id)
  if (!s) return
  if (paused.has(id)) {
    paused.delete(id)
    if (linkState.value === 'up') {
      const t = clock()
      push(s, t)
      s.nextAt = t + periodFor(s.def)
      settlingUntil.value = t + 1000
      tick()
    }
  } else {
    paused.add(id)
  }
}

const skipAhead = () => {
  skew.value += 60_000
  tick()
}

/* What the tiles show. */
const tiles = computed(() =>
  live.map((s) => {
    const last = latest(s)
    const ageMs = now.value - last.at
    const stage = stageFor(ageMs)
    const age = formatAge(ageMs)
    const reason = paused.has(s.def.id) ? 'sensor' : 'link'
    const values = s.history.map((h) => h.value)
    return {
      def: s.def,
      at: last.at,
      value: last.value,
      text: formatValue(s.def, last.value),
      age,
      stage,
      copy: staleCopy(stage, reason, s.def.verb, age),
      spark: sparkPoints(values),
      history: values,
    }
  }),
)

const anyStale = computed(() => tiles.value.some((t) => t.stage !== 'live'))
const settling = computed(() => now.value < settlingUntil.value)
const downFor = computed(() => formatAge(now.value - cutAt.value))
const predictionAge = computed(() => formatAge(now.value - predictionAt.value))
const predictionStage = computed(() =>
  linkState.value === 'up' ? 'live' : stageFor(now.value - cutAt.value),
)
const linkHint = computed(() => {
  if (linkState.value === 'joining') return 'The unit is re-joining LoRaWAN.'
  if (linkState.value === 'down') return 'The unit has dropped off LoRaWAN. The ages keep climbing; switch back to restore it.'
  return 'Like the unit dropping off LoRaWAN.'
})
</script>

<style scoped>
.ar {
  padding: 0; /* main.css pads every section 7rem; the playbook frame already spaces us */
  --ar-ink: #ffffff;
  --ar-ink-2: rgba(255, 255, 255, 0.72);
  --ar-ink-3: rgba(255, 255, 255, 0.56);
  --ar-hair: rgba(255, 255, 255, 0.1);
  --ar-hair-2: rgba(255, 255, 255, 0.18);
  --ar-fill: rgba(255, 255, 255, 0.06);
  --ar-fill-2: rgba(255, 255, 255, 0.1);
  --ar-ok: #4fc76f;
  --ar-warn: #f0b429;
  --ar-alert: #f06a63;
  --ar-spring: cubic-bezier(0.22, 1.2, 0.36, 1);
}

.ar-topline {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-bottom: var(--space-3);
}

.ar-eyebrow,
.ar-hint {
  margin: 0;
  color: var(--text-muted);
}

/* --- The stage ----------------------------------------------------------- */

.ar-stage {
  position: relative;
  isolation: isolate;
  padding: var(--space-4) var(--space-4) var(--space-4);
  border-radius: var(--radius-xl);
  background:
    radial-gradient(60% 50% at 8% 0%, rgba(61, 142, 224, 0.28), transparent 70%),
    radial-gradient(50% 45% at 100% 100%, rgba(27, 94, 158, 0.32), transparent 70%),
    radial-gradient(40% 40% at 70% 20%, rgba(255, 255, 255, 0.05), transparent 70%),
    var(--navy);
  color: var(--ar-ink);
  box-shadow: 0 30px 80px rgba(11, 18, 32, 0.35);
  transition: background 900ms var(--ease-out);
}

.ar-stage[data-link='down'] {
  background:
    radial-gradient(60% 50% at 8% 0%, rgba(61, 142, 224, 0.1), transparent 70%),
    radial-gradient(50% 45% at 100% 100%, rgba(27, 94, 158, 0.12), transparent 70%),
    var(--navy);
}

.ar-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.ar-overline {
  margin: 0;
  font-family: var(--font-text);
  font-size: var(--type-overline);
  font-weight: 500;
  letter-spacing: var(--type-overline-ls);
  text-transform: uppercase;
  color: var(--ar-ink-3);
}

.ar-unit {
  margin: var(--space-1) 0 0;
  font-family: var(--font-display);
  font-size: var(--type-h3);
  font-weight: 700;
  letter-spacing: var(--type-h3-ls);
  color: var(--ar-ink);
}

.ar-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  margin: 0;
  padding: 0.5rem 0.875rem;
  border: 1px solid var(--ar-hair);
  border-radius: 999px;
  background: var(--ar-fill);
  font-family: var(--font-text);
  font-size: var(--type-caption);
  font-weight: 500;
  color: var(--ar-ink-2);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
}

.ar-link-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ar-ok);
  box-shadow: 0 0 0 4px rgba(79, 199, 111, 0.16);
  transition: background 500ms var(--ease-out), box-shadow 500ms var(--ease-out);
}

.ar-stage[data-link='down'] .ar-link-dot {
  background: var(--ar-alert);
  box-shadow: 0 0 0 4px rgba(240, 106, 99, 0.16);
}

.ar-stage[data-link='joining'] .ar-link-dot {
  background: var(--ar-warn);
  box-shadow: 0 0 0 4px rgba(240, 180, 41, 0.16);
  animation: breathe 900ms ease-in-out infinite alternate;
}

.ar-num {
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1;
}

/* --- Tiles --------------------------------------------------------------- */

.ar-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-3);
}

.tile {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 212px;
  padding: var(--space-4) var(--space-4) var(--space-3);
  border: 1px solid var(--ar-hair);
  /* the tone sits on the left rule, as the product's tiles carry it */
  border-left: 3px solid var(--ar-hair-2);
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.045));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 12px 32px rgba(0, 0, 0, 0.22);
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  transition:
    background 700ms var(--ease-out),
    border-color 700ms var(--ease-out),
    box-shadow 700ms var(--ease-out);
}

.tile.is-settling {
  animation: settle 720ms var(--ar-spring);
}

.tile[data-stage='stale'] {
  border-left-color: var(--ar-warn);
}

.tile[data-stage='silent'] {
  border-left-color: var(--ar-alert);
}

.tile-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.tile-label {
  font-family: var(--font-text);
  font-size: var(--type-caption);
  font-weight: 500;
  color: var(--ar-ink-2);
}

.tile-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ar-ok);
  transition: background 700ms var(--ease-out);
}

.tile[data-kind='state'] .tile-dot {
  background: var(--ar-ink-3);
}

.tile[data-kind='state'].is-on .tile-dot {
  background: var(--ar-ok);
}

.tile[data-stage='stale'] .tile-dot {
  background: var(--ar-warn);
}

.tile[data-stage='silent'] .tile-dot {
  background: var(--ar-alert);
}

.tile-body {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--space-3) 0 var(--space-2);
}

.tile-value {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1;
  letter-spacing: -0.02em;
  line-height: 1;
  color: var(--ar-ink);
  animation: nudge 520ms var(--ar-spring);
  transition: opacity 700ms var(--ease-out), filter 700ms var(--ease-out);
}

.tile-num {
  font-size: 3rem;
}

.tile-unit {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--ar-ink-2);
}

.tile[data-stage='stale'] .tile-value {
  opacity: 0.72;
}

.tile[data-stage='silent'] .tile-value {
  opacity: 0.45;
}

.tile-age {
  margin: var(--space-2) 0 0;
  font-family: var(--font-text);
  font-size: var(--type-caption);
  color: var(--ar-ink-3);
}

.tile-stale {
  margin-top: var(--space-2);
  animation: rise 600ms var(--ease-out);
}

.tile-stale-head {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1;
  color: var(--ar-ink);
}

.tile[data-stage='stale'] .tile-stale-head {
  color: var(--ar-warn);
}

.tile[data-stage='silent'] .tile-stale-head {
  color: var(--ar-alert);
}

.tile-stale-body {
  margin: var(--space-1) 0 0;
  font-family: var(--font-text);
  font-size: var(--type-caption);
  line-height: 1.45;
  color: var(--ar-ink-2);
}

.tile-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  min-height: 28px;
  padding-top: var(--space-2);
  border-top: 1px solid var(--ar-hair);
}

.spark {
  flex: 1 1 auto;
  width: 100%;
  height: 28px;
  overflow: visible;
  fill: none;
  stroke: rgba(255, 255, 255, 0.55);
  stroke-width: 1.5;
  stroke-linejoin: round;
  stroke-linecap: round;
  vector-effect: non-scaling-stroke;
  transition: opacity 700ms var(--ease-out);
}

.spark polyline {
  vector-effect: non-scaling-stroke;
}

.tile[data-stage='stale'] .spark,
.tile[data-stage='stale'] .ticks {
  opacity: 0.4;
}

.tile[data-stage='silent'] .spark,
.tile[data-stage='silent'] .ticks {
  opacity: 0.2;
}

.ticks {
  flex: 1 1 auto;
  display: flex;
  gap: 3px;
  height: 28px;
  align-items: center;
}

.tick {
  flex: 1 1 0;
  height: 8px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.16);
}

.tick[data-on='true'] {
  height: 16px;
  background: var(--ar-ok);
}

.tile-btn {
  flex-shrink: 0;
  min-height: 40px;
  padding: 0.35rem 0.7rem;
  border: 1px solid var(--ar-hair-2);
  border-radius: 999px;
  background: var(--ar-fill);
  color: var(--ar-ink);
  font-family: var(--font-text);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 200ms var(--ease-out), transform 200ms var(--ar-spring);
}

.tile-btn--top {
  display: none;
  align-self: flex-start;
  margin-top: var(--space-2);
}

.tile-btn:hover {
  background: var(--ar-fill-2);
}

.tile-btn:active {
  transform: scale(0.97);
}

.tile-btn[aria-pressed='true'] {
  background: var(--ar-ink);
  color: var(--navy);
  border-color: var(--ar-ink);
}

.tile-btn:focus-visible,
.switch:focus-visible,
.ghost:focus-visible {
  outline: 2px solid var(--ar-ink);
  outline-offset: 2px;
  border-radius: 999px;
}

/* Prediction */

.tile-forecast {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: -0.015em;
  line-height: 1.2;
  color: var(--ar-ink);
}

.tile--prediction[data-stage='stale'] .tile-forecast,
.tile--prediction[data-stage='silent'] .tile-forecast {
  opacity: 0.5;
}

.tile-note {
  margin: 0;
  font-family: var(--font-text);
  font-size: 0.75rem;
  line-height: 1.45;
  color: var(--ar-ink-3);
}

/* --- Controls ------------------------------------------------------------ */

.ar-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-top: var(--space-4);
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--ar-hair);
  border-radius: var(--radius-lg);
  background: rgba(11, 18, 32, 0.55);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
}

.switch {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0.25rem;
  border: 0;
  background: transparent;
  color: var(--ar-ink);
  text-align: left;
  cursor: pointer;
}

.switch:disabled {
  cursor: default;
  opacity: 0.7;
}

.switch-track {
  position: relative;
  flex-shrink: 0;
  width: 52px;
  height: 32px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  transition: background 320ms var(--ease-out);
}

.switch-knob {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  transition: transform 360ms var(--ar-spring);
}

.switch[aria-checked='true'] .switch-track {
  background: var(--ar-alert);
}

.switch[aria-checked='true'] .switch-knob {
  transform: translateX(20px);
}

.switch-text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.switch-label {
  font-family: var(--font-text);
  font-size: var(--type-body-sm);
  font-weight: 600;
}

.switch-hint {
  font-family: var(--font-text);
  font-size: var(--type-caption);
  color: var(--ar-ink-3);
}

.ghost {
  flex-shrink: 0;
  min-height: 44px;
  padding: 0.6rem 1rem;
  border: 1px solid var(--ar-hair-2);
  border-radius: 999px;
  background: var(--ar-fill);
  color: var(--ar-ink);
  font-family: var(--font-text);
  font-size: var(--type-body-sm);
  font-weight: 500;
  cursor: pointer;
  animation: rise 360ms var(--ease-out);
  transition: background 200ms var(--ease-out), transform 200ms var(--ar-spring);
}

.ghost:hover {
  background: var(--ar-fill-2);
}

.ghost:active {
  transform: scale(0.97);
}

.ar-foot {
  margin: var(--space-3) 0 0;
  max-width: 88ch;
  font-family: var(--font-text);
  font-size: var(--type-caption);
  color: var(--text-muted);
}

/* --- Motion -------------------------------------------------------------- */

@keyframes nudge {
  from {
    opacity: 0.35;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes settle {
  0% {
    transform: scale(0.975);
    border-color: var(--ar-hair-2);
  }
  100% {
    transform: none;
    border-color: var(--ar-hair);
  }
}

@keyframes breathe {
  from {
    opacity: 0.55;
  }
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ar *,
  .ar *::before,
  .ar *::after {
    animation: none !important;
    transition: none !important;
  }
}

/* --- Phone --------------------------------------------------------------- */

@media (max-width: 900px) {
  .ar-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-3);
  }
}

@media (max-width: 640px) {
  .ar-stage {
    padding: var(--space-4);
    border-radius: var(--radius-lg);
  }

  .ar-head {
    flex-direction: row;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-3);
  }

  .ar-unit {
    font-size: 1rem;
  }

  .ar-grid {
    gap: var(--space-2);
  }

  /* six tiles in three rows have to share a phone screen with the switch */
  .tile {
    min-height: 150px;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
  }

  .tile-body {
    padding: var(--space-2) 0 var(--space-1);
  }

  .tile-foot {
    min-height: 22px;
    padding-top: var(--space-1);
  }

  .spark,
  .ticks {
    height: 20px;
  }

  .tile-num {
    font-size: 1.875rem;
  }

  .tile-unit {
    font-size: 1rem;
  }

  .tile-btn--foot {
    display: none;
  }

  .tile-btn--top {
    display: inline-flex;
  }

  .tile-forecast {
    font-size: 1.125rem;
  }

  .tile--prediction .tile-foot {
    display: none;
  }

  .tile-stale-head {
    font-size: 1rem;
  }

  .tile-stale-body {
    font-size: 0.75rem;
  }

  .ar-bar {
    position: sticky;
    bottom: var(--space-3);
    z-index: 2;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    margin-top: var(--space-3);
    background: rgba(11, 18, 32, 0.8);
  }

  .switch {
    flex: 1 1 auto;
    min-height: 48px;
  }

  .ghost {
    flex: 0 0 auto;
    min-height: 40px;
    padding: 0.4rem 0.8rem;
    font-size: var(--type-caption);
  }
}
</style>
