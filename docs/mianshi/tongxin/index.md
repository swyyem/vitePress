# 微前端通信架构设计面试题集

## 📑 快速导航目录

### 一、微前端基础架构

- [1. 微前端核心概念](#1-微前端核心概念)
- [2. 架构选型对比](#2-架构选型对比)
- [3. qiankun 原理](#3-qiankun-原理)
- [4. Module Federation](#4-module-federation)
- [5. iframe 方案](#5-iframe-方案)
- [6. Web Components](#6-web-components)
- [7. 技术选型依据](#7-技术选型依据)
- [8. 架构演进路径](#8-架构演进路径)
- [9. 子应用治理](#9-子应用治理)
- [10. 依赖共享策略](#10-依赖共享策略)

### 二、通信方案设计

- [11. 三层通信架构](#11-三层通信架构)
- [12. Props 透传机制](#12-props-透传机制)
- [13. 全局事件总线](#13-全局事件总线)
- [14. WebSocket 实时通信](#14-websocket-实时通信)
- [15. 通信方案选择](#15-通信方案选择)
- [16. 跨域通信处理](#16-跨域通信处理)
- [17. 类型安全保障](#17-类型安全保障)
- [18. 性能优化策略](#18-性能优化策略)
- [19. 错误处理机制](#19-错误处理机制)
- [20. 调试工具开发](#20-调试工具开发)

### 三、消息序列号设计

- [21. 序列号生成策略](#21-序列号生成策略)
- [22. 全局唯一性保证](#22-全局唯一性保证)
- [23. 时序一致性](#23-时序一致性)
- [24. 冲突检测机制](#24-冲突检测机制)
- [25. 序列号存储方案](#25-序列号存储方案)
- [26. 过期清理策略](#26-过期清理策略)
- [27. 分布式序列号](#27-分布式序列号)
- [28. 序列号回溯](#28-序列号回溯)
- [29. 性能影响评估](#29-性能影响评估)
- [30. 监控告警机制](#30-监控告警机制)

### 四、幂等处理机制

- [31. 幂等性概念](#31-幂等性概念)
- [32. 幂等键设计](#32-幂等键设计)
- [33. 去重策略](#33-去重策略)
- [34. 状态机设计](#34-状态机设计)
- [35. 乐观锁机制](#35-乐观锁机制)
- [36. 悲观锁机制](#36-悲观锁机制)
- [37. 分布式锁](#37-分布式锁)
- [38. 事务补偿](#38-事务补偿)
- [39. 重试机制](#39-重试机制)
- [40. 幂等验证测试](#40-幂等验证测试)

### 五、ACK 确认机制

- [41. ACK 机制原理](#41-ack-机制原理)
- [42. 确认超时处理](#42-确认超时处理)
- [43. 重试策略设计](#43-重试策略设计)
- [44. 消息确认状态](#44-消息确认状态)
- [45. 死信队列](#45-死信队列)
- [46. 补偿机制](#46-补偿机制)
- [47. 最终一致性](#47-最终一致性)
- [48. 顺序保证](#48-顺序保证)
- [49. 流量控制](#49-流量控制)
- [50. 监控指标](#50-监控指标)

### 六、医疗业务场景

- [51. 处方流转架构](#51-处方流转架构)
- [52. 库存预扣减](#52-库存预扣减)
- [53. 收费系统集成](#53-收费系统集成)
- [54. 药房系统对接](#54-药房系统对接)
- [55. LIS 系统通信](#55-lis-系统通信)
- [56. PACS 影像传输](#56-pacs-影像传输)
- [57. 电子病历同步](#57-电子病历同步)
- [58. 医嘱执行流程](#58-医嘱执行流程)
- [59. 患者信息同步](#59-患者信息同步)
- [60. 报表数据汇总](#60-报表数据汇总)

### 七、数据一致性保障

- [61. 强一致性方案](#61-强一致性方案)
- [62. 最终一致性](#62-最终一致性)
- [63. CAP 定理应用](#63-cap-定理应用)
- [64. BASE 理论](#64-base-理论)
- [65. 两阶段提交](#65-两阶段提交)
- [66. TCC 事务](#66-tcc-事务)
- [67. Saga 模式](#67-saga-模式)
- [68. 本地消息表](#68-本地消息表)
- [69. 消息队列保证](#69-消息队列保证)
- [70. 数据对账机制](#70-数据对账机制)

### 八、性能优化

- [71. 通信性能优化](#71-通信性能优化)
- [72. 消息批量处理](#72-消息批量处理)
- [73. 缓存策略](#73-缓存策略)
- [74. 连接池优化](#74-连接池优化)
- [75. 数据压缩](#75-数据压缩)
- [76. 延迟优化](#76-延迟优化)
- [77. 吞吐量提升](#77-吞吐量提升)
- [78. 内存管理](#78-内存管理)
- [79. CPU 优化](#79-cpu-优化)
- [80. 性能基准测试](#80-性能基准测试)

### 九、安全与容错

- [81. 消息加密](#81-消息加密)
- [82. 身份认证](#82-身份认证)
- [83. 权限控制](#83-权限控制)
- [84. 数据脱敏](#84-数据脱敏)
- [85. 审计日志](#85-审计日志)
- [86. 防重放攻击](#86-防重放攻击)
- [87. 异常处理](#87-异常处理)
- [88. 降级策略](#88-降级策略)
- [89. 熔断机制](#89-熔断机制)
- [90. 灾备方案](#90-灾备方案)

### 十、监控与运维

- [91. 全链路追踪](#91-全链路追踪)
- [92. 消息追踪](#92-消息追踪)
- [93. 性能监控](#93-性能监控)
- [94. 告警机制](#94-告警机制)
- [95. 日志收集](#95-日志收集)
- [96. 健康检查](#96-健康检查)
- [97. 自动化运维](#97-自动化运维)
- [98. 灰度发布](#98-灰度发布)
- [99. 回滚策略](#99-回滚策略)
- [100. 容量规划](#100-容量规划)

### 十一、实战案例

- [101. 收费药房通信](#101-收费药房通信)
- [102. 处方流转实战](#102-处方流转实战)
- [103. 库存同步方案](#103-库存同步方案)
- [104. LIS 检验对接](#104-lis-检验对接)
- [105. PACS 影像调阅](#105-pacs-影像调阅)
- [106. 多系统协同](#106-多系统协同)
- [107. 高并发场景](#107-高并发场景)
- [108. 故障排查案例](#108-故障排查案例)
- [109. 性能调优实战](#109-性能调优实战)
- [110. 迁移升级方案](#110-迁移升级方案)

### 十二、进阶提升

- [111. 架构设计思维](#111-架构设计思维)
- [112. 技术选型能力](#112-技术选型能力)
- [113. 性能调优经验](#113-性能调优经验)
- [114. 故障排查能力](#114-故障排查能力)
- [115. 团队协作规范](#115-团队协作规范)
- [116. 文档体系建设](#116-文档体系建设)
- [117. 知识传承](#117-知识传承)
- [118. 技术创新](#118-技术创新)
- [119. 行业最佳实践](#119-行业最佳实践)
- [120. 未来发展趋势](#120-未来发展趋势)

---

## 一、微前端基础架构

### 1. 微前端核心概念

**回答要点：**

**核心定义：**

- 将大型前端应用拆分为多个独立开发、独立部署的子应用
- 每个子应用可以独立运行，也可以组合运行
- 技术栈无关，团队自治

**核心价值：**

```
✅ 技术栈无关：不同子应用可以使用不同框架
✅ 独立部署：子应用独立开发、测试、部署
✅ 增量升级：逐步迁移，降低风险
✅ 团队自治：各团队独立开发，互不干扰
✅ 代码隔离：避免全局污染
```

### 2. 架构选型对比

**回答要点：**

**主流方案对比：**
| 方案 | 隔离性 | 性能 | 复杂度 | 适用场景 |
|------|--------|------|--------|----------|
| qiankun | 强 | 高 | 中 | 多技术栈、大规模 |
| Module Federation | 中 | 高 | 高 | Webpack 生态、深度集成 |
| iframe | 最强 | 低 | 低 | 强隔离、遗留系统 |
| Web Components | 中 | 高 | 中 | 组件级复用 |
| Single-SPA | 中 | 高 | 中 | 轻量级微前端 |

### 3. qiankun 原理

**回答要点：**

**核心机制：**

```javascript
// 1. JS 沙箱隔离
class ProxySandbox {
  constructor() {
    this.proxy = new Proxy(window, {
      get(target, key) {
        return this.fakeWindow[key] || target[key]
      },
      set(target, key, value) {
        this.fakeWindow[key] = value
        return true
      },
    })
  }
}

// 2. CSS 隔离
// - Shadow DOM
// - 动态样式表
// - CSS 命名空间

// 3. 生命周期管理
// - bootstrap
// - mount
// - unmount
```

### 11. 三层通信架构

**回答要点：**

**架构设计：**

```
┌──────────────────────────────────────┐
│          主应用 (基座)                 │
│  ┌──────────────────────────────┐    │
│  │   第一层：Props 透传          │    │
│  │   - 父子组件通信              │    │
│  │   - 初始化数据传递            │    │
│  │   - 同步调用                  │    │
│  └──────────────────────────────┘    │
│  ┌──────────────────────────────┐    │
│  │   第二层：全局事件总线         │    │
│  │   - 兄弟组件通信              │    │
│  │   - 异步消息传递              │    │
│  │   - 发布/订阅模式             │    │
│  └──────────────────────────────┘    │
│  ┌──────────────────────────────┐    │
│  │   第三层：WebSocket 实时通信   │    │
│  │   - 跨系统通信                │    │
│  │   - 实时数据同步              │    │
│  │   - 长连接保持                │    │
│  └──────────────────────────────┘    │
└──────────────────────────────────────┘
```

**使用场景：**

```
Props 透传：
  - 主应用 → 子应用初始化配置
  - 用户信息、权限配置
  - 全局状态注入

全局事件总线：
  - 子应用 A ↔ 子应用 B
  - 业务事件通知
  - 状态变更广播

WebSocket：
  - 处方流转（收费 → 药房）
  - 库存预扣减实时同步
  - LIS/PACS 检验检查报告推送
  - 多系统实时协作
```

### 12. Props 透传机制

**回答要点：**

**实现方案：**

```typescript
// 主应用
import { registerMicroApps, start } from 'qiankun'

registerMicroApps([
  {
    name: 'charge-app',
    entry: '//localhost:8001',
    container: '#charge-container',
    activeRule: '/charge',
    props: {
      userInfo: getCurrentUser(),
      permissions: getUserPermissions(),
      globalConfig: getGlobalConfig(),
      // 通信方法
      onPrescriptionCreated: handlePrescription,
      emitEvent: (event, data) => EventBus.emit(event, data),
    },
  },
])

// 子应用接收
export async function mount(props: any) {
  const { userInfo, permissions, onPrescriptionCreated } = props

  // 使用透传的 props
  renderApp(userInfo, permissions)

  // 调用主应用方法
  onPrescriptionCreated(prescriptionData)
}
```

**优势：**

- ✅ 类型安全（TypeScript）
- ✅ 初始化数据传递
- ✅ 方法注入
- ✅ 简单易用

**局限：**

- ❌ 只能父子通信
- ❌ 不适合频繁更新
- ❌ 跨层级传递复杂

### 13. 全局事件总线

**回答要点：**

**实现方案：**

```typescript
// EventBus 实现
class EventBus {
  private events: Map<string, Set<Function>> = new Map()
  private messageLog: Map<string, MessageRecord> = new Map()

  on(event: string, callback: Function) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set())
    }
    this.events.get(event)!.add(callback)

    return () => this.off(event, callback)
  }

  off(event: string, callback: Function) {
    this.events.get(event)?.delete(callback)
  }

  emit(event: string, data: any) {
    const messageId = this.generateMessageId()
    const timestamp = Date.now()

    // 记录消息
    this.messageLog.set(messageId, {
      event,
      data,
      timestamp,
      status: 'pending',
    })

    // 触发事件
    const callbacks = this.events.get(event)
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data, messageId)
        } catch (error) {
          console.error(`Event handler error: ${event}`, error)
        }
      })
    }

    return messageId
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}

export const EventBus = new EventBus()
```

**使用示例：**

```typescript
// 收费系统 - 发射事件
EventBus.emit('prescription.created', {
  prescriptionId: 'RX20240101001',
  patientId: 'P001',
  medicines: [
    { drugId: 'D001', quantity: 2 },
    { drugId: 'D002', quantity: 1 },
  ],
  totalAmount: 156.5,
})

// 药房系统 - 监听事件
EventBus.on('prescription.created', async (data, messageId) => {
  // 1. 库存预扣减
  await reserveStock(data.medicines)

  // 2. 发送 ACK
  EventBus.emit('prescription.ack', {
    messageId,
    status: 'success',
    prescriptionId: data.prescriptionId,
  })
})
```

### 14. WebSocket 实时通信

**回答要点：**

**实现方案：**

```typescript
class WebSocketManager {
  private ws: WebSocket | null = null
  private reconnectTimer: number | null = null
  private messageQueue: MessageRecord[] = []
  private pendingAcks: Map<string, PendingMessage> = new Map()
  private sequenceNumber: number = 0

  constructor(url: string) {
    this.connect(url)
  }

  private connect(url: string) {
    this.ws = new WebSocket(url)

    this.ws.onopen = () => {
      console.log('WebSocket connected')
      this.flushMessageQueue()
    }

    this.ws.onmessage = event => {
      const message = JSON.parse(event.data)
      this.handleMessage(message)
    }

    this.ws.onclose = () => {
      console.log('WebSocket closed, reconnecting...')
      this.reconnect(url)
    }

    this.ws.onerror = error => {
      console.error('WebSocket error:', error)
    }
  }

  send(message: Message) {
    const seq = ++this.sequenceNumber
    const envelope = {
      seq,
      type: message.type,
      data: message.data,
      timestamp: Date.now(),
      idempotentKey: this.generateIdempotentKey(message),
    }

    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(envelope))
      this.waitForAck(seq, envelope)
    } else {
      this.messageQueue.push(envelope)
    }
  }

  private waitForAck(seq: number, envelope: any) {
    const timeout = setTimeout(() => {
      if (this.pendingAcks.has(seq.toString())) {
        console.warn(`Message ${seq} ACK timeout, retrying...`)
        this.pendingAcks.delete(seq.toString())
        this.send(envelope.data)
      }
    }, 5000)

    this.pendingAcks.set(seq.toString(), { envelope, timeout })
  }

  private handleMessage(message: any) {
    if (message.type === 'ack') {
      const pending = this.pendingAcks.get(message.seq?.toString())
      if (pending) {
        clearTimeout(pending.timeout)
        this.pendingAcks.delete(message.seq.toString())
      }
    } else if (message.type === 'prescription') {
      // 处理处方消息
      this.handlePrescription(message)
    }
  }

  private generateIdempotentKey(message: any): string {
    return `idempotent_${message.type}_${message.data.prescriptionId}_${Date.now()}`
  }

  private reconnect(url: string) {
    this.reconnectTimer = window.setTimeout(() => {
      this.connect(url)
    }, 3000)
  }

  private flushMessageQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()
      this.ws?.send(JSON.stringify(message))
    }
  }
}
```

---

## 二、通信方案设计

### 15. 通信方案选择

**回答要点：**

**选择策略：**

```typescript
interface CommunicationStrategy {
  // 同步/异步
  sync: boolean

  // 通信范围
  scope: 'parent-child' | 'sibling' | 'cross-app'

  // 实时性要求
  realTime: boolean

  // 数据量
  dataSize: 'small' | 'medium' | 'large'

  // 可靠性要求
  reliability: 'best-effort' | 'at-least-once' | 'exactly-once'
}

// 决策矩阵
function selectStrategy(requirements: CommunicationStrategy): string {
  if (requirements.scope === 'parent-child' && requirements.sync) {
    return 'props'
  }

  if (requirements.scope === 'sibling' && !requirements.realTime) {
    return 'event-bus'
  }

  if (requirements.realTime || requirements.scope === 'cross-app') {
    return 'websocket'
  }

  return 'event-bus'
}
```

### 17. 类型安全保障

**回答要点：**

**TypeScript 类型定义：**

```typescript
// 消息类型定义
interface BaseMessage<T = any> {
  id: string
  type: string
  data: T
  timestamp: number
  source: string
  target?: string
  idempotentKey: string
  seq?: number
}

// 处方消息
interface PrescriptionMessage extends BaseMessage<PrescriptionData> {
  type: 'prescription.created' | 'prescription.updated' | 'prescription.cancelled'
}

interface PrescriptionData {
  prescriptionId: string
  patientId: string
  doctorId: string
  medicines: MedicineItem[]
  totalAmount: number
  status: 'pending' | 'confirmed' | 'dispensed' | 'cancelled'
}

// 库存消息
interface StockMessage extends BaseMessage<StockData> {
  type: 'stock.reserved' | 'stock.released' | 'stock.deducted'
}

interface StockData {
  drugId: string
  quantity: number
  prescriptionId: string
  warehouseId: string
}

// 事件总线类型安全
type EventMap = {
  'prescription.created': PrescriptionMessage
  'prescription.updated': PrescriptionMessage
  'stock.reserved': StockMessage
  'stock.deducted': StockMessage
  // ... 更多事件
}

class TypedEventBus {
  on<K extends keyof EventMap>(event: K, callback: (data: EventMap[K]) => void): () => void {
    // 实现...
  }

  emit<K extends keyof EventMap>(event: K, data: EventMap[K]): string {
    // 实现...
  }
}
```

---

## 三、消息序列号设计

### 21. 序列号生成策略

**回答要点：**

**生成策略：**

```typescript
// 方案 1：时间戳 + 随机数
function generateSequenceV1(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substr(2, 9)
  return `${timestamp}_${random}`
}

// 方案 2：Snowflake 算法
class SnowflakeGenerator {
  private workerId: number
  private sequence: number = 0
  private lastTimestamp: number = 0

  constructor(workerId: number) {
    this.workerId = workerId
  }

  nextId(): string {
    let timestamp = Date.now()

    if (timestamp < this.lastTimestamp) {
      throw new Error('Clock moved backwards')
    }

    if (timestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + 1) & 4095
      if (this.sequence === 0) {
        timestamp = this.waitNextMillis()
      }
    } else {
      this.sequence = 0
    }

    this.lastTimestamp = timestamp

    // 组合：时间戳 + 工作机器ID + 序列号
    return (
      ((timestamp - 1288834974657n) << 22n) |
      (BigInt(this.workerId) << 12n) |
      BigInt(this.sequence)
    ).toString()
  }

  private waitNextMillis(): number {
    let timestamp = Date.now()
    while (timestamp <= this.lastTimestamp) {
      timestamp = Date.now()
    }
    return timestamp
  }
}

// 方案 3：ULID (Universally Unique Lexicographically Sortable Identifier)
import { ulid } from 'ulid'

function generateULID(): string {
  return ulid() // 按时间排序的唯一 ID
}
```

### 23. 时序一致性

**回答要点：**

**保证策略：**

```typescript
class MessageOrderManager {
  private buffer: Map<string, MessageRecord> = new Map()
  private expectedSeq: number = 1

  receive(message: MessageRecord) {
    if (message.seq === this.expectedSeq) {
      // 顺序正确，直接处理
      this.processMessage(message)
      this.expectedSeq++
      this.flushBuffer()
    } else if (message.seq > this.expectedSeq) {
      // 消息乱序，缓存等待
      this.buffer.set(message.seq.toString(), message)
      this.startTimeout(message.seq)
    } else {
      // 重复或过期消息，丢弃
      console.warn(`Duplicate or expired message: ${message.seq}`)
    }
  }

  private flushBuffer() {
    while (this.buffer.has(this.expectedSeq.toString())) {
      const message = this.buffer.get(this.expectedSeq.toString())!
      this.buffer.delete(this.expectedSeq.toString())
      this.processMessage(message)
      this.expectedSeq++
    }
  }

  private startTimeout(seq: number) {
    setTimeout(() => {
      if (this.buffer.has(seq.toString())) {
        console.warn(`Message timeout: expected ${this.expectedSeq}, got ${seq}`)
        this.expectedSeq = seq
        this.flushBuffer()
      }
    }, 5000)
  }
}
```

---

## 四、幂等处理机制

### 31. 幂等性概念

**回答要点：**

**核心定义：**

- 同一操作执行一次和执行多次的结果相同
- 防止重复执行导致数据不一致

**医疗场景示例：**

```
❌ 非幂等：
处方扣减库存：
  第 1 次：库存 100 → 98 (扣减 2)
  第 2 次：库存 98 → 96 (再次扣减 2) ❌

✅ 幂等：
处方扣减库存：
  第 1 次：库存 100 → 98 (扣减 2)
  第 2 次：检测到已处理，跳过 ✅
```

### 32. 幂等键设计

**回答要点：**

**设计策略：**

```typescript
// 幂等键生成
function generateIdempotentKey(message: Message): string {
  // 方案 1：业务唯一键
  return `prescription_${message.data.prescriptionId}`

  // 方案 2：业务键 + 操作类型
  return `${message.type}_${message.data.prescriptionId}`

  // 方案 3：完整哈希
  const hash = createHash('sha256')
    .update(
      JSON.stringify({
        type: message.type,
        prescriptionId: message.data.prescriptionId,
        action: message.data.action,
      })
    )
    .digest('hex')

  return hash
}

// 幂等存储
class IdempotentStore {
  private store: Map<string, IdempotentRecord> = new Map()

  async checkAndSet(key: string, data: any): Promise<boolean> {
    if (this.store.has(key)) {
      const record = this.store.get(key)!
      console.log(`Duplicate request: ${key}, returning cached result`)
      return false // 已处理
    }

    this.store.set(key, {
      key,
      data,
      timestamp: Date.now(),
      status: 'processing',
    })

    return true // 首次处理
  }

  async complete(key: string, result: any) {
    const record = this.store.get(key)
    if (record) {
      record.status = 'completed'
      record.result = result
    }
  }
}
```

### 34. 状态机设计

**回答要点：**

**处方流转状态机：**

```typescript
enum PrescriptionStatus {
  CREATED = 'created', // 已创建
  SUBMITTED = 'submitted', // 已提交
  CHARGE_PENDING = 'charge_pending', // 待收费
  CHARGED = 'charged', // 已收费
  STOCK_RESERVED = 'stock_reserved', // 库存已预扣
  DISPENSING = 'dispensing', // 配药中
  DISPENSED = 'dispensed', // 已发药
  COMPLETED = 'completed', // 已完成
  CANCELLED = 'cancelled', // 已取消
}

type TransitionRule = {
  from: PrescriptionStatus
  to: PrescriptionStatus
  action: string
  validate?: (data: any) => boolean
}

const transitionRules: TransitionRule[] = [
  { from: PrescriptionStatus.CREATED, to: PrescriptionStatus.SUBMITTED, action: 'submit' },
  {
    from: PrescriptionStatus.SUBMITTED,
    to: PrescriptionStatus.CHARGE_PENDING,
    action: 'create_charge',
  },
  { from: PrescriptionStatus.CHARGE_PENDING, to: PrescriptionStatus.CHARGED, action: 'pay' },
  {
    from: PrescriptionStatus.CHARGED,
    to: PrescriptionStatus.STOCK_RESERVED,
    action: 'reserve_stock',
  },
  {
    from: PrescriptionStatus.STOCK_RESERVED,
    to: PrescriptionStatus.DISPENSING,
    action: 'start_dispense',
  },
  {
    from: PrescriptionStatus.DISPENSING,
    to: PrescriptionStatus.DISPENSED,
    action: 'finish_dispense',
  },
  { from: PrescriptionStatus.DISPENSED, to: PrescriptionStatus.COMPLETED, action: 'complete' },
  // 取消规则（任意状态可取消）
  { from: PrescriptionStatus.CREATED, to: PrescriptionStatus.CANCELLED, action: 'cancel' },
  { from: PrescriptionStatus.SUBMITTED, to: PrescriptionStatus.CANCELLED, action: 'cancel' },
  // ... 更多规则
]

class PrescriptionStateMachine {
  private currentState: PrescriptionStatus

  constructor(initialState: PrescriptionStatus) {
    this.currentState = initialState
  }

  transition(action: string, data: any): boolean {
    const rule = transitionRules.find(r => r.from === this.currentState && r.action === action)

    if (!rule) {
      console.error(`Invalid transition: ${this.currentState} -> ${action}`)
      return false
    }

    if (rule.validate && !rule.validate(data)) {
      console.error('Validation failed')
      return false
    }

    this.currentState = rule.to
    return true
  }
}
```

---

## 五、ACK 确认机制

### 41. ACK 机制原理

**回答要点：**

**ACK 流程：**

```
发送方                        接收方
  |                            |
  |--- 1. 发送消息 (seq=100) -->|
  |                            |
  |                            |-- 2. 处理消息
  |                            |
  |<-- 3. 返回 ACK (seq=100) --|
  |                            |
  |-- 4. 标记消息已确认         |
  |                            |

如果超时未收到 ACK：
  |                            |
  |--- 5. 重发消息 (seq=100) -->|
  |                            |
  |                            |-- 6. 幂等检查（已处理）
  |<-- 7. 返回 ACK (seq=100) --|
```

**实现代码：**

```typescript
class AckManager {
  private pendingMessages: Map<string, PendingMessage> = new Map()
  private maxRetries: number = 3
  private ackTimeout: number = 5000 // 5秒

  sendMessage(message: Message): Promise<void> {
    return new Promise((resolve, reject) => {
      const pending: PendingMessage = {
        message,
        retries: 0,
        resolve,
        reject,
        timer: null,
      }

      this.pendingMessages.set(message.id, pending)
      this.sendWithRetry(message.id)
    })
  }

  private sendWithRetry(messageId: string) {
    const pending = this.pendingMessages.get(messageId)
    if (!pending) return

    pending.timer = setTimeout(() => {
      if (pending.retries < this.maxRetries) {
        pending.retries++
        console.warn(`Retrying message ${messageId}, attempt ${pending.retries}`)
        this.send(pending.message)
        this.sendWithRetry(messageId)
      } else {
        // 超过最大重试次数
        this.pendingMessages.delete(messageId)
        pending.reject(
          new Error(`Message ${messageId} ack timeout after ${this.maxRetries} retries`)
        )

        // 移入死信队列
        DeadLetterQueue.add(pending.message)
      }
    }, this.ackTimeout)
  }

  receiveAck(messageId: string) {
    const pending = this.pendingMessages.get(messageId)
    if (pending) {
      clearTimeout(pending.timer)
      this.pendingMessages.delete(messageId)
      pending.resolve()
    }
  }
}
```

### 45. 死信队列

**回答要点：**

**死信队列处理：**

```typescript
class DeadLetterQueue {
  private queue: DeadLetterMessage[] = []
  private retryTimers: Map<string, NodeJS.Timeout> = new Map()

  static add(message: Message) {
    const dlqMessage: DeadLetterMessage = {
      message,
      originalTimestamp: Date.now(),
      retryCount: 0,
      maxRetries: 5,
      reason: 'ack_timeout',
    }

    this.queue.push(dlqMessage)
    this.scheduleRetry(dlqMessage)
  }

  private static scheduleRetry(dlqMessage: DeadLetterMessage) {
    const delay = Math.pow(2, dlqMessage.retryCount) * 1000 // 指数退避

    const timer = setTimeout(async () => {
      try {
        await this.retry(dlqMessage)
      } catch (error) {
        dlqMessage.retryCount++
        dlqMessage.lastError = error

        if (dlqMessage.retryCount < dlqMessage.maxRetries) {
          this.scheduleRetry(dlqMessage)
        } else {
          // 超过最大重试次数，记录告警
          this.alert(dlqMessage)
        }
      }
    }, delay)

    this.retryTimers.set(dlqMessage.message.id, timer)
  }

  private static async retry(dlqMessage: DeadLetterMessage) {
    console.log(`Retrying dead letter message: ${dlqMessage.message.id}`)
    await MessageBus.send(dlqMessage.message)
  }

  private static alert(dlqMessage: DeadLetterMessage) {
    console.error('Dead letter message permanently failed:', {
      messageId: dlqMessage.message.id,
      reason: dlqMessage.reason,
      retryCount: dlqMessage.retryCount,
      lastError: dlqMessage.lastError,
    })

    // 发送告警通知
    AlertService.send({
      level: 'critical',
      message: `Message ${dlqMessage.message.id} permanently failed`,
      data: dlqMessage,
    })
  }
}
```

---

## 六、医疗业务场景

### 51. 处方流转架构

**回答要点：**

**完整流程：**

```
医生工作站                    收费系统                    药房系统
    |                          |                          |
    |-- 1. 开具处方 -----------|                          |
    |                          |                          |
    |                          |-- 2. 接收处方 -----------|
    |                          |-- 生成收费单             |
    |                          |                          |
    |                          |-- 3. 患者缴费 -----------|
    |                          |                          |
    |                          |-- 4. 缴费成功事件 ------>|
    |                          |                          |-- 5. 库存预扣减
    |                          |                          |-- 6. 开始配药
    |                          |                          |
    |                          |<-- 7. 配药完成事件 -------|
    |                          |                          |
    |<-- 8. 通知取药 -----------|                          |
    |                          |                          |
```

**实现代码：**

```typescript
// 收费系统
class ChargeSystem {
  async processPayment(prescriptionId: string, amount: number) {
    // 1. 处理支付
    const paymentResult = await PaymentService.pay(amount)

    if (paymentResult.success) {
      // 2. 发送处方已收费事件
      EventBus.emit(
        'prescription.charged',
        {
          prescriptionId,
          paymentId: paymentResult.paymentId,
          amount,
          timestamp: Date.now(),
        },
        {
          requireAck: true,
          timeout: 10000,
        }
      )

      // 3. 更新处方状态
      await PrescriptionService.updateStatus(prescriptionId, 'charged')
    }
  }
}

// 药房系统
class PharmacySystem {
  constructor() {
    EventBus.on('prescription.charged', async (data, messageId) => {
      try {
        // 1. 幂等检查
        if (await this.isProcessed(messageId)) {
          EventBus.emit('ack', { messageId })
          return
        }

        // 2. 库存预扣减
        const stockResult = await StockService.reserveStock(data.prescriptionId)

        if (!stockResult.success) {
          throw new Error('Stock reservation failed')
        }

        // 3. 更新处方状态
        await PrescriptionService.updateStatus(data.prescriptionId, 'stock_reserved')

        // 4. 发送 ACK
        EventBus.emit('ack', {
          messageId,
          status: 'success',
          prescriptionId: data.prescriptionId,
        })

        // 5. 开始配药流程
        this.startDispensing(data.prescriptionId)
      } catch (error) {
        console.error('Process prescription charged error:', error)

        // 发送失败 ACK
        EventBus.emit('ack', {
          messageId,
          status: 'failed',
          error: error.message,
        })
      }
    })
  }
}
```

### 52. 库存预扣减

**回答要点：**

**实现方案：**

```typescript
class StockService {
  async reserveStock(prescriptionId: string): Promise<StockResult> {
    // 1. 获取处方药品清单
    const prescription = await PrescriptionService.get(prescriptionId)

    // 2. 检查库存（使用分布式锁）
    const lock = await DistributedLock.acquire(`stock_${prescriptionId}`)

    try {
      // 3. 批量预扣减
      const reserveResults = await Promise.all(
        prescription.medicines.map(async medicine => {
          return await this.reserveSingleMedicine(
            medicine.drugId,
            medicine.quantity,
            prescriptionId
          )
        })
      )

      // 4. 检查是否全部成功
      const allSuccess = reserveResults.every(r => r.success)

      if (!allSuccess) {
        // 回滚已预扣减的库存
        await this.rollbackReserves(prescriptionId)
        throw new Error('Insufficient stock')
      }

      // 5. 记录预扣减日志
      await StockLogService.create({
        prescriptionId,
        type: 'reserve',
        medicines: prescription.medicines,
        timestamp: Date.now(),
      })

      return { success: true, prescriptionId }
    } finally {
      await lock.release()
    }
  }

  private async reserveSingleMedicine(
    drugId: string,
    quantity: number,
    prescriptionId: string
  ): Promise<ReserveResult> {
    // 使用数据库事务 + 乐观锁
    await db.transaction(async tx => {
      const stock = await tx.Stock.findOne({
        where: { drugId },
        lock: true, // 行级锁
      })

      if (stock.availableQuantity < quantity) {
        throw new Error(`Insufficient stock for ${drugId}`)
      }

      // 预扣减
      stock.availableQuantity -= quantity
      stock.reservedQuantity += quantity
      await stock.save()

      // 记录预扣减明细
      await tx.StockReserve.create({
        drugId,
        quantity,
        prescriptionId,
        status: 'reserved',
      })
    })

    return { success: true, drugId }
  }
}
```

---

## 七、数据一致性保障

### 61. 强一致性方案

**回答要点：**

**实现策略：**

```typescript
// 两阶段提交 (2PC)
class TwoPhaseCommit {
  async execute(transaction: Transaction) {
    const participants = transaction.participants

    // Phase 1: Prepare
    const prepareResults = await Promise.all(
      participants.map(async p => {
        try {
          await p.prepare(transaction)
          return { participant: p, status: 'prepared' }
        } catch (error) {
          return { participant: p, status: 'failed', error }
        }
      })
    )

    const allPrepared = prepareResults.every(r => r.status === 'prepared')

    // Phase 2: Commit or Rollback
    if (allPrepared) {
      // 提交
      await Promise.all(participants.map(p => p.commit(transaction)))
    } else {
      // 回滚
      await Promise.all(participants.map(p => p.rollback(transaction)))
      throw new Error('Transaction prepare failed')
    }
  }
}

// 使用示例
const transaction = {
  id: 'tx_001',
  participants: [ChargeService, StockService, PrescriptionService],
  data: { prescriptionId: 'RX001' },
}

await TwoPhaseCommit.execute(transaction)
```

### 68. 本地消息表

**回答要点：**

**实现方案：**

```typescript
class LocalMessageTable {
  // 业务操作和消息发送在同一事务
  async executeWithMessage(businessFn: Function, message: Message) {
    await db.transaction(async tx => {
      // 1. 执行业务逻辑
      await businessFn(tx)

      // 2. 保存消息到本地消息表
      await tx.LocalMessage.create({
        messageId: message.id,
        type: message.type,
        data: message.data,
        status: 'pending',
        retryCount: 0,
        createdAt: new Date(),
      })
    })

    // 3. 异步发送消息（事务外）
    this.asyncSendMessage(message.id)
  }

  private async asyncSendMessage(messageId: string) {
    const message = await LocalMessage.findOne({ messageId })

    try {
      await EventBus.emit(message.type, message.data)
      message.status = 'sent'
      await message.save()
    } catch (error) {
      message.status = 'failed'
      message.lastError = error.message
      await message.save()

      // 重试
      if (message.retryCount < 3) {
        message.retryCount++
        await message.save()
        setTimeout(() => this.asyncSendMessage(messageId), 5000)
      }
    }
  }
}

// 使用示例
await LocalMessageTable.executeWithMessage(
  async tx => {
    // 收费业务逻辑
    await ChargeService.charge(prescriptionId, amount, tx)
  },
  {
    id: generateMessageId(),
    type: 'prescription.charged',
    data: { prescriptionId, amount },
  }
)
```

---

## 八、性能优化

### 71. 通信性能优化

**回答要点：**

**优化策略：**

```typescript
// 1. 消息批量处理
class BatchProcessor {
  private buffer: Message[] = []
  private batchSize: number = 100
  private batchTimeout: number = 100 // 100ms

  add(message: Message) {
    this.buffer.push(message)

    if (this.buffer.length >= this.batchSize) {
      this.flush()
    } else {
      this.scheduleFlush()
    }
  }

  private flush() {
    if (this.buffer.length === 0) return

    const batch = this.buffer.splice(0, this.batchSize)
    EventBus.emitBatch(batch)
  }

  private scheduleFlush() {
    setTimeout(() => this.flush(), this.batchTimeout)
  }
}

// 2. 消息压缩
class MessageCompressor {
  compress(message: Message): CompressedMessage {
    const json = JSON.stringify(message)
    const compressed = pako.deflate(json)

    return {
      ...message,
      data: Buffer.from(compressed).toString('base64'),
      compressed: true,
    }
  }

  decompress(message: CompressedMessage): Message {
    if (!message.compressed) return message as Message

    const buffer = Buffer.from(message.data, 'base64')
    const decompressed = pako.inflate(buffer)

    return {
      ...message,
      data: JSON.parse(new TextDecoder().decode(decompressed)),
      compressed: false,
    }
  }
}

// 3. 连接池优化
class WebSocketPool {
  private pool: WebSocket[] = []
  private maxSize: number = 10

  getConnection(): WebSocket {
    const available = this.pool.find(ws => ws.readyState === WebSocket.OPEN)

    if (available) return available

    if (this.pool.length < this.maxSize) {
      const ws = new WebSocket(this.url)
      this.pool.push(ws)
      return ws
    }

    // 等待空闲连接
    return new Promise(resolve => {
      const checkInterval = setInterval(() => {
        const conn = this.pool.find(ws => ws.readyState === WebSocket.OPEN)
        if (conn) {
          clearInterval(checkInterval)
          resolve(conn)
        }
      }, 100)
    })
  }
}
```

---

## 九、安全与容错

### 81. 消息加密

**回答要点：**

**加密方案：**

```typescript
import CryptoJS from 'crypto-js'

class MessageEncryptor {
  private secretKey: string

  constructor(secretKey: string) {
    this.secretKey = secretKey
  }

  encrypt(message: Message): EncryptedMessage {
    const json = JSON.stringify(message)
    const encrypted = CryptoJS.AES.encrypt(json, this.secretKey).toString()

    return {
      ...message,
      data: encrypted,
      encrypted: true,
      algorithm: 'AES',
    }
  }

  decrypt(message: EncryptedMessage): Message {
    if (!message.encrypted) return message as Message

    const decrypted = CryptoJS.AES.decrypt(message.data, this.secretKey)
    const json = decrypted.toString(CryptoJS.enc.Utf8)

    return {
      ...message,
      data: JSON.parse(json),
      encrypted: false,
    }
  }
}

// 使用示例
const encryptor = new MessageEncryptor(process.env.ENCRYPTION_KEY)

// 发送前加密
const encryptedMessage = encryptor.encrypt({
  type: 'prescription.created',
  data: sensitiveData,
})

EventBus.emit('prescription.created', encryptedMessage)

// 接收后解密
EventBus.on('prescription.created', encryptedMessage => {
  const message = encryptor.decrypt(encryptedMessage)
  // 处理明文消息
})
```

---

## 十、实战案例

### 101. 收费药房通信

**回答要点：**

**完整案例：**

```typescript
// 场景：患者缴费成功后，药房系统需要实时扣减库存

// 收费系统
class ChargeApp {
  async completePayment(orderId: string) {
    // 1. 完成支付
    const result = await PaymentGateway.pay(orderId)

    if (result.success) {
      // 2. 发送缴费成功消息（带序列号和幂等键）
      const message = {
        id: generateMessageId(),
        seq: nextSequence(),
        type: 'payment.completed',
        data: {
          orderId,
          prescriptionId: result.prescriptionId,
          amount: result.amount,
          medicines: result.medicines,
        },
        idempotentKey: `payment_${orderId}`,
        timestamp: Date.now(),
        requireAck: true,
      }

      // 3. 通过 WebSocket 发送
      await WebSocketManager.send(message)

      // 4. 等待 ACK
      try {
        await AckManager.waitForAck(message.id, { timeout: 10000 })
        console.log('Payment notification acknowledged')
      } catch (error) {
        console.error('Payment notification ack timeout:', error)
        // 触发告警
        AlertService.send({
          level: 'warning',
          message: `Payment notification ack timeout: ${orderId}`,
        })
      }
    }
  }
}

// 药房系统
class PharmacyApp {
  constructor() {
    // 监听缴费成功事件
    WebSocketManager.on('payment.completed', async message => {
      const { id, data, idempotentKey } = message

      try {
        // 1. 幂等检查
        const isProcessed = await IdempotentStore.check(idempotentKey)
        if (isProcessed) {
          // 已处理，直接发送 ACK
          WebSocketManager.send({
            type: 'ack',
            seq: message.seq,
            data: { messageId: id, status: 'success' },
          })
          return
        }

        // 2. 库存预扣减
        await StockService.reserveStock(data.prescriptionId, data.medicines)

        // 3. 标记为已处理
        await IdempotentStore.complete(idempotentKey, { status: 'success' })

        // 4. 发送 ACK
        WebSocketManager.send({
          type: 'ack',
          seq: message.seq,
          data: { messageId: id, status: 'success' },
        })

        // 5. 开始配药流程
        this.startDispensing(data.prescriptionId)
      } catch (error) {
        console.error('Process payment completed error:', error)

        // 发送失败 ACK
        WebSocketManager.send({
          type: 'ack',
          seq: message.seq,
          data: {
            messageId: id,
            status: 'failed',
            error: error.message,
          },
        })

        // 移入死信队列
        DeadLetterQueue.add(message)
      }
    })
  }

  private async startDispensing(prescriptionId: string) {
    // 配药业务逻辑
    console.log(`Start dispensing for prescription: ${prescriptionId}`)
  }
}
```

### 108. 故障排查案例

**回答要点：**

**典型案例：**

```
问题：处方缴费后，药房库存未扣减

排查步骤：

1. 检查消息是否发送
   - 查看收费系统日志
   - 确认 WebSocket 连接状态
   - 检查消息序列号

2. 检查消息是否接收
   - 查看药房系统日志
   - 确认事件监听器是否注册
   - 检查消息处理耗时

3. 检查幂等逻辑
   - 查看幂等存储记录
   - 确认幂等键是否正确
   - 检查是否有重复消息

4. 检查 ACK 机制
   - 查看 ACK 是否发送
   - 确认 ACK 是否接收
   - 检查超时配置

5. 检查库存扣减逻辑
   - 查看数据库事务日志
   - 确认库存是否充足
   - 检查分布式锁状态

解决方案：
- 添加全链路追踪
- 完善日志记录
- 增加监控告警
- 优化重试机制
```

---

## 十一、进阶提升

### 111. 架构设计思维

**回答要点：**

**设计原则：**

```
1. 可靠性优先
   - 消息不丢失
   - 顺序有保证
   - 最终一致性

2. 可扩展性
   - 水平扩展
   - 插件化设计
   - 配置驱动

3. 可维护性
   - 清晰的分层
   - 完善的日志
   - 详细的文档

4. 可观测性
   - 全链路追踪
   - 实时监控
   - 告警机制

5. 安全性
   - 数据加密
   - 权限控制
   - 审计日志
```

---

## 总结

### 核心要点

**三层通信架构：**

```
Props 透传：父子通信、初始化配置
全局事件总线：兄弟通信、异步消息
WebSocket：跨系统通信、实时同步
```

**三大保障机制：**

```
消息序列号：保证顺序、去重
幂等处理：防止重复、数据一致
ACK 确认：可靠传输、超时重试
```

**医疗场景关键：**

```
处方流转：收费 → 药房 → 配药
库存预扣减：分布式锁 + 事务
数据一致性：最终一致性 + 对账
```
