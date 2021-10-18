<script setup lang="ts">
	import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
	import { collection, onSnapshot, query, where } from '@firebase/firestore'
	import { useRouter } from 'vue-router'
	import ProjectCard from '../components/ProjectCard.vue'
	import { db } from '../lib/firebase'
	import { useUser } from '../store/hooks'

	const isMounted = ref<boolean>(false)
	const projects = ref<any[]>([])

	const user = useUser()

	watchEffect(() => {
		if (user.value) {
			const projectsQuery = query(
				collection(db, 'projects'),
				where('userId', '==', user.value?.uid)
			)
			const unsub = onSnapshot(projectsQuery, snapshot => {
				projects.value = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data()
				}))
			})
			onUnmounted(() => unsub)
		}
	})

	onMounted(() => (isMounted.value = true))
</script>

<template>
	<section class="flex flex-col w-full mt-12">
		<h2 class="text-3xl font-bold">Your Projects</h2>

		<section v-if="user" class="grid w-full h-full grid-cols-3 gap-5 mt-12">
			<div v-for="project in projects">
				{{ project.userId }}
			</div>
		</section>
	</section>
</template>
