import { computed } from 'vue'
import store from '.'

export const useUser = () => {
	const user = computed(() => store.getUser())
	const isLoading = computed(() => store.getLoading())
	return { user, isLoading }
}
