# SwyIcon 图标组件

## 概述

SwyIcon 是一个统一的图标组件，包含了 293 个来自 Element Plus 的 SVG 图标。支持字符串名称和组件两种使用方式。

## 特性

- ✅ 293 个精美图标
- ✅ 支持字符串名称引用
- ✅ 支持组件直接引用
- ✅ 可自定义尺寸和颜色
- ✅ 与 Button 组件完美集成

## 基础用法

### 方式一：字符串名称（推荐）

```vue
<template>
  <swy-icon name="search" />
  <swy-icon name="edit" />
  <swy-icon name="delete" />
</template>
```

### 方式二：组件引用

```vue
<template>
  <swy-icon :name="Search" />
  <swy-icon :name="Edit" />
</template>

<script setup>
import { Search, Edit } from '@swy-ui/components/icon'
</script>
```

## 设置尺寸

```vue
<template>
  <!-- 预设尺寸 -->
  <swy-icon name="search" size="small" />
  <!-- 14px -->
  <swy-icon name="search" size="default" />
  <!-- 16px -->
  <swy-icon name="search" size="large" />
  <!-- 20px -->

  <!-- 自定义尺寸 -->
  <swy-icon name="search" size="24px" />
  <swy-icon name="search" size="2em" />
</template>
```

## 设置颜色

```vue
<template>
  <swy-icon name="star-filled" color="#409EFF" />
  <swy-icon name="star-filled" color="red" />
  <swy-icon name="star-filled" color="rgb(103, 194, 58)" />
</template>
```

## 在 Button 中使用

Button 组件原生支持 icon 属性，可以直接传入图标名称：

```vue
<template>
  <swy-button type="primary" icon="search">搜索</swy-button>
  <swy-button type="success" icon="check">确认</swy-button>
  <swy-button type="danger" icon="delete">删除</swy-button>

  <!-- 圆形图标按钮 -->
  <swy-button type="primary" icon="search" circle />
</template>
```

## 图标命名规则

图标名称采用 **kebab-case**（小写字母 + 连字符）命名：

- `search` - 搜索图标
- `edit` - 编辑图标
- `arrow-left` - 左箭头
- `circle-check` - 圆形勾选
- `star-filled` - 实心星星

## 常用图标列表

### 基础操作

- `search` - 搜索
- `edit` - 编辑
- `delete` - 删除
- `plus` - 加号
- `minus` - 减号
- `check` - 勾选
- `close` - 关闭
- `refresh` - 刷新

### 箭头方向

- `arrow-up` - 上箭头
- `arrow-down` - 下箭头
- `arrow-left` - 左箭头
- `arrow-right` - 右箭头
- `arrow-up-bold` - 粗上箭头
- `arrow-down-bold` - 粗下箭头

### 状态图标

- `circle-check` - 成功
- `circle-close` - 关闭
- `warning` - 警告
- `info-filled` - 信息
- `question-filled` - 问号

### 文件操作

- `folder` - 文件夹
- `document` - 文档
- `download` - 下载
- `upload` - 上传
- `copy-document` - 复制

### 用户相关

- `user` - 用户
- `user-filled` - 实心用户
- `avatar` - 头像
- `lock` - 锁定
- `unlock` - 解锁

### 通讯相关

- `message` - 消息
- `chat-dot-round` - 聊天
- `phone` - 电话
- `bell` - 铃铛
- `notification` - 通知

### 媒体相关

- `picture` - 图片
- `video-camera` - 摄像机
- `camera` - 相机
- `video-play` - 播放
- `video-pause` - 暂停

### 其他

- `setting` - 设置
- `calendar` - 日历
- `location` - 位置
- `star` - 空心星
- `star-filled` - 实心星
- `shopping-cart` - 购物车
- `more` - 更多

## 完整图标列表

查看所有 293 个图标，请运行：

```bash
# 启动开发服务器
npm run dev

# 访问图标文档页面
http://localhost:5173/component/swy-ui/jichu/icon.html
```

或者直接查看源码目录：

```
src/swy-ui/components/icon/src/icons/
```

## API

### Icon Props

| 属性名 | 说明           | 类型               | 可选值                             | 默认值  |
| ------ | -------------- | ------------------ | ---------------------------------- | ------- |
| name   | 图标名称或组件 | string / Component | —                                  | —       |
| size   | 图标大小       | string             | small / default / large 或具体尺寸 | default |
| color  | 图标颜色       | string             | —                                  | —       |

## 类型定义

```typescript
import type { Component } from 'vue'

interface IconProps {
  name: string | Component // 图标名称或组件
  size?: string // 尺寸
  color?: string // 颜色
}
```

## 注意事项

1. **图标名称大小写**：使用 kebab-case 格式（如 `arrow-left`），组件会自动转换为 PascalCase（如 `ArrowLeft`）
2. **性能优化**：图标使用按需加载，不会影响首屏加载速度
3. **浏览器兼容**：支持所有现代浏览器，IE 需要 polyfill
4. **自定义图标**：可以在 `src/icons/` 目录添加自己的 SVG 图标组件

## 示例

```vue
<template>
  <div class="demo">
    <!-- 基础使用 -->
    <swy-icon name="search" />

    <!-- 设置大小和颜色 -->
    <swy-icon name="star-filled" size="24px" color="#ff6600" />

    <!-- 在按钮中使用 -->
    <swy-button icon="search" type="primary">搜索</swy-button>

    <!-- 动态图标 -->
    <swy-icon :name="currentIcon" @click="changeIcon" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentIcon = ref('search')

const changeIcon = () => {
  const icons = ['search', 'edit', 'delete', 'check']
  const index = icons.indexOf(currentIcon.value)
  currentIcon.value = icons[(index + 1) % icons.length]
}
</script>
```
