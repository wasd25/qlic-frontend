<template>
  <div class="panel">
    <h3>Cost Breakdown</h3>
    <div v-if="data.length">
      <Chart type="pie" :data="chartData" :options="chartOptions" />
    </div>
    <div v-else class="empty">No data available</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Chart from 'primevue/chart'

const props = defineProps({ data: Array })

const chartData = computed(() => ({
  labels: props.data.map(d => d.category),
  datasets: [
    {
      data: props.data.map(d => d.cost),
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
    }
  ]
}))

const chartOptions = {
  plugins: {
    legend: {
      labels: {
        color: '#374151'
      }
    }
  }
}
</script>


<style scoped>
.panel {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.panel h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

.empty {
  color: #9ca3af;
  font-style: italic;
}
</style>


