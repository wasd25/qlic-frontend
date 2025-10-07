const API_URL = import.meta.env.VITE_API_BASE_URL;

export default {
    async getPayments() {
        const res = await fetch(`${API_URL}/payments`)
        return res.json()
    },

    async getPaymentMethods() {
        const res = await fetch(`${API_URL}/paymentMethods`)
        return res.json()
    },

    async getBillingSettings() {
        const res = await fetch(`${API_URL}/billingSettings/1`)
        return res.json()
    },

    async updateBillingSettings(updatedSettings) {
        const res = await fetch(`${API_URL}/billingSettings/1`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedSettings)
        })
        return res.json()
    },

    // agregar nuevo modo de pago
    async addPaymentMethod(newMethod) {
        const res = await fetch(`${API_URL}/paymentMethods`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMethod),
        })
        return res.json()
    },

    // borrar modo de pago por id
    async deletePaymentMethod(id) {
        const res = await fetch(`${API_URL}/paymentMethods/${id}`, {
            method: "DELETE",
        })
        return res.ok
    },

    // cambvia modo de pago
    async updatePaymentMethod(id, updatedData) {
        const res = await fetch(`${API_URL}/paymentMethods/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        })
        return res.json()
    },

}
