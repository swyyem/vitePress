# Tree 树形控件

用清晰的层级结构展示信息，可展开或折叠。

## 基础用法

:::demo

```vue
<template>
  <SwyTree :data="treeData" @node-click="handleNodeClick" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const treeData = ref([
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 11,
        label: '二级 1-1',
        children: [
          { id: 111, label: '三级 1-1-1' },
          { id: 112, label: '三级 1-1-2' },
        ],
      },
    ],
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      { id: 21, label: '二级 2-1' },
      { id: 22, label: '二级 2-2' },
    ],
  },
])

const handleNodeClick = (node: any) => {
  console.log('node clicked:', node)
}
</script>
```

:::

## 默认展开

:::demo

```vue
<template>
  <SwyTree :data="treeData" default-expand-all />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const treeData = ref([
  {
    id: 1,
    label: '一级 1',
    children: [
      { id: 11, label: '二级 1-1' },
      { id: 12, label: '二级 1-2' },
    ],
  },
  {
    id: 2,
    label: '一级 2',
    children: [{ id: 21, label: '二级 2-1' }],
  },
])
</script>
```

:::

## API

### Tree 属性

| 参数               | 说明                 | 类型      | 默认值  |
| ------------------ | -------------------- | --------- | ------- |
| data               | 展示数据             | `array`   | —       |
| props              | 配置选项，具体看下表 | `object`  | —       |
| default-expand-all | 是否默认展开所有节点 | `boolean` | `false` |

### Tree 事件名

| 事件名     | 说明               | 参数                                         |
| ---------- | ------------------ | -------------------------------------------- |
| node-click | 节点被点击时的回调 | `(data: object, node: object, event: Event)` |
