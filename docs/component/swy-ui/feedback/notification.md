# Notification 通知

悬浮出现在页面角落，显示全局通知信息。

## 基础用法

适用性广泛的基础通知用法。

:::demo

```vue
<template>
  <div class="demo-spacing">
    <SwyButton @click="open1">成功</SwyButton>
    <SwyButton @click="open2">警告</SwyButton>
    <SwyButton @click="open3">消息</SwyButton>
    <SwyButton @click="open4">错误</SwyButton>
  </div>
</template>

<script setup>
import { showNotification } from '@swy-ui/components'

const open1 = () => {
  showNotification({
    title: '标题名称',
    message: '这是一条成功的提示消息',
    type: 'success',
  })
}

const open2 = () => {
  showNotification({
    title: '标题名称',
    message: '这是一条警告的提示消息',
    type: 'warning',
  })
}

const open3 = () => {
  showNotification({
    title: '标题名称',
    message: '这是一条消息的提示消息',
    type: 'info',
  })
}

const open4 = () => {
  showNotification({
    title: '标题名称',
    message: '这是一条错误的提示消息',
    type: 'error',
  })
}
</script>
```

:::

## 自定义位置

通知可以从屏幕四角中的任意一个角落弹出。

:::demo `position` 属性定义了通知弹出的位置。

```vue
<template>
  <div class="demo-spacing">
    <SwyButton @click="openTopRight">右上角</SwyButton>
    <SwyButton @click="openTopLeft">左上角</SwyButton>
    <SwyButton @click="openBottomRight">右下角</SwyButton>
    <SwyButton @click="openBottomLeft">左下角</SwyButton>
  </div>
</template>

<script setup>
import { showNotification } from '@swy-ui/components'

const openTopRight = () => {
  showNotification({
    title: '自定义位置',
    message: '右上角弹出的消息',
    position: 'top-right',
  })
}

const openTopLeft = () => {
  showNotification({
    title: '自定义位置',
    message: '左上角弹出的消息',
    position: 'top-left',
  })
}

const openBottomRight = () => {
  showNotification({
    title: '自定义位置',
    message: '右下角弹出的消息',
    position: 'bottom-right',
  })
}

const openBottomLeft = () => {
  showNotification({
    title: '自定义位置',
    message: '左下角弹出的消息',
    position: 'bottom-left',
  })
}
</script>
```

:::

## 带有偏移

让通知偏移一些距离。

:::demo 设置 `offset` 字段可以定义通知弹出的偏移距离。

```vue
<template>
  <SwyButton @click="open">带偏移的通知</SwyButton>
</template>

<script setup>
import { showNotification } from '@swy-ui/components'

const open = () => {
  showNotification({
    title: '偏移',
    message: '这是一条带有偏移的提示消息',
    position: 'top-right',
    offset: 100,
  })
}
</script>
```

:::

## 可关闭

可以添加关闭按钮。

:::demo 通过设置 `showClose` 字段可以开启关闭按钮。

```vue
<template>
  <SwyButton @click="open">可关闭的通知</SwyButton>
</template>

<script setup>
import { showNotification } from '@swy-ui/components'

const open = () => {
  showNotification({
    title: '提示',
    message: '这是一条可关闭的通知',
    showClose: true,
    duration: 0,
  })
}
</script>
```

:::

## Attributes

| 参数      | 说明                                  | 类型    | 可选值                                      | 默认值    |
| --------- | ------------------------------------- | ------- | ------------------------------------------- | --------- |
| title     | 标题                                  | string  | —                                           | —         |
| message   | 说明文字                              | string  | —                                           | —         |
| type      | 通知类型                              | string  | success/warning/info/error                  | info      |
| duration  | 显示时间，毫秒。设为 0 则不会自动关闭 | number  | —                                           | 4500      |
| position  | 弹出位置                              | string  | top-right/top-left/bottom-right/bottom-left | top-right |
| showClose | 是否显示关闭按钮                      | boolean | —                                           | true      |
| offset    | 距离顶部/底部的偏移量                 | number  | —                                           | 16        |

## Events

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| close  | 关闭通知时触发 | —        |
