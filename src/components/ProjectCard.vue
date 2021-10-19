<script setup lang="ts">
	import { computed } from '@vue/reactivity'
	import { msToTime } from 'composables/msToTime'
	import { Project } from 'types/index'

	const props = defineProps<{
		project: Project
	}>()

	const computedTime = computed(() => {
		const addedTime = props.project.sessions?.reduce(
			(acc, item) => acc + item.rawTime,
			0
		)
		return msToTime(addedTime as number, 'long-readable')
	})
</script>

<template>
	<router-link :to="`/projects/${project.id}`">
		<article
			class=" rounded-xl h-52 bg-dark1 flex flex-col justify-between p-6 shadow-md"
		>
			<section>
				<h3 class="text-2xl font-semibold">{{ project.name }}</h3>
				<p class="mt-2 text-gray-300">{{ project.client }}</p>
			</section>
			<section>
				<p class="text-gray-300">
					Hourly rate:
					<span class="font-semibold text-purple-300">{{
						project.hourlyRate?.amount?.toLocaleString('en-US', {
							style: 'currency',
							currency: project.hourlyRate.currency,
							compactDisplay: 'short',
							maximumFractionDigits: 0
						})
					}}</span>
				</p>
				<p class="text-gray-300">
					Total time:
					<span class="text-xl font-semibold text-purple-300">{{
						computedTime
					}}</span>
				</p>
			</section>
		</article>
	</router-link>
</template>
