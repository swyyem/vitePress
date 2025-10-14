# 盒子模型

## 盒模型是什么？

- 通俗理解： 每个HTML元素都是一个"盒子"，这个盒子由4部分组成：

```text
从内到外：内容 → 内边距 → 边框 → 外边距
```

```css
.box {
  width: 200px; /* 内容宽度 */
  height: 100px; /* 内容高度 */
  padding: 20px; /* 内边距 */
  border: 5px solid; /* 边框 */
  margin: 10px; /* 外边距 */
}
```

## 两种盒模型的区别

### W3C标准盒模型（默认）

- 计算公式

```text
总宽度 = width + padding-left + padding-right + border-left + border-right
总高度 = height + padding-top + padding-bottom + border-top + border-bottom
```

- 示例

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .standard-box {
        box-sizing: content-box; /* 标准盒模型 */
        width: 200px;
        height: 100px;
        padding: 20px;
        border: 5px solid red;
        margin: 10px;
        background: lightblue;
      }
    </style>
  </head>
  <body>
    <div class="standard-box">标准盒模型</div>
  </body>
</html>
```

- 实际占用空间：

```text
宽度：200 + 20×2 + 5×2 = 250px

高度：100 + 20×2 + 5×2 = 150px

比喻： 你说要200px的内容区域，加上padding和border后，盒子实际变大了。
```

### IE盒模型（怪异模式）

- 计算公式：

```text
总宽度 = width（已经包含padding和border）
总高度 = height（已经包含padding和border）
```

- 示例

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .ie-box {
        box-sizing: border-box; /* IE盒模型 */
        width: 200px;
        height: 100px;
        padding: 20px;
        border: 5px solid green;
        margin: 10px;
        background: lightgreen;
      }
    </style>
  </head>
  <body>
    <div class="ie-box">IE盒模型</div>
  </body>
</html>
```

- 实际占用空间：

```text
宽度：200px（固定不变）

高度：100px（固定不变）

内容区域：200 - 20×2 - 5×2 = 150px

比喻： 你说要200px的盒子，不管怎么加padding和border，盒子大小不变，内容区域缩小。
```

## 对比可视化

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      .container {
        display: flex;
        gap: 20px;
      }

      .box {
        height: 100px;
        padding: 20px;
        border: 5px solid;
        margin: 10px;
        text-align: center;
      }

      .standard {
        box-sizing: content-box; /* 标准 */
        width: 200px;
        background: lightblue;
        border-color: red;
      }

      .ie {
        box-sizing: border-box; /* IE */
        width: 200px;
        background: lightgreen;
        border-color: green;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="box standard">
        <strong>标准盒模型</strong>
        <br />
        设置width: 200px
        <br />
        实际宽度: 250px
      </div>

      <div class="box ie">
        <strong>IE盒模型</strong>
        <br />
        设置width: 200px
        <br />
        实际宽度: 200px
      </div>
    </div>
  </body>
</html>
```

## 如何切换盒模型

```css
/* 全局设置为IE盒模型（推荐） */
* {
  box-sizing: border-box;
}

/* 或者单独设置 */
.element {
  box-sizing: border-box; /* IE盒模型 */
}

.another-element {
  box-sizing: content-box; /* 标准盒模型 */
}
```

## 为什么现在推荐用IE盒模型？

```css
/* 这样布局更直观 */
.column {
  box-sizing: border-box;
  width: 33.33%;
  padding: 20px;
  border: 1px solid #ccc;
}

/* 如果没有border-box，计算会很麻烦：
   宽度 = 33.33% - padding×2 - border×2 
   这种计算在响应式布局中几乎不可能 */
```

## 现代CSS重置的标配：

```css
/* 现代CSS重置 */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

## 总结

- CSS盒模型有两种：
- 标准盒模型（content-box）：
- width/height 只表示内容区域
- 总宽度 = width + padding + border
- 这是浏览器的默认行为
- IE盒模型（border-box）：
- width/height 表示内容 + padding + border 的总和
- 总宽度就是设置的 width
- 更符合直觉，布局更方便
- 我用一个比喻：标准盒模型像买毛坯房，说的面积只是套内面积；IE盒模型像买精装修房，说的面积已经包含了墙壁。
- 现在开发中我们通常用 box-sizing: border-box，因为这样设置宽度时不需要考虑padding和border的影响，布局更可控。

## 记住核心区别：

- 标准：width = 内容 | IE：width = 内容 + padding + border
