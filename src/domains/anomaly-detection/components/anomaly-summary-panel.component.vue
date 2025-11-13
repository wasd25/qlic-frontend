<template>
  <div class="summary-panel">
    <div class="box critical"><i class="pi pi-exclamation-triangle icon red"></i><div><p>{{ critical }}</p><span>{{ $t('anomalySection.critical') }}</span></div></div>
    <div class="box warning"><i class="pi pi-exclamation-circle icon yellow"></i><div><p>{{ warning }}</p><span>{{ $t('anomalySection.warning') }}</span></div></div>
    <div class="box info"><i class="pi pi-info-circle icon blue"></i><div><p>{{ info }}</p><span>{{ $t('anomalySection.info') }}</span></div></div>
    <div class="box resolved"><i class="pi pi-check-circle icon green"></i><div><p>{{ resolved }}</p><span>{{ $t('anomalySection.resolved') }}</span></div></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({ anomalies: Array })

function mapType(type) {
  if (type.includes('Leak') || type.includes('Low')) return 'critical'
  if (type.includes('High') || type.includes('Unusual')) return 'warning'
  return 'info'
}

const critical = computed(() => {
  return props.anomalies.filter(a => mapType(a.type) === 'critical').length
})

const warning = computed(() => {
  return props.anomalies.filter(a => mapType(a.type) === 'warning').length
})

const info = computed(() => {
  return props.anomalies.filter(a => mapType(a.type) === 'info').length
})

const resolved = computed(() => {
  return props.anomalies.filter(a => a.resolved).length
})

</script>

<style scoped>
.summary-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.box {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-top: 4px solid;
}
.box.critical { border-color: #dc2626; }
.box.warning { border-color: #f59e0b; }
.box.info { border-color: #3b82f6; }
.box.resolved { border-color: #10b981; }
.icon { font-size: 2rem; }
.icon.red { color: #dc2626; }
.icon.yellow { color: #f59e0b; }
.icon.blue { color: #3b82f6; }
.icon.green { color: #10b981; }
</style>
