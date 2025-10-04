<template>
  <div class="profile-edit">
    <div class="edit-card">
      <div class="edit-header">
        <h3>Editar Información Personal</h3>
        <p>Actualiza tus datos básicos</p>
      </div>

      <form @submit.prevent="handleSubmit" class="edit-form">
        <div class="form-grid">
          <div class="form-group">
            <label for="name">Nombre *</label>
            <InputText
                id="name"
                v-model="formData.name"
                placeholder="Tu nombre"
                :class="{ 'p-invalid': errors.name }"
            />
            <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
          </div>

          <div class="form-group">
            <label for="lastName">Apellido *</label>
            <InputText
                id="lastName"
                v-model="formData.lastName"
                placeholder="Tu apellido"
                :class="{ 'p-invalid': errors.lastName }"
            />
            <small v-if="errors.lastName" class="error-message">{{ errors.lastName }}</small>
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
            <InputText
                id="email"
                v-model="formData.email"
                placeholder="tu@email.com"
                type="email"
                :class="{ 'p-invalid': errors.email }"
            />
            <small v-if="errors.email" class="error-message">{{ errors.email }}</small>
          </div>

          <div class="form-group">
            <label for="age">Edad</label>
            <InputNumber
                id="age"
                v-model="formData.age"
                placeholder="30"
                :min="0"
                :max="120"
                showButtons
            />
          </div>

          <div class="form-group">
            <label for="phone">Teléfono</label>
            <InputText
                id="phone"
                v-model="formData.phone"
                placeholder="+1234567890"
            />
          </div>

          <div class="form-group full-width">
            <label for="address">Dirección</label>
            <Textarea
                id="address"
                v-model="formData.address"
                placeholder="Tu dirección completa"
                :autoResize="true"
                rows="3"
            />
          </div>
        </div>

        <div class="form-actions">
          <Button
              type="button"
              label="Cancelar"
              severity="secondary"
              @click="$emit('cancel')"
              :disabled="isLoading"
          />
          <Button
              type="submit"
              label="Guardar Cambios"
              :loading="isLoading"
              :disabled="!hasChanges"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['save', 'cancel'])

// Estado reactivo
const formData = ref({ ...props.profile })
const isLoading = ref(false)
const errors = ref({})

// Computed
const hasChanges = computed(() => {
  return JSON.stringify(formData.value) !== JSON.stringify(props.profile)
})

// Validaciones
const validateForm = () => {
  errors.value = {}

  if (!formData.value.name?.trim()) {
    errors.value.name = 'El nombre es requerido'
  }

  if (!formData.value.lastName?.trim()) {
    errors.value.lastName = 'El apellido es requerido'
  }

  if (!formData.value.email?.trim()) {
    errors.value.email = 'El email es requerido'
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    errors.value.email = 'El email no es válido'
  }

  return Object.keys(errors.value).length === 0
}

// Handlers
const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    isLoading.value = true
    await emit('save', formData.value)
  } finally {
    isLoading.value = false
  }
}

// Watch para limpiar errores cuando se edita
watch(formData, () => {
  if (errors.value.name && formData.value.name?.trim()) delete errors.value.name
  if (errors.value.lastName && formData.value.lastName?.trim()) delete errors.value.lastName
  if (errors.value.email && formData.value.email?.trim()) delete errors.value.email
}, { deep: true })
</script>

<style scoped>
.profile-edit {
  width: 100%;
}

.edit-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 2px solid #3B82F6;
}

.edit-header {
  margin-bottom: 2rem;
  text-align: center;
}

.edit-header h3 {
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.edit-header p {
  color: #6b7280;
  margin: 0;
}

.edit-form {
  width: 100%;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

/* Responsive */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .edit-card {
    padding: 1.5rem;
  }

  .form-actions {
    flex-direction: column;
  }
}
</style>