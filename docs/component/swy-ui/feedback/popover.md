# Popover 弹出框

Popover 是比 Tooltip 更丰富的弹出层组件，可以承载标题、多段文本、自定义内容（按钮、列表等）。

## 基础用法

点击触发弹出框，同时显示标题和内容。

:::demo

```vue
<template>
  <SwyPopover title="提示标题" content="这是一段弹出内容，可以放更多说明文字。">
    <SwyButton>点击触发</SwyButton>
  </SwyPopover>
</template>
```

:::

## 不同触发方式

通过 `trigger` 属性设置触发方式，支持 `click`（默认）、`hover`、`focus`。

:::demo

```vue
<template>
  <div class="demo-trigger">
    <SwyPopover title="点击触发" content="通过点击按钮打开弹出框" trigger="click">
      <SwyButton>Click 触发</SwyButton>
    </SwyPopover>
    <SwyPopover title="悬停触发" content="鼠标悬停在按钮上打开弹出框" trigger="hover">
      <SwyButton>Hover 触发</SwyButton>
    </SwyPopover>
    <SwyPopover title="聚焦触发" content="输入框获得焦点时弹出" trigger="focus">
      <input class="demo-input" placeholder="点击聚焦" />
    </SwyPopover>
  </div>
</template>

<style scoped>
.demo-trigger {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.demo-input {
  height: 32px;
  padding: 0 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
}
.demo-input:focus {
  border-color: #409eff;
}
</style>
```

:::

## 弹出方向

通过 `placement` 属性控制弹出方向，支持 12 个方位。

:::demo

```vue
<template>
  <div class="placement-box">
    <!-- 上排 -->
    <div class="row top-row">
      <SwyPopover content="top-start" placement="top-start">
        <SwyButton size="small">上左</SwyButton>
      </SwyPopover>
      <SwyPopover content="top" placement="top">
        <SwyButton size="small">上中</SwyButton>
      </SwyPopover>
      <SwyPopover content="top-end" placement="top-end">
        <SwyButton size="small">上右</SwyButton>
      </SwyPopover>
    </div>

    <!-- 中排（左右两侧） -->
    <div class="row middle-row">
      <div class="col left-col">
        <SwyPopover content="left-start" placement="left-start">
          <SwyButton size="small">左上</SwyButton>
        </SwyPopover>
        <SwyPopover content="left" placement="left">
          <SwyButton size="small">左中</SwyButton>
        </SwyPopover>
        <SwyPopover content="left-end" placement="left-end">
          <SwyButton size="small">左下</SwyButton>
        </SwyPopover>
      </div>
      <div class="col right-col">
        <SwyPopover content="right-start" placement="right-start">
          <SwyButton size="small">右上</SwyButton>
        </SwyPopover>
        <SwyPopover content="right" placement="right">
          <SwyButton size="small">右中</SwyButton>
        </SwyPopover>
        <SwyPopover content="right-end" placement="right-end">
          <SwyButton size="small">右下</SwyButton>
        </SwyPopover>
      </div>
    </div>

    <!-- 下排 -->
    <div class="row bottom-row">
      <SwyPopover content="bottom-start" placement="bottom-start">
        <SwyButton size="small">下左</SwyButton>
      </SwyPopover>
      <SwyPopover content="bottom" placement="bottom">
        <SwyButton size="small">下中</SwyButton>
      </SwyPopover>
      <SwyPopover content="bottom-end" placement="bottom-end">
        <SwyButton size="small">下右</SwyButton>
      </SwyPopover>
    </div>
  </div>
</template>

<style scoped>
.placement-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  width: 340px;
  margin: 0 auto;
}
.row {
  display: flex;
  gap: 8px;
  justify-content: center;
}
.middle-row {
  width: 100%;
  justify-content: space-between;
}
.col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
```

:::

## 自定义内容

使用 `#content` 插槽可以放入任意自定义内容。

:::demo

```vue
<template>
  <div class="demo-row">
    <SwyPopover title="用户信息" placement="right">
      <template #content>
        <div class="user-card">
          <p>姓名：张三</p>
          <p>部门：研发部</p>
          <p>职位：前端工程师</p>
          <SwyButton size="small" type="primary" style="margin-top:8px">查看详情</SwyButton>
        </div>
      </template>
      <SwyButton>查看用户</SwyButton>
    </SwyPopover>

    <SwyPopover title="确认删除" placement="bottom">
      <template #content>
        <p style="margin:0 0 12px">确定要删除这条记录吗？</p>
        <div style="display:flex;gap:8px;justify-content:flex-end">
          <SwyButton size="small">取消</SwyButton>
          <SwyButton size="small" type="danger">确认删除</SwyButton>
        </div>
      </template>
      <SwyButton type="danger">删除操作</SwyButton>
    </SwyPopover>
  </div>
</template>

<style scoped>
.demo-row {
  display: flex;
  gap: 16px;
  align-items: center;
}
.user-card p {
  margin: 0 0 6px;
  font-size: 13px;
  color: #606266;
}
</style>
```

:::

## 禁用状态

设置 `disabled` 属性禁止弹出框触发。

:::demo

```vue
<template>
  <div class="demo-row">
    <SwyPopover content="正常状态可以看到这段文字">
      <SwyButton>正常</SwyButton>
    </SwyPopover>
    <SwyPopover content="这条消息不会显示" disabled>
      <SwyButton disabled>禁用</SwyButton>
    </SwyPopover>
  </div>
</template>

<style scoped>
.demo-row {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
```

:::

## 不显示箭头

设置 `:show-arrow="false"` 隐藏箭头指示器。

:::demo

```vue
<template>
  <div class="demo-row">
    <SwyPopover title="有箭头" content="默认显示箭头">
      <SwyButton>有箭头</SwyButton>
    </SwyPopover>
    <SwyPopover title="无箭头" content="隐藏箭头" :show-arrow="false">
      <SwyButton>无箭头</SwyButton>
    </SwyPopover>
  </div>
</template>

<style scoped>
.demo-row {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
```

:::

## Hover 延迟隐藏

`trigger="hover"` 时，可通过 `hide-after` 属性设置延迟隐藏时间（毫秒），方便用户把鼠标移入弹层内容区。

:::demo

```vue
<template>
  <div class="demo-row">
    <SwyPopover trigger="hover" :hide-after="0" title="立即隐藏" content="鼠标离开后立即消失">
      <SwyButton>hide-after=0</SwyButton>
    </SwyPopover>

    <SwyPopover trigger="hover" :hide-after="500" title="可移入内容" placement="bottom">
      <template #content>
        <p style="margin:0 0 8px">鼠标可以移入此区域</p>
        <SwyButton size="small" type="primary">操作按钮</SwyButton>
      </template>
      <SwyButton>hide-after=500ms</SwyButton>
    </SwyPopover>
  </div>
</template>

<style scoped>
.demo-row {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
```

:::

## 事件监听

通过 `@show` 和 `@hide` 事件监听弹出框的显示与隐藏。

:::demo

```vue
<template>
  <div>
    <SwyPopover title="事件监听" content="点击打开或关闭以触发事件" @show="onShow" @hide="onHide">
      <SwyButton>触发事件</SwyButton>
    </SwyPopover>
    <p v-if="lastEvent" class="event-log">最近事件：{{ lastEvent }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const lastEvent = ref('')

const onShow = () => {
  lastEvent.value = '✅ show — 弹出框已显示'
}
const onHide = () => {
  lastEvent.value = '❌ hide — 弹出框已隐藏'
}
</script>

<style scoped>
.event-log {
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

## Attributes

| 参数       | 说明                             | 类型            | 可选值                                                                                                                          | 默认值 |
| ---------- | -------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------ |
| title      | 标题（为空不渲染标题区域）       | string          | —                                                                                                                               | —      |
| content    | 文字内容（也可用 #content 插槽） | string          | —                                                                                                                               | —      |
| placement  | 弹出方向                         | string          | top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end | bottom |
| trigger    | 触发方式                         | string          | click / hover / focus                                                                                                           | click  |
| width      | 弹出框宽度                       | string / number | —                                                                                                                               | 200    |
| show-arrow | 是否显示箭头                     | boolean         | —                                                                                                                               | true   |
| disabled   | 是否禁用                         | boolean         | —                                                                                                                               | false  |
| offset     | 弹出框与触发元素的间距（px）     | number          | —                                                                                                                               | 8      |
| show-after | 延迟显示时间（ms，hover 模式）   | number          | —                                                                                                                               | 0      |
| hide-after | 延迟隐藏时间（ms，hover 模式）   | number          | —                                                                                                                               | 200    |

## Events

| 事件名 | 说明             | 回调参数 |
| ------ | ---------------- | -------- |
| show   | 弹出框显示时触发 | —        |
| hide   | 弹出框隐藏时触发 | —        |

## Slots

| 插槽名  | 说明                    |
| ------- | ----------------------- |
| default | 触发 Popover 的参考元素 |
| content | 自定义弹出框内容        |
