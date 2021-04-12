<template>
  <!-- scrolltolower 滚动条触底事件 -->
  <scroll-view
    @scrolltolower="handleToLower"
    class="recommend_view"
    scroll-y
    v-if="recommends.length > 0"
  >
    <!-- 推荐开始 -->
    <view class="recommend_wrap">
      <view class="recommend_item" v-for="item in recommends" :key="item.id">
        <!-- mode  微信小程序开发 图片自适应-->
        <image mode="widthFix" :src="item.thumb"></image>
      </view>
    </view>
    <!-- 推荐结束 -->
    <!-- 月份开始 -->
    <view class="months_wrap">
      <view class="months_title">
        <view class="months_title_info">
          <view class="months_info">
            <text> {{ months.DD }} /</text>
            {{ months.MM }} 月
          </view>
          <view class="mouths_text">{{ months.title }}</view>
        </view>
        <view class="months_title_more">更多 > </view>
      </view>
      <view class="months_content">
        <view class="months_item" v-for="item in months.items" :key="item.id">
          <image
            mode="aspectFill"
            :src="item.thumb + item.rule.replace('$<Height>', 360)"
          ></image>
        </view>
      </view>
    </view>
    <!-- 月份结束 -->

    <!-- 热门开始 -->
    <view class="hots_wrap">
      <view class="hots_title">
        <text>热门</text>
      </view>
      <view class="hots_content">
        <view class="hot_item" v-for="item in hots" :key="item.id">
          <image mode="widthFix" :src="item.thumb"></image>
        </view>
      </view>
    </view>
    <!-- 热门结束 -->
  </scroll-view>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      recommends: [],
      months: {},
      hots: [],
      // 请求参数
      params: {
        // 要获取几条数据
        limit: 30,
        // 关键字
        order: "hot",
        // 要跳过几条  获取第一页数据跳过0条 获取第二页数据跳过limit条
        skip: 0,
      },
      // 是否还有下一页
      hasMore:true
    };
  },
  mounted() {this.getList()},
  // 滚动条触底事件
  methods: {
    // 获取接口数据
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
        data: this.params,
      }).then((result) => {
        // console.log(result.data);
        // 判断还有没有下一页数据
        if(result.data.res.vertical === 0){
          this.hasMore = false;
          return;

        }
        if(this.recommends.length ===0){ //第一次发送请求
        // 推荐模块
        this.recommends = result.data.res.homepage[1].items;
        // 月份模块
        this.months = result.data.res.homepage[2];

        // 将时间戳 号/月 moment .js库 npm install moment
        this.months.MM = moment(this.months.stime).format("MM");
        this.months.DD = moment(this.months.stime).format("DD");
        }
       

        // 获取热门数据列表
        this.hots = [...this.hots,...result.data.res.vertical];
      });
    },
    handleToLower() {
    //  1.修改请求参数 skip +=limit;
    //  2.重新发送请求 getList()
    //  3.请求回来成功 hots 数据叠加
    if(this.hasMore){
        this.params.skip += this.params.limit;
        this.getList();
    }else{
      uni.showToast({
        title:"没有数据",
        icon:"none"
      })
    }
  

    },
  },
};
</script>

<style lang="scss" scoped>
.recommend_view {
  // height:屏幕高度-标题高度
  height: calc(100vh - 36px);
}
.recommend_wrap {
  display: flex;
  flex-wrap: wrap;
  .recommend_item {
    width: 50%;
    border: 3rpx solid #fff;
  }
}
.months_wrap {
  .months_title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    .months_title_info {
      color: $color;
      font-size: 30rpx;
      font-weight: 600;
      display: flex;
      .months_info {
        text {
          font-size: 36rpx;
        }
      }

      .mouths_text {
        font-size: 34rpx;
        color: #666;
        margin-left: 30rpx;
      }
    }

    .months_title_more {
      font-size: 24rpx;
      color: $color;
    }
  }

  .months_content {
    display: flex;
    flex-wrap: wrap;
    .months_item {
      width: 33.33%;
      border: 5rpx solid #fff;
      // margin-left: 10rpx;
    }
  }
}
.hots_wrap {
  .hots_title {
    padding: 20rpx;
    text {
      border-left: 20rpx solid $color;
      font-size: 36rpx;
      padding-left: 20rpx;
      font-weight: 600;
    }
  }

  .hots_content {
    display: flex;
    flex-wrap: wrap;
    .hot_item {
      width: 33.3%;
      border: 5rpx solid #fff;
      image {
      }
    }
  }
}
</style>
