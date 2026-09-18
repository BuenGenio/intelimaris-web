<template>
  <div ref="root" class="platform-menu" @keydown.esc.stop="close(true)" @focusout="onFocusOut">
    <RouterLink to="/capabilities">Platform &amp; software</RouterLink>
    <button ref="trigger" type="button" class="platform-trigger" aria-label="Open platform menu" :aria-expanded="open" aria-controls="platform-options" @click="toggle"><svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg></button>
    <div v-if="open" id="platform-options" class="platform-popover">
      <RouterLink v-for="link in PLATFORM_NAVIGATION" :key="link.to" :to="link.to"><span>{{ link.label }}</span><small>{{ link.detail }}</small></RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { PLATFORM_NAVIGATION } from '@/data/navigation'
const open = ref(false)
const root = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const route = useRoute()
async function close(focus = false) { open.value = false; if (focus) { await nextTick(); trigger.value?.focus() } }
async function toggle() { open.value = !open.value; if (open.value) { await nextTick(); root.value?.querySelector<HTMLAnchorElement>('.platform-popover a')?.focus() } }
function onPointerDown(event: PointerEvent) { if (!root.value?.contains(event.target as Node)) close() }
function onFocusOut(event: FocusEvent) { if (event.relatedTarget && !root.value?.contains(event.relatedTarget as Node)) close() }
watch(() => route.fullPath, () => close())
onMounted(() => document.addEventListener('pointerdown', onPointerDown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerDown))
</script>
<style scoped>
.platform-menu { display:flex; align-items:center; position:relative; }
.platform-trigger { display:grid; place-items:center; padding:0; margin-left:2px; width:27px; height:40px; border:0; border-radius:4px; background:transparent; color:var(--text-secondary); cursor:pointer; }
.platform-trigger:hover, .platform-trigger[aria-expanded='true'] { color:var(--domain-ink); background:var(--domain-soft); }
.platform-popover { position:absolute; top:calc(100% + 12px); left:-18px; width:292px; padding:8px; border-radius:8px; background:var(--surface-page); border:1px solid var(--border-medium); box-shadow:0 12px 40px rgba(5,20,38,.18); }
.platform-popover a { display:grid; gap:5px; padding:14px 12px; border-radius:4px; }
.platform-popover a:hover { background:var(--domain-soft); }
.platform-popover span { font-size:.84rem; font-weight:600; }
.platform-popover small { color:var(--text-secondary); font-size:.71rem; font-weight:400; }
</style>
