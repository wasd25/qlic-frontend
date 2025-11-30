<!-- vue -->
<template>
  <div class="anomaly-table">
    <table>
      <thead>
      <tr>
        <th>{{ $t('anomalySection.id') }}</th>
        <th>{{ $t('anomalySection.profile') }}</th>
        <th>{{ $t('anomalySection.type') }}</th>
        <th>{{ $t('anomalySection.date') }}</th>
        <th>{{ $t('anomalySection.status') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="a in anomalies" :key="a.id">
        <td class="col-id">{{ a.id }}</td>
        <td class="col-small">{{ a.profile_id }}</td>
        <td class="col-medium">{{ $t(`anomalyTypes.${a.type}`) }}</td>
        <td class="col-medium">{{ formatDate(a.detected_anomaly) }}</td>
        <td :class="a.resolved ? 'resolved' : 'unresolved'">
          {{ a.resolved ? $t('anomalyTable.resolved') : $t('anomalyTable.unresolved') }}
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
  padding: 0.75rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  box-sizing: border-box;
  overflow: hidden; }

.anomaly-table table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  min-width: 0; }


th, td {
  padding: 0.6rem 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: top;
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
}


th {
  background-color: #f9fafb;
  font-weight: 600;
}


.col-id {
  max-width: 240px;
  width: 240px;
  white-space: normal;
  word-break: break-all;
}


.col-small {
  width: 60px;
  max-width: 60px;
}

.col-medium {
  width: 1fr;
  min-width: 120px;
}


.resolved {
  color: #10b981;
  font-weight: bold;
}
.unresolved {
  color: #dc2626;
  font-weight: bold;
}


.anomaly-table tr:nth-child(even) {
  background: rgba(0,0,0,0.02);
}


</style>
