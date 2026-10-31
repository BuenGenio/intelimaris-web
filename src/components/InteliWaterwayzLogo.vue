<template>
  <span
    class="iw-logo"
    :style="{ '--iw-h': `${height}px` }"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
  >
    <img :src="ART[variant]" alt="" decoding="async" />
  </span>
</template>

<script setup lang="ts">
/* The supplied InteliWaterwayz® lockup on its 578 × 139 canvas. `blue` and
   `reverse` are byte copies of the approved masters; `blue-cyan` is the RGB
   Blue master with only the WATERWAYZ lettering set to the icon's cyan
   (#30acc8), at Eugene's direction. The wrapper crops the masters' built-in
   clear space so the visible lockup, not the canvas, is `height` tall. The
   header shows `blue-cyan` in both themes; the always-dark footer shows
   `reverse`. */
export type InteliWaterwayzLogoVariant = 'blue' | 'blue-cyan' | 'reverse'

withDefaults(
  defineProps<{
    variant?: InteliWaterwayzLogoVariant
    /** Height of the visible lockup in px. */
    height?: number
    /** Set when the logo stands alone; inside a link that already names it, leave it off. */
    label?: string
  }>(),
  { variant: 'blue-cyan', height: 32, label: '' },
)

const base = import.meta.env.BASE_URL
const ART: Record<InteliWaterwayzLogoVariant, string> = {
  blue: `${base}assets/inteliwaterwayz-blue.png`,
  'blue-cyan': `${base}assets/inteliwaterwayz-blue-cyan.png`,
  reverse: `${base}assets/inteliwaterwayz-reverse.png`,
}
</script>

<style scoped>
/* The artwork sits at x 101–523, y 47–104 of the 578 × 139 canvas; two
   pixels of air are kept on every side. */
.iw-logo {
  --iw-x: 99;
  --iw-y: 45;
  --iw-w: 426;
  --iw-ht: 61;
  position: relative;
  display: inline-block;
  width: calc(var(--iw-h) * var(--iw-w) / var(--iw-ht));
  max-width: 100%;
  aspect-ratio: var(--iw-w) / var(--iw-ht);
  overflow: hidden;
  vertical-align: middle;
  line-height: 0;
}

.iw-logo img {
  position: absolute;
  left: calc(-100% * var(--iw-x) / var(--iw-w));
  top: calc(-100% * var(--iw-y) / var(--iw-ht));
  width: calc(100% * 578 / var(--iw-w));
  height: calc(100% * 139 / var(--iw-ht));
  max-width: none;
  display: block;
}
</style>
