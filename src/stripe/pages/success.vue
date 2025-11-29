<template>
  <div class="success-page">
    <div class="success-card">
      <div class="success-icon">✓</div>
      <h1>¡Pago Exitoso!</h1>
      <p class="success-message">Tu suscripción ha sido activada correctamente.</p>
      <p class="success-detail">Gracias por confiar en nosotros. Ahora puedes disfrutar de todos los beneficios de tu nuevo plan.</p>

      <div class="action-buttons">
        <button class="primary-button" @click="goToSubscription">
          Ver Mi Plan
        </button>
        <button class="secondary-button" @click="goToDashboard">
          Ir al Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style scoped>
.success-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.success-card {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
  animation: bounce 1s ease infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.success-message {
  color: #10b981;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.success-detail {
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.primary-button {
  background: linear-gradient(135deg, #635bff 0%, #4f46e5 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(99, 91, 255, 0.3);
}

.secondary-button {
  background: white;
  color: #635bff;
  border: 2px solid #635bff;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.secondary-button:hover {
  background: #f8f9ff;
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .success-card {
    padding: 2rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .success-icon {
    font-size: 4rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .primary-button,
  .secondary-button {
    width: 100%;
  }
}
</style>

