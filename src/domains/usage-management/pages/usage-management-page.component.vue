<template>
  <div class="usage-management-page">
    <!-- Encabezado tipo Reports -->
    <section class="page-header">
      <h1 class="page-title">Usage Management</h1>
      <p class="page-description">
        Comprehensive water usage tracking and optimization tools.
      </p>
    </section>

    <!-- Componentes funcionales -->
    <UsageSummaryPanel />
    <UsageChart />
    <UsageEventsTable />
    <UsageSettingsPanel />
  </div>
</template>

<script setup>
import UsageSummaryPanel from '../components/usage-summary-panel.component.vue'
import UsageChart from '../components/usage-chart.component.vue'
import UsageEventsTable from '../components/usage-events-table.component.vue'
import UsageSettingsPanel from '../components/usage-settings-panel.component.vue'
</script>

<style scoped>
.usage-management-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

/* Encabezado tipo Reports */
.page-header {
  margin-bottom: 1rem;
}
.page-title {
  font-size: 2rem;
  font-weight: 600;
  color: #1f2937;
}
.page-description {
  font-size: 1rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

/* Responsive ajustes */
@media (max-width: 768px) {
  .usage-management-page {
    padding: 1rem;
  }
  .page-title {
    font-size: 1.5rem;
  }
  .page-description {
    font-size: 0.9rem;
  }
}
</style>
