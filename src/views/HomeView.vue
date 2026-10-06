<template>
  <main class="editorial-page home-audience serif-headings" lang="en">
    <div class="editorial-shell"><LanguageNote /></div>
    <HomePlanBar />
    <p class="home-news"><span class="editorial-shell"><b>New</b> Try the public API without writing code, or ask the platform in plain words. <RouterLink to="/api">Take a look</RouterLink></span></p>

    <PhotoHero
      :src="`${base}assets/hero-dusk-1600.webp`"
      :srcset="`${base}assets/hero-dusk-768.webp 768w, ${base}assets/hero-dusk-1280.webp 1280w, ${base}assets/hero-dusk-1600.webp 1600w`"
      :width="1600"
      :height="757"
      position="72% 50%"
      narrow-position="78% 50%"
    >
      <!-- The one heading allowed to wrap: a photo hero wants a two-line headline (useFitHeadings opt-out). -->
      <h1 data-no-fit>Your day on the water, <em>connected.</em></h1>
      <p class="photo-hero-lede">Plan the passage. Keep an eye on the vessel. Prepare the arrival. InteliMARIS™ brings it together through InteliWaterwayz™.</p>
      <div class="photo-hero-actions">
        <button type="button" class="photo-hero-start" @click="start(audience?.id, $event.currentTarget as HTMLElement)">Start free</button>
        <RouterLink to="/contact" class="photo-hero-link">Book a demo</RouterLink>
      </div>
      <p class="photo-hero-tags"><span>One app</span><span>Passage, vessel and berth</span><span>27,000 marinas</span></p>
    </PhotoHero>

    <div class="home-highlights"><HomeHighlights /></div>

    <section id="choose" class="editorial-shell home-choose">
      <h2 class="home-center-title">Where do you come in?</h2>
      <p class="home-center-lede">Choose your role and the rest of the page follows you.</p>
      <AudienceChips :selected="audience?.id" @choose="onChoose" />
      <!-- Temporary screenshot showcase; interactive journeys remain available below and in guides. -->
      <RoleBookmarks :selected="audience?.id" />
      <div id="audience-preview" class="audience-preview">
        <div class="preview-copy">
          <div aria-live="polite" aria-atomic="true">
            <p class="editorial-eyebrow">{{ audience ? `For ${audience.short.toLowerCase()}` : 'One connected platform' }}</p>
            <h2>{{ audience ? audience.headline : 'Navigate. Monitor. Arrive.' }}</h2>
            <p>{{ audience ? audience.intro : 'InteliWaterwayz™ connects the journey with vessel information and the people on shore. Choose your role above to find your starting point.' }}</p>
          </div>
          <div class="preview-actions">
            <RouterLink v-if="audience" :to="audienceLink(audience.id)" class="editorial-button">Explore your guide <span aria-hidden="true">↗</span>
            </RouterLink>
            <RouterLink v-else to="/capabilities" class="editorial-button">Explore the platform <span aria-hidden="true">↗</span>
            </RouterLink>
            <RouterLink v-if="isMarinaAudience(audience)" :to="{ path: '/demo/marina/bahia-mar', query: { audience: audience!.id } }" class="editorial-text-link marina-demo-link">Explore the LiDAR marina demo <span aria-hidden="true">↗</span></RouterLink>
          </div>
        </div>
      </div>
      <div class="choice-footnote">
        <p>{{ audience ? 'Your choice shapes this guide. You can change it whenever you like.' : 'Wear more than one hat? Start anywhere. You can switch roles at any time.' }}</p>
        <RouterLink to="/capabilities">Browse everything <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </section>

    <HomeRoleTable />

    <section class="editorial-section editorial-shell waterwayz-feature">
      <div class="section-intro">
        <div><p class="editorial-eyebrow">InteliWaterwayz™ by InteliMARIS</p><h2>Your whole boating experience. Intelligently connected.</h2></div>
        <div class="waterwayz-feature-aside"><p>A passage starts before departure and carries on after you tie up. Bring the route, connected vessel information and your next stop into the same view.</p><RouterLink to="/waterwayz" class="editorial-button">Explore InteliWaterwayz™ <span aria-hidden="true">↗</span></RouterLink></div>
      </div>
      <JourneyStage :id="secondJourney" />
    </section>
    <section id="platform" class="editorial-section section-wash">
      <div class="editorial-shell">
        <div class="section-intro">
          <div>
            <p class="editorial-eyebrow">{{ audience ? 'Selected for you' : 'From passage to pontoon' }}</p>
            <h2>{{ audience ? `A closer look for ${audience.short.toLowerCase()}.` : 'The detail behind a better day on the water.' }}</h2>
          </div>
          <p>Explore the workflows, see the actual product and check what is available today.</p>
        </div>
        <FeatureLinks :ids="audience?.features || ['navigation', 'monitoring', 'dockpass', 'emergency-assistance']" />
      </div>
    </section>
    <section class="editorial-section editorial-shell">
      <div class="section-intro"><div><p class="editorial-eyebrow">Connected vessel systems</p><h2>Your vessel never stops communicating.</h2></div><p>Power, water, temperature and the systems beneath your feet. Build your view around what you want to know, then choose the hardware to support it.</p></div>
      <SystemLinks :ids="['pwts', 'intelibilge', 'intelibms']" />
    </section>
    <CommunitySection />
    <EcosystemSection />
    <section class="editorial-section editorial-shell">
      <div class="section-intro"><div><p class="editorial-eyebrow">Beyond the passage</p><h2>More detail. More useful context.</h2></div><p>Explore a real survey demonstration and the capabilities we are developing around connected information. Each guide explains what is available and what comes next.</p></div>
      <SystemLinks :ids="['geospatial', 'intelligence', 'vision']" />
    </section>
    <GuideClosing :audience="audience" />
  </main>
</template>
<script setup lang="ts">
import SystemLinks from '@/components/audience/SystemLinks.vue'
import EcosystemSection from '@/components/audience/EcosystemSection.vue'
import { computed, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import AudienceChips from '@/components/audience/AudienceChips.vue'
import RoleBookmarks from '@/components/audience/RoleBookmarks.vue'
import CommunitySection from '@/components/audience/CommunitySection.vue'
import { useOnboarding } from '@/composables/useOnboarding'
import FeatureLinks from '@/components/audience/FeatureLinks.vue'
import GuideClosing from '@/components/audience/GuideClosing.vue'
import JourneyStage from '@/components/audience/JourneyStage.vue'
import LanguageNote from '@/components/audience/LanguageNote.vue'
import HomeHighlights from '@/components/home/HomeHighlights.vue'
import HomePlanBar from '@/components/home/HomePlanBar.vue'
import HomeRoleTable from '@/components/home/HomeRoleTable.vue'
import PhotoHero from '@/components/PhotoHero.vue'
import { useAudience } from '@/composables/useAudience'
import { audienceLink, isMarinaAudience } from '@/data/audiences'
import { findJourney, JOURNEYS } from '@/data/playbook/journeys'
const { audience, choose } = useAudience()
const { start } = useOnboarding()
const base = import.meta.env.BASE_URL
/* Keep role-specific journeys available in the InteliWaterwayz section during the hero showcase. */
const journey = computed(() => findJourney(audience.value?.journey) ?? findJourney('helm-view') ?? JOURNEYS[0]!)
/* Show the app gallery for the default role, or the helm experience for the selected role. */
const secondJourney = computed(() => (journey.value.id === 'helm-view' ? 'app-screens' : 'helm-view'))
async function onChoose(id: string) {
  await choose(id)
  if (window.matchMedia('(max-width: 800px)').matches) {
    await nextTick()
    const preview = document.getElementById('audience-preview')
    preview?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
    const heading = preview?.querySelector('h2')
    heading?.setAttribute('tabindex', '-1')
    heading?.focus({ preventScroll: true })
  }
}
</script>

<style scoped>
.home-news { margin: 0; background: var(--maris-day); color: #fff; font-size: .92rem; }
[data-theme='dark'] .home-news { background: var(--maris-deep); }
.home-news > span { display: flex; flex-wrap: wrap; justify-content: center; align-items: baseline; gap: 4px 10px; padding: 13px 0; text-align: center; }
.home-news b { padding: 1px 8px; border-radius: 4px; background: rgba(255, 255, 255, .16); font-size: .74rem; letter-spacing: .06em; text-transform: uppercase; }
.home-news a { color: #fff; font-weight: 600; text-underline-offset: 3px; }

.home-highlights { margin: -56px 0 0; position: relative; z-index: 2; }

.home-choose { padding: 80px 0 24px; scroll-margin-top: 112px; }
.home-center-title { margin: 0 auto 12px; text-align: center; }
.home-center-lede { margin: 0 auto 26px; text-align: center; color: var(--text-secondary); }
.home-choose :deep(.audience-chips) { justify-content: center; margin-bottom: 36px; }

@media (max-width: 700px) {
  .home-highlights { margin-top: -40px; }
  .home-choose { padding-top: 56px; }
}
</style>
