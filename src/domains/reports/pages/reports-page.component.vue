<template>
  <section class="reports-page">
    <div class="container">
      <header class="header">
        <h1>{{ $t('reportsSection.title') }}</h1>
        <p>{{ $t('reportsSection.subtitle') }}</p>
      </header>

      <report-filter @generate="loadData" />

      <div class="grid panels">
        <div class="chart-wrapper">
          <report-usage-chart
              ref="usageChartComponent"
              :data="summary.usageTrends"
              :title="$t('reportsSection.trends')"
          />
        </div>
        <div class="chart-wrapper">
          <report-cost-breakdown
              :data="summary.costBreakdown"
              :title="$t('reportsSection.costBreakdown')"
          />
        </div>
      </div>

      <div class="grid bottom-panels">
        <div class="panel-wrapper">
          <report-efficiency-metrics
              :metrics="summary.efficiencyMetrics"
              :title="$t('reportsSection.efficiencyMetrics')"
          />
        </div>
        <div class="panel-wrapper">
          <report-history-list
              :reports="reports"
              @download="downloadReport"
          />
        </div>
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

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const usageChartComponent = ref(null)

const summary = ref({
  usageTrends: [],
  costBreakdown: [],
  efficiencyMetrics: {}
})

const reports = ref([])

async function downloadReport(report) {
  try {
    await axios.patch(`${BASE_URL}/reports/${report.id}`, { downloaded: true })
    await fetchReports(currentFilters.value)
  } catch (error) {
    console.error('Error al marcar como descargado:', error)
  }
}

async function loadData(filters = {}) {
  currentFilters.value = filters
  const data = await getReportSummary(filters)
  summary.value = data
  await fetchReports(filters)
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.reports-page {
  background-color: var(--body-bg);
  padding-bottom: 2rem;
  min-height: 100%;
}

/* CONTAINER RESPONSIVO */
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem; /* Padding reducido para móvil */
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Ajuste padding desktop */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

.header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.header p {
  font-size: 1rem;
  color: #6b7280;
}

/* --- GRID SYSTEM ARREGLADO --- */
.grid {
  display: grid;
  /* POR DEFECTO: 1 Columna (Móvil) */
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
}

/* MEDIA QUERY: Solo en pantallas grandes pasa a 2 columnas */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: 1fr 1fr; /* 50% - 50% */
  }
}

.panels,
.bottom-panels {
  margin-top: 1rem;
}

/* Wrappers para asegurar que los gráficos no rompan el layout */
.chart-wrapper, .panel-wrapper {
  background: transparent;
  min-width: 0; /* CRUCIAL: Evita que Chart.js empuje el ancho más allá del límite */
  width: 100%;
}

/* Estilos profundos para forzar comportamiento en hijos si es necesario */
:deep(.card), :deep(.panel) {
  width: 100% !important;
  box-sizing: border-box;
}
</style>