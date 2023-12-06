import type { UserInfo } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')

    // 用户信息
    const userInfo = ref<UserInfo>({} as UserInfo)

    // 设置用户信息
    const setUserInfo = (value: UserInfo) => {
      userInfo.value = value
    }

    // 清空用户信息
    const clearUserInfo = () => {
      userInfo.value = {} as UserInfo
    }

    return {
      token,
      userInfo,
      setUserInfo,
      clearUserInfo,
    }
  },
  {
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key)
        },
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  }
)
