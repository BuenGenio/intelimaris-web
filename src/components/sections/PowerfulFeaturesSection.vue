<template>
  <section class="lp-features">
    <div class="container-wide lp-features-grid">
      <div class="lp-features-copy">
        <span class="lp-features-kicker">Powerful Features</span>
        <h2 class="lp-features-title">
          Everything you need.<br />All in one platform.
        </h2>
        <p class="lp-features-body">
          From real-time monitoring to predictive maintenance, InteliMARIS
          gives you complete visibility and control over your vessels and assets.
        </p>
        <RouterLink to="/products" class="lp-btn-primary lp-btn-primary--sm">
          <span>Explore Features</span>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </RouterLink>
      </div>

      <ul class="lp-features-cards" aria-label="Feature highlights">
        <li class="lp-feature-card">
          <span class="lp-feature-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3c-3 4-6 7-6 11a6 6 0 1 0 12 0c0-4-3-7-6-11z" fill="currentColor" fill-opacity="0.12"/>
              <path d="M12 3c-3 4-6 7-6 11a6 6 0 1 0 12 0c0-4-3-7-6-11z"/>
            </svg>
          </span>
          <h4>Vessel Monitoring</h4>
          <p>Monitor critical systems in real time.</p>
        </li>
        <li class="lp-feature-card">
          <span class="lp-feature-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 17l5-5 4 4 7-9"/>
              <path d="M14 7h5v5"/>
            </svg>
          </span>
          <h4>Predictive Analytics</h4>
          <p>AI-driven insights to prevent issues.</p>
        </li>
        <li class="lp-feature-card">
          <span class="lp-feature-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2.5h-15L6 16z" fill="currentColor" fill-opacity="0.12"/>
              <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2.5h-15L6 16z"/>
              <path d="M10 20a2 2 0 0 0 4 0"/>
            </svg>
          </span>
          <h4>Smart Alerts</h4>
          <p>Get notified before small issues become big.</p>
        </li>
        <li class="lp-feature-card">
          <span class="lp-feature-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="6" y="3" width="12" height="18" rx="1.5" fill="currentColor" fill-opacity="0.12"/>
              <rect x="6" y="3" width="12" height="18" rx="1.5"/>
              <path d="M9 8h6M9 12h6M9 16h4"/>
            </svg>
          </span>
          <h4>System Health</h4>
          <p>Track performance and system health.</p>
        </li>
      </ul>

      <div class="lp-features-mockup" aria-hidden="true">
        <div class="lp-mockup-laptop">
          <div class="lp-mockup-laptop-screen">
            <div class="lp-mockup-app">
              <div class="lp-mockup-sidebar">
                <div class="lp-mockup-brand">InteliMARIS<sup>®</sup></div>
                <ul class="lp-mockup-nav">
                  <li class="active"><span class="lp-mockup-bullet"></span>Dashboard</li>
                  <li><span class="lp-mockup-bullet"></span>Alerts</li>
                  <li><span class="lp-mockup-bullet"></span>Sensors</li>
                  <li><span class="lp-mockup-bullet"></span>Analytics</li>
                  <li><span class="lp-mockup-bullet"></span>History</li>
                  <li><span class="lp-mockup-bullet"></span>Settings</li>
                </ul>
              </div>
              <div class="lp-mockup-main">
                <div class="lp-mockup-status">
                  <span class="lp-mockup-status-label">Vessel Status</span>
                  <strong>All Systems Normal</strong>
                </div>
                <div class="lp-mockup-row">
                  <div class="lp-mockup-card">
                    <span class="lp-mockup-card-label">Bilge Water Level</span>
                    <strong>18%</strong>
                    <small>of capacity</small>
                    <div class="lp-mockup-spark"></div>
                  </div>
                  <div class="lp-mockup-card">
                    <span class="lp-mockup-card-label">Leak Sensor</span>
                    <strong>Dry</strong>
                    <small>No Leak Detected</small>
                  </div>
                </div>
                <div class="lp-mockup-card lp-mockup-card--wide">
                  <span class="lp-mockup-card-label">Battery</span>
                  <div class="lp-mockup-battery-row">
                    <strong>85%</strong>
                    <span class="lp-mockup-good">Good</span>
                    <div class="lp-mockup-battery">
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="lp-mockup-phone">
          <div class="lp-mockup-phone-screen">
            <div class="lp-mockup-app lp-mockup-app--phone">
              <div class="lp-mockup-status">
                <span class="lp-mockup-status-label">Vessel Status</span>
                <strong class="lp-mockup-good">All Systems Normal</strong>
              </div>
              <div class="lp-mockup-row">
                <div class="lp-mockup-card">
                  <span class="lp-mockup-card-label">Bilge Water Level</span>
                  <strong>18%</strong>
                  <small>of capacity</small>
                  <div class="lp-mockup-spark"></div>
                </div>
                <div class="lp-mockup-card">
                  <span class="lp-mockup-card-label">Leak Sensor</span>
                  <strong>Dry</strong>
                  <small>No Leak Detected</small>
                </div>
              </div>
              <div class="lp-mockup-card lp-mockup-card--wide">
                <span class="lp-mockup-card-label">Battery</span>
                <div class="lp-mockup-battery-row">
                  <strong>85%</strong>
                  <span class="lp-mockup-good">Good</span>
                  <div class="lp-mockup-battery"><span></span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
