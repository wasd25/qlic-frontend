<template>
  <section class="settings-section">
    <h3>Usage Settings</h3>
    <div class="controls">
      <button @click="editLimits">Edit Limits</button>
      <button @click="toggleAlerts">
        {{ alertsEnabled ? 'Disable Alerts' : 'Enable Alerts' }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const alertsEnabled = ref(false)

onMounted(async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/notificationSettings')
    alertsEnabled.value = data.types.includes('Critical Alerts')
  } catch (error) {
    console.error('Error loading notification settings:', error)
  }
})

async function toggleAlerts() {
  try {
    const newTypes = alertsEnabled.value ? [] : ['Critical Alerts']
    await axios.put('http://localhost:3000/notificationSettings', { types: newTypes })
    alertsEnabled.value = !alertsEnabled.value
  } catch (error) {
    console.error('Error updating notification settings:', error)
  }
}

function editLimits() {
  alert('Edit limits modal would open here.')
}
</script>

<style scoped>
.settings-section {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.settings-section h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #1f2937;
}
.controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  flex: 1 1 150px;
  text-align: center;
}
button:hover {
  background-color: #2563eb;
}

/* Responsive ajustes */
@media (max-width: 768px) {
  .settings-section {
    padding: 0.75rem;
  }
  .settings-section h3 {
    font-size: 1rem;
  }
  .controls {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
