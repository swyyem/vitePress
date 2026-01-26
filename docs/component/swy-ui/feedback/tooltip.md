# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

## 基础用法

最基础的用法，展示鼠标悬停时的提示信息。

:::demo

```vue
<template>
  <div class="demo-section">
    <SwyTooltip content="这是提示文字">
      <SwyButton>鼠标悬停查看提示</SwyButton>
    </SwyTooltip>
  </div>
</template>

<style scoped>
.demo-section {
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

:::

## 不同位置

通过 `placement` 属性可以设置 Tooltip 出现的位置。

:::demo

```vue
<template>
  <div
    :style="{
      width: '900px',
      padding: '60px',
      margin: '0 auto',
      border: '1px solid #ebeef5',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
      position: 'relative',
    }"
  >
    <!-- 第一行：top系列 -->
    <div
      :style="{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '60px',
      }"
    >
      <SwyTooltip content="Top Left 提示文字" placement="top-start">
        <SwyButton size="mini" :style="{ margin: '0 30px' }">top-start</SwyButton>
      </SwyTooltip>
      <SwyTooltip content="Top Center 提示文字" placement="top">
        <SwyButton size="mini" :style="{ margin: '0 30px' }">top</SwyButton>
      </SwyTooltip>
      <SwyTooltip content="Top Right 提示文字" placement="top-end">
        <SwyButton size="mini" :style="{ margin: '0 30px' }">top-end</SwyButton>
      </SwyTooltip>
    </div>
    <!-- 第二行：left和right start系列 -->
    <div
      :style="{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '60px',
      }"
    >
      <SwyTooltip content="Left Top 提示文字" placement="left-start">
        <SwyButton size="mini" :style="{ margin: '0 30px' }">left-start</SwyButton>
      </SwyTooltip>
      <SwyTooltip content="Right Top 提示文字" placement="right-start">
        <SwyButton size="mini" :style="{ margin: '0 30px' }">right-start</SwyButton>
      </SwyTooltip>
    </div>
    <!-- 第三行：left和right中间系列 -->
    <div
      :style="{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '60px',
      }"
    >
      <SwyTooltip content="Left Center 提示文字" placement="left">
        <SwyButton size="mini" :style="{ margin: '0 30px' }">left</SwyButton>
      </SwyTooltip>
      <SwyTooltip content="Right Center 提示文字" placement="right">
        <SwyButton size="mini" :style="{ margin: '0 30px' }">right</SwyButton>
      </SwyTooltip>
    </div>
    <!-- 第四行：left和right end系列 -->
    <div
      :style="{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '60px',
      }"
    >
      <SwyTooltip content="Left Bottom 提示文字" placement="left-end">
        <SwyButton size="mini" :style="{ margin: '0 30px' }">left-end</SwyButton>
      </SwyTooltip>
      <SwyTooltip content="Right Bottom 提示文字" placement="right-end">
        <SwyButton size="mini" :style="{ margin: '0 30px' }">right-end</SwyButton>
      </SwyTooltip>
    </div>
    <!-- 第五行：bottom系列 -->
    <div
      :style="{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '0',
      }"
    >
      <SwyTooltip content="Bottom Left 提示文字" placement="bottom-start">
        <SwyButton size="mini" :style="{ margin: '0 30px' }">bottom-start</SwyButton>
      </SwyTooltip>
      <SwyTooltip content="Bottom Center 提示文字" placement="bottom">
        <SwyButton size="mini" :style="{ margin: '0 30px' }">bottom</SwyButton>
      </SwyTooltip>
      <SwyTooltip content="Bottom Right 提示文字" placement="bottom-end">
        <SwyButton size="mini" :style="{ margin: '0 30px' }">bottom-end</SwyButton>
      </SwyTooltip>
    </div>
  </div>
</template>
```

:::

## 主题

Tooltip 组件提供了两个内置主题：`dark` 和 `light`。

:::demo

```vue
<template>
  <div
    :style="{
      display: 'flex',
      gap: '30px',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px',
    }"
  >
    <SwyTooltip content="这是一个暗色主题的 Tooltip" effect="dark">
      <SwyButton type="primary" :style="{ margin: '0' }">暗色主题 (dark)</SwyButton>
    </SwyTooltip>
    <SwyTooltip content="这是一个亮色主题的 Tooltip" effect="light">
      <SwyButton type="success" :style="{ margin: '0' }">亮色主题 (light)</SwyButton>
    </SwyTooltip>
  </div>
</template>
```

:::

## 禁用状态

通过 `disabled` 属性可以禁用 Tooltip。

:::demo

```vue
<template>
  <div
    :style="{
      padding: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }"
  >
    <SwyTooltip content="这是一条提示信息" :disabled="disabled">
      <SwyButton type="warning" @click="disabled = !disabled" :style="{ margin: '0' }">
        {{ disabled ? '启用' : '禁用' }} Tooltip
      </SwyButton>
    </SwyTooltip>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const disabled = ref(false)
</script>
```

:::

## 延迟显示

通过 `showAfter` 属性可以设置延迟显示的时间（单位：毫秒）。

:::demo

```vue
<template>
  <div
    :style="{
      padding: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }"
  >
    <SwyTooltip content="延迟 1000 毫秒显示" :show-after="1000">
      <SwyButton type="info" :style="{ margin: '0' }">延迟显示</SwyButton>
    </SwyTooltip>
  </div>
</template>
```

:::

## 手动控制

通过 `visible` 属性可以手动控制 Tooltip 的显示与隐藏。

:::demo

```vue
<template>
  <div
    :style="{
      display: 'flex',
      gap: '30px',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px',
    }"
  >
    <SwyTooltip content="这是一个手动控制的 Tooltip" :visible="visible">
      <SwyButton :style="{ margin: '0' }">手动触发</SwyButton>
    </SwyTooltip>
    <SwyButton type="primary" @click="visible = !visible" :style="{ margin: '0' }">
      {{ visible ? '隐藏' : '显示' }} Tooltip
    </SwyButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

:::

## 自定义内容插槽

除了通过 `content` 属性设置文本内容外，还可以使用 `content` 插槽插入自定义内容。

:::demo

```vue
<template>
  <div class="demo-section">
    <SwyTooltip>
      <template #content>
        <div>
          <p>这是自定义内容</p>
          <p>支持多行文本</p>
        </div>
      </template>
      <SwyButton type="success">自定义内容</SwyButton>
    </SwyTooltip>
  </div>
</template>

<style scoped>
.demo-section {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

:::

## Attributes

| 参数       | 说明               | 类型    | 可选值                                                                                                    | 默认值 |
| ---------- | ------------------ | ------- | --------------------------------------------------------------------------------------------------------- | ------ |
| content    | 显示的内容         | string  | —                                                                                                         | —      |
| placement  | Tooltip 的出现位置 | string  | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | top    |
| effect     | 主题               | string  | dark/light                                                                                                | dark   |
| disabled   | 是否禁用           | boolean | —                                                                                                         | false  |
| show-after | 延迟出现，单位毫秒 | number  | —                                                                                                         | 0      |
| visible    | 是否手动控制显示   | boolean | —                                                                                                         | null   |

## Slots

| 插槽名  | 说明                |
| ------- | ------------------- |
| default | 触发 Tooltip 的元素 |
| content | 自定义内容          |
