<template>
  <Transition name="toast">
    <div v-if="show" :class="['toast', type]">
      <div class="toast-icon">
        <span v-if="type === 'success'">✓</span>
        <span v-else-if="type === 'error'">✕</span>
        <span v-else>ℹ</span>
      </div>
      <div class="toast-content">
        <p class="toast-title">{{ title }}</p>
        <p v-if="message" class="toast-message">{{ message }}</p>
      </div>
      <button @click="close" class="toast-close">&times;</button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  type: { type: String, default: 'info' }, // 'success', 'error', 'info'
  title: { type: String, required: true },
  message: { type: String, default: '' },
  duration: { type: Number, default: 3000 }
})

const emit = defineEmits(['close'])

let timeout = null

watch(() => props.show, (newVal) => {
  if (newVal) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      emit('close')
    }, props.duration)
  }
})

const close = () => {
  if (timeout) clearTimeout(timeout)
  emit('close')
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 24px;
  right: 24px;
  min-width: 320px;
  max-width: 420px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  z-index: 9999;
  border-left: 4px solid;
}

.toast.success {
  border-left-color: #10b981;
}

.toast.error {
  border-left-color: #ef4444;
}

.toast.info {
  border-left-color: #3b82f6;
}

.toast-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  flex-shrink: 0;
}

.toast.success .toast-icon {
  background: #d1fae5;
  color: #10b981;
}

.toast.error .toast-icon {
  background: #fee2e2;
  color: #ef4444;
}

.toast.info .toast-icon {
  background: #dbeafe;
  color: #3b82f6;
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
  font-size: 14px;
}

.toast-message {
  color: #6b7280;
  margin: 0;
  font-size: 13px;
  line-height: 1.4;
}

.toast-close {
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.2s;
}

.toast-close:hover {
  color: #4b5563;
}

/* Transition animations */
.toast-enter-active {
  animation: slideIn 0.3s ease-out;
}

.toast-leave-active {
  animation: slideOut 0.3s ease-in;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>

