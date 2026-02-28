# Loading 加载

用于页面或局部区域的加载状态展示，提供三种使用方式：**组件包裹**、**`v-loading` 指令**、**命令式 API**。

## 局部加载（组件包裹）

用 `<SwyLoading>` 包裹需要加载状态覆盖的内容区域，设置 `:loading="true"` 显示遮罩。

:::demo

```vue
<template>
  <div class="demo-row">
    <SwyLoading :loading="loading1" style="width: 240px;">
      <div class="content-block">列表内容区域</div>
    </SwyLoading>
    <SwyButton @click="toggle1">{{ loading1 ? '隐藏' : '显示' }}加载</SwyButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const loading1 = ref(true)
const toggle1 = () => (loading1.value = !loading1.value)
</script>

<style scoped>
.demo-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}
.content-block {
  height: 120px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
  font-size: 14px;
}
</style>
```

:::

## 加载文案

通过 `text` 属性在 spinner 下方显示说明文字。

:::demo

```vue
<template>
  <SwyLoading :loading="true" text="数据加载中..." style="width: 240px;">
    <div class="content-block">内容区域</div>
  </SwyLoading>
</template>

<style scoped>
.content-block {
  height: 120px;
  background: #f5f7fa;
  border-radius: 4px;
}
</style>
```

:::

## 自定义背景色与颜色

`background` 控制遮罩背景色，`color` 控制 spinner 和文字的主色。

:::demo

```vue
<template>
  <div class="demo-row">
    <SwyLoading
      :loading="true"
      background="rgba(0,0,0,0.6)"
      color="#fff"
      text="加载中"
      style="width: 200px;"
    >
      <div class="content-block dark">深色遮罩</div>
    </SwyLoading>
    <SwyLoading :loading="true" color="#f56c6c" text="错误重试" style="width: 200px;">
      <div class="content-block">自定义颜色</div>
    </SwyLoading>
  </div>
</template>

<style scoped>
.demo-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.content-block {
  height: 120px;
  background: #f5f7fa;
  border-radius: 4px;
}
.content-block.dark {
  background: #2c2c2c;
}
</style>
```

:::

## v-loading 指令

`v-loading` 是最简便的用法，直接绑定在任意元素上，省去组件包裹结构。
通过 `data-loading-text` 和 `data-loading-color` 属性扩展配置。

:::demo

```vue
<template>
  <div class="demo-row">
    <div v-loading="loading2" class="content-block" style="width: 240px; height: 120px;">
      指令用法
    </div>
    <SwyButton @click="toggle2">{{ loading2 ? '隐藏' : '显示' }}加载</SwyButton>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const loading2 = ref(false)
const toggle2 = () => (loading2.value = !loading2.value)
</script>

<style scoped>
.demo-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}
.content-block {
  background: #f5f7fa;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #909399;
}
</style>
```

:::

## 全屏加载（组件）

设置 `fullscreen` 属性使遮罩通过 `teleport` 挂载到 `body`，覆盖整个页面。配合 `lock` 属性可在加载期间禁止页面滚动。

:::demo

```vue
<template>
  <SwyButton @click="showFullscreen">全屏加载 2 秒</SwyButton>
  <SwyLoading :loading="fullscreen" fullscreen lock text="页面加载中..." />
</template>

<script setup>
import { ref } from 'vue'
const fullscreen = ref(false)
const showFullscreen = () => {
  fullscreen.value = true
  setTimeout(() => (fullscreen.value = false), 2000)
}
</script>
```

:::

## 命令式全屏加载

`showLoading` / `closeLoading` 适合在异步请求前后调用，无需在模板里声明组件。

:::demo

```vue
<template>
  <div class="demo-row">
    <SwyButton @click="loadData">模拟请求（2s）</SwyButton>
    <SwyButton @click="loadCustom">自定义配色</SwyButton>
  </div>
</template>

<script setup>
import { showLoading, closeLoading } from '@swy-ui/components'

const loadData = async () => {
  const close = showLoading({ text: '请求中，请稍候...' })
  await new Promise(r => setTimeout(r, 2000))
  close()
}

const loadCustom = async () => {
  showLoading({ text: '同步中...', background: 'rgba(0,0,0,0.7)', color: '#fff' })
  await new Promise(r => setTimeout(r, 2000))
  closeLoading()
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

## 自定义 Spinner

通过 `#spinner` 插槽替换默认的 SVG 环形动画。

:::demo

```vue
<template>
  <SwyLoading :loading="true" text="处理中" style="width: 200px;">
    <template #spinner>
      <div class="dot-spinner">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </template>
    <div class="content-block">自定义 spinner</div>
  </SwyLoading>
</template>

<style scoped>
.content-block {
  height: 100px;
  background: #f5f7fa;
  border-radius: 4px;
}

.dot-spinner {
  display: flex;
  gap: 6px;
  align-items: center;
}

.dot-spinner span {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: var(--swy-color-primary, #409eff);
  border-radius: 50%;
  animation: dot-bounce 1.4s ease-in-out infinite;
}
.dot-spinner span:nth-child(2) {
  animation-delay: 0.16s;
}
.dot-spinner span:nth-child(3) {
  animation-delay: 0.32s;
}

@keyframes dot-bounce {
  0%,
  80%,
  100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
```

:::

## 组件 Attributes

| 参数       | 说明                               | 类型    | 默认值 |
| ---------- | ---------------------------------- | ------- | ------ |
| loading    | 是否显示加载遮罩                   | boolean | false  |
| text       | 加载文案                           | string  | —      |
| fullscreen | 全屏显示（teleport 到 body）       | boolean | false  |
| background | 遮罩背景色，如 `rgba(0,0,0,0.8)`   | string  | —      |
| color      | spinner 和文字的主色，如 `#f56c6c` | string  | —      |
| lock       | 全屏加载时锁定页面滚动             | boolean | false  |

## 组件 Slots

| 插槽名  | 说明                             |
| ------- | -------------------------------- |
| default | 被加载遮罩覆盖的内容（局部模式） |
| spinner | 替换默认 SVG 环形动画            |

## v-loading 指令

```html
<!-- 基础用法 -->
<div v-loading="isLoading">内容</div>

<!-- 自定义文字和颜色（通过 data 属性） -->
<div v-loading="isLoading" data-loading-text="处理中..." data-loading-color="#f56c6c">内容</div>
```

指令会在元素上自动追加 `position: relative`（若元素原为 static），并在 loading 为 true 时向元素内插入遮罩 DOM。

## 命令式 API

```ts
// 显示全屏加载，返回关闭函数
const close = showLoading(options?)

// 关闭全屏加载
closeLoading()
```

### showLoading Options

| 参数       | 说明             | 类型    | 默认值 |
| ---------- | ---------------- | ------- | ------ |
| text       | 加载文案         | string  | —      |
| background | 遮罩背景色       | string  | —      |
| color      | spinner 主色     | string  | —      |
| lock       | 是否锁定页面滚动 | boolean | true   |
