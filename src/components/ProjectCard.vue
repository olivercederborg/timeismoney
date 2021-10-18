<script setup lang="ts"></script>

<template>
	<router-link to="/project">
		<article
			class="rounded-xl h-52 flex flex-col justify-between p-6 bg-gray-800"
		>
			<section>
				<h3 class="text-2xl font-semibold">Workish</h3>
				<p class="mt-2 text-gray-300">Dagba Aps</p>
			</section>
			<section>
				<p class="text-gray-300">
					Hourly rate:
					<span class="font-semibold text-purple-300">$70</span>
				</p>
				<p class="text-gray-300">
					Total time:
					<span class="text-xl font-semibold text-purple-300"
						>04:19:32:15</span
					>
				</p>
			</section>
		</article>
	</router-link>
</template>
