<template>
    <view @click= "handleClick">
        <slot></slot>
    </view>
</template>

<script>
    export default {
        props:{
            list:Array,
            index:Number,
        },
        methods:{
        handleClick(){
            // 将数据缓存下来
            getApp().globalData.imgList = this.List;
            getApp().globalData.imgList = this.index;
            // 实现跳转
            uni.navigateTo({
                url:"/pages/imgDetail/index"
            })


        }
        }
      
    }
</script>

<style lang="scss" scoped>

</style>