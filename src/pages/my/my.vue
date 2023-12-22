<script setup lang="ts">
import { logoutAPI } from '@/apis/login'
import { getUserInfoAPI } from '@/apis/user'
import { useUserStore } from '@/store/modules/user'
import { onShow } from '@dcloudio/uni-app'
import RiderService from './components/RiderService.vue'
import UserService from './components/UserService.vue'

const userStore = useUserStore()

// 获取用户信息
const getUserInfo = async () => {
  try {
    const res = await getUserInfoAPI()
    if (res.code === 0) {
      userStore.setUserInfo(res.data)
    }
  } catch (err) {
    console.log('出错了', err)
  }
}

onShow(() => {
  getUserInfo()
})

// 点击退出登录的处理函数
const logoutHandler = () => {
  uni.showModal({
    content: '你确定要退出登录吗',
    success: async (res) => {
      if (res.confirm) {
        const result = await logoutAPI()
        if (result.code === 0) {
          userStore.logout()

          uni.showToast({
            icon: 'none',
            title: '退出登录成功',
          })

          setTimeout(() => {
            uni.redirectTo({
              url: '/pages/login/login',
            })
          }, 1000)
        }
      }
    },
  })
}
</script>

<template>
  <view class="my">
    <!-- 用户头像昵称 -->
    <view class="avatar">
      <image class="img" :src="userStore.showAvatar" />
      <view>{{ userStore.showName }}</view>
    </view>

    <!-- 用户服务 -->
    <UserService></UserService>

    <!-- 骑手服务 -->
    <RiderService></RiderService>

    <view class="bottom">
      <navigator url="/pages/userDetails/userDetails" class="item">
        <uni-icons type="person"></uni-icons>
        <view class="item-text">个人信息</view>
      </navigator>
      <navigator url="/pages/platform/platform" class="item">
        <uni-icons type="vip"></uni-icons>
        <view class="item-text">平台介绍</view>
      </navigator>
      <navigator url="/pages/protocol/protocol" class="item">
        <uni-icons type="paperclip"></uni-icons>
        <view class="item-text">用户协议</view>
      </navigator>
      <view class="item" @tap="logoutHandler">
        <uni-icons type="undo"></uni-icons>
        <view class="item-text">退出登录</view>
      </view>
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
  padding: 20rpx;

  .avatar {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 220rpx;

    .img {
      width: 150rpx;
      height: 150rpx;
      border-radius: 50%;
      margin-bottom: 10rpx;
    }
  }

  .bottom {
    background-color: #fff;

    .item {
      display: flex;
      align-items: center;
      height: 80rpx;
      padding: 0 20rpx;
      border-bottom: 1rpx solid #eee;

      .item-text {
        margin-left: 20rpx;
      }
    }
  }
}
</style>
