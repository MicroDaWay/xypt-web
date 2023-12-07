<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import IncomeComponent from './components/IncomeComponent.vue'
import { getIncomeRecordAPI } from '@/apis/user'
import { ref } from 'vue'
import type { IncomeRecordList } from '@/types/user'

// 用户收支数据
const incomeRecordList = ref<IncomeRecordList>([])

// 获取用户收支记录数据
const getIncomeRecord = async () => {
  try {
    const res = await getIncomeRecordAPI()
    if (res.code === 0) {
      incomeRecordList.value = res.data
    }
  } catch (err) {
    console.log('出错了', err)
  }
}

onLoad(() => {
  getIncomeRecord()
})
</script>

<template>
  <view class="list">
    <IncomeComponent v-for="item in incomeRecordList" :key="item.id" :item="item"></IncomeComponent>
  </view>
</template>

<style lang="scss">
page {
  width: 100%;
  height: 100vh;
  background-color: #eee;

  .list {
    padding-bottom: 20rpx;
  }
}
</style>
