<template>
    <view>
        <view class="user_info">
            <view class="user_icon">
                <image mode="widthFix" :src="imgDetail.user.avatar">
                </image>
                <view class="user_desc">
                    <view class="user_name">
                        {{imgDetail.user.name}}
                    </view>
                    <view class="user_time">
                        {{imgDetail.user.atime}}
                    </view>
                </view>
            </view>
        </view>
        <!-- 图片详情 -->
    </view>
</template>

<script>
    export default {
        data() {
            return {
                // 图片信息对象
                imaDetail: {}
            }
        },
        onLoad(){
            // console.log(getApp().globalData)
            const {imgList,imgIndex} =getApp().globalData;
            this.imaDetail=imgList[imgList];
        }
    }
</script>

<style lang="scss" scoped>

</style>