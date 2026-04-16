import { onMounted, onUnmounted } from 'vue'

/**
 * Observes `.fade-in` elements within a container and adds `.visible`
 * when they scroll into view. Uses a MutationObserver to detect
 * dynamically added elements (e.g. from async components).
 */
export function useFadeIn(containerSelector?: string) {
  let intersectionObserver: IntersectionObserver | null = null
  let mutationObserver: MutationObserver | null = null

  onMounted(() => {
    const container = containerSelector
      ? document.querySelector(containerSelector)
      : document.body

    if (!container) return

    intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            intersectionObserver?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    )

    const observeElement = (el: Element) => {
      if (el.classList.contains('fade-in') && !el.classList.contains('visible')) {
        intersectionObserver?.observe(el)
      }
    }

    // Observe existing elements
    container.querySelectorAll('.fade-in').forEach(observeElement)

    // Watch for new elements added by async components
    mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.classList.contains('fade-in')) {
              observeElement(node)
            }
            node.querySelectorAll('.fade-in').forEach(observeElement)
          }
        }
      }
    })

    mutationObserver.observe(container, { childList: true, subtree: true })
  })

  onUnmounted(() => {
    intersectionObserver?.disconnect()
    mutationObserver?.disconnect()
  })
}
