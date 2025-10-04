import jsPDF from 'jspdf'

export function exportReportToPDF(type, data) {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text(`${type} Report`, 20, 20)

    doc.setFontSize(12)
    let y = 30

    if (type === 'Usage Analytics') {
        doc.text('Water Usage Trends:', 20, y)
        y += 10
        data.usageTrends.forEach(item => {
            doc.text(`${item.day}: ${item.liters}L`, 20, y)
            y += 8
        })
    }

    if (type === 'Cost Analysis') {
        doc.text('Cost Breakdown:', 20, y)
        y += 10
        data.costBreakdown.forEach(item => {
            doc.text(`${item.category}: $${item.cost}`, 20, y)
            y += 8
        })
    }

    if (type === 'Efficiency') {
        doc.text('Efficiency Metrics:', 20, y)
        y += 10
        doc.text(`Score: ${data.efficiencyMetrics.score}%`, 20, y)
        y += 8
        doc.text(`Water Saved: ${data.efficiencyMetrics.waterSaved}L`, 20, y)
        y += 8
        doc.text(`Cost Saved: $${data.efficiencyMetrics.costSaved}`, 20, y)
    }

    doc.save(`${type.replace(/\s+/g, '_')}_Report.pdf`)
}
