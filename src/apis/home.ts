import request from '@/utils/request'
import type { BannerList } from '@/types/home'

// 获取首页轮播图
export const getHomeBannerAPI = () => {
  return request<BannerList>({
    url: '/home/banner',
  })
}
