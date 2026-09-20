<template>
  <section class="ots" :class="{ 'ots--sheet': !!selectedBerth, 'ots--ready': phase !== 'loading' }" @keydown.esc="closeCard">
    <div ref="stageEl" class="ots-stage">
      <canvas
        ref="canvasEl"
        class="ots-canvas"
        tabindex="0"
        role="application"
        aria-label="LiDAR scan of a marina. Drag to orbit, scroll or pinch to zoom, arrow keys to nudge the view."
        @keydown="onCanvasKey"
      />

      <!-- Berth pins: DOM buttons projected from the 3D anchors -->
      <div class="ots-pins" role="group" aria-label="Sample berths">
        <button
          v-for="b in BERTHS"
          :key="b.id"
          :ref="(el) => setPinEl(b.id, el)"
          type="button"
          class="ots-pin"
          :class="{ 'is-on': selectedId === b.id }"
          :aria-pressed="selectedId === b.id"
          :aria-label="`Berth ${b.id}, ${STATE_LABEL[b.state].toLowerCase()}`"
          @click="selectBerth(b.id)"
        >
          <span class="ots-pin-body">
            <span class="ots-pin-label t-num">{{ b.id }}</span>
            <i class="ots-pin-dot" :data-state="b.state" aria-hidden="true" />
          </span>
          <span class="ots-pin-stem" aria-hidden="true" />
          <span class="ots-pin-foot" aria-hidden="true" />
        </button>
      </div>

      <!-- A north-up plan of the scan, built from the points themselves: the
           berths, and where the camera is looking. Works even if WebGL does not. -->
      <div class="ots-map" :class="{ 'is-ready': planReady }" role="group" aria-label="Plan of the scan, north up">
        <canvas ref="mapEl" class="ots-map-canvas" aria-hidden="true" @click="onMapClick" />
        <button
          v-for="b in BERTHS"
          :key="'map-' + b.id"
          type="button"
          class="ots-map-pin"
          :class="{ 'is-on': selectedId === b.id }"
          :style="mapPinStyle(b)"
          :aria-label="`Berth ${b.id} on the plan`"
          @click="selectBerth(b.id)"
        ><i :data-state="b.state" /><span>{{ b.id }}</span></button>
        <p class="ots-map-label"><span>Plan · north up</span><span v-if="meta" class="t-num">{{ meta.extent_m[0]?.toFixed(0) }} × {{ meta.extent_m[1]?.toFixed(0) }} m</span></p>
      </div>

      <header class="ots-head">
        <p class="ots-overline">LiDAR survey · {{ SCAN.place }}</p>
        <h2 class="ots-title">Orbit the scan</h2>
        <p class="ots-lede">Drag to orbit. Tap a berth to read its approach brief.</p>
      </header>

      <div class="ots-stats" aria-live="polite">
        <span class="t-num">{{ fmt(loadedCount) }} points</span>
        <span v-if="meta" class="t-num">{{ meta.extent_m[0]?.toFixed(0) }} × {{ meta.extent_m[1]?.toFixed(0) }} m</span>
        <span class="ots-legend"><i :style="{ background: rampCss() }" /> height 0 to {{ RAMP_MAX_M }} m</span>
      </div>

      <div v-if="phase === 'loading' && !error" class="ots-load" role="progressbar" :aria-valuenow="Math.round(fraction * 100)" aria-valuemin="0" aria-valuemax="100" aria-label="Loading the scan">
        <svg class="ots-ring" viewBox="0 0 72 72" aria-hidden="true">
          <circle class="ots-ring-track" cx="36" cy="36" r="31" />
          <circle class="ots-ring-fill" cx="36" cy="36" r="31" :style="{ strokeDashoffset: ringOffset }" />
        </svg>
        <p class="ots-load-bytes t-num">{{ formatBytes(gotBytes) }} of {{ formatBytes(totalBytes) }}</p>
        <p class="ots-load-note">Preview first, then the full scan</p>
      </div>

      <div v-else-if="phase === 'preview' && !error" class="ots-chip" role="status">
        <svg class="ots-ring ots-ring--sm" viewBox="0 0 72 72" aria-hidden="true">
          <circle class="ots-ring-track" cx="36" cy="36" r="31" />
          <circle class="ots-ring-fill" cx="36" cy="36" r="31" :style="{ strokeDashoffset: ringOffset }" />
        </svg>
        <span class="t-num">Full scan · {{ formatBytes(gotBytes) }} of {{ formatBytes(totalBytes) }}</span>
      </div>

      <p v-if="error" class="ots-error" role="alert">The scan did not load ({{ error }}). Reload the page to try again.</p>
      <p v-else-if="cloudFailed" class="ots-error ots-error--soft" role="status">Your browser loaded the scan but did not draw it. The plan and the berths still work; try another browser for the 3D view.</p>

      <div class="ots-views" role="radiogroup" aria-label="View">
        <span class="ots-views-thumb" :style="{ transform: `translateX(${VIEWS.indexOf(view) * 100}%)` }" aria-hidden="true" />
        <button v-for="v in VIEWS" :key="v" type="button" role="radio" :aria-checked="view === v" :class="{ on: view === v }" @click="setView(v)">
          {{ VIEW_LABEL[v] }}
        </button>
      </div>

      <Transition name="ots-card">
        <aside v-if="selectedBerth" class="ots-card" role="region" aria-live="polite" :aria-label="`Berth ${selectedBerth.id}`">
          <span class="ots-card-grip" aria-hidden="true" />
          <div class="ots-card-head">
            <div>
              <p class="ots-card-id">{{ selectedBerth.id }}</p>
              <p class="ots-card-kind">{{ selectedBerth.kind }} · {{ loaLabel(selectedBerth) }}</p>
            </div>
            <span class="ots-state" :data-state="selectedBerth.state">{{ STATE_LABEL[selectedBerth.state] }}</span>
            <button type="button" class="ots-card-close" aria-label="Close" @click="closeCard">×</button>
          </div>

          <p class="ots-card-overline">Approach brief</p>
          <p class="ots-brief t-num">{{ approachBrief(selectedBerth) }}</p>

          <figure class="ots-where">
            <canvas ref="whereEl" class="ots-where-canvas" width="640" height="300" role="img" :aria-label="`Plan around berth ${selectedBerth.id}, north up, entry from ${selectedBerth.entryDeg} degrees`" />
            <figcaption class="ots-where-cap">
              <span>Where it is · north up</span>
              <span class="t-num">enter on {{ selectedBerth.entryDeg }}° · 140 m across</span>
            </figcaption>
          </figure>

          <dl class="ots-tiles">
            <div class="ots-tile">
              <dt>Enter</dt>
              <dd class="t-num">{{ selectedBerth.entryDeg }}°</dd>
              <dd class="ots-tile-sub">{{ selectedBerth.mode }}</dd>
            </div>
            <div class="ots-tile">
              <dt>Tie</dt>
              <dd class="ots-tile-word">{{ selectedBerth.tie }}</dd>
              <dd class="ots-tile-sub">{{ selectedBerth.tie === 'either' ? 'your choice' : 'lines that side' }}</dd>
            </div>
            <div class="ots-tile">
              <dt>Depth</dt>
              <dd class="t-num">{{ selectedBerth.depthM.toFixed(1) }} m</dd>
              <dd class="ots-tile-sub t-num">{{ selectedBerth.datum }} · {{ soundedLabel(selectedBerth.soundedDaysAgo) }}</dd>
            </div>
          </dl>

          <p class="ots-card-note">{{ STATE_NOTE[selectedBerth.state] }}</p>
          <p class="ots-card-foot">You book the marina; the dockmaster assigns the berth.</p>
        </aside>
      </Transition>
    </div>

    <p class="ots-sample">
      Sample berths: Bahia Mar's ids and length limits, placed on a different marina's scan ({{ SCAN.file }}, {{ SCAN.lat }}° N {{ Math.abs(SCAN.lon) }}° W). Positions, headings, depths and today's states are illustrative.
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import type * as THREE from 'three'
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { BERTHS, SCAN, STATE_LABEL, STATE_NOTE, approachBrief, loaLabel, soundedLabel } from '@/data/playbook/orbit-the-scan-berths'
import { RAMP_HEX, RAMP_MAX_M, easeOutCubic, formatBytes, frameOffset, hexToRgb01, nudgeOrbit, rampCss, unpackDepth } from '@/data/playbook/orbit-the-scan-scene'
import type { Vec3 } from '@/data/playbook/orbit-the-scan-scene'

/* ---------- types shared with the decimated LAS format (see scripts/decimate-las.py) ---------- */
interface Layout { pos_u16x3: number; rgb_u8x3: number; intensity_u8: number; hag_dm_u8: number; band_u8: number; nreturns_u8: number }
type Pair = [number, number]
interface Part { count: number; bytes: number; layout: Layout; bounds: { x: Pair; y: Pair; z: Pair } }
interface Meta { source_points: number; extent_m: number[]; full: Part; preview: Part; ground_level_m_ellipsoid: number }

type View = 'above' | 'helm' | 'free'
type Phase = 'loading' | 'preview' | 'full'
const VIEWS: View[] = ['above', 'helm', 'free']
const VIEW_LABEL: Record<View, string> = { above: 'Above', helm: 'Helm', free: 'Free' }

/* ---------- reactive state ---------- */
const stageEl = ref<HTMLElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)
const phase = ref<Phase>('loading')
const gotBytes = ref(0)
const totalBytes = ref(0)
const error = ref('')
const meta = ref<Meta | null>(null)
const loadedCount = ref(0)
const view = ref<View>('free')
const selectedId = ref<string | null>(null)
const mapEl = ref<HTMLCanvasElement | null>(null)
const whereEl = ref<HTMLCanvasElement | null>(null)
const planReady = ref(false)
const cloudFailed = ref(false)

const selectedBerth = computed(() => BERTHS.find((b) => b.id === selectedId.value) ?? null)
const fraction = computed(() => (totalBytes.value ? gotBytes.value / totalBytes.value : 0))
const RING_LEN = 2 * Math.PI * 31
const ringOffset = computed(() => RING_LEN * (1 - fraction.value))
const fmt = (n: number) => new Intl.NumberFormat('en-US').format(n)

const reducedMotion = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- three.js state (module-level lets, all disposed on unmount) ---------- */
type Three = typeof THREE
let T: Three | null = null
let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let controls: OrbitControls | null = null
let depthTarget: THREE.WebGLRenderTarget | null = null
let depthPixels: Uint8Array | null = null
let resizeObs: ResizeObserver | null = null
let intersectObs: IntersectionObserver | null = null
let raf = 0
let running = false
let visible = true
let onScreen = true
let dirty = true
let extent = 958
let center = { x: 0, y: 0, z: 0 }
let lastOcclusion = 0
let occlusionOk = true
let cloudChecked = false
let presetAngles: { az: number; polar: number } | null = null

/* ---------- the plan: a north-up map binned from the points on the CPU ---------- */
const PLAN_W = 320
let planCanvas: HTMLCanvasElement | null = null
let planH = 320
let bounds: { x: Pair; y: Pair } | null = null
let mapDirty = true

function buildPlan(buf: ArrayBuffer, part: Part) {
  const b = part.bounds
  bounds = { x: b.x, y: b.y }
  const spanX = b.x[1] - b.x[0]
  const spanY = b.y[1] - b.y[0]
  planH = Math.max(64, Math.round((PLAN_W * spanY) / spanX))
  const n = part.count
  const L = part.layout
  const pos = new Uint16Array(buf, 0, n * 3)
  const hag = new Uint8Array(buf, L.pos_u16x3 + L.rgb_u8x3 + L.intensity_u8, n)
  const maxH = new Uint8Array(PLAN_W * planH)
  const hit = new Uint8Array(PLAN_W * planH)
  for (let i = 0; i < n; i++) {
    const gx = Math.min(PLAN_W - 1, (pos[i * 3]! * PLAN_W) >>> 16)
    const gy = Math.min(planH - 1, planH - 1 - ((pos[i * 3 + 1]! * planH) >>> 16))
    const k = gy * PLAN_W + gx
    hit[k] = 1
    const h = hag[i]!
    if (h > maxH[k]!) maxH[k] = h
  }
  const canvas = planCanvas ?? document.createElement('canvas')
  canvas.width = PLAN_W
  canvas.height = planH
  const ctx = canvas.getContext('2d')!
  const img = ctx.createImageData(PLAN_W, planH)
  const ramp = RAMP_HEX.map((h) => hexToRgb01(h).map((c) => c * 255) as [number, number, number])
  const water: [number, number, number] = [8, 13, 24]
  for (let k = 0; k < PLAN_W * planH; k++) {
    let c: [number, number, number]
    if (!hit[k]) c = water
    else {
      const s = Math.sqrt(Math.min(1, (maxH[k]! * 0.1) / RAMP_MAX_M)) * 4
      const i0 = Math.min(3, Math.floor(s))
      const t = s - i0
      const a = ramp[i0]!
      const bb = ramp[i0 + 1]!
      c = [a[0] + (bb[0] - a[0]) * t, a[1] + (bb[1] - a[1]) * t, a[2] + (bb[2] - a[2]) * t]
    }
    img.data[k * 4] = c[0]
    img.data[k * 4 + 1] = c[1]
    img.data[k * 4 + 2] = c[2]
    img.data[k * 4 + 3] = 255
  }
  ctx.putImageData(img, 0, 0)
  planCanvas = canvas
  planReady.value = true
  mapDirty = true
  drawMap()
  drawWhere()
}

/** Plan pixel for a point in metres from the scan's centre. */
function metresToPlan(x: number, y: number): [number, number] {
  if (!bounds) return [0, 0]
  const u = (x + center.x - bounds.x[0]) / (bounds.x[1] - bounds.x[0])
  const v = 1 - (y + center.y - bounds.y[0]) / (bounds.y[1] - bounds.y[0])
  return [u * PLAN_W, v * planH]
}
const planPxPerM = () => (bounds ? PLAN_W / (bounds.x[1] - bounds.x[0]) : 1)

function mapPinStyle(b: (typeof BERTHS)[number]) {
  const [px, py] = metresToPlan(b.anchor[0], b.anchor[1])
  return { left: `${(px / PLAN_W) * 100}%`, top: `${(py / planH) * 100}%` }
}

function drawMap() {
  const el = mapEl.value
  if (!el || !planCanvas) return
  const dpr = Math.min(devicePixelRatio || 1, 2)
  const w = el.clientWidth || 200
  const h = Math.round((w * planH) / PLAN_W)
  if (el.width !== Math.round(w * dpr) || el.height !== Math.round(h * dpr)) {
    el.width = Math.round(w * dpr)
    el.height = Math.round(h * dpr)
    el.style.height = `${h}px`
  }
  const ctx = el.getContext('2d')!
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.imageSmoothingEnabled = true
  ctx.drawImage(planCanvas, 0, 0, w, h)
  const k = w / PLAN_W
  if (camera && controls) {
    const [cx, cy] = metresToPlan(camera.position.x, camera.position.y)
    const [tx, ty] = metresToPlan(controls.target.x, controls.target.y)
    const ang = Math.atan2(ty - cy, tx - cx)
    const half = ((camera.fov * camera.aspect) / 2) * (Math.PI / 180)
    const len = Math.min(w * 0.6, Math.hypot(tx - cx, ty - cy) * k * 1.6 + 18)
    ctx.beginPath()
    ctx.moveTo(cx * k, cy * k)
    ctx.lineTo(cx * k + Math.cos(ang - half) * len, cy * k + Math.sin(ang - half) * len)
    ctx.lineTo(cx * k + Math.cos(ang + half) * len, cy * k + Math.sin(ang + half) * len)
    ctx.closePath()
    ctx.fillStyle = 'rgba(61, 142, 224, 0.22)'
    ctx.fill()
    ctx.beginPath()
    ctx.arc(cx * k, cy * k, 4, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.lineWidth = 1.5
    ctx.strokeStyle = 'rgba(61, 142, 224, 0.95)'
    ctx.stroke()
  }
  mapDirty = false
}

/** The 140 m of plan around the selected berth, with its entry heading drawn on. */
function drawWhere() {
  const el = whereEl.value
  const b = selectedBerth.value
  if (!el || !b) return
  const ctx = el.getContext('2d')!
  const W = el.width
  const H = el.height
  ctx.clearRect(0, 0, W, H)
  const box = 140
  const scale = W / box
  if (planCanvas) {
    const [px, py] = metresToPlan(b.anchor[0], b.anchor[1])
    const ppm = planPxPerM()
    const sw = box * ppm
    const sh = (H / W) * box * ppm
    ctx.imageSmoothingEnabled = true
    ctx.drawImage(planCanvas, px - sw / 2, py - sh / 2, sw, sh, 0, 0, W, H)
  } else {
    ctx.fillStyle = '#0b1220'
    ctx.fillRect(0, 0, W, H)
  }
  const cx = W / 2
  const cy = H / 2
  /* the vessel's approach: it arrives travelling on the entry heading */
  const hd = (b.entryDeg * Math.PI) / 180
  const dx = Math.sin(hd)
  const dy = -Math.cos(hd)
  const len = 48 * scale
  ctx.lineCap = 'round'
  ctx.lineWidth = 3
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)'
  ctx.setLineDash([10, 8])
  ctx.beginPath()
  ctx.moveTo(cx - dx * len, cy - dy * len)
  ctx.lineTo(cx - dx * 10, cy - dy * 10)
  ctx.stroke()
  ctx.setLineDash([])
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.moveTo(cx - dx * 4, cy - dy * 4)
  ctx.lineTo(cx - dx * 18 - dy * 8, cy - dy * 18 + dx * 8)
  ctx.lineTo(cx - dx * 18 + dy * 8, cy - dy * 18 - dx * 8)
  ctx.closePath()
  ctx.fill()
  /* the berth */
  ctx.beginPath()
  ctx.arc(cx, cy, 9, 0, Math.PI * 2)
  ctx.fillStyle = '#ffffff'
  ctx.fill()
  ctx.beginPath()
  ctx.arc(cx, cy, 15, 0, Math.PI * 2)
  ctx.lineWidth = 2
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)'
  ctx.stroke()
  /* north */
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
  ctx.font = `700 ${Math.round(W * 0.035)}px Red Hat Display, sans-serif`
  ctx.textAlign = 'center'
  ctx.fillText('N', W - 26, 28)
  ctx.beginPath()
  ctx.moveTo(W - 26, 34)
  ctx.lineTo(W - 26, 52)
  ctx.lineWidth = 2
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)'
  ctx.stroke()
  /* scale bar, 20 m */
  const bar = 20 * scale
  ctx.beginPath()
  ctx.moveTo(18, H - 18)
  ctx.lineTo(18 + bar, H - 18)
  ctx.stroke()
  ctx.textAlign = 'left'
  ctx.fillText('20 m', 18, H - 26)
}

function onMapClick(e: MouseEvent) {
  const el = mapEl.value
  if (!el || !bounds || !camera || !controls) return
  const r = el.getBoundingClientRect()
  const u = (e.clientX - r.left) / r.width
  const v = (e.clientY - r.top) / r.height
  const x = bounds.x[0] + u * (bounds.x[1] - bounds.x[0]) - center.x
  const y = bounds.y[0] + (1 - v) * (bounds.y[1] - bounds.y[0]) - center.y
  const off = camera.position.clone().sub(controls.target)
  const target: Vec3 = { x, y, z: 0 }
  moveCamera({ x: x + off.x, y: y + off.y, z: off.z }, target)
  presetAngles = null
  view.value = 'free'
}

interface Cloud { points: THREE.Points; material: THREE.ShaderMaterial; revealStart: number; revealDir: 1 | -1; done: boolean }
let clouds: Cloud[] = []

interface Tween { fromPos: Vec3; toPos: Vec3; fromTgt: Vec3; toTgt: Vec3; start: number; dur: number }
let tween: Tween | null = null

const DEPTH_W = 192
const DEPTH_H = 108
const MAX_DIST = 3000
const REVEAL_MS = 1100
const TWEEN_MS = 700

/* Where the basins are, in metres from the scan's centre. */
const BASIN: Vec3 = { x: -30, y: -130, z: 0 }
const PRESETS: Record<View, { pos: Vec3; target: Vec3 }> = {
  above: { pos: { x: BASIN.x, y: BASIN.y - 6, z: 720 }, target: BASIN },
  helm: { pos: { x: 78, y: -232, z: 4.5 }, target: { x: -60, y: -195, z: 1.5 } },
  free: { pos: { x: BASIN.x + 270, y: BASIN.y - 390, z: 300 }, target: BASIN },
}

/* ---------- shaders: dequantise on the GPU, colour by height on the slate-to-maris ramp ---------- */
const vertexShader = /* glsl */ `
  attribute float intensity;
  attribute float hag;
  uniform vec3 uMin; uniform vec3 uRange; uniform vec3 uCenter; uniform vec3 uBg;
  uniform float uSize; uniform float uDpr; uniform float uReveal; uniform float uDepthOut; uniform float uMaxDist; uniform float uRampMax;
  uniform vec3 uRamp[5];
  varying vec3 vColor; varying float vKeep; varying float vHi; varying float vLo;
  void main() {
    vec3 p = uMin + position * uRange - uCenter;
    float hash = fract(sin(dot(position.xy, vec2(12.9898, 78.233))) * 43758.5453);
    vKeep = hash <= uReveal ? 1.0 : 0.0;
    float h = hag * 0.1;
    float s = sqrt(clamp(h / uRampMax, 0.0, 1.0)) * 4.0;
    vec3 c = mix(uRamp[0], uRamp[1], clamp(s, 0.0, 1.0));
    c = mix(c, uRamp[2], clamp(s - 1.0, 0.0, 1.0));
    c = mix(c, uRamp[3], clamp(s - 2.0, 0.0, 1.0));
    c = mix(c, uRamp[4], clamp(s - 3.0, 0.0, 1.0));
    c *= 0.68 + 0.95 * pow(intensity, 0.7);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float dist = -mv.z;
    vColor = mix(c, uBg, smoothstep(500.0, 2400.0, dist) * 0.6);
    float d = clamp(dist / uMaxDist, 0.0, 1.0);
    float v = floor(d * 65535.0 + 0.5);
    vHi = floor(v / 256.0) / 255.0;
    vLo = (v - floor(v / 256.0) * 256.0) / 255.0;
    gl_PointSize = clamp(uSize * uDpr * (380.0 / dist), 1.4 * uDpr, 7.5 * uDpr);
    gl_Position = projectionMatrix * mv;
  }`
const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform float uDepthOut;
  varying vec3 vColor; varying float vKeep; varying float vHi; varying float vLo;
  void main() {
    if (vKeep < 0.5) discard;
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    if (uDepthOut > 0.5) { gl_FragColor = vec4(vHi, vLo, 0.0, 1.0); return; }
    gl_FragColor = vec4(vColor, 1.0);
  }`

/* ---------- loading (copied from the demo viewer, with byte counts) ---------- */
async function fetchWithProgress(url: string, onProgress: (got: number) => void): Promise<ArrayBuffer> {
  const res = await fetch(url)
  if (!res.ok || !res.body) throw new Error(`${res.status} ${url}`)
  const reader = res.body.getReader()
  const chunks: Uint8Array[] = []
  let got = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
    got += value.length
    onProgress(got)
  }
  const out = new Uint8Array(got)
  let o = 0
  for (const c of chunks) { out.set(c, o); o += c.length }
  return out.buffer
}

function buildGeometry(buf: ArrayBuffer, part: Part): THREE.BufferGeometry {
  const t = T!
  const n = part.count
  const L = part.layout
  let o = 0
  const take = (bytes: number) => { const s = o; o += bytes; return s }
  const pos = new Uint16Array(buf, take(L.pos_u16x3), n * 3)
  take(L.rgb_u8x3)
  const inten = new Uint8Array(buf, take(L.intensity_u8), n)
  const hag = new Uint8Array(buf, take(L.hag_dm_u8), n)
  const g = new t.BufferGeometry()
  g.setAttribute('position', new t.BufferAttribute(pos, 3, true))
  g.setAttribute('intensity', new t.BufferAttribute(inten, 1, true))
  g.setAttribute('hag', new t.BufferAttribute(hag, 1, false))
  const b = part.bounds
  g.boundingSphere = new t.Sphere(new t.Vector3(), Math.hypot(b.x[1] - b.x[0], b.y[1] - b.y[0], b.z[1] - b.z[0]))
  return g
}

function makeMaterial(part: Part, size: number): THREE.ShaderMaterial {
  const t = T!
  const b = part.bounds
  return new t.ShaderMaterial({
    vertexShader, fragmentShader, depthWrite: true, transparent: false,
    uniforms: {
      uMin: { value: new t.Vector3(b.x[0], b.y[0], b.z[0]) },
      uRange: { value: new t.Vector3(b.x[1] - b.x[0], b.y[1] - b.y[0], b.z[1] - b.z[0]) },
      uCenter: { value: new t.Vector3(center.x, center.y, center.z) },
      uBg: { value: new t.Vector3(...hexToRgb01('#0B1220')) },
      uSize: { value: size },
      uDpr: { value: renderer?.getPixelRatio() ?? 1 },
      uReveal: { value: reducedMotion ? 1 : 0 },
      uDepthOut: { value: 0 },
      uMaxDist: { value: MAX_DIST },
      uRampMax: { value: RAMP_MAX_M },
      uRamp: { value: RAMP_HEX.map((h) => new t.Vector3(...hexToRgb01(h))) },
    },
  })
}

const setU = (m: THREE.ShaderMaterial, name: string, v: number) => { const u = m.uniforms[name]; if (u) u.value = v }

function addCloud(buf: ArrayBuffer, part: Part, size: number) {
  if (!scene || !T) return
  const material = makeMaterial(part, size)
  const points = new T.Points(buildGeometry(buf, part), material)
  points.frustumCulled = false
  scene.add(points)
  /* the previous cloud sprinkles out while the new one sprinkles in */
  for (const c of clouds) { c.revealDir = -1; c.revealStart = performance.now(); c.done = false }
  clouds.push({ points, material, revealStart: performance.now(), revealDir: 1, done: reducedMotion })
  loadedCount.value = part.count
  dirty = true
  buildPlan(buf, part)
}

function disposeCloud(c: Cloud) {
  scene?.remove(c.points)
  c.points.geometry.dispose()
  c.material.dispose()
}

/** Advances the reveal of every cloud; returns true while any is still changing. */
function stepReveal(now: number): boolean {
  let busy = false
  for (const c of [...clouds]) {
    if (c.done) continue
    const t = reducedMotion ? 1 : Math.min(1, (now - c.revealStart) / REVEAL_MS)
    const k = easeOutCubic(t)
    setU(c.material, 'uReveal', c.revealDir === 1 ? k : 1 - k)
    if (t >= 1) {
      c.done = true
      if (c.revealDir === -1) { disposeCloud(c); clouds = clouds.filter((x) => x !== c) }
    } else busy = true
  }
  return busy
}

/* ---------- camera moves ---------- */
function v3(v: Vec3) { return new T!.Vector3(v.x, v.y, v.z) }

function moveCamera(pos: Vec3, target: Vec3) {
  if (!camera || !controls) return
  if (reducedMotion) {
    camera.position.copy(v3(pos))
    controls.target.copy(v3(target))
    controls.update()
    tween = null
    dirty = true
    return
  }
  tween = {
    fromPos: camera.position.clone(), toPos: pos,
    fromTgt: controls.target.clone(), toTgt: target,
    start: performance.now(), dur: TWEEN_MS,
  }
}

function stepTween(now: number): boolean {
  if (!tween || !camera || !controls) return false
  const t = Math.min(1, (now - tween.start) / tween.dur)
  const k = easeOutCubic(t)
  camera.position.lerpVectors(v3(tween.fromPos), v3(tween.toPos), k)
  controls.target.lerpVectors(v3(tween.fromTgt), v3(tween.toTgt), k)
  if (t >= 1) tween = null
  return true
}

function rememberPreset() {
  if (!controls) return
  presetAngles = { az: controls.getAzimuthalAngle(), polar: controls.getPolarAngle() }
}

function setView(v: View) {
  view.value = v
  const p = PRESETS[v]
  moveCamera(p.pos, p.target)
  presetAngles = null
  /* remember where the preset put us once the move lands, so a drag can flip the control to Free */
  setTimeout(rememberPreset, reducedMotion ? 0 : TWEEN_MS + 20)
}

function selectBerth(id: string) {
  if (!camera || !controls) { selectedId.value = id; return }
  selectedId.value = id
  const b = BERTHS.find((x) => x.id === id)!
  const target: Vec3 = { x: b.anchor[0], y: b.anchor[1], z: b.anchor[2] - 1 }
  const off = camera.position.clone().sub(controls.target)
  const elevation = Math.atan2(off.z, Math.hypot(off.x, off.y))
  const distance = elevation > 1.2 ? 210 : elevation < 0.25 ? 95 : 140
  const o = frameOffset(off, distance, Math.max(0.08, elevation))
  moveCamera({ x: target.x + o.x, y: target.y + o.y, z: target.z + o.z }, target)
}

function closeCard() { selectedId.value = null }

watch(selectedBerth, async (b) => {
  if (!b) return
  await nextTick()
  drawWhere()
})

function onCanvasKey(e: KeyboardEvent) {
  if (!camera || !controls) return
  const map: Record<string, [number, number]> = { ArrowLeft: [0.12, 0], ArrowRight: [-0.12, 0], ArrowUp: [0, 0.08], ArrowDown: [0, -0.08] }
  const step = map[e.key]
  if (!step) return
  e.preventDefault()
  tween = null
  const off = camera.position.clone().sub(controls.target)
  const n = nudgeOrbit(off, step[0], step[1])
  camera.position.set(controls.target.x + n.x, controls.target.y + n.y, controls.target.z + n.z)
  controls.update()
  dirty = true
}

/* ---------- pins: project the anchors, dim the ones behind the cloud ---------- */
const pinEls = new Map<string, HTMLButtonElement>()
function setPinEl(id: string, el: Element | ComponentPublicInstance | null) {
  if (el instanceof HTMLButtonElement) pinEls.set(id, el)
  else pinEls.delete(id)
}
const pinNdc = new Map<string, { x: number; y: number; z: number; dist: number }>()

function projectPins() {
  if (!camera || !canvasEl.value || !T) return
  const w = canvasEl.value.clientWidth
  const h = canvasEl.value.clientHeight
  const v = new T.Vector3()
  for (const b of BERTHS) {
    const el = pinEls.get(b.id)
    if (!el) continue
    v.set(b.anchor[0], b.anchor[1], b.anchor[2])
    const dist = v.distanceTo(camera.position)
    v.project(camera)
    const inFront = v.z < 1
    const x = ((v.x + 1) / 2) * w
    const y = ((1 - v.y) / 2) * h
    const shown = inFront && x > -40 && x < w + 40 && y > -20 && y < h + 60
    pinNdc.set(b.id, { x: v.x, y: v.y, z: v.z, dist })
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
    el.style.zIndex = String(Math.round((1 - v.z) * 100000))
    el.hidden = !shown
  }
}

function sampleOcclusion() {
  if (!occlusionOk || !renderer || !scene || !camera || !depthTarget || !depthPixels || clouds.length === 0) return
  /* Anything that fails in here must not leave the renderer pointed at the
     offscreen target, or every frame after it draws where nobody can see. */
  try {
    for (const c of clouds) { setU(c.material, 'uDepthOut', 1); setU(c.material, 'uDpr', 1); setU(c.material, 'uSize', 2.6) }
    renderer.setRenderTarget(depthTarget)
    renderer.setClearColor(0x000000, 1)
    renderer.clear()
    renderer.render(scene, camera)
    renderer.readRenderTargetPixels(depthTarget, 0, 0, DEPTH_W, DEPTH_H, depthPixels)
  } catch {
    occlusionOk = false
    for (const el of pinEls.values()) el.classList.remove('is-behind')
    return
  } finally {
    renderer.setRenderTarget(null)
    renderer.setClearColor(0x000000, 0)
    const dpr = renderer.getPixelRatio()
    for (const c of clouds) { setU(c.material, 'uDepthOut', 0); setU(c.material, 'uDpr', dpr); setU(c.material, 'uSize', c.points.geometry.getAttribute('position').count > 200000 ? 2.3 : 3.4) }
  }

  /* Sample the pin's pixel, its neighbours on the same row and the row above it
     (never the row below, which is foreshortened ground closer to the camera). */
  for (const b of BERTHS) {
    const el = pinEls.get(b.id)
    const n = pinNdc.get(b.id)
    if (!el || !n || el.hidden) continue
    const px = Math.round(((n.x + 1) / 2) * DEPTH_W)
    const py = Math.round(((n.y + 1) / 2) * DEPTH_H)
    const tolerance = Math.max(8, n.dist * 0.07)
    let closer = 0
    for (let dy = 0; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const sx = Math.min(DEPTH_W - 1, Math.max(0, px + dx))
        const sy = Math.min(DEPTH_H - 1, Math.max(0, py + dy))
        const i = (sy * DEPTH_W + sx) * 4
        const d = unpackDepth(depthPixels[i]!, depthPixels[i + 1]!, MAX_DIST)
        if (d > 0 && d < n.dist - tolerance) closer++
      }
    }
    el.classList.toggle('is-behind', closer >= 4)
  }
}

/* ---------- render loop: only draws when something changed; idle is still ---------- */
function clampTarget() {
  if (!controls || !camera) return
  const lim = extent * 0.55
  const tx = Math.min(lim, Math.max(-lim, controls.target.x))
  const ty = Math.min(lim, Math.max(-lim, controls.target.y))
  const tz = Math.min(80, Math.max(-2, controls.target.z))
  const dx = tx - controls.target.x, dy = ty - controls.target.y, dz = tz - controls.target.z
  if (dx || dy || dz) { controls.target.set(tx, ty, tz); camera.position.x += dx; camera.position.y += dy; camera.position.z += dz }
}

function frame(now: number) {
  raf = running ? requestAnimationFrame(frame) : 0
  if (!renderer || !scene || !camera || !controls) return
  const tweening = stepTween(now)
  const revealing = stepReveal(now)
  const moved = controls.update()
  if (!dirty && !tweening && !revealing && !moved) return
  dirty = false
  clampTarget()
  if (moved && !tweening && presetAngles && view.value !== 'free') {
    const dAz = Math.abs(controls.getAzimuthalAngle() - presetAngles.az)
    const dPolar = Math.abs(controls.getPolarAngle() - presetAngles.polar)
    if (dAz > 0.03 || dPolar > 0.03) { view.value = 'free'; presetAngles = null }
  }
  if (now - lastOcclusion > 140) { lastOcclusion = now; sampleOcclusion() }
  renderer.render(scene, camera)
  if (!cloudChecked && phase.value === 'full' && clouds.length) {
    cloudChecked = true
    cloudFailed.value = renderer.info.render.points === 0
  }
  projectPins()
  if (moved || tweening || mapDirty) drawMap()
}

function syncRunning() {
  const should = visible && onScreen && !!renderer
  if (should && !running) { running = true; dirty = true; raf = requestAnimationFrame(frame) }
  else if (!should && running) { running = false; cancelAnimationFrame(raf); raf = 0 }
}
const onVisibility = () => { visible = !document.hidden; syncRunning() }

/* ---------- mount / unmount ---------- */
onMounted(async () => {
  const canvas = canvasEl.value!
  try {
    T = await import('three')
    const { OrbitControls } = await import('three/addons/controls/OrbitControls.js')
    renderer = new T.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    scene = new T.Scene()
    camera = new T.PerspectiveCamera(45, 1, 1, 8000)
    camera.up.set(0, 0, 1)
    controls = new OrbitControls(camera, canvas)
    controls.enableDamping = !reducedMotion
    controls.dampingFactor = 0.07
    controls.rotateSpeed = 0.55
    controls.zoomSpeed = 0.8
    controls.panSpeed = 0.7
    controls.screenSpacePanning = false
    controls.minPolarAngle = 0.02
    controls.maxPolarAngle = Math.PI / 2 - 0.012
    controls.addEventListener('start', () => { tween = null })
    depthTarget = new T.WebGLRenderTarget(DEPTH_W, DEPTH_H, { type: T.UnsignedByteType, depthBuffer: true, stencilBuffer: false })
    depthPixels = new Uint8Array(DEPTH_W * DEPTH_H * 4)

    const fit = () => {
      if (!renderer || !camera) return
      const w = canvas.clientWidth || 800, h = canvas.clientHeight || 500
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      dirty = true
    }
    fit()
    resizeObs = new ResizeObserver(() => { fit(); mapDirty = true })
    resizeObs.observe(canvas)
    canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); cloudFailed.value = true }, { passive: false })
    intersectObs = new IntersectionObserver((entries) => { onScreen = entries.some((e) => e.isIntersecting); syncRunning() }, { threshold: 0 })
    intersectObs.observe(stageEl.value!)
    document.addEventListener('visibilitychange', onVisibility)

    const m: Meta = await (await fetch(SCAN.metaUrl)).json()
    meta.value = m
    const b = m.full.bounds
    center = { x: (b.x[0] + b.x[1]) / 2, y: (b.y[0] + b.y[1]) / 2, z: m.ground_level_m_ellipsoid }
    extent = Math.max(b.x[1] - b.x[0], b.y[1] - b.y[0])
    controls.minDistance = 18
    controls.maxDistance = extent * 2.2

    /* settle in from a little further out once, then be still */
    const p = PRESETS.free
    camera.position.set(p.pos.x * 1.18, p.pos.y * 1.18, p.pos.z * 1.3)
    controls.target.copy(v3(p.target))
    controls.update()
    syncRunning()

    const base = SCAN.metaUrl.replace(/[^/]+$/, '')
    totalBytes.value = m.preview.bytes
    const preview = await fetchWithProgress(base + 'hfax-preview.bin', (got) => { gotBytes.value = got })
    addCloud(preview, m.preview, 3.4)
    setView('free')
    phase.value = 'preview'
    gotBytes.value = 0
    totalBytes.value = m.full.bytes
    const full = await fetchWithProgress(base + 'hfax.bin', (got) => { gotBytes.value = got })
    addCloud(full, m.full, 2.3)
    phase.value = 'full'
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
    phase.value = 'full'
  }
})

onBeforeUnmount(() => {
  running = false
  cancelAnimationFrame(raf)
  document.removeEventListener('visibilitychange', onVisibility)
  resizeObs?.disconnect()
  intersectObs?.disconnect()
  controls?.dispose()
  for (const c of clouds) disposeCloud(c)
  clouds = []
  depthTarget?.dispose()
  renderer?.dispose()
  renderer = null
  scene = null
  camera = null
  controls = null
  T = null
})
</script>

<style scoped>
.ots {
  --ots-ink: #ffffff;
  --ots-ink-2: rgba(255, 255, 255, 0.72);
  --ots-ink-3: rgba(255, 255, 255, 0.5);
  --ots-glass: rgba(11, 18, 32, 0.62);
  --ots-glass-2: rgba(11, 18, 32, 0.78);
  --ots-line: rgba(255, 255, 255, 0.14);
  --ots-line-2: rgba(255, 255, 255, 0.24);
  position: relative;
}

.ots-stage {
  position: relative;
  height: min(clamp(560px, calc(100vh - 230px), 860px), var(--stage-cap, 80vh));
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: radial-gradient(120% 90% at 30% 15%, #16233a 0%, #0b1220 55%, #060b14 100%);
  color: var(--ots-ink);
  box-shadow: 0 30px 80px -30px rgba(11, 18, 32, 0.6);
  isolation: isolate;
}

.ots-canvas {
  display: block;
  width: 100%;
  height: 100%;
  touch-action: none;
  cursor: grab;
  outline: none;
}
.ots-canvas:active { cursor: grabbing; }
.ots-canvas:focus-visible { box-shadow: inset 0 0 0 2px var(--maris-night); }

/* ---- pins ---- */
.ots-pins { position: absolute; inset: 0; pointer-events: none; }
.ots-pin {
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 0 22px;
  border: 0;
  background: transparent;
  color: var(--ots-ink);
  font: inherit;
  cursor: pointer;
  pointer-events: auto;
  will-change: transform;
  transition: opacity 260ms var(--ease-out);
}
.ots-pin[hidden] { display: none; }
.ots-pin.is-behind { opacity: 0.32; }
.ots-pin.is-behind.is-on { opacity: 0.85; }
.ots-pin-body {
  position: absolute;
  left: 0;
  bottom: 22px;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.6rem 0.3rem 0.65rem;
  border-radius: 999px;
  background: var(--ots-glass-2);
  border: 1px solid var(--ots-line-2);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.8125rem;
  letter-spacing: 0.02em;
  white-space: nowrap;
  transition: transform 220ms var(--ease-out), background 220ms var(--ease-out), color 220ms var(--ease-out);
}
.ots-pin:hover .ots-pin-body { transform: translateX(-50%) scale(1.06); }
.ots-pin.is-on .ots-pin-body { background: #ffffff; color: var(--navy); border-color: #ffffff; transform: translateX(-50%) scale(1.12); }
.ots-pin:focus-visible .ots-pin-body { outline: 2px solid var(--maris-night); outline-offset: 2px; }
.ots-pin-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--orbis-night); flex: none; }
.ots-pin-dot[data-state='free'] { background: var(--status-ok); }
.ots-pin-dot[data-state='assigned'] { background: var(--maris-night); }
.ots-pin-dot[data-state='courtesy'] { background: var(--status-warn); }
.ots-pin-dot[data-state='closed'] { background: var(--status-alert); }
.ots-pin-stem { position: absolute; left: -0.5px; bottom: 4px; width: 1px; height: 18px; background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.35)); }
.ots-pin-foot { position: absolute; left: -3px; bottom: 1px; width: 6px; height: 6px; border-radius: 50%; background: #ffffff; box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.22); }

/* ---- header, stats ---- */
.ots-head {
  position: absolute;
  left: clamp(1rem, 2.5vw, 2.25rem);
  top: clamp(1rem, 2.5vw, 2rem);
  max-width: 34ch;
  pointer-events: none;
  text-shadow: 0 2px 24px rgba(6, 11, 20, 0.8);
}
.ots-overline {
  margin: 0;
  font-family: var(--font-text);
  font-size: var(--type-overline);
  letter-spacing: var(--type-overline-ls);
  text-transform: uppercase;
  font-weight: 500;
  color: var(--ots-ink-2);
}
.ots-title {
  margin: 0.4rem 0 0;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2rem, 1.4rem + 2.6vw, 3.25rem);
  line-height: 1.02;
  letter-spacing: -0.02em;
  color: var(--ots-ink);
}
.ots-lede {
  margin: 0.6rem 0 0;
  font-family: var(--font-text);
  font-size: 0.9375rem;
  color: var(--ots-ink-2);
}

.ots-stats {
  position: absolute;
  right: clamp(1rem, 2.5vw, 2.25rem);
  top: clamp(1rem, 2.5vw, 2rem);
  display: grid;
  justify-items: end;
  gap: 0.25rem;
  font-family: var(--font-text);
  font-size: 0.75rem;
  color: var(--ots-ink-2);
  text-align: right;
  pointer-events: none;
}
.ots-legend { display: inline-flex; align-items: center; gap: 0.5rem; }
.ots-legend i { width: 72px; height: 6px; border-radius: 3px; border: 1px solid var(--ots-line); }

/* ---- loading ---- */
.ots-load {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  justify-items: center;
  gap: 0.5rem;
  padding: 1.25rem 1.5rem 1.1rem;
  border-radius: var(--radius-xl);
  background: var(--ots-glass);
  border: 1px solid var(--ots-line);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  text-align: center;
}
.ots-ring { width: 72px; height: 72px; transform: rotate(-90deg); }
.ots-ring--sm { width: 18px; height: 18px; }
.ots-ring-track { fill: none; stroke: rgba(255, 255, 255, 0.14); stroke-width: 5; }
.ots-ring-fill { fill: none; stroke: var(--maris-night); stroke-width: 5; stroke-linecap: round; stroke-dasharray: 194.78; transition: stroke-dashoffset 120ms linear; }
.ots-ring--sm .ots-ring-track, .ots-ring--sm .ots-ring-fill { stroke-width: 9; }
.ots-load-bytes { margin: 0; font-family: var(--font-display); font-weight: 700; font-size: 1.125rem; }
.ots-load-note { margin: 0; font-size: 0.8125rem; color: var(--ots-ink-2); }

.ots-chip {
  position: absolute;
  right: clamp(1rem, 2.5vw, 2.25rem);
  top: calc(clamp(1rem, 2.5vw, 2rem) + 4.4rem);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.7rem 0.35rem 0.5rem;
  border-radius: 999px;
  background: var(--ots-glass);
  border: 1px solid var(--ots-line);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  font-size: 0.75rem;
  color: var(--ots-ink-2);
  pointer-events: none;
}

.ots-error {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  max-width: 36ch;
  padding: 0.8rem 1rem;
  border-radius: var(--radius-lg);
  background: rgba(208, 52, 44, 0.85);
  font-size: 0.875rem;
  text-align: center;
}

/* ---- views control ---- */
.ots-views {
  position: absolute;
  left: 50%;
  bottom: clamp(1rem, 2.5vw, 1.75rem);
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 264px;
  padding: 4px;
  border-radius: 999px;
  background: var(--ots-glass-2);
  border: 1px solid var(--ots-line);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  isolation: isolate;
}
.ots-views-thumb {
  position: absolute;
  left: 4px;
  top: 4px;
  width: calc((100% - 8px) / 3);
  height: calc(100% - 8px);
  border-radius: 999px;
  background: #ffffff;
  transition: transform 260ms var(--ease-out);
  z-index: 0;
}
.ots-views button {
  position: relative;
  z-index: 1;
  min-height: 40px;
  padding: 0 0.5rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--ots-ink-2);
  font-family: var(--font-text);
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 200ms var(--ease-out);
}
.ots-views button.on { color: var(--navy); }
.ots-views button:focus-visible { outline: 2px solid var(--maris-night); outline-offset: 2px; }

/* ---- berth card ---- */
.ots-card {
  position: absolute;
  right: clamp(1rem, 2.5vw, 2.25rem);
  bottom: clamp(1rem, 2.5vw, 1.75rem);
  width: min(384px, calc(100% - 2rem));
  padding: 1.25rem 1.25rem 1rem;
  border-radius: var(--radius-xl);
  background: var(--ots-glass-2);
  border: 1px solid var(--ots-line-2);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
  backdrop-filter: blur(24px) saturate(140%);
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  color: var(--ots-ink);
  z-index: 200000;
}
.ots-card-grip { display: none; }
.ots-card-head { display: grid; grid-template-columns: 1fr auto auto; align-items: start; gap: 0.75rem; }
.ots-card-id { margin: 0; font-family: var(--font-display); font-weight: 700; font-size: 2rem; line-height: 1; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.ots-card-kind { margin: 0.35rem 0 0; font-size: 0.8125rem; color: var(--ots-ink-2); }
.ots-card-kind::first-letter { text-transform: uppercase; }
.ots-state {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.2rem;
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  border: 1px solid var(--ots-line-2);
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}
.ots-state::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: var(--orbis-night); }
.ots-state[data-state='free']::before { background: var(--status-ok); }
.ots-state[data-state='assigned']::before { background: var(--maris-night); }
.ots-state[data-state='courtesy']::before { background: var(--status-warn); }
.ots-state[data-state='closed']::before { background: var(--status-alert); }
.ots-card-close {
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: var(--ots-ink);
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  transition: background 160ms var(--ease-out);
}
.ots-card-close:hover { background: rgba(255, 255, 255, 0.2); }
.ots-card-close:focus-visible { outline: 2px solid var(--maris-night); outline-offset: 2px; }
.ots-card-overline { margin: 1.1rem 0 0; font-size: var(--type-overline); letter-spacing: var(--type-overline-ls); text-transform: uppercase; font-weight: 500; color: var(--ots-ink-3); }
.ots-brief { margin: 0.3rem 0 0; font-family: var(--font-text); font-weight: 500; font-size: 0.9375rem; line-height: 1.4; }
.ots-tiles { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.5rem; margin: 0.9rem 0 0; }
.ots-tile { padding: 0.6rem 0.65rem; border-radius: var(--radius-md); background: rgba(255, 255, 255, 0.06); border: 1px solid var(--ots-line); min-width: 0; }
.ots-tile dt { font-size: 0.6875rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ots-ink-3); }
.ots-tile dd { margin: 0.2rem 0 0; font-family: var(--font-display); font-weight: 700; font-size: 1.125rem; line-height: 1.1; }
.ots-tile .ots-tile-word { font-size: 0.9375rem; letter-spacing: -0.01em; }
.ots-tile .ots-tile-sub { margin-top: 0.15rem; font-family: var(--font-text); font-weight: 400; font-size: 0.6875rem; color: var(--ots-ink-2); line-height: 1.3; }
.ots-card-note { margin: 0.9rem 0 0; font-size: 0.8125rem; line-height: 1.45; color: var(--ots-ink); }
.ots-card-foot { margin: 0.5rem 0 0; font-size: 0.75rem; color: var(--ots-ink-3); }

.ots-card-enter-active, .ots-card-leave-active { transition: opacity 240ms var(--ease-out), transform 320ms var(--ease-out); }
.ots-card-enter-from, .ots-card-leave-to { opacity: 0; transform: translateY(14px) scale(0.98); }

/* ---- the plan: minimap on the stage ---- */
.ots-map {
  position: absolute;
  left: clamp(1rem, 2.5vw, 2.25rem);
  bottom: clamp(1rem, 2.5vw, 1.75rem);
  width: 212px;
  padding: 6px 6px 0;
  border-radius: var(--radius-lg);
  background: var(--ots-glass-2);
  border: 1px solid var(--ots-line-2);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 320ms var(--ease-out), transform 320ms var(--ease-out);
  z-index: 150000;
}
.ots-map.is-ready { opacity: 1; transform: none; }
.ots-map-canvas { display: block; width: 100%; border-radius: calc(var(--radius-lg) - 6px); cursor: crosshair; }
.ots-map-pin {
  position: absolute;
  transform: translate(-50%, -50%);
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--ots-ink);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.5625rem;
  letter-spacing: 0.02em;
  cursor: pointer;
  pointer-events: auto;
}
.ots-map-pin i { width: 7px; height: 7px; border-radius: 50%; background: var(--orbis-night); box-shadow: 0 0 0 1.5px rgba(11, 18, 32, 0.9); }
.ots-map-pin i[data-state='free'] { background: var(--status-ok); }
.ots-map-pin i[data-state='assigned'] { background: var(--maris-night); }
.ots-map-pin i[data-state='courtesy'] { background: var(--status-warn); }
.ots-map-pin i[data-state='closed'] { background: var(--status-alert); }
.ots-map-pin span { text-shadow: 0 1px 3px rgba(0, 0, 0, 0.9); }
.ots-map-pin.is-on i { box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px rgba(61, 142, 224, 0.5); }
.ots-map-pin:focus-visible { outline: 2px solid var(--maris-night); outline-offset: 2px; border-radius: 4px; }
.ots-map-label {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 0;
  padding: 0.35rem 0.25rem 0.4rem;
  font-family: var(--font-text);
  font-size: 0.6875rem;
  color: var(--ots-ink-3);
}

/* ---- the per-berth map in the card ---- */
.ots-where { margin: 0.9rem 0 0; }
.ots-where-canvas { display: block; width: 100%; aspect-ratio: 640 / 300; border-radius: var(--radius-md); border: 1px solid var(--ots-line); background: #0b1220; }
.ots-where-cap { display: flex; justify-content: space-between; gap: 0.5rem; margin: 0.4rem 0 0; font-size: 0.6875rem; color: var(--ots-ink-3); }

.ots-error--soft { background: var(--ots-glass-2); border: 1px solid var(--ots-line-2); top: auto; bottom: 6rem; }

/* ---- caption under the stage ---- */
.ots-sample {
  margin: var(--space-3) 0 0;
  font-family: var(--font-text);
  font-size: 0.8125rem;
  color: var(--text-muted);
  max-width: 90ch;
}

/* ---- phone ---- */
@media (max-width: 640px) {
  .ots-stage { height: min(720px, var(--stage-cap, 78vh)); border-radius: 0; margin-inline: -1rem; }
  .ots-head { max-width: calc(100% - 2rem); }
  .ots-title { font-size: 2rem; }
  .ots-lede { font-size: 0.875rem; }
  .ots-stats { display: none; }
  .ots-map { left: 0.75rem; bottom: 4.6rem; width: 132px; padding: 4px 4px 0; }
  .ots-map-label span:last-child { display: none; }
  .ots--sheet .ots-map { opacity: 0; pointer-events: none; }
  .ots-error--soft { bottom: auto; top: 40%; }
  .ots-chip { top: auto; bottom: 5.25rem; right: 1rem; }
  .ots-views { width: calc(100% - 2rem); max-width: 320px; bottom: 1rem; transition: opacity 200ms var(--ease-out), transform 200ms var(--ease-out); }
  .ots--sheet .ots-views { opacity: 0; pointer-events: none; transform: translate(-50%, 8px); }
  .ots-card {
    left: 0;
    right: 0;
    bottom: 0;
    width: auto;
    max-height: 72%;
    overflow: auto;
    padding: 0.75rem 1rem calc(1rem + env(safe-area-inset-bottom, 0px));
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    border-width: 1px 0 0;
  }
  .ots-card-grip { display: block; width: 40px; height: 4px; margin: 0 auto 0.9rem; border-radius: 2px; background: rgba(255, 255, 255, 0.3); }
  .ots-card-id { font-size: 1.75rem; }
  .ots-tiles { grid-template-columns: repeat(3, 1fr); gap: 0.4rem; }
  .ots-tile { padding: 0.5rem 0.55rem; }
  .ots-tile dd { font-size: 1rem; }
  .ots-card-enter-from, .ots-card-leave-to { opacity: 1; transform: translateY(100%); }
  .ots-sample { margin-top: var(--space-4); }
}

@media (prefers-reduced-motion: reduce) {
  .ots-pin, .ots-pin-body, .ots-views-thumb, .ots-views button, .ots-card-close, .ots-ring-fill { transition: none; }
  .ots-card-enter-active, .ots-card-leave-active { transition: none; }
}
</style>
