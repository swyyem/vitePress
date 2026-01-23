# Pagination 分页

当数据量过多时，使用分页分解数据。

## 基础用法

:::demo

```vue
<template>
  <SwyPagination
    :current-page="currentPage"
    :page-size="10"
    :total="100"
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
  <SwyPagination :current-page="currentPage" :page-size="10" :total="100" background />
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
  <SwyPagination :current-page="currentPage" :page-size="10" :total="50" small />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const currentPage = ref(2)
</script>
```

:::

## Pagination 属性

| 属性名                              | 说明                     | 类型    | 可选值 | 默认值 |
| ----------------------------------- | ------------------------ | ------- | ------ | ------ |
| current-page / v-model:current-page | 当前页数                 | number  | —      | 1      |
| page-size                           | 每页显示条目个数         | number  | —      | 10     |
| total                               | 总条目数                 | number  | —      | 0      |
| small                               | 是否使用小型分页样式     | boolean | —      | false  |
| background                          | 是否为分页按钮添加背景色 | boolean | —      | false  |

## Pagination 事件

| 事件名             | 说明                        | 回调参数              |
| ------------------ | --------------------------- | --------------------- |
| current-change     | 当前页改变时触发            | (currentPage: number) |
| update:currentPage | 当前页改变时触发（v-model） | (currentPage: number) |
