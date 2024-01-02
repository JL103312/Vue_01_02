//路由是用来配置组件和路径的对应关系

//1.先导入路由的组件的对象(createRouter用来创建路由，createWebHistory用来配置路径匹配模式)
import { createRouter, createWebHistory } from "vue-router";


//导入组件（四个组件）
import Index from '../Pages/Index.vue';
import Distribution from  '../Pages/Distribution.vue';
import Live from '../Pages/Live.vue';
import Order from '../Pages/Order.vue';

//2.定义一个数组用于对应路径和组件的对应关系
//注意：每个数组里的每一个数据都是一个对象（需要设置一些必须的属性）

const routes = [
    //默认首页面（使用重定向实现）
    {
        path:"/",
        redirect:"Index" //注意使用重定向的时候要带上引号
    },

    {
    name:"Index", //路径别名，可以省略
    path:"/index",      //设置路径
    component:Index  //具体组件
    },

    {
    name:"Distribution",
    path:"/dis",
    component:Distribution
    },
    {
        name:"Order",
        path:"/order",
        component:Order
    },
    {
        name:"Live",
        path:"/live",
        component:Live
    }
]

//3.创建路由对象（调用createRouter函数）并且导出(配置两个属性 路由规则+路由模式)
const myRouter = createRouter({
    routes:routes,           //指定路由匹配规则
    history:createWebHistory() //指定地址匹配模式
})

//4.将路由对象导出
export default  myRouter  