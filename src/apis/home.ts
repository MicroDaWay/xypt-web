import request from '@/utils/request'
import type { BannerList, MenuList } from '@/types/home'

// 获取首页轮播图
export const getHomeBannerAPI = () => {
  return request<BannerList>({
    url: '/home/banner',
  })
}

// 获取首页菜单数据
export const getMenuAPI = () => {
  return request<MenuList>({
    url: '/home/menu',
  })
}
