<template>
  <div class="register-form">
    <div class="register-card">
      <div class="register-header">
        <div class="header-top">
          <h2>{{ $t('register.title') }}</h2>
          <button @click="handleClose" class="close-btn">
            <i class="pi pi-times"></i>
          </button>
        </div>
        <p>{{ $t('register.subtitle') }}</p>
      </div>


      <form @submit.prevent="handleRegister" class="form">
        <div class="form-group">
          <label for="username">{{ $t('register.username') }}</label>
          <InputText
              id="username"
              v-model="formData.username"
              placeholder="juanperez"
              :class="{ 'p-invalid': errors.username }"
              class="w-full"
          />
          <small v-if="errors.username" class="error-message">{{ errors.username }}</small>
        </div>

        <div class="form-group">
          <label for="email">{{ $t('register.email') }}</label>
          <InputText
              id="email"
              v-model="formData.email"
              placeholder="juan@ejemplo.com"
              type="email"
              :class="{ 'p-invalid': errors.email }"
              class="w-full"
          />
          <small v-if="errors.email" class="error-message">{{ errors.email }}</small>
        </div>

        <div class="form-group">
          <label for="password">{{ $t('register.password') }}</label>
          <div class="password-input-wrapper">
            <InputText
                id="password"
                v-model="formData.password"
                placeholder="Mínimo 8 caracteres"
                :type="showPassword ? 'text' : 'password'"
                :class="{ 'p-invalid': errors.password }"
                class="w-full"
            />
            <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
            >
              <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
            </button>
          </div>
          <small class="hint">Mínimo 8 caracteres, con mayúsculas, minúsculas y números</small>
          <small v-if="errors.password" class="error-message">{{ errors.password }}</small>
        </div>

        <div class="form-group">
          <label for="confirmPassword">{{ $t('register.confirmPassword') }}</label>
          <div class="password-input-wrapper">
            <InputText
                id="confirmPassword"
                v-model="formData.confirmPassword"
                placeholder="Confirma tu contraseña"
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

        <Button
            type="submit"
            :label="$t('register.createAccount')"
            :loading="isLoading"
            class="w-full"
        />

        <div class="register-links">
          <a href="#" @click.prevent="$emit('show-login')">{{ $t('register.haveAccount') }}</a>
        </div>
      </form>

      <!-- Mensajes -->
      <Message v-if="errorMessage" severity="error" :closable="true" @close="errorMessage = ''">
        {{ errorMessage }}
      </Message>

      <Message v-if="successMessage" severity="success" :closable="false">
        {{ successMessage }}
      </Message>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { authService } from '../services/auth.service.js'

const emit = defineEmits(['register-success', 'show-login', 'close'])

// Estado reactivo
const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const isLoading = ref(false)
const errors = ref({})
const errorMessage = ref('')
const successMessage = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Validaciones
const validateForm = () => {
  errors.value = {}

  if (!formData.value.username?.trim()) {
    errors.value.username = 'Nombre de usuario es requerido'
  } else if (formData.value.username.length < 3) {
    errors.value.username = 'Mínimo 3 caracteres'
  }

  if (!formData.value.email?.trim()) {
    errors.value.email = 'Email es requerido'
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    errors.value.email = 'Email no válido'
  }

  if (!formData.value.password) {
    errors.value.password = 'Contraseña es requerida'
  } else if (formData.value.password.length < 8) {
    errors.value.password = 'Mínimo 8 caracteres'
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.value.password)) {
    errors.value.password = 'Debe contener mayúsculas, minúsculas y números'
  }

  if (!formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Confirma tu contraseña'
  } else if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Las contraseñas no coinciden'
  }

  return Object.keys(errors.value).length === 0
}

// Handlers
const handleRegister = async () => {
  if (!validateForm()) return

  try {
    isLoading.value = true
    errors.value = {}
    errorMessage.value = ''
    successMessage.value = ''

    const userData = {
      username: formData.value.username,
      email: formData.value.email,
      password: formData.value.password
    }

    const user = await authService.register(userData)
    successMessage.value = '¡Cuenta creada exitosamente!'

    // Limpiar formulario
    formData.value = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }

    // Emitir éxito después de un breve delay
    setTimeout(() => {
      emit('register-success', user)
    }, 1500)

  } catch (error) {
    console.error('Register error:', error)
    errorMessage.value = $t('register.userExists')
  } finally {
    isLoading.value = false
  }
}

const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
.register-form {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.register-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 440px;
  max-height: 90vh;
  overflow-y: auto;
}

.register-header {
  margin-bottom: 2rem;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.header-top h2 {
  color: #1f2937;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background: #f3f4f6;
}

.register-header p {
  color: #6b7280;
  margin: 0;
}

.form {
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

.password-input-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.password-input-wrapper :deep(.p-inputtext) {
  width: 100%;
  padding-right: 2.5rem;
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

.register-links {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.register-links a {
  color: #3B82F6;
  text-decoration: none;
  font-size: 0.875rem;
}

.register-links a:hover {
  text-decoration: underline;
}
</style>