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
        if (item.efficiencyMetrics) summary.efficiencyMetrics = item.efficiencyMetrics
    }

    return summary
}
