# Popconfirm 气泡确认框

点击元素弹出气泡确认框，用于在执行操作前让用户确认。

## 基础用法

点击按钮触发确认框，点击"确定"或"取消"均会关闭。

:::demo

```vue
<template>
  <div style="padding: 40px; display: flex; gap: 16px;">
    <SwyPopconfirm title="确定要删除这条记录吗？" @confirm="onConfirm" @cancel="onCancel">
      <SwyButton type="danger">删除</SwyButton>
    </SwyPopconfirm>
    <span v-if="action" style="line-height: 32px; color: #606266; font-size: 13px;">
      你点击了：{{ action }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const action = ref('')
const onConfirm = () => (action.value = '确定')
const onCancel = () => (action.value = '取消')
</script>
```

:::

## 自定义按钮文字与类型

通过 `confirm-button-text`、`cancel-button-text`、`confirm-button-type`、`cancel-button-type` 自定义按钮。

:::demo

```vue
<template>
  <div style="padding: 40px; display: flex; gap: 16px;">
    <SwyPopconfirm
      title="是否提交此申请？"
      confirm-button-text="提交"
      cancel-button-text="暂存"
      confirm-button-type="success"
      cancel-button-type="default"
    >
      <SwyButton type="primary">提交申请</SwyButton>
    </SwyPopconfirm>

    <SwyPopconfirm
      title="确定要清空日志吗？"
      confirm-button-text="清空"
      confirm-button-type="warning"
    >
      <SwyButton>清空日志</SwyButton>
    </SwyPopconfirm>
  </div>
</template>
```

:::

## 图标样式

通过 `icon` 设置图标类型（`warning` / `question`），通过 `icon-color` 自定义颜色，设置 `hide-icon` 隐藏图标。

:::demo

```vue
<template>
  <div style="padding: 40px; display: flex; gap: 16px; flex-wrap: wrap;">
    <SwyPopconfirm title="Warning 图标（默认）" icon="warning">
      <SwyButton>Warning</SwyButton>
    </SwyPopconfirm>

    <SwyPopconfirm title="Question 图标" icon="question" icon-color="#409eff">
      <SwyButton>Question</SwyButton>
    </SwyPopconfirm>

    <SwyPopconfirm title="不显示图标" :hide-icon="true">
      <SwyButton>无图标</SwyButton>
    </SwyPopconfirm>

    <SwyPopconfirm title="自定义图标颜色" icon="warning" icon-color="#f56c6c">
      <SwyButton type="danger">红色图标</SwyButton>
    </SwyPopconfirm>
  </div>
</template>
```

:::

## 弹出方向

通过 `placement` 控制弹出位置，支持 12 个方向。

:::demo

```vue
<template>
  <div
    style="padding: 60px; display: flex; flex-direction: column; gap: 20px; align-items: center;"
  >
    <div style="display: flex; gap: 12px;">
      <SwyPopconfirm title="顶部弹出" placement="top-start">
        <SwyButton>top-start</SwyButton>
      </SwyPopconfirm>
      <SwyPopconfirm title="顶部弹出" placement="top">
        <SwyButton>top</SwyButton>
      </SwyPopconfirm>
      <SwyPopconfirm title="顶部弹出" placement="top-end">
        <SwyButton>top-end</SwyButton>
      </SwyPopconfirm>
    </div>

    <div style="display: flex; gap: 12px;">
      <SwyPopconfirm title="左侧弹出" placement="left-start">
        <SwyButton>left-start</SwyButton>
      </SwyPopconfirm>
      <SwyPopconfirm title="右侧弹出" placement="right-start">
        <SwyButton>right-start</SwyButton>
      </SwyPopconfirm>
    </div>

    <div style="display: flex; gap: 12px;">
      <SwyPopconfirm title="左侧弹出" placement="left">
        <SwyButton>left</SwyButton>
      </SwyPopconfirm>
      <SwyPopconfirm title="右侧弹出" placement="right">
        <SwyButton>right</SwyButton>
      </SwyPopconfirm>
    </div>

    <div style="display: flex; gap: 12px;">
      <SwyPopconfirm title="左侧弹出" placement="left-end">
        <SwyButton>left-end</SwyButton>
      </SwyPopconfirm>
      <SwyPopconfirm title="右侧弹出" placement="right-end">
        <SwyButton>right-end</SwyButton>
      </SwyPopconfirm>
    </div>

    <div style="display: flex; gap: 12px;">
      <SwyPopconfirm title="底部弹出" placement="bottom-start">
        <SwyButton>bottom-start</SwyButton>
      </SwyPopconfirm>
      <SwyPopconfirm title="底部弹出" placement="bottom">
        <SwyButton>bottom</SwyButton>
      </SwyPopconfirm>
      <SwyPopconfirm title="底部弹出" placement="bottom-end">
        <SwyButton>bottom-end</SwyButton>
      </SwyPopconfirm>
    </div>
  </div>
</template>
```

:::

## 不显示箭头

设置 `:show-arrow="false"` 隐藏指向箭头。

:::demo

```vue
<template>
  <div style="padding: 40px;">
    <SwyPopconfirm title="确定要归档吗？" :show-arrow="false">
      <SwyButton>归档（无箭头）</SwyButton>
    </SwyPopconfirm>
  </div>
</template>
```

:::

## 禁用状态

设置 `disabled` 后点击触发元素不会弹出确认框。

:::demo

```vue
<template>
  <div style="padding: 40px; display: flex; gap: 16px;">
    <SwyPopconfirm title="此操作不可用" disabled>
      <SwyButton disabled>禁用状态</SwyButton>
    </SwyPopconfirm>
  </div>
</template>
```

:::

## 自定义宽度

通过 `width` 控制弹出层宽度。

:::demo

```vue
<template>
  <div style="padding: 40px; display: flex; gap: 16px;">
    <SwyPopconfirm
      title="这是一段比较长的确认提示文案，需要更宽的确认框才能完整展示"
      :width="320"
      placement="bottom"
    >
      <SwyButton type="primary">宽度 320px</SwyButton>
    </SwyPopconfirm>
  </div>
</template>
```

:::

## API

### Popconfirm Props

| 参数              | 说明                         | 类型                                                                                                                                         | 默认值  |
| ----------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| title             | 确认提示文案                 | `string`                                                                                                                                     | —       |
| confirmButtonText | 确认按钮文字                 | `string`                                                                                                                                     | 确定    |
| cancelButtonText  | 取消按钮文字                 | `string`                                                                                                                                     | 取消    |
| confirmButtonType | 确认按钮类型                 | `primary \| success \| warning \| danger \| info`                                                                                            | primary |
| cancelButtonType  | 取消按钮类型                 | `default \| primary \| success \| warning \| danger \| info`                                                                                 | default |
| icon              | 图标类型                     | `warning \| question \| ''`                                                                                                                  | warning |
| iconColor         | 图标颜色                     | `string`                                                                                                                                     | #e6a23c |
| hideIcon          | 是否隐藏图标                 | `boolean`                                                                                                                                    | false   |
| width             | 弹出层宽度                   | `string \| number`                                                                                                                           | 200     |
| placement         | 弹出方向                     | `top \| top-start \| top-end \| bottom \| bottom-start \| bottom-end \| left \| left-start \| left-end \| right \| right-start \| right-end` | top     |
| disabled          | 是否禁用                     | `boolean`                                                                                                                                    | false   |
| showArrow         | 是否显示箭头                 | `boolean`                                                                                                                                    | true    |
| offset            | 弹出层与触发元素的间距（px） | `number`                                                                                                                                     | 8       |

### Popconfirm Events

| 事件名  | 说明               | 回调参数 |
| ------- | ------------------ | -------- |
| confirm | 点击确认按钮时触发 | —        |
| cancel  | 点击取消按钮时触发 | —        |

### Popconfirm Slots

| 插槽名  | 说明                 |
| ------- | -------------------- |
| default | 触发确认框显示的元素 |
