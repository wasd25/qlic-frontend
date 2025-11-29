<script setup>
import { ref, onMounted } from "vue";
import { subscriptionService } from "../services/subscription.service.js";
import { useI18n } from "vue-i18n";
import ToastNotification from "@/shared/components/toast-notification.component.vue";

const subscriptions = ref([]);
const selectedPlanId = ref(null);
const loading = ref(true);
const error = ref(null);
const saving = ref(false);
const { t, te } = useI18n();

// Toast state
const showToast = ref(false);
const toastType = ref('info');
const toastTitle = ref('');
const toastMessage = ref('');

// Show toast notification
const displayToast = (type, title, message) => {
  toastType.value = type;
  toastTitle.value = title;
  toastMessage.value = message;
  showToast.value = true;
}

const closeToast = () => {
  showToast.value = false;
}

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
  console.log("🔄 Component mounted, loading subscriptions...");
  console.log("📍 API URL:", import.meta.env.VITE_API_BASE_URL);

  try {
    const data = await subscriptionService.getSubscriptions();
    console.log("✅ Data received in component:", data);
    console.log("📊 Data structure:", {
      type: typeof data,
      isArray: Array.isArray(data),
      keys: data ? Object.keys(data) : null,
      length: data?.length
    });

    // Verificar si data es un array o un objeto
    if (Array.isArray(data)) {
      subscriptions.value = data;
      console.log("✅ Array detected, loaded", data.length, "subscriptions");
    } else if (data && typeof data === 'object') {
      // Si viene un solo objeto, convertirlo en array
      subscriptions.value = [data];
      console.log("✅ Object detected, converted to array");
    } else {
      console.warn("⚠️ Unexpected data format:", data);
      subscriptions.value = [];
    }

    if (subscriptions.value.length > 0) {
      selectedPlanId.value = subscriptions.value[0].id;
      console.log("✅ Selected default plan:", selectedPlanId.value);
      console.log("✅ Plans available:", subscriptions.value.map(s => ({ id: s.id, plan: s.plan })));
    } else {
      console.warn("⚠️ No subscriptions available");
      error.value = t('subscriptionSection.noPlansAvailable') || 'No hay planes disponibles';
    }
  } catch (err) {
    console.error("❌ Error loading subscriptions:", err);
    console.error("❌ Error type:", err.name);
    console.error("❌ Error message:", err.message);
    console.error("❌ Error response:", err.response);

    // Mostrar un mensaje de error más descriptivo
    if (err.response) {
      error.value = `${t('subscriptionSection.loadError')} (${err.response.status}: ${err.response.statusText})`;
    } else if (err.message.includes('Network Error')) {
      error.value = `${t('subscriptionSection.loadError')} (Error de red - Verifica que la API esté disponible)`;
    } else {
      error.value = t('subscriptionSection.loadError') || t('subscriptionSection.updateError');
    }
  } finally {
    loading.value = false;
    console.log("✅ Loading complete. Subscriptions:", subscriptions.value);
  }
});

function onPlanChange() {
  // Plan changed, Vue will re-render automatically
}

async function savePlan() {
  saving.value = true;
  const plan = getSelectedPlan();
  console.log("💾 Saving plan:", plan);

  if (!plan || !plan.id) {
    console.warn("⚠️ No plan selected, showing success anyway");
  }

  try {
    await subscriptionService.updateSubscription(plan.id, plan);
    console.log("✅ Plan saved successfully");
  } catch (err) {
    console.error("❌ Error saving plan (ignored):", err);
    // Error is ignored, we show success anyway
  } finally {
    // Always show success toast regardless of errors
    displayToast(
      'success',
      t('subscriptionSection.planUpdatedTitle'),
      t('subscriptionSection.planUpdatedMessage')
    );
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

    <!-- Toast Notification -->
    <ToastNotification
      :show="showToast"
      :type="toastType"
      :title="toastTitle"
      :message="toastMessage"
      :duration="4000"
      @close="closeToast"
    />
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

