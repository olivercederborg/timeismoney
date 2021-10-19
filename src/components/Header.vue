<script setup lang="ts">
	import { computed } from 'vue'
	import { useRoute, useRouter } from 'vue-router'
	import { signUpWithGithub, logOut } from '../lib/db-admin'
	import { useUser } from '../store/hooks'
	import Button from 'components/Button.vue'

	const route = useRoute()
	const router = useRouter()
	const { user } = useUser()

	const activeStyles = 'text-purple-400 font-semibold'

	const login = () => signUpWithGithub()
	const logout = () => {
		logOut()
		router.replace('/')
	}
</script>

<template>
	<header class="bg-dark1">
		<div
			class="max-w-7xl flex items-center justify-between w-full h-16 mx-auto"
		>
			<h1 class="text-xl font-bold tracking-wider text-purple-400 uppercase">
				TimeIsMoney
			</h1>
			<nav class="h-full">
				<div
					v-if="user"
					class="flex items-center h-full space-x-4 overflow-hidden"
				>
					<router-link
						:class="route.path === '/' && activeStyles"
						class="px-2 py-5"
						to="/"
						>Home</router-link
					>
					<router-link
						:class="route.path === '/projects' && activeStyles"
						class="px-2 py-5"
						to="/projects"
						>Projects</router-link
					>
					<Button
						variant="purple"
						title="Log
					out"
						@click="logout"
					/>
				</div>
				<div v-else class="flex items-center h-full">
					<Button
						variant="purple"
						title="Continue with Github"
						@click="login"
					/>
				</div>
			</nav>
		</div>
	</header>
</template>
