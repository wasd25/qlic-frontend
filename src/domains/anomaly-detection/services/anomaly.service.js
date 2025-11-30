import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL.replace('/v1', '')

const TYPE_MAPPING = {
    1: 'Leak detected',
    2: 'High temperature',
    3: 'Unusual consumption',
    4: 'Low reservoir level',
    5: 'Sensor offline',
    6: 'High pressure'
}

export async function fetchAnomalies() {
    try {
        const response = await axios.get(`${BASE_URL}/anomaly`)
        console.log('Anomalies raw response:', response.data)

        return response.data.map(item => ({
            id: item.id,
            profile_id: item.profileId,
            detected_anomaly: item.detectedAt,
            type: TYPE_MAPPING[item.type] || 'Unknown',
            // Normalize to boolean `resolved`: prefer explicit boolean, then resolvedAt, then numeric status === 2
            resolved: typeof item.resolved === 'boolean'
                ? item.resolved
                : Boolean(item.resolvedAt) || Number(item.status) === 2,
            description: item.description
        }))
    } catch (error) {
        console.error('Error fetching anomalies:', error)
        return []
    }
}
