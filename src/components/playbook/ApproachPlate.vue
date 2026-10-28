<template>
  <section class="approach-plate" aria-label="Bahia Mar sample Approach Plate">
    <div class="ap-brief">
      <p class="ap-eyebrow">Marine Approach Plates</p>
      <h3>Know the arrival before you arrive.</h3>
      <p>
        A naval version of the aviation approach plate, built for the water: bring the entrance,
        fairways, landmarks and berth context into one visual arrival briefing. The skipper and crew
        can build a shared picture of the marina before the final approach. Explore Bahia Mar below
        through its real 3D Gaussian splat survey.
      </p>
    </div>

    <div class="ap-viewer">
      <header class="ap-topline">
        <span><i aria-hidden="true"></i> Bahia Mar · Fort Lauderdale</span>
        <span>Sample Approach Plate</span>
      </header>
      <div ref="viewport" class="ap-viewport" :aria-busy="state.status === 'loading'">
        <div
          ref="sceneHost"
          class="ap-scene"
          role="img"
          aria-label="3D survey of Bahia Mar marina. Drag to rotate and tilt, Shift-drag or right-drag to pan, and use two-finger scrolling to zoom. View controls are also available below."
        ></div>
        <div v-if="state.status !== 'ready'" class="ap-loading" role="status" aria-live="polite">
          <p>{{ state.message }}</p>
          <template v-if="state.status === 'loading'">
            <progress :value="state.progress" max="100" aria-label="Loading Bahia Mar survey"></progress>
            <span>{{ state.progress }}% · 19 MB survey</span>
          </template>
          <button v-else type="button" class="ap-button" @click="start">Try again</button>
        </div>
        <template v-else>
          <div class="ap-view-label">3D approach view <span>Slow 180° marina sweep</span></div>
          <div class="ap-compass" aria-hidden="true" :style="{ transform: `rotate(${compassAngle}deg)` }">
            <span>N</span><svg viewBox="0 0 24 32"><path d="M12 0 21 26 12 21 3 26Z" fill="currentColor" /></svg>
          </div>
          <p class="ap-drag-hint">
            <span class="ap-mouse-hint">Drag to rotate &amp; tilt · Shift-drag or right-drag to pan · two-finger scroll to zoom</span>
            <span class="ap-touch-hint">Drag to look around · use + / − to zoom</span>
          </p>
        </template>
      </div>
      <div class="ap-controls">
        <div class="ap-playback">
          <button
            type="button"
            class="ap-button ap-button--primary"
            :disabled="state.status !== 'ready' || reducedMotion"
            :aria-pressed="!paused && !reducedMotion"
            @click="togglePause"
          >
            <svg v-if="paused || reducedMotion" viewBox="0 0 20 20" aria-hidden="true"><path d="m6 3 10 7-10 7Z" fill="currentColor" /></svg>
            <svg v-else viewBox="0 0 20 20" aria-hidden="true"><path d="M5 3h4v14H5zm7 0h4v14h-4z" fill="currentColor" /></svg>
            {{ reducedMotion ? 'Still view' : paused ? 'Play sweep' : 'Pause sweep' }}
          </button>
          <button type="button" class="ap-button" :disabled="state.status !== 'ready'" @click="reset">Reset view</button>
        </div>
        <label class="ap-angle">
          <span>Look around <output>{{ Math.round(angle) }}° / 180°</output></span>
          <input
            type="range"
            min="0"
            max="180"
            step="1"
            :value="angle"
            :disabled="state.status !== 'ready'"
            aria-label="Rotate the marina view from 0 to 180 degrees"
            @input="inspect"
          />
        </label>
        <div class="ap-zoom" role="group" aria-label="Marina view zoom">
          <button type="button" class="ap-button" aria-label="Zoom out" :disabled="state.status !== 'ready' || zoom <= 0.5" @click="changeZoom(-0.2)">−</button>
          <span>{{ Math.round(zoom * 100) }}%</span>
          <button type="button" class="ap-button" aria-label="Zoom in" :disabled="state.status !== 'ready' || zoom >= 2" @click="changeZoom(0.2)">+</button>
        </div>
      </div>
    </div>

    <p class="ap-caption">
      Bahia Mar Resort and Yachting Center · surveyed 9 September 2026 by InteliMaris Field Operations.
      1.97 million measured LiDAR returns rendered as Gaussian splats.
      Dock letters are approximate references from the marina's published chart.
      Sample for arrival familiarisation; not for navigation.
      <span v-if="reducedMotion">Automatic motion is off to match your motion preference.</span>
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { APPROACH_PLATE_VIEW } from '@/data/playbook/approach-plate-view'
import type { ApproachPlateScene, ApproachPlateState } from './approach-plate-scene'

const viewport = ref<HTMLElement | null>(null)
const sceneHost = ref<HTMLElement | null>(null)
const state = ref<ApproachPlateState>({ status: 'loading', message: 'Preparing the Bahia Mar Approach Plate…', progress: 0 })
const paused = ref(false)
const angle = ref<number>(APPROACH_PLATE_VIEW.angle)
const zoom = ref<number>(APPROACH_PLATE_VIEW.zoom)
const elevation = ref<number>(APPROACH_PLATE_VIEW.elevation)
const reducedMotion = ref(false)
const compassAngle = computed(() => {
  const azimuth = ((angle.value + 90) * Math.PI) / 180
  return (Math.atan2(Math.sin(azimuth), Math.cos(azimuth) * Math.sin((elevation.value * Math.PI) / 180)) * 180) / Math.PI
})
let scene: ApproachPlateScene | null = null
let observer: IntersectionObserver | null = null
let motionPreference: MediaQueryList | null = null
let disposed = false
let attempt = 0

async function start() {
  const current = ++attempt
  scene?.dispose()
  scene = null
  state.value = { status: 'loading', message: 'Loading the Bahia Mar 3D survey…', progress: 0 }
  angle.value = APPROACH_PLATE_VIEW.angle
  zoom.value = APPROACH_PLATE_VIEW.zoom
  elevation.value = APPROACH_PLATE_VIEW.elevation
  paused.value = reducedMotion.value
  try {
    const { ApproachPlateScene } = await import('./approach-plate-scene')
    if (disposed || current !== attempt || !sceneHost.value) return
    scene = new ApproachPlateScene(sceneHost.value, {
      reducedMotion: reducedMotion.value,
      onState: (next) => { if (!disposed && current === attempt) state.value = next },
      onAngle: (next) => { if (!disposed && current === attempt) angle.value = next },
      onZoom: (next) => { if (!disposed && current === attempt) zoom.value = next },
      onElevation: (next) => { if (!disposed && current === attempt) elevation.value = next },
      onInspect: () => { paused.value = true },
    })
  } catch (error) {
    if (disposed || current !== attempt) return
    console.error('[Approach Plate] The 3D viewer could not start.', error)
    state.value = { status: 'failed', message: 'The 3D viewer is unavailable in this browser. Please try again.', progress: 0 }
  }
}

function togglePause() {
  paused.value = !paused.value
  scene?.setPaused(paused.value)
}

function inspect(event: Event) {
  paused.value = true
  angle.value = Number((event.target as HTMLInputElement).value)
  scene?.inspect(angle.value)
}

function changeZoom(delta: number) {
  zoom.value = Math.max(0.5, Math.min(2, Math.round((zoom.value + delta) * 10) / 10))
  scene?.setZoom(zoom.value)
}

function reset() {
  angle.value = APPROACH_PLATE_VIEW.angle
  zoom.value = APPROACH_PLATE_VIEW.zoom
  elevation.value = APPROACH_PLATE_VIEW.elevation
  scene?.reset()
}

function onMotionPreference(event: MediaQueryListEvent) {
  reducedMotion.value = event.matches
  if (event.matches) paused.value = true
  scene?.setReducedMotion(event.matches)
  scene?.setPaused(paused.value)
}

onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion.value = motionPreference.matches
  paused.value = reducedMotion.value
  motionPreference.addEventListener('change', onMotionPreference)
  observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    observer?.disconnect()
    void start()
  }, { rootMargin: '200px' })
  if (viewport.value) observer.observe(viewport.value)
})

onBeforeUnmount(() => {
  disposed = true
  attempt++
  observer?.disconnect()
  motionPreference?.removeEventListener('change', onMotionPreference)
  scene?.dispose()
  scene = null
})
</script>

<style scoped>
.approach-plate { min-width: 0; }
.ap-brief { padding: 0 0 22px; max-width: 90ch; }
.ap-eyebrow { color: var(--domain-ink); font-size: .69rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; margin: 0 0 8px; }
.ap-brief h3 { font-family: var(--font-display); font-size: clamp(1.35rem, 2vw, 1.8rem); line-height: 1.2; letter-spacing: -.02em; margin: 0 0 12px; }
.ap-brief > p:last-child { color: var(--text-secondary); font-size: 1rem; line-height: 1.65; margin: 0; max-width: 86ch; }
.ap-viewer { border: 1px solid var(--border-medium); border-radius: var(--radius-lg); overflow: hidden; background: #10283b; }
.ap-topline { display: flex; justify-content: space-between; gap: 12px 24px; flex-wrap: wrap; align-items: center; padding: 14px 20px; color: #d7e3ed; background: #0e2031; font-size: .7rem; font-weight: 500; letter-spacing: .07em; text-transform: uppercase; }
.ap-topline > span:first-child { display: inline-flex; align-items: center; gap: 10px; }
.ap-topline i { height: 6px; width: 6px; border-radius: 50%; background: #82a6ca; }
.ap-topline > span:last-child { color: #a8c4dd; }
.ap-viewport { position: relative; height: clamp(320px, 44vw, 560px); max-height: var(--stage-cap, 650px); min-height: 300px; overflow: hidden; }
.ap-scene { position: absolute; inset: 0; touch-action: pan-y; cursor: grab; }
.ap-scene:active { cursor: grabbing; }
.ap-scene :deep(canvas) { display: block; width: 100%; height: 100%; touch-action: pan-y; }
.ap-scene :deep(.ap-dock-labels) { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.ap-scene :deep(.ap-dock-label) { position: absolute; top: 0; left: 0; display: grid; place-items: center; min-width: 24px; height: 24px; padding: 0 7px; border: 1px solid rgba(255, 255, 255, .85); border-radius: 7px; background: rgba(11, 24, 38, .85); color: #fff; box-shadow: 0 2px 8px rgba(0, 0, 0, .35); font: 700 .72rem var(--font-text); line-height: 1; white-space: nowrap; }
.ap-scene :deep(.ap-dock-label[hidden]), .ap-scene :deep(.ap-dock-labels[hidden]) { display: none; }
.ap-loading { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 32px; text-align: center; color: #e7eff6; background: #10283b; }
.ap-loading p { max-width: 42ch; margin: 0; line-height: 1.5; }
.ap-loading progress { width: min(240px, 80%); height: 5px; accent-color: #82a6ca; border: 0; border-radius: 9px; overflow: hidden; }
.ap-loading progress::-webkit-progress-bar { background: #294254; }
.ap-loading progress::-webkit-progress-value { background: #82a6ca; }
.ap-loading span { color: #b2c6d7; font-size: .75rem; }
.ap-view-label { position: absolute; left: 20px; top: 18px; color: #fff; font-size: .8rem; text-shadow: 0 1px 6px #07111a; pointer-events: none; }
.ap-view-label span { display: block; margin-top: 3px; color: #c2d3e1; font-size: .7rem; }
.ap-compass { position: absolute; right: 22px; top: 22px; display: flex; flex-direction: column; align-items: center; color: #fff; transform-origin: 50% 70%; pointer-events: none; filter: drop-shadow(0 2px 4px #10283b); }
.ap-compass span { font: 600 .7rem var(--font-text); }
.ap-compass svg { width: 20px; height: 30px; margin-top: 3px; }
.ap-drag-hint { position: absolute; left: 20px; right: 20px; bottom: 15px; margin: 0; color: #c9d9e6; font-size: .7rem; pointer-events: none; text-shadow: 0 1px 4px #07111a; }
.ap-touch-hint { display: none; }
@media (pointer: coarse) {
  .ap-mouse-hint { display: none; }
  .ap-touch-hint { display: inline; }
}
.ap-controls { display: flex; align-items: center; justify-content: space-between; gap: 20px 28px; flex-wrap: wrap; padding: 16px 20px; color: #d7e3ed; background: #0e2031; border-top: 1px solid #2b4256; }
.ap-playback, .ap-zoom { display: flex; align-items: center; gap: 8px; }
.ap-button { display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 1px solid #465b6d; border-radius: 999px; padding: 9px 13px; min-height: 38px; font: 500 .75rem var(--font-text); color: #e7eff6; background: transparent; cursor: pointer; line-height: 1.2; white-space: nowrap; }
.ap-button:hover:not(:disabled) { background: #294254; border-color: #88a4bb; }
.ap-button--primary { color: #10283b; background: #d9e9f6; border-color: #d9e9f6; }
.ap-button--primary:hover:not(:disabled) { color: #10283b; background: #fff; }
.ap-button:disabled { opacity: .48; cursor: default; }
.ap-button:focus-visible, .ap-angle input:focus-visible { outline: 2px solid #82a6ca; outline-offset: 4px; }
.ap-button svg { width: 14px; height: 14px; }
.ap-angle { display: block; flex: 1 1 220px; max-width: 450px; min-width: 140px; }
.ap-angle > span { display: flex; align-items: center; justify-content: space-between; font-size: .7rem; gap: 20px; }
.ap-angle output { color: #a8c4dd; font-variant-numeric: tabular-nums; }
.ap-angle input { display: block; width: 100%; height: 18px; margin: 3px 0 0; accent-color: #82a6ca; cursor: pointer; }
.ap-zoom .ap-button { width: 36px; height: 36px; min-height: 36px; padding: 0; font-size: 1.2rem; }
.ap-zoom span { min-width: 42px; text-align: center; font-size: .7rem; font-variant-numeric: tabular-nums; }
.ap-caption { color: var(--text-muted); font-size: .75rem; line-height: 1.6; margin: 12px 0 0; max-width: 110ch; }
@media (max-width: 640px) {
  .ap-brief { padding-bottom: 18px; }
  .ap-brief > p:last-child { font-size: .9rem; }
  .ap-topline { padding: 12px 14px; font-size: .6rem; gap: 6px; }
  .ap-viewport { height: 380px; }
  .ap-controls { padding: 14px; gap: 16px 14px; }
  .ap-angle { flex: 1 1 100%; max-width: none; order: 3; }
  .ap-button { font-size: .7rem; padding-inline: 11px; }
  .ap-zoom { margin-left: auto; gap: 5px; }
  .ap-zoom span { min-width: 35px; }
  .ap-view-label, .ap-drag-hint { left: 14px; }
  .ap-compass { right: 16px; }
}
</style>
