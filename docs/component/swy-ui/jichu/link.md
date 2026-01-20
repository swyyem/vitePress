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

### ProField 用法

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <ProField valueType="Link" :filedProps="{ href: 'https://example.com' }">默认链接</ProField>
    <ProField valueType="Link" :filedProps="{ type: 'primary', href: 'https://example.com' }">
      主要链接
    </ProField>
    <ProField valueType="Link" :filedProps="{ type: 'success', href: 'https://example.com' }">
      成功链接
    </ProField>
    <ProField valueType="Link" :filedProps="{ type: 'warning', href: 'https://example.com' }">
      警告链接
    </ProField>
    <ProField valueType="Link" :filedProps="{ type: 'danger', href: 'https://example.com' }">
      危险链接
    </ProField>
    <ProField valueType="Link" :filedProps="{ type: 'info', href: 'https://example.com' }">
      信息链接
    </ProField>
  </div>
</template>
```

:::

## 禁用状�?

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

### ProField 用法

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <ProField valueType="Link" :filedProps="{ disabled: true }">禁用链接</ProField>
    <ProField valueType="Link" :filedProps="{ type: 'primary', disabled: true }">
      禁用主要链接
    </ProField>
    <ProField valueType="Link" :filedProps="{ type: 'success', disabled: true }">
      禁用成功链接
    </ProField>
  </div>
</template>
```

:::

## 下划�?

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <SwyLink :underline="false">无下划线</SwyLink>
    <SwyLink>默认下划�?/SwyLink>
    <SwyLink type="primary">主要链接下划�?/SwyLink>
  </div>
</template>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <ProField valueType="Link" :filedProps="{ underline: false }">无下划线</ProField>
    <ProField valueType="Link">默认下划�?/ProField>
    <ProField valueType="Link" :filedProps="{ type: 'primary' }">主要链接下划�?/ProField>
  </div>
</template>
```

:::
