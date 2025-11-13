<template>
  <section class="metrics">
    <div class="metric-card">
      <h4>{{$t('usageSection.current')}}</h4>
      <p>{{ summary.current }} {{$t('usageSection.gallon')}}</p>
    </div>
    <div class="metric-card">
      <h4>{{$t('usageSection.daily')}}</h4>
      <p>{{ summary.dailyLimit }} {{$t('usageSection.gallon')}}</p>
    </div>
    <div class="metric-card">
      <h4>{{$t('usageSection.monthly')}}</h4>
      <p>{{ summary.monthlyTotal }} {{$t('usageSection.gallon')}}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const summary = ref({ current: 0, dailyLimit: 0, monthlyTotal: 0 })

onMounted(async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/usageSummary')
    summary.value = data
  } catch (error) {
    console.error('Error fetching usage summary:', error)
  }
})
</script>

<style scoped>
.metrics {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.metric-card {
  flex: 1 1 200px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.metric-card h4 {
  font-size: 1rem;
  color: #374151;
}
.metric-card p {
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
}

/* Responsive ajustes */
@media (max-width: 768px) {
  .metrics {
    flex-direction: column;
  }
  .metric-card {
    flex: 1 1 100%;
  }
}
</style>
