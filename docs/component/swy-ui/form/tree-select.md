# TreeSelect 树形选择

用清晰的层级结构展示信息，可选择�?

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwyTreeSelect v-model="value" :data="data" placeholder="请选择" />

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">选中值：{{ value }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')

const data = [
  {
    value: '1',
    label: '一�?1',
    children: [
      { value: '1-1', label: '二级 1-1' },
      { value: '1-2', label: '二级 1-2' },
    ],
  },
  {
    value: '2',
    label: '一�?2',
    children: [
      { value: '2-1', label: '二级 2-1' },
      { value: '2-2', label: '二级 2-2' },
    ],
  },
]
</script>
```

:::

## 可清�?

:::demo

```vue
<template>
  <SwyTreeSelect v-model="clearValue" :data="treeData" clearable placeholder="可清�? />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const clearValue = ref('1-1')

const treeData = [
  {
    value: '1',
    label: '前端',
    children: [
      { value: '1-1', label: 'Vue' },
      { value: '1-2', label: 'React' },
      { value: '1-3', label: 'Angular' },
    ],
  },
  {
    value: '2',
    label: '后端',
    children: [
      { value: '2-1', label: 'Node.js' },
      { value: '2-2', label: 'Java' },
      { value: '2-3', label: 'Python' },
    ],
  },
]
</script>
```

:::

## 多�?

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwyTreeSelect v-model="multipleValue" :data="multiData" multiple placeholder="支持多�? />

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      已选择：{{ multipleValue }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const multipleValue = ref([])

const multiData = [
  {
    value: 'doc',
    label: '文档',
    children: [
      { value: 'guide', label: '指南' },
      { value: 'api', label: 'API' },
      { value: 'faq', label: 'FAQ' },
    ],
  },
  {
    value: 'comp',
    label: '组件',
    children: [
      { value: 'basic', label: '基础组件' },
      { value: 'form', label: '表单组件' },
      { value: 'data', label: '数据组件' },
    ],
  },
]
</script>
```

:::

## 可搜�?

:::demo

```vue
<template>
  <SwyTreeSelect v-model="searchValue" :data="searchData" filterable placeholder="可搜�? />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchValue = ref('')

const searchData = [
  {
    value: 'asia',
    label: '亚洲',
    children: [
      { value: 'china', label: '中国' },
      { value: 'japan', label: '日本' },
      { value: 'korea', label: '韩国' },
    ],
  },
  {
    value: 'europe',
    label: '欧洲',
    children: [
      { value: 'uk', label: '英国' },
      { value: 'france', label: '法国' },
      { value: 'germany', label: '德国' },
    ],
  },
]
</script>
```

:::

## API

### TreeSelect Props

| 参数                 | 说明       | 类型                      | 默认�? |
| -------------------- | ---------- | ------------------------- | ------ |
| modelValue / v-model | 绑定�?     | `string / number / array` | �?     |
| data                 | 数据�?     | `array`                   | []     |
| placeholder          | 占位文本   | `string`                  | 请选择 |
| multiple             | 是否多�?   | `boolean`                 | false  |
| clearable            | 是否可清�? | `boolean`                 | false  |
| filterable           | 是否可搜�? | `boolean`                 | false  |
| disabled             | 是否禁用   | `boolean`                 | false  |

### TreeSelect Events

| 事件�? | 说明                 | 参数      |
| ------ | -------------------- | --------- |
| change | 选中值发生变化时触发 | `(value)` |
| clear  | 清空选项时触�?       | �?        |
