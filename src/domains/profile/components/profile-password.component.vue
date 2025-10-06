<template>
  <div class="password-card">
    <div class="card-header">
      <h3>Seguridad</h3>
      <p>Cambia tu contraseña</p>
    </div>

    <form @submit.prevent="handleSubmit" class="password-form">
      <div class="form-group">
        <label for="currentPassword">Contraseña Actual *</label>
        <Password
            id="currentPassword"
            v-model="formData.currentPassword"
            placeholder="Ingresa tu contraseña actual"
            :feedback="false"
            toggleMask
            :class="{ 'p-invalid': errors.currentPassword }"
        />
        <small v-if="errors.currentPassword" class="error-message">{{ errors.currentPassword }}</small>
      </div>

      <div class="form-group">
        <label for="newPassword">Nueva Contraseña *</label>
        <Password
            id="newPassword"
            v-model="formData.newPassword"
            placeholder="Ingresa tu nueva contraseña"
            toggleMask
            :class="{ 'p-invalid': errors.newPassword }"
        />
        <small class="hint">Mínimo 8 caracteres, con mayúsculas, minúsculas y números</small>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirmar Nueva Contraseña *</label>
        <Password
            id="confirmPassword"
            v-model="formData.confirmPassword"
            placeholder="Confirma tu nueva contraseña"
            :feedback="false"
            toggleMask
            :class="{ 'p-invalid': errors.confirmPassword }"
        />
        <small v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</small>
      </div>

      <div class="form-actions">
        <Button
            type="submit"
            label="Cambiar Contraseña"
            :loading="isLoading"
            severity="warning"
        />
      </div>

      <!-- Mensaje de éxito -->
      <Message v-if="successMessage" severity="success" :closable="true" @close="successMessage = ''">
        {{ successMessage }}
      </Message>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'

const emit = defineEmits(['change-password'])

// Estado reactivo
const formData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const isLoading = ref(false)
const errors = ref({})
const successMessage = ref('')

// Validaciones
const validateForm = () => {
  errors.value = {}

  if (!formData.value.currentPassword) {
    errors.value.currentPassword = 'La contraseña actual es requerida'
  }

  if (!formData.value.newPassword) {
    errors.value.newPassword = 'La nueva contraseña es requerida'
  } else if (formData.value.newPassword.length < 8) {
    errors.value.newPassword = 'La contraseña debe tener al menos 8 caracteres'
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.value.newPassword)) {
    errors.value.newPassword = 'Debe contener mayúsculas, minúsculas y números'
  }

  if (!formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Confirma tu nueva contraseña'
  } else if (formData.value.newPassword !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Las contraseñas no coinciden'
  }

  return Object.keys(errors.value).length === 0
}

// Handlers
const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    isLoading.value = true
    errors.value = {} // Limpiar errores anteriores

    await emit('change-password', {
      currentPassword: formData.value.currentPassword,
      newPassword: formData.value.newPassword
    })

    // Éxito
    successMessage.value = '¡Contraseña cambiada exitosamente!'

    // Limpiar formulario después de éxito
    formData.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }

    // Auto-ocultar mensaje después de 5 segundos
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)

  } catch (error) {
    console.error('Error changing password:', error)
    if (error.message.includes('incorrecta')) {
      errors.value.currentPassword = 'La contraseña actual es incorrecta'
    } else {
      errors.value.currentPassword = 'Error al cambiar la contraseña'
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.password-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card-header {
  margin-bottom: 2rem;
}

.card-header h3 {
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.card-header p {
  color: #6b7280;
  margin: 0;
}

.password-form {
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  display: block;
}

.hint {
  color: #6b7280;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  display: block;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.form-actions {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

/* Responsive */
@media (max-width: 768px) {
  .password-card {
    padding: 1.5rem;
  }
}
</style>