import { onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'

/**
 * Every h1 and h2 on the site renders on a single line. Headings never wrap;
 * when one is wider than the room it has, its font shrinks until it fits.
 * The pre-rendered HTML wraps for a moment before hydration; this snaps it.
 */
const SELECTOR = 'main h1, main h2'
const FLOOR_PX = 14
const SLACK = 0.985

const contentWidth = (el: Element) => {
  const cs = getComputedStyle(el)
  return el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
}

/* A heading inside a shrink-to-fit box (a flex item, an inline-block) measures
   as wide as its text, so the room it really has is the narrowest ancestor. */
const roomFor = (el: HTMLElement) => {
  let room = contentWidth(el)
  for (let p = el.parentElement; p && p.tagName !== 'MAIN'; p = p.parentElement) {
    room = Math.min(room, contentWidth(p))
  }
  return room
}

export function fitHeading(el: HTMLElement) {
  if (el.closest('.sr-only, [data-no-fit]')) return
  el.style.fontSize = ''
  el.style.whiteSpace = 'nowrap'
  const room = roomFor(el)
  const need = el.scrollWidth
  if (room <= 0 || need <= room) return
  const base = parseFloat(getComputedStyle(el).fontSize)
  const size = Math.max(FLOOR_PX, base * (room / need) * SLACK)
  el.style.fontSize = `${size}px`
  /* Below the floor a line simply cannot hold the words; wrapping beats clipping. */
  if (size === FLOOR_PX && el.scrollWidth > room) el.style.whiteSpace = 'normal'
}

export function fitAllHeadings(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>(SELECTOR).forEach(fitHeading)
}

export function useFitHeadings() {
  const router = useRouter()
  let frame = 0
  const schedule = () => {
    if (frame) return
    frame = requestAnimationFrame(() => { frame = 0; fitAllHeadings() })
  }
  let observer: MutationObserver | undefined
  let stopRoute: (() => void) | undefined

  onMounted(() => {
    schedule()
    document.fonts?.ready.then(schedule)
    window.addEventListener('resize', schedule)
    /* Text changes (a role switch, a journey mounting) refit; style writes are
       our own, so attributes stay unobserved and the loop cannot feed itself. */
    observer = new MutationObserver(schedule)
    observer.observe(document.getElementById('main-content') ?? document.body, { childList: true, characterData: true, subtree: true })
    stopRoute = router.afterEach(() => { requestAnimationFrame(schedule) })
  })
  onBeforeUnmount(() => {
    if (frame) cancelAnimationFrame(frame)
    window.removeEventListener('resize', schedule)
    observer?.disconnect()
    stopRoute?.()
  })
}
