<script>
import { ref, onMounted } from "vue";
import { subscriptionService } from "../services/subscription.service.js";

export default {
  setup() {
    const subscriptions = ref([]);
    const selectedPlan = ref({ plan: "", price: "", description: "", id: null });
    const loading = ref(true);
    const error = ref(null);
    const saving = ref(false);

    onMounted(async () => {
      try {
        const data = await subscriptionService.getSubscriptions();
        subscriptions.value = data;
        if (data && data.length > 0) {
          selectedPlan.value = { ...data[0] };
        }
      } catch (err) {
        error.value = "No se pudieron cargar las suscripciones.";
      } finally {
        loading.value = false;
      }
    });

    function onPlanChange(event) {
      const plan = subscriptions.value.find(
          (p) => p.plan === event.target.value
      );
      if (plan) selectedPlan.value = { ...plan };
    }

    async function savePlan() {
      saving.value = true;
      try {
        await subscriptionService.updateSubscription(selectedPlan.value.id, selectedPlan.value);
        alert("¡Plan actualizado!");
      } catch (err) {
        alert("Error al actualizar el plan.");
      } finally {
        saving.value = false;
      }
    }

    return { subscriptions, selectedPlan, loading, error, onPlanChange, savePlan, saving };
  }
};
</script>

<template>
  <div class="membership-plan">
    <h2>{{ $t('subscriptionSection.membership-plan') }}</h2>
    <div v-if="loading">{{ $t('subscriptionSection.loading') }}</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="card">
        <label>{{ $t('subscriptionSection.select') }}</label>
        <select v-model="selectedPlan.plan" @change="onPlanChange">
          <option v-for="plan in subscriptions" :key="plan.id" :value="plan.plan">
            {{ plan.plan }}
          </option>
        </select>

        <label>{{ $t('subscriptionSection.price') }}</label>
        <input v-model="selectedPlan.price" type="text" disabled />

        <label>{{ $t('subscriptionSection.description-plan') }}</label>
        <textarea v-model="selectedPlan.description" disabled></textarea>

        <button :disabled="saving" @click="savePlan">
          {{ saving ? "Guardando..." : "Guardar" }}
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
input,
textarea,
select {
  width: 100%;
  margin-bottom: 1rem;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
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
</style>
