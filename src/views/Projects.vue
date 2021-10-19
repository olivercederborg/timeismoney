<script setup lang="ts">
	import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
	import { collection, onSnapshot, query, where } from '@firebase/firestore'
	import { useUser } from '../store/hooks'
	import { db } from '../lib/firebase'
	import { Project } from 'types/index'
	import ProjectCard from 'components/ProjectCard.vue'
	import {
		onBeforeRouteLeave,
		onBeforeRouteUpdate,
		useRouter
	} from 'vue-router'
	import Button from 'components/Button.vue'

	const isMounted = ref<boolean>(false)
	onMounted(() => (isMounted.value = true))
	const projects = ref<Project[] | undefined | []>([])
	const { user, isLoading } = useUser()
	const router = useRouter()

	watchEffect(() => {
		if (user.value) {
			const projectsQuery = query(
				collection(db, 'projects'),
				where('userId', '==', user.value.uid)
			)
			const unsub = onSnapshot(projectsQuery, snapshot => {
				projects.value = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data()
				}))
			})
			onUnmounted(unsub)
		}
	})

	watchEffect(() => {
		if (!isLoading.value && !user.value) router.push('/')
	})
</script>

<template>
	<section class="flex flex-col w-full mt-12">
		<header class="flex items-center justify-between">
			<h2 class="text-3xl font-bold">Your Projects</h2>
			<Button variant="purple" title="Add Project" />
		</header>

		<section v-if="user" class="grid w-full h-full grid-cols-3 gap-5 mt-12">
			<div v-for="project in projects">
				<ProjectCard :project="project" />
			</div>
		</section>
	</section>
</template>
