<template>
  <div class="profile-edit">
    <div class="edit-card">
      <div class="edit-header">
        <h3>{{ $t('profile.editTitle') }}</h3>
        <p>{{ $t('profile.editSubtitle') }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="edit-form">
        <div class="form-grid">

          <div class="form-group">
            <label>{{ $t('profile.firstName') }} *</label>
            <InputText
                v-model="formData.name"
                :placeholder="$t('profile.yourName')"
                :class="{ 'p-invalid': errors.name }"
            />
            <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
          </div>

          <div class="form-group">
            <label>{{ $t('profile.lastName') }} *</label>
            <InputText
                v-model="formData.lastName"
                :placeholder="$t('profile.yourLastName')"
                :class="{ 'p-invalid': errors.lastName }"
            />
            <small v-if="errors.lastName" class="error-message">{{ errors.lastName }}</small>
          </div>

          <div class="form-group">
            <label>{{ $t('profile.email') }} *</label>
            <InputText v-model="formData.email" disabled />
          </div>

          <div class="form-group">
            <label>{{ $t('profile.age') }}</label>
            <InputNumber v-model="formData.age" :min="0" :max="120" showButtons />
          </div>

          <div class="form-group">
            <label>{{ $t('profile.phone') }}</label>
            <InputText
                v-model="formData.phone"
                :placeholder="$t('profile.yourPhone')"
            />
          </div>

          <div class="form-group full-width">
            <label>{{ $t('profile.avatarUrl') || 'URL Avatar' }}</label>
            <InputText
                v-model="formData.avatar"
                placeholder="https://..."
            />
          </div>

          <div class="form-group full-width">
            <label>{{ $t('profile.address') }}</label>
            <Textarea
                v-model="formData.address"
                rows="2"
                autoResize
                :placeholder="$t('profile.yourAddress')"
            />
          </div>
        </div>

        <div class="form-actions">
          <Button
              :label="$t('profile.cancel')"
              severity="secondary"
              @click="$emit('cancel')"
              type="button"
          />
          <Button
              type="submit"
              :label="$t('profile.saveChanges')"
              :loading="isLoading"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { UserProfile } from '../model/user-profile.entity.js'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'

const props = defineProps({ profile: { type: Object, required: true } })
const emit = defineEmits(['save', 'cancel'])

// Hook para traducciones en JS
const { t } = useI18n()

const formData = ref({})
const errors = ref({})
const isLoading = ref(false)

onMounted(() => {
  // Copiamos los datos para editar sin mutar el prop
  formData.value = {
    name: props.profile.name,
    lastName: props.profile.lastName,
    email: props.profile.email,
    age: props.profile.age,
    phone: props.profile.phone,
    avatar: props.profile.avatar,
    address: props.profile.address,
    // Datos ocultos para la entidad
    _street: props.profile._street,
    _city: props.profile._city,
    _number: props.profile._number,
    _postalCode: props.profile._postalCode,
    _country: props.profile._country
  }
})

const handleSubmit = async () => {
  errors.value = {}

  // Validaciones usando las llaves del JSON
  if (!formData.value.name) {
    errors.value.name = t('profile.nameRequired')
  }
  if (!formData.value.lastName) {
    errors.value.lastName = t('profile.lastNameRequired')
  }

  // Si hay errores, no continuamos
  if (Object.keys(errors.value).length > 0) return;

  isLoading.value = true

  // Reconstruimos la entidad
  const updatedProfileEntity = new UserProfile({
    id: props.profile.id,
    ...formData.value
  })

  emit('save', updatedProfileEntity)
  isLoading.value = false
}
</script>

<style scoped>
.profile-edit { width: 100%; }
.edit-card { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); border: 2px solid #3B82F6; }
.edit-header { margin-bottom: 2rem; text-align: center; }
.edit-header h3 { color: #1f2937; margin: 0 0 0.5rem 0; }
.edit-header p { color: #6b7280; margin: 0; }
.edit-form { width: 100%; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem; }
.form-group { display: flex; flex-direction: column; }
.form-group.full-width { grid-column: 1 / -1; }
.form-group label { font-weight: 600; color: #374151; margin-bottom: 0.5rem; font-size: 0.875rem; }
.error-message { color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem; }
.form-actions { display: flex; gap: 1rem; justify-content: flex-end; padding-top: 1.5rem; border-top: 1px solid #e5e7eb; }
@media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } .edit-card { padding: 1.5rem; } .form-actions { flex-direction: column; } }
</style>