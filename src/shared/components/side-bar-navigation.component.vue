<template>
  <button
      class="hamburger"
      :class="{ 'is-collapsed': isCollapsed }"
      @click="toggleSidebar"
      aria-label="Toggle sidebar"
  >
    <span class="bar" :class="{ open: !isCollapsed && isMobileOpen }"></span>
    <span class="bar" :class="{ open: !isCollapsed && isMobileOpen }"></span>
    <span class="bar" :class="{ open: !isCollapsed && isMobileOpen }"></span>
  </button>

  <aside :class="['sidebar', { collapsed: isCollapsed, 'mobile-open': isMobileOpen }]">

    <div class="sidebar-logo">
      <img src="https://i.imgur.com/FCYH4sj.png" alt="QLIC" class="logo" />
    </div>

    <div class="user-info" v-if="currentUser">
      <div class="user-avatar">
        <img
            :src="currentUser.avatar || 'https://via.placeholder.com/40'"
            @error="handleImageError"
            alt="User"
        />
      </div>
      <div class="user-details">
        <div class="user-name">{{ currentUser.name || currentUser.username }}</div>
        <div class="user-email">{{ currentUser.email }}</div>
      </div>
    </div>

    <div class="language-section">
      <LanguageSwitcherComponent />
    </div>

    <nav>
      <ul>
        <li>
          <router-link to="/dashboard">
            <span class="icon"><i class="pi pi-home"></i></span>
            <span class="label">{{ $t('sidebar.dashboard') }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/reports">
            <span class="icon"><i class="pi pi-chart-bar"></i></span>
            <span class="label">{{ $t('sidebar.reports') }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/profile">
            <span class="icon"><i class="pi pi-user"></i></span>
            <span class="label">{{ $t('sidebar.profile') }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/alerts">
            <span class="icon"><i class="pi pi-bell"></i></span>
            <span class="label">{{ $t('sidebar.alerts') }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usage-management">
            <span class="icon"><i class="pi pi-sliders-h"></i></span>
            <span class="label">{{ $t('sidebar.usageManagement') }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/anomaly-detection">
            <span class="icon"><i class="pi pi-exclamation-circle"></i></span>
            <span class="label">{{ $t('sidebar.anomalyDetection') }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/payments">
            <span class="icon"><i class="pi pi-credit-card"></i></span>
            <span class="label">{{ $t('sidebar.payments') }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/subscription">
            <span class="icon"><i class="pi pi-wallet"></i></span>
            <span class="label">{{ $t('sidebar.subscription') }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="sidebar-footer">
      <button @click="handleLogout" class="logout-btn">
        <i class="pi pi-sign-out"></i>
        <span class="label">{{ $t('sidebar.logout') }}</span>
      </button>
    </div>
  </aside>

  <div v-if="isMobileOpen" class="sidebar-overlay" @click="isMobileOpen = false"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { profileService } from '../../domains/profile/services/profile.service.js'
import { authService } from '../../domains/iam/services/auth.service.js'
import LanguageSwitcherComponent from './language-switcher.component.vue'

const emit = defineEmits(['logout'])
const route = useRoute()

const currentUser = ref(null)
const isCollapsed = ref(false)
const isMobileOpen = ref(false)

const loadUserProfile = async () => {
  try {
    currentUser.value = await profileService.getCurrentUserProfile()
  } catch (error) {
    const authUser = authService.getCurrentUser()
    if (authUser) {
      currentUser.value = {
        username: authUser.username,
        email: authUser.email,
        name: authUser.username,
        avatar: null
      }
    }
  }
}

const handleLogout = () => {
  currentUser.value = null
  emit('logout')
}

const toggleSidebar = () => {
  if (window.innerWidth < 768) {
    isMobileOpen.value = !isMobileOpen.value
  } else {
    isCollapsed.value = !isCollapsed.value
  }
}

const handleImageError = (e) => {
  e.target.src = 'https://ui-avatars.com/api/?name=User&background=random&color=fff';
}

watch(route, () => {
  if (window.innerWidth < 768) {
    isMobileOpen.value = false
  }
})

onMounted(() => {
  if (window.innerWidth < 768) {
    isCollapsed.value = false
  }
  loadUserProfile()
})
</script>

<style scoped>
/* VARIABLES GLOBALES */
.sidebar, .hamburger {
  --sidebar-width: 250px;
  --collapsed-width: 64px;
}

/* ========================================= */
/* ESTILOS BASE (DESKTOP) - STICKY           */
/* ========================================= */
.sidebar {
  position: sticky; /* IMPORTANTE: En escritorio se pega al techo */
  top: 0;
  height: 100vh;
  width: var(--sidebar-width);
  background-color: #ffffff;
  color: #000000;
  padding: 1rem;
  padding-left: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 2px solid #a5a9b2;
  transition: width 0.3s ease, transform 0.3s ease;
  z-index: 50;

  /* Scroll interno invisible */
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.sidebar::-webkit-scrollbar { display: none; }

/* LOGO */
.sidebar-logo { margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #a5a9b2; width: 100%; display: flex; justify-content: flex-start; padding-left: 0.25rem; overflow: hidden; flex-shrink: 0; }
.sidebar-logo .logo { width: 120px; max-width: 100%; height: auto; max-height: 80px; object-fit: contain; transition: width 0.2s ease; }

/* USUARIO */
.user-info { display: flex; align-items: center; padding: 0.5rem; margin-bottom: 0.5rem; background: #f8f9fa; border-radius: 8px; border: 1px solid #e5e7eb; width: 100%; gap: 0.75rem; transition: all 0.2s ease; flex-shrink: 0; }
.user-avatar { width: 40px; height: 40px; border-radius: 50%; overflow: hidden; margin-right: 0.75rem; flex-shrink: 0; }
.user-avatar img { width: 100%; height: 100%; object-fit: cover; }

/* IDIOMA */
.language-section { width: 100%; margin-bottom: 0.5rem; transition: opacity 0.2s ease; flex-shrink: 0; }

/* NAVEGACIÓN */
.sidebar ul { list-style: none; padding: 0; width: 100%; }
.sidebar li { margin-bottom: 0.25rem; }
.sidebar a { display: flex; align-items: center; gap: 0.8rem; color: #000000; text-decoration: none; font-size: 1rem; padding: 0.6rem 0.5rem; border-radius: 6px; transition: background-color 0.2s, color 0.2s; justify-content: flex-start; }
.sidebar .icon { width: 40px; display: flex; justify-content: center; flex-shrink: 0; font-size: 1.2rem; }
.sidebar a:hover { background-color: #e5e7eb; }
.sidebar a.router-link-active { font-weight: bold; color: #378aa1; background-color: #e6f4ef; }

/* FOOTER */
.sidebar-footer { margin-top: auto; padding-top: 1rem; border-top: 1px solid #e5e7eb; width: 100%; flex-shrink: 0; }
.logout-btn { display: flex; align-items: center; gap: 0.5rem; width: 100%; padding: 0.75rem; background: none; border: none; color: #ef4444; cursor: pointer; border-radius: 6px; transition: background-color 0.2s; font-size: 0.875rem; }
.logout-btn:hover { background: #fef2f2; }

/* BOTÓN HAMBURGUESA */
.hamburger {
  position: fixed;
  top: 12px;
  left: calc(var(--sidebar-width) + 12px);
  width: 40px; height: 36px; border: none; background: #ffffff; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.15); display: flex; flex-direction: column; justify-content: center; gap: 4px; padding: 6px; cursor: pointer; z-index: 100; transition: left 0.3s ease, top 0.3s ease;
}
.hamburger.is-collapsed { left: calc(var(--collapsed-width) + 12px); }
.hamburger .bar { display: block; height: 2px; background: #374151; border-radius: 2px; transition: transform 0.2s ease, opacity 0.2s ease; }
.hamburger .bar.open:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.hamburger .bar.open:nth-child(2) { opacity: 0; }
.hamburger .bar.open:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

/* --- MODO COLAPSADO (SOLO APLICA EN DESKTOP) --- */
.sidebar.collapsed { width: var(--collapsed-width); align-items: center; padding-left: 0.5rem; padding-right: 0.5rem; }
.sidebar.collapsed .label, .sidebar.collapsed .user-details, .sidebar.collapsed .language-section { display: none !important; opacity: 0; pointer-events: none; }
.sidebar.collapsed .sidebar-logo { justify-content: center; padding-left: 0; }
.sidebar.collapsed .sidebar-logo .logo { width: 40px; max-height: 40px; }
.sidebar.collapsed .user-info { padding: 0; background: transparent; border: none; justify-content: center; }
.sidebar.collapsed .user-avatar { margin: 0; }


/* ========================================= */
/* ESTILOS MÓVIL (Max 768px) - FIXED         */
/* ========================================= */
@media (max-width: 768px) {
  .sidebar {
    /* 1. Cambiamos de Sticky a Fixed para que flote encima */
    position: fixed !important;
    left: 0; top: 0; bottom: 0;
    height: 100vh;

    /* 2. Oculto por defecto */
    transform: translateX(-100%);

    /* 3. FORZAMOS ANCHO COMPLETO (Aunque JS diga collapsed) */
    width: var(--sidebar-width) !important;
    align-items: flex-start !important;

    box-shadow: 2px 0 12px rgba(0,0,0,0.15);
    z-index: 999;
  }

  /* Mostrar sidebar */
  .sidebar.mobile-open {
    transform: translateX(0);
  }

  /* Botón a la derecha */
  .hamburger {
    left: auto !important;
    right: 12px;
    top: 12px;
  }

  /* --- FORZAR VISIBILIDAD DE ELEMENTOS EN MÓVIL --- */
  /* Esto arregla que se vea "roto" o mini en el celular */
  .sidebar.collapsed .label,
  .sidebar.collapsed .user-details,
  .sidebar.collapsed .language-section {
    display: block !important;
    opacity: 1 !important;
    pointer-events: auto !important;
  }

  .sidebar.collapsed .sidebar-logo {
    justify-content: flex-start !important;
    padding-left: 0.25rem !important;
  }
  .sidebar.collapsed .sidebar-logo .logo {
    width: 120px !important;
    max-height: 80px !important;
  }

  .sidebar.collapsed .user-info {
    padding: 0.5rem !important;
    background: #f8f9fa !important;
    border: 1px solid #e5e7eb !important;
    justify-content: flex-start !important;
  }
  .sidebar.collapsed .user-avatar {
    margin-right: 0.75rem !important;
  }
}

.sidebar-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  z-index: 40;
  backdrop-filter: blur(2px);
}
</style>