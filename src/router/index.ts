import { createRouter, createWebHistory } from 'vue-router'
import { doesProjectExist } from 'composables/firebase/project'

import Home from '../views/Home.vue'

const routes = [
	{ path: '/', name: 'Home', component: Home },
	{
		path: '/projects',
		name: 'Projects',
		component: () => import('../views/Projects.vue')
	},
	{
		path: '/projects/:id',
		name: 'Project',
		component: () => import('../views/Project.vue'),
		async beforeEnter(to: any, from: any, next: any) {
			if (!(await doesProjectExist(to.params.id))) {
				next({
					name: 'Projects'
				})
			} else next()
		}
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
