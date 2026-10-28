import { SparkRenderer, SplatMesh } from '@sparkjsdev/spark'
import * as THREE from 'three'
import { APPROACH_PLATE_VIEW } from '@/data/playbook/approach-plate-view'
import { BAHIA_MAR_DOCK_LABELS } from '@/data/playbook/bahia-mar-docks'

export interface ApproachPlateState {
  status: 'loading' | 'ready' | 'failed'
  message: string
  progress: number
}

interface SceneOptions {
  onState: (state: ApproachPlateState) => void
  onAngle: (angle: number) => void
  onZoom: (zoom: number) => void
  onElevation: (elevation: number) => void
  onInspect: () => void
  reducedMotion: boolean
}

// Published Bahia Mar survey: metres east/up/south from its geographic anchor.
// These extents are from the source SPZ, rather than a different marina's scan.
const MODEL_URL = `${import.meta.env.BASE_URL}assets/demo/bahia-mar-approach.spz`
const MODEL_BYTES = 19_260_339
const TARGET = new THREE.Vector3(27, 27, 0)
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
  private readonly dockLabelsLayer: HTMLDivElement
  private readonly dockLabels: { element: HTMLSpanElement; position: THREE.Vector3 }[]
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
  private elevation: number = APPROACH_PLATE_VIEW.elevation
  private readonly pan = new THREE.Vector3()
  private pointer: {
    id: number
    x: number
    y: number
    angle: number
    elevation: number
    pan: THREE.Vector3
    right: THREE.Vector3
    up: THREE.Vector3
    unitsPerPixel: number
    mode: 'orbit' | 'pan'
  } | null = null

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
    this.renderer.domElement.addEventListener('lostpointercapture', this.onPointerUp)
    this.renderer.domElement.addEventListener('contextmenu', this.onContextMenu)
    this.renderer.domElement.addEventListener('wheel', this.onWheel, { passive: false })
    this.container.append(this.renderer.domElement)
    this.dockLabelsLayer = document.createElement('div')
    this.dockLabelsLayer.className = 'ap-dock-labels'
    this.dockLabelsLayer.setAttribute('aria-hidden', 'true')
    this.dockLabelsLayer.hidden = true
    this.dockLabels = BAHIA_MAR_DOCK_LABELS.map((dock) => {
      const element = document.createElement('span')
      element.className = 'ap-dock-label'
      element.textContent = dock.label
      element.dataset.dockLabel = dock.label
      this.dockLabelsLayer.append(element)
      return { element, position: new THREE.Vector3(...dock.position) }
    })
    this.container.append(this.dockLabelsLayer)
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
      this.dockLabelsLayer.hidden = false
      this.projectDockLabels()
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
    this.pauseForInspection()
    this.zoom = THREE.MathUtils.clamp(zoom, 0.5, 2)
    this.options.onZoom(this.zoom)
    this.updateCamera()
    this.requestFrame()
  }

  reset() {
    this.pauseForInspection()
    this.angle = APPROACH_PLATE_VIEW.angle
    this.sweepPhase = Math.acos(1 - APPROACH_PLATE_VIEW.angle / 90)
    this.zoom = APPROACH_PLATE_VIEW.zoom
    this.elevation = APPROACH_PLATE_VIEW.elevation
    this.pan.set(0, 0, 0)
    this.pointer = null
    this.reportAngle()
    this.options.onZoom(this.zoom)
    this.options.onElevation(this.elevation)
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
    const elevation = THREE.MathUtils.degToRad(this.elevation)
    const outward = new THREE.Vector3(
      Math.sin(azimuth) * Math.cos(elevation),
      Math.sin(elevation),
      Math.cos(azimuth) * Math.cos(elevation),
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
    const orbit = distance * Math.cos(elevation)
    const target = TARGET.clone().add(this.pan)
    this.camera.position.set(
      target.x + Math.sin(azimuth) * orbit,
      target.y + Math.sin(elevation) * distance,
      target.z + Math.cos(azimuth) * orbit,
    )
    this.camera.lookAt(target)
    this.camera.updateMatrixWorld()
    this.projectDockLabels()
  }

  private projectDockLabels() {
    if (!this.ready) return
    const width = this.container.clientWidth
    const height = this.container.clientHeight
    for (const dock of this.dockLabels) {
      const cameraPosition = dock.position.clone().applyMatrix4(this.camera.matrixWorldInverse)
      const point = dock.position.clone().project(this.camera)
      const visible = cameraPosition.z < 0 && point.z >= -1 && point.z <= 1
        && point.x >= -1 && point.x <= 1 && point.y >= -1 && point.y <= 1
      dock.element.hidden = !visible
      if (visible) {
        dock.element.style.transform = `translate3d(${(point.x * 0.5 + 0.5) * width}px, ${(0.5 - point.y * 0.5) * height}px, 0) translate(-50%, -50%)`
      }
    }
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
    if (!this.ready || this.pointer || (event.button !== 0 && event.button !== 2)) return
    // The same right/up vectors and perspective scale drive both axes of pan,
    // so the model follows the pointer consistently at every tilt and zoom.
    const distance = this.camera.position.distanceTo(TARGET.clone().add(this.pan))
    const unitsPerPixel = (2 * distance * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)))
      / Math.max(this.container.clientHeight, 1)
    this.pointer = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      angle: this.angle,
      elevation: this.elevation,
      pan: this.pan.clone(),
      right: new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 0),
      up: new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 1),
      unitsPerPixel,
      mode: event.button === 2 || event.shiftKey ? 'pan' : 'orbit',
    }
    this.renderer.domElement.setPointerCapture(event.pointerId)
    if (event.pointerType === 'mouse') event.preventDefault()
    this.pauseForInspection()
  }

  private onPointerMove = (event: PointerEvent) => {
    if (!this.pointer || event.pointerId !== this.pointer.id) return
    const dx = event.clientX - this.pointer.x
    const dy = event.clientY - this.pointer.y
    if (this.pointer.mode === 'pan') {
      this.pan.copy(this.pointer.pan)
        .addScaledVector(this.pointer.right, -dx * this.pointer.unitsPerPixel)
        .addScaledVector(this.pointer.up, dy * this.pointer.unitsPerPixel)
    } else {
      this.angle = THREE.MathUtils.clamp(
        this.pointer.angle + (dx / Math.max(this.container.clientWidth, 1)) * 180,
        0,
        180,
      )
      this.elevation = THREE.MathUtils.clamp(
        this.pointer.elevation + (dy / Math.max(this.container.clientHeight, 1)) * 90,
        15,
        85,
      )
      this.sweepPhase = Math.acos(1 - this.angle / 90)
      this.reportAngle()
      this.options.onElevation(this.elevation)
    }
    this.updateCamera()
    this.requestFrame()
  }

  private onPointerUp = (event: PointerEvent) => {
    if (this.pointer?.id !== event.pointerId) return
    this.pointer = null
    if (this.renderer.domElement.hasPointerCapture(event.pointerId)) {
      this.renderer.domElement.releasePointerCapture(event.pointerId)
    }
  }

  private onContextMenu = (event: MouseEvent) => {
    event.preventDefault()
  }

  private onWheel = (event: WheelEvent) => {
    if (!this.ready || this.disposed || this.failed || event.deltaY === 0) return
    event.preventDefault()
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? this.container.clientHeight : 1
    const delta = THREE.MathUtils.clamp(event.deltaY * unit, -300, 300)
    this.setZoom(this.zoom * Math.exp(-delta * 0.002))
  }

  private pauseForInspection() {
    this.held = true
    this.options.onInspect()
  }

  private fail(message: string) {
    if (this.disposed || this.failed) return
    this.failed = true
    this.dockLabelsLayer.hidden = true
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
    canvas.removeEventListener('lostpointercapture', this.onPointerUp)
    canvas.removeEventListener('contextmenu', this.onContextMenu)
    canvas.removeEventListener('wheel', this.onWheel)
    canvas.remove()
    this.dockLabelsLayer.remove()

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
