# Splitter 分割面板

可调整大小的分割面板。

## 基础用法

:::demo

```vue
<template>
  <SwySplitter style="height: 300px; border: 1px solid #dcdfe6;">
    <template #pane1>
      <div style="padding: 20px; height: 100%; background: #ecf5ff;">
        <h4 style="margin-top: 0;">左侧面板</h4>
        <p>可以拖动中间的分割线调整大小</p>
      </div>
    </template>
    <template #pane2>
      <div style="padding: 20px; height: 100%; background: #f0f9ff;">
        <h4 style="margin-top: 0;">右侧面板</h4>
        <p>支持水平和垂直分割</p>
      </div>
    </template>
  </SwySplitter>
</template>
```

:::

## 垂直分割

:::demo

```vue
<template>
  <SwySplitter direction="vertical" style="height: 400px; border: 1px solid #dcdfe6;">
    <template #pane1>
      <div style="padding: 20px; height: 100%; background: #fef0f0;">
        <h4 style="margin-top: 0;">顶部面板</h4>
        <p>垂直方向的分割布局</p>
      </div>
    </template>
    <template #pane2>
      <div style="padding: 20px; height: 100%; background: #f0f0f0;">
        <h4 style="margin-top: 0;">底部面板</h4>
        <p>拖动分割线可以调整上下面板的高度</p>
      </div>
    </template>
  </SwySplitter>
</template>
```

:::

## 初始大小

:::demo

```vue
<template>
  <SwySplitter :pane1-size="0.3" style="height: 300px; border: 1px solid #dcdfe6;">
    <template #pane1>
      <div style="padding: 20px; height: 100%; background: #f3f4f6;">
        <h4 style="margin-top: 0;">30% 宽度</h4>
        <p>左侧面板默认占30%宽度</p>
      </div>
    </template>
    <template #pane2>
      <div style="padding: 20px; height: 100%; background: #fafafa;">
        <h4 style="margin-top: 0;">70% 宽度</h4>
        <p>右侧面板默认占70%宽度</p>
      </div>
    </template>
  </SwySplitter>
</template>
```

:::

## 最小/最大尺寸

:::demo

```vue
<template>
  <SwySplitter
    :pane1-min-size="0.2"
    :pane1-max-size="0.6"
    style="height: 300px; border: 1px solid #dcdfe6;"
  >
    <template #pane1>
      <div style="padding: 20px; height: 100%; background: #fffbeb;">
        <h4 style="margin-top: 0;">有尺寸限制</h4>
        <p>最小20%，最大60%</p>
        <p style="color: #909399; font-size: 14px;">尝试拖动分割线，会受到限制</p>
      </div>
    </template>
    <template #pane2>
      <div style="padding: 20px; height: 100%; background: #fef3c7;">
        <h4 style="margin-top: 0;">自适应大小</h4>
        <p>根据左侧面板自动调整</p>
      </div>
    </template>
  </SwySplitter>
</template>
```

:::

## 嵌套分割

:::demo

```vue
<template>
  <SwySplitter style="height: 400px; border: 1px solid #dcdfe6;">
    <template #pane1>
      <div style="padding: 20px; height: 100%; background: #dbeafe;">
        <h4 style="margin-top: 0;">侧边栏</h4>
        <p>固定在左侧的导航区域</p>
      </div>
    </template>
    <template #pane2>
      <SwySplitter direction="vertical" style="height: 100%;">
        <template #pane1>
          <div style="padding: 20px; height: 100%; background: #f0fdf4;">
            <h4 style="margin-top: 0;">顶部内容</h4>
            <p>主要内容区域的顶部</p>
          </div>
        </template>
        <template #pane2>
          <div style="padding: 20px; height: 100%; background: #fef2f2;">
            <h4 style="margin-top: 0;">底部内容</h4>
            <p>主要内容区域的底部</p>
          </div>
        </template>
      </SwySplitter>
    </template>
  </SwySplitter>
</template>
```

:::

## API

### Splitter Props

| 参数         | 说明                                          | 类型                    | 默认值     |
| ------------ | --------------------------------------------- | ----------------------- | ---------- |
| direction    | 分割方向                                      | `horizontal / vertical` | horizontal |
| pane1Size    | 第一个面板的初始大小（0-1之间的小数或像素值） | `number / string`       | 0.5        |
| pane1MinSize | 第一个面板的最小大小                          | `number`                | 0.1        |
| pane1MaxSize | 第一个面板的最大大小                          | `number`                | 0.9        |

### Splitter Events

| 事件名 | 说明               | 参数                  |
| ------ | ------------------ | --------------------- |
| resize | 面板大小改变时触发 | `(pane1Size: number)` |

### Splitter Slots

| 名称  | 说明             |
| ----- | ---------------- |
| pane1 | 第一个面板的内容 |
| pane2 | 第二个面板的内容 |
