# InputNumber 数字输入框

仅允许输入标准的数字值，可定义范围

## 基础用法

:::demo

```vue
<template>
  <SwyInputNumber v-model="value" :min="1" :max="10" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(1)
</script>
```

:::

## 步长

设置 step 属性可以控制步长

:::demo

```vue
<template>
  <SwyInputNumber v-model="value" :step="2" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(0)
</script>
```

:::

## 精度

设置 precision 属性可以控制数值精度

:::demo

```vue
<template>
  <SwyInputNumber v-model="value" :precision="2" :step="0.1" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(1)
</script>
```

:::

## 不同尺寸

提供三种尺寸：large、default、small

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <SwyInputNumber v-model="value" size="large" />
    <SwyInputNumber v-model="value" />
    <SwyInputNumber v-model="value" size="small" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(1)
</script>
```

:::

## 按钮位置

设置 controls-position 属性可以控制按钮位置

:::demo

```vue
<template>
  <SwyInputNumber v-model="value" controls-position="right" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(1)
</script>
```

:::

## 禁用状态

:::demo

```vue
<template>
  <SwyInputNumber v-model="value" disabled />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(5)
</script>
```

:::

## API

### InputNumber Props

| 参数             | 说明             | 类型                      | 默认值    |
| ---------------- | ---------------- | ------------------------- | --------- |
| modelValue       | 绑定值           | `number`                  | —         |
| min              | 最小值           | `number`                  | -Infinity |
| max              | 最大值           | `number`                  | Infinity  |
| step             | 步长             | `number`                  | 1         |
| precision        | 数值精度         | `number`                  | —         |
| size             | 输入框尺寸       | `large / default / small` | default   |
| disabled         | 是否禁用         | `boolean`                 | false     |
| controls         | 是否显示控制按钮 | `boolean`                 | true      |
| controlsPosition | 控制按钮位置     | `default / right`         | default   |
| placeholder      | 占位文本         | `string`                  | —         |

### InputNumber Events

| 事件名 | 说明           | 参数                           |
| ------ | -------------- | ------------------------------ |
| change | 值改变时触发   | `(value: number \| undefined)` |
| blur   | 失去焦点时触发 | `(event: FocusEvent)`          |
| focus  | 获得焦点时触发 | `(event: FocusEvent)`          |

### InputNumber Methods

| 方法名 | 说明             | 参数 |
| ------ | ---------------- | ---- |
| focus  | 使输入框获取焦点 | —    |
| blur   | 使输入框失去焦点 | —    |
