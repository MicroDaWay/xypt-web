<script setup lang="ts">
import { addAddressAPI, getAddressByIdAPI, updateAddressByIdAPI } from '@/apis/address'
import type { AddressItem } from '@/types/address'
import { onLoad, onReady } from '@dcloudio/uni-app'
import { ref } from 'vue'

const props = defineProps<{
  id: number
}>()

uni.setNavigationBarTitle({
  title: props.id ? '修改地址' : '添加地址',
})

const formData = ref<AddressItem>({
  isDefault: 0,
} as AddressItem)

const formRef = ref()

// 表单校验规则
const rules = ref({
  buildingNumber: {
    rules: [
      {
        required: true,
        errorMessage: '楼号不能为空',
      },
      {
        validateFunction: function (rule: any, value: any, data: any, callback: any) {
          if (!/^\S{1,10}$/.test(value)) {
            callback('楼号必须为1-10位非空字符')
          }
          return true
        },
      },
    ],
  },
  houseNumber: {
    rules: [
      {
        required: true,
        errorMessage: '门牌号不能为空',
      },
      {
        validateFunction: function (rule: any, value: any, data: any, callback: any) {
          if (!/^\d{1,10}$/.test(value)) {
            callback('门牌号必须为1-10位数字')
          }
          return true
        },
      },
    ],
  },
  name: {
    rules: [
      {
        required: true,
        errorMessage: '联系人姓名不能为空',
      },
      {
        validateFunction: function (rule: any, value: any, data: any, callback: any) {
          if (!/^\S{2,15}$/.test(value)) {
            callback('联系人姓名必须为2-15位非空字符')
          }
          return true
        },
      },
    ],
  },
  phone: {
    rules: [
      {
        required: true,
        errorMessage: '联系人电话不能为空',
      },
      {
        validateFunction: function (rule: any, value: any, data: any, callback: any) {
          if (!/^1[3-9]\d{9}$/.test(value)) {
            callback('请填写正确的电话格式')
          }
          return true
        },
      },
    ],
  },
})

onReady(() => {
  formRef.value.setRules(rules.value)
})

// 根据id获取地址
const getAddressById = async () => {
  try {
    const res = await getAddressByIdAPI(props.id)
    if (res.code === 0) {
      formData.value = res.data
    }
  } catch (err) {
    console.log('出错了', err)
  }
}

onLoad(() => {
  if (props.id) {
    getAddressById()
  }
})

// 切换是否为默认地址
const switchChange = (e: any) => {
  formData.value.isDefault = e.detail.value ? 1 : 0
}

// 点击保存的处理函数
const saveHandler = async () => {
  await formRef.value.validate()

  try {
    let res
    if (!props.id) {
      res = await addAddressAPI(formData.value)
    } else {
      res = await updateAddressByIdAPI(formData.value, props.id)
    }
    if (res.code === 0) {
      uni.showToast({
        icon: 'success',
        title: props.id ? '修改成功' : '添加成功',
      })

      setTimeout(() => {
        uni.navigateBack()
      }, 1000)
    } else {
      uni.showToast({
        icon: 'fail',
        title: props.id ? '修改失败' : '添加失败',
      })
    }
  } catch (err) {
    console.log('出错了', err)
  }
}
</script>

<template>
  <view class="address-manage">
    <uni-forms label-align="right" ref="formRef" :modelValue="formData">
      <uni-forms-item label="楼号" :label-width="100" name="buildingNumber">
        <uni-easyinput type="text" placeholder="请输入楼号" v-model="formData.buildingNumber" />
      </uni-forms-item>
      <uni-forms-item label="门牌号" :label-width="100" name="houseNumber">
        <uni-easyinput type="text" placeholder="请输入门牌号" v-model="formData.houseNumber" />
      </uni-forms-item>
      <uni-forms-item label="联系人姓名" :label-width="100" name="name">
        <uni-easyinput type="text" placeholder="请输入联系人姓名" v-model="formData.name" />
      </uni-forms-item>
      <uni-forms-item label="联系人电话" :label-width="100" name="phone">
        <uni-easyinput type="text" placeholder="请输入联系人电话" v-model="formData.phone" />
      </uni-forms-item>
      <uni-forms-item label="设为默认地址" :label-width="100">
        <view class="switch-box">
          <switch @change="switchChange" :checked="formData.isDefault === 1" color="#006eff" />
        </view>
      </uni-forms-item>
      <button class="save" @tap="saveHandler">保存</button>
    </uni-forms>
  </view>
</template>

<style lang="scss">
page {
  width: 100%;
  height: 100vh;
  background-color: #eee;

  .address-manage {
    margin: 20rpx;
    padding: 20rpx 30rpx;
    background-color: #fff;

    .switch-box {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      switch {
        transform: scale(0.7);
      }
    }

    .save {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #006eff;
      color: #fff;
      height: 80rpx;
    }
  }
}
</style>
