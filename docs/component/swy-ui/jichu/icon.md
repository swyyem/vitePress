# Icon 图标

提供了一套常用的图标集合

## 基础用法

使用 `name` 属性指定图标名称
:::demo

```vue
<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <SwyIcon name="search" />
    <SwyIcon name="edit" />
    <SwyIcon name="check" />
    <SwyIcon name="close" />
    <SwyIcon name="delete" />
    <SwyIcon name="arrow-left" />
    <SwyIcon name="arrow-right" />
    <SwyIcon name="star-filled" />
  </div>
</template>
```

:::

## 图标尺寸

使用 `size` 属性设置图标大小，支持预设值或自定义尺寸
:::demo

```vue
<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <SwyIcon name="search" size="small" />
    <SwyIcon name="search" size="default" />
    <SwyIcon name="search" size="large" />
    <SwyIcon name="search" size="32px" />
    <SwyIcon name="search" size="48px" />
  </div>
</template>
```

:::

## 图标颜色

使用 `color` 属性设置图标颜色
:::demo

```vue
<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <SwyIcon name="star-filled" color="#409EFF" size="large" />
    <SwyIcon name="star-filled" color="#67C23A" size="large" />
    <SwyIcon name="star-filled" color="#E6A23C" size="large" />
    <SwyIcon name="star-filled" color="#F56C6C" size="large" />
    <SwyIcon name="star-filled" color="#909399" size="large" />
  </div>
</template>
```

:::

## 常用图标

以下是一些常用图标示例：

:::demo

```vue
<template>
  <div
    style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 20px;"
  >
    <div
      v-for="icon in icons"
      :key="icon"
      style="display: flex; flex-direction: column; align-items: center; gap: 8px;"
    >
      <SwyIcon :name="icon" size="24px" />
      <span style="font-size: 12px; color: #999;">{{ icon }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const icons = [
  'search',
  'edit',
  'check',
  'close',
  'delete',
  'plus',
  'minus',
  'arrow-up',
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'circle-check',
  'circle-close',
  'warning',
  'info-filled',
  'star-filled',
  'star',
  'share',
  'download',
  'upload',
  'setting',
  'user',
  'lock',
  'unlock',
  'bell',
  'calendar',
  'folder',
  'document',
  'picture',
  'video-camera',
  'location',
  'phone',
  'message',
  'chat-dot-round',
  'shopping-cart',
]
</script>
```

:::

## 所有图

查看[完整图标列表](https://element-plus.org/zh-CN/component/icon.html)

## 在按钮中使用

图标可以直接在按钮组件中通过 `icon` 属性使用：

:::demo

```vue
<template>
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <SwyButton type="primary" icon="search">搜索</SwyButton>
    <SwyButton type="success" icon="check">确认</SwyButton>
    <SwyButton type="warning" icon="warning">警告</SwyButton>
    <SwyButton type="danger" icon="delete">删除</SwyButton>
    <SwyButton type="info" icon="info-filled">信息</SwyButton>
  </div>
</template>
```

:::

### ProField 用法

:::demo

```vue
<template>
  <div style="width: 300px;">
    <ProField valueType="Icon" :fieldProps="{ name: 'star-filled' }" />
  </div>
</template>
```

:::

## Icon 属

| 属性名 | 说明             | 类型               | 可选                                        | 默认    |
| ------ | ---------------- | ------------------ | ------------------------------------------- | ------- |
| name   | 图标名称或图标组 | string / Component |                                             |         |
| size   | 图标大小         | string             | small / default / large 或具体尺寸如 '20px' | default |
| color  | 图标颜色         | string             |                                             |         |

## 图标名称对照

图标名称采用 kebab-case 命名（小写字连字符），例如：

- `search` - 搜索
- `edit` - 编辑
- `arrow-left` - 左箭- `circle-check` - 圆形勾- `star-filled` - 实心星星

查看完整图标列表请参[Element Plus Icons](https://element-plus.org/zh-CN/component/icon.html)
