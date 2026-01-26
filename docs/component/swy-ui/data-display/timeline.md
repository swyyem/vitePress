# Timeline 时间线

可视化地呈现时间流信息

## 基础用法

:::demo

```vue
<template>
  <SwyTimeline>
    <SwyTimelineItem timestamp="2024-01-20 10:30">创建了项目</SwyTimelineItem>
    <SwyTimelineItem timestamp="2024-01-19 15:20">完成了设计稿</SwyTimelineItem>
    <SwyTimelineItem timestamp="2024-01-18 09:00">开始需求分析</SwyTimelineItem>
    <SwyTimelineItem timestamp="2024-01-17 14:00">召开项目启动会</SwyTimelineItem>
  </SwyTimeline>
</template>
```

:::

## 自定义节点样式

:::demo

```vue
<template>
  <SwyTimeline>
    <SwyTimelineItem timestamp="2024-01-20" color="success">项目已上线</SwyTimelineItem>
    <SwyTimelineItem timestamp="2024-01-18" color="primary">🚀 开发完成</SwyTimelineItem>
    <SwyTimelineItem timestamp="2024-01-15" color="warning">⚠️ 发现bug</SwyTimelineItem>
    <SwyTimelineItem timestamp="2024-01-10" color="danger">测试未通过</SwyTimelineItem>
  </SwyTimeline>
</template>
```

:::

## 自定义图标

:::demo

```vue
<template>
  <SwyTimeline>
    <SwyTimelineItem timestamp="2024-01-20">
      <template #dot>
        <div
          style="width: 16px; height: 16px; border-radius: 50%; background: #67c23a; display: flex; align-items: center; justify-content: center; font-size: 10px; color: white;"
        ></div>
      </template>
      部署到生产环境
    </SwyTimelineItem>

    <SwyTimelineItem timestamp="2024-01-19">
      <template #dot>
        <div
          style="width: 16px; height: 16px; border-radius: 50%; background: #409eff; display: flex; align-items: center; justify-content: center; font-size: 10px; color: white;"
        ></div>
      </template>
      推送代码到仓库
    </SwyTimelineItem>

    <SwyTimelineItem timestamp="2024-01-18">
      <template #dot>
        <div style="width: 16px; height: 16px; border-radius: 50%; background: #e6a23c;"></div>
      </template>
      开始编写代码
    </SwyTimelineItem>
  </SwyTimeline>
</template>
```

:::

## 时间戳位置

:::demo

```vue
<template>
  <div style="display: flex; flex-direction: column; gap: 30px;">
    <div>
      <h4>顶部显示时间</h4>
      <SwyTimeline>
        <SwyTimelineItem timestamp="2024-01-20 10:30" placement="top">更新系统文档</SwyTimelineItem>
        <SwyTimelineItem timestamp="2024-01-19 15:20" placement="top">修复已知问题</SwyTimelineItem>
        <SwyTimelineItem timestamp="2024-01-18 09:00" placement="top">发布新版本</SwyTimelineItem>
      </SwyTimeline>
    </div>

    <div>
      <h4>底部显示时间戳（默认）</h4>
      <SwyTimeline>
        <SwyTimelineItem timestamp="2024-01-20 10:30">更新系统文档</SwyTimelineItem>
        <SwyTimelineItem timestamp="2024-01-19 15:20">修复已知问题</SwyTimelineItem>
        <SwyTimelineItem timestamp="2024-01-18 09:00">发布新版本</SwyTimelineItem>
      </SwyTimeline>
    </div>
  </div>
</template>
```

:::

## 详细内容

:::demo

```vue
<template>
  <SwyTimeline>
    <SwyTimelineItem timestamp="2024-01-20 10:30:00" color="success">
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <h4 style="margin: 0;">项目发布 v2.0</h4>
        <p style="margin: 0; color: #606266;">本次更新包含以下内容</p>
        <ul style="margin: 0; padding-left: 20px; color: #909399;">
          <li>新增用户权限管理功能</li>
          <li>优化页面加载性能</li>
          <li>修复若干已知问题</li>
        </ul>
      </div>
    </SwyTimelineItem>

    <SwyTimelineItem timestamp="2024-01-18 14:00:00" color="primary">
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <h4 style="margin: 0;">完成功能开发</h4>
        <p style="margin: 0; color: #606266;">所有计划功能已开发完成，进入测试阶段</p>
      </div>
    </SwyTimelineItem>

    <SwyTimelineItem timestamp="2024-01-15 09:00:00">
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <h4 style="margin: 0;">开始项目开发</h4>
        <p style="margin: 0; color: #606266;">项目正式启动，开始功能开发</p>
      </div>
    </SwyTimelineItem>
  </SwyTimeline>
</template>
```

:::

## 镂空节点

:::demo

```vue
<template>
  <SwyTimeline>
    <SwyTimelineItem timestamp="2024-01-20" hollow color="success">已完成</SwyTimelineItem>
    <SwyTimelineItem timestamp="2024-01-18" hollow color="primary">进行中</SwyTimelineItem>
    <SwyTimelineItem timestamp="2024-01-15" hollow>待开始</SwyTimelineItem>
  </SwyTimeline>
</template>
```

:::

## 居中对齐

:::demo

```vue
<template>
  <SwyTimeline center>
    <SwyTimelineItem timestamp="2024-01-20" placement="top">里程碑 1</SwyTimelineItem>
    <SwyTimelineItem timestamp="2024-01-18" placement="top">里程碑 2</SwyTimelineItem>
  </SwyTimeline>
</template>
```

:::

## API

### Timeline Props

| 参数    | 说明         | 类型      | 默认  |
| ------- | ------------ | --------- | ----- |
| reverse | 是否倒序显示 | `boolean` | false |
| center  | 是否居中对齐 | `boolean` | false |

### Timeline-Item Props

| 参数      | 说明       | 类型                                          | 默认   |
| --------- | ---------- | --------------------------------------------- | ------ |
| timestamp | 时间       | `string`                                      |        |
| placement | 时间戳位置 | `top / bottom`                                | bottom |
| type      | 节点类型   | `primary / success / warning / danger / info` |        |
| hollow    | 是否镂空   | `boolean`                                     | false  |
| color     | 节点颜色   | `string`                                      |        |
| size      | 节点尺寸   | `normal / large`                              | normal |
| icon      | 节点图标   | `string`                                      |        |

### Timeline-Item Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 时间线项的内容 |
| dot     | 自定义节点内容 |
