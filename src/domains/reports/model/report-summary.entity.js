export function createReportSummary() {
    return {
        usageTrends: [],
        costBreakdown: [],
        efficiencyMetrics: {
            score: 87,
            saved: 2340,
            cost: 156
        },
        recentReports: [
            { title: 'Monthly Usage Report', generated: '3 days ago' },
            { title: 'Cost Analysis Report', generated: '1 week ago' },
            { title: 'Efficiency Report', generated: '2 weeks ago' }
        ]
    }
}
