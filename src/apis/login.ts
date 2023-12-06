import type { LoginParams } from '@/types/login'
import request from '@/utils/request'

// 登录
export const loginAPI = (data: LoginParams) => {
  return request<string>({
    url: '/user/login',
    method: 'POST',
    data,
  })
}

// 注册
export const registerAPI = (data: LoginParams) => {
  return request({
    url: '/user/register',
    method: 'POST',
    data,
  })
}
