<template>
  <div :class="['alert-card', alertType.toLowerCase()]">
    <div class="icon-section">
      <i :class="iconClass" class="main-icon"></i>
    </div>
    <div class="content">
      <h4>{{ translatedTitle }}</h4>
      <p>{{ translatedMessage }}</p>
      <small>{{ translatedTimestamp }}</small>
    </div>
    <div class="dismiss">
      <i :class="dismissIconClass"></i>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import i18n from '../../../i18n.js'

const props = defineProps({ alert: Object })
const { t, te } = useI18n()

const alertType = computed(() => props.alert?.alertType || 'Info')

const iconClass = computed(() => {
  const icons = {
    Critical: 'pi pi-exclamation-triangle text-red-500',
    Warning: 'pi pi-exclamation-circle text-yellow-500',
    Info: 'pi pi-info-circle text-blue-500'
  }
  return icons[alertType.value] || 'pi pi-bell'
})

const dismissIconClass = computed(() => {
  const icons = {
    Critical: 'pi pi-times text-red-500',
    Warning: 'pi pi-times text-yellow-500',
    Info: 'pi pi-times text-blue-500'
  }
  return icons[alertType.value] || 'pi pi-times'
})

// Use computed properties for reactive translations
const translatedTitle = computed(() => {
  if (!props.alert?.title) return ''
  const key = `alertTitles.${props.alert.title}`
  const hasTranslation = te(key)

  if (hasTranslation) {
    return t(key)
  }
  // Fallback: try direct lookup in the loaded messages to handle keys with dots/spaces
  try {
    const locale = i18n.global.locale.value || i18n.global.locale
    const msgs = i18n.global.getLocaleMessage ? i18n.global.getLocaleMessage(locale) : (i18n.global.messages && i18n.global.messages[locale])
    const direct = msgs?.alertTitles?.[props.alert.title]
    if (direct) return direct
  } catch (e) {
    // ignore and fallback to original title
  }
  return props.alert.title
})

const translatedMessage = computed(() => {
  if (!props.alert?.message) return ''
  const key = `alertMessages.${props.alert.message}`
  const hasTranslation = te(key)

  if (hasTranslation) {
    return t(key)
  }

  // Fallback: buscar directamente en los mensajes cargados (maneja puntos, #, comillas, etc.)
  try {
    const locale = i18n.global.locale.value || i18n.global.locale
    const msgs = i18n.global.getLocaleMessage ? i18n.global.getLocaleMessage(locale) : (i18n.global.messages && i18n.global.messages[locale])
    const direct = msgs?.alertMessages?.[props.alert.message]
    if (direct) return direct

    // Si no existe en el locale actual, intentar con 'en' como respaldo
    const enMsgs = i18n.global.getLocaleMessage ? i18n.global.getLocaleMessage('en') : (i18n.global.messages && i18n.global.messages['en'])
    const directEn = enMsgs?.alertMessages?.[props.alert.message]
    if (directEn) return directEn
  } catch (e) {
    // ignore
  }

  return props.alert.message
})

const translatedTimestamp = computed(() => {
  if (!props.alert?.timestamp) return ''
  const key = `alertTimestamps.${props.alert.timestamp}`
  const hasTranslation = te(key)

  if (hasTranslation) {
    return t(key)
  }
  return props.alert.timestamp
})
</script>

<style scoped>
.alert-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  border-left: 4px solid;
}

.alert-card.critical { border-color: #dc2626; }
.alert-card.warning { border-color: #f59e0b; }
.alert-card.info { border-color: #3b82f6; }

.icon-section {
  flex-shrink: 0;
  margin-right: 1rem;
}

.main-icon {
  font-size: 1.8rem;
}

.content {
  flex-grow: 1;
}

.content h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
}

.content p {
  font-size: 0.9rem;
  margin: 0 0 0.25rem 0;
  color: #374151;
}

.content small {
  font-size: 0.8rem;
  color: #6b7280;
}

.dismiss {
  flex-shrink: 0;
  margin-left: 1rem;
}

.dismiss i {
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
