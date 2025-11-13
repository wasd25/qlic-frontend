<template>
  <div class="billing-settings-card card-root">
    <header class="billing-settings-header">
      <h2>{{ $t('paymentSection.settings') }}</h2>
      <span>{{ $t('paymentSection.last') }} {{ formattedDate }}</span>
    </header>

    <form @submit.prevent="handleSave" class="billing-settings-form">
      <div class="form-section">
        <label class="switch-row">
          <span>{{ $t('paymentSection.auto-pay') }}</span>
          <input type="checkbox" v-model="form.autopay" />
        </label>

        <label class="switch-row">
          <span>{{ $t('paymentSection.email-notifications') }}</span>
          <input type="checkbox" v-model="form.emailNotifications" />
        </label>
      </div>

      <div class="form-section">
        <label>{{ $t('paymentSection.cycle') }}</label>
        <select v-model="form.billingCycle">
          <option value="monthly">{{ $t('paymentSection.monthly') }}</option>
          <option value="yearly">{{ $t('paymentSection.yearly') }}</option>
        </select>
      </div>

      <div class="form-section">
        <label>{{ $t('paymentSection.preferred') }}</label>
        <input
            v-model.number="form.preferredBillingDay"
            type="number"
            min="1"
            max="31"
        />
      </div>

      <div class="actions">
        <button type="submit">{{ $t('paymentSection.save-settings') }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'

const props = defineProps({ settings: Object })
const emit = defineEmits(['save'])

const form = reactive({
  autopay: false,
  emailNotifications: true,
  billingCycle: 'monthly',
  preferredBillingDay: 1,
  lastUpdate: null,
})

watch(
    () => props.settings,
    (val) => Object.assign(form, val || {}),
    { immediate: true }
)

const handleSave = () => {
  emit('save', { ...form, lastUpdate: new Date().toISOString() })
}

const formattedDate = computed(() => {
  if (!form.lastUpdate) return '—'
  const d = new Date(form.lastUpdate)
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
})
</script>

<style scoped>
.billing-settings-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.billing-settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.billing-settings-header h2 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #111827;
}

.billing-settings-header span {
  font-size: 0.9rem;
  color: #6b7280;
}

.billing-settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.switch-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  color: #111827;
}

.switch-row input[type='checkbox'] {
  width: 20px;
  height: 20px;
  accent-color: var(--primary-color);
  cursor: pointer;
}

select,
input[type='number'] {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border 0.2s ease, box-shadow 0.2s ease;
}

select:focus,
input[type='number']:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
  outline: none;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.actions button {
  background: var(--primary-color);
  color: white;
  font-weight: 500;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.actions button:hover {
  background: #2563eb;
}

input[type='number'] {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
}


input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
