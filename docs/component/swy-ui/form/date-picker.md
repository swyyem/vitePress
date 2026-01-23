# DatePicker 日期选择

用于选择或输入日期

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <div style="margin-bottom: 8px; color: #606266;">选择日期</div>
      <SwyDatePicker v-model="date1" placeholder="请选择日期" />
    </div>

    <div>
      <div style="margin-bottom: 8px; color: #606266;">选择日期时间</div>
      <SwyDatePicker v-model="date2" type="datetime" placeholder="请选择日期时间" />
    </div>

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      <h4 style="margin-top: 0;">已选日期：</h4>
      <pre style="margin: 0;">{{ { date1, date2 } }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const date1 = ref('')
const date2 = ref('')
</script>
```

:::

## 日期范围

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <div style="margin-bottom: 8px; color: #606266;">选择日期范围</div>
      <SwyDatePicker
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
    </div>

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      <h4 style="margin-top: 0;">已选范围：</h4>
      <pre style="margin: 0;">{{ dateRange }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dateRange = ref([])
</script>
```

:::

## 不同尺寸

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <SwyDatePicker v-model="date1" size="large" placeholder="大尺寸" />
    <SwyDatePicker v-model="date2" placeholder="默认尺寸" />
    <SwyDatePicker v-model="date3" size="small" placeholder="小尺寸" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const date1 = ref('')
const date2 = ref('')
const date3 = ref('')
</script>
```

:::

## 禁用状态

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <SwyDatePicker v-model="date" disabled placeholder="禁用状态" />
    <SwyDatePicker v-model="date2" :disabled-date="disabledDate" placeholder="禁用特定日期" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const date = ref('')
const date2 = ref('')

const disabledDate = (time: Date) => {
  return time.getTime() < Date.now() - 8.64e7
}
</script>
```

:::

## API

### DatePicker Props

| 参数                 | 说明           | 类型                                          | 默认值     |
| -------------------- | -------------- | --------------------------------------------- | ---------- |
| modelValue / v-model | 绑定值         | `string / Date / number`                      | —          |
| type                 | 显示类型       | `date / datetime / daterange / datetimerange` | date       |
| placeholder          | 占位内容       | `string`                                      | —          |
| size                 | 尺寸           | `large / default / small`                     | default    |
| disabled             | 是否禁用       | `boolean`                                     | false      |
| clearable            | 是否可清空     | `boolean`                                     | true       |
| format               | 显示格式       | `string`                                      | YYYY-MM-DD |
| disabledDate         | 禁用日期的函数 | `(date: Date) => boolean`                     | —          |

### DatePicker Events

| 事件名 | 说明                   | 参数                      |
| ------ | ---------------------- | ------------------------- |
| change | 用户确认选定的值时触发 | `(value: string \| Date)` |
| blur   | 失去焦点时触发         | `(event: FocusEvent)`     |
| focus  | 获得焦点时触发         | `(event: FocusEvent)`     |
