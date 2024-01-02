import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//先导入mock所需的东西
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  //配置mock
  viteMockServe({
    supportTs:false,
    logger:false,
    mockPath:"./src/mock/"   //主要是配置mock的地址文件
  })
  ],
  hmr: {
    host: "localhost",
    //vue3 vite配置热更新不用手动刷新
    hmr: true,
    },
})
