<template>
  <section class="lp-hero">
    <div class="lp-hero-bg" aria-hidden="true">
      <div class="lp-hero-bg-image"></div>
      <div class="lp-hero-bg-fade"></div>
      <div class="lp-hero-bg-circuits"></div>
    </div>

    <div class="container-wide lp-hero-grid">
      <div class="lp-hero-copy">
        <h1 class="lp-hero-title">
          <span>AI-Driven Marine</span>
          <span class="lp-hero-title-accent">Monitoring Systems</span>
        </h1>

        <p class="lp-hero-lede">
          InteliMARIS delivers intelligent, AI-powered monitoring systems
          that transform real-time vessel data into predictive insights —
          enhancing safety, reliability, and performance across marine
          environments.
        </p>

        <div class="lp-hero-actions">
          <RouterLink to="/products" class="lp-btn-primary">
            <span>Explore Solutions</span>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </RouterLink>
          <button type="button" class="lp-btn-ghost" @click="onWatchVideo">
            <span>Watch Video</span>
            <span class="lp-btn-play" aria-hidden="true">
              <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                <path d="M0 0L10 6L0 12V0Z"/>
              </svg>
            </span>
          </button>
        </div>

        <ul class="lp-pillars" aria-label="Brand pillars">
          <li class="lp-pillar">
            <span class="lp-pillar-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3c-3 4-6 7-6 11a6 6 0 1 0 12 0c0-4-3-7-6-11z" fill="currentColor" fill-opacity="0.15"/>
                <path d="M12 3c-3 4-6 7-6 11a6 6 0 1 0 12 0c0-4-3-7-6-11z"/>
              </svg>
            </span>
            <div class="lp-pillar-text">
              <strong>AI Intelligence</strong>
              <small>Smarter insights</small>
            </div>
          </li>
          <li class="lp-pillar">
            <span class="lp-pillar-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" fill="currentColor" fill-opacity="0.15"/>
                <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/>
              </svg>
            </span>
            <div class="lp-pillar-text">
              <strong>Reliability</strong>
              <small>Always-on performance</small>
            </div>
          </li>
          <li class="lp-pillar">
            <span class="lp-pillar-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2.5h-15L6 16z" fill="currentColor" fill-opacity="0.15"/>
                <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2.5h-15L6 16z"/>
                <path d="M10 20a2 2 0 0 0 4 0"/>
              </svg>
            </span>
            <div class="lp-pillar-text">
              <strong>Prevention</strong>
              <small>Detect issues early</small>
            </div>
          </li>
          <li class="lp-pillar">
            <span class="lp-pillar-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity="0.15"/>
                <circle cx="12" cy="12" r="9"/>
                <path d="M8 12.5l3 3 5-6"/>
              </svg>
            </span>
            <div class="lp-pillar-text">
              <strong>Simplicity</strong>
              <small>Easy to use, powerful results</small>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const onWatchVideo = () => {
  const target = document.getElementById('platform') || document.getElementById('contact')
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
