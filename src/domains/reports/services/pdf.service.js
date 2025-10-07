import jsPDF from 'jspdf'

export function exportReportToPDF(type, data, canvas) {
    const doc = new jsPDF()
    const date = new Date().toLocaleDateString()

    doc.setFontSize(18)
    doc.text(`${type} Report`, 20, 20)
    doc.setFontSize(12)
    doc.text(`Fecha: ${date}`, 160, 20, { align: 'right' })
    doc.setLineWidth(0.5)
    doc.line(20, 25, 190, 25)

    let y = 35

    if (type === 'Usage Analytics') {
        doc.text('Water Usage Trends:', 20, y)
        y += 10
        data.usageTrends.forEach(item => {
            doc.text(`${item.day}: ${item.liters}L`, 20, y)
            y += 8
        })

        // 📊 Agregar gráfico si se recibió canvas
        if (canvas) {
            const chartImage = canvas.toDataURL('image/png')
            doc.addImage(chartImage, 'PNG', 20, y + 10, 160, 80)
            y += 90
        }
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