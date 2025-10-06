<template>
  <div class="password-card">
    <div class="card-header">
      <h3>Seguridad</h3>
      <p>Cambia tu contraseña</p>
    </div>

    <form @submit.prevent="handleSubmit" class="password-form">
      <!-- Mensajes arriba de todo -->
      <div class="messages-container">
        <Message v-if="errorMessage" severity="error" :closable="true" @close="errorMessage = ''">
          {{ errorMessage }}
        </Message>

        <Message v-if="successMessage" severity="success" :closable="true" @close="successMessage = ''">
          {{ successMessage }}
        </Message>
      </div>

      <div class="form-group">
        <label for="currentPassword">Contraseña Actual *</label>
        <div class="password-input-wrapper">
          <InputText
              id="currentPassword"
              v-model="formData.currentPassword"
              placeholder="Ingresa tu contraseña actual"
              :type="showCurrentPassword ? 'text' : 'password'"
              :class="{ 'p-invalid': errors.currentPassword }"
              class="w-full"
          />
          <button
              type="button"
              class="password-toggle"
              @click="showCurrentPassword = !showCurrentPassword"
          >
            <i :class="showCurrentPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
          </button>
        </div>
        <small v-if="errors.currentPassword" class="error-message">{{ errors.currentPassword }}</small>
      </div>

      <div class="form-group">
        <label for="newPassword">Nueva Contraseña *</label>
        <div class="password-input-wrapper">
          <InputText
              id="newPassword"
              v-model="formData.newPassword"
              placeholder="Ingresa tu nueva contraseña"
              :type="showNewPassword ? 'text' : 'password'"
              :class="{ 'p-invalid': errors.newPassword }"
              class="w-full"
          />
          <button
              type="button"
              class="password-toggle"
              @click="showNewPassword = !showNewPassword"
          >
            <i :class="showNewPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
          </button>
        </div>
        <small class="hint">Mínimo 8 caracteres, con mayúsculas, minúsculas y números</small>
        <small v-if="errors.newPassword" class="error-message">{{ errors.newPassword }}</small>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirmar Nueva Contraseña *</label>
        <div class="password-input-wrapper">
          <InputText
              id="confirmPassword"
              v-model="formData.confirmPassword"
              placeholder="Confirma tu nueva contraseña"
              :type="showConfirmPassword ? 'text' : 'password'"
              :class="{ 'p-invalid': errors.confirmPassword }"
              class="w-full"
          />
          <button
              type="button"
              class="password-toggle"
              @click="showConfirmPassword = !showConfirmPassword"
          >
            <i :class="showConfirmPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
          </button>
        </div>
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
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
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
const errorMessage = ref('')

// Estados para mostrar/ocultar contraseñas
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Validaciones
const validateForm = () => {
  errors.value = {}
  errorMessage.value = ''

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
    errorMessage.value = '' // Limpiar mensaje de error
    successMessage.value = '' // Limpiar mensaje de éxito previo

    await emit('change-password', {
      currentPassword: formData.value.currentPassword,
      newPassword: formData.value.newPassword
    })

    // Éxito - solo si llegamos aquí sin errores (el emit no lanzó excepción)
    successMessage.value = '¡Contraseña cambiada exitosamente!'

    // Limpiar formulario después de éxito
    formData.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }

    // Resetear visibilidad de contraseñas
    showCurrentPassword.value = false
    showNewPassword.value = false
    showConfirmPassword.value = false

    // Auto-ocultar mensaje después de 5 segundos
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)

  } catch (error) {
    console.error('Error changing password:', error)

    // Mostrar mensaje de error específico
    if (error.message.includes('incorrecta')) {
      errorMessage.value = 'La contraseña actual es incorrecta. Por favor, verifica e intenta nuevamente.'
      errors.value.currentPassword = 'Contraseña incorrecta'
    } else {
      errorMessage.value = 'Error al cambiar la contraseña. Por favor, intenta nuevamente.'
    }

    // Auto-ocultar mensaje de error después de 5 segundos
    setTimeout(() => {
      errorMessage.value = ''
      errors.value.currentPassword = ''
    }, 5000)
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

.messages-container {
  margin-bottom: 1.5rem;
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

.password-input-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.password-input-wrapper :deep(.p-inputtext) {
  width: 100%;
  padding-right: 2.5rem; /* Espacio para el ícono */
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.password-toggle:hover {
  background: #f3f4f6;
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