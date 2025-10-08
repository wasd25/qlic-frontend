<template>
  <section class="dashboard-page">
    <div class="container">
      <!-- Encabezado -->
      <header class="header">
        <h1>Dashboard</h1>
        <p>Resumen general y accesos rápidos</p>
      </header>

      <!-- 🔔 Alerts & Notifications -->
      <section class="alerts-summary">
        <h2>Alerts & Notifications</h2>
        <AlertSummaryPanel :summary="summary" />
      </section>

      <!-- 📊 Anomaly Detection -->
      <section class="anomaly-summary">
        <h2>Anomaly Detection</h2>
        <AnomalySummaryPanel :anomalies="anomalies" />
      </section>

      <!-- 💳 Billing & Payments Summary -->
      <section class="billing-summary-section">
        <h2 class="billing-title">Billing & Payments</h2>
        <p class="billing-subtext">Manage your billing information, payment methods, and transaction history.</p>

        <section class="billing-summary">
          <BillingSummaryCard title="Current Balance" :value="balanceDisplay" />
          <BillingSummaryCard title="Next Payment" :value="nextPaymentDate" />
          <BillingSummaryCard title="Average Payment" :value="monthlyAverage" />
        </section>
      </section>

      <!-- 📄 Recent Reports -->
      <section class="recent-reports">
        <h2>Recent Reports</h2>
        <ReportHistoryList :reports="recentReports" @download="handleDownload" />
      </section>
    </div>
  </section>
</template>

<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'

// ✅ Usar la URL del backend desde .env
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
  alerts.value = await fetchAlerts()
  anomalies.value = await fetchAnomalies()
  recentReports.value = await fetchRecentReports()
  payments.value = await paymentsService.getPayments()
  settings.value = await paymentsService.getBillingSettings()

  summary.value = {
    critical: alerts.value.filter(a => a.type === 'Critical').length,
    warning: alerts.value.filter(a => a.type === 'Warning').length,
    info: alerts.value.filter(a => a.type === 'Info').length,
    resolvedToday: 15
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
        .sort((a, b) => {
          // Extraer número de días desde el campo "date"
          const daysA = parseInt(a.date)
          const daysB = parseInt(b.date)
          return daysA - daysB // Menor número = más reciente
        })
        .slice(0, 3)
  } catch (error) {
    console.error('Error al cargar reportes recientes:', error)
    return []
  }
}



// 📥 Marcar como descargado y recargar lista
async function handleDownload(report) {
  try {
    await axios.patch(`${BASE_URL}/reports/${report.id}`, {
      downloaded: true
    })
    recentReports.value = await fetchRecentReports()
  } catch (error) {
    console.error('Error al marcar como descargado:', error)
  }
}
</script>

<style scoped>
.dashboard-page {
  background-color: var(--body-bg);
  padding-bottom: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.header p {
  font-size: 1rem;
  color: #6b7280;
}

.alerts-summary,
.anomaly-summary,
.recent-reports {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
}

.alerts-summary h2,
.anomaly-summary h2,
.recent-reports h2 {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

.billing-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.billing-summary > * {
  background: linear-gradient(135deg, #ffffff, #f9fafb);
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  padding: 24px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  position: relative;
  overflow: hidden;
}

.billing-summary > *::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background-color: var(--primary-color);
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
}

.billing-summary > *:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}
</style>
