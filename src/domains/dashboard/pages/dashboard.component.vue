<template>
  <section class="dashboard-page">
    <div class="container">
      <header class="header">
        <h1>{{ $t('sidebar.dashboard') }}</h1>
        <p>{{ $t('dashboard.subtitle') }}</p>
      </header>

      <section class="bounded-context alerts-summary">
        <h2>{{ $t('dashboard.alertsAndNotifications') }}</h2>
        <div class="component-wrapper">
          <AlertSummaryPanel :summary="summary" />
        </div>
      </section>

      <section class="bounded-context anomaly-summary">
        <h2>{{ $t('dashboard.anomalyDetection') }}</h2>
        <div class="component-wrapper">
          <AnomalySummaryPanel :anomalies="anomalies" />
        </div>
      </section>

      <section class="bounded-context billing-summary-section">
        <header class="section-header">
          <h2 class="billing-title">{{ $t('dashboard.billingAndPayments') }}</h2>
          <p class="billing-subtext">{{ $t('dashboard.manageBilling') }}</p>
        </header>

        <section class="billing-summary">
          <BillingSummaryCard :title="$t('dashboard.currentBalance')" :value="balanceDisplay" />
          <BillingSummaryCard :title="$t('dashboard.nextPayment')" :value="nextPaymentDate" />
          <BillingSummaryCard :title="$t('dashboard.averagePayment')" :value="monthlyAverage" />
        </section>
      </section>

      <section class="bounded-context recent-reports">
        <h2>{{ $t('dashboard.recentReports') }}</h2>
        <ReportHistoryList :reports="recentReports" @download="handleDownload" />
      </section>
    </div>
  </section>
</template>

<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// 🧩 Componentes
import BillingSummaryCard from '@/domains/payments/components/BillingSummaryCard.vue'
import AlertSummaryPanel from '@/domains/alerts/components/alert-summary-panel.component.vue'
import ReportHistoryList from '@/domains/reports/components/report-history-list.component.vue'
import AnomalySummaryPanel from '@/domains/anomaly-detection/components/anomaly-summary-panel.component.vue'

// 📡 Servicios
import paymentsService from '@/domains/payments/services/payments.service.js'
import { fetchAlerts } from '@/domains/alerts/services/alerts.service.js'
import { fetchAnomalies } from '@/domains/anomaly-detection/services/anomaly.service.js'

const alerts = ref([])
const summary = ref({})
const recentReports = ref([])
const anomalies = ref([])
const payments = ref([])
const settings = ref({})

onMounted(async () => {
  try {
    // Parallel fetch para que cargue más rápido
    const [alertsData, anomaliesData, reportsData, paymentsData, settingsData] = await Promise.all([
      fetchAlerts(),
      fetchAnomalies(),
      fetchRecentReports(),
      paymentsService.getPayments(),
      paymentsService.getBillingSettings()
    ])

    alerts.value = alertsData
    anomalies.value = anomaliesData
    recentReports.value = reportsData
    payments.value = paymentsData
    settings.value = settingsData

    summary.value = {
      critical: alerts.value.filter(a => a.type === 'Critical').length,
      warning: alerts.value.filter(a => a.type === 'Warning').length,
      info: alerts.value.filter(a => a.type === 'Info').length,
      resolvedToday: 15
    }
  } catch (error) {
    console.error("Error loading dashboard data", error)
  }
})

const balanceDisplay = computed(() =>
    `$${payments.value.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}`
)

const nextPaymentDate = computed(() => {
  const next = settings.value?.preferredBillingDay ?? 1
  const month = new Date().getMonth() + 2
  const year = new Date().getFullYear()
  return `${String(next).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`
})

const monthlyAverage = computed(() => {
  if (payments.value.length === 0) return '$0.00'
  const avg = payments.value.reduce((sum, p) => sum + p.amount, 0) / payments.value.length
  return `$${avg.toFixed(2)}`
})

async function fetchRecentReports() {
  try {
    const response = await axios.get(`${BASE_URL}/reports`)
    return response.data
        .sort((a, b) => parseInt(a.date) - parseInt(b.date))
        .slice(0, 3)
  } catch (error) {
    console.error('Error al cargar reportes recientes:', error)
    return []
  }
}

async function handleDownload(report) {
  try {
    await axios.patch(`${BASE_URL}/reports/${report.id}`, { downloaded: true })
    recentReports.value = await fetchRecentReports()
  } catch (error) {
    console.error('Error al marcar como descargado:', error)
  }
}
</script>

<style scoped>
.dashboard-page {
  background-color: var(--body-bg, #f3f4f6);
  min-height: 100%;
}

/* 1. CONTENEDOR RESPONSIVO */
.container {
  max-width: 1400px; /* Un poco más ancho para pantallas modernas */
  margin: 0 auto;
  padding: 1rem; /* Menos padding en móvil (antes era 2rem) */
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Ajuste para Tablet/Desktop */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

.header h1 {
  font-size: 1.75rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.5rem;
}
.header p {
  color: #6b7280;
}

/* 2. BOUNDED CONTEXTS (Secciones) */
.bounded-context {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bounded-context h2 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #374151;
  margin: 0;
}

/* 3. ARREGLO MÁGICO PARA ALERTAS Y ANOMALÍAS (Usando :deep) */
/* Esto fuerza a los componentes hijos a usar Grid en lugar de Flex overflow */
.alerts-summary :deep(> *),
.anomaly-summary :deep(> *),
.component-wrapper :deep(> *) {
  display: grid !important;
  /* Mínimo 140px por tarjeta en móvil, se expande a columnas auto en desktop */
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  width: 100%;
}

/* 4. BILLING SUMMARY GRID */
.billing-summary-section .billing-subtext {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.billing-summary {
  display: grid;
  /* Reduje el minmax a 220px para que quepan mejor en laptops pequeñas con sidebar */
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.billing-summary > * {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Borde izquierdo de color (estilo visual) */
.billing-summary > *::before {
  content: "";
  position: absolute;
  top: 0; left: 0; bottom: 0;
  width: 4px;
  background-color: #3b82f6; /* Color primario por defecto */
}
/* Variaciones de color para las tarjetas */
.billing-summary > *:nth-child(2)::before { background-color: #f59e0b; } /* Naranja */
.billing-summary > *:nth-child(3)::before { background-color: #10b981; } /* Verde */

.billing-summary > *:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* 5. RECENT REPORTS */
.recent-reports {
  margin-top: 1rem;
}
</style>