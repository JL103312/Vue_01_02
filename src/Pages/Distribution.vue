 <template>
<!--gutter指定列之间间隔   span指定行之间-->
<el-row :gutter="10" style="margin:0;padding:0;margin-top: 1vh;">
    <el-col :span="12"> 
        <Cart2 cartTitle="患病年龄分析">
            <v-chart style="min-height:39vh;" :option="diseaseagechartoption" >
            </v-chart>
        </Cart2>
    </el-col>

    <el-col :span="12">
        <Cart2 cartTitle="患病人群分析">
            <v-chart style="min-height:39vh;" :option="diseasepeoplechartoption" >
            </v-chart>
        </Cart2>
    </el-col>

</el-row>
<el-row :gutter="10"  style="margin:0;padding:0;margin-top: 1vh;">
    <el-col :span="12">
        <Cart2 cartTitle="疾病致死人数">
            <div id="gezhuangtai" style="width: 100%; height: 45vh"></div>
        </Cart2>
    </el-col>

    <el-col :span="12">
        <Cart2 cartTitle="疾病区域分析"  >
            <v-chart style="min-height:39vh;" :option="diseaseareachartoption" >
            </v-chart>
        </Cart2>
    </el-col>
</el-row>


 </template>
<script setup>
import Cart2 from '../components/Cart2.vue'; 
import { reactive,onMounted,ref} from 'vue';
import chartutils from "../assets/js/chartutils";
import VChart, { THEME_KEY } from "vue-echarts";
import * as echarts from "echarts";

import {getgezhuangtai} from "../request/axios.js"

//患病年龄分析开始
    let diseaseagechartoption = reactive({});
    let orderX  = reactive(['20以下','20-40','40-60','60-80','80以上']);
    let orderY = reactive([45,21,52,63,90]);

    chartutils.initLineChart(diseaseagechartoption,orderX,orderY,"#B22222");

//患病年龄分析结束


//患病人群分析开始
    let diseasepeoplechartoption = reactive({});    
    let classtext = reactive(['新生儿','少年','青年','壮年','暮年','老年']);
    let classenum = reactive([18,21,11,6,35,76]);
   
    chartutils.initPictorialBar(diseasepeoplechartoption,classtext,classenum,"#56AAAA")
//患病人群分析结束


//死亡率分析开始
    onMounted(() => {
  // 使用echarts对div进行初始化
  let chart = echarts.init(document.getElementById("gezhuangtai"));

  getgezhuangtai().then((resp) => {
    let data = resp.data;
    // 提供配置对象
    let option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
        textStyle: {
          fontSize: 16,
          color: "#B0CEFC",
        },
      },
      series: [
        {
          name: "疾病致死人数",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: data,
        },
      ],
    };
    // 使配置生效
    chart.setOption(option);
  });
});


//死亡率分析结束



//死亡区域分布开始
    let diseaseareachartoption = reactive({});
    let wangdiantext2 = reactive(['二七区','中原区','金水区',
    '惠济区','管族回城区','新郑市','新密市','荣阳区','上街区','巩义市','登封市','中牟县']);
    let wangdiannumber2 = reactive([56,78,95,12,45,45,63,5,65,12,56,35]);
    chartutils.initPieFullChart(diseaseareachartoption,wangdiantext2,wangdiannumber2)
//死亡区域分布结束


 </script>
<style scoped="scoped">

.ji{
    margin-top: 5px;
    background-color: aquamarine;
    height: 45vh;
}

Cart{
    height: 45vh;
}
</style>