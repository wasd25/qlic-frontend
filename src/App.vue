<template>
  <div class="layout" v-if="isAuthenticated">
    <side-bar-navigation @logout="handleLogout" />
    <main class="main-content">
      <router-view />
    </main>
  </div>

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
  width: 100%; /* Asegura ancho completo */
  background-color: var(--app-bg, #f5f5f5);
  position: relative;
}

.main-content {
  flex: 1; /* Ocupa el espacio restante */
  padding: 2rem;

  /* --- REGLA DE ORO PARA GRÁFICOS --- */
  min-width: 0; /* Esto evita que los gráficos (Chart.js/ApexCharts) rompan el flex y se salgan de la pantalla */
  width: 100%;  /* Asegura consistencia */
  transition: margin 0.3s ease;
}

/* --- AJUSTES PARA MÓVIL --- */
@media (max-width: 768px) {
  .layout {
    /* En móvil, el sidebar es 'fixed' (flotante), así que no ocupa espacio en el flujo normal.
       El contenido se estirará al 100% automáticamente. */
    display: block;
  }

  .main-content {
    padding: 1rem; /* Menos padding lateral en móvil */
    padding-top: 4rem; /* IMPORTANTE: Empuja el contenido hacia abajo para que el botón hamburguesa no tape el título */
  }
}
</style>