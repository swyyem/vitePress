# Descriptions 描述列表

展示多个只读字段。

## 基础用法

:::demo

```vue
<template>
  <SwyDescriptions title="用户信息">
    <SwyDescriptionsItem label="用户名">张三</SwyDescriptionsItem>
    <SwyDescriptionsItem label="手机号">18100000000</SwyDescriptionsItem>
    <SwyDescriptionsItem label="居住地">北京市朝阳区</SwyDescriptionsItem>
    <SwyDescriptionsItem label="备注">这是一段备注信息</SwyDescriptionsItem>
    <SwyDescriptionsItem label="联系地址">北京市朝阳区芍药居</SwyDescriptionsItem>
  </SwyDescriptions>
</template>
```

:::

## 不同尺寸

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <SwyDescriptions title="大号尺寸" size="large" :column="2">
      <SwyDescriptionsItem label="用户名">张三</SwyDescriptionsItem>
      <SwyDescriptionsItem label="手机号">18100000000</SwyDescriptionsItem>
    </SwyDescriptions>

    <SwyDescriptions title="默认尺寸" :column="2">
      <SwyDescriptionsItem label="用户名">张三</SwyDescriptionsItem>
      <SwyDescriptionsItem label="手机号">18100000000</SwyDescriptionsItem>
    </SwyDescriptions>

    <SwyDescriptions title="小号尺寸" size="small" :column="2">
      <SwyDescriptionsItem label="用户名">张三</SwyDescriptionsItem>
      <SwyDescriptionsItem label="手机号">18100000000</SwyDescriptionsItem>
    </SwyDescriptions>
  </div>
</template>
```

:::

## 带操作按钮

:::demo

```vue
<template>
  <SwyDescriptions title="用户信息">
    <template #extra>
      <SwyButton type="primary" size="small">编辑</SwyButton>
    </template>
    <SwyDescriptionsItem label="用户名">张三</SwyDescriptionsItem>
    <SwyDescriptionsItem label="手机号">18100000000</SwyDescriptionsItem>
    <SwyDescriptionsItem label="居住地">北京市朝阳区</SwyDescriptionsItem>
  </SwyDescriptions>
</template>
```

:::

## 垂直布局

:::demo

```vue
<template>
  <SwyDescriptions title="垂直列表" direction="vertical" :column="4">
    <SwyDescriptionsItem label="用户名">张三</SwyDescriptionsItem>
    <SwyDescriptionsItem label="手机号">18100000000</SwyDescriptionsItem>
    <SwyDescriptionsItem label="居住地">北京市朝阳区</SwyDescriptionsItem>
    <SwyDescriptionsItem label="备注">这是一段备注信息</SwyDescriptionsItem>
  </SwyDescriptions>
</template>
```

:::

## 带边框的

:::demo

```vue
<template>
  <SwyDescriptions title="带边框列表" border :column="3">
    <SwyDescriptionsItem label="用户名">张三</SwyDescriptionsItem>
    <SwyDescriptionsItem label="手机号">18100000000</SwyDescriptionsItem>
    <SwyDescriptionsItem label="居住地">北京市朝阳区</SwyDescriptionsItem>
    <SwyDescriptionsItem label="备注" :span="2">
      这是一段很长很长的备注信息，占据两列。
    </SwyDescriptionsItem>
    <SwyDescriptionsItem label="联系地址">北京市朝阳区芍药居</SwyDescriptionsItem>
  </SwyDescriptions>
</template>
```

:::

## API

### Descriptions 属性

| 参数      | 说明         | 类型                            | 默认值         |
| --------- | ------------ | ------------------------------- | -------------- |
| title     | 描述列表标题 | `string`                        | —              |
| size      | 列表的尺寸   | `'large' / 'default' / 'small'` | `'default'`    |
| column    | 列表列数     | `number`                        | `3`            |
| border    | 是否显示边框 | `boolean`                       | `false`        |
| direction | 排列方向     | `'horizontal' / 'vertical'`     | `'horizontal'` |

### Descriptions 插槽

| 插槽名  | 说明             |
| ------- | ---------------- |
| title   | 自定义标题内容   |
| extra   | 自定义操作区内容 |
| default | 列表项内容       |

### DescriptionsItem 属性

| 参数             | 说明           | 类型                          | 默认值   |
| ---------------- | -------------- | ----------------------------- | -------- |
| label            | 标签文本       | `string`                      | —        |
| span             | 列跨度         | `number`                      | `1`      |
| width            | 列宽度         | `string / number`             | —        |
| min-width        | 列最小宽度     | `string / number`             | —        |
| align            | 内容对齐方式   | `'left' / 'center' / 'right'` | `'left'` |
| label-align      | 标签对齐方式   | `'left' / 'center' / 'right'` | `'left'` |
| class-name       | 自定义内容类名 | `string`                      | —        |
| label-class-name | 自定义标签类名 | `string`                      | —        |

### DescriptionsItem 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| label   | 自定义标签内容 |
| default | 内容           |
