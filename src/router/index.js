import { createRouter, createWebHistory } from 'vue-router';

import login from '@/views/login/index.vue'
import menu from '@/views/menu/index.vue'
import home from '@/views/home/index.vue'
import set from '@/views/set/index.vue'
import overview from '@/views/overview/index.vue'

const routes =[
	{
		path:'/',
		redirect:'/login'
	},
	{
		name:'login',
		path:'/login',
		component:login
	},
	{
		name:'menu',
		path:'/menu',
		component:menu,
		children:[
			{
			name:'home',
			path:'/home',
			component:home
			},
			{
				name:'set',
				path:'/set',
				component:set
			},
			{
				name:'overview',
				path:'/overview',
				component:overview
			}
		]
	},
]

// 创建router实例
const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
