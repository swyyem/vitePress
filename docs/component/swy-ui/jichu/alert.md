# Alert 提示

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <SwyAlert title="成功提示" type="success" />
    <SwyAlert title="信息提示" type="info" />
    <SwyAlert title="警告提示" type="warning" />
    <SwyAlert title="错误提示" type="error" />
    <SwyAlert title="主要提示" type="primary" />
  </div>
</template>
```

:::

## 主题样式

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <SwyAlert title="浅色主题" type="success" effect="light" />
    <SwyAlert title="深色主题" type="success" effect="dark" />
  </div>
</template>
```

:::

## 带描

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <SwyAlert title="成功提示的标" type="success" description="这是一条成功提示的辅助性文字介" />
    <SwyAlert title="信息提示的标" type="info" description="这是一条信息提示的辅助性文字介" />
  </div>
</template>
```

:::

## 带图

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <SwyAlert title="成功提示" type="success" show-icon />
    <SwyAlert title="信息提示" type="info" show-icon />
    <SwyAlert title="警告提示" type="warning" show-icon />
    <SwyAlert title="错误提示" type="error" show-icon />
  </div>
</template>
```

:::

## 居中

:::demo

```vue
<template>
  <SwyAlert title="居中的文" type="success" center />
</template>
```

:::

## 自定义关闭按

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <SwyAlert title="不可关闭" type="success" :closable="false" />
    <SwyAlert title="自定义关闭文" type="info" close-text="知道" />
  </div>
</template>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <ProField
      valueType="Alert"
      :fieldProps="{ title: '不可关闭', type: 'success', closable: false }"
    />
    <ProField
      valueType="Alert"
      :fieldProps="{ title: '自定义关闭文', type: 'info', closeText: '知道' }"
    />
  </div>
</template>
```

:::
