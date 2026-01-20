# 数据展示组件

本章节包含了数据展示类组件：

- **Table** - 表格组件
- **Tree** - 树形控件组件
- **Collapse** - 折叠面板组件
- **Carousel** - 走马灯组件

---

## Table 表格

用于展示多条结构类似的数据。

### 基础用法

:::demo

```vue
<template>
  <SwyTable :data="tableData" border>
    <template #header>
      <SwyTableColumn label="日期" prop="date" width="150" />
      <SwyTableColumn label="姓名" prop="name" width="120" />
      <SwyTableColumn label="地址" prop="address" />
    </template>
    <template #default="{ row }">
      <td>{{ row.date }}</td>
      <td>{{ row.name }}</td>
      <td>{{ row.address }}</td>
    </template>
  </SwyTable>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
])
</script>
```

:::

### 斑马纹表格

:::demo

```vue
<template>
  <SwyTable :data="tableData" stripe>
    <template #header>
      <SwyTableColumn label="日期" prop="date" />
      <SwyTableColumn label="姓名" prop="name" />
      <SwyTableColumn label="地址" prop="address" />
    </template>
    <template #default="{ row }">
      <td>{{ row.date }}</td>
      <td>{{ row.name }}</td>
      <td>{{ row.address }}</td>
    </template>
  </SwyTable>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  { date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
  { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
  { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
])
</script>
```

:::

---

## Tree 树形控件

用清晰的层级结构展示信息，可展开或折叠。

### 基础用法

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

### 默认展开

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

---

## Collapse 折叠面板

通过折叠面板收纳内容区域。

### 基础用法

:::demo

```vue
<template>
  <SwyCollapse v-model="activeNames" @change="handleChange">
    <SwyCollapseItem name="1" title="一致性 Consistency">
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
      <div>
        在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
      </div>
    </SwyCollapseItem>
    <SwyCollapseItem name="2" title="反馈 Feedback">
      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </SwyCollapseItem>
    <SwyCollapseItem name="3" title="效率 Efficiency">
      <div>简化流程：设计简洁直观的操作流程；</div>
      <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
    </SwyCollapseItem>
  </SwyCollapse>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeNames = ref(['1'])

const handleChange = (val: any) => {
  console.log('active names:', val)
}
</script>
```

:::

### 手风琴效果

:::demo

```vue
<template>
  <SwyCollapse v-model="activeName" accordion>
    <SwyCollapseItem name="1" title="一致性 Consistency">
      <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    </SwyCollapseItem>
    <SwyCollapseItem name="2" title="反馈 Feedback">
      <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
    </SwyCollapseItem>
    <SwyCollapseItem name="3" title="效率 Efficiency">
      <div>简化流程：设计简洁直观的操作流程；</div>
    </SwyCollapseItem>
  </SwyCollapse>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeName = ref('1')
</script>
```

:::

---

## Carousel 走马灯

在有限空间内，循环播放同一类型的图片、文字等内容。

### 基础用法

:::demo

```vue
<template>
  <SwyCarousel height="150px">
    <SwyCarouselItem v-for="item in 4" :key="item">
      <div
        :style="{
          height: '150px',
          background: colors[item - 1],
          lineHeight: '150px',
          textAlign: 'center',
          fontSize: '20px',
          color: '#fff',
        }"
      >
        幻灯片 {{ item }}
      </div>
    </SwyCarouselItem>
  </SwyCarousel>
</template>

<script lang="ts" setup>
const colors = ['#99A9BF', '#F7BA2A', '#FF9900', '#409EFF']
</script>
```

:::

### 指示器位置

:::demo

```vue
<template>
  <SwyCarousel height="150px" indicator-position="outside">
    <SwyCarouselItem v-for="item in 4" :key="item">
      <div
        :style="{
          height: '150px',
          background: colors[item - 1],
          lineHeight: '150px',
          textAlign: 'center',
          fontSize: '20px',
          color: '#fff',
        }"
      >
        幻灯片 {{ item }}
      </div>
    </SwyCarouselItem>
  </SwyCarousel>
</template>

<script lang="ts" setup>
const colors = ['#99A9BF', '#F7BA2A', '#FF9900', '#409EFF']
</script>
```

:::

### 切换箭头

:::demo

```vue
<template>
  <SwyCarousel height="150px" arrow="always">
    <SwyCarouselItem v-for="item in 4" :key="item">
      <div
        :style="{
          height: '150px',
          background: colors[item - 1],
          lineHeight: '150px',
          textAlign: 'center',
          fontSize: '20px',
          color: '#fff',
        }"
      >
        幻灯片 {{ item }}
      </div>
    </SwyCarouselItem>
  </SwyCarousel>
</template>

<script lang="ts" setup>
const colors = ['#99A9BF', '#F7BA2A', '#FF9900', '#409EFF']
</script>
```

:::
