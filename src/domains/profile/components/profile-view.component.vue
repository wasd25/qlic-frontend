<template>
  <div class="profile-view">
    <div class="profile-card">
      <div class="avatar-section">
        <div class="avatar-container">
          <img
              :src="profile.avatar && profile.avatar.length > 5 ? profile.avatar : defaultAvatar"
              alt="Avatar"
              class="avatar"
              @error="handleImageError"
          />
          <button @click="$emit('change-avatar')" class="avatar-change-btn">
            <i class="pi pi-camera"></i>
          </button>
        </div>
        <h2>{{ profile.fullName }}</h2>
        <p class="email">{{ profile.email }}</p>
      </div>

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
            <p>{{ profile.age > 0 ? profile.age + ' años' : 'No especificado' }}</p>
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

      <div class="actions-section">
        <button @click="$emit('edit')" class="edit-btn">
          <i class="pi pi-pencil"></i> Editar Información
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  profile: { type: Object, required: true }
})

defineEmits(['edit', 'change-avatar'])

const handleImageError = (e) => {
  e.target.src = defaultAvatar.value;
}

const defaultAvatar = computed(() => {
  const initials = props.profile.name ? props.profile.name.charAt(0).toUpperCase() : 'U'
  return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=150`
})
</script>

<style scoped>
/* MANTÉN TUS ESTILOS ORIGINALES AQUÍ */
.profile-card { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
.avatar-section { text-align: center; margin-bottom: 2rem; }
.avatar { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 4px solid #f3f4f6; }
.avatar-container { position: relative; display: inline-block; }
.avatar-change-btn { position: absolute; bottom: 0; right: 0; background: #3B82F6; color: white; border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; }
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; text-align: left; }
.full-width { grid-column: 1 / -1; }
.info-item label { font-weight: bold; display: block; margin-bottom: 0.5rem; color: #555; }
.info-item p { background: #f9fafb; padding: 0.8rem; border-radius: 6px; margin: 0; border: 1px solid #eee; }
.edit-btn { background: #3B82F6; color: white; padding: 0.8rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; margin-top: 1rem; }
</style>