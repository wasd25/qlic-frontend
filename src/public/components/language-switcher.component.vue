<template>
  <div class="lang-switcher">
    <select v-model="locale" @change="changeLang">
      <option v-for="lang in languages" :key="lang" :value="lang">
        {{ lang.toUpperCase() }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const languages = ['en', 'es', 'fr']

function changeLang(e: Event) {
  locale.value = (e.target as HTMLSelectElement).value
}
</script>

<style scoped>
.lang-switcher select {
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  font-size: 0.85rem;
}
</style>
