<script setup lang="ts">
import type { IncomeRecordItem } from '@/types/user'
import { computed } from 'vue'

const props = defineProps<{
  item: IncomeRecordItem
}>()

const activeBackgroundColor = computed(() => {
  return props.item.state === 0 ? '#e43d33' : '#18bc37'
})

const rechargeText = computed(() => {
  if (props.item.state === 0) {
    return '扣款'
  } else if (props.item.state === 1) {
    return '充值'
  } else if (props.item.state === 2) {
    return '退款'
  }
})
</script>

<template>
  <view class="outer">
    <view class="top">
      <view class="left">
        <text class="recharge" :style="{ backgroundColor: activeBackgroundColor }">{{
          rechargeText
        }}</text>
        <text>钱包{{ rechargeText }}</text>
      </view>
      <view class="right" :style="{ color: activeBackgroundColor }">
        {{ item.state === 0 ? '-' : '+' }}{{ item.moneyChange }}
      </view>
    </view>
    <view class="bottom">{{ item.createTime }}</view>
  </view>
</template>

<style lang="scss">
.outer {
  background-color: #fff;
  margin: 20rpx;
  padding: 20rpx;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      .recharge {
        color: #fff;
        padding: 5rpx 10rpx;
        border-radius: 10rpx;
        margin-right: 10rpx;
      }
    }
  }

  .bottom {
    display: flex;
    justify-content: flex-end;
    margin: 10rpx 0;
    color: #666;
    font-size: 26rpx;
  }
}
</style>
