<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="sidebar-logo">
      <img src="https://i.imgur.com/FCYH4sj.png" alt="Logo" class="logo" />
    </div>

    <!-- Línea de separación -->
    <hr class="sidebar-divider" />

    <!-- Opciones del sidebar -->
    <nav class="sidebar-menu">
      <RouterLink to="/dashboard" class="sidebar-item">
        <i class="pi pi-home"></i>
        <span>Dashboard</span>
      </RouterLink>

      <RouterLink to="/reports" class="sidebar-item">
        <i class="pi pi-chart-line"></i>
        <span>Reports</span>
      </RouterLink>

      <RouterLink to="/profile" class="sidebar-item">
        <i class="pi pi-user"></i>
        <span>Profile</span>
      </RouterLink>

      <RouterLink to="/alerts" class="sidebar-item">
        <i class="pi pi-bell"></i>
        <span>Alerts</span>
      </RouterLink>

      <RouterLink to="/usage-management" class="sidebar-item">
        <i class="pi pi-cog"></i>
        <span>Usage Management</span>
      </RouterLink>

      <RouterLink to="/anomaly-detection" class="sidebar-item">
        <i class="pi pi-search"></i>
        <span>Anomaly Detection</span>
      </RouterLink>

      <RouterLink to="/payments" class="sidebar-item">
        <i class="pi pi-credit-card"></i>
        <span>Payments</span>
      </RouterLink>

      <RouterLink to="/subscription" class="sidebar-item">
        <i class="pi pi-wallet"></i>
        <span>Subscription</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: white; /* Fondo blanco */
  border-right: 2px solid #a5a9b2; /* Borde lateral */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar-logo {
  padding: 20px;
}

.logo {
  width: 150px;
  height: auto;
}

/* Línea de separación debajo del logo */
.sidebar-divider {
  width: 100%;
  border: none;
  border-bottom: 1px solid #a5a9b2;
  margin: 0 0 10px 0;
}

.sidebar-menu {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  text-decoration: none;
  color: black; /* Texto negro */
  font-weight: 500;
  transition: background-color 0.2s;
}

.sidebar-item i {
  margin-right: 10px;
  font-size: 1.2rem;
  color: black; /* Íconos negros */
}

.sidebar-item:hover {
  background-color: #f2f2f2; /* Hover gris claro */
}
</style>
