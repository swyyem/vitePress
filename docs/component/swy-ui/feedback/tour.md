# Tour 漫游式引导

用于分步引导用户了解产品功能，支持目标高亮、自定义方位、自定义内容。

## 基础用法

点击"开始引导"后，面板会依次定位到各目标元素旁边，并高亮显示目标。

:::demo

```vue
<template>
  <div style="padding: 40px;">
    <div style="display: flex; gap: 20px; margin-bottom: 30px;">
      <SwyButton id="tour-btn1" type="primary">创建</SwyButton>
      <SwyButton id="tour-btn2">上传</SwyButton>
      <SwyButton id="tour-btn3">编辑</SwyButton>
      <SwyButton id="tour-btn4">删除</SwyButton>
    </div>
    <SwyButton @click="open = true">开始引导</SwyButton>
    <SwyTour v-model="open" :steps="steps" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const open = ref(false)

const steps = [
  { target: '#tour-btn1', title: '创建按钮', description: '点击此按钮可以创建新项目' },
  { target: '#tour-btn2', title: '上传功能', description: '支持拖拽上传和选择文件上传' },
  { target: '#tour-btn3', title: '编辑功能', description: '可以编辑已有的项目内容' },
  { target: '#tour-btn4', title: '删除操作', description: '删除不需要的项目，操作不可逆' },
]
</script>
```

:::

## 自定义位置

每个步骤可以通过 `placement` 单独指定面板的弹出方位。

:::demo

```vue
<template>
  <div style="padding: 40px; display: flex; flex-direction: column; gap: 80px;">
    <div style="display: flex; justify-content: space-around;">
      <SwyButton id="place-top">顶部弹出</SwyButton>
      <SwyButton id="place-bottom">底部弹出</SwyButton>
    </div>
    <div style="display: flex; justify-content: space-around;">
      <SwyButton id="place-left">左侧弹出</SwyButton>
      <SwyButton id="place-right">右侧弹出</SwyButton>
    </div>
    <div>
      <SwyButton type="primary" @click="openPlacement = true">查看位置示例</SwyButton>
    </div>
    <SwyTour v-model="openPlacement" :steps="placementSteps" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const openPlacement = ref(false)

const placementSteps = [
  {
    target: '#place-top',
    title: '顶部位置',
    description: '面板在目标元素顶部显示',
    placement: 'top',
  },
  {
    target: '#place-bottom',
    title: '底部位置',
    description: '面板在目标元素底部显示',
    placement: 'bottom',
  },
  {
    target: '#place-left',
    title: '左侧位置',
    description: '面板在目标元素左侧显示',
    placement: 'left',
  },
  {
    target: '#place-right',
    title: '右侧位置',
    description: '面板在目标元素右侧显示',
    placement: 'right',
  },
]
</script>
```

:::

## Primary 主题

设置 `type="primary"` 使用品牌色背景的引导面板。

:::demo

```vue
<template>
  <div style="padding: 40px; display: flex; gap: 16px;">
    <SwyButton id="primary-a" type="primary">功能 A</SwyButton>
    <SwyButton id="primary-b">功能 B</SwyButton>
    <SwyButton @click="openPrimary = true">Primary 主题引导</SwyButton>
    <SwyTour v-model="openPrimary" :steps="primarySteps" type="primary" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const openPrimary = ref(false)

const primarySteps = [
  { target: '#primary-a', title: '核心功能', description: '这是产品的核心功能入口' },
  { target: '#primary-b', title: '辅助功能', description: '配合核心功能使用效果更佳' },
]
</script>
```

:::

## 不显示遮罩

设置 `:mask="false"` 可以在不遮罩背景的情况下引导用户。

:::demo

```vue
<template>
  <div style="padding: 40px; display: flex; gap: 16px;">
    <SwyButton id="nomask-a">步骤一</SwyButton>
    <SwyButton id="nomask-b">步骤二</SwyButton>
    <SwyButton @click="openNoMask = true">无遮罩引导</SwyButton>
    <SwyTour v-model="openNoMask" :steps="noMaskSteps" :mask="false" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const openNoMask = ref(false)

const noMaskSteps = [
  { target: '#nomask-a', title: '第一步', description: '无遮罩模式，背景不会变暗' },
  { target: '#nomask-b', title: '第二步', description: '用户可以正常操作页面其他内容' },
]
</script>
```

:::

## 自定义内容

通过默认插槽完全自定义面板内容，插槽参数提供 `step`、`current`、`total`。

:::demo

```vue
<template>
  <div style="padding: 40px;">
    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
      <div
        id="custom-area1"
        style="padding: 20px; background: #ecf5ff; border-radius: 8px; min-width: 100px; text-align: center;"
      >
        功能区域 1
      </div>
      <div
        id="custom-area2"
        style="padding: 20px; background: #fef0f0; border-radius: 8px; min-width: 100px; text-align: center;"
      >
        功能区域 2
      </div>
    </div>
    <SwyButton type="primary" @click="openCustom = true">自定义引导</SwyButton>

    <SwyTour ref="tourRef" v-model="openCustom" :steps="customSteps" :show-arrow="false">
      <template #default="{ step, current, total }">
        <div style="padding: 20px; min-width: 220px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
            <span style="font-size: 24px;">{{ step.icon }}</span>
            <strong style="font-size: 15px;">{{ step.title }}</strong>
          </div>
          <p style="margin: 0 0 16px; color: #606266; font-size: 13px; line-height: 1.6;">
            {{ step.description }}
          </p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: #909399; font-size: 12px;">{{ current + 1 }} / {{ total }}</span>
            <div style="display: flex; gap: 8px;">
              <SwyButton
                v-if="current < total - 1"
                size="small"
                type="primary"
                @click="tourRef.current.value++"
              >
                下一步
              </SwyButton>
              <SwyButton v-else size="small" type="primary" @click="openCustom = false">
                完成
              </SwyButton>
            </div>
          </div>
        </div>
      </template>
    </SwyTour>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const openCustom = ref(false)
const tourRef = ref()

const customSteps = [
  {
    target: '#custom-area1',
    title: '欢迎使用',
    description: '这是自定义样式的引导提示，可以放任意内容',
    icon: '👋',
  },
  {
    target: '#custom-area2',
    title: '开始探索',
    description: '点击下一步继续了解更多功能',
    icon: '🚀',
  },
]
</script>
```

:::

## API

### Tour Props

| 参数                 | 说明                     | 类型                 | 默认值  |
| -------------------- | ------------------------ | -------------------- | ------- |
| modelValue / v-model | 是否显示                 | `boolean`            | false   |
| steps                | 引导步骤列表             | `TourStep[]`         | []      |
| current              | 当前步骤索引（受控）     | `number`             | 0       |
| placement            | 全局默认弹出方位         | `string`             | bottom  |
| mask                 | 是否显示背景遮罩和高亮框 | `boolean`            | true    |
| maskClosable         | 点击遮罩是否关闭         | `boolean`            | true    |
| showClose            | 是否显示右上角关闭按钮   | `boolean`            | true    |
| showArrow            | 是否显示指向目标的箭头   | `boolean`            | true    |
| closeOnPressEscape   | 按 ESC 是否关闭          | `boolean`            | true    |
| type                 | 主题类型                 | `default \| primary` | default |
| zIndex               | 层叠顺序                 | `number`             | 2000    |

### Tour Events

| 事件名 | 说明                       | 回调参数            |
| ------ | -------------------------- | ------------------- |
| change | 步骤切换时触发             | `(current: number)` |
| close  | 点击关闭/遮罩/ESC 时触发   | `(current: number)` |
| finish | 点击最后一步完成按钮时触发 | —                   |

### Tour Slots

| 插槽名  | 说明               | 插槽参数                                   |
| ------- | ------------------ | ------------------------------------------ |
| default | 完全自定义面板内容 | `{ step, current: number, total: number }` |

### Steps 配置

| 参数        | 说明                                | 类型     | 默认值 |
| ----------- | ----------------------------------- | -------- | ------ |
| target      | 目标元素 CSS 选择器，如 `'#my-btn'` | `string` | —      |
| title       | 步骤标题                            | `string` | —      |
| description | 步骤描述                            | `string` | —      |
| placement   | 本步骤弹出方位（覆盖全局）          | `string` | —      |

**placement 可选值**：`top` `top-start` `top-end` `bottom` `bottom-start` `bottom-end` `left` `left-start` `left-end` `right` `right-start` `right-end` `center`
