<script setup lang="ts">
	const props = defineProps<{
		title: string
		variant?: keyof typeof Variants
	}>()
	const Variants = {
		purple: 'bg-purple-400 hover:bg-purple-500',
		green: 'bg-green-400 hover:bg-green-500',
		red: 'bg-red-400 hover:bg-red-500',
		yellow: 'bg-yellow-400 hover:bg-yellow-500'
	}
</script>

<template>
	<button
		class="px-4 py-2 transition-colors rounded-lg"
		:class="[variant && Variants[variant]]"
	>
		{{ props.title }}
	</button>
</template>
