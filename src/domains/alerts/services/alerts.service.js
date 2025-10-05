import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export async function fetchAlerts() {
    try {
        const response = await axios.get(`${BASE_URL}/alerts`)
        return response.data
    } catch (error) {
        console.error('Error fetching alerts:', error)
        return []
    }
}

export async function fetchSettings() {
    try {
        const response = await axios.get(`${BASE_URL}/notificationSettings`)
        return response.data
    } catch (error) {
        console.error('Error fetching settings:', error)
        return {
            types: [],
            methods: []
        }
    }
}

export async function saveNotificationSettings(newSettings) {
    try {
        await axios.put(`${BASE_URL}/notificationSettings`, newSettings)
    } catch (error) {
        console.error('Error saving settings:', error)
    }
}
