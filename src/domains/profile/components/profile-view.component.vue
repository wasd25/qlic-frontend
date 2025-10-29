<template>
  <div class="profile-view">
    <div class="profile-card">
      <!-- Avatar Section -->
      <div class="avatar-section">
        <div class="avatar-container">
          <img
              :src="profile.avatar || defaultAvatar"
              :alt="fullName"
              class="avatar"
          />
          <button
              @click="$emit('change-avatar')"
              class="avatar-change-btn"
              :title="$t('avatar.changePhoto')"
          >
            <i class="pi pi-camera"></i>
          </button>
        </div>
        <h2>{{ fullName }}</h2>
        <p class="email">{{ profile.email }}</p>
      </div>

      <!-- Información Personal -->
      <div class="info-section">
        <h3>{{ $t('profile.personalInfo') }}</h3>
        <div class="info-grid">
          <div class="info-item">
            <label>{{ $t('profile.firstName') }}</label>
            <p>{{ profile.name || $t('profile.notSpecified') }}</p>
          </div>
          <div class="info-item">
            <label>{{ $t('profile.lastName') }}</label>
            <p>{{ profile.lastName || $t('profile.notSpecified') }}</p>
          </div>
          <div class="info-item">
            <label>{{ $t('profile.email') }}</label>
            <p class="email-field">{{ profile.email || $t('profile.notSpecified') }}</p>
          </div>
          <div class="info-item">
            <label>{{ $t('profile.age') }}</label>
            <p>{{ profile.age ? `${profile.age} ${$t('profile.years')}` : $t('profile.notSpecified') }}</p>
          </div>
          <div class="info-item">
            <label>{{ $t('profile.phone') }}</label>
            <p>{{ profile.phone || $t('profile.notSpecified') }}</p>
          </div>
          <div class="info-item full-width">
            <label>{{ $t('profile.address') }}</label>
            <p>{{ profile.address || $t('profile.notSpecified') }}</p>
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
          {{ $t('profile.editInfo') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  profile: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

defineEmits(['edit', 'change-avatar'])

// Computed properties para datos derivados
const fullName = computed(() => {
  if (props.profile.name && props.profile.lastName) {
    return `${props.profile.name} ${props.profile.lastName}`
  }
  if (props.profile.name) {
    return props.profile.name
  }
  if (props.profile.lastName) {
    return props.profile.lastName
  }
  return props.profile.username || 'Usuario' // Fallback al username si no hay nombre
})

const defaultAvatar = computed(() => {
  const initials = (props.profile.name?.charAt(0) || props.profile.username?.charAt(0) || 'U').toUpperCase()
  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6']
  const color = colors[(props.profile.name?.length || props.profile.username?.length || 0) % colors.length]

  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><rect width="150" height="150" fill="${color}" rx="75"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="60" font-family="Arial, sans-serif">${initials}</text></svg>`
})
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
  font-weight: 600;
}

.email {
  color: #6b7280;
  margin: 0;
  font-size: 1rem;
}

.info-section h3 {
  color: #374151;
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
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

.email-field {
  word-break: break-all;
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