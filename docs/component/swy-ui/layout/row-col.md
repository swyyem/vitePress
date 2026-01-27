# Row / Col 栅格布局

通过基础24 分栏，迅速简便地创建布局

## 基础布局

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <SwyRow>
      <SwyCol :span="24">
        <div
          style="background: #409eff; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          span: 24
        </div>
      </SwyCol>
    </SwyRow>

    <SwyRow>
      <SwyCol :span="12">
        <div
          style="background: #67c23a; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          span: 12
        </div>
      </SwyCol>
      <SwyCol :span="12">
        <div
          style="background: #409eff; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          span: 12
        </div>
      </SwyCol>
    </SwyRow>

    <SwyRow>
      <SwyCol :span="8">
        <div
          style="background: #67c23a; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          span: 8
        </div>
      </SwyCol>
      <SwyCol :span="8">
        <div
          style="background: #409eff; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          span: 8
        </div>
      </SwyCol>
      <SwyCol :span="8">
        <div
          style="background: #e6a23c; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          span: 8
        </div>
      </SwyCol>
    </SwyRow>

    <SwyRow>
      <SwyCol :span="6">
        <div
          style="background: #67c23a; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          span: 6
        </div>
      </SwyCol>
      <SwyCol :span="6">
        <div
          style="background: #409eff; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          span: 6
        </div>
      </SwyCol>
      <SwyCol :span="6">
        <div
          style="background: #e6a23c; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          span: 6
        </div>
      </SwyCol>
      <SwyCol :span="6">
        <div
          style="background: #f56c6c; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          span: 6
        </div>
      </SwyCol>
    </SwyRow>
  </div>
</template>
```

:::

## 分栏间隔

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <SwyRow :gutter="20">
      <SwyCol :span="6">
        <div
          style="background: #409eff; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-6
        </div>
      </SwyCol>
      <SwyCol :span="6">
        <div
          style="background: #67c23a; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-6
        </div>
      </SwyCol>
      <SwyCol :span="6">
        <div
          style="background: #e6a23c; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-6
        </div>
      </SwyCol>
      <SwyCol :span="6">
        <div
          style="background: #f56c6c; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-6
        </div>
      </SwyCol>
    </SwyRow>
  </div>
</template>
```

:::

## 偏移

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <SwyRow>
      <SwyCol :span="6">
        <div
          style="background: #409eff; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          span: 6
        </div>
      </SwyCol>
      <SwyCol :span="6" :offset="6">
        <div
          style="background: #67c23a; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          span: 6, offset: 6
        </div>
      </SwyCol>
    </SwyRow>

    <SwyRow>
      <SwyCol :span="6" :offset="6">
        <div
          style="background: #409eff; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          span: 6, offset: 6
        </div>
      </SwyCol>
      <SwyCol :span="6" :offset="6">
        <div
          style="background: #67c23a; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          span: 6, offset: 6
        </div>
      </SwyCol>
    </SwyRow>

    <SwyRow>
      <SwyCol :span="12" :offset="6">
        <div
          style="background: #e6a23c; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          span: 12, offset: 6
        </div>
      </SwyCol>
    </SwyRow>
  </div>
</template>
```

:::

## 对齐方式

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <div style="color: #606266; margin-bottom: 5px;">左对齐（默认）</div>
    <SwyRow justify="start" style="background: #f5f7fa; padding: 10px; border-radius: 4px;">
      <SwyCol :span="4">
        <div
          style="background: #409eff; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-4
        </div>
      </SwyCol>
      <SwyCol :span="4">
        <div
          style="background: #67c23a; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-4
        </div>
      </SwyCol>
      <SwyCol :span="4">
        <div
          style="background: #e6a23c; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-4
        </div>
      </SwyCol>
    </SwyRow>

    <div style="color: #606266; margin-bottom: 5px;">居中对齐</div>
    <SwyRow justify="center" style="background: #f5f7fa; padding: 10px; border-radius: 4px;">
      <SwyCol :span="4">
        <div
          style="background: #409eff; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-4
        </div>
      </SwyCol>
      <SwyCol :span="4">
        <div
          style="background: #67c23a; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-4
        </div>
      </SwyCol>
      <SwyCol :span="4">
        <div
          style="background: #e6a23c; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-4
        </div>
      </SwyCol>
    </SwyRow>

    <div style="color: #606266; margin-bottom: 5px;">右对齐</div>
    <SwyRow justify="end" style="background: #f5f7fa; padding: 10px; border-radius: 4px;">
      <SwyCol :span="4">
        <div
          style="background: #409eff; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-4
        </div>
      </SwyCol>
      <SwyCol :span="4">
        <div
          style="background: #67c23a; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-4
        </div>
      </SwyCol>
      <SwyCol :span="4">
        <div
          style="background: #e6a23c; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-4
        </div>
      </SwyCol>
    </SwyRow>

    <div style="color: #606266; margin-bottom: 5px;">两端对齐</div>
    <SwyRow justify="space-between" style="background: #f5f7fa; padding: 10px; border-radius: 4px;">
      <SwyCol :span="4">
        <div
          style="background: #409eff; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-4
        </div>
      </SwyCol>
      <SwyCol :span="4">
        <div
          style="background: #67c23a; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-4
        </div>
      </SwyCol>
      <SwyCol :span="4">
        <div
          style="background: #e6a23c; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-4
        </div>
      </SwyCol>
    </SwyRow>

    <div style="color: #606266; margin-bottom: 5px;">均匀分布</div>
    <SwyRow justify="space-around" style="background: #f5f7fa; padding: 10px; border-radius: 4px;">
      <SwyCol :span="4">
        <div
          style="background: #409eff; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-4
        </div>
      </SwyCol>
      <SwyCol :span="4">
        <div
          style="background: #67c23a; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-4
        </div>
      </SwyCol>
      <SwyCol :span="4">
        <div
          style="background: #e6a23c; padding: 15px; color: white; text-align: center; border-radius: 4px;"
        >
          col-4
        </div>
      </SwyCol>
    </SwyRow>
  </div>
</template>
```

:::

## 响应式布局

参照 Bootstrap 的响应式设计，预设了五个响应尺寸：`xs`、`sm`、`md`、`lg` 和 `xl`。
:::demo

```vue
<template>
  <SwyRow :gutter="10">
    <SwyCol :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div style="background: #409eff; padding: 15px; color: white; border-radius: 4px;">Col</div>
    </SwyCol>
    <SwyCol :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <div style="background: #67c23a; padding: 15px; color: white; border-radius: 4px;">Col</div>
    </SwyCol>
    <SwyCol :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <div style="background: #e6a23c; padding: 15px; color: white; border-radius: 4px;">Col</div>
    </SwyCol>
    <SwyCol :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
      <div style="background: #f56c6c; padding: 15px; color: white; border-radius: 4px;">Col</div>
    </SwyCol>
  </SwyRow>
</template>
```

:::

## 基于断点的对象配置

你可以通过对象形式为不同断点设置具体的 `span` 和 `offset` 等属性。
:::demo

```vue
<template>
  <SwyRow :gutter="10">
    <SwyCol :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }" :lg="{ span: 6 }">
      <div style="background: #409eff; padding: 15px; color: white; border-radius: 4px;">
        Card 1
      </div>
    </SwyCol>
    <SwyCol :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }" :lg="{ span: 6 }">
      <div style="background: #67c23a; padding: 15px; color: white; border-radius: 4px;">
        Card 2
      </div>
    </SwyCol>
    <SwyCol :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }" :lg="{ span: 6 }">
      <div style="background: #e6a23c; padding: 15px; color: white; border-radius: 4px;">
        Card 3
      </div>
    </SwyCol>
    <SwyCol :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 8 }" :lg="{ span: 6 }">
      <div style="background: #f56c6c; padding: 15px; color: white; border-radius: 4px;">
        Card 4
      </div>
    </SwyCol>
  </SwyRow>
</template>
```

:::

## API

### Row 属性

| 参数    | 说明           | 类型                                                                 | 默认值 |
| ------- | -------------- | -------------------------------------------------------------------- | ------ |
| gutter  | 栅格间隔       | `number`                                                             | 0      |
| justify | 水平排列方式   | `start / end / center / space-around / space-between / space-evenly` | start  |
| align   | 垂直排列方式   | `top / middle / bottom`                                              | top    |
| tag     | 自定义元素标签 | `string`                                                             | div    |

### Col 属性

| 参数   | 说明                 | 类型               | 默认值 |
| ------ | -------------------- | ------------------ | ------ |
| span   | 栅格占据的列数       | `number`           | 24     |
| offset | 栅格左侧的间隔格数   | `number`           | 0      |
| push   | 栅格向右移动格数     | `number`           | 0      |
| pull   | 栅格向左移动格数     | `number`           | 0      |
| xs     | `<768px` 响应式配置  | `number / ColSize` | —      |
| sm     | `≥768px` 响应式配置  | `number / ColSize` | —      |
| md     | `≥992px` 响应式配置  | `number / ColSize` | —      |
| lg     | `≥1200px` 响应式配置 | `number / ColSize` | —      |
| xl     | `≥1920px` 响应式配置 | `number / ColSize` | —      |
| tag    | 自定义元素标签       | `string`           | div    |
