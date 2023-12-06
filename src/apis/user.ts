import type { UserInfo } from '@/types/user'
import request from '@/utils/request'

// 获取用户信息
export const getUserInfoAPI = () => {
  return request<UserInfo>({
    url: '/user/userInfo',
  })
}
