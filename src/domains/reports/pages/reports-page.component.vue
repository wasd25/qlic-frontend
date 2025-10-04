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
        <report-usage-chart :data="summary.usageTrends" />
        <report-cost-breakdown :data="summary.costBreakdown" />
      </div>

      <!-- Paneles inferiores -->
      <div class="grid bottom-panels">
        <report-efficiency-metrics :metrics="summary.efficiencyMetrics" />
        <report-history-list :reports="reports" @download="downloadReport" />
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

const summary = ref({
  usageTrends: [],
  costBreakdown: [],
  efficiencyMetrics: {},
  recentReports: []
})

const reports = ref([])

async function fetchReports(filters = {}) {
  try {
    const response = await axios.get('http://localhost:3000/reports')
    const allReports = response.data

    // Filtrar por tipo y ubicación si se especifican
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


async function downloadReport(report) {
  await axios.patch(`http://localhost:3000/reports/${report.id}`, {
    downloaded: true
  })
  await fetchReports()
}


async function loadData(filters = {}) {
  const data = await getReportSummary(filters)
  summary.value = data
  await fetchReports(filters)
}



onMounted(() => {
  loadData()
  fetchReports()
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
