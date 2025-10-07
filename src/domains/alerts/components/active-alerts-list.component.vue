<template>
  <div class="active-alerts">
    <h2>Active Alerts</h2>
    <div v-if="alerts.length === 0" class="empty">No active alerts</div>
    <div v-else class="alert-list">
      <alert-card
          v-for="alert in alerts"
          :key="alert.id"
          :alert="alert"
      />
    </div>
  </div>
</template>

<script setup>
import AlertCard from './alert-card.component.vue'
const props = defineProps({ alerts: Array })
</script>