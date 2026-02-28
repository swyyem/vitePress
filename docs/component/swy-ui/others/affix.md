# Affix 固钉

将页面元素固定在特定可见区域，支持顶部/底部固定，支持指定滚动容器。

## 基础用法

在页面滚动时固定元素到顶部。

:::demo

```vue
<template>
  <div
    id="affix-basic"
    style="height: 300px; overflow: auto; border: 1px solid #dcdfe6; border-radius: 4px; position: relative;"
  >
    <div style="height: 80px; padding: 20px; background: #f5f7fa; color: #909399; font-size: 13px;">
      向下滚动查看固钉效果
    </div>

    <SwyAffix target="#affix-basic" :offset="0">
      <div
        style="padding: 8px 16px; background: #409eff; color: white; border-radius: 4px; font-size: 13px;"
      >
        📌 固定在顶部
      </div>
    </SwyAffix>

    <div style="padding: 20px;">
      <p v-for="i in 20" :key="i" style="line-height: 2; color: #606266; font-size: 13px;">
        第 {{ i }} 行内容
      </p>
    </div>
  </div>
</template>
```

:::

## 固定在底部

设置 `position="bottom"` 将元素固定到容器底部。

:::demo

```vue
<template>
  <div
    id="affix-bottom"
    style="height: 300px; overflow: auto; border: 1px solid #dcdfe6; border-radius: 4px; position: relative;"
  >
    <div style="padding: 20px;">
      <p v-for="i in 20" :key="i" style="line-height: 2; color: #606266; font-size: 13px;">
        第 {{ i }} 行 - 向上滚动查看效果
      </p>
    </div>

    <SwyAffix target="#affix-bottom" position="bottom" :offset="0">
      <div
        style="padding: 8px 16px; background: #67c23a; color: white; border-radius: 4px; text-align: center; font-size: 13px;"
      >
        📍 固定在底部
      </div>
    </SwyAffix>

    <div style="height: 80px; padding: 20px; background: #f5f7fa; color: #909399; font-size: 13px;">
      底部内容区域
    </div>
  </div>
</template>
```

:::

## 偏移距离

通过 `offset` 设置固定时距顶部/底部的距离（单位 px）。

:::demo

```vue
<template>
  <div
    id="affix-offset"
    style="height: 300px; overflow: auto; border: 1px solid #dcdfe6; border-radius: 4px; position: relative;"
  >
    <div style="height: 80px; padding: 20px; background: #f5f7fa; color: #909399; font-size: 13px;">
      顶部内容
    </div>

    <SwyAffix target="#affix-offset" :offset="20">
      <div
        style="padding: 8px 16px; background: #e6a23c; color: white; border-radius: 4px; font-size: 13px;"
      >
        距顶部 20px 固定
      </div>
    </SwyAffix>

    <div style="padding: 20px;">
      <p v-for="i in 20" :key="i" style="line-height: 2; color: #606266; font-size: 13px;">
        第 {{ i }} 行内容
      </p>
    </div>
  </div>
</template>
```

:::

## 监听固定状态

通过 `@change` 事件获取固定状态变化。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div
      id="affix-change"
      style="height: 280px; overflow: auto; border: 1px solid #dcdfe6; border-radius: 4px; position: relative;"
    >
      <div
        style="height: 60px; padding: 20px; background: #f5f7fa; color: #909399; font-size: 13px;"
      >
        向下滚动触发固定
      </div>

      <SwyAffix target="#affix-change" :offset="0" @change="handleChange">
        <div
          :style="{
            padding: '8px 16px',
            background: affixed ? '#409eff' : '#909399',
            color: 'white',
            borderRadius: '4px',
            fontSize: '13px',
            transition: 'background 0.2s',
          }"
        >
          {{ affixed ? '📌 已固定' : '📍 未固定' }}
        </div>
      </SwyAffix>

      <div style="padding: 20px;">
        <p v-for="i in 15" :key="i" style="line-height: 2; color: #606266; font-size: 13px;">
          第 {{ i }} 行内容
        </p>
      </div>
    </div>

    <div
      style="padding: 10px 16px; background: #f5f7fa; border-radius: 4px; font-size: 13px; color: #606266;"
    >
      当前状态：
      <strong :style="{ color: affixed ? '#409eff' : '#909399' }">
        {{ affixed ? '固定中' : '未固定' }}
      </strong>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const affixed = ref(false)

function handleChange(fixed: boolean) {
  affixed.value = fixed
}
</script>
```

:::

## 监听滚动事件

通过 `@scroll` 事件获取实时滚动位置与固定状态。

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div
      id="affix-scroll"
      style="height: 280px; overflow: auto; border: 1px solid #dcdfe6; border-radius: 4px; position: relative;"
    >
      <div
        style="height: 60px; padding: 20px; background: #f5f7fa; color: #909399; font-size: 13px;"
      >
        顶部区域
      </div>

      <SwyAffix target="#affix-scroll" :offset="0" @scroll="handleScroll">
        <div
          style="padding: 8px 16px; background: #409eff; color: white; border-radius: 4px; font-size: 13px;"
        >
          监听滚动中...
        </div>
      </SwyAffix>

      <div style="padding: 20px;">
        <p v-for="i in 15" :key="i" style="line-height: 2; color: #606266; font-size: 13px;">
          第 {{ i }} 行内容
        </p>
      </div>
    </div>

    <div
      style="padding: 10px 16px; background: #f5f7fa; border-radius: 4px; font-size: 13px; color: #606266;"
    >
      scrollTop:
      <strong>{{ scrollTop }}</strong>
      &nbsp;|&nbsp; fixed:
      <strong :style="{ color: isFixed ? '#409eff' : '#909399' }">{{ isFixed }}</strong>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const scrollTop = ref(0)
const isFixed = ref(false)

function handleScroll({ scrollTop: top, fixed }: { scrollTop: number; fixed: boolean }) {
  scrollTop.value = top
  isFixed.value = fixed
}
</script>
```

:::

## API

### Affix Props

| 参数     | 说明                           | 类型            | 默认值 |
| -------- | ------------------------------ | --------------- | ------ |
| offset   | 固定时距顶部/底部的偏移距离 px | `number`        | 0      |
| position | 固定方向                       | `top \| bottom` | top    |
| target   | 指定滚动容器（CSS 选择器）     | `string`        | —      |
| zIndex   | 固定时的 z-index               | `number`        | 100    |

### Affix Events

| 事件名 | 说明               | 回调参数                                  |
| ------ | ------------------ | ----------------------------------------- |
| change | 固定状态改变时触发 | `(fixed: boolean)`                        |
| scroll | 滚动时触发         | `({ scrollTop: number, fixed: boolean })` |

### Affix Exposes

| 名称  | 说明         | 类型           |
| ----- | ------------ | -------------- |
| fixed | 当前是否固定 | `Ref<boolean>` |
