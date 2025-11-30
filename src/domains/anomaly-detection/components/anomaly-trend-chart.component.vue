<template>
  <div class="trend-chart">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import Chart from 'chart.js/auto'
import { useI18n } from 'vue-i18n'

const props = defineProps({ anomalies: Array })
const chartCanvas = ref(null)
let chartInstance = null
const { t } = useI18n()

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
        label: t('anomalyChart.anomaliesPerDay'),
        data,
        backgroundColor: '#3b82f6'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // <-- importante
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 }
        }
      }
    }
  })
}

onMounted(buildChart)
watch(() => props.anomalies, buildChart)
</script>

<style scoped>
.trend-chart {
  background-color: transparent;
  padding: 0;
  border-radius: 12px;
  }

.trend-chart canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
</style>