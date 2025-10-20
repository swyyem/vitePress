# 核心概念：CSS的"作用域隔离"

- 1. 全局CSS：像在公共场所涂鸦，所有人都能看到
- 2. 作用域CSS：像在自己房间装修，只影响当前房间

## 一、Vue中的CSS作用域

### 1. `<style scoped>` - 最常用的方案

```vue
<template>
  <div class="user-card">
    <h3 class="title">用户信息</h3>
    <p class="content">用户名: {{ username }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '小明',
    };
  },
};
</script>

<style scoped>
/* 这里的样式只在这个组件内生效 */
.user-card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
}

.title {
  color: #333;
  font-size: 18px;
}

.content {
  color: #666;
  line-height: 1.6;
}

/* 即使其他组件也有 .title 类，也不会被影响 */
</style>
```

### 2. 原理：自动添加属性选择器

- 编译前：

```vue
<style scoped>
.title {
  color: red;
}
</style>
```

- 编译后：

```css
.title[data-v-7ba5bd90] {
  color: red;
}
```

- 对应的HTML：

```html
<h3 class="title" data-v-7ba5bd90>用户信息</h3>
```

## 二、不同框架的实现方式

### 1. Vue SFC (单文件组件)

```vue
<template>
  <div class="container">
    <button class="btn">点击我</button>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.btn {
  background: blue;
  color: white;
  padding: 10px 20px;
}

/* 这个 .btn 样式不会影响其他组件的按钮 */
</style>
```

### 2. React - CSS Modules

```jsx
// Button.jsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.btn}>点击我</button>;
}

export default Button;
```

```css
/* Button.module.css */
.btn {
  background: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}

/* 编译后类名会变成：Button_btn_1xb2a */
```

### 3. React - Styled Components

```jsx
import styled from 'styled-components';

// 这个样式只在这个组件中生效
const StyledButton = styled.button`
  background: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;

  &:hover {
    background: darkblue;
  }
`;

function Button() {
  return <StyledButton>点击我</StyledButton>;
}
```

## 三、深度选择器：穿透scoped限制

### 问题场景：需要修改子组件样式

```vue
<template>
  <div class="parent">
    <ChildComponent class="child" />
  </div>
</template>

<style scoped>
/* 默认无法影响子组件样式 */
.parent .child {
  color: red; /* 不生效！ */
}
</style>
```

### 解决方案：深度选择器

```vue
<style scoped>
/* Vue2/3 深度选择器 */
.parent ::v-deep .child {
  color: red;
}

/* 或者 */
.parent /deep/ .child {
  color: red;
}

/* Vue3 推荐 */
.parent :deep(.child) {
  color: red;
}
```

### 实际应用示例

```vue
<template>
  <div class="custom-dialog">
    <el-dialog title="自定义对话框">
      <div class="dialog-content">自定义内容</div>
    </el-dialog>
  </div>
</template>

<style scoped>
.custom-dialog :deep(.el-dialog__header) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.custom-dialog :deep(.el-dialog__title) {
  color: white;
  font-weight: bold;
}

.custom-dialog :deep(.el-dialog__body) {
  padding: 30px;
}
</style>
```

## 四、CSS Modules 详细用法

### 在 Vue 中使用 CSS Modules

```vue
<template>
  <div :class="$style.container">
    <button :class="[$style.btn, $style.primary]">主要按钮</button>
    <button :class="{ [$style.btn]: true, [$style.disabled]: isDisabled }">禁用按钮</button>
  </div>
</template>

<style module>
.container {
  padding: 20px;
  border: 1px solid #e0e0e0;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary {
  background: #1890ff;
  color: white;
}

.disabled {
  background: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}
</style>
```

### 在 JavaScript 中访问类名

```vue
<script>
export default {
  computed: {
    // 在 JS 中访问 CSS Modules
    buttonClasses() {
      return {
        [this.$style.btn]: true,
        [this.$style.loading]: this.isLoading,
      };
    },
  },
};
</script>
```

## 五、组合使用全局和局部样式

### 1. 多个 `style` 标签

```vue
<template>
  <div class="component-wrapper global-style local-style">内容</div>
</template>

<!-- 全局样式 -->
<style>
.global-style {
  font-family: 'Arial', sans-serif;
  box-sizing: border-box;
}

/* 第三方库需要的全局样式 */
.third-party-class {
  /* 全局生效 */
}
</style>

<!-- 局部样式 -->
<style scoped>
.local-style {
  padding: 20px;
  background: white;
}

.component-wrapper {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
```

### 2. CSS变量与作用域结合

```vue
<template>
  <div class="theme-container">
    <div class="card">卡片内容</div>
    <button class="btn">按钮</button>
  </div>
</template>

<style scoped>
.theme-container {
  /* 定义局部CSS变量 */
  --primary-color: #1890ff;
  --border-radius: 8px;
  --spacing: 20px;
}

.card {
  padding: var(--spacing);
  border-radius: var(--border-radius);
  border: 1px solid var(--primary-color);
}

.btn {
  background: var(--primary-color);
  color: white;
  padding: 10px var(--spacing);
  border-radius: var(--border-radius);
}
</style>
```

## 六、实际项目最佳实践

### 1. BEM命名规范 + Scoped

```vue
<template>
  <div class="user-profile">
    <div class="user-profile__header">
      <h2 class="user-profile__title">用户资料</h2>
    </div>
    <div class="user-profile__content">
      <div class="user-profile__avatar"></div>
      <p class="user-profile__bio">个人简介...</p>
    </div>
  </div>
</template>

<style scoped>
.user-profile {
  max-width: 600px;
  margin: 0 auto;
}

.user-profile__header {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 16px;
  margin-bottom: 24px;
}

.user-profile__title {
  font-size: 24px;
  color: #333;
  margin: 0;
}

.user-profile__content {
  display: flex;
  gap: 20px;
}

.user-profile__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #f0f0f0;
}

.user-profile__bio {
  flex: 1;
  color: #666;
  line-height: 1.6;
}
</style>
```

### 2. 组合式样式方案

```vue
<template>
  <div :class="classes.container">
    <button :class="classes.primaryButton">主要操作</button>
    <button :class="classes.secondaryButton">次要操作</button>
  </div>
</template>

<script>
export default {
  computed: {
    classes() {
      return {
        container: 'flex gap-4 p-6 bg-white rounded-lg shadow-sm',
        primaryButton: 'btn btn--primary btn--large',
        secondaryButton: 'btn btn--secondary',
      };
    },
  },
};
</script>

<style scoped>
/* 基础按钮样式 */
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn--primary {
  background: #1890ff;
  color: white;
}

.btn--primary:hover {
  background: #40a9ff;
}

.btn--secondary {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #d9d9d9;
}

.btn--large {
  padding: 12px 24px;
  font-size: 16px;
}
</style>
```

## 七、常见问题与解决方案

### 1. 样式覆盖问题

```vue
<template>
  <div class="my-component">
    <!-- 需要覆盖第三方组件样式 -->
    <el-button class="custom-el-button">自定义按钮</el-button>
  </div>
</template>

<style scoped>
/* 错误：无法覆盖子组件样式 */
.custom-el-button {
  background: red !important; /* 不生效 */
}

/* 正确：使用深度选择器 */
.my-component :deep(.custom-el-button) {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  border: none;
  color: white;
}
</style>
```

### 2. 动态类名处理

```vue
<template>
  <div :class="[$style.card, $style[`card--${type}`], { [$style.loading]: isLoading }]">内容</div>
</template>

<style module>
.card {
  padding: 20px;
  border-radius: 8px;
}

.card--primary {
  background: #e6f7ff;
  border: 1px solid #91d5ff;
}

.card--success {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
}

.card--warning {
  background: #fffbe6;
  border: 1px solid #ffe58f;
}

.loading {
  opacity: 0.6;
  pointer-events: none;
}
</style>
```

## 面试回答技巧

```text
"有几种主流方案可以实现CSS作用域隔离：

1. Vue的 <style scoped>：

最常用的方案，自动为选择器添加属性标识

通过 data-v-xxx 属性实现样式隔离

使用 :deep() 穿透子组件样式

2. CSS Modules：

将类名编译为哈希字符串，实现天然隔离

在JS中通过 $style 对象访问类名

支持组合和继承

3. Styled Components：

CSS-in-JS方案，样式与组件紧密绑定

支持动态样式和主题切换

4. 命名约定：

使用BEM、SUIT等命名规范人工隔离

配合构建工具确保唯一性

在实际Vue项目中，我主要使用 <style scoped>，因为它：

开发体验简单直观

与Vue工具链完美集成

性能良好，编译时处理

同时会结合CSS变量和深度选择器处理复杂场景。"

记住核心方案：
Vue用scoped，React用CSS Modules，复杂项目用CSS-in-JS
```
