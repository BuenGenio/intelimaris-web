<template>
  <main class="editorial-page" lang="en">
    <section class="editorial-shell guide-hero">
      <LanguageNote />

      <p class="editorial-eyebrow">Our story</p>
      <div class="guide-heading">
        <h1>The water connects us. The tools should too.</h1>
        <p class="editorial-lede">A passage touches more than the helm. It involves crew, guests, dock teams, service companies and the places that welcome a vessel. InteliMARIS™ brings those working lives into a connected ecosystem, with WaterWayz™ as the boater-facing experience.</p>
      </div>
      <p class="identity-note">InteliMarine LLC does business as InteliMARIS. It is the company behind WaterWayz™, the connected vessel systems and the developing marina and geospatial capabilities.</p>
    </section>
    <section class="editorial-section section-wash">
      <div class="editorial-shell">
        <p class="editorial-eyebrow">One connected day</p>
        <h2>Built around the work.</h2>
        <ol class="guide-steps">
          <li>
            <span class="editorial-index">01</span>
            <h3>The journey</h3>
            <p>WaterWayz™ brings navigation, vessel-specific passage planning, hazard awareness and dockage together.</p>
            <RouterLink to="/waterwayz" class="editorial-text-link">Explore WaterWayz™ →</RouterLink>
          </li>
          <li>
            <span class="editorial-index">02</span>
            <h3>The vessel</h3>
            <p>PWTS, InteliBilge and InteliBMS bring compatible vessel systems into the ecosystem. The MX MariWavz™ radio network links devices and gateways; software presents the useful information in WaterWayz™.</p>
            <RouterLink to="/capabilities/monitoring" class="editorial-text-link">Explore monitoring →</RouterLink>
          </li>
          <li>
            <span class="editorial-index">03</span>
            <h3>The people on shore</h3>
            <p>Marina, private-dock, business and maintenance workspaces connect arrivals, places, people and service work.</p>
            <RouterLink to="/marinas" class="editorial-text-link">Explore marina operations →</RouterLink>
          </li>
        </ol>
      </div>
    </section>
    <section class="editorial-shell editorial-section">
      <div class="section-intro">
        <div>
          <p class="editorial-eyebrow">Our approach</p>
          <h2>Clarity earns trust.</h2>
        </div>
        <p>A reading should state its age. An unknown should remain unknown. A planned feature should be described as planned. Every guide separates the workflow you can use from the work still ahead.</p>
      </div>
      <RouterLink to="/#choose" class="editorial-button">Find your place on the water ↗</RouterLink>
    </section>
    <section class="editorial-shell editorial-section">
      <p class="editorial-eyebrow">The people behind the platform</p>
      <h2>{{ t('about.team.title') }}</h2>
      <div class="editorial-team">
        <article v-for="member in team" :key="member.slug">
          <img v-if="member.photo" :src="member.photo" :alt="member.name" width="900" height="900" loading="lazy">
          <span v-else class="team-initials" aria-hidden="true">{{ member.initials }}</span>
          <h3>{{ member.name }}</h3>
          <span class="team-role">{{ t(member.roleKey) }}</span>
          <p>{{ t(member.bioKey) }}</p>
        </article>
      </div>
    </section>
    <GuideClosing :audience="audience" />
  </main>
</template>
<script setup lang="ts">

import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'
import { useAudience } from '@/composables/useAudience'
import GuideClosing from '@/components/audience/GuideClosing.vue'
import LanguageNote from '@/components/audience/LanguageNote.vue'
const { audience } = useAudience()
const { t } = useI18n()
const teamBase = `${import.meta.env.BASE_URL}assets/team/`

/* Photos live in public/assets/team/ as square portraits; a member without one renders initials. */
const team = [
  { slug: 'ron-bishop', name: 'Ron Bishop', initials: 'RB', photo: null, roleKey: 'about.team.ron.role', bioKey: 'about.team.ron.bio' },
  { slug: 'tristan-mullane', name: 'Tristan Mullane', initials: 'TM', photo: `${teamBase}tristan-mullane.webp`, roleKey: 'about.team.tristan.role', bioKey: 'about.team.tristan.bio' },
  { slug: 'john-x', name: 'John X', initials: 'JX', photo: `${teamBase}john-x.webp`, roleKey: 'about.team.john.role', bioKey: 'about.team.john.bio' },
  { slug: 'sam-skolnik', name: 'Sam Skolnik', initials: 'SS', photo: `${teamBase}sam-skolnik.webp`, roleKey: 'about.team.sam.role', bioKey: 'about.team.sam.bio' },
  { slug: 'yevgen-trotsan', name: 'Yevgen Trotsan', initials: 'YT', photo: `${teamBase}yevgen-trotsan.webp`, roleKey: 'about.team.yevgen.role', bioKey: 'about.team.yevgen.bio' },
  { slug: 'gary-stidston-broadbent', name: 'Gary Stidston-Broadbent', initials: 'GS', photo: null, roleKey: 'about.team.gary.role', bioKey: 'about.team.gary.bio' },
] as const

</script>
