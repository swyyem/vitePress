# Segmented 分段控制器

分段控制器，用于展示多个选项并允许用户选择其中单个选项。

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwySegmented v-model="value1" :options="options1" />

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">选中值：{{ value1 }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('daily')

const options1 = [
  { label: '每日', value: 'daily' },
  { label: '每周', value: 'weekly' },
  { label: '每月', value: 'monthly' },
  { label: '每年', value: 'yearly' },
]
</script>
```

:::

## 带图标

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwySegmented v-model="value2" :options="options2" />

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      当前视图：{{ value2 }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value2 = ref('list')

const options2 = [
  { label: '📋 列表', value: 'list' },
  { label: '🔲 网格', value: 'grid' },
  { label: '📊 图表', value: 'chart' },
]
</script>
```

:::

## 禁用状态

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <div style="margin-bottom: 8px; color: #606266;">整体禁用：</div>
      <SwySegmented v-model="value3" :options="options3" disabled />
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #606266;">部分禁用：</div>
      <SwySegmented v-model="value4" :options="options4" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value3 = ref('option1')
const value4 = ref('option1')

const options3 = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
  { label: '选项3', value: 'option3' },
]

const options4 = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2', disabled: true },
  { label: '选项3', value: 'option3' },
  { label: '选项4', value: 'option4', disabled: true },
]
</script>
```

:::

## 不同尺寸

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <div style="margin-bottom: 8px; color: #606266;">大尺寸：</div>
      <SwySegmented v-model="value5" :options="sizeOptions" size="large" />
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #606266;">默认尺寸：</div>
      <SwySegmented v-model="value5" :options="sizeOptions" />
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #606266;">小尺寸：</div>
      <SwySegmented v-model="value5" :options="sizeOptions" size="small" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value5 = ref('1')

const sizeOptions = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3' },
]
</script>
```

:::

## 块级元素

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwySegmented v-model="value6" :options="blockOptions" block />

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">选中：{{ value6 }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value6 = ref('android')

const blockOptions = [
  { label: '🍎 iOS', value: 'ios' },
  { label: '🤖 Android', value: 'android' },
  { label: '🪟 Windows', value: 'windows' },
]
</script>
```

:::

## API

### Segmented Props

| 参数                 | 说明           | 类型                      | 默认值  |
| -------------------- | -------------- | ------------------------- | ------- |
| modelValue / v-model | 绑定值         | `string / number`         | -       |
| options              | 数据选项       | `array`                   | []      |
| size                 | 尺寸           | `large / default / small` | default |
| block                | 是否为块级元素 | `boolean`                 | false   |
| disabled             | 是否禁用       | `boolean`                 | false   |

### Segmented Events

| 事件名 | 说明         | 参数      |
| ------ | ------------ | --------- |
| change | 值改变时触发 | `(value)` |

### Options

| 参数     | 说明           | 类型              | 默认值 |
| -------- | -------------- | ----------------- | ------ |
| label    | 选项显示的内容 | `string`          | -      |
| value    | 选项的值       | `string / number` | -      |
| disabled | 是否禁用该选项 | `boolean`         | false  |
