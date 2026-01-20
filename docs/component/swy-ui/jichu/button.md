# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type`、`plain` 和 `round` 来定义按钮的样式。

:::demo

```vue
<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <SwyButton>默认按钮</SwyButton>
    <SwyButton type="primary">主要按钮</SwyButton>
    <SwyButton type="success">成功按钮</SwyButton>
    <SwyButton type="info">信息按钮</SwyButton>
    <SwyButton type="warning">警告按钮</SwyButton>
    <SwyButton type="danger">危险按钮</SwyButton>
  </div>
</template>
```

:::

## 朴素按钮

使用 `plain` 属性，它接受一个 `Boolean`。

:::demo

```vue
<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <SwyButton plain>朴素按钮</SwyButton>
    <SwyButton type="primary" plain>主要按钮</SwyButton>
    <SwyButton type="success" plain>成功按钮</SwyButton>
    <SwyButton type="info" plain>信息按钮</SwyButton>
    <SwyButton type="warning" plain>警告按钮</SwyButton>
    <SwyButton type="danger" plain>危险按钮</SwyButton>
  </div>
</template>
```

:::

## 圆角按钮

使用 `round` 属性，它接受一个 `Boolean`。

:::demo

```vue
<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <SwyButton round>圆角按钮</SwyButton>
    <SwyButton type="primary" round>主要按钮</SwyButton>
    <SwyButton type="success" round>成功按钮</SwyButton>
    <SwyButton type="info" round>信息按钮</SwyButton>
    <SwyButton type="warning" round>警告按钮</SwyButton>
    <SwyButton type="danger" round>危险按钮</SwyButton>
  </div>
</template>
```

:::

## 禁用状态

使用 `disabled` 属性来定义按钮是否被禁用。

:::demo

```vue
<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <SwyButton disabled>默认按钮</SwyButton>
    <SwyButton type="primary" disabled>主要按钮</SwyButton>
    <SwyButton type="success" disabled>成功按钮</SwyButton>
    <SwyButton type="info" disabled>信息按钮</SwyButton>
    <SwyButton type="warning" disabled>警告按钮</SwyButton>
    <SwyButton type="danger" disabled>危险按钮</SwyButton>
  </div>
</template>
```

:::

## 文字按钮

没有边框和背景色的按钮。

:::demo

```vue
<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <SwyButton type="text">文字按钮</SwyButton>
    <SwyButton type="text" disabled>禁用文字按钮</SwyButton>
  </div>
</template>
```

:::

## 图标按钮

使用图标插槽为按钮添加图标。

:::demo

```vue
<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <SwyButton type="primary">
      <template #icon>🔍</template>
      搜索
    </SwyButton>
    <SwyButton type="primary">
      <template #icon>✏️</template>
      编辑
    </SwyButton>
    <SwyButton type="primary">
      <template #icon>✓</template>
      确认
    </SwyButton>
    <SwyButton type="primary">
      <template #icon>💬</template>
      消息
    </SwyButton>
    <SwyButton type="danger">
      <template #icon>🗑️</template>
      删除
    </SwyButton>
  </div>
</template>
```

:::

## 加载状态

点击按钮来加载数据，并向用户反馈加载状态。

:::demo

```vue
<template>
  <SwyButton type="primary" :loading="loading" @click="handleClick">
    {{ loading ? '加载中...' : '点击加载' }}
  </SwyButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)

const handleClick = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>
```

:::

## 不同尺寸

提供三种不同尺寸的按钮。

:::demo

```vue
<template>
  <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
    <SwyButton type="primary" size="large">大型按钮</SwyButton>
    <SwyButton type="primary">默认按钮</SwyButton>
    <SwyButton type="primary" size="small">小型按钮</SwyButton>
  </div>
</template>
```

:::
