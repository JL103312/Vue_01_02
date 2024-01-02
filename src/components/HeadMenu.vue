
<template>
<div class="header"> 

    <div class="title">
        <div class="text">郑州市智慧人口监控大屏</div>

        <div  
        v-for="(item,index) in menus"
        :class="['menu_item', item.sid == curpage ? 'menu_item_selected' : '']"
        @click="TurnPage(item.path)">
            <span>{{item.name}}</span>
        </div>

    </div>

    <div class="right">
        <div class="time_text">{{time}}</div>
        <div class="date">{{date}}</div>
    </div>

</div>
 </template>

<script setup>

import {ref,reactive} from "vue";
import {useRouter} from "vue-router";
import dayjs from "dayjs";

//定义一个变量用于维护不同菜单的选中状态
let curpage = ref('Index');

//先获取到路由对象，然后使用此对象进行操作
const router = useRouter();
const TurnPage = (path)=>{
    //在路由跳转之前先执行此函数（来更改CurPage）
    router.beforeResolve((to)=>{
        //此时的to是一个对象，包含了一系列准备跳转的页面的信息
        curpage.value = to.name;
    })
    //通过代码实现页面的跳转
    router.push(path);
};

//定义数组用于数据的循环读取(注意响应式数据)
const menus = reactive([
    {
        sid: "Index",
        name:"人口监控",
        path:"/index",
    },
    
    {
        sid: "Distribution",
        name:"疾病分析",
        path:"/dis"
    },
    
]);


//因为es6步支持转换函数format，所以我们使用第三方的库dayjs来转换

let time =  ref(dayjs(new Date()).format("HH:mm:ss"));
let date =  ref(dayjs(new Date()).format("YYYY年MM月DD日"));

//使用setInterval函数设置刷新时间
setInterval(function(){
time.value = dayjs(new Date()).format("HH:mm:ss"),
date.value = dayjs(new Date()).format("YYYY年MM月DD日")
},1000);

//cleaInterval（id） 可以删除刷新器，这就要求在定义的时候需要有刷新器的id

</script>

<style scoped="scoped">

/** 单位格式
    1rem = 16px
    1vh  =  浏览器窗口的1%
*/

/**菜单默认样式 */
.menu_item {
margin: 1rem;
line-height: 80%;
font-size: 1.4rem;
padding: 5px;
background: gray;
border-radius: 3px;
cursor: pointer;

}

/** 特质菜单被选中时候的样式 */
.menu_item_selected {
    background: #06a5bd;
}
/**鼠标滑过背景变色 */
.menu_item:hover {
    background: #06a5bd;
}

/**使用flex布局，开启之后默认左右排列 
    ustify-content  配合flex使用，配置flex盒子中的布局（左右中）
*/
.header{
    display: flex;
    justify-content: space-between;
    font-size: 2.4rem;
    height: 6vh;
    border-bottom: 0.1vh solid #0adbfa8a;
    text-align  : center;
    color: #fff;

}
.title{
    display: flex;
    /**上下居中 */
    align-items: center;
}

.text{
letter-spacing: 0.3vh;
/**渐变色，从右向左，按照指定颜色进行变色 */
background: linear-gradient(to left, #2196f3, #10f7d7, #1688e9);
/**以盒子内的文字作为裁剪区域向外裁剪，文字之外的区域都将被裁剪掉 */
-webkit-background-clip: text;
/**将字体设置为透明*/
color: transparent;
text-align: left;
padding: 1vh;
}

.right {
font-size: 1.5rem;
display: flex;
/* align-items: center; */
justify-content: center;
/**虽然flex开启，但是我们使用上下排列    */
flex-direction: column;
}

.time_text{
    font-size: 1.8rem;
    color: #0df3bd;
}

.date{
    font-size: 1.8rem;
    font-weight: bold;
    color: rgb(244, 7, 193);
}



</style>