
<template>
    <div class="cart">
        <!--卡片左上角的内容不确定，所以需要确定成属性，使用的时候外部传入-->
        <div class="carttitle">{{cartTitle}}</div>
        <div>  
            <slot></slot>
        </div>

        <!--使用八个div来实现四角的边框-->
        <div class="topLeft1 boder_line"></div>
        <div class="topLeft2 boder_line"></div>
        <div class="topRight1 boder_line"></div>
        <div class="topRight2 boder_line"></div>
        <div class="boLeft1 boder_line"></div>
        <div class="boLeft2 boder_line"></div>
        <div class="boRight1 boder_line"></div>
        <div class="boRight2 boder_line"></div>
    </div>

</template>

<script setup>
    /**     在vue3中我们使用defineProps函数来指定外部传入属性，此函数的参数传递是一个对象
     *格式：属性名：属性类型  （指定之后我们就可在外部使用,而对应的slot的内容是写在cart中的内容
     */
    import { defineProps } from 'vue';


    const props = defineProps({
        cartTitle:String
    });

</script>






<style scoped="scoped">
.cart{
    border: 0.1vh solid  black      ;
    /** 父元素开启定位，目的是为了是其子元素可以定位移动*/
    position: relative; 
    padding-top: 0.3vh;
    padding-left: 0.2vh;
    margin: 0.3vh;
    height: 45vh;
}
.carttitle{
    font-size: 4rem;
    font-weight: bold;
    /**渐变色，从右向左，按照指定颜色进行变色 */
    background: linear-gradient(to left, #2196f3, #10f7d7, #1688e9);
    /**以盒子内的文字作为裁剪区域向外裁剪，文字之外的区域都将被裁剪掉 */
    -webkit-background-clip: text;
    /**将字体设置为透明*/
    color: transparent;
    text-align: center;
}


.boder_line{
    position: absolute;
    background: #0adbfa;
}

.topLeft1 {
    top: 0;
    left: 0;
    width: 0.8vw;
    height: 0.2vh;
}

.topLeft2{
    top: 0.8vh;
    left: -0.4vw;
    width: 0.8vw;
    height: 0.2vh;
    /**动画  旋转 */
    transform: rotate(90deg);
}
.topRight1 {
    top: 0;
    right: 0;
    width: 0.8vw;
    height: 0.2vh;
}
.topRight2 {
    top: 0.8vh;
    right: -0.4vw;
    width: 0.8vw;
    height: 0.2vh;
    /**元素旋转90度 */
    transform: rotate(90deg);
}
.boLeft1{
    bottom: -0.1vh;
    left: -0.1vh;
    width: 0.8vw;
    height: 0.2vh;
}
.boLeft2 {
    bottom: 0.6vh;
    left: -0.4vw;
    width: 0.8vw;
    height: 0.2vh;
    transform: rotate(90deg);
}
.boRight1 {
    bottom: -0.1vh;
    right: 0;
    width: 0.8vw;
    height: 0.2vh;
}
.boRight2 {
    bottom: 0.6vh;
    right: -0.4vw;
    width: 0.8vw;
    height: 0.2vh;
    transform: rotate(90deg);
}



</style>