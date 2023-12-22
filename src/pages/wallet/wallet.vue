<script setup lang="ts">
import { getWalletBalanceAPI } from '@/apis/user'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 钱包余额
const walletBalance = ref(0)

// 获取用户钱包余额
const getWalletBalance = async () => {
  try {
    const res = await getWalletBalanceAPI()
    if (res.code === 0) {
      walletBalance.value = res.data
    }
  } catch (err) {
    console.log('出错了', err)
  }
}

onShow(() => {
  getWalletBalance()
})

// 点击充值的处理函数
const rechargeHandler = () => {
  uni.navigateTo({
    url: '/pages/recharge/recharge',
  })
}
</script>

<template>
  <view class="wallet">
    <view class="balance">
      <text>余额</text>
      <text class="amount">{{ walletBalance }}</text>
    </view>
    <button class="recharge" @tap="rechargeHandler">充值</button>
  </view>
</template>

<style lang="scss">
page {
  width: 100%;
  height: 100vh;
  background-color: #eee;

  .wallet {
    padding: 20rpx;

    .balance {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 200rpx;
      background-color: #1e90ff;
      border-radius: 10rpx;
      font-size: 40rpx;
      color: #fff;

      .amount {
        color: orange;
        margin-left: 10rpx;
      }
    }

    .recharge {
      margin-top: 20rpx;
      background-color: $uni-color-primary;
      color: #fff;
    }
  }
}
</style>
