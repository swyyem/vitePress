# 各种CSS布局的使用方式和场景

## Flexbox 布局（一维布局）

- 使用场景： 导航栏、卡片列表、垂直居中

```css
/* 基础Flex容器 */
.container {
  display: flex;
  justify-content: space-between; /* 主轴对齐方式 */
  align-items: center; /* 交叉轴对齐方式 */
  gap: 20px; /* 项目间距 */
}

/* 经典导航栏 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: #333;
  color: white;
}

/* 垂直居中（超简单！） */
.centered-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}
```

## Grid 布局（二维布局）

- 使用场景： 整体页面布局、卡片网格、仪表盘

```css
/* 基础Grid容器 */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 三列：中间是两边的两倍 */
  grid-template-rows: auto 1fr auto; /* 三行：头尾自适应，中间撑满 */
  gap: 15px;
  height: 100vh;
}

/* 经典页面布局 */
.page-layout {
  display: grid;
  grid-template-areas:
    'header header header'
    'sidebar main ads'
    'footer footer footer';
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 200px 1fr 200px;
  min-height: 100vh;
}

.header {
  grid-area: header;
  background: #f0f0f0;
}
.sidebar {
  grid-area: sidebar;
  background: #e0e0e0;
}
.main {
  grid-area: main;
  background: white;
}
.ads {
  grid-area: ads;
  background: #e0e0e0;
}
.footer {
  grid-area: footer;
  background: #f0f0f0;
}

/* 响应式卡片网格 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}
```

```html
<!-- 页面布局示例 -->
<div class="page-layout">
  <header class="header">头部</header>
  <aside class="sidebar">侧边栏</aside>
  <main class="main">主要内容</main>
  <div class="ads">广告区</div>
  <footer class="footer">底部</footer>
</div>

<!-- 卡片网格示例 -->
<div class="card-grid">
  <div class="card">卡片1</div>
  <div class="card">卡片2</div>
  <div class="card">卡片3</div>
  <div class="card">卡片4</div>
</div>
```

## Subgrid 布局（Grid的增强）

- 使用场景： 嵌套网格需要与父网格对齐时

```css
/* 父级网格 */
.parent-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
  padding: 20px;
  border: 2px solid blue;
}

/* 子网格继承父级的列和行轨道 */
.child-with-subgrid {
  grid-column: 1 / -1; /* 横跨所有列 */
  display: grid;
  grid-template-columns: subgrid; /* 关键：继承父级的列轨道 */
  grid-template-rows: subgrid; /* 继承父级的行轨道 */
  gap: inherit;
  padding: 15px;
  border: 2px solid red;
}

/* 子网格内部元素 */
.sub-item {
  background: #f0f0f0;
  padding: 10px;
  border: 1px solid #ccc;
}
```

```html
<div class="parent-grid">
  <div>父网格项1</div>
  <div>父网格项2</div>
  <div>父网格项3</div>

  <!-- 使用subgrid的子项 -->
  <div class="child-with-subgrid">
    <div class="sub-item">子项1 - 自动对齐父网格列</div>
    <div class="sub-item">子项2 - 自动对齐父网格列</div>
    <div class="sub-item">子项3 - 自动对齐父网格列</div>
  </div>
</div>
```

## 多列布局

- 使用场景： 新闻文章、杂志风格排版

```css
.multi-column {
  column-count: 3;
  column-gap: 30px;
  column-rule: 1px solid #ddd;
  padding: 20px;
}

/* 响应式多列 */
@media (max-width: 768px) {
  .multi-column {
    column-count: 2;
  }
}

@media (max-width: 480px) {
  .multi-column {
    column-count: 1;
  }
}
```

```html
<div class="multi-column">
  <p>这里是第一段文本内容...</p>
  <p>这里是第二段文本内容...</p>
  <p>这里是第三段文本内容...</p>
  <p>文本会自动在列之间流动...</p>
</div>
```

## 定位布局

- 使用场景： 模态框、固定导航、悬浮元素

```css
/* 固定顶部导航 */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

/* 模态框 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  position: relative;
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
```

```html
<!-- 固定头部 -->
<header class="fixed-header">我是固定头部，滚动页面时我一直都在</header>

<!-- 模态框 -->
<div class="modal-overlay">
  <div class="modal-content">
    <button class="close-button">×</button>
    <h2>我是模态框</h2>
    <p>我使用固定定位覆盖在页面上方</p>
  </div>
</div>
```

## 浮动布局（现代用法）

- 使用场景： 文字环绕图片

```css
.article-with-float {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.float-image {
  float: left;
  margin: 0 20px 20px 0;
  width: 200px;
  height: 150px;
  shape-outside: circle(50%); /* 让文字环绕形状 */
}

.clearfix::after {
  content: '';
  display: table;
  clear: both;
}
```

```html
<article class="article-with-float clearfix">
  <img src="image.jpg" alt="示例图片" class="float-image" />
  <p>这里是文章内容，文字会环绕在图片周围。这是浮动布局在现代的正确用法...</p>
  <p>更多文字内容...</p>
</article>
```

## 时间线总结（代码注释版）

```css
/* 
CSS布局发展时间线：

1. 浮动布局 (1996 - CSS1)
   - 最初用于文字环绕，后来被滥用于整体布局
   - 现代用法：回归文字环绕图片

2. 定位布局 (1996 - CSS1)  
   - 固定定位、绝对定位、相对定位
   - 适合悬浮元素、模态框

3. Flexbox (2009年概念，2010年代成熟)
   - 一维布局革命
   - 解决了垂直居中、空间分配等难题

4. Grid (2010年代后期主流支持)
   - 二维布局革命
   - 真正的网格系统

5. Subgrid (2019年后逐步支持)
   - Grid的增强功能
   - 解决嵌套网格对齐问题
*/
```
