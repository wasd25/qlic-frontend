<template>
  <div class="profile-page">
    <div class="profile-header">
      <h1>Mi Perfil</h1>
      <p>Gestiona tu información personal y preferencias</p>
    </div>

    <div class="profile-content">
      <!-- US31: Visualización del perfil -->
      <profile-view-component
          :profile="profile"
          @edit="isEditing = true"
          @change-avatar="isAvatarModalOpen = true"
      />

      <!-- US32: Edición de información -->
      <profile-edit-component
          v-if="isEditing"
          :profile="profile"
          @save="handleSaveProfile"
          @cancel="isEditing = false"
      />

      <!-- US33: Modal de cambio de avatar -->
      <profile-avatar-component
          :is-open="isAvatarModalOpen"
          :current-avatar="profile.avatar"
          @update="handleAvatarChange"
          @close="isAvatarModalOpen = false"
      />

      <!-- US34: Cambio de contraseña -->
      <profile-password-component
          @change-password="handleChangePassword"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { profileService } from '../services/profile.service.js'
import ProfileViewComponent from '../components/profile-view.component.vue'
import ProfileEditComponent from '../components/profile-edit.component.vue'
import ProfileAvatarComponent from '../components/profile-avatar.component.vue'
import ProfilePasswordComponent from '../components/profile-password.component.vue'

// Estado reactivo
const profile = ref({})
const isEditing = ref(false)
const isAvatarModalOpen = ref(false)
const isLoading = ref(false)

// US31: Cargar perfil al iniciar
const loadProfile = async () => {
  try {
    isLoading.value = true
    profile.value = await profileService.getProfile()
  } catch (error) {
    console.error('Error loading profile:', error)
    // Aquí podrías mostrar un mensaje de error al usuario
  } finally {
    isLoading.value = false
  }
}

// US32: Guardar cambios del perfil
const handleSaveProfile = async (updatedData) => {
  try {
    isLoading.value = true
    profile.value = await profileService.updateProfile(updatedData)
    isEditing.value = false
    // Aquí podrías mostrar mensaje de éxito
    console.log('Perfil actualizado exitosamente')
  } catch (error) {
    console.error('Error saving profile:', error)
    // Aquí podrías mostrar un mensaje de error
  } finally {
    isLoading.value = false
  }
}

// US33: Cambiar avatar
const handleAvatarChange = async (avatarFile) => {
  try {
    isLoading.value = true
    profile.value = await profileService.updateAvatar(avatarFile)
    isAvatarModalOpen.value = false
    console.log('Avatar actualizado exitosamente')
    // Aquí podrías mostrar mensaje de éxito
  } catch (error) {
    console.error('Error updating avatar:', error)
    alert('Error al actualizar la foto de perfil')
  } finally {
    isLoading.value = false
  }
}

// US34: Cambiar contraseña
const handleChangePassword = async (passwordData) => {
  try {
    await profileService.changePassword(passwordData)
    console.log('Contraseña cambiada exitosamente')
    // Aquí podrías mostrar mensaje de éxito
  } catch (error) {
    console.error('Error changing password:', error)
    throw error // para manejar en el componente
  }
}

// Cargar perfil cuando el componente se monta
onMounted(() => {
  loadProfile()
})
</script>

<style scoped>
.profile-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-header {
  text-align: center;
  margin-bottom: 3rem;
}

.profile-header h1 {
  color: #1F2937;
  margin-bottom: 0.5rem;
}

.profile-header p {
  color: #6B7280;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>