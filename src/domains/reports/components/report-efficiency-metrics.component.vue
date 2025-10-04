<template>
  <div class="efficiency-panel">
    <h3>Efficiency Metrics</h3>

    <div v-if="metrics && Object.keys(metrics).length">
      <!-- Mostrar score y barras -->
    </div>
    <div v-else class="empty">No data available</div>


    <!-- Water Efficiency Score -->
    <div class="score-block">
      <label>Water Efficiency Score</label>
      <div class="score-value">{{ metrics.score }}%</div>
      <div class="progress-bar">
        <div class="fill" :style="{ width: metrics.score + '%' }"></div>
      </div>
    </div>

    <!-- Water Saved & Cost Saved -->
    <div class="metrics-row">
      <div class="metric-box water">
        <div class="metric-value">{{ metrics.saved }}L</div>
        <div class="metric-label">Water Saved</div>
      </div>
      <div class="metric-box cost">
        <div class="metric-value">${{ metrics.cost }}</div>
        <div class="metric-label">Cost Saved</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ metrics: Object })
</script>

<style scoped>
.efficiency-panel {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.efficiency-panel h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
}

.score-block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
}

.score-block label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #6b7280;
}

.score-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #10b981;
  text-align: right;
  margin-bottom: 0.25rem;
}

.progress-bar {
  height: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background-color: #10b981;
  transition: width 0.3s ease;
}

.metrics-row {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.metric-box {
  flex: 1 1 200px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
}

.metric-value {
  font-size: 1.4rem;
  font-weight: 700;
}

.metric-label {
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.25rem;
}

.metric-box.water .metric-value {
  color: #3b82f6;
}

.metric-box.cost .metric-value {
  color: #10b981;
}
</style>
