# Qiankun 微前端架构高级面试题集

## 📑 快速导航目录

### 一、微前端基础概念

- [1. 什么是微前端？解决了什么问题？](#1-什么是微前端解决了什么问题)
- [2. 微前端架构的优势和劣势](#2-微前端架构的优势和劣势)
- [3. 主流微前端方案对比](#3-主流微前端方案对比)
- [4. 微前端 vs 微服务](#4-微前端-vs-微服务)
- [5. 什么时候不适合用微前端？](#5-什么时候不适合用微前端)
- [6. 微前端的核心设计原则](#6-微前端的核心设计原则)
- [7. 微前端的演进历史](#7-微前端的演进历史)
- [8. 微前端与单体应用的对比](#8-微前端与单体应用的对比)
- [9. 微前端的适用场景](#9-微前端的适用场景)
- [10. 微前端的技术选型依据](#10-微前端的技术选型依据)

### 二、Qiankun 核心原理

- [11. qiankun 的工作原理](#11-qiankun-的工作原理)
- [12. qiankun 的核心架构](#12-qiankun-的核心架构)
- [13. qiankun 的生命周期](#13-qiankun-的生命周期)
- [14. qiankun 的 JS 沙箱机制](#14-qiankun-的-js-沙箱机制)
- [15. qiankun 的 CSS 隔离方案](#15-qiankun-的-css-隔离方案)
- [16. qiankun 的资源预加载](#16-qiankun-的资源预加载)
- [17. qiankun 的路由劫持](#17-qiankun-的路由劫持)
- [18. qiankun 的依赖共享](#18-qiankun-的依赖共享)
- [19. qiankun 的通信机制](#19-qiankun-的通信机制)
- [20. qiankun vs single-spa](#20-qiankun-vs-single-spa)

### 三、JS 沙箱机制

- [21. 沙箱的作用和意义](#21-沙箱的作用和意义)
- [22. Legacy 沙箱实现原理](#22-legacy-沙箱实现原理)
- [23. Proxy 沙箱实现原理](#23-proxy-沙箱实现原理)
- [24. Snapshot 沙箱实现原理](#24-snapshot-沙箱实现原理)
- [25. 三种沙箱的对比](#25-三种沙箱的对比)
- [26. 沙箱的逃逸问题](#26-沙箱的逃逸问题)
- [27. 全局变量的隔离](#27-全局变量的隔离)
- [28. 定时器的沙箱处理](#28-定时器的沙箱处理)
- [29. 事件监听器的沙箱处理](#29-事件监听器的沙箱处理)
- [30. 自定义沙箱实现](#30-自定义沙箱实现)

### 四、CSS 隔离方案

- [31. CSS 隔离的必要性](#31-css-隔离的必要性)
- [32. Strict Style Isolation](#32-strict-style-isolation)
- [33. Experimental Style Isolation](#33-experimental-style-isolation)
- [34. Shadow DOM 方案](#34-shadow-dom-方案)
- [35. CSS Modules 方案](#35-css-modules-方案)
- [36. Scoped CSS 方案](#36-scoped-css-方案)
- [37. CSS 命名空间方案](#37-css-命名空间方案)
- [38. 动态样式表方案](#38-动态样式表方案)
- [39. 第三方库样式冲突](#39-第三方库样式冲突)
- [40. CSS 隔离性能对比](#40-css-隔离性能对比)

### 五、跨应用通信

- [41. qiankun 通信方案概述](#41-qiankun-通信方案概述)
- [42. initGlobalState 全局状态](#42-initglobalstate-全局状态)
- [43. Props 传递方案](#43-props-传递方案)
- [44. Custom Events 方案](#44-custom-events-方案)
- [45. URL 参数传递](#45-url-参数传递)
- [46. LocalStorage 方案](#46-localstorage-方案)
- [47. EventBus 实现](#47-eventbus-实现)
- [48. 发布订阅模式](#48-发布订阅模式)
- [49. 状态管理集成](#49-状态管理集成)
- [50. 跨应用路由跳转](#50-跨应用路由跳转)

### 六、子应用接入

- [51. 子应用接入流程](#51-子应用接入流程)
- [52. Vue 子应用配置](#52-vue-子应用配置)
- [53. React 子应用配置](#53-react-子应用配置)
- [54. Angular 子应用配置](#54-angular-子应用配置)
- [55. 纯 HTML 子应用](#55-纯-html-子应用)
- [56. 子应用独立运行](#56-子应用独立运行)
- [57. 子应用构建配置](#57-子应用构建配置)
- [58. 跨域问题处理](#58-跨域问题处理)
- [59. 资源路径问题](#59-资源路径问题)
- [60. 子应用性能优化](#60-子应用性能优化)

### 七、依赖共享

- [61. 依赖共享的必要性](#61-依赖共享的必要性)
- [62. Webpack externals 配置](#62-webpack--externals-配置)
- [63. 公共依赖提取](#63-公共依赖提取)
- [64. CDN 共享方案](#64-cdn-共享方案)
- [65. Module Federation](#65-module-federation)
- [66. 依赖版本管理](#66-依赖版本管理)
- [67. 运行时共享](#67-运行时共享)
- [68. 懒加载依赖](#68-懒加载依赖)
- [69. 依赖冲突解决](#69-依赖冲突解决)
- [70. 依赖预加载策略](#70-依赖预加载策略)

### 八、路由管理

- [71. 主应用路由设计](#71-主应用路由设计)
- [72. 子应用路由匹配](#72-子应用路由匹配)
- [73. 路由守卫设计](#73-路由守卫设计)
- [74. 权限路由控制](#74-权限路由控制)
- [75. 路由懒加载](#75-路由懒加载)
- [76. 路由同步问题](#76-路由同步问题)
- [77. 嵌套路由处理](#77-嵌套路由处理)
- [78. 路由参数传递](#78-路由参数传递)
- [79. 面包屑导航](#79-面包屑导航)
- [80. 路由错误处理](#80-路由错误处理)

### 九、性能优化

- [81. 首屏加载优化](#81-首屏加载优化)
- [82. 资源预加载策略](#82-资源预加载策略)
- [83. 子应用懒加载](#83-子应用懒加载)
- [84. 缓存策略设计](#84-缓存策略设计)
- [85. 打包优化方案](#85-打包优化方案)
- [86. 性能监控方案](#86-性能监控方案)
- [87. 内存泄漏排查](#87-内存泄漏排查)
- [88. 渲染性能优化](#88-渲染性能优化)
- [89. 网络请求优化](#89-网络请求优化)
- [90. 性能评估指标](#90-性能评估指标)

### 十、实战场景

- [91. 46 个子模块治理方案](#91-46-个子模块治理方案)
- [92. 医疗系统架构设计](#92-医疗系统架构设计)
- [93. 从 0 到 1 搭建流程](#93-从-0-到-1-搭建流程)
- [94. 团队协作规范](#94-团队协作规范)
- [95. 版本发布策略](#95-版本发布策略)
- [96. 灰度发布方案](#96-灰度发布方案)
- [97. 错误监控上报](#97-错误监控上报)
- [98. 日志收集方案](#98-日志收集方案)
- [99. 降级方案](#99-降级方案)
- [100. 迁移方案](#100-迁移方案)

### 十一、问题排查

- [101. 子应用加载失败](#101-子应用加载失败)
- [102. 样式冲突排查](#102-样式冲突排查)
- [103. JS 冲突排查](#103-js-冲突排查)
- [104. 内存泄漏排查](#104-内存泄漏排查)
- [105. 路由异常排查](#105-路由异常排查)
- [106. 通信异常排查](#106-通信异常排查)
- [107. 性能问题分析](#107-性能问题分析)
- [108. 白屏问题排查](#108-白屏问题排查)
- [109. 跨域问题排查](#109-跨域问题排查)
- [110. 热更新失效](#110-热更新失效)

### 十二、高级应用

- [111. 微前端 CI/CD](#111-微前端-cicd)
- [112. 微前端测试方案](#112-微前端测试方案)
- [113. 微前端安全方案](#113-微前端安全方案)
- [114. 微前端监控体系](#114-微前端监控体系)
- [115. 微前端文档体系](#115-微前端文档体系)
- [116. 微前端组件库](#116-微前端组件库)
- [117. 微前端国际化](#117-微前端国际化)
- [118. 微前端主题系统](#118-微前端主题系统)
- [119. 微前端插件系统](#119-微前端插件系统)
- [120. 微前端未来趋势](#120-微前端未来趋势)

---

## 一、微前端基础概念

### 1. 什么是微前端？解决了什么问题？

**回答要点：**

- **微前端**：将前端应用拆分成多个可以独立开发、独立部署、独立运行的小型应用
- **解决的问题**：
  1. **技术栈无关**：不同子应用可以使用不同框架
  2. **独立部署**：子应用可以独立发布，互不影响
  3. **增量升级**：可以逐步改造遗留系统
  4. **团队自治**：不同团队负责不同子应用
  5. **代码隔离**：避免全局污染和冲突

**类比后端微服务**：

```
微服务：将后端拆分成多个独立服务
微前端：将前端拆分成多个独立应用
```

### 2. 微前端架构的优势和劣势

**回答要点：**

| 优势       | 劣势         |
| ---------- | ------------ |
| 技术栈无关 | 复杂度增加   |
| 独立部署   | 性能开销     |
| 增量升级   | 调试困难     |
| 团队自治   | 依赖管理复杂 |
| 代码隔离   | 样式冲突处理 |
| 渐进式迁移 | 通信成本高   |

**适用场景**：

- 大型项目，多个团队协作
- 遗留系统改造
- 需要快速迭代
- 技术栈不统一

**不适用场景**：

- 小型项目
- 单一团队
- 性能要求极高
- 强依赖场景

### 3. 主流微前端方案对比

**回答要点：**

| 方案           | 特点                | 优势             | 劣势                 |
| -------------- | ------------------- | ---------------- | -------------------- |
| **qiankun**    | 基于 single-spa     | 功能完善、生态好 | 侵入性较强           |
| **MicroApp**   | 类 WebComponent     | 简单易用         | 功能较少             |
| **Wujie**      | iframe + shadow DOM | 隔离性好         | 兼容性差             |
| **iframe**     | 原生方案            | 隔离性最好       | 体验差               |
| **single-spa** | 底层框架            | 灵活             | 需要自己实现很多功能 |

**选择建议**：

- 生产环境推荐 qiankun
- 简单场景用 MicroApp
- 强隔离用 Wujie
- 自定义需求用 single-spa

### 4. 微前端 vs 微服务

**回答要点：**

| 对比项   | 微前端     | 微服务     |
| -------- | ---------- | ---------- |
| 层级     | 前端展示层 | 后端业务层 |
| 拆分维度 | UI 模块    | 业务能力   |
| 通信方式 | 事件、状态 | HTTP、RPC  |
| 部署     | 独立部署   | 独立部署   |
| 技术栈   | 可不同     | 可不同     |
| 目标     | 解耦前端   | 解耦后端   |

**共同点**：

- 独立开发、部署
- 技术栈无关
- 团队自治
- 渐进式演进

### 5. 什么时候不适合用微前端？

**回答要点：**

**不适合的场景**：

1. **小型项目**：团队小、模块少，单体应用更简单
2. **性能敏感**：微前端有额外性能开销
3. **强依赖**：模块间高度耦合，拆分困难
4. **单一团队**：一个团队维护，不需要独立部署
5. **SEO 要求高**：SSR 场景下微前端复杂度高

**判断标准**：

- 团队数量 > 3 个
- 代码量 > 50 万行
- 需要独立部署
- 技术栈不统一
- 遗留系统改造

### 6. 微前端的核心设计原则

**回答要点：**

1. **技术栈无关**：不限制子应用技术栈
2. **独立运行**：子应用可独立开发、部署
3. **隔离性**：JS、CSS 隔离，避免冲突
4. **通信机制**：完善的跨应用通信
5. **渐进式**：支持增量迁移
6. **性能优化**：预加载、懒加载
7. **可观测性**：监控、日志、错误追踪

### 7. 微前端的演进历史

**回答要点：**

**阶段1：单体应用**

- 所有代码在一个仓库
- 统一部署
- 问题：耦合严重、部署慢

**阶段2：iframe 方案**

- 使用 iframe 隔离
- 问题：体验差、通信困难

**阶段3：single-spa**

- 首个微前端框架
- 问题：需要自己实现很多功能

**阶段4：qiankun**

- 基于 single-spa 封装
- 完善的沙箱、隔离、通信
- 生产可用

**阶段5：Module Federation**

- Webpack 5 原生支持
- 更灵活的依赖共享

### 8. 微前端与单体应用的对比

**回答要点：**

| 对比项   | 单体应用 | 微前端   |
| -------- | -------- | -------- |
| 代码组织 | 单一仓库 | 多仓库   |
| 部署     | 整体部署 | 独立部署 |
| 技术栈   | 统一     | 可不同   |
| 团队     | 单一团队 | 多团队   |
| 构建     | 一次构建 | 多次构建 |
| 性能     | 较优     | 有开销   |
| 复杂度   | 低       | 高       |
| 维护     | 简单     | 复杂     |

### 9. 微前端的适用场景

**回答要点：**

**适用场景**：

1. **大型项目**：多个团队协作开发
2. **遗留系统**：需要渐进式改造
3. **技术栈迁移**：从老框架迁移到新框架
4. **多产品整合**：整合多个独立产品
5. **快速迭代**：需要频繁独立发布

**典型案例**：

- 医疗系统：46 个子模块
- 电商后台：订单、商品、用户
- 云平台：计算、存储、网络
- 管理系统：不同业务线

### 10. 微前端的技术选型依据

**回答要点：**

**选型维度**：

1. **团队规模**：决定是否需要微前端
2. **项目规模**：代码量、模块数
3. **技术栈**：是否需要多技术栈支持
4. **性能要求**：对首屏、交互的要求
5. **部署方式**：是否需要独立部署
6. **维护成本**：长期维护成本
7. **生态成熟度**：社区活跃度、文档

**推荐方案**：

- 生产环境：qiankun
- 简单场景：MicroApp
- 强隔离：Wujie
- 自定义：single-spa

---

## 二、Qiankun 核心原理

### 11. qiankun 的工作原理

**回答要点：**

**核心流程**：

1. **注册子应用**：配置子应用的 entry、container、activeRule
2. **路由匹配**：监听路由变化，匹配 activeRule
3. **加载资源**： fetch 子应用的 HTML
4. **解析资源**：提取 JS、CSS
5. **创建沙箱**：为子应用创建独立的执行环境
6. **执行 JS**：在沙箱中执行子应用代码
7. **渲染 DOM**：将子应用渲染到指定 container
8. **卸载清理**：路由切换时卸载子应用，清理资源

### 12. qiankun 的核心架构

**回答要点：**

```
┌─────────────────────────────────┐
│          主应用 (Main App)       │
├─────────────────────────────────┤
│  ┌───────────┐  ┌───────────┐  │
│  │ Router    │  │  State    │  │
│  │ Manager   │  │ Manager   │  │
│  └───────────┘  └───────────┘  │
├─────────────────────────────────┤
│      qiankun Core (核心层)       │
├─────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────────┐│
│  │Loader│ │Sandbox│ │Isolation ││
│  └──────┘ └──────┘ └──────────┘│
├─────────────────────────────────┤
│         子应用 (Micro Apps)      │
│  ┌─────┐ ┌─────┐ ┌─────┐      │
│  │App1 │ │App2 │ │App3 │ ...  │
│  └─────┘ └─────┘ └─────┘      │
└─────────────────────────────────┘
```

### 13. qiankun 的生命周期

**回答要点：**

**子应用生命周期**：

```typescript
// 子应用必须导出三个生命周期函数
export async function bootstrap() {
  // 只会执行一次，用于初始化
}

export async function mount(props) {
  // 每次进入时执行，用于渲染
  render(props)
}

export async function unmount() {
  // 每次离开时执行，用于清理
  instance.$destroy()
}
```

**执行时机**：

1. **bootstrap**：首次加载时执行一次
2. **mount**：每次路由进入时执行
3. **unmount**：每次路由离开时执行

### 14. qiankun 的 JS 沙箱机制

**回答要点：**

**三种沙箱**：

1. **Legacy 沙箱**：基于 Proxy，适用于单实例
2. **Proxy 沙箱**：基于 Proxy，适用于多实例
3. **Snapshot 沙箱**：基于快照，适用于不支持 Proxy 的浏览器

**核心原理**：

```typescript
// Proxy 沙箱简化版
class ProxySandbox {
  private proxy: WindowProxy
  private rawWindow: Window

  constructor() {
    this.rawWindow = window
    const fakeWindow = Object.create(null)

    this.proxy = new Proxy(fakeWindow, {
      set: (target, key, value) => {
        target[key] = value
        return true
      },
      get: (target, key) => {
        return target[key] || this.rawWindow[key]
      },
    })
  }

  active() {
    // 激活沙箱
  }

  inactive() {
    // 关闭沙箱
  }
}
```

### 15. qiankun 的 CSS 隔离方案

**回答要点：**

**两种隔离方式**：

1. **Strict Style Isolation**：
   - 使用 Shadow DOM
   - 完全隔离
   - 可能有兼容性问题

2. **Experimental Style Isolation**：
   - 运行时动态处理
   - 给样式添加前缀
   - 兼容性更好

**配置方式**：

```typescript
start({
  sandbox: {
    strictStyleIsolation: true, // Shadow DOM
    experimentalStyleIsolation: true, // 动态前缀
  },
})
```

### 16. qiankun 的资源预加载

**回答要点：**

**预加载策略**：

```typescript
start({
  prefetch: 'all', // 全部预加载
})

// 或者按需预加载
start({
  prefetch: apps => {
    // 只预加载即将访问的应用
    return apps.filter(app => app.name === 'app1')
  },
})
```

**预加载时机**：

1. **空闲时**：使用 requestIdleCallback
2. **路由变化时**：匹配到 activeRule
3. **手动触发**：用户鼠标悬停

### 17. qiankun 的路由劫持

**回答要点：**

**劫持方式**：

```typescript
// 劫持 pushState
const rawPushState = window.history.pushState
window.history.pushState = function () {
  rawPushState.apply(this, arguments)
  // 通知 qiankun 路由变化
  triggerRouteChange()
}

// 劫持 replaceState
const rawReplaceState = window.history.replaceState
window.history.replaceState = function () {
  rawReplaceState.apply(this, arguments)
  triggerRouteChange()
}

// 监听 popstate
window.addEventListener('popstate', () => {
  triggerRouteChange()
})
```

### 18. qiankun 的依赖共享

**回答要点：**

**共享方案**：

1. **Webpack externals**：

   ```javascript
   // 主应用配置
   externals: {
     vue: 'Vue',
     'vue-router': 'VueRouter'
   }

   // 子应用配置
   externals: {
     vue: 'Vue',
     'vue-router': 'VueRouter'
   }
   ```

2. **Module Federation**：

   ```javascript
   new ModuleFederationPlugin({
     name: 'app1',
     shared: ['vue', 'element-ui'],
   })
   ```

3. **CDN 共享**：
   ```html
   <script src="https://cdn/vue.min.js"></script>
   ```

### 19. qiankun 的通信机制

**回答要点：**

**通信方案**：

1. **全局状态**：

   ```typescript
   import { initGlobalState } from 'qiankun'

   const actions = initGlobalState({ user: {} })
   actions.onGlobalStateChange(state => {
     console.log(state)
   })
   actions.setGlobalState({ user: { name: 'Tom' } })
   ```

2. **Props 传递**：

   ```typescript
   registerMicroApps([
     {
       name: 'app1',
       props: { user: userInfo },
     },
   ])
   ```

3. **Custom Events**：

   ```typescript
   // 发送
   window.dispatchEvent(new CustomEvent('event-name', { detail: data }))

   // 接收
   window.addEventListener('event-name', e => {
     console.log(e.detail)
   })
   ```

### 20. qiankun vs single-spa

**回答要点：**

| 对比项   | qiankun | single-spa    |
| -------- | ------- | ------------- |
| 上手难度 | 低      | 高            |
| JS 沙箱  | ✅ 内置 | ❌ 需自己实现 |
| CSS 隔离 | ✅ 内置 | ❌ 需自己实现 |
| 资源加载 | ✅ 内置 | ❌ 需自己实现 |
| 预加载   | ✅ 内置 | ❌ 需自己实现 |
| 通信机制 | ✅ 内置 | ❌ 需自己实现 |
| 灵活性   | 中      | 高            |
| 生产可用 | ✅      | 需要大量封装  |

---

## 三、JS 沙箱机制

### 21. 沙箱的作用和意义

**回答要点：**

- **隔离全局变量**：避免子应用污染全局
- **独立运行环境**：每个子应用有独立的 window
- **状态管理**：子应用切换时保持各自状态
- **安全性**：防止恶意代码访问全局资源

### 22. Legacy 沙箱实现原理

**回答要点：**

```typescript
class LegacySandbox {
  private sandboxRunning = false
  private proxy: WindowProxy

  constructor() {
    const rawWindow = window
    const fakeWindow = Object.create(null)

    this.proxy = new Proxy(fakeWindow, {
      set: (target, key, value) => {
        if (this.sandboxRunning) {
          target[key] = value
        } else {
          rawWindow[key] = value
        }
        return true
      },
      get: (target, key) => {
        return target[key] || rawWindow[key]
      },
    })
  }

  active() {
    this.sandboxRunning = true
  }

  inactive() {
    this.sandboxRunning = false
  }
}
```

**特点**：

- 适用于单实例场景
- 切换时会影响全局 window
- 性能较好

### 23. Proxy 沙箱实现原理

**回答要点：**

```typescript
class ProxySandbox {
  private proxy: WindowProxy
  private rawWindow: Window
  private fakeWindow: Object

  constructor() {
    this.rawWindow = window
    this.fakeWindow = Object.create(null)

    this.proxy = new Proxy(this.fakeWindow, {
      set: (target, key, value) => {
        target[key] = value
        return true
      },
      get: (target, key) => {
        return key in target ? target[key] : this.rawWindow[key]
      },
      has: (target, key) => {
        return key in target || key in this.rawWindow
      },
    })
  }

  active() {
    // 激活沙箱，切换 window
  }

  inactive() {
    // 关闭沙箱，恢复 window
  }
}
```

**特点**：

- 适用于多实例场景
- 完全隔离，不影响全局
- 性能略低于 Legacy

### 24. Snapshot 沙箱实现原理

**回答要点：**

```typescript
class SnapshotSandbox {
  private windowSnapshot: Window
  private modifyPropsMap: Map<any, any>

  constructor() {
    this.windowSnapshot = {} as Window
    this.modifyPropsMap = new Map()
  }

  active() {
    // 记录当前 window 状态
    this.windowSnapshot = { ...window }
    this.modifyPropsMap.clear()
  }

  inactive() {
    // 恢复 window 状态
    Object.keys(window).forEach(key => {
      const value = window[key]
      if (this.windowSnapshot[key] !== value) {
        this.modifyPropsMap.set(key, value)
        window[key] = this.windowSnapshot[key]
      }
    })

    // 恢复修改的属性
    this.modifyPropsMap.forEach((value, key) => {
      window[key] = value
    })
  }
}
```

**特点**：

- 兼容不支持 Proxy 的浏览器
- 性能较差
- 作为降级方案

### 25. 三种沙箱的对比

**回答要点：**

| 沙箱类型 | 适用场景 | 性能 | 隔离性 | 兼容性 |
| -------- | -------- | ---- | ------ | ------ |
| Legacy   | 单实例   | 高   | 中     | 好     |
| Proxy    | 多实例   | 中   | 高     | 好     |
| Snapshot | 降级方案 | 低   | 中     | 最好   |

**选择策略**：

- 默认使用 Proxy 沙箱
- 单实例可用 Legacy
- 不支持 Proxy 时用 Snapshot

### 26. 沙箱的逃逸问题

**回答要点：**

**逃逸场景**：

```javascript
// 1. 通过 this 逃逸
;(function () {
  this.document // 访问真实 document
})()

// 2. 通过原型链逃逸
Object.prototype.constructor

// 3. 通过 eval 逃逸
eval('window.location')

// 4. 通过 Function 逃逸
new Function('return window')()
```

**解决方案**：

- 禁用 eval、Function
- 拦截 this 指向
- 限制原型链访问

### 27. 全局变量的隔离

**回答要点：**

**隔离策略**：

```typescript
// 白名单：允许访问的全局变量
const whiteList = ['window', 'document', 'location', 'navigator', 'console']

// 黑名单：禁止访问的全局变量
const blackList = ['eval', 'Function', 'alert', 'confirm']

// 沙箱中处理
get: (target, key) => {
  if (blackList.includes(key)) {
    return undefined
  }
  if (whiteList.includes(key)) {
    return window[key]
  }
  return target[key] || window[key]
}
```

### 28. 定时器的沙箱处理

**回答要点：**

**处理方案**：

```typescript
class SandboxTimer {
  private timers: Set<number> = new Set()

  setTimeout(fn: Function, delay: number) {
    const id = window.setTimeout(() => {
      fn()
      this.timers.delete(id)
    }, delay)
    this.timers.add(id)
    return id
  }

  clearTimeout(id: number) {
    window.clearTimeout(id)
    this.timers.delete(id)
  }

  clearAll() {
    this.timers.forEach(id => {
      window.clearTimeout(id)
    })
    this.timers.clear()
  }
}
```

**卸载时清理**：

```typescript
unmount() {
  timer.clearAll(); // 清理所有定时器
}
```

### 29. 事件监听器的沙箱处理

**回答要点：**

**处理方案**：

```typescript
class SandboxEvent {
  private listeners: Map<string, Function[]> = new Map()

  addEventListener(event: string, fn: Function) {
    window.addEventListener(event, fn)
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(fn)
  }

  removeEventListener(event: string, fn: Function) {
    window.removeEventListener(event, fn)
    const fns = this.listeners.get(event)
    if (fns) {
      const index = fns.indexOf(fn)
      if (index > -1) fns.splice(index, 1)
    }
  }

  removeAll() {
    this.listeners.forEach((fns, event) => {
      fns.forEach(fn => {
        window.removeEventListener(event, fn)
      })
    })
    this.listeners.clear()
  }
}
```

### 30. 自定义沙箱实现

**回答要点：**

```typescript
class CustomSandbox {
  private sandbox: WindowProxy
  private cleanupFns: Function[] = []

  constructor() {
    const fakeWindow = Object.create(window)

    this.sandbox = new Proxy(fakeWindow, {
      set: (target, key, value) => {
        target[key] = value
        this.cleanupFns.push(() => delete target[key])
        return true
      },
      get: (target, key) => {
        return target[key] || window[key]
      },
    })
  }

  execute(code: string) {
    // 在沙箱中执行代码
    const fn = new Function('window', code)
    fn(this.sandbox)
  }

  destroy() {
    // 清理所有副作用
    this.cleanupFns.forEach(fn => fn())
    this.cleanupFns = []
  }
}
```

---

由于内容较多（140+ 题），我将继续生成完整文档。让我先生成 HTML 版本，然后补充完整的 Markdown 版本。
