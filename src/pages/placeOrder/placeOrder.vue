<script setup lang="ts">
import { getAddressAPI } from '@/apis/address'
import { submitOrderAPI } from '@/apis/order'
import { useAddressStore } from '@/store/modules/address'
import type { AddressItem } from '@/types/address'
import type { PlaceOrderParams } from '@/types/order'
import { onReady, onShow } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'

const props = defineProps<{
  orderType: number
}>()

// 地址
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

const formRef = ref()

// 表单数据
const formData = ref<PlaceOrderParams>({
  orderType: +props.orderType,
  fee: 1,
} as PlaceOrderParams)

// 表单校验规则
const rules = ref({
  tradeName: {
    rules: [
      {
        required: true,
        errorMessage: '物品名称不能为空',
      },
      {
        validateFunction: function (rule: any, value: any, data: any, callback: any) {
          if (!/^\S{1,20}$/.test(value)) {
            callback('物品名称必须为1-20位非空字符')
          }
          return true
        },
      },
    ],
  },
  desc: {
    rules: [
      {
        required: true,
        errorMessage: '描述信息不能为空',
      },
      {
        validateFunction: function (rule: any, value: any, data: any, callback: any) {
          if (!/^\S{1,20}$/.test(value)) {
            callback('描述信息必须为1-20位非空字符')
          }
          return true
        },
      },
    ],
  },
})

onShow(() => {
  getAddressList()
})

onReady(() => {
  formRef.value.setRules(rules.value)
})

// 修改地址
const changeAddress = () => {
  uni.navigateTo({
    url: '/pages/address/address?type=select',
  })
}

// 订单类型
const range = ref([
  { value: 0, text: '代拿快递' },
  { value: 1, text: '代取餐品' },
  { value: 2, text: '代买零食' },
])

// 修改订单类型的处理函数
const changeOrderType = (e: any) => {
  formData.value.orderType = e
}

// 点击提交订单的处理函数
const submitHandler = async () => {
  if (!selectedAddress.value?.id) {
    uni.showToast({
      icon: 'none',
      title: '请选择收货地址',
    })
    return
  }

  await formRef.value.validate()

  formData.value.payUserName = selectedAddress.value.name
  formData.value.payUserAddress =
    selectedAddress.value.buildingNumber + '' + selectedAddress.value.houseNumber
  formData.value.payUserPhone = selectedAddress.value.phone

  try {
    const res = await submitOrderAPI(formData.value)
    if (res.code === 0) {
      uni.showToast({
        icon: 'success',
        title: '下单成功',
      })

      setTimeout(() => {
        uni.switchTab({
          url: '/pages/order/order',
        })
      }, 1000)
    } else {
      uni.showToast({
        icon: 'fail',
        title: res.message,
      })
    }
  } catch (err) {
    console.log('出错了', err)
  }
}
</script>

<template>
  <view class="place-order">
    <view class="address">
      <view v-if="!selectedAddress?.id" @tap="changeAddress">请选择收货地址</view>
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
    <view class="form">
      <uni-forms label-align="right" ref="formRef" :modelValue="formData">
        <uni-forms-item label="物品名称" :label-width="70" name="tradeName">
          <uni-easyinput type="text" placeholder="请输入物品名称" v-model="formData.tradeName" />
        </uni-forms-item>
        <uni-forms-item label="描述信息" :label-width="70" name="desc">
          <uni-easyinput type="text" placeholder="请输入描述信息" v-model="formData.desc" />
        </uni-forms-item>
        <uni-forms-item label="小费" :label-width="70">
          <view class="number">
            <uni-number-box :min="1" v-model="formData.fee"></uni-number-box>
          </view>
        </uni-forms-item>
      </uni-forms>
      <uni-forms-item label="订单类型" :label-width="70">
        <uni-data-select
          v-model="formData.orderType"
          :localdata="range"
          @change="changeOrderType"
        ></uni-data-select>
      </uni-forms-item>
      <uni-forms-item label="备注" :label-width="70">
        <uni-easyinput type="text" placeholder="请输入备注" v-model="formData.note" />
      </uni-forms-item>
      <button class="submit" @tap="submitHandler">提交订单</button>
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
        background-color: $uni-color-primary;
        color: #fff;
        height: 80rpx;
      }
    }
  }
}
</style>
