// 用户信息的类型
export interface UserInfo {
  id: string
  username: string
  nickname: string
  avatar: string
  accountMoney: number
  role: number
  gender: number
  phone: string
  createTime: string
  updateTime: string
}

// 用户收支记录的数据类型
export interface IncomeRecordItem {
  id: number
  state: number
  moneyChange: number
  userId: number
  createTime: string
  updateTime: string
}

export type IncomeRecordList = IncomeRecordItem[]
