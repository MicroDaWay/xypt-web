<script setup lang="ts">
import { getUserInfoAPI, updateUserInfoAPI } from '@/apis/user'
import type { UserInfo } from '@/types/user'
import { onLoad, onReady } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 表单数据
const formData = ref<UserInfo>({} as UserInfo)

const formRef = ref()

// 表单校验规则
const rules = ref({
  nickname: {
    rules: [
      {
        required: true,
        errorMessage: '昵称不能为空',
      },
      {
        validateFunction: function (rule: any, value: any, data: any, callback: any) {
          if (!/^\S{1,15}$/.test(value)) {
            callback('用户昵称必须为1-15位的非空字符')
          }
          return true
        },
      },
    ],
  },
  gender: {
    rules: [
      {
        required: true,
        errorMessage: '性别不能为空',
      },
    ],
  },
  phone: {
    rules: [
      {
        required: true,
        errorMessage: '手机号不能为空',
      },
      {
        validateFunction: function (rule: any, value: any, data: any, callback: any) {
          if (!/^1[3-9]\d{9}$/.test(value)) {
            callback('请输入正确的手机号')
          }
          return true
        },
      },
    ],
  },
})

// 获取用户信息
const getUserInfo = async () => {
  try {
    const res = await getUserInfoAPI()
    if (res.code === 0) {
      formData.value = res.data
    }
  } catch (err) {
    console.log('出错了', err)
  }
}

onLoad(() => {
  getUserInfo()
})

onReady(() => {
  formRef.value.setRules(rules.value)
})

// 修改头像的处理函数
const changeAvatar = () => {
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    success: (res) => {
      const tempFilePath = res.tempFiles[0].tempFilePath

      uni.uploadFile({
        url: '/uploadAvatar',
        name: 'file',
        filePath: tempFilePath,
        success: (result) => {
          console.log(result)

          if (result.statusCode === 200) {
            formData.value.avatar = JSON.parse(result.data).data
            uni.showToast({
              icon: 'none',
              title: '修改头像成功',
            })
          } else {
            uni.showToast({
              icon: 'none',
              title: JSON.parse(result.data).message,
            })
          }
        },
      })
    },
  })
}

// 修改性别的处理函数
const changeGender = (e: any) => {
  formData.value.gender = +e.detail.value
}

// 点击保存的处理函数
const submitHandler = async () => {
  await formRef.value.validate()

  try {
    const res = await updateUserInfoAPI(formData.value)
    if (res.code === 0) {
      uni.showToast({
        icon: 'success',
        title: '更新成功',
      })

      setTimeout(() => {
        uni.navigateBack()
      }, 1000)
    } else {
      uni.showToast({
        icon: 'fail',
        title: '更新失败',
      })
    }
  } catch (err) {
    console.log('出错了', err)
  }
}
</script>

<template>
  <view class="user-details">
    <uni-forms ref="formRef" :modelValue="formData" :rules="rules">
      <uni-forms-item label="头像">
        <image @tap="changeAvatar" class="img" :src="formData.avatar" />
      </uni-forms-item>
      <uni-forms-item label="用户名">
        <uni-easyinput type="text" disabled v-model="formData.username" />
      </uni-forms-item>
      <uni-forms-item label="昵称" name="nickname">
        <uni-easyinput type="text" placeholder="请输入昵称" v-model="formData.nickname" />
      </uni-forms-item>
      <uni-forms-item label="性别" name="gender">
        <radio-group
          @change="changeGender"
          style="height: 100%; display: flex; align-items: center"
        >
          <label style="margin-right: 20rpx">
            <radio color="#007aff" :value="1" :checked="formData.gender === 1" />男
          </label>
          <label> <radio color="#007aff" :value="0" :checked="formData.gender === 0" />女 </label>
        </radio-group>
      </uni-forms-item>
      <uni-forms-item label="手机号" name="phone">
        <uni-easyinput type="text" placeholder="请输入手机号" v-model="formData.phone" />
      </uni-forms-item>
      <uni-forms-item>
        <button class="save" @tap="submitHandler">保存</button>
      </uni-forms-item>
    </uni-forms>
  </view>
</template>

<style lang="scss">
page {
  width: 100%;
  height: 100vh;
  background-color: #eee;

  .user-details {
    width: 710rpx;
    margin: 20rpx auto;
    padding: 20rpx 30rpx;
    background-color: #fff;

    .img {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
    }

    .save {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $uni-color-primary;
      color: #fff;
      width: 200rpx;
      height: 70rpx;
      margin-left: 130rpx;
    }
  }
}
</style>
