<script setup lang="ts">
import { orderStateList } from '@/apis/constant'
import { getOrderAPI } from '@/apis/order'
import OrderItem from '@/components/OrderItem.vue'
import type { PlaceOrderParams } from '@/types/order'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 当前选中的tabBar的索引
const activeIndex = ref(0)

// 切换tabBar
const changeTab = (index: number) => {
  activeIndex.value = index
  getOrderList(index)
}

// 订单列表
const orderList = ref<PlaceOrderParams[]>([])

// 获取订单列表
const getOrderList = async (orderState = 0) => {
  try {
    const res = await getOrderAPI(orderState)
    if (res.code === 0) {
      orderList.value = res.data
    }
  } catch (err) {
    console.log('出错了', err)
  }
}

onShow(() => {
  getOrderList()
})
</script>

<template>
  <view class="order">
    <view class="tab-bar">
      <view
        class="tab-item"
        :class="{ active: activeIndex === index }"
        v-for="(item, index) in orderStateList"
        :key="item.orderState"
        @tap="changeTab(index)"
        >{{ item.value }}</view
      >
    </view>
    <view class="list" v-if="orderList.length">
      <OrderItem
        type="order"
        :order-list="orderList"
        @update-order-state="getOrderList"
      ></OrderItem>
    </view>
    <view v-else class="no-order">暂无订单</view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #eee;

  .order {
    .tab-bar {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 80rpx;
      padding: 0 10rpx;
      background-color: #eee;

      .tab-item {
        font-size: 26rpx;
        padding-bottom: 10rpx;
        margin: 0 10rpx;
      }

      .active {
        color: #006eff;
        border-bottom: 2px solid #006eff;
      }
    }

    .list {
      padding: 80rpx 20rpx 20rpx;
    }

    .no-order {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40rpx;
      height: 100rpx;
    }
  }
}
</style>
