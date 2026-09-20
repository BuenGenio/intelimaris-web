<template>
  <main class="playbook">
    <header class="playbook-head">
      <div class="container-wide">
        <p class="t-overline">Interaction playbook · eight journeys under review</p>
        <h1 class="playbook-title">{{ current.title }}</h1>
        <p class="playbook-action">{{ current.action }}</p>
      </div>

      <nav class="playbook-tabs-wrap" aria-label="Journeys">
        <div class="container-wide">
          <div ref="tablist" class="playbook-tabs" role="tablist" @keydown="onKeydown">
            <button
              v-for="j in JOURNEYS"
              :key="j.id"
              :id="`tab-${j.id}`"
              role="tab"
              type="button"
              class="playbook-tab"
              :aria-selected="j.id === current.id"
              :aria-controls="`panel-${j.id}`"
              :tabindex="j.id === current.id ? 0 : -1"
              @click="select(j.id)"
            >
              <span class="playbook-tab-index t-num">{{ String(j.index).padStart(2, '0') }}</span>
              <span class="playbook-tab-title">{{ j.title }}</span>
            </button>
          </div>
        </div>
      </nav>
    </header>

    <section
      :id="`panel-${current.id}`"
      class="playbook-stage"
      role="tabpanel"
      :aria-labelledby="`tab-${current.id}`"
    >
      <div class="container-wide">
        <div class="playbook-frame">
          <!-- Journeys mount on the client only; the page itself pre-renders. -->
          <Suspense v-if="mounted">
            <component :is="current.component" :key="current.id" />
            <template #fallback>
              <div class="playbook-loading t-caption">Loading the journey…</div>
            </template>
          </Suspense>
          <div v-else class="playbook-loading t-caption">Loading the journey…</div>
        </div>
      </div>
    </section>

    <footer class="playbook-foot">
      <div class="container-wide playbook-foot-grid">
        <div>
          <p class="t-overline">What it proves</p>
          <p class="playbook-foot-text">{{ current.proves }}</p>
        </div>
        <div>
          <p class="t-overline">What it stands on</p>
          <p class="playbook-foot-text">{{ current.backend }}</p>
        </div>
        <div class="playbook-foot-nav">
          <button v-if="prev" type="button" class="link-arrow link-arrow--back" @click="select(prev.id)">{{ prev.title }}</button>
          <button v-if="next" type="button" class="link-arrow" @click="select(next.id)">{{ next.title }}</button>
        </div>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { JOURNEYS } from '@/data/playbook/journeys'

const route = useRoute()
const router = useRouter()
const tablist = ref<HTMLElement | null>(null)
const mounted = ref(false)

const fromHash = (hash: string) => JOURNEYS.find((j) => `#${j.id}` === hash)
const current = computed(() => fromHash(route.hash) ?? JOURNEYS[0]!)
const index = computed(() => JOURNEYS.findIndex((j) => j.id === current.value.id))
const prev = computed(() => JOURNEYS[index.value - 1])
const next = computed(() => JOURNEYS[index.value + 1])

const select = (id: string) => router.replace({ hash: `#${id}` })

const onKeydown = async (e: KeyboardEvent) => {
  const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
  if (!delta) return
  e.preventDefault()
  const target = JOURNEYS[(index.value + delta + JOURNEYS.length) % JOURNEYS.length]!
  await select(target.id)
  await nextTick()
  tablist.value?.querySelector<HTMLElement>(`#tab-${target.id}`)?.focus()
}

/* Keep the selected tab in view on narrow screens. */
watch(current, async () => {
  await nextTick()
  tablist.value
    ?.querySelector<HTMLElement>(`#tab-${current.value.id}`)
    ?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
})

onMounted(() => {
  mounted.value = true
  if (!fromHash(route.hash)) void select(JOURNEYS[0]!.id)
})
</script>

<style scoped>
.playbook {
  background: var(--surface-base);
  min-height: 100vh;
  padding-top: 5.25rem;
}

.playbook-head {
  padding-top: var(--space-8);
}

.playbook-title {
  margin-top: var(--space-3);
  font-size: var(--type-h1);
  letter-spacing: var(--type-h1-ls);
  line-height: var(--type-h1-lh);
}

.playbook-action {
  margin: var(--space-3) 0 0;
  max-width: 60ch;
  font-family: var(--font-text);
  font-size: var(--type-lede);
  line-height: var(--type-lede-lh);
  color: var(--text-secondary);
}

.playbook-tabs-wrap {
  position: sticky;
  top: 4.75rem;
  z-index: 20;
  margin-top: var(--space-6);
  background: color-mix(in srgb, var(--surface-base) 92%, transparent);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
}

.playbook-tabs {
  display: flex;
  gap: 0.25rem;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 0.5rem 0;
  -webkit-overflow-scrolling: touch;
}

.playbook-tabs::-webkit-scrollbar {
  display: none;
}

.playbook-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  padding: 0.5rem 0.875rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--text-secondary);
  font-family: var(--font-text);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 220ms var(--ease-out), color 220ms var(--ease-out);
}

.playbook-tab:hover {
  background: var(--surface-soft);
  color: var(--text-primary);
}

.playbook-tab[aria-selected='true'] {
  background: var(--slate);
  color: #ffffff;
}

.playbook-tab-index {
  font-size: 0.75rem;
  opacity: 0.7;
}

.playbook-stage {
  padding: var(--space-2) 0 var(--space-12);
}

.playbook-frame {
  min-height: 60vh;
}

.playbook-loading {
  padding: var(--space-12) 0;
}

.playbook-foot {
  border-top: 1px solid var(--border-subtle);
  padding: var(--space-8) 0 var(--space-16);
}

.playbook-foot-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 0.8fr);
  gap: var(--space-8);
}

.playbook-foot-text {
  margin: var(--space-2) 0 0;
  font-family: var(--font-text);
  font-size: var(--type-body-sm);
  color: var(--text-secondary);
  max-width: 44ch;
}

.playbook-foot-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-3);
}

.link-arrow--back::after {
  content: none;
}

.link-arrow--back::before {
  content: '←';
}

@media (max-width: 900px) {
  .playbook-foot-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .playbook-tabs-wrap {
    top: 4.5rem;
  }
}
</style>
