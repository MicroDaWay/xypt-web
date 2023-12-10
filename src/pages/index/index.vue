<script setup lang="ts">
import { getPendingOrdersAPI } from '@/apis/order'
import { useUserStore } from '@/store/modules/user'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import HomeBanner from './components/HomeBanner.vue'
import Menu from './components/Menu.vue'
import NoticeBar from './components/NoticeBar.vue'
import type { PlaceOrderParams } from '@/types/order'
import OrderItem from '@/components/OrderItem.vue'

const userStore = useUserStore()

// 待接单的订单
const pendingOrders = ref<PlaceOrderParams[]>([])

// 获取待接单的订单
const getPendingOrders = async () => {
  try {
    const res = await getPendingOrdersAPI()
    if (res.code === 0) {
      pendingOrders.value = res.data
    }
  } catch (err) {
    console.log('出错了', err)
  }
}

onShow(() => {
  if (userStore.userInfo.role === 2) {
    getPendingOrders()
  }
})
</script>

<template>
  <view class="home">
    <HomeBanner></HomeBanner>
    <NoticeBar></NoticeBar>
    <Menu></Menu>
    <view>
      <view class="order-text">跑腿订单</view>
      <OrderItem
        v-if="pendingOrders.length"
        @update-order-state="getPendingOrders"
        type="home"
        :order-list="pendingOrders"
      ></OrderItem>
      <view v-else class="no-order">暂无订单</view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  width: 100%;
  height: 100vh;
  background-color: #eee;
}

.home {
  padding: 20rpx;

  .notice-bar {
    margin: 20rpx 0;
  }

  .order-text {
    padding: 20rpx;
    margin: 20rpx 0;
    background-color: #fff;
    color: #2979ff;
  }

  .no-order {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40rpx;
    height: 100rpx;
  }
}
</style>
