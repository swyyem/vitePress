# Breadcrumb 面包屑

显示当前页面的路径，快速返回之前的任意页面。

## 基础用法

:::demo

```vue
<template>
  <SwyBreadcrumb>
    <SwyBreadcrumbItem>首页</SwyBreadcrumbItem>
    <SwyBreadcrumbItem>活动管理</SwyBreadcrumbItem>
    <SwyBreadcrumbItem>活动列表</SwyBreadcrumbItem>
    <SwyBreadcrumbItem>活动详情</SwyBreadcrumbItem>
  </SwyBreadcrumb>
</template>
```

:::

## 自定义分隔符

:::demo

```vue
<template>
  <SwyBreadcrumb separator=">">
    <SwyBreadcrumbItem>首页</SwyBreadcrumbItem>
    <SwyBreadcrumbItem>活动管理</SwyBreadcrumbItem>
    <SwyBreadcrumbItem>活动列表</SwyBreadcrumbItem>
  </SwyBreadcrumb>
</template>
```

:::

## Breadcrumb 属性

| 属性名    | 说明   | 类型   | 可选值 | 默认值 |
| --------- | ------ | ------ | ------ | ------ |
| separator | 分隔符 | string | —      | /      |

## BreadcrumbItem 属性

| 属性名 | 说明                           | 类型            | 可选值 | 默认值 |
| ------ | ------------------------------ | --------------- | ------ | ------ |
| to     | 路由跳转目标，同vue-router的to | string / object | —      | —      |
