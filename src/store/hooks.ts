import { computed } from 'vue'
import store from '.'

export const useUser = () => {
	return computed(() => store.getUser())
}
