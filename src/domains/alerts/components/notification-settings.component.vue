<template>
  <div class="settings-panel">
    <h2>Notification Settings</h2>

    <div class="section">
      <h4>Alert Types</h4>
      <div class="checkbox-group">
        <label v-for="type in alertTypes" :key="type">
          <input type="checkbox" v-model="selectedTypes" :value="type" />
          {{ type }}
        </label>
      </div>
    </div>

    <div class="section">
      <h4>Delivery Methods</h4>
      <div class="checkbox-group">
        <label v-for="method in deliveryMethods" :key="method">
          <input type="checkbox" v-model="selectedMethods" :value="method" />
          {{ method }}
        </label>
      </div>
    </div>

    <button class="save-btn" @click="save">Save Settings</button>
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

const deliveryMethods = [
  'Push Notifications',
  'Email',
  'SMS'
]

const selectedTypes = ref(props.settings?.types ? [...props.settings.types] : [])
const selectedMethods = ref(props.settings?.methods ? [...props.settings.methods] : [])

function save() {
  const newSettings = {
    types: selectedTypes.value,
    methods: selectedMethods.value
  }
  emit('save', newSettings)
}
</script>

<style scoped>
.settings-panel {
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  border: 1px solid #e5e7eb;
}

.settings-panel h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
}

.section {
  margin-bottom: 2rem;
}

.section h4 {
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.75rem;
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
}

.save-btn:hover {
  background-color: #1d4ed8;
}
</style>
