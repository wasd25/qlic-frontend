import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL


export async function getUsageSummary() {
    try {
        const { data } = await axios.get(`${API_BASE}/usageSummary`)
        return data
    } catch (error) {
        console.error('Error fetching usage summary:', error)
        return { current: 0, dailyLimit: 0, monthlyTotal: 0 }
    }
}

export async function getUsageEvents() {
    try {
        const { data } = await axios.get(`${API_BASE}/usageEvents`)
        return data
    } catch (error) {
        console.error('Error fetching usage events:', error)
        return []
    }
}
