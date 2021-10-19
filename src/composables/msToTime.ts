export const msToTime = (
	duration: number,
	format: 'long-readable' | 'short' | 'long'
) => {
	let seconds: string | number = Math.floor((duration / 1000) % 60)
	let minutes: string | number = Math.floor((duration / (1000 * 60)) % 60)
	let hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24)
	let days: string | number = Math.floor(
		(duration / (1000 * 60 * 60 * 24)) % 24
	)

	days = days < 10 ? '0' + days : days
	hours = hours < 10 ? '0' + hours : hours
	minutes = minutes < 10 ? '0' + minutes : minutes
	seconds = seconds < 10 ? '0' + seconds : seconds

	switch (format) {
		case 'long-readable':
			return `${days}d, ${hours}h, ${minutes}m`
			break
		case 'long':
			return days + ':' + hours + ':' + minutes + ':' + seconds
			break
		case 'short':
			return hours + ':' + minutes + ':' + seconds
			break

		default:
			return hours + ':' + minutes + ':' + seconds
			break
	}
}
