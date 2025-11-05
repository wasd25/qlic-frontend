<template>
  <div class="profile-page">
    <div class="profile-header">
      <h1>{{ $t('profile.title') }}</h1>
      <p>{{ $t('profile.subtitle') }}</p>
    </div>

    <!-- Estados de carga/error -->
    <div v-if="isLoading" class="loading-state">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
      <p>{{ $t('common.loading') }}</p>
    </div>

    <div v-else-if="loadError" class="error-state">
      <i class="pi pi-exclamation-triangle" style="font-size: 2rem; color: #ef4444"></i>
      <p>{{ $t('common.error') }}</p>
      <Button :label="$t('common.retry')" @click="loadProfile" />
    </div>

    <!-- Contenido normal -->
    <div v-else-if="profile && Object.keys(profile).length > 0" class="profile-content">
      <profile-view-component
          :profile="profile"
          @edit="isEditing = true"
          @change-avatar="isAvatarModalOpen = true"
      />

      <profile-edit-component
          v-if="isEditing"
          :profile="profile"
          @save="handleSaveProfile"
          @cancel="isEditing = false"
      />

      <profile-avatar-component
          :is-open="isAvatarModalOpen"
          :current-avatar="profile.avatar"
          @update="handleAvatarChange"
          @close="isAvatarModalOpen = false"
      />

      <profile-password-component
          @change-password="handleChangePassword"
      />
    </div>

    <div v-else class="empty-state">
      <p>{{ $t('common.error') }}</p>
      <Button :label="$t('common.retry')" @click="loadProfile" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { profileService } from '../services/profile.service.js'
import ProfileViewComponent from '../components/profile-view.component.vue'
import ProfileEditComponent from '../components/profile-edit.component.vue'
import ProfileAvatarComponent from '../components/profile-avatar.component.vue'
import ProfilePasswordComponent from '../components/profile-password.component.vue'
import Button from 'primevue/button'

const router = useRouter()

// Estado reactivo
const profile = ref({})
const isEditing = ref(false)
const isAvatarModalOpen = ref(false)
const isLoading = ref(false)
const loadError = ref(false)

// US31: Cargar perfil al iniciar
const loadProfile = async () => {
  try {
    isLoading.value = true
    loadError.value = false
    console.log('🔄 Loading profile for current user...')

    profile.value = await profileService.getCurrentUserProfile()
    console.log('✅ Profile loaded successfully:', profile.value)

  } catch (error) {
    console.error('❌ Error loading profile:', error)
    loadError.value = true
    profile.value = {}
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
    console.log('✅ Perfil actualizado exitosamente')
  } catch (error) {
    console.error('❌ Error saving profile:', error)
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
    console.log('✅ Avatar actualizado exitosamente')
  } catch (error) {
    console.error('❌ Error updating avatar:', error)
    alert('Error al actualizar la foto de perfil')
  } finally {
    isLoading.value = false
  }
}

// US34: Cambiar contraseña
const handleChangePassword = async (passwordData) => {
  try {
    await profileService.changePassword(passwordData)
    console.log('✅ Contraseña cambiada exitosamente')
  } catch (error) {
    console.error('❌ Error changing password:', error)
    throw error
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

.loading-state, .error-state, .empty-state {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.loading-state p, .error-state p, .empty-state p {
  margin-top: 1rem;
  color: #6B7280;
}

.error-state {
  border: 1px solid #ef4444;
}
</style>