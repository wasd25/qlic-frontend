import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function fetchAnomalies() {
    try {
        const response = await axios.get(`${BASE_URL}/anomalies`)
        return response.data
    } catch (error) {
        console.error('Error fetching anomalies:', error)
        return []
    }
}
