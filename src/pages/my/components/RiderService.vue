<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
</script>

<template>
  <view class="service">
    <view class="service-text">骑手服务</view>
    <view class="container">
      <navigator class="outer" url="/pages/certification/certification">
        <img class="img" src="/static/my/rider_certification.png" />
        <text class="bottom-text">骑手认证</text>
      </navigator>
      <navigator
        v-if="userStore.userInfo.role === 0 || userStore.userInfo.role === 2"
        class="outer"
        url="/pages/riderOrder/riderOrder"
      >
        <img class="img" src="/static/my/rider_order.png" />
        <text class="bottom-text">骑手订单</text>
      </navigator>
      <navigator v-if="userStore.userInfo.role === 0" class="outer" url="/pages/examine/examine">
        <img class="img" src="/static/my/examine.png" />
        <text class="bottom-text">骑手审核</text>
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
.service {
  background-color: #fff;
  padding: 20rpx;
  margin: 20rpx 0;

  .service-text {
    font-size: 32rpx;
    font-weight: bold;
    margin: 0 0 20rpx 30rpx;
  }

  .container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .outer {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;

      .img {
        width: 80rpx;
        height: 80rpx;
      }

      .bottom-text {
        font-size: 26rpx;
      }
    }
  }
}
</style>
