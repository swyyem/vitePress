# Popover 弹出框

Popover 是一种类似于 Tooltip 的组件，但可以承载更多内容，适用于需要展示复杂内容的场景。

## 基础用法

最简单的用法，只需要设置标题和内容即可。

:::demo

```vue
<template>
  <SwyPopover title="标题" content="这是一段内容，这是一段内容，这是一段内容。">
    <SwyButton>点击触发</SwyButton>
  </SwyPopover>
</template>
```

:::

## 不同触发方式

通过 `trigger` 属性可以设置不同的触发方式。

:::demo

```vue
<template>
  <div class="flex">
    <SwyPopover title="标题" content="鼠标悬停触发" trigger="hover">
      <SwyButton>Hover 激活</SwyButton>
    </SwyPopover>
    <SwyPopover title="标题" content="点击触发" trigger="click">
      <SwyButton>Click 激活</SwyButton>
    </SwyPopover>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  gap: 20px;
}
</style>
```

:::

## 不同位置

通过 `placement` 属性可以设置 Popover 出现的位置。

:::demo

```vue
<template>
  <div class="box">
    <div class="top">
      <SwyPopover content="Top Left 提示文字" placement="top-start">
        <SwyButton>上左</SwyButton>
      </SwyPopover>
      <SwyPopover content="Top Center 提示文字" placement="top">
        <SwyButton>上边</SwyButton>
      </SwyPopover>
      <SwyPopover content="Top Right 提示文字" placement="top-end">
        <SwyButton>上右</SwyButton>
      </SwyPopover>
    </div>
    <div class="left">
      <SwyPopover content="Left Top 提示文字" placement="left-start">
        <SwyButton>左上</SwyButton>
      </SwyPopover>
      <SwyPopover content="Left Center 提示文字" placement="left">
        <SwyButton>左边</SwyButton>
      </SwyPopover>
      <SwyPopover content="Left Bottom 提示文字" placement="left-end">
        <SwyButton>左下</SwyButton>
      </SwyPopover>
    </div>
    <div class="center">
      <SwyPopover content="Center 提示文字" placement="right">
        <SwyButton>右边</SwyButton>
      </SwyPopover>
    </div>
    <div class="right">
      <SwyPopover content="Right Top 提示文字" placement="right-start">
        <SwyButton>右上</SwyButton>
      </SwyPopover>
      <SwyPopover content="Right Center 提示文字" placement="right">
        <SwyButton>右边</SwyButton>
      </SwyPopover>
      <SwyPopover content="Right Bottom 提示文字" placement="right-end">
        <SwyButton>右下</SwyButton>
      </SwyPopover>
    </div>
    <div class="bottom">
      <SwyPopover content="Bottom Left 提示文字" placement="bottom-start">
        <SwyButton>下左</SwyButton>
      </SwyPopover>
      <SwyPopover content="Bottom Center 提示文字" placement="bottom">
        <SwyButton>下边</SwyButton>
      </SwyPopover>
      <SwyPopover content="Bottom Right 提示文字" placement="bottom-end">
        <SwyButton>下右</SwyButton>
      </SwyPopover>
    </div>
  </div>
</template>

<style scoped>
.box {
  width: 400px;
  height: 250px;
  border: 1px solid #ebebeb;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 0 auto;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.top,
.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}

.left,
.right,
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
}

.left > *,
.right > *,
.center > * {
  margin: 5px 0;
}

.top > *,
.bottom > * {
  margin: 0 5px;
}
</style>
```

:::

## 自定义宽度

通过 `width` 属性可以设置 Popover 的宽度。

:::demo

```vue
<template>
  <SwyPopover
    title="自定义宽度"
    content="这是一个自定义宽度的 Popover，宽度设置为 300px。"
    :width="300"
  >
    <SwyButton>自定义宽度</SwyButton>
  </SwyPopover>
</template>
```

:::

## 自定义内容

除了使用 content 属性外，还可以使用 content 插槽插入自定义内容。

:::demo

```vue
<template>
  <SwyPopover title="自定义内容">
    <template #content>
      <div>
        <p>这是自定义内容区域</p>
        <p>可以放置任意元素</p>
        <SwyButton size="small">按钮</SwyButton>
      </div>
    </template>
    <SwyButton>自定义内容</SwyButton>
  </SwyPopover>
</template>
```

:::

## 事件监听

Popover 提供了 show 和 hide 事件，在相应时刻触发。

:::demo

```vue
<template>
  <SwyPopover title="事件监听" content="监听 show 和 hide 事件" @show="onShow" @hide="onHide">
    <SwyButton>触发事件</SwyButton>
  </SwyPopover>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const onShow = () => {
  ElMessage.success('Popover 显示了')
}

const onHide = () => {
  ElMessage.info('Popover 隐藏了')
}
</script>
```

:::

## Attributes

| 参数       | 说明         | 类型            | 可选值                                                                                                    | 默认值 |
| ---------- | ------------ | --------------- | --------------------------------------------------------------------------------------------------------- | ------ |
| title      | 标题         | string          | —                                                                                                         | —      |
| content    | 显示的内容   | string          | —                                                                                                         | —      |
| placement  | 出现位置     | string          | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | top    |
| trigger    | 触发方式     | string          | click/hover                                                                                               | hover  |
| width      | 宽度         | string / number | —                                                                                                         | 150    |
| show-arrow | 是否显示箭头 | boolean         | —                                                                                                         | true   |

## Events

| 事件名 | 说明       | 回调参数 |
| ------ | ---------- | -------- |
| show   | 显示时触发 | —        |
| hide   | 隐藏时触发 | —        |

## Slots

| 插槽名  | 说明                |
| ------- | ------------------- |
| default | 触发 Popover 的元素 |
| content | 自定义内容          |
