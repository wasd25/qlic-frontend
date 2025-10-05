<template>
  <div class="summary-panel">
    <div class="summary-box critical">
      <div class="icon-wrapper">
        <i class="pi pi-exclamation-triangle"></i>
      </div>
      <div class="text">
        <p class="count">{{ summary.critical }}</p>
        <p class="label">Critical Alerts</p>
      </div>
    </div>

    <div class="summary-box warning">
      <div class="icon-wrapper">
        <i class="pi pi-exclamation-circle"></i>
      </div>
      <div class="text">
        <p class="count">{{ summary.warning }}</p>
        <p class="label">Warnings</p>
      </div>
    </div>

    <div class="summary-box info">
      <div class="icon-wrapper">
        <i class="pi pi-info-circle"></i>
      </div>
      <div class="text">
        <p class="count">{{ summary.info }}</p>
        <p class="label">Info Alerts</p>
      </div>
    </div>

    <div class="summary-box resolved">
      <div class="icon-wrapper">
        <i class="pi pi-check-circle"></i>
      </div>
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
  gap: 1.25rem;
}

.summary-box {
  background-color: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  gap: 1rem;
  border-top: 5px solid;
}

.summary-box.critical {
  border-color: #dc2626;
}
.summary-box.warning {
  border-color: #f59e0b;
}
.summary-box.info {
  border-color: #3b82f6;
}
.summary-box.resolved {
  border-color: #10b981;
}

.icon-wrapper {
  background-color: #f3f4f6;
  border-radius: 50%;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.summary-box.critical .icon-wrapper {
  background-color: #fee2e2;
}
.summary-box.warning .icon-wrapper {
  background-color: #fef3c7;
}
.summary-box.info .icon-wrapper {
  background-color: #dbeafe;
}
.summary-box.resolved .icon-wrapper {
  background-color: #d1fae5;
}

.icon-wrapper i {
  font-size: 1.75rem;
  color: inherit;
}

.summary-box.critical i {
  color: #dc2626;
}
.summary-box.warning i {
  color: #f59e0b;
}
.summary-box.info i {
  color: #3b82f6;
}
.summary-box.resolved i {
  color: #10b981;
}

.text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.count {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.label {
  font-size: 0.95rem;
  color: #374151;
  margin: 0;
}
</style>
