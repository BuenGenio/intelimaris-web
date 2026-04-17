<template>
  <section class="use-cases-section">
    <div class="container">
      <div class="section-header">
        <div class="section-label">{{ t('usecases.label') }}</div>
        <h2>{{ t('usecases.title') }}</h2>
      </div>
      
      <div class="use-cases-grid">
        <div class="use-case-card fade-in">
          <div class="use-case-icon">01</div>
          <h3>{{ t('usecases.yacht.title') }}</h3>
          <p>{{ t('usecases.yacht.desc') }}</p>
          <ul class="use-case-benefits">
            <li><ModelLinkedText :text="t('usecases.yacht.benefit1')" /></li>
            <li><ModelLinkedText :text="t('usecases.yacht.benefit2')" /></li>
            <li><ModelLinkedText :text="t('usecases.yacht.benefit3')" /></li>
            <li><ModelLinkedText :text="t('usecases.yacht.benefit4')" /></li>
          </ul>
        </div>
        
        <div class="use-case-card fade-in">
          <div class="use-case-icon">02</div>
          <h3>{{ t('usecases.marina.title') }}</h3>
          <p>{{ t('usecases.marina.desc') }}</p>
          <ul class="use-case-benefits">
            <li><ModelLinkedText :text="t('usecases.marina.benefit1')" /></li>
            <li><ModelLinkedText :text="t('usecases.marina.benefit2')" /></li>
            <li><ModelLinkedText :text="t('usecases.marina.benefit3')" /></li>
            <li><ModelLinkedText :text="t('usecases.marina.benefit4')" /></li>
          </ul>
        </div>
        
        <div class="use-case-card fade-in">
          <div class="use-case-icon">03</div>
          <h3>{{ t('usecases.fleet.title') }}</h3>
          <p>{{ t('usecases.fleet.desc') }}</p>
          <ul class="use-case-benefits">
            <li><ModelLinkedText :text="t('usecases.fleet.benefit1')" /></li>
            <li><ModelLinkedText :text="t('usecases.fleet.benefit2')" /></li>
            <li><ModelLinkedText :text="t('usecases.fleet.benefit3')" /></li>
            <li><ModelLinkedText :text="t('usecases.fleet.benefit4')" /></li>
          </ul>
        </div>
        
        <div class="use-case-card fade-in">
          <div class="use-case-icon">04</div>
          <h3>{{ t('usecases.insurance.title') }}</h3>
          <p>{{ t('usecases.insurance.desc') }}</p>
          <ul class="use-case-benefits">
            <li><ModelLinkedText :text="t('usecases.insurance.benefit1')" /></li>
            <li><ModelLinkedText :text="t('usecases.insurance.benefit2')" /></li>
            <li><ModelLinkedText :text="t('usecases.insurance.benefit3')" /></li>
            <li><ModelLinkedText :text="t('usecases.insurance.benefit4')" /></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
import ModelLinkedText from '@/components/ModelLinkedText.vue'

const { t } = useI18n()
</script>
