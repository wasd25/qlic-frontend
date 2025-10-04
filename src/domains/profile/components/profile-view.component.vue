<template>
  <div class="profile-view">
    <div class="profile-card">
      <!-- Avatar Section -->
      <div class="avatar-section">
        <div class="avatar-container">
          <img
              :src="profile.avatar || 'https://via.placeholder.com/150'"
              :alt="profile.fullName || 'Usuario'"
              class="avatar"
          />
          <button
              @click="$emit('change-avatar')"
              class="avatar-change-btn"
              title="Cambiar foto de perfil"
          >
            <i class="pi pi-camera"></i>
          </button>
        </div>
        <h2>{{ profile.fullName || 'Nombre completo' }}</h2>
        <p class="email">{{ profile.email || 'email@ejemplo.com' }}</p>
      </div>

      <!-- Información Personal -->
      <div class="info-section">
        <h3>Información Personal</h3>
        <div class="info-grid">
          <div class="info-item">
            <label>Nombre</label>
            <p>{{ profile.name || 'No especificado' }}</p>
          </div>
          <div class="info-item">
            <label>Apellido</label>
            <p>{{ profile.lastName || 'No especificado' }}</p>
          </div>
          <div class="info-item">
            <label>Edad</label>
            <p>{{ profile.age ? `${profile.age} años` : 'No especificado' }}</p>
          </div>
          <div class="info-item">
            <label>Teléfono</label>
            <p>{{ profile.phone || 'No especificado' }}</p>
          </div>
          <div class="info-item full-width">
            <label>Dirección</label>
            <p>{{ profile.address || 'No especificado' }}</p>
          </div>
        </div>
      </div>

      <!-- Acciones -->
      <div class="actions-section">
        <button
            @click="$emit('edit')"
            class="edit-btn"
        >
          <i class="pi pi-pencil"></i>
          Editar Información
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  profile: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

defineEmits(['edit', 'change-avatar'])
</script>

<style scoped>
.profile-view {
  width: 100%;
}

.profile-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.avatar-section {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f3f4f6;
}

.avatar-change-btn {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.avatar-change-btn:hover {
  background: #2563eb;
}

.avatar-section h2 {
  margin: 0.5rem 0 0.25rem 0;
  color: #1f2937;
  font-size: 1.5rem;
}

.email {
  color: #6b7280;
  margin: 0;
}

.info-section h3 {
  color: #374151;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-item label {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.info-item p {
  margin: 0;
  color: #6b7280;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.actions-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e7eb;
  text-align: center;
}

.edit-btn {
  background: #3B82F6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.edit-btn:hover {
  background: #2563eb;
}

/* Responsive */
@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }

  .profile-card {
    padding: 1.5rem;
  }
}
</style>