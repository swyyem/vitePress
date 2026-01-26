# Rate 评分

评分组件

## 基础用法

:::demo

```vue
<template>
  <SwyRate v-model="value" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(0)
</script>
```

:::

## 显示分数

设置 show-text 属性可以显示对应的文字描述

:::demo

```vue
<template>
  <SwyRate v-model="value" show-text />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(3)
</script>
```

:::

## 只读

设置 disabled 属性为只读状态

:::demo

```vue
<template>
  <SwyRate v-model="value" disabled />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(4)
</script>
```

:::

## 自定义星星数

设置 max 属性可以自定义最大星星数

:::demo

```vue
<template>
  <SwyRate v-model="value" :max="10" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(7)
</script>
```

:::

## 允许半选

设置 allow-half 属性可以允许半星

:::demo

```vue
<template>
  <SwyRate v-model="value" allow-half />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(2.5)
</script>
```

:::

## 自定义颜色

设置 colors 属性可以自定义不同分段的颜色

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <SwyRate v-model="value1" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" />
    <SwyRate v-model="value2" :colors="['#e74c3c', '#f39c12', '#27ae60']" show-text />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value1 = ref(3)
const value2 = ref(4)
</script>
```

:::

## API

### Rate Props

| 参数              | 说明                 | 类型                | 默认值                                   |
| ----------------- | -------------------- | ------------------- | ---------------------------------------- |
| modelValue        | 绑定值               | `number`            | 0                                        |
| max               | 最大分值             | `number`            | 5                                        |
| disabled          | 是否只读             | `boolean`           | false                                    |
| allowHalf         | 是否允许半选         | `boolean`           | false                                    |
| showText          | 是否显示辅助文字     | `boolean`           | false                                    |
| showScore         | 是否显示当前分数     | `boolean`           | false                                    |
| textColor         | 辅助文字颜色         | `string`            | —                                        |
| texts             | 辅助文字数组         | `string[]`          | ['极差', '失望', '一般', '满意', '惊喜'] |
| scoreTemplate     | 分数显示模板         | `string`            | {value}                                  |
| colors            | 图标颜色数组         | `string[] / string` | ['#F7BA2A', '#F7BA2A', '#F7BA2A']        |
| voidColor         | 未选中图标颜色       | `string`            | #C6D1DE                                  |
| disabledVoidColor | 只读时未选中图标颜色 | `string`            | #EFF2F7                                  |

### Rate Events

| 事件名 | 说明           | 参数              |
| ------ | -------------- | ----------------- |
| change | 分值改变时触发 | `(value: number)` |

### Rate Methods

| 方法名          | 说明       | 参数              |
| --------------- | ---------- | ----------------- |
| setCurrentValue | 设置当前值 | `(value: number)` |
