<template>
  <div class="transactions-card card-root">
    <div class="transactions-header">
      <h2>{{ $t('paymentSection.transaction') }}</h2>
      <a href="#" class="view-all">View All</a>
    </div>

    <ul class="transactions-list">
      <li v-for="t in transactions" :key="t.id" class="transaction-item">
        <div class="transaction-info">
          <p class="transaction-desc">{{ t.description || 'Payment' }}</p>
          <p class="transaction-date">{{ formatDate(t.date) }}</p>
        </div>
        <p
            class="transaction-amount"
            :class="t.type === 'credit' ? 'credit' : 'debit'"
        >
          {{ formatAmount(t.amount, t.type) }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({ transactions: Array })

const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })

const formatAmount = (amount, type) => {
  const formatted = `$${amount.toFixed(2)}`
  return type === 'credit' ? `+${formatted}` : formatted
}
</script>

<style scoped>
.transactions-card {
  background-color: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: box-shadow 0.2s ease;
}

.transactions-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.transactions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.transactions-header h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.view-all {
  font-size: 0.875rem;
  color: var(--primary-color);
  font-weight: 500;
  text-decoration: none;
}

.view-all:hover {
  text-decoration: underline;
}

.transactions-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
}

.transaction-item:last-child {
  border-bottom: none;
}

.transaction-info {
  display: flex;
  flex-direction: column;
}

.transaction-desc {
  font-weight: 500;
  color: #111827;
  margin: 0;
}

.transaction-date {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.25rem 0 0;
}

.transaction-amount {
  font-weight: 600;
  font-size: 0.95rem;
}

.transaction-amount.credit {
  color: #16a34a; /* green */
}

.transaction-amount.debit {
  color: #dc2626; /* red */
}
</style>
