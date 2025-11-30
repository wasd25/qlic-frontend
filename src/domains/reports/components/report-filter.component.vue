<template>
  <div class="report-filter">
    <div class="filter-box">
      <label>{{ $t('reportsSection.timePeriod') }}</label>
      <Select
          v-model="filters.period"
          :options="periods"
          :placeholder="$t('reportsSection.select')"
          class="select-full"
      >
        <template #option="slotProps">
          {{ $t(`periods.${slotProps.option}`) }}
        </template>
        <template #value="slotProps">
          {{ $t(`periods.${slotProps.value}`) }}
        </template>
      </Select>
    </div>

    <div class="filter-box">
      <label>{{ $t('reportsSection.reportType') }}</label>
      <Select
          v-model="filters.type"
          :options="types"
          :placeholder="$t('reportsSection.select')"
          class="select-full"
      >
        <template #option="slotProps">
          {{ $t(`reportTypes.${slotProps.option}`) }}
        </template>
        <template #value="slotProps">
          {{ $t(`reportTypes.${slotProps.value}`) }}
        </template>
      </Select>
    </div>

    <div class="filter-box">
      <label>{{ $t('reportsSection.location') }}</label>
      <Select
          v-model="filters.location"
          :options="locations"
          :placeholder="$t('reportsSection.select')"
          class="select-full"
      >
        <template #option="slotProps">
          {{ $t(`locations.${slotProps.option}`) }}
        </template>
        <template #value="slotProps">
          {{ $t(`locations.${slotProps.value}`) }}
        </template>
      </Select>
    </div>

    <Button :label="$t('reportsSection.generateReport')" class="generate-btn" @click="emitFilters" />
  </div>
</template>


<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Select from 'primevue/select'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['generate'])
const { t } = useI18n()

const filters = ref({
  period: 'Last 7 Days',
  type: 'Usage Analytics',
  location: 'All Locations'
})

const periods = ['Last 7 Days', 'Last 30 Days', 'This Year']
const types = ['Usage Analytics', 'Cost Analysis', 'Efficiency']
const locations = ['All Locations', 'Zone A', 'Zone B']

function emitFilters() {
  emit('generate', filters.value)
}
</script>

<style scoped>
.report-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-end;
  background-color: #ffffff;
  padding: 1.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  width: 100%;
  max-width: 100%;
}

.filter-box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1 1 200px;
}

.filter-box label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #4b5563;
  margin-left: 0.25rem;
}

.select-full {
  width: 100%;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
}

.select-full:hover {
  border-color: #3b82f6;
}

.generate-btn {
  background-color: #3B82F6;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  transition: all 0.2s ease;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
}

.generate-btn:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 6px 8px rgba(59, 130, 246, 0.3);
}

/* --- Personalización Profunda de PrimeVue Select --- */

/* El input/trigger principal (Barra visible) */
:deep(.p-select) {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  background: #ffffff;
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:deep(.p-select:not(.p-disabled):hover) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

:deep(.p-select:not(.p-disabled).p-focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* El texto dentro del select */
:deep(.p-select-label) {
  padding: 0;
  font-size: 0.95rem;
  color: #1f2937;
}

/* Icono del dropdown */
:deep(.p-select-dropdown) {
  color: #6b7280;
}

/* --- EL MENÚ DESPLEGABLE (Estilo Dark como la imagen 4) --- */
:deep(.p-select-overlay) {
  background: #1f2937 !important; /* Fondo Oscuro */
  border: 1px solid #374151 !important;
  border-radius: 8px !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3) !important;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
}

/* Lista de opciones */
:deep(.p-select-list) {
  padding: 0 !important;
  gap: 2px;
  display: flex;
  flex-direction: column;
}

/* Items individuales */
:deep(.p-select-option) {
  padding: 0.75rem 1rem !important;
  font-size: 0.95rem !important;
  color: #e5e7eb !important; /* Texto claro */
  transition: background-color 0.15s;
  border-radius: 4px !important;
  margin: 0 0.5rem !important;
  background: transparent !important;
}

/* Hover en items */
:deep(.p-select-option:not(.p-select-option-selected):not(.p-disabled).p-focus),
:deep(.p-select-option:not(.p-select-option-selected):not(.p-disabled):hover) {
  background-color: #374151 !important; /* Gris más claro al hover */
  color: #ffffff !important;
}

/* Item seleccionado */
:deep(.p-select-option.p-select-option-selected) {
  background-color: #3B82F6 !important; /* Azul vibrante */
  color: #ffffff !important;
  font-weight: 600;
}
</style>