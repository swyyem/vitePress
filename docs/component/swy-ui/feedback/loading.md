# Loading 加载

用于显示加载状态的组件。

## 基础用法

::: demo

```vue
<template>
  <div class="demo-loading">
    <SwyLoading :loading="true">
      <div class="content">内容区域</div>
    </SwyLoading>
  </div>
</template>

<style scoped>
.demo-loading {
  width: 100%;
  height: 200px;
}

.content {
  padding: 40px;
  text-align: center;
  background-color: #f5f5f5;
}
</style>
```

:::

## 全屏加载

::: demo

```vue
<template>
  <div class="demo-loading">
    <button @click="showFullScreen">显示全屏加载</button>
    <SwyLoading :loading="fullscreenLoading" fullscreen>
      <div class="content">内容区域</div>
    </SwyLoading>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fullscreenLoading = ref(false)

const showFullScreen = () => {
  fullscreenLoading.value = true
  setTimeout(() => {
    fullscreenLoading.value = false
  }, 2000)
}
</script>

<style scoped>
.demo-loading {
  width: 100%;
  height: 200px;
}

.content {
  padding: 40px;
  text-align: center;
  background-color: #f5f5f5;
}
</style>
```

:::

## 含文字的加载

::: demo

```vue
<template>
  <div class="demo-loading">
    <SwyLoading :loading="true" text="加载中...">
      <div class="content">带文字的加载状态</div>
    </SwyLoading>
  </div>
</template>

<script setup></script>

<style scoped>
.demo-loading {
  width: 100%;
  height: 200px;
}

.content {
  padding: 40px;
  text-align: center;
  background-color: #f5f5f5;
}
</style>
```

:::

## 自定义背景色

::: demo

```vue
<template>
  <div class="demo-loading">
    <SwyLoading :loading="true" background="rgba(0, 0, 0, 0.8)" text="自定义背景">
      <div class="content">自定义背景色</div>
    </SwyLoading>
  </div>
</template>

<script setup></script>

<style scoped>
.demo-loading {
  width: 100%;
  height: 200px;
}

.content {
  padding: 40px;
  text-align: center;
  background-color: #f5f5f5;
}
</style>
```

:::

## 属性

| 参数       | 说明         | 类型    | 可选值 | 默认值 |
| ---------- | ------------ | ------- | ------ | ------ |
| loading    | 是否显示加载 | boolean | —      | false  |
| text       | 加载文案     | string  | —      | —      |
| fullscreen | 是否全屏显示 | boolean | —      | false  |
| background | 遮罩背景色   | string  | —      | —      |
