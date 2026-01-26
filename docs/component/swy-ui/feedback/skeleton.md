# Skeleton 骨架屏

在需要等待加载内容的位置提供一个占位图形组合

## 基础用法

:::demo

```vue
<template>
  <SwySkeleton />
</template>
```

:::

## 更多参数

可以配置骨架屏段落数量,以便更接近真实渲染效果

:::demo

```vue
<template>
  <SwySkeleton :rows="6" />
</template>
```

:::

## 动画效果

显示动画效果

:::demo

```vue
<template>
  <SwySkeleton :rows="6" animated />
</template>
```

:::

## 自定义样式

可以自定义骨架屏的样式

:::demo

```vue
<template>
  <SwySkeleton style="width: 240px">
    <template #template>
      <SwySkeletonItem variant="image" style="width: 240px; height: 240px;" />
      <div style="padding: 14px;">
        <SwySkeletonItem variant="p" style="width: 50%" />
        <div
          style="display: flex; align-items: center; justify-content: space-between; margin-top: 16px; height: 16px;"
        >
          <SwySkeletonItem variant="text" style="margin-right: 16px;" />
          <SwySkeletonItem variant="text" style="width: 30%;" />
        </div>
      </div>
    </template>
  </SwySkeleton>
</template>
```

:::

## Loading 状态

当 Loading 结束之后,我们往往需要显示真实的 UI,可以通过 loading 的值来控制是否显示真实的 DOM

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwyButton @click="setLoading">点击切换加载状态</SwyButton>
    <SwySkeleton :loading="loading" animated>
      <template #template>
        <SwySkeletonItem variant="image" style="width: 400px; height: 267px;" />
        <div style="padding: 14px;">
          <SwySkeletonItem variant="h3" style="width: 50%;" />
          <div
            style="display: flex; align-items: center; justify-content: space-between; margin-top: 16px;"
          >
            <SwySkeletonItem variant="text" style="margin-right: 16px;" />
            <SwySkeletonItem variant="text" style="width: 30%;" />
          </div>
        </div>
      </template>
      <template #default>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            style="width: 400px; height: 267px;"
          />
          <div style="padding: 14px;">
            <h3>这是一个标题</h3>
            <p>这是一段描述文字,用于展示骨架屏加载完成后的真实内容。</p>
          </div>
        </div>
      </template>
    </SwySkeleton>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(true)

const setLoading = () => {
  loading.value = !loading.value
}
</script>
```

:::

## API

### Skeleton Props

| 参数     | 说明                                        | 类型      | 默认值 |
| -------- | ------------------------------------------- | --------- | ------ |
| animated | 是否使用动画                                | `boolean` | false  |
| count    | 渲染多少个 template, 建议使用尽可能小的数字 | `number`  | 1      |
| loading  | 是否显示骨架屏,传 false 时会展示子组件      | `boolean` | true   |
| rows     | 骨架屏段落数量                              | `number`  | 3      |
| throttle | 延迟占位 DOM 渲染的时间, 单位是毫秒         | `number`  | 0      |

### Skeleton Slots

| 名称     | 说明                 |
| -------- | -------------------- |
| default  | 用来展示真实 UI      |
| template | 用来展示自定义占位符 |

### SkeletonItem Props

| 参数    | 说明                     | 类型                                                                                      | 默认值 |
| ------- | ------------------------ | ----------------------------------------------------------------------------------------- | ------ |
| variant | 当前显示的占位元素的样式 | `'p' \| 'text' \| 'h1' \| 'h3' \| 'caption' \| 'button' \| 'image' \| 'circle' \| 'rect'` | text   |
