<template>
  <div class="active-alerts">
    <h2>Active Alerts</h2>
    <div v-if="alerts.length === 0" class="empty">No active alerts</div>
    <div v-else class="alert-list">
      <alert-card v-for="alert in alerts" :key="alert.id" :alert="alert" />
    </div>
  </div>
</template>

<script setup>
import AlertCard from './alert-card.component.vue'
const props = defineProps({ alerts: Array })
</script>

<style scoped>
.active-alerts h2 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
}

.empty {
  font-size: 0.95rem;
  color: #6b7280;
}

.alert-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
