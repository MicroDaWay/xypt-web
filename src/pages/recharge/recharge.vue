<script setup lang="ts">
import { payAPI } from '@/apis/user'
import { ref } from 'vue'

const moneyList = ref([5, 10, 20, 50, 100, 200])
// 当前选中的金额的索引
const activeIndex = ref(0)

// 切换金额大小
const changeMoney = (index: number) => {
  activeIndex.value = index
}

// 点击支付的处理函数
const payHandler = async () => {
  try {
    const res = await payAPI({
      money: moneyList.value[activeIndex.value],
    })
    if (res.code === 0) {
      uni.showToast({
        icon: 'success',
        title: '支付成功',
      })

      setTimeout(() => {
        uni.navigateBack()
      }, 1000)
    } else {
      uni.showToast({
        icon: 'fail',
        title: '支付失败',
      })
    }
  } catch (err) {
    console.log('出错了', err)
  }
}
</script>

<template>
  <view class="recharge">
    <view
      class="item"
      :class="{ active: activeIndex === index }"
      v-for="(item, index) in moneyList"
      :key="item"
      @tap="changeMoney(index)"
      >￥{{ item }}</view
    >
    <button class="pay" @tap="payHandler">支付</button>
  </view>
</template>

<style lang="scss">
page {
  width: 100%;
  height: 100vh;
  background-color: #eee;

  .recharge {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    margin: 20rpx;
    background-color: #fff;
    border-radius: 10rpx;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200rpx;
      height: 150rpx;
      margin: 20rpx 0;
      border: 1px solid #aaa;
      border-radius: 20rpx;
      font-size: 40rpx;
    }

    .pay {
      width: 92%;
      background-color: #f44336;
      color: #fff;
      margin: 50rpx 0;
    }

    .active {
      background-color: #f44336;
      color: #fff;
      border: none;
    }
  }
}
</style>
