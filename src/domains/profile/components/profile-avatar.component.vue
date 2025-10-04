<template>
  <div class="avatar-modal" v-if="isOpen" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>Cambiar Foto de Perfil</h3>
        <button @click="closeModal" class="close-btn">
          <i class="pi pi-times"></i>
        </button>
      </div>

      <div class="modal-body">
        <!-- Vista previa -->
        <div class="preview-section">
          <div class="avatar-preview">
            <img
                :src="previewUrl || currentAvatar"
                alt="Vista previa"
                class="preview-image"
            />
          </div>
          <p class="preview-text">Vista previa</p>
        </div>

        <!-- Controles de upload -->
        <div class="upload-section">
          <input
              type="file"
              ref="fileInput"
              @change="handleFileSelect"
              accept="image/*"
              class="file-input"
              id="avatar-upload"
          />

          <label for="avatar-upload" class="upload-btn">
            <i class="pi pi-cloud-upload"></i>
            Seleccionar Imagen
          </label>

          <div class="file-info" v-if="selectedFile">
            <p><strong>Archivo:</strong> {{ selectedFile.name }}</p>
            <p><strong>Tamaño:</strong> {{ formatFileSize(selectedFile.size) }}</p>
          </div>

          <div class="upload-hint">
            <small>Formatos soportados: JPG, PNG, GIF. Tamaño máximo: 5MB</small>
          </div>
        </div>
      </div>

      <div class="modal-actions">
        <Button
            label="Cancelar"
            severity="secondary"
            @click="closeModal"
            :disabled="isLoading"
        />
        <Button
            label="Actualizar Foto"
            @click="handleUpload"
            :loading="isLoading"
            :disabled="!selectedFile"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Button from 'primevue/button'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  currentAvatar: {
    type: String,
    default: 'https://via.placeholder.com/150'
  }
})

const emit = defineEmits(['update', 'close'])

// Estado reactivo
const fileInput = ref(null)
const selectedFile = ref(null)
const previewUrl = ref('')
const isLoading = ref(false)

// Handlers
const handleFileSelect = (event) => {
  const file = event.target.files[0]

  if (!file) return

  // Validaciones
  if (!file.type.startsWith('image/')) {
    alert('Por favor selecciona un archivo de imagen válido')
    return
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB
    alert('La imagen no debe superar los 5MB')
    return
  }

  selectedFile.value = file

  // Crear URL para vista previa
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }
  previewUrl.value = URL.createObjectURL(file)
}

const handleUpload = async () => {
  if (!selectedFile.value) return

  try {
    isLoading.value = true
    await emit('update', selectedFile.value)
    closeModal()
  } catch (error) {
    console.error('Error uploading avatar:', error)
    alert('Error al actualizar la foto de perfil')
  } finally {
    isLoading.value = false
  }
}

const closeModal = () => {
  // Limpiar
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = ''
  }
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  emit('close')
}

// Utilidades
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Watch para resetear cuando se abre/cierra
watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    closeModal()
  }
})
</script>

<style scoped>
.avatar-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  color: #1f2937;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background: #f3f4f6;
}

.modal-body {
  margin-bottom: 2rem;
}

.preview-section {
  text-align: center;
  margin-bottom: 2rem;
}

.avatar-preview {
  width: 150px;
  height: 150px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #f3f4f6;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-text {
  color: #6b7280;
  margin: 0;
  font-size: 0.875rem;
}

.upload-section {
  text-align: center;
}

.file-input {
  display: none;
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #3B82F6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.875rem;
}

.upload-btn:hover {
  background: #2563eb;
}

.file-info {
  margin: 1rem 0;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.file-info p {
  margin: 0.25rem 0;
  color: #374151;
  font-size: 0.875rem;
}

.upload-hint {
  margin-top: 1rem;
}

.upload-hint small {
  color: #6b7280;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

/* Responsive */
@media (max-width: 640px) {
  .modal-content {
    padding: 1.5rem;
    margin: 1rem;
  }

  .modal-actions {
    flex-direction: column;
  }

  .avatar-preview {
    width: 120px;
    height: 120px;
  }
}
</style>