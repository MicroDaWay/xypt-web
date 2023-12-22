import type { IncomeRecordList, UserInfo } from '@/types/user'
import request from '@/utils/request'

// 获取用户信息
export const getUserInfoAPI = () => {
  return request<UserInfo>({
    url: '/user/userInfo',
  })
}

// 更新用户信息
export const updateUserInfoAPI = (data: UserInfo) => {
  return request({
    url: '/user/update',
    method: 'PUT',
    data,
  })
}

// 获取用户钱包余额
export const getWalletBalanceAPI = () => {
  return request<number>({
    url: '/user/balance',
  })
}

// 支付
export const payAPI = (data: { money: number }) => {
  return request({
    url: '/user/pay',
    method: 'POST',
    data,
  })
}

// 获取用户收支记录
export const getIncomeRecordAPI = () => {
  return request<IncomeRecordList>({
    url: '/user/incomeRecord',
  })
}
