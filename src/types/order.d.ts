// 下单的参数类型
export interface PlaceOrderParams {
  id: number
  tradeName: string
  desc: string
  fee: number
  orderType: number
  orderState: number
  note: string
  evaluate: string
  rate: number
  payUserId: number
  payUserName: string
  payUserAddress: string
  payUserPhone: string
  receiveUserId: number
  receiveUserPhone: string
  receiveUserName: string
  createTime: string
  updateTime: string
}
