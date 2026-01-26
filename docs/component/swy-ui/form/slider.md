# Slider 滑块

通过拖动滑块在固定区间内进行选择

## 基础用法

:::demo

```vue
<template>
  <div style="padding: 20px 0;">
    <SwySlider v-model="value" />
    <div style="margin-top: 16px;">当前值：{{ value }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(50)
</script>
```

:::

## 离散值

设置 step 属性可以改变步长，当 step 大于 0 时，输入值会自动调整为 step 的倍数

:::demo

```vue
<template>
  <div style="padding: 20px 0;">
    <SwySlider v-model="value" :step="10" />
    <div style="margin-top: 16px;">当前值：{{ value }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(20)
</script>
```

:::

## 自定义范围

设置 min 和 max 属性可以自定义取值范围

:::demo

```vue
<template>
  <div style="padding: 20px 0;">
    <SwySlider v-model="value" :min="10" :max="200" />
    <div style="margin-top: 16px;">当前值：{{ value }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(100)
</script>
```

:::

## 禁用状态

设置 disabled 属性可以禁用滑块

:::demo

```vue
<template>
  <div style="padding: 20px 0;">
    <SwySlider v-model="value" disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(60)
</script>
```

:::

## 显示输入框

设置 show-input 属性可以显示输入框

:::demo

```vue
<template>
  <div style="padding: 20px 0;">
    <SwySlider v-model="value" show-input />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(70)
</script>
```

:::

## 范围选择

设置 range 属性可以开启范围选择

:::demo

```vue
<template>
  <div style="padding: 20px 0;">
    <SwySlider v-model="value" range />
    <div style="margin-top: 16px;">范围：{{ value[0] }} - {{ value[1] }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref([20, 80])
</script>
```

:::

## 显示标记

设置 marks 属性可以显示标记

:::demo

```vue
<template>
  <div style="padding: 20px 0;">
    <SwySlider v-model="value" :marks="marks" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(40)
const marks = {
  0: '0°C',
  25: '25°C',
  50: '50°C',
  75: '75°C',
  100: '100°C',
}
</script>
```

:::

## 垂直模式

设置 vertical 属性可以垂直显示

:::demo

```vue
<template>
  <div style="height: 200px; padding: 20px;">
    <SwySlider v-model="value" vertical />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(50)
</script>
```

:::

## API

### Slider Props

| 参数              | 说明                     | 类型                        | 默认值 |
| ----------------- | ------------------------ | --------------------------- | ------ |
| modelValue        | 绑定值                   | `number / number[]`         | 0      |
| min               | 最小值                   | `number`                    | 0      |
| max               | 最大值                   | `number`                    | 100    |
| step              | 步长                     | `number`                    | 1      |
| disabled          | 是否禁用                 | `boolean`                   | false  |
| showInput         | 是否显示输入框           | `boolean`                   | false  |
| showInputControls | 是否显示输入框的控制按钮 | `boolean`                   | true   |
| showStops         | 是否显示间断点           | `boolean`                   | false  |
| showTooltip       | 是否显示提示信息         | `boolean`                   | true   |
| formatTooltip     | 格式化提示信息           | `(value: number) => string` | —      |
| range             | 是否为范围选择           | `boolean`                   | false  |
| vertical          | 是否竖向模式             | `boolean`                   | false  |
| height            | 滑块高度（竖向模式时）   | `string`                    | —      |
| label             | 屏幕阅读器标签           | `string`                    | —      |
| marks             | 标记对象                 | `Record<number, string>`    | —      |

### Slider Events

| 事件名 | 说明           | 参数                          |
| ------ | -------------- | ----------------------------- |
| change | 值改变时触发   | `(value: number \| number[])` |
| input  | 数据改变时触发 | `(value: number \| number[])` |

### Slider Methods

| 方法名 | 说明           | 参数 |
| ------ | -------------- | ---- |
| focus  | 使滑块获取焦点 | —    |
| blur   | 使滑块失去焦点 | —    |
