<template>
  <section class="lp-featured">
    <div class="container-wide">
      <div class="lp-featured-card">
        <div class="lp-featured-photo">
          <img
            src="/assets/products/im601-water-level.webp"
            alt="InteliMARIS IM601 Water Level Sensor"
            loading="lazy"
          />
        </div>

        <div class="lp-featured-content">
          <span class="lp-featured-kicker">Featured Product</span>
          <h3 class="lp-featured-title">
            InteliMARIS <strong>IM601</strong>
          </h3>
          <p class="lp-featured-subtitle">Water Level Monitor</p>
          <p class="lp-featured-body">
            Accurate. Reliable. Real-time.<br />
            Monitor water levels to protect your vessel and prevent costly damage.
          </p>
          <div class="lp-featured-actions">
            <RouterLink to="/products#im601" class="lp-btn-primary lp-btn-primary--sm">
              <span>Learn More</span>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </RouterLink>
            <RouterLink to="/products" class="lp-link">View All Products →</RouterLink>
          </div>
        </div>

        <ul class="lp-featured-stats" aria-label="Product highlights">
          <li class="lp-stat">
            <span class="lp-stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3c-3 4-6 7-6 11a6 6 0 1 0 12 0c0-4-3-7-6-11z" fill="currentColor" fill-opacity="0.12"/>
                <path d="M12 3c-3 4-6 7-6 11a6 6 0 1 0 12 0c0-4-3-7-6-11z"/>
              </svg>
            </span>
            <span class="lp-stat-value">18%</span>
            <span class="lp-stat-label">Avg. Water Level<br/>of Capacity</span>
          </li>
          <li class="lp-stat">
            <span class="lp-stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" fill="currentColor" fill-opacity="0.12"/>
                <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/>
              </svg>
            </span>
            <span class="lp-stat-value">100%</span>
            <span class="lp-stat-label">Systems<br/>Monitored</span>
          </li>
          <li class="lp-stat">
            <span class="lp-stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 17l5-5 4 4 7-9"/>
                <path d="M14 7h5v5"/>
              </svg>
            </span>
            <span class="lp-stat-value">24/7</span>
            <span class="lp-stat-label">Real-time<br/>Visibility</span>
          </li>
          <li class="lp-stat">
            <span class="lp-stat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M7 18a4 4 0 0 1 0-8 6 6 0 0 1 11.5-1.5A4.5 4.5 0 0 1 17 18H7z" fill="currentColor" fill-opacity="0.12"/>
                <path d="M7 18a4 4 0 0 1 0-8 6 6 0 0 1 11.5-1.5A4.5 4.5 0 0 1 17 18H7z"/>
              </svg>
            </span>
            <span class="lp-stat-value">98%</span>
            <span class="lp-stat-label">System<br/>Uptime</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
