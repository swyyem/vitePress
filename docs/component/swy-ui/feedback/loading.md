# Loading 加载

加载数据时显示动效。

## 基础用法

适用于简单的加载状态显示。

:::demo

```vue
<template>
  <div>
    <SwyButton @click="loading = !loading">{{ loading ? '隐藏' : '显示' }} Loading</SwyButton>

    <div style="position: relative; height: 200px; margin-top: 20px; border: 1px solid #dcdfe6;">
      <SwyLoading :loading="loading" text="加载中..." />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>
```

:::

## 全屏加载

通过 `fullscreen` 属性可以设置全屏加载。

:::demo

```vue
<template>
  <SwyButton @click="showFullscreenLoading">显示全屏 Loading</SwyButton>

  <SwyLoading :loading="fullscreenLoading" fullscreen text="正在加载..." />
</template>

<script setup>
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

## 自定义背景色

通过 `background` 属性可以设置遮罩背景色。

:::demo

```vue
<template>
  <div>
    <SwyButton @click="loading = !loading">{{ loading ? '隐藏' : '显示' }} Loading</SwyButton>

    <div style="position: relative; height: 200px; margin-top: 20px; border: 1px solid #dcdfe6;">
      <SwyLoading :loading="loading" text="自定义背景色" background="rgba(0, 0, 0, 0.8)" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>
```

:::

## 无文字加载

可以只显示加载动画而不需要文字。

:::demo

```vue
<template>
  <div>
    <SwyButton @click="loading = !loading">{{ loading ? '隐藏' : '显示' }} Loading</SwyButton>

    <div style="position: relative; height: 200px; margin-top: 20px; border: 1px solid #dcdfe6;">
      <SwyLoading :loading="loading" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>
```

:::

## 作为组件容器

Loading 组件可以用作容器，包裹其他组件。

:::demo

```vue
<template>
  <div>
    <SwyButton @click="loading = !loading">{{ loading ? '停止' : '开始' }} 加载</SwyButton>

    <SwyLoading :loading="loading" text="处理中...">
      <div
        style="height: 200px; border: 1px solid #dcdfe6; padding: 20px; display: flex; align-items: center; justify-content: center;"
      >
        <p>这里是被加载的组件内容</p>
      </div>
    </SwyLoading>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
</script>
```

:::

## Attributes

| 参数       | 说明         | 类型    | 可选值 | 默认值 |
| ---------- | ------------ | ------- | ------ | ------ |
| loading    | 是否显示加载 | boolean | —      | false  |
| text       | 加载文案     | string  | —      | —      |
| fullscreen | 是否全屏显示 | boolean | —      | false  |
| background | 遮罩背景色   | string  | —      | —      |
