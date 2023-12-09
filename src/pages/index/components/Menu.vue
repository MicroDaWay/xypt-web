<script setup lang="ts">
import { getMenuAPI } from '@/apis/home'
import type { MenuList } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 菜单数据
const menuList = ref<MenuList>([])

// 获取菜单数据
const getMenuList = async () => {
  try {
    const res = await getMenuAPI()
    if (res.code === 0) {
      menuList.value = res.data
    }
  } catch (err) {
    console.log('出错了', err)
  }
}

onLoad(() => {
  getMenuList()
})
</script>

<template>
  <view class="outer">
    <navigator
      url="/pages/placeOrder/placeOrder"
      class="item"
      v-for="item in menuList"
      :key="item.id"
    >
      <image class="img" :src="item.imgUrl" />
      <view class="text">{{ item.text }}</view>
    </navigator>
  </view>
</template>

<style lang="scss">
.outer {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 20rpx;
  background-color: #fff;

  .item {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    .img {
      width: 80rpx;
      height: 80rpx;
    }

    .text {
      font-size: 30rpx;
      margin-top: 10rpx;
    }
  }
}
</style>
