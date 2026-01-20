# 图标系统迁移说明

## 🎉 更新内容

### 新增功能

1. **新增 SwyIcon 组件**
   - 集成了 293 个 Element Plus 图标
   - 支持字符串名称和组件两种使用方式
   - 可自定义尺寸和颜色

2. **Button 组件增强**
   - `icon` 属性现在支持字符串名称（原来只支持组件）
   - 新增 `shadow` 属性 - 阴影效果
   - 新增 `block` 属性 - 块级按钮
   - 新增 `throttle` 属性 - 节流防重复点击

3. **样式优化**
   - 添加 `min-width: 64px` 防止按钮过窄
   - 优化过渡动画效果
   - 添加移动端触摸优化
   - Link 按钮添加下划线和 visited 状态

## 📁 文件结构

```
src/swy-ui/components/icon/
├── src/
│   ├── icons/              # 293 个图标组件
│   │   ├── search.vue
│   │   ├── edit.vue
│   │   ├── ...
│   │   └── index.ts        # 图标导出文件
│   ├── icon.vue            # SwyIcon 主组件
│   └── icon.ts             # 类型定义
├── index.ts                # 组件导出
└── README.md               # 使用文档
```

## 🚀 使用方式

### 旧方式（不推荐）

```vue
<template>
  <SwyButton type="primary">
    <template #icon>🔍</template>
    搜索
  </SwyButton>
</template>
```

### 新方式（推荐）

```vue
<template>
  <!-- 方式一：直接使用字符串 -->
  <SwyButton type="primary" icon="search">搜索</SwyButton>

  <!-- 方式二：使用 SwyIcon 组件 -->
  <SwyIcon name="search" size="large" color="#409EFF" />
</template>
```

## 📝 迁移指南

### 1. 按钮图标迁移

**旧代码：**

```vue
<SwyButton type="primary">
  <template #icon>🔍</template>
  搜索
</SwyButton>
```

**新代码：**

```vue
<SwyButton type="primary" icon="search">搜索</SwyButton>
```

### 2. 独立图标使用

**旧方式：**

```vue
<span style="font-size: 20px;">🔍</span>
```

**新方式：**

```vue
<SwyIcon name="search" size="20px" />
```

## 🎨 图标名称对照

| Emoji | 图标名称      | 说明   |
| ----- | ------------- | ------ |
| 🔍    | search        | 搜索   |
| ✏️    | edit          | 编辑   |
| ✓     | check         | 勾选   |
| 💬    | message       | 消息   |
| 🗑️    | delete        | 删除   |
| ⚙️    | setting       | 设置   |
| 👤    | user          | 用户   |
| 📁    | folder        | 文件夹 |
| 📄    | document      | 文档   |
| 📷    | camera        | 相机   |
| 📍    | location      | 位置   |
| 📞    | phone         | 电话   |
| ⭐    | star          | 星星   |
| 🔔    | bell          | 铃铛   |
| 🛒    | shopping-cart | 购物车 |

## 🆕 新增按钮属性

### 1. shadow - 阴影效果

```vue
<SwyButton type="primary" shadow>阴影按钮</SwyButton>
```

### 2. block - 块级按钮

```vue
<SwyButton type="primary" block>占满容器宽度</SwyButton>
```

### 3. throttle - 节流控制

```vue
<SwyButton type="primary" :throttle="2000" @click="submit">
  提交（2秒内只能点击一次）
</SwyButton>
```

## 📊 图标统计

- **总计图标数量：** 293 个
- **图标来源：** Element Plus Icons
- **文件大小：** 约 300KB（未压缩）
- **加载方式：** 按需加载

## 🔧 技术细节

### 图标命名转换

组件内部会自动将 kebab-case 转换为 PascalCase：

```typescript
// 输入：'arrow-left'
// 转换：'ArrowLeft'
// 匹配组件：ArrowLeft.vue

const iconName = 'arrow-left'
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('')
// 结果：'ArrowLeft'
```

### 类型安全

```typescript
import type { Component } from 'vue'

// Icon 组件支持两种类型
type IconName = string | Component

// Button 组件的 icon 属性
interface ButtonProps {
  icon?: string | Component
}
```

## 🐛 已知问题

暂无

## 📚 相关文档

- [Icon 组件文档](./docs/component/swy-ui/jichu/icon.md)
- [Button 组件文档](./docs/component/swy-ui/jichu/button.md)
- [Element Plus Icons](https://element-plus.org/zh-CN/component/icon.html)

## 🎯 后续计划

- [ ] 添加图标搜索功能
- [ ] 支持自定义图标上传
- [ ] 添加图标动画效果
- [ ] 优化图标加载性能

## 💡 FAQ

### Q: 如何查看所有可用图标？

A: 访问文档页面 `/component/swy-ui/jichu/icon` 或查看 `src/swy-ui/components/icon/src/icons/` 目录。

### Q: 可以使用自己的图标吗？

A: 可以！在 `src/swy-ui/components/icon/src/icons/` 目录下添加你的 Vue 图标组件，并在 `index.ts` 中导出即可。

### Q: 图标太大/太小怎么办？

A: 使用 `size` 属性调整，支持预设值（small/default/large）和具体尺寸（如 '24px'）。

### Q: 如何修改图标颜色？

A: 使用 `color` 属性，支持任何有效的 CSS 颜色值。

### Q: 旧的 template #icon 方式还能用吗？

A: 可以！新旧方式完全兼容，但推荐使用新的 `icon` 属性方式，更简洁。

## 📅 更新日期

2025-01-20
