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

### ProField 用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <ProField valueType="Text">默认文本</ProField>
    <ProField valueType="Text" :filedProps="{ type: 'primary' }">主要文本</ProField>
    <ProField valueType="Text" :filedProps="{ type: 'success' }">成功文本</ProField>
    <ProField valueType="Text" :filedProps="{ type: 'warning' }">警告文本</ProField>
    <ProField valueType="Text" :filedProps="{ type: 'danger' }">危险文本</ProField>
    <ProField valueType="Text" :filedProps="{ type: 'info' }">信息文本</ProField>
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

### ProField 用法

:::demo

```vue
<template>
  <div style="display: flex; align-items: center; gap: 16px;">
    <ProField valueType="Text" :filedProps="{ size: 'large' }">大号文本</ProField>
    <ProField valueType="Text">默认文本</ProField>
    <ProField valueType="Text" :filedProps="{ size: 'small' }">小号文本</ProField>
  </div>
</template>
```

:::

## 截断

:::demo

```vue
<template>
  <div style="width: 200px;">
    <SwyText truncated>这是一段很长的文本内容，会被截断显示省略号</SwyText>
  </div>
</template>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div style="width: 200px;">
    <ProField valueType="Text" :filedProps="{ truncated: true }">
      这是一段很长的文本内容，会被截断显示省略号
    </ProField>
  </div>
</template>
```

:::

## 多行截断

:::demo

```vue
<template>
  <div style="width: 300px;">
    <SwyText :line-clamp="2">
      这是一段很长的文本内容，超过两行后会被截断。这是一段很长的文本内容，超过两行后会被截断。这是一段很长的文本内容，超过两行后会被截断�?
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
    <ProField valueType="Text" :filedProps="{ lineClamp: 2 }">
      这是一段很长的文本内容，超过两行后会被截断。这是一段很长的文本内容，超过两行后会被截断。这是一段很长的文本内容，超过两行后会被截断�?
    </ProField>
  </div>
</template>
```

:::
