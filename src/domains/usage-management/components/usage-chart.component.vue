<template>
  <section class="chart-section">
    <h3>Daily Usage (Last 7 Days)</h3>
    <div class="chart-wrapper">
      <canvas ref="chartRef"></canvas>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'
import axios from 'axios'

const chartRef = ref(null)

onMounted(async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/reportSummaries/1')
    const labels = data.usageTrends.map(item => item.day)
    const values = data.usageTrends.map(item => item.liters)

    new Chart(chartRef.value, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Liters Used',
          data: values,
          backgroundColor: '#60a5fa'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 50
            }
          }
        }
      }
    })
  } catch (error) {
    console.error('Error loading usage chart data:', error)
  }
})
</script>

<style scoped>
.chart-section {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.chart-section h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #1f2937;
}
.chart-wrapper {
  position: relative;
  width: 100%;
  height: 300px;
}
@media (max-width: 768px) {
  .chart-section {
    padding: 0.75rem;
  }
  .chart-section h3 {
    font-size: 1rem;
  }
  .chart-wrapper {
    height: 250px;
  }
}
</style>
