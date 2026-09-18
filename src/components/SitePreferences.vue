<template>
  <div ref="root" class="site-preferences" @keydown.esc.stop="close(true)" @focusout="onFocusOut">
    <div class="preference-control">
      <button ref="themeButton" class="preference-trigger appearance-trigger" type="button" :aria-label="`Appearance: ${appearanceLabel}. Change appearance`" :title="`Appearance: ${appearanceLabel}`" :aria-expanded="open === 'theme'" aria-controls="appearance-options" aria-haspopup="dialog" @click="toggle('theme')"><AppearanceIcon :mode="appearance" /></button>
      <div v-if="open === 'theme'" id="appearance-options" class="preference-popover" role="dialog" aria-labelledby="appearance-title">
        <p id="appearance-title">Appearance</p>
        <button v-for="choice in appearances" :key="choice.value" type="button" :aria-pressed="appearance === choice.value" @click="selectTheme(choice.value)"><AppearanceIcon :mode="choice.value" /><span>{{ choice.label }}</span><span v-if="appearance === choice.value" aria-hidden="true">✓</span></button>
        <small>Auto follows your device.</small>
      </div>
    </div>
    <div class="preference-control">
      <button ref="languageButton" class="preference-trigger language-trigger" type="button" :aria-label="`Language: ${languageData[currentLanguage].name}. Change language`" :aria-expanded="open === 'language'" aria-controls="language-options" aria-haspopup="dialog" @click="toggle('language')"><img :src="languageData[currentLanguage].flag" alt="" width="22" height="15" /><span>{{ languageData[currentLanguage].code }}</span><span aria-hidden="true">⌄</span></button>
      <div v-if="open === 'language'" id="language-options" class="preference-popover language-popover" role="dialog" aria-labelledby="language-title">
        <p id="language-title">Language</p>
        <button v-for="lang in languages" :key="lang" type="button" :lang="lang" :aria-pressed="currentLanguage === lang" @click="selectLanguage(lang)"><img :src="languageData[lang].flag" alt="" width="22" height="15" /><span>{{ languageData[lang].name }}</span><span v-if="currentLanguage === lang" aria-hidden="true">✓</span></button>
        <small lang="en">New guides are in English.</small>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppearanceIcon from './AppearanceIcon.vue'
import { useTheme, type Appearance } from '@/composables/useTheme'
import { useI18n } from '@/composables/useI18n'
import type { Language } from '@/i18n/translations'
const { appearance, setTheme } = useTheme()
const { currentLanguage, languageData, setLanguage } = useI18n()
const appearances: { value: Appearance; label: string }[] = [{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }, { value: 'auto', label: 'Auto' }]
const appearanceLabel = computed(() => appearances.find(item => item.value === appearance.value)!.label)
const languages: Language[] = ['en', 'es', 'el', 'uk']
const open = ref<'theme' | 'language' | null>(null)
const root = ref<HTMLElement | null>(null)
const themeButton = ref<HTMLButtonElement | null>(null)
const languageButton = ref<HTMLButtonElement | null>(null)
const route = useRoute()
async function close(restoreFocus = false) {
  const button = open.value === 'theme' ? themeButton.value : languageButton.value
  open.value = null
  if (restoreFocus) { await nextTick(); button?.focus() }
}
async function toggle(control: 'theme' | 'language') {
  open.value = open.value === control ? null : control
  if (open.value) { await nextTick(); root.value?.querySelector<HTMLButtonElement>('.preference-popover button[aria-pressed="true"]')?.focus() }
}
function selectTheme(value: Appearance) { setTheme(value); close(true) }
function selectLanguage(value: Language) { setLanguage(value); close(true) }
function onPointerDown(event: PointerEvent) { if (!root.value?.contains(event.target as Node)) close() }
function onFocusOut(event: FocusEvent) { if (event.relatedTarget && !root.value?.contains(event.relatedTarget as Node)) close() }
watch(() => route.fullPath, () => close())
onMounted(() => document.addEventListener('pointerdown', onPointerDown))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerDown))
</script>
<style scoped>
.site-preferences { display:flex; align-items:center; gap:8px; }
.preference-control { position:relative; }
.preference-trigger { display:flex; align-items:center; justify-content:center; gap:7px; min-height:40px; padding:6px; border:0; border-radius:5px; background:transparent; color:var(--text-secondary); font:500 .75rem var(--font-text); cursor:pointer; white-space:nowrap; }
.appearance-trigger { width:38px; }
.preference-trigger:hover, .preference-trigger[aria-expanded='true'] { background:var(--domain-soft); color:var(--domain-ink); }
.language-trigger img, .preference-popover img { object-fit:cover; border-radius:2px; box-shadow:0 0 0 1px var(--border-subtle); flex-shrink:0; }
.preference-popover { position:absolute; top:calc(100% + 12px); right:0; width:206px; padding:10px; background:var(--surface-page); border:1px solid var(--border-medium); box-shadow:0 12px 40px rgba(5,20,38,.18); border-radius:8px; }
.preference-popover p { margin:4px 9px 8px; font:500 .72rem var(--font-text); color:var(--text-muted); }
.preference-popover button { width:100%; display:flex; align-items:center; gap:12px; min-height:44px; border:0; border-radius:4px; padding:10px; background:transparent; color:var(--text-primary); font:500 .82rem var(--font-text); cursor:pointer; text-align:left; }
.preference-popover button > span:nth-child(2) { flex:1; }
.preference-popover button:hover, .preference-popover button[aria-pressed='true'] { background:var(--domain-soft); color:var(--domain-ink); }
.preference-popover small { display:block; margin:10px 9px 4px; font:400 .68rem var(--font-text); color:var(--text-muted); }
@media(max-width:560px) { .site-preferences { gap:2px; } .language-trigger { gap:5px; } .language-trigger > span:last-child { display:none; } .preference-popover { position:fixed; top:66px; right:18px; } }
@media(max-width:360px) { .language-trigger > span { display:none; } .appearance-trigger { width:30px; } }
</style>
