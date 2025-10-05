import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export async function fetchAnomalies() {
    try {
        const response = await axios.get(`${BASE_URL}/anomalies`)
        return response.data
    } catch (error) {
        console.error('Error fetching anomalies:', error)
        return []
    }
}
