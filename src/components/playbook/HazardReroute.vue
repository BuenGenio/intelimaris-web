<template>
  <section class="hz" :data-phone="isPhone || undefined">
    <header class="hz-head">
      <div class="hz-head-text">
        <p class="t-overline">Journey 05 · Hazards on a live passage</p>
        <p class="hz-lede">
          Sunrise Bay to Bahia Mar is planned at {{ CRUISE_KN }} kn. Tap the water where you see something and
          the passage re-plans around it. Confirm it when another vessel sees it too; clear it when it is gone.
        </p>
      </div>
      <div class="hz-head-actions">
        <button type="button" class="hz-btn hz-btn--primary" @click="reportSample">Report a sample hazard</button>
        <button type="button" class="hz-btn" :disabled="!hazards.length" @click="reset">Reset the chart</button>
      </div>
    </header>

    <div ref="stageEl" class="hz-stage">
      <canvas
        ref="canvasEl"
        class="hz-canvas"
        role="img"
        :aria-label="chartLabel"
        @pointerdown="onPointerDown"
        @pointerup="onPointerUp"
        @pointercancel="downPos = null"
      />

      <div class="hz-places" aria-hidden="true">
        <span class="hz-place" :style="placeStyle(FROM)">Sunrise Bay</span>
        <span class="hz-place hz-place--end" :style="placeStyle(TO)">Bahia Mar</span>
      </div>

      <div v-if="current.result.ok" class="hz-delta hz-glass">
        <p class="hz-delta-label">Sunrise Bay → Bahia Mar</p>
        <p class="hz-delta-nums">
          <span class="t-num">{{ current.lengthNm.toFixed(1) }}<small> NM</small></span>
          <span class="t-num">{{ Math.round(current.minutes) }}<small> min</small></span>
        </p>
        <p class="hz-delta-diff t-num" :data-changed="changed || undefined">{{ diffText }}</p>
      </div>
      <div v-else class="hz-delta hz-glass hz-delta--refused" role="status">
        <p class="hz-delta-label">The planner refused</p>
        <p class="hz-reason">{{ current.result.reason }}</p>
        <p class="hz-delta-diff">Clear a hazard to open the water again.</p>
      </div>

      <p v-if="toast" class="hz-toast hz-glass" role="status" :style="{ left: `${toast.x}px`, top: `${toast.y}px` }">
        {{ toast.text }}
      </p>

      <div
        v-if="pending"
        ref="pickerEl"
        class="hz-picker hz-glass"
        role="dialog"
        aria-label="Report a hazard"
        :style="pickerStyle"
        @keydown.esc.prevent="closePicker"
      >
        <div class="hz-picker-head">
          <p class="hz-picker-title">What do you see?</p>
          <div class="hz-stepper" role="group" aria-label="Ring radius">
            <button type="button" aria-label="Smaller ring" :disabled="radius <= RADIUS_MIN" @click="radius--">−</button>
            <span class="t-num">{{ radius }} cells · <span class="hz-stepper-about">about </span>{{ radius * METRES_PER_CELL }} m</span>
            <button type="button" aria-label="Larger ring" :disabled="radius >= RADIUS_MAX" @click="radius++">+</button>
          </div>
        </div>
        <div class="hz-types">
          <button
            v-for="(t, i) in HAZARD_TYPES"
            :key="t.kind"
            type="button"
            class="hz-type"
            :ref="(el) => { if (i === 0) firstTypeEl = el as HTMLButtonElement | null }"
            @click="reportPending(t.kind)"
          >
            <span class="hz-type-glyph" aria-hidden="true" v-html="GLYPHS[t.kind]" />
            <span class="hz-type-text">
              <strong>{{ t.label }}</strong>
              <small>{{ t.meaning }}</small>
            </span>
          </button>
        </div>
        <button type="button" class="hz-picker-cancel" @click="closePicker">Cancel</button>
      </div>

      <aside
        class="hz-sheet hz-glass"
        :class="{ 'is-open': sheetOpen, 'is-dragging': dragY !== null }"
        :style="sheetStyle"
        aria-label="Reported hazards"
      >
        <button
          type="button"
          class="hz-handle"
          :aria-expanded="sheetOpen"
          aria-controls="hz-list"
          @pointerdown="onHandleDown"
          @pointermove="onHandleMove"
          @pointerup="onHandleUp"
          @pointercancel="onHandleUp"
          @click="onHandleClick"
        >
          <span class="hz-grip" aria-hidden="true" />
          <span class="hz-handle-text">
            <span>{{ hazardCount }}</span>
            <span class="t-num">{{ current.result.ok ? diffText : 'route refused' }}</span>
          </span>
        </button>

        <div class="hz-sheet-head">
          <p class="hz-sheet-title">Hazards</p>
          <p class="hz-sheet-count t-num">{{ hazardCount }}</p>
        </div>

        <ul id="hz-list" class="hz-list">
          <li
            v-for="h in hazards"
            :key="h.id"
            class="hz-card"
            :data-status="h.status"
            :data-active="activeId === h.id || undefined"
            @mouseenter="activeId = h.id"
            @mouseleave="activeId = null"
            @focusin="activeId = h.id"
            @focusout="activeId = null"
          >
            <div class="hz-card-top">
              <span class="hz-badge t-num" aria-hidden="true">{{ h.id }}</span>
              <span class="hz-card-title">{{ typeOf(h.kind).label }}</span>
              <span class="hz-status" :data-status="h.status">{{ statusLabel(h) }}</span>
            </div>
            <p class="hz-card-meta t-num">
              radius {{ h.radius }} cells · about {{ h.radius * METRES_PER_CELL }} m · reported {{ ago(h.reportedAt) }}
            </p>
            <p class="hz-card-effect">{{ effectOf(h).text }}</p>
            <div v-if="h.status !== 'cleared'" class="hz-card-actions">
              <button
                v-if="h.status === 'reported'"
                type="button"
                class="hz-action hz-action--confirm"
                :ref="(el) => setCardButton(h.id, el as HTMLButtonElement | null)"
                @click="confirm(h)"
              >
                <strong>Confirm</strong><small>another vessel sees it</small>
              </button>
              <button
                type="button"
                class="hz-action"
                :ref="(el) => { if (h.status !== 'reported') setCardButton(h.id, el as HTMLButtonElement | null) }"
                @click="clear(h)"
              >
                <strong>Clear</strong><small>it is gone</small>
              </button>
            </div>
          </li>
          <li v-if="!hazards.length" class="hz-empty">
            No hazards reported. Tap the water, or press "Report a sample hazard".
          </li>
        </ul>
      </aside>
    </div>

    <footer class="hz-foot">
      <ul class="hz-legend" aria-label="Chart legend">
        <li><span class="hz-swatch hz-swatch--ghost" aria-hidden="true" />the track before</li>
        <li><span class="hz-swatch hz-swatch--track" aria-hidden="true" />the track now</li>
        <li><span class="hz-swatch hz-swatch--ring" aria-hidden="true" />a hazard: dashed when reported, solid when confirmed</li>
        <li><span class="hz-swatch hz-swatch--slow" aria-hidden="true" />{{ NO_WAKE_KN }} kn inside a no-wake zone</li>
      </ul>
      <p class="t-caption hz-sample">
        Sample passage on a Fort Lauderdale basemap. Depths and timing are illustrative; the passage is timed at
        {{ CRUISE_KN }} kn with no tide.
      </p>
    </footer>

    <p class="hz-sr" aria-live="polite">{{ announcement }}</p>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { GRID_W, type Point } from '@/data/playbook/waterRouter'
import {
  CRUISE_KN,
  FROM,
  HAZARD_TYPES,
  METRES_PER_CELL,
  NO_WAKE_KN,
  RADIUS_MAX,
  RADIUS_MIN,
  SAMPLE_HAZARDS,
  TO,
  deltaText,
  hazardEffect,
  isActive,
  makeHazard,
  onWater,
  plan,
  pointAlong,
  slowCells,
  typeOf,
  type Hazard,
  type HazardKind,
  type Plan,
} from '@/data/playbook/hazard-reroute-plan'

/* ---------------------------------------------------------------- constants */

const MAGENTA = '#C4157F'
const RED = '#D0342C'
const GHOST = 'rgba(214, 220, 229, 0.72)'
const NAVY = '#0B1220'
const TRACK_MS = 800
const RING_IN_MS = 450
const RING_OUT_MS = 500
const PULSE_MS = 380
const BASEMAP = '/assets/playbook/basemap-1920.webp'

/* The part of the basemap the stage shows: the ICW from Sunrise Bay down to
   Bahia Mar. A taller crop on phones so the passage fills the screen. */
const REGION_WIDE = { u0: 0.3, u1: 0.74, v0: 0.24, v1: 0.76 }
const REGION_TALL = { u0: 0.4, u1: 0.62, v0: 0.2, v1: 0.82 }

const GLYPHS: Record<HazardKind, string> = {
  debris:
    '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 16 10 4l6 12z"/><path d="M10 9v3"/></svg>',
  shoal:
    '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 8c2-2 4-2 7 0s5 2 7 0M3 13c2-2 4-2 7 0s5 2 7 0"/></svg>',
  'no-wake':
    '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="10" cy="10" r="7"/><path d="M5 5l10 10"/></svg>',
  'closed-bridge':
    '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M2 15h16M4 15V9a6 6 0 0 1 12 0v6"/><path d="M7 7l6-4M13 7 7 3"/></svg>',
  dredging:
    '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 16h14M6 16V5h2l6 4v7"/><circle cx="14" cy="13" r="1.6"/></svg>',
}

/* ------------------------------------------------------------------- state */

const stageEl = ref<HTMLDivElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)
const pickerEl = ref<HTMLDivElement | null>(null)
const firstTypeEl = ref<HTMLButtonElement | null>(null)

const planned: Plan = plan([])
const current = shallowRef<Plan>(planned)
const hazards = ref<Hazard[]>([])
let nextId = 1

const pending = ref<{ at: Point; x: number; y: number } | null>(null)
const radius = ref(5)
const activeId = ref<number | null>(null)
const toast = ref<{ x: number; y: number; text: string } | null>(null)
const announcement = ref('')
const now = ref(Date.now())
const sampleIndex = ref(0)

const isPhone = ref(false)
const reducedMotion = ref(false)
const sheetOpen = ref(false)
const dragY = ref<number | null>(null)

const size = ref({ w: 0, h: 0, dpr: 1 })
const img = typeof Image === 'undefined' ? null : new Image()
let imgReady = false

/* animation bookkeeping, outside reactivity */
let ghost: Point[] | null = null
let trackStart = 0
let frame = 0
const pulses = new Map<number, number>()
const cardButtons = new Map<number, HTMLButtonElement>()

/* --------------------------------------------------------------- derived */

const changed = computed(
  () =>
    Math.abs(current.value.lengthNm - planned.lengthNm) >= 0.05 ||
    Math.round(current.value.minutes - planned.minutes) !== 0,
)
const diffText = computed(() => (changed.value ? deltaText(current.value, planned) : `As planned · at ${CRUISE_KN} kn`))
const hazardCount = computed(() => {
  const n = hazards.value.filter(isActive).length
  return n === 1 ? '1 hazard' : `${n} hazards`
})
const chartLabel = computed(
  () =>
    `Satellite chart of the passage from Sunrise Bay to Bahia Mar, ${current.value.lengthNm.toFixed(1)} nautical miles. ` +
    (current.value.result.ok ? '' : `The planner refused: ${current.value.result.reason} `) +
    `Tap the water to report a hazard, or use the Report a sample hazard button.`,
)

const viewport = computed(() => {
  const { w, h } = size.value
  const r = isPhone.value ? REGION_TALL : REGION_WIDE
  const A = w > 0 && h > 0 ? w / h : 16 / 9
  const cu = (r.u0 + r.u1) / 2
  const cv = (r.v0 + r.v1) / 2
  let rw = (r.u1 - r.u0) * 16
  let rh = (r.v1 - r.v0) * 9
  if (rw / rh < A) rw = rh * A
  else rh = rw / A
  if (rw > 16) {
    rw = 16
    rh = rw / A
  }
  if (rh > 9) {
    rh = 9
    rw = rh * A
  }
  const du = rw / 16
  const dv = rh / 9
  const u0 = Math.min(1 - du, Math.max(0, cu - du / 2))
  const v0 = Math.min(1 - dv, Math.max(0, cv - dv / 2))
  return { u0, v0, u1: u0 + du, v1: v0 + dv }
})

const toPx = (p: Point): [number, number] => {
  const vp = viewport.value
  return [((p.u - vp.u0) / (vp.u1 - vp.u0)) * size.value.w, ((p.v - vp.v0) / (vp.v1 - vp.v0)) * size.value.h]
}
const cellPx = () => size.value.w / ((viewport.value.u1 - viewport.value.u0) * (GRID_W - 1))

const placeStyle = (p: Point) => {
  const [x, y] = toPx(p)
  return { left: `${x}px`, top: `${y}px` }
}

const pickerH = ref(420)
const pickerStyle = computed(() => {
  if (!pending.value || isPhone.value) return undefined
  const W = 300
  const H = pickerH.value
  /* beside the tap, flipped to the left when it would run off the stage */
  const fitsRight = pending.value.x + 18 + W <= size.value.w - 12
  const left = fitsRight ? pending.value.x + 18 : Math.max(12, pending.value.x - 18 - W)
  const top = Math.min(size.value.h - H - 12, Math.max(12, pending.value.y - 60))
  return { left: `${left}px`, top: `${top}px`, width: `${W}px` }
})

const sheetStyle = computed(() => {
  if (!isPhone.value || dragY.value === null) return undefined
  return sheetOpen.value
    ? { transform: `translateY(${Math.max(0, dragY.value)}px)` }
    : { transform: `translateY(calc(100% - var(--peek) + ${Math.min(0, dragY.value)}px))` }
})

const effectOf = (h: Hazard) => hazardEffect(h, current.value, planned)

const statusLabel = (h: Hazard) =>
  h.status === 'reported' ? 'Reported' : h.status === 'confirmed' ? `Confirmed ${ago(h.confirmedAt ?? h.reportedAt)}` : 'Cleared'

const ago = (ts: number): string => {
  const s = Math.max(0, Math.round((now.value - ts) / 1000))
  if (s < 5) return 'just now'
  if (s < 60) return `${s} s ago`
  return `${Math.round(s / 60)} min ago`
}

/* ------------------------------------------------------------- hazards */

/* the card's first action, so keyboard focus can land on it; a departing
   button's null is ignored because its replacement may already be registered */
const setCardButton = (id: number, el: HTMLButtonElement | null) => {
  if (el) cardButtons.set(id, el)
}

function replan(note: string) {
  const next = plan(hazards.value)
  const before = current.value
  const same = before.result.cells.length === next.result.cells.length && before.result.cells.every((c, i) => c === next.result.cells[i])
  if (!same) {
    ghost = before.result.ok ? before.result.points : ghost
    trackStart = performance.now()
  }
  current.value = next
  announcement.value = next.result.ok
    ? `${note} Route ${same ? 'unchanged' : 're-planned'}: ${next.lengthNm.toFixed(1)} nautical miles, ${Math.round(next.minutes)} minutes. ${diffText.value}.`
    : `${note} The planner refused. ${next.result.reason} Clear a hazard to open the water again.`
  kick()
}

async function report(kind: HazardKind, at: Point, r: number, focusCard = false) {
  const h = makeHazard(nextId++, kind, at, r, Date.now())
  hazards.value.push(h)
  replan(`${typeOf(kind).label} reported.`)
  if (isPhone.value) sheetOpen.value = true
  if (focusCard) {
    await nextTick()
    cardButtons.get(h.id)?.focus()
  }
}

function reportPending(kind: HazardKind) {
  const p = pending.value
  if (!p) return
  pending.value = null
  void report(kind, p.at, radius.value)
}

function reportSample() {
  const s = SAMPLE_HAZARDS[sampleIndex.value % SAMPLE_HAZARDS.length]!
  sampleIndex.value++
  void report(s.kind, pointAlong(planned.result.points, s.fraction), s.radius, true)
}

function confirm(h: Hazard) {
  h.status = 'confirmed'
  h.confirmedAt = Date.now()
  pulses.set(h.id, performance.now())
  announcement.value = `${typeOf(h.kind).label} ${h.id} confirmed.`
  void nextTick(() => cardButtons.get(h.id)?.focus())
  kick()
}

function clear(h: Hazard) {
  h.status = 'cleared'
  h.clearedAt = performance.now()
  replan(`${typeOf(h.kind).label} ${h.id} cleared.`)
  if (reducedMotion.value) hazards.value = hazards.value.filter((x) => x.id !== h.id)
}

function reset() {
  hazards.value = []
  cardButtons.clear()
  pending.value = null
  replan('Chart reset.')
}

function closePicker() {
  pending.value = null
  kick()
}

/* ------------------------------------------------------------- pointer */

const downPos = ref<{ x: number; y: number } | null>(null)

function onPointerDown(e: PointerEvent) {
  downPos.value = { x: e.clientX, y: e.clientY }
}

function onPointerUp(e: PointerEvent) {
  const d = downPos.value
  downPos.value = null
  if (!d || Math.hypot(e.clientX - d.x, e.clientY - d.y) > 8) return
  const rect = canvasEl.value?.getBoundingClientRect()
  if (!rect) return
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const vp = viewport.value
  const at: Point = { u: vp.u0 + (x / rect.width) * (vp.u1 - vp.u0), v: vp.v0 + (y / rect.height) * (vp.v1 - vp.v0) }
  if (!onWater(at)) {
    showToast(x, y, 'That is land. Tap the water.')
    return
  }
  toast.value = null
  pending.value = { at, x, y }
  kick()
  void nextTick(() => {
    if (pickerEl.value) pickerH.value = pickerEl.value.offsetHeight
    firstTypeEl.value?.focus({ preventScroll: true })
  })
}

let toastTimer = 0
function showToast(x: number, y: number, text: string) {
  toast.value = { x, y, text }
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => (toast.value = null), 2200)
}

/* -------------------------------------------------------- bottom sheet */

let handleStart = 0
let handleMoved = false

function onHandleDown(e: PointerEvent) {
  if (!isPhone.value) return
  handleStart = e.clientY
  handleMoved = false
  dragY.value = 0
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}
function onHandleMove(e: PointerEvent) {
  if (dragY.value === null) return
  const dy = e.clientY - handleStart
  if (Math.abs(dy) > 6) handleMoved = true
  dragY.value = dy
}
function onHandleUp() {
  if (dragY.value === null) return
  const dy = dragY.value
  dragY.value = null
  if (Math.abs(dy) > 40) sheetOpen.value = dy < 0
}
function onHandleClick() {
  if (handleMoved) {
    handleMoved = false
    return
  }
  sheetOpen.value = !sheetOpen.value
}

/* ------------------------------------------------------------ drawing */

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
const easeOutBack = (t: number) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}
const clamp01 = (t: number) => Math.min(1, Math.max(0, t))

function strokeTrack(ctx: CanvasRenderingContext2D, pts: Point[], fraction: number) {
  if (pts.length < 2) return
  const px = pts.map(toPx)
  let total = 0
  const cum = [0]
  for (let i = 1; i < px.length; i++) {
    total += Math.hypot(px[i]![0] - px[i - 1]![0], px[i]![1] - px[i - 1]![1])
    cum.push(total)
  }
  const target = total * fraction
  ctx.beginPath()
  ctx.moveTo(px[0]![0], px[0]![1])
  for (let i = 1; i < px.length; i++) {
    if (cum[i]! <= target) {
      ctx.lineTo(px[i]![0], px[i]![1])
      continue
    }
    const seg = cum[i]! - cum[i - 1]!
    const t = seg > 0 ? (target - cum[i - 1]!) / seg : 0
    ctx.lineTo(px[i - 1]![0] + (px[i]![0] - px[i - 1]![0]) * t, px[i - 1]![1] + (px[i]![1] - px[i - 1]![1]) * t)
    break
  }
  ctx.stroke()
}

function strokeSlow(ctx: CanvasRenderingContext2D, plan: Plan, fraction: number) {
  const slow = slowCells(hazards.value)
  if (!slow.size) return
  const cells = plan.result.cells
  const upto = Math.floor((cells.length - 1) * fraction)
  ctx.save()
  ctx.strokeStyle = 'rgba(255,255,255,0.9)'
  ctx.lineWidth = 2
  ctx.lineCap = 'round'
  ctx.setLineDash([1, 7])
  ctx.beginPath()
  let open = false
  for (let i = 1; i <= upto; i++) {
    const c = cells[i]!
    if (slow.has(c)) {
      const [ax, ay] = toPx(plan.result.points[i - 1]!)
      const [bx, by] = toPx(plan.result.points[i]!)
      if (!open) ctx.moveTo(ax, ay)
      ctx.lineTo(bx, by)
      open = true
    } else open = false
  }
  ctx.stroke()
  ctx.restore()
}

function ringState(h: Hazard, t: number): { alpha: number; scale: number; done: boolean } {
  if (reducedMotion.value) return { alpha: 1, scale: 1, done: false }
  if (h.status === 'cleared') {
    const k = clamp01((t - (h.clearedAt ?? t)) / RING_OUT_MS)
    return { alpha: 1 - easeOutCubic(k), scale: 1 + 0.18 * k, done: k >= 1 }
  }
  const born = clamp01((t - bornAt(h)) / RING_IN_MS)
  return { alpha: born < 0.2 ? born / 0.2 : 1, scale: 0.55 + 0.45 * easeOutBack(born), done: false }
}

/* reportedAt is wall-clock for the card; the ring animates on the frame clock */
const bornFrame = new Map<number, number>()
const bornAt = (h: Hazard) => {
  let t = bornFrame.get(h.id)
  if (t === undefined) {
    t = performance.now()
    bornFrame.set(h.id, t)
  }
  return t
}

function paint(t: number): boolean {
  const c = canvasEl.value
  const ctx = c?.getContext('2d')
  const { w: W, h: H, dpr } = size.value
  if (!c || !ctx || !W || !H) return false
  let animating = false
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, W, H)

  const vp = viewport.value
  if (img && imgReady) {
    const iw = img.naturalWidth
    const ih = img.naturalHeight
    ctx.drawImage(img, vp.u0 * iw, vp.v0 * ih, (vp.u1 - vp.u0) * iw, (vp.v1 - vp.v0) * ih, 0, 0, W, H)
  } else {
    ctx.fillStyle = NAVY
    ctx.fillRect(0, 0, W, H)
  }
  const vig = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.3, W / 2, H / 2, Math.max(W, H) * 0.8)
  vig.addColorStop(0, 'rgba(11,18,32,0)')
  vig.addColorStop(1, 'rgba(11,18,32,0.5)')
  ctx.fillStyle = vig
  ctx.fillRect(0, 0, W, H)

  const cp = cellPx()
  const rings = hazards.value.map((h) => ({ h, ...ringState(h, t), px: toPx(h.at) }))

  /* fills sit under the tracks */
  for (const r of rings) {
    if (r.alpha <= 0) continue
    const confirmed = r.h.status === 'confirmed'
    ctx.globalAlpha = r.alpha * (confirmed ? 0.26 : 0.16)
    ctx.fillStyle = RED
    ctx.beginPath()
    ctx.arc(r.px[0], r.px[1], r.h.radius * cp * r.scale, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1

  /* the track before, ghosted */
  const progress = reducedMotion.value ? 1 : easeOutCubic(clamp01((t - trackStart) / TRACK_MS))
  if (progress < 1) animating = true
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  if (ghost && (progress < 1 || !current.value.result.ok || ghostDiffers())) {
    ctx.strokeStyle = GHOST
    ctx.lineWidth = 3
    ctx.setLineDash([])
    strokeTrack(ctx, ghost, 1)
  }

  /* the track now, drawn in */
  if (current.value.result.ok) {
    const pts = current.value.result.points
    ctx.setLineDash([])
    ctx.strokeStyle = 'rgba(255,255,255,0.42)'
    ctx.lineWidth = 8
    strokeTrack(ctx, pts, progress)
    ctx.strokeStyle = MAGENTA
    ctx.lineWidth = 3.5
    strokeTrack(ctx, pts, progress)
    strokeSlow(ctx, current.value, progress)
  }

  /* ring strokes and numbers on top */
  ctx.font = '700 12px "Red Hat Display", "Red Hat Text", sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (const r of rings) {
    const h = r.h
    /* keep the loop alive for a ring that is still fading in or out, even at alpha 0 */
    if (h.status !== 'cleared' && t - bornAt(h) < RING_IN_MS) animating = true
    if (h.status === 'cleared' && !r.done) animating = true
    if (r.alpha <= 0) continue
    const pulse = pulses.get(h.id)
    let bump = 0
    if (pulse !== undefined) {
      const k = clamp01((t - pulse) / PULSE_MS)
      bump = Math.sin(k * Math.PI) * 3
      if (k < 1) animating = true
      else pulses.delete(h.id)
    }
    const rad = h.radius * cp * r.scale
    const active = activeId.value === h.id
    ctx.globalAlpha = r.alpha
    if (active) {
      ctx.strokeStyle = 'rgba(255,255,255,0.85)'
      ctx.lineWidth = 6
      ctx.setLineDash([])
      ctx.beginPath()
      ctx.arc(r.px[0], r.px[1], rad, 0, Math.PI * 2)
      ctx.stroke()
    }
    ctx.strokeStyle = RED
    ctx.lineWidth = (h.status === 'confirmed' ? 3 : 2.25) + bump
    ctx.setLineDash(h.status === 'reported' ? [6, 5] : [])
    ctx.beginPath()
    ctx.arc(r.px[0], r.px[1], rad, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])
    /* number chip, so the ring and its card match */
    ctx.fillStyle = 'rgba(11,18,32,0.82)'
    ctx.beginPath()
    ctx.arc(r.px[0], r.px[1], 11, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.fillText(String(h.id), r.px[0], r.px[1] + 0.5)
    if (h.kind === 'no-wake') {
      ctx.font = '600 11px "Red Hat Text", sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.95)'
      ctx.fillText(`${NO_WAKE_KN} kn`, r.px[0], r.px[1] + rad + 11)
      ctx.font = '700 12px "Red Hat Display", "Red Hat Text", sans-serif'
    }
  }
  ctx.globalAlpha = 1

  /* where you tapped, while you choose a type */
  if (pending.value) {
    const [x, y] = toPx(pending.value.at)
    ctx.strokeStyle = RED
    ctx.lineWidth = 2
    ctx.globalAlpha = 0.7
    ctx.setLineDash([4, 5])
    ctx.beginPath()
    ctx.arc(x, y, radius.value * cp, 0, Math.PI * 2)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.globalAlpha = 1
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(x, y, 7, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fillStyle = RED
    ctx.beginPath()
    ctx.arc(x, y, 3, 0, Math.PI * 2)
    ctx.fill()
  }

  /* the ends of the passage */
  for (const p of [FROM, TO]) {
    const [x, y] = toPx(p)
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = 'rgba(11,18,32,0.7)'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(x, y, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
  }

  /* drop rings that have faded out */
  const gone = rings.filter((r) => r.done).map((r) => r.h.id)
  if (gone.length) {
    hazards.value = hazards.value.filter((h) => !gone.includes(h.id))
    for (const id of gone) cardButtons.delete(id)
  }

  return animating
}

const ghostDiffers = () => {
  const cur = current.value.result.points
  return !!ghost && (ghost.length !== cur.length || ghost.some((p, i) => p.u !== cur[i]?.u || p.v !== cur[i]?.v))
}

function loop(t: number) {
  frame = 0
  if (paint(t)) frame = requestAnimationFrame(loop)
}

function kick() {
  if (!frame) frame = requestAnimationFrame(loop)
}

/* ------------------------------------------------------------ lifecycle */

let ro: ResizeObserver | null = null
let ticker = 0
const mqPhone = typeof window === 'undefined' ? null : window.matchMedia('(max-width: 760px)')
const mqMotion = typeof window === 'undefined' ? null : window.matchMedia('(prefers-reduced-motion: reduce)')
const syncMedia = () => {
  isPhone.value = !!mqPhone?.matches
  reducedMotion.value = !!mqMotion?.matches
}

function resize() {
  const el = stageEl.value
  const c = canvasEl.value
  if (!el || !c) return
  const dpr = Math.min(2, window.devicePixelRatio || 1)
  const w = el.clientWidth
  const h = el.clientHeight
  c.width = Math.round(w * dpr)
  c.height = Math.round(h * dpr)
  size.value = { w, h, dpr }
  kick()
}

onMounted(() => {
  syncMedia()
  mqPhone?.addEventListener('change', syncMedia)
  mqMotion?.addEventListener('change', syncMedia)
  resize()
  ro = new ResizeObserver(resize)
  if (stageEl.value) ro.observe(stageEl.value)
  ticker = window.setInterval(() => (now.value = Date.now()), 1000)
  if (img) {
    img.src = BASEMAP
    img
      .decode()
      .catch(() => undefined)
      .then(() => {
        imgReady = img.naturalWidth > 0
        kick()
      })
  }
})

onBeforeUnmount(() => {
  mqPhone?.removeEventListener('change', syncMedia)
  mqMotion?.removeEventListener('change', syncMedia)
  ro?.disconnect()
  window.clearInterval(ticker)
  window.clearTimeout(toastTimer)
  if (frame) cancelAnimationFrame(frame)
})

watch([activeId, radius, isPhone], kick)
watch(pending, (p) => {
  if (!p) kick()
})
</script>

<style scoped>
.hz {
  --hz-glass: rgba(36, 44, 56, 0.74);
  --hz-glass-border: rgba(255, 255, 255, 0.14);
  --hz-white-2: rgba(255, 255, 255, 0.74);
  --peek: 64px;
  display: grid;
  gap: var(--space-4);
}

/* ---------------------------------------------------------------- header */

.hz-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-6);
}

.hz-lede {
  margin: var(--space-2) 0 0;
  max-width: 62ch;
  font-family: var(--font-text);
  font-size: var(--type-body);
  line-height: var(--type-body-lh);
  color: var(--text-secondary);
  text-wrap: pretty;
}

.hz-head-actions {
  display: flex;
  gap: var(--space-2);
  flex-shrink: 0;
}

.hz-btn {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 1.1rem;
  border: 1px solid var(--border-medium);
  border-radius: 999px;
  background: transparent;
  color: var(--text-primary);
  font-family: var(--font-text);
  font-size: var(--type-body-sm);
  font-weight: 500;
  cursor: pointer;
  transition:
    background 200ms var(--ease-out),
    color 200ms var(--ease-out),
    transform 200ms var(--ease-out);
}

.hz-btn:hover:not(:disabled) {
  background: var(--surface-soft);
}

.hz-btn:active:not(:disabled) {
  transform: scale(0.97);
}

.hz-btn:disabled {
  opacity: 0.45;
  cursor: default;
}

.hz-btn--primary {
  border-color: var(--slate);
  background: var(--slate);
  color: #ffffff;
}

.hz-btn--primary:hover:not(:disabled) {
  background: var(--navy);
}

.hz-btn:focus-visible,
.hz-handle:focus-visible,
.hz-action:focus-visible,
.hz-type:focus-visible,
.hz-stepper button:focus-visible,
.hz-picker-cancel:focus-visible {
  outline: 2px solid var(--maris-night);
  outline-offset: 2px;
}

/* ----------------------------------------------------------------- stage */

.hz-stage {
  position: relative;
  height: min(clamp(560px, 62vw, 860px), var(--stage-cap, 82vh));
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--navy);
  box-shadow: 0 30px 60px -30px rgba(11, 18, 32, 0.45);
  isolation: isolate;
}

.hz-canvas {
  display: block;
  width: 100%;
  height: 100%;
  cursor: crosshair;
  touch-action: manipulation;
}

.hz-glass {
  background: var(--hz-glass);
  -webkit-backdrop-filter: blur(18px) saturate(150%);
  backdrop-filter: blur(18px) saturate(150%);
  border: 1px solid var(--hz-glass-border);
  color: #ffffff;
  box-shadow: 0 18px 40px -18px rgba(11, 18, 32, 0.7);
}

.hz-places {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hz-place {
  position: absolute;
  transform: translate(12px, -50%);
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: rgba(11, 18, 32, 0.7);
  color: #ffffff;
  font-family: var(--font-text);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.hz-place--end {
  transform: translate(12px, -50%);
}

/* delta card */
.hz-delta {
  position: absolute;
  top: 16px;
  left: 16px;
  min-width: 232px;
  max-width: calc(100% - 32px);
  padding: 0.85rem 1rem 0.9rem;
  border-radius: var(--radius-lg);
}

.hz-delta-label {
  margin: 0;
  font-family: var(--font-text);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--hz-white-2);
}

.hz-delta-nums {
  display: flex;
  gap: 1rem;
  margin: 0.35rem 0 0;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.hz-delta-nums small {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--hz-white-2);
  letter-spacing: 0;
}

.hz-delta-diff {
  margin: 0.4rem 0 0;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--hz-white-2);
  transition: color 300ms var(--ease-out);
}

.hz-delta-diff[data-changed] {
  color: #ff7ac6;
}

.hz-delta--refused {
  border-color: rgba(208, 52, 44, 0.6);
  max-width: min(360px, calc(100% - 32px));
}

.hz-reason {
  margin: 0.4rem 0 0;
  font-family: var(--font-text);
  font-size: 0.95rem;
  line-height: 1.45;
}

.hz-delta--refused .hz-delta-diff {
  color: #ffffff;
}

/* land toast */
.hz-toast {
  position: absolute;
  transform: translate(-50%, calc(-100% - 14px));
  margin: 0;
  padding: 0.5rem 0.8rem;
  border-radius: 999px;
  font-family: var(--font-text);
  font-size: 0.85rem;
  white-space: nowrap;
  pointer-events: none;
  animation: hz-rise 260ms var(--ease-out);
}

@keyframes hz-rise {
  from {
    opacity: 0;
    transform: translate(-50%, calc(-100% - 4px));
  }
}

/* ---------------------------------------------------------------- picker */

.hz-picker {
  position: absolute;
  z-index: 5;
  padding: 0.85rem 0.85rem 0.75rem;
  border-radius: var(--radius-xl);
  animation: hz-pop 320ms cubic-bezier(0.2, 1.2, 0.4, 1);
  transform-origin: top left;
}

@keyframes hz-pop {
  from {
    opacity: 0;
    transform: scale(0.94) translateY(4px);
  }
}

.hz-picker-head {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 0.25rem 0.6rem;
}

.hz-picker-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
}

.hz-stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: var(--hz-white-2);
}

.hz-stepper button {
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-family: var(--font-display);
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 160ms var(--ease-out);
}

.hz-stepper button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.22);
}

.hz-stepper button:disabled {
  opacity: 0.35;
  cursor: default;
}

.hz-types {
  display: grid;
  gap: 4px;
}

.hz-type {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  min-height: 46px;
  padding: 0.4rem 0.6rem;
  border: 0;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  text-align: left;
  cursor: pointer;
  transition:
    background 160ms var(--ease-out),
    transform 160ms var(--ease-out);
}

.hz-type:hover {
  background: rgba(255, 255, 255, 0.14);
}

.hz-type:active {
  transform: scale(0.985);
}

.hz-type-glyph {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1.5px solid rgba(208, 52, 44, 0.9);
  color: #ffffff;
}

.hz-type-glyph :deep(svg) {
  width: 20px;
  height: 20px;
}

.hz-type-text {
  display: grid;
  gap: 1px;
  font-family: var(--font-text);
}

.hz-type-text strong {
  font-size: 0.95rem;
  font-weight: 600;
}

.hz-type-text small {
  font-size: 0.75rem;
  line-height: 1.3;
  color: var(--hz-white-2);
}

.hz-picker-cancel {
  width: 100%;
  min-height: 40px;
  margin-top: 0.5rem;
  border: 0;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--hz-white-2);
  font-family: var(--font-text);
  font-size: 0.9rem;
  cursor: pointer;
}

.hz-picker-cancel:hover {
  color: #ffffff;
}

/* ---------------------------------------------------------- hazard list */

.hz-sheet {
  position: absolute;
  top: 16px;
  right: 16px;
  bottom: 16px;
  width: 316px;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.hz-handle {
  display: none;
}

.hz-sheet-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0.9rem 1rem 0.6rem;
}

.hz-sheet-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
}

.hz-sheet-count {
  margin: 0;
  font-size: 0.8rem;
  color: var(--hz-white-2);
}

.hz-list {
  list-style: none;
  margin: 0;
  padding: 0 0.6rem 0.6rem;
  display: grid;
  align-content: start;
  gap: 6px;
  overflow-y: auto;
  overscroll-behavior: contain;
}

.hz-card {
  padding: 0.7rem 0.75rem 0.65rem;
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid transparent;
  transition:
    background 200ms var(--ease-out),
    border-color 200ms var(--ease-out),
    opacity 500ms var(--ease-out),
    transform 500ms var(--ease-out);
  animation: hz-card-in 420ms cubic-bezier(0.2, 1.1, 0.4, 1);
}

@keyframes hz-card-in {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
}

.hz-card[data-active] {
  background: rgba(255, 255, 255, 0.13);
  border-color: rgba(255, 255, 255, 0.18);
}

.hz-card[data-status='cleared'] {
  opacity: 0;
  transform: translateX(12px);
}

.hz-card-top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hz-badge {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: rgba(11, 18, 32, 0.8);
  border: 1.5px solid var(--status-alert);
  font-size: 0.72rem;
  font-weight: 700;
}

.hz-card-title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
}

.hz-status {
  margin-left: auto;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  font-family: var(--font-text);
  font-size: 0.7rem;
  font-weight: 500;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
  white-space: nowrap;
}

.hz-status[data-status='confirmed'] {
  background: rgba(208, 52, 44, 0.8);
}

.hz-card-meta {
  margin: 0.35rem 0 0;
  font-size: 0.74rem;
  font-weight: 500;
  color: var(--hz-white-2);
}

.hz-card-effect {
  margin: 0.3rem 0 0;
  font-family: var(--font-text);
  font-size: 0.86rem;
  line-height: 1.4;
}

.hz-card-actions {
  display: flex;
  gap: 6px;
  margin-top: 0.6rem;
}

.hz-action {
  flex: 1;
  display: grid;
  gap: 1px;
  min-height: 44px;
  padding: 0.35rem 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  text-align: left;
  font-family: var(--font-text);
  cursor: pointer;
  transition:
    background 160ms var(--ease-out),
    transform 160ms var(--ease-out);
}

.hz-action strong {
  font-size: 0.86rem;
  font-weight: 600;
}

.hz-action small {
  font-size: 0.7rem;
  color: var(--hz-white-2);
}

.hz-action:hover {
  background: rgba(255, 255, 255, 0.16);
}

.hz-action:active {
  transform: scale(0.97);
}

.hz-action--confirm {
  background: rgba(208, 52, 44, 0.32);
  border-color: rgba(208, 52, 44, 0.7);
}

.hz-action--confirm:hover {
  background: rgba(208, 52, 44, 0.5);
}

.hz-empty {
  padding: 0.9rem 0.75rem;
  border-radius: var(--radius-lg);
  border: 1px dashed rgba(255, 255, 255, 0.22);
  font-family: var(--font-text);
  font-size: 0.86rem;
  line-height: 1.45;
  color: var(--hz-white-2);
}

/* ----------------------------------------------------------------- footer */

.hz-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3) var(--space-6);
}

.hz-legend {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.25rem;
  font-family: var(--font-text);
  font-size: var(--type-caption);
  color: var(--text-secondary);
}

.hz-legend li {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.hz-swatch {
  display: inline-block;
  width: 22px;
  height: 0;
  border-top: 3px solid;
  border-radius: 2px;
}

.hz-swatch--ghost {
  border-color: var(--orbis-night);
}

.hz-swatch--track {
  border-color: #c4157f;
}

.hz-swatch--ring {
  width: 14px;
  height: 14px;
  border: 2px solid var(--status-alert);
  border-radius: 999px;
}

.hz-swatch--slow {
  border-top: 3px dotted #c4157f;
}

.hz-sample {
  margin: 0;
  max-width: 60ch;
}

.hz-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* ------------------------------------------------------------- phones */

@media (max-width: 760px) {
  .hz-head {
    flex-direction: column;
    align-items: stretch;
  }

  .hz-head-actions {
    flex-wrap: wrap;
  }

  .hz-btn {
    flex: 1;
    justify-content: center;
  }

  .hz-stage {
    height: min(680px, var(--stage-cap, 78vh));
    border-radius: var(--radius-lg);
  }

  .hz-delta {
    top: 12px;
    left: 12px;
    min-width: 0;
    padding: 0.65rem 0.8rem 0.7rem;
  }

  .hz-delta-nums {
    font-size: 1.4rem;
  }

  /* the berth sits near the right edge of the tall crop, so its label sits left of the dot */
  .hz-place--end {
    transform: translate(calc(-100% - 12px), -50%);
  }

  /* the picker docks to the bottom so it is under the thumb */
  .hz-picker {
    left: 8px;
    right: 8px;
    bottom: 8px;
    width: auto;
    max-height: calc(100% - 16px);
    overflow-y: auto;
    transform-origin: bottom center;
    border-radius: var(--radius-xl);
    animation: hz-slide-up 360ms cubic-bezier(0.2, 1.1, 0.4, 1);
  }

  @keyframes hz-slide-up {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
  }

  .hz-picker-head {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .hz-picker-title {
    white-space: nowrap;
    font-size: 1rem;
  }

  .hz-stepper {
    gap: 0.35rem;
    font-size: 0.78rem;
  }

  .hz-stepper-about {
    display: none;
  }

  .hz-stepper button {
    width: 32px;
    height: 32px;
  }

  .hz-stepper span {
    min-width: 0;
    white-space: nowrap;
  }

  /* the hazard list is a bottom sheet with a drag handle */
  .hz-sheet {
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    width: auto;
    max-height: 70%;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    border-bottom: 0;
    transform: translateY(calc(100% - var(--peek)));
    transition: transform 420ms cubic-bezier(0.2, 1, 0.3, 1);
    z-index: 4;
  }

  .hz-sheet.is-open {
    transform: translateY(0);
  }

  .hz-sheet.is-dragging {
    transition: none;
  }

  .hz-handle {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.45rem;
    height: var(--peek);
    width: 100%;
    padding: 0.55rem 1rem 0.4rem;
    border: 0;
    background: transparent;
    color: #ffffff;
    font-family: var(--font-text);
    cursor: grab;
    touch-action: none;
  }

  .hz-grip {
    width: 40px;
    height: 5px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.4);
  }

  .hz-handle-text {
    display: flex;
    gap: 0.75rem;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .hz-handle-text .t-num {
    color: #ff7ac6;
  }

  .hz-sheet-head {
    display: none;
  }

  .hz-list {
    padding-bottom: calc(0.6rem + env(safe-area-inset-bottom, 0px));
  }
}

@media (prefers-reduced-motion: reduce) {
  .hz-picker,
  .hz-toast,
  .hz-card {
    animation: none;
  }

  .hz-sheet,
  .hz-card,
  .hz-btn,
  .hz-action,
  .hz-type {
    transition: none;
  }
}
</style>
