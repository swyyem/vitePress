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

### ProField 用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <ProField valueType="SwyAlert" :filedProps="{ title: '成功提示', type: 'success' }" />
    <ProField valueType="SwyAlert" :filedProps="{ title: '信息提示', type: 'info' }" />
    <ProField valueType="SwyAlert" :filedProps="{ title: '警告提示', type: 'warning' }" />
    <ProField valueType="SwyAlert" :filedProps="{ title: '错误提示', type: 'error' }" />
    <ProField valueType="SwyAlert" :filedProps="{ title: '主要提示', type: 'primary' }" />
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

### ProField 用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <ProField
      valueType="SwyAlert"
      :filedProps="{ title: '浅色主题', type: 'success', effect: 'light' }"
    />
    <ProField
      valueType="SwyAlert"
      :filedProps="{ title: '深色主题', type: 'success', effect: 'dark' }"
    />
  </div>
</template>
```

:::

## 带描述

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <SwyAlert
      title="成功提示的标题"
      type="success"
      description="这是一条成功提示的辅助性文字介绍"
    />
    <SwyAlert title="信息提示的标题" type="info" description="这是一条信息提示的辅助性文字介绍" />
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
      valueType="SwyAlert"
      :filedProps="{
        title: '成功提示的标题',
        type: 'success',
        description: '这是一条成功提示的辅助性文字介绍',
      }"
    />
    <ProField
      valueType="SwyAlert"
      :filedProps="{
        title: '信息提示的标题',
        type: 'info',
        description: '这是一条信息提示的辅助性文字介绍',
      }"
    />
  </div>
</template>
```

:::

## 带图标

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

### ProField 用法

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <ProField
      valueType="SwyAlert"
      :filedProps="{ title: '成功提示', type: 'success', showIcon: true }"
    />
    <ProField
      valueType="SwyAlert"
      :filedProps="{ title: '信息提示', type: 'info', showIcon: true }"
    />
    <ProField
      valueType="SwyAlert"
      :filedProps="{ title: '警告提示', type: 'warning', showIcon: true }"
    />
    <ProField
      valueType="SwyAlert"
      :filedProps="{ title: '错误提示', type: 'error', showIcon: true }"
    />
  </div>
</template>
```

:::

## 居中

:::demo

```vue
<template>
  <SwyAlert title="居中的文字" type="success" center />
</template>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <ProField
    valueType="SwyAlert"
    :filedProps="{ title: '居中的文字', type: 'success', center: true }"
  />
</template>
```

:::

## 自定义关闭按钮

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <SwyAlert title="不可关闭" type="success" :closable="false" />
    <SwyAlert title="自定义关闭文字" type="info" close-text="知道了" />
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
      valueType="SwyAlert"
      :filedProps="{ title: '不可关闭', type: 'success', closable: false }"
    />
    <ProField
      valueType="SwyAlert"
      :filedProps="{ title: '自定义关闭文字', type: 'info', closeText: '知道了' }"
    />
  </div>
</template>
```

:::
