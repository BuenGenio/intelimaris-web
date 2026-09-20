<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">LoRaWAN</h1>
        <p class="scr-sub">The TTN bridge: connection settings (console overrides env), the device registry, and the downlink command queue.</p>
      </div>
      <button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="activity" /> Refresh</button>
    </div>

    <div class="scr-card">
      <div class="scr-row scr-row--between" style="margin-bottom: 10px"><h2 class="scr-h3 scr-row"><ScrIcon name="radio" /> Connection</h2><span class="scr-pill" data-tone="safe">console-managed</span></div>
      <div class="scr-grid-2">
        <label class="scr-field"><span class="scr-label">Server host</span><input class="scr-input" value="nam1.cloud.thethings.industries" /></label>
        <label class="scr-field"><span class="scr-label">Tenant id</span><input class="scr-input" value="waterwayz" /></label>
        <label class="scr-field"><span class="scr-label">Application id</span><input class="scr-input" value="im-sensors-prod" /></label>
        <label class="scr-field"><span class="scr-label">API key (set — re-enter to change)</span><input class="scr-input" type="password" placeholder="NNSXS.…" /></label>
      </div>
      <div class="scr-row scr-row--wrap" style="margin-top: 10px">
        <button type="button" class="scr-btn scr-btn--sm scr-btn--primary">Save override</button>
        <button type="button" class="scr-btn scr-btn--sm">Clear (use env)</button>
        <button type="button" class="scr-btn scr-btn--sm">Test connection</button>
        <span class="scr-pill" data-tone="safe">connected (console)</span>
        <span class="scr-micro scr-muted" style="margin-left: auto">set by ops@waterwayz · 8 Oct 2026, 14:12</span>
      </div>
    </div>

    <div class="scr-card" style="margin-top: 12px">
      <div class="scr-toolbar scr-row--wrap" style="margin-bottom: 8px">
        <h2 class="scr-h3">Devices</h2>
        <input class="scr-input scr-input--search" placeholder="DevEUI, TTN device id or unit serial…" aria-label="Search devices by DevEUI, TTN id or serial" style="max-width: 300px; margin-left: auto" />
        <button type="button" class="scr-chip">Firmware <span aria-hidden="true">⌄</span></button>
        <button type="button" class="scr-chip">Serial <span aria-hidden="true">⌄</span></button>
      </div>
      <table class="scr-table" aria-label="LoRaWAN devices">
        <thead><tr><th>DevEUI</th><th>TTN device</th><th>Unit serial</th><th>Firmware</th><th>Last uplink</th></tr></thead>
        <tbody>
          <tr v-for="d in devices" :key="d.eui">
            <td class="scr-num" style="font-family: monospace; font-size: 11.5px">{{ d.eui }}</td>
            <td class="scr-small scr-muted">{{ d.ttn }}</td>
            <td><span class="scr-row" style="gap: 6px"><input class="scr-input scr-num" :value="d.serial" placeholder="unmapped" style="min-height: 28px; padding: 2px 8px; width: 130px; font-family: monospace; font-size: 11.5px" /><button v-if="!d.serial" type="button" class="scr-btn scr-btn--sm scr-btn--primary" style="min-height: 28px">Map</button></span></td>
            <td><span class="scr-pill" :data-tone="d.fw ? 'safe' : undefined">{{ d.fw ? `V8 · fw ${d.fw}` : 'V7 (never announced)' }}</span></td>
            <td class="scr-small scr-muted" style="white-space: nowrap">{{ d.uplink }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="scr-card" style="margin-top: 12px">
      <h2 class="scr-h3" style="margin-bottom: 8px">Downlink commands</h2>
      <div class="scr-grid-3" style="align-items: end">
        <label class="scr-field"><span class="scr-label">Device</span><select class="scr-select"><option>A84041D2E1885C30 · IM-2026-0042</option></select></label>
        <label class="scr-field"><span class="scr-label">Sensor type</span><select class="scr-select"><option>Bilge</option></select></label>
        <label class="scr-field"><span class="scr-label">Command</span><select class="scr-select"><option>Set report interval</option></select></label>
        <label class="scr-field"><span class="scr-label">Report interval (s)</span><input class="scr-input" value="600" /><span class="scr-hint">60–86400 seconds</span></label>
        <button type="button" class="scr-btn scr-btn--sm" style="align-self: end">Review</button>
      </div>
      <div class="scr-divider"></div>
      <ul class="scr-stack scr-stack--tight">
        <li v-for="c in commands" :key="c.at">
          <div class="scr-row" style="gap: 10px"><span class="scr-pill" :data-tone="c.tone">{{ c.status }}</span><span class="scr-num scr-micro" style="font-family: monospace">{{ c.eui }}</span><span class="scr-small scr-muted" style="flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: monospace">{{ c.body }}</span><span class="scr-micro scr-muted">{{ c.at }}</span></div>
          <p class="scr-micro scr-muted" style="padding-left: 4px">queued by {{ c.by }}{{ c.ack ? ` · acknowledged ${c.ack}` : '' }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const devices = [
  { eui: 'A84041D2E1885C30', ttn: 'im-bilge-0042', serial: 'IM-2026-0042', fw: '2.4.1', uplink: '4 min ago' },
  { eui: 'A84041D2E1885C31', ttn: 'im-batt-0043', serial: 'IM-2026-0043', fw: '2.4.1', uplink: '6 min ago' },
  { eui: 'A84041D2E1885C32', ttn: 'im-engine-0044', serial: 'IM-2026-0044', fw: '2.3.9', uplink: '1 h ago' },
  { eui: 'A84041D2E1887A10', ttn: 'im-bilge-0918', serial: 'IM-2025-0918', fw: null, uplink: '3 d ago' },
  { eui: 'A84041D2E1889F02', ttn: 'im-shore-0197', serial: 'IM-2026-0197', fw: '2.4.1', uplink: '12 min ago' },
  { eui: 'A84041D2E188A3C4', ttn: 'im-unit-new-7', serial: '', fw: '2.4.1', uplink: '22 min ago' },
]
const commands = [
  { status: 'acknowledged', tone: 'safe', eui: 'A84041D2E1885C30', body: '{"kind":"set_report_interval","seconds":600}', at: '12 Oct 2026, 09:12', by: 'ops@waterwayz', ack: '09:14' },
  { status: 'dispatched', tone: 'info', eui: 'A84041D2E1885C32', body: '{"kind":"set_vibration_sensitivity","level":40}', at: '12 Oct 2026, 09:31', by: 'ops@waterwayz', ack: '' },
  { status: 'queued', tone: 'offline', eui: 'A84041D2E1889F02', body: '{"kind":"set_shunt_relay","slot":2,"on":true}', at: '12 Oct 2026, 09:38', by: 'ops@waterwayz', ack: '' },
  { status: 'failed', tone: 'danger', eui: 'A84041D2E1887A10', body: '{"kind":"set_power","on":false}', at: '9 Oct 2026, 16:02', by: 'ops@waterwayz', ack: '' },
]
</script>
