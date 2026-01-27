# Button 按钮

常用的操作按钮

## 基础用法

使用 `type` 属性来定义按钮的类型
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

使用 `plain` 属性来定义朴素按钮样式，它接受一`Boolean`
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

使用 `round` 属性来定义圆角按钮样式，它接受一`Boolean`
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

## 禁用状

使用 `disabled` 属性来定义按钮是否被禁用，它接受一`Boolean`
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

## 链接按钮

使用 `link` 属性来定义链接样式的按钮
:::demo

```vue
<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <SwyButton link>链接按钮</SwyButton>
    <SwyButton link disabled>禁用链接按钮</SwyButton>
  </div>
</template>
```

:::

## 文字按钮

使用 `text` 属性创建无边框和背景的文字按钮
:::demo

```vue
<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <SwyButton text type="primary">文字按钮</SwyButton>
    <SwyButton text disabled>禁用文字按钮</SwyButton>
  </div>
</template>
```

:::

## 图标按钮

使用 `icon` 属性为按钮添加图标，支持字符串图标名称或直接传入图标组件
:::demo

```vue
<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <SwyButton type="primary" icon="search">搜索</SwyButton>
    <SwyButton type="primary" icon="edit">编辑</SwyButton>
    <SwyButton type="primary" icon="check">确认</SwyButton>
    <SwyButton type="primary" icon="message">消息</SwyButton>
    <SwyButton type="danger" icon="delete">删除</SwyButton>
    <SwyButton type="primary" icon="search" circle />
    <SwyButton type="success" icon="edit" circle />
  </div>
</template>
```

:::

## 加载状

使用 `loading` 属性来设置按钮的加载状态，向用户反馈操作进度
:::demo

```vue
<template>
  <SwyButton type="primary" :loading="loading" @click="handleClick">
    {{ loading ? '加载..' : '点击加载' }}
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

使用 `size` 属性来定义按钮的尺寸，支持 `large`、`default`、`small` 三种尺寸
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

## 阴影按钮

使用 `shadow` 属性为按钮添加阴影效果，增强视觉层次感
:::demo

```vue
<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <SwyButton type="primary" shadow>阴影按钮</SwyButton>
    <SwyButton type="success" shadow>成功按钮</SwyButton>
    <SwyButton type="warning" shadow>警告按钮</SwyButton>
    <SwyButton type="danger" shadow>危险按钮</SwyButton>
  </div>
</template>
```

:::

## 块级按钮

使用 `block` 属性使按钮宽度占满父容器
:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 10px;">
    <SwyButton type="primary" block>块级按钮</SwyButton>
    <SwyButton type="success" block>成功按钮</SwyButton>
    <SwyButton type="danger" block>危险按钮</SwyButton>
  </div>
</template>
```

:::

## 节流按钮

使用 `throttle` 属性设置节流时间（毫秒），防止按钮被重复点击
:::demo

```vue
<template>
  <div
    style="display: flex; gap: 10px; flex-wrap: wrap; flex-direction: column; align-items: flex-start;"
  >
    <SwyButton type="primary" :throttle="2000" @click="handleThrottleClick">
      节流按钮秒内只能点击一次）
    </SwyButton>
    <div>点击次数: {{ clickCount }}</div>
    <div style="color: #999; font-size: 14px;">提示：快速点击按钮，观察计数变化</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const clickCount = ref(0)

const handleThrottleClick = () => {
  clickCount.value++
}
</script>
```

:::

## 组合使用

将不同属性组合使用，创造更多样式
:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <SwyButton type="primary" round shadow>圆角阴影</SwyButton>
      <SwyButton type="success" plain shadow>朴素阴影</SwyButton>
      <SwyButton type="danger" circle shadow>
        <template #icon>🔥</template>
      </SwyButton>
    </div>
    <SwyButton type="primary" block shadow>块级阴影按钮</SwyButton>
  </div>
</template>
```

:::

## 幽灵按钮

使用 `ghost` 属性创建幽灵按钮，与链接按钮的区别在于：幽灵按钮保留边框但背景透明，而链接按钮无边框且更像文本链接
:::demo

```vue
<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <SwyButton ghost>幽灵按钮</SwyButton>
    <SwyButton ghost type="primary">主要幽灵按钮</SwyButton>
    <SwyButton ghost type="success">成功幽灵按钮</SwyButton>
    <SwyButton ghost type="danger">危险幽灵按钮</SwyButton>
    <SwyButton ghost type="warning" disabled>禁用幽灵按钮</SwyButton>
  </div>
</template>
```

:::

对比链接按钮：
:::demo

```vue
<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <SwyButton link>链接按钮</SwyButton>
    <SwyButton link type="primary">主要链接按钮</SwyButton>
    <SwyButton link type="success">成功链接按钮</SwyButton>
    <SwyButton link type="danger">危险链接按钮</SwyButton>
    <SwyButton link type="warning" disabled>禁用链接按钮</SwyButton>
  </div>
</template>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <ProField valueType="Button" :fieldProps="{ type: 'primary', round: true, shadow: true }">
        圆角阴影
      </ProField>
      <ProField valueType="Button" :fieldProps="{ type: 'success', plain: true, shadow: true }">
        朴素阴影
      </ProField>
      <ProField valueType="Button" :fieldProps="{ type: 'danger', circle: true, shadow: true }">
        <template #icon>🔥</template>
      </ProField>
      <ProField valueType="Button" :fieldProps="{ link: true }">链接按钮</ProField>
      <ProField valueType="Button" :fieldProps="{ text: true }">文字按钮</ProField>
    </div>
    <ProField valueType="Button" :fieldProps="{ type: 'primary', block: true, shadow: true }">
      块级阴影按钮
    </ProField>
    <ProField valueType="Button" :fieldProps="{ ghost: true, type: 'primary' }">幽灵按钮</ProField>
  </div>
</template>
```

:::

## Button 属性

| 属性名            | 说明                           | 类型                   | 可选                                                           | 默认      |
| ----------------- | ------------------------------ | ---------------------- | -------------------------------------------------------------- | --------- |
| size              | 按钮尺寸                       | `string`               | `large` / `default` / `small`                                  | `default` |
| type              | 按钮类型                       | `string`               | `primary` / `success` / `warning` / `danger` / `info` / `text` |           |
| plain             | 是否为朴素按钮                 | `boolean`              |                                                                | `false`   |
| text              | 是否为文字按钮（无边框和背景） | `boolean`              |                                                                | `false`   |
| link              | 是否为链接按钮                 | `boolean`              |                                                                | `false`   |
| bg                | 文本按钮背景色是否常亮         | `boolean`              |                                                                | `false`   |
| round             | 是否为圆角按钮                 | `boolean`              |                                                                | `false`   |
| circle            | 是否为圆形按钮                 | `boolean`              |                                                                | `false`   |
| loading           | 是否为加载状态                 | `boolean`              |                                                                | `false`   |
| loading-icon      | 自定加载图标                   | `Component`            |                                                                | `Loading` |
| disabled          | 是否禁用                       | `boolean`              |                                                                | `false`   |
| icon              | 图标组件                       | `Component`            |                                                                |           |
| autofocus         | 是否自动聚焦                   | `boolean`              |                                                                | `false`   |
| native-type       | 原生 type 属性                 | `string`               | `button` / `submit` / `reset`                                  | `button`  |
| auto-insert-space | 自动在两个汉字之间插入空格     | `boolean`              |                                                                | `false`   |
| color             | 自定义按钮颜色                 | `string`               |                                                                |           |
| dark              | 深色模式                       | `boolean`              |                                                                | `false`   |
| tag               | 自定义元素标签                 | `string` / `Component` |                                                                | `button`  |
| shadow            | 阴影效果                       | `boolean`              |                                                                | `false`   |
| block             | 块级按钮                       | `boolean`              |                                                                | `false`   |
| throttle          | 节流时间（毫秒）防止重复点击   | `number`               |                                                                | `0`       |
| ghost             | 是否为幽灵按钮（透明背景）     | `boolean`              |                                                                | `false`   |

## Button 事件

| 事件  | 说明           | 回调参数              |
| ----- | -------------- | --------------------- |
| click | 点击按钮时触发 | `(event: MouseEvent)` |

## Button 插槽

| 插槽    | 说明             |
| ------- | ---------------- |
| default | 按钮内容         |
| icon    | 自定义图标       |
| loading | 自定义加载中图标 |
