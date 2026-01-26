# Calendar 日历

显示日期和事件

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwyCalendar v-model="value" />

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      选择的日期：{{ value }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref(new Date())
</script>
```

:::

## 自定义内

:::demo

```vue
<template>
  <SwyCalendar v-model="customValue">
    <template #dateCell="{ data }">
      <div style="height: 100%; display: flex; flex-direction: column; padding: 5px;">
        <div style="text-align: center; font-weight: bold;">
          {{ data.day.split('-').slice(2)[0] }}
        </div>
        <div v-if="getEvent(data.day)" style="font-size: 12px; color: #409eff; margin-top: 5px;">
          {{ getEvent(data.day) }}
        </div>
      </div>
    </template>
  </SwyCalendar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const customValue = ref(new Date())

const events = {
  '2024-01-20': '🎉 发布',
  '2024-01-18': '📝 会议',
  '2024-01-15': '✈️ 出差',
}

const getEvent = (date: string) => {
  return events[date] || ''
}
</script>
```

:::

## 范围选择

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwyCalendar v-model="rangeValue" range />

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      <div>开始日期：{{ rangeValue[0] }}</div>
      <div>结束日期：{{ rangeValue[1] }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const rangeValue = ref([new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)])
</script>
```

:::

## API

### Calendar Props

| 参数                 | 说明           | 类型                     | 默认  |
| -------------------- | -------------- | ------------------------ | ----- |
| modelValue / v-model | 绑定           | `Date / string / number` |       |
| range                | 是否为范围选择 | `boolean`                | false |
| firstDayOfWeek       | 周起始日       | `number`                 | 0     |

### Calendar Events

| 事件   | 说明         | 参数      |
| ------ | ------------ | --------- |
| change | 值改变时触发 | `(value)` |

### Calendar Slots

| 名称     | 说明         |
| -------- | ------------ |
| dateCell | 日期单元格内 |
