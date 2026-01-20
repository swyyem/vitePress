# Tour 漫游式引�?

用于分步引导用户了解产品功能的组件�?

## 基础用法

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

    <SwyButton @click="startTour">开始引�?/SwyButton>

    <SwyTour v-model="open" :steps="steps" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const open = ref(false)

const steps = [
  {
    target: '#tour-btn1',
    title: '创建按钮',
    description: '点击此按钮可以创建新项目',
  },
  {
    target: '#tour-btn2',
    title: '上传功能',
    description: '支持拖拽上传和选择文件上传',
  },
  {
    target: '#tour-btn3',
    title: '编辑功能',
    description: '可以编辑已有的项目内�?,
  },
  {
    target: '#tour-btn4',
    title: '删除操作',
    description: '删除不需要的项目',
  },
]

const startTour = () => {
  open.value = true
}
</script>
```

:::

## 自定义位�?

:::demo

```vue
<template>
  <div style="padding: 40px; display: flex; flex-direction: column; gap: 100px;">
    <div style="display: flex; justify-content: space-around;">
      <SwyButton id="top-btn">顶部</SwyButton>
      <SwyButton id="bottom-btn">底部</SwyButton>
    </div>

    <div style="display: flex; justify-content: space-around;">
      <SwyButton id="left-btn">左侧</SwyButton>
      <SwyButton id="right-btn">右侧</SwyButton>
    </div>

    <SwyButton @click="openPlacement = true">查看位置示例</SwyButton>

    <SwyTour v-model="openPlacement" :steps="placementSteps" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const openPlacement = ref(false)

const placementSteps = [
  {
    target: '#top-btn',
    title: '顶部位置',
    description: '提示框在目标元素顶部显示',
    placement: 'top',
  },
  {
    target: '#bottom-btn',
    title: '底部位置',
    description: '提示框在目标元素底部显示',
    placement: 'bottom',
  },
  {
    target: '#left-btn',
    title: '左侧位置',
    description: '提示框在目标元素左侧显示',
    placement: 'left',
  },
  {
    target: '#right-btn',
    title: '右侧位置',
    description: '提示框在目标元素右侧显示',
    placement: 'right',
  },
]
</script>
```

:::

## 自定义样式和内容

:::demo

```vue
<template>
  <div style="padding: 40px;">
    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
      <div id="custom1" style="padding: 20px; background: #ecf5ff; border-radius: 8px;">
        功能区域 1
      </div>
      <div id="custom2" style="padding: 20px; background: #fef0f0; border-radius: 8px;">
        功能区域 2
      </div>
    </div>

    <SwyButton type="primary" @click="openCustom = true">开始自定义引导</SwyButton>

    <SwyTour v-model="openCustom" :steps="customSteps" :show-arrow="false">
      <template #default="{ step, current, total }">
        <div style="padding: 20px;">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
            <span style="font-size: 24px;">{{ step.icon }}</span>
            <h3 style="margin: 0;">{{ step.title }}</h3>
          </div>
          <p style="margin-bottom: 15px; color: #606266;">{{ step.description }}</p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: #909399; font-size: 14px;">{{ current + 1 }} / {{ total }}</span>
          </div>
        </div>
      </template>
    </SwyTour>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const openCustom = ref(false)

const customSteps = [
  {
    target: '#custom1',
    title: '欢迎使用',
    description: '这是自定义样式的引导提示',
    icon: '👋',
  },
  {
    target: '#custom2',
    title: '开始探�?,
    description: '点击下一步继续了解更多功�?,
    icon: '🚀',
  },
]
</script>
```

:::

## API

### Tour Props

| 参数                 | 说明         | 类型                | 默认�?  |
| -------------------- | ------------ | ------------------- | ------- |
| modelValue / v-model | 是否显示     | `boolean`           | false   |
| steps                | 引导步骤     | `array`             | []      |
| current              | 当前步骤     | `number`            | 0       |
| showArrow            | 是否显示箭头 | `boolean`           | true    |
| mask                 | 是否显示遮罩 | `boolean`           | true    |
| type                 | 类型         | `default / primary` | default |

### Tour Events

| 事件�? | 说明           | 参数                |
| ------ | -------------- | ------------------- |
| close  | 关闭时触�?     | �?                  |
| finish | 完成引导时触�? | �?                  |
| change | 步骤改变时触�? | `(current: number)` |

### Steps

| 参数        | 说明           | 类型                          | 默认�? |
| ----------- | -------------- | ----------------------------- | ------ |
| target      | 目标元素选择�? | `string`                      | �?     |
| title       | 标题           | `string`                      | �?     |
| description | 描述           | `string`                      | �?     |
| placement   | 位置           | `top / bottom / left / right` | bottom |

### Tour Slots

| 名称    | 说明       | 参数                       |
| ------- | ---------- | -------------------------- |
| default | 自定义内�? | `{ step, current, total }` |
