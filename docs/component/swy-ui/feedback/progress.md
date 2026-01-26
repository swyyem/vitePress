# Progress 进度条

用于展示操作进度,告知用户当前状态和预期

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwyProgress :percentage="0" />
    <SwyProgress :percentage="50" />
    <SwyProgress :percentage="100" />
    <SwyProgress :percentage="100" status="success" />
    <SwyProgress :percentage="100" status="warning" />
    <SwyProgress :percentage="50" status="exception" />
  </div>
</template>
```

:::

## 百分比内显

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwyProgress :percentage="70" :text-inside="true" :stroke-height="26" />
    <SwyProgress :percentage="100" :text-inside="true" :stroke-height="24" status="success" />
    <SwyProgress :percentage="80" :text-inside="true" :stroke-height="22" status="warning" />
    <SwyProgress :percentage="50" :text-inside="true" :stroke-height="20" status="exception" />
  </div>
</template>
```

:::

## 自定义颜色

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwyProgress :percentage="percentage" color="#409eff" />
    <SwyProgress :percentage="percentage" :color="customColor" />
    <SwyProgress :percentage="percentage" :color="customColors" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const percentage = ref(20)

const customColor = computed(() => {
  if (percentage.value < 30) {
    return '#909399'
  }
  if (percentage.value < 70) {
    return '#e6a23c'
  }
  return '#67c23a'
})

const customColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]

setInterval(() => {
  percentage.value = (percentage.value % 100) + 10
}, 500)
</script>
```

:::

## 环形进度条

:::demo

```vue
<template>
  <div style="display: flex; gap: 20px;">
    <SwyProgress type="circle" :percentage="0" />
    <SwyProgress type="circle" :percentage="25" />
    <SwyProgress type="circle" :percentage="100" status="success" />
    <SwyProgress type="circle" :percentage="70" status="warning" />
    <SwyProgress type="circle" :percentage="50" status="exception" />
  </div>
</template>
```

:::

## 仪表盘形进度条

:::demo

```vue
<template>
  <div style="display: flex; gap: 20px;">
    <SwyProgress type="dashboard" :percentage="percentage" :color="colors" />
    <SwyProgress type="dashboard" :percentage="percentage2" :color="colors" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const percentage = ref(10)
const percentage2 = ref(0)

const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]

setInterval(() => {
  percentage.value = (percentage.value % 100) + 10
  percentage2.value = (percentage2.value % 100) + 5
}, 500)
</script>
```

:::

## API

### Progress Props

| 参数         | 说明                                               | 类型                                                                 | 默认值 |
| ------------ | -------------------------------------------------- | -------------------------------------------------------------------- | ------ |
| percentage   | 百分比(必填)                                       | `number`                                                             | 0      |
| type         | 进度条类型                                         | `'line' \| 'circle' \| 'dashboard'`                                  | line   |
| strokeWidth  | 进度条的宽度                                       | `number`                                                             | 6      |
| textInside   | 进度条显示文字内置在进度条内(仅 type 为 'line' 时) | `boolean`                                                            | false  |
| status       | 进度条当前状态                                     | `'success' \| 'exception' \| 'warning'`                              |        |
| color        | 进度条背景色(会覆盖 status 状态颜色)               | `string \| function \| Array<{ color: string, percentage: number }>` |        |
| width        | 环形进度条画布宽度(仅 type 为 circle/dashboard 时) | `number`                                                             | 126    |
| showText     | 是否显示进度条文字内容                             | `boolean`                                                            | true   |
| strokeHeight | 进度条的高度                                       | `number`                                                             | 6      |
| format       | 指定进度条文字内容                                 | `function(percentage)`                                               |        |
