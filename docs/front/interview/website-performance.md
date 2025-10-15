# 核心思想：让用户觉得「快」

- 优化不是一堆冰冷的技术指标，而是让用户从点击链接到完成交互的整个过程中，都感觉流畅、迅速。

## 第一站：用户输入网址，敲下回车

- 目标： 尽快看到页面内容（减少首次加载时间）

### 减少文件体积和数量 - 「少拉货，跑得快」

```bash
# 压缩前：200KB的CSS文件
# 压缩后：50KB的CSS文件 → 传输时间减少75%
```

- 具体做法：

1. 代码压缩： CSS、JavaScript、HTML文件去掉空格、注释
2. 图片优化：

- 使用现代格式（WebP代替JPEG/PNG）
- 适当压缩质量（肉眼看不出的压缩）
- 使用雪碧图（合并小图标）
- 删除无用代码： 使用工具删除永远执行不到的代码

### 减少网络请求次数 - 「减少停车缴费次数」

```html
<!-- 不好的做法：10个小图标，10次请求 -->
<img src="icon1.png" />
<img src="icon2.png" />
...
<img src="icon10.png" />

<!-- 好的做法：1个雪碧图，1次请求 -->
<div class="sprite icon1"></div>
<div class="sprite icon2"></div>
```

### 使用CDN加速 - 「把商品放在离用户最近的仓库」

```javascript
// 你的服务器在北京，上海用户访问慢
// 使用CDN后：上海用户从上海的CDN节点获取资源
```

## 第二站：浏览器开始加载页面

- 目标： 尽快渲染出内容（优化渲染性能）

### 让CSS尽快加载 - 「先装修，再摆家具」

```html
<!-- CSS放在头部 - 让浏览器知道样式，避免页面闪烁 -->
<head>
  <link rel="stylesheet" href="styles.css" />
</head>

<!-- JavaScript放在底部 - 不阻塞页面渲染 -->
<body>
  <!-- 页面内容 -->
  <script src="app.js"></script>
</body>
```

### 懒加载 - 「先展示看到的，再加载其他的」

```html
<!-- 图片懒加载：滚动到视口再加载 -->
<img data-src="real-image.jpg" src="placeholder.jpg" class="lazy" />

<script>
  // 当图片进入可视区域时，替换为真实图片
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });
</script>
```

### 代码分割 - 「不一次搬完所有家具」

```javascript
// React中的代码分割
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

// 只有当需要这个组件时，才加载对应的JS文件
```

## 第三站：页面显示出来了

- 目标： 让交互更流畅（优化运行时性能）

### 防抖和节流 - 「避免频繁触发」

```javascript
// 搜索框防抖：用户停止输入300ms后才搜索
function debounce(func, wait) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), wait);
  };
}

const search = debounce(keyword => {
  // 执行搜索
}, 300);

searchInput.addEventListener('input', e => search(e.target.value));
```

### 避免重排和重绘 - 「减少重新装修」

```javascript
// 不好的做法：多次修改样式，导致多次重排
element.style.width = '100px';
element.style.height = '200px';
element.style.margin = '10px';

// 好的做法：一次性修改
element.style.cssText = 'width:100px; height:200px; margin:10px;';
```

### 使用事件委托 - 「不在每个按钮上装监听器」

```javascript
// 不好的做法：每个按钮都绑定事件
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', handleClick);
});

// 好的做法：在父元素上绑定一个事件
document.getElementById('container').addEventListener('click', e => {
  if (e.target.classList.contains('btn')) {
    handleClick(e);
  }
});
```

## 第四站：重复访问时

- 目标： 让回头客体验更好（利用缓存）

### 浏览器缓存 - 「记住之前买过的东西」

```html
<!-- 服务器设置缓存头 -->
<!-- 这个文件1年内不会重新请求 -->
<script src="app.js" crossorigin="anonymous"></script>
```

- 对应的服务器设置：

```text
Cache-Control: max-age=31536000  # 1年缓存
```

### Service Worker - 「本地代理仓库」

```javascript
// 缓存重要资源，即使离线也能访问
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll(['/', '/styles.css', '/app.js', '/logo.png']);
    })
  );
});
```

## 高级优化方案

### 预加载和预连接 - 「提前准备」

```html
<!-- 预加载重要资源 -->
<link rel="preload" href="critical-font.woff2" as="font" />

<!-- 预连接到第三方域名 -->
<link rel="preconnect" href="https://fonts.googleapis.com" />

<!-- 预获取下一页资源 -->
<link rel="prefetch" href="next-page.html" />
```

### 服务器端渲染 - 「服务员先把菜准备好」
