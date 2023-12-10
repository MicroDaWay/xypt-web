import type { PlaceOrderParams } from '@/types/order'
import request from '@/utils/request'

// 提交订单
export const submitOrderAPI = (data: PlaceOrderParams) => {
  return request({
    url: '/order/submit',
    method: 'POST',
    data,
  })
}

// 获取订单
export const getOrderAPI = (orderState: number) => {
  return request<PlaceOrderParams[]>({
    url: '/order/get',
    data: {
      orderState,
    },
  })
}

// 获取待接单的订单
export const getPendingOrdersAPI = () => {
  return request<PlaceOrderParams[]>({
    url: '/order/getPendingOrders',
  })
}

// 更新订单状态
export const updateOrderStateAPI = (id: number, orderState: number) => {
  return request({
    url: `/order/updateOrderState?id=${id}&orderState=${orderState}`,
    method: 'PUT',
  })
}

// 订单评价
export const evaluateOrderAPI = (data: PlaceOrderParams) => {
  return request({
    url: '/order/evaluate',
    method: 'POST',
    data,
  })
}

// 删除订单
export const deleteOrderByIdAPI = (id: number) => {
  return request({
    url: `/order/delete/${id}`,
    method: 'DELETE',
  })
}

// 骑手接单
export const riderReceiveAPI = (id: number) => {
  return request({
    url: `/order/riderReceive/${id}`,
    method: 'PUT',
  })
}

// 获取骑手订单
export const getRiderOrderAPI = () => {
  return request<PlaceOrderParams[]>({
    url: '/order/riderOrder',
  })
}
