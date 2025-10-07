<template>
  <div class="panel">
    <h3>Water Usage Trends</h3>
    <div v-if="data.length">
      <Chart ref="usageChartRef" type="bar" :data="chartData" :options="chartOptions" :plugins="[canvasBackgroundPlugin]" />
    </div>
    <div v-else class="empty">No data available</div>

  </div>

</template>

<script setup>
import { computed } from 'vue'
import Chart from 'primevue/chart'
import { ref, defineExpose } from 'vue'

const usageChartRef = ref(null)

defineExpose({
  getCanvas: () => usageChartRef.value?.$el?.querySelector('canvas')
})

const props = defineProps({ data: Array })



const chartData = computed(() => ({
  labels: props.data.map(d => d.day),
  datasets: [
    {
      label: 'Liters Used',
      data: props.data.map(d => d.liters),
      backgroundColor: '#3B82F6',
      borderRadius: 6
    }
  ]
}))

const canvasBackgroundPlugin = {
  id: 'custom_canvas_background_color',
  beforeDraw: (chart) => {
    const { ctx } = chart
    ctx.save()
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, chart.width, chart.height)
    ctx.restore()
  }
}


const chartOptions = {
  animation: false,
  plugins: {
    custom_canvas_background_color: {}, // activa el plugin por ID
    legend: {
      labels: {
        color: '#374151',
        font: {
          size: 12
        }
      }
    }
  },
  scales: {
    x: {
      ticks: { color: '#6b7280' },
      grid: { color: '#f3f4f6' }
    },
    y: {
      ticks: { color: '#6b7280' },
      grid: { color: '#f3f4f6' }
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
