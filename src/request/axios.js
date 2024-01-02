//用于封装所有的网络请求，抽取出来使用时候直接调用即可


//1.导入axios
import axios from "axios";

//2.创建实例对象(公共部分)
const instance = axios.create({
    baseURL: 'http://localhost:5173', //基础（公共）路径
    timeout: 10000,    //超时时间（单位是毫秒ms）
    headers: {         //设置请求头，传输格式是json并且设置编码格式
    'Content-Type': 'application/json;charset=UTF-8',
    }
})


//3.编写不同的网络请求（基于axios对象发起请求,也就是调用对象的get方法即可）
//注意这种暴露默认名字就是 get_shishiorder

//获取实时订单请求
export const get_shishiorder = ()=>{

    return instance.get("/shishiorder");
};

//获取地图请求
export const get_map = ()=>{
    return instance.get("/map");
}

//获取每个地区详细数据
export const get_mapdata = ()=>{
    return instance.get("/mapdata");
}

//各状态占比
export const getgezhuangtai=()=>{

    return instance.get("/gezhuangtai")
  }




