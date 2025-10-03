<template>
  <router-link :to="to" class="sidebar-item" active-class="active">
    <span class="icon">
      <component :is="icon" />
    </span>
    <span class="label">{{ label }}</span>
    <span v-if="badge" class="badge">{{ badge }}</span>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  icon: any
  label: string
  to: string
  badge?: number
}>()
</script>

<style scoped>
.sidebar-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  gap: 0.75rem;
  color: #374151;
  text-decoration: none;
  font-size: 0.95rem;
  position: relative;
}

.sidebar-item:hover {
  background: #f3f4f6;
}

.sidebar-item.active {
  background: #e0f2fe;
  font-weight: 600;
}

.icon {
  display: flex;
}

.badge {
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  margin-left: auto;
}
</style>
