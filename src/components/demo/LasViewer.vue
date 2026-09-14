<template>
  <div class="lv" :class="{ 'lv--loading': loading }">
    <canvas ref="canvasEl" class="lv-canvas" aria-label="Interactive LiDAR point cloud" />

    <div v-if="loading" class="lv-progress" role="progressbar" :aria-valuenow="Math.round(progress * 100)" aria-valuemin="0" aria-valuemax="100">
      <div class="lv-progress-bar" :style="{ width: progress * 100 + '%' }" />
      <span>{{ t('demo.viewer.loading') }} · {{ Math.round(progress * 100) }}%</span>
    </div>
    <div v-if="error" class="lv-error" role="alert">{{ error }}</div>

    <!-- Controls -->
    <div class="lv-panel" :class="{ 'lv-panel--open': panelOpen }">
      <button type="button" class="lv-panel-toggle" @click="panelOpen = !panelOpen" :aria-expanded="panelOpen">
        {{ t('demo.viewer.controls') }}
      </button>
      <div class="lv-panel-body">
        <fieldset class="lv-group">
          <legend>{{ t('demo.viewer.colour') }}</legend>
          <div class="lv-seg" role="radiogroup">
            <button v-for="m in modes" :key="m" type="button" role="radio" :aria-checked="mode === m" :class="{ on: mode === m }" @click="mode = m">
              {{ t('demo.viewer.mode.' + m) }}
            </button>
          </div>
        </fieldset>

        <fieldset class="lv-group">
          <legend>{{ t('demo.viewer.bands') }}</legend>
          <label v-for="(on, i) in bands" :key="i" class="lv-check">
            <input type="checkbox" :checked="on" @change="toggleBand(i)" />
            <span class="lv-swatch" :style="{ background: bandCss[i] }" />
            <span class="lv-check-label">{{ t('demo.viewer.band.' + i) }}</span>
            <span class="lv-count">{{ fmt(bandCounts[i] ?? 0) }}</span>
          </label>
        </fieldset>

        <fieldset class="lv-group">
          <legend>{{ t('demo.viewer.slice') }} · {{ hagMin.toFixed(1) }}–{{ hagMax.toFixed(1) }} m</legend>
          <label class="lv-range"><span>min</span><input type="range" min="0" max="25" step="0.5" v-model.number="hagMin" @input="clampSlice('min')" /></label>
          <label class="lv-range"><span>max</span><input type="range" min="0" max="25" step="0.5" v-model.number="hagMax" @input="clampSlice('max')" /></label>
        </fieldset>

        <fieldset class="lv-group">
          <legend>{{ t('demo.viewer.size') }}</legend>
          <label class="lv-range"><input type="range" min="1" max="6" step="0.5" v-model.number="pointSize" /></label>
        </fieldset>

        <fieldset class="lv-group">
          <legend>{{ t('demo.viewer.view') }}</legend>
          <div class="lv-seg">
            <button v-for="v in views" :key="v" type="button" @click="setView(v)">{{ t('demo.viewer.view.' + v) }}</button>
          </div>
          <label class="lv-check lv-check--inline">
            <input type="checkbox" v-model="autoRotate" />
            <span class="lv-check-label">{{ t('demo.viewer.rotate') }}</span>
          </label>
        </fieldset>
      </div>
    </div>

    <!-- Legend -->
    <div class="lv-legend" aria-live="polite">
      <template v-if="mode === 'rgb'"><span>{{ t('demo.viewer.legend.rgb') }}</span></template>
      <template v-else-if="mode === 'height'">
        <span class="lv-ramp" />
        <span>{{ t('demo.viewer.legend.height') }}</span>
      </template>
      <template v-else-if="mode === 'intensity'">
        <span class="lv-ramp lv-ramp--grey" />
        <span>{{ t('demo.viewer.legend.intensity') }}</span>
      </template>
      <template v-else-if="mode === 'band'">
        <span v-for="(c, i) in bandCss" :key="i" class="lv-legend-item" :class="{ off: !bands[i] }"><i :style="{ background: c }" />{{ t('demo.viewer.band.' + i) }}</span>
      </template>
      <template v-else>
        <span class="lv-legend-item"><i style="background:#4A8FBF" />{{ t('demo.viewer.returns.1') }}</span>
        <span class="lv-legend-item"><i style="background:#3AA76D" />{{ t('demo.viewer.returns.2') }}</span>
        <span class="lv-legend-item"><i style="background:#F5A623" />{{ t('demo.viewer.returns.3') }}</span>
      </template>
    </div>

    <div class="lv-stats">
      <span>{{ fmt(loadedCount) }} {{ t('demo.viewer.points') }}</span>
      <span v-if="meta"> · {{ fmt(meta.source_points) }} {{ t('demo.viewer.inSource') }}</span>
      <span v-if="meta"> · {{ meta.extent_m[0]?.toFixed(0) }} × {{ meta.extent_m[1]?.toFixed(0) }} m</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { useI18n } from '@/composables/useI18n'

/**
 * Renders a decimated LAS point cloud produced by scripts/decimate-las.py.
 * The binary is struct-of-arrays: u16 quantised XYZ, u8 RGB, u8 intensity,
 * u8 height-above-ground (dm), u8 structure band, u8 return count.
 * Positions are dequantised on the GPU so the CPU never holds Float32 copies.
 */
const props = defineProps<{ metaUrl: string }>()
const { t } = useI18n()

type Mode = 'rgb' | 'height' | 'intensity' | 'band' | 'returns'
type View = 'oblique' | 'top' | 'dock' | 'reset'
interface Layout { pos_u16x3: number; rgb_u8x3: number; intensity_u8: number; hag_dm_u8: number; band_u8: number; nreturns_u8: number }
type Pair = [number, number]
interface Part { count: number; bytes: number; layout: Layout; bounds: { x: Pair; y: Pair; z: Pair } }
interface Meta { source_points: number; extent_m: number[]; band_counts: number[]; full: Part; preview: Part; ground_level_m_ellipsoid: number }

const modes: Mode[] = ['rgb', 'height', 'band', 'intensity', 'returns']
const views: View[] = ['oblique', 'top', 'dock', 'reset']
const bandCss = ['#5A7A99', '#F5A623', '#4A8FBF', '#3AA76D', '#E6EDF5']
const MODE_INDEX: Record<Mode, number> = { rgb: 0, height: 1, intensity: 2, band: 3, returns: 4 }

const canvasEl = ref<HTMLCanvasElement | null>(null)
const loading = ref(true)
const progress = ref(0)
const error = ref('')
const panelOpen = ref(true)
const mode = ref<Mode>('rgb')
const bands = ref([true, true, true, true, true])
const bandCounts = ref([0, 0, 0, 0, 0])
const hagMin = ref(0)
const hagMax = ref(25)
const pointSize = ref(2.5)
const autoRotate = ref(false)
const loadedCount = ref(0)
const meta = ref<Meta | null>(null)

const fmt = (n: number) => new Intl.NumberFormat().format(n)
const toggleBand = (i: number) => { bands.value = bands.value.map((b, j) => (j === i ? !b : b)) }
const clampSlice = (which: 'min' | 'max') => {
  if (which === 'min' && hagMin.value > hagMax.value) hagMax.value = hagMin.value
  if (which === 'max' && hagMax.value < hagMin.value) hagMin.value = hagMax.value
}

let renderer: THREE.WebGLRenderer | null = null
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let controls: OrbitControls | null = null
let points: THREE.Points | null = null
let material: THREE.ShaderMaterial | null = null
let raf = 0
let resizeObs: ResizeObserver | null = null
let extent = 800
let center = new THREE.Vector3()
const reducedMotion = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

const vertexShader = /* glsl */ `
  attribute vec3 rgb;
  attribute float intensity;
  attribute float hag;
  attribute float band;
  attribute float nret;
  uniform vec3 uMin; uniform vec3 uRange; uniform vec3 uCenter;
  uniform float uSize; uniform int uMode; uniform vec2 uHag; uniform float uHagMax;
  uniform float uMask[5]; uniform vec3 uBandColor[5];
  varying vec3 vColor; varying float vKeep;
  vec3 ramp(float t) {
    vec3 a = vec3(0.06, 0.16, 0.27), b = vec3(0.29, 0.56, 0.75), c = vec3(0.96, 0.65, 0.14), d = vec3(1.0);
    return t < 0.5 ? mix(a, b, t * 2.0) : (t < 0.8 ? mix(b, c, (t - 0.5) / 0.3) : mix(c, d, (t - 0.8) / 0.2));
  }
  void main() {
    vec3 p = uMin + position * uRange - uCenter;
    float h = hag * 0.1;
    int bi = int(band + 0.5);
    float keep = 1.0;
    for (int i = 0; i < 5; i++) { if (i == bi) keep = uMask[i]; }
    if (h < uHag.x || h > uHag.y) keep = 0.0;
    vKeep = keep;
    if (uMode == 0) vColor = rgb;
    else if (uMode == 1) vColor = ramp(clamp(h / uHagMax, 0.0, 1.0));
    else if (uMode == 2) vColor = vec3(pow(intensity, 0.8));
    else if (uMode == 3) { vColor = vec3(0.0); for (int i = 0; i < 5; i++) { if (i == bi) vColor = uBandColor[i]; } }
    else vColor = nret <= 1.0 ? vec3(0.29, 0.56, 0.75) : (nret <= 2.0 ? vec3(0.23, 0.65, 0.43) : vec3(0.96, 0.65, 0.14));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = clamp(uSize * (240.0 / -mv.z), 1.0, 14.0);
    gl_Position = projectionMatrix * mv;
  }`
const fragmentShader = /* glsl */ `
  precision mediump float;
  varying vec3 vColor; varying float vKeep;
  void main() {
    if (vKeep < 0.5) discard;
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    gl_FragColor = vec4(vColor, 1.0);
  }`

async function fetchWithProgress(url: string, onProgress: (f: number) => void): Promise<ArrayBuffer> {
  const res = await fetch(url)
  if (!res.ok || !res.body) throw new Error(`${res.status} ${url}`)
  const total = Number(res.headers.get('content-length') || 0)
  const reader = res.body.getReader()
  const chunks: Uint8Array[] = []
  let got = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
    got += value.length
    if (total) onProgress(got / total)
  }
  const out = new Uint8Array(got)
  let o = 0
  for (const c of chunks) { out.set(c, o); o += c.length }
  return out.buffer
}

function buildGeometry(buf: ArrayBuffer, part: Part): THREE.BufferGeometry {
  const n = part.count
  const L = part.layout
  let o = 0
  const take = (bytes: number) => { const s = o; o += bytes; return s }
  const pos = new Uint16Array(buf, take(L.pos_u16x3), n * 3)
  const rgb = new Uint8Array(buf, take(L.rgb_u8x3), n * 3)
  const inten = new Uint8Array(buf, take(L.intensity_u8), n)
  const hag = new Uint8Array(buf, take(L.hag_dm_u8), n)
  const band = new Uint8Array(buf, take(L.band_u8), n)
  const nret = new Uint8Array(buf, take(L.nreturns_u8), n)
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3, true))
  g.setAttribute('rgb', new THREE.BufferAttribute(rgb, 3, true))
  g.setAttribute('intensity', new THREE.BufferAttribute(inten, 1, true))
  g.setAttribute('hag', new THREE.BufferAttribute(hag, 1, false))
  g.setAttribute('band', new THREE.BufferAttribute(band, 1, false))
  g.setAttribute('nret', new THREE.BufferAttribute(nret, 1, false))
  const b = part.bounds
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), Math.hypot(b.x[1] - b.x[0], b.y[1] - b.y[0], b.z[1] - b.z[0]))
  return g
}

function makeMaterial(part: Part): THREE.ShaderMaterial {
  const b = part.bounds
  return new THREE.ShaderMaterial({
    vertexShader, fragmentShader, depthWrite: true, transparent: false,
    uniforms: {
      uMin: { value: new THREE.Vector3(b.x[0], b.y[0], b.z[0]) },
      uRange: { value: new THREE.Vector3(b.x[1] - b.x[0], b.y[1] - b.y[0], b.z[1] - b.z[0]) },
      uCenter: { value: center.clone() },
      uSize: { value: pointSize.value }, uMode: { value: MODE_INDEX[mode.value] },
      uHag: { value: new THREE.Vector2(hagMin.value, hagMax.value) }, uHagMax: { value: 20 },
      uMask: { value: bands.value.map((v) => (v ? 1 : 0)) },
      uBandColor: { value: bandCss.map((c) => new THREE.Color(c)) },
    },
  })
}

function syncUniforms() {
  if (!material) return
  const u = material.uniforms
  if (u.uSize) u.uSize.value = pointSize.value
  if (u.uMode) u.uMode.value = MODE_INDEX[mode.value]
  if (u.uHag) u.uHag.value.set(hagMin.value, hagMax.value)
  if (u.uMask) u.uMask.value = bands.value.map((v) => (v ? 1 : 0))
}
watch([mode, pointSize, hagMin, hagMax, bands], syncUniforms, { deep: true })
watch(autoRotate, (v) => { if (controls) controls.autoRotate = v && !reducedMotion })

function setView(v: View) {
  if (!camera || !controls) return
  const e = extent
  const target = new THREE.Vector3(0, 0, 0)
  const presets: Record<View, [number, number, number]> = { oblique: [e * 0.55, -e * 0.85, e * 0.6], top: [0, -e * 0.001, e * 1.5], dock: [e * 0.7, -e * 0.7, e * 0.035], reset: [e * 0.55, -e * 0.85, e * 0.6] }
  camera.position.set(...presets[v])
  controls.target.copy(target)
  controls.update()
}

/** Called by the marina page's aspect tabs. */
function applyAspect(a: { mode?: Mode; bands?: boolean[]; hag?: [number, number]; view?: View; size?: number }) {
  if (a.mode) mode.value = a.mode
  if (a.bands) bands.value = [...a.bands]
  if (a.hag) { hagMin.value = a.hag[0]; hagMax.value = a.hag[1] }
  if (a.size) pointSize.value = a.size
  if (a.view) setView(a.view)
}
defineExpose({ applyAspect, setView })

function swapPoints(g: THREE.BufferGeometry, part: Part) {
  if (!scene) return
  if (points) { scene.remove(points); points.geometry.dispose() }
  material = makeMaterial(part)
  syncUniforms()
  points = new THREE.Points(g, material)
  points.frustumCulled = false
  scene.add(points)
  loadedCount.value = part.count
}

function animate() {
  raf = requestAnimationFrame(animate)
  if (document.hidden || !renderer || !scene || !camera || !controls) return
  controls.update()
  renderer.render(scene, camera)
}

onMounted(async () => {
  const canvas = canvasEl.value!
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(50, 1, 0.5, 20000)
    camera.up.set(0, 0, 1)
    controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.maxPolarAngle = Math.PI / 2 - 0.02
    controls.autoRotateSpeed = 0.6
    const fit = () => {
      if (!renderer || !camera) return
      const w = canvas.clientWidth || 800, h = canvas.clientHeight || 500
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    fit()
    resizeObs = new ResizeObserver(fit)
    resizeObs.observe(canvas)

    const m: Meta = await (await fetch(props.metaUrl)).json()
    meta.value = m
    bandCounts.value = m.band_counts
    const b = m.full.bounds
    center = new THREE.Vector3((b.x[0] + b.x[1]) / 2, (b.y[0] + b.y[1]) / 2, m.ground_level_m_ellipsoid)
    extent = Math.max(b.x[1] - b.x[0], b.y[1] - b.y[0])
    controls.minDistance = extent * 0.02
    controls.maxDistance = extent * 3
    setView('oblique')
    animate()

    const base = props.metaUrl.replace(/[^/]+$/, '')
    const preview = await fetchWithProgress(base + 'hfax-preview.bin', (f) => { progress.value = f * 0.12 })
    swapPoints(buildGeometry(preview, m.preview), m.preview)
    const full = await fetchWithProgress(base + 'hfax.bin', (f) => { progress.value = 0.12 + f * 0.88 })
    swapPoints(buildGeometry(full, m.full), m.full)
    loading.value = false
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
    loading.value = false
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  resizeObs?.disconnect()
  controls?.dispose()
  points?.geometry.dispose()
  material?.dispose()
  renderer?.dispose()
})
</script>

<style scoped>
.lv { position: relative; width: 100%; height: clamp(420px, 70vh, 820px); border-radius: 1.25rem; overflow: hidden; border: 1px solid var(--border-medium); background: radial-gradient(circle at 30% 20%, #10305a 0%, #071527 55%, #030a16 100%); }
.lv-canvas { display: block; width: 100%; height: 100%; touch-action: none; cursor: grab; }
.lv-canvas:active { cursor: grabbing; }

.lv-progress { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: min(320px, 80%); padding: 0.9rem 1rem 0.8rem; border-radius: 0.9rem; background: rgba(3, 10, 22, 0.8); border: 1px solid var(--border-medium); color: #fff; font-size: 0.85rem; text-align: center; backdrop-filter: blur(8px); }
.lv-progress-bar { height: 4px; margin-bottom: 0.6rem; border-radius: 2px; background: #4A8FBF; transition: width 0.15s; }
.lv-error { position: absolute; inset: auto 1rem 1rem 1rem; padding: 0.75rem 1rem; border-radius: 0.75rem; background: rgba(214, 69, 69, 0.85); color: #fff; font-size: 0.85rem; }

.lv-panel { position: absolute; top: 1rem; left: 1rem; width: min(300px, calc(100% - 2rem)); border-radius: 1rem; background: rgba(3, 10, 22, 0.78); border: 1px solid var(--border-medium); color: #fff; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
.lv-panel-toggle { width: 100%; padding: 0.7rem 1rem; border: 0; background: transparent; color: #fff; font: inherit; font-weight: 700; font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; text-align: left; cursor: pointer; }
.lv-panel-toggle::after { content: '▾'; float: right; transition: transform 0.2s; }
.lv-panel:not(.lv-panel--open) .lv-panel-toggle::after { transform: rotate(-90deg); }
.lv-panel-body { display: grid; gap: 0.9rem; padding: 0 1rem 1rem; max-height: min(60vh, 560px); overflow: auto; }
.lv-panel:not(.lv-panel--open) .lv-panel-body { display: none; }
.lv-group { margin: 0; padding: 0; border: 0; min-width: 0; }
.lv-group legend { padding: 0; margin-bottom: 0.45rem; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #9fb7d0; }
.lv-seg { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.lv-seg button { padding: 0.35rem 0.6rem; border-radius: 999px; border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.05); color: #fff; font: inherit; font-size: 0.78rem; cursor: pointer; }
.lv-seg button.on { background: #1F4E79; border-color: #4A8FBF; }
.lv-seg button:hover { border-color: #4A8FBF; }
.lv-check { display: grid; grid-template-columns: auto auto 1fr auto; gap: 0.5rem; align-items: center; padding: 0.2rem 0; font-size: 0.82rem; cursor: pointer; }
.lv-check--inline { grid-template-columns: auto 1fr; margin-top: 0.5rem; }
.lv-check input { accent-color: #4A8FBF; margin: 0; }
.lv-swatch { width: 12px; height: 12px; border-radius: 3px; display: inline-block; }
.lv-count { font-variant-numeric: tabular-nums; color: #9fb7d0; font-size: 0.74rem; }
.lv-range { display: grid; grid-template-columns: auto 1fr; gap: 0.5rem; align-items: center; font-size: 0.74rem; color: #9fb7d0; }
.lv-range input { width: 100%; accent-color: #4A8FBF; margin: 0; }

.lv-legend { position: absolute; left: 1rem; bottom: 2.6rem; display: flex; flex-wrap: wrap; gap: 0.4rem 0.9rem; align-items: center; max-width: calc(100% - 2rem); padding: 0.5rem 0.8rem; border-radius: 0.75rem; background: rgba(3, 10, 22, 0.72); border: 1px solid var(--border-subtle); color: #dfe8f2; font-size: 0.76rem; }
.lv-legend-item { display: inline-flex; align-items: center; gap: 0.4rem; }
.lv-legend-item.off { opacity: 0.4; text-decoration: line-through; }
.lv-legend-item i { width: 10px; height: 10px; border-radius: 3px; }
.lv-ramp { width: 120px; height: 8px; border-radius: 4px; background: linear-gradient(90deg, #0f2a44, #4A8FBF 50%, #F5A623 80%, #fff); }
.lv-ramp--grey { background: linear-gradient(90deg, #111, #fff); }
.lv-stats { position: absolute; left: 1rem; bottom: 0.75rem; color: #9fb7d0; font-size: 0.72rem; font-variant-numeric: tabular-nums; }

@media (max-width: 640px) {
  .lv { height: 70vh; }
  .lv-panel { width: calc(100% - 2rem); }
  .lv-panel-body { max-height: 40vh; }
  .lv-legend { bottom: 2.4rem; }
}
</style>
