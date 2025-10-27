# 如何监听 DOM 树中的节点添加、删除、属性更改和内容更改等事件

**核心思想：两种监听模式的比喻**

1. **主动巡逻模式（MutationObserver）：** 派一个保安定期检查房间，记录所有变化后一次性汇报给你
2. **被动报警模式（已废弃的 Mutation Events）：** 在房间里装很多传感器，任何微小变化都会立即报警

## 一、现代方案：MutationObserver（推荐使用）

**这是目前最强大、最高效的 DOM 监听方案。**

### 基本使用（三步法）

```javascript
// 第一步：创建观察者（相当于雇佣保安）
const observer = new MutationObserver(function (mutationsList) {
  // mutationsList 是变化记录的数组，包含所有检测到的变更
  for (let mutation of mutationsList) {
    console.log('检测到变化类型：', mutation.type);

    switch (mutation.type) {
      case 'childList':
        console.log('子节点发生变化');
        // 遍历新增的节点
        mutation.addedNodes.forEach(node => {
          console.log('新增节点：', node);
        });
        // 遍历被移除的节点
        mutation.removedNodes.forEach(node => {
          console.log('删除节点：', node);
        });
        break;

      case 'attributes':
        console.log(`属性 ${mutation.attributeName} 发生变化`);
        console.log('新值：', mutation.target.getAttribute(mutation.attributeName));
        console.log('旧值：', mutation.oldValue); // 需要配置 attributeOldValue: true
        break;

      case 'characterData':
        console.log('文本内容发生变化');
        break;
    }
  }
});

// 第二步：配置观察选项（告诉保安要关注什么）
const config = {
  childList: true, // 观察子节点的添加/删除
  attributes: true, // 观察属性变化
  attributeFilter: ['class', 'style'], // 只观察特定属性（可选）
  attributeOldValue: true, // 记录属性旧值（可选）
  characterData: true, // 观察文本内容变化
  characterDataOldValue: true, // 记录文本旧值（可选）
  subtree: true, // 观察所有后代节点，不仅仅是直接子节点
};

// 第三步：开始观察（派保安上岗）
const targetNode = document.getElementById('container');
observer.observe(targetNode, config);

// 需要停止观察时（让保安下岗）
// observer.disconnect();
```

### 实际应用示例

- **监听动态加载的内容：**

```javascript
// 监听整个 document.body 的所有变化
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          // 元素节点
          console.log('有新元素添加到页面：', node);

          // 如果是图片，可以处理懒加载
          if (node.tagName === 'IMG') {
            node.classList.add('lazy-load');
          }
        }
      });
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
```

- **监听特定元素的属性变化：**

```javascript
// 监听一个可折叠组件的展开/收起状态
const collapsible = document.querySelector('.collapsible');
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      if (mutation.target.classList.contains('expanded')) {
        console.log('组件展开了');
        // 执行展开后的逻辑
      } else {
        console.log('组件收起了');
        // 执行收起后的逻辑
      }
    }
  });
});

observer.observe(collapsible, {
  attributes: true,
  attributeFilter: ['class'],
});
```

## 二、历史方案：Mutation Events（已废弃）

```javascript
// ❌ 已废弃！不要使用
document.addEventListener('DOMNodeInserted', function (event) {
  console.log('节点被添加：', event.target);
});

document.addEventListener('DOMNodeRemoved', function (event) {
  console.log('节点被删除：', event.target);
});

document.addEventListener('DOMAttrModified', function (event) {
  console.log('属性被修改：', event.attrName, '=', event.newValue);
});
```

**为什么被废弃：**

- **性能问题：** 每个变化都立即触发事件，频繁操作时会导致严重性能问题
- **同步执行：** 可能阻塞用户交互
- **浏览器兼容性：** 不同浏览器实现不一致

## 三、特定场景的专用方案

- 有些特殊情况，使用专用方案更合适：

### 1. 监听元素进入视图（IntersectionObserver）

```javascript
// 图片懒加载
const lazyImages = document.querySelectorAll('img.lazy');
const imageObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

lazyImages.forEach(img => imageObserver.observe(img));
```

### 2. 监听尺寸变化（ResizeObserver）

```javascript
// 监听元素尺寸变化
const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    console.log('元素尺寸变化：', entry.contentRect);
  }
});

resizeObserver.observe(document.getElementById('resizable-element'));
```

### 3. 监听输入框内容变化

```javascript
// 专门的 input 事件比 MutationObserver 更简单
const searchInput = document.querySelector('#search');
searchInput.addEventListener('input', function (event) {
  console.log('搜索内容：', event.target.value);
  // 实现搜索建议等功能
});
```
