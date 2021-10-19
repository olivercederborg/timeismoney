import { currencyOptions } from 'types/constants'

export type User = {
	uid: string | null | undefined
	displayName?: string | null
	email?: string | null
	photoURL?: string | null
	authProvider?: string
	name?: string
}

export type Project = {
	id?: string
	name?: string
	client?: string
	userId?: string
	sessions?: Session[] | null | undefined
	hourlyRate?: {
		amount?: number
		currency?: typeof currencyOptions[number]
	}
}

export type Session = {
	formattedTime: string
	rawTime: number
}
