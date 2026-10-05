<template>
  <main class="editorial-page api-page" lang="en">
    <section class="editorial-shell guide-hero">
      <LanguageNote />
      <p class="editorial-eyebrow">InteliMaris public API</p>
      <div class="guide-heading">
        <h1>Ask the water a question. See the answer.</h1>
        <div>
          <p class="editorial-lede">Pick an everyday question, change the details, and watch the answer arrive three ways: the screen it becomes in InteliWaterwayz™, the request our apps send, and the answer the API gives back. No code, no account.</p>
          <ul class="api-facts">
            <li>Public reads need no sign-in</li>
            <li>Plain JSON over HTTPS</li>
            <li>The same API our apps use</li>
          </ul>
          <div class="api-hero-actions">
            <a href="#explore" class="editorial-button">Start exploring <span aria-hidden="true">↓</span></a>
            <RouterLink to="/mcp" class="editorial-text-link">Ask in plain words with an AI assistant <span aria-hidden="true">→</span></RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section id="explore" class="editorial-section section-wash api-explore">
      <div class="editorial-shell">
        <ApiExplorer v-if="now" :now="now" :initial="initial" @select="remember" />
        <ul v-else class="api-placeholder" aria-label="Questions you can try">
          <li v-for="q in API_QUERIES" :key="q.id"><strong>{{ q.question }}</strong> {{ q.plain }}</li>
        </ul>
      </div>
    </section>

    <section class="editorial-shell editorial-section">
      <div class="section-intro">
        <div>
          <p class="editorial-eyebrow">Reading an answer</p>
          <h2>Honest about what it doesn’t know.</h2>
        </div>
        <p>Every answer keeps three promises, in the app and in the API alike. They are why the screens above sometimes say less than you hoped.</p>
      </div>
      <ul class="api-promises">
        <li v-for="p in PROMISES" :key="p.title">
          <h3>{{ p.title }}</h3>
          <p>{{ p.text }}</p>
        </li>
      </ul>
    </section>

    <section class="editorial-section section-wash">
      <div class="editorial-shell">
        <div class="section-intro">
          <div>
            <p class="editorial-eyebrow">Building with it</p>
            <h2>Everything above is one request away.</h2>
          </div>
          <p>Copy any request from the explorer and it runs as it is. The live service is filling in around Fort Lauderdale first, so expect fewer results there than in the samples here.</p>
        </div>
        <dl class="api-dev">
          <div><dt>Address</dt><dd><code>{{ API_BASE }}</code></dd></div>
          <div><dt>Public data</dt><dd>Marinas, fit, stays, hazards, events, passage plans and live traffic. No key, no account.</dd></div>
          <div><dt>Your own data</dt><dd>Float plans, vessels and bookings need a signed-in InteliMaris account and only show what that account can already see.</dd></div>
          <div><dt>Units</dt><dd>Metres, knots, ISO 8601 times in UTC, and prices in cents with their currency.</dd></div>
        </dl>
      </div>
    </section>

    <GuideClosing title="Building something on the water?" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import ApiExplorer from '@/components/api/ApiExplorer.vue'
import GuideClosing from '@/components/audience/GuideClosing.vue'
import LanguageNote from '@/components/audience/LanguageNote.vue'
import { API_BASE, API_QUERIES } from '@/data/api-explorer'

const route = useRoute()
const router = useRouter()

/* The explorer works from the visitor's clock, so it renders after the page has loaded. */
const now = ref<Date | null>(null)
const initial = ref<string | undefined>(undefined)
onMounted(() => {
  now.value = new Date()
  initial.value = typeof route.query.q === 'string' ? route.query.q : undefined
})
const remember = (id: string) => { router.replace({ query: { ...route.query, q: id }, hash: route.hash }) }

const PROMISES = [
  { title: 'Unknown is an answer', text: 'Where a marina never stated a limit, “will she fit?” says unknown. It never reads a missing figure as zero, or guesses.' },
  { title: 'Reports say who reported them', text: 'A hazard from another skipper is labelled as a report, confirmed or not, and drawn apart from the chart. Expired reports disappear.' },
  { title: 'No feed is not no traffic', text: 'Live traffic always carries the feed’s own status. If the feed is down, you are told so, never shown an empty harbour.' },
]
</script>

<style scoped>
.api-facts { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; margin: 22px 0 0; padding: 0; }
.api-facts li { padding: 6px 12px; border-radius: var(--radius-pill); background: var(--domain-soft); color: var(--domain-ink); font-size: .8rem; font-weight: 600; }
.api-hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 24px; margin-top: 26px; }
.api-explore { scroll-margin-top: calc(var(--site-header-height, 110px)); }
.api-placeholder { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
.api-placeholder strong { display: block; font-size: 1.05rem; }
.api-promises { list-style: none; margin: 8px 0 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0 40px; }
.api-promises li { padding: 24px 0; border-top: 1px solid var(--border-medium); }
.api-promises h3 { font-size: 1.25rem; margin-bottom: 8px; }
.api-promises p { margin: 0; font-size: .95rem; color: var(--text-secondary); }
.api-dev { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0 32px; margin: 8px 0 0; }
.api-dev div { padding: 22px 0; border-top: 1px solid var(--border-medium); }
.api-dev dt { font-size: .7rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px; }
.api-dev dd { margin: 0; font-size: .94rem; color: var(--text-secondary); line-height: 1.6; }
.api-dev code { font: 600 .9rem ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; color: var(--domain-ink); word-break: break-all; }
@media (max-width: 1000px) {
  .api-promises { grid-template-columns: minmax(0, 1fr); }
  .api-dev { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 560px) {
  .api-dev { grid-template-columns: minmax(0, 1fr); }
}
</style>
