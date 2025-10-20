# Vue的路由实现：hash模式 和 history模式区别

- 核心概念：两种不同的"地址管理方式"
- 把单页面应用（SPA）想象成一本魔法书：

1. 内容：书的具体章节（页面组件）
2. 地址：如何告诉别人你在看哪一页

## 一、Hash 模式（哈希模式）

### 工作原理：使用 URL 中的 # 号

- 通俗理解： 像书的页码标签，切换标签不会刷新整本书

```javascript
// Hash 模式的URL看起来像这样：
http://example.com/#/home
http://example.com/#/about
http://example.com/#/user/123
```

### 技术原理

```javascript
// Hash 模式的核心是监听 hashchange 事件
window.addEventListener('hashchange', function () {
  const hash = window.location.hash; // 获取 # 后面的内容
  console.log('当前hash:', hash); // "#/home" 或 "#/about"

  // 根据 hash 值渲染对应的组件
  renderComponentBasedOnHash(hash);
});

// 改变 hash（不会导致页面刷新）
function navigateTo(path) {
  window.location.hash = '#' + path;
}

// 使用示例
navigateTo('/user/123'); // URL变为: http://example.com/#/user/123
```

### Vue Router 中的 Hash 模式

```javascript
// 创建路由实例
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(), // 使用 hash 模式
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/user/:id', component: User },
  ],
});
```

## 二、History 模式（历史模式）

### 工作原理：使用正常的 URL 路径

- 通俗理解： 像真实的书籍页码，看起来更自然，但需要特殊处理

```javascript
// History 模式的URL看起来像正常的URL：
http://example.com/home
http://example.com/about
http://example.com/user/123
```

### 技术原理

```javascript
// History 模式使用 History API
// 1. 添加历史记录（不会刷新页面）
function navigateTo(path) {
  history.pushState({}, '', path);
  // 手动触发路由变化处理
  handleRouteChange();
}

// 2. 替换当前历史记录
function replaceRoute(path) {
  history.replaceState({}, '', path);
  handleRouteChange();
}

// 3. 监听前进后退
window.addEventListener('popstate', function () {
  const path = window.location.pathname;
  console.log('当前路径:', path); // "/home" 或 "/about"
  handleRouteChange();
});

// 使用示例
navigateTo('/user/123'); // URL变为: http://example.com/user/123
```

### Vue Router 中的 History 模式

```javascript
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(), // 使用 history 模式
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/user/:id', component: User },
  ],
});
```

## 三、两种模式的核心区别

### 对比表格

| 特性       | Hash 模式               | History 模式                  |
| ---------- | ----------------------- | ----------------------------- |
| URL 美观度 | 有 # 号，不太美观       | 无 # 号，更像真实URL          |
| 兼容性     | 支持所有浏览器，包括IE9 | 需要IE10+，现代浏览器完美支持 |
| 服务器配置 | 不需要特殊配置          | 需要配置支持，否则刷新404     |
| SEO 友好   | 相对较差                | 更好，搜索引擎可抓取          |
| 部署难度   | 简单，直接部署          | 需要服务器配置                |

## 四、上线部署的重要区别

### Hash 模式部署（简单）

```bash
# 1. 构建项目
npm run build

# 2. 直接将 dist 文件夹部署到任何静态服务器
# 不需要特殊配置！
```

- 为什么简单？

1. 服务器只需要提供静态文件
2. 所有路由都被 # 拦截，不会向服务器请求不存在的路径
3. 即使服务器没有配置，也能正常工作

### History 模式部署（需要配置）

- 问题： 直接刷新页面或输入URL会404

```text
用户访问: http://example.com/about
服务器查找: /about 文件 → 不存在！ → 返回404
```

- 解决方案： 配置服务器总是返回 index.html

- Nginx 配置

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 可选：缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

- Apache 配置

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

- Node.js Express 配置

```javascript
const express = require('express');
const history = require('connect-history-api-fallback');
const app = express();

// 使用中间件
app.use(history());

// 静态文件服务
app.use(express.static('dist'));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## 五、实际项目选择建议

- 选择 Hash 模式的情况

```javascript
// 适合以下场景：
const hashModeScenarios = [
  '简单的内部系统',
  '对SEO没有要求的应用',
  '静态站点托管（GitHub Pages、Netlify等）',
  '需要兼容老旧浏览器的项目',
  '快速原型开发',
];
```

- 选择 History 模式的情况

```javascript
// 适合以下场景：
const historyModeScenarios = [
  '面向公众的官方网站',
  '需要SEO优化的电商网站',
  '企业级应用，URL要求美观',
  '有专业运维团队的项目',
  '使用现代浏览器的应用',
];
```

## 六、完整配置示例

### Vue Router 完整配置

```javascript
// router/index.js
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@/views/User.vue'),
  },
  // 404 页面处理
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/404.vue'),
  },
];

// 根据环境变量选择模式
const isHashMode = process.env.VUE_APP_ROUTER_MODE === 'hash';

const router = createRouter({
  history: isHashMode ? createWebHashHistory() : createWebHistory(),
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
```

### 环境变量配置

```env
# .env.development - 开发环境使用 hash 模式
VUE_APP_ROUTER_MODE=hash

# .env.production - 生产环境使用 history 模式
VUE_APP_ROUTER_MODE=history
```

## 七、常见问题与解决方案

### 问题1：History 模式刷新404

- 解决方案： 如上所述配置服务器

### 问题2：静态资源路径错误

- 解决方案： 配置正确的 publicPath

```javascript
// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/your-project-name/' : '/',
};
```

### 问题3：CDN 部署

```javascript
// 对于CDN部署，可能需要base配置
const router = createRouter({
  history: createWebHistory('/your-sub-path/'),
  routes,
});
```

## 面试回答技巧

```text
"两种模式的主要区别在于URL表现形式和服务器配置要求：

Hash模式使用URL中的#号来管理路由，优点是：

兼容性好，支持所有浏览器

部署简单，不需要服务器特殊配置

不会因路由问题导致404错误

History模式使用正常的URL路径，优点是：

URL更美观，没有#号

对SEO更友好

更像传统多页面应用

关键区别在于部署：

Hash模式：直接部署静态文件即可

History模式：需要服务器配置，将所有路由指向index.html，否则刷新会404

选择建议：

内部系统、简单应用用Hash模式

公众网站、需要SEO的用History模式，但要确保服务器配置正确"

记住核心要点：
Hash简单但丑，History美观但要配置
```
