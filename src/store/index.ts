import { User } from 'types/index'
import { reactive } from 'vue'

type State = {
	user: User | null
	isLoading: boolean
}

const store = {
	debug: true,

	state: reactive<State>({
		user: null,
		isLoading: true
	}),

	setUser(newValue: State['user']) {
		if (this.debug) {
			console.log('setUser triggered with', newValue)
		}

		this.state.user = newValue
	},
	setLoading(newValue: boolean) {
		if (this.debug) {
			console.log('setLoading triggered with', newValue)
		}
		this.state.isLoading = newValue
	},
	getUser() {
		return this.state.user
	},
	getLoading() {
		return this.state.isLoading
	}
}

export default store
