<template>
  <div class="summary-panel">
    <div class="box critical">
      <i class="pi pi-exclamation-triangle icon red"></i>
      <div class="text">
        <p class="count">{{ summary.critical }}</p>
        <p class="label">Critical Alerts</p>
      </div>
    </div>
    <div class="box warning">
      <i class="pi pi-exclamation-circle icon yellow"></i>
      <div class="text">
        <p class="count">{{ summary.warning }}</p>
        <p class="label">Warnings</p>
      </div>
    </div>
    <div class="box info">
      <i class="pi pi-info-circle icon blue"></i>
      <div class="text">
        <p class="count">{{ summary.info }}</p>
        <p class="label">Info Alerts</p>
      </div>
    </div>
    <div class="box resolved">
      <i class="pi pi-check-circle icon green"></i>
      <div class="text">
        <p class="count">{{ summary.resolvedToday }}</p>
        <p class="label">Resolved Today</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ summary: Object })
</script>

<style scoped>
.summary-panel {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.box {
  background-color: white;
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-top: 4px solid;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.box.critical { border-color: #dc2626; }
.box.warning { border-color: #f59e0b; }
.box.info { border-color: #3b82f6; }
.box.resolved { border-color: #10b981; }

.icon {
  font-size: 2rem;
}

.icon.red { color: #dc2626; }
.icon.yellow { color: #f59e0b; }
.icon.blue { color: #3b82f6; }
.icon.green { color: #10b981; }

.text {
  display: flex;
  flex-direction: column;
}

.count {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  color: #111827;
}

.label {
  font-size: 0.95rem;
  color: #374151;
  margin: 0;
}
</style>
