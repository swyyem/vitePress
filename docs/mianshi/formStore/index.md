# formStore 与身份认证权限面试题集

## 📑 快速导航目录

### 一、formStore 核心设计

- [1. formStore 设计理念](#1-formstore-设计理念)
- [2. 响应式原理](#2-响应式原理)
- [3. 状态管理架构](#3-状态管理架构)
- [4. 字段联动机制](#4-字段联动机制)
- [5. 依赖图构建](#5-依赖图构建)
- [6. 拓扑排序算法](#6-拓扑排序算法)
- [7. 循环依赖检测](#7-循环依赖检测)
- [8. 微任务调度](#8-微任务调度)
- [9. 批量更新优化](#9-批量更新优化)
- [10. 性能监控](#10-性能监控)

### 二、6 种字段联动

- [11. 显隐联动](#11-显隐联动)
- [12. 必填联动](#12-必填联动)
- [13. 禁用联动](#13-禁用联动)
- [14. 选项联动](#14-选项联动)
- [15. 值联动](#15-值联动)
- [16. 校验联动](#16-校验联动)
- [17. 联动优先级](#17-联动优先级)
- [18. 联动执行顺序](#18-联动执行顺序)
- [19. 联动性能优化](#19-联动性能优化)
- [20. 联动调试工具](#20-联动调试工具)

### 三、拓扑排序与循环依赖

- [21. DAG 有向无环图](#21-dag-有向无环图)
- [22. Kahn 算法](#22-kahn-算法)
- [23. DFS 拓扑排序](#23-dfs-拓扑排序)
- [24. 循环依赖检测](#24-循环依赖检测)
- [25. 依赖环报告](#25-依赖环报告)
- [26. 自动修复策略](#26-自动修复策略)
- [27. 依赖可视化](#27-依赖可视化)
- [28. 复杂度分析](#28-复杂度分析)
- [29. 边界情况处理](#29-边界情况处理)
- [30. 测试覆盖](#30-测试覆盖)

### 四、微任务批量更新

- [31. 微任务原理](#31-微任务原理)
- [32. Promise 队列](#32-promise-队列)
- [33. 批量更新策略](#33-批量更新策略)
- [34. 防抖优化](#34-防抖优化)
- [35. 节流优化](#35-节流优化)
- [36. 更新去重](#36-更新去重)
- [37. 优先级调度](#37-优先级调度)
- [38. 更新日志](#38-更新日志)
- [39. 错误恢复](#39-错误恢复)
- [40. 性能对比](#40-性能对比)

### 五、CAS 统一认证

- [41. CAS 协议原理](#41-cas-协议原理)
- [42. SSO 单点登录](#42-sso-单点登录)
- [43. Ticket 机制](#43-ticket-机制)
- [44. 认证流程](#44-认证流程)
- [45. 跨域认证](#45-跨域认证)
- [46. 会话管理](#46-会话管理)
- [47. 安全加固](#47-安全加固)
- [48. 性能优化](#48-性能优化)
- [49. 故障处理](#49-故障处理)
- [50. 最佳实践](#50-最佳实践)

### 六、OAuth2.0 授权

- [51. OAuth2.0 原理](#51-oauth20-原理)
- [52. 授权模式对比](#52-授权模式对比)
- [53. 授权码模式](#53-授权码模式)
- [54. 隐式模式](#54-隐式模式)
- [55. 客户端凭证](#55-客户端凭证)
- [56. 密码模式](#56-密码模式)
- [57. PKCE 扩展](#57-pkce-扩展)
- [58. Refresh Token](#58-refresh-token)
- [59. Token 安全](#59-token-安全)
- [60. 最佳实践](#60-最佳实践)

### 七、Token 续期机制

- [61. Token 生命周期](#61-token-生命周期)
- [62. 主动续期策略](#62-主动续期策略)
- [63. 静默刷新](#63-静默刷新)
- [64. 无感刷新](#65-无感刷新)
- [65. 并发控制](#65-并发控制)
- [66. 请求队列](#66-请求队列)
- [67. 失败重试](#67-失败重试)
- [68. 过期处理](#68-过期处理)
- [69. 多端同步](#69-多端同步)
- [70. 性能优化](#70-性能优化)

### 八、多端登出机制

- [71. 登出场景分析](#71-登出场景分析)
- [72. 主动登出](#72-主动登出)
- [73. 被动登出](#73-被动登出)
- [74. 踢人下线](#74-踢人下线)
- [75. 设备管理](#75-设备管理)
- [76. 会话同步](#76-会话同步)
- [77. WebSocket 通知](#77-websocket-通知)
- [78. 状态同步](#78-状态同步)
- [79. 安全策略](#79-安全策略)
- [80. 用户体验](#80-用户体验)

### 九、RBAC 权限模型

- [81. RBAC 核心概念](#81-rbac-核心概念)
- [82. 角色管理](#82-角色管理)
- [83. 权限分配](#83-权限分配)
- [84. 权限继承](#84-权限继承)
- [85. 权限冲突](#85-权限冲突)
- [86. 权限缓存](#86-权限缓存)
- [87. 权限验证](#87-权限验证)
- [88. 权限变更同步](#88-权限变更同步)
- [89. 性能优化](#89-性能优化)
- [90. 最佳实践](#90-最佳实践)

### 十、细粒度权限控制

- [91. 菜单级权限](#91-菜单级权限)
- [92. 按钮级权限](#92-按钮级权限)
- [93. 数据行级权限](#93-数据行级权限)
- [94. 字段级权限](#94-字段级权限)
- [95. 操作级权限](#95-操作级权限)
- [96. 数据范围权限](#96-数据范围权限)
- [97. 动态权限](#97-动态权限)
- [98. 权限指令](#98-权限指令)
- [99. 权限组件](#99-权限组件)
- [100. 权限测试](#100-权限测试)

### 十一、实战案例

- [101. 20 字段复杂表单](#101-20-字段复杂表单)
- [102. 医疗表单场景](#102-医疗表单场景)
- [103. 动态表单生成](#103-动态表单生成)
- [104. 表单性能优化](#104-表单性能优化)
- [105. 统一认证落地](#105-统一认证落地)
- [106. 权限系统实施](#106-权限系统实施)
- [107. Token 刷新实战](#107-token-刷新实战)
- [108. 多端同步案例](#108-多端同步案例)
- [109. 权限性能优化](#109-权限性能优化)
- [110. 安全加固实践](#110-安全加固实践)

### 十二、进阶提升

- [111. 架构设计思维](#111-架构设计思维)
- [112. 性能调优能力](#112-性能调优能力)
- [113. 安全保障能力](#113-安全保障能力)
- [114. 团队规范建设](#114-团队规范建设)
- [115. 最佳实践总结](#115-最佳实践总结)
- [116. 技术创新能力](#116-技术创新能力)
- [117. 问题排查能力](#117-问题排查能力)
- [118. 技术分享经验](#118-技术分享经验)
- [119. 行业趋势](#119-行业趋势)
- [120. 未来展望](#120-未来展望)

---

## 一、formStore 核心设计

### 1. formStore 设计理念

**回答要点：**

**核心设计：**

- 响应式状态管理，类似 Vue 的 reactive
- 专注于表单场景，处理复杂联动逻辑
- 声明式配置，降低开发成本

**设计目标：**

```
✅ 简化复杂表单开发
✅ 处理 6 种字段联动
✅ 检测循环依赖
✅ 批量更新优化性能
✅ 类型安全（TypeScript）
```

### 2. 响应式原理

**回答要点：**

**实现原理：**

```typescript
class FormStore {
  private data: Record<string, any>
  private subscribers: Map<string, Set<Function>> = new Map()
  private dependencies: Map<string, Set<string>> = new Map()

  constructor(initialValues: Record<string, any>) {
    this.data = new Proxy(initialValues, {
      get: (target, key) => {
        this.track(key.toString())
        return target[key]
      },
      set: (target, key, value) => {
        const oldValue = target[key]
        target[key] = value

        if (oldValue !== value) {
          this.trigger(key.toString(), value, oldValue)
        }

        return true
      },
    })
  }

  private track(key: string) {
    // 依赖收集
  }

  private trigger(key: string, newValue: any, oldValue: any) {
    // 触发更新
    const subs = this.subscribers.get(key)
    if (subs) {
      subs.forEach(sub => sub(newValue, oldValue))
    }
  }
}
```

### 6. 拓扑排序算法

**回答要点：**

**Kahn 算法实现：**

```typescript
function topologicalSort(dependencies: Map<string, Set<string>>): string[] | null {
  // 1. 计算入度
  const inDegree = new Map<string, number>()
  const graph = new Map<string, string[]>()

  dependencies.forEach((deps, field) => {
    inDegree.set(field, inDegree.get(field) || 0)

    deps.forEach(dep => {
      inDegree.set(dep, (inDegree.get(dep) || 0) + 1)

      if (!graph.has(dep)) {
        graph.set(dep, [])
      }
      graph.get(dep)!.push(field)
    })
  })

  // 2. 找到入度为 0 的节点
  const queue: string[] = []
  inDegree.forEach((degree, field) => {
    if (degree === 0) {
      queue.push(field)
    }
  })

  // 3. BFS 拓扑排序
  const result: string[] = []

  while (queue.length > 0) {
    const field = queue.shift()!
    result.push(field)

    const neighbors = graph.get(field) || []
    neighbors.forEach(neighbor => {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1)
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor)
      }
    })
  }

  // 4. 检测循环依赖
  if (result.length !== inDegree.size) {
    return null // 存在循环依赖
  }

  return result
}
```

### 7. 循环依赖检测

**回答要点：**

**检测策略：**

```typescript
class DependencyChecker {
  detectCycle(dependencies: Map<string, Set<string>>): string[] | null {
    const visited = new Set<string>()
    const recursionStack = new Set<string>()
    const path: string[] = []

    for (const field of dependencies.keys()) {
      if (!visited.has(field)) {
        const cycle = this.dfs(field, dependencies, visited, recursionStack, path)
        if (cycle) {
          return cycle
        }
      }
    }

    return null
  }

  private dfs(
    field: string,
    dependencies: Map<string, Set<string>>,
    visited: Set<string>,
    recursionStack: Set<string>,
    path: string[]
  ): string[] | null {
    visited.add(field)
    recursionStack.add(field)
    path.push(field)

    const deps = dependencies.get(field) || []
    for (const dep of deps) {
      if (!visited.has(dep)) {
        const cycle = this.dfs(dep, dependencies, visited, recursionStack, path)
        if (cycle) return cycle
      } else if (recursionStack.has(dep)) {
        // 找到循环依赖
        const cycleStart = path.indexOf(dep)
        return path.slice(cycleStart).concat(dep)
      }
    }

    path.pop()
    recursionStack.delete(field)
    return null
  }
}

// 使用示例
const checker = new DependencyChecker()
const cycle = checker.detectCycle(dependencies)

if (cycle) {
  console.error('循环依赖检测:', cycle.join(' → '))
  throw new Error(`循环依赖: ${cycle.join(' → ')}`)
}
```

### 8. 微任务调度

**回答要点：**

**调度器实现：**

```typescript
class UpdateScheduler {
  private pendingUpdates: Map<string, UpdateTask> = new Map()
  private isScheduled = false

  schedule(field: string, task: UpdateTask) {
    this.pendingUpdates.set(field, task)

    if (!this.isScheduled) {
      this.isScheduled = true

      // 使用微任务批量更新
      Promise.resolve().then(() => {
        this.flushUpdates()
      })
    }
  }

  private flushUpdates() {
    // 1. 拓扑排序
    const sortedFields = topologicalSort(this.getDependencies())

    if (!sortedFields) {
      console.error('存在循环依赖，无法更新')
      return
    }

    // 2. 按拓扑顺序执行更新
    sortedFields.forEach(field => {
      const task = this.pendingUpdates.get(field)
      if (task) {
        try {
          task.execute()
        } catch (error) {
          console.error(`更新字段 ${field} 失败:`, error)
        }
      }
    })

    // 3. 清理
    this.pendingUpdates.clear()
    this.isScheduled = false
  }
}

// 使用示例
const scheduler = new UpdateScheduler()

// 多次修改会被批量处理
formStore.setField('field1', value1)
formStore.setField('field2', value2)
formStore.setField('field3', value3)

// 只触发一次批量更新
```

---

## 二、6 种字段联动

### 11. 显隐联动

**回答要点：**

**实现方案：**

```typescript
interface VisibilityRule {
  field: string
  show: (values: Record<string, any>) => boolean
}

class VisibilityManager {
  private rules: Map<string, VisibilityRule> = new Map()

  register(rule: VisibilityRule) {
    this.rules.set(rule.field, rule)
  }

  evaluate(field: string, values: Record<string, any>): boolean {
    const rule = this.rules.get(field)
    if (!rule) return true

    return rule.show(values)
  }

  // 医疗场景示例
  setupMedicalRules() {
    // 当诊断类型为"手术"时，显示手术信息
    this.register({
      field: 'surgeryInfo',
      show: values => values.diagnosisType === 'surgery',
    })

    // 当患者类型为"住院"时，显示床位信息
    this.register({
      field: 'bedInfo',
      show: values => values.patientType === 'inpatient',
    })
  }
}
```

### 14. 选项联动

**回答要点：**

**实现方案：**

```typescript
interface OptionsRule {
  field: string
  options: (values: Record<string, any>) => Option[]
}

class OptionsManager {
  private rules: Map<string, OptionsRule> = new Map()

  register(rule: OptionsRule) {
    this.rules.set(rule.field, rule)
  }

  getOptions(field: string, values: Record<string, any>): Option[] {
    const rule = this.rules.get(field)
    if (!rule) return []

    return rule.options(values)
  }

  // 医疗场景示例
  setupMedicalOptions() {
    // 科室选项联动
    this.register({
      field: 'department',
      options: values => {
        if (values.hospitalType === 'general') {
          return [
            { label: '内科', value: 'internal' },
            { label: '外科', value: 'surgery' },
            { label: '儿科', value: 'pediatrics' },
          ]
        } else if (values.hospitalType === 'specialized') {
          return [
            { label: '眼科', value: 'ophthalmology' },
            { label: '牙科', value: 'dentistry' },
          ]
        }
        return []
      },
    })

    // 药品选项联动（根据科室）
    this.register({
      field: 'medicine',
      options: values => {
        return getMedicinesByDepartment(values.department)
      },
    })
  }
}
```

---

## 三、拓扑排序与循环依赖

### 21. DAG 有向无环图

**回答要点：**

**核心概念：**

```
DAG (Directed Acyclic Graph)：
- 有向图：边有方向
- 无环：不存在循环路径

表单依赖关系是典型的 DAG：
fieldA → fieldB → fieldC
  ↓
fieldD

不能出现：
fieldA → fieldB → fieldA (环)
```

**构建依赖图：**

```typescript
class DependencyGraph {
  private graph: Map<string, Set<string>> = new Map()

  addDependency(field: string, dependsOn: string) {
    if (!this.graph.has(field)) {
      this.graph.set(field, new Set())
    }
    this.graph.get(field)!.add(dependsOn)
  }

  getDependencies(field: string): string[] {
    return Array.from(this.graph.get(field) || [])
  }

  getAllFields(): string[] {
    return Array.from(this.graph.keys())
  }
}
```

---

## 四、微任务批量更新

### 31. 微任务原理

**回答要点：**

**微任务 vs 宏任务：**

```
事件循环优先级：
1. 同步代码
2. 微任务（Promise、MutationObserver）
3. 宏任务（setTimeout、setInterval）

微任务特点：
- 在当前任务结束后立即执行
- 优先于宏任务
- 适合批量更新

使用场景：
- 表单状态批量更新
- DOM 批量操作
- 状态同步
```

### 33. 批量更新策略

**回答要点：**

**实现方案：**

```typescript
class BatchUpdateManager {
  private pendingFields: Set<string> = new Set()
  private updateQueue: Map<string, Function> = new Map()

  batchUpdate(updates: Array<{ field: string; value: any }>) {
    updates.forEach(({ field, value }) => {
      this.pendingFields.add(field)
      this.updateQueue.set(field, () => {
        formStore.setField(field, value)
      })
    })

    // 微任务批量执行
    this.scheduleFlush()
  }

  private scheduleFlush() {
    if (!this.isScheduled) {
      this.isScheduled = true

      Promise.resolve().then(() => {
        this.flush()
      })
    }
  }

  private flush() {
    // 1. 拓扑排序
    const sortedFields = this.topologicalSort()

    // 2. 按顺序执行
    sortedFields.forEach(field => {
      if (this.updateQueue.has(field)) {
        this.updateQueue.get(field)!()
      }
    })

    // 3. 清理
    this.pendingFields.clear()
    this.updateQueue.clear()
    this.isScheduled = false
  }
}
```

---

## 五、CAS 统一认证

### 41. CAS 协议原理

**回答要点：**

**核心概念：**

- CAS (Central Authentication Service) 集中式认证服务
- SSO (Single Sign-On) 单点登录
- 一次登录，多处访问

**认证流程：**

```
1. 用户访问应用 A
   ↓
2. 应用 A 检查登录状态（未登录）
   ↓
3. 重定向到 CAS Server
   ↓
4. 用户输入用户名密码
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
- 无需再次输入密码
```

### 44. 认证流程

**回答要点：**

**实现代码：**

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
    const user = await this.validateTicket(ticket)

    if (user) {
      this.setLocalSession(user)
      return true
    }

    return false
  }

  // 重定向到 CAS
  private redirectToCAS() {
    const loginUrl = `${this.casServerUrl}/login?service=${encodeURIComponent(this.serviceUrl)}`
    window.location.href = loginUrl
  }

  // 验证 Ticket
  private async validateTicket(ticket: string): Promise<User | null> {
    const response = await fetch(`${this.casServerUrl}/serviceValidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ticket,
        service: this.serviceUrl,
      }),
    })

    const result = await response.json()

    if (result.success) {
      return result.user
    }

    return null
  }

  // 登出
  logout() {
    const logoutUrl = `${this.casServerUrl}/logout?service=${encodeURIComponent(this.serviceUrl)}`
    window.location.href = logoutUrl
  }
}
```

---

## 六、OAuth2.0 授权

### 51. OAuth2.0 原理

**回答要点：**

**核心概念：**

- 开放授权标准
- 允许用户授权第三方应用访问资源
- 不暴露用户密码

**角色：**

```
Resource Owner (资源所有者)：用户
Client (客户端)：第三方应用
Resource Server (资源服务器)：API 服务器
Authorization Server (授权服务器)：颁发 Token
```

### 53. 授权码模式

**回答要点：**

**授权流程：**

```
1. 客户端重定向用户到授权服务器
   GET /authorize?response_type=code&client_id=xxx&redirect_uri=xxx

2. 用户登录并授权
   ↓

3. 授权服务器重定向回客户端，附带授权码
   redirect_uri?code=AUTH_CODE

4. 客户端使用授权码换取 Access Token
   POST /token
   {
     grant_type: 'authorization_code',
     code: 'AUTH_CODE',
     client_id: 'xxx',
     client_secret: 'xxx',
     redirect_uri: 'xxx'
   }

5. 授权服务器返回 Token
   {
     access_token: 'xxx',
     token_type: 'Bearer',
     expires_in: 3600,
     refresh_token: 'xxx'
   }
```

**实现代码：**

```typescript
class OAuth2Client {
  async authorize(): Promise<void> {
    const authUrl = `${this.authServerUrl}/authorize?${new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.scope,
      state: this.generateState(),
    })}`

    window.location.href = authUrl
  }

  async getToken(code: string): Promise<TokenResponse> {
    const response = await fetch(`${this.authServerUrl}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri,
      }),
    })

    return response.json()
  }
}
```

---

## 七、Token 续期机制

### 62. 主动续期策略

**回答要点：**

**续期策略：**

```typescript
class TokenManager {
  private accessToken: string | null = null
  private refreshToken: string | null = null
  private refreshTimer: number | null = null

  setToken(tokens: TokenResponse) {
    this.accessToken = tokens.access_token
    this.refreshToken = tokens.refresh_token

    // 计算续期时间（提前 5 分钟续期）
    const expiresIn = tokens.expires_in * 1000
    const refreshTime = expiresIn - 5 * 60 * 1000

    this.scheduleRefresh(refreshTime)
  }

  private scheduleRefresh(delay: number) {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer)
    }

    this.refreshTimer = window.setTimeout(() => {
      this.refreshTokenSilently()
    }, delay)
  }

  // 静默刷新
  async refreshTokenSilently(): Promise<void> {
    if (!this.refreshToken) {
      this.handleTokenExpired()
      return
    }

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refresh_token: this.refreshToken,
        }),
      })

      const tokens = await response.json()
      this.setToken(tokens)
    } catch (error) {
      console.error('Token refresh failed:', error)
      this.handleTokenExpired()
    }
  }
}
```

### 63. 静默刷新

**回答要点：**

**无感刷新实现：**

```typescript
class SilentRefreshInterceptor {
  private isRefreshing = false
  private refreshSubscribers: Array<(token: string) => void> = []

  async intercept(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    const token = this.getAccessToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }

  async interceptError(error: AxiosError): Promise<AxiosResponse> {
    const originalRequest = error.config

    // Token 过期
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (this.isRefreshing) {
        // 正在刷新，加入等待队列
        return new Promise(resolve => {
          this.refreshSubscribers.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(axios(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      this.isRefreshing = true

      try {
        // 刷新 Token
        const tokens = await this.refreshToken()
        this.isRefreshing = false

        // 通知所有等待的请求
        this.refreshSubscribers.forEach(callback => callback(tokens.access_token))
        this.refreshSubscribers = []

        // 重试原请求
        originalRequest.headers.Authorization = `Bearer ${tokens.access_token}`
        return axios(originalRequest)
      } catch (refreshError) {
        this.isRefreshing = false
        this.refreshSubscribers = []

        // 刷新失败，跳转登录页
        this.handleTokenExpired()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
}
```

---

## 八、多端登出机制

### 71. 登出场景分析

**回答要点：**

**登出场景：**

```
1. 主动登出
   - 用户点击登出按钮
   - 所有端同时登出

2. 被动登出
   - Token 过期
   - 账号被禁用
   - 密码被修改

3. 踢人下线
   - 管理员强制登出
   - 新设备登录踢出旧设备

4. 安全登出
   - 异地登录提醒
   - 异常活动检测
```

### 77. WebSocket 通知

**回答要点：**

**实现方案：**

```typescript
class LogoutNotificationService {
  private ws: WebSocket | null = null

  connect(userId: string) {
    this.ws = new WebSocket(`wss://api.example.com/ws/logout?userId=${userId}`)

    this.ws.onmessage = event => {
      const message = JSON.parse(event.data)

      if (message.type === 'FORCE_LOGOUT') {
        this.handleForceLogout(message)
      }
    }
  }

  private handleForceLogout(message: any) {
    const { reason, timestamp } = message

    // 显示提示
    Modal.warning({
      title: '账号已登出',
      content: reason || '您的账号已在其他设备登录',
      onOk: () => {
        this.clearSession()
        router.push('/login')
      },
    })

    // 清理本地状态
    this.clearSession()
  }

  private clearSession() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user_info')

    // 关闭 WebSocket
    this.ws?.close()
  }
}
```

---

## 九、RBAC 权限模型

### 81. RBAC 核心概念

**回答要点：**

**核心概念：**

```
RBAC (Role-Based Access Control)：
- User (用户)：系统使用者
- Role (角色)：权限集合
- Permission (权限)：具体操作权限

关系：
User → Role → Permission

一个用户可以有多个角色
一个角色可以有多个权限
一个权限可以分配给多个角色
```

### 82. 角色管理

**回答要点：**

**实现方案：**

```typescript
interface Role {
  id: string
  name: string
  description: string
  permissions: Permission[]
}

interface Permission {
  id: string
  resource: string
  action: string
  scope?: string
}

class RoleManager {
  private roles: Map<string, Role> = new Map()

  // 检查用户是否有权限
  hasPermission(userId: string, resource: string, action: string): boolean {
    const userRoles = this.getUserRoles(userId)

    return userRoles.some(role => {
      return role.permissions.some(perm => {
        return perm.resource === resource && perm.action === action
      })
    })
  }

  // 获取用户所有权限
  getUserPermissions(userId: string): Permission[] {
    const userRoles = this.getUserRoles(userId)

    const permissions = new Set<Permission>()
    userRoles.forEach(role => {
      role.permissions.forEach(perm => permissions.add(perm))
    })

    return Array.from(permissions)
  }
}
```

---

## 十、细粒度权限控制

### 91. 菜单级权限

**回答要点：**

**实现方案：**

```typescript
class MenuPermissionManager {
  filterMenus(menus: Menu[], permissions: Permission[]): Menu[] {
    return menus.filter(menu => {
      // 检查菜单权限
      const hasPermission = permissions.some(p => p.resource === 'menu' && p.action === menu.id)

      if (!hasPermission) return false

      // 递归过滤子菜单
      if (menu.children) {
        menu.children = this.filterMenus(menu.children, permissions)
      }

      return true
    })
  }
}

// Vue 路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const permissions = await userStore.getPermissions()

  const menuManager = new MenuPermissionManager()
  const accessibleMenus = menuManager.filterMenus(allMenus, permissions)

  // 检查路由权限
  const hasAccess = accessibleMenus.some(menu => menu.path === to.path)

  if (!hasAccess) {
    next('/403')
  } else {
    next()
  }
})
```

### 92. 按钮级权限

**回答要点：**

**Vue 指令实现：**

```typescript
// v-permission 指令
const permissionDirective: Directive = {
  mounted(el, binding) {
    const { value } = binding;
    const userStore = useUserStore();

    const hasPermission = userStore.hasPermission(value.resource, value.action);

    if (!hasPermission) {
      el.parentNode?.removeChild(el);
    }
  }
};

// 使用示例
<template>
  <button v-permission="{ resource: 'patient', action: 'delete' }">
    删除患者
  </button>
</template>
```

### 93. 数据行级权限

**回答要点：**

**实现方案：**

```typescript
class RowPermissionManager {
  filterData(data: any[], userId: string, permissions: Permission[]): any[] {
    return data.filter(row => {
      // 检查数据行权限
      return this.checkRowPermission(row, userId, permissions)
    })
  }

  private checkRowPermission(row: any, userId: string, permissions: Permission[]): boolean {
    // 数据范围权限
    const dataScope = this.getDataScope(userId, permissions)

    switch (dataScope) {
      case 'all':
        return true
      case 'dept':
        return row.departmentId === this.getUserDept(userId)
      case 'self':
        return row.createdBy === userId
      case 'custom':
        return this.checkCustomScope(row, userId, permissions)
      default:
        return false
    }
  }
}

// 表格中使用
const filteredData = computed(() => {
  return rowPermissionManager.filterData(rawData.value, userStore.userId, userStore.permissions)
})
```

---

## 十一、实战案例

### 101. 20 字段复杂表单

**回答要点：**

**实战场景：**

```
医疗处方表单（20+ 字段）：
├─ 患者信息：姓名、年龄、性别、身份证号
├─ 诊断信息：主诊断、次诊断、诊断类型
├─ 处方信息：药品、剂量、用法、频次
├─ 费用信息：药品费、检查费、总金额
└─ 其他：备注、医生签名

联动逻辑：
1. 性别 → 年龄（某些药品有年龄限制）
2. 诊断类型 → 药品选项
3. 药品 → 剂量范围
4. 年龄 → 必填校验
5. 诊断 → 检验项目选项
6. 药品数量 → 总金额计算

使用 formStore 后：
- 开发时间：从 3 天降至 0.5 天
- 效率提升：70%+
- 代码量：减少 60%
```

### 105. 统一认证落地

**回答要点：**

**实施过程：**

```
阶段 1：CAS 部署（1 周）
- 部署 CAS Server
- 配置应用接入
- 测试 SSO 流程

阶段 2：OAuth2.0 集成（1 周）
- 配置授权服务器
- 实现授权码模式
- 测试 Token 颁发

阶段 3：Token 续期（0.5 周）
- 实现主动续期
- 实现静默刷新
- 测试并发控制

阶段 4：多端登出（0.5 周）
- WebSocket 通知
- 状态同步
- 测试各种场景

阶段 5：权限系统（1 周）
- RBAC 模型设计
- 细粒度权限控制
- 权限缓存优化

总计：4 周完成统一认证 + 权限系统
```

---

## 十二、进阶提升

### 111. 架构设计思维

**回答要点：**

**设计原则：**

```
1. 关注点分离
   - 表单状态管理
   - 认证授权
   - 权限控制
   各自独立，互不干扰

2. 可扩展性
   - 插件化设计
   - 配置驱动
   - 支持自定义规则

3. 性能优先
   - 拓扑排序优化
   - 批量更新
   - 缓存策略

4. 类型安全
   - TypeScript 完整类型
   - 编译时检查
   - 智能提示

5. 用户体验
   - 无感刷新
   - 快速响应
   - 错误友好
```

---

## 总结

### 核心成果

**formStore 性能提升：**

```
开发效率：提升 70%
代码量：减少 60%
维护成本：降低 50%
bug 率：降低 40%
```

**统一认证成果：**

```
登录体验：SSO 单点登录
Token 续期：无感刷新
多端同步：实时通知
权限控制：细粒度 RBAC
```

### 关键技术

**formStore：**

```
响应式状态管理
6 种字段联动
拓扑排序检测循环依赖
微任务批量更新调度
```

**身份认证：**

```
CAS 统一认证
OAuth2.0 授权
Token 续期/静默刷新
多端登出机制
```

**权限控制：**

```
RBAC 权限模型
菜单级权限
按钮级权限
数据行级权限
```
