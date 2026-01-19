# Link 链接

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <SwyLink href="https://example.com">默认链接</SwyLink>
    <SwyLink type="primary" href="https://example.com">主要链接</SwyLink>
    <SwyLink type="success" href="https://example.com">成功链接</SwyLink>
    <SwyLink type="warning" href="https://example.com">警告链接</SwyLink>
    <SwyLink type="danger" href="https://example.com">危险链接</SwyLink>
    <SwyLink type="info" href="https://example.com">信息链接</SwyLink>
  </div>
</template>
```

:::

## 禁用状态

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <SwyLink disabled>禁用链接</SwyLink>
    <SwyLink type="primary" disabled>禁用主要链接</SwyLink>
    <SwyLink type="success" disabled>禁用成功链接</SwyLink>
  </div>
</template>
```

:::

## 下划线

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <SwyLink :underline="false">无下划线</SwyLink>
    <SwyLink>默认下划线</SwyLink>
    <SwyLink type="primary">主要链接下划线</SwyLink>
  </div>
</template>
```

:::
