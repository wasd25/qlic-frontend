<template>
  <section class="reports-page">
    <div class="container">
      <!-- Encabezado -->
      <header class="header">
        <h1>{{ $t('reportsSection.title') }}</h1>
        <p>{{ $t('reportsSection.subtitle') }}</p>
      </header>

      <!-- Filtros -->
      <report-filter @generate="loadData" />

      <!-- Paneles principales -->
      <div class="grid panels">
        <report-usage-chart
            ref="usageChartComponent"
            :data="summary.usageTrends"
            :title="$t('reportsSection.trends')"
        />
        <report-cost-breakdown
            :data="summary.costBreakdown"
            :title="$t('reportsSection.costBreakdown')"
        />
      </div>

      <!-- Paneles inferiores -->
      <div class="grid bottom-panels">
        <report-efficiency-metrics
            :metrics="summary.efficiencyMetrics"
            :title="$t('reportsSection.efficiencyMetrics')"
        />
        <report-history-list
            :reports="reports"
            @download="downloadReport"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ReportFilter from '../components/report-filter.component.vue'
import ReportUsageChart from '../components/report-usage-chart.component.vue'
import ReportCostBreakdown from '../components/report-cost-breakdown.component.vue'
import ReportEfficiencyMetrics from '../components/report-efficiency-metrics.component.vue'
import ReportHistoryList from '../components/report-history-list.component.vue'
import { getReportSummary } from '../services/report.service.js'

// ✅ Usar la URL del backend desde .env
const BASE_URL = import.meta.env.VITE_API_BASE_URL

const usageChartComponent = ref(null)

const summary = ref({
  usageTrends: [],
  costBreakdown: [],
  efficiencyMetrics: {}
})

const reports = ref([])
const currentFilters = ref({})

// 🔄 Cargar reportes desde db.json y aplicar filtros si existen
async function fetchReports(filters = {}) {
  try {
    const response = await axios.get(`${BASE_URL}/reports`)
    const allReports = response.data

    const filtered = allReports.filter(report => {
      const matchType = filters.type ? report.type === filters.type : true
      const matchLocation = filters.location ? report.location === filters.location : true
      return matchType && matchLocation
    })

    reports.value = filtered
  } catch (error) {
    console.error('Error al cargar los reportes:', error)
  }
}

// 📥 Marcar como descargado y recargar lista
async function downloadReport(report) {
  try {
    await axios.patch(`${BASE_URL}/reports/${report.id}`, {
      downloaded: true
    })
    await fetchReports(currentFilters.value)
  } catch (error) {
    console.error('Error al marcar como descargado:', error)
  }
}

// 🔄 Generar resumen y cargar reportes filtrados
async function loadData(filters = {}) {
  currentFilters.value = filters
  const data = await getReportSummary(filters)
  summary.value = data
  await fetchReports(filters)
}

// 🟢 Cargar datos iniciales sin filtros
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.reports-page {
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

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.panels,
.bottom-panels {
  margin-top: 1rem;
}
</style>