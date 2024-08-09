import { createRouter, createWebHistory } from 'vue-router';

import a404 from '@/views/err/404.vue'

const routes =[
	{
		path:'/',
		redirect:'/login'
	},
	{
		name:'login',
		path:'/login',
		component:()=>import("@/views/login/index.vue")
	},
	{
		name:'menu',
		path:'/menu',
		component:()=>import("@/views/menu/index.vue"),
		// children:[]
	},
	{
		name:'404',
		path:'/404',
		component:a404
	},
	// 当什么都没有匹配到的时候，重定向页面到 404 页面
	{ path: "/:pathMatch(.*)", redirect: "/404", name: "notMatch", hidden: true },
]

// 创建router实例
const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
