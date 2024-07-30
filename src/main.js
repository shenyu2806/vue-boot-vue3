import { createApp } from 'vue'
import App from './App.vue'
//router
import router from "./router"
import pinia from "./store";
//element
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//svg
import 'virtual:svg-icons-register'
import instance from "@/http";

const app = createApp(App)
//eLement·pLus国际化
app.use(ElementPlus,{
	locale:zhCn,
})
for (const [key,component] of Object.entries(ElementPlusIconsVue)){
	app.component(key,component)
}
app.use(router)
app.use(pinia)
app.config.globalProperties.$apiUsr = 'http://localhost:9090';
// app.use(instance)
app.mount('#app')
