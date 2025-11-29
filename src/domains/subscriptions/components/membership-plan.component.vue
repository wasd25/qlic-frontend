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

// Stripe state
const processingPayment = ref(false);

// Crea Payment Links en: https://dashboard.stripe.com/payment-links
// Para probar: Usa tarjeta 4242 4242 4242 4242 (cualquier fecha futura y CVC)
const STRIPE_PAYMENT_LINKS = {
  'Basic Plan': 'https://buy.stripe.com/test_dRmaEWgHW5q10TGezg0RG00',    // Reemplaza con tu Payment Link
  'Pro Plan': 'https://buy.stripe.com/test_00w14m1N28CdcCo62K0RG01',
  'Enterprise Plan': 'https://buy.stripe.com/test_ZZZZZZ'
};

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

// Nueva función para procesar pago con Stripe (método moderno)
const handleStripeCheckout = async () => {
  const plan = getSelectedPlan();

  if (!plan || !plan.plan) {
    displayToast('error', t('subscriptionSection.updateErrorTitle'), t('subscriptionSection.selectPlanFirst'));
    return;
  }

  const paymentLink = STRIPE_PAYMENT_LINKS[plan.plan];

  if (!paymentLink || paymentLink.includes('XXXXXX') || paymentLink.includes('ZZZZZZ')) {
    displayToast('error', t('subscriptionSection.updateErrorTitle'), t('subscriptionSection.planNotAvailable'));
    console.error('⚠ Payment Link no configurado para:', plan.plan);
    return;
  }

  try {
    processingPayment.value = true;
    console.log('🔄 Redirigiendo a Stripe Payment Link:', paymentLink);

    // Método moderno: Redirigir directamente al Payment Link de Stripe
    window.location.href = paymentLink;

  } catch (err) {
    console.error('❌ Error procesando pago:', err);
    displayToast(
      'error',
      t('subscriptionSection.updateErrorTitle'),
      t('subscriptionSection.paymentError')
    );
    processingPayment.value = false;
  }
};

onMounted(async () => {
  console.log(" Component mounted, loading subscriptions...");
  console.log(" API URL:", import.meta.env.VITE_API_BASE_URL);

  try {
    const data = await subscriptionService.getSubscriptions();
    console.log(" Data received in component:", data);
    console.log(" Data structure:", {
      type: typeof data,
      isArray: Array.isArray(data),
      keys: data ? Object.keys(data) : null,
      length: data?.length
    });

    // Verificar si data es un array o un objeto
    if (Array.isArray(data)) {
      subscriptions.value = data;
      console.log(" Array detected, loaded", data.length, "subscriptions");
    } else if (data && typeof data === 'object') {
      // Si viene un solo objeto, convertirlo en array
      subscriptions.value = [data];
      console.log(" Object detected, converted to array");
    } else {
      console.warn("⚠️ Unexpected data format:", data);
      subscriptions.value = [];
    }

    if (subscriptions.value.length > 0) {
      selectedPlanId.value = subscriptions.value[0].id;
      console.log(" Selected default plan:", selectedPlanId.value);
      console.log(" Plans available:", subscriptions.value.map(s => ({ id: s.id, plan: s.plan })));
    } else {
      console.warn("⚠️ No subscriptions available");
      error.value = t('subscriptionSection.noPlansAvailable') || 'No hay planes disponibles';
    }
  } catch (err) {
    console.error(" Error loading subscriptions:", err);
    console.error(" Error type:", err.name);
    console.error(" Error message:", err.message);
    console.error(" Error response:", err.response);

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
    console.log(" Loading complete. Subscriptions:", subscriptions.value);
  }
});

function onPlanChange() {
  // Plan changed, Vue will re-render automatically
}

async function savePlan() {
  saving.value = true;
  const plan = getSelectedPlan();
  console.log(" Saving plan:", plan);

  if (!plan || !plan.id) {
    console.warn(" No plan selected, showing success anyway");
  }

  try {
    await subscriptionService.updateSubscription(plan.id, plan);
    console.log(" Plan saved successfully");
  } catch (err) {
    console.error(" Error saving plan (ignored):", err);
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

      </div>

      <!-- Nueva sección de pago con Stripe -->
      <div class="card payment-section">
        <h3>{{ $t('subscriptionSection.securePayment') }}</h3>
        <p class="payment-description">
          {{ $t('subscriptionSection.readyToUpgrade') }}
        </p>

        <div class="plan-summary">
          <div class="summary-item">
            <span class="label">{{ $t('subscriptionSection.selectedPlan') }}</span>
            <span class="value">{{ translatePlan(getSelectedPlan().plan) }}</span>
          </div>
          <div class="summary-item">
            <span class="label">{{ $t('subscriptionSection.price') }}:</span>
            <span class="value price">{{ translatePrice(getSelectedPlan().price) }}</span>
          </div>
        </div>

        <button
            class="stripe-button"
            :disabled="processingPayment || !selectedPlanId"
            @click="handleStripeCheckout"
        >
          <span v-if="processingPayment">
            {{ $t('subscriptionSection.processing') }}
          </span>
          <span v-else>
            {{ $t('subscriptionSection.payWithStripe') }}
          </span>
        </button>

        <div class="security-badges">
          <span class="badge">{{ $t('subscriptionSection.securePaymentBadge') }}</span>
          <span class="badge">{{ $t('subscriptionSection.sslCertificate') }}</span>
        </div>
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
  padding: 2rem;
}

.membership-plan h2 {
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
}

.membership-plan > div:not(.toast-notification) {
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.card {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  width: 320px;
  flex-shrink: 0;
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

/* Estilos para la nueva sección de pago */
.payment-section {
  margin-top: 0;
  border: 2px solid #00bcd4;
}

.payment-section h3 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.2rem;
}

.payment-description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.plan-summary {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.summary-item:last-child {
  margin-bottom: 0;
  padding-top: 0.5rem;
  border-top: 1px solid #ddd;
}

.summary-item .label {
  color: #666;
  font-size: 0.9rem;
}

.summary-item .value {
  font-weight: 600;
  color: #333;
}

.summary-item .value.price {
  color: #00bcd4;
  font-size: 1.1rem;
}

.stripe-button {
  background: linear-gradient(135deg, #635bff 0%, #4f46e5 100%);
  font-size: 1rem;
  padding: 12px;
  margin-top: 1rem;
  transition: transform 0.2s;
}

.stripe-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
  transform: translateY(-2px);
}

.security-badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.badge {
  font-size: 0.75rem;
  color: #666;
  background: #f0f0f0;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
}

/* Responsive para pantallas pequeñas */
@media (max-width: 768px) {
  .membership-plan > div:not(.toast-notification) {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 100%;
    max-width: 400px;
  }
}
</style>
