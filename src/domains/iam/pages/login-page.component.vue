<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Logo -->
      <div class="logo-section">
        <img
            src="https://i.imgur.com/FCYH4sj.png"
            alt="QLIC Logo"
            class="logo"
        />
        <h1>QLIC</h1>
        <p>Gestión Inteligente del Agua</p>
      </div>

      <!-- Formulario de Login -->
      <login-form-component
          @login-success="handleLoginSuccess"
          @show-register="showRegister = true"
      />

      <!-- Formulario de Registro -->
      <register-form-component
          v-if="showRegister"
          @register-success="handleRegisterSuccess"
          @show-login="showRegister = false"
          @close="showRegister = false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LoginFormComponent from '../components/login-form.component.vue'
import RegisterFormComponent from '../components/register-form.component.vue'
import { authService } from '../services/auth.service.js'

const router = useRouter()
const showRegister = ref(false)

const handleLoginSuccess = (user) => {
  console.log('✅ Login exitoso:', user.username)
  router.push('/dashboard')
}

const handleRegisterSuccess = (user) => {
  console.log('✅ Registro exitoso:', user.username)
  showRegister.value = false
  // Opcional: auto-login después del registro
  // router.push('/dashboard')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.login-container {
  width: 100%;
  max-width: 440px;
}

.logo-section {
  text-align: center;
  margin-bottom: 2rem;
  color: white;
}

.logo {
  width: 120px;
  height: 120px;
  margin-bottom: 1rem;
  border-radius: 12px;
  background: white;
  padding: 0.5rem;
}

.logo-section h1 {
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
}

.logo-section p {
  margin: 0;
  opacity: 0.9;
  font-size: 1.1rem;
}
</style>