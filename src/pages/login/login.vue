<script setup lang="ts">
import type { LoginParams } from '@/types/login'
import { onReady, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { loginAPI, registerAPI } from '@/apis/login'
import { useUserStore } from '@/store/modules/user'
import { getUserInfoAPI } from '@/apis/user'

// 是否是登录页面
const isLogin = ref(true)

// 表单数据
const formData = ref<LoginParams>({} as LoginParams)

const formRef = ref()

const userStore = useUserStore()

// 表单验证规则
const rules = ref({
  username: {
    rules: [
      {
        required: true,
        errorMessage: '用户名不能为空',
      },
      {
        validateFunction: function (rule: any, value: any, data: any, callback: any) {
          if (!/^\S{5,15}$/.test(value)) {
            callback('用户名必须为5-15位非空字符')
          }
          return true
        },
      },
    ],
  },
  password: {
    rules: [
      {
        required: true,
        errorMessage: '密码不能为空',
      },
      {
        validateFunction: function (rule: any, value: any, data: any, callback: any) {
          if (!/^\S{5,15}$/.test(value)) {
            callback('密码必须为5-15位非空字符')
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

onShow(() => {
  uni.hideHomeButton()
})

// 切换注册和登录的状态
const changeLoginOrRegister = () => {
  isLogin.value = !isLogin.value
}

// 提交表单的处理函数
const submitHandler = async () => {
  await formRef.value.validate()

  try {
    if (isLogin.value) {
      const res = await loginAPI(formData.value)
      if (res.code === 0) {
        userStore.token = res.data

        const result = await getUserInfoAPI()
        if (result.code === 0) {
          userStore.setUserInfo(result.data)
        }

        uni.showToast({
          icon: 'none',
          title: '登录成功',
        })

        setTimeout(() => {
          uni.switchTab({
            url: '/pages/index/index',
          })
        }, 1000)
      } else {
        uni.showToast({
          icon: 'none',
          title: res.message,
        })
      }
    } else {
      const res = await registerAPI(formData.value)
      if (res.code === 0) {
        uni.showToast({
          icon: 'none',
          title: '注册成功,请登录',
        })

        // 清空表单数据
        formData.value = {
          ...formData.value,
          username: '',
          password: '',
        }

        // 切换为登录界面
        isLogin.value = true
      } else {
        uni.showToast({
          icon: 'none',
          title: res.message,
        })
      }
    }
  } catch (err) {
    console.log('出错了', err)
  }
}
</script>

<template>
  <view class="login">
    <view class="login-text">{{ isLogin ? '登录' : '注册' }}</view>
    <uni-forms ref="formRef" :modelValue="formData">
      <uni-forms-item name="username">
        <uni-easyinput
          prefixIcon="person"
          type="text"
          placeholder="请输入用户名"
          v-model="formData.username"
        />
      </uni-forms-item>
      <uni-forms-item name="password">
        <uni-easyinput
          prefixIcon="locked"
          type="password"
          placeholder="请输入密码"
          v-model="formData.password"
        />
      </uni-forms-item>
      <button @tap="submitHandler" style="background-color: #006eff; color: #fff">
        {{ isLogin ? '登录' : '注册' }}
      </button>
      <view class="outer">
        <template v-if="isLogin">
          <text>还没有账号? 去</text>
          <text class="login-register" @tap="changeLoginOrRegister">注册</text>
        </template>
        <template v-else>
          <text>已有账号? 去</text>
          <text class="login-register" @tap="changeLoginOrRegister">登录</text>
        </template>
      </view>
    </uni-forms>
  </view>
</template>

<style lang="scss">
page {
  width: 100vw;
  height: 100vh;
  background-color: #eee;

  .login {
    position: fixed;
    left: 0;
    right: 0;
    top: 100rpx;
    margin: auto;
    width: 90%;
    height: 50%;
    border-radius: 20rpx;
    padding: 20rpx;
    background-color: #fff;

    .login-text {
      font-size: 50rpx;
      margin: 30rpx 0;
    }

    .outer {
      display: flex;
      justify-content: flex-end;
      margin-top: 50rpx;

      .login-register {
        color: #006eff;
      }
    }
  }
}
</style>
