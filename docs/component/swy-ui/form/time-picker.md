# TimePicker 时间选择器

用于选择或输入时间。

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <div style="margin-bottom: 8px; color: #606266;">选择时间：</div>
      <SwyTimePicker v-model="time1" placeholder="请选择时间" />
    </div>

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      <h4 style="margin-top: 0;">已选时间：</h4>
      <pre style="margin: 0;">{{ time1 }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const time1 = ref('')
</script>
```

:::

## 时间范围

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <div style="margin-bottom: 8px; color: #606266;">选择时间范围：</div>
      <SwyTimePicker
        v-model="timeRange"
        is-range
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      />
    </div>

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      <h4 style="margin-top: 0;">已选时间范围：</h4>
      <pre style="margin: 0;">{{ timeRange }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const timeRange = ref([])
</script>
```

:::

## 不同尺寸

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <SwyTimePicker v-model="time1" size="large" placeholder="大尺寸" />
    <SwyTimePicker v-model="time2" placeholder="默认尺寸" />
    <SwyTimePicker v-model="time3" size="small" placeholder="小尺寸" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const time1 = ref('')
const time2 = ref('')
const time3 = ref('')
</script>
```

:::

## 固定时间范围

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <div>
      <div style="margin-bottom: 8px; color: #606266;">限制开始时间：</div>
      <SwyTimePicker v-model="time1" :start="start" placeholder="9:00 - 18:00" />
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #606266;">限制结束时间：</div>
      <SwyTimePicker v-model="time2" :end="end" placeholder="00:00 - 12:00" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const time1 = ref('')
const time2 = ref('')
const start = '09:00'
const end = '12:00'
</script>
```

:::

## API

### TimePicker Props

| 参数                 | 说明           | 类型                      | 默认值   |
| -------------------- | -------------- | ------------------------- | -------- |
| modelValue / v-model | 绑定值         | `string / Date`           | —        |
| placeholder          | 占位内容       | `string`                  | —        |
| size                 | 尺寸           | `large / default / small` | default  |
| disabled             | 是否禁用       | `boolean`                 | false    |
| clearable            | 是否可清空     | `boolean`                 | true     |
| format               | 显示格式       | `string`                  | HH:mm:ss |
| isRange              | 是否为时间范围 | `boolean`                 | false    |
| start                | 开始时间       | `string`                  | 00:00    |
| end                  | 结束时间       | `string`                  | 23:59    |

### TimePicker Events

| 事件名 | 说明                   | 参数                  |
| ------ | ---------------------- | --------------------- |
| change | 用户确认选定的值时触发 | `(value: string)`     |
| blur   | 失去焦点时触发         | `(event: FocusEvent)` |
| focus  | 获得焦点时触发         | `(event: FocusEvent)` |
