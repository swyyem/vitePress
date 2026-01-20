# PageHeader 页头

页面头部组件，用于显示页面标题、面包屑、返回按钮等。

## 基础用法

:::demo

```vue
<template>
  <SwyPageHeader title="详情页面" @back="goBack" />
</template>

<script lang="ts" setup>
const goBack = () => {
  console.log('返回')
  alert('返回上一页')
}
</script>
```

:::

## 带副标题和内容

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <SwyPageHeader title="用户信息" content="查看和编辑用户的详细信息" @back="goBack" />

    <div style="padding: 20px; border: 1px solid #dcdfe6; border-radius: 4px;">页面内容区域</div>
  </div>
</template>

<script lang="ts" setup>
const goBack = () => {
  console.log('返回')
}
</script>
```

:::

## 自定义内容

:::demo

```vue
<template>
  <SwyPageHeader @back="goBack">
    <template #title>
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 20px; font-weight: bold;">📝 编辑文章</span>
        <span
          style="padding: 2px 8px; background: #67c23a; color: white; border-radius: 4px; font-size: 12px;"
        >
          草稿
        </span>
      </div>
    </template>

    <template #content>
      <div style="color: #909399; font-size: 14px; margin-top: 8px;">
        最后编辑：2024-01-20 14:30
      </div>
    </template>

    <template #extra>
      <div style="display: flex; gap: 10px;">
        <SwyButton>预览</SwyButton>
        <SwyButton type="primary">发布</SwyButton>
      </div>
    </template>
  </SwyPageHeader>
</template>

<script lang="ts" setup>
const goBack = () => {
  console.log('返回')
}
</script>
```

:::

## 面包屑导航

:::demo

```vue
<template>
  <SwyPageHeader title="商品详情" :breadcrumb="breadcrumbItems" @back="goBack">
    <template #extra>
      <div style="display: flex; gap: 8px;">
        <SwyButton size="small">编辑</SwyButton>
        <SwyButton size="small" type="danger">删除</SwyButton>
      </div>
    </template>
  </SwyPageHeader>
</template>

<script lang="ts" setup>
const breadcrumbItems = [
  { title: '首页', path: '/' },
  { title: '商品管理', path: '/products' },
  { title: '商品列表', path: '/products/list' },
  { title: '商品详情' },
]

const goBack = () => {
  console.log('返回商品列表')
}
</script>
```

:::

## API

### PageHeader Props

| 参数       | 说明         | 类型     | 默认值 |
| ---------- | ------------ | -------- | ------ |
| title      | 标题         | `string` | —      |
| content    | 内容         | `string` | —      |
| breadcrumb | 面包屑配置   | `array`  | —      |
| backText   | 返回按钮文字 | `string` | 返回   |

### PageHeader Events

| 事件名 | 说明               | 参数 |
| ------ | ------------------ | ---- |
| back   | 点击返回按钮时触发 | —    |

### PageHeader Slots

| 名称    | 说明         |
| ------- | ------------ |
| title   | 标题内容     |
| content | 内容         |
| extra   | 右侧额外内容 |
