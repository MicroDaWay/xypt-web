<script setup lang="ts">
import { getRiderOrderAPI } from '@/apis/order'
import OrderItem from '@/components/OrderItem.vue'
import type { PlaceOrderParams } from '@/types/order'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 骑手订单
const riderOrderList = ref<PlaceOrderParams[]>([])

const getRiderOrder = async () => {
  try {
    const res = await getRiderOrderAPI()
    if (res.code === 0) {
      riderOrderList.value = res.data
    }
  } catch (err) {
    console.log('出错了', err)
  }
}

onLoad(() => {
  getRiderOrder()
})
</script>

<template>
  <view class="rider-order">
    <OrderItem
      v-if="riderOrderList.length"
      type="riderOrder"
      :order-list="riderOrderList"
      @update-order-state="getRiderOrder"
    ></OrderItem>
    <view v-else class="no-order">暂无订单</view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #eee;

  .rider-order {
    padding: 0 20rpx 20rpx;
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
