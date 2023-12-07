<script setup lang="ts">
import { getHomeBannerAPI } from '@/apis/home'
import type { BannerList } from '@/types/home'
import { onMounted } from 'vue'
import { ref } from 'vue'

// 轮播图数据
const bannerList = ref<BannerList>([])

// 获取轮播图数据
const getBannerList = async () => {
  try {
    const res = await getHomeBannerAPI()
    if (res.code === 0) {
      bannerList.value = res.data
    }
  } catch (err) {
    console.log('出错了', err)
  }
}

onMounted(() => {
  getBannerList()
})
</script>

<template>
  <swiper class="swiper" indicator-dots autoplay circular>
    <swiper-item v-for="item in bannerList" :key="item.id">
      <image class="img" :src="item.imgUrl" />
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
