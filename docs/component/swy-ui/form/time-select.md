# TimeSelect 时间选择

用于选择或输入日期�?

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <div style="margin-bottom: 8px; color: #606266;">选择时间�?/div>
      <SwyTimeSelect v-model="value" placeholder="请选择时间" />
    </div>

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      选择的时间：{{ value }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
</script>
```

:::

## 固定时间范围

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <div>
      <div style="margin-bottom: 8px; color: #606266;">选择时间�?9:00-18:00）：</div>
      <SwyTimeSelect
        v-model="value1"
        start="09:00"
        end="18:00"
        step="00:30"
        placeholder="选择时间"
      />
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #606266;">选择时间�?0:00-12:00�?5分钟间隔）：</div>
      <SwyTimeSelect
        v-model="value2"
        start="00:00"
        end="12:00"
        step="00:15"
        placeholder="选择时间"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
</script>
```

:::

## 不同尺寸

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <SwyTimeSelect v-model="value3" size="large" placeholder="大尺�? />
    <SwyTimeSelect v-model="value4" placeholder="默认尺寸" />
    <SwyTimeSelect v-model="value5" size="small" placeholder="小尺�? />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value3 = ref('')
const value4 = ref('')
const value5 = ref('')
</script>
```

:::

## API

### TimeSelect Props

| 参数                 | 说明     | 类型                      | 默认�?  |
| -------------------- | -------- | ------------------------- | ------- |
| modelValue / v-model | 绑定�?   | `string`                  | �?      |
| placeholder          | 占位文本 | `string`                  | �?      |
| start                | 开始时�? | `string`                  | 09:00   |
| end                  | 结束时间 | `string`                  | 18:00   |
| step                 | 时间步长 | `string`                  | 00:30   |
| disabled             | 是否禁用 | `boolean`                 | false   |
| size                 | 尺寸     | `large / default / small` | default |

### TimeSelect Events

| 事件�? | 说明           | 参数                  |
| ------ | -------------- | --------------------- |
| change | 值改变时触发   | `(value: string)`     |
| blur   | 失去焦点时触�? | `(event: FocusEvent)` |
| focus  | 获得焦点时触�? | `(event: FocusEvent)` |
