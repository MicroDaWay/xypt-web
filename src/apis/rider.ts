import type { RiderExamineParams } from '@/types/rider'
import request from '@/utils/request'

// 骑手认证
export const riderCertificationAPI = (data: RiderExamineParams) => {
  return request({
    url: '/rider/certification',
    method: 'POST',
    data,
  })
}

// 获取骑手信息
export const getRiderAPI = () => {
  return request<RiderExamineParams>({
    url: '/rider/get',
  })
}

// 更新骑手信息
export const updateRiderAPI = (data: RiderExamineParams) => {
  return request({
    url: '/rider/update',
    method: 'PUT',
    data,
  })
}

// 获取待审核的骑手数据
export const getAwaitExamineAPI = () => {
  return request<RiderExamineParams[]>({
    url: '/rider/awaitExamine',
  })
}

// 审核通过
export const examinePassAPI = (id: number, userId: number) => {
  return request({
    url: `/rider/examinePass?id=${id}&userId=${userId}`,
    method: 'PUT',
  })
}
