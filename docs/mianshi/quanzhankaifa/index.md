# Node.js & 小程序 & Electron 全栈开发面试题集

## 📑 快速导航目录

### 一、Node.js 核心基础

- [1. Node.js 的核心特性](#1-nodejs-的核心特性)
- [2. 事件循环机制](#2-事件循环机制)
- [3. 模块系统](#3-模块系统)
- [4. Buffer 与 Stream](#4-buffer-与-stream)
- [5. 文件系统操作](#5-文件系统操作)
- [6. 进程与线程](#6-进程与线程)
- [7. 错误处理机制](#7-错误处理机制)
- [8. 性能优化策略](#8-性能优化策略)
- [9. 内存管理](#9-内存管理)
- [10. 调试技巧](#10-调试技巧)

### 二、Koa 框架深度

- [11. Koa 的核心原理](#11-koa-的核心原理)
- [12. 中间件机制](#12-中间件机制)
- [13. 洋葱模型](#13-洋葱模型)
- [14. 路由设计](#14-路由设计)
- [15. 错误处理](#15-错误处理)
- [16. 参数验证](#16-参数验证)
- [17. 日志系统](#17-日志系统)
- [18. 认证授权](#18-认证授权)
- [19. 数据库集成](#19-数据库集成)
- [20. 性能优化](#20-性能优化)
- [21. 中间件开发](#21-中间件开发)
- [22. 文件上传](#22-文件上传)
- [23. WebSocket 支持](#23-websocket-支持)
- [24. API 设计最佳实践](#24-api-设计最佳实践)
- [25. 安全加固](#25-安全加固)

### 三、数据库与 ORM

- [26. MySQL 优化](#26-mysql-优化)
- [27. Redis 缓存](#27-redis-缓存)
- [28. MongoDB 应用](#28-mongodb-应用)
- [29. Sequelize ORM](#29-sequelize-orm)
- [30. Prisma ORM](#30-prisma-orm)
- [31. 数据库迁移](#31-数据库迁移)
- [32. 事务处理](#32-事务处理)
- [33. 连接池优化](#33-连接池优化)
- [34. 查询优化](#34-查询优化)
- [35. 数据同步策略](#35-数据同步策略)

### 四、微信小程序开发

- [36. 小程序架构原理](#36-小程序架构原理)
- [37. 双线程模型](#37-双线程模型)
- [38. 生命周期](#38-生命周期)
- [39. 组件系统](#39-组件系统)
- [40. 状态管理](#40-状态管理)
- [41. 网络请求](#41-网络请求)
- [42. 本地存储](#42-本地存储)
- [43. 页面路由](#43-页面路由)
- [44. 性能优化](#44-性能优化)
- [45. 分包加载](#45-分包加载)
- [46. 自定义组件](#46-自定义组件)
- [47. 小程序云开发](#47-小程序云开发)
- [48. 支付集成](#48-支付集成)
- [49. 登录授权](#49-登录授权)
- [50. 消息推送](#50-消息推送)
- [51. Canvas 绘图](#51-canvas-绘图)
- [52. 动画实现](#52-动画实现)
- [53. 兼容性处理](#53-兼容性处理)
- [54. 审核与发布](#54-审核与发布)
- [55. 数据分析](#55-数据分析)

### 五、Electron 桌面端开发

- [56. Electron 架构原理](#56-electron-架构原理)
- [57. 主进程与渲染进程](#57-主进程与渲染进程)
- [58. 进程间通信](#58-进程间通信)
- [59. 原生能力调用](#59-原生能力调用)
- [60. 窗口管理](#60-窗口管理)
- [61. 菜单定制](#61-菜单定制)
- [62. 系统托盘](#62-系统托盘)
- [63. 文件操作](#63-文件操作)
- [64. 自动更新](#64-自动更新)
- [65. 打包发布](#65-打包发布)
- [66. 性能优化](#66-性能优化)
- [67. 内存管理](#67-内存管理)
- [68. 安全加固](#68-安全加固)
- [69. 原生模块](#69-原生模块)
- [70. 调试技巧](#70-调试技巧)
- [71. 多平台适配](#71-多平台适配)
- [72. 系统集成](#72-系统集成)
- [73. 快捷键定制](#73-快捷键定制)
- [74. 剪贴板操作](#74-剪贴板操作)
- [75. 通知系统](#75-通知系统)

### 六、全链路协同

- [76. 前后端协作流程](#76-前后端协作流程)
- [77. API 设计规范](#77-api-设计规范)
- [78. 接口文档管理](#78-接口文档管理)
- [79. 联调效率提升](#79-联调效率提升)
- [80. Mock 服务](#80-mock-服务)
- [81. 跨端数据同步](#81-跨端数据同步)
- [82. 状态管理统一](#82-状态管理统一)
- [83. 错误监控体系](#83-错误监控体系)
- [84. 日志收集分析](#84-日志收集分析)
- [85. 性能监控方案](#85-性能监控方案)
- [86. 灰度发布策略](#86-灰度发布策略)
- [87. 版本管理](#87-版本管理)
- [88. 团队协作规范](#88-团队协作规范)
- [89. 项目管理工具](#89-项目管理工具)
- [90. 需求评审流程](#90-需求评审流程)

### 七、跨端开发方案

- [91. 跨端技术对比](#91-跨端技术对比)
- [92. uni-app 方案](#92-uni-app-方案)
- [93. Taro 方案](#93-taro-方案)
- [94. React Native](#94-react-native)
- [95. Flutter](#95-flutter)
- [96. 代码复用策略](#96-代码复用策略)
- [97. 差异化处理](#97-差异化处理)
- [98. 性能对比分析](#98-性能对比分析)
- [99. 选型依据](#99-选型依据)
- [100. 最佳实践](#100-最佳实践)

### 八、服务端架构设计

- [101. RESTful API 设计](#101-restful-api-设计)
- [102. GraphQL 应用](#102-graphql-应用)
- [103. 微服务架构](#103-微服务架构)
- [104. 消息队列](#104-消息队列)
- [105. 定时任务](#105-定时任务)
- [106. 文件服务](#106-文件服务)
- [107. 缓存策略](#107-缓存策略)
- [108. 负载均衡](#108-负载均衡)
- [109. 服务治理](#109-服务治理)
- [110. 容灾备份](#110-容灾备份)

### 九、安全与性能

- [111. XSS 防护](#111-xss-防护)
- [112. CSRF 防护](#112-csrf-防护)
- [113. SQL 注入防护](#113-sql-注入防护)
- [114. 数据加密](#114-数据加密)
- [115. JWT 认证](#115-jwt-认证)
- [116. OAuth 授权](#116-oauth-授权)
- [117. 接口限流](#117-接口限流)
- [118. 防重放攻击](#118-防重放攻击)
- [119. 性能基准测试](#119-性能基准测试)
- [120. 压力测试方案](#120-压力测试方案)

### 十、DevOps 与部署

- [121. Docker 容器化](#121-docker-容器化)
- [122. CI/CD 流程](#122-cicd-流程)
- [123. Nginx 配置](#123-nginx-配置)
- [124. PM2 进程管理](#124-pm2-进程管理)
- [125. 日志管理](#125-日志管理)
- [126. 监控告警](#126-监控告警)
- [127. 健康检查](#127-健康检查)
- [128. 灰度发布](#128-灰度发布)
- [129. 回滚策略](#129-回滚策略)
- [130. 环境管理](#130-环境管理)

### 十一、实战场景

- [131. 电商系统全栈](#131-电商系统全栈)
- [132. 医疗系统实践](#132-医疗系统实践)
- [133. 即时通讯应用](#133-即时通讯应用)
- [134. 文件管理系统](#134-文件管理系统)
- [135. 数据分析平台](#135-数据分析平台)
- [136. 桌面工具开发](#136-桌面工具开发)
- [137. 小程序矩阵](#137-小程序矩阵)
- [138. 多端同步方案](#138-多端同步方案)
- [139. 性能优化实战](#139-性能优化实战)
- [140. 问题排查案例](#140-问题排查案例)

### 十二、进阶提升

- [141. 源码阅读方法](#141-源码阅读方法)
- [142. 技术选型能力](#142-技术选型能力)
- [143. 架构设计思维](#143-架构设计思维)
- [144. 团队管理能力](#144-团队管理能力)
- [145. 技术创新实践](#145-技术创新实践)
- [146. 技术分享经验](#146-技术分享经验)
- [147. 开源贡献](#147-开源贡献)
- [148. 技术债务管理](#148-技术债务管理)
- [149. 代码重构策略](#149-代码重构策略)
- [150. 未来技术趋势](#150-未来技术趋势)

---

## 一、Node.js 核心基础

### 1. Node.js 的核心特性

**回答要点：**

- **事件驱动**：基于事件循环的异步模型
- **非阻塞 I/O**：高效的并发处理能力
- **单线程**：避免多线程切换开销
- **V8 引擎**：高性能 JavaScript 执行
- **丰富的生态**：npm 包管理系统

**适用场景：**

- I/O 密集型应用
- 实时应用（聊天、游戏）
- API 服务
- 工具链开发

### 2. 事件循环机制

**回答要点：**

**事件循环阶段：**

```
┌───────────────────────────┐
│         Timers            │  setTimeout, setInterval
├───────────────────────────┤
│    Pending Callbacks      │  系统操作回调
├───────────────────────────┤
│   Idle, Prepare           │  内部使用
├───────────────────────────┤
│         Poll              │  I/O 回调
├───────────────────────────┤
│        Check              │  setImmediate
├───────────────────────────┤
│  Close Callbacks          │  close 事件
└───────────────────────────┘
```

**执行顺序：**

```javascript
setTimeout(() => console.log('timeout'), 0)
setImmediate(() => console.log('immediate'))
Promise.resolve().then(() => console.log('promise'))

// 输出顺序：
// promise (微任务优先)
// timeout (timers 阶段)
// immediate (check 阶段)
```

### 3. 模块系统

**回答要点：**

**CommonJS：**

```javascript
// 导出
module.exports = { foo, bar }
exports.baz = baz

// 导入
const { foo, bar } = require('./module')
```

**ES Module：**

```javascript
// 导出
export { foo, bar }
export default baz

// 导入
import { foo, bar } from './module.js'
import baz from './module.js'
```

**模块缓存：**

```javascript
// 清除模块缓存
delete require.cache[require.resolve('./module')]
```

### 4. Buffer 与 Stream

**回答要点：**

**Buffer 操作：**

```javascript
// 创建 Buffer
const buf = Buffer.from('hello')
const buf2 = Buffer.alloc(10)

// Buffer 转换
buf.toString('utf8')
buf.toJSON()
```

**Stream 类型：**

- **Readable**：可读流
- **Writable**：可写流
- **Duplex**：双工流
- **Transform**：转换流

**Stream 管道：**

```javascript
const fs = require('fs')
const readStream = fs.createReadStream('input.txt')
const writeStream = fs.createWriteStream('output.txt')

readStream.pipe(writeStream)
```

### 5. 文件系统操作

**回答要点：**

**同步操作：**

```javascript
const fs = require('fs')
const data = fs.readFileSync('file.txt', 'utf8')
fs.writeFileSync('output.txt', data)
```

**异步操作：**

```javascript
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err
  console.log(data)
})

// Promise 方式
const fsPromises = require('fs').promises
const data = await fsPromises.readFile('file.txt', 'utf8')
```

**流式读取（大文件）：**

```javascript
const readStream = fs.createReadStream('large-file.txt', {
  highWaterMark: 64 * 1024, // 64KB
})

readStream.on('data', chunk => {
  process(chunk)
})
```

### 6. 进程与线程

**回答要点：**

**进程管理：**

```javascript
const { fork, spawn, exec } = require('child_process')

// fork Node.js 进程
const child = fork('child.js')
child.send({ message: 'hello' })
child.on('message', msg => {
  console.log(msg)
})

// 执行命令
exec('ls -la', (error, stdout, stderr) => {
  console.log(stdout)
})
```

**Cluster 多进程：**

```javascript
const cluster = require('cluster')
const os = require('os')

if (cluster.isMaster) {
  const cpuCount = os.cpus().length
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork()
  }
} else {
  // Worker 进程
  require('./app')
}
```

### 7. 错误处理机制

**回答要点：**

**错误类型：**

- **Error**：标准错误
- **TypeError**：类型错误
- **RangeError**：范围错误
- **SyntaxError**：语法错误

**全局错误捕获：**

```javascript
// 未捕获的异常
process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err)
  process.exit(1)
})

// 未处理的 Promise 拒绝
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason)
})
```

**AsyncLocalStorage：**

```javascript
const { AsyncLocalStorage } = require('async_hooks')
const asyncLocalStorage = new AsyncLocalStorage()

asyncLocalStorage.run({ requestId: '123' }, () => {
  // 在异步调用链中共享上下文
  const store = asyncLocalStorage.getStore()
  console.log(store.requestId)
})
```

### 8. 性能优化策略

**回答要点：**

**优化策略：**

1. **使用集群**：充分利用多核 CPU
2. **缓存优化**：Redis、内存缓存
3. **数据库优化**：索引、连接池
4. **压缩响应**：gzip、brotli
5. **静态资源**：CDN、缓存策略

**性能监控：**

```javascript
const { PerformanceObserver } = require('perf_hooks')

const observer = new PerformanceObserver(items => {
  items.getEntries().forEach(entry => {
    console.log(entry.name, entry.duration)
  })
})

observer.observe({ entryTypes: ['measure'] })
```

### 9. 内存管理

**回答要点：**

**内存泄漏排查：**

```bash
# 启动时开启堆快照
node --inspect app.js

# Chrome DevTools 查看内存
# Memory -> Heap Snapshot
```

**常见内存泄漏：**

1. 全局变量
2. 未清理的定时器
3. 闭包引用
4. 事件监听器未移除

**优化方案：**

```javascript
// 使用 WeakMap 避免强引用
const cache = new WeakMap()

// 及时清理
function cleanup() {
  timer && clearInterval(timer)
  listener && eventEmitter.removeListener('event', listener)
}
```

### 10. 调试技巧

**回答要点：**

**调试方法：**

```bash
# 启动调试
node --inspect app.js

# 断点调试
node --inspect-brk app.js

# 使用 ndb
npx ndb app.js
```

**日志调试：**

```javascript
// 使用 debug 模块
const debug = require('debug')('app:name');
debug('This is a debug message');

// 环境变量启用
DEBUG=app:* node app.js
```

---

## 二、Koa 框架深度

### 11. Koa 的核心原理

**回答要点：**

**核心特性：**

- **轻量级**：只有 ~600 行代码
- **中间件机制**：洋葱模型
- **异步流程**：async/await
- **无绑定**：不绑定任何中间件

**核心代码：**

```javascript
class Koa {
  constructor() {
    this.middleware = []
  }

  use(fn) {
    this.middleware.push(fn)
    return this
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    return server.listen(...args)
  }

  callback() {
    const fn = compose(this.middleware)
    return (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, fn)
    }
  }
}
```

### 12. 中间件机制

**回答要点：**

**中间件示例：**

```javascript
// 日志中间件
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 认证中间件
app.use(async (ctx, next) => {
  const token = ctx.headers.authorization
  if (!token) {
    ctx.status = 401
    return
  }
  await next()
})
```

### 13. 洋葱模型

**回答要点：**

**执行流程：**

```
Request
  ↓
Middleware 1 (before next)
  ↓
Middleware 2 (before next)
  ↓
Middleware 3 (before next)
  ↓
Route Handler
  ↓
Middleware 3 (after next)
  ↓
Middleware 2 (after next)
  ↓
Middleware 1 (after next)
  ↓
Response
```

**代码示例：**

```javascript
app.use(async (ctx, next) => {
  console.log('1. before')
  await next()
  console.log('1. after')
})

app.use(async (ctx, next) => {
  console.log('2. before')
  await next()
  console.log('2. after')
})

// 输出顺序：
// 1. before
// 2. before
// 2. after
// 1. after
```

### 14. 路由设计

**回答要点：**

**使用 koa-router：**

```javascript
const Router = require('koa-router')
const router = new Router()

router.get('/users', async ctx => {
  ctx.body = await User.findAll()
})

router.post('/users', async ctx => {
  const user = await User.create(ctx.request.body)
  ctx.status = 201
  ctx.body = user
})

router.get('/users/:id', async ctx => {
  const user = await User.findByPk(ctx.params.id)
  if (!user) {
    ctx.status = 404
    return
  }
  ctx.body = user
})

app.use(router.routes())
```

### 15. 错误处理

**回答要点：**

**全局错误处理：**

```javascript
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = {
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    }
    app.emit('error', err, ctx)
  }
})

app.on('error', (err, ctx) => {
  console.error('Server error:', err)
})
```

### 16. 参数验证

**回答要点：**

**使用 joi 验证：**

```javascript
const Joi = require('joi')

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

app.use(async (ctx, next) => {
  const { error } = userSchema.validate(ctx.request.body)
  if (error) {
    ctx.status = 400
    ctx.body = { error: error.details[0].message }
    return
  }
  await next()
})
```

### 17. 日志系统

**回答要点：**

**使用 koa-morgan：**

```javascript
const morgan = require('koa-morgan')

// 开发环境
app.use(morgan('dev'))

// 生产环境
app.use(
  morgan('combined', {
    stream: fs.createWriteStream('./access.log', { flags: 'a' }),
  })
)
```

**自定义日志：**

```javascript
const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
})

app.context.logger = logger
```

### 18. 认证授权

**回答要点：**

**JWT 认证：**

```javascript
const jwt = require('jsonwebtoken')

// 登录
router.post('/login', async ctx => {
  const { username, password } = ctx.request.body
  const user = await User.findOne({ username })

  if (!user || user.password !== password) {
    ctx.status = 401
    return
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })

  ctx.body = { token }
})

// 验证中间件
const auth = async (ctx, next) => {
  const token = ctx.headers.authorization?.split(' ')[1]
  if (!token) {
    ctx.status = 401
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    ctx.state.user = decoded
    await next()
  } catch (err) {
    ctx.status = 401
  }
}
```

### 19. 数据库集成

**回答要点：**

**Sequelize 集成：**

```javascript
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  database: 'mydb',
  username: 'root',
  password: 'password',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})

const User = sequelize.define('user', {
  username: { type: Sequelize.STRING, unique: true },
  email: { type: Sequelize.STRING, unique: true },
})

// 在 Koa 中使用
router.get('/users', async ctx => {
  const users = await User.findAll()
  ctx.body = users
})
```

### 20. 性能优化

**回答要点：**

**优化策略：**

```javascript
// 1. 响应压缩
const compress = require('koa-compress')
app.use(compress())

// 2. 缓存控制
app.use(async (ctx, next) => {
  await next()
  if (ctx.path.startsWith('/static')) {
    ctx.set('Cache-Control', 'public, max-age=31536000')
  }
})

// 3. 限流
const ratelimit = require('koa-ratelimit')
app.use(
  ratelimit({
    driver: 'redis',
    db: redisClient,
    duration: 60000,
    max: 100,
  })
)
```

---

## 三、微信小程序开发

### 36. 小程序架构原理

**回答要点：**

**双线程模型：**

```
┌─────────────┐    ┌─────────────┐
│  View 线程   │◄──►│  AppService  │
│  (渲染层)    │    │   线程       │
│             │    │  (逻辑层)    │
└─────────────┘    └─────────────┘
     ↓                    ↓
  WebView            JavaScriptCore
```

**通信机制：**

- 逻辑层 → 渲染层：setData
- 渲染层 → 逻辑层：事件回调

### 37. 双线程模型

**回答要点：**

**优势：**

- 管控更安全
- 性能更好
- 避免 DOM 操作

**限制：**

- 不能直接操作 DOM
- 不能使用浏览器 API
- setData 有性能开销

### 38. 生命周期

**回答要点：**

**应用生命周期：**

```javascript
App({
  onLaunch() {
    // 小程序初始化
  },
  onShow() {
    // 小程序显示
  },
  onHide() {
    // 小程序隐藏
  },
})
```

**页面生命周期：**

```javascript
Page({
  onLoad() {
    // 页面加载
  },
  onShow() {
    // 页面显示
  },
  onReady() {
    // 页面初次渲染完成
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面卸载
  },
})
```

### 39. 组件系统

**回答要点：**

**自定义组件：**

```javascript
// component.js
Component({
  properties: {
    title: String,
    count: {
      type: Number,
      value: 0,
    },
  },
  data: {
    internalData: 'xxx',
  },
  methods: {
    onTap() {
      this.triggerEvent('customevent', { data: 123 })
    },
  },
})
```

### 40. 状态管理

**回答要点：**

**使用 MobX：**

```javascript
import { observable, action } from 'mobx-miniprogram'

export const store = observable({
  count: 0,
  increment: action(function () {
    this.count++
  }),
})
```

### 44. 性能优化

**回答要点：**

**优化策略：**

1. **减少 setData 调用**
2. **避免频繁 setData**
3. **setData 数据量控制**
4. **分包加载**
5. **图片优化**
6. **避免过深的节点**

**优化示例：**

```javascript
// ❌ 频繁 setData
for (let i = 0; i < 100; i++) {
  this.setData({ count: i })
}

// ✅ 批量 setData
let count = 0
for (let i = 0; i < 100; i++) {
  count = i
}
this.setData({ count })
```

### 45. 分包加载

**回答要点：**

**配置分包：**

```json
{
  "subpackages": [
    {
      "root": "packageA",
      "pages": ["pages/cat", "pages/dog"]
    }
  ],
  "preloadRule": {
    "pages/index": {
      "network": "all",
      "packages": ["packageA"]
    }
  }
}
```

---

## 四、Electron 桌面端开发

### 56. Electron 架构原理

**回答要点：**

**架构组成：**

```
┌─────────────────────────────┐
│        Electron App         │
├────────────┬────────────────┤
│  主进程     │   渲染进程      │
│  (Node.js) │   (Chromium)   │
│            │                │
│  - 窗口管理 │  - UI 渲染     │
│  - 系统 API │  - 用户交互    │
│  - 文件操作 │  - 页面逻辑    │
└────────────┴────────────────┘
```

### 57. 主进程与渲染进程

**回答要点：**

**主进程：**

```javascript
// main.js
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadFile('index.html')
})
```

**渲染进程：**

```javascript
// renderer.js
const { ipcRenderer } = require('electron')

ipcRenderer.invoke('get-data').then(data => {
  console.log(data)
})
```

### 58. 进程间通信

**回答要点：**

**IPC 通信：**

```javascript
// 主进程
const { ipcMain } = require('electron')

ipcMain.handle('get-user-data', async (event, arg) => {
  return await getUserData(arg)
})

ipcMain.on('async-message', (event, arg) => {
  console.log(arg)
  event.reply('async-reply', 'response data')
})

// 渲染进程
const data = await ipcRenderer.invoke('get-user-data', { id: 1 })

ipcRenderer.send('async-message', 'hello')
ipcRenderer.on('async-reply', (event, arg) => {
  console.log(arg)
})
```

### 59. 原生能力调用

**回答要点：**

**Preload 脚本：**

```javascript
// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getUserData: id => ipcRenderer.invoke('get-user-data', id),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  platform: process.platform,
})
```

**渲染进程使用：**

```javascript
// renderer.js
const userData = await window.electronAPI.getUserData(1)
const file = await window.electronAPI.openFile()
```

### 64. 自动更新

**回答要点：**

**使用 electron-updater：**

```javascript
const { autoUpdater } = require('electron-updater')

autoUpdater.on('update-available', () => {
  console.log('Update available')
})

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.whenReady().then(() => {
  autoUpdater.checkForUpdates()
})
```

### 65. 打包发布

**回答要点：**

**使用 electron-builder：**

```json
{
  "build": {
    "appId": "com.example.app",
    "productName": "My App",
    "directories": {
      "output": "dist"
    },
    "win": {
      "target": ["nsis", "portable"]
    },
    "mac": {
      "target": ["dmg", "zip"]
    },
    "linux": {
      "target": ["AppImage", "deb"]
    }
  }
}
```

---

## 五、全链路协同

### 76. 前后端协作流程

**回答要点：**

**协作流程：**

```
需求评审
  ↓
API 设计（Swagger/Apifox）
  ↓
Mock 服务
  ↓
并行开发
  ↓
接口联调
  ↓
测试验证
  ↓
上线发布
```

### 77. API 设计规范

**回答要点：**

**RESTful 规范：**

```
GET    /api/users          # 获取用户列表
GET    /api/users/:id      # 获取单个用户
POST   /api/users          # 创建用户
PUT    /api/users/:id      # 更新用户
DELETE /api/users/:id      # 删除用户
```

**响应格式：**

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

### 78. 接口文档管理

**回答要点：**

**Swagger 文档：**

```javascript
const swaggerJSDoc = require('swagger-jsdoc')

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
  },
}

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: ['./routes/*.js'],
})
```

---

由于内容较多，完整的 150 道题目已保存至 Markdown 文件。
