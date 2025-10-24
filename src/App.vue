<template>
  <div class="layout" v-if="isAuthenticated">
    <side-bar-navigation @logout="handleLogout" />
    <main class="main-content">
      <router-view />
    </main>
  </div>

  <!-- Mostrar solo el router-view para login/register -->
  <router-view v-else />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import SideBarNavigation from './shared/components/side-bar-navigation.component.vue'
import { authService } from './domains/iam/services/auth.service.js'

const router = useRouter()
const isAuthenticated = ref(false)

// Verificar estado de autenticación
const checkAuth = () => {
  isAuthenticated.value = authService.isAuthenticated()
  console.log('🔐 Auth status:', isAuthenticated.value)
}

// Logout handler
const handleLogout = () => {
  authService.logout()
  isAuthenticated.value = false
  router.push('/login')
}

// Verificar auth al montar
onMounted(() => {
  checkAuth()
})

// Escuchar cambios de ruta para actualizar auth
watch(
    () => router.currentRoute.value,
    () => {
      checkAuth()
    }
)
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--app-bg, #f5f5f5);
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>