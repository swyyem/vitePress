# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px;">
    <SwySelect v-model="value" :options="options" placeholder="请选择" @change="handleChange" />
    <p style="margin: 0; font-size: 13px; color: #606266;">当前选中：{{ value || '—' }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const options = ref([
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
  { label: '选项四', value: '4' },
  { label: '选项五', value: '5' },
])

function handleChange(val: string) {
  console.log('change:', val)
}
</script>
```

:::

## 可清空

设置 `clearable` 后，当有选中值时，鼠标悬停会出现清除按钮。

:::demo

```vue
<template>
  <div style="max-width: 300px;">
    <SwySelect v-model="value" :options="options" clearable placeholder="可以清空" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('1')
const options = ref([
  { label: '北京', value: '1' },
  { label: '上海', value: '2' },
  { label: '广州', value: '3' },
  { label: '深圳', value: '4' },
])
</script>
```

:::

## 禁用选项

在选项中设置 `disabled: true` 可禁用某个选项。

:::demo

```vue
<template>
  <div style="max-width: 300px;">
    <SwySelect v-model="value" :options="options" placeholder="部分选项已禁用" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const options = ref([
  { label: '选项一（正常）', value: '1' },
  { label: '选项二（禁用）', value: '2', disabled: true },
  { label: '选项三（正常）', value: '3' },
  { label: '选项四（禁用）', value: '4', disabled: true },
  { label: '选项五（正常）', value: '5' },
])
</script>
```

:::

## 禁用状态

整个选择器设置 `disabled` 时不可交互。

:::demo

```vue
<template>
  <div style="max-width: 300px;">
    <SwySelect v-model="value" :options="options" disabled placeholder="已禁用" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('1')
const options = ref([
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
])
</script>
```

:::

## 尺寸

提供 `large`、`default`、`small` 三种尺寸。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px;">
    <SwySelect v-model="v1" :options="options" size="large" placeholder="大尺寸 large" />
    <SwySelect v-model="v2" :options="options" size="default" placeholder="默认尺寸 default" />
    <SwySelect v-model="v3" :options="options" size="small" placeholder="小尺寸 small" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const v1 = ref('')
const v2 = ref('')
const v3 = ref('')
const options = ref([
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
])
</script>
```

:::

## API

### Props

| 参数                 | 说明               | 类型                                 | 默认值    |
| -------------------- | ------------------ | ------------------------------------ | --------- |
| modelValue / v-model | 绑定值             | `string \| number`                   | `''`      |
| options              | 选项数组           | `Array<{ label, value, disabled? }>` | `[]`      |
| placeholder          | 占位文本           | `string`                             | `请选择`  |
| disabled             | 是否禁用整个选择器 | `boolean`                            | `false`   |
| clearable            | 是否可清空         | `boolean`                            | `false`   |
| size                 | 尺寸               | `'large' \| 'default' \| 'small'`    | `default` |

### Events

| 事件名 | 说明             | 回调参数                    |
| ------ | ---------------- | --------------------------- |
| change | 选中值变化时触发 | `(value: string \| number)` |

### Exposes

| 名称    | 说明        | 类型               |
| ------- | ----------- | ------------------ |
| rootRef | 根 DOM 元素 | `Ref<HTMLElement>` |
