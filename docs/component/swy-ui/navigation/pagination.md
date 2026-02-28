# Pagination 分页

当数据量过多时，使用分页分解数据。

## 基础用法

:::demo

```vue
<template>
  <SwyPagination
    v-model:current-page="currentPage"
    :page-size="10"
    :total="100"
    layout="prev, pager, next"
    @current-change="handlePageChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentPage = ref(1)

const handlePageChange = (page: number) => {
  currentPage.value = page
  console.log('当前页', page)
}
</script>
```

:::

## 带背景色

:::demo

```vue
<template>
  <SwyPagination
    v-model:current-page="currentPage"
    :page-size="10"
    :total="100"
    layout="prev, pager, next"
    background
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const currentPage = ref(3)
</script>
```

:::

## 小型分页

:::demo

```vue
<template>
  <SwyPagination
    v-model:current-page="currentPage"
    :page-size="10"
    :total="50"
    layout="prev, pager, next"
    small
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const currentPage = ref(2)
</script>
```

:::

## 完整功能

展示总条目数、每页条数切换、跳转器。

:::demo

```vue
<template>
  <SwyPagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="500"
    :page-sizes="[10, 20, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
    background
    @current-change="handlePageChange"
    @size-change="handleSizeChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(10)

const handlePageChange = (page: number) => {
  console.log('当前页：', page)
}

const handleSizeChange = (size: number) => {
  console.log('每页条数：', size)
}
</script>
```

:::

## 禁用状态

:::demo

```vue
<template>
  <SwyPagination
    :current-page="3"
    :page-size="10"
    :total="100"
    layout="prev, pager, next"
    disabled
  />
</template>
```

:::

## 隐藏单页

只有一页时自动隐藏分页器。

:::demo

```vue
<template>
  <div>
    <p>total=5, pageSize=10 → 只有一页，分页器隐藏：</p>
    <SwyPagination
      :current-page="1"
      :page-size="10"
      :total="5"
      layout="prev, pager, next"
      hide-on-single-page
    />
    <p style="color: #999; font-size: 12px">（此处无内容即为已隐藏）</p>
  </div>
</template>
```

:::

## Pagination 属性

| 属性名                              | 说明                                                        | 类型     | 默认值                |
| ----------------------------------- | ----------------------------------------------------------- | -------- | --------------------- |
| current-page / v-model:current-page | 当前页数                                                    | number   | 1                     |
| page-size / v-model:page-size       | 每页显示条目个数                                            | number   | 10                    |
| total                               | 总条目数                                                    | number   | 0                     |
| layout                              | 组件布局，可选值：`total, sizes, prev, pager, next, jumper` | string   | `'prev, pager, next'` |
| page-sizes                          | 每页条数选择器选项列表                                      | number[] | [10, 20, 50, 100]     |
| pager-count                         | 页码按钮数量（不含省略号）                                  | number   | 5                     |
| small                               | 是否使用小型分页样式                                        | boolean  | false                 |
| background                          | 是否为分页按钮添加背景色                                    | boolean  | false                 |
| disabled                            | 是否禁用                                                    | boolean  | false                 |
| hide-on-single-page                 | 只有一页时是否隐藏                                          | boolean  | false                 |

## Pagination 事件

| 事件名             | 说明                          | 回调参数              |
| ------------------ | ----------------------------- | --------------------- |
| current-change     | 当前页改变时触发              | (currentPage: number) |
| update:currentPage | 当前页改变时触发（v-model）   | (currentPage: number) |
| size-change        | 每页条数改变时触发            | (pageSize: number)    |
| update:pageSize    | 每页条数改变时触发（v-model） | (pageSize: number)    |
