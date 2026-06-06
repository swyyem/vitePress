# 单点登录、单设备登录与事件控制面试题集

## 📑 快速导航目录

### 一、单点登录（SSO）基础

- [1. SSO 核心概念](#1-sso-核心概念)
- [2. SSO 优势与场景](#2-sso-优势与场景)
- [3. CAS 协议原理](#3-cas-协议原理)
- [4. SAML 协议](#4-saml-协议)
- [5. OAuth2.0 与 SSO](#5-oauth20-与-sso)
- [6. OIDC 协议](#6-oidc-协议)
- [7. SSO 架构设计](#7-sso-架构设计)
- [8. Ticket 机制](#8-ticket-机制)
- [9. 跨域认证](#9-跨域认证)
- [10. SSO 安全性](#10-sso-安全性)

### 二、单点登录实现

- [11. CAS Server 实现](#11-cas-server-实现)
- [12. CAS Client 实现](#12-cas-client-实现)
- [13. Ticket 验证流程](#13-ticket-验证流程)
- [14. 会话管理](#14-会话管理)
- [15. 单点登出](#15-单点登出)
- [16. 跨应用会话同步](#16-跨应用会话同步)
- [17. Token 传递](#17-token-传递)
- [18. 性能优化](#18-性能优化)
- [19. 故障处理](#19-故障处理)
- [20. 监控告警](#20-监控告警)

### 三、单设备登录

- [21. 单设备登录概念](#21-单设备登录概念)
- [22. 实现方案对比](#22-实现方案对比)
- [23. Token 独占模式](#23-token-独占模式)
- [24. 会话管理模式](#24-会话管理模式)
- [25. 设备指纹识别](#25-设备指纹识别)
- [26. 踢人下线机制](#26-踢人下线机制)
- [27. 并发控制](#27-并发控制)
- [28. 多端通知](#28-多端通知)
- [29. 状态同步](#29-状态同步)
- [30. 用户体验优化](#30-用户体验优化)

### 四、SSO + 单设备混合方案

- [31. 混合架构设计](#31-混合架构设计)
- [32. 认证流程](#32-认证流程)
- [33. 设备冲突处理](#33-设备冲突处理)
- [34. 会话优先级](#34-会话优先级)
- [35. 安全策略](#35-安全策略)
- [36. 性能优化](#36-性能优化)
- [37. 容灾方案](#37-容灾方案)
- [38. 审计日志](#38-审计日志)
- [39. 测试策略](#39-测试策略)
- [40. 最佳实践](#40-最佳实践)

### 五、事件暂停与继续基础

- [41. 事件控制概念](#41-事件控制概念)
- [42. 暂停与继续场景](#42-暂停与继续场景)
- [43. Event Loop 机制](#43-event-loop-机制)
- [44. 异步任务控制](#44-异步任务控制)
- [45. Promise 控制](#45-promise-控制)
- [46. Generator 暂停](#46-generator-暂停)
- [47. Async/Await 控制](#47-asyncawait-控制)
- [48. 状态机设计](#48-状态机设计)
- [49. 事件队列管理](#49-事件队列管理)
- [50. 性能影响](#50-性能影响)

### 六、事件暂停实现

- [51. Promise 暂停实现](#51-promise-暂停实现)
- [52. 异步操作暂停](#52-异步操作暂停)
- [53. 定时器控制](#53-定时器控制)
- [54. 请求中断](#54-请求中断)
- [55. WebSocket 暂停](#55-websocket-暂停)
- [56. 视频/音频暂停](#56-视频音频暂停)
- [57. 动画暂停](#57-动画暂停)
- [58. 滚动暂停](#58-滚动暂停)
- [59. 表单提交暂停](#59-表单提交暂停)
- [60. 数据流暂停](#60-数据流暂停)

### 七、事件继续实现

- [61. Promise 继续实现](#61-promise-继续实现)
- [62. 异步操作恢复](#62-异步操作恢复)
- [63. 状态恢复](#63-状态恢复)
- [64. 数据一致性](#64-数据一致性)
- [65. 资源重新分配](#65-资源重新分配)
- [66. 队列重建](#66-队列重建)
- [67. 错误恢复](#67-错误恢复)
- [68. 超时处理](#68-超时处理)
- [69. 并发恢复](#69-并发恢复)
- [70. 性能优化](#70-性能优化)

### 八、医疗场景应用

- [71. 处方流转暂停](#71-处方流转暂停)
- [72. 检验流程控制](#72-检验流程控制)
- [73. 缴费中断恢复](#73-缴费中断恢复)
- [74. 会诊流程控制](#74-会诊流程控制)
- [75. 数据传输暂停](#75-数据传输暂停)
- [76. 实时同步控制](#76-实时同步控制)
- [77. 离线缓存机制](#77-离线缓存机制)
- [78. 断点续传](#78-断点续传)
- [79. 状态持久化](#79-状态持久化)
- [80. 容错处理](#80-容错处理)

### 九、实战案例

- [81. SSO 实施案例](#81-sso-实施案例)
- [82. 单设备登录案例](#82-单设备登录案例)
- [83. 踢人下线案例](#83-踢人下线案例)
- [84. 事件暂停案例](#84-事件暂停案例)
- [85. 流程控制案例](#85-流程控制案例)
- [86. 性能优化案例](#86-性能优化案例)
- [87. 故障排查案例](#87-故障排查案例)
- [88. 安全加固案例](#88-安全加固案例)
- [89. 监控体系建设](#89-监控体系建设)
- [90. 团队协作案例](#90-团队协作案例)

### 十、进阶提升

- [91. 架构设计思维](#91-架构设计思维)
- [92. 安全设计能力](#92-安全设计能力)
- [93. 性能优化能力](#93-性能优化能力)
- [94. 问题排查能力](#94-问题排查能力)
- [95. 团队规范建设](#95-团队规范建设)
- [96. 最佳实践总结](#96-最佳实践总结)
- [97. 技术创新能力](#97-技术创新能力)
- [98. 行业趋势](#98-行业趋势)
- [99. 未来展望](#99-未来展望)
- [100. 面试技巧](#100-面试技巧)

---

## 一、单点登录（SSO）基础

### 1. SSO 核心概念

**回答要点：**

**核心定义：**

- SSO (Single Sign-On) 单点登录
- 用户只需登录一次，就可以访问多个相互信任的应用系统
- 一次认证，多处访问

**核心价值：**

```
✅ 提升用户体验：避免重复登录
✅ 降低管理成本：统一认证管理
✅ 增强安全性：集中安全策略
✅ 便于审计：统一日志记录
```

### 3. CAS 协议原理

**回答要点：**

**核心概念：**

- CAS (Central Authentication Service) 集中式认证服务
- 由耶鲁大学开发的开源 SSO 协议

**认证流程：**

```
1. 用户访问应用 A
   ↓
2. 应用 A 检查登录状态（未登录）
   ↓
3. 重定向到 CAS Server，附带 service 参数
   ↓
4. 用户输入用户名密码登录
   ↓
5. CAS Server 验证身份，生成 TGT (Ticket Granting Ticket)
   ↓
6. CAS Server 生成 ST (Service Ticket)，重定向回应用 A
   ↓
7. 应用 A 拿着 ST 向 CAS Server 验证
   ↓
8. CAS Server 验证 ST，返回用户信息
   ↓
9. 应用 A 创建本地会话

访问应用 B 时：
- 重定向到 CAS Server
- CAS Server 检查 TGT（已登录）
- 直接生成 ST，返回应用 B
- 无需再次输入密码（单点登录）
```

---

## 二、单点登录实现

### 11. CAS Server 实现

**回答要点：**

**核心实现：**

```typescript
class CAServer {
  // 存储 TGT
  private tgtStore: Map<string, TGT> = new Map()

  // 存储 ST
  private stStore: Map<string, ST> = new Map()

  // 1. 用户登录
  async login(username: string, password: string, service: string): Promise<string> {
    // 验证用户名密码
    const user = await this.authenticateUser(username, password)

    if (!user) {
      throw new Error('Authentication failed')
    }

    // 生成 TGT
    const tgtId = this.generateTGT()
    const tgt = {
      id: tgtId,
      user,
      createdAt: Date.now(),
      services: new Set(),
    }
    this.tgtStore.set(tgtId, tgt)

    // 生成 ST
    const stId = this.generateST()
    const st = {
      id: stId,
      tgtId,
      service,
      createdAt: Date.now(),
      used: false,
    }
    this.stStore.set(stId, st)

    // 记录服务
    tgt.services.add(service)

    return stId // 返回 ST 给客户端
  }

  // 2. 验证 ST
  async validateST(stId: string, service: string): Promise<User | null> {
    const st = this.stStore.get(stId)

    if (!st) {
      return null // ST 不存在
    }

    if (st.used) {
      return null // ST 已被使用（防重放）
    }

    if (st.service !== service) {
      return null // 服务不匹配
    }

    // 标记 ST 已使用
    st.used = true

    // 获取用户信息
    const tgt = this.tgtStore.get(st.tgtId)
    if (!tgt) {
      return null
    }

    return tgt.user
  }

  // 3. 单点登出
  async logout(tgtId: string): Promise<void> {
    const tgt = this.tgtStore.get(tgtId)

    if (tgt) {
      // 通知所有已登录的服务
      for (const service of tgt.services) {
        await this.notifyServiceLogout(service, tgt.user.id)
      }

      // 清除 TGT
      this.tgtStore.delete(tgtId)
    }
  }
}
```

### 12. CAS Client 实现

**回答要点：**

**客户端实现：**

```typescript
class CASClient {
  private casServerUrl: string
  private serviceUrl: string

  constructor(config: CASConfig) {
    this.casServerUrl = config.casServerUrl
    this.serviceUrl = config.serviceUrl
  }

  // 检查登录状态
  async checkLogin(): Promise<boolean> {
    const ticket = this.getUrlParam('ticket')

    if (!ticket) {
      // 未登录，重定向到 CAS
      this.redirectToCAS()
      return false
    }

    // 验证 Ticket
    try {
      const user = await this.validateTicket(ticket)

      if (user) {
        this.setLocalSession(user)
        // 清除 URL 中的 ticket 参数
        this.clearTicketParam()
        return true
      }
    } catch (error) {
      console.error('Ticket validation failed:', error)
      this.redirectToCAS()
    }

    return false
  }

  // 重定向到 CAS Server
  private redirectToCAS() {
    const loginUrl = `${this.casServerUrl}/login?service=${encodeURIComponent(this.serviceUrl)}`
    window.location.href = loginUrl
  }

  // 验证 Ticket（后端验证）
  private async validateTicket(ticket: string): Promise<User | null> {
    // 应该在后端验证，避免暴露 CAS Server
    const response = await fetch('/api/cas/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticket, service: this.serviceUrl }),
    })

    const result = await response.json()
    return result.success ? result.user : null
  }

  // 设置本地会话
  private setLocalSession(user: User) {
    // 创建本地 session 或 token
    const token = this.generateLocalToken(user)
    localStorage.setItem('access_token', token)
    localStorage.setItem('user_info', JSON.stringify(user))
  }

  // 登出
  logout() {
    // 清除本地会话
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_info')

    // 重定向到 CAS Server 登出
    const logoutUrl = `${this.casServerUrl}/logout?service=${encodeURIComponent(this.serviceUrl)}`
    window.location.href = logoutUrl
  }
}
```

### 15. 单点登出

**回答要点：**

**实现方案：**

```typescript
class SingleSignOut {
  // CAS Server 发起登出通知
  async notifyAllServices(tgtId: string): Promise<void> {
    const tgt = this.tgtStore.get(tgtId)

    if (!tgt) return

    // 并发通知所有服务
    const logoutPromises = Array.from(tgt.services).map(async service => {
      try {
        await fetch(`${service}/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: tgt.user.id,
            tgtId,
          }),
        })
      } catch (error) {
        console.error(`Logout notification failed for ${service}:`, error)
      }
    })

    // 等待所有通知完成（容错）
    await Promise.allSettled(logoutPromises)

    // 清除 TGT
    this.tgtStore.delete(tgtId)
  }
}

// 应用端接收登出通知
router.post('/logout', async (req, res) => {
  const { userId, tgtId } = req.body

  // 清除本地会话
  await SessionService.destroyUserSessions(userId)

  // 通过 WebSocket 通知前端
  WebSocketServer.to(userId).emit('force_logout', {
    reason: 'SINGLE_SIGN_OUT',
    timestamp: Date.now(),
  })

  res.sendStatus(200)
})
```

---

## 三、单设备登录

### 21. 单设备登录概念

**回答要点：**

**核心定义：**

- 同一账号只能在一个设备上保持登录状态
- 新设备登录会踢出旧设备
- 保证账号安全性

**核心价值：**

```
✅ 安全性高：防止账号共享
✅ 保护隐私：避免多端数据泄露
✅ 控制并发：减少服务器压力
✅ 合规要求：某些行业强制要求
```

### 23. Token 独占模式

**回答要点：**

**实现方案：**

```typescript
class SingleDeviceTokenManager {
  // 登录时使旧 Token 失效
  async login(credentials: LoginCredentials): Promise<LoginResult> {
    // 1. 验证用户名密码
    const user = await this.authenticateUser(credentials)

    // 2. 使该用户的所有旧 Token 失效
    await this.invalidateAllTokens(user.id)

    // 3. 生成新 Token（包含设备信息）
    const token = await this.generateToken(user, {
      deviceId: this.getDeviceId(),
      deviceInfo: navigator.userAgent,
      loginTime: Date.now(),
      ip: this.getClientIP(),
    })

    // 4. 记录当前活跃会话（Redis）
    await redis.set(`user:token:${user.id}`, token, 'EX', 7200)

    // 5. 记录会话信息
    await db.Session.create({
      userId: user.id,
      token,
      deviceId: this.getDeviceId(),
      deviceInfo: navigator.userAgent,
      loginTime: new Date(),
      status: 'active',
    })

    return { token, user }
  }

  // Token 验证时检查是否为最新
  async validateToken(token: string): Promise<boolean> {
    const payload = this.decodeToken(token)

    // 查询该用户的最新 Token
    const latestToken = await redis.get(`user:token:${payload.userId}`)

    // 如果当前 Token 不是最新的，说明在其他设备登录了
    if (token !== latestToken) {
      throw new Error('ACCOUNT_LOGGED_IN_OTHER_DEVICE')
    }

    return true
  }

  // 使所有旧 Token 失效
  private async invalidateAllTokens(userId: string) {
    // 标记所有旧会话为失效
    await db.Session.updateMany(
      { userId, status: 'active' },
      { $set: { status: 'kicked', kickedAt: new Date() } }
    )
  }
}
```

### 26. 踢人下线机制

**回答要点：**

**完整实现：**

```typescript
class KickOutManager {
  // 新设备登录时踢出旧设备
  async loginWithKickOut(userId: string, newDeviceId: string): Promise<string> {
    // 1. 查找该用户的活跃会话
    const activeSessions = await db.Session.find({
      userId,
      status: 'active',
      deviceId: { $ne: newDeviceId },
    })

    // 2. 踢出所有其他设备
    if (activeSessions.length > 0) {
      await this.kickOutDevices(activeSessions, newDeviceId)
    }

    // 3. 创建新会话
    const token = await this.createSession(userId, newDeviceId)

    return token
  }

  // 踢出设备
  private async kickOutDevices(sessions: Session[], newDeviceId: string) {
    // 1. 标记会话为已失效
    await db.Session.updateMany(
      { _id: { $in: sessions.map(s => s.id) } },
      {
        $set: {
          status: 'kicked',
          kickedAt: new Date(),
          kickedBy: newDeviceId,
        },
      }
    )

    // 2. 清除 Redis 中的 Token
    sessions.forEach(session => {
      redis.del(`session:${session.id}`)
    })

    // 3. 通过 WebSocket 通知被踢设备
    await this.notifyKickedDevices(sessions)

    // 4. 记录审计日志
    await this.logKickOutEvent(sessions, newDeviceId)
  }

  // 通知被踢设备
  private async notifyKickedDevices(sessions: Session[]) {
    const notifications = sessions.map(session => {
      return WebSocketServer.to(session.deviceId).emit('force_logout', {
        type: 'KICKED_OUT',
        reason: 'LOGIN_FROM_OTHER_DEVICE',
        message: '您的账号已在其他设备登录',
        timestamp: Date.now(),
        newDeviceId: session.kickedBy,
      })
    })

    await Promise.allSettled(notifications)
  }

  // 记录审计日志
  private async logKickOutEvent(sessions: Session[], newDeviceId: string) {
    await db.AuditLog.create({
      type: 'KICK_OUT',
      userId: sessions[0].userId,
      oldDeviceIds: sessions.map(s => s.deviceId),
      newDeviceId,
      timestamp: new Date(),
      ip: this.getClientIP(),
    })
  }
}
```

---

## 五、事件暂停与继续基础

### 41. 事件控制概念

**回答要点：**

**核心定义：**

- 控制异步任务的执行状态
- 支持暂停、继续、取消等操作
- 保证状态一致性

**应用场景：**

```
✅ 长时间运行的任务
✅ 数据同步流程
✅ 文件上传/下载
✅ 视频/音频播放
✅ 工作流引擎
✅ 医疗业务流程（处方流转、检验流程）
```

### 45. Promise 控制

**回答要点：**

**Promise 暂停实现：**

```typescript
class ControllablePromise<T> {
  private resolve: (value: T) => void
  private reject: (error: Error) => void
  private isPaused = false
  private pausePromise: Promise<void> | null = null
  private resumeResolve: (() => void) | null = null

  promise: Promise<T>

  constructor(
    executor: (
      resolve: (value: T) => void,
      reject: (error: Error) => void,
      pause: () => Promise<void>,
      resume: () => void
    ) => void
  ) {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject

      const pauseFn = () => {
        this.isPaused = true
        this.pausePromise = new Promise<void>(resume => {
          this.resumeResolve = resume
        })
        return this.pausePromise
      }

      const resumeFn = () => {
        if (this.resumeResolve) {
          this.resumeResolve()
          this.isPaused = false
          this.pausePromise = null
          this.resumeResolve = null
        }
      }

      executor(resolve, reject, pauseFn, resumeFn)
    })
  }

  pause(): Promise<void> | null {
    return this.pausePromise
  }

  resume(): void {
    if (this.isPaused && this.resumeResolve) {
      this.resumeResolve()
    }
  }

  cancel(): void {
    this.reject(new Error('Promise cancelled'))
  }
}

// 使用示例
const controllable = new ControllablePromise<number>(async (resolve, reject, pause, resume) => {
  for (let i = 0; i < 10; i++) {
    // 检查是否需要暂停
    if (shouldPause) {
      await pause()
    }

    // 执行任务
    await doSomething(i)
  }

  resolve(10)
})

// 暂停
controllable.pause()

// 继续
controllable.resume()
```

---

## 六、事件暂停实现

### 51. Promise 暂停实现

**回答要点：**

**完整实现：**

```typescript
class AsyncTaskController {
  private isPaused = false
  private pauseResolver: (() => void) | null = null
  private isCancelled = false

  // 可暂停的异步操作
  async executeWithPause<T>(task: () => Promise<T>): Promise<T> {
    while (!this.isCancelled) {
      // 检查是否需要暂停
      if (this.isPaused) {
        await this.waitUntilResume()
      }

      try {
        return await task()
      } catch (error) {
        if (this.isCancelled) {
          throw new Error('Task cancelled')
        }
        throw error
      }
    }

    throw new Error('Task cancelled')
  }

  // 暂停
  pause(): void {
    this.isPaused = true
  }

  // 继续
  resume(): void {
    if (this.isPaused && this.pauseResolver) {
      this.pauseResolver()
      this.pauseResolver = null
      this.isPaused = false
    }
  }

  // 取消
  cancel(): void {
    this.isCancelled = true
    this.resume() // 如果在暂停中，唤醒它
  }

  // 等待恢复
  private waitUntilResume(): Promise<void> {
    return new Promise<void>(resolve => {
      this.pauseResolver = resolve
    })
  }
}

// 使用示例
const controller = new AsyncTaskController()

async function processData() {
  const data = await fetchData()

  // 可以暂停的点
  await controller.executeWithPause(async () => {
    return processLargeData(data)
  })

  return data
}

// 暂停处理
controller.pause()

// 继续处理
controller.resume()
```

### 54. 请求中断

**回答要点：**

**Axios 请求暂停（取消）：**

```typescript
class RequestController {
  private abortController: AbortController | null = null

  // 发起可中断的请求
  async makeCancelableRequest(url: string): Promise<any> {
    // 取消之前的请求
    this.cancelPreviousRequest()

    // 创建新的 AbortController
    this.abortController = new AbortController()

    try {
      const response = await axios.get(url, {
        signal: this.abortController.signal,
      })

      return response.data
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request cancelled')
        return null
      }
      throw error
    }
  }

  // 取消请求（暂停）
  cancelPreviousRequest(): void {
    if (this.abortController) {
      this.abortController.abort()
      this.abortController = null
    }
  }

  // 重新开始（继续）
  async restartRequest(url: string): Promise<any> {
    return this.makeCancelableRequest(url)
  }
}

// 使用示例
const requestCtrl = new RequestController()

// 发起请求
requestCtrl.makeCancelableRequest('/api/data')

// 暂停（取消）请求
requestCtrl.cancelPreviousRequest()

// 继续（重新）请求
requestCtrl.restartRequest('/api/data')
```

### 55. WebSocket 暂停

**回答要点：**

**WebSocket 消息流控制：**

```typescript
class WebSocketController {
  private ws: WebSocket | null = null
  private isPaused = false
  private messageQueue: any[] = []
  private messageHandler: ((data: any) => void) | null = null

  connect(url: string) {
    this.ws = new WebSocket(url)

    this.ws.onmessage = event => {
      const data = JSON.parse(event.data)

      if (this.isPaused) {
        // 暂停状态，消息入队
        this.messageQueue.push(data)
      } else {
        // 正常状态，直接处理
        this.messageHandler?.(data)
      }
    }
  }

  // 暂停接收消息
  pause(): void {
    this.isPaused = true
  }

  // 继续接收消息
  resume(): void {
    this.isPaused = false

    // 处理队列中的消息
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()
      this.messageHandler?.(message)
    }
  }

  // 设置消息处理器
  onMessage(handler: (data: any) => void): void {
    this.messageHandler = handler
  }

  disconnect(): void {
    this.ws?.close()
    this.ws = null
  }
}

// 使用示例
const wsCtrl = new WebSocketController()
wsCtrl.connect('wss://api.example.com/prescription')

wsCtrl.onMessage(data => {
  console.log('收到处方消息:', data)
})

// 暂停消息接收
wsCtrl.pause()

// 继续消息接收
wsCtrl.resume()
```

---

## 七、事件继续实现

### 61. Promise 继续实现

**回答要点：**

**恢复执行：**

```typescript
class ResumableTask {
  private state: TaskState
  private isPaused = false
  private resumePromise: Promise<void> | null = null
  private resumeResolver: (() => void) | null = null

  constructor() {
    this.state = {
      currentIndex: 0,
      processedItems: [],
      totalItems: 0,
    }
  }

  async execute(items: any[], processor: (item: any) => Promise<void>): Promise<void> {
    this.state.totalItems = items.length

    for (let i = this.state.currentIndex; i < items.length; i++) {
      // 检查暂停状态
      await this.checkPause()

      const item = items[i]
      await processor(item)

      // 保存进度
      this.state.currentIndex = i + 1
      this.state.processedItems.push(item)

      // 触发进度事件
      this.emit('progress', {
        current: i + 1,
        total: items.length,
        percent: (((i + 1) / items.length) * 100).toFixed(2),
      })
    }
  }

  // 暂停
  pause(): void {
    this.isPaused = true
    this.resumePromise = new Promise<void>(resolve => {
      this.resumeResolver = resolve
    })
  }

  // 继续
  resume(): void {
    if (this.isPaused && this.resumeResolver) {
      this.resumeResolver()
      this.isPaused = false
      this.resumePromise = null
      this.resumeResolver = null
    }
  }

  // 检查暂停状态
  private async checkPause(): Promise<void> {
    if (this.isPaused && this.resumePromise) {
      await this.resumePromise
    }
  }

  // 获取进度
  getProgress(): TaskState {
    return { ...this.state }
  }
}

// 使用示例
const task = new ResumableTask()

task.on('progress', data => {
  console.log(`进度: ${data.percent}%`)
})

// 开始执行
task.execute(largeDataSet, async item => {
  await processItem(item)
})

// 暂停
setTimeout(() => task.pause(), 5000)

// 继续
setTimeout(() => task.resume(), 10000)
```

---

## 八、医疗场景应用

### 71. 处方流转暂停

**回答要点：**

**医疗场景实现：**

```typescript
class PrescriptionFlowController {
  private currentStep: number = 0
  private isPaused = false
  private pauseReason: string = ''
  private state: PrescriptionState

  // 处方流转步骤
  private steps = ['创建处方', '医生签名', '提交收费', '患者缴费', '药房配药', '患者取药', '完成']

  async executePrescriptionFlow(prescription: Prescription): Promise<void> {
    for (let i = this.currentStep; i < this.steps.length; i++) {
      // 检查是否需要暂停
      await this.checkPause()

      const step = this.steps[i]

      try {
        // 执行当前步骤
        await this.executeStep(step, prescription)

        // 保存进度
        this.currentStep = i + 1
        this.state = {
          ...prescription,
          currentStep: step,
          status: 'in_progress',
        }

        // 通知相关方
        await this.notifyStakeholders(step, prescription)
      } catch (error) {
        // 错误时自动暂停
        this.pause(`步骤执行失败: ${step}`)
        throw error
      }
    }

    // 完成
    this.state.status = 'completed'
  }

  // 暂停流程
  pause(reason: string): void {
    this.isPaused = true
    this.pauseReason = reason

    // 通知相关方
    this.notifyPause(reason)
  }

  // 继续流程
  resume(): void {
    if (this.isPaused) {
      this.isPaused = false
      this.pauseReason = ''

      // 通知相关方
      this.notifyResume()
    }
  }

  // 检查暂停状态
  private async checkPause(): Promise<void> {
    if (this.isPaused) {
      // 等待恢复
      await this.waitUntilResume()
    }
  }

  // 等待恢复
  private waitUntilResume(): Promise<void> {
    return new Promise<void>(resolve => {
      const checkInterval = setInterval(() => {
        if (!this.isPaused) {
          clearInterval(checkInterval)
          resolve()
        }
      }, 100)
    })
  }

  // 通知相关方暂停
  private notifyPause(reason: string): void {
    WebSocketServer.emit('prescription_paused', {
      prescriptionId: this.state.id,
      reason,
      currentStep: this.steps[this.currentStep - 1],
      timestamp: Date.now(),
    })
  }

  // 通知相关方继续
  private notifyResume(): void {
    WebSocketServer.emit('prescription_resumed', {
      prescriptionId: this.state.id,
      currentStep: this.steps[this.currentStep],
      timestamp: Date.now(),
    })
  }
}
```

---

## 九、实战案例

### 81. SSO 实施案例

**回答要点：**

**实施过程：**

```
阶段 1：需求分析（1 周）
- 确定接入系统列表
- 分析现有认证方式
- 制定 SSO 方案

阶段 2：CAS Server 部署（1 周）
- 部署 CAS Server
- 配置用户数据源
- 测试认证流程

阶段 3：应用接入（2 周）
- 开发 CAS Client
- 集成到各子系统
- 测试单点登录

阶段 4：单点登出（0.5 周）
- 实现登出通知
- 清除会话
- 测试登出流程

阶段 5：上线部署（0.5 周）
- 灰度发布
- 监控告警
- 全量上线

总计：5 周完成 SSO 实施
```

### 83. 踢人下线案例

**回答要点：**

**完整案例：**

```typescript
// 场景：医疗系统，医生在 PC 端登录，移动端自动下线

// 1. PC 端登录
const pcLogin = async () => {
  const result = await authController.login({
    username: 'doctor001',
    password: 'password',
    deviceInfo: {
      deviceId: 'pc-device-001',
      deviceType: 'PC',
      userAgent: navigator.userAgent,
    },
  })

  return result.token
}

// 2. 踢出移动端
const kickOutMobile = async (userId: string, newDeviceId: string) => {
  // 查找移动端会话
  const mobileSession = await db.Session.findOne({
    userId,
    deviceType: 'MOBILE',
    status: 'active',
  })

  if (mobileSession) {
    // 标记为已踢出
    await db.Session.updateOne(
      { _id: mobileSession._id },
      {
        $set: {
          status: 'kicked',
          kickedBy: newDeviceId,
          kickedAt: new Date(),
        },
      }
    )

    // WebSocket 通知移动端
    WebSocketServer.to(mobileSession.deviceId).emit('force_logout', {
      type: 'KICKED_OUT',
      reason: 'LOGIN_FROM_PC',
      message: '您的账号已在 PC 端登录',
      timestamp: Date.now(),
    })

    // 记录审计日志
    await db.AuditLog.create({
      type: 'KICK_OUT',
      userId,
      fromDevice: mobileSession.deviceId,
      toDevice: newDeviceId,
      timestamp: new Date(),
    })
  }
}

// 3. 移动端接收通知
const setupLogoutListener = () => {
  const ws = new WebSocket('/ws/logout')

  ws.onmessage = event => {
    const message = JSON.parse(event.data)

    if (message.type === 'KICKED_OUT') {
      Modal.warning({
        title: '账号已登出',
        content: message.message,
        onOk: () => {
          clearSession()
          router.push('/login')
        },
      })

      clearSession()
    }
  }
}
```

---

## 十、进阶提升

### 91. 架构设计思维

**回答要点：**

**设计原则：**

```
1. 安全性优先
   - Token 加密存储
   - 设备指纹识别
   - 异常登录检测

2. 用户体验
   - 无感刷新
   - 友好提示
   - 状态恢复

3. 可靠性
   - 容错处理
   - 状态持久化
   - 断点续传

4. 可扩展性
   - 插件化设计
   - 配置驱动
   - 支持多种协议

5. 可观测性
   - 全链路追踪
   - 实时监控
   - 审计日志
```

---

## 总结

### 核心要点

**单点登录（SSO）：**

```
✅ CAS 协议：一次登录，多处访问
✅ Ticket 机制：ST、TGT 管理
✅ 单点登出：通知所有服务
✅ 跨域认证：统一身份管理
```

**单设备登录：**

```
✅ Token 独占模式
✅ 会话管理
✅ 踢人下线机制
✅ WebSocket 实时通知
```

**事件暂停与继续：**

```
✅ Promise 控制：暂停、继续、取消
✅ 请求中断：AbortController
✅ WebSocket 消息队列
✅ 状态持久化与恢复
✅ 医疗场景应用
```

### 最佳实践

```
1. 安全加固
2. 性能优化
3. 用户体验
4. 监控告警
5. 容错处理
```
