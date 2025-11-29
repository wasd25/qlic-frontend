<template>
  <div class="anomaly-page">
    <div class="container">
      <header class="header">
        <h1>{{ $t('anomalySection.title') }}</h1>
      </header>

      <div class="summary-wrapper">
        <anomaly-summary-panel :anomalies="anomalies" />
      </div>

      <div class="anomaly-body">

        <div class="chart-section">
          <h2 class="section-title">{{ $t('anomalySection.trend') }}</h2>
          <div class="chart-container">
            <anomaly-trend-chart :anomalies="anomalies" />
          </div>
        </div>

        <div class="table-section">
          <h2 class="section-title">{{ $t('anomalySection.detected') }}</h2>
          <div class="table-container">
            <anomaly-table :anomalies="anomalies" />
          </div>
        </div>

      </div>

      <div class="anomaly-cards-section">
        <h2 class="section-title">{{ $t('anomalySection.recent') }}</h2>
        <div class="cards-grid">
          <anomaly-card
              v-for="a in anomalies.slice(0, 3)"
              :key="a.id"
              :anomaly="a"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchAnomalies } from '../services/anomaly.service.js'
import AnomalySummaryPanel from '../components/anomaly-summary-panel.component.vue'
import AnomalyTrendChart from '../components/anomaly-trend-chart.component.vue'
import AnomalyTable from '../components/anomaly-table.component.vue'
import AnomalyCard from '../components/anomaly-card.component.vue'

const anomalies = ref([])

onMounted(async () => {
  try {
    anomalies.value = await fetchAnomalies()
  } catch (error) {
    console.error("Error fetching anomalies", error)
  }
})
</script>

<style scoped>
/* CONFIGURACIÓN GENERAL DE PÁGINA */
.anomaly-page {
  background-color: var(--body-bg, #f3f4f6);
  min-height: 100%;
  padding-bottom: 2rem;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem; /* Padding reducido para móvil */
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Ajuste padding Desktop */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

.header h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
}

/* --- 1. ARREGLO DEL RESUMEN (Tarjetas de colores) --- */
/* Forzamos grid responsivo en el componente hijo */
.summary-wrapper :deep(> *) {
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  width: 100%;
}

/* --- 2. LAYOUT DEL CUERPO (Chart vs Table) --- */
.anomaly-body {
  display: flex;
  flex-direction: column; /* MÓVIL: Uno debajo del otro */
  gap: 2rem;
  width: 100%;
}

/* DESKTOP: Lado a lado */
@media (min-width: 1024px) {
  .anomaly-body {
    display: grid;
    grid-template-columns: 1fr 1fr; /* 50% Gráfico, 50% Tabla */
    align-items: start;
  }
}

/* Estilos para el contenedor del gráfico */
.chart-section {
  width: 100%;
  min-width: 0; /* Vital para que el gráfico no rompa el layout */
}

.chart-container {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  /* Asegura que el canvas del gráfico se adapte */
  position: relative;
  width: 100%;
}

/* Estilos para la tabla */
.table-section {
  width: 100%;
  min-width: 0;
}

.table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden; /* Redondea bordes */
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  /* IMPORTANTE: Permite scroll horizontal si la tabla es muy ancha en móvil */
  overflow-x: auto;
}

/* --- 3. TARJETAS RECIENTES --- */
.anomaly-cards-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cards-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>