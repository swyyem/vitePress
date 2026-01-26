# Empty 空状态

空状态时的占位提示

## 基础用法

:::demo

```vue
<template>
  <SwyEmpty description="暂无数据" />
</template>
```

:::

## 自定义图片

:::demo

```vue
<template>
  <SwyEmpty
    image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
    :image-size="200"
    description="暂无数据"
  />
</template>
```

:::

## 自定义底部内容

:::demo

```vue
<template>
  <SwyEmpty description="暂无数据">
    <SwyButton type="primary">立即创建</SwyButton>
  </SwyEmpty>
</template>
```

:::

## API

### Empty Props

| 参数        | 说明           | 类型     | 默认值 |
| ----------- | -------------- | -------- | ------ |
| image       | 图片地址       | `string` |        |
| imageSize   | 图片大小(像素) | `number` | 160    |
| description | 描述文字       | `string` |        |

### Empty Slots

| 名称        | 说明           |
| ----------- | -------------- |
| default     | 自定义底部内容 |
| image       | 自定义图片     |
| description | 自定义描述文字 |
