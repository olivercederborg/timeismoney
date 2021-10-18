import { reactive } from 'vue'
import { User } from '../types'

type State = {
	user: User | null
}

const store = {
	debug: true,

	state: reactive<State>({
		user: null
	}),

	setUser(newValue: User | null) {
		if (this.debug) {
			console.log('setUser triggered with', newValue)
		}

		this.state.user = newValue
	},
	getUser() {
		return this.state.user
	}
}

export default store
