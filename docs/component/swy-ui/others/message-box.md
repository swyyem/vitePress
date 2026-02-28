# MessageBox 弹框

模态弹框，用于消息提示、操作确认和内容输入，支持命令式调用。

## 消息提示（alert）

只包含确认按钮，点击遮罩不关闭（需手动点确认）。

:::demo

```vue
<template>
  <SwyButton @click="showAlert">消息提示</SwyButton>
</template>

<script lang="ts" setup>
import { SwyMessageBox } from '@swy-ui/components/message-box'

function showAlert() {
  SwyMessageBox.alert('操作成功，数据已保存。', '提示').then(() => {
    console.log('用户点击确定')
  })
}
</script>
```

:::

## 确认框（confirm）

包含取消和确认按钮，可通过遮罩关闭，返回 Promise。

:::demo

```vue
<template>
  <div style="display: flex; gap: 12px;">
    <SwyButton type="danger" @click="showConfirm">删除记录</SwyButton>
    <span v-if="result" style="line-height: 32px; color: #606266; font-size: 13px;">
      操作结果：{{ result }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { SwyMessageBox } from '@swy-ui/components/message-box'

const result = ref('')

function showConfirm() {
  SwyMessageBox.confirm('此操作将永久删除该记录，是否继续？', '确认删除', {
    type: 'warning',
    confirmButtonText: '删除',
    confirmButtonType: 'danger',
  })
    .then(() => {
      result.value = '已确认删除'
    })
    .catch(() => {
      result.value = '已取消'
    })
}
</script>
```

:::

## 输入框（prompt）

包含文本输入框，确认时将输入值通过 Promise resolve 返回。

:::demo

```vue
<template>
  <div style="display: flex; gap: 12px; align-items: center;">
    <SwyButton @click="showPrompt">输入名称</SwyButton>
    <span v-if="inputResult" style="color: #606266; font-size: 13px;">
      输入内容：{{ inputResult }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { SwyMessageBox } from '@swy-ui/components/message-box'

const inputResult = ref('')

function showPrompt() {
  SwyMessageBox.prompt('请输入项目名称', '新建项目', {
    inputPlaceholder: '最多 20 个字符',
    inputValue: '未命名项目',
  })
    .then(({ value }) => {
      inputResult.value = value || ''
    })
    .catch(() => {
      inputResult.value = '已取消'
    })
}
</script>
```

:::

## 图标类型

通过 `type` 设置图标，支持 `success`、`warning`、`error`、`info`。

:::demo

```vue
<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <SwyButton type="success" @click="show('success')">Success</SwyButton>
    <SwyButton type="warning" @click="show('warning')">Warning</SwyButton>
    <SwyButton type="danger" @click="show('error')">Error</SwyButton>
    <SwyButton @click="show('info')">Info</SwyButton>
  </div>
</template>

<script lang="ts" setup>
import { SwyMessageBox } from '@swy-ui/components/message-box'

function show(type: 'success' | 'warning' | 'error' | 'info') {
  const messages: Record<string, string> = {
    success: '操作成功完成！',
    warning: '此操作有潜在风险，请谨慎。',
    error: '操作失败，请稍后重试。',
    info: '这是一条普通提示信息。',
  }
  SwyMessageBox.alert(messages[type], '提示', { type })
}
</script>
```

:::

## 居中布局

设置 `center: true` 使标题、内容和按钮居中对齐。

:::demo

```vue
<template>
  <SwyButton @click="showCenter">居中弹框</SwyButton>
</template>

<script lang="ts" setup>
import { SwyMessageBox } from '@swy-ui/components/message-box'

function showCenter() {
  SwyMessageBox.confirm('确定要退出登录吗？', '退出确认', {
    type: 'warning',
    center: true,
    confirmButtonText: '退出',
    cancelButtonText: '留下',
  })
}
</script>
```

:::

## 自定义按钮文字

通过 `confirmButtonText`、`cancelButtonText` 自定义按钮文案。

:::demo

```vue
<template>
  <SwyButton @click="showCustom">自定义按钮</SwyButton>
</template>

<script lang="ts" setup>
import { SwyMessageBox } from '@swy-ui/components/message-box'

function showCustom() {
  SwyMessageBox.confirm('是否提交本次申请？申请一旦提交将无法撤回。', '提交申请', {
    type: 'info',
    confirmButtonText: '立即提交',
    cancelButtonText: '再想想',
    confirmButtonType: 'success',
  })
}
</script>
```

:::

## API

### SwyMessageBox 命令式 API

| 方法                                               | 说明                  | 返回值                      |
| -------------------------------------------------- | --------------------- | --------------------------- |
| `SwyMessageBox.alert(message, title?, options?)`   | 消息提示（仅确认）    | `Promise<MessageBoxResult>` |
| `SwyMessageBox.confirm(message, title?, options?)` | 确认框（取消 + 确认） | `Promise<MessageBoxResult>` |
| `SwyMessageBox.prompt(message, title?, options?)`  | 输入框（输入 + 确认） | `Promise<MessageBoxResult>` |

### MessageBoxResult

| 字段   | 类型                               | 说明                  |
| ------ | ---------------------------------- | --------------------- |
| action | `'confirm' \| 'cancel' \| 'close'` | 用户触发的操作类型    |
| value  | `string \| undefined`              | prompt 模式下的输入值 |

### MessageBoxOptions

| 参数                     | 说明                          | 类型                                                         | 默认值  |
| ------------------------ | ----------------------------- | ------------------------------------------------------------ | ------- |
| title                    | 标题                          | `string`                                                     | 提示    |
| message                  | 消息内容                      | `string`                                                     | —       |
| type                     | 图标类型                      | `success \| warning \| error \| info`                        | —       |
| showClose                | 是否显示关闭按钮              | `boolean`                                                    | true    |
| showCancelButton         | 是否显示取消按钮              | `boolean`                                                    | false   |
| showConfirmButton        | 是否显示确认按钮              | `boolean`                                                    | true    |
| confirmButtonText        | 确认按钮文字                  | `string`                                                     | 确定    |
| cancelButtonText         | 取消按钮文字                  | `string`                                                     | 取消    |
| confirmButtonType        | 确认按钮类型                  | `primary \| success \| warning \| danger \| info`            | primary |
| cancelButtonType         | 取消按钮类型                  | `default \| primary \| success \| warning \| danger \| info` | default |
| closeOnClickModal        | 点击遮罩是否关闭              | `boolean`                                                    | true    |
| closeOnPressEscape       | 按 ESC 是否关闭               | `boolean`                                                    | true    |
| center                   | 是否居中布局                  | `boolean`                                                    | false   |
| dangerouslyUseHTMLString | 是否以 HTML 渲染 message      | `boolean`                                                    | false   |
| showInput                | 是否显示输入框（prompt 模式） | `boolean`                                                    | false   |
| inputPlaceholder         | 输入框占位文字                | `string`                                                     | —       |
| inputValue               | 输入框初始值                  | `string`                                                     | —       |
