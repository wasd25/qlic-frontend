// src/domains/alerts/services/alerts.service.js
import { authService } from '../../iam/services/auth.service.js'

const API_URL = import.meta.env.VITE_API_BASE_URL

function getAuthHeaders(contentType = 'application/json') {
    const token = authService.getToken();
    if (!token) {
        throw new Error('Usuario no autenticado (token faltante)');
    }
    const headers = { Authorization: `Bearer ${token}` };
    if (contentType) headers['Content-Type'] = contentType;
    return headers;
}

function mapAlertRow(row) {
    return {
        id: row.id,
        alertType: row.alertType ?? row.alert_type ?? null,
        title: row.title ?? null,
        message: row.message ?? null,
        timestamp: row.timestamp ?? row.created_at ?? row.time ?? null
    }
}

export async function fetchAlerts() {
    const res = await fetch(`${API_URL}/alert`, {
        headers: getAuthHeaders(null)
    })
    if (!res.ok) throw new Error(`Error getting alerts: ${res.status}`)
    const data = await res.json()
    if (!Array.isArray(data)) return []
    return data.map(mapAlertRow)
}

export default {
    async createAlert(alertData) {
        const res = await fetch(`${API_URL}/alert`, {
            method: "POST",
            headers: getAuthHeaders('application/json'),
            body: JSON.stringify(alertData)
        })
        if (!res.ok) throw new Error(`Error creating alert ${res.status}`);
    },

    async getAlerts() {
        const res = await fetch(`${API_URL}/alert`, {
            headers: getAuthHeaders(null)
        })
        if (!res.ok) throw new Error(`Error getting alerts: ${res.status}`);
        const data = await res.json()
        if (!Array.isArray(data)) return []
        return data.map(mapAlertRow)
    },

    async getAlertById(id) {
        const res = await fetch(`${API_URL}/alert/${id}`, {
            headers: getAuthHeaders(null)
        })
        if (!res.ok) throw new Error(`Error getting alert: ${res.status}`);
        const row = await res.json()
        return mapAlertRow(row)
    },

    async updateAlert(id, alertData) {
        const res = await fetch(`${API_URL}/alert/${id}`, {
            method: "PUT",
            headers: getAuthHeaders('application/json'),
            body: JSON.stringify(alertData)
        })
        if (!res.ok) throw new Error(`Error updating alert: ${res.status}`);
        const row = await res.json()
        return mapAlertRow(row)
    },

    async deleteAlert(id) {
        const res = await fetch(`${API_URL}/alert/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders(null),
        })
        return res.ok
    },
}
