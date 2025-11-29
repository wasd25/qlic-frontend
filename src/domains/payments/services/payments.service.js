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
        return res.json()
    },

    // PUT /api/v1/payments/{id} - Actualizar un pago
    async updatePayment(id, paymentData) {
        const res = await fetch(`${API_URL}/payments/${id}`, {
            method: "PUT",
            headers: getAuthHeaders('application/json'),
            body: JSON.stringify(paymentData)
        })
        if (!res.ok) throw new Error(`Error updating payment: ${res.status}`);
        return res.json()
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

    // POST /api/v1/payment-methods - Agregar nuevo método de pago
    async addPaymentMethod(newMethod) {
        const res = await fetch(`${API_URL}/payment-methods`, {
            method: "POST",
            headers: getAuthHeaders('application/json'),
            body: JSON.stringify(newMethod),
        })
        if (!res.ok) throw new Error(`Error adding payment method: ${res.status}`);
        return res.json()
    },

    // DELETE /api/v1/payment-methods/{id} - Borrar método de pago por id
    async deletePaymentMethod(id) {
        const res = await fetch(`${API_URL}/payment-methods/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(null)
        })
        return res.ok
    },

    // PUT /api/v1/payment-methods/{id} - Actualizar método de pago
    async updatePaymentMethod(id, updatedData) {
        const res = await fetch(`${API_URL}/payment-methods/${id}`, {
            method: "PUT",
            headers: getAuthHeaders('application/json'),
            body: JSON.stringify(updatedData),
        })
        if (!res.ok) throw new Error(`Error updating payment method: ${res.status}`);
        return res.json()
    },

    // GET /api/v1/billing-settings - Obtener configuración de facturación
    async getBillingSettings() {
        const res = await fetch(`${API_URL}/billing-settings`, {
            headers: getAuthHeaders(null)
        })
        if (!res.ok) throw new Error(`Error getting billing settings: ${res.status}`);
        return res.json()
    },

    // PUT /api/v1/billing-settings/{id} - Actualizar configuración de facturación
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
