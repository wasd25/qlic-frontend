import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export async function fetchReports() {
    return axios.get(`${BASE_URL}/reports`)
}

export async function fetchReportById(id) {
    return axios.get(`${BASE_URL}/reports/${id}`)
}

export async function createReport(reportData) {
    return axios.post(`${BASE_URL}/reports`, reportData)
}

export async function updateReport(id, data) {
    return axios.patch(`${BASE_URL}/reports/${id}`, data)
}

export async function getReportSummary(filters) {
    console.log('🔍 Fetching report summaries with params:', filters)
    // Fix: Pass filters object directly as params, axios handles serialization
    const response = await axios.get(`${BASE_URL}/reportSummaries`, { params: filters })

    // Robust handling: check if response.data is the array or if it's wrapped in a 'data' property
    let summaries = response.data
    if (summaries && !Array.isArray(summaries) && Array.isArray(summaries.data)) {
        console.log('📦 Unwrapping summaries from data property')
        summaries = summaries.data
    }

    console.log('✅ Summaries received:', summaries)

    const summary = {
        usageTrends: [],
        costBreakdown: [],
        efficiencyMetrics: {}
    }

    if (!Array.isArray(summaries)) {
        console.warn('⚠️ Expected array for summaries but got:', typeof summaries)
        return summary
    }

    for (const item of summaries) {
        console.log('📦 Processing summary item keys:', Object.keys(item))

        const usage = item.usageTrends || item.usage_trends
        if (usage) {
            summary.usageTrends = usage
        }

        const cost = item.costBreakdown || item.cost_breakdown
        if (cost) {
            summary.costBreakdown = cost
        }

        if (item.efficiencyMetrics) {
            // Mapping robusto: backend (snake_case) -> frontend (camelCase)
            const metrics = item.efficiencyMetrics
            summary.efficiencyMetrics = {
                score: metrics.score,
                waterSaved: metrics.waterSaved || metrics.water_saved,
                costSaved: metrics.costSaved || metrics.cost_saved,
                reportSummaryId: metrics.reportSummaryId || metrics.report_summary_id
            }
        }
    }

    return summary
}
