<script setup lang="ts"></script>

<template>
  <view class="platform">
    <view class="welcome">欢迎使用校园跑腿小程序！</view>
    <view class="introduce">
      校园跑腿小程序是一款专注于为校园用户提供便捷生活服务的平台。无论你是需要外卖、快递、购物、打印文件，还是其他生活琐事，我们的跑腿小程序都能为你提供高效、安全、贴心的服务。
    </view>
    <view class="join">欢迎加入我们的校园跑腿小程序，让生活更加便捷和愉快！</view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #eee;

  .platform {
    margin: 20rpx;
    padding: 20rpx;
    background-color: #fff;

    .welcome {
      text-align: center;
      font-weight: bold;
      font-size: 50rpx;
    }

    .introduce {
      text-indent: 2em;
      margin: 20rpx 0;
    }

    .join {
      text-indent: 2em;
    }
  }
}
</style>
