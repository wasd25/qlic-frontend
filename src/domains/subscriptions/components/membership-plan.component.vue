<script>
import { ref, onMounted } from "vue";
import { subscriptionService } from "../services/subscription.service.js";

const subscriptions = ref([]);
const selectedPlan = ref({ plan: "", price: "", description: "" });

onMounted(async () => {
  const data = await subscriptionService.getSubscriptions();
  subscriptions.value = data;
  selectedPlan.value = data[0];
});

function changePlan() {
  alert("Redirecting to plan change page...");
}
</script>

<template>
  <div class="membership-plan">
    <h2>Membership Plan</h2>
    <div class="card">
      <label>Your membership plan is</label>
      <input v-model="selectedPlan.plan" type="text" placeholder="X PLAN" disabled />

      <label>Price</label>
      <input v-model="selectedPlan.price" type="text" placeholder="$$$" disabled />

      <label>Description</label>
      <textarea v-model="selectedPlan.description" placeholder="Explain limitations on the plan" disabled></textarea>

      <button @click="changePlan">Change my plan</button>
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
textarea {
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