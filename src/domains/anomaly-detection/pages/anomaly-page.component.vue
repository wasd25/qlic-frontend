<template>
  <div class="anomaly-page">
    <h1>Anomaly Detection</h1>
    <anomaly-summary-panel :anomalies="anomalies" />
    <div class="anomaly-body">
      <anomaly-trend-chart :anomalies="anomalies" />
      <anomaly-table :anomalies="anomalies" />
    </div>
    <div class="anomaly-cards">
      <h2>Recent Anomalies</h2>
      <anomaly-card
          v-for="a in anomalies.slice(0, 3)"
          :key="a.id"
          :anomaly="a"
      />
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
  anomalies.value = await fetchAnomalies()
  console.log('Fetched anomalies:', anomalies.value)
})

</script>

<style scoped>
.anomaly-page {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.anomaly-body {
  display: flex;
  gap: 2rem;
}
.anomaly-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
