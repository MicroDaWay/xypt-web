// 用户地址的数据类型
export interface AddressItem {
  id: number
  buildingNumber: string
  houseNumber: number
  name: string
  phone: string
  userId: number
  isDefault: number
  createTime: string
  updateTime: string
}

export type AddressList = AddressItem[]
