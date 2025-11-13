<script setup>
import MembershipPlan from "../components/membership-plan.component.vue";
</script>

<template>
  <section class="subscription-page">
    <h1>{{ $t('subscriptionSection.title') }}</h1>
    <p>{{ $t('subscriptionSection.description') }}</p>

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
