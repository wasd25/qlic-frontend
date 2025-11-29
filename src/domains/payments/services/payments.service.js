// javascript
// File: `src/domains/payments/services/payments.service.js`
import { authService } from '../../iam/services/auth.service.js'

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Helper para construir headers con Bearer token
function getAuthHeaders(contentType = 'application/json') {
    const token = authService.getToken();
    if (!token) {
        throw new Error('Usuario no autenticado (token faltante)');
    }
    const headers = { Authorization: `Bearer ${token}` };
    if (contentType) headers['Content-Type'] = contentType;
    return headers;
}

// Parseo seguro de respuesta: intenta JSON, si no devuelve texto o null
async function parseResponseSafe(res) {
    const text = await res.text();
    if (!text) return null;
    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

export default {
    // GET /api/v1/payments - Obtener todos los pagos
    async getPayments() {
        const res = await fetch(`${API_URL}/payments`, {
            headers: getAuthHeaders(null)
        })
        if (!res.ok) throw new Error(`Error getting payments: ${res.status}`);
        return res.json()
    },

    // GET /api/v1/payments/{id} - Obtener un pago por ID
    async getPayment(id) {
        const res = await fetch(`${API_URL}/payments/${id}`, {
            headers: getAuthHeaders(null)
        })
        if (!res.ok) throw new Error(`Error getting payment: ${res.status}`);
        return res.json()
    },

    // POST /api/v1/payments - Crear un nuevo pago
    async createPayment(paymentData) {
        const res = await fetch(`${API_URL}/payments`, {
            method: "POST",
            headers: getAuthHeaders('application/json'),
            body: JSON.stringify(paymentData)
        })
        if (!res.ok) throw new Error(`Error creating payment: ${res.status}`);
        // usar parse seguro por si la API devuelve texto o vacío
        return await parseResponseSafe(res)
    },

    // PUT /api/v1/payments/{id} - Actualizar un pago
    async updatePayment(id, paymentData) {
        const res = await fetch(`${API_URL}/payments/${id}`, {
            method: "PUT",
            headers: getAuthHeaders('application/json'),
            body: JSON.stringify(paymentData)
        })
        if (!res.ok) throw new Error(`Error updating payment: ${res.status}`);
        return await parseResponseSafe(res)
    },

    // DELETE /api/v1/payments/{id} - Eliminar un pago
    async deletePayment(id) {
        const res = await fetch(`${API_URL}/payments/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(null)
        })
        return res.ok
    },

    // GET /api/v1/payment-methods - Obtener todos los métodos de pago
    async getPaymentMethods() {
        const res = await fetch(`${API_URL}/payment-methods`, {
            headers: getAuthHeaders(null)
        })
        if (!res.ok) throw new Error(`Error getting payment methods: ${res.status}`);
        return res.json()
    },

    // GET /api/v1/payment-methods/{id} - Obtener un método de pago por ID
    async getPaymentMethod(id) {
        const res = await fetch(`${API_URL}/payment-methods/${id}`, {
            headers: getAuthHeaders(null)
        })
        if (!res.ok) throw new Error(`Error getting payment method: ${res.status}`);
        return res.json()
    },

    // POST /api/v1/payment-methods -
    async addPaymentMethod(newMethod) {
        const res = await fetch(`${API_URL}/payment-methods`, {
            method: "POST",
            headers: getAuthHeaders('application/json'),
            body: JSON.stringify(newMethod),
        })
        if (!res.ok) throw new Error(`Error adding payment method: ${res.status}`);
        // parseo seguro: si la API devuelve JSON lo retornamos, si devuelve texto lo retornamos también
        return await parseResponseSafe(res)
    },

    // DELETE /api/v1/payment-methods/{id}
    async deletePaymentMethod(id) {
        const res = await fetch(`${API_URL}/payment-methods/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(null)
        })
        return res.ok
    },

    // PUT /api/v1/payment-methods/{id}
    async updatePaymentMethod(id, updatedData) {
        const res = await fetch(`${API_URL}/payment-methods/${id}`, {
            method: "PUT",
            headers: getAuthHeaders('application/json'),
            body: JSON.stringify(updatedData),
        })
        if (!res.ok) throw new Error(`Error updating payment method: ${res.status}`);
        return res.json()
    },

    // GET /api/v1/billing-settings
    async getBillingSettings() {
        const res = await fetch(`${API_URL}/billing-settings`, {
            headers: getAuthHeaders(null)
        })
        if (!res.ok) throw new Error(`Error getting billing settings: ${res.status}`);
        return res.json()
    },

    // PUT /api/v1/billing-settings/{id}
    async updateBillingSettings(id, updatedSettings) {
        const res = await fetch(`${API_URL}/billing-settings/${id}`, {
            method: "PUT",
            headers: getAuthHeaders('application/json'),
            body: JSON.stringify(updatedSettings)
        })

        if (!res.ok) {
            let errorMessage = `Error updating billing settings: ${res.status}`
            try {
                const errorData = await res.json()
                errorMessage = errorData.message || errorData.error || errorData.title || JSON.stringify(errorData)
            } catch (e) {
                try {
                    const errorText = await res.text()
                    errorMessage = errorText || errorMessage
                } catch (e2) {
                    // Use default error message
                }
            }
            throw new Error(errorMessage)
        }

        return await res.json()
    },

}
