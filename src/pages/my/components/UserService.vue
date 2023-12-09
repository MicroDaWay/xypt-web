<script setup lang="ts">
import type { ServiceList } from '@/types/user'

const props = defineProps<{
  serviceText: string
  serviceList: ServiceList
}>()
</script>

<template>
  <view class="service">
    <view class="service-text">{{ serviceText }}</view>
    <view class="container">
      <view v-for="item in serviceList" :key="item.id">
        <navigator class="outer" :url="item.url">
          <img class="img" :src="item.imgUrl" />
          <text class="bottom-text">{{ item.text }}</text>
        </navigator>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.service {
  background-color: #fff;
  padding: 20rpx;
  margin: 20rpx 0;

  .service-text {
    font-size: 32rpx;
    font-weight: bold;
    margin: 0 0 20rpx 30rpx;
  }

  .container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .outer {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-items: center;

      .img {
        width: 80rpx;
        height: 80rpx;
      }

      .bottom-text {
        font-size: 26rpx;
      }
    }
  }
}
</style>
