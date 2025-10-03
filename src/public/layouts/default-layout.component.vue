<template>
  <div class="layout">
    <side-bar-navigation />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import SideBarNavigation from '../components/side-bar-navigation.component.vue'
</script>

<style scoped>
.layout {
  display: flex;
}

.content {
  flex-grow: 1;
  padding: 1rem;
  background: #f9fafb;
  height: 100vh;
  overflow-y: auto;
}
</style>
