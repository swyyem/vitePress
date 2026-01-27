# ColorPicker 颜色选择

用于选择颜色

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; align-items: center; gap: 20px;">
    <SwyColorPicker v-model="color1" />
    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      选择的颜色：
      <span :style="{ color: color1, fontWeight: 'bold' }">{{ color1 }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const color1 = ref('#409EFF')
</script>
```

:::

## 支持透明

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div style="display: flex; align-items: center; gap: 20px;">
      <SwyColorPicker v-model="color2" show-alpha />
      <div>当前颜色：{{ color2 }}</div>
    </div>

    <div
      :style="{
        width: '200px',
        height: '100px',
        background: color2,
        borderRadius: '4px',
        border: '1px solid #dcdfe6',
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const color2 = ref('rgba(64, 158, 255, 0.5)')
</script>
```

:::

## 预定义颜

:::demo

```vue
<template>
  <div style="display: flex; align-items: center; gap: 20px;">
    <SwyColorPicker v-model="color3" :predefine="predefineColors" />
    <div>{{ color3 }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const color3 = ref('#409EFF')

const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  '#409EFF',
  '#67C23A',
  '#E6A23C',
  '#F56C6C',
  '#909399',
]
</script>
```

:::

## 不同尺寸

:::demo

```vue
<template>
  <div style="display: flex; align-items: center; gap: 15px;">
    <SwyColorPicker v-model="color4" size="large" />
    <SwyColorPicker v-model="color4" />
    <SwyColorPicker v-model="color4" size="small" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const color4 = ref('#409EFF')
</script>
```

:::

## API

### ColorPicker Props

| 参数                 | 说明               | 类型                      | 默认    |
| -------------------- | ------------------ | ------------------------- | ------- |
| modelValue / v-model | 绑定               | `string`                  |         |
| disabled             | 是否禁用           | `boolean`                 | false   |
| size                 | 尺寸               | `large / default / small` | default |
| showAlpha            | 是否支持透明度选择 | `boolean`                 | false   |
| colorFormat          | 颜色的格           | `hex / rgb / hsl / hsv`   | hex     |
| predefine            | 预定义颜           | `array`                   |         |

### ColorPicker Events

| 事件         | 说明                             | 参数              |
| ------------ | -------------------------------- | ----------------- |
| change       | 颜色值改变时触发                 | `(value: string)` |
| activeChange | 面板中当前显示的颜色发生改变时触 | `(value: string)` |
