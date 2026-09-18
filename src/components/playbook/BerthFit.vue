<template>
  <div class="bf" :class="{ 'bf--brief': !!selected, 'bf--sheet': sheetOpen }">
    <header class="bf-head">
      <p class="t-overline">Journey 03 · Bahia Mar, Fort Lauderdale</p>
      <h2 class="bf-title">Which berths fit you</h2>
      <p class="bf-lede">
        Set your vessel and the basin answers. You only see the berths she fits, and on any date only free means free.
      </p>
    </header>

    <div class="bf-stage">
      <!-- Sheet stack: the vessel controls, and the approach brief over them. -->
      <div class="bf-side">
        <section
          class="bf-vessel"
          aria-labelledby="bf-vessel-h"
          :aria-hidden="selected ? 'true' : undefined"
          :inert="!!selected"
        >
          <button
            type="button"
            class="bf-handle"
            :aria-expanded="sheetOpen"
            aria-controls="bf-vessel-body"
            @click="sheetOpen = !sheetOpen"
          >
            <span class="bf-grip" aria-hidden="true"></span>
            <span class="bf-handle-text">
              <strong class="t-num">{{ fmtFt(vessel.loa) }}</strong>
              <span> · draft {{ fmtFt(vessel.draft) }} · air {{ fmtFt(vessel.airDraft) }}</span>
            </span>
            <span class="bf-handle-cta">{{ sheetOpen ? 'Done' : 'Edit vessel' }}</span>
          </button>

          <div id="bf-vessel-body" class="bf-vessel-body">
            <p id="bf-vessel-h" class="t-overline bf-ov">Your vessel</p>
            <div class="bf-samples" role="group" aria-label="Sample vessels">
              <button
                v-for="s in SAMPLE_VESSELS"
                :key="s.id"
                type="button"
                class="bf-chip"
                :aria-pressed="sampleId === s.id"
                @click="pickSample(s)"
              >
                {{ s.name }}
              </button>
            </div>

            <div class="bf-dims">
              <div v-for="d in DIMS" :key="d.key" class="bf-dim">
                <div class="bf-dim-head">
                  <label :for="`bf-${d.key}`" class="bf-dim-label">{{ d.label }}</label>
                  <span class="bf-dim-m t-num">{{ fmtM(toM(vessel[d.key])) }}</span>
                </div>
                <div class="bf-dim-row">
                  <button
                    type="button"
                    class="bf-step"
                    :aria-label="`Decrease ${d.label.toLowerCase()}`"
                    :disabled="vessel[d.key] <= d.min"
                    @click="nudge(d.key, -1)"
                  >
                    −
                  </button>
                  <output class="bf-dim-val t-num" :for="`bf-${d.key}`">
                    <span>{{ fmtNum(vessel[d.key]) }}</span><small>ft</small>
                  </output>
                  <button
                    type="button"
                    class="bf-step"
                    :aria-label="`Increase ${d.label.toLowerCase()}`"
                    :disabled="vessel[d.key] >= d.max"
                    @click="nudge(d.key, 1)"
                  >
                    +
                  </button>
                </div>
                <input
                  :id="`bf-${d.key}`"
                  v-model.number="vessel[d.key]"
                  type="range"
                  class="bf-range"
                  :min="d.min"
                  :max="d.max"
                  :step="d.step"
                  :style="{ '--p': `${pct(d.key)}%` }"
                  @input="sampleId = null"
                />
              </div>
            </div>

            <p class="bf-summary" aria-live="polite">
              <span :key="fitCount" class="bf-summary-n t-num">{{ fitCount }}</span>
              <span> of {{ BERTHS.length }} berths fit · {{ freeCount }} free {{ dayWord }}</span>
            </p>
          </div>
        </section>

        <Transition name="bf-brief">
          <div
            v-if="selected"
            ref="briefEl"
            class="bf-brief"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bf-brief-title"
            tabindex="-1"
            @keydown="onBriefKey"
          >
            <div class="bf-brief-top">
              <div>
                <p class="t-overline bf-ov">{{ selected.pier }} · {{ selected.kind }}</p>
                <h3 id="bf-brief-title" class="bf-brief-id t-num">{{ selected.id }}</h3>
              </div>
              <span class="bf-state" :data-state="stateOf(selected)">
                {{ STATE_LABEL[stateOf(selected)] }} · {{ days[day]!.short }}
              </span>
              <button type="button" class="bf-close" aria-label="Close the approach brief" @click="closeBrief">×</button>
            </div>

            <p class="bf-brief-line">
              <svg class="bf-compass" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10.5" />
                <path d="M12 3.5 L15.2 13.5 L12 11.4 L8.8 13.5 Z" :transform="`rotate(${selected.entryDeg} 12 12)`" />
              </svg>
              <span>{{ approachBrief(selected) }}</span>
            </p>

            <dl class="bf-facts">
              <div>
                <dt>Max length</dt>
                <dd class="t-num">{{ selected.maxLoaM === null ? 'No stated limit' : `${selected.maxLoaM} m · ${Math.round(selected.maxLoaM / FT_TO_M)} ft` }}</dd>
              </div>
              <div>
                <dt>Max beam</dt>
                <dd class="t-num">{{ selected.maxBeamM === null ? 'No stated limit' : `${selected.maxBeamM} m · ${(selected.maxBeamM / FT_TO_M).toFixed(1)} ft` }}</dd>
              </div>
              <div>
                <dt>Depth</dt>
                <dd class="t-num">{{ fmtM(selected.depthM) }} {{ selected.datum }} · sounded {{ selected.sounded }}</dd>
              </div>
              <div v-if="selected.overheadM !== null">
                <dt>Overhead</dt>
                <dd class="t-num">{{ fmtM(selected.overheadM) }} of cover</dd>
              </div>
              <div>
                <dt>Power</dt>
                <dd class="t-num">{{ selected.power }}</dd>
              </div>
              <div>
                <dt>Mooring</dt>
                <dd>{{ selected.mooring }}</dd>
              </div>
              <div>
                <dt>Access</dt>
                <dd>{{ selected.access }}</dd>
              </div>
            </dl>

            <p class="bf-yourfit">{{ yourFitText }}</p>

            <section class="bf-week" aria-labelledby="bf-week-h">
              <h4 id="bf-week-h" class="t-overline bf-ov">Only free means free</h4>
              <div class="bf-week-row" role="group" aria-label="The next seven days">
                <button
                  v-for="(d, i) in days"
                  :key="d.short"
                  type="button"
                  class="bf-day"
                  :data-state="selected.week[i]"
                  :aria-pressed="i === day"
                  :aria-label="`${d.short}: ${STATE_LABEL[selected.week[i]!]}`"
                  @click="day = i"
                >
                  <span class="bf-day-wd">{{ d.wd }}</span>
                  <span class="bf-day-n t-num">{{ d.n }}</span>
                  <span class="bf-day-dot" aria-hidden="true"></span>
                </button>
              </div>
              <p class="bf-week-text">{{ weekText }}</p>
              <ul class="bf-key" aria-label="State colours">
                <li v-for="s in STATES" :key="s"><i class="bf-day-dot" :data-state="s"></i>{{ s }}</li>
              </ul>
            </section>

            <button type="button" class="bf-back" @click="closeBrief">Back to your vessel</button>
          </div>
        </Transition>
      </div>

      <!-- The plan: the hero. -->
      <div class="bf-main">
        <div class="bf-toolbar">
          <div class="bf-toolbar-left">
            <p class="t-overline bf-ov">Basin plan · Bahia Mar</p>
            <p class="bf-count">
              <span class="t-num">{{ fitCount }}</span> of {{ BERTHS.length }} berths fit ·
              <span class="t-num">{{ freeCount }}</span> free {{ dayWord }}
            </p>
          </div>
          <div class="bf-dates" role="group" aria-label="Date">
            <button
              v-for="(d, i) in days"
              :key="d.short"
              type="button"
              class="bf-date"
              :aria-pressed="i === day"
              @click="day = i"
            >
              <span class="bf-date-wd">{{ i === 0 ? 'Today' : d.wd }}</span>
              <span class="bf-date-n t-num">{{ d.n }}</span>
            </button>
          </div>
        </div>

        <div class="bf-plan-frame">
        <div ref="planWrap" class="bf-plan-wrap" @click.self="tapped = null">
          <div class="bf-plan" :style="{ width: `${zoom * 100}%` }">
            <svg
              class="bf-svg"
              :viewBox="`0 0 ${PLAN_W} ${PLAN_H}`"
              role="group"
              aria-label="Schematic plan of the Bahia Mar basin with its berths"
            >
              <defs>
                <linearGradient id="bf-water" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#0f1c2e" />
                  <stop offset="1" stop-color="#132a44" />
                </linearGradient>
                <pattern id="bf-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(208,52,44,0.55)" stroke-width="2.5" />
                </pattern>
                <filter id="bf-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feDropShadow dx="0" dy="0" stdDeviation="7" flood-color="#3d8ee0" flood-opacity="0.75" />
                </filter>
              </defs>

              <!-- water -->
              <rect width="900" height="600" fill="url(#bf-water)" />
              <g class="bf-contours" aria-hidden="true">
                <rect x="150" y="90" width="610" height="420" rx="26" />
                <rect x="190" y="130" width="530" height="340" rx="22" />
                <rect x="230" y="170" width="450" height="260" rx="18" />
              </g>

              <!-- the ICW, west of the basin -->
              <line class="bf-channel" x1="60" y1="0" x2="60" y2="600" />
              <text class="bf-svg-muted" transform="rotate(-90 32 300)" x="32" y="300" text-anchor="middle">Intracoastal Waterway</text>
              <circle cx="132" cy="84" r="4.5" fill="#2e9b4e" />
              <circle cx="132" cy="516" r="4.5" fill="#d0342c" />

              <!-- land -->
              <g class="bf-land">
                <rect x="120" y="0" width="780" height="60" />
                <rect x="780" y="0" width="120" height="600" />
                <rect x="120" y="540" width="780" height="60" />
                <path class="bf-quay" d="M120 60 H780 V540 H120" />
              </g>
              <text class="bf-svg-land" x="450" y="36" text-anchor="middle">Hall of Fame Drive</text>
              <text class="bf-svg-land" transform="rotate(90 852 300)" x="852" y="300" text-anchor="middle">Bahia Mar resort</text>
              <text class="bf-svg-land" x="450" y="576" text-anchor="middle">South quay</text>

              <!-- piers -->
              <g class="bf-piers">
                <rect x="470" y="120" width="310" height="12" rx="2" />
                <rect x="548" y="330" width="232" height="12" rx="2" />
                <rect x="548" y="224" width="12" height="204" rx="2" />
                <template v-for="b in BERTHS" :key="`f-${b.id}`">
                  <template v-if="b.geom.axis === 'ns' && b.geom.dock === 'n'">
                    <rect class="bf-finger" :x="b.geom.x - 5.5" :y="b.geom.y" width="3" :height="b.geom.h * 0.92" rx="1.5" />
                    <rect class="bf-finger" :x="b.geom.x + b.geom.w + 2.5" :y="b.geom.y" width="3" :height="b.geom.h * 0.92" rx="1.5" />
                  </template>
                </template>
                <text class="bf-svg-pier" x="478" y="129">PIER A</text>
                <text class="bf-svg-pier" x="566" y="339">PIER B</text>
                <text class="bf-svg-pier" transform="rotate(-90 555 330)" x="555" y="330" text-anchor="middle">T-HEAD</text>
              </g>

              <!-- berths -->
              <g
                v-for="b in BERTHS"
                :key="b.id"
                class="bf-berth"
                :class="berthClass(b)"
                :data-berth="b.id"
                role="button"
                tabindex="0"
                :aria-pressed="selected?.id === b.id"
                :aria-label="berthLabel(b)"
                @click.stop="onBerthClick(b)"
                @keydown.enter.prevent="onBerthClick(b)"
                @keydown.space.prevent="onBerthClick(b)"
                @mouseenter="hover = b.id"
                @mouseleave="hover = null"
                @focus="hover = b.id"
                @blur="hover = null"
              >
                <rect class="bf-berth-body" :x="b.geom.x" :y="b.geom.y" :width="b.geom.w" :height="b.geom.h" rx="4" />
                <rect
                  v-if="stateOf(b) === 'closed'"
                  class="bf-berth-hatch"
                  :x="b.geom.x"
                  :y="b.geom.y"
                  :width="b.geom.w"
                  :height="b.geom.h"
                  rx="4"
                  fill="url(#bf-hatch)"
                />
                <text class="bf-berth-id" :x="labelOf(b).x" :y="labelOf(b).y" text-anchor="middle">{{ b.id }}</text>
                <text
                  v-if="fitOf(b).fits"
                  class="bf-berth-state"
                  :x="labelOf(b).x"
                  :y="labelOf(b).y + 11"
                  text-anchor="middle"
                >
                  {{ stateOf(b) }}
                </text>
              </g>

              <!-- the visitor's vessel, to scale, in the selected berth -->
              <Transition name="bf-boat">
                <g v-if="selected && boat" :key="selected.id" class="bf-boat" :transform="boat.transform" aria-hidden="true">
                  <path :d="boat.hull" />
                  <rect :x="-boat.w * 0.3" :y="-boat.l * 0.12" :width="boat.w * 0.6" :height="boat.l * 0.42" :rx="boat.w * 0.15" />
                </g>
              </Transition>

              <!-- scale and north -->
              <g class="bf-scale" transform="translate(150 566)">
                <line x1="0" y1="0" x2="90" y2="0" />
                <line x1="0" y1="-4" x2="0" y2="4" />
                <line x1="90" y1="-4" x2="90" y2="4" />
                <text x="45" y="16" text-anchor="middle">20 m</text>
              </g>
              <g class="bf-north" transform="translate(270 560) rotate(-30)">
                <path d="M0 -14 L6 6 L0 2 L-6 6 Z" />
                <text x="0" y="-18" text-anchor="middle">N</text>
              </g>
            </svg>

            <div v-if="tipBerth" class="bf-tip" :class="{ 'bf-tip--no': !fitOf(tipBerth).fits }" :style="tipStyle" role="status">
              <p class="bf-tip-head">
                <strong class="t-num">{{ tipBerth.id }}</strong>
                <span>{{ fitOf(tipBerth).fits ? 'fits you' : 'does not fit' }} · {{ stateOf(tipBerth) }} {{ days[day]!.short }}</span>
              </p>
              <ul v-if="!fitOf(tipBerth).fits" class="bf-tip-why">
                <li v-for="r in fitOf(tipBerth).reasons" :key="r.dim">{{ r.text }}</li>
              </ul>
              <p v-else class="bf-tip-cta">Open the approach brief</p>
            </div>
          </div>

        </div>
        <div class="bf-zoom" role="group" aria-label="Zoom the plan">
          <button type="button" aria-label="Zoom out" :disabled="zoomIdx === 0" @click="setZoom(zoomIdx - 1)">−</button>
          <button type="button" aria-label="Zoom in" :disabled="zoomIdx === ZOOMS.length - 1" @click="setZoom(zoomIdx + 1)">+</button>
        </div>
        </div>

        <ul class="bf-legend" aria-label="How to read the plan">
          <li><i class="bf-sw bf-sw--free" aria-hidden="true"></i>Fits you and free that day</li>
          <li><i class="bf-sw bf-sw--held" aria-hidden="true"></i>Fits, but assigned, resident or courtesy that day</li>
          <li><i class="bf-sw bf-sw--dim" aria-hidden="true"></i>Does not fit · hover or tap to see why</li>
          <li><i class="bf-sw bf-sw--closed" aria-hidden="true"></i>Closed</li>
        </ul>

        <ol class="bf-list" aria-label="Berths as a list">
          <li v-for="b in BERTHS" :key="b.id">
            <component
              :is="fitOf(b).fits ? 'button' : 'div'"
              :type="fitOf(b).fits ? 'button' : undefined"
              class="bf-row"
              :class="{ 'is-dim': !fitOf(b).fits, 'is-selected': selected?.id === b.id }"
              @click="fitOf(b).fits && openBrief(b)"
            >
              <span class="bf-row-id t-num">{{ b.id }}</span>
              <span class="bf-row-kind">{{ b.kind }} · {{ b.maxLoaM === null ? 'no stated limit' : `${b.maxLoaM} m` }} · {{ fmtM(b.depthM) }} {{ b.datum }}</span>
              <span class="bf-row-status">
                <template v-if="fitOf(b).fits">
                  <i class="bf-day-dot" :data-state="stateOf(b)" aria-hidden="true"></i>{{ stateOf(b) }} {{ days[day]!.short }}
                </template>
                <template v-else>{{ fitOf(b).reasons[0]!.text }}</template>
              </span>
            </component>
          </li>
        </ol>

        <p class="t-caption bf-note">
          Berth ids and length limits are as the product shows them for Bahia Mar. Depths, headings, hardware, this week's occupancy, the plan and the sample boats are sample data.
        </p>
      </div>
    </div>

    <Transition name="bf-scrim">
      <div v-if="selected" class="bf-scrim" @click="closeBrief"></div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import {
  BERTHS,
  PLAN_H,
  PLAN_SCALE,
  PLAN_W,
  SAMPLE_VESSELS,
  STATE_LABEL,
  type Berth,
  type OccupancyState,
  type SampleVessel,
  type VesselDims,
} from '@/data/playbook/berth-fit-berths'
import { FT_TO_M, approachBrief, fitCheck, fmtFt, fmtM, toM } from '@/data/playbook/berth-fit-rules'

/* ---- the vessel ------------------------------------------------------- */

type DimKey = keyof VesselDims
interface Dim {
  key: DimKey
  label: string
  min: number
  max: number
  step: number
}
const DIMS: Dim[] = [
  { key: 'loa', label: 'Length overall', min: 20, max: 130, step: 1 },
  { key: 'beam', label: 'Beam', min: 6, max: 40, step: 0.5 },
  { key: 'draft', label: 'Draft', min: 1, max: 14, step: 0.5 },
  { key: 'airDraft', label: 'Air draft', min: 6, max: 100, step: 1 },
]

const DEFAULT = SAMPLE_VESSELS.find((v) => v.id === 'sportfish') ?? SAMPLE_VESSELS[0]!
const vessel = reactive<VesselDims>({ loa: DEFAULT.loa, beam: DEFAULT.beam, draft: DEFAULT.draft, airDraft: DEFAULT.airDraft })
const sampleId = ref<string | null>(DEFAULT.id)

const pickSample = (s: SampleVessel) => {
  vessel.loa = s.loa
  vessel.beam = s.beam
  vessel.draft = s.draft
  vessel.airDraft = s.airDraft
  sampleId.value = s.id
}

const nudge = (key: DimKey, dir: 1 | -1) => {
  const d = DIMS.find((x) => x.key === key)!
  const next = Math.min(d.max, Math.max(d.min, Math.round((vessel[key] + dir * d.step) * 10) / 10))
  vessel[key] = next
  sampleId.value = null
}

const pct = (key: DimKey) => {
  const d = DIMS.find((x) => x.key === key)!
  return ((vessel[key] - d.min) / (d.max - d.min)) * 100
}

const fmtNum = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1))

/* ---- dates ------------------------------------------------------------ */

const days = Array.from({ length: 7 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() + i)
  const wd = d.toLocaleDateString('en-US', { weekday: 'short' })
  const n = d.getDate()
  return { wd, n, short: `${wd} ${n}` }
})
const day = ref(0)
const dayWord = computed(() => (day.value === 0 ? 'today' : `on ${days[day.value]!.short}`))
const STATES: OccupancyState[] = ['free', 'assigned', 'resident', 'courtesy', 'closed']

/* ---- fit ----------------------------------------------------------------- */

const fits = computed(() => new Map(BERTHS.map((b) => [b.id, fitCheck(vessel, b)])))
const fitOf = (b: Berth) => fits.value.get(b.id)!
const stateOf = (b: Berth): OccupancyState => b.week[day.value] ?? 'free'
const fitCount = computed(() => BERTHS.filter((b) => fitOf(b).fits).length)
const freeCount = computed(() => BERTHS.filter((b) => fitOf(b).fits && stateOf(b) === 'free').length)

const berthClass = (b: Berth) => {
  const f = fitOf(b).fits
  const s = stateOf(b)
  return {
    'is-fit': f,
    'is-free': f && s === 'free',
    'is-held': f && s !== 'free' && s !== 'closed',
    'is-closed': s === 'closed',
    'is-dim': !f,
    'is-selected': selected.value?.id === b.id,
  }
}

const berthLabel = (b: Berth) => {
  const f = fitOf(b)
  const why = f.fits ? 'fits you' : `does not fit: ${f.reasons.map((r) => r.text).join('; ')}`
  return `${b.id}, ${b.kind}, ${why}. ${STATE_LABEL[stateOf(b)]} ${days[day.value]!.short}.`
}

const labelOf = (b: Berth) => {
  const g = b.geom
  const x = g.x + g.w / 2
  if (g.axis === 'ew') return { x, y: g.y + g.h / 2 - 1 }
  if (g.dock === 'e') return { x, y: g.y + 18 }
  return { x, y: g.y + g.h - 18 }
}

/* ---- selection, brief, focus --------------------------------------------- */

const selected = ref<Berth | null>(null)
const hover = ref<string | null>(null)
const tapped = ref<string | null>(null)
const briefEl = ref<HTMLElement | null>(null)
const planWrap = ref<HTMLElement | null>(null)
const sheetOpen = ref(false)
let lastFocus: HTMLElement | null = null

const openBrief = async (b: Berth) => {
  lastFocus = document.activeElement as HTMLElement | null
  tapped.value = null
  hover.value = null
  selected.value = b
  await nextTick()
  briefEl.value?.focus()
}

const closeBrief = async () => {
  selected.value = null
  await nextTick()
  const target = lastFocus?.isConnected ? lastFocus : planWrap.value?.querySelector<HTMLElement>('[data-berth]')
  target?.focus()
}

const onBerthClick = (b: Berth) => {
  if (fitOf(b).fits) {
    void openBrief(b)
  } else {
    tapped.value = tapped.value === b.id ? null : b.id
    hover.value = null
  }
}

const onBriefKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    void closeBrief()
    return
  }
  if (e.key !== 'Tab' || !briefEl.value) return
  const items = Array.from(
    briefEl.value.querySelectorAll<HTMLElement>('button:not([disabled]), [href], input, [tabindex]:not([tabindex="-1"])'),
  )
  if (!items.length) return
  const first = items[0]!
  const last = items[items.length - 1]!
  const active = document.activeElement
  if (e.shiftKey && (active === first || active === briefEl.value)) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && active === last) {
    e.preventDefault()
    first.focus()
  }
}

/* If the vessel changes under an open brief and no longer fits, let the brief go. */
watch([fits, selected], () => {
  if (selected.value && !fitOf(selected.value).fits) void closeBrief()
})

/* ---- the tooltip ----------------------------------------------------------- */

const tipBerth = computed(() => {
  const id = tapped.value ?? hover.value
  if (!id || selected.value?.id === id) return null
  return BERTHS.find((b) => b.id === id) ?? null
})
const tipStyle = computed(() => {
  const g = tipBerth.value?.geom
  if (!g) return {}
  return { left: `${((g.x + g.w / 2) / PLAN_W) * 100}%`, top: `${(g.y / PLAN_H) * 100}%` }
})

/* ---- the vessel drawn to scale ----------------------------------------------- */

const boat = computed(() => {
  const b = selected.value
  if (!b) return null
  const l = toM(vessel.loa) * PLAN_SCALE
  const w = toM(vessel.beam) * PLAN_SCALE
  const g = b.geom
  let cx = g.x + g.w / 2
  let cy = g.y + g.h / 2
  if (g.axis === 'ns' && g.dock === 'n') cy = g.y + 3 + l / 2
  if (g.axis === 'ns' && g.dock === 'e') cx = g.x + g.w - 3 - w / 2
  if (g.axis === 'ew' && g.dock === 's') cy = g.y + g.h - 3 - w / 2
  const r = w * 0.15
  const hull = [
    `M ${-w / 2} ${l / 2 - r}`,
    `L ${-w / 2} ${-l / 2 + l * 0.38}`,
    `C ${-w / 2} ${-l / 2 + l * 0.12}, ${-w * 0.18} ${-l / 2}, 0 ${-l / 2}`,
    `C ${w * 0.18} ${-l / 2}, ${w / 2} ${-l / 2 + l * 0.12}, ${w / 2} ${-l / 2 + l * 0.38}`,
    `L ${w / 2} ${l / 2 - r}`,
    `Q ${w / 2} ${l / 2}, ${w / 2 - r} ${l / 2}`,
    `L ${-w / 2 + r} ${l / 2}`,
    `Q ${-w / 2} ${l / 2}, ${-w / 2} ${l / 2 - r} Z`,
  ].join(' ')
  return { l, w, hull, transform: `translate(${cx} ${cy}) rotate(${g.bow})` }
})

/* ---- copy for the brief ---------------------------------------------------- */

const yourFitText = computed(() => {
  const b = selected.value
  if (!b) return ''
  const f = fitOf(b)
  const you = `Your ${fmtFt(vessel.loa)} (${fmtM(toM(vessel.loa))})`
  const spare = f.loaSpareM === null ? 'has no stated length limit to meet' : `leaves ${fmtM(f.loaSpareM)} of the berth`
  return `${you} ${spare} and ${fmtM(f.keelM)} under the keel at ${b.datum}.`
})

const weekText = computed(() => {
  const b = selected.value
  if (!b) return ''
  const s = stateOf(b)
  const today = days[day.value]!.short
  const nextFree = b.week.findIndex((st, i) => i > day.value && st === 'free')
  const tryNext = nextFree >= 0 ? `Try ${days[nextFree]!.short}, the next free day.` : 'No free day this week; pick another lit berth.'
  switch (s) {
    case 'free':
      return `Free on ${today}. You book the marina, not the berth; the dockmaster assigns it and this approach brief lands in WaterWayz.`
    case 'assigned':
      return `Assigned to another vessel on ${today}. ${tryNext}`
    case 'resident':
      return `Held by its resident on ${today}, so it is not bookable. Pick a lit berth.`
    case 'courtesy':
      return `A courtesy dock on ${today}: short stays for resort guests, not booked ahead. ${tryNext}`
    case 'closed':
      return `${b.closedNote ? b.closedNote[0]!.toUpperCase() + b.closedNote.slice(1) : 'Closed'} on ${today}. ${tryNext}`
  }
})

/* ---- zoom on small screens ------------------------------------------------- */

const ZOOMS = [1, 1.8, 2.6, 3.4]
const zoomIdx = ref(0)
const zoom = computed(() => ZOOMS[zoomIdx.value]!)

const setZoom = async (i: number) => {
  const wrap = planWrap.value
  const before = wrap ? { w: wrap.scrollWidth, h: wrap.scrollHeight, x: wrap.scrollLeft, y: wrap.scrollTop } : null
  zoomIdx.value = Math.min(ZOOMS.length - 1, Math.max(0, i))
  await nextTick()
  if (!wrap || !before) return
  const kx = wrap.scrollWidth / before.w
  const ky = wrap.scrollHeight / before.h
  wrap.scrollLeft = (before.x + wrap.clientWidth / 2) * kx - wrap.clientWidth / 2
  wrap.scrollTop = (before.y + wrap.clientHeight / 2) * ky - wrap.clientHeight / 2
}

onMounted(async () => {
  if (typeof window === 'undefined' || !window.matchMedia('(max-width: 760px)').matches) return
  zoomIdx.value = 2
  await nextTick()
  const wrap = planWrap.value
  if (!wrap) return
  wrap.scrollLeft = (690 / PLAN_W) * wrap.scrollWidth - wrap.clientWidth / 2
  wrap.scrollTop = (300 / PLAN_H) * wrap.scrollHeight - wrap.clientHeight / 2
})
</script>

<style scoped>
.bf {
  --bf-ink: #ffffff;
  --bf-ink-2: rgba(255, 255, 255, 0.74);
  --bf-ink-3: rgba(255, 255, 255, 0.58);
  --bf-line: rgba(255, 255, 255, 0.1);
  --bf-line-2: rgba(255, 255, 255, 0.18);
  --bf-blue: #3d8ee0;
  --bf-blue-soft: rgba(61, 142, 224, 0.18);
  --bf-material: rgba(30, 38, 52, 0.78);
  --bf-spring: cubic-bezier(0.22, 1.2, 0.36, 1);
  position: relative;
  padding-bottom: var(--space-8);
}

.bf-head {
  max-width: 68ch;
  margin-bottom: var(--space-6);
}

.bf-title {
  margin-top: var(--space-2);
  font-family: var(--font-display);
  font-size: var(--type-h2);
  line-height: var(--type-h2-lh);
  letter-spacing: var(--type-h2-ls);
  font-weight: 700;
}

.bf-lede {
  margin: var(--space-3) 0 0;
  font-family: var(--font-text);
  font-size: var(--type-lede);
  line-height: var(--type-lede-lh);
  color: var(--text-secondary);
  text-wrap: pretty;
}

.bf-ov {
  color: var(--bf-ink-3);
}

/* ---- the stage ---------------------------------------------------------- */

.bf-stage {
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr);
  gap: var(--space-6);
  align-items: start;
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  background:
    radial-gradient(120% 80% at 100% 0%, rgba(61, 142, 224, 0.14), transparent 55%),
    linear-gradient(160deg, #1d2634 0%, #131c2b 55%, #0b1220 100%);
  color: var(--bf-ink);
  font-family: var(--font-text);
}

/* ---- the sheet stack ---------------------------------------------------- */

.bf-side {
  display: grid;
  position: relative;
}

.bf-side > * {
  grid-area: 1 / 1;
}

.bf-vessel,
.bf-brief {
  border-radius: var(--radius-xl);
  background: var(--bf-material);
  border: 1px solid var(--bf-line);
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  -webkit-backdrop-filter: blur(22px) saturate(140%);
  backdrop-filter: blur(22px) saturate(140%);
}

.bf-vessel {
  padding: var(--space-6);
  transition: opacity 240ms var(--ease-out), transform 420ms var(--bf-spring);
}

.bf--brief .bf-vessel {
  opacity: 0;
  transform: translateX(-24px) scale(0.98);
  pointer-events: none;
}

.bf-handle {
  display: none;
}

.bf-samples {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: var(--space-3) 0 var(--space-6);
}

.bf-chip {
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  border: 1px solid var(--bf-line-2);
  background: rgba(255, 255, 255, 0.04);
  color: var(--bf-ink-2);
  font: 500 0.8125rem/1 var(--font-text);
  cursor: pointer;
  transition: background 200ms var(--ease-out), color 200ms var(--ease-out), transform 200ms var(--bf-spring);
}

.bf-chip:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--bf-ink);
}

.bf-chip:active {
  transform: scale(0.96);
}

.bf-chip[aria-pressed='true'] {
  background: var(--bf-ink);
  border-color: var(--bf-ink);
  color: var(--slate);
}

.bf-dims {
  display: grid;
  gap: var(--space-4);
}

.bf-dim {
  padding: var(--space-3) var(--space-4) var(--space-2);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid var(--bf-line);
}

.bf-dim-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-3);
}

.bf-dim-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--bf-ink-2);
}

.bf-dim-m {
  font-size: 0.875rem;
  color: var(--bf-ink-3);
}

.bf-dim-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--space-1);
}

.bf-dim-val {
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
}

.bf-dim-val small {
  margin-left: 0.3rem;
  font-family: var(--font-text);
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--bf-ink-3);
}

.bf-step {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 0;
  background: rgba(255, 255, 255, 0.09);
  color: var(--bf-ink);
  font: 400 1.5rem/1 var(--font-text);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background 160ms var(--ease-out), transform 220ms var(--bf-spring);
}

.bf-step:hover {
  background: rgba(255, 255, 255, 0.16);
}

.bf-step:active {
  transform: scale(0.9);
}

.bf-step:disabled {
  opacity: 0.35;
  cursor: default;
}

.bf-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 34px;
  margin: 0;
  background: transparent;
  cursor: pointer;
}

.bf-range::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--bf-blue) var(--p), rgba(255, 255, 255, 0.14) var(--p));
}

.bf-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 28px;
  height: 28px;
  margin-top: -11px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.08);
  transition: transform 160ms var(--bf-spring);
}

.bf-range:active::-webkit-slider-thumb {
  transform: scale(1.12);
}

.bf-range::-moz-range-track {
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.14);
}

.bf-range::-moz-range-progress {
  height: 6px;
  border-radius: 3px;
  background: var(--bf-blue);
}

.bf-range::-moz-range-thumb {
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.bf-range:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
  border-radius: 4px;
}

.bf-summary {
  margin: var(--space-6) 0 0;
  font-size: 0.9375rem;
  color: var(--bf-ink-2);
}

.bf-summary-n {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--bf-ink);
  animation: bf-pop 380ms var(--bf-spring);
}

@keyframes bf-pop {
  from {
    transform: scale(1.35);
    color: var(--bf-blue);
  }
}

/* ---- the brief ----------------------------------------------------------- */

.bf-brief {
  padding: var(--space-6);
  outline: none;
  z-index: 2;
}

.bf-brief:focus-visible {
  box-shadow: 0 0 0 2px #ffffff, 0 24px 56px rgba(0, 0, 0, 0.35);
}

.bf-brief-enter-active {
  transition: opacity 240ms var(--ease-out), transform 460ms var(--bf-spring);
}

.bf-brief-leave-active {
  transition: opacity 180ms var(--ease-out), transform 220ms var(--ease-out);
}

.bf-brief-enter-from,
.bf-brief-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}

.bf-brief-top {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.bf-brief-top > div {
  flex: 1;
  min-width: 0;
}

.bf-brief-id {
  margin-top: 0.2rem;
  font-family: var(--font-display);
  font-size: 2.5rem;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.bf-state {
  align-self: center;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.1);
  color: var(--bf-ink);
}

.bf-state[data-state='free'] {
  background: var(--bf-blue);
}

.bf-state[data-state='assigned'] {
  background: var(--status-warn);
  color: var(--navy);
}

.bf-state[data-state='resident'] {
  background: var(--orbis-night);
  color: var(--navy);
}

.bf-state[data-state='courtesy'] {
  background: var(--maris-light);
  color: var(--navy);
}

.bf-state[data-state='closed'] {
  background: var(--status-alert);
}

.bf-close {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 0;
  background: rgba(255, 255, 255, 0.1);
  color: var(--bf-ink);
  font: 400 1.4rem/1 var(--font-text);
  cursor: pointer;
}

.bf-close:hover {
  background: rgba(255, 255, 255, 0.18);
}

.bf-brief-line {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: var(--space-4) 0 0;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  background: rgba(61, 142, 224, 0.14);
  border: 1px solid rgba(61, 142, 224, 0.4);
  font-family: var(--font-display);
  font-variant-numeric: tabular-nums;
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: -0.005em;
}

.bf-compass {
  flex: none;
  width: 26px;
  height: 26px;
}

.bf-compass circle {
  fill: none;
  stroke: rgba(255, 255, 255, 0.35);
  stroke-width: 1.2;
}

.bf-compass path {
  fill: #ffffff;
}

.bf-facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3) var(--space-4);
  margin: var(--space-4) 0 0;
}

.bf-facts dt {
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bf-ink-3);
}

.bf-facts dd {
  margin: 0.15rem 0 0;
  font-size: 0.9375rem;
  font-weight: 500;
}

.bf-yourfit {
  margin: var(--space-4) 0 0;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--bf-ink-2);
}

.bf-week {
  margin-top: var(--space-6);
  padding-top: var(--space-4);
  border-top: 1px solid var(--bf-line);
}

.bf-week-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-top: var(--space-3);
}

.bf-day {
  display: grid;
  justify-items: center;
  gap: 2px;
  padding: 0.5rem 0 0.45rem;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.05);
  color: var(--bf-ink-2);
  cursor: pointer;
  transition: background 180ms var(--ease-out), transform 220ms var(--bf-spring);
}

.bf-day:hover {
  background: rgba(255, 255, 255, 0.1);
}

.bf-day:active {
  transform: scale(0.94);
}

.bf-day[aria-pressed='true'] {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.5);
  color: var(--bf-ink);
}

.bf-day-wd {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.bf-day-n {
  font-family: var(--font-display);
  font-size: 0.9375rem;
  font-weight: 700;
}

.bf-day-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
}

.bf-day-dot[data-state='free'] {
  background: var(--bf-blue);
}

.bf-day-dot[data-state='assigned'] {
  background: var(--status-warn);
}

.bf-day-dot[data-state='resident'] {
  background: var(--orbis-night);
}

.bf-day-dot[data-state='courtesy'] {
  background: var(--maris-light);
}

.bf-day-dot[data-state='closed'] {
  background: var(--status-alert);
}

.bf-week-text {
  margin: var(--space-3) 0 0;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--bf-ink-2);
}

.bf-key {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.9rem;
  margin: var(--space-3) 0 0;
  padding: 0;
  list-style: none;
  font-size: 0.75rem;
  color: var(--bf-ink-3);
}

.bf-key li {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.bf-back {
  margin-top: var(--space-6);
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--bf-ink-2);
  font: 500 0.875rem/1 var(--font-text);
  cursor: pointer;
}

.bf-back::before {
  content: '← ';
}

.bf-back:hover {
  color: var(--bf-ink);
}

/* ---- the plan --------------------------------------------------------------- */

.bf-main {
  min-width: 0;
}

.bf-toolbar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.bf-count {
  margin: 0.25rem 0 0;
  font-size: 0.9375rem;
  color: var(--bf-ink-2);
}

.bf-count .t-num {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--bf-ink);
}

.bf-dates {
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--bf-line);
}

.bf-date {
  display: grid;
  justify-items: center;
  min-width: 52px;
  padding: 0.35rem 0.6rem;
  border-radius: 999px;
  border: 0;
  background: transparent;
  color: var(--bf-ink-2);
  cursor: pointer;
  transition: background 200ms var(--ease-out), color 200ms var(--ease-out);
}

.bf-date:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--bf-ink);
}

.bf-date[aria-pressed='true'] {
  background: #ffffff;
  color: var(--slate);
}

.bf-date-wd {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.bf-date-n {
  font-family: var(--font-display);
  font-size: 0.9375rem;
  font-weight: 700;
  line-height: 1.1;
}

.bf-plan-frame {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--bf-line);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 16px 40px rgba(0, 0, 0, 0.3);
}

.bf-plan-wrap {
  position: relative;
}

.bf-plan {
  position: relative;
  width: 100%;
}

.bf-svg {
  display: block;
  width: 100%;
  height: auto;
  font-family: var(--font-text);
}

.bf-contours rect {
  fill: none;
  stroke: rgba(130, 166, 202, 0.12);
  stroke-width: 1;
}

.bf-channel {
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 1.5;
  stroke-dasharray: 10 12;
}

.bf-svg-muted {
  fill: rgba(255, 255, 255, 0.4);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.bf-land rect {
  fill: #2b3543;
}

.bf-quay {
  fill: none;
  stroke: rgba(255, 255, 255, 0.28);
  stroke-width: 1.5;
}

.bf-svg-land {
  fill: rgba(255, 255, 255, 0.45);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.bf-piers rect {
  fill: #c9d0da;
}

.bf-piers .bf-finger {
  fill: #8f98a6;
}

.bf-svg-pier {
  fill: var(--slate);
  font-family: var(--font-display);
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.bf-berth {
  cursor: pointer;
  outline: none;
}

.bf-berth.is-dim {
  cursor: help;
}

.bf-berth-body {
  fill: rgba(255, 255, 255, 0.05);
  stroke: rgba(255, 255, 255, 0.16);
  stroke-width: 1;
  transition: fill 280ms var(--ease-out), stroke 280ms var(--ease-out);
}

.bf-berth.is-fit .bf-berth-body {
  fill: var(--bf-blue-soft);
  stroke: var(--bf-blue);
  stroke-width: 1.25;
}

.bf-berth.is-free .bf-berth-body {
  fill: var(--bf-blue);
  stroke: #7cb8f0;
}

.bf-berth.is-closed .bf-berth-body {
  fill: rgba(208, 52, 44, 0.08);
  stroke: rgba(208, 52, 44, 0.55);
}

.bf-berth:hover .bf-berth-body,
.bf-berth:focus-visible .bf-berth-body {
  stroke: #ffffff;
  stroke-width: 1.5;
}

.bf-berth.is-selected .bf-berth-body {
  stroke: #ffffff;
  stroke-width: 2;
  filter: url(#bf-glow);
}

.bf-berth-hatch {
  pointer-events: none;
}

.bf-berth-id {
  fill: rgba(255, 255, 255, 0.42);
  font-family: var(--font-display);
  font-size: 11.5px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  paint-order: stroke;
  stroke: rgba(11, 18, 32, 0.55);
  stroke-width: 3px;
  stroke-linejoin: round;
  pointer-events: none;
  transition: fill 280ms var(--ease-out);
}

.bf-berth.is-fit .bf-berth-id {
  fill: #ffffff;
}

.bf-berth-state {
  fill: rgba(255, 255, 255, 0.85);
  font-size: 7.5px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  paint-order: stroke;
  stroke: rgba(11, 18, 32, 0.55);
  stroke-width: 2.5px;
  stroke-linejoin: round;
  pointer-events: none;
}

.bf-boat path {
  fill: rgba(255, 255, 255, 0.94);
  stroke: rgba(11, 18, 32, 0.7);
  stroke-width: 1;
}

.bf-boat rect {
  fill: rgba(36, 44, 56, 0.35);
}

.bf-boat {
  pointer-events: none;
  transform-box: fill-box;
  transform-origin: center;
}

.bf-boat-enter-active {
  transition: opacity 240ms var(--ease-out);
}

.bf-boat-leave-active {
  transition: opacity 120ms var(--ease-out);
}

.bf-boat-enter-from,
.bf-boat-leave-to {
  opacity: 0;
}

.bf-scale line {
  stroke: rgba(255, 255, 255, 0.55);
  stroke-width: 1.5;
}

.bf-scale text,
.bf-north text {
  fill: rgba(255, 255, 255, 0.55);
  font-size: 10px;
  letter-spacing: 0.06em;
}

.bf-north path {
  fill: rgba(255, 255, 255, 0.7);
}

.bf-tip {
  position: absolute;
  z-index: 3;
  transform: translate(-50%, calc(-100% - 10px));
  min-width: 200px;
  max-width: 280px;
  padding: 0.6rem 0.8rem;
  border-radius: var(--radius-md);
  background: rgba(20, 27, 40, 0.92);
  border: 1px solid var(--bf-line-2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  color: var(--bf-ink);
  font-size: 0.8125rem;
  line-height: 1.4;
  pointer-events: none;
  animation: bf-tip-in 200ms var(--bf-spring);
}

.bf-tip::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -6px;
  width: 10px;
  height: 10px;
  transform: translateX(-50%) rotate(45deg);
  background: rgba(20, 27, 40, 0.92);
  border-right: 1px solid var(--bf-line-2);
  border-bottom: 1px solid var(--bf-line-2);
}

@keyframes bf-tip-in {
  from {
    opacity: 0;
    transform: translate(-50%, calc(-100% - 2px));
  }
}

.bf-tip-head {
  margin: 0;
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
}

.bf-tip-head strong {
  font-family: var(--font-display);
  font-size: 1rem;
}

.bf-tip-head span {
  color: var(--bf-ink-2);
}

.bf-tip--no .bf-tip-head span {
  color: #f2a29c;
}

.bf-tip-why {
  margin: 0.35rem 0 0;
  padding: 0;
  list-style: none;
  color: var(--bf-ink-2);
}

.bf-tip-why li + li {
  margin-top: 0.2rem;
}

.bf-tip-cta {
  margin: 0.25rem 0 0;
  color: var(--bf-ink-3);
}

.bf-zoom {
  display: none;
  position: absolute;
  right: 10px;
  bottom: 10px;
  gap: 4px;
}

.bf-zoom button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--bf-line-2);
  background: rgba(20, 27, 40, 0.85);
  color: var(--bf-ink);
  font: 400 1.25rem/1 var(--font-text);
}

.bf-zoom button:disabled {
  opacity: 0.35;
}

/* ---- legend, list, note --------------------------------------------------- */

.bf-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  margin: var(--space-4) 0 0;
  padding: 0;
  list-style: none;
  font-size: 0.8125rem;
  color: var(--bf-ink-2);
}

.bf-legend li {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.bf-sw {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.bf-sw--free {
  background: var(--bf-blue);
  border-color: #7cb8f0;
}

.bf-sw--held {
  background: var(--bf-blue-soft);
  border-color: var(--bf-blue);
}

.bf-sw--dim {
  background: rgba(255, 255, 255, 0.05);
}

.bf-sw--closed {
  background: repeating-linear-gradient(45deg, rgba(208, 52, 44, 0.55) 0 2px, transparent 2px 5px);
  border-color: rgba(208, 52, 44, 0.55);
}

.bf-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  margin: var(--space-6) 0 0;
  padding: 0;
  list-style: none;
}

.bf-row {
  display: grid;
  grid-template-columns: 3.4rem 1fr;
  align-items: center;
  gap: 0.15rem 0.75rem;
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.04);
  color: var(--bf-ink);
  font: 400 0.8125rem/1.3 var(--font-text);
  text-align: left;
}

button.bf-row {
  cursor: pointer;
  transition: background 180ms var(--ease-out);
}

button.bf-row:hover {
  background: rgba(255, 255, 255, 0.1);
}

.bf-row.is-selected {
  border-color: rgba(255, 255, 255, 0.5);
}

.bf-row.is-dim {
  color: var(--bf-ink-3);
}

.bf-row-id {
  font-family: var(--font-display);
  font-size: 0.9375rem;
  font-weight: 700;
}

.bf-row-kind {
  color: var(--bf-ink-2);
}

.bf-row.is-dim .bf-row-kind {
  color: var(--bf-ink-3);
}

.bf-row-id {
  grid-row: span 2;
}

.bf-row-status {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  grid-column: 2;
}

.bf-note {
  margin: var(--space-4) 0 0;
  color: var(--bf-ink-3);
}

.bf-scrim {
  display: none;
}

/* ---- phones ----------------------------------------------------------------- */

@media (max-width: 760px) {
  .bf-stage {
    grid-template-columns: 1fr;
    gap: var(--space-4);
    padding: var(--space-4);
    border-radius: var(--radius-lg);
  }

  .bf-side {
    display: contents;
  }

  .bf-side > * {
    grid-area: auto;
    min-width: 0;
  }

  .bf-vessel {
    order: 3;
    position: sticky;
    bottom: 0;
    z-index: 30;
    margin: 0 calc(-1 * var(--space-4)) calc(-1 * var(--space-4));
    padding: 0 var(--space-4) calc(var(--space-4) + env(safe-area-inset-bottom));
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    border-bottom: 0;
    background: rgba(24, 31, 44, 0.9);
    box-shadow: 0 -16px 40px rgba(0, 0, 0, 0.35);
    transition: none;
  }

  .bf--brief .bf-vessel {
    display: none;
  }

  .bf-handle {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.25rem 0.75rem;
    width: 100%;
    padding: 0.5rem 0 0.75rem;
    border: 0;
    background: transparent;
    color: var(--bf-ink);
    font: 400 0.875rem/1.3 var(--font-text);
    text-align: left;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  .bf-grip {
    flex-basis: 100%;
    width: 40px;
    height: 5px;
    margin: 0 auto 0.4rem;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.3);
  }

  .bf-handle-text {
    flex: 1;
    color: var(--bf-ink-2);
  }

  .bf-handle-text strong {
    font-family: var(--font-display);
    font-size: 1.125rem;
    color: var(--bf-ink);
  }

  .bf-handle-cta {
    padding: 0.4rem 0.8rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.12);
    font-weight: 500;
  }

  .bf-vessel-body {
    display: none;
    max-height: min(68vh, 560px);
    overflow: auto;
    overscroll-behavior: contain;
    padding-bottom: var(--space-2);
  }

  .bf--sheet .bf-vessel-body {
    display: block;
  }

  .bf-samples {
    flex-wrap: nowrap;
    overflow-x: auto;
    margin-left: calc(-1 * var(--space-4));
    margin-right: calc(-1 * var(--space-4));
    padding: 0 var(--space-4);
    scrollbar-width: none;
  }

  .bf-chip {
    flex: none;
  }

  .bf-dim-val {
    font-size: 2rem;
  }

  .bf-main {
    order: 1;
  }

  .bf-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .bf-date {
    flex: 1 1 0;
    min-width: 0;
    padding: 0.35rem 0.2rem;
  }

  .bf-plan-wrap {
    height: 62vh;
    max-height: 560px;
    overflow: auto;
    overscroll-behavior: contain;
    touch-action: pan-x pan-y pinch-zoom;
  }

  .bf-zoom {
    display: flex;
  }

  .bf-list {
    grid-template-columns: 1fr;
  }

  .bf-row {
    grid-template-columns: 3rem 1fr;
  }

  .bf-scrim {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 40;
    background: rgba(11, 18, 32, 0.55);
  }

  .bf-scrim-enter-active,
  .bf-scrim-leave-active {
    transition: opacity 220ms var(--ease-out);
  }

  .bf-scrim-enter-from,
  .bf-scrim-leave-to {
    opacity: 0;
  }

  .bf-brief {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 41;
    max-height: 86vh;
    overflow: auto;
    overscroll-behavior: contain;
    padding: var(--space-4) var(--space-4) calc(var(--space-6) + env(safe-area-inset-bottom));
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    border-bottom: 0;
    background: rgba(24, 31, 44, 0.94);
  }

  .bf-brief::before {
    content: '';
    display: block;
    width: 40px;
    height: 5px;
    margin: 0 auto var(--space-3);
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.3);
  }

  .bf-brief-enter-from,
  .bf-brief-leave-to {
    opacity: 1;
    transform: translateY(100%);
  }

  .bf-brief-id {
    font-size: 2rem;
  }

  .bf-back {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bf *,
  .bf *::before,
  .bf *::after {
    transition: none !important;
    animation: none !important;
  }
}
</style>
