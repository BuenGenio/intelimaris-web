<template>
  <div ref="root" class="platform-menu" @keydown.esc.stop="close(true)" @focusout="onFocusOut">
    <!-- The whole entry opens the menu; the overview page is its first item. -->
    <button ref="trigger" type="button" class="platform-trigger" :class="{ 'is-current': onPlatform }" :aria-expanded="open" aria-controls="platform-options" aria-haspopup="true" @click="toggle">Platform &amp; software <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m4 6 4 4 4-4" /></svg></button>
    <div v-if="open" id="platform-options" class="platform-popover">
      <RouterLink v-for="link in PLATFORM_NAVIGATION" :key="link.to" :to="link.to"><span>{{ link.label }}</span><small>{{ link.detail }}</small></RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { PLATFORM_NAVIGATION } from '@/data/navigation'
const open = ref(false)
const root = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const route = useRoute()
const onPlatform = computed(() => PLATFORM_NAVIGATION.some((link) => route.path === link.to || route.path.startsWith(`${link.to}/`)))
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
.platform-trigger { display:inline-flex; align-items:center; gap:6px; padding:8px 10px; margin:0 -10px; min-height:40px; border:0; border-radius:var(--radius-pill); background:transparent; color:var(--text-primary); font:500 .86rem var(--font-text); white-space:nowrap; cursor:pointer; }
.platform-trigger svg { color:var(--text-secondary); transition:transform 160ms; }
.platform-trigger:hover, .platform-trigger[aria-expanded='true'], .platform-trigger.is-current { color:var(--domain-ink); }
.platform-trigger[aria-expanded='true'] { background:var(--domain-soft); }
.platform-trigger[aria-expanded='true'] svg { transform:rotate(180deg); }
.platform-popover { position:absolute; top:calc(100% + 10px); left:-10px; width:292px; padding:8px; border-radius:var(--radius-lg); background:var(--surface-page); border:1px solid var(--border-medium); box-shadow:0 12px 40px rgba(5,20,38,.18); }
.platform-popover a { display:grid; gap:5px; padding:14px 12px; border-radius:var(--radius-md); }
.platform-popover a:hover { background:var(--domain-soft); }
.platform-popover span { font-size:.84rem; font-weight:600; }
.platform-popover small { color:var(--text-secondary); font-size:.71rem; font-weight:400; }
</style>
