<script>

import {defineComponent} from "vue";
import AlertSummaryPanel from "@/domains/alerts/components/alert-summary-panel.component.vue";
import AnomalySummaryPanel from "@/domains/anomaly-detection/components/anomaly-summary-panel.component.vue";
import BillingSummaryCard from "@/domains/payments/components/BillingSummaryCard.vue";

export default defineComponent({
  components: {BillingSummaryCard, AnomalySummaryPanel, AlertSummaryPanel}
})


</script>

<template>
  <section>
    <h1>Alerts & Notifications</h1>
    <alert-summary-panel/>

    <h2>Anomaly Panel</h2>
    <anomaly-summary-panel/>

    <h3>Billing & Payments</h3>
    <billing-summary-card/>
  </section>
</template>

<style scoped>

</style>