<template>
  <div :class="['anomaly-card', severityClass]">
    <div class="icon">
      <i :class="iconClass"></i>
    </div>
    <div class="content">
      <h4>{{ anomaly.type }}</h4>
      <p>Profile ID: {{ anomaly.profile_id }}</p>
      <p>{{ formatDate(anomaly.detected_anomaly) }}</p>
      <p :class="anomaly.resolved ? 'resolved' : 'unresolved'">
        {{ anomaly.resolved ? 'Resolved' : 'Unresolved' }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ anomaly: Object })

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleString()
}

function getSeverity(type) {
  if (type.includes('Leak') || type.includes('Low')) return 'critical'
  if (type.includes('High') || type.includes('Unusual')) return 'warning'
  return 'info'
}

const severity = getSeverity(props.anomaly.type)

const iconClass = {
  critical: 'pi pi-exclamation-triangle text-red-500',
  warning: 'pi pi-exclamation-circle text-yellow-500',
  info: 'pi pi-info-circle text-blue-500'
}[severity]

const severityClass = {
  critical: 'border-red',
  warning: 'border-yellow',
  info: 'border-blue'
}[severity]
</script>

<style scoped>
.anomaly-card {
  display: flex;
  gap: 1rem;
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  border-left: 4px solid;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}
.border-red { border-color: #dc2626; }
.border-yellow { border-color: #f59e0b; }
.border-blue { border-color: #3b82f6; }

.icon i {
  font-size: 2rem;
}

.content h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.content p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: #374151;
}

.resolved {
  color: #10b981;
  font-weight: bold;
}

.unresolved {
  color: #dc2626;
  font-weight: bold;
}
</style>
