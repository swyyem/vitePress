# 下拉表格

<br>
<br>

:::demo

```vue
<template>
  <ProSelect
    v-model="select"
    valueKey="id"
    :labelKey="(v: any) => v?.nesting.chargeItemId"
    waterfall
    filterable
    collapseTags
    :tableProps="{
      request: getData,
      columns: chargeItemColumns,
    }"
    :onUpdate:modelValue="saveSelect"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const select = ref()

const saveSelect = (val: any) => {
  console.log('=select=', val)
}

const chargeItemColumns = [
  {
    label: '序号',
    type: 'seq',
    width: '50',
  },
  {
    prop: 'nesting.chargeItemId',
    label: '收费项目ID',
    minWidth: 150,
  },
  {
    field: 'campusId',
    title: '使用院区',
    width: '150',
  },
  {
    field: 'chargeItemCount',
    title: '收费项目次数',
    width: '120',
    valueType: 'inputNumber',
  },
]

const generateTableData = (n: number = 10, start?: number, str = ''): any[] => {
  const res: any[] = []
  const realStart = start || 0
  for (let i = 0; i < n; i++) {
    res.push({
      id: realStart + i,
      nesting: {
        chargeItemId: `45435${realStart + i}${str}`,
      },
      campusId: 1,
      chargeItemCount: 3,
      filmFeeType: 2,
      graphicFeeFlag: false,
      digitalImagingFeeFlag: true,
      useScopeList: ['INP'],
      enableFlag: i % 3 === 0 ? true : false,
    })
  }
  return res
}

const getData = (params: any) => {
  console.log('=table fetch=', params)
  const list = generateTableData(params.size, params.from, params.keyword)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          count: 351,
          result: list,
          hasMore: true,
        },
      })
    }, 2000)
  })
}
</script>
```
