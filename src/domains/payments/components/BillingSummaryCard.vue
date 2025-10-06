<template>
  <div class="bg-white rounded-2xl shadow p-4 flex items-center justify-between card-root">
    <div>
      <p class="text-gray-500 text-sm">{{ title }}</p>
      <p class="text-xl font-semibold mt-1">{{ value }}</p>
    </div>
    <div class="text-2xl text-blue-600 p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-inner">
      {{ icon }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  icon: String
})
</script>

