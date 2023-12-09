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
