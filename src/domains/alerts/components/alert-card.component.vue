<template>
  <div :class="['alert-card', alert.type.toLowerCase()]">
    <i :class="iconClass"></i>
    <div class="text">
      <h4>{{ alert.title }}</h4>
      <p>{{ alert.message }}</p>
      <small>{{ alert.timestamp }}</small>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ alert: Object })

const iconClass = {
  Critical: 'pi pi-times-circle text-red-500',
  Warning: 'pi pi-exclamation-triangle text-yellow-500',
  Info: 'pi pi-info-circle text-blue-500'
}[props.alert.type] || 'pi pi-bell'
</script>

<style scoped>
.alert-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  border-left: 4px solid;
}

.alert-card.critical { border-color: #ef4444; }
.alert-card.warning { border-color: #f59e0b; }
.alert-card.info { border-color: #3b82f6; }

.alert-card i {
  font-size: 1.5rem;
  margin-top: 0.25rem;
}

.text h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.text p {
  font-size: 0.9rem;
  color: #374151;
}

.text small {
  font-size: 0.8rem;
  color: #6b7280;
}
</style>
