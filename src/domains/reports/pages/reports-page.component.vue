<template>
  <section class="reports-page">
    <div class="container">
      <!-- Encabezado -->
      <header class="header">
        <h1>Reports & Analytics</h1>
        <p>Comprehensive water usage analytics and detailed reporting</p>
      </header>

      <!-- Filtros -->
      <report-filter @generate="loadData" />

      <!-- Paneles principales -->
      <div class="grid panels">
        <report-usage-chart ref="usageChartComponent" :data="summary.usageTrends" />


        <report-cost-breakdown :data="summary.costBreakdown" />
      </div>

      <!-- Paneles inferiores -->
      <div class="grid bottom-panels">
        <report-efficiency-metrics :metrics="summary.efficiencyMetrics" />
        <report-history-list :reports="reports" @download="downloadReport" />
      </div>
    </div>
  </section>

  <Button label="Descargar PDF" @click="handleDownload" />

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
import { exportReportToPDF } from '../services/pdf.service.js'


const usageChartComponent = ref(null)

function handleDownload() {
  const type = currentFilters.value.type || 'Usage Analytics'
  const canvas = usageChartComponent.value?.getCanvas()
  exportReportToPDF(type, summary.value, canvas)
}


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
    const response = await axios.get('http://localhost:3000/reports')
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
    await axios.patch(`http://localhost:3000/reports/${report.id}`, {
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