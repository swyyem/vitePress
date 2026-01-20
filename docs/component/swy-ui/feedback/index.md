# 交互反馈组件

本章节包含了交互反馈类组件：

- **Tooltip** - 文字提示组件
- **Popover** - 气泡卡片组件
- **Popconfirm** - 气泡确认框组件
- **Notification** - 通知组件
- **Loading** - 加载组件

---

## Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

### 基础用法

:::demo

```vue
<template>
  <SwyTooltip content="这是一段提示文字">
    <SwyButton>上方提示</SwyButton>
  </SwyTooltip>
</template>
```

:::

### 不同位置

:::demo

```vue
<template>
  <div style="display: flex; gap: 10px;">
    <SwyTooltip content="上方提示" placement="top">
      <SwyButton>上方</SwyButton>
    </SwyTooltip>
    <SwyTooltip content="下方提示" placement="bottom">
      <SwyButton>下方</SwyButton>
    </SwyTooltip>
    <SwyTooltip content="左侧提示" placement="left">
      <SwyButton>左侧</SwyButton>
    </SwyTooltip>
    <SwyTooltip content="右侧提示" placement="right">
      <SwyButton>右侧</SwyButton>
    </SwyTooltip>
  </div>
</template>
```

:::

### 主题

:::demo

```vue
<template>
  <div style="display: flex; gap: 10px;">
    <SwyTooltip content="暗色主题" effect="dark">
      <SwyButton>暗色</SwyButton>
    </SwyTooltip>
    <SwyTooltip content="亮色主题" effect="light">
      <SwyButton>亮色</SwyButton>
    </SwyTooltip>
  </div>
</template>
```

:::

---

## Popover 气泡卡片

点击/鼠标移入元素，弹出气泡式的卡片浮层。

### 基础用法

:::demo

```vue
<template>
  <SwyPopover
    title="标题"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    trigger="hover"
    :width="200"
  >
    <SwyButton>Hover 激活</SwyButton>
  </SwyPopover>
</template>
```

:::

### 点击触发

:::demo

```vue
<template>
  <SwyPopover
    title="标题"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    trigger="click"
    :width="200"
  >
    <SwyButton>Click 激活</SwyButton>
  </SwyPopover>
</template>
```

:::

---

## Popconfirm 气泡确认框

点击元素，弹出气泡确认框。

### 基础用法

:::demo

```vue
<template>
  <SwyPopconfirm title="确定要删除吗？" @confirm="handleConfirm" @cancel="handleCancel">
    <SwyButton type="danger">删除</SwyButton>
  </SwyPopconfirm>
</template>

<script lang="ts" setup>
const handleConfirm = () => {
  console.log('确认')
}

const handleCancel = () => {
  console.log('取消')
}
</script>
```

:::

### 自定义按钮文字

:::demo

```vue
<template>
  <SwyPopconfirm
    title="确定要提交吗？"
    confirm-button-text="提交"
    cancel-button-text="放弃"
    confirm-button-type="success"
    @confirm="handleConfirm"
  >
    <SwyButton>提交</SwyButton>
  </SwyPopconfirm>
</template>

<script lang="ts" setup>
const handleConfirm = () => {
  console.log('已提交')
}
</script>
```

:::

---

## Notification 通知

悬浮出现在页面角落，显示全局的通知提醒消息。

### 基础用法

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

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
const notificationConfig = ref({
  title: '',
  message: '',
  type: 'info',
})

const showNotification = (type: string) => {
  const config: Record<string, any> = {
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

### 不同位置

:::demo

```vue
<template>
  <div style="display: flex; gap: 10px;">
    <SwyButton @click="showNotification('top-right')">右上角</SwyButton>
    <SwyButton @click="showNotification('top-left')">左上角</SwyButton>
    <SwyButton @click="showNotification('bottom-right')">右下角</SwyButton>
    <SwyButton @click="showNotification('bottom-left')">左下角</SwyButton>
  </div>

  <SwyNotification
    v-if="visible"
    title="提示"
    message="这是一条提示消息"
    :position="position"
    @close="visible = false"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
const position = ref('top-right')

const showNotification = (pos: string) => {
  position.value = pos
  visible.value = true
}
</script>
```

:::

---

## Loading 加载

加载数据时显示动效。

### 基础用法

:::demo

```vue
<template>
  <SwyButton @click="loading = !loading">{{ loading ? '隐藏' : '显示' }} Loading</SwyButton>

  <div style="position: relative; height: 200px; margin-top: 20px; border: 1px solid #dcdfe6;">
    <SwyLoading :loading="loading" text="加载中..." />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(false)
</script>
```

:::

### 全屏加载

:::demo

```vue
<template>
  <SwyButton @click="showFullscreenLoading">显示全屏 Loading</SwyButton>

  <SwyLoading :loading="fullscreenLoading" fullscreen text="正在加载..." />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const fullscreenLoading = ref(false)

const showFullscreenLoading = () => {
  fullscreenLoading.value = true
  setTimeout(() => {
    fullscreenLoading.value = false
  }, 2000)
}
</script>
```

:::

### 自定义背景色

:::demo

```vue
<template>
  <div style="position: relative; height: 200px; border: 1px solid #dcdfe6;">
    <SwyLoading :loading="true" text="加载中..." background="rgba(0, 0, 0, 0.8)" />
  </div>
</template>
```

:::
