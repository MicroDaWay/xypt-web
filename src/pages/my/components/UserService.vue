<script setup lang="ts"></script>

<template>
  <view class="service">
    <view class="service-text">用户服务</view>
    <view class="container">
      <navigator class="outer" url="/pages/address/address">
        <img class="img" src="/static/my/address.png" />
        <text class="bottom-text">我的地址</text>
      </navigator>
      <navigator class="outer" url="/pages/income/income">
        <img class="img" src="/static/my/income.png" />
        <text class="bottom-text">收支明细</text>
      </navigator>
      <navigator class="outer" url="/pages/evaluate/evaluate">
        <img class="img" src="/static/my/evaluate.png" />
        <text class="bottom-text">评价中心</text>
      </navigator>
      <navigator class="outer" url="/pages/wallet/wallet">
        <img class="img" src="/static/my/wallet.png" />
        <text class="bottom-text">我的钱包</text>
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
