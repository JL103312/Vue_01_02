import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
//设置路由
import myRouter  from './router/router'
//设置elementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//设置echarts
import * as echarts from 'echarts'


//main.js其实是一个全局的应用文件，我们在使用一些功能的时候可以进行配置

const app = createApp(App);
app.config.globalProperties.$echarts = echarts
app.use(myRouter).use(ElementPlus, {
            locale: zhCn,
        }).mount('#app')
