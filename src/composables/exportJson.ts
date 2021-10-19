import { msToTime } from './msToTime'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Session } from 'types/index'

export const exportJson = (sessions: Session[]) => {
	const doc = new jsPDF('p', 'pt', 'a4', true)

	const totalTime = sessions.reduce((acc, item) => acc + item.rawTime, 0)

	const tabledSessions = sessions.map((item, i) => {
		return [`${i + 1}`, item.formattedTime]
	})

	const totalHours = totalTime / 1000 / 60 / 60
	const totalPay = totalHours * 70

	autoTable(doc, {
		head: [['Session', 'Time']],
		body: [
			...tabledSessions,
			[
				`Total sessions: ${sessions.length}`,
				`Total time: ${msToTime(totalTime, 'long')}`
			],
			['Total pay', `$${totalPay.toFixed(1)}`]
		]
	})
	doc.save(`${Date.now()}.pdf`)
}
