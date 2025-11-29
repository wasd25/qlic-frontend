<template>
  <div class="profile-edit">
    <div class="edit-card">
      <div class="edit-header">
        <h3>{{ $t('profile.editTitle') }}</h3>
      </div>

      <form @submit.prevent="handleSubmit" class="edit-form">
        <div class="form-grid">

          <div class="form-group">
            <label>Nombre *</label>
            <InputText v-model="formData.name" :class="{ 'p-invalid': errors.name }" />
            <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
          </div>

          <div class="form-group">
            <label>Apellido *</label>
            <InputText v-model="formData.lastName" :class="{ 'p-invalid': errors.lastName }" />
          </div>

          <div class="form-group">
            <label>Email *</label>
            <InputText v-model="formData.email" />
          </div>

          <div class="form-group">
            <label>Edad</label>
            <InputNumber v-model="formData.age" :min="0" :max="120" showButtons />
          </div>

          <div class="form-group">
            <label>Teléfono</label>
            <InputText v-model="formData.phone" />
          </div>

          <div class="form-group full-width">
            <label>Avatar URL (Link de imagen)</label>
            <InputText v-model="formData.avatar" placeholder="https://..." />
            <small>Pega aquí un link de imagen para tu perfil</small>
          </div>

          <div class="form-group full-width">
            <label>Dirección</label>
            <Textarea v-model="formData.address" rows="2" autoResize />
          </div>
        </div>

        <div class="form-actions">
          <Button label="Cancelar" severity="secondary" @click="$emit('cancel')" />
          <Button type="submit" label="Guardar Cambios" :loading="isLoading" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { UserProfile } from '../model/user-profile.entity.js' // Importar la clase
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'

const props = defineProps({
  profile: { type: Object, required: true }
})

const emit = defineEmits(['save', 'cancel'])
const formData = ref({})
const errors = ref({})
const isLoading = ref(false)

// Inicializar datos de forma segura
onMounted(() => {
  // Creamos una copia simple de los datos para no modificar el prop directamente
  formData.value = {
    name: props.profile.name,
    lastName: props.profile.lastName,
    email: props.profile.email,
    age: props.profile.age,
    phone: props.profile.phone,
    avatar: props.profile.avatar,
    address: props.profile.address,
    // Preservamos los datos ocultos para devolverlos
    _street: props.profile._street,
    _city: props.profile._city,
    _number: props.profile._number,
    _postalCode: props.profile._postalCode,
    _country: props.profile._country
  }
})

const handleSubmit = async () => {
  if (!formData.value.name) {
    errors.value.name = 'El nombre es obligatorio'
    return
  }

  isLoading.value = true

  // Reconstruimos la entidad UserProfile con los datos del formulario
  // Ojo: Usamos el ID original del prop
  const updatedProfileEntity = new UserProfile({
    id: props.profile.id,
    ...formData.value
  })

  emit('save', updatedProfileEntity)
  isLoading.value = false
}
</script>

<style scoped>
/* Tus estilos actuales están bien, mantenlos */
.profile-edit { width: 100%; }
.edit-card { background: white; padding: 2rem; border-radius: 12px; border: 2px solid #3B82F6; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
.full-width { grid-column: 1 / -1; }
.form-actions { display: flex; justify-content: flex-end; gap: 1rem; }
.error-message { color: red; font-size: 0.8rem; }
</style>