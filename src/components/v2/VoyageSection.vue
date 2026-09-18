<template>
  <section ref="sectionRef" class="voyage chapter" data-chapter="slate" :style="{ '--voyage-scroll': `${scrollHeight}vh` }">
    <div class="voyage-sticky">
      <div class="container-wide voyage-head">
        <span class="t-overline">{{ t('v2.voyage.overline') }}</span>
        <h2 class="t-display voyage-title">{{ t('v2.voyage.title') }}</h2>
        <p class="t-lede voyage-lede">{{ t('v2.voyage.lede') }}</p>
      </div>

      <div class="container-wide voyage-stage">
        <figure class="voyage-map panel">
          <canvas ref="canvasRef" class="voyage-canvas" role="img" :aria-label="mapLabel" />

          <figcaption class="voyage-hud" :data-stage="stage.key">
            <p class="voyage-hud-stage t-overline">{{ t(`v2.voyage.stage.${stage.key}.label`) }}</p>
            <dl class="voyage-hud-grid">
              <div>
                <dt class="t-caption">SOG</dt>
                <dd class="t-telemetry">{{ current.speed.toFixed(1) }} <small>kn</small></dd>
              </div>
              <div>
                <dt class="t-caption">HDG</dt>
                <dd class="t-telemetry">{{ pad(current.heading) }}<small>°</small></dd>
              </div>
              <div>
                <dt class="t-caption">DEPTH</dt>
                <dd class="t-telemetry">{{ current.depth.toFixed(1) }} <small>ft</small></dd>
              </div>
              <div>
                <dt class="t-caption">ETA</dt>
                <dd class="t-telemetry">{{ current.etaMin }} <small>min</small></dd>
              </div>
            </dl>
          </figcaption>

          <Transition name="voyage-card">
            <aside v-if="stage.key === 'approach'" class="voyage-card panel">
              <p class="t-caption">{{ data.bridge.name }}</p>
              <p class="t-telemetry voyage-card-value">{{ data.bridge.clearance.toFixed(1) }} m</p>
              <p class="t-caption">
                {{ data.bridge.datum }} · {{ data.bridge.state }} · air draft {{ data.vessel.airDraft }} m
              </p>
            </aside>
          </Transition>

          <Transition name="voyage-card">
            <aside v-if="stage.key === 'berth'" class="voyage-card panel">
              <p class="t-caption">{{ data.to }}</p>
              <p class="t-telemetry voyage-card-value">{{ data.berth.id }}</p>
              <p class="t-caption">
                {{ data.berth.entry }}° {{ data.berth.mode }} · {{ data.berth.tie }} ·
                {{ data.berth.depth.toFixed(1) }} m {{ data.berth.datum }}
              </p>
            </aside>
          </Transition>
        </figure>

        <div class="voyage-notes">
          <ol class="voyage-steps">
            <li
              v-for="(s, index) in data.stages"
              :key="s.key"
              class="voyage-step"
              :class="{ active: s.key === stage.key, done: progress > s.to }"
            >
              <button type="button" class="voyage-step-button" @click="goToStage(index)">
                <span class="voyage-step-index t-num">{{ pad2(index + 1) }}</span>
                <span class="voyage-step-text">
                  <strong>{{ t(`v2.voyage.stage.${s.key}.label`) }}</strong>
                  <span class="t-caption">{{ t(`v2.voyage.stage.${s.key}.note`) }}</span>
                </span>
              </button>
            </li>
          </ol>

          <div class="voyage-controls">
            <button type="button" class="voyage-control voyage-control--prev" :disabled="stageIndex === 0" @click="goToStage(stageIndex - 1)">
              {{ t('v2.voyage.prev') }}
            </button>
            <div
              class="voyage-track"
              role="progressbar"
              :aria-label="t('v2.voyage.progress')"
              :aria-valuenow="Math.round(progress * 100)"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <span class="voyage-track-fill" :style="{ width: `${progress * 100}%` }" />
            </div>
            <button
              type="button"
              class="voyage-control voyage-control--next"
              :disabled="stageIndex === data.stages.length - 1"
              @click="goToStage(stageIndex + 1)"
            >
              {{ t('v2.voyage.next') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useScrollProgress } from '@/composables/useScrollProgress'
import { useI18n } from '@/composables/useI18n'
import voyage from '@/data/voyage'
import type { VoyagePoint } from '@/data/voyage'

const { t } = useI18n()
const data = voyage

const sectionRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const { progress: scrollProgress } = useScrollProgress(sectionRef)

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

/* With reduced motion the passage is shown complete rather than scrubbed, and
   the pinned scroll distance collapses so nothing has to be scrolled through. */
const scrollHeight = reducedMotion.matches ? 100 : 320
const manual = ref<number | null>(null)
const pinned = ref(false)

const progress = computed(() => {
  if (manual.value !== null) return manual.value
  if (reducedMotion.matches) return 1
  /* Unpinned (narrow viewports) the passage waits at the planning stage until
     the reader steps it themselves. */
  return pinned.value ? scrollProgress.value : 0.1
})

const stageIndex = computed(() => {
  const p = progress.value
  const found = data.stages.findIndex((s) => p >= s.from && p <= s.to)
  return found === -1 ? data.stages.length - 1 : found
})

const stage = computed(() => data.stages[stageIndex.value] ?? data.stages[0]!)

const current = computed<VoyagePoint>(() => {
  const p = progress.value
  const route = data.route
  let i = route.findIndex((pt) => pt.f >= p)
  if (i <= 0) i = 1
  const a = route[i - 1]!
  const b = route[i]!
  const span = b.f - a.f || 1
  const k = Math.min(1, Math.max(0, (p - a.f) / span))
  return {
    u: a.u + (b.u - a.u) * k,
    v: a.v + (b.v - a.v) * k,
    f: p,
    speed: a.speed + (b.speed - a.speed) * k,
    heading: b.heading,
    depth: a.depth + (b.depth - a.depth) * k,
    voltage: a.voltage,
    bilge: a.bilge,
    etaMin: Math.round(a.etaMin + (b.etaMin - a.etaMin) * k),
    runNm: a.runNm + (b.runNm - a.runNm) * k,
  }
})

const mapLabel = computed(
  () =>
    `${data.from} to ${data.to}: ${data.distanceNm} nautical miles, ${data.durationMin} minutes, arriving ${data.arrival}.`,
)

const pad = (n: number) => String(Math.round(n)).padStart(3, '0')
const pad2 = (n: number) => String(n).padStart(2, '0')

/* Below the pinning breakpoint the section is a normal block, so the stage
   buttons step the story directly instead of scrolling to a position. */
const isPinned = () => {
  const el = sectionRef.value
  const result = !!el && !reducedMotion.matches && el.scrollHeight - window.innerHeight > 0
  pinned.value = result
  return result
}

const goToStage = (index: number) => {
  const target = data.stages[Math.min(Math.max(index, 0), data.stages.length - 1)]
  if (!target) return
  const mid = (target.from + target.to) / 2

  if (!isPinned()) {
    manual.value = mid
    return
  }

  const el = sectionRef.value!
  const scrollable = el.scrollHeight - window.innerHeight
  window.scrollTo({
    top: window.scrollY + el.getBoundingClientRect().top + scrollable * mid,
    behavior: 'smooth',
  })
}

/* While pinned, the user's own scroll releases the button-driven override. */
watch(scrollProgress, () => {
  if (isPinned()) manual.value = null
})

// --- canvas -------------------------------------------------------------

const basemap = new Image()
let ctx: CanvasRenderingContext2D | null = null
let mapReady = false
let raf = 0

const ROUTE_COLOR = '#C4157F'

/* The passage's extent on the basemap, with a margin, so the map can frame
   itself to the route at any canvas aspect. */
const ROUTE_BOX = (() => {
  const us = data.route.map((p) => p.u)
  const vs = data.route.map((p) => p.v)
  const pad = 0.06
  const minU = Math.max(0, Math.min(...us) - pad)
  const maxU = Math.min(1, Math.max(...us) + pad)
  const minV = Math.max(0, Math.min(...vs) - pad)
  const maxV = Math.min(1, Math.max(...vs) + pad)
  return {
    width: maxU - minU,
    height: maxV - minV,
    cx: (minU + maxU) / 2,
    cy: (minV + maxV) / 2,
  }
})()
const VESSEL_COLOR = '#FFFFFF'

const draw = () => {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return

  const dpr = Math.min(window.devicePixelRatio, 2)
  const w = canvas.clientWidth
  const h = canvas.clientHeight
  if (w === 0 || h === 0) return

  if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
    canvas.width = w * dpr
    canvas.height = h * dpr
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, w, h)

  /* Frame the basemap to the passage: fill the canvas where that still keeps
     the whole route in view, and back off to fit the route when it would not. */
  const cover = Math.max(w / data.basemap.width, h / data.basemap.height)
  const fit = Math.min(
    w / (ROUTE_BOX.width * data.basemap.width),
    h / (ROUTE_BOX.height * data.basemap.height),
  )
  const scale = Math.min(cover, fit)
  const dw = data.basemap.width * scale
  const dh = data.basemap.height * scale

  const clamp = (value: number, min: number, max: number) =>
    min > max ? (min + max) / 2 : Math.min(Math.max(value, min), max)

  const ox = clamp(w / 2 - (ROUTE_BOX.cx * dw), w - dw, 0)
  const oy = clamp(h / 2 - (ROUTE_BOX.cy * dh), h - dh, 0)
  const px = (u: number) => ox + u * dw
  const py = (v: number) => oy + v * dh

  ctx.fillStyle = '#242c38'
  ctx.fillRect(0, 0, w, h)
  if (mapReady) ctx.drawImage(basemap, ox, oy, dw, dh)

  ctx.fillStyle = 'rgba(36, 44, 56, 0.3)'
  ctx.fillRect(0, 0, w, h)

  const p = progress.value
  /* The line draws in over the planning stage, then stays. */
  const drawn = Math.min(1, p / 0.2)

  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'

  const routeTo = (limit: number) => {
    ctx!.beginPath()
    let started = false
    for (const pt of data.route) {
      if (pt.f > limit) break
      const x = px(pt.u)
      const y = py(pt.v)
      if (!started) {
        ctx!.moveTo(x, y)
        started = true
      } else {
        ctx!.lineTo(x, y)
      }
    }
    const c = current.value
    if (limit >= p) ctx!.lineTo(px(c.u), py(c.v))
  }

  /* planned track, magenta — the paper-chart rule: one hue, one owner */
  ctx.strokeStyle = 'rgba(196, 21, 127, 0.38)'
  ctx.lineWidth = 6
  routeTo(drawn)
  ctx.stroke()

  /* run so far, solid */
  ctx.strokeStyle = ROUTE_COLOR
  ctx.lineWidth = 4
  routeTo(Math.min(p, drawn))
  ctx.stroke()

  /* bridge gate */
  if (drawn > 0.4) {
    const bridgePoint = data.route.find((pt) => pt.f >= data.bridge.f) ?? data.route[0]!
    const bx = px(bridgePoint.u)
    const by = py(bridgePoint.v)
    ctx.strokeStyle = p >= data.bridge.f ? '#2E9B4E' : '#E0A100'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(bx - 26, by - 8)
    ctx.lineTo(bx + 26, by + 8)
    ctx.stroke()
  }

  /* destination */
  const last = data.route[data.route.length - 1]!
  ctx.strokeStyle = 'rgba(255,255,255,0.9)'
  ctx.lineWidth = 2.5
  ctx.beginPath()
  ctx.arc(px(last.u), py(last.v), 11, 0, Math.PI * 2)
  ctx.stroke()

  /* own vessel */
  const c = current.value
  const vx = px(c.u)
  const vy = py(c.v)
  ctx.save()
  ctx.translate(vx, vy)
  ctx.rotate((c.heading * Math.PI) / 180)
  ctx.fillStyle = VESSEL_COLOR
  ctx.beginPath()
  ctx.moveTo(0, -11)
  ctx.lineTo(7, 9)
  ctx.lineTo(0, 5)
  ctx.lineTo(-7, 9)
  ctx.closePath()
  ctx.fill()
  ctx.restore()

  ctx.strokeStyle = 'rgba(61, 142, 224, 0.6)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(vx, vy, 19, 0, Math.PI * 2)
  ctx.stroke()
}

const schedule = () => {
  isPinned()
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(draw)
}

watch(progress, schedule)

onMounted(() => {
  ctx = canvasRef.value?.getContext('2d') ?? null
  basemap.onload = () => {
    mapReady = true
    schedule()
  }
  basemap.src = `${import.meta.env.BASE_URL}assets/voyage-basemap.webp`
  window.addEventListener('resize', schedule)
  schedule()
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', schedule)
})
</script>

<style scoped>
.voyage {
  height: var(--voyage-scroll);
  padding: 0;
}

.voyage-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: clamp(5.5rem, 4.5rem + 3vw, 7rem) 0 var(--space-8);
}

.voyage-head {
  width: 100%;
  max-width: 1440px;
}

.voyage-title {
  margin-top: var(--space-3);
}

.voyage-lede {
  margin-top: var(--space-4);
  max-width: 54ch;
}

.voyage-stage {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 1rem + 2vw, 3rem);
  align-items: stretch;
}

.voyage-map {
  position: relative;
  margin: 0;
  overflow: hidden;
  min-height: 0;
  height: 100%;
}

.voyage-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.voyage-hud {
  position: absolute;
  left: var(--space-4);
  bottom: var(--space-4);
  max-width: min(30rem, calc(100% - var(--space-8)));
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  background: var(--slate);
  border: 1px solid rgba(255, 255, 255, 0.16);
}

.voyage-hud-stage {
  margin: 0 0 var(--space-2);
  color: var(--domain-ink);
}

.voyage-hud-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-4);
  margin: 0;
}

.voyage-hud-grid dt {
  color: #8e99af;
}

.voyage-hud-grid dd {
  margin: 0.125rem 0 0;
  color: #ffffff;
}

.voyage-hud-grid small {
  font-size: 0.6em;
  color: #b7bfcf;
}

.voyage-card {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  max-width: 17rem;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
}

.voyage-card p {
  margin: 0;
}

.voyage-card-value {
  margin: 0.25rem 0 !important;
  color: var(--text-primary);
}

.voyage-card-enter-active,
.voyage-card-leave-active {
  transition: opacity 260ms var(--ease-out), transform 260ms var(--ease-out);
}

.voyage-card-enter-from,
.voyage-card-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.voyage-notes {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-6);
}

.voyage-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.voyage-step-button {
  display: flex;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-3);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 200ms var(--ease-out), border-color 200ms var(--ease-out);
}

.voyage-step-button:hover {
  background: var(--surface-soft);
}

.voyage-step.active .voyage-step-button {
  background: var(--surface-strong);
  border-color: var(--panel-border);
}

.voyage-step-index {
  color: var(--text-muted);
  font-size: var(--type-caption);
  padding-top: 0.2rem;
}

.voyage-step.active .voyage-step-index {
  color: var(--domain-ink);
}

.voyage-step-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.voyage-step-text strong {
  font-size: var(--type-body-sm);
  font-weight: 600;
}

.voyage-step .t-caption {
  display: none;
}

.voyage-step.active .t-caption {
  display: block;
}

.voyage-controls {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.voyage-control {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--domain-ink);
  font-family: var(--font-text);
  font-size: var(--type-caption);
  font-weight: 500;
  cursor: pointer;
}

.voyage-control--prev::before {
  content: '←';
}

.voyage-control--next::after {
  content: '→';
}

.voyage-control:disabled {
  opacity: 0.4;
  cursor: default;
}

.voyage-track {
  flex: 1;
  height: 3px;
  border-radius: var(--radius-pill);
  background: var(--surface-strong);
  overflow: hidden;
}

.voyage-track-fill {
  display: block;
  height: 100%;
  background: var(--domain);
}

@media (max-width: 980px) {
  .voyage {
    height: auto;
  }

  .voyage-sticky {
    position: static;
    height: auto;
    padding: var(--section-pad) 0;
  }

  .voyage-map {
    height: auto;
    aspect-ratio: 4 / 3;
  }

  .voyage-stage {
    grid-template-columns: minmax(0, 1fr);
  }

  .voyage-step .t-caption {
    display: block;
  }

  .voyage-hud {
    left: var(--space-3);
    right: var(--space-3);
    bottom: var(--space-3);
    max-width: none;
    padding: var(--space-2) var(--space-3);
  }

  .voyage-hud-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--space-2);
  }

  .voyage-hud-grid dd {
    font-size: 1rem;
  }

  .voyage-card {
    position: static;
    max-width: none;
    margin: var(--space-3);
  }
}
</style>
