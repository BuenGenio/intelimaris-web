<template>
  <span class="wm" :class="[`wm--${endorse}`, { 'wm--animate': playing }]" :style="{ '--wm-size': `${size}px` }">
    <span v-if="endorse === 'left'" class="wm-endorse-left" aria-hidden="true">
      <span class="wm-by">by</span>
      <Wordmark :size="Math.max(10, Math.round(size * 0.34))" />
    </span>
    <i v-if="endorse === 'left'" class="wm-hairline" aria-hidden="true" />

    <svg
      ref="svgRef"
      class="wm-svg"
      :width="width"
      :height="height"
      :viewBox="`0 0 ${width} ${height}`"
      role="img"
      :aria-label="label"
    >
      <defs>
        <clipPath :id="`${uid}-dot`">
          <rect x="0" y="0" :width="width" :height="dotClipBottom" />
        </clipPath>
      </defs>

      <!-- The line draws in first, then gives way to the cut. -->
      <rect
        v-if="showLine"
        class="wm-draw"
        :x="rootBox.x"
        :y="cutY"
        :width="rootBox.width"
        :height="cutHeight"
        :fill="domainColour"
      />

      <text
        class="wm-text"
        :x="0"
        :y="baseline"
        :font-size="size"
        font-weight="700"
        :letter-spacing="`${tracking}em`"
      >
        <tspan ref="rootRef" class="wm-root" :fill="rootColour">{{ rootHead }}<tspan ref="lastRef">{{ rootTail }}</tspan></tspan><tspan class="wm-domain" :fill="domainColour">{{ domain }}</tspan>
      </text>

      <!-- The cut: scored through the root only, in the surface colour. -->
      <rect
        v-if="showLine"
        class="wm-cut"
        :x="rootBox.x"
        :y="cutY"
        :width="rootBox.width"
        :height="cutHeight"
        :fill="cutColour"
      />

      <!-- The dot of the root's last i takes the domain colour. -->
      <text
        v-if="hasDot"
        class="wm-dot"
        :x="lastX"
        :y="baseline"
        :font-size="size"
        font-weight="700"
        :fill="domainColour"
        :clip-path="`url(#${uid}-dot)`"
      >{{ rootTail }}</text>

      <text
        v-if="tm"
        class="wm-tm"
        :x="textWidth + size * 0.06"
        :y="baseline - size * 0.5"
        :font-size="size * 0.28"
        font-weight="500"
        :fill="rootColour"
      >™</text>

      <template v-if="endorse === 'beneath'">
        <line
          :x1="0"
          :x2="textWidth"
          :y1="hairY"
          :y2="hairY"
          :stroke="rootColour"
          :stroke-width="Math.max(1, size * 0.0144)"
          stroke-opacity="0.55"
        />
        <line :x1="0.5" :x2="0.5" :y1="hairY - tick" :y2="hairY + tick" :stroke="rootColour" stroke-opacity="0.55" />
        <line :x1="textWidth - 0.5" :x2="textWidth - 0.5" :y1="hairY - tick" :y2="hairY + tick" :stroke="rootColour" stroke-opacity="0.55" />
        <circle :cx="textWidth / 2" :cy="hairY" :r="size * 0.06" :fill="domainColour" />
        <text
          class="wm-endorse-text"
          :x="textWidth / 2"
          :y="hairY + size * 0.34"
          text-anchor="middle"
          :font-size="size * 0.2"
          font-weight="700"
          letter-spacing="0.24em"
        >
          <tspan :fill="rootColour">BY INTELI</tspan><tspan :fill="domainColour">MARIS</tspan>
        </text>
      </template>
    </svg>
  </span>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    root?: string
    domain?: string
    size?: number
    tm?: boolean
    animate?: boolean
    product?: boolean
    endorse?: 'none' | 'left' | 'beneath'
  }>(),
  { root: 'Inteli', domain: 'maris', size: 28, tm: false, animate: false, product: false, endorse: 'none' },
)

/* Measured on Red Hat Display 700 for the brand book: x-height 52% of the
   em, stem 12%, the line at 70% of the x-height and 0.4 of a stem thick. */
const X_HEIGHT = 0.52
const STEM = 0.12
const LINE_AT = 0.7
const LINE_WEIGHT = 0.4
const MIN_LINE_PX = 24

const uid = `wm${Math.random().toString(36).slice(2, 8)}`

const svgRef = ref<SVGSVGElement | null>(null)
const rootRef = ref<SVGTSpanElement | null>(null)
const lastRef = ref<SVGTSpanElement | null>(null)

const rootHead = computed(() => props.root.slice(0, -1))
const rootTail = computed(() => props.root.slice(-1))
const hasDot = computed(() => rootTail.value.toLowerCase() === 'i')
const tracking = computed(() => (props.product ? -0.02 : -0.025))
const showLine = computed(() => props.size >= MIN_LINE_PX)

const rootColour = 'var(--mark-root, #242c38)'
const domainColour = 'var(--mark-domain, #1b5e9e)'
const cutColour = 'var(--mark-cut, #ffffff)'

const baseline = computed(() => props.size * 0.84)
const cutHeight = computed(() => props.size * STEM * LINE_WEIGHT)
const cutY = computed(() => baseline.value - props.size * X_HEIGHT * LINE_AT - cutHeight.value / 2)
const dotClipBottom = computed(() => baseline.value - props.size * (X_HEIGHT + 0.04))
const hairY = computed(() => baseline.value + props.size * STEM * 1.3)
const tick = computed(() => props.size * STEM * 0.7)

const label = computed(() => `${props.root}${props.domain}`)

/* Estimates until the font has loaded and the glyphs can be measured. */
const rootBox = ref({ x: 0, width: props.root.length * props.size * 0.58 })
const lastX = ref(rootHead.value.length * props.size * 0.58)
const textWidth = ref((props.root.length + props.domain.length) * props.size * 0.55)

const height = computed(() => {
  if (props.endorse === 'beneath') return Math.ceil(hairY.value + props.size * 0.42)
  return Math.ceil(props.size * 1.1)
})
const width = computed(() => Math.ceil(textWidth.value + (props.tm ? props.size * 0.36 : 0) + 1))

const measure = () => {
  const root = rootRef.value
  const last = lastRef.value
  const svg = svgRef.value
  if (!root || !last || !svg) return
  try {
    const rb = root.getBBox()
    const lb = last.getBBox()
    const text = svg.querySelector<SVGTextElement>('.wm-text')
    const tb = text?.getBBox()
    rootBox.value = { x: rb.x, width: rb.width }
    lastX.value = lb.x
    if (tb) textWidth.value = tb.x + tb.width
  } catch {
    /* detached or hidden; the estimate stands */
  }
}

/* One animation, once per visit: the line draws in, the root fades up around
   it, the domain follows, the dot is last. */
const playing = ref(false)
const PLAYED_KEY = 'intelimaris-mark-played'

let fontsReady: Promise<unknown> | null = null

onMounted(async () => {
  fontsReady = document.fonts?.load(`700 ${props.size}px "Red Hat Display"`) ?? Promise.resolve()
  await fontsReady
  await nextTick()
  measure()

  if (!props.animate) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let played = false
  try {
    played = sessionStorage.getItem(PLAYED_KEY) === '1'
  } catch {
    played = false
  }
  if (reduced || played) return
  playing.value = true
  try {
    sessionStorage.setItem(PLAYED_KEY, '1')
  } catch {
    /* private mode; play anyway */
  }
})

watch(() => [props.root, props.domain, props.size], async () => {
  await nextTick()
  measure()
})

onBeforeUnmount(() => {
  fontsReady = null
})
</script>

<style scoped>
.wm {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--wm-size) * 0.32);
  vertical-align: middle;
  line-height: 0;
}

.wm-svg {
  display: block;
  overflow: visible;
  font-family: var(--font-display);
}

.wm-endorse-left {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.15em;
  font-family: var(--font-text);
  color: var(--mark-root, #242c38);
}

.wm-by {
  font-size: calc(var(--wm-size) * 0.3);
  line-height: 1;
  opacity: 0.7;
}

.wm-hairline {
  display: block;
  width: 1px;
  height: calc(var(--wm-size) * 1.1);
  background: var(--mark-root, #242c38);
  opacity: 0.55;
}

.wm-draw {
  opacity: 0;
}

/* --- The build ------------------------------------------------------------
   0–500 ms the line draws in · 500–800 the root fades up, already cut ·
   900–1200 the domain word · 1200–1350 the dot. Ease-out. Plays once.
   ------------------------------------------------------------------------ */

.wm--animate .wm-draw {
  transform-origin: left center;
  transform-box: fill-box;
  animation: wm-draw 500ms var(--ease-out) forwards, wm-fade-out 300ms var(--ease-out) 500ms forwards;
}

.wm--animate .wm-root,
.wm--animate .wm-cut {
  opacity: 0;
  animation: wm-fade-in 300ms var(--ease-out) 500ms forwards;
}

.wm--animate .wm-domain {
  opacity: 0;
  animation: wm-fade-in 300ms var(--ease-out) 900ms forwards;
}

.wm--animate .wm-dot,
.wm--animate .wm-tm {
  opacity: 0;
  animation: wm-fade-in 150ms var(--ease-out) 1200ms forwards;
}

@keyframes wm-draw {
  from {
    opacity: 1;
    transform: scaleX(0);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

@keyframes wm-fade-in {
  to {
    opacity: 1;
  }
}

@keyframes wm-fade-out {
  to {
    opacity: 0;
  }
}
</style>
