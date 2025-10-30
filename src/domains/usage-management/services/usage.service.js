import axios from 'axios'

const API_BASE = 'http://localhost:3000'

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
