<template>
  <section class="dashboard-section">
    <div class="container-wide">
      <div class="section-header centered">
        <div class="section-label">{{ t('dashboard.label') }}</div>
        <h2>{{ t('dashboard.title') }}</h2>
        <p class="section-description">
          {{ t('dashboard.description') }}
        </p>
      </div>
      
      <div class="dashboard-mockup">
        <div class="dashboard-header">
          <div class="dashboard-title">{{ t('dashboard.header.title') }}</div>
          <div class="dashboard-time">{{ currentTime }}</div>
        </div>
        
        <div class="dashboard-grid">
          <div class="dashboard-sidebar">
            <div class="vessel-list">
              <div 
                v-for="vessel in vessels" 
                :key="vessel.id"
                class="vessel-card" 
                :class="{ active: activeVessel === vessel.id }"
                @click="activeVessel = vessel.id"
              >
                <div class="vessel-status" :class="`status-${vessel.status}`"></div>
                <div class="vessel-info">
                  <div class="vessel-name">{{ vessel.name }}</div>
                  <div class="vessel-meta">{{ vessel.location }}</div>
                </div>
                <div class="vessel-sensors">
                  <span v-if="vessel.critical > 0" class="sensor-badge critical">{{ vessel.critical }}</span>
                  <span v-if="vessel.warning > 0" class="sensor-badge warning">{{ vessel.warning }}</span>
                  <span class="sensor-badge ok">{{ vessel.ok }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="dashboard-main">
            <div class="sensor-grid">
              <div class="sensor-card status-ok">
                <div class="sensor-header">
                  <div class="sensor-type">{{ t('dashboard.sensor.battery') }}</div>
                  <div class="sensor-value">13.2V</div>
                </div>
                <div class="sensor-chart">
                  <canvas ref="batteryChart" class="mini-chart"></canvas>
                </div>
                <div class="sensor-footer">
                  <span class="sensor-status">{{ t('dashboard.status.healthy') }}</span>
                  <span class="sensor-time">2m ago</span>
                </div>
              </div>
              
              <div class="sensor-card status-ok">
                <div class="sensor-header">
                  <div class="sensor-type">{{ t('dashboard.sensor.bilge') }}</div>
                  <div class="sensor-value">{{ t('dashboard.status.normal') }}</div>
                </div>
                <div class="sensor-chart">
                  <canvas ref="bilgeChart" class="mini-chart"></canvas>
                </div>
                <div class="sensor-footer">
                  <span class="sensor-status">{{ t('dashboard.status.dry') }}</span>
                  <span class="sensor-time">5m ago</span>
                </div>
              </div>
              
              <div class="sensor-card status-ok">
                <div class="sensor-header">
                  <div class="sensor-type">{{ t('dashboard.sensor.temperature') }}</div>
                  <div class="sensor-value">22°C</div>
                </div>
                <div class="sensor-chart">
                  <canvas ref="tempChart" class="mini-chart"></canvas>
                </div>
                <div class="sensor-footer">
                  <span class="sensor-status">{{ t('dashboard.status.optimal') }}</span>
                  <span class="sensor-time">1m ago</span>
                </div>
              </div>
              
              <div class="sensor-card status-ok">
                <div class="sensor-header">
                  <div class="sensor-type">{{ t('dashboard.sensor.gps') }}</div>
                  <div class="sensor-value">{{ t('dashboard.status.fixed') }}</div>
                </div>
                <div class="sensor-chart">
                  <div class="gps-indicator">
                    <div class="gps-dot"></div>
                  </div>
                </div>
                <div class="sensor-footer">
                  <span class="sensor-status">37.8°N, 23.7°E</span>
                  <span class="sensor-time">30s ago</span>
                </div>
              </div>
            </div>
            
            <div class="event-timeline">
              <div class="timeline-header">{{ t('dashboard.timeline.title') }}</div>
              <div class="timeline-events">
                <div class="timeline-event">
                  <div class="event-time">14:28</div>
                  <div class="event-dot status-ok"></div>
                  <div class="event-content">
                    <div class="event-title">Battery voltage normal</div>
                    <div class="event-meta">Sensor ID: BAT-001</div>
                  </div>
                </div>
                <div class="timeline-event">
                  <div class="event-time">14:15</div>
                  <div class="event-dot status-ok"></div>
                  <div class="event-content">
                    <div class="event-title">Bilge pump cycle completed</div>
                    <div class="event-meta">Duration: 45s</div>
                  </div>
                </div>
                <div class="timeline-event">
                  <div class="event-time">13:52</div>
                  <div class="event-dot status-warning"></div>
                  <div class="event-content">
                    <div class="event-title">Temperature spike detected</div>
                    <div class="event-meta">Resolved automatically</div>
                  </div>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const currentTime = ref('')
const activeVessel = ref(1)

const vessels = [
  { id: 1, name: 'Poseidon\'s Pride', location: 'Marina Bay • Berth A-12', status: 'ok', critical: 0, warning: 0, ok: 8 },
  { id: 2, name: 'Ocean Voyager', location: 'Harbor Point • B-05', status: 'warning', critical: 0, warning: 1, ok: 7 },
  { id: 3, name: 'Marina Star', location: 'South Dock • C-22', status: 'critical', critical: 2, warning: 0, ok: 6 },
  { id: 4, name: 'Blue Horizon', location: 'North Pier • D-08', status: 'ok', critical: 0, warning: 0, ok: 10 }
]

const batteryChart = ref<HTMLCanvasElement | null>(null)
const bilgeChart = ref<HTMLCanvasElement | null>(null)
const tempChart = ref<HTMLCanvasElement | null>(null)

let timeInterval: number | null = null

const updateTime = () => {
  const now = new Date()
  const hours = String(now.getUTCHours()).padStart(2, '0')
  const minutes = String(now.getUTCMinutes()).padStart(2, '0')
  const seconds = String(now.getUTCSeconds()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}:${seconds} UTC`
}

class MiniChart {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  type: string
  data: number[]
  width: number
  height: number
  intervalId: number | null = null

  constructor(canvas: HTMLCanvasElement, type: string) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.type = type
    this.data = this.generateData()
    this.width = 0
    this.height = 0
    
    this.resize()
    this.draw()
    
    this.intervalId = window.setInterval(() => {
      this.data.shift()
      this.data.push(this.generateDataPoint())
      this.draw()
    }, 2000)
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect()
    this.canvas.width = rect.width * window.devicePixelRatio
    this.canvas.height = rect.height * window.devicePixelRatio
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    this.width = rect.width
    this.height = rect.height
  }

  generateDataPoint(): number {
    switch(this.type) {
      case 'battery':
        return 12.8 + Math.random() * 0.8
      case 'bilge':
        return Math.random() * 0.2
      case 'temp':
        return 20 + Math.random() * 4
      default:
        return Math.random()
    }
  }

  generateData(): number[] {
    return Array.from({ length: 20 }, () => this.generateDataPoint())
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    
    const max = Math.max(...this.data)
    const min = Math.min(...this.data)
    const range = max - min || 1
    
    this.ctx.beginPath()
    this.ctx.moveTo(0, this.height)
    
    this.data.forEach((value, i) => {
      const x = (i / (this.data.length - 1)) * this.width
      const y = this.height - ((value - min) / range) * this.height
      this.ctx.lineTo(x, y)
    })
    
    this.ctx.lineTo(this.width, this.height)
    this.ctx.closePath()
    
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height)
    gradient.addColorStop(0, 'rgba(0, 217, 255, 0.3)')
    gradient.addColorStop(1, 'rgba(0, 217, 255, 0.05)')
    this.ctx.fillStyle = gradient
    this.ctx.fill()
    
    this.ctx.beginPath()
    this.data.forEach((value, i) => {
      const x = (i / (this.data.length - 1)) * this.width
      const y = this.height - ((value - min) / range) * this.height
      
      if (i === 0) {
        this.ctx.moveTo(x, y)
      } else {
        this.ctx.lineTo(x, y)
      }
    })
    
    this.ctx.strokeStyle = 'rgba(0, 217, 255, 0.8)'
    this.ctx.lineWidth = 2
    this.ctx.stroke()
  }

  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
}

let charts: MiniChart[] = []

onMounted(() => {
  updateTime()
  timeInterval = window.setInterval(updateTime, 1000)

  if (batteryChart.value) {
    charts.push(new MiniChart(batteryChart.value, 'battery'))
  }
  if (bilgeChart.value) {
    charts.push(new MiniChart(bilgeChart.value, 'bilge'))
  }
  if (tempChart.value) {
    charts.push(new MiniChart(tempChart.value, 'temp'))
  }
})

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval)
  }
  charts.forEach(chart => chart.destroy())
  charts = []
})
</script>
