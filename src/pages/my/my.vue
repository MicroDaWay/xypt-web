<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
</script>

<template>
  <view class="my">
    <view class="avatar">
      <image :src="userStore.userInfo.avatar" />
      <view>{{ userStore.userInfo.nickname || userStore.userInfo.username }}</view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  width: 100%;
  height: 100vh;
  background-color: #eee;
}

.my {
  .avatar {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200rpx;

    image {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      margin-bottom: 10rpx;
    }
  }
}
</style>
