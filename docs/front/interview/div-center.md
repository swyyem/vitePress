# 让一个 `<div>` 在它的父容器里上下居中。

```css
<div class="parent">
  <div class="child">我要上下居中！</div>
</div>
```

## 方法一：Flexbox 大法（最推荐、最现代）

- 一句话解释： 告诉爸爸（父容器）变成一个Flex盒子，然后让它用唯一的方式处理孩子——就是上下左右都居中。

```css
.parent {
  display: flex; /* 爸爸变成Flex容器 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 400px; /* 必须给爸爸一个高度 */
  background: #f0f0f0;
}

.child {
  background: #333;
  color: white;
  padding: 20px;
}
```

## 方法二：Grid 大法（同样推荐、代码更短）

- 一句话解释： 告诉爸爸（父容器）变成一个Grid网格，然后用一个属性搞定所有居中。

```css
.parent {
  display: grid; /* 爸爸变成Grid容器 */
  place-items: center; /* 一个属性，同时控制水平和垂直居中 */
  height: 400px;
  background: #f0f0f0;
}

.child {
  background: #333;
  color: white;
  padding: 20px;
}
```

## 方法三：绝对定位 + Transform（经典老方法）

- 一句话解释： 让孩子脱离文档流，先定位到爸爸的50%位置，再用自己的位移回退50%。

```css
.parent {
  position: relative; /* 爸爸要设为相对定位 */
  height: 400px;
  background: #f0f0f0;
}

.child {
  position: absolute; /* 孩子绝对定位 */
  top: 50%; /* 先跑到爸爸上半部分的50%位置 */
  left: 50%; /* 先跑到爸爸左半部分的50%位置 */
  transform: translate(-50%, -50%); /* 关键：把自己往回挪自身宽高的50% */
  background: #333;
  color: white;
  padding: 20px;
}
```

## 方法四：绝对定位 + Margin（已知尺寸）

- 一句话解释： 在知道孩子具体尺寸的情况下，用负margin把它"拉"回来。

```css
.parent {
  position: relative;
  height: 400px;
  background: #f0f0f0;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px; /* 必须知道宽度 */
  height: 100px; /* 必须知道高度 */
  margin-top: -50px; /* 往回拉高度的一半 */
  margin-left: -100px; /* 往回拉宽度的一半 */
  background: #333;
  color: white;
  padding: 20px;
}
```

## 方法五：绝对定位 + calc（未知尺寸）

- 一句话解释： 用calc()函数把孩子拉回。

```css
.parent {
  position: relative;
}
```

## 方法五：Table-Cell 大法（怀旧方法）

- 一句话解释： 告诉爸爸（父容器）变成一个表格，然后让孩子用表格的方式处理。

```css
.parent {
  display: table-cell; /* 假装我是表格单元格 */
  vertical-align: middle; /* 表格单元格的垂直居中 */
  text-align: center; /* 水平居中 */
  height: 400px;
  width: 100%;
  background: #f0f0f0;
}

.child {
  display: inline-block; /* 孩子要变成行内块 */
  background: #333;
  color: white;
  padding: 20px;
}
```
