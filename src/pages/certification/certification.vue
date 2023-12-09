<script setup lang="ts">
import { getRiderAPI, riderCertificationAPI, updateRiderAPI } from '@/apis/rider'
import { useUserStore } from '@/store/modules/user'
import type { RiderExamineParams } from '@/types/rider'
import { onLoad, onReady } from '@dcloudio/uni-app'
import { ref } from 'vue'

const formRef = ref()

const userStore = useUserStore()

// 表单数据
const formData = ref<RiderExamineParams>({
  name: '',
  phone: '',
  idCard: '327701199908241234',
  address: '',
})

// 表单校验规则
const rules = ref({
  name: {
    rules: [
      {
        required: true,
        errorMessage: '姓名不能为空',
      },
      {
        validateFunction: function (rule: any, value: any, data: any, callback: any) {
          if (!/^\S{1,15}$/.test(value)) {
            callback('姓名必须为1-15位非空字符')
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
        errorMessage: '联系方式不能为空',
      },
      {
        validateFunction: function (rule: any, value: any, data: any, callback: any) {
          if (!/^1[3-9]\d{9}$/.test(value)) {
            callback('请输入正确的联系方式')
          }
          return true
        },
      },
    ],
  },
  idCard: {
    rules: [
      {
        required: true,
        errorMessage: '身份证号不能为空',
      },
      {
        validateFunction: function (rule: any, value: any, data: any, callback: any) {
          if (
            !/^[1-9]\d{5}(19\d{2}|20[0-1]\d)(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}([0-9]|X)$/.test(
              value
            )
          ) {
            callback('请输入正确的身份证号')
          }
          return true
        },
      },
    ],
  },
  address: {
    rules: [
      {
        required: true,
        errorMessage: '常住地址不能为空',
      },
    ],
  },
})

onReady(() => {
  formRef.value.setRules(rules.value)
})

const getRider = async () => {
  try {
    const res = await getRiderAPI()
    if (res.code === 0) {
      formData.value = res.data
    }
  } catch (err) {
    console.log('出错了', err)
  }
}

onLoad(() => {
  if (userStore.userInfo.role === 2) {
    getRider()
  }
})

// 点击确定的处理函数
const submitHandler = async () => {
  await formRef.value.validate()

  try {
    let res
    if (userStore.userInfo.role === 2) {
      res = await updateRiderAPI(formData.value)
    } else {
      res = await riderCertificationAPI(formData.value)
    }
    if (res.code === 0) {
      uni.showToast({
        icon: 'none',
        title: userStore.userInfo.role === 2 ? '更新成功' : '认证成功,请等待审核',
      })

      setTimeout(() => {
        uni.navigateBack()
      }, 1000)
    } else {
      uni.showToast({
        icon: 'fail',
        title: userStore.userInfo.role === 2 ? '更新失败' : '认证失败',
      })
    }
  } catch (err) {
    console.log('出错了', err)
  }
}
</script>

<template>
  <view class="certification">
    <uni-forms ref="formRef" :modelValue="formData" label-align="right">
      <uni-forms-item label="姓名" :label-width="70" name="name">
        <uni-easyinput type="text" placeholder="请输入姓名" v-model="formData.name" />
      </uni-forms-item>
      <uni-forms-item label="联系方式" :label-width="70" name="phone">
        <uni-easyinput type="text" placeholder="请输入联系方式" v-model="formData.phone" />
      </uni-forms-item>
      <uni-forms-item label="身份证号" :label-width="70" name="IDCard">
        <uni-easyinput type="text" placeholder="请输入身份证号" v-model="formData.idCard" />
      </uni-forms-item>
      <uni-forms-item label="常住地址" :label-width="70" name="address">
        <uni-easyinput type="text" placeholder="请输入常住地址" v-model="formData.address" />
      </uni-forms-item>
      <button class="confirm" @tap="submitHandler">确定</button>
    </uni-forms>
  </view>
</template>

<style lang="scss">
page {
  background-color: #eee;

  .certification {
    margin: 20rpx;
    padding: 30rpx;
    background-color: #fff;

    .confirm {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #007aff;
      color: #fff;
      height: 80rpx;
    }
  }
}
</style>
