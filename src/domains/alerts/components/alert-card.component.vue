<template>
  <div :class="['alert-card', alert.type.toLowerCase()]">
    <div class="icon-section">
      <i :class="iconClass" class="main-icon"></i>
    </div>
    <div class="content">
      <h4>{{ alert.title }}</h4>
      <p>{{ alert.message }}</p>
      <small>{{ alert.timestamp }}</small>
    </div>
    <div class="dismiss">
      <i :class="dismissIconClass"></i>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ alert: Object })

const iconClass = {
  Critical: 'pi pi-exclamation-triangle text-red-500',
  Warning: 'pi pi-exclamation-circle text-yellow-500',
  Info: 'pi pi-info-circle text-blue-500'
}[props.alert.type] || 'pi pi-bell'

const dismissIconClass = {
  Critical: 'pi pi-times text-red-500',
  Warning: 'pi pi-times text-yellow-500',
  Info: 'pi pi-times text-blue-500'
}[props.alert.type] || 'pi pi-times'
</script>

<style scoped>
.alert-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  border-left: 4px solid;
}

.alert-card.critical { border-color: #dc2626; }
.alert-card.warning { border-color: #f59e0b; }
.alert-card.info { border-color: #3b82f6; }

.icon-section {
  flex-shrink: 0;
  margin-right: 1rem;
}

.main-icon {
  font-size: 1.8rem;
}

.content {
  flex-grow: 1;
}

.content h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.content p {
  font-size: 0.9rem;
  margin: 0 0 0.25rem 0;
  color: #374151;
}

.content small {
  font-size: 0.8rem;
  color: #6b7280;
}

.dismiss {
  flex-shrink: 0;
  margin-left: 1rem;
}

.dismiss i {
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
