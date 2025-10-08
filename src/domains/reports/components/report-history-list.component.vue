<template>
  <div class="report-history">
    <h3>{{ $t('reportsSection.recentReports') }}</h3>
    <div class="report-list">
      <div class="report-card" v-for="report in reports" :key="report.id">
        <div class="icon-wrapper">
          <i class="pi pi-file"></i>
        </div>
        <div class="text-wrapper">
          <span class="report-name">
            {{ report.key && $t(`reportsSection.${report.key}`) || report.name }}
          </span>
          <span class="report-date">
            {{ $t('reportsSection.generatedDaysAgo', { days: report.date }) }}
          </span>
        </div>
        <i class="pi pi-download download-icon" @click.stop="download(report)" />
      </div>
    </div>
  </div>
</template>


<script setup>
import axios from 'axios'
import { getReportSummary } from '@/domains/reports/services/report.service.js'
import { exportReportToPDF } from '@/domains/reports/services/pdf.service'

// ✅ Usar la URL del backend desde .env
const BASE_URL = import.meta.env.VITE_API_BASE_URL

defineProps({ reports: Array })

async function download(report) {
  try {
    // 1. Marcar como descargado
    await axios.patch(`${BASE_URL}/reports/${report.id}`, {
      downloaded: true
    })

    // 2. Obtener resumen filtrado
    const filters = {
      type: report.type,
      location: report.location,
      period: 'Last 7 Days'
    }

    const data = await getReportSummary(filters)
    console.log('📊 Datos para PDF:', data)
    console.log('📥 Descargando:', report.name)

    exportReportToPDF(report.type, data)
  } catch (error) {
    console.error('Error al descargar el reporte:', error)
  }
}
</script>

<style scoped>
.report-history {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.report-history h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.report-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.report-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  gap: 1rem;
}

.icon-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
}

.icon-wrapper i {
  font-size: 1.8rem;
  color: #6b7280;
}

.text-wrapper {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.report-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
}

.report-date {
  font-size: 0.85rem;
  color: #6b7280;
}

.download-icon {
  font-size: 1.5rem;
  color: #3b82f6;
  cursor: pointer;
  transition: color 0.2s ease;
}

.download-icon:hover {
  color: #2563eb;
}

.report-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}
</style>
