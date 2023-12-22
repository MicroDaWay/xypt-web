<script setup lang="ts"></script>

<template>
  <swiper class="swiper" indicator-dots autoplay circular>
    <swiper-item>
      <image class="img" src="/static/banner/banner01.png" />
    </swiper-item>
    <swiper-item>
      <image class="img" src="/static/banner/banner02.png" />
    </swiper-item>
  </swiper>
</template>

<style lang="scss">
.swiper {
  width: 100%;
  height: 300rpx;

  .img {
    width: 100%;
    height: 100%;
  }
}
</style>
