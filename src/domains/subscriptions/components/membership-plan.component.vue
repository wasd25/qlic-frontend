<script setup>
import { ref, onMounted } from "vue";
import { subscriptionService } from "../services/subscription.service.js";
import { useI18n } from "vue-i18n";

const subscriptions = ref([]);
const selectedPlanId = ref(null);
const loading = ref(true);
const error = ref(null);
const saving = ref(false);
const { t, te } = useI18n();

// Get selected plan object
const getSelectedPlan = () => {
  return subscriptions.value.find(p => p.id === selectedPlanId.value) || {};
}

// Translate functions
const translatePlan = (plan) => {
  if (!plan) return '';
  const key = `subscriptionPlans.${plan}`;
  return te(key) ? t(key) : plan;
}

const translatePrice = (price) => {
  if (!price) return '';
  const key = `subscriptionPrices.${price}`;
  return te(key) ? t(key) : price;
}

const translateDescription = (desc) => {
  if (!desc) return '';
  const key = `subscriptionDescriptions.${desc}`;
  return te(key) ? t(key) : desc;
}

onMounted(async () => {
  try {
    const data = await subscriptionService.getSubscriptions();
    subscriptions.value = data;
    if (data && data.length > 0) {
      selectedPlanId.value = data[0].id;
    }
  } catch (err) {
    error.value = t('subscriptionSection.updateError');
  } finally {
    loading.value = false;
  }
});

function onPlanChange() {
  // Plan changed, Vue will re-render automatically
}

async function savePlan() {
  saving.value = true;
  const plan = getSelectedPlan();
  try {
    await subscriptionService.updateSubscription(plan.id, plan);
    alert(t('subscriptionSection.planUpdated'));
  } catch (err) {
    alert(t('subscriptionSection.updateError'));
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div class="membership-plan">
    <h2>{{ $t('subscriptionSection.membership-plan') }}</h2>
    <div v-if="loading">{{ $t('subscriptionSection.loading') }}</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="card">
        <label>{{ $t('subscriptionSection.select') }}</label>
        <select v-model="selectedPlanId" @change="onPlanChange">
          <option v-for="plan in subscriptions" :key="plan.id" :value="plan.id">
            {{ translatePlan(plan.plan) }}
          </option>
        </select>

        <label>{{ $t('subscriptionSection.price') }}</label>
        <div class="display-field">{{ translatePrice(getSelectedPlan().price) }}</div>

        <label>{{ $t('subscriptionSection.description-plan') }}</label>
        <div class="display-field description">{{ translateDescription(getSelectedPlan().description) }}</div>

        <button :disabled="saving" @click="savePlan">
          {{ saving ? $t('subscriptionSection.saving') : $t('subscriptionSection.save') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.membership-plan {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.card {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  width: 320px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
label {
  font-weight: 600;
  display: block;
  margin-bottom: 5px;
}
select {
  width: 100%;
  margin-bottom: 1rem;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
}

.display-field {
  width: 100%;
  margin-bottom: 1rem;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  background-color: #f5f5f5;
  color: #333;
  min-height: 36px;
  display: flex;
  align-items: center;
}

.display-field.description {
  min-height: 80px;
  align-items: flex-start;
  padding-top: 10px;
  line-height: 1.5;
  white-space: pre-wrap;
}

button {
  width: 100%;
  background-color: #00bcd4;
  color: white;
  padding: 10px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
button:hover {
  background-color: #0097a7;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

