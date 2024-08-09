import { createApp } from 'vue'
import App from './App.vue'
//router
import router from "./router"
import pinia from "./store";
import "./guardian"
//element
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//svg
import 'virtual:svg-icons-register'
import instance from "@/http";
//访问测试接口来判断后台是否正常
import '@/utils/errorHandler'

//全局css
import '@/assets/css/common.css'
const app = createApp(App)
//eLement·pLus国际化
app.use(ElementPlus,{
	locale:zhCn,
})
for (const [key,component] of Object.entries(ElementPlusIconsVue)){
	app.component(key,component)
}
app.use(pinia)
app.config.globalProperties.$apiUsr = '/tp';
// app.use(instance)
//动态路由
import { useMenu } from "@/store/menu";
const  menuRouter = useMenu()
menuRouter.addRouter()
app.use(router)
app.mount('#app')

//配置运行输出
console.log('欢迎使用团星网管理系统！');
