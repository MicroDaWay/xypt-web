<script setup lang="ts">
import { OrderStateEnum, orderStateList } from '@/apis/constant'
import { deleteOrderByIdAPI, riderReceiveAPI, updateOrderStateAPI } from '@/apis/order'
import type { PlaceOrderParams } from '@/types/order'

const props = defineProps<{
  orderList: PlaceOrderParams[]
  type: string
}>()

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

const emit = defineEmits(['updateOrderState'])

// 取消订单
const cancelOrder = (id: number, orderState: number) => {
  try {
    uni.showModal({
      content: '你确定要取消订单吗',
      success: async (res) => {
        if (res.confirm) {
          const result = await updateOrderStateAPI(id, orderState)
          if (result.code === 0) {
            uni.showToast({
              icon: 'none',
              title: '取消成功',
            })

            emit('updateOrderState')
          }
        }
      },
    })
  } catch (err) {
    console.log('出错了', err)
  }
}

// 点击确认收货的处理函数
const receiveHandler = (id: number, orderState: number) => {
  try {
    uni.showModal({
      content: '你确定收到货物了吗',
      success: async (res) => {
        if (res.confirm) {
          const result = await updateOrderStateAPI(id, orderState)
          if (result.code === 0) {
            uni.showToast({
              icon: 'none',
              title: '收货成功',
            })

            emit('updateOrderState')
          }
        }
      },
    })
  } catch (err) {
    console.log('出错了', err)
  }
}

// 点击去评价的处理函数
const evaluateHandler = (id: number) => {
  uni.navigateTo({
    url: `/pages/evaluate/evaluate?id=${id}`,
  })
}

// 点击删除订单的处理函数
const deleteOrder = (id: number) => {
  try {
    uni.showModal({
      content: '你确定要删除吗',
      success: async (res) => {
        if (res.confirm) {
          const result = await deleteOrderByIdAPI(id)
          if (result.code === 0) {
            uni.showToast({
              icon: 'none',
              title: '删除成功',
            })

            emit('updateOrderState')
          } else {
            uni.showToast({
              icon: 'none',
              title: '删除失败',
            })
          }
        }
      },
    })
  } catch (err) {
    console.log('出错了', err)
  }
}

// 点击接单的处理函数
const acceptHandler = async (id: number) => {
  try {
    const res = await riderReceiveAPI(id)
    if (res.code === 0) {
      uni.showToast({
        icon: 'none',
        title: '接单成功',
      })

      emit('updateOrderState')
    }
  } catch (err) {
    console.log('出错了', err)
  }
}

// 点击送达的处理函数
const sendHandler = (id: number, orderState: number) => {
  try {
    uni.showModal({
      content: '你确定送达了吗',
      success: async (res) => {
        if (res.confirm) {
          const result = await updateOrderStateAPI(id, orderState)
          if (result.code === 0) {
            uni.showToast({
              icon: 'none',
              title: '送达成功',
            })

            emit('updateOrderState')
          }
        }
      },
    })
  } catch (err) {
    console.log('出错了', err)
  }
}

// 点击订单的处理函数
const clickOrderItem = (item: PlaceOrderParams) => {
  if (
    [
      OrderStateEnum.AwaitSend,
      OrderStateEnum.AwaitReceive,
      OrderStateEnum.AwaitEvaluate,
      OrderStateEnum.FullFilled,
    ].includes(item.orderState)
  ) {
    uni.navigateTo({
      url: `/pages/orderDetails/orderDetails?id=${item.id}`,
    })
  }
}
</script>

<template>
  <view @tap="clickOrderItem(item)" class="order-item" v-for="item in orderList" :key="item.id">
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
      <text class="receive-orders" v-if="type === 'home'" @tap.stop="acceptHandler(item.id)"
        >接单</text
      >
      <view class="delete" v-else>
        <text
          @tap.stop="cancelOrder(item.id, 5)"
          class="cancel"
          v-if="item.orderState === OrderStateEnum.AwaitPending && type === 'order'"
          >取消订单</text
        >
        <text
          @tap.stop="sendHandler(item.id, 3)"
          class="receive"
          v-if="item.orderState === OrderStateEnum.AwaitSend && type === 'riderOrder'"
          >送达</text
        >
        <text
          @tap.stop="receiveHandler(item.id, 4)"
          class="receive"
          v-if="item.orderState === OrderStateEnum.AwaitReceive && type === 'order'"
          >确认收货</text
        >
        <text
          @tap.stop="evaluateHandler(item.id)"
          class="evaluate"
          v-if="
            item.orderState === OrderStateEnum.AwaitEvaluate &&
            (type === 'order' || type === 'evaluate')
          "
          >去评价</text
        >
        <view
          @tap.stop="deleteOrder(item.id)"
          v-if="item.orderState === OrderStateEnum.Cancel && type === 'order'"
          class="trash-delete"
        >
          <uni-icons class="trash" type="trash" size="18"></uni-icons>
          <text class="delete-text">删除</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.order-item {
  padding: 20rpx;
  margin: 20rpx 0;
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

      .cancel {
        background-color: #e43d33;
        color: #fff;
        padding: 5rpx 10rpx;
        border-radius: 10rpx;
      }

      .receive {
        background-color: #2979ff;
        color: #fff;
        padding: 5rpx 10rpx;
        border-radius: 10rpx;
      }

      .evaluate {
        background-color: #ffa500;
        color: #fff;
        padding: 5rpx 10rpx;
        border-radius: 10rpx;
      }

      .trash-delete {
        display: flex;
        align-items: center;

        .delete-text {
          font-size: 30rpx;
          margin-left: 5rpx;
        }
      }
    }

    .receive-orders {
      background-color: #2979ff;
      color: #fff;
      padding: 5rpx 10rpx;
      border-radius: 10rpx;
    }
  }
}
</style>
