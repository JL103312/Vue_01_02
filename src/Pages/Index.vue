 <template>
    <el-row gutter="3">
        <el-col :span="6">
            <Cart cartTitle="今日概况">
                <div class="todayItem" >
                    <span class="todayText" >出生数：</span>

                    <span class="todayNumber"  style="color:green;"
                    v-for="(item,index) in today.in">{{item}}</span>
                </div>
                <div class="todayItem" >
                    <span class="todayText" >死亡数：</span>

                    <span class="todayNumber"  style="color: red;"
                    v-for="(item,index) in today.end">{{item}}</span>
                </div>

            </Cart>
            <Cart cartTitle="出生数据">
                <div class="dingdanText" >
                    <span>出生地点</span>
                    <span>出生性别</span>
                    <span>出生时间</span>
                    <span>是否健康</span>
                </div>
                <!--使用额外的库来做到滚动效果，但是注意vue3-seamless-scroll插件的滚动只能运算一次，而我们
                在对order初始化的时候长度是0，所以就不会进行滚动了，此时我们可以使用一些技巧v-if来避免
                -->
                <div v-if="flag">
                    <vue3-seamless-scroll class="scroll"  step="0.5" :list="orders" hover="true">
                        <div class="dingdanItem" v-for="(item,index) in orders">
                            <div>{{item.from}}</div>
                            <div class="to">{{item.to}}</div>
                            <div class="dateTime" >
                                <div class="date"  style="font-size: 1.8rem;">{{item.date}}</div>
                                <div class="time" style="font-size: 1.5rem;">{{item.time}}</div>
                            </div>

                            <div
                            :class="{
                                statusColor1 : item.status === '否',
                                statusColor2 : item.status === '是',
                                /* statusColor3 : item.status === '配送中',
                                statusColor4 : item.status === '已揽件', */
                                }"
                            >
                                {{item.status}}
                            </div>  
                        </div>
                    </vue3-seamless-scroll> 
                </div>
                


            </Cart>
        </el-col>    

        <el-col :span="12">
            <!--这里我们的cart组件默认是29.8vh，但是map我们是58vh，就导致地图会超出cart，我们只需要单独设置此cart高度就可-->
            <Cart cartTitle="地图展示" style="height: 60.5vh;">
                <!--提供空白div供echarts展示，注意：使用echarts必须要设置宽高，否则不展示-->
                <div id="mapdiv" style="width: 100%; height: 58vh"></div>

            </Cart>
            
        </el-col>        

        <el-col :span="6">
            <Cart cartTitle="男女比例">
                <div id="sex" style="width: 100%; height: 30vh"></div>

                <!-- <v-chart style="min-height: 25vh;" :option="classchartoption" ></v-chart> -->
            </Cart>

            <Cart cartTitle="人员类型">
                <v-chart style="min-height: 25vh;" :option="peoplechartoption" >
                </v-chart>
            </Cart>
        
        </el-col>        
    </el-row>

    <el-row gutter="3">
        <el-col :span="6">
            <Cart cartTitle="出生死亡比" class="dingdanCount">
                <v-chart style="min-height: 25vh;" :option="orderchartoption" ></v-chart>
            </Cart>
        </el-col>        
        <el-col :span="6">
            <Cart cartTitle="热门话题" >
                <div id="reflect" style="height:25vh; position:relative"> </div>
            </Cart>
        </el-col>        
        <el-col :span="6">
            <Cart cartTitle="人口概况" style="height:30vh">
                <v-chart style="min-height: 25vh;" :option="timechartoption"></v-chart>
            </Cart>
        </el-col>        

        <el-col :span="6">
            <Cart cartTitle="人口分布">
                <v-chart style="min-height:25vh;" :option="wangdianchartoption"></v-chart>
            </Cart>
        </el-col>        

    </el-row>


</template>
<script setup>
import Cart from '../components/Cart.vue'; 
import { reactive,onMounted,ref} from 'vue';
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import dayjs from 'dayjs';
//导入工具类
import chartutils from "../assets/js/chartutils";
//导入vue-chart
import VChart, { THEME_KEY } from "vue-echarts";
//axios的导入
import {get_shishiorder,get_map,get_mapdata} from "../request/axios.js"


import * as echarts from "echarts";

import "echarts-wordcloud" 


//地图开始
    
    onMounted(()=>{
        //先根据空白div初始化echarts
        let mCharts = echarts.init(document.getElementById("mapdiv"));
        //发起网络请求
        get_map().then((mapresponse)=>{
            //获取地图信息
            echarts.registerMap("chinaMap", mapresponse.data);
            //只有获取地图信息之后才能继续获取地图上不同地区的具体信息
            get_mapdata().then((arearesponse)=>{

                let option = {
                            geo: {
                                type: "map",
                                map: "chinaMap", //chinaMap需要和registerMap中的第一个参数保持一致
                                roam: true, // 设置允许缩放以及拖动的效果
                                label: {
                                    show: true, //展示标签
                                },
                                zoom: 1.2, //设置初始化的缩放比例
                                // center: [87.617733,43.792818] //设置地图中心点的坐标 （图为将新疆设置为地图中心点）
                            },

                            series: [
                                        {
                                            data: arearesponse.data,
                                            geoIndex: 0,
                                            type: "map",
                                        },
                                    ],
                            //tooltip是鼠标悬浮后提示的信息        
                            tooltip: {
                                show: true, //开启弹窗
                                //指定弹窗格式（文字大小，颜色等）
                                //这里的param就是当前通过arearesponse.data获得的数据,返回值可是一段html代码
                                //``是es6的语法主要是为了可以获取js中的值（通过${}），简化了js的拼接
                                formatter: (param) => { 
                                    let data = `
                                    <div class="map-tooltips">
                                        <div class="name">${param.name}</div>
                                        <div class="name">该地区人口数为：${param.value}</div>
                                    </div>
                                    `;  
                                    return data;
                                },
                            },
                            //label是地图上默认显示的文字（也就是城市名），当然我们也可以更改格式
                            //注意此时的param指代的是原始地图数据
                            label: {
                                    show: true,
                                    color: "#fff",
                                    textAlign: "center",
                                    formatter: (params) => {
                                        return params.name;
                                        },
                                    },                   
                        };
                mCharts.setOption(option);

            })
           
        })
    })
//地图结束

//男女比例开始
    /* let classchartoption = reactive({});    
    let classtext = reactive(['代发货','已揽件','运输中','配送中','已签收','已完成']);
    let classenum = reactive([]);
    for(let i = 0 ;i <6;i++){
        classenum[i] = parseInt(Math.random()*100);
    }
    chartutils.initPictorialBar(classchartoption,classtext,classenum,"#56AAAA") */
    
        
        //数据
        const sexdata = [
            {
                name:'男',
                value:20,
            },
            {
                name:'女',
                value:98,
            },
        ];
        let option2 = {
            title:[
                {
                    subtext: '2021',
                    left: '16.67%',
                    top: '75%',
                    textAlign: 'center'
                    
                },
                {
                    subtext: '2022',
                    left: '50%',
                    top: '75%',
                    textAlign: 'center'
                },
                {
                    subtext: '2023',
                    left: '83.33%',
                    top: '75%',
                    textAlign: 'center'
                }
            ],
            
            series:[
                {
                    type: 'pie',
                    radius: '25%',
                    data: sexdata,
                    right: '66.6667%',
                },
                {
                    type: 'pie',
                    radius: '25%',
                    data: sexdata,
                    left: '33.3333%',
                    right: '33.3333%',
                },
                {
                    type: 'pie',
                    radius: '25%',
                    data: sexdata,
                    left: '66.6667%',
                }
            ]
        };
    


    onMounted(()=>{
        let sexchartoption = echarts.init(document.getElementById("sex"),null,{
            width : 400,
            height : 200 
        });
        sexchartoption.setOption(option2);
    
    });


//男女比例结束

//人员类型开始
    let peoplechartoption = reactive({});
    let peopletext = reactive(['婴幼儿','少年','青年','壮年','老年']);
    let peoplenum = reactive([]);
    for(let i = 0 ;i <5;i++){
        peoplenum[i] = parseInt(Math.random()*1000);
    }
    chartutils.initBarChart(peoplechartoption,peopletext,peoplenum,"#DB7093")
//人员类型结束

//人口分布开始
    let wangdianchartoption = reactive({});
    let wangdiantext = reactive(['二七区','中原区','金水区',
    '惠济区','管族回城区','新郑市','新密市','荣阳区','上街区','巩义市','登封市','中牟县']);
    let wangdiannum = reactive([]);
    for(let i = 0 ;i <12;i++){
        wangdiannum[i] = parseInt(Math.random()*100);
    }
    chartutils.initPieChart(wangdianchartoption,wangdiantext,wangdiannum)
//人口分布结束

//人口概况开始

    let timechartoption = reactive({});
    let timetext = reactive(['10岁以下','10-20岁','20-30岁','30-40岁','40-50岁','50-60岁','60-70岁','70-80岁','80岁以上']);
    let timenum = reactive([]);
    for(let i = 0 ;i <9;i++){
        timenum[i] = parseInt(Math.random()*1000);
    }
    chartutils.initRadarChart(timechartoption,timetext,timenum)
//人口概况结束

//热门话题开始
    //设置投诉数据
    let reflectData = [
        {
            name:'老龄化',
            value:100,
            textStyle:{
                color:'#FF00FF',
            }
        },
        {
            name:'患病率高',
            value:15,
            textStyle:{
                color:'#AA58FF',
            }
        },
        {
            name:'男女比例失衡',
            value:37,
            textStyle:{
                color:'#B0E0E6',
            }
        },
        {
            name:'死亡率高',
            value:48,
            textStyle:{
                color:'#8B008B',
            }
        },
        {
            name:'出生率低',
            value:52,
            textStyle:{
                color:'#9932CC',
            }
        },
    ];
    
    //因为echart没有提供工具类，所以需要先手动写
    let option = {
        tooltip: {
            show: true,
            position: "top",
            textStyle: { fontSize: 14}
        },
        series: [
        {
            type: "wordCloud",
            // 网格大小，各项之间间距
            gridSize: 20,
            // 字体大小范围
            sizeRange: [25, 37],
            // 文字旋转角度范围
            rotationRange: [0, 100],
            // 旋转步值
            rotationStep: 55,
            // 画布宽
            width: "100%",
            // 画布高
            height: "100%",
            // 是否渲染超出画布的文字
            drawOutOfBound: false,
            data: reflectData
        }]
    };

    //注意需要在挂载之后才能去执行init方法，因此使用onMount方法
    onMounted(()=>{
    let reflectChart = echarts.init(document.getElementById("reflect"));
        reflectChart.setOption(option);
    
    });
//热门话题结束


//今日概括开始
    let today = reactive({
        in:"000000",
        end:"000000",
        run:"000000"
    });

    const random = ()=>{
        let code = "";
        for (let i = 3;i < 6 ; i++){
            code += parseInt(Math.random()*10)
        } 
        return code;
    }
    today.in = "000"+random();
    today.end = "000"+random();
    today.run = "000"+random();

    //固定时间自动改变（轮询器）
    const timer = setInterval(function(){
        today.in = "000"+random();
        today.end ="000"+ random();
        today.run = "000"+random();
    },3000)

//今日概况结束


 //出生数据开始
    
   

    //数据其实是后端传递过来的（有个坑点：）
    /*ref和reactive都是设置响应式数据，但是ref用于简单数据，当然也可以复杂数据
      reactive用于数组等复杂数据，因为一旦复杂数据的属性发生变化就可以被检测到，但是整体变化是无法检测的
      但是我们的要求又是整体更换数组，所以我们使用ref去包裹复杂数据（数组）
    */
    let flag = ref(false);
    let orders = ref([]);

//发起网络请求（使用axios.js中定义的方法）
/*shishiorder()调用声明好的网络请求对象
then()表示网络请求完成后的回调函数
then的参数是一个函数,表示网络请求之后执行，其参数就是响应后的内容（通过data获取到）
*/
    get_shishiorder().then((response)=>{
        //更改orders的值run
        orders.value = response.data;
        flag.value = true;
    })

 //出生数据结束


 //出生死亡比开始
    //定义好相关数据
    let orderchartoption = reactive({});
    let orderX  = reactive([]);
    let orderY = reactive([]);
    //获取七天前的日期，然后循环即可获取七天
    let day = new Date();
    day.setFullYear(day.getFullYear() - 5);
    
    for(let i =1 ;i<=6;i++){
        orderX.push(dayjs(day).format("YYYY"));
        orderY.push(parseInt(Math.random()*10));
        day.setFullYear(day.getFullYear() + 1);
    }

    //使用工具类调用
   chartutils.initLineChart(orderchartoption,orderX,orderY,"#9400D3");

//订单统计结束


 </script>
<style scoped="scoped">


/**出生数据开始 */
.dingdanText{
    background-color: aqua;
    padding: 4px;
    font-size: 1.8rem;
    font-weight: 700;
    display: flex;
    /**均分对齐 */
    justify-content: space-around;
}
.dingdanItem{
    display: flex;
    justify-content: space-around;
    font-size: 1.5rem;
    margin-bottom: 10px;
}


.scroll{ 
    overflow: hidden;  /**超出数据隐藏 */
    height: 22vh;

}

.to{
    margin-left: 1vh;
}



.statusColor1{
    color: rgba(255, 0, 0, 0.924); /**不健康 */
}
.statusColor2{
    color: #2bff00e8;  /**建康 */
}
.statusColor3{
    color: #ffff00d4; /**配送中 */
}
.statusColor4{
    color: yellow;  /**已揽件 */
}

/**出生数据结束 */




/**今日概况开始 */

.todayItem{
    margin-top: 2vh;
    margin-bottom: 6vh;
}
.todayText{
    font-size: 1.6rem;
    font-weight: bold;
    display: inline-block;
    text-align: center;
    /* margin-top: 1vh; */
    color: #ffff0033;
    width: 8vh;
}

.todayNumber{
    background: #ffffff22;
    font-size: 3rem;
    display: inline-block;
    width: 4.5vh;
    height: 6vh;
    text-align: center;
    line-height: 6vh;
    margin-left: 1vh;
    margin-top: 2vh;
    border: 0.0625rem solid #00CAFF33;
}

/**今日概况结束 */


</style>