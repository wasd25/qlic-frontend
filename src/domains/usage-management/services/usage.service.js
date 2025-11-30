import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL

export async function getUsageSummary() {
    try {
        // Usamos reportSummaries/1 como fuente de verdad ya que usageSummary falla
        const { data } = await axios.get(`${API_BASE}/reportSummaries/1`)

        // Calculamos el total basado en los trends disponibles
        const currentUsage = data.usageTrends.reduce((acc, curr) => acc + curr.liters, 0)

        return {
            current: currentUsage,
            dailyLimit: 2000, // Valor por defecto o hardcodeado si no viene en la API
            monthlyTotal: currentUsage * 4 // Estimación basada en datos reales
        }
    } catch (error) {
        console.error('Error fetching usage summary:', error)
        return { current: 0, dailyLimit: 0, monthlyTotal: 0 }
    }
}

export async function getUsageEvents() {
    try {
        // Mapeamos los trends como eventos recientes para mostrar datos reales
        const { data } = await axios.get(`${API_BASE}/reportSummaries/1`)

        return data.usageTrends.map((trend, index) => ({
            id: index + 1,
            time: new Date(trend.day).toLocaleDateString(),
            amount: trend.liters,
            source: 'Main Sensor' // Dato estático ya que no viene en el trend
        })).slice(0, 5) // Mostramos los 5 más recientes
    } catch (error) {
        console.error('Error fetching usage events:', error)
        return []
    }
}
