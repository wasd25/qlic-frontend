<template>
  <div class="login-form">
    <div class="login-card">
      <div class="login-header">
        <h2>{{ $t('login.title') }}</h2>
        <p>{{ $t('login.subtitle') }}</p>
      </div>

      <form @submit.prevent="handleLogin" class="form">
        <div class="form-group">
          <label for="username">{{ $t('login.username') }}</label>
          <InputText
              id="username"
              v-model="formData.username"
              :placeholder="$t('login.username')"
              :class="{ 'p-invalid': errors.username }"
              class="w-full"
          />
          <small v-if="errors.username" class="error-message">{{ errors.username }}</small>
        </div>

        <div class="form-group">
          <label for="password">{{ $t('login.password') }}</label>
          <div class="password-input-wrapper">
            <InputText
                id="password"
                v-model="formData.password"
                :placeholder="$t('login.password')"
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
          <small v-if="errors.password" class="error-message">{{ errors.password }}</small>
        </div>

        <Button
            type="submit"
            :label="$t('login.signIn')"
            :loading="isLoading"
            class="w-full"
        />

        <div class="login-links">
          <a href="#" @click.prevent="$emit('show-register')">{{ $t('login.noAccount') }}</a>
        </div>
      </form>

      <Message v-if="errorMessage" severity="error" :closable="true" @close="errorMessage = ''">
        {{ errorMessage }}
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

const emit = defineEmits(['login-success', 'show-register'])

// Estado reactivo
const formData = ref({
  username: '',
  password: ''
})
const isLoading = ref(false)
const errors = ref({})
const errorMessage = ref('')
const showPassword = ref(false)

// Validaciones
const validateForm = () => {
  errors.value = {}

  if (!formData.value.username?.trim()) {
    errors.value.username = $t('common.required')
  }

  if (!formData.value.password) {
    errors.value.password = $t('common.required')
  }

  return Object.keys(errors.value).length === 0
}

// Handlers
const handleLogin = async () => {
  if (!validateForm()) return

  try {
    isLoading.value = true
    errors.value = {}
    errorMessage.value = ''

    const user = await authService.login(formData.value)
    emit('login-success', user)

  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = error.message || $t('login.invalidCredentials')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-form {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.login-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h2 {
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.login-header p {
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

.login-links {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.login-links a {
  color: #3B82F6;
  text-decoration: none;
  font-size: 0.875rem;
}

.login-links a:hover {
  text-decoration: underline;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}
</style>