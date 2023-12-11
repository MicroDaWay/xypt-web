<script setup lang="ts"></script>

<template>
  <view class="protocol">
    <view class="title">校园跑腿小程序用户协议</view>
    <view class="welcome">
      欢迎使用校园跑腿小程序（以下简称“本小程序”）。在使用本小程序之前，请您仔细阅读并同意遵守本用户协议。若您不同意本协议的任何内容，请立即停止使用本小程序。
    </view>
    <view class="first">服务概述</view>
    <view class="first-text"
      >本小程序为用户提供跑腿服务，包括但不限于食品外送、快递、购物等多元化服务。</view
    >
    <view class="first-text"
      >用户通过本小程序下单，即视为同意接受相应的服务，并遵守本用户协议。</view
    >
    <view class="first">协议的修改与解释</view>
    <view class="first-text"
      >修改权利：本小程序有权在必要时修改本协议，修改后的协议将在本小程序生效，用户应定期查阅协议内容。</view
    >
    <view class="first-text">解释权利：本协议的解释权归本小程序所有。</view>
    <view class="first">联系我们</view>
    <view class="first-text">若您对本用户协议有任何疑问或建议，请联系我们：18012345678</view>
    <view class="first-text">感谢您的使用！</view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #eee;

  .protocol {
    margin: 20rpx;
    padding: 20rpx;
    background-color: #fff;

    .title {
      font-size: 40rpx;
      text-align: center;
      font-weight: bold;
    }

    .welcome {
      text-indent: 2em;
      margin: 20rpx 0;
    }

    .first {
      font-weight: bold;
    }

    .first-text {
      text-indent: 2em;
      margin: 10rpx 0;
    }
  }
}
</style>
