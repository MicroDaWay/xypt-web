<script setup lang="ts">
import { getOrderByIdAPI } from '@/apis/order'
import type { PlaceOrderParams } from '@/types/order'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const props = defineProps<{
  id: number
}>()

const orderDetails = ref<PlaceOrderParams>({} as PlaceOrderParams)

// 获取订单详情
const getOrderById = async () => {
  try {
    const res = await getOrderByIdAPI(props.id)
    if (res.code === 0) {
      orderDetails.value = res.data
    }
  } catch (err) {
    console.log('出错了', err)
  }
}

onLoad(() => {
  getOrderById()
})
</script>

<template>
  <view class="order-details">
    <view>
      <view class="item">
        <text class="first-text">物品名称：</text>
        <text>{{ orderDetails.tradeName }}</text></view
      >
      <view class="item">
        <text class="first-text">物品描述：</text>
        <text>{{ orderDetails.desc }}</text></view
      >
      <view class="item">
        <text class="first-text">小费：</text>
        <text class="fee">{{ orderDetails.fee }}</text></view
      >
      <view class="item">
        <text class="first-text">下单时间：</text>
        <text>{{ orderDetails.createTime }}</text></view
      >
      <view class="item">
        <text class="first-text">备注：</text>
        <text>{{ orderDetails.note }}</text></view
      >
      <view class="item">
        <text class="first-text">下单人姓名：</text>
        <text>{{ orderDetails.payUserName }}</text></view
      >
      <view class="item">
        <text class="first-text">下单人地址：</text>
        <text>{{ orderDetails.payUserAddress }}</text></view
      >
      <view class="item">
        <text class="first-text">下单人电话：</text>
        <text>{{ orderDetails.payUserPhone }}</text></view
      >
      <view class="item">
        <text class="first-text">接单人姓名：</text>
        <text>{{ orderDetails.receiveUserName }}</text></view
      >
      <view class="item">
        <text class="first-text">接单人电话：</text>
        <text>{{ orderDetails.receiveUserPhone }}</text></view
      >
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #eee;

  .order-details {
    margin: 20rpx;
    padding: 20rpx;
    background-color: #fff;
    border-radius: 10rpx;

    .item {
      margin: 20rpx 0;

      .first-text {
        font-weight: bold;
      }

      .fee {
        color: red;

        &::before {
          content: '￥';
          font-size: 26rpx;
        }
      }
    }
  }
}
</style>
