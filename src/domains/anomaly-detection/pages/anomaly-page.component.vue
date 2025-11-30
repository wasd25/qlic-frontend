<template>
  <div class="anomaly-page">
    <div class="container">
      <header class="header">
        <h1>{{ $t('anomalySection.title') }}</h1>
      </header>

      <div class="summary-wrapper">
        <anomaly-summary-panel :anomalies="anomalies" />
      </div>

      <div class="anomaly-body">

        <div class="chart-section">
          <h2 class="section-title">{{ $t('anomalySection.trend') }}</h2>
          <div class="chart-container">
            <anomaly-trend-chart :anomalies="anomalies" />
          </div>
        </div>

        <div class="table-section">
          <h2 class="section-title">{{ $t('anomalySection.detected') }}</h2>
          <div class="table-container">
            <!-- wrapper que gestiona el scroll interno -->
            <div class="table-scroll">
              <anomaly-table :anomalies="anomalies" />
            </div>
          </div>
        </div>

      </div>

      <div class="anomaly-cards-section">
        <h2 class="section-title">{{ $t('anomalySection.recent') }}</h2>
        <div class="cards-grid">
          <anomaly-card
              v-for="a in anomalies.slice(0, 3)"
              :key="a.id"
              :anomaly="a"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchAnomalies } from '../services/anomaly.service.js'
import AnomalySummaryPanel from '../components/anomaly-summary-panel.component.vue'
import AnomalyTrendChart from '../components/anomaly-trend-chart.component.vue'
import AnomalyTable from '../components/anomaly-table.component.vue'
import AnomalyCard from '../components/anomaly-card.component.vue'

const anomalies = ref([])

onMounted(async () => {
  try {
    anomalies.value = await fetchAnomalies()
  } catch (error) {
    console.error("Error fetching anomalies", error)
  }
})
</script>

<style scoped>

.anomaly-page {
  background-color: var(--body-bg, #f3f4f6);
  min-height: 100%;
  padding-bottom: 2rem;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
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
  color: #374151;
  margin-bottom: 1rem;
}

.summary-wrapper :deep(> *) {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  width: 100%;
}

.anomaly-body {
  display: flex;
  flex-direction: column; /* MÓVIL: Uno debajo del otro */
  gap: 2rem;
  width: 100%;
}

@media (max-width: 1023px) {
  .chart-container {
    min-height: 220px; /* ajustar según preferencia (180-260px) */
  }
}

@media (min-width: 1024px) {
  .anomaly-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
    gap: 2rem;
  }


  .chart-container,
  .table-container {
    height: 320px;
    min-height: 260px;
  }

   .table-scroll {
    height: 100%;
    overflow-y: auto;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}


.chart-section {
  width: 100%;
  min-width: 0; }

.chart-container {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  position: relative;
  width: 100%;
  min-height: 0;
}

.chart-container canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}


.table-section {
  width: 100%;
  min-width: 0;
}

.table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

   overflow: hidden;
}


.table-scroll {
 overflow-x: auto;
}

.table-container table,
.table-scroll table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.table-container th,
.table-container td,
.table-scroll th,
.table-scroll td {
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
  padding: 0.5rem 0.75rem;
  vertical-align: top;
}

.table-container tr:nth-child(even) {
  background: rgba(0,0,0,0.02);
}

.anomaly-cards-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cards-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
