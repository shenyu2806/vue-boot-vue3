import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import{ resolve } from 'path'
import{createSvgIconsPlugin} from 'vite-plugin-svg-icons'
const pathResolve = dir => resolve(__dirname,dir)

export default defineConfig({
  plugins: [
	  vue(),
	  createSvgIconsPlugin({
		  iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
		  symbolId: 'icon-[dir]-[name]',
	  })
  ],
	define: {
		// enable hydration mismatch details in production build
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
	},
	/*pluginOptions:{
	  'style-resources-loader':{
		preProcessor:'scss',
		patterns:[]
	  }
  },*/
  server:{
	  host:"0.0.0.0",
	  port:8080,//项目端口
	  open:false,//启动浏览器
	  cors:true,//允许跨域
	  proxy: {
		  // 在此处编写代理规则
		  '/tp': {
			  target: 'http://localhost:9090',
			  changeOrigin: true,
			  rewrite: (path) => {
				  return path.replace(/\/tp/, '')
			  }
		  }
	  },
	  before: function(app) {
		  // 在服务器启动之前执行自定义代码
		  console.log("团星网")
	  },
	  after: function(app) {
		  // 在服务器启动之后执行自定义代码
		  console.log("团星网")
	  }
  },
  resolve:{
	  alias:{
		  '@': pathResolve('./src')
	  }
  }
})
