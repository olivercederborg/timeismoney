import { msToTime } from './msToTime'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export const exportJson = (sessions: any[]) => {
	const doc = new jsPDF('p', 'pt', 'a4', true)

	let totalTime = 0

	sessions.forEach(item => {
		totalTime += parseInt(item.rawTime)
	})

	const tabledSessions = sessions.map((item, i) => {
		return [`${i + 1}`, item.time]
	})

	const totalHours = totalTime / 1000 / 60 / 60
	const totalPay = totalHours * 70

	autoTable(doc, {
		head: [['Session', 'Time']],
		body: [
			...tabledSessions,
			[
				`Total sessions: ${sessions.length}`,
				`Total time: ${msToTime(totalTime)}`
			],
			['Total pay', `$${totalPay.toFixed(1)}`]
		]
	})
	doc.save(`${Date.now()}.pdf`)
}
