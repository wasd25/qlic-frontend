export async function getReportSummary(filters) {
    const { type } = filters

    const usageTrends = type === 'Usage Analytics'
        ? [
            { day: 'Mon', liters: 120 },
            { day: 'Tue', liters: 150 },
            { day: 'Wed', liters: 90 },
            { day: 'Thu', liters: 180 },
            { day: 'Fri', liters: 130 },
            { day: 'Sat', liters: 100 },
            { day: 'Sun', liters: 160 }
        ]
        : []

    const costBreakdown = type === 'Cost Analysis'
        ? [
            { category: 'Treatment', cost: 45 },
            { category: 'Distribution', cost: 30 },
            { category: 'Maintenance', cost: 20 },
            { category: 'Monitoring', cost: 15 }
        ]
        : []

    const efficiencyMetrics = type === 'Efficiency'
        ? {
            score: 87,
            waterSaved: 2340,
            costSaved: 156
        }
        : {}

    return {
        usageTrends,
        costBreakdown,
        efficiencyMetrics
    }
}
