import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import{ resolve } from 'path'
const pathResolve = dir => resolve(__dirname,dir)

export default defineConfig({
  plugins: [vue()],
  pluginOptions:{
	  'style-resources-loader':{
		preProcessor:'scss',
		patterns:[]  
	  }
  },
  server:{
	  port:8080,//项目端口
	  open:false,//启动浏览器
	  cors:true,//允许跨域
  },
  resolve:{
	  alias:{
		  '@': pathResolve('./src')
	  }
  }
})
