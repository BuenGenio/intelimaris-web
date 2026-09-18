import { onMounted, onBeforeUnmount, ref, type Ref } from 'vue'
import type * as THREE from 'three'
import glassVert from '@/shaders/glass.vert?raw'
import glassFrag from '@/shaders/glass.frag?raw'

export type GlassTier = 'webgl2' | 'webgl1' | 'css' | 'flat'

interface GlassUniforms extends Record<string, THREE.IUniform> {
  uBackdrop: { value: THREE.Texture | null }
  uResolution: { value: THREE.Vector2 }
  uBackdropAspect: { value: THREE.Vector2 }
  uTime: { value: number }
  uIor: { value: number }
  uDispersion: { value: number }
  uRippleAmp: { value: number }
  uPointer: { value: THREE.Vector2 }
  uPointerStrength: { value: number }
  uTint: { value: THREE.Vector3 }
  uTintAmount: { value: number }
  uQuality: { value: number }
}

export interface GlassOptions {
  backdrop: string
  tint?: [number, number, number]
  tintAmount?: number
  ior?: number
  dispersion?: number
  rippleAmp?: number
}

/** A WebGL context is created and released; caching the result keeps the
 *  probe to one context for the page. */
let cachedTier: GlassTier | null = null

export function detectGlassTier(): GlassTier {
  if (cachedTier) return cachedTier

  const canvas = document.createElement('canvas')
  try {
    if (canvas.getContext('webgl2')) {
      cachedTier = 'webgl2'
      return cachedTier
    }
    if (canvas.getContext('webgl')) {
      cachedTier = 'webgl1'
      return cachedTier
    }
  } catch {
    /* fall through to the CSS tiers */
  }

  const probe = document.createElement('div')
  probe.style.setProperty('backdrop-filter', 'blur(1px)')
  probe.style.setProperty('-webkit-backdrop-filter', 'blur(1px)')
  const supportsBackdrop =
    probe.style.backdropFilter !== '' ||
    probe.style.getPropertyValue('-webkit-backdrop-filter') !== ''

  cachedTier = supportsBackdrop ? 'css' : 'flat'
  return cachedTier
}

/**
 * Renders a refractive liquid-glass surface over a backdrop texture.
 *
 * The page behind a canvas cannot be read back in the browser, so the backdrop
 * is an image we supply and the surface is composited beneath the DOM content
 * rather than pretending to sample it.
 */
export function useGlassSurface(
  canvasRef: Ref<HTMLCanvasElement | null>,
  options: GlassOptions,
) {
  const tier = ref<GlassTier>('flat')
  const ready = ref(false)

  let renderer: THREE.WebGLRenderer | null = null
  let scene: THREE.Scene | null = null
  let camera: THREE.OrthographicCamera | null = null
  let material: THREE.ShaderMaterial | null = null
  let uniforms: GlassUniforms | null = null
  let geometry: THREE.PlaneGeometry | null = null
  let texture: THREE.Texture | null = null
  let frame = 0
  let running = false
  let visible = false
  let clock: THREE.Clock | null = null

  /* Plain pairs until three loads; the uniforms hold the real Vector2s. */
  const pointer = { x: 0.5, y: 0.5 }
  const pointerTarget = { x: 0.5, y: 0.5 }
  let pointerStrength = 0

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const coarsePointer = window.matchMedia('(pointer: coarse)')

  const stop = () => {
    if (!running) return
    running = false
    cancelAnimationFrame(frame)
  }

  const start = () => {
    if (running || !ready.value) return
    if (reducedMotion.matches) {
      renderOnce()
      return
    }
    running = true
    clock?.start()
    frame = requestAnimationFrame(tick)
  }

  const renderOnce = () => {
    if (!renderer || !scene || !camera) return
    renderer.render(scene, camera)
  }

  const tick = () => {
    if (!running || !uniforms) return
    uniforms.uTime.value = clock?.getElapsedTime() ?? 0

    pointer.x += (pointerTarget.x - pointer.x) * 0.08
    pointer.y += (pointerTarget.y - pointer.y) * 0.08
    uniforms.uPointer.value.set(pointer.x, pointer.y)
    pointerStrength *= 0.965
    uniforms.uPointerStrength.value = pointerStrength

    renderOnce()
    frame = requestAnimationFrame(tick)
  }

  const resize = () => {
    const canvas = canvasRef.value
    if (!canvas || !renderer || !uniforms) return
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    if (width === 0 || height === 0) return

    renderer.setSize(width, height, false)
    uniforms.uResolution.value.set(width, height)
    const aspect = width / height
    uniforms.uBackdropAspect.value.set(Math.max(aspect, 1), Math.max(1 / aspect, 1))
    if (!running) renderOnce()
  }

  const onPointerMove = (event: PointerEvent) => {
    const canvas = canvasRef.value
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    pointerTarget.x = (event.clientX - rect.left) / rect.width
    pointerTarget.y = 1 - (event.clientY - rect.top) / rect.height
    pointerStrength = Math.min(pointerStrength + 0.28, 1)
  }

  const onVisibilityChange = () => {
    if (document.hidden) stop()
    else if (visible) start()
  }

  let observer: IntersectionObserver | null = null

  let disposed = false

  onMounted(async () => {
    const canvas = canvasRef.value
    if (!canvas) return

    tier.value = detectGlassTier()
    if (tier.value !== 'webgl2' && tier.value !== 'webgl1') return

    /* three.js is ~600 kB; keeping it out of the entry chunk means the hero
       paints from the image before any of it is fetched. */
    const three = await import('three')
    if (disposed) return

    try {
      renderer = new three.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
        powerPreference: 'low-power',
      })
    } catch {
      tier.value = 'css'
      return
    }

    /* Retina beyond 2x costs fill rate with no visible gain; phones get 1.5. */
    const maxDpr = coarsePointer.matches ? 1.5 : 2
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxDpr))

    scene = new three.Scene()
    camera = new three.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1)
    clock = new three.Clock(false)

    const tint = options.tint ?? [0.26, 0.45, 0.73]
    const mobile = coarsePointer.matches

    uniforms = {
      uBackdrop: { value: null },
      uResolution: { value: new three.Vector2(1, 1) },
      uBackdropAspect: { value: new three.Vector2(1, 1) },
      uTime: { value: 0 },
      uIor: { value: options.ior ?? 1.14 },
      /* Dispersion is the first thing to cost legibility, so phones lose it. */
      uDispersion: { value: mobile ? 0 : (options.dispersion ?? 0.004) },
      uRippleAmp: { value: options.rippleAmp ?? 0.0016 },
      uPointer: { value: new three.Vector2(pointer.x, pointer.y) },
      uPointerStrength: { value: 0 },
      uTint: { value: new three.Vector3(...tint) },
      uTintAmount: { value: options.tintAmount ?? 0.18 },
      uQuality: { value: mobile ? 0 : 1 },
    }

    material = new three.ShaderMaterial({
      vertexShader: glassVert,
      fragmentShader: glassFrag,
      uniforms,
    })

    geometry = new three.PlaneGeometry(1, 1)
    scene.add(new three.Mesh(geometry, material))

    new three.TextureLoader().load(
      options.backdrop,
      (loaded) => {
        loaded.colorSpace = three.SRGBColorSpace
        loaded.minFilter = three.LinearFilter
        loaded.wrapS = three.ClampToEdgeWrapping
        loaded.wrapT = three.ClampToEdgeWrapping
        texture = loaded
        uniforms!.uBackdrop.value = loaded
        ready.value = true
        resize()
        if (visible) start()
        else renderOnce()
      },
      undefined,
      () => {
        tier.value = 'css'
      },
    )

    observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting)
        if (visible && !document.hidden) start()
        else stop()
      },
      { threshold: 0 },
    )
    observer.observe(canvas)

    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibilityChange)
    if (!coarsePointer.matches) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
    }
  })

  onBeforeUnmount(() => {
    disposed = true
    stop()
    observer?.disconnect()
    window.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', onVisibilityChange)
    window.removeEventListener('pointermove', onPointerMove)
    texture?.dispose()
    geometry?.dispose()
    material?.dispose()
    uniforms = null
    renderer?.dispose()
    renderer = null
    scene = null
    camera = null
  })

  return { tier, ready }
}
