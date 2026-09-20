<template>
  <section class="dyw" :data-tool="tool">
    <div class="dyw-stage">
      <div class="dyw-editor">
        <header class="dyw-top">
          <div class="dyw-title">
            <p class="dyw-overline">Marina PMS · layout editor</p>
            <h2 class="dyw-h">Bahia Mar · north basin <span class="dyw-sample">sample</span></h2>
          </div>
          <p class="dyw-hint" :key="hint">{{ hint }}</p>
        </header>

        <div class="dyw-canvas-wrap" :class="{ 'is-drawing': drawing, 'is-dragging': drag !== null }">
          <div class="dyw-canvas-box">
          <svg
            ref="svgEl"
            class="dyw-canvas"
            :class="{ 'is-narrow': narrow }"
            :viewBox="viewBox"
            preserveAspectRatio="xMidYMid slice"
            role="application"
            tabindex="0"
            aria-label="Berth map over the north basin. Choose a tool below, then tap the water. Enter finishes a dock line, Escape cancels, Delete removes the selected berth, Ctrl Z undoes."
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerCancel"
            @pointerleave="cursor = null"
            @dblclick.prevent="finishDock"
            @keydown="onKeydown"
          >
            <defs>
              <marker id="dyw-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" fill="#3D8EE0" />
              </marker>
              <filter id="dyw-halo" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>

            <image :href="BASIN_SRC" x="0" y="0" :width="FRAME.w" :height="FRAME.h" preserveAspectRatio="none" />

            <!-- scale bar -->
            <g class="dyw-scale" :transform="`translate(${scaleBar.x} ${scaleBar.y})`" aria-hidden="true">
              <line x1="0" y1="0" :x2="scaleBar.w" y2="0" />
              <line x1="0" y1="-5" x2="0" y2="5" />
              <line :x1="scaleBar.w" y1="-5" :x2="scaleBar.w" y2="5" />
              <text x="0" y="-9">30 m · scale approximate</text>
            </g>

            <!-- dock lines -->
            <g v-for="dock in layout.docks" :key="dock.id" class="dyw-dock">
              <path :d="polylinePath(dock.points)" class="dyw-dock-shadow" />
              <path :d="polylinePath(dock.points)" class="dyw-dock-line" />
              <circle v-for="(p, i) in dock.points" :key="i" :cx="p.x" :cy="p.y" r="3.2" class="dyw-dock-node" />
              <text :x="dockLabel(dock).x" :y="dockLabel(dock).y" :transform="dockLabel(dock).transform" class="dyw-dock-label">Dock {{ dock.letter }}</text>
            </g>

            <!-- the dock line being drawn -->
            <g v-if="drawing" class="dyw-drawing" aria-hidden="true">
              <path v-if="draft.length > 1" :d="polylinePath(draft)" class="dyw-dock-line" />
              <line
                v-if="draft.length && rubber"
                :x1="draft[draft.length - 1]!.x"
                :y1="draft[draft.length - 1]!.y"
                :x2="rubber.x"
                :y2="rubber.y"
                class="dyw-rubber"
              />
              <circle v-for="(p, i) in draft" :key="i" :cx="p.x" :cy="p.y" r="4" class="dyw-dock-node" />
              <circle v-if="draft.length" :cx="draft[0]!.x" :cy="draft[0]!.y" r="9" class="dyw-first-node" />
            </g>

            <!-- ghost of the berth about to be dropped -->
            <g v-if="ghost" class="dyw-ghost" aria-hidden="true">
              <path v-if="ghost.kind !== 'mooring'" :d="polygonPath(berthPolygon(ghost))" />
              <circle v-else :cx="ghost.foot.x" :cy="ghost.foot.y" :r="unitsOf(ghost.swingM)" />
            </g>

            <!-- berths -->
            <TransitionGroup tag="g" name="berth">
              <g
                v-for="b in layout.berths"
                :key="b.id"
                class="dyw-berth"
                :class="{ 'is-selected': b.id === selectedId, 'is-flash': flashId === b.id }"
                :data-state="occupancy(b)"
                :style="{ transformOrigin: `${berthCentre(b).x}px ${berthCentre(b).y}px` }"
                @pointerdown="pressBerth(b.id)"
              >
                <template v-if="b.kind === 'mooring'">
                  <circle :cx="b.foot.x" :cy="b.foot.y" :r="unitsOf(b.swingM)" class="dyw-swing" />
                  <circle v-if="b.id === selectedId" :cx="b.foot.x" :cy="b.foot.y" r="10" class="dyw-halo" filter="url(#dyw-halo)" />
                  <circle :cx="b.foot.x" :cy="b.foot.y" r="6" class="dyw-ball" />
                  <circle :cx="b.foot.x" :cy="b.foot.y" r="22" class="dyw-hit" />
                </template>
                <template v-else>
                  <path v-if="b.id === selectedId" :d="polygonPath(berthPolygon(b))" class="dyw-halo" filter="url(#dyw-halo)" />
                  <path :d="polygonPath(berthPolygon(b))" class="dyw-berth-shape" />
                  <path :d="polygonPath(berthPolygon(b))" class="dyw-hit" />
                </template>
                <path v-if="b.vessel" :d="hullPath(b)" :transform="hullTransform(b)" class="dyw-hull" />
                <text
                  :x="berthCentre(b).x"
                  :y="berthCentre(b).y"
                  :transform="labelTransform(b)"
                  class="dyw-berth-label"
                >
                  {{ b.name }}
                </text>
              </g>
            </TransitionGroup>

            <!-- selection: entry arrow and the size handle -->
            <g v-if="selected" class="dyw-selection" aria-hidden="true">
              <line
                v-if="entryArrow"
                :x1="entryArrow.from.x"
                :y1="entryArrow.from.y"
                :x2="entryArrow.to.x"
                :y2="entryArrow.to.y"
                class="dyw-entry"
                marker-end="url(#dyw-arrow)"
              />
              <g
                class="dyw-handle"
                :transform="`translate(${handlePos.x} ${handlePos.y})`"
                @pointerdown.stop="startDrag($event)"
              >
                <circle r="20" class="dyw-handle-hit" />
                <circle r="7" class="dyw-handle-dot" />
              </g>
            </g>
          </svg>

          <!-- the tool bar: a segmented control, thumb-reachable on a phone -->
          <div class="dyw-tools">
            <div class="dyw-seg" role="radiogroup" aria-label="Tool">
              <button
                v-for="t in TOOLS"
                :key="t.id"
                type="button"
                role="radio"
                class="dyw-seg-btn"
                :aria-checked="tool === t.id"
                @click="setTool(t.id)"
              >
                <span class="dyw-seg-icon" v-html="t.icon" />
                <span class="dyw-seg-label">{{ t.label }}</span>
              </button>
            </div>
            <div class="dyw-actions">
              <button v-if="drawing" type="button" class="dyw-act dyw-act--primary" @click="finishDock">
                Finish line
              </button>
              <button type="button" class="dyw-act" :disabled="!history.length" @click="undo">Undo</button>
              <button type="button" class="dyw-act" :disabled="!layout.berths.length && !layout.docks.length" @click="startAgain">
                Start again
              </button>
              <button type="button" class="dyw-act" @click="drawSample">Draw a sample layout</button>
            </div>
          </div>
          </div>

          <!-- inspector: floats over the land on desktop, sits below on a phone -->
          <Transition name="sheet">
            <aside v-if="selected" class="dyw-inspector" :key="selected.id" aria-label="Berth inspector">
              <header class="dyw-insp-head">
                <div>
                  <p class="dyw-insp-name t-num">{{ selected.name }}</p>
                  <p class="dyw-insp-sub">{{ kindLabel(selected.kind) }} · <span class="dyw-state" :data-state="occupancy(selected)">{{ occupancy(selected) }}</span></p>
                </div>
                <button type="button" class="dyw-close" aria-label="Close inspector" @click="selectedId = null">×</button>
              </header>

              <div class="dyw-fields">
                <label v-if="selected.kind !== 'mooring'" class="dyw-field">
                  <span class="dyw-field-k">Kind</span>
                  <select class="dyw-select" :value="selected.kind" @change="setKind(($event.target as HTMLSelectElement).value as BerthKind)">
                    <option value="slip">Slip</option>
                    <option value="side-to">Side-to</option>
                    <option value="med-moor">Med-moor</option>
                  </select>
                </label>

                <template v-if="selected.kind !== 'mooring'">
                  <div class="dyw-field">
                    <span class="dyw-field-k">Length</span>
                    <Stepper :value="selected.lengthM" unit="m" :step="0.5" :min="6" :max="60" @update="patch({ lengthM: $event })" />
                  </div>
                  <div class="dyw-field">
                    <span class="dyw-field-k">Beam</span>
                    <Stepper :value="selected.beamM" unit="m" :step="0.5" :min="2.5" :max="20" @update="patch({ beamM: $event })" />
                  </div>
                </template>
                <div v-else class="dyw-field">
                  <span class="dyw-field-k">Swing radius</span>
                  <Stepper :value="selected.swingM" unit="m" :step="1" :min="8" :max="60" @update="patch({ swingM: $event })" />
                </div>

                <div class="dyw-field">
                  <span class="dyw-field-k">LOA limit</span>
                  <Stepper :value="selected.loaM" unit="m" :step="0.5" :min="4" :max="80" @update="patch({ loaM: $event })" />
                </div>

                <div class="dyw-field">
                  <span class="dyw-field-k">Depth <em class="dyw-field-note">sample</em></span>
                  <Stepper :value="selected.depthM" :unit="`m ${selected.datum}`" :step="0.1" :min="0.5" :max="12" :digits="1" @update="patch({ depthM: $event })" />
                </div>

                <template v-if="selected.kind !== 'mooring'">
                  <div class="dyw-field">
                    <span class="dyw-field-k">Entry heading</span>
                    <Stepper :value="selected.entryDeg" unit="°" :step="5" :min="0" :max="360" :wrap="true" :digits="0" :pad="3" @update="patch({ entryDeg: $event })" />
                  </div>
                  <div v-if="selected.kind !== 'side-to'" class="dyw-field">
                    <span class="dyw-field-k">Mode</span>
                    <Segment :options="MODES" :value="selected.entryMode" @update="patch({ entryMode: $event as EntryMode })" />
                  </div>
                  <div class="dyw-field">
                    <span class="dyw-field-k">Tie side</span>
                    <Segment :options="TIES" :value="selected.tieSide" @update="patch({ tieSide: $event as TieSide })" />
                  </div>
                </template>

                <div class="dyw-field">
                  <span class="dyw-field-k">Access</span>
                  <Segment :options="ACCESS" :value="selected.access" @update="patch({ access: $event as Access })" />
                </div>

                <label class="dyw-field dyw-field--row">
                  <input type="checkbox" class="dyw-check" :checked="selected.closed" @change="patch({ closed: ($event.target as HTMLInputElement).checked })" />
                  <span class="dyw-field-k">Closed today</span>
                </label>
              </div>

              <p class="dyw-insp-brief t-num">{{ approachBrief(selected) }}</p>
              <button type="button" class="dyw-act dyw-act--danger" @click="deleteSelected">Delete {{ selected.name }}</button>
            </aside>
          </Transition>
        </div>
      </div>

      <!-- the day board: falls out of what was drawn -->
      <aside class="dyw-board" aria-label="Day board">
        <header class="dyw-board-head">
          <p class="dyw-overline">Today · {{ today }} · sample marina</p>
          <p class="dyw-count t-num" :key="countText" aria-live="polite">{{ countText }}</p>
        </header>

        <div v-if="!layout.berths.length" class="dyw-empty">
          <p>Draw a dock line, drop a berth, and this board fills itself.</p>
          <button type="button" class="dyw-act dyw-act--primary" @click="drawSample">Draw a sample layout</button>
        </div>

        <TransitionGroup v-else tag="ul" name="row" class="dyw-rows">
          <li
            v-for="b in layout.berths"
            :key="b.id"
            class="dyw-row"
            :class="{ 'is-selected': b.id === selectedId, 'is-flash': flashId === b.id }"
            :data-state="occupancy(b)"
          >
            <button type="button" class="dyw-row-main" @click="selectFromBoard(b.id)">
              <span class="dyw-row-name t-num">{{ b.name }}</span>
              <span class="dyw-row-kind">{{ kindLabel(b.kind) }} · <span class="t-num">{{ b.kind === 'mooring' ? `swing ${b.swingM} m` : `${fmt(b.lengthM)} × ${fmt(b.beamM)} m` }}</span></span>
              <span class="dyw-state" :data-state="occupancy(b)">{{ occupancy(b) }}</span>
            </button>
            <div class="dyw-row-side">
              <button v-if="occupancy(b) === 'free'" type="button" class="dyw-tap dyw-tap--arrive" @click="arrive(b.id)">Arrive</button>
              <button v-else-if="occupancy(b) === 'assigned'" type="button" class="dyw-tap dyw-tap--depart" @click="depart(b.id)">Depart</button>
            </div>
            <Transition name="brief">
              <div v-if="b.vessel" class="dyw-brief">
                <p class="dyw-brief-vessel"><strong>{{ b.vessel.name }}</strong> · <span class="t-num">{{ fmt(b.vessel.loaM) }} m</span> LOA <em>sample vessel</em></p>
                <p class="dyw-brief-line t-num">{{ approachBrief(b) }}</p>
              </div>
            </Transition>
          </li>
        </TransitionGroup>

        <div v-if="journal.length" class="dyw-journal" aria-label="Recent transactions">
          <p class="dyw-overline">Recent</p>
          <TransitionGroup tag="ul" name="row">
            <li v-for="j in journal" :key="j.id" class="dyw-journal-row">
              <span class="t-num dyw-journal-time">{{ j.time }}</span>
              <span>{{ j.text }}</span>
            </li>
          </TransitionGroup>
        </div>
      </aside>
    </div>

    <p class="dyw-foot t-caption">
      Sample basin over the Fort Lauderdale render; the scale is approximate and every depth here is a sample value.
      In the product the map is your marina, and the depth at a berth is your sounding with its datum.
    </p>
    <p class="dyw-sr" aria-live="polite">{{ announcement }}</p>
  </section>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, onBeforeUnmount, onMounted, ref, shallowRef, watch, type PropType } from 'vue'
import {
  FRAME,
  add,
  addDock,
  approachBrief,
  berthCentre,
  berthHandle,
  berthPolygon,
  countBoard,
  countLine,
  defaultApproach,
  dist,
  dot,
  dropBerth,
  dropMooring,
  emptyLayout,
  occupancy,
  pickVessel,
  polygonPath,
  resizeFromHandle,
  sampleLayout,
  scale,
  snapAngle,
  starboardOf,
  sub,
  unit,
  unitsOf,
  vectorOf,
  type Access,
  type Berth,
  type BerthKind,
  type Dock,
  type EntryMode,
  type Layout,
  type Pt,
  type TieSide,
} from '@/data/playbook/draw-your-water-model'

const BASIN_SRC = '/assets/playbook/draw-your-water-basin.webp'

type Tool = 'select' | 'dock' | 'berth' | 'mooring'

const TOOLS: { id: Tool; label: string; icon: string }[] = [
  {
    id: 'select',
    label: 'Select',
    icon: '<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M5 3l11 7-4.5 1.2L14 16l-2 1-2.5-4.6L6 15z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  },
  {
    id: 'dock',
    label: 'Dock line',
    icon: '<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M3 15L9 7l8 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="3" cy="15" r="1.8" fill="currentColor"/><circle cx="9" cy="7" r="1.8" fill="currentColor"/><circle cx="17" cy="13" r="1.8" fill="currentColor"/></svg>',
  },
  {
    id: 'berth',
    label: 'Berth',
    icon: '<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><rect x="6.5" y="3" width="7" height="14" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M2 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  },
  {
    id: 'mooring',
    label: 'Mooring ball',
    icon: '<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="1.4" stroke-dasharray="2.5 2.5"/><circle cx="10" cy="10" r="2.6" fill="currentColor"/></svg>',
  },
]

const MODES = [
  { value: 'bow-in', label: 'Bow-in' },
  { value: 'stern-in', label: 'Stern-in' },
]
const TIES = [
  { value: 'port', label: 'Port' },
  { value: 'starboard', label: 'Starboard' },
  { value: 'either', label: 'Either' },
]
const ACCESS = [
  { value: 'assigned', label: 'Assigned' },
  { value: 'resident', label: 'Resident' },
  { value: 'courtesy', label: 'Courtesy' },
]

/* --- Small controls, kept local so the journey stays one file ------------- */

const Stepper = defineComponent({
  props: {
    value: { type: Number, required: true },
    unit: { type: String, default: '' },
    step: { type: Number, default: 1 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    digits: { type: Number, default: 1 },
    pad: { type: Number, default: 0 },
    wrap: { type: Boolean, default: false },
  },
  emits: ['update'],
  setup(props, { emit }) {
    const show = () => {
      const v = props.digits ? props.value.toFixed(props.digits).replace(/\.0$/, '') : String(Math.round(props.value))
      return props.pad ? v.padStart(props.pad, '0') : v
    }
    const go = (dir: number) => {
      let next = Math.round((props.value + dir * props.step) * 100) / 100
      if (props.wrap) next = ((next % props.max) + props.max) % props.max
      else next = Math.max(props.min, Math.min(props.max, next))
      emit('update', next)
    }
    return () =>
      h('div', { class: 'dyw-stepper', role: 'group' }, [
        h('button', { type: 'button', class: 'dyw-step', 'aria-label': 'Less', onClick: () => go(-1) }, '−'),
        h('span', { class: 'dyw-step-val t-num' }, [show(), h('span', { class: 'dyw-step-unit' }, ` ${props.unit}`)]),
        h('button', { type: 'button', class: 'dyw-step', 'aria-label': 'More', onClick: () => go(1) }, '+'),
      ])
  },
})

const Segment = defineComponent({
  props: {
    options: { type: Array as PropType<{ value: string; label: string }[]>, required: true },
    value: { type: String, required: true },
  },
  emits: ['update'],
  setup(props, { emit }) {
    return () =>
      h(
        'div',
        { class: 'dyw-seg dyw-seg--small', role: 'radiogroup' },
        props.options.map((o) =>
          h(
            'button',
            {
              type: 'button',
              role: 'radio',
              class: 'dyw-seg-btn',
              'aria-checked': props.value === o.value,
              onClick: () => emit('update', o.value),
            },
            o.label,
          ),
        ),
      )
  },
})

/* --- State ------------------------------------------------------------------ */

const layout = ref<Layout>(emptyLayout())
const history = shallowRef<Layout[]>([])
const tool = ref<Tool>('dock')
const selectedId = ref<string | null>(null)
const draft = ref<Pt[]>([])
const cursor = ref<Pt | null>(null)
const flashId = ref<string | null>(null)
const announcement = ref('')
const svgEl = ref<SVGSVGElement | null>(null)
const narrow = ref(false)
const coarse = ref(false)
const journal = ref<{ id: number; time: string; text: string }[]>([])
let journalSeq = 0
let flashTimer: ReturnType<typeof setTimeout> | undefined

const drawing = computed(() => tool.value === 'dock' && draft.value.length > 0)
const selected = computed(() => layout.value.berths.find((b) => b.id === selectedId.value) ?? null)
const counts = computed(() => countBoard(layout.value.berths))
const countText = computed(() => countLine(counts.value))
const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })

/* A phone sees a tighter window on the basin so a 12 m berth stays finger-sized. */
const viewBox = computed(() => (narrow.value ? '320 190 480 480' : '200 175 720 450'))
const hitRadius = computed(() => (coarse.value ? 48 : 36))
const scaleBar = computed(() => ({ x: narrow.value ? 340 : 222, y: narrow.value ? 222 : 205, w: unitsOf(30) }))

const hint = computed(() => {
  if (tool.value === 'dock') {
    if (draft.value.length === 0) return 'Tap the water to start a dock line.'
    if (draft.value.length === 1) return 'Tap again for the next corner.'
    return 'Tap more corners, or double-tap, press Enter or choose Finish line.'
  }
  if (tool.value === 'berth') return layout.value.docks.length ? 'Tap along a dock line to drop a 12 × 4.5 m berth. It snaps flush against a neighbour.' : 'Draw a dock line first, then drop berths along it.'
  if (tool.value === 'mooring') return 'Tap open water to drop a mooring ball with a 25 m swing.'
  return selected.value ? `${selected.value.name} selected. Drag the blue handle to resize.` : 'Tap a berth to inspect it.'
})

/* --- History ---------------------------------------------------------------- */

const snapshot = (l: Layout): Layout => JSON.parse(JSON.stringify(l))
const commit = () => {
  history.value = [...history.value.slice(-59), snapshot(layout.value)]
}
const undo = () => {
  const prev = history.value[history.value.length - 1]
  if (!prev) return
  history.value = history.value.slice(0, -1)
  layout.value = prev
  draft.value = []
  if (selectedId.value && !prev.berths.some((b) => b.id === selectedId.value)) selectedId.value = null
  say('Undone.')
}
const startAgain = () => {
  commit()
  layout.value = emptyLayout()
  draft.value = []
  selectedId.value = null
  journal.value = []
  tool.value = 'dock'
  say('Cleared. Tap the water to start a dock line.')
}

const say = (text: string) => {
  announcement.value = ''
  requestAnimationFrame(() => (announcement.value = text))
}

/* --- Pointer geometry ------------------------------------------------------- */

const toFrame = (e: PointerEvent | MouseEvent): Pt | null => {
  const svg = svgEl.value
  if (!svg) return null
  const ctm = svg.getScreenCTM()
  if (!ctm) return null
  const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse())
  return { x: Math.max(0, Math.min(FRAME.w, p.x)), y: Math.max(0, Math.min(FRAME.h, p.y)) }
}

let press: { x: number; y: number; berth: string | null; id: number } | null = null
let pressedBerth: string | null = null
const drag = ref<{ id: string; berth: Berth } | null>(null)

const pressBerth = (id: string) => {
  pressedBerth = id
}

const onPointerDown = (e: PointerEvent) => {
  if (e.button !== 0 && e.pointerType === 'mouse') return
  press = { x: e.clientX, y: e.clientY, berth: pressedBerth, id: e.pointerId }
  pressedBerth = null
  svgEl.value?.focus({ preventScroll: true })
}

const onPointerMove = (e: PointerEvent) => {
  const p = toFrame(e)
  if (!p) return
  cursor.value = p
  if (drag.value) {
    const b = layout.value.berths.find((x) => x.id === drag.value!.id)
    if (b) Object.assign(b, resizeFromHandle(b, p))
  }
}

const onPointerUp = (e: PointerEvent) => {
  if (drag.value) {
    drag.value = null
    try {
      svgEl.value?.releasePointerCapture(e.pointerId)
    } catch {
      /* the capture may already be gone */
    }
    return
  }
  if (!press) return
  const moved = Math.hypot(e.clientX - press.x, e.clientY - press.y)
  const hit = press.berth
  press = null
  if (moved > 8) return
  const p = toFrame(e)
  if (!p) return
  tap(p, hit)
}

const onPointerCancel = () => {
  press = null
  drag.value = null
}

const startDrag = (e: PointerEvent) => {
  if (!selected.value) return
  commit()
  drag.value = { id: selected.value.id, berth: selected.value }
  press = null
  try {
    svgEl.value?.setPointerCapture(e.pointerId)
  } catch {
    /* capture is a nicety */
  }
}

/* --- Tools ------------------------------------------------------------------ */

const setTool = (t: Tool) => {
  if (tool.value === 'dock' && draft.value.length > 1 && t !== 'dock') finishDock()
  else draft.value = []
  tool.value = t
}

const tap = (p: Pt, hit: string | null) => {
  if (tool.value === 'dock') {
    const last = draft.value[draft.value.length - 1]
    if (last && draft.value.length > 1 && dist(last, p) < 14) return finishDock()
    draft.value = [...draft.value, last ? snapAngle(last, p) : p]
    return
  }
  if (hit) {
    selectedId.value = hit
    say(`${hit} selected.`)
    return
  }
  if (tool.value === 'berth') {
    const dropped = dropBerth(layout.value, p, 'slip', hitRadius.value)
    if (!dropped) {
      say(layout.value.docks.length ? 'No dock line there. Tap closer to one.' : 'Draw a dock line first.')
      return
    }
    commit()
    layout.value = dropped.layout
    selectedId.value = dropped.berth.id
    say(`${dropped.berth.name} dropped${dropped.snapped ? ', flush with its neighbour' : ''}.`)
    return
  }
  if (tool.value === 'mooring') {
    commit()
    const dropped = dropMooring(layout.value, p)
    layout.value = dropped.layout
    selectedId.value = dropped.berth.id
    say(`${dropped.berth.name} dropped.`)
    return
  }
  selectedId.value = null
}

const finishDock = () => {
  if (tool.value !== 'dock') return
  let pts = draft.value
  /* a double-click adds the same point twice; keep one */
  while (pts.length > 1 && dist(pts[pts.length - 1]!, pts[pts.length - 2]!) < 14) pts = pts.slice(0, -1)
  if (pts.length < 2) {
    draft.value = []
    return
  }
  commit()
  const { layout: next, dock } = addDock(layout.value, pts)
  layout.value = next
  draft.value = []
  tool.value = 'berth'
  say(`Dock ${dock.letter} drawn. Now tap along it to drop berths.`)
}

const drawSample = () => {
  commit()
  layout.value = sampleLayout()
  draft.value = []
  tool.value = 'select'
  selectedId.value = layout.value.berths[1]?.id ?? null
  say('Sample layout drawn: Dock A with three berths. The day board is filled.')
}

const selectFromBoard = (id: string) => {
  selectedId.value = id
  if (tool.value === 'dock') setTool('select')
}

const deleteSelected = () => {
  if (!selected.value) return
  commit()
  const name = selected.value.name
  layout.value = { ...layout.value, berths: layout.value.berths.filter((b) => b.id !== selectedId.value) }
  selectedId.value = null
  say(`${name} deleted.`)
}

const patch = (fields: Partial<Berth>) => {
  const b = selected.value
  if (!b) return
  commit()
  Object.assign(b, fields)
}

const setKind = (kind: BerthKind) => {
  const b = selected.value
  if (!b) return
  commit()
  b.kind = kind
  Object.assign(b, defaultApproach(b))
}

/* --- The day board ---------------------------------------------------------- */

const stamp = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
const log = (text: string) => {
  journal.value = [{ id: ++journalSeq, time: stamp(), text }, ...journal.value].slice(0, 4)
}
const flash = (id: string) => {
  flashId.value = id
  clearTimeout(flashTimer)
  flashTimer = setTimeout(() => (flashId.value = null), 700)
}

const arrive = (id: string) => {
  const b = layout.value.berths.find((x) => x.id === id)
  if (!b || occupancy(b) !== 'free') return
  const vessel = pickVessel(b, layout.value.berths)
  if (!vessel) {
    say(`No sample vessel fits a ${b.loaM} m limit. Raise the LOA limit in the inspector.`)
    selectedId.value = id
    return
  }
  commit()
  b.vessel = vessel
  flash(id)
  log(`${vessel.name} arrived · ${b.name}`)
  say(`${vessel.name} assigned to ${b.name}. ${approachBrief(b)}.`)
}

const depart = (id: string) => {
  const b = layout.value.berths.find((x) => x.id === id)
  if (!b?.vessel) return
  commit()
  const name = b.vessel.name
  b.vessel = null
  flash(id)
  log(`${name} departed · ${b.name} free`)
  say(`${name} departed. ${b.name} is free.`)
}

/* --- Keyboard --------------------------------------------------------------- */

const onKeydown = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
    e.preventDefault()
    undo()
    return
  }
  if (e.key === 'Enter' && drawing.value) {
    e.preventDefault()
    finishDock()
  } else if (e.key === 'Escape') {
    if (drawing.value) draft.value = []
    else selectedId.value = null
  } else if ((e.key === 'Delete' || e.key === 'Backspace') && selected.value) {
    e.preventDefault()
    deleteSelected()
  }
}

/* --- Rendering helpers ------------------------------------------------------ */

const polylinePath = (pts: Pt[]) => pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')

const rubber = computed(() => {
  const last = draft.value[draft.value.length - 1]
  if (!last || !cursor.value) return null
  return snapAngle(last, cursor.value)
})

const ghost = computed<Berth | null>(() => {
  if (!cursor.value || drag.value) return null
  if (tool.value === 'berth') return dropBerth(layout.value, cursor.value, 'slip', hitRadius.value)?.berth ?? null
  if (tool.value === 'mooring') return dropMooring(layout.value, cursor.value).berth
  return null
})

const handlePos = computed(() => (selected.value ? berthHandle(selected.value) : { x: 0, y: 0 }))

const entryArrow = computed(() => {
  const b = selected.value
  if (!b || b.kind === 'mooring') return null
  const v = vectorOf(b.entryDeg)
  const outer = b.kind === 'side-to' ? berthCentre(b) : berthHandle(b)
  const from = sub(outer, scale(v, b.kind === 'side-to' ? unitsOf(b.lengthM) / 2 + 26 : 30))
  return { from, to: sub(outer, scale(v, b.kind === 'side-to' ? unitsOf(b.lengthM) / 2 + 6 : 6)) }
})

/* The dock's name runs along its first segment, on the side with no berths. */
const dockLabel = (dock: Dock): Pt & { transform: string } => {
  const a = dock.points[0]!
  const b = dock.points[1] ?? { x: a.x + 1, y: a.y }
  const d = unit(sub(b, a))
  const port = scale(starboardOf(d), -1)
  const berthed = layout.value.berths.filter((x) => x.dockId === dock.id)
  const onPort = berthed.filter((x) => dot(x.normal, port) > 0.5).length
  const side = onPort > berthed.length - onPort ? starboardOf(d) : port
  const mid = add(scale(add(a, b), 0.5), scale(side, 11))
  const deg = bearingOfDir(d) - 90
  const upright = ((deg % 360) + 360) % 360
  const rot = upright > 90 && upright < 270 ? upright - 180 : upright
  return { x: mid.x, y: mid.y, transform: `rotate(${rot.toFixed(1)} ${mid.x.toFixed(1)} ${mid.y.toFixed(1)})` }
}

const hullPath = (b: Berth): string => {
  const l = unitsOf(b.vessel ? b.vessel.loaM : 10) * 0.92
  const w = Math.min(unitsOf(b.beamM) * 0.68, l * 0.34)
  return `M0 ${-l / 2} C${w / 2} ${-l / 2 + l * 0.22} ${w / 2} ${l * 0.1} ${w / 2} ${l / 2 - 2} L${-w / 2} ${l / 2 - 2} C${-w / 2} ${l * 0.1} ${-w / 2} ${-l / 2 + l * 0.22} 0 ${-l / 2} Z`
}
const hullTransform = (b: Berth): string => {
  const c = berthCentre(b)
  const heading = b.kind === 'mooring' ? 20 : b.entryMode === 'stern-in' && b.kind !== 'side-to' ? b.entryDeg + 180 : b.entryDeg
  return `translate(${c.x.toFixed(1)} ${c.y.toFixed(1)}) rotate(${heading})`
}
const labelTransform = (b: Berth): string => {
  const c = berthCentre(b)
  if (b.kind === 'mooring') return `translate(0 ${unitsOf(b.swingM) + 12})`
  const deg = b.kind === 'side-to' ? bearingOfDir(b.dir) - 90 : bearingOfDir(b.normal) - 90
  const upright = ((deg % 360) + 360) % 360
  const rot = upright > 90 && upright < 270 ? upright - 180 : upright
  return `rotate(${rot} ${c.x.toFixed(1)} ${c.y.toFixed(1)})`
}
const bearingOfDir = (d: Pt) => ((Math.atan2(d.x, -d.y) * 180) / Math.PI + 360) % 360

const kindLabel = (k: BerthKind) => ({ slip: 'Slip', 'side-to': 'Side-to', 'med-moor': 'Med-moor', mooring: 'Mooring ball' })[k]
const fmt = (n: number) => n.toFixed(1).replace(/\.0$/, '')

/* --- Environment ------------------------------------------------------------ */

let mqNarrow: MediaQueryList | null = null
let mqCoarse: MediaQueryList | null = null
const syncMq = () => {
  narrow.value = mqNarrow?.matches ?? false
  coarse.value = mqCoarse?.matches ?? false
}
onMounted(() => {
  mqNarrow = window.matchMedia('(max-width: 720px)')
  mqCoarse = window.matchMedia('(pointer: coarse)')
  mqNarrow.addEventListener('change', syncMq)
  mqCoarse.addEventListener('change', syncMq)
  syncMq()
})
onBeforeUnmount(() => {
  mqNarrow?.removeEventListener('change', syncMq)
  mqCoarse?.removeEventListener('change', syncMq)
  clearTimeout(flashTimer)
})

watch(tool, () => {
  cursor.value = null
})
</script>

<style scoped>
.dyw {
  --dyw-ink: #ffffff;
  --dyw-ink-2: rgba(255, 255, 255, 0.72);
  --dyw-ink-3: rgba(255, 255, 255, 0.5);
  --dyw-line: rgba(255, 255, 255, 0.12);
  --dyw-raised: rgba(255, 255, 255, 0.06);
  --dyw-glass: rgba(36, 44, 56, 0.78);
  --dyw-spring: cubic-bezier(0.34, 1.4, 0.64, 1);
  color: var(--dyw-ink);
}

.dyw-stage {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 21.5rem;
  gap: 0;
  background: var(--slate);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: 0 30px 80px -40px rgba(11, 18, 32, 0.6);
}

.dyw-editor {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.dyw-top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-6) var(--space-6) var(--space-4);
}

.dyw-overline {
  margin: 0;
  font-family: var(--font-text);
  font-size: var(--type-overline);
  font-weight: 500;
  letter-spacing: var(--type-overline-ls);
  text-transform: uppercase;
  color: var(--dyw-ink-3);
}

.dyw-h {
  margin: var(--space-2) 0 0;
  font-family: var(--font-display);
  font-size: var(--type-h3);
  font-weight: 700;
  color: var(--dyw-ink);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.dyw-sample {
  font-family: var(--font-text);
  font-size: var(--type-micro);
  font-weight: 500;
  letter-spacing: var(--type-micro-ls);
  text-transform: uppercase;
  color: var(--dyw-ink-2);
  padding: 0.2rem 0.5rem;
  border: 1px solid var(--dyw-line);
  border-radius: 999px;
}

.dyw-hint {
  margin: 0;
  max-width: 34ch;
  min-height: 2.8em;
  text-align: right;
  font-family: var(--font-text);
  font-size: var(--type-body-sm);
  line-height: 1.4;
  color: var(--dyw-ink-2);
  animation: hint-in 320ms var(--ease-out);
}

@keyframes hint-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
}

.dyw-canvas-wrap {
  position: relative;
  margin: 0 var(--space-6) var(--space-6);
}

.dyw-canvas-box {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: #0f2a3a;
  box-shadow: inset 0 0 0 1px var(--dyw-line);
}

.dyw-canvas {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  max-height: calc(var(--stage-cap, 80vh) - 9rem);
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  outline: none;
  cursor: default;
}

.dyw-canvas:focus-visible {
  box-shadow: inset 0 0 0 2px var(--maris-night);
}

.dyw[data-tool='dock'] .dyw-canvas,
.dyw[data-tool='berth'] .dyw-canvas,
.dyw[data-tool='mooring'] .dyw-canvas {
  cursor: crosshair;
}

.is-dragging .dyw-canvas {
  cursor: grabbing;
}

/* -- map marks -- */

.dyw-scale line {
  stroke: rgba(255, 255, 255, 0.85);
  stroke-width: 1.5;
}

.dyw-scale text {
  font-family: var(--font-text);
  font-size: 11px;
  fill: rgba(255, 255, 255, 0.85);
  paint-order: stroke;
  stroke: rgba(11, 18, 32, 0.6);
  stroke-width: 3px;
  stroke-linejoin: round;
}

.dyw-dock-shadow {
  fill: none;
  stroke: rgba(11, 18, 32, 0.55);
  stroke-width: 9;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.dyw-dock-line {
  fill: none;
  stroke: #ffffff;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.dyw-dock-node {
  fill: #ffffff;
  stroke: var(--slate);
  stroke-width: 1.2;
}

.dyw-dock-label {
  font-family: var(--font-text);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  fill: #ffffff;
  text-anchor: middle;
  dominant-baseline: central;
  paint-order: stroke;
  stroke: rgba(11, 18, 32, 0.7);
  stroke-width: 3px;
  stroke-linejoin: round;
  pointer-events: none;
}

.dyw-drawing .dyw-dock-line {
  stroke: var(--maris-night);
}

.dyw-rubber {
  stroke: var(--maris-night);
  stroke-width: 3;
  stroke-dasharray: 6 5;
  stroke-linecap: round;
}

.dyw-first-node {
  fill: none;
  stroke: var(--maris-night);
  stroke-width: 1.5;
  opacity: 0.8;
}

.dyw-ghost path,
.dyw-ghost circle {
  fill: rgba(255, 255, 255, 0.12);
  stroke: rgba(255, 255, 255, 0.85);
  stroke-width: 1.4;
  stroke-dasharray: 4 3;
  pointer-events: none;
}

.dyw-berth {
  cursor: pointer;
  --edge: var(--status-ok);
}

.dyw-berth[data-state='assigned'] {
  --edge: var(--maris-night);
}

.dyw-berth[data-state='resident'] {
  --edge: var(--orbis-night);
}

.dyw-berth[data-state='courtesy'] {
  --edge: var(--status-warn);
}

.dyw-berth[data-state='closed'] {
  --edge: var(--status-alert);
}

.dyw-berth-shape {
  fill: rgba(255, 255, 255, 0.16);
  stroke: var(--edge);
  stroke-width: 1.6;
  stroke-linejoin: round;
  transition: fill 200ms var(--ease-out), stroke 200ms var(--ease-out);
}

.dyw-berth[data-state='closed'] .dyw-berth-shape {
  fill: rgba(208, 52, 44, 0.16);
}

.dyw-berth:hover .dyw-berth-shape {
  fill: rgba(255, 255, 255, 0.28);
}

.dyw-berth.is-selected .dyw-berth-shape {
  fill: rgba(255, 255, 255, 0.3);
  stroke: #ffffff;
  stroke-width: 1.8;
}

.dyw-hit {
  fill: transparent;
  stroke: transparent;
  stroke-width: 14;
}

.dyw-halo {
  fill: var(--maris-night);
  stroke: var(--maris-night);
  stroke-width: 10;
  opacity: 0.75;
  pointer-events: none;
  animation: halo-in 420ms var(--dyw-spring);
}

@keyframes halo-in {
  from {
    opacity: 0;
  }
}

.dyw-hull {
  fill: #ffffff;
  stroke: rgba(11, 18, 32, 0.45);
  stroke-width: 1;
  pointer-events: none;
  animation: hull-in 480ms var(--dyw-spring);
}

@keyframes hull-in {
  from {
    opacity: 0;
  }
}

.dyw-berth-label {
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  fill: #ffffff;
  text-anchor: middle;
  dominant-baseline: central;
  paint-order: stroke;
  stroke: rgba(11, 18, 32, 0.75);
  stroke-width: 2.5px;
  stroke-linejoin: round;
  pointer-events: none;
}

.dyw-swing {
  fill: rgba(255, 255, 255, 0.1);
  stroke: var(--edge);
  stroke-width: 1.2;
  stroke-dasharray: 4 3;
}

.dyw-ball {
  fill: #ffffff;
  stroke: var(--edge);
  stroke-width: 2;
}

.dyw-berth.is-flash .dyw-berth-shape,
.dyw-berth.is-flash .dyw-ball {
  animation: flash 700ms var(--ease-out);
}

@keyframes flash {
  0% {
    fill: rgba(61, 142, 224, 0.75);
  }
}

.berth-enter-active {
  transition: transform 460ms var(--dyw-spring), opacity 200ms var(--ease-out);
  transform-box: view-box;
}

.berth-leave-active {
  transition: transform 220ms var(--ease-out), opacity 180ms var(--ease-out);
  transform-box: view-box;
}

.berth-enter-from,
.berth-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.dyw-entry {
  stroke: var(--maris-night);
  stroke-width: 2.4;
  stroke-linecap: round;
  animation: hull-in 300ms var(--ease-out);
}

.dyw-handle {
  cursor: grab;
}

.dyw-handle-hit {
  fill: transparent;
}

.dyw-handle-dot {
  fill: #ffffff;
  stroke: var(--maris-night);
  stroke-width: 3;
  transition: transform 200ms var(--dyw-spring);
  transform-box: fill-box;
  transform-origin: center;
}

.dyw-handle:hover .dyw-handle-dot,
.is-dragging .dyw-handle-dot {
  transform: scale(1.3);
}

/* -- tool bar -- */

.dyw-tools {
  position: absolute;
  left: 50%;
  bottom: var(--space-4);
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  max-width: calc(100% - 2rem);
  padding: 0.375rem;
  border-radius: 999px;
  background: rgba(11, 18, 32, 0.66);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  backdrop-filter: blur(20px) saturate(140%);
  box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.dyw-seg {
  display: inline-flex;
  padding: 0.2rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  gap: 0.125rem;
}

.dyw-seg-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 2.25rem;
  padding: 0 0.8rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--dyw-ink-2);
  font-family: var(--font-text);
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: background 220ms var(--ease-out), color 220ms var(--ease-out), transform 220ms var(--dyw-spring);
}

.dyw-seg-btn:hover {
  color: var(--dyw-ink);
}

.dyw-seg-btn:active {
  transform: scale(0.96);
}

.dyw-seg-btn[aria-checked='true'] {
  background: #ffffff;
  color: var(--slate);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.dyw-seg-icon {
  display: inline-flex;
}

.dyw-seg-icon :deep(svg) {
  display: block;
}

.dyw-seg--small {
  width: 100%;
  background: rgba(255, 255, 255, 0.08);
}

.dyw-seg--small .dyw-seg-btn {
  flex: 1;
  justify-content: center;
  min-height: 2rem;
  padding: 0 0.5rem;
  font-size: 0.8125rem;
}

.dyw-actions {
  display: inline-flex;
  gap: 0.125rem;
}

.dyw-act {
  min-height: 2.25rem;
  padding: 0 0.8rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--dyw-ink-2);
  font-family: var(--font-text);
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: background 200ms var(--ease-out), color 200ms var(--ease-out), transform 200ms var(--dyw-spring);
}

.dyw-act:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  color: var(--dyw-ink);
}

.dyw-act:active:not(:disabled) {
  transform: scale(0.96);
}

.dyw-act:disabled {
  opacity: 0.4;
  cursor: default;
}

.dyw-act--primary {
  background: var(--maris-night);
  color: #ffffff;
}

.dyw-act--primary:hover:not(:disabled) {
  background: var(--maris-day);
}

.dyw-act--danger {
  color: #f08c86;
}

/* -- inspector -- */

.dyw-inspector {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  width: 17.5rem;
  max-height: calc(100% - 2rem);
  overflow: auto;
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--dyw-glass);
  -webkit-backdrop-filter: blur(22px) saturate(140%);
  backdrop-filter: blur(22px) saturate(140%);
  box-shadow: 0 24px 50px -24px rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(255, 255, 255, 0.12);
  scrollbar-width: thin;
}

.sheet-enter-active {
  transition: transform 420ms var(--dyw-spring), opacity 220ms var(--ease-out);
}

.sheet-leave-active {
  transition: transform 200ms var(--ease-out), opacity 160ms var(--ease-out);
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

.dyw-insp-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.dyw-insp-name {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.1;
}

.dyw-insp-sub {
  margin: 0.2rem 0 0;
  font-family: var(--font-text);
  font-size: var(--type-caption);
  color: var(--dyw-ink-2);
}

.dyw-close {
  width: 2rem;
  height: 2rem;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: var(--dyw-ink);
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
}

.dyw-fields {
  display: grid;
  gap: 0.625rem;
}

.dyw-field {
  display: grid;
  gap: 0.3rem;
}

.dyw-field--row {
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
}

.dyw-field-k {
  font-family: var(--font-text);
  font-size: var(--type-caption);
  font-weight: 500;
  color: var(--dyw-ink-2);
}

.dyw-field-note {
  font-style: normal;
  font-size: var(--type-micro);
  letter-spacing: var(--type-micro-ls);
  text-transform: uppercase;
  color: var(--dyw-ink-3);
  margin-left: 0.3rem;
}

.dyw-select {
  width: 100%;
  min-height: 2.25rem;
  padding: 0 0.7rem;
  border: 1px solid var(--dyw-line);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.08);
  color: var(--dyw-ink);
  font-family: var(--font-text);
  font-size: 0.875rem;
}

.dyw-select option {
  color: var(--slate);
}

.dyw-check {
  width: 1.1rem;
  height: 1.1rem;
  accent-color: var(--maris-night);
}

.dyw-insp-brief {
  margin: var(--space-4) 0 var(--space-3);
  padding: 0.6rem 0.75rem;
  border-radius: var(--radius-sm);
  background: rgba(61, 142, 224, 0.16);
  font-size: 0.8125rem;
  font-weight: 700;
  line-height: 1.4;
  color: var(--dyw-ink);
}

.dyw-inspector .dyw-act {
  padding-left: 0.5rem;
}

:deep(.dyw-stepper) {
  display: grid;
  grid-template-columns: 2.25rem 1fr 2.25rem;
  align-items: center;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid var(--dyw-line);
  overflow: hidden;
}

:deep(.dyw-step) {
  height: 2.25rem;
  border: 0;
  background: transparent;
  color: var(--dyw-ink);
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 160ms var(--ease-out);
}

:deep(.dyw-step:hover) {
  background: rgba(255, 255, 255, 0.1);
}

:deep(.dyw-step-val) {
  text-align: center;
  font-size: 0.9375rem;
  font-weight: 700;
}

:deep(.dyw-step-unit) {
  font-family: var(--font-text);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--dyw-ink-2);
}

/* -- day board -- */

.dyw-board {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-6) var(--space-5);
  background: var(--navy);
  border-left: 1px solid var(--dyw-line);
  min-height: 100%;
}

.dyw-board-head {
  display: grid;
  gap: var(--space-2);
}

.dyw-count {
  margin: 0;
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  animation: hint-in 260ms var(--ease-out);
}

.dyw-empty {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-5) var(--space-4);
  border: 1px dashed var(--dyw-line);
  border-radius: var(--radius-lg);
}

.dyw-empty p {
  margin: 0;
  font-family: var(--font-text);
  font-size: var(--type-body-sm);
  line-height: 1.5;
  color: var(--dyw-ink-2);
}

.dyw-rows {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
  position: relative;
}

.dyw-row {
  --edge: var(--status-ok);
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  border-radius: var(--radius-md);
  background: var(--dyw-raised);
  box-shadow: inset 0 0 0 1px transparent;
  transition: background 200ms var(--ease-out), box-shadow 200ms var(--ease-out);
}

.dyw-row[data-state='assigned'] {
  --edge: var(--maris-night);
}

.dyw-row[data-state='resident'] {
  --edge: var(--orbis-night);
}

.dyw-row[data-state='courtesy'] {
  --edge: var(--status-warn);
}

.dyw-row[data-state='closed'] {
  --edge: var(--status-alert);
}

.dyw-row.is-selected {
  box-shadow: inset 0 0 0 1px var(--maris-night);
}

.dyw-row.is-flash {
  animation: row-flash 700ms var(--ease-out);
}

@keyframes row-flash {
  0% {
    background: rgba(61, 142, 224, 0.45);
  }
}

.dyw-row-main {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'name state'
    'kind kind';
  column-gap: 0.6rem;
  row-gap: 0.1rem;
  align-items: baseline;
  text-align: left;
  padding: 0.7rem 0.85rem;
  border: 0;
  background: transparent;
  color: var(--dyw-ink);
  cursor: pointer;
  min-width: 0;
}

.dyw-row-name {
  grid-area: name;
  font-size: 1.125rem;
  font-weight: 700;
}

.dyw-row-kind {
  grid-area: kind;
  font-family: var(--font-text);
  font-size: var(--type-caption);
  color: var(--dyw-ink-2);
}

.dyw-state {
  grid-area: state;
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: var(--font-text);
  font-size: var(--type-micro);
  font-weight: 500;
  letter-spacing: var(--type-micro-ls);
  text-transform: uppercase;
  color: var(--dyw-ink-2);
  white-space: nowrap;
}

.dyw-state::before {
  content: '';
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--edge, var(--status-ok));
}

.dyw-state[data-state='assigned'] {
  --edge: var(--maris-night);
}

.dyw-state[data-state='resident'] {
  --edge: var(--orbis-night);
}

.dyw-state[data-state='courtesy'] {
  --edge: var(--status-warn);
}

.dyw-state[data-state='closed'] {
  --edge: var(--status-alert);
}

.dyw-row-side {
  padding-right: 0.6rem;
}

.dyw-tap {
  min-height: 2.25rem;
  padding: 0 0.9rem;
  border: 0;
  border-radius: 999px;
  font-family: var(--font-text);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 200ms var(--ease-out), transform 200ms var(--dyw-spring);
}

.dyw-tap:active {
  transform: scale(0.94);
}

.dyw-tap--arrive {
  background: var(--maris-night);
  color: #ffffff;
}

.dyw-tap--arrive:hover {
  background: var(--maris-day);
}

.dyw-tap--depart {
  background: rgba(255, 255, 255, 0.12);
  color: var(--dyw-ink);
}

.dyw-tap--depart:hover {
  background: rgba(255, 255, 255, 0.2);
}

.dyw-brief {
  grid-column: 1 / -1;
  padding: 0 0.85rem 0.75rem;
  overflow: hidden;
}

.dyw-brief-vessel {
  margin: 0;
  font-family: var(--font-text);
  font-size: var(--type-caption);
  color: var(--dyw-ink-2);
}

.dyw-brief-vessel strong {
  color: var(--dyw-ink);
  font-weight: 500;
}

.dyw-brief-vessel em {
  font-style: normal;
  font-size: var(--type-micro);
  letter-spacing: var(--type-micro-ls);
  text-transform: uppercase;
  color: var(--dyw-ink-3);
  margin-left: 0.4rem;
}

.dyw-brief-line {
  margin: 0.35rem 0 0;
  padding: 0.5rem 0.65rem;
  border-radius: var(--radius-sm);
  background: rgba(61, 142, 224, 0.18);
  font-size: 0.8125rem;
  font-weight: 700;
  line-height: 1.4;
}

.brief-enter-active {
  transition: max-height 380ms var(--ease-out), opacity 260ms var(--ease-out), transform 380ms var(--dyw-spring);
  max-height: 8rem;
}

.brief-leave-active {
  transition: max-height 220ms var(--ease-out), opacity 160ms var(--ease-out);
  max-height: 8rem;
}

.brief-enter-from,
.brief-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-4px);
}

.row-enter-active {
  transition: transform 420ms var(--dyw-spring), opacity 220ms var(--ease-out);
}

.row-leave-active {
  transition: transform 200ms var(--ease-out), opacity 160ms var(--ease-out);
  position: absolute;
  width: 100%;
}

.row-move {
  transition: transform 300ms var(--ease-out);
}

.row-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

.row-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

.dyw-journal {
  margin-top: auto;
  padding-top: var(--space-4);
  border-top: 1px solid var(--dyw-line);
}

.dyw-journal ul {
  list-style: none;
  margin: var(--space-2) 0 0;
  padding: 0;
  display: grid;
  gap: 0.3rem;
  position: relative;
}

.dyw-journal-row {
  display: flex;
  gap: 0.6rem;
  font-family: var(--font-text);
  font-size: var(--type-caption);
  color: var(--dyw-ink-2);
}

.dyw-journal-time {
  color: var(--dyw-ink-3);
}

.dyw-foot {
  margin: var(--space-4) 0 0;
  max-width: 78ch;
  line-height: 1.5;
}

.dyw-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* -- narrow: One UI, controls under the thumb -- */

@media (max-width: 1100px) {
  .dyw-stage {
    grid-template-columns: minmax(0, 1fr) 18.5rem;
  }

  .dyw-seg-label {
    display: none;
  }

  .dyw-seg-btn[aria-checked='true'] .dyw-seg-label {
    display: inline;
  }
}

@media (max-width: 720px) {
  .dyw-stage {
    grid-template-columns: minmax(0, 1fr);
    border-radius: var(--radius-lg);
  }

  .dyw-top {
    flex-direction: column;
    align-items: flex-start;
    padding: var(--space-5) var(--space-4) var(--space-3);
  }

  .dyw-hint {
    text-align: left;
    max-width: none;
    min-height: 2.8em;
  }

  .dyw-canvas-wrap {
    margin: 0 var(--space-3) var(--space-3);
  }

  .dyw-canvas-box {
    border-radius: var(--radius-md);
  }

  .dyw-canvas {
    aspect-ratio: 1 / 1;
  }

  /* the phone window is 480 units across 340 px; text scales up to stay legible */
  .dyw-canvas.is-narrow .dyw-scale text,
  .dyw-canvas.is-narrow .dyw-dock-label {
    font-size: 13px;
  }

  .dyw-canvas.is-narrow .dyw-berth-label {
    font-size: 11px;
  }

  .dyw-canvas.is-narrow .dyw-handle-dot {
    r: 9;
  }

  .dyw-tools {
    position: static;
    transform: none;
    max-width: none;
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
    padding: var(--space-2);
    border-radius: 0;
    background: var(--navy);
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    box-shadow: none;
  }

  .dyw-seg {
    justify-content: stretch;
  }

  .dyw-seg-btn {
    flex: 1;
    flex-direction: column;
    justify-content: center;
    gap: 0.15rem;
    min-height: 3rem;
    padding: 0.3rem 0.25rem;
    font-size: 0.6875rem;
  }

  .dyw-seg-label,
  .dyw-seg-btn[aria-checked='true'] .dyw-seg-label {
    display: inline;
  }

  .dyw-seg--small .dyw-seg-btn {
    flex-direction: row;
    min-height: 2.25rem;
    font-size: 0.8125rem;
  }

  .dyw-actions {
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .dyw-act {
    flex: 1;
    min-height: 2.5rem;
    padding: 0 0.5rem;
    font-size: 0.8125rem;
  }

  .dyw-inspector {
    position: relative;
    inset: auto;
    width: auto;
    max-height: none;
    margin: var(--space-3) 0 0;
    background: rgba(255, 255, 255, 0.06);
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }

  .dyw-editor .sheet-enter-from,
  .dyw-editor .sheet-leave-to {
    transform: translateY(8px);
  }

  .dyw-board {
    border-left: 0;
    border-top: 1px solid var(--dyw-line);
    padding: var(--space-5) var(--space-4) var(--space-6);
  }
}

@media (prefers-reduced-motion: reduce) {
  .dyw-hint,
  .dyw-count,
  .dyw-halo,
  .dyw-hull,
  .dyw-entry {
    animation: none;
  }

  .dyw-row.is-flash,
  .dyw-berth.is-flash .dyw-berth-shape,
  .dyw-berth.is-flash .dyw-ball {
    animation: none;
  }
}
</style>
