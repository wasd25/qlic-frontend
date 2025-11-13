<template>
  <section class="events-section">
    <h3>{{$t('usageSection.events')}}</h3>
    <div class="table-wrapper">
      <table>
        <thead>
        <tr>
          <th>{{$t('usageSection.time')}}</th>
          <th>{{$t('usageSection.amount')}}</th>
          <th>{{$t('usageSection.source')}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="event in events" :key="event.id">
          <td>{{ event.time }}</td>
          <td>{{ event.amount }} {{$t('usageSection.gallon')}}</td>
          <td>{{ event.source }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const events = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/usageEvents')
    events.value = data
  } catch (error) {
    console.error('Error fetching usage events:', error)
  }
})
</script>

<style scoped>
.events-section {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}
.events-section h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.table-wrapper {
  overflow-x: auto;
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 400px;
}
th,
td {
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
  white-space: nowrap;
}

/* Responsive ajustes */
@media (max-width: 768px) {
  .events-section {
    padding: 0.75rem;
  }
  .events-section h3 {
    font-size: 1rem;
  }
}
</style>
