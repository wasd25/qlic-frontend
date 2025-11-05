<template>
  <div class="language-switcher">
    <div class="language-header">
      <i class="pi pi-language"></i>
      <span>Idioma / Language</span>
    </div>
    <button
        @click="setLanguage('es')"
        class="language-btn"
        :class="{ active: currentLanguage === 'es' }"
    >
      <span>Español</span>
      <i class="pi pi-check" v-if="currentLanguage === 'es'"></i>
    </button>
    <button
        @click="setLanguage('en')"
        class="language-btn"
        :class="{ active: currentLanguage === 'en' }"
    >
      <span>English</span>
      <i class="pi pi-check" v-if="currentLanguage === 'en'"></i>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const currentLanguage = computed(() => locale.value)

const setLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('preferred-language', lang)
}
</script>

<style scoped>
.language-switcher {
  width: 100%;
  margin: 1rem 0;
  padding: 0 0.5rem;
}

.language-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
}

.language-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem;
  background: #f8f9fa;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  color: #374151;
  font-size: 0.875rem;
  transition: all 0.2s;
  margin-bottom: 0.5rem;
}

.language-btn:hover {
  background: #e5e7eb;
}

.language-btn.active {
  background: #3B82F6;
  color: white;
  border-color: #3B82F6;
}
</style>