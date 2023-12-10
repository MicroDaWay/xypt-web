import { ref } from 'vue'

// 订单状态列表
export const orderStateList = ref([
  { orderState: 0, value: '全部订单' },
  { orderState: 1, value: '待接单' },
  { orderState: 2, value: '待送达' },
  { orderState: 3, value: '待收货' },
  { orderState: 4, value: '待评价' },
  { orderState: 5, value: '已取消' },
  { orderState: 6, value: '已完成' },
])

export enum OrderStateEnum {
  AwaitPending = 1, // 待接单
  AwaitSend = 2, // 待送达
  AwaitReceive = 3, // 待收货
  AwaitEvaluate = 4, // 待评价
  Cancel = 5, // 已取消
  FullFilled = 6, // 已完成
}
