<script setup lang="ts">
import { deleteAddressByIdAPI, getAddressAPI } from '@/apis/address'
import { useAddressStore } from '@/store/modules/address'
import type { AddressItem, AddressList } from '@/types/address'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

const props = defineProps<{
  type: string
}>()

// 地址列表
const addressList = ref<AddressList>([])

// 获取地址列表
const getAddressList = async () => {
  try {
    const res = await getAddressAPI()
    if (res.code === 0) {
      addressList.value = res.data
    }
  } catch (err) {
    console.log('出错了', err)
  }
}

onShow(() => {
  getAddressList()
})

// 点击修改按钮的处理函数
const updateAddress = (id: number) => {
  uni.navigateTo({
    url: `/pages/addressManage/addressManage?id=${id}`,
  })
}

// 点击删除按钮的处理函数
const deleteAddress = (id: number) => {
  uni.showModal({
    content: '你确定要删除吗',
    success: async (res) => {
      if (res.confirm) {
        try {
          const result = await deleteAddressByIdAPI(id)
          if (result.code === 0) {
            uni.showToast({
              icon: 'success',
              title: '删除成功',
            })
            getAddressList()
          }
        } catch (err) {
          console.log('出错了', err)
        }
      }
    },
  })
}

// 点击添加按钮的处理函数
const addAddress = () => {
  uni.navigateTo({
    url: '/pages/addressManage/addressManage',
  })
}

const addressStore = useAddressStore()

// 点击地址的处理函数
const clickItem = (item: AddressItem) => {
  if (props.type) {
    addressStore.updateAddress(item)
    uni.navigateBack()
  }
}
</script>

<template>
  <view class="address">
    <view class="list" v-if="addressList.length">
      <view @tap="clickItem(item)" class="item" v-for="item in addressList" :key="item.id">
        <view class="left">
          <view class="name-phone">
            <text class="name">{{ item.name }}</text>
            <text class="phone">{{ item.phone }}</text>
            <text class="default" v-if="item.isDefault === 1">默认</text>
          </view>
          <view class="building">
            <text class="building-number">{{ item.buildingNumber }}</text>
            <text class="house-number">{{ item.houseNumber }}</text>
          </view>
        </view>
        <view class="right">
          <uni-icons @tap.stop="updateAddress(item.id)" type="compose" size="30"></uni-icons>
          <uni-icons @tap.stop="deleteAddress(item.id)" type="trash" size="30"></uni-icons>
        </view>
      </view>
    </view>
    <view v-else class="no-address">暂无地址</view>
    <button class="add-address" @tap="addAddress">添加地址</button>
  </view>
</template>

<style lang="scss">
page {
  width: 100%;
  height: 100vh;
  background-color: #eee;

  .address {
    .list {
      height: 100vh;
      padding-bottom: 120rpx;
      overflow: auto;
    }

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx;
      margin: 20rpx;
      background-color: #fff;
      border-radius: 10rpx;

      .left {
        .name-phone {
          margin-bottom: 10rpx;

          .name {
            margin-right: 10rpx;
          }

          .default {
            margin-left: 20rpx;
            background-color: $uni-color-primary;
            color: #fff;
            border-radius: 10rpx;
            padding: 0 10rpx;
          }
        }

        .building {
          .building-number {
            margin-right: 10rpx;
          }
        }
      }
    }

    .no-address {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100rpx;
      font-size: 40rpx;
      margin-top: 50rpx;
    }

    .add-address {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 50rpx;
      margin: auto;
      font-size: 30rpx;
      margin: 0 20rpx;
      background-color: $uni-color-primary;
      color: #fff;
    }
  }
}
</style>
