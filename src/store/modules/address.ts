import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AddressItem } from '@/types/address'

export const useAddressStore = defineStore('address', () => {
  // 当前选择的地址
  const address = ref<AddressItem>({} as AddressItem)

  // 修改地址
  const updateAddress = (value: AddressItem) => {
    address.value = value
  }

  return {
    address,
    updateAddress,
  }
})
