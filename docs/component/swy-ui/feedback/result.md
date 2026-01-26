# Result 结果

用于对用户的操作结果或者异常状态做反馈

## 基础用法

:::demo

```vue
<template>
  <div style="display: flex; gap: 40px; flex-wrap: wrap;">
    <SwyResult icon="success" title="成功提示" subTitle="请根据提示进行操作">
      <template #extra>
        <SwyButton type="primary">返回</SwyButton>
      </template>
    </SwyResult>
  </div>
</template>
```

:::

## 不同状态

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 40px;">
    <SwyResult icon="success" title="成功提示" subTitle="请根据提示进行操作" />
    <SwyResult icon="warning" title="警告提示" subTitle="请根据提示进行操作" />
    <SwyResult icon="error" title="错误提示" subTitle="请根据提示进行操作" />
    <SwyResult icon="info" title="信息提示" subTitle="请根据提示进行操作" />
  </div>
</template>
```

:::

## 自定义内容

:::demo

```vue
<template>
  <SwyResult title="404" subTitle="抱歉,您访问的页面不存在">
    <template #icon>
      <div style="font-size: 72px; color: #909399;">404</div>
    </template>
    <template #extra>
      <SwyButton type="primary">返回首页</SwyButton>
    </template>
  </SwyResult>
</template>
```

:::

## API

### Result Props

| 参数     | 说明     | 类型                                          | 默认值 |
| -------- | -------- | --------------------------------------------- | ------ |
| title    | 标题     | `string`                                      |        |
| subTitle | 副标题   | `string`                                      |        |
| icon     | 图标类型 | `'success' \| 'warning' \| 'info' \| 'error'` | info   |

### Result Slots

| 名称     | 说明               |
| -------- | ------------------ |
| icon     | 自定义图标         |
| title    | 自定义标题         |
| subTitle | 自定义副标题       |
| extra    | 自定义底部额外区域 |
