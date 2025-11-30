// javascript
// File: `src/domains/usage-management/services/usage.service.js`
import axios from 'axios'

const RAW_API_BASE = import.meta.env.VITE_API_BASE_URL || ''
console.log('[usage.service] VITE_API_BASE_URL=', RAW_API_BASE)

const API_BASE = RAW_API_BASE.replace(/\/+$/, '') // .../api/v1 (sin slash final)
const API_ROOT = API_BASE.replace(/\/v1\/?$/, '') // .../api

// axios instance for consistent logs / interceptors later
const client = axios.create({
    baseURL: API_BASE,
    timeout: 10000
})

async function fetchWithLog(fullUrl, opts = {}) {
    const method = (opts.method || 'get').toLowerCase()
    console.log(`[usage.service] Request -> ${method.toUpperCase()} ${fullUrl}`)
    try {
        const res = await client.request({ url: fullUrl, method, ...opts })
        console.log(`[usage.service] Response ${res.status} -> ${fullUrl}`, res.data)
        return res
    } catch (err) {
        if (err.response) {
            console.error(`[usage.service] Error response ${err.response.status} -> ${fullUrl}`, err.response.data)
        } else {
            console.error(`[usage.service] Network/Error -> ${fullUrl}`, err.message)
        }
        throw err
    }
}

export async function getUsageSummary() {
    try {
        // endpoint esperado: /api/vq/usage-summary  -> usamos API_ROOT para construir /api/vq/...
        const res = await fetchWithLog(`${API_ROOT}/vq/usage-summary`)
        const data = res.data
        const item = Array.isArray(data) ? data[0] : (data || {})
        const current = item.current ?? item.Current ?? item.currentUsage ?? item.CurrentUsage ?? 0
        const dailyLimit = item.dailyLimit ?? item.DailyLimit ?? item.Daily_Limit ?? item.daily_limit ?? 0
        const monthlyTotal = item.monthlyTotal ?? item.MonthlyTotal ?? item.monthly_total ?? item.Monthly_Total ?? 0

        // detect empty object
        if (!current && !dailyLimit && !monthlyTotal) {
            console.warn('[usage.service] usage summary parece vacío:', item)
        }

        return { current, dailyLimit, monthlyTotal }
    } catch (error) {
        // ya logueado en fetchWithLog
        return { current: 0, dailyLimit: 0, monthlyTotal: 0 }
    }
}

export async function getUsageEvents() {
    try {
        // endpoint esperado: /api/v1/usage-events -> usar API_BASE porque contiene /api/v1
        const res = await fetchWithLog(`/usage-events`)
        const data = res.data
        const list = Array.isArray(data) ? data : (data.items ?? data.results ?? data.events ?? [])

        if (!Array.isArray(list) || list.length === 0) {
            console.warn('[usage.service] usage events lista vacía o formato inesperado:', data)
        }

        return (Array.isArray(list) ? list : []).map(ev => {
            const raw = ev || {}
            const rawTime = raw.time ?? raw.Time ?? raw.createdAt ?? raw.timestamp ?? raw.day ?? raw.date ?? ''
            let time = ''
            try { time = rawTime ? new Date(rawTime).toLocaleString() : '' } catch { time = String(rawTime) }
            return {
                id: raw.id ?? raw.Id ?? raw._id ?? null,
                time,
                amount: raw.amount ?? raw.Amount ?? raw.liters ?? raw.value ?? 0,
                source: raw.source ?? raw.Source ?? raw.sensor ?? raw.device ?? ''
            }
        })
    } catch (error) {
        return []
    }
}

export async function getReportSummary(id = 1) {
    try {
        const res = await fetchWithLog(`/reportSummaries/${id}`)
        return res.data
    } catch (error) {
        return null
    }
}
