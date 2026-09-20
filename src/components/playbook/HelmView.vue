<template>
  <section class="hv" :data-view="view" :class="{ 'hv--arrived': arrived, 'hv--sheet': !!sheet }">
    <div class="hv-topline">
      <p class="t-overline hv-eyebrow">WaterWayz · underway</p>
      <p class="hv-hint t-caption" :key="view">{{ viewMeta.hint }}</p>
    </div>

    <div ref="stageEl" class="hv-stage">
      <canvas
        ref="canvasEl"
        class="hv-canvas"
        :class="{ 'is-3d': view === '3d' }"
        aria-label="Satellite chart of the Intracoastal Waterway at Fort Lauderdale with your vessel underway to Bahia Mar"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
        @wheel="onWheel"
      ></canvas>

      <!-- Vessel chip -->
      <div class="hv-chip" aria-live="off">
        <span class="hv-chip-mark" aria-hidden="true">S</span>
        <span class="hv-chip-name">{{ VESSEL.name }}</span>
        <span class="hv-chip-dot" :class="{ 'is-slow': slow }" aria-hidden="true"></span>
        <span class="hv-chip-stat t-num">{{ arrived ? 'alongside' : `${sog.toFixed(1)} kn` }}</span>
      </div>

      <!-- View switch -->
      <div class="hv-views" role="group" aria-label="View">
        <button
          v-for="m in VIEW_MODES"
          :key="m.id"
          type="button"
          class="hv-view-btn"
          :aria-pressed="view === m.id"
          @click="setView(m.id)"
        >{{ m.label }}</button>
      </div>

      <!-- Tool rail -->
      <div class="hv-rail" role="group" aria-label="Chart tools">
        <button type="button" class="hv-tool" :aria-pressed="showTraffic" aria-label="Vessels nearby layer" title="Vessels nearby" @click="showTraffic = !showTraffic">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 3 8l9 5 9-5-9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" /></svg>
        </button>
        <button type="button" class="hv-tool" :aria-pressed="follow" aria-label="Follow my vessel" title="Follow my vessel" @click="recenter">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /></svg>
        </button>
        <button type="button" class="hv-tool" :aria-pressed="view === 'above'" aria-label="North up" title="North up" @click="setView('above')">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m12 5 3 7-3 7-3-7 3-7Z" /></svg>
        </button>
      </div>

      <!-- Zoom -->
      <div class="hv-zoom" role="group" aria-label="Zoom">
        <button type="button" class="hv-zoom-btn" aria-label="Zoom in" @click="zoomBy(1.4)">+</button>
        <button type="button" class="hv-zoom-btn" aria-label="Zoom out" @click="zoomBy(1 / 1.4)">−</button>
      </div>

      <!-- Report / emergency -->
      <div class="hv-actions">
        <button type="button" class="hv-action hv-action--sos" @click="sheet = 'emergency'">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.5" /><path d="m5.6 5.6 4 4M14.4 14.4l4 4M18.4 5.6l-4 4M9.6 14.4l-4 4" /></svg>
          Emergency
        </button>
        <button type="button" class="hv-action" :disabled="arrived" @click="reportHazard">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></svg>
          Hazard
        </button>
      </div>

      <!-- Bottom cards: destination, route, today -->
      <div ref="stripEl" class="hv-strip" :class="{ 'is-open': stripOpen }">
        <button type="button" class="hv-strip-handle" :aria-expanded="stripOpen" @click="stripOpen = !stripOpen">
          <span class="hv-grip" aria-hidden="true"></span>
          <span class="t-num">{{ etaClock }}</span> · {{ remainingLabel }} · {{ DESTINATION.short }}
        </button>
        <div class="hv-cards">
          <article class="hv-card hv-card--dest" :class="{ 'is-lit': destLit }">
            <div class="hv-card-head">
              <h3 class="hv-card-title">{{ DESTINATION.label }}</h3>
              <span class="hv-tag">{{ DESTINATION.kind }}</span>
            </div>
            <p class="hv-card-line"><span class="t-num">{{ remainingLabel }}</span> · Ratings arrive with social</p>
            <p class="hv-card-line">Approach <span class="t-num">{{ DESTINATION.approachDepthFt }} ft</span> · berth <span class="t-num">{{ DESTINATION.berth }}</span> assigned</p>
            <div class="hv-card-actions">
              <a class="hv-icon-btn" :href="`tel:${DESTINATION.phone.replace(/\s/g, '')}`" aria-label="Call the marina">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
              </a>
              <button type="button" class="hv-icon-btn" aria-label="Centre the chart on the marina" @click="lookAt(DESTINATION)">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 3 3 10l8 3 3 8 7-18Z" /></svg>
              </button>
              <button type="button" class="hv-icon-btn" :aria-pressed="saved" :aria-label="saved ? 'Saved' : 'Save this place'" @click="saved = !saved">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg>
              </button>
              <RouterLink class="hv-btn" to="/capabilities/dockpass#try-berth-fit">Book a berth</RouterLink>
            </div>
          </article>

          <article class="hv-card hv-card--route" aria-live="off">
            <p class="t-overline hv-card-ov">Route · {{ arrived ? 'arrived' : 'Sunrise Bay → Bahia Mar' }} <span class="hv-sample">sample</span></p>
            <dl class="hv-stats">
              <div><dt>ETA</dt><dd class="t-num">{{ etaClock }}</dd></div>
              <div><dt>Time</dt><dd class="t-num">{{ durationLabel(minsLeft) }}</dd></div>
              <div><dt>Distance</dt><dd class="t-num">{{ fix.remainingNm.toFixed(1) }} <small>NM</small></dd></div>
              <div><dt>Safe depth</dt><dd class="t-num">11.2 <small>ft</small></dd></div>
              <div><dt>Wind</dt><dd class="t-num">SE 9 <small>kn</small></dd></div>
              <div><dt>Tide</dt><dd class="t-num">+2.1 <small>ft ↑</small></dd></div>
            </dl>
            <div class="hv-progress" role="progressbar" aria-label="Passage progress" :aria-valuenow="Math.round(progress * 100)" aria-valuemin="0" aria-valuemax="100">
              <i :style="{ width: `${progress * 100}%` }"></i>
            </div>
            <button v-if="arrived" type="button" class="hv-btn hv-btn--ghost" @click="sailAgain">Sail it again</button>
          </article>

          <article class="hv-card hv-card--today">
            <p class="t-overline hv-card-ov">Today on the water</p>
            <ul class="hv-today">
              <li v-for="r in readings" :key="r.id">
                <span class="hv-today-label">{{ r.label }}</span>
                <span class="hv-today-value t-num">{{ r.value }}<small v-if="r.unit"> {{ r.unit }}</small></span>
                <span class="hv-today-note">{{ r.note }}</span>
                <span class="hv-today-age">{{ ageLabel(r.ageMs + elapsedMs) }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>

      <!-- Toast -->
      <Transition name="hv-fade">
        <p v-if="toast" class="hv-toast" role="status">{{ toast }}</p>
      </Transition>

      <!-- Emergency sheet -->
      <Transition name="hv-fade">
        <div v-if="sheet" class="hv-sheet" role="dialog" aria-modal="true" aria-labelledby="hv-sheet-title" @keydown.esc="sheet = null">
          <div class="hv-sheet-card">
            <p class="t-overline hv-sheet-ov">Emergency assistance</p>
            <h3 id="hv-sheet-title" class="hv-sheet-title">Share your position and call for help.</h3>
            <p class="hv-sheet-text">
              In WaterWayz this sends your vessel, position and heading to the marina you are bound for, your crew and the
              people you choose, and dials the emergency number for these waters. Nothing leaves this demonstration.
            </p>
            <dl class="hv-stats hv-stats--sheet">
              <div><dt>Vessel</dt><dd>{{ VESSEL.name }} · {{ VESSEL.lengthFt }} ft</dd></div>
              <div><dt>Position</dt><dd class="t-num">26.11° N · 80.11° W</dd></div>
              <div><dt>Heading</dt><dd class="t-num">{{ Math.round(fix.headingDeg).toString().padStart(3, '0') }}°</dd></div>
            </dl>
            <div class="hv-sheet-actions">
              <button ref="sheetClose" type="button" class="hv-btn" @click="sheet = null">Close</button>
              <span class="t-caption hv-sheet-note">WaterWayz™ does not replace a marine radio or the emergency number.</span>
            </div>
          </div>
        </div>
      </Transition>

      <p class="hv-credit">Imagery Esri, Maxar · positions and conditions illustrative</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { type Point } from '@/data/playbook/waterRouter'
import {
  CONDITIONS,
  DEBRIS,
  DESTINATION,
  NO_WAKE,
  TIME_SCALE,
  TRAFFIC,
  VESSEL,
  VIEW_MODES,
  ageLabel,
  buildTrack,
  clockAfter,
  durationLabel,
  fixAt,
  inNoWake,
  minutesLeft,
  speedAt,
  trafficAt,
  type Reading,
  type ViewMode,
} from '@/data/playbook/helm-view-scene'

const ROUTE = '#C4157F'
const TEAL = '#2FB5B0'
const MAP_ASPECT = 16 / 9
const BASEMAP = '/assets/playbook/basemap-1920.webp'

/* ---------- passage state ---------- */
const track = buildTrack()
const sailed = ref(0)
const fix = computed(() => fixAt(track, sailed.value))
const arrived = computed(() => fix.value.remainingNm <= 0.001)
const slow = computed(() => inNoWake(fix.value.at))
const sog = computed(() => (arrived.value ? 0 : speedAt(fix.value.at)))
const progress = computed(() => (track.lengthNm ? fix.value.sailedNm / track.lengthNm : 0))
const minsLeft = computed(() => minutesLeft(track, fix.value))
const now = ref(Date.now())
const etaClock = computed(() => clockAfter(now.value, minsLeft.value))
const remainingLabel = computed(() => (arrived.value ? 'Alongside' : `${fix.value.remainingNm.toFixed(1)} NM`))
const elapsedMs = ref(0)

/* ---------- ui state ---------- */
const view = ref<ViewMode>('above')
const viewMeta = computed(() => VIEW_MODES.find((m) => m.id === view.value)!)
const follow = ref(true)
const showTraffic = ref(true)
const stripOpen = ref(false)
const saved = ref(false)
const destLit = ref(false)
const toast = ref('')
const sheet = ref<'emergency' | null>(null)
const sheetClose = ref<HTMLButtonElement | null>(null)
const readings = shallowRef<Reading[]>([...CONDITIONS])
const hazards = shallowRef<(Point & { label: string })[]>([...DEBRIS])

let toastTimer = 0
const say = (text: string) => {
  toast.value = text
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => { toast.value = '' }, 3200)
}

const setView = (m: ViewMode) => {
  view.value = m
  follow.value = true
  cam.zoom = m === 'above' ? 1.7 : 2.6
  schedule()
}

const recenter = () => {
  follow.value = true
  schedule()
}

const lookAt = (p: Point) => {
  follow.value = false
  cam.cu = p.u
  cam.cv = p.v
  destLit.value = true
  window.setTimeout(() => { destLit.value = false }, 1400)
  schedule()
}

const reportHazard = () => {
  /* a little ahead of the bow, on the track */
  const ahead = fixAt(track, sailed.value + 0.08).at
  hazards.value = [...hazards.value, { ...ahead, label: 'Reported by you · awaiting confirmation' }]
  readings.value = readings.value.map((r) =>
    r.id === 'debris' ? { ...r, value: String(Number(r.value) + 1), note: 'Nearby · 1 yours', ageMs: -elapsedMs.value } : r,
  )
  say('Hazard reported to vessels nearby · awaiting confirmation')
  schedule()
}

const sailAgain = () => {
  sailed.value = 0
  follow.value = true
  playing = true
  last = 0
  schedule()
}

watch(sheet, async (open) => {
  if (open) {
    await nextTick()
    sheetClose.value?.focus()
  }
})

/* ---------- camera ---------- */
const stageEl = ref<HTMLDivElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)
const stripEl = ref<HTMLDivElement | null>(null)
const cam = reactive({ w: 0, h: 0, zoom: 1.7, cu: 0.5, cv: 0.5 })
const baseScale = () => Math.max(cam.w, cam.h * MAP_ASPECT)
const mapW = () => baseScale() * cam.zoom
const mapH = () => mapW() / MAP_ASPECT
/* the point the camera holds, and where on the stage it sits */
const anchor = () => (view.value === 'above' ? { x: cam.w / 2, y: cam.h / 2 } : { x: cam.w / 2, y: cam.h * 0.6 })
const rotation = () => (view.value === 'above' ? 0 : (-fix.value.headingDeg * Math.PI) / 180)

const toScreen = (p: Point) => {
  const a = anchor()
  const r = rotation()
  const dx = (p.u - cam.cu) * mapW()
  const dy = (p.v - cam.cv) * mapH()
  return { x: a.x + dx * Math.cos(r) - dy * Math.sin(r), y: a.y + dx * Math.sin(r) + dy * Math.cos(r) }
}
const panBy = (dx: number, dy: number) => {
  const r = -rotation()
  const mx = dx * Math.cos(r) - dy * Math.sin(r)
  const my = dx * Math.sin(r) + dy * Math.cos(r)
  cam.cu -= mx / mapW()
  cam.cv -= my / mapH()
  cam.cu = Math.min(1, Math.max(0, cam.cu))
  cam.cv = Math.min(1, Math.max(0, cam.cv))
}
const zoomBy = (factor: number) => {
  cam.zoom = Math.min(6, Math.max(1.1, cam.zoom * factor))
  schedule()
}

/* ---------- pointer: drag to pan, pinch and wheel to zoom, tap the marina ---------- */
interface Ptr { x: number; y: number; sx: number; sy: number }
const pointers = new Map<number, Ptr>()
let dragging = false
let pinchDist = 0
const local = (e: { clientX: number; clientY: number }) => {
  const r = canvasEl.value!.getBoundingClientRect()
  return { x: e.clientX - r.left, y: e.clientY - r.top }
}
const onPointerDown = (e: PointerEvent) => {
  if (e.button !== 0 && e.pointerType === 'mouse') return
  const { x, y } = local(e)
  pointers.set(e.pointerId, { x, y, sx: x, sy: y })
  canvasEl.value?.setPointerCapture(e.pointerId)
  if (pointers.size === 2) {
    const [a, b] = [...pointers.values()]
    pinchDist = Math.hypot(a!.x - b!.x, a!.y - b!.y)
    dragging = true
  }
}
const onPointerMove = (e: PointerEvent) => {
  const p = pointers.get(e.pointerId)
  if (!p) return
  const { x, y } = local(e)
  if (pointers.size === 1) {
    if (!dragging && Math.hypot(x - p.sx, y - p.sy) > 6) dragging = true
    if (dragging) {
      follow.value = false
      panBy(x - p.x, y - p.y)
      schedule()
    }
  } else if (pointers.size === 2) {
    p.x = x
    p.y = y
    const [a, b] = [...pointers.values()]
    const d = Math.hypot(a!.x - b!.x, a!.y - b!.y)
    if (pinchDist > 0) zoomBy(d / pinchDist)
    pinchDist = d
  }
  p.x = x
  p.y = y
}
const onPointerUp = (e: PointerEvent) => {
  const p = pointers.get(e.pointerId)
  if (!p) return
  pointers.delete(e.pointerId)
  if (!dragging && pointers.size === 0 && view.value !== '3d') {
    const d = toScreen(DESTINATION)
    if (Math.hypot(d.x - p.x, d.y - p.y) < 28) {
      destLit.value = true
      stripOpen.value = true
      window.setTimeout(() => { destLit.value = false }, 1400)
    }
  }
  if (pointers.size === 0) dragging = false
  else pinchDist = 0
}
const onWheel = (e: WheelEvent) => {
  e.preventDefault()
  zoomBy(Math.exp(-e.deltaY * 0.0015))
}

/* ---------- animation ---------- */
let ctx: CanvasRenderingContext2D | null = null
let img: HTMLImageElement | null = null
let dpr = 1
let raf = 0
let last = 0
let playing = true
let demoSeconds = 0
const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const schedule = () => {
  if (raf || typeof requestAnimationFrame === 'undefined') return
  raf = requestAnimationFrame(frame)
}

const frame = (t: number) => {
  raf = 0
  const dt = last ? Math.min(0.1, (t - last) / 1000) : 0
  last = t
  if (playing && !document.hidden) {
    const scale = reduceMotion() ? TIME_SCALE / 3 : TIME_SCALE
    demoSeconds += dt * scale
    sailed.value = Math.min(track.lengthNm, sailed.value + (sog.value * dt * scale) / 3600)
    elapsedMs.value += dt * 1000
    if (Math.floor(elapsedMs.value / 1000) !== Math.floor((elapsedMs.value - dt * 1000) / 1000)) now.value = Date.now()
    if (arrived.value && playing) {
      playing = false
      say(`Alongside at ${DESTINATION.short} · berth ${DESTINATION.berth}`)
    }
  }
  if (follow.value) {
    cam.cu = fix.value.at.u
    cam.cv = fix.value.at.v
  }
  draw()
  if (playing || pointers.size) schedule()
}

/* ---------- drawing ---------- */
const upright = (p: Point, fn: (x: number, y: number) => void) => {
  if (!ctx) return
  const s = toScreen(p)
  ctx.save()
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  fn(s.x, s.y)
  ctx.restore()
}

const pill = (x: number, y: number, text: string, opts: { above?: boolean; accent?: string; small?: boolean } = {}) => {
  if (!ctx) return
  ctx.font = `500 ${opts.small ? 11 : 12}px "Red Hat Text", system-ui, sans-serif`
  const w = ctx.measureText(text).width + 18
  const h = opts.small ? 20 : 24
  const px = x - w / 2
  const py = opts.above ? y - 14 - h : y + 12
  ctx.fillStyle = 'rgba(11, 18, 32, 0.8)'
  ctx.beginPath()
  ctx.roundRect(px, py, w, h, h / 2)
  ctx.fill()
  if (opts.accent) {
    ctx.strokeStyle = opts.accent
    ctx.lineWidth = 1
    ctx.stroke()
  }
  ctx.fillStyle = '#ffffff'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.fillText(text, x, py + h / 2 + 0.5)
}

const chevron = (x: number, y: number, headingDeg: number, size: number, fill: string, stroke: string) => {
  if (!ctx) return
  ctx.save()
  ctx.translate(x, y)
  /* headings are from north on the chart; add the chart's own turn */
  ctx.rotate((headingDeg * Math.PI) / 180 + rotation())
  ctx.beginPath()
  ctx.moveTo(0, -size)
  ctx.lineTo(size * 0.7, size * 0.8)
  ctx.lineTo(0, size * 0.4)
  ctx.lineTo(-size * 0.7, size * 0.8)
  ctx.closePath()
  ctx.fillStyle = fill
  ctx.fill()
  ctx.lineWidth = 1.5
  ctx.strokeStyle = stroke
  ctx.stroke()
  ctx.restore()
}

const draw = () => {
  if (!ctx || !canvasEl.value) return
  const { w, h } = cam
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = '#0B1220'
  ctx.fillRect(0, 0, w, h)
  if (!img) return

  const a = anchor()
  const mw = mapW()
  const mh = mapH()
  ctx.save()
  ctx.translate(a.x, a.y)
  ctx.rotate(rotation())
  ctx.translate(-cam.cu * mw, -cam.cv * mh)
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(img, 0, 0, mw, mh)

  const px = (p: Point) => ({ x: p.u * mw, y: p.v * mh })

  /* no-wake ring */
  const nw = px(NO_WAKE)
  ctx.beginPath()
  ctx.arc(nw.x, nw.y, (NO_WAKE.radius / 479) * mw, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(224, 161, 0, 0.14)'
  ctx.fill()
  ctx.setLineDash([6, 6])
  ctx.strokeStyle = 'rgba(224, 161, 0, 0.9)'
  ctx.lineWidth = 1.5
  ctx.stroke()
  ctx.setLineDash([])

  /* the track: sailed part quiet, the rest lit */
  const pts = track.points.map(px)
  const cut = Math.max(1, track.cum.findIndex((c) => c >= sailed.value))
  const behind = new Path2D()
  behind.moveTo(pts[0]!.x, pts[0]!.y)
  for (let i = 1; i < cut; i++) behind.lineTo(pts[i]!.x, pts[i]!.y)
  const here = px(fix.value.at)
  behind.lineTo(here.x, here.y)
  const aheadPath = new Path2D()
  aheadPath.moveTo(here.x, here.y)
  for (let i = cut; i < pts.length; i++) aheadPath.lineTo(pts[i]!.x, pts[i]!.y)
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)'
  ctx.lineWidth = 2
  ctx.setLineDash([2, 8])
  ctx.stroke(behind)
  ctx.setLineDash([])
  ctx.save()
  ctx.shadowColor = 'rgba(196, 21, 127, 0.75)'
  ctx.shadowBlur = 14
  ctx.strokeStyle = 'rgba(196, 21, 127, 0.38)'
  ctx.lineWidth = 11
  ctx.stroke(aheadPath)
  ctx.restore()
  ctx.strokeStyle = ROUTE
  ctx.lineWidth = 3.5
  ctx.stroke(aheadPath)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)'
  ctx.lineWidth = 1
  ctx.stroke(aheadPath)
  ctx.restore()

  /* everything that must read upright is drawn in screen space */
  /* traffic */
  if (showTraffic.value) {
    for (const v of TRAFFIC) {
      const t = trafficAt(v, demoSeconds)
      upright(t.at, (x, y) => {
        chevron(x, y, t.headingDeg, 7, v.friend ? 'rgba(47, 181, 176, 0.95)' : 'rgba(255,255,255,0.85)', 'rgba(11,18,32,0.8)')
        if (v.friend && cam.zoom > 1.8) pill(x, y, v.name, { small: true, accent: 'rgba(47,181,176,0.7)' })
      })
    }
  }

  /* debris */
  for (const d of hazards.value) {
    upright(d, (x, y) => {
      if (!ctx) return
      ctx.beginPath()
      ctx.arc(x, y, 11, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(11, 18, 32, 0.8)'
      ctx.fill()
      ctx.strokeStyle = '#E0A100'
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.fillStyle = '#E0A100'
      ctx.font = '700 12px "Red Hat Text", system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('!', x, y + 0.5)
    })
  }

  /* destination pin */
  upright(DESTINATION, (x, y) => {
    if (!ctx) return
    const lit = destLit.value
    ctx.beginPath()
    ctx.arc(x, y, lit ? 16 : 12, 0, Math.PI * 2)
    ctx.fillStyle = TEAL
    ctx.fill()
    ctx.lineWidth = 3
    ctx.strokeStyle = '#ffffff'
    ctx.stroke()
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.arc(x, y - 4, 2, 0, Math.PI * 2)
    ctx.moveTo(x, y - 2)
    ctx.lineTo(x, y + 6)
    ctx.moveTo(x - 5, y + 2)
    ctx.arc(x, y + 2, 5, Math.PI, 0, true)
    ctx.stroke()
    pill(x, y, DESTINATION.label, { above: true, accent: 'rgba(47,181,176,0.8)' })
  })

  /* own vessel */
  upright(fix.value.at, (x, y) => {
    if (!ctx) return
    ctx.beginPath()
    ctx.arc(x, y, 22, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(196, 21, 127, 0.18)'
    ctx.fill()
    chevron(x, y, fix.value.headingDeg, 13, '#ffffff', ROUTE)
    if (arrived.value) pill(x, y, 'Alongside', { above: true, accent: 'rgba(47,181,176,0.8)' })
  })

  /* soft vignette so the cards sit on something */
  const vg = ctx.createLinearGradient(0, 0, 0, h)
  vg.addColorStop(0, 'rgba(11, 18, 32, 0.3)')
  vg.addColorStop(0.3, 'rgba(11, 18, 32, 0)')
  vg.addColorStop(0.6, 'rgba(11, 18, 32, 0)')
  vg.addColorStop(1, 'rgba(11, 18, 32, 0.55)')
  ctx.fillStyle = vg
  ctx.fillRect(0, 0, w, h)
}

/* ---------- lifecycle ---------- */
let ro: ResizeObserver | null = null
const resize = () => {
  const stage = stageEl.value
  const canvas = canvasEl.value
  if (!stage || !canvas) return
  /* the zoom and report buttons sit on top of the cards, however tall they are */
  if (stripEl.value) stage.style.setProperty('--hv-strip-h', `${Math.round(stripEl.value.getBoundingClientRect().height)}px`)
  const rect = stage.getBoundingClientRect()
  const w = Math.round(rect.width)
  const h = Math.round(rect.height)
  if (!w || !h) return
  cam.w = w
  cam.h = h
  dpr = Math.min(2, window.devicePixelRatio || 1)
  canvas.width = Math.round(w * dpr)
  canvas.height = Math.round(h * dpr)
  schedule()
}

const onVisibility = () => { last = 0; schedule() }

onMounted(async () => {
  ctx = canvasEl.value?.getContext('2d') ?? null
  ro = new ResizeObserver(resize)
  if (stageEl.value) ro.observe(stageEl.value)
  if (stripEl.value) ro.observe(stripEl.value)
  resize()
  document.addEventListener('visibilitychange', onVisibility)
  const image = new Image()
  image.decoding = 'async'
  image.src = BASEMAP
  try {
    await image.decode()
  } catch {
    /* draw what we have */
  }
  img = image
  await document.fonts?.ready
  schedule()
})

onBeforeUnmount(() => {
  ro?.disconnect()
  document.removeEventListener('visibilitychange', onVisibility)
  if (raf) cancelAnimationFrame(raf)
  window.clearTimeout(toastTimer)
})
</script>

<style scoped>
.hv {
  --hv-glass: rgba(36, 44, 56, 0.58);
  --hv-glass-strong: rgba(30, 38, 50, 0.7);
  --hv-glass-card: rgba(26, 34, 46, 0.46);
  --hv-glass-border: rgba(255, 255, 255, 0.16);
  --hv-shadow: 0 22px 48px -18px rgba(0, 0, 0, 0.65), 0 2px 6px rgba(0, 0, 0, 0.18);
  --hv-white-70: rgba(255, 255, 255, 0.72);
  --hv-white-50: rgba(255, 255, 255, 0.5);
  --hv-route: #c4157f;
  --hv-teal: #2fb5b0;
  --hv-sos: #d0342c;
  --hv-strip-peek: 52px;
  font-family: var(--font-text);
  color: #ffffff;
}

.hv-topline {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-bottom: var(--space-3);
}

.hv-eyebrow,
.hv-hint {
  margin: 0;
  color: var(--text-secondary);
}

.hv-hint {
  animation: hv-in 320ms var(--ease-out);
}

/* ---------- stage ---------- */
.hv-stage {
  position: relative;
  width: 100%;
  height: min(clamp(520px, 78vh, 820px), var(--stage-cap, 80vh));
  overflow: hidden;
  border-radius: var(--radius-xl);
  background: #0b1220;
  box-shadow: 0 30px 60px -30px rgba(11, 18, 32, 0.55), 0 0 0 1px rgba(11, 18, 32, 0.08);
  isolation: isolate;
  perspective: 1100px;
}

.hv-canvas {
  display: block;
  width: 100%;
  height: 100%;
  touch-action: none;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  transform-origin: 50% 78%;
  transition: transform 560ms var(--ease-out);
}

.hv-canvas.is-3d {
  transform: rotateX(46deg) scale(1.7);
}

.hv-canvas:active {
  cursor: grabbing;
}

/* ---------- glass primitives ---------- */
.hv-chip,
.hv-views,
.hv-rail,
.hv-zoom,
.hv-card,
.hv-toast,
.hv-sheet-card {
  border: 1px solid var(--hv-glass-border);
  background: var(--hv-glass);
  -webkit-backdrop-filter: blur(24px) saturate(1.5);
  backdrop-filter: blur(24px) saturate(1.5);
  box-shadow: var(--hv-shadow);
}

.hv-chip {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  z-index: 3;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem 0.35rem 0.4rem;
  border-radius: 999px;
  font-size: 0.8125rem;
}

.hv-chip-mark {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--hv-route);
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 700;
}

.hv-chip-name {
  font-weight: 600;
}

.hv-chip-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2e9b4e;
  box-shadow: 0 0 0 3px rgba(46, 155, 78, 0.25);
}

.hv-chip-dot.is-slow {
  background: #e0a100;
  box-shadow: 0 0 0 3px rgba(224, 161, 0, 0.25);
}

.hv-chip-stat {
  color: var(--hv-white-70);
}

.hv-views {
  position: absolute;
  top: var(--space-4);
  left: 50%;
  z-index: 3;
  display: inline-flex;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  transform: translateX(-50%);
}

.hv-view-btn {
  padding: 0.4rem 0.9rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--hv-white-70);
  font-family: var(--font-text);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 200ms var(--ease-out), color 200ms var(--ease-out);
}

.hv-view-btn[aria-pressed='true'] {
  background: #ffffff;
  color: var(--slate);
}

.hv-rail {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  z-index: 3;
  display: flex;
  flex-direction: column;
  border-radius: 999px;
  overflow: hidden;
}

.hv-tool {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 0;
  background: transparent;
  color: #ffffff;
  cursor: pointer;
}

.hv-tool + .hv-tool {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.hv-tool[aria-pressed='true'] {
  background: rgba(255, 255, 255, 0.16);
}

.hv-tool svg,
.hv-action svg,
.hv-icon-btn svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.hv-zoom {
  position: absolute;
  left: var(--space-4);
  bottom: calc(var(--hv-strip-h, 200px) + var(--space-4));
  z-index: 3;
  display: flex;
  flex-direction: column;
  border-radius: 999px;
  overflow: hidden;
}

.hv-zoom-btn {
  width: 40px;
  height: 40px;
  border: 0;
  background: transparent;
  color: #ffffff;
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;
}

.hv-zoom-btn + .hv-zoom-btn {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.hv-actions {
  position: absolute;
  right: var(--space-4);
  bottom: calc(var(--hv-strip-h, 200px) + var(--space-4));
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.hv-action {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 38px;
  padding: 0.45rem 0.95rem 0.45rem 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: rgba(61, 142, 224, 0.92);
  color: #ffffff;
  font-family: var(--font-text);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 12px 28px -14px rgba(11, 18, 32, 0.8);
}

.hv-action:disabled {
  opacity: 0.5;
  cursor: default;
}

.hv-action--sos {
  background: var(--hv-sos);
}

/* ---------- bottom strip ---------- */
.hv-strip {
  position: absolute;
  left: var(--space-4);
  right: var(--space-4);
  bottom: var(--space-4);
  z-index: 4;
}

.hv-strip-handle {
  display: none;
}

.hv-cards {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1.2fr) minmax(0, 2fr);
  gap: var(--space-3);
  align-items: stretch;
}

.hv-card {
  min-width: 0;
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0) 55%), var(--hv-glass-card);
  box-shadow: var(--hv-shadow), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: box-shadow 320ms var(--ease-out), border-color 320ms var(--ease-out);
}

.hv-card.is-lit {
  border-color: rgba(47, 181, 176, 0.8);
  box-shadow: 0 0 0 3px rgba(47, 181, 176, 0.25), var(--hv-shadow);
}

.hv-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-3);
}

.hv-card-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.hv-tag {
  flex-shrink: 0;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 0.7rem;
  font-weight: 600;
}

.hv-card-line {
  margin: 0.4rem 0 0;
  font-size: 0.78rem;
  color: var(--hv-white-70);
}

.hv-card-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: var(--space-3);
}

.hv-icon-btn {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  cursor: pointer;
  text-decoration: none;
}

.hv-icon-btn[aria-pressed='true'] {
  color: var(--hv-route);
  background: rgba(196, 21, 127, 0.16);
}

.hv-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  margin-left: auto;
  padding: 0.45rem 0.9rem;
  border: 0;
  border-radius: 999px;
  background: #3d8ee0;
  color: #ffffff;
  font-family: var(--font-text);
  font-size: 0.8125rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

.hv-btn--ghost {
  margin: var(--space-3) 0 0;
  background: rgba(255, 255, 255, 0.12);
}

.hv-card-ov {
  margin: 0 0 0.6rem;
  color: var(--hv-white-70);
}

.hv-sample {
  margin-left: 0.4rem;
  padding: 0.05rem 0.4rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  font-size: 0.6rem;
  letter-spacing: 0.04em;
  text-transform: lowercase;
}

.hv-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.6rem 0.75rem;
  margin: 0;
}

.hv-stats dt {
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--hv-white-50);
}

.hv-stats dd {
  margin: 0.15rem 0 0;
  font-size: 1.05rem;
  font-weight: 600;
}

.hv-stats dd small {
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--hv-white-70);
}

.hv-progress {
  position: relative;
  height: 4px;
  margin-top: var(--space-3);
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.14);
  overflow: hidden;
}

.hv-progress i {
  position: absolute;
  inset: 0 auto 0 0;
  border-radius: 2px;
  background: var(--hv-route);
  transition: width 240ms linear;
}

.hv-today {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.hv-today li {
  display: grid;
  gap: 0.15rem;
  padding-left: 0.75rem;
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}

.hv-today li:first-child {
  padding-left: 0;
  border-left: 0;
}

.hv-today-label {
  white-space: nowrap;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--hv-white-50);
}

.hv-today-value {
  font-size: 1.05rem;
  font-weight: 600;
}

.hv-today-value small {
  font-size: 0.7rem;
  color: var(--hv-white-70);
}

.hv-today-note {
  font-size: 0.72rem;
  color: var(--hv-white-70);
}

.hv-today-age {
  font-size: 0.66rem;
  color: var(--hv-white-50);
}

/* ---------- toast / sheet / credit ---------- */
.hv-toast {
  position: absolute;
  left: 50%;
  top: calc(var(--space-4) + 52px);
  z-index: 5;
  margin: 0;
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  transform: translateX(-50%);
  white-space: nowrap;
}

.hv-sheet {
  position: absolute;
  inset: 0;
  z-index: 6;
  display: grid;
  place-items: center;
  padding: var(--space-4);
  background: rgba(11, 18, 32, 0.55);
}

.hv-sheet-card {
  width: min(460px, 100%);
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0) 55%), var(--hv-glass-strong);
}

.hv-sheet-ov {
  margin: 0 0 0.5rem;
  color: #ff9e98;
}

.hv-sheet-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
}

.hv-sheet-text {
  margin: var(--space-3) 0 var(--space-4);
  font-size: 0.875rem;
  line-height: 1.55;
  color: var(--hv-white-70);
}

.hv-stats--sheet dd {
  font-size: 0.9rem;
}

.hv-sheet-actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-4);
}

.hv-sheet-actions .hv-btn {
  margin-left: 0;
}

.hv-sheet-note {
  margin: 0;
  color: var(--hv-white-50);
}

.hv-credit {
  position: absolute;
  right: var(--space-3);
  bottom: 2px;
  z-index: 3;
  margin: 0;
  font-size: 0.6rem;
  color: var(--hv-white-50);
}

.hv-fade-enter-active,
.hv-fade-leave-active {
  transition: opacity 220ms var(--ease-out), transform 220ms var(--ease-out);
}

.hv-fade-enter-from,
.hv-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

.hv-toast.hv-fade-enter-from,
.hv-toast.hv-fade-leave-to {
  transform: translate(-50%, 6px);
}

@keyframes hv-in {
  from { opacity: 0; transform: translateY(3px); }
  to { opacity: 1; transform: none; }
}

/* ---------- tablets: two rows of cards ---------- */
@media (max-width: 1100px) {
  .hv-cards {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  .hv-card--today {
    grid-column: 1 / -1;
  }

  .hv-zoom,
  .hv-actions {
    bottom: calc(var(--hv-strip-h, 300px) + var(--space-4));
  }
}

/* ---------- phones: the strip is a sheet, the cards swipe ---------- */
@media (max-width: 760px) {
  .hv {
    --hv-strip-peek: 48px;
  }

  .hv-stage {
    height: min(clamp(520px, 82svh, 760px), var(--stage-cap, 80vh));
    border-radius: var(--radius-lg);
  }

  .hv-canvas {
    transform-origin: 50% 70%;
  }

  .hv-chip {
    top: var(--space-3);
    left: var(--space-3);
    font-size: 0.75rem;
  }

  .hv-views {
    top: auto;
    bottom: calc(var(--hv-strip-peek) + var(--space-3) + 44px);
    left: var(--space-3);
    transform: none;
  }

  .hv-rail {
    top: auto;
    bottom: calc(var(--hv-strip-peek) + var(--space-3) + 44px);
    right: var(--space-3);
  }

  .hv-tool {
    width: 36px;
    height: 36px;
  }

  .hv-zoom {
    display: none;
  }

  .hv-actions {
    right: auto;
    left: var(--space-3);
    bottom: calc(var(--hv-strip-peek) + var(--space-3));
    flex-direction: row;
    gap: 0.4rem;
  }

  .hv-action {
    min-height: 34px;
    padding: 0.35rem 0.75rem 0.35rem 0.6rem;
    font-size: 0.75rem;
  }

  .hv-strip {
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
    background: rgba(24, 31, 44, 0.62);
    -webkit-backdrop-filter: blur(26px) saturate(1.5);
    backdrop-filter: blur(26px) saturate(1.5);
    box-shadow: 0 -18px 44px rgba(0, 0, 0, 0.4);
    transform: translateY(calc(100% - var(--hv-strip-peek)));
    transition: transform 360ms var(--ease-out);
  }

  .hv-strip.is-open {
    transform: none;
  }

  .hv-strip-handle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    height: var(--hv-strip-peek);
    padding: 0.6rem var(--space-4) 0;
    border: 0;
    background: transparent;
    color: #ffffff;
    font-family: var(--font-text);
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
  }

  .hv-grip {
    position: absolute;
    top: 8px;
    left: 50%;
    width: 36px;
    height: 4px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-50%);
  }

  .hv-cards {
    display: flex;
    gap: var(--space-3);
    padding: 0 var(--space-3) calc(var(--space-3) + env(safe-area-inset-bottom));
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  .hv-cards::-webkit-scrollbar {
    display: none;
  }

  .hv-card {
    flex: 0 0 86%;
    scroll-snap-align: start;
    padding: var(--space-3);
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: linear-gradient(160deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0) 55%), rgba(255, 255, 255, 0.05);
    box-shadow: 0 10px 24px -14px rgba(0, 0, 0, 0.5);
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }

  .hv-today {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.6rem 0.75rem;
  }

  .hv-today li {
    padding-left: 0;
    border-left: 0;
  }

  .hv-toast {
    top: calc(var(--space-3) + 44px);
    max-width: calc(100% - 2 * var(--space-3));
    white-space: normal;
    text-align: center;
  }

  .hv-credit {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hv-canvas,
  .hv-strip,
  .hv-progress i,
  .hv-card {
    transition: none;
  }

  .hv-hint {
    animation: none;
  }
}
</style>
