
<template>
  <div class="payment-methods-card card-root">
    <h2>{{ $t('paymentSection.methods') }}</h2>

    <ul class="methods-list">
      <li v-for="method in localMethods" :key="method.id" class="method-item">
        <div class="method-info">
          <p class="method-type">{{ method.type }}</p>
          <p class="method-details">{{ method.details }}</p>
          <p v-if="method.isDefault || method.is_default" class="default-label">{{ $t('paymentSection.default') }}</p>
        </div>

        <div class="method-actions">
          <button v-if="!(method.isDefault || method.is_default)" class="btn-link" @click="setDefaultMethod(method)">
            {{ $t('paymentMethods.setDefault') || 'Set as default' }}
          </button>
          <button class="btn-delete" @click="deleteMethod(method.id)">
            {{ $t('paymentSection.delete') }}
          </button>
        </div>
      </li>
    </ul>

    <div v-if="adding" class="add-form">
      <h3>{{ $t('paymentSection.new_method') }}</h3>

      <div class="form-fields">
        <div class="form-group">
          <label>{{ $t('paymentMethods.type') }}</label>
          <select v-model="newMethod.type">
            <option disabled value="">{{ $t('paymentSection.select_type') }}</option>
            <option value="Visa">{{ $t('paymentSection.visa') }}</option>
            <option value="PayPal">{{ $t('paymentSection.paypal') }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ $t('paymentSection.details') }}</label>
          <input
              v-model="newMethod.details"
              type="text"
              :placeholder="$t('paymentMethods.placeholder')"
          />
        </div>

        <label class="checkbox-label">
          <input type="checkbox" v-model="newMethod.isDefault" />
          <span>{{ $t('paymentSection.set_default') }}</span>
        </label>
      </div>

      <div class="actions">
        <button class="btn-primary" @click="saveNewMethod">{{ $t('paymentSection.save') }}</button>
        <button class="btn-secondary" @click="cancelAdd">{{ $t('paymentSection.cancel') }}</button>
      </div>
    </div>

    <div v-else>
      <button class="btn-primary" @click="startAdd">{{ $t('paymentSection.add_method') }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import paymentsService from '../services/payments.service.js'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  methods: { type: Array, default: () => [] }
})

const emit = defineEmits(['refresh'])
const adding = ref(false)
const localMethods = ref([])
const { t } = useI18n()

const newMethod = ref({
  type: '',
  details: '',
  isDefault: false
})


watch(() => props.methods, (newVal) => {
  localMethods.value = Array.isArray(newVal)
      ? newVal.map(m => {
        // DB usa is_default con 0/1, API puede devolver isDefault con true/false
        const isNum = m.is_default === 1 || m.is_default === '1'
        const isBool = m.is_default === true || m.isDefault === true
        const normalized = !!(isNum || isBool)
        return {
          ...m,
          is_default: normalized,
          isDefault: normalized
        }
      })
      : []
}, { immediate: true })

const startAdd = () => { adding.value = true }
const cancelAdd = () => {
  adding.value = false
  newMethod.value = { type: '', details: '', isDefault: false }
}

const saveNewMethod = async () => {
  if (!newMethod.value.type || !newMethod.value.details) {
    alert(t('paymentMethods.fillAllFields'))
    return
  }

  try {
    // Backend espera "isDefault" (camelCase) como booleano
    const dataToSend = {
      type: newMethod.value.type,
      details: newMethod.value.details,
      isDefault: !!newMethod.value.isDefault
    }

    const created = await paymentsService.addPaymentMethod(dataToSend)

    if (created && typeof created === 'object' && created.id) {
      // Normalizar: DB devuelve is_default (0/1), API puede devolver isDefault (true/false)
      const isNum = created.is_default === 1 || created.is_default === '1'
      const isBool = created.is_default === true || created.isDefault === true
      const normalized = {
        ...created,
        is_default: !!(isNum || isBool),
        isDefault: !!(isNum || isBool)
      }
      localMethods.value.push(normalized)
    }

    cancelAdd()
    emit('refresh')
  } catch (err) {
    console.error('Error adding method:', err)
    alert(t('paymentMethods.error') || 'Error al agregar método de pago')
  }
}

const deleteMethod = async (id) => {
  if (confirm(t('paymentMethods.deleteConfirm'))) {
    try {
      await paymentsService.deletePaymentMethod(id)
      localMethods.value = localMethods.value.filter(m => m.id !== id)
      emit('refresh')
    } catch (err) {
      console.error('Error deleting method:', err)
    }
  }
}

const setDefaultMethod = async (method) => {
  if (!method || !method.id) return
  try {

    await paymentsService.updatePaymentMethod(method.id, { isDefault: true })


    localMethods.value = localMethods.value.map(m => ({
      ...m,
      is_default: m.id === method.id,
      isDefault: m.id === method.id
    }))


    emit('refresh')
  } catch (err) {
    console.error('Error setting default method:', err)
    alert(t('paymentMethods.error') || 'Error al establecer método predeterminado')
  }
}
</script>

<style>

.payment-methods-card.card-root {
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  transition: box-shadow 0.2s ease, transform 0.12s ease;
  display: block;
}

.payment-methods-card.card-root:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.09);
  transform: translateY(-2px);
}

.payment-methods-card.card-root h2 {
  margin-bottom: 16px;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

/* List */
.methods-list {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.method-item {
  display: flex;
  justify-content: space-between;
  align-items: start;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
  background: #fafafa;
  transition: background 0.12s ease;
}

.method-item:hover {
  background: #f3f4f6;
}

.method-info { flex: 1; }
.method-type { font-weight: 500; color: #111827; }
.method-details { font-size: 0.875rem; color: #6b7280; }
.default-label { font-size: 0.75rem; color: var(--primary-color); font-weight: 600; margin-top: 6px; }

/* Buttons */
.method-actions { display:flex; gap:8px; align-items:center; }
.btn-link { background: transparent; color: var(--primary-color); border: none; cursor: pointer; padding: 0; font-weight: 600; }
.btn-delete {
  background: #dc2626 !important;
  color: #fff !important;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.12s ease, transform 0.08s;
}

.btn-delete:hover { background: #b91c1c; transform: translateY(-1px); }

.btn-primary {
  background: var(--primary-color);
  color: #fff;
  border: none;
  padding: 9px 14px;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.12s ease, transform 0.08s ease;
}

.btn-primary:hover { background: #2563eb; transform: translateY(-1px); }

.btn-secondary {
  background: #fff;
  border: 1px solid #d1d5db;
  color: #374151;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
}
.btn-secondary:hover { background: #f3f4f6; }

/* Form inputs */
.add-form { border-top: 1px solid #e5e7eb; padding-top: 16px; }
.form-group { margin-bottom: 12px; }
.form-group label { display: block; font-size: 0.875rem; font-weight: 600; margin-bottom: 6px; }
.form-group input, .form-group select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}
.form-group input:focus, .form-group select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59,130,246,0.12);
}

/* Checkbox */
.checkbox-label { display:flex; align-items:center; gap:8px; margin-top:8px; }
.checkbox-label input { width:16px; height:16px; accent-color: var(--primary-color); }
</style>
