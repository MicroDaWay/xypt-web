<script setup lang="ts">
import { getAddressAPI } from '@/apis/address'
import { useAddressStore } from '@/store/modules/address'
import type { AddressItem } from '@/types/address'
import { onShow } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'

const props = defineProps<{
  state: number
}>()

const address = ref<AddressItem>({} as AddressItem)

// 获取地址列表
const getAddressList = async () => {
  try {
    const res = await getAddressAPI()
    if (res.code === 0) {
      address.value = res.data.find((item: AddressItem) => item.isDefault === 1)!
    }
  } catch (err) {
    console.log('出错了', err)
  }
}

const addressStore = useAddressStore()

// 选择的地址
const selectedAddress = computed(() => {
  if (addressStore.address.id) {
    return addressStore.address
  }

  return address.value
})

onShow(() => {
  getAddressList()
})

// 修改地址
const changeAddress = () => {
  uni.navigateTo({
    url: '/pages/address/address?type=select',
  })
}

const formRef = ref()

const rules = ref({
  tradeName: {
    rules: [],
  },
  desc: {
    rules: [],
  },
  fee: {
    rules: [],
  },
  orderType: {
    rules: [],
  },
})

// 订单类型
const range = ref([
  { value: 0, text: '代拿快递' },
  { value: 1, text: '代取餐品' },
  { value: 2, text: '代买零食' },
])
</script>

<template>
  <view class="place-order">
    <view class="address">
      <view v-if="!selectedAddress.id" @tap="changeAddress">请选择收货地址</view>
      <view v-else @tap="changeAddress">
        <view class="name-phone">
          <text class="name">{{ selectedAddress.name }}</text>
          <text class="phone">{{ selectedAddress.phone }}</text>
        </view>
        <view class="building">
          <text class="building-number">{{ selectedAddress.buildingNumber }}</text>
          <text class="house-number">{{ selectedAddress.houseNumber }}</text>
        </view>
      </view>
    </view>
    <view class="form" :rules="rules">
      <uni-forms label-align="right" ref="formRef">
        <uni-forms-item label="物品名称" :label-width="70">
          <uni-easyinput type="text" placeholder="请输入物品名称" />
        </uni-forms-item>
        <uni-forms-item label="描述信息" :label-width="70">
          <uni-easyinput type="text" placeholder="请输入描述信息" />
        </uni-forms-item>
        <uni-forms-item label="小费" :label-width="70">
          <view class="number">
            <uni-number-box :min="1"></uni-number-box>
          </view>
        </uni-forms-item>
      </uni-forms>
      <uni-forms-item label="订单类型" :label-width="70">
        <uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select>
      </uni-forms-item>
      <uni-forms-item label="备注" :label-width="70">
        <uni-easyinput type="text" placeholder="请输入备注" />
      </uni-forms-item>
      <button class="submit">提交订单</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #eee;

  .place-order {
    .address {
      background-color: #fff;
      padding: 20rpx;
      margin: 20rpx;

      .name-phone {
        margin-bottom: 10rpx;

        .name {
          margin-right: 10rpx;
        }

        .default {
          margin-left: 20rpx;
          background-color: #006eff;
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

    .form {
      margin: 20rpx;
      padding: 20rpx;
      background-color: #fff;

      .number {
        display: flex;
        align-items: center;
        height: 70rpx;
      }

      .submit {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #006eff;
        color: #fff;
        height: 80rpx;
      }
    }
  }
}
</style>
