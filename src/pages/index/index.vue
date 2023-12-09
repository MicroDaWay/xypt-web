<script setup lang="ts">
import { getPendingOrdersAPI } from '@/apis/order'
import { useUserStore } from '@/store/modules/user'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import HomeBanner from './components/HomeBanner.vue'
import Menu from './components/Menu.vue'
import NoticeBar from './components/NoticeBar.vue'
import type { PlaceOrderParams } from '@/types/order'

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
    console.log(res)
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
    <HomeBanner class="banner"></HomeBanner>
    <NoticeBar></NoticeBar>
    <Menu></Menu>
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
}
</style>
