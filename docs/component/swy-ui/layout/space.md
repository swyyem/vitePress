# Space 间距

设置组件之间的间距。

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 30px;">
    <div>
      <div style="margin-bottom: 10px; color: #606266;">水平间距：</div>
      <SwySpace>
        <SwyButton>按钮1</SwyButton>
        <SwyButton type="primary">按钮2</SwyButton>
        <SwyButton type="success">按钮3</SwyButton>
        <SwyButton type="warning">按钮4</SwyButton>
      </SwySpace>
    </div>
  </div>
</template>
```

:::

## 垂直间距

:::demo

```vue
<template>
  <SwySpace direction="vertical">
    <SwyButton style="width: 100%;">按钮1</SwyButton>
    <SwyButton type="primary" style="width: 100%;">按钮2</SwyButton>
    <SwyButton type="success" style="width: 100%;">按钮3</SwyButton>
  </SwySpace>
</template>
```

:::

## 间距大小

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 30px;">
    <div>
      <div style="margin-bottom: 10px; color: #606266;">小间距：</div>
      <SwySpace size="small">
        <SwyButton>按钮1</SwyButton>
        <SwyButton>按钮2</SwyButton>
        <SwyButton>按钮3</SwyButton>
      </SwySpace>
    </div>

    <div>
      <div style="margin-bottom: 10px; color: #606266;">默认间距：</div>
      <SwySpace>
        <SwyButton>按钮1</SwyButton>
        <SwyButton>按钮2</SwyButton>
        <SwyButton>按钮3</SwyButton>
      </SwySpace>
    </div>

    <div>
      <div style="margin-bottom: 10px; color: #606266;">大间距：</div>
      <SwySpace size="large">
        <SwyButton>按钮1</SwyButton>
        <SwyButton>按钮2</SwyButton>
        <SwyButton>按钮3</SwyButton>
      </SwySpace>
    </div>

    <div>
      <div style="margin-bottom: 10px; color: #606266;">自定义间距（30px）：</div>
      <SwySpace :size="30">
        <SwyButton>按钮1</SwyButton>
        <SwyButton>按钮2</SwyButton>
        <SwyButton>按钮3</SwyButton>
      </SwySpace>
    </div>
  </div>
</template>
```

:::

## 自动换行

:::demo

```vue
<template>
  <div style="border: 1px dashed #dcdfe6; border-radius: 4px; padding: 15px;">
    <SwySpace wrap>
      <SwyButton v-for="i in 20" :key="i">按钮{{ i }}</SwyButton>
    </SwySpace>
  </div>
</template>
```

:::

## 对齐方式

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 30px;">
    <div>
      <div style="margin-bottom: 10px; color: #606266;">顶部对齐（默认）：</div>
      <div style="border: 1px dashed #dcdfe6; border-radius: 4px; padding: 15px;">
        <SwySpace align="start">
          <SwyButton size="large">大按钮</SwyButton>
          <SwyButton>默认按钮</SwyButton>
          <SwyButton size="small">小按钮</SwyButton>
        </SwySpace>
      </div>
    </div>

    <div>
      <div style="margin-bottom: 10px; color: #606266;">居中对齐：</div>
      <div style="border: 1px dashed #dcdfe6; border-radius: 4px; padding: 15px;">
        <SwySpace align="center">
          <SwyButton size="large">大按钮</SwyButton>
          <SwyButton>默认按钮</SwyButton>
          <SwyButton size="small">小按钮</SwyButton>
        </SwySpace>
      </div>
    </div>

    <div>
      <div style="margin-bottom: 10px; color: #606266;">底部对齐：</div>
      <div style="border: 1px dashed #dcdfe6; border-radius: 4px; padding: 15px;">
        <SwySpace align="end">
          <SwyButton size="large">大按钮</SwyButton>
          <SwyButton>默认按钮</SwyButton>
          <SwyButton size="small">小按钮</SwyButton>
        </SwySpace>
      </div>
    </div>
  </div>
</template>
```

:::

## 分隔符

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwySpace :size="15">
      首页
      <template #split><span style="color: #dcdfe6;">|</span></template>
      产品
      <template #split><span style="color: #dcdfe6;">|</span></template>
      关于
      <template #split><span style="color: #dcdfe6;">|</span></template>
      联系
    </SwySpace>

    <SwySpace>
      <SwyButton>操作1</SwyButton>
      <template #split>
        <div style="width: 1px; height: 20px; background: #dcdfe6;"></div>
      </template>
      <SwyButton>操作2</SwyButton>
      <template #split>
        <div style="width: 1px; height: 20px; background: #dcdfe6;"></div>
      </template>
      <SwyButton>操作3</SwyButton>
    </SwySpace>
  </div>
</template>
```

:::

## API

### Space Props

| 参数      | 说明                                   | 类型                               | 默认值     |
| --------- | -------------------------------------- | ---------------------------------- | ---------- |
| direction | 间距方向                               | `horizontal / vertical`            | horizontal |
| size      | 间距大小                               | `small / default / large / number` | default    |
| wrap      | 是否自动换行（仅在 horizontal 时有效） | `boolean`                          | false      |
| align     | 对齐方式                               | `start / end / center / baseline`  | —          |
| fill      | 子元素是否填充父容器                   | `boolean`                          | false      |

### Space Slots

| 名称    | 说明               |
| ------- | ------------------ |
| default | 需要添加间距的元素 |
| split   | 分隔符             |
