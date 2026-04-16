import { onMounted, onUnmounted, type Ref } from 'vue'

interface Particle {
  x: number
  y: number
  radius: number
  vx: number
  vy: number
  opacity: number
}

interface Wave {
  y: number
  amplitude: number
  frequency: number
  phase: number
  speed: number
}

interface Vessel {
  x: number
  y: number
  size: number
  pulsePhase: number
}

export function useOceanCanvas(canvasRef: Ref<HTMLCanvasElement | null>) {
  let ctx: CanvasRenderingContext2D | null = null
  let animationId: number | null = null
  let particles: Particle[] = []
  let waves: Wave[] = []
  let vessels: Vessel[] = []
  let width = 0
  let height = 0
  let paused = false
  let isVisible = true
  let isTabActive = true
  let observer: IntersectionObserver | null = null

  const resize = () => {
    if (!canvasRef.value) return
    
    const canvas = canvasRef.value
    width = canvas.offsetWidth
    height = canvas.offsetHeight
    canvas.width = width * window.devicePixelRatio
    canvas.height = height * window.devicePixelRatio
    
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
  }

  const init = () => {
    if (!canvasRef.value) return
    
    ctx = canvasRef.value.getContext('2d')
    if (!ctx) return

    resize()

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      })
    }

    for (let i = 0; i < 3; i++) {
      waves.push({
        y: height * 0.3 + i * 60,
        amplitude: 20 + i * 10,
        frequency: 0.01 - i * 0.002,
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + i * 0.01
      })
    }

    for (let i = 0; i < 5; i++) {
      vessels.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.8,
        size: 8,
        pulsePhase: Math.random() * Math.PI * 2
      })
    }
  }

  const drawParticles = () => {
    if (!ctx) return

    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0) p.x = width
      if (p.x > width) p.x = 0
      if (p.y < 0) p.y = height
      if (p.y > height) p.y = 0

      ctx!.beginPath()
      ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx!.fillStyle = `rgba(0, 217, 255, ${p.opacity})`
      ctx!.fill()
    })
  }

  const drawWaves = () => {
    if (!ctx) return

    waves.forEach(wave => {
      wave.phase += wave.speed

      ctx!.beginPath()
      ctx!.moveTo(0, wave.y)

      for (let x = 0; x <= width; x += 5) {
        const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude
        ctx!.lineTo(x, y)
      }

      ctx!.strokeStyle = 'rgba(0, 217, 255, 0.1)'
      ctx!.lineWidth = 2
      ctx!.stroke()
    })
  }

  const drawVessels = () => {
    if (!ctx) return

    const time = Date.now() * 0.001

    vessels.forEach(vessel => {
      const pulse = Math.sin(time + vessel.pulsePhase) * 0.3 + 0.7

      ctx!.beginPath()
      ctx!.arc(vessel.x, vessel.y, vessel.size, 0, Math.PI * 2)
      ctx!.fillStyle = `rgba(0, 217, 255, ${pulse * 0.6})`
      ctx!.fill()

      ctx!.beginPath()
      ctx!.arc(vessel.x, vessel.y, vessel.size * 0.5, 0, Math.PI * 2)
      ctx!.fillStyle = 'rgba(0, 217, 255, 1)'
      ctx!.fill()

      const signalRadius = vessel.size + pulse * 20
      ctx!.beginPath()
      ctx!.arc(vessel.x, vessel.y, signalRadius, 0, Math.PI * 2)
      ctx!.strokeStyle = `rgba(0, 217, 255, ${(1 - pulse) * 0.3})`
      ctx!.lineWidth = 2
      ctx!.stroke()
    })
  }

  const drawConnections = () => {
    if (!ctx) return

    for (let i = 0; i < vessels.length; i++) {
      for (let j = i + 1; j < vessels.length; j++) {
        const v1 = vessels[i]
        const v2 = vessels[j]
        if (!v1 || !v2) continue
        
        const dx = v2.x - v1.x
        const dy = v2.y - v1.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 300) {
          const opacity = (1 - distance / 300) * 0.15
          ctx!.beginPath()
          ctx!.moveTo(v1.x, v1.y)
          ctx!.lineTo(v2.x, v2.y)
          ctx!.strokeStyle = `rgba(0, 217, 255, ${opacity})`
          ctx!.lineWidth = 1
          ctx!.stroke()
        }
      }
    }
  }

  const pause = () => {
    if (paused) return
    paused = true
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
  }

  const resume = () => {
    if (!paused) return
    paused = false
    animate()
  }

  const updatePauseState = () => {
    if (isVisible && isTabActive) {
      resume()
    } else {
      pause()
    }
  }

  const handleVisibilityChange = () => {
    isTabActive = !document.hidden
    updatePauseState()
  }

  const animate = () => {
    if (!ctx || !canvasRef.value || paused) return

    ctx.clearRect(0, 0, width, height)

    drawWaves()
    drawParticles()
    drawConnections()
    drawVessels()

    animationId = requestAnimationFrame(animate)
  }

  onMounted(() => {
    init()
    animate()

    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) {
          isVisible = entry.isIntersecting
          updatePauseState()
        }
      },
      { threshold: 0 }
    )

    if (canvasRef.value) {
      observer.observe(canvasRef.value)
    }
  })

  onUnmounted(() => {
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    window.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    init,
    animate
  }
}
