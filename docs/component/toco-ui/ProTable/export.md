# 基础用法

<br>
<br>

:::demo

```vue
<template>
  <div style="height: 500px">
    <ProTable
      ref="tableColumnRef"
      rowKey="id"
      :request="getData"
      :toolbar="toolbarColumns"
      :columns="columns"
      :edit="false"
      removedKey="invalidFlag"
    >
      <template #toolbar-buttons>
        <el-button type="primary" size="default" @click="onAddItem">新增</el-button>
      </template>
    </ProTable>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
const toolbarColumns = {
  title: '编辑态',
  export: true,
}

const onAddItem = () => {
  ElMessage.success('新增成功')
}

const getRandom = () => {
  return Math.floor(Math.random() * 10000)
}

const generateData = (n: number = 10, start?: number): any[] => {
  const res: any[] = []
  const realStart = start || getRandom()
  for (let i = 0; i < n; i++) {
    res.push({
      id: realStart + i,
      nesting: {
        chargeItemId: i === 0 ? `45436_${i}` : `45435_${i}`,
      },
      chargeItemCount: 10,
      filmFeeType: 2,
      graphicFeeFlag: false,
      digitalImagingFeeFlag: true,
      useScopeList: ['INP'],
      enableFlag: i % 3 === 0 ? true : false,
    })
  }
  return res
}

// 模拟接口数据
const getData = (params: any) => {
  console.log('==', params)
  const list = generateData(params.size)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          count: 351,
          result: list,
          hasMore: params.from >= 351 ? false : true,
        },
      })
    }, 1000)
  })
}

const columns = [
  {
    label: '序号',
    type: 'seq',
    width: '50',
  },
  {
    prop: 'nesting.chargeItemId',
    label: '收费项目ID',
    width: 150,
    ellipsis: true,
    mode: 'read',
  },
  {
    field: 'chargeItemCount',
    title: '收费价格',
    width: '120',
    valueType: 'price',
  },
  {
    field: 'graphicFeeFlag',
    title: '图文费标识',
    width: '95',
    valueType: 'checkbox',
    proFieldProps: {
      fieldProps: {
        multiple: false,
      },
    },
  },
  {
    field: 'digitalImagingFeeFlag',
    title: '数字影像费标识',
    width: '125',
    valueType: 'checkbox',
    proFieldProps: {
      fieldProps: {
        multiple: false,
      },
    },
  },
  {
    field: 'number',
    title: '数量',
    // width: '80',
    valueType: 'inputNumber',
    fixed: 'right',
    proFieldProps: {
      fieldProps: {
        controls: false,
        onKeydown: (e: KeyboardEvent) => {
          console.log('=ev=', e)
        },
      },
    },
  },
]
</script>
```
