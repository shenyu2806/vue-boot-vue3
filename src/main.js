import { createApp } from 'vue'
import App from './App.vue'
//router
import router from "@/router"
//element
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)

//eLement·pLus国际化
app.use(ElementPlus,{
	locale:zhCn,
})

app.use(router).use(ElementPlus).mount('#app')

for (const [key,component]of object.entries(ElementPlusIconsVue)){
	app.component(key,component)
}
