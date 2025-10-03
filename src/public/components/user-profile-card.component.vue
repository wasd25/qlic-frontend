<template>
  <div class="user-profile">
    <img class="avatar" :src="user.avatar" alt="User avatar" />
    <div class="info">
      <p class="name">{{ user.name }}</p>
      <p class="role">{{ user.role }}</p>
    </div>
    <button class="settings-btn">⚙️</button>
  </div>
</template>

<script setup lang="ts">
const user = {
  name: 'Alexander',
  role: 'Administrator',
  avatar: '/default-avatar.png'
}
</script>

<style scoped>
.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e5e7eb;
}

.info {
  flex-grow: 1;
}

.name {
  font-size: 0.9rem;
  font-weight: 600;
}

.role {
  font-size: 0.75rem;
  color: #6b7280;
}

.settings-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}
</style>
