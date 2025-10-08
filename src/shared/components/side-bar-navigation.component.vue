<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="sidebar-logo">
      <img
          src="https://i.imgur.com/FCYH4sj.png"
          alt="App Logo"
          class="logo"
      />
    </div>

    <!-- Navegación -->
    <nav>
      <ul>
        <li>
          <router-link to="/dashboard">
            <i class="pi pi-home"></i>
            <span>Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link to="/reports">
            <i class="pi pi-chart-bar"></i>
            <span>Reports</span>
          </router-link>
        </li>
        <li>
          <router-link to="/profile">
            <i class="pi pi-user"></i>
            <span>Profile</span>
          </router-link>
        </li>
        <li>
          <router-link to="/alerts">
            <i class="pi pi-bell"></i>
            <span>Alerts</span>
          </router-link>
        </li>
        <li>
          <router-link to="/usage-management">
            <i class="pi pi-sliders-h"></i>
            <span>Usage Management</span>
          </router-link>
        </li>
        <li>
          <router-link to="/anomaly-detection">
            <i class="pi pi-exclamation-circle"></i>
            <span>Anomaly Detection</span>
          </router-link>
        </li>
        <li>
          <router-link to="/payments">
            <i class="pi pi-credit-card"></i>
            <span>Payments</span>
          </router-link>
        </li>
        <li>
          <router-link to="/subscription">
            <i class="pi pi-wallet"></i>
            <span>Subscription</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Selector de idioma -->
    <div class="language-switch">
      <button class="lang-btn" @click="toggleLanguage">
        <i class="pi pi-globe  "></i>
        <span>{{ languageLabel }}</span>
      </button>
    </div>

  </aside>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { locale } = useI18n()

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'es' : 'en'
  localStorage.setItem('lang', locale.value)
}

const languageLabel = computed(() =>
    locale.value === 'en' ? 'Español' : 'English'
)
</script>

<style scoped>
.sidebar {
  width: 220px;
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

/* Estilo del selector de idioma */
.language-switch {
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

.lang-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #378aa1;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.lang-btn:hover {
  background-color: #2e748a;
  transform: translateY(-1px);
}

.lang-btn i {
  font-size: 1rem;
  color: #d0f0f7;
}

</style>
