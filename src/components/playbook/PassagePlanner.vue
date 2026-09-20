<template>
  <section class="pp">
    <div class="pp-topline">
      <p class="t-overline pp-eyebrow">WaterWayz · a route for your vessel</p>
      <ul class="pp-legend" aria-label="Depth bands for this vessel">
        <li><i class="pp-swatch pp-swatch--nogo" aria-hidden="true"></i>shallower than your draft</li>
        <li><i class="pp-swatch pp-swatch--near" aria-hidden="true"></i>within 2 ft of it · illustrative</li>
      </ul>
    </div>

    <div ref="stageEl" class="pp-stage" :class="{ 'is-refused': !plan.ok, 'is-sheet-open': sheetOpen }">
      <canvas
        ref="canvasEl"
        class="pp-canvas"
        aria-label="Satellite chart of the Intracoastal Waterway at Fort Lauderdale with your planned track"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
        @wheel="onWheel"
      ></canvas>

      <!-- Named places as one-tap targets -->
      <button
        type="button"
        class="pp-place pp-place--start"
        :style="placeStyle(PLACES.sunriseBay)"
        @click="setPoint('from', PLACES.sunriseBay)"
      >
        <span class="pp-place-dot" aria-hidden="true"></span>Sunrise Bay
      </button>
      <button
        type="button"
        class="pp-place pp-place--dest"
        :style="placeStyle(PLACES.bahiaMar)"
        @click="setPoint('to', PLACES.bahiaMar)"
      >
        <span class="pp-place-pin" aria-hidden="true"></span>Bahia Mar
      </button>

      <!-- Floating HUD -->
      <div class="pp-hud" aria-live="polite">
        <template v-if="plan.ok">
          <div class="pp-hud-row">
            <div class="pp-hud-stat">
              <span class="pp-hud-num t-num">{{ plan.lengthNm.toFixed(1) }}</span>
              <span class="pp-hud-unit">NM</span>
            </div>
            <div class="pp-hud-stat">
              <span class="pp-hud-num t-num">{{ eta }}</span>
              <span class="pp-hud-unit">at {{ PLAN_SPEED_KN }} kn</span>
            </div>
          </div>
          <p class="pp-hud-line">
            shallowest on track: <span class="t-num">{{ plan.minDepthFt.toFixed(1) }} ft</span>
            <span class="pp-hud-muted">· illustrative</span>
          </p>
          <p v-if="plan.crossings.length" class="pp-hud-line">
            <span class="pp-hud-gate" aria-hidden="true"></span>
            under {{ BRIDGE.label }} · <span class="t-num">{{ BRIDGE.clearanceFt }} ft</span> clearance
          </p>
          <p v-else class="pp-hud-line pp-hud-muted">no bridge on this track</p>
        </template>
        <template v-else>
          <p class="pp-hud-refusal-title"><span class="pp-hud-dot" aria-hidden="true"></span>No track drawn</p>
          <p class="pp-hud-reason">{{ plan.reason }}</p>
          <p v-if="plan.hint" class="pp-hud-reason pp-hud-hint">{{ plan.hint }}</p>
        </template>
        <div class="pp-mode" role="group" aria-label="What the next tap on the water sets">
          <span class="pp-mode-label">Next tap sets</span>
          <button type="button" class="pp-mode-btn" :aria-pressed="mode === 'from'" @click="mode = 'from'">Start</button>
          <button type="button" class="pp-mode-btn" :aria-pressed="mode === 'to'" @click="mode = 'to'">Destination</button>
        </div>
      </div>

      <!-- Zoom -->
      <div class="pp-zoom" role="group" aria-label="Zoom">
        <button type="button" class="pp-zoom-btn" aria-label="Zoom in" @click="zoomBy(1.5)">+</button>
        <button type="button" class="pp-zoom-btn" aria-label="Zoom out" @click="zoomBy(1 / 1.5)">−</button>
      </div>

      <!-- Vessel: floating panel on desktop, bottom sheet on phones -->
      <aside class="pp-vessel" aria-label="Your vessel">
        <button type="button" class="pp-sheet-handle" :aria-expanded="sheetOpen" @click="sheetOpen = !sheetOpen">
          <span class="pp-sheet-grip" aria-hidden="true"></span>
          <span class="pp-sheet-summary">
            <span class="t-num">{{ vessel.lengthFt }} ft</span> · draft <span class="t-num">{{ vessel.draftFt }} ft</span> · air <span class="t-num">{{ vessel.airDraftFt }} ft</span>
          </span>
        </button>

        <div class="pp-vessel-head">
          <p class="t-overline pp-vessel-eyebrow">Your vessel</p>
          <p class="pp-vessel-note">Sample boats</p>
        </div>

        <div class="pp-presets" role="group" aria-label="Sample boats">
          <button
            v-for="s in SAMPLE_VESSELS"
            :key="s.id"
            type="button"
            class="pp-preset"
            :aria-pressed="activePreset === s.id"
            @click="applyPreset(s)"
          >
            <span class="pp-preset-name">{{ s.name }}</span>
            <span class="pp-preset-spec t-num">{{ s.draftFt }} ft draft · {{ s.airDraftFt }} ft air draft</span>
          </button>
        </div>

        <div class="pp-sliders">
          <label v-for="key in CONTROL_KEYS" :key="key" class="pp-slider">
            <span class="pp-slider-head">
              <span class="pp-slider-label">{{ CONTROLS[key].label }}</span>
              <span class="pp-slider-value t-num">{{ vessel[key] }}<span class="pp-slider-unit"> ft</span></span>
            </span>
            <input
              type="range"
              :min="CONTROLS[key].min"
              :max="CONTROLS[key].max"
              :step="CONTROLS[key].step"
              :value="vessel[key]"
              :style="{ '--fill': fillPct(key) }"
              @input="onSlider(key, $event)"
            />
          </label>
        </div>
        <p class="pp-vessel-caption">Length matters for berths, not for this track.</p>

        <div class="pp-actions">
          <button type="button" class="pp-btn pp-btn--primary" @click="planSample">Plan the sample passage</button>
          <button type="button" class="pp-btn" @click="startOver">Start over</button>
        </div>
      </aside>
    </div>

    <p class="pp-foot t-caption">
      Depth on this chart is distance from shore, shown as an illustration. In the product the route service uses charted
      bathymetry, tides and bridge gates computed server-side against your vessel workspace. The three boats are samples.
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch } from 'vue'
import { GRID_H, GRID_W, PLACES, cellOf, depthAt, isWater, type Point } from '@/data/playbook/waterRouter'
import {
  BRIDGE,
  CONTROLS,
  PLAN_SPEED_KN,
  SAMPLE_PASSAGE,
  SAMPLE_VESSELS,
  formatEta,
  planPassage,
  smoothTrack,
  type Plan,
  type Vessel,
} from '@/data/playbook/passage-planner-vessels'

type ControlKey = keyof typeof CONTROLS
const CONTROL_KEYS: ControlKey[] = ['lengthFt', 'draftFt', 'airDraftFt']

const ROUTE = '#C4157F'
const MAP_ASPECT = 16 / 9
const BASEMAP = '/assets/playbook/basemap-1920.webp'

/* ---------- state ---------- */
const stageEl = ref<HTMLDivElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)

const vessel = reactive<Vessel>({ ...SAMPLE_VESSELS[1]! })
const from = ref<Point | null>({ ...SAMPLE_PASSAGE.from })
const to = ref<Point | null>({ ...SAMPLE_PASSAGE.to })
const mode = ref<'from' | 'to'>('from')
const sheetOpen = ref(false)

const activePreset = computed(
  () =>
    SAMPLE_VESSELS.find(
      (s) => s.lengthFt === vessel.lengthFt && s.draftFt === vessel.draftFt && s.airDraftFt === vessel.airDraftFt,
    )?.id ?? null,
)

const emptyPlan: Plan = { ok: false, reason: '', points: [], cells: [], lengthNm: 0, minDepthFt: 0, bridges: [], crossings: [] }
const plan = shallowRef<Plan>(emptyPlan)
const eta = computed(() => formatEta(plan.value.lengthNm))

const fillPct = (key: ControlKey) => {
  const c = CONTROLS[key]
  return `${((vessel[key] - c.min) / (c.max - c.min)) * 100}%`
}

/* ---------- view (pan / zoom) ---------- */
const view = reactive({ w: 0, h: 0, zoom: 1, ox: 0, oy: 0 })
const baseScale = () => Math.max(view.w, view.h * MAP_ASPECT)
const mapW = () => baseScale() * view.zoom
const mapH = () => mapW() / MAP_ASPECT

const clampView = () => {
  view.ox = Math.min(0, Math.max(view.w - mapW(), view.ox))
  view.oy = Math.min(0, Math.max(view.h - mapH(), view.oy))
}
const toPx = (p: Point) => ({ x: view.ox + p.u * mapW(), y: view.oy + p.v * mapH() })
const toUv = (x: number, y: number): Point => ({ u: (x - view.ox) / mapW(), v: (y - view.oy) / mapH() })

const zoomAt = (x: number, y: number, factor: number) => {
  const before = toUv(x, y)
  view.zoom = Math.min(4, Math.max(1, view.zoom * factor))
  view.ox = x - before.u * mapW()
  view.oy = y - before.v * mapH()
  clampView()
  schedule()
}
const zoomBy = (factor: number) => zoomAt(view.w / 2, view.h / 2, factor)

const placeStyle = (p: Point) => {
  const { x, y } = toPx(p)
  return { transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)` }
}

/* ---------- pointer handling: tap, drag to pan, pinch to zoom, wheel ---------- */
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
      view.ox += x - p.x
      view.oy += y - p.y
      clampView()
      schedule()
    }
  } else if (pointers.size === 2) {
    p.x = x
    p.y = y
    const [a, b] = [...pointers.values()]
    const d = Math.hypot(a!.x - b!.x, a!.y - b!.y)
    if (pinchDist > 0) zoomAt((a!.x + b!.x) / 2, (a!.y + b!.y) / 2, d / pinchDist)
    pinchDist = d
  }
  p.x = x
  p.y = y
}

const onPointerUp = (e: PointerEvent) => {
  const p = pointers.get(e.pointerId)
  if (!p) return
  pointers.delete(e.pointerId)
  if (!dragging && pointers.size === 0) tap(p.x, p.y)
  if (pointers.size === 0) dragging = false
  else pinchDist = 0
}

const onWheel = (e: WheelEvent) => {
  e.preventDefault()
  const { x, y } = local(e)
  zoomAt(x, y, Math.exp(-e.deltaY * 0.0015))
}

const tap = (x: number, y: number) => {
  const p = toUv(x, y)
  if (p.u < 0 || p.u > 1 || p.v < 0 || p.v > 1) return
  ripple(p)
  setPoint(mode.value, p)
}

/* ---------- planning ---------- */
const setPoint = (which: 'from' | 'to', p: Point) => {
  const point = { u: p.u, v: p.v }
  if (which === 'from') {
    from.value = point
    /* A start on land keeps the next tap on the start. */
    const c = cellOf(point)
    mode.value = isWater(c % GRID_W, Math.floor(c / GRID_W)) ? 'to' : 'from'
  } else {
    to.value = point
    mode.value = 'to'
  }
}

const applyPreset = (s: Vessel) => {
  vessel.lengthFt = s.lengthFt
  vessel.draftFt = s.draftFt
  vessel.airDraftFt = s.airDraftFt
}

const onSlider = (key: ControlKey, e: Event) => {
  vessel[key] = Number((e.target as HTMLInputElement).value)
}

const planSample = () => {
  from.value = { ...SAMPLE_PASSAGE.from }
  to.value = { ...SAMPLE_PASSAGE.to }
  mode.value = 'to'
  if (activePreset.value === 'sail') applyPreset(SAMPLE_VESSELS[1]!)
}

const startOver = () => {
  from.value = null
  to.value = null
  mode.value = 'from'
}

let lastCells = ''
const replan = () => {
  if (!from.value || !to.value) {
    plan.value = {
      ...emptyPlan,
      reason: from.value ? 'Now tap the water where you want to arrive.' : 'Tap the water where you want to start.',
    }
    lastCells = ''
    track = []
    schedule()
    return
  }
  const next = planPassage(from.value, to.value, vessel)
  plan.value = next
  const key = next.cells.join(',')
  if (key !== lastCells) {
    lastCells = key
    track = next.ok ? smoothTrack(next.points) : []
    startDrawIn()
  }
  schedule()
}

/* ---------- canvas ---------- */
let ctx: CanvasRenderingContext2D | null = null
let img: HTMLImageElement | null = null
let dpr = 1
let raf = 0
let track: Point[] = []
let tintDirty = true
let tintCanvas: HTMLCanvasElement | null = null
const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* draw-in animation */
let drawStart = 0
let drawProgress = 1
const DRAW_MS = 800
const startDrawIn = () => {
  if (reduceMotion()) {
    drawProgress = 1
    return
  }
  drawStart = performance.now()
  drawProgress = 0
}

/* tap ripple */
let rippleAt: Point | null = null
let rippleStart = 0
const ripple = (p: Point) => {
  if (reduceMotion()) return
  rippleAt = p
  rippleStart = performance.now()
  schedule()
}

const schedule = () => {
  if (raf || typeof requestAnimationFrame === 'undefined') return
  raf = requestAnimationFrame(frame)
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

const frame = (now: number) => {
  raf = 0
  let again = false
  if (drawProgress < 1) {
    drawProgress = Math.min(1, (now - drawStart) / DRAW_MS)
    again = drawProgress < 1
  }
  let rippleT = -1
  if (rippleAt) {
    rippleT = (now - rippleStart) / 520
    if (rippleT >= 1) rippleAt = null
    else again = true
  }
  draw(rippleT)
  if (again) schedule()
}

const buildTint = () => {
  if (!tintCanvas) {
    tintCanvas = document.createElement('canvas')
    tintCanvas.width = GRID_W
    tintCanvas.height = GRID_H
  }
  const tctx = tintCanvas.getContext('2d')!
  const data = tctx.createImageData(GRID_W, GRID_H)
  const d = data.data
  const draft = vessel.draftFt
  for (let y = 0; y < GRID_H; y++) {
    for (let x = 0; x < GRID_W; x++) {
      if (!isWater(x, y)) continue
      const c = y * GRID_W + x
      const depth = depthAt(c)
      const i = c * 4
      if (depth < draft) {
        d[i] = 208; d[i + 1] = 52; d[i + 2] = 44; d[i + 3] = 125
      } else if (depth < draft + 2) {
        d[i] = 224; d[i + 1] = 161; d[i + 2] = 0; d[i + 3] = 88
      }
    }
  }
  tctx.putImageData(data, 0, 0)
  tintDirty = false
}

const pill = (x: number, y: number, text: string, opts: { above?: boolean; accent?: string } = {}) => {
  if (!ctx) return
  ctx.font = '500 12px "Red Hat Text", system-ui, sans-serif'
  const w = ctx.measureText(text).width + 20
  const h = 24
  const px = x - w / 2
  const py = opts.above ? y - 16 - h : y + 14
  ctx.fillStyle = 'rgba(11, 18, 32, 0.78)'
  ctx.beginPath()
  ctx.roundRect(px, py, w, h, 12)
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

const gate = (x: number, y: number, open: boolean) => {
  if (!ctx) return
  const colour = open ? '#2E9B4E' : '#D0342C'
  ctx.save()
  ctx.translate(x, y)
  /* pad */
  ctx.fillStyle = 'rgba(11, 18, 32, 0.78)'
  ctx.beginPath()
  ctx.arc(0, 0, 15, 0, Math.PI * 2)
  ctx.fill()
  if (!open) {
    ctx.strokeStyle = colour
    ctx.lineWidth = 2
    ctx.stroke()
  }
  /* posts */
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = 2
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(-7, 6)
  ctx.lineTo(-7, -3)
  ctx.moveTo(7, 6)
  ctx.lineTo(7, -3)
  ctx.stroke()
  /* leaves */
  ctx.strokeStyle = colour
  ctx.lineWidth = 2.5
  ctx.beginPath()
  if (open) {
    ctx.moveTo(-7, -3)
    ctx.lineTo(-3, -9)
    ctx.moveTo(7, -3)
    ctx.lineTo(3, -9)
  } else {
    ctx.moveTo(-7, -3)
    ctx.lineTo(7, -3)
  }
  ctx.stroke()
  ctx.restore()
}

const draw = (rippleT: number) => {
  if (!ctx || !canvasEl.value) return
  const { w, h } = view
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = '#0B1220'
  ctx.fillRect(0, 0, w, h)
  if (!img) return

  const mw = mapW()
  const mh = mapH()
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(img, view.ox, view.oy, mw, mh)

  /* depth bands for this vessel */
  if (tintDirty) buildTint()
  if (tintCanvas) ctx.drawImage(tintCanvas, view.ox, view.oy, mw, mh)

  /* soft vignette so floating cards sit on something */
  const vg = ctx.createLinearGradient(0, 0, 0, h)
  vg.addColorStop(0, 'rgba(11, 18, 32, 0.28)')
  vg.addColorStop(0.35, 'rgba(11, 18, 32, 0)')
  vg.addColorStop(0.75, 'rgba(11, 18, 32, 0)')
  vg.addColorStop(1, 'rgba(11, 18, 32, 0.32)')
  ctx.fillStyle = vg
  ctx.fillRect(0, 0, w, h)

  /* the track */
  if (track.length > 1 && plan.value.ok) {
    const pts = track.map(toPx)
    let total = 0
    for (let i = 1; i < pts.length; i++) total += Math.hypot(pts[i]!.x - pts[i - 1]!.x, pts[i]!.y - pts[i - 1]!.y)
    const p = easeOut(drawProgress)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.setLineDash([total, total])
    ctx.lineDashOffset = total * (1 - p)
    const path = new Path2D()
    path.moveTo(pts[0]!.x, pts[0]!.y)
    for (let i = 1; i < pts.length; i++) path.lineTo(pts[i]!.x, pts[i]!.y)
    ctx.save()
    ctx.shadowColor = 'rgba(196, 21, 127, 0.75)'
    ctx.shadowBlur = 14
    ctx.strokeStyle = 'rgba(196, 21, 127, 0.38)'
    ctx.lineWidth = 11
    ctx.stroke(path)
    ctx.restore()
    ctx.strokeStyle = ROUTE
    ctx.lineWidth = 3.5
    ctx.stroke(path)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)'
    ctx.lineWidth = 1
    ctx.stroke(path)
    ctx.setLineDash([])

    /* bridge gates on the track */
    if (p > 0.6) {
      for (const c of plan.value.crossings) {
        const g = toPx(c)
        gate(g.x, g.y, vessel.airDraftFt <= BRIDGE.clearanceFt)
        pill(g.x, g.y + 4, `${BRIDGE.clearanceFt} ft · open for ${vessel.airDraftFt} ft`, { accent: 'rgba(46,155,78,0.8)' })
      }
    }
  } else if (!plan.value.ok && vessel.airDraftFt > BRIDGE.clearanceFt && from.value && to.value) {
    /* The bridge is why; show it shut where it is. */
    const g = toPx(BRIDGE)
    gate(g.x, g.y, false)
    pill(g.x, g.y + 4, `${BRIDGE.clearanceFt} ft · closed to ${vessel.airDraftFt} ft`, { accent: 'rgba(208,52,44,0.9)' })
  }

  /* markers */
  if (from.value) {
    const s = toPx(from.value)
    ctx.beginPath()
    ctx.arc(s.x, s.y, 8, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.lineWidth = 3
    ctx.strokeStyle = '#242C38'
    ctx.stroke()
    pill(s.x, s.y, 'Start', { above: true })
  }
  if (to.value) {
    const d = toPx(to.value)
    ctx.beginPath()
    ctx.arc(d.x, d.y, 8, 0, Math.PI * 2)
    ctx.fillStyle = ROUTE
    ctx.fill()
    ctx.lineWidth = 3
    ctx.strokeStyle = '#ffffff'
    ctx.stroke()
    pill(d.x, d.y, 'Destination', { above: true, accent: 'rgba(196,21,127,0.8)' })
  }

  /* ripple */
  if (rippleAt && rippleT >= 0) {
    const r = toPx(rippleAt)
    const t = easeOut(rippleT)
    ctx.beginPath()
    ctx.arc(r.x, r.y, 6 + 26 * t, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.9 * (1 - rippleT)})`
    ctx.lineWidth = 2
    ctx.stroke()
  }
}

watch(() => vessel.draftFt, () => { tintDirty = true })
watch([from, to, () => vessel.draftFt, () => vessel.airDraftFt], replan, { immediate: true })

/* ---------- lifecycle ---------- */
let ro: ResizeObserver | null = null

const resize = () => {
  const stage = stageEl.value
  const canvas = canvasEl.value
  if (!stage || !canvas) return
  const rect = stage.getBoundingClientRect()
  const w = Math.round(rect.width)
  const h = Math.round(rect.height)
  if (!w || !h) return
  /* keep the map point at the centre where it was */
  const centre = view.w && view.h ? toUv(view.w / 2, view.h / 2) : { u: 0.5, v: 0.5 }
  view.w = w
  view.h = h
  dpr = Math.min(2, window.devicePixelRatio || 1)
  canvas.width = Math.round(w * dpr)
  canvas.height = Math.round(h * dpr)
  view.ox = w / 2 - centre.u * mapW()
  view.oy = h / 2 - centre.v * mapH()
  clampView()
  schedule()
}

onMounted(async () => {
  ctx = canvasEl.value?.getContext('2d') ?? null
  ro = new ResizeObserver(resize)
  if (stageEl.value) ro.observe(stageEl.value)
  resize()
  const image = new Image()
  image.decoding = 'async'
  image.src = BASEMAP
  try {
    await image.decode()
  } catch {
    /* draw what we have; the image may still land via onload */
  }
  img = image
  await document.fonts?.ready
  startDrawIn()
  schedule()
})

onBeforeUnmount(() => {
  ro?.disconnect()
  if (raf) cancelAnimationFrame(raf)
})
</script>

<style scoped>
.pp {
  --pp-glass: rgba(36, 44, 56, 0.66);
  --pp-glass-strong: rgba(36, 44, 56, 0.82);
  --pp-glass-border: rgba(255, 255, 255, 0.14);
  --pp-white-70: rgba(255, 255, 255, 0.72);
  --pp-white-50: rgba(255, 255, 255, 0.5);
  --pp-route: #c4157f;
}

.pp-topline {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-bottom: var(--space-3);
}

.pp-eyebrow {
  color: var(--text-muted);
}

.pp-legend {
  display: flex;
  gap: var(--space-4);
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--font-text);
  font-size: var(--type-caption);
  color: var(--text-muted);
}

.pp-legend li {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.pp-swatch {
  width: 14px;
  height: 10px;
  border-radius: 3px;
  background: rgba(208, 52, 44, 0.42);
}

.pp-swatch--near {
  background: rgba(224, 161, 0, 0.38);
}

/* ---------- stage ---------- */
.pp-stage {
  position: relative;
  width: 100%;
  height: min(clamp(520px, 78vh, 820px), var(--stage-cap, 80vh));
  overflow: hidden;
  border-radius: var(--radius-xl);
  background: var(--navy);
  box-shadow:
    0 30px 60px -30px rgba(11, 18, 32, 0.55),
    0 0 0 1px rgba(11, 18, 32, 0.08);
  isolation: isolate;
}

.pp-canvas {
  display: block;
  width: 100%;
  height: 100%;
  touch-action: none;
  cursor: crosshair;
  user-select: none;
  -webkit-user-select: none;
}

/* ---------- place chips ---------- */
.pp-place {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0;
  padding: 0.35rem 0.7rem 0.35rem 0.5rem;
  border: 1px solid var(--pp-glass-border);
  border-radius: 999px;
  background: var(--pp-glass-strong);
  -webkit-backdrop-filter: blur(14px) saturate(1.3);
  backdrop-filter: blur(14px) saturate(1.3);
  color: #ffffff;
  font-family: var(--font-text);
  font-size: 0.8125rem;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  /* anchor the chip's left-middle to the map point, then offset */
  translate: 14px -50%;
  transition: background 200ms var(--ease-out), scale 240ms var(--ease-out);
  z-index: 2;
}

.pp-place:hover {
  background: var(--slate);
}

.pp-place:active {
  scale: 0.96;
}

.pp-place:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

.pp-place-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 0 2px var(--slate);
}

.pp-place-pin {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--pp-route);
  box-shadow: 0 0 0 2px #ffffff;
}

/* ---------- HUD ---------- */
.pp-hud {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  z-index: 3;
  width: min(392px, calc(100% - 2 * var(--space-4)));
  padding: var(--space-4) var(--space-4) var(--space-3);
  border: 1px solid var(--pp-glass-border);
  border-radius: var(--radius-xl);
  background: var(--pp-glass);
  -webkit-backdrop-filter: blur(22px) saturate(1.4);
  backdrop-filter: blur(22px) saturate(1.4);
  color: #ffffff;
  box-shadow: 0 18px 40px -20px rgba(11, 18, 32, 0.7);
  font-family: var(--font-text);
  transition: background 320ms var(--ease-out), border-color 320ms var(--ease-out);
}

.is-refused .pp-hud {
  background: rgba(36, 44, 56, 0.86);
  border-color: rgba(208, 52, 44, 0.55);
}

.pp-hud-row {
  display: flex;
  gap: var(--space-6);
  align-items: baseline;
}

.pp-hud-stat {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
}

.pp-hud-num {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
}

.pp-hud-unit {
  font-size: 0.8125rem;
  color: var(--pp-white-70);
}

.pp-hud-line {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
  margin: var(--space-3) 0 0;
  font-size: 0.875rem;
  line-height: 1.4;
}

.pp-hud-line + .pp-hud-line {
  margin-top: var(--space-1);
}

.pp-hud-line .t-num {
  font-size: 0.9375rem;
}

.pp-hud-muted {
  color: var(--pp-white-70);
}

.pp-hud-gate {
  width: 12px;
  height: 8px;
  border: 2px solid var(--status-ok);
  border-top: 0;
  border-radius: 0 0 3px 3px;
}

.pp-hud-refusal-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 700;
}

.pp-hud-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--status-alert);
  box-shadow: 0 0 0 4px rgba(208, 52, 44, 0.25);
}

.pp-hud-reason {
  margin: var(--space-2) 0 0;
  font-size: 0.9375rem;
  line-height: 1.45;
  text-wrap: pretty;
}

.pp-hud-hint {
  color: var(--pp-white-70);
}

.pp-mode {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: var(--space-3);
  padding-top: var(--space-3);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.pp-mode-label {
  margin-right: auto;
  font-size: 0.75rem;
  color: var(--pp-white-70);
}

.pp-mode-btn {
  padding: 0.35rem 0.7rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--pp-white-70);
  font-family: var(--font-text);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 200ms var(--ease-out), color 200ms var(--ease-out);
}

.pp-mode-btn[aria-pressed='true'] {
  background: #ffffff;
  color: var(--slate);
}

.pp-mode-btn:focus-visible,
.pp-preset:focus-visible,
.pp-btn:focus-visible,
.pp-zoom-btn:focus-visible,
.pp-sheet-handle:focus-visible {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

/* ---------- zoom ---------- */
.pp-zoom {
  position: absolute;
  left: var(--space-4);
  bottom: var(--space-4);
  z-index: 3;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--pp-glass-border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--pp-glass);
  -webkit-backdrop-filter: blur(18px);
  backdrop-filter: blur(18px);
}

.pp-zoom-btn {
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

.pp-zoom-btn + .pp-zoom-btn {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.pp-zoom-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* ---------- vessel panel ---------- */
.pp-vessel {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  z-index: 4;
  width: 316px;
  max-height: calc(100% - 2 * var(--space-4));
  overflow-y: auto;
  padding: var(--space-4);
  border: 1px solid var(--pp-glass-border);
  border-radius: var(--radius-xl);
  background: var(--pp-glass-strong);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  backdrop-filter: blur(24px) saturate(1.4);
  color: #ffffff;
  box-shadow: 0 24px 50px -24px rgba(11, 18, 32, 0.8);
  font-family: var(--font-text);
}

.pp-sheet-handle {
  display: none;
}

.pp-vessel-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: var(--space-3);
}

.pp-vessel-eyebrow {
  color: var(--pp-white-70);
}

.pp-vessel-note {
  margin: 0;
  font-size: 0.75rem;
  color: var(--pp-white-50);
}

.pp-presets {
  display: grid;
  gap: 0.375rem;
}

.pp-preset {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  padding: 0.6rem 0.8rem;
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  text-align: left;
  cursor: pointer;
  transition: background 200ms var(--ease-out), border-color 200ms var(--ease-out), transform 240ms var(--ease-out);
}

.pp-preset:hover {
  background: rgba(255, 255, 255, 0.11);
}

.pp-preset:active {
  transform: scale(0.985);
}

.pp-preset[aria-pressed='true'] {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.55);
}

.pp-preset-name {
  font-family: var(--font-text);
  font-size: 0.9375rem;
  font-weight: 500;
}

.pp-preset-spec {
  font-family: var(--font-text);
  font-size: 0.75rem;
  color: var(--pp-white-70);
}

.pp-sliders {
  display: grid;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

.pp-slider {
  display: block;
}

.pp-slider-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.15rem;
}

.pp-slider-label {
  font-size: 0.8125rem;
  color: var(--pp-white-70);
}

.pp-slider-value {
  font-size: 1.625rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.pp-slider-unit {
  font-family: var(--font-text);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--pp-white-70);
}

.pp-slider input[type='range'] {
  --fill: 0%;
  width: 100%;
  height: 32px;
  margin: 0;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;
}

.pp-slider input[type='range']::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--maris-night) var(--fill), rgba(255, 255, 255, 0.18) var(--fill));
}

.pp-slider input[type='range']::-moz-range-track {
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.18);
}

.pp-slider input[type='range']::-moz-range-progress {
  height: 6px;
  border-radius: 3px;
  background: var(--maris-night);
}

.pp-slider input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 26px;
  height: 26px;
  margin-top: -10px;
  border: 0;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(11, 18, 32, 0.45);
  transition: transform 160ms var(--ease-out);
}

.pp-slider input[type='range']::-moz-range-thumb {
  width: 26px;
  height: 26px;
  border: 0;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(11, 18, 32, 0.45);
}

.pp-slider input[type='range']:active::-webkit-slider-thumb {
  transform: scale(1.12);
}

.pp-slider input[type='range']:focus-visible {
  outline: none;
}

.pp-slider input[type='range']:focus-visible::-webkit-slider-thumb {
  box-shadow: 0 0 0 3px var(--slate), 0 0 0 5px #ffffff;
}

.pp-slider input[type='range']:focus-visible::-moz-range-thumb {
  box-shadow: 0 0 0 3px var(--slate), 0 0 0 5px #ffffff;
}

.pp-vessel-caption {
  margin: var(--space-2) 0 0;
  font-size: 0.75rem;
  color: var(--pp-white-50);
}

.pp-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: var(--space-4);
}

.pp-btn {
  flex: 1 1 auto;
  min-height: 44px;
  padding: 0.6rem 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 999px;
  background: transparent;
  color: #ffffff;
  font-family: var(--font-text);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 200ms var(--ease-out), transform 200ms var(--ease-out);
}

.pp-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.pp-btn:active {
  transform: scale(0.98);
}

.pp-btn--primary {
  flex: 2 1 auto;
  border-color: transparent;
  background: #ffffff;
  color: var(--slate);
}

.pp-btn--primary:hover {
  background: var(--maris-wash);
}

.pp-foot {
  margin: var(--space-4) 0 0;
  max-width: 72ch;
  line-height: 1.5;
}

/* ---------- phones: bottom sheet ---------- */
@media (max-width: 760px) {
  .pp-stage {
    height: min(clamp(520px, 82svh, 760px), var(--stage-cap, 80vh));
    border-radius: var(--radius-lg);
  }

  .pp-hud {
    top: var(--space-3);
    left: var(--space-3);
    width: calc(100% - 2 * var(--space-3));
    padding: var(--space-3) var(--space-3) var(--space-2);
  }

  .pp-hud-num {
    font-size: 1.625rem;
  }

  .pp-zoom {
    left: auto;
    right: var(--space-3);
    bottom: calc(var(--pp-sheet-peek) + var(--space-3));
    flex-direction: row;
  }

  .pp-zoom-btn + .pp-zoom-btn {
    border-top: 0;
    border-left: 1px solid rgba(255, 255, 255, 0.12);
  }

  .pp-stage {
    --pp-sheet-peek: 64px;
  }

  .pp-vessel {
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    max-height: calc(100% - 96px);
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 0 var(--space-4) calc(var(--space-4) + env(safe-area-inset-bottom));
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    border-bottom: 0;
    transform: translateY(calc(100% - var(--pp-sheet-peek)));
    transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 -18px 40px -24px rgba(11, 18, 32, 0.9);
  }

  .is-sheet-open .pp-vessel {
    transform: translateY(0);
  }

  .pp-sheet-handle {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    width: 100%;
    height: var(--pp-sheet-peek);
    padding: 0.5rem 0 0;
    border: 0;
    background: transparent;
    color: #ffffff;
    font-family: var(--font-text);
    font-size: 0.875rem;
    cursor: pointer;
  }

  .pp-sheet-grip {
    width: 40px;
    height: 5px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.4);
  }

  .pp-sheet-summary .t-num {
    font-family: var(--font-text);
    font-weight: 600;
  }

  .pp-vessel-head {
    margin-top: var(--space-2);
  }

  .pp-presets {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .pp-preset {
    padding: 0.5rem 0.6rem;
  }

  .pp-preset-name {
    font-size: 0.8125rem;
    line-height: 1.25;
  }

  .pp-preset-spec {
    font-size: 0.6875rem;
    line-height: 1.3;
  }

  .pp-sliders {
    gap: var(--space-2);
  }

  .pp-actions {
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pp-vessel,
  .pp-place,
  .pp-preset,
  .pp-btn,
  .pp-hud {
    transition: none;
  }
}
</style>
