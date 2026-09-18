import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

/**
 * Progress of a pinned section, 0 at the moment its top reaches the viewport
 * top and 1 when its last scrollable pixel does.
 *
 * Driven by rAF rather than by the scroll event so the value is read once per
 * frame instead of once per scroll tick.
 */
export function useScrollProgress(elementRef: Ref<HTMLElement | null>) {
  const progress = ref(0)
  const active = ref(false)

  let frame = 0
  let queued = false

  const measure = () => {
    queued = false
    const el = elementRef.value
    if (!el) return

    const rect = el.getBoundingClientRect()
    const scrollable = rect.height - window.innerHeight

    if (scrollable <= 0) {
      progress.value = rect.top < window.innerHeight / 2 ? 1 : 0
      active.value = rect.top < window.innerHeight && rect.bottom > 0
      return
    }

    const raw = -rect.top / scrollable
    progress.value = Math.min(1, Math.max(0, raw))
    active.value = rect.top <= 0 && rect.bottom >= window.innerHeight
  }

  const schedule = () => {
    if (queued) return
    queued = true
    frame = requestAnimationFrame(measure)
  }

  onMounted(() => {
    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
  })

  return { progress, active, remeasure: schedule }
}
