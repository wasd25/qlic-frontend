<template>
  <aside class="sidebar">
    <!-- Logo solamente -->
    <div class="sidebar-logo">
      <img
          src="https://i.imgur.com/FCYH4sj.png"
          alt="QLIC"
          class="logo"
      />
    </div>

    <!-- Información del Usuario -->
    <div class="user-info" v-if="currentUser">
      <div class="user-avatar">
        <img :src="currentUser.avatar || 'https://via.placeholder.com/40'" alt="Avatar" />
      </div>
      <div class="user-details">
        <div class="user-name">{{ currentUser.name || currentUser.username }}</div>
        <div class="user-email">{{ currentUser.email }}</div>
      </div>
    </div>

    <!-- Language Switcher -->
    <language-switcher-component />

    <!-- Navegación -->
    <nav>
      <ul>
        <li>
          <router-link to="/dashboard">
            <i class="pi pi-home"></i>
            <span>{{ $t('sidebar.dashboard') }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/reports">
            <i class="pi pi-chart-bar"></i>
            <span>{{ $t('sidebar.reports') }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/profile">
            <i class="pi pi-user"></i>
            <span>{{ $t('sidebar.profile') }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/alerts">
            <i class="pi pi-bell"></i>
            <span>{{ $t('sidebar.alerts') }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usage-management">
            <i class="pi pi-sliders-h"></i>
            <span>{{ $t('sidebar.usageManagement') }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/anomaly-detection">
            <i class="pi pi-exclamation-circle"></i>
            <span>{{ $t('sidebar.anomalyDetection') }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/payments">
            <i class="pi pi-credit-card"></i>
            <span>{{ $t('sidebar.payments') }}</span>
          </router-link>
        </li>
        <li>
          <router-link to="/subscription">
            <i class="pi pi-wallet"></i>
            <span>{{ $t('sidebar.subscription') }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Logout Button -->
    <div class="sidebar-footer">
      <button @click="handleLogout" class="logout-btn">
        <i class="pi pi-sign-out"></i>
        <span>{{ $t('sidebar.logout') }}</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { profileService } from '../../domains/profile/services/profile.service.js'
import { authService } from '../../domains/iam/services/auth.service.js'
import LanguageSwitcherComponent from './language-switcher.component.vue'

const emit = defineEmits(['logout'])

const currentUser = ref(null)

const loadUserProfile = async () => {
  try {
    console.log('🔄 Loading user profile for sidebar...')
    currentUser.value = await profileService.getCurrentUserProfile()
    console.log('✅ Sidebar user profile loaded:', currentUser.value.name)
  } catch (error) {
    console.error('Error loading user profile, using basic info:', error)
    const authUser = authService.getCurrentUser()
    if (authUser) {
      currentUser.value = {
        username: authUser.username,
        email: authUser.email,
        name: authUser.username,
        avatar: 'https://via.placeholder.com/150'
      }
    }
  }
}

const handleLogout = () => {
  currentUser.value = null
  emit('logout')
}

onMounted(() => {
  loadUserProfile()
})
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #ffffff;
  color: #000000;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 2px solid #a5a9b2;
}

.sidebar-logo {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #a5a9b2;
  width: 100%;
  display: flex;
  justify-content: center;
}

.sidebar-logo .logo {
  width: 120px;
  max-height: 80px;
  object-fit: contain;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  width: 100%;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-weight: 600;
  font-size: 0.875rem;
  color: #1f2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: 0.75rem;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  width: 100%;
}

.sidebar li {
  margin-bottom: 1rem;
}

.sidebar a {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #000000;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s, color 0.2s;
}

.sidebar a:hover {
  background-color: #e5e7eb;
}

.sidebar a.router-link-active {
  font-weight: bold;
  color: #378aa1;
  background-color: #e6f4ef;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  width: 100%;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
  font-size: 0.875rem;
}

.logout-btn:hover {
  background: #fef2f2;
}
</style>