<script setup lang="ts">
	import { computed } from 'vue'
	import { useRoute } from 'vue-router'
	import { signUpWithGithub, logOut } from '../lib/db-admin'
	import { useUser } from '../store/hooks'

	const route = useRoute()
	const user = useUser()

	const activeStyles =
		'text-purple-400 border-b-2 border-purple-400 font-semibold'

	const login = () => signUpWithGithub()
	const logout = () => logOut()
</script>

<template>
	<header
		class="max-w-7xl flex items-center justify-between w-full py-6 mx-auto"
	>
		<h1 class="text-xl font-bold tracking-wider text-purple-400 uppercase">
			TimeIsMoney {{ user?.displayName }}
		</h1>
		<nav>
			<ul class="flex items-center space-x-4">
				<li v-if="user">
					<router-link
						:class="route.path === '/' && activeStyles"
						class="p-3"
						to="/"
						>Home</router-link
					>
				</li>
				<li v-if="user">
					<router-link
						:class="route.path === '/projects' && activeStyles"
						class="p-3"
						to="/projects"
						>Projects</router-link
					>
				</li>
				<li v-if="!user">
					<button
						class="
							px-3
							py-1
							text-[15px]
							font-semibold
							bg-purple-400
							rounded-full
						"
						@click="login"
					>
						Continue with Github
					</button>
				</li>
				<li v-if="user">
					<button
						class="
							px-3
							py-1
							text-[15px]
							font-semibold
							bg-purple-400
							rounded-full
						"
						@click="logout"
					>
						Log out
					</button>
				</li>
			</ul>
		</nav>
	</header>
</template>
