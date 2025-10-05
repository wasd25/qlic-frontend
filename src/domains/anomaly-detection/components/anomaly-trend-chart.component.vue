<template>
  <div class="trend-chart">
    <h2>Anomaly Trend</h2>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({ anomalies: Array })
const chartCanvas = ref(null)

onMounted(() => {
  const grouped = {}
  props.anomalies.forEach(a => {
    const date = a.detected_anomaly.split('T')[0]
    grouped[date] = (grouped[date] || 0) + 1
  })

  const labels = Object.keys(grouped).sort()
  const data = Object.values(grouped)

  new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Anomalies per Day',
        data,
        backgroundColor: '#3b82f6'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  })
})
</script>

<style scoped>
.trend-chart {
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  flex: 1;
}
.trend-chart h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}
</style>
