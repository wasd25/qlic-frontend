<script setup>
import MembershipPlan from "../components/membership-plan.component.vue";
</script>

<template>
  <section class="subscription-page">
    <h1>Subscription</h1>
    <p>Check, manage and change your subscription profile</p>

    <MembershipPlan />
  </section>
</template>

<style scoped>
.subscription-page {
  padding: 2rem;
  text-align: center;
}

p {
  color: #555;
  margin-bottom: 2rem;
}
</style>
