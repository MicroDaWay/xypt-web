<script setup lang="ts">
import { getOrderAPI } from '@/apis/order'
import type { PlaceOrderParams } from '@/types/order'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 订单状态列表
const orderStateList = ref([
  { orderState: 0, value: '全部订单' },
  { orderState: 1, value: '待接单' },
  { orderState: 2, value: '待送达' },
  { orderState: 3, value: '待收货' },
  { orderState: 4, value: '待评价' },
  { orderState: 5, value: '已取消' },
])

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

// 获取orderType的值
const getOrderTypeValue = (orderType: number) => {
  if (orderType === 0) {
    return '快递'
  } else if (orderType === 1) {
    return '餐品'
  } else if (orderType === 2) {
    return '零食'
  }
}

// 根据orderType获取背景颜色
const getBackgroundColor = (orderType: number) => {
  if (orderType === 0) {
    return '#2979ff'
  } else if (orderType === 1) {
    return '#18bc37'
  } else if (orderType === 2) {
    return 'orange'
  }
}
</script>

<template>
  <view class="order">
    <view class="tab-bar">
      <view
        class="tab-item"
        @tap="changeTab(index)"
        v-for="(item, index) in orderStateList"
        :key="item.orderState"
        :class="{ active: activeIndex === index }"
        >{{ item.value }}</view
      >
    </view>
    <view class="order-list">
      <view class="order-item" v-for="item in orderList" :key="item.id">
        <view class="top">
          <view class="left">
            <text class="type" :style="{ backgroundColor: getBackgroundColor(item.orderType) }">{{
              getOrderTypeValue(item.orderType)
            }}</text>
            <text>{{ item.tradeName }}</text>
          </view>
          <view class="right">
            <text>跑腿费</text>
            <view class="fee">
              <text class="rmb">￥</text>
              <text class="money">{{ item.fee }}</text>
            </view>
          </view>
        </view>
        <view class="bottom">
          <view class="state">{{ orderStateList[item.orderState].value }}</view>
          <view class="delete">
            <uni-icons type="trash" size="20"></uni-icons>
            <text class="delete-text">删除</text>
          </view>
        </view>
      </view>
    </view>
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
      margin: 20rpx;

      .tab-item {
        font-size: 28rpx;
        padding-bottom: 10rpx;
        margin: 0 10rpx;
      }

      .active {
        color: #006eff;
        border-bottom: 2px solid #006eff;
      }
    }

    .order-list {
      .order-item {
        padding: 20rpx;
        margin: 20rpx;
        background-color: #fff;
        border-radius: 10rpx;

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10rpx;

          .left {
            .type {
              margin-right: 20rpx;
              color: #fff;
              border-radius: 10rpx;
              padding: 0 10rpx;
            }
          }

          .right {
            display: flex;

            .fee {
              color: #e43d33;
              margin-left: 10rpx;

              .rmb {
                font-size: 22rpx;
              }
            }
          }
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .state {
            color: #666;
          }

          .delete {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .delete-text {
              font-size: 28rpx;
              margin-left: 5rpx;
            }
          }
        }
      }
    }
  }
}
</style>
