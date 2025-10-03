<template>
  <div class="layout">
    <side-bar-navigation />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import SideBarNavigation from './public/components/side-bar-navigation.component.vue'
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--app-bg, #f5f5f5);
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>
