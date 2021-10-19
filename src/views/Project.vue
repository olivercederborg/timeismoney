<script setup lang="ts">
	import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue'
	import { onBeforeRouteLeave, useRoute } from 'vue-router'
	import { doc, DocumentSnapshot, onSnapshot } from 'firebase/firestore'

	import { exportJson } from 'composables/exportJson'
	import { msToTime } from 'composables/msToTime'
	import useStopWatch from 'composables/useStopWatch'
	import Button from 'components/Button.vue'
	import { saveSession } from 'composables/firebase/session'
	import { useUser } from 'store/hooks'
	import { db } from 'lib/firebase'

	import { Project, Session } from 'types/index'
	import { clearSessions } from 'composables/firebase/project'

	const route = useRoute()
	const { user } = useUser()
	const { formattedTime, isStarted, reset, start, stop, elapsedTime } =
		useStopWatch()

	const isMounted = ref<boolean>(false)
	onMounted(() => (isMounted.value = true))
	const project = ref<Project | null>(null)
	const sessions = ref<Session[]>([])

	const projectRef = doc(db, 'projects', route.params.id as string)
	const unsub = onSnapshot<Project>(
		projectRef,
		(snapshot: DocumentSnapshot<Project>) => {
			project.value = {
				id: snapshot.id,
				...snapshot.data()
			}
			sessions.value = snapshot.get('sessions')
		}
	)
	onUnmounted(unsub)

	const totalTime = computed(() => {
		if (sessions.value) {
			const time: number = sessions.value.reduce(
				(acc: number, item: Session) => acc + item.rawTime,
				0
			)
			return msToTime(time, 'long-readable')
		}
	})

	const saveCurrentSession = () => {
		const session = {
			formattedTime: formattedTime.value,
			rawTime: elapsedTime.value
		}
		saveSession(route.params.id as string, session)
		reset()
	}

	const removeSessions = () => {
		const answer = window.confirm(
			'Do you really wish to clear your sessions?'
		)
		if (answer) clearSessions(route.params.id as string)
	}

	const exportSessions = () => exportJson(sessions.value)

	onBeforeRouteLeave(() => {
		if (elapsedTime.value && user.value) {
			const answer = window.confirm(
				'Do you really want to leave? Your timer is still going!'
			)
			if (!answer) return false
		}
	})
</script>

<template>
	<section class="flex flex-col items-start mt-12">
		<header class="flex items-center justify-between w-full">
			<section>
				<h2 class="text-3xl font-bold">{{ project?.name }}</h2>
				<p class="text-lg font-medium text-gray-300">
					{{ project?.client }}
				</p>
			</section>
			<section class="flex space-x-2">
				<Button
					v-if="sessions.length"
					variant="purple"
					title="Clear sessions"
					@click="removeSessions"
					class="rounded-lg"
				/>
				<Button
					v-if="sessions.length"
					variant="purple"
					title="Export as PDF"
					@click="exportSessions"
					class="rounded-lg"
				/>
			</section>
		</header>

		<section class="self-center mt-10 space-x-2">
			<p class="text-7xl">{{ formattedTime }}</p>
			<div class="flex justify-center mt-10 space-x-2">
				<Button
					variant="green"
					title="Start"
					v-if="!isStarted"
					@click="start"
				></Button>
				<Button
					variant="red"
					title="Stop"
					v-else-if="isStarted"
					@click="stop"
				/>
				<Button
					variant="red"
					title="Reset"
					v-if="elapsedTime"
					@click="reset"
				/>
				<Button
					v-if="elapsedTime"
					variant="purple"
					title="Save session"
					@click="saveCurrentSession"
				/>
			</div>
		</section>

		<table v-if="sessions.length" class="w-full max-w-xl mx-auto mt-20">
			<tr class="text-left">
				<th>Session</th>
				<th class="text-right">Time</th>
			</tr>
			<tr v-for="(session, index) in sessions" :key="index">
				<td>Session {{ index + 1 }}</td>
				<td class="text-right">{{ session.formattedTime }}</td>
			</tr>
			<tr>
				<td>Total: {{ sessions.length }}</td>
				<td class="text-right">Total: {{ totalTime }}</td>
			</tr>
		</table>
	</section>
</template>
