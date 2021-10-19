<script setup lang="ts">
	import { onAuthStateChanged } from '@firebase/auth'
	import { useRouter } from 'vue-router'

	import DefaultLayout from './layouts/DefaultLayout.vue'
	import { auth } from './lib/firebase'
	import store from './store'

	const router = useRouter()

	onAuthStateChanged(auth, user => {
		if (user) {
			store.setUser({
				displayName: user.displayName,
				email: user.email,
				uid: user.uid,
				photoURL: user.photoURL,
				authProvider: user.providerId
			})
			store.setLoading(false)
		} else {
			router.push('/')
			store.setUser(null)
			store.setLoading(false)
		}
	})
</script>

<template>
	<DefaultLayout>
		<router-view />
	</DefaultLayout>
</template>
