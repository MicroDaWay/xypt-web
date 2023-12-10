<script setup lang="ts">
import { evaluateOrderAPI, updateOrderStateAPI } from '@/apis/order'
import type { PlaceOrderParams } from '@/types/order'
import { onReady } from '@dcloudio/uni-app'
import { ref } from 'vue'

const formRef = ref()

const props = defineProps<{
  id: number
}>()

// 表单数据
const formData = ref({
  id: props.id,
  evaluate: '',
  rate: 5,
} as PlaceOrderParams)

// 表单校验规则
const rules = ref({
  evaluate: {
    rules: [
      {
        required: true,
        errorMessage: '评价不能为空',
      },
      {
        validateFunction: function (rule: any, value: any, data: any, callback: any) {
          if (!/^\S{1,100}$/.test(value)) {
            callback('评价必须为1-100个非空字符')
          }
          return true
        },
      },
    ],
  },
})

// 修改评分的处理函数
const changeRate = (e: any) => {
  formData.value.rate = e.value
}

onReady(() => {
  formRef.value.setRules(rules.value)
})

// 点击保存的处理函数
const submitHandler = async () => {
  await formRef.value.validate()

  try {
    const res = await evaluateOrderAPI(formData.value)
    if (res.code === 0) {
      uni.showToast({
        icon: 'success',
        title: '评价成功',
      })

      await updateOrderStateAPI(props.id, 6)

      setTimeout(() => {
        uni.navigateBack()
      }, 1000)
    } else {
      uni.showToast({
        icon: 'fail',
        title: '评价失败',
      })
    }
  } catch (err) {
    console.log('出错了', err)
  }
}
</script>

<template>
  <view class="evaluate">
    <uni-forms ref="formRef" :modelValue="formData">
      <uni-forms-item label="评价" name="evaluate">
        <uni-easyinput type="textarea" placeholder="请输入评价" v-model="formData.evaluate" />
      </uni-forms-item>
    </uni-forms>
    <uni-forms-item label="评分">
      <view class="rate">
        <uni-rate v-model="formData.rate" @change="changeRate" />
      </view>
    </uni-forms-item>
    <button class="save" @tap="submitHandler">保存</button>
  </view>
</template>

<style lang="scss">
page {
  background-color: #eee;

  .evaluate {
    margin: 20rpx;
    padding: 30rpx;
    background-color: #fff;
  }

  .rate {
    display: flex;
    align-items: center;
    height: 70rpx;
  }

  .save {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #006eff;
    color: #fff;
    height: 70rpx;
  }
}
</style>
