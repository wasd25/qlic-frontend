<template>
  <div class="alerts-page">
    <h1>Alerts & Notifications</h1>
    <alert-summary-panel :summary="summary" />
    <div class="alerts-body">
      <active-alerts-list :alerts="alerts" />
      <notification-settings :settings="settings" @save="saveSettings" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchAlerts, fetchSettings, saveNotificationSettings } from '../services/alerts.service.js'
import AlertSummaryPanel from '../components/alert-summary-panel.component.vue'
import ActiveAlertsList from '../components/active-alerts-list.component.vue'
import NotificationSettings from '../components/notification-settings.component.vue'

const alerts = ref([])
const settings = ref({})
const summary = ref({})

onMounted(async () => {
  alerts.value = await fetchAlerts()
  console.log('Fetched alerts:', alerts.value) // <-- Agrega esto para verificar
  settings.value = await fetchSettings()
  summary.value = {
    critical: alerts.value.filter(a => a.type === 'Critical').length,
    warning: alerts.value.filter(a => a.type === 'Warning').length,
    info: alerts.value.filter(a => a.type === 'Info').length,
    resolvedToday: 15
  }
})



function saveSettings(newSettings) {
  saveNotificationSettings(newSettings)
  settings.value = newSettings
}
</script>

<style scoped>
.alerts-page {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.alerts-body {
  display: flex;
  gap: 2rem;
}
</style>
