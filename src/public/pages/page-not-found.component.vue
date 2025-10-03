<!-- src/public/pages/page-not-found.component.vue -->
<template>
  <div class="not-found">
    <i class="pi pi-exclamation-triangle icon"></i>
    <h1>404</h1>
    <p>Oops! The page you’re looking for doesn’t exist.</p>
    <router-link to="/dashboard" class="btn">
      <i class="pi pi-home"></i> Back to Dashboard
    </router-link>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  gap: 1rem;
}

.not-found h1 {
  font-size: 5rem;
  margin: 0;
  color: var(--primary-color);
}

.not-found .icon {
  font-size: 3rem;
  color: #ef4444; /* rojo */
}

.not-found p {
  font-size: 1.2rem;
  color: #6b7280; /* gris */
}

.not-found .btn {
  margin-top: 1rem;
  background-color: var(--primary-color);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.not-found .btn:hover {
  background-color: #2563eb; /* azul más oscuro */
}
</style>
