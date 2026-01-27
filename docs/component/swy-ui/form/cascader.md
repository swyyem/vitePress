# Cascader 级联选择

当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div>
      <div style="margin-bottom: 8px; color: #606266;">选择地区</div>
      <SwyCascader v-model="value" :options="options" placeholder="请选择地区" />
    </div>

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      <h4 style="margin-top: 0;">已选值：</h4>
      <pre style="margin: 0;">{{ value }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      { value: 'hangzhou', label: '杭州' },
      { value: 'ningbo', label: '宁波' },
      { value: 'wenzhou', label: '温州' },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      { value: 'nanjing', label: '南京' },
      { value: 'suzhou', label: '苏州' },
      { value: 'wuxi', label: '无锡' },
    ],
  },
  {
    value: 'guangdong',
    label: '广东',
    children: [
      { value: 'guangzhou', label: '广州' },
      { value: 'shenzhen', label: '深圳' },
      { value: 'zhuhai', label: '珠海' },
    ],
  },
]
</script>
```

:::

## 可清

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwyCascader v-model="value2" :options="options" clearable placeholder="可清空选项" />

    <div style="color: #606266;">
      当前值：{{ value2.length > 0 ? value2.join(' / ') : '未选择' }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value2 = ref([])

const options = [
  {
    value: 'beijing',
    label: '北京',
    children: [
      { value: 'chaoyang', label: '朝阳' },
      { value: 'haidian', label: '海淀' },
    ],
  },
  {
    value: 'shanghai',
    label: '上海',
    children: [
      { value: 'pudong', label: '浦东新区' },
      { value: 'huangpu', label: '黄浦' },
    ],
  },
]
</script>
```

:::

## 多

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwyCascader
      v-model="multipleValue"
      :options="options"
      multiple
      collapse-tags
      placeholder="支持多选"
    />

    <div style="padding: 15px; background: #f5f7fa; border-radius: 4px;">
      <h4 style="margin-top: 0;">已选择 {{ multipleValue.length }} 项：</h4>
      <pre style="margin: 0;">{{ multipleValue }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const multipleValue = ref([])

const options = [
  {
    value: 'fruit',
    label: '水果',
    children: [
      { value: 'apple', label: '苹果' },
      { value: 'banana', label: '香蕉' },
      { value: 'orange', label: '橙子' },
    ],
  },
  {
    value: 'vegetable',
    label: '蔬菜',
    children: [
      { value: 'tomato', label: '番茄' },
      { value: 'potato', label: '土豆' },
      { value: 'cabbage', label: '白菜' },
    ],
  },
]
</script>
```

:::

## 不同尺寸

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <SwyCascader v-model="value1" :options="options" size="large" placeholder="大尺寸" />
    <SwyCascader v-model="value2" :options="options" placeholder="默认尺寸" />
    <SwyCascader v-model="value3" :options="options" size="small" placeholder="小尺寸" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref([])
const value2 = ref([])
const value3 = ref([])

const options = [
  {
    value: 'guide',
    label: '指南',
    children: [
      { value: 'basic', label: '基础' },
      { value: 'advanced', label: '进阶' },
    ],
  },
]
</script>
```

:::

## API

### Cascader Props

| 参数                 | 说明              | 类型                      | 默认    |
| -------------------- | ----------------- | ------------------------- | ------- |
| modelValue / v-model | 绑定值            | `array`                   | []      |
| options              | 可选项数据源      | `array`                   | []      |
| placeholder          | 占位内容          | `string`                  | 请选择  |
| size                 | 尺寸              | `large / default / small` | default |
| clearable            | 是否可清空        | `boolean`                 | false   |
| multiple             | 是否多选          | `boolean`                 | false   |
| collapseTags         | 多选时是否折叠Tag | `boolean`                 | false   |
| disabled             | 是否禁用          | `boolean`                 | false   |
| separator            | 选项分隔符        | `string`                  | /       |

### Cascader Events

| 事件   | 说明           | 参数                  |
| ------ | -------------- | --------------------- |
| change | 值变化时触发   | `(value: array)`      |
| blur   | 失去焦点时触发 | `(event: FocusEvent)` |
| focus  | 获得焦点时触发 | `(event: FocusEvent)` |
