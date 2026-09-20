<template>
  <section class="as" :data-frame="frame">
    <div class="as-topline">
      <p class="t-overline as-eyebrow">WaterWayz · every screen · sample data</p>
      <p class="as-hint t-caption">{{ group.app }} · <span class="t-num">{{ total }}</span> screens · {{ current.summary }}</p>
    </div>

    <!-- Phones get a native dropdown; wide screens a grouped rail. -->
    <div class="as-picker">
      <label class="as-select">
        <span class="sr-only">Screen</span>
        <select :value="current.id" @change="pick(($event.target as HTMLSelectElement).value)">
          <optgroup v-for="g in SCREEN_GROUPS" :key="g.id" :label="`${g.label} · ${g.app}`">
            <option v-for="s in g.screens" :key="s.id" :value="s.id">{{ s.label }}</option>
          </optgroup>
        </select>
        <span class="as-select-face"><span class="as-kind" :data-kind="group.kind"></span><span class="as-select-text"><strong>{{ current.label }}</strong><span>{{ group.label }}</span></span><span aria-hidden="true">⌄</span></span>
      </label>
      <div class="as-steps">
        <button type="button" class="as-step" aria-label="Previous screen" @click="step(-1)">←</button>
        <span class="t-num as-count">{{ index + 1 }} / {{ total }}</span>
        <button type="button" class="as-step" aria-label="Next screen" @click="step(1)">→</button>
      </div>
    </div>

    <div class="as-body">
      <nav class="as-rail" aria-label="Screens">
        <div v-for="g in SCREEN_GROUPS" :key="g.id" class="as-rail-group" :class="{ 'is-open': openGroup === g.id }">
          <button type="button" class="as-rail-head" :aria-expanded="openGroup === g.id" @click="openGroup = openGroup === g.id ? '' : g.id">
            <span class="as-kind" :data-kind="g.kind"></span>
            <span class="as-rail-label"><strong>{{ g.label }}</strong><span>{{ g.app }} · <span class="t-num">{{ g.screens.length }}</span></span></span>
            <span class="as-rail-caret" aria-hidden="true">⌄</span>
          </button>
          <ul v-show="openGroup === g.id" class="as-rail-list">
            <li v-for="s in g.screens" :key="s.id">
              <button type="button" class="as-rail-item" :aria-current="s.id === current.id ? 'true' : undefined" @click="pick(s.id)">{{ s.label }}</button>
            </li>
          </ul>
        </div>
      </nav>

      <div class="as-stage">
        <!-- phone -->
        <div v-if="frame === 'phone'" class="as-phone">
          <div class="as-phone-status"><span class="t-num">9:41</span><span class="as-notch" aria-hidden="true"></span><span class="as-signal" aria-hidden="true"><i></i><i></i><i></i><b></b></span></div>
          <div class="as-phone-top">
            <span class="as-phone-ws"><span class="as-kind" :data-kind="group.kind"></span>{{ workspaceName }}</span>
            <span class="as-phone-online"><span class="scr-dot" data-tone="safe"></span>Online</span>
          </div>
          <div ref="scroller" class="as-phone-screen">
            <Suspense :key="current.id">
              <component :is="view" :key="current.id" class="scr" :data-kind="group.kind" />
              <template #fallback><p class="as-loading">Loading…</p></template>
            </Suspense>
          </div>
          <div class="as-phone-tabs" role="presentation">
            <span v-for="d in phoneDoors" :key="d.id" class="as-phone-tab" :class="{ 'is-on': d.id === door }"><ScrIcon :name="doorIcon(d.id)" /><span>{{ d.label }}</span></span>
          </div>
          <span class="as-home" aria-hidden="true"></span>
        </div>

        <!-- desktop -->
        <div v-else class="as-desktop">
          <div class="as-browser"><span class="as-lights" aria-hidden="true"><i></i><i></i><i></i></span><span class="as-url"><ScrIcon name="lock" /><span class="t-num">{{ url }}</span></span></div>
          <div class="as-shell">
            <div class="as-shell-top">
              <span class="as-shell-mark">WaterWayz<sup>™</sup></span>
              <span class="as-shell-ws"><span class="as-kind" :data-kind="group.kind"></span>{{ workspaceName }} <span aria-hidden="true">⌄</span></span>
              <span class="scr-spacer"></span>
              <span class="as-shell-online"><span class="scr-dot" data-tone="safe"></span>Online</span>
              <span class="as-shell-bell"><ScrIcon name="bell" /><i>3</i></span>
              <span class="scr-avatar">SM</span>
            </div>
            <div class="as-shell-body">
              <ul class="as-shell-rail">
                <li v-for="d in group.doors" :key="d.id" :class="{ 'is-on': d.id === door }"><ScrIcon :name="doorIcon(d.id)" /><span>{{ d.label }}</span></li>
              </ul>
              <div ref="scroller" class="as-shell-main">
                <Suspense :key="current.id">
                  <component :is="view" :key="current.id" class="scr scr--desktop" :data-kind="group.kind" />
                  <template #fallback><p class="as-loading">Loading…</p></template>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="as-foot t-caption">Screens are re-drawn from the app with sample data. Path in the app: <span class="t-num">{{ current.path }}</span></p>
  </section>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { ALL_SCREENS, SCREEN_GROUPS, findScreen, groupOf } from '@/data/screens'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const props = defineProps<{ initial?: string }>()
const total = ALL_SCREENS.length
const currentId = ref(findScreen(props.initial)?.id ?? ALL_SCREENS[0]!.id)
const current = computed(() => findScreen(currentId.value) ?? ALL_SCREENS[0]!)
const group = computed(() => groupOf(current.value.id)!)
const index = computed(() => ALL_SCREENS.findIndex((s) => s.id === current.value.id))
const frame = computed(() => current.value.frame ?? group.value.frame)
const door = computed(() => current.value.door ?? group.value.doors[0]?.id)
const openGroup = ref(group.value.id)
const scroller = ref<HTMLElement | null>(null)

/* Each screen's component is loaded once and cached by id. */
const cache = new Map<string, ReturnType<typeof defineAsyncComponent>>()
const view = computed(() => {
  const s = current.value
  let c = cache.get(s.id)
  if (!c) { c = defineAsyncComponent(s.load); cache.set(s.id, c) }
  return c
})

const workspaceName = computed(() => ({ vessel: 'Wanderer', marina: 'Bahia Mar', 'private-marina': 'Isle of Venice dock', business: 'Coconuts', maintenance: 'Lauderdale Marine Service', platform: 'Operator console', account: 'Sam Miller' })[group.value.kind])
const url = computed(() => `app.waterwayz.dev${current.value.path}`)
const phoneDoors = computed(() => group.value.doors.slice(0, 5))
const ICONS: Record<string, string> = { overview: 'gauge', dashboard: 'gauge', map: 'map', vessel: 'vessel', sensors: 'radio', monitoring: 'activity', maintenance: 'wrench', crew: 'users', chat: 'message', dockpass: 'anchor', settings: 'settings', bookings: 'calendar', berths: 'map', crm: 'users', customers: 'users', finance: 'receipt', sales: 'list', operations: 'alert', comms: 'message', reports: 'chart', home: 'home', explore: 'compass', account: 'user', notifications: 'bell', work: 'wrench', technicians: 'users', company: 'store', listing: 'store', requests: 'calendar', staff: 'users', marinas: 'anchor', users: 'users', fleet: 'vessel', hazards: 'alert', billing: 'receipt', audit: 'list', pipeline: 'activity', vessels: 'vessel', accounts: 'users', workspaces: 'store', emergencies: 'alert', people: 'users', gateways: 'radio', places: 'pin', catalog: 'list', models: 'list', events: 'calendar', claims: 'check', departures: 'compass', lorawan: 'radio', cells: 'map', bridges: 'wave', 'fuel-reports': 'fuel' }
const doorIcon = (id: string) => ICONS[id] ?? 'dot'

function pick(id: string) {
  if (!findScreen(id)) return
  currentId.value = id
  openGroup.value = groupOf(id)!.id
}
function step(by: number) {
  pick(ALL_SCREENS[(index.value + by + total) % total]!.id)
}
watch(currentId, () => { scroller.value?.scrollTo({ top: 0 }) })
</script>

<style scoped>
.as { display: grid; gap: 14px; }
.as-topline { display: flex; align-items: baseline; justify-content: space-between; gap: 10px 24px; flex-wrap: wrap; }
.as-eyebrow { margin: 0; color: var(--domain-ink); }
.as-hint { margin: 0; color: var(--text-secondary); max-width: 70ch; }
.as-picker { display: none; gap: 10px; align-items: stretch; }
.as-select { position: relative; flex: 1; min-width: 0; }
.as-select select { position: absolute; inset: 0; width: 100%; opacity: 0; cursor: pointer; }
.as-select-face { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 10px; min-height: 54px; padding: 8px 14px; border: 1px solid var(--sky-line, var(--border-medium)); border-radius: var(--radius-lg); background: var(--surface-page); pointer-events: none; }
.as-select-text { display: grid; line-height: 1.2; min-width: 0; }
.as-select-text strong { font-size: 0.95rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.as-select-text span { font-size: 0.74rem; color: var(--text-secondary); }
.as-steps { display: flex; align-items: center; gap: 4px; }
.as-step { width: 44px; height: 54px; border: 1px solid var(--border-medium); border-radius: var(--radius-lg); background: var(--surface-page); color: var(--text-primary); font-size: 1.1rem; cursor: pointer; }
.as-count { font-size: 0.78rem; color: var(--text-muted); padding: 0 6px; white-space: nowrap; }
.as-body { display: grid; grid-template-columns: 250px minmax(0, 1fr); gap: 20px; align-items: start; }
.as-rail { display: grid; gap: 4px; max-height: var(--stage-cap, 720px); overflow-y: auto; padding-right: 4px; align-content: start; }
.as-rail-head { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); background: var(--surface-page); color: var(--text-primary); text-align: left; cursor: pointer; font-family: var(--font-text); }
.as-rail-group.is-open .as-rail-head { border-color: var(--domain); }
.as-rail-label { display: grid; line-height: 1.2; min-width: 0; }
.as-rail-label strong { font-size: 0.86rem; font-weight: 600; }
.as-rail-label span { font-size: 0.7rem; color: var(--text-muted); }
.as-rail-caret { color: var(--text-muted); transition: transform 160ms; }
.as-rail-group.is-open .as-rail-caret { transform: rotate(180deg); }
.as-rail-list { list-style: none; margin: 2px 0 6px; padding: 0 0 0 12px; display: grid; gap: 1px; }
.as-rail-item { width: 100%; padding: 7px 10px; border: 0; border-radius: var(--radius-sm); background: transparent; color: var(--text-secondary); text-align: left; font: 500 0.82rem var(--font-text); cursor: pointer; }
.as-rail-item:hover { background: var(--surface-raised); color: var(--text-primary); }
.as-rail-item[aria-current='true'] { background: var(--domain); color: #fff; }
.as-kind { width: 10px; height: 10px; border-radius: 50%; background: #2c3d68; flex-shrink: 0; }
.as-kind[data-kind='vessel'] { background: #4274bb; }
.as-kind[data-kind='marina'] { background: #14919b; }
.as-kind[data-kind='private-marina'] { background: #1f6e5e; }
.as-kind[data-kind='business'] { background: #d9a21b; }
.as-kind[data-kind='maintenance'] { background: #b7472a; }
.as-stage { display: grid; place-items: start center; min-width: 0; }
/* phone */
.as-phone { position: relative; width: 390px; max-width: 100%; height: min(820px, var(--stage-cap, 820px)); display: grid; grid-template-rows: auto auto minmax(0, 1fr) auto; background: #f3f5f9; border-radius: 44px; border: 10px solid #1a2030; box-shadow: var(--sky-shadow, 0 24px 60px rgba(17, 45, 76, 0.2)); overflow: hidden; color: #182036; }
.as-phone-status { position: relative; display: flex; justify-content: space-between; align-items: center; padding: 12px 24px 4px; font: 600 13px var(--font-text); }
.as-notch { position: absolute; left: 50%; top: 8px; width: 110px; height: 30px; transform: translateX(-50%); background: #1a2030; border-radius: 20px; }
.as-signal { display: flex; align-items: flex-end; gap: 2px; height: 11px; }
.as-signal i { width: 3px; background: #182036; border-radius: 1px; }
.as-signal i:nth-child(1) { height: 4px; } .as-signal i:nth-child(2) { height: 6px; } .as-signal i:nth-child(3) { height: 8px; }
.as-signal b { width: 22px; height: 10px; margin-left: 5px; border: 1.5px solid #182036; border-radius: 3px; background: linear-gradient(90deg, #182036 70%, transparent 70%); }
.as-phone-top { display: flex; justify-content: space-between; align-items: center; padding: 8px 16px 6px; font: 600 12px var(--font-text); }
.as-phone-ws { display: inline-flex; align-items: center; gap: 7px; padding: 4px 10px 4px 8px; border-radius: 999px; background: #fff; border: 1px solid #dce1ea; }
.as-phone-online { display: inline-flex; align-items: center; gap: 6px; font-weight: 500; color: #66708a; font-size: 11.5px; }
.as-phone-screen { overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; }
.as-phone-screen > .scr { min-height: 100%; }
.as-phone-tabs { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; padding: 8px 6px 18px; background: #fff; border-top: 1px solid #dce1ea; }
.as-phone-tab { display: grid; justify-items: center; gap: 3px; font: 500 10px var(--font-text); color: #66708a; }
.as-phone-tab.is-on { color: #2c3d68; font-weight: 600; }
.as-home { position: absolute; left: 50%; bottom: 6px; width: 120px; height: 4px; border-radius: 2px; background: #1a2030; transform: translateX(-50%); }
/* desktop */
.as-desktop { width: 100%; max-width: 1180px; border-radius: 18px; border: 1px solid var(--sky-line, var(--border-medium)); box-shadow: var(--sky-shadow, 0 24px 60px rgba(17, 45, 76, 0.16)); overflow: hidden; background: #fff; color: #182036; }
.as-browser { display: flex; align-items: center; gap: 14px; padding: 9px 14px; background: #eaedf3; border-bottom: 1px solid #dce1ea; }
.as-lights { display: flex; gap: 6px; }
.as-lights i { width: 11px; height: 11px; border-radius: 50%; background: #ff5f57; }
.as-lights i:nth-child(2) { background: #febc2e; } .as-lights i:nth-child(3) { background: #28c840; }
.as-url { display: inline-flex; align-items: center; gap: 6px; flex: 1; max-width: 520px; margin: 0 auto; padding: 5px 12px; border-radius: 8px; background: #fff; font-size: 12px; color: #66708a; }
.as-shell { display: grid; grid-template-rows: auto minmax(0, 1fr); height: min(760px, var(--stage-cap, 760px)); }
.as-shell-top { display: flex; align-items: center; gap: 14px; padding: 0 16px; height: 52px; border-bottom: 1px solid #dce1ea; background: #fff; font: 500 13px var(--font-text); }
.as-shell-mark { font: 700 15px var(--font-display); letter-spacing: -0.02em; color: #2c3d68; }
.as-shell-mark sup { font-size: 8px; }
.as-shell-ws { display: inline-flex; align-items: center; gap: 7px; padding: 5px 10px; border-radius: 999px; border: 1px solid #dce1ea; font-weight: 600; }
.as-shell-online { display: inline-flex; align-items: center; gap: 6px; color: #66708a; font-size: 12px; }
.as-shell-bell { position: relative; color: #2e3650; display: inline-flex; }
.as-shell-bell i { position: absolute; top: -6px; right: -8px; min-width: 16px; height: 16px; padding: 0 4px; border-radius: 999px; background: #c8322b; color: #fff; font: 700 10px/16px var(--font-text); text-align: center; font-style: normal; }
.as-shell-body { display: grid; grid-template-columns: 200px minmax(0, 1fr); min-height: 0; }
.as-shell-rail { list-style: none; margin: 0; padding: 12px 10px; display: grid; align-content: start; gap: 2px; background: #f3f5f9; border-right: 1px solid #dce1ea; overflow-y: auto; }
.as-shell-rail li { display: flex; align-items: center; gap: 10px; min-height: 40px; padding: 8px 12px; border-radius: 8px; font: 500 13px var(--font-text); color: #66708a; }
.as-shell-rail li.is-on { background: #dce6f4; color: #2b4c82; font-weight: 600; }
.as-shell-main { overflow-y: auto; min-height: 0; scrollbar-width: thin; background: #f3f5f9; }
.as-shell-main > .scr { min-height: 100%; }
.as-loading { padding: 40px; color: #8e99af; text-align: center; font-family: var(--font-text); }
.as-foot { margin: 0; color: var(--text-muted); }
@media (max-width: 1100px) {
  .as-body { grid-template-columns: minmax(0, 1fr); }
  .as-rail { display: none; }
  .as-picker { display: flex; }
  .as-shell-body { grid-template-columns: 56px minmax(0, 1fr); }
  .as-shell-rail li span { display: none; }
  .as-shell-rail li { justify-content: center; padding: 8px; }
}
@media (max-width: 640px) {
  .as-shell-top .as-shell-online, .as-browser .as-url { display: none; }
  .as-phone { height: min(760px, var(--stage-cap, 760px)); border-radius: 36px; border-width: 8px; }
  .as-count { display: none; }
}
</style>
