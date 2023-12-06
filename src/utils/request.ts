import { useUserStore } from '@/store/modules/user'

const baseURL = 'http://localhost:8080'

// 添加拦截器
const interceptorObj = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }

    // 请求超时 默认为 60s
    options.timeout = 5000

    options.header = {}

    // 添加token请求头标识
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
      options.header.Authorization = token
    }
  },
}

uni.addInterceptor('request', interceptorObj)
uni.addInterceptor('uploadFile', interceptorObj)

interface ResponseData<T> {
  code: number
  message: string
  data: T
}

const request = <T>(options: UniApp.RequestOptions) => {
  return new Promise<ResponseData<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 请求成功
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as ResponseData<T>)
        } else if (res.statusCode === 401) {
          // 401错误 清理用户信息 跳转到登录页
          const userStore = useUserStore()
          userStore.clearUserInfo()
          uni.navigateTo({
            url: '/pages/login/login',
          })
          uni.showToast({
            icon: 'none',
            title: (res.data as ResponseData<T>).message,
          })
          reject(res)
        } else {
          // 其他错误
          uni.showToast({
            icon: 'none',
            title: (res.data as ResponseData<T>).message || '请求错误',
          })
          reject(res)
        }
      },
      // 请求错误
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网路错误',
        })
        reject(err)
      },
    })
  })
}

export default request
