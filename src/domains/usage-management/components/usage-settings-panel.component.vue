<template>
  <section class="settings-section">
    <h3>{{ $t('usageSection.settings') }}</h3>
    <div class="controls">
      <button @click="editLimits">{{ $t('usageSection.edit') }}</button>
      <button @click="toggleAlerts">
        {{ alertsEnabled ? $t('usageSettings.disableAlerts') : $t('usageSettings.enableAlerts') }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  getNotificationSettings,
  updateNotificationSettings
} from '../services/usage.service.js'

const alertsEnabled = ref(false)
const { t } = useI18n()

onMounted(async () => {
  try {
    const data = await getNotificationSettings()
    const types = data?.types ?? data?.notificationTypes ?? data?.notifications ?? []
    alertsEnabled.value = Array.isArray(types) && types.includes('Critical Alerts')
  } catch (err) {
    console.error('Error en componente usage-settings (carga):', err)
  }
})

async function toggleAlerts() {
  try {
    const newTypes = alertsEnabled.value ? [] : ['Critical Alerts']
    const ok = await updateNotificationSettings({ types: newTypes })
    if (ok) alertsEnabled.value = !alertsEnabled.value
    else console.error('updateNotificationSettings no encontró ruta válida')
  } catch (err) {
    console.error('Error en componente usage-settings (update):', err)
  }
}

function editLimits() {
  alert(t('usageSettings.editLimitsModal'))
}
</script>


<style scoped>
.settings-section {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.settings-section h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #1f2937;
}
.controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  flex: 1 1 150px;
  text-align: center;
}
button:hover {
  background-color: #2563eb;
}

/* Responsive ajustes */
@media (max-width: 768px) {
  .settings-section {
    padding: 0.75rem;
  }
  .settings-section h3 {
    font-size: 1rem;
  }
  .controls {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
