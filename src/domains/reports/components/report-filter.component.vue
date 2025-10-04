<template>
  <div class="report-filter">
    <div class="filter-box">
      <label>Time Period</label>
      <div class="input-box">
        <Dropdown
            v-model="filters.period"
            :options="periods"
            placeholder="Select"
            class="custom-dropdown"
        />
      </div>
    </div>

    <div class="filter-box">
      <label>Report Type</label>
      <div class="input-box">
        <Dropdown
            v-model="filters.type"
            :options="types"
            placeholder="Select"
            class="custom-dropdown"
        />
      </div>
    </div>

    <div class="filter-box">
      <label>Location</label>
      <div class="input-box">
        <Dropdown
            v-model="filters.location"
            :options="locations"
            placeholder="Select"
            class="custom-dropdown"
        />
      </div>
    </div>

    <Button label="Generate Report" class="generate-btn" @click="emitFilters" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

const emit = defineEmits(['generate'])

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
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
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
  font-weight: 500;
  color: #374151;
}

.input-box {
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.5rem;
}

.generate-btn {
  background-color: #3B82F6;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  transition: background-color 0.2s ease;
  white-space: nowrap;
}

.generate-btn:hover {
  background-color: #2563eb;
}

.dropdown {
  width: 100%;
}

.full-width .p-dropdown {
  width: 100%;
}

.full-width .p-dropdown-panel {
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.full-width .p-dropdown-item {
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #374151;
}

.full-width .p-dropdown-item:hover {
  background-color: #f3f4f6;
  color: #111827;
}

</style>
