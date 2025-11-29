<template>
  <div class="alerts-page">
    <div class="container">
      <header class="header">
        <h1>{{ $t('alertsSection.title') }}</h1>
      </header>

      <div class="summary-wrapper">
        <alert-summary-panel :summary="summary" />
      </div>

      <div class="alerts-body">
        <div class="left-column">
          <h2 class="section-title">{{ $t('alertsSection.active') }}</h2>

          <active-alerts-list :alerts="filteredAlerts" />

          <div class="alert-cards-grid">
            <alert-card
                v-for="a in filteredAlerts.slice(0, 3)"
                :key="a.id"
                :alert="a"
            />
          </div>
        </div>

        <div class="right-column">
          <div class="sticky-wrapper">
            <notification-settings
                :settings="settings"
                @save="saveSettings"
            />
          </div>
        </div>
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
  /* Fondo general y padding básico */
  background-color: var(--body-bg, #f3f4f6);
  min-height: 100%;
  padding-bottom: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem; /* Padding pequeño para móvil */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Ajuste padding en escritorio */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    gap: 2rem;
  }
}

.header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #374151;
}

/* --- 1. ARREGLO DEL RESUMEN (Tarjetas de colores) --- */
/* Forzamos al hijo (alert-summary-panel) a ser Grid */
.summary-wrapper :deep(> *) {
  display: grid !important;
  /* Se adaptan: mínimo 150px, si hay espacio se estiran */
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  width: 100%;
}

/* --- 2. LAYOUT PRINCIPAL (Izquierda vs Derecha) --- */
.alerts-body {
  display: flex;
  flex-direction: column; /* POR DEFECTO: Columna (Móvil) */
  gap: 2rem;
  align-items: flex-start;
}

/* MEDIA QUERY: Solo en Desktop se ponen lado a lado */
@media (min-width: 1024px) {
  .alerts-body {
    flex-direction: row; /* Vuelve a ser fila */
  }
}

/* --- COLUMNA IZQUIERDA (Alertas) --- */
.left-column {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* En desktop recupera su proporción flex: 2 */
@media (min-width: 1024px) {
  .left-column {
    flex: 2;
  }
}

/* --- COLUMNA DERECHA (Configuración) --- */
.right-column {
  width: 100%;
  /* min-width eliminado para evitar desbordes en celulares muy pequeños */
}

/* En desktop recupera su proporción flex: 1 */
@media (min-width: 1024px) {
  .right-column {
    flex: 1;
    min-width: 280px; /* Aquí sí es seguro poner min-width */
  }

  /* Truco UX: Que el panel de configuración te siga al bajar */
  .sticky-wrapper {
    position: sticky;
    top: 2rem;
  }
}

/* --- GRID PARA LAS ALERT CARDS --- */
.alert-cards-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>