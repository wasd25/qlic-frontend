<template>
  <div class="alerts-page">
    <header class="alerts-header">
      <h1>Alerts & Notifications</h1>
      <p>Monitor and manage your water system alerts and notification preferences.</p>
    </header>

    <alert-summary-panel :summary="summary" />

    <div class="alerts-body">
      <div class="alerts-left">
        <active-alerts-list :alerts="alerts" />
      </div>
      <div class="alerts-right">
        <notification-settings :settings="settings" @save="saveSettings" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AlertSummaryPanel from '../components/alert-summary-panel.component.vue'
import ActiveAlertsList from '../components/active-alerts-list.component.vue'
import NotificationSettings from '../components/notification-settings.component.vue'
import { fetchAlerts, fetchSettings, saveNotificationSettings } from '../services/alerts.service.js'

const alerts = ref([])
const summary = ref({})
const settings = ref({})

async function loadData() {
  alerts.value = await fetchAlerts()
  settings.value = await fetchSettings()

  summary.value = {
    critical: alerts.value.filter(a => a.type === 'Critical').length,
    warning: alerts.value.filter(a => a.type === 'Warning').length,
    info: alerts.value.filter(a => a.type === 'Info').length,
    resolvedToday: 15
  }
}

async function saveSettings(newSettings) {
  await saveNotificationSettings(newSettings)
  settings.value = newSettings
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.alerts-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  background-color: #f9fafb;
}

.alerts-header h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2937;
}

.alerts-header p {
  font-size: 1rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

.alerts-body {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.alerts-left {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.alerts-right {
  flex: 1;
  min-width: 320px;
}
</style>
