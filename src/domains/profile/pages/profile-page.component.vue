<template>
  <div class="profile-page">
    <div class="header">
      <h1>{{ $t('profile.title') }}</h1>
      <p>{{ $t('profile.subtitle') }}</p>
    </div>

    <div v-if="loading" class="loading-state">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
      <p>{{ $t('common.loading') }}</p>
    </div>

    <div v-else-if="error" class="error-state">
      <i class="pi pi-exclamation-circle"></i>
      <p>{{ error }}</p>
      <Button :label="$t('common.retry')" @click="loadProfile" class="p-button-text" />
    </div>

    <div v-else class="content-wrapper">
      <ProfileView
          v-if="!isEditing"
          :profile="profile"
          @edit="isEditing = true"
          @change-avatar="handleAvatarClick"
      />

      <ProfileEdit
          v-else
          :profile="profile"
          @save="handleSaveProfile"
          @cancel="isEditing = false"
      />
    </div>

    <input
        type="file"
        ref="fileInput"
        accept="image/*"
        style="display: none"
        @change="handleAvatarChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { profileService } from '../services/profile.service'
import ProfileView from '../components/profile-view.component.vue'
import ProfileEdit from '../components/profile-edit.component.vue'
import Button from 'primevue/button'

const { t } = useI18n()
const profile = ref({})
const loading = ref(true)
const error = ref(null)
const isEditing = ref(false)
const fileInput = ref(null)

const loadProfile = async () => {
  loading.value = true
  try {
    profile.value = await profileService.getCurrentUserProfile()
  } catch (e) {
    console.error(e)
    error.value = t('common.error') // "Error"
  } finally {
    loading.value = false
  }
}

const handleSaveProfile = async (updatedEntity) => {
  try {
    profile.value = await profileService.updateProfile(updatedEntity)
    isEditing.value = false
  } catch (e) {
    console.error(e)
    // Puedes usar un Toast aquí si tienes PrimeVue ToastService
    alert(t('common.error'))
  }
}

const handleAvatarClick = () => fileInput.value.click()

const handleAvatarChange = async (event) => {
  const file = event.target.files[0]
  if (file) {
    try {
      profile.value = await profileService.updateAvatar(file)
    } catch (e) {
      console.error(e)
      alert(t('avatar.uploadError'))
    }
  }
}

onMounted(loadProfile)
</script>

<style scoped>
.profile-page { padding: 2rem; max-width: 800px; margin: 0 auto; }
.header { margin-bottom: 2rem; text-align: center; }
.header h1 { margin: 0; color: #1f2937; }
.header p { color: #6b7280; margin-top: 0.5rem; }
.loading-state, .error-state { text-align: center; padding: 4rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.content-wrapper { display: flex; flex-direction: column; gap: 2rem; }
</style>