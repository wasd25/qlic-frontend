<template>
  <div class="anomaly-table">
    <h2>Detected Anomalies</h2>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Profile</th>
        <th>Type</th>
        <th>Date</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="a in anomalies" :key="a.id">
        <td>{{ a.id }}</td>
        <td>{{ a.profile_id }}</td>
        <td>{{ a.type }}</td>
        <td>{{ formatDate(a.detected_anomaly) }}</td>
        <td :class="a.resolved ? 'resolved' : 'unresolved'">
          {{ a.resolved ? 'Resolved' : 'Unresolved' }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({ anomalies: Array })

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleString()
}
</script>

<style scoped>
.anomaly-table {
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  flex: 2;
}
.anomaly-table h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}
th {
  background-color: #f9fafb;
  font-weight: 600;
}
.resolved {
  color: #10b981;
  font-weight: bold;
}
.unresolved {
  color: #dc2626;
  font-weight: bold;
}
</style>
