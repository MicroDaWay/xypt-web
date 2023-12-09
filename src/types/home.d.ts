// 首页轮播图的数据类型
export interface BannerItem {
  id: string
  imgUrl: string
}

export type BannerList = BannerItem[]

// 首页菜单数据
export interface MenuItem {
  id: number
  imgUrl: string
  text: string
  state: number
}

export type MenuList = MenuItem[]
