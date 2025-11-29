import { authService } from '../../iam/services/auth.service.js'

const API_URL = import.meta.env.VITE_API_BASE_URL

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
    // POST /api/v1/alert - Crear un nuevo alerta
    async createAlert(alertData) {
        const res = await fetch(`${API_URL}/alert`, {
            method: "POST",
            headers: getAuthHeaders('application/json'),
            body: JSON.stringify(alertData)
        })
        if (!res.ok) throw new Error(`Error creating alert ${res.status}`);
    },

    // GET /api/v1/alert - Obtener todas las alertas
    async getAlerts() {
        const res = await fetch(`${API_URL}/alert`, {
            headers: getAuthHeaders(null)
        })
        if (!res.ok) throw new Error(`Error getting alerts: ${res.status}`);
        return res.json()
    },

    // GET /api/v1/alert/{id} - Obtener una alerta por ID
    async getAlertById(id) {
        const res = await fetch(`${API_URL}/alert/${id}`, {
            headers: getAuthHeaders(null)
        })
        if (!res.ok) throw new Error(`Error getting alert: ${res.status}`);
        return res.json()
    },

    // PUT /api/v1/alert/{id} - Actualizar una pago
    async updateAlert(id, alertData) {
        const res = await fetch(`${API_URL}/alert/${id}`, {
            method: "PUT",
            headers: getAuthHeaders('application/json'),
            body: JSON.stringify(alertData)
        })
        if (!res.ok) throw new Error(`Error updating alert: ${res.status}`);
        return res.json()
    },

    // DELETE /api/v1/alert/{id} - Eliminar una alerta
    async deleteAlert(id) {
        const res = await fetch(`${API_URL}/alert/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(null),
        })
        return res.ok
    },
}
