# Notification 通知

悬浮出现在页面角落，显示全局的通知提醒消息，与 Message 的区别是可以承载更多内容（标题 + 正文），并且不会打断用户操作。

## 基础用法

通过 `showNotification` 命令式创建通知，调用后立即弹出并在指定时间后自动关闭。

:::demo

```vue
<template>
  <div class="demo-row">
    <SwyButton @click="open">基础通知</SwyButton>
    <SwyButton @click="openNoTitle">仅内容</SwyButton>
  </div>
</template>

<script setup>
import { showNotification } from '@swy-ui/components'

const open = () => {
  showNotification({
    title: '标题',
    message: '这是一条通知内容，4.5 秒后自动关闭。',
  })
}

const openNoTitle = () => {
  showNotification({
    message: '没有标题时只展示这段内容文字。',
  })
}
</script>

<style scoped>
.demo-row {
  display: flex;
  gap: 12px;
}
</style>
```

:::

## 通知类型

设置 `type` 属性以显示不同语义的通知，也可以直接使用快捷方法。

:::demo

```vue
<template>
  <div class="demo-row">
    <SwyButton @click="openSuccess">成功</SwyButton>
    <SwyButton @click="openWarning">警告</SwyButton>
    <SwyButton @click="openError">错误</SwyButton>
    <SwyButton @click="openInfo">消息</SwyButton>
  </div>
</template>

<script setup>
import { showNotification } from '@swy-ui/components'

const openSuccess = () =>
  showNotification.success({ title: '操作成功', message: '数据已成功保存到数据库。' })

const openWarning = () =>
  showNotification.warning({ title: '注意', message: '该操作将影响其他用户，请谨慎执行。' })

const openError = () =>
  showNotification.error({ title: '请求失败', message: '网络连接超时，请检查网络后重试。' })

const openInfo = () =>
  showNotification.info({ title: '系统通知', message: '将于今晚 22:00 进行例行维护。' })
</script>

<style scoped>
.demo-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
```

:::

## 弹出位置

通过 `position` 属性控制通知出现的角落，支持 `top-right`（默认）、`top-left`、`bottom-right`、`bottom-left`。

:::demo

```vue
<template>
  <div class="demo-row">
    <SwyButton @click="open('top-right')">右上角</SwyButton>
    <SwyButton @click="open('top-left')">左上角</SwyButton>
    <SwyButton @click="open('bottom-right')">右下角</SwyButton>
    <SwyButton @click="open('bottom-left')">左下角</SwyButton>
  </div>
</template>

<script setup>
import { showNotification } from '@swy-ui/components'

const open = position => {
  showNotification({
    title: '自定义位置',
    message: `从 ${position} 弹出的通知。`,
    position,
  })
}
</script>

<style scoped>
.demo-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
```

:::

## 多通知叠放

同一位置连续调用时，通知会自动向下（或向上）叠放；已关闭的通知消失后，剩余通知平滑上移填补空位。

:::demo

```vue
<template>
  <div class="demo-row">
    <SwyButton @click="openMulti">连续弹出 3 条</SwyButton>
  </div>
</template>

<script setup>
import { showNotification } from '@swy-ui/components'

const openMulti = () => {
  showNotification.success({ title: '第 1 条', message: '成功操作完成' })
  setTimeout(() => showNotification.warning({ title: '第 2 条', message: '发现潜在风险' }), 300)
  setTimeout(() => showNotification.info({ title: '第 3 条', message: '后台任务已启动' }), 600)
}
</script>

<style scoped>
.demo-row {
  display: flex;
  gap: 12px;
}
</style>
```

:::

## 自定义显示时长

`duration` 属性控制自动关闭时间（毫秒）。设为 `0` 则不自动关闭，需用户手动关闭或调用返回的关闭函数。

:::demo

```vue
<template>
  <div class="demo-row">
    <SwyButton @click="openShort">1.5 秒关闭</SwyButton>
    <SwyButton @click="openPersist">不自动关闭</SwyButton>
    <SwyButton v-if="closeRef" @click="closeManually">手动关闭</SwyButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { showNotification } from '@swy-ui/components'

const closeRef = ref(null)

const openShort = () => {
  showNotification({ title: '短暂提示', message: '此通知 1.5 秒后消失', duration: 1500 })
}

const openPersist = () => {
  closeRef.value = showNotification({
    title: '持久通知',
    message: '点击右侧"手动关闭"按钮来关闭此通知',
    duration: 0,
    showClose: true,
    onClose: () => {
      closeRef.value = null
    },
  })
}

const closeManually = () => {
  closeRef.value?.()
  closeRef.value = null
}
</script>

<style scoped>
.demo-row {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
```

:::

## 偏移量

通过 `offset` 属性调整通知距离屏幕边缘的初始距离（默认 16px）。

:::demo

```vue
<template>
  <SwyButton @click="open">偏移 80px</SwyButton>
</template>

<script setup>
import { showNotification } from '@swy-ui/components'

const open = () => {
  showNotification({
    title: '自定义偏移',
    message: '距离顶部 80px 弹出',
    offset: 80,
  })
}
</script>
```

:::

## 关闭回调

通过 `onClose` 配置项监听通知关闭事件，无论是自动关闭还是手动关闭均会触发。

:::demo

```vue
<template>
  <div>
    <SwyButton @click="open">带关闭回调</SwyButton>
    <p v-if="log" class="log">{{ log }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { showNotification } from '@swy-ui/components'

const log = ref('')

const open = () => {
  log.value = ''
  showNotification({
    title: '关闭回调',
    message: '关闭后会在下方记录日志',
    duration: 3000,
    onClose: () => {
      log.value = `✅ 通知已在 ${new Date().toLocaleTimeString()} 关闭`
    },
  })
}
</script>

<style scoped>
.log {
  margin-top: 12px;
  padding: 8px 12px;
  background: #f4f4f5;
  border-radius: 4px;
  font-size: 13px;
  color: #606266;
}
</style>
```

:::

## API

### 函数签名

```ts
// 基础调用
showNotification(options: NotificationOptions): () => void

// 类型快捷方法
showNotification.success(options)
showNotification.warning(options)
showNotification.error(options)
showNotification.info(options)
```

### Options

| 参数      | 说明                             | 类型     | 可选值                                            | 默认值    |
| --------- | -------------------------------- | -------- | ------------------------------------------------- | --------- |
| title     | 标题（为空不渲染标题区域）       | string   | —                                                 | —         |
| message   | 通知内容文字                     | string   | —                                                 | —         |
| type      | 通知类型（影响颜色和图标）       | string   | success / warning / info / error                  | info      |
| duration  | 自动关闭延时（ms），0 表示不关闭 | number   | —                                                 | 4500      |
| position  | 弹出的屏幕角落                   | string   | top-right / top-left / bottom-right / bottom-left | top-right |
| showClose | 是否显示右上角关闭按钮           | boolean  | —                                                 | true      |
| offset    | 距离屏幕边缘的初始偏移量（px）   | number   | —                                                 | 16        |
| onClose   | 关闭时的回调函数                 | Function | —                                                 | —         |

### 返回值

`showNotification` 返回一个 **关闭函数**，调用后立即关闭该条通知。

```ts
const close = showNotification({ title: '加载中', duration: 0 })

// 异步操作完成后手动关闭
await fetchData()
close()
```

### Events（组件方式使用）

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| close  | 通知关闭时触发 | —        |
