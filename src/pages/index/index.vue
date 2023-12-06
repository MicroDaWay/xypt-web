<script setup lang="ts">
import HomeBanner from './components/HomeBanner.vue'
import NoticeBar from './components/NoticeBar.vue'
</script>

<template>
  <view class="home">
    <HomeBanner class="banner"></HomeBanner>
    <NoticeBar></NoticeBar>
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
