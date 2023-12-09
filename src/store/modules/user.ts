import type { UserInfo } from '@/types/user'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

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

    // 退出登录
    const logout = () => {
      token.value = ''
      clearUserInfo()
    }

    // 显示用户的昵称还是用户名
    const showName = computed(() => {
      return userInfo.value.nickname || userInfo.value.username || '默认昵称'
    })

    // 显示的头像
    const showAvatar = computed(() => {
      return (
        userInfo.value.avatar ||
        'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
      )
    })

    return {
      token,
      userInfo,
      showName,
      showAvatar,
      setUserInfo,
      clearUserInfo,
      logout,
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
