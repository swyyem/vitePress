# 瀑布流

<br>
<br>

:::demo

```vue
<template>
  <ProSelect
    v-model="select"
    :contentWidth="300"
    :waterfall="true"
    :filterable="true"
    :defaultFirstOption="true"
    :remoteShowSuffix="true"
    :remoteMethod="getData"
    :defaultValueEnum="defaultValueEnum"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const select = ref()
const defaultValueEnum = [
  {
    label: `测试12`,
    value: 12,
  },
  {
    label: `测试13`,
    value: 13,
  },
]
const generateData = (n: number, start?: number, str?: string) => {
  const end = start || 0
  const total = (n || 10) + end
  const res: any = []
  for (let i = end; i < total; i++) {
    res.push({
      label: `测试${i}${str || ''}`,
      value: i,
    })
  }
  return res
}

const getData = (params: any) => {
  console.log('=params=', params)
  return new Promise(resolve => {
    setTimeout(() => {
      const total = (params.from || 0) + (params.size || 10)
      const list = generateData(params.size || 10, params.from || 0, params.keyword)
      console.log('=list=', list)
      resolve({
        data: {
          count: 31,
          result: list,
          hasMore: total < 31 ? true : false,
        },
      })
    }, 1000)
  })
}
</script>
```
