# DOM 事件流和事件委托详解

## 什么是 DOM 事件流？

**_DOM 事件流描述的是事件在DOM结构中传播的过程。想象一下你点击一个按钮，这个点击事件其实经历了三个阶段：捕获阶段、目标阶段、冒泡阶段。_**

- 捕获阶段（Capture Phase）
- 事件从 window → document → `<html>` → `<body>` → 一直向下到目标元素
- 就像警察抓人：从总局→分局→派出所→具体位置

- 目标阶段（Target Phase）
- 事件到达实际被点击的元素
- 就像抓到嫌疑人

- 冒泡阶段（Bubble Phase）
- 事件从目标元素向上冒泡到 window
- 就像汇报工作：具体位置→派出所→分局→总局

## 事件委托（事件代理）

### 什么是事件委托？

**_事件委托就是利用事件冒泡机制，把子元素的事件处理委托给父元素。_**

### 为什么要用事件委托？

- 传统方式的问题：

```javascript
// 不好的做法：给每个列表项单独绑定事件
const items = document.querySelectorAll('.list-item');
items.forEach(item => {
  item.addEventListener('click', function () {
    console.log('点击了:', this.textContent);
  });
});

// 问题：
// 1. 性能差：每个元素都要绑定事件
// 2. 动态添加的元素无法自动绑定事件
```

- 事件委托的解决方案：

```javascript
// 好的做法：委托给父元素
const list = document.querySelector('.list');
list.addEventListener('click', function (event) {
  // event.target 是实际被点击的元素
  if (event.target.classList.contains('list-item')) {
    console.log('点击了:', event.target.textContent);
  }
});

// 优势：
// 1. 只需要一个事件监听器
// 2. 动态添加的元素自动"继承"事件处理
// 3. 内存占用少
```

## 面试常见问题与回答

### 1. 什么是事件冒泡和事件捕获？

- "事件冒泡和事件捕获是DOM事件传播的两种机制。事件捕获是从外向内传播，就像警察抓人从总局到具体位置；事件冒泡是从内向外传播，就像汇报工作从具体位置到总局。现代浏览器默认使用冒泡机制。"

### 2. 事件委托的原理是什么？

- "事件委托利用了事件冒泡机制。我们不在每个子元素上绑定事件，而是在父元素上绑定一个事件监听器。当子元素的事件冒泡到父元素时，通过 event.target 判断是哪个子元素触发的事件，然后执行相应的处理。"

### 3. 事件委托有什么优点？

```text
"主要有三个优点：
性能优化：只需要一个事件监听器，减少内存占用
动态元素支持：新添加的子元素自动具有事件处理能力
代码简洁：避免给大量相似元素重复绑定事件"
```

### 4. 如何阻止事件冒泡？

```javascript
element.addEventListener('click', function (event) {
  event.stopPropagation(); // 阻止事件继续传播
  // 或者
  event.stopImmediatePropagation(); // 阻止事件传播且阻止同一元素的其他监听器执行
});
```

### 5. `event.target` 和 `event.currentTarget` 的区别？

```javascript
parent.addEventListener('click', function (event) {
  console.log('event.target:', event.target); // 实际触发事件的元素
  console.log('event.currentTarget:', event.currentTarget); // 绑定事件监听器的元素（总是这个parent）
});
```

## 实用技巧和注意事项

### 1. 精确委托：使用 `closest()` 方法

```javascript
// 更好的委托方式
container.addEventListener('click', function (event) {
  const button = event.target.closest('.delete-btn');
  if (button) {
    // 处理删除逻辑
    const item = button.closest('.item');
    item.remove();
  }
});
```

### 2. 性能优化：避免频繁的事件处理

```javascript
// 使用防抖优化频繁触发的事件
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

scrollContainer.addEventListener(
  'scroll',
  debounce(function (event) {
    // 处理滚动逻辑
  }, 100)
);
```
