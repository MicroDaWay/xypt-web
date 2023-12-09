<script setup lang="ts">
import { examinePassAPI, getAwaitExamineAPI } from '@/apis/rider'
import type { RiderExamineParams } from '@/types/rider'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 待审核的骑手数据
const awaitExamineList = ref<RiderExamineParams[]>([])

// 获取待审核的骑手数据
const getAwaitExamine = async () => {
  try {
    const res = await getAwaitExamineAPI()
    if (res.code === 0) {
      awaitExamineList.value = res.data
    }
  } catch (err) {
    console.log('出错了', err)
  }
}

onLoad(() => {
  getAwaitExamine()
})

// 点击待审核的处理函数
const examineHandler = (id: number, userId: number) => {
  try {
    uni.showModal({
      content: '你确定要通过审核吗',
      success: async (res) => {
        if (res.confirm) {
          const result = await examinePassAPI(id, userId)
          if (result.code === 0) {
            uni.showToast({
              icon: 'success',
              title: '审核通过',
            })

            getAwaitExamine()
          }
        }
      },
    })
  } catch (err) {
    console.log('出错了', err)
  }
}
</script>

<template>
  <view class="examine">
    <view class="list" v-if="awaitExamineList.length">
      <view class="item" v-for="item in awaitExamineList" :key="item.id">
        <view class="top">
          <view class="name">{{ item.name }}</view>
          <view class="phone">{{ item.phone }}</view>
        </view>
        <view class="middle">
          <view class="idCard">{{ item.idCard }}</view>
          <view class="address">{{ item.address }}</view>
        </view>
        <text class="examine-pass" @tap="examineHandler(item.id, item.userId)">待审核</text>
      </view>
    </view>
    <view v-else class="no-rider">暂无需要审核的骑手</view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #eee;

  .item {
    margin: 20rpx;
    padding: 20rpx;
    background-color: #fff;

    .top {
      display: flex;
      align-items: center;

      .name {
        margin-right: 20rpx;
      }
    }

    .middle {
      display: flex;
      align-items: center;
      margin: 10rpx 0;

      .idCard {
        margin-right: 20rpx;
      }
    }

    .examine-pass {
      background-color: #e43d33;
      color: #fff;
      padding: 5rpx 20rpx;
      border-radius: 10rpx;
    }
  }

  .no-rider {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100rpx;
    font-size: 40rpx;
    margin-top: 50rpx;
  }
}
</style>
