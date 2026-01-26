# Notification 通知

悬浮出现在页面角落，显示全局的通知提醒消息。

## 基础用法

适用性广泛的基础通知，包含标题和内容。

:::demo

```vue
<template>
  <div style="display: flex; gap: 10px;">
    <SwyButton @click="showNotification('success')">成功</SwyButton>
    <SwyButton @click="showNotification('warning')">警告</SwyButton>
    <SwyButton @click="showNotification('info')">消息</SwyButton>
    <SwyButton @click="showNotification('error')">错误</SwyButton>
  </div>

  <SwyNotification
    v-if="visible"
    :title="notificationConfig.title"
    :message="notificationConfig.message"
    :type="notificationConfig.type"
    @close="visible = false"
  />
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const notificationConfig = ref({
  title: '',
  message: '',
  type: 'info',
})

const showNotification = type => {
  const config = {
    success: { title: '成功', message: '这是一条成功的提示消息' },
    warning: { title: '警告', message: '这是一条警告的提示消息' },
    info: { title: '消息', message: '这是一条消息的提示消息' },
    error: { title: '错误', message: '这是一条错误的提示消息' },
  }

  notificationConfig.value = { ...config[type], type }
  visible.value = true
}
</script>
```

:::

## 不同位置

可以通过 `position` 属性控制通知弹出的位置。

:::demo

```vue
<template>
  <div style="display: flex; gap: 10px;">
    <SwyButton @click="showNotification('top-right')">右上</SwyButton>
    <SwyButton @click="showNotification('top-left')">左上</SwyButton>
    <SwyButton @click="showNotification('bottom-right')">右下</SwyButton>
    <SwyButton @click="showNotification('bottom-left')">左下</SwyButton>
  </div>

  <SwyNotification
    v-if="visible"
    title="提示"
    message="这是一条提示消息"
    :position="position"
    @close="visible = false"
  />
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const position = ref('top-right')

const showNotification = pos => {
  position.value = pos
  visible.value = true
}
</script>
```

:::

## 带偏移量的通知

设置 `offset` 字段可以将通知偏移一些距离。

:::demo

```vue
<template>
  <SwyButton @click="showPersistentNotification">带偏移的通知</SwyButton>

  <SwyNotification
    v-if="visible"
    title="偏移通知"
    message="这是一条带有偏移量的通知消息"
    :offset="100"
    @close="visible = false"
  />
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)

const showPersistentNotification = () => {
  visible.value = true
}
</script>
```

:::

## 不自动关闭

将 `duration` 设置为 0 可以使通知永不自动关闭。

:::demo

```vue
<template>
  <SwyButton @click="showPersistentNotification">持久通知</SwyButton>

  <SwyNotification
    v-if="visible"
    title="持久通知"
    message="这是一条不会自动关闭的通知，请手动关闭"
    :duration="0"
    @close="visible = false"
  />
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)

const showPersistentNotification = () => {
  visible.value = true
}
</script>
```

:::

## 自定义内容

除了使用默认的消息格式，也可以通过插槽自定义内容。

:::demo

```vue
<template>
  <SwyButton @click="showCustomContent">自定义内容</SwyButton>

  <SwyNotification
    v-if="visible"
    title="自定义内容"
    message="这是一条带自定义内容的通知"
    @close="visible = false"
  >
    <div>
      <p>这里是自定义内容区域</p>
      <SwyButton size="small" @click="handleAction">执行操作</SwyButton>
    </div>
  </SwyNotification>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)

const showCustomContent = () => {
  visible.value = true
}

const handleAction = () => {
  alert('执行了自定义操作')
  visible.value = false
}
</script>
```

:::

## 隐藏关闭按钮

通过 `showClose` 属性可以控制是否显示关闭按钮。

:::demo

```vue
<template>
  <SwyButton @click="showWithoutClose">无关闭按钮</SwyButton>

  <SwyNotification
    v-if="visible"
    title="无关闭按钮"
    message="这是一条没有关闭按钮的通知，将在3秒后自动关闭"
    :show-close="false"
    :duration="3000"
    @close="visible = false"
  />
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)

const showWithoutClose = () => {
  visible.value = true
}
</script>
```

:::

## Attributes

| 参数       | 说明                                  | 类型    | 可选值                                      | 默认值    |
| ---------- | ------------------------------------- | ------- | ------------------------------------------- | --------- |
| title      | 标题                                  | string  | —                                           | —         |
| message    | 说明文字                              | string  | —                                           | —         |
| type       | 类型                                  | string  | success/warning/info/error                  | info      |
| duration   | 显示时间，毫秒。设为 0 则不会自动关闭 | number  | —                                           | 4500      |
| position   | 位置                                  | string  | top-right/top-left/bottom-right/bottom-left | top-right |
| show-close | 是否显示关闭按钮                      | boolean | —                                           | true      |
| offset     | 距离顶部的偏移量                      | number  | —                                           | 16        |

## Events

| 事件名 | 说明       | 回调参数 |
| ------ | ---------- | -------- |
| close  | 关闭时触发 | —        |

## Slots

| 插槽名  | 说明       |
| ------- | ---------- |
| default | 自定义内容 |
