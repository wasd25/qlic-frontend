import { authService } from '../../iam/services/auth.service.js'

const API_URL = import.meta.env.VITE_API_BASE_URL

function getAuthHeaders(contentType = 'application/json') {
    const token = authService.getToken()
    if (!token) {
        throw new Error('Usuario no autenticado (token faltante)')
    }
    const headers = { Authorization: `Bearer ${token}` }
    if (contentType) headers['Content-Type'] = contentType
    return headers
}

async function parseResponseSafe(res) {
    const text = await res.text()
    if (!text) return null
    try {
        return JSON.parse(text)
    } catch (e) {
        return text
    }
}

export default {
    async getPayments() {
        const res = await fetch(`${API_URL}/payments`, {
            headers: getAuthHeaders(null)
        })
        if (!res.ok) throw new Error(`Error getting payments: ${res.status}`)
        return await parseResponseSafe(res)
    },

    async getPayment(id) {
        const res = await fetch(`${API_URL}/payments/${id}`, {
            headers: getAuthHeaders(null)
        })
        if (!res.ok) throw new Error(`Error getting payment: ${res.status}`)
        return await parseResponseSafe(res)
    },

    async createPayment(paymentData) {
        const res = await fetch(`${API_URL}/payments`, {
            method: 'POST',
            headers: getAuthHeaders('application/json'),
            body: JSON.stringify(paymentData)
        })
        if (!res.ok) throw new Error(`Error creating payment: ${res.status}`)
        return await parseResponseSafe(res)
    },

    async updatePayment(id, paymentData) {
        const res = await fetch(`${API_URL}/payments/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders('application/json'),
            body: JSON.stringify(paymentData)
        })
        if (!res.ok) throw new Error(`Error updating payment: ${res.status}`)
        return await parseResponseSafe(res)
    },

    async deletePayment(id) {
        const res = await fetch(`${API_URL}/payments/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(null)
        })
        return res.ok
    },

    async getPaymentMethods() {
        const res = await fetch(`${API_URL}/payment-methods`, {
            headers: getAuthHeaders(null)
        })
        if (!res.ok) throw new Error(`Error getting payment methods: ${res.status}`)
        return await parseResponseSafe(res)
    },

    async getPaymentMethod(id) {
        const res = await fetch(`${API_URL}/payment-methods/${id}`, {
            headers: getAuthHeaders(null)
        })
        if (!res.ok) throw new Error(`Error getting payment method: ${res.status}`)
        return await parseResponseSafe(res)
    },

    async addPaymentMethod(newMethod) {
        const res = await fetch(`${API_URL}/payment-methods`, {
            method: 'POST',
            headers: getAuthHeaders('application/json'),
            body: JSON.stringify(newMethod)
        })
        if (!res.ok) throw new Error(`Error adding payment method: ${res.status}`)
        return await parseResponseSafe(res)
    },

    async deletePaymentMethod(id) {
        const res = await fetch(`${API_URL}/payment-methods/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(null)
        })
        return res.ok
    },

    async updatePaymentMethod(id, updatedData) {
        const res = await fetch(`${API_URL}/payment-methods/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders('application/json'),
            body: JSON.stringify(updatedData)
        })
        if (!res.ok) throw new Error(`Error updating payment method: ${res.status}`)
        return await parseResponseSafe(res)
    },

    async getBillingSettings() {
        const res = await fetch(`${API_URL}/billing-settings`, {
            headers: getAuthHeaders(null)
        })
        if (!res.ok) throw new Error(`Error getting billing settings: ${res.status}`)
        return await parseResponseSafe(res)
    },

    async updateBillingSettings(id, updatedSettings) {
        const res = await fetch(`${API_URL}/billing-settings/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders('application/json'),
            body: JSON.stringify(updatedSettings)
        })

        if (!res.ok) {
            let errorMessage = `Error updating billing settings: ${res.status}`
            try {
                const parsed = await parseResponseSafe(res)
                if (parsed) {
                    if (typeof parsed === 'string') errorMessage = parsed
                    else if (parsed.message) errorMessage = parsed.message
                    else errorMessage = JSON.stringify(parsed)
                }
            } catch (e) {
                // mantener mensaje por defecto
            }
            throw new Error(errorMessage)
        }

        return await parseResponseSafe(res)
    }
}
