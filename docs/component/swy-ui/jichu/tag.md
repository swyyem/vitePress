# Tag 标签组件

## 描述

用于标记和分类

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <SwyTag>标签一</SwyTag>
    <SwyTag type="success">Success</SwyTag>
    <SwyTag type="info">Info</SwyTag>
    <SwyTag type="warning">Warning</SwyTag>
    <SwyTag type="danger">Danger</SwyTag>
  </div>
</template>
```

:::

## 可关闭的标签

:::demo

```vue
<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <SwyTag
      v-for="(tag, index) in tags"
      :key="index"
      closable
      :type="tag.type"
      @close="handleClose(index)"
    >
      {{ tag.name }}
    </SwyTag>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tags = ref([
  { name: '标签一', type: 'primary' },
  { name: '标签', type: 'success' },
  { name: '标签', type: 'info' },
  { name: '标签', type: 'warning' },
  { name: '标签', type: 'danger' },
])

const handleClose = (index: number) => {
  tags.value.splice(index, 1)
}
</script>
```

:::

## 不同尺寸

:::demo

```vue
<template>
  <div style="display: flex; align-items: center; gap: 10px;">
    <SwyTag size="small">小型标签</SwyTag>
    <SwyTag>默认标签</SwyTag>
    <SwyTag size="large">大型标签</SwyTag>
  </div>
</template>
```

:::

## 不同主题

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 10px;">
    <div style="display: flex; gap: 10px;">
      <SwyTag type="success" effect="light">Light</SwyTag>
      <SwyTag type="success" effect="dark">Dark</SwyTag>
      <SwyTag type="success" effect="plain">Plain</SwyTag>
    </div>
    <div style="display: flex; gap: 10px;">
      <SwyTag type="info" effect="light">Light</SwyTag>
      <SwyTag type="info" effect="dark">Dark</SwyTag>
      <SwyTag type="info" effect="plain">Plain</SwyTag>
    </div>
  </div>
</template>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div style="width: 300px;">
    <ProField valueType="Tag" :fieldProps="{ type: 'success', effect: 'Light' }">Light</ProField>
  </div>
</template>
```

:::
