# Text 文本

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <SwyText>默认文本</SwyText>
    <SwyText type="primary">主要文本</SwyText>
    <SwyText type="success">成功文本</SwyText>
    <SwyText type="warning">警告文本</SwyText>
    <SwyText type="danger">危险文本</SwyText>
    <SwyText type="info">信息文本</SwyText>
  </div>
</template>
```

:::

## 尺寸

:::demo

```vue
<template>
  <div style="display: flex; align-items: center; gap: 16px;">
    <SwyText size="large">大号文本</SwyText>
    <SwyText>默认文本</SwyText>
    <SwyText size="small">小号文本</SwyText>
  </div>
</template>
```

:::

## 截断

当文本长度超出容器时，可以通过 `truncated` 属性实现单行省略。

> [!TIP]
> 当文本发生截断时，组件会自动添加 `title` 属性，用户悬停即可查看完整内容。

:::demo

```vue
<template>
  <div style="width: 200px;">
    <SwyText truncated>
      这是一段很长的文本内容，会被截断显示省略号，此时悬停会看到完整内容提示。
    </SwyText>
  </div>
</template>
```

:::

## 多行截断

通过 `line-clamp` 属性实现多行省略。

> [!TIP]
> 当内容超过指定行数发生截断时，也会由于溢出检测自动生成 `title` 提示。

:::demo

```vue
<template>
  <div style="width: 300px;">
    <SwyText :line-clamp="2">
      这是一段很长的文本内容，超过两行后会被截断。这是一段很长的文本内容，超过两行后会被截断。这是一段很长的文本内容，超过两行后会被截断。悬停查看完整内容。
    </SwyText>
  </div>
</template>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div style="width: 300px;">
    <ProField valueType="Text" :fieldProps="{ lineClamp: 2 }">
      这是一段很长的文本内容，超过两行后会被截断。这是一段很长的文本内容，超过两行后会被截断。这是一段很长的文本内容，超过两行后会被截断
    </ProField>
  </div>
</template>
```

:::

## Text 属性

| 属性名     | 说明           | 类型            | 可选值                                      | 默认值 |
| ---------- | -------------- | --------------- | ------------------------------------------- | ------ |
| type       | 文本类型       | string          | primary / success / warning / danger / info | —      |
| size       | 文本尺寸       | string          | large / default / small                     | —      |
| truncated  | 是否截断       | boolean         | —                                           | false  |
| line-clamp | 显示的行数     | string / number | —                                           | —      |
| tag        | 自定义元素标签 | string          | —                                           | span   |
