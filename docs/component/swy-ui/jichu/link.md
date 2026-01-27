# Link 链接

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <SwyLink href="https://example.com">默认链接</SwyLink>
    <SwyLink type="primary" href="https://example.com">主要链接</SwyLink>
    <SwyLink type="success" href="https://example.com">成功链接</SwyLink>
    <SwyLink type="warning" href="https://example.com">警告链接</SwyLink>
    <SwyLink type="danger" href="https://example.com">危险链接</SwyLink>
    <SwyLink type="info" href="https://example.com">信息链接</SwyLink>
  </div>
</template>
```

:::

## 禁用状态

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <SwyLink disabled>禁用链接</SwyLink>
    <SwyLink type="primary" disabled>禁用主要链接</SwyLink>
    <SwyLink type="success" disabled>禁用成功链接</SwyLink>
  </div>
</template>
```

:::

## 下划线

通过 `underline` 属性，可以决定下划线出现的时机。支持布尔值或 `'always' | 'hover' | 'never'`。

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <SwyLink underline="never">无下划线</SwyLink>
    <SwyLink underline="hover">悬浮显示 (默认)</SwyLink>
    <SwyLink underline="always">始终显示</SwyLink>
  </div>
</template>
```

:::

## 图标

可以使用 `icon` 属性或插槽。

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <SwyLink icon="Edit">编辑</SwyLink>
    <SwyLink>
      查看
      <swy-icon style="margin-left: 4px"><View /></swy-icon>
    </SwyLink>
    <SwyLink>
      <template #icon>
        <swy-icon><Search /></swy-icon>
      </template>
      搜索
    </SwyLink>
  </div>
</template>

<script setup>
import { Edit, View, Search } from '@swy-ui/components/icon'
</script>
```

:::

## 原生属性

支持 `target` 等原生超链接属性。

:::demo

```vue
<template>
  <div>
    <SwyLink href="https://example.com" target="_blank">在新窗口打开</SwyLink>
  </div>
</template>
```

:::

## Link 属性

| 属性名    | 说明             | 类型               | 可选值                                                | 默认值  |
| --------- | ---------------- | ------------------ | ----------------------------------------------------- | ------- |
| type      | 链接类型         | string             | primary / success / warning / danger / info / default | default |
| underline | 下划线显示时机   | boolean / string   | always / hover / never                                | hover   |
| disabled  | 是否禁用         | boolean            | —                                                     | false   |
| href      | 原生 href 属性   | string             | —                                                     | —       |
| target    | 原生 target 属性 | string             | \_blank / \_parent / \_self / \_top                   | \_self  |
| icon      | 图标组件         | string / Component | —                                                     | —       |

## Link 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义链接内容 |
| icon    | 自定义图标内容 |

## Link 事件

| 事件名 | 说明           | 回调参数            |
| ------ | -------------- | ------------------- |
| click  | 点击链接时触发 | (event: MouseEvent) |
