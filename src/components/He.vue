<script setup>
/* //vue3中需要先引入后使用钩子函数,vue3的生命周期会在前面加上一个on
//然后是mount函数的使用，需要传递一个参数，但是这个参数仍然是一个函数
import { onMounted } from 'vue';
onMounted(function(){});
//当然如果函数有名字则是使用变量赋值
const ji = ()=>{
sss
}
//这里使用箭头函数，他是es6提供的一个箭头函数 (又被叫做hook)，当函数没有名字时候可以使用箭头函数
onMounted(()=>{}); */

import { ref } from 'vue';
let number = ref(0);
const  change =  ()=>{
  number.value++;
}
</script>
<template>

<button @click="change()">{{number}}</button>

</template>


<style scoped="scoped">
</style>