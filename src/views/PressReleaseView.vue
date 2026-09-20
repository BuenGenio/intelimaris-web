<template>
  <main v-if="release" class="editorial-page press-page" lang="en">
    <article class="editorial-shell press-article">
      <header class="press-head">
        <p class="editorial-eyebrow">Press release · {{ formatPressDate(release.date) }}</p>
        <h1>{{ release.title }}</h1>
        <p class="press-standfirst">{{ release.standfirst }}</p>
        <p v-if="draft" class="release-note press-draft"><strong>Draft</strong><span>Text in [brackets] is still to be confirmed before this release goes out.</span></p>
      </header>

      <div class="press-body">
        <p v-for="(para, i) in release.intro" :key="i" class="press-para">
          <span v-if="i === 0" class="press-dateline">{{ release.place }} — {{ formatPressDate(release.date) }} —</span>
          {{ para }}
        </p>

        <p v-for="block in release.sections" :key="block.text" class="press-para">
          <strong v-if="block.lead">{{ block.lead }}</strong>
          {{ block.text }}
        </p>

        <blockquote class="press-quote">
          <p>“{{ release.quote.text }}”</p>
          <footer>{{ release.quote.name }}, {{ release.quote.role }}</footer>
        </blockquote>

        <p v-if="release.cta" class="press-para">
          <strong>{{ release.cta.lead }}</strong>
          {{ release.cta.text }}
          <RouterLink :to="release.cta.href" class="press-link">{{ release.cta.label }} <span aria-hidden="true">↗</span></RouterLink>
        </p>

        <p v-if="release.availability" class="press-para">
          <strong>Availability.</strong>
          {{ release.availability }}
        </p>
      </div>

      <footer class="press-foot">
        <section v-for="b in release.boilerplate" :key="b.heading" class="press-boiler">
          <h2>{{ b.heading }}</h2>
          <p>{{ b.text }}</p>
        </section>
        <section class="press-boiler">
          <h2>Media contact</h2>
          <p>
            {{ release.contact.name }} ·
            <a :href="`mailto:${release.contact.email}`">{{ release.contact.email }}</a> ·
            {{ release.contact.phone }} ·
            <a href="https://intelimaris.com">intelimaris.com</a>
          </p>
        </section>
        <p class="press-marks">InteliMARIS™ and WaterWayz™ are trademarks of InteliMarine LLC.</p>
      </footer>
    </article>

    <section class="editorial-shell editorial-section press-more">
      <p class="editorial-eyebrow">Press</p>
      <h2>All releases</h2>
      <nav aria-label="Other press releases">
        <RouterLink v-for="r in PRESS" :key="r.id" :to="pressLink(r.id)" :aria-current="r.id === release.id ? 'page' : undefined">
          <span class="t-num">{{ formatPressDate(r.date) }}</span>
          <span>{{ r.title }}</span>
        </RouterLink>
      </nav>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { PRESS, findRelease, formatPressDate, hasPlaceholders, pressLink } from '@/data/press'

const props = defineProps<{ releaseId: string }>()
const release = computed(() => findRelease(props.releaseId))
const draft = computed(() => (release.value ? hasPlaceholders(release.value) : false))
</script>

<style scoped>
.press-article {
  max-width: 72ch;
  margin-inline: auto;
  padding-top: 32px;
}

.press-head h1 {
  font-size: clamp(2rem, 3.6vw, 3.4rem);
  letter-spacing: -0.03em;
  line-height: 1.08;
}

.press-standfirst {
  margin: 18px 0 0;
  font-family: var(--font-text);
  font-size: 1.05rem;
  color: var(--text-secondary);
}

.press-draft {
  display: flex;
  gap: 12px;
  align-items: baseline;
  margin-top: 24px;
}

.press-draft span {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.press-body {
  margin-top: 40px;
  font-family: var(--font-text);
  font-size: 1.06rem;
}

.press-para {
  margin: 0 0 22px;
}

.press-para strong {
  font-weight: 700;
  color: var(--text-primary);
}

.press-dateline {
  font-weight: 700;
  letter-spacing: 0.02em;
  margin-right: 0.35em;
}

.press-quote {
  margin: 34px 0;
  padding: 4px 0 4px 24px;
  border-left: 3px solid var(--domain);
}

.press-quote p {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 1.6vw, 1.4rem);
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.press-quote footer {
  margin-top: 12px;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.press-link {
  display: inline-flex;
  gap: 8px;
  margin-left: 0.35em;
  font-weight: 600;
  color: var(--domain-ink);
  text-decoration: none;
}

.press-foot {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid var(--border-medium);
  font-family: var(--font-text);
}

.press-boiler {
  margin-bottom: 24px;
}

.press-boiler h2 {
  font-size: 1.05rem;
  letter-spacing: -0.01em;
  margin-bottom: 8px;
}

.press-boiler p {
  margin: 0;
  color: var(--text-secondary);
  max-width: 64ch;
}

.press-boiler a {
  color: var(--domain-ink);
}

.press-marks {
  margin: 32px 0 0;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.press-more nav {
  display: grid;
  gap: 4px;
  margin-top: 24px;
}

.press-more a {
  display: grid;
  grid-template-columns: 11rem minmax(0, 1fr);
  gap: 24px;
  padding: 14px 0;
  border-top: 1px solid var(--border-medium);
  color: var(--text-primary);
  text-decoration: none;
  font-family: var(--font-text);
}

.press-more a .t-num {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.press-more a[aria-current='page'] {
  color: var(--text-muted);
}

@media (max-width: 700px) {
  .press-more a {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
  }
}
</style>
