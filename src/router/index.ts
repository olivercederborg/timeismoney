import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
	{ path: '/', name: 'Home', component: Home },
	{
		path: '/projects',
		name: 'Projects',
		component: () => import('../views/Projects.vue')
	},
	{
		path: '/project',
		name: 'Project',
		component: () => import('../views/Project.vue')
	}
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHashHistory(),
	routes // short for `routes: routes`
})

export default router
