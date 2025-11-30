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
    const params = new URLSearchParams(filters).toString()
    const response = await axios.get(`${BASE_URL}/reportSummaries?${params}`)
    const summaries = response.data

    const summary = {
        usageTrends: [],
        costBreakdown: [],
        efficiencyMetrics: {}
    }

    for (const item of summaries) {
        if (item.usageTrends) summary.usageTrends = item.usageTrends
        if (item.costBreakdown) summary.costBreakdown = item.costBreakdown

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
