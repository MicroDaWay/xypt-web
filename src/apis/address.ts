import type { AddressItem, AddressList } from '@/types/address'
import request from '@/utils/request'

// 获取用户的所有地址
export const getAddressAPI = () => {
  return request<AddressList>({
    url: '/address/all',
  })
}

// 添加用户地址
export const addAddressAPI = (data: AddressItem) => {
  return request({
    url: '/address/add',
    method: 'POST',
    data,
  })
}

// 根据id获取地址
export const getAddressByIdAPI = (id: number) => {
  return request<AddressItem>({
    url: `/address/${id}`,
  })
}

// 根据id修改地址
export const updateAddressByIdAPI = (data: AddressItem, id: number) => {
  return request({
    url: `/address/update/${id}`,
    method: 'PUT',
    data,
  })
}

// 根据id删除地址
export const deleteAddressByIdAPI = (id: number) => {
  return request({
    url: `/address/delete/${id}`,
    method: 'DELETE',
  })
}
