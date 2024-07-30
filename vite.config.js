import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import{ resolve } from 'path'
import{createSvgIconsPlugin} from 'vite-plugin-svg-icons'
const pathResolve = dir => resolve(__dirname,dir)

export default defineConfig({
  plugins: [vue(),
	  createSvgIconsPlugin({
		  iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
		  symbolId: 'icon-[dir]-[name]',
	  }),
  ],
	define: {
		// enable hydration mismatch details in production build
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
	},
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
