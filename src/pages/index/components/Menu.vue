<script setup lang="ts"></script>

<template>
  <view class="outer">
    <navigator url="/pages/placeOrder/placeOrder?orderType=0" class="item">
      <image class="img" src="/static/home/express.png" />
      <view class="text">代拿快递</view>
    </navigator>
    <navigator url="/pages/placeOrder/placeOrder?orderType=1" class="item">
      <image class="img" src="/static/home/meals.png" />
      <view class="text">代取餐品</view>
    </navigator>
    <navigator url="/pages/placeOrder/placeOrder?orderType=2" class="item">
      <image class="img" src="/static/home/snack.png" />
      <view class="text">代买零食</view>
    </navigator>
  </view>
</template>

<style lang="scss">
.outer {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;

  .item {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    .img {
      width: 80rpx;
      height: 80rpx;
    }

    .text {
      font-size: 30rpx;
      margin-top: 10rpx;
    }
  }
}
</style>
