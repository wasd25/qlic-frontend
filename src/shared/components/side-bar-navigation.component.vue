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
  </aside>
</template>

<style scoped>
/* Sidebar contenedor */
.sidebar {
  width: 220px;
  background-color: #ffffff; /* Fondo blanco */
  color: #000000; /* Texto negro */
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* Borde lateral derecho */
  border-right: 2px solid #a5a9b2;
}

.sidebar-logo {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #a5a9b2; /* línea separadora */
  width: 100%; /* OBLIGA al contenedor a medir el ancho */
  display: flex;
  justify-content: center;
}

.sidebar-logo .logo {
  width: 120px;
  max-height: 80px;
  object-fit: contain;
}

/* Lista de navegación */
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
  color: #000000; /* Negro para íconos y texto */
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s, color 0.2s;
}

/* Hover */
.sidebar a:hover {
  background-color: #e5e7eb; /* gris claro al pasar */
}

/* Active */
.sidebar a.router-link-active {
  font-weight: bold;
  color: #378aa1; /* blue chill */
  background-color: #e6f4ef; /* verde muy clarito */
}
</style>
