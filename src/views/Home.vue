<script setup lang="ts">
	import Button from 'components/Button.vue'
	import { signUpWithGithub } from 'lib/db-admin'
	import { useUser } from 'store/hooks'

	const { user } = useUser()

	const signUp = () => signUpWithGithub()
</script>

<template>
	<section
		class="h-[80vh] flex flex-col justify-center max-h-screen text-center"
	>
		<h1 class="text-5xl">Welcome to TimeisMoney, friend.</h1>
		<p class="mt-6 text-xl leading-loose text-gray-200">
			Keep track of your working hours on a per-project basis. <br />
			Easily export your total hours. Get paid.
		</p>
		<Button
			v-if="!user"
			class="self-center mt-8"
			variant="purple"
			title="Continue with Github"
			@click="signUp"
		/>
		<Button
			v-else
			class="self-center mt-8"
			variant="purple"
			title="Go to
		Projects"
			@click="$router.push('/projects')"
		/>
	</section>
</template>
