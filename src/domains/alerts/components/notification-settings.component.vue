<template>
  <div class="settings-panel">
    <h2>{{ $t('alertsSection.types')}}</h2>
    <div class="checkbox-group">
      <label v-for="type in alertTypes" :key="type">
        <input type="checkbox" v-model="selectedTypes" :value="type" />
        {{ type }}
      </label>
    </div>

    <button class="save-btn" @click="save">Apply Filter</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  settings: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['save'])

const alertTypes = [
  'Critical Alerts',
  'Usage Warnings',
  'Maintenance Reminders'
]

const selectedTypes = ref(
    props.settings?.types?.length
        ? [...props.settings.types]
        : [...alertTypes]
)

function save() {
  emit('save', {
    types: selectedTypes.value
  })
}
</script>

<style scoped>
.settings-panel {
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.settings-panel h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

label {
  font-size: 0.95rem;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

input[type="checkbox"] {
  accent-color: #2563eb;
  width: 18px;
  height: 18px;
}

.save-btn {
  background-color: #2563eb;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  align-self: flex-start;
}

.save-btn:hover {
  background-color: #1d4ed8;
}
</style>