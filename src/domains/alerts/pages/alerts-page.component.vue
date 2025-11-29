<template>
  <div class="alerts-page">
    <div class="container">
      <header class="header">
        <h1>{{ $t('alertsSection.title') }}</h1>
      </header>

      <!-- Panel resumen -->
      <div class="summary-wrapper">
        <alert-summary-panel :summary="summary" />
      </div>

      <div class="alerts-body">
        <div class="left-column">
          <h2 class="section-title">{{ $t('alertsSection.active') }}</h2>

          <!-- Buscar alerta por ID -->
          <div class="search-box">
            <input v-model="searchId" placeholder="Buscar alerta por ID" />
            <button @click="handleSearch">Buscar</button>
          </div>

          <!-- Crear nueva alerta -->
          <div class="create-box">
            <input v-model="newTitle" placeholder="Título" />
            <input v-model="newMessage" placeholder="Mensaje" />
            <select v-model="newType">
              <option value="Critical">Critical</option>
              <option value="Warning">Warning</option>
              <option value="Info">Info</option>
            </select>
            <button @click="handleCreate">Crear alerta</button>
          </div>

          <!-- Lista de alertas -->
          <active-alerts-list :alerts="filteredAlerts" />

          <!-- Tarjetas con botón eliminar -->
          <div class="alert-cards-grid">
            <alert-card
                v-for="a in filteredAlerts.slice(0, 3)"
                :key="a.id"
                :alert="a"
                @delete="deleteAlert(a.id)"
            />
            <button
                v-for="a in filteredAlerts.slice(0, 3)"
                :key="'btn-' + a.id"
                @click="deleteAlert(a.id)"
            >
              Eliminar {{ a.title }}
            </button>
          </div>

          <!-- ✏️ Actualizar alerta (ejemplo simple) -->
          <div class="update-box">
            <input v-model="updateId" placeholder="ID alerta a actualizar" />
            <input v-model="updateMessage" placeholder="Nuevo mensaje" />
            <button @click="handleUpdate">Actualizar alerta</button>
          </div>
        </div>

        <div class="right-column">
          <div class="sticky-wrapper">
            <!-- Si no usas settings, puedes quitar esto -->
            <notification-settings
                :settings="settings"
                @save="saveSettings"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import alertsService from '../services/alerts.service.js'
import AlertSummaryPanel from '../components/alert-summary-panel.component.vue'
import ActiveAlertsList from '../components/active-alerts-list.component.vue'
import AlertCard from '../components/alert-card.component.vue'

const alerts = ref([])
const summary = ref({})
const settings = ref({})

// Campos para CRUD
const newTitle = ref('')
const newMessage = ref('')
const newType = ref('Info')

const searchId = ref('')
const updateId = ref('')
const updateMessage = ref('')

// 🚀 Cargar alertas al montar
onMounted(async () => {
  await loadAlerts()
})

async function loadAlerts() {
  alerts.value = await alertsService.getAlerts()
  summary.value = {
    critical: alerts.value.filter(a => a.type === 'Critical').length,
    warning: alerts.value.filter(a => a.type === 'Warning').length,
    info: alerts.value.filter(a => a.type === 'Info').length,
    resolvedToday: alerts.value.filter(a => a.status === 'Resolved').length
  }
}

// 🔄 Crear
async function handleCreate() {
  const newAlert = {
    title: newTitle.value,
    message: newMessage.value,
    type: newType.value,
    timestamp: new Date().toISOString()
  }
  await alertsService.createAlert(newAlert)
  await loadAlerts()
  newTitle.value = ''
  newMessage.value = ''
  newType.value = 'Info'
}

// 🔍 Buscar
async function handleSearch() {
  if (!searchId.value) return
  const result = await alertsService.getAlertById(searchId.value)
  alerts.value = [result] // muestra solo la alerta buscada
}

// ✏️ Actualizar
async function handleUpdate() {
  if (!updateId.value) return
  await alertsService.updateAlert(updateId.value, { message: updateMessage.value })
  await loadAlerts()
  updateId.value = ''
  updateMessage.value = ''
}

// ❌ Eliminar
async function deleteAlert(id) {
  await alertsService.deleteAlert(id)
  alerts.value = alerts.value.filter(a => a.id !== id)
}

// Filtro
const filteredAlerts = computed(() => alerts.value.filter(a => a.type !== 'Resolved'))
</script>

<style scoped>
.search-box, .create-box, .update-box {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.search-box input, .create-box input, .update-box input, select {
  padding: 0.4rem;
}
button {
  padding: 0.4rem 0.8rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background: #1d4ed8;
}
</style>
