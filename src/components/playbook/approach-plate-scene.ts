import { SparkRenderer, SplatMesh } from '@sparkjsdev/spark'
import * as THREE from 'three'
import { APPROACH_PLATE_VIEW } from '@/data/playbook/approach-plate-view'

export interface ApproachPlateState {
  status: 'loading' | 'ready' | 'failed'
  message: string
  progress: number
}

interface SceneOptions {
  onState: (state: ApproachPlateState) => void
  onAngle: (angle: number) => void
  onInspect: () => void
  reducedMotion: boolean
}

// Published Bahia Mar survey: metres east/up/south from its geographic anchor.
// These extents are from the source SPZ, rather than a different marina's scan.
const MODEL_URL = `${import.meta.env.BASE_URL}assets/demo/bahia-mar-approach.spz`
const MODEL_BYTES = 19_260_339
const TARGET = new THREE.Vector3(27, 27, 0)
const ELEVATION = THREE.MathUtils.degToRad(50)
const INITIAL_AZIMUTH = Math.PI / 2
const FRAME_OCCUPANCY = 1.1
const SURVEY_CORNERS = [-171.794, 225.797].flatMap((x) =>
  [0.25, 54.008].flatMap((y) => [-351.08, 350.96].map((z) => new THREE.Vector3(x, y, z).sub(TARGET))),
)
const HALF_TURN_MS = 60_000

/** One real, same-origin survey, with a tilted camera and no simulated navigation data. */
export class ApproachPlateScene {
  private readonly renderer: THREE.WebGLRenderer
  private readonly scene = new THREE.Scene()
  private readonly camera = new THREE.PerspectiveCamera(44, 1, 0.5, 5000)
  private readonly spark: SparkRenderer
  private mesh: SplatMesh | null = null
  private readonly abort = new AbortController()
  private readonly resizeObserver: ResizeObserver
  private readonly intersectionObserver: IntersectionObserver
  private loadTimeout = 0
  private frame = 0
  private rendering: Promise<void> | null = null
  private redraw = false
  private viewDirty = true
  private lastTime = 0
  private lastAngleReport = 0
  private disposed = false
  private failed = false
  private ready = false
  private visible = true
  private held = false
  private angle: number = APPROACH_PLATE_VIEW.angle
  private sweepPhase = Math.acos(1 - APPROACH_PLATE_VIEW.angle / 90)
  private zoom: number = APPROACH_PLATE_VIEW.zoom
  private pointer: { id: number; x: number; angle: number } | null = null

  constructor(private readonly container: HTMLElement, private readonly options: SceneOptions) {
    this.held = options.reducedMotion
    this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.domElement.setAttribute('aria-hidden', 'true')
    this.renderer.domElement.addEventListener('webglcontextlost', this.onContextLost)
    this.renderer.domElement.addEventListener('pointerdown', this.onPointerDown)
    this.renderer.domElement.addEventListener('pointermove', this.onPointerMove)
    this.renderer.domElement.addEventListener('pointerup', this.onPointerUp)
    this.renderer.domElement.addEventListener('pointercancel', this.onPointerUp)
    this.container.append(this.renderer.domElement)
    this.scene.background = new THREE.Color('#10283b')
    this.spark = new SparkRenderer({
      renderer: this.renderer,
      onDirty: this.requestFrame,
      // Own the async update promise so teardown can join it and failures have
      // a handler, rather than letting onBeforeRender start an unobserved sort.
      autoUpdate: false,
      minSortIntervalMs: 0,
      enableLod: false,
    })
    this.scene.add(this.spark)
    this.resizeObserver = new ResizeObserver(this.resize)
    this.resizeObserver.observe(container)
    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.visible = entry?.isIntersecting ?? false
      this.syncMotion()
    })
    this.intersectionObserver.observe(container)
    document.addEventListener('visibilitychange', this.syncMotion)
    this.resize()
    this.loadTimeout = window.setTimeout(() => {
      this.abort.abort()
      this.fail('The marina model took too long to load. Please try again.')
    }, 60_000)
    void this.load()
  }

  private async load() {
    this.options.onState({ status: 'loading', message: 'Loading the Bahia Mar 3D survey…', progress: 0 })
    try {
      const response = await fetch(MODEL_URL, { signal: this.abort.signal })
      if (!response.ok) throw new Error(`Survey request failed: ${response.status}`)
      let bytes: Uint8Array
      if (response.body) {
        const reader = response.body.getReader()
        const chunks: Uint8Array[] = []
        const total = Number(response.headers.get('content-length')) || MODEL_BYTES
        let loaded = 0
        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          chunks.push(value)
          loaded += value.byteLength
          if (!this.disposed) {
            this.options.onState({
              status: 'loading',
              message: 'Loading the Bahia Mar 3D survey…',
              progress: Math.min(95, Math.round((loaded / total) * 95)),
            })
          }
        }
        bytes = new Uint8Array(loaded)
        let offset = 0
        for (const chunk of chunks) {
          bytes.set(chunk, offset)
          offset += chunk.byteLength
        }
      } else {
        bytes = new Uint8Array(await response.arrayBuffer())
      }
      if (this.disposed || this.failed) return
      this.options.onState({ status: 'loading', message: 'Preparing the Gaussian splats…', progress: 97 })
      const mesh = new SplatMesh({ fileBytes: bytes, fileName: 'bahia-mar-approach.spz', lod: false })
      this.mesh = mesh
      await mesh.initialized
      if (this.disposed || this.failed) return
      this.scene.add(mesh)
      this.ready = true
      this.viewDirty = true
      clearTimeout(this.loadTimeout)
      this.options.onState({ status: 'ready', message: 'Bahia Mar 3D survey ready', progress: 100 })
      this.requestFrame()
    } catch (error) {
      if (this.disposed || this.failed) return
      console.error('[Approach Plate] Could not load the Bahia Mar survey.', error)
      this.fail('The 3D survey could not load on this device. Please try again.')
    }
  }

  setPaused(paused: boolean) {
    this.held = paused || this.options.reducedMotion
    this.syncMotion()
  }

  setReducedMotion(reduced: boolean) {
    this.options.reducedMotion = reduced
    if (reduced) this.held = true
    this.syncMotion()
  }

  inspect(angle: number) {
    this.held = true
    this.angle = THREE.MathUtils.clamp(angle, 0, 180)
    this.sweepPhase = Math.acos(1 - this.angle / 90)
    this.reportAngle()
    this.updateCamera()
    this.requestFrame()
  }

  setZoom(zoom: number) {
    this.zoom = THREE.MathUtils.clamp(zoom, 0.5, 2)
    this.updateCamera()
    this.requestFrame()
  }

  reset() {
    this.angle = APPROACH_PLATE_VIEW.angle
    this.sweepPhase = Math.acos(1 - APPROACH_PLATE_VIEW.angle / 90)
    this.zoom = APPROACH_PLATE_VIEW.zoom
    this.reportAngle()
    this.updateCamera()
    this.requestFrame()
  }

  private resize = () => {
    if (this.disposed) return
    const width = this.container.clientWidth
    const height = this.container.clientHeight
    if (!width || !height) return
    this.renderer.setSize(width, height)
    this.renderer.getDrawingBufferSize(this.spark.renderSize)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.updateCamera()
    this.requestFrame()
  }

  private updateCamera() {
    this.viewDirty = true
    const vertical = THREE.MathUtils.degToRad(this.camera.fov / 2)
    const horizontal = Math.atan(Math.tan(vertical) * this.camera.aspect)
    const azimuth = INITIAL_AZIMUTH + THREE.MathUtils.degToRad(this.angle)
    const outward = new THREE.Vector3(
      Math.sin(azimuth) * Math.cos(ELEVATION),
      Math.sin(ELEVATION),
      Math.cos(azimuth) * Math.cos(ELEVATION),
    )
    const right = new THREE.Vector3(Math.cos(azimuth), 0, -Math.sin(azimuth))
    const up = new THREE.Vector3().crossVectors(outward, right)
    // Frame the measured survey footprint at this bearing, with the selected
    // default keeping the marina's long axis across the preview.
    const horizontalFit = Math.max(...SURVEY_CORNERS.map((corner) => {
      const depth = corner.dot(outward)
      return depth + Math.abs(corner.dot(right)) / (Math.tan(horizontal) * FRAME_OCCUPANCY)
    }))
    const verticalFit = Math.max(...SURVEY_CORNERS.map((corner) => {
      const depth = corner.dot(outward)
      return depth + Math.abs(corner.dot(up)) / (Math.tan(vertical) * FRAME_OCCUPANCY)
    }))
    const fit = Math.max(horizontalFit, verticalFit)
    const distance = fit / this.zoom
    const orbit = distance * Math.cos(ELEVATION)
    this.camera.position.set(
      TARGET.x + Math.sin(azimuth) * orbit,
      TARGET.y + Math.sin(ELEVATION) * distance,
      TARGET.z + Math.cos(azimuth) * orbit,
    )
    this.camera.lookAt(TARGET)
    this.camera.updateMatrixWorld()
  }

  private reportAngle() {
    this.options.onAngle(this.angle)
  }

  private requestFrame = () => {
    if (this.disposed || this.failed || this.frame || !this.visible || document.hidden) return
    this.frame = requestAnimationFrame(this.draw)
  }

  private draw = (time: number) => {
    this.frame = 0
    if (this.disposed || this.failed || !this.visible || document.hidden) return
    if (this.rendering) {
      this.redraw = true
      return
    }
    const elapsed = this.lastTime ? Math.min(time - this.lastTime, 100) : 0
    this.lastTime = time
    const moving = this.ready && !this.held && !this.options.reducedMotion
    if (moving) {
      this.sweepPhase = (this.sweepPhase + (elapsed / HALF_TURN_MS) * Math.PI) % (Math.PI * 2)
      // Ease to a stop at either end, then reverse without a visible jump.
      this.angle = 90 - 90 * Math.cos(this.sweepPhase)
      this.updateCamera()
      if (time - this.lastAngleReport > 200) {
        this.reportAngle()
        this.lastAngleReport = time
      }
    }
    this.redraw = false
    this.rendering = this.render()
    void this.rendering.then(() => {
      this.rendering = null
      if (moving || this.redraw) this.requestFrame()
    })
  }

  private async render() {
    try {
      if (this.viewDirty) {
        this.viewDirty = false
        await this.spark.update({ scene: this.scene, camera: this.camera })
      }
      if (this.disposed || this.failed) return
      this.renderer.render(this.scene, this.camera)
    } catch (error) {
      if (this.disposed) return
      console.error('[Approach Plate] The 3D view could not render.', error)
      this.fail('This browser could not draw the 3D survey. Please try again.')
    }
  }

  private syncMotion = () => {
    this.lastTime = 0
    if (this.frame) cancelAnimationFrame(this.frame)
    this.frame = 0
    this.requestFrame()
  }

  private onContextLost = (event: Event) => {
    event.preventDefault()
    this.fail('The 3D view was interrupted. Please try again.')
  }

  private onPointerDown = (event: PointerEvent) => {
    if (!this.ready || event.button !== 0) return
    this.pointer = { id: event.pointerId, x: event.clientX, angle: this.angle }
    this.renderer.domElement.setPointerCapture(event.pointerId)
    this.held = true
    this.options.onInspect()
  }

  private onPointerMove = (event: PointerEvent) => {
    if (!this.pointer || event.pointerId !== this.pointer.id) return
    const delta = ((event.clientX - this.pointer.x) / Math.max(this.container.clientWidth, 1)) * 180
    this.inspect(this.pointer.angle + delta)
  }

  private onPointerUp = (event: PointerEvent) => {
    if (this.pointer?.id !== event.pointerId) return
    this.pointer = null
    if (this.renderer.domElement.hasPointerCapture(event.pointerId)) {
      this.renderer.domElement.releasePointerCapture(event.pointerId)
    }
  }

  private fail(message: string) {
    if (this.disposed || this.failed) return
    this.failed = true
    clearTimeout(this.loadTimeout)
    this.abort.abort()
    cancelAnimationFrame(this.frame)
    this.frame = 0
    this.options.onState({ status: 'failed', message, progress: 0 })
  }

  dispose() {
    if (this.disposed) return
    this.disposed = true
    this.abort.abort()
    clearTimeout(this.loadTimeout)
    cancelAnimationFrame(this.frame)
    this.resizeObserver.disconnect()
    this.intersectionObserver.disconnect()
    document.removeEventListener('visibilitychange', this.syncMotion)
    const canvas = this.renderer.domElement
    canvas.removeEventListener('webglcontextlost', this.onContextLost)
    canvas.removeEventListener('pointerdown', this.onPointerDown)
    canvas.removeEventListener('pointermove', this.onPointerMove)
    canvas.removeEventListener('pointerup', this.onPointerUp)
    canvas.removeEventListener('pointercancel', this.onPointerUp)
    canvas.remove()

    // Spark's depth readback and SPZ decoding must settle before their GPU data
    // is released. Updates are serialized and every promise has a handler.
    this.spark.autoUpdate = false
    this.spark.enableDriveLod = false
    this.spark.enableLodFetching = false
    this.spark.onDirty = undefined
    this.spark.sortDirty = false
    clearTimeout(this.spark.updateTimeoutId)
    clearTimeout(this.spark.sortTimeoutId)
    this.spark.updateTimeoutId = undefined
    this.spark.sortTimeoutId = undefined
    void this.release().catch((error) => console.error('[Approach Plate] Cleanup failed.', error))
  }

  private async release() {
    await this.rendering
    await this.mesh?.initialized.catch(() => undefined)
    this.mesh?.dispose()
    this.spark.dispose()
    this.scene.clear()
    this.renderer.dispose()
    this.renderer.forceContextLoss()
  }
}
