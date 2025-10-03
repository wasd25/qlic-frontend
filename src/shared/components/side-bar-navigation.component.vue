<script setup>
import { menuItems } from '../utils/menu-items.js'
</script>

<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="sidebar-logo">
      <img src="https://i.imgur.com/FCYH4sj.png" alt="Logo" class="logo" />
    </div>

    <!-- Divider -->
    <div class="sidebar-divider"></div>

    <!-- Navigation -->
    <nav>
      <ul>
        <li v-for="item in menuItems" :key="item.name">
          <router-link :to="item.to" class="nav-link">
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
            <span v-if="item.badge" class="badge">{{ item.badge }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #ffffff; /* Sidebar blanco */
  border-right: 1px solid #a5a9b2; /* Borde lateral */
  display: flex;
  flex-direction: column;
}

.sidebar-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
}

.sidebar-logo .logo {
  max-width: 120px;
  height: auto;
}

.sidebar-divider {
  border-bottom: 1px solid #a5a9b2; /* Línea de separación */
  margin-bottom: 1rem;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #000000; /* Texto negro */
  text-decoration: none;
  transition: background-color 0.3s;
}

.nav-link i {
  font-size: 1.2rem;
  color: #000000; /* Iconos negros */
}

.nav-link:hover {
  background-color: #f0f0f0; /* Hover gris claro */
}

.badge {
  margin-left: auto;
  background-color: #a5a9b2;
  color: white;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
}
</style>
