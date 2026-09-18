import { onBeforeUnmount, onMounted, ref } from 'vue'

export type NavTone = 'light' | 'dark' | 'auto'

/**
 * Keeps the fixed navigation legible over chapters of alternating value.
 *
 * The bar samples whichever `.chapter` sits under it and takes that chapter's
 * tone; with no chapter under it the bar falls back to the page theme.
 */
export function useNavTone(barHeight = 76) {
  const tone = ref<NavTone>('auto')

  let frame = 0
  let queued = false
  let chapters: HTMLElement[] = []

  const collect = () => {
    chapters = Array.from(document.querySelectorAll<HTMLElement>('.chapter[data-chapter]'))
  }

  const measure = () => {
    queued = false
    const probe = barHeight / 2

    let found: NavTone = 'auto'
    for (const chapter of chapters) {
      const rect = chapter.getBoundingClientRect()
      if (rect.top <= probe && rect.bottom >= probe) {
        const value = chapter.dataset.chapter
        found = value === 'light' ? 'light' : 'dark'
        break
      }
    }

    if (found !== tone.value) tone.value = found
    document.documentElement.dataset.navTone = found
  }

  const schedule = () => {
    if (queued) return
    queued = true
    frame = requestAnimationFrame(measure)
  }

  let observer: MutationObserver | null = null

  onMounted(() => {
    collect()
    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    /* Chapters arrive as async sections resolve, so the list is re-collected
       when the view's subtree changes. */
    observer = new MutationObserver(() => {
      collect()
      schedule()
    })
    const root = document.getElementById('main-content')
    if (root) observer.observe(root, { childList: true, subtree: true })
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    observer?.disconnect()
    delete document.documentElement.dataset.navTone
  })

  return { tone }
}
