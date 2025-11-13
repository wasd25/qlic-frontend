<template>
  <section class="billing-page">
    <header class="billing-header">
      <h1>{{ $t('paymentSection.title') }}</h1>
      <p>{{ $t('paymentSection.description') }}</p>
    </header>

    <!-- Summary cards -->
    <div class="billing-summary">
      <BillingSummaryCard title="Current Balance" :value="balanceDisplay" />
      <BillingSummaryCard title="Next Payment" :value="nextPaymentDate" />
      <BillingSummaryCard title="Average Payment" :value="monthlyAverage" />
    </div>

    <!-- Main content -->
    <div class="billing-grid">
      <div class="billing-left">
        <PaymentMethodsCard :methods="paymentMethods" @refresh="loadData" />
        <RecentTransactionsCard :transactions="payments" />
      </div>
      <div class="billing-right">
        <BillingSettingsForm :settings="settings" @save="saveSettings" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import BillingSummaryCard from '../components/BillingSummaryCard.vue'
import PaymentMethodsCard from '../components/PaymentMethodsCard.vue'
import RecentTransactionsCard from '../components/RecentTransactionsCard.vue'
import BillingSettingsForm from '../components/BillingSettingsForm.vue'
import paymentsService from '../services/payments.service.js'

const payments = ref([])
const paymentMethods = ref([])
const settings = ref({})

const balanceDisplay = computed(() =>
    `$${payments.value.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}`
)

const nextPaymentDate = computed(() => {
  const next = settings.value?.preferredBillingDay ?? 1
  const month = new Date().getMonth() + 2
  const year = new Date().getFullYear()
  return `${String(next).padStart(2, '0')}-${String(month).padStart(2, '0')}-${year}`
})

const monthlyAverage = computed(() => {
  if (payments.value.length === 0) return '$0.00'
  const avg = payments.value.reduce((sum, p) => sum + p.amount, 0) / payments.value.length
  return `$${avg.toFixed(2)}`
})

const loadData = async () => {
  [payments.value, paymentMethods.value, settings.value] = await Promise.all([
    paymentsService.getPayments(),
    paymentsService.getPaymentMethods(),
    paymentsService.getBillingSettings()
  ])
}

const saveSettings = async (updated) => {
  await paymentsService.updateBillingSettings(updated)
  settings.value = updated
}

onMounted(loadData)
</script>
<style scoped>
.billing-page {
  padding: 40px;
  background-color: var(--app-bg);
  color: #1f2937;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* HEADER */
.billing-header {
  margin-bottom: 40px;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 12px;
}

.billing-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 6px;
}

.billing-header p {
  color: #6b7280;
  font-size: 15px;
  margin: 0;
}

/* SUMMARY CARDS */
.billing-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.billing-summary > * {
  background: linear-gradient(135deg, #ffffff, #f9fafb);
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  padding: 24px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  position: relative;
  overflow: hidden;
}

.billing-summary > *::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background-color: var(--primary-color);
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
}

.billing-summary > *:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

/* GRID MAIN LAYOUT */
.billing-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

/* LEFT + RIGHT SECTIONS */
.billing-left,
.billing-right {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* CARD SHARED STYLE */
.billing-left > *,
.billing-right > * {
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  padding: 24px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.billing-left > *:hover,
.billing-right > *:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

/* TYPOGRAPHY INSIDE CARDS */
.billing-left h2,
.billing-right h2 {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 16px;
  border-bottom: 1px solid #404040;
  padding-bottom: 6px;
}
.card-root {
  background-color: #fff;
  border: 1px solid #CCCCCC;
  border-radius: 14px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  padding: 24px;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.card-root:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .billing-grid {
    grid-template-columns: 1fr;
  }
}
</style>
