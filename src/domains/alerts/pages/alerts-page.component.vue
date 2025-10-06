<template>
  <div class="alerts-page">
    <h1>Alerts & Notifications</h1>

    <alert-summary-panel :summary="summary" />

    <div class="alerts-body">
      <!-- Lista de alertas -->
      <div class="left-column">
        <active-alerts-list :alerts="filteredAlerts" />
        <div class="alert-cards">
          <alert-card
              v-for="a in filteredAlerts.slice(0, 3)"
              :key="a.id"
              :alert="a"
          />
        </div>
      </div>

      <!-- Panel de configuración -->
      <div class="right-column">
        <notification-settings
            :settings="settings"
            @save="saveSettings"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchAlerts, fetchSettings, saveNotificationSettings } from '../services/alerts.service.js'
import AlertSummaryPanel from '../components/alert-summary-panel.component.vue'
import ActiveAlertsList from '../components/active-alerts-list.component.vue'
import NotificationSettings from '../components/notification-settings.component.vue'
import AlertCard from '../components/alert-card.component.vue'

const alerts = ref([])
const settings = ref({})
const summary = ref({})
const activeFilter = ref([])

onMounted(async () => {
  alerts.value = await fetchAlerts()
  settings.value = await fetchSettings()

  activeFilter.value = settings.value.types?.length
      ? settings.value.types
      : ['Critical Alerts', 'Usage Warnings', 'Maintenance Reminders']

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
  activeFilter.value = newSettings.types
}

const filteredAlerts = computed(() =>
    alerts.value.filter(a => {
      const labelMap = {
        'Critical Alerts': 'Critical',
        'Usage Warnings': 'Warning',
        'Maintenance Reminders': 'Info'
      }
      return activeFilter.value.includes(
          Object.keys(labelMap).find(key => labelMap[key] === a.type)
      )
    })
)
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
  align-items: flex-start;
}

.left-column {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.right-column {
  flex: 1;
  min-width: 280px;
}
</style>
