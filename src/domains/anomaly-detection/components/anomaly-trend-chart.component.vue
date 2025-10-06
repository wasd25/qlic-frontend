<template>
  <div class="trend-chart">
    <h2>Anomaly Trend</h2>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({ anomalies: Array })
const chartCanvas = ref(null)
let chartInstance = null

function buildChart() {
  if (!props.anomalies || props.anomalies.length === 0) return

  const grouped = {}
  props.anomalies.forEach(a => {
    if (!a.detected_anomaly) return
    const date = a.detected_anomaly.split('T')[0]
    grouped[date] = (grouped[date] || 0) + 1
  })

  const labels = Object.keys(grouped).sort()
  const data = labels.map(date => grouped[date])

  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(chartCanvas.value, {
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
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  })
}

onMounted(() => {
  buildChart()
})

watch(() => props.anomalies, () => {
  buildChart()
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
