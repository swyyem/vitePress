# Table 表格

用于展示多条结构类似的数据。

## 基础用法

:::demo

```vue
<template>
  <SwyTable :data="tableData" border>
    <SwyTableColumn label="日期" prop="date" width="180" />
    <SwyTableColumn label="姓名" prop="name" width="180" />
    <SwyTableColumn label="地址" prop="address" />
  </SwyTable>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  {
    date: '2016-05-03',
    name: '王小',
    address: '上海市普陀区金沙江 1518 弄',
  },
  {
    date: '2016-05-02',
    name: '王小',
    address: '上海市普陀区金沙江 1518 弄',
  },
  {
    date: '2016-05-04',
    name: '王小',
    address: '上海市普陀区金沙江 1518 弄',
  },
])
</script>
```

:::

## 斑马纹表格

:::demo

```vue
<template>
  <SwyTable :data="tableData" stripe border>
    <SwyTableColumn label="日期" prop="date" width="180" />
    <SwyTableColumn label="姓名" prop="name" width="180" />
    <SwyTableColumn label="地址" prop="address" />
  </SwyTable>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  { date: '2016-05-03', name: '王小', address: '上海市普陀区金沙江 1518 弄' },
  { date: '2016-05-02', name: '王小', address: '上海市普陀区金沙江 1518 弄' },
  { date: '2016-05-04', name: '王小', address: '上海市普陀区金沙江 1518 弄' },
])
</script>
```

:::

## 可编辑表格

通过在 `SwyTableColumn` 上设置 `editable` 属性，可以开启单元格编辑功能。编辑时默认使用 `ProField` 组件，可以通过 `value-type` 指定组件类型。

:::demo

```vue
<template>
  <SwyTable :data="tableData" border>
    <SwyTableColumn label="姓名" prop="name" width="150" editable value-type="Input" />
    <SwyTableColumn label="年龄" prop="age" width="120" editable value-type="InputNumber" />
    <SwyTableColumn
      label="性别"
      prop="gender"
      width="150"
      editable
      value-type="Select"
      :field-props="genderProps"
    />
    <SwyTableColumn label="评分" prop="score" editable value-type="Rate" />
  </SwyTable>

  <div style="margin-top: 20px;">
    <pre>{{ tableData }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  { name: '张三', age: 18, gender: 'male', score: 4 },
  { name: '李四', age: 22, gender: 'female', score: 5 },
  { name: '王五', age: 20, gender: 'male', score: 3 },
])

const genderProps = {
  options: [
    { label: '男', value: 'male' },
    { label: '女', value: 'female' },
  ],
}
</script>
```

:::

## API

### Table 属性

| 参数        | 说明                         | 类型                            | 默认值      |
| ----------- | ---------------------------- | ------------------------------- | ----------- |
| data        | 显示的数据                   | `array`                         | —           |
| stripe      | 是否为斑马纹 table           | `boolean`                       | `false`     |
| border      | 是否带有纵向边框             | `boolean`                       | `false`     |
| size        | Table 的尺寸                 | `'large' / 'default' / 'small'` | `'default'` |
| show-header | 是否显示表头                 | `boolean`                       | `true`      |
| height      | Table 的高度，默认为自动高度 | `string / number`               | —           |
| max-height  | Table 的最大高度             | `string / number`               | —           |
| empty-text  | 空数据时显示的文本内容       | `string`                        | `暂无数据`  |

### TableColumn 属性

| 参数        | 说明                             | 类型                          | 默认值    |
| ----------- | -------------------------------- | ----------------------------- | --------- |
| label       | 显示的标题                       | `string`                      | —         |
| prop        | 对应列内容的字段名               | `string`                      | —         |
| width       | 对应列的宽度                     | `string / number`             | —         |
| min-width   | 对应列的最小宽度                 | `string / number`             | —         |
| align       | 对齐方式                         | `'left' / 'center' / 'right'` | `'left'`  |
| editable    | 是否可编辑                       | `boolean`                     | `false`   |
| value-type  | 编辑时的组件类型 (参考 ProField) | `string`                      | `'Input'` |
| field-props | 编辑组件的属性                   | `object`                      | —         |
