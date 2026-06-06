# 性能优化与构建迁移面试题集

## 📑 快速导航目录

### 一、IntersectionObserver 懒加载

- [1. IntersectionObserver API](#1-intersectionobserver-api)
- [2. 区域懒加载原理](#2-区域懒加载原理)
- [3. 懒加载策略设计](#3-懒加载策略设计)
- [4. 图片懒加载实现](#4-图片懒加载实现)
- [5. 组件懒加载](#5-组件懒加载)
- [6. 路由懒加载](#6-路由懒加载)
- [7. 数据懒加载](#7-数据懒加载)
- [8. 性能监控](#8-性能监控)
- [9. 边界情况处理](#9-边界情况处理)
- [10. 兼容性方案](#10-兼容性方案)

### 二、虚拟滚动技术

- [11. 虚拟滚动原理](#11-虚拟滚动原理)
- [12. 固定高度实现](#12-固定高度实现)
- [13. 动态高度实现](#13-动态高度实现)
- [14. 不定高优化](#14-不定高优化)
- [15. 双向滚动](#15-双向滚动)
- [16. 滚动性能优化](#16-滚动性能优化)
- [17. 内存管理](#17-内存管理)
- [18. 复杂列表优化](#18-复杂列表优化)
- [19. 表格虚拟滚动](#19-表格虚拟滚动)
- [20. 瀑布流虚拟滚动](#20-瀑布流虚拟滚动)

### 三、数据 Diff 局部更新

- [21. Diff 算法原理](#21-diff-算法原理)
- [22. 数组 Diff](#22-数组-diff)
- [23. 对象 Diff](#23-对象-diff)
- [24. 局部更新策略](#24-局部更新策略)
- [25. 增量更新](#25-增量更新)
- [26. 状态管理优化](#26-状态管理优化)
- [27. 响应式优化](#27-响应式优化)
- [28. 批量更新](#28-批量更新)
- [29. 更新优先级](#29-更新优先级)
- [30. 性能对比分析](#30-性能对比分析)

### 四、FCP 优化

- [31. FCP 指标详解](#31-fcp-指标详解)
- [32. FCP 优化策略](#32-fcp-优化策略)
- [33. 关键渲染路径](#33-关键渲染路径)
- [34. 资源加载优化](#34-资源加载优化)
- [35. CSS 优化](#35-css-优化)
- [36. JavaScript 优化](#36-javascript-优化)
- [37. 字体优化](#37-字体优化)
- [38. 首屏优化](#38-首屏优化)
- [39. 预加载策略](#39-预加载策略)
- [40. 性能预算](#40-性能预算)

### 五、患者切换优化

- [41. 切换性能分析](#41-切换性能分析)
- [42. 状态清理优化](#42-状态清理优化)
- [43. 数据预加载](#43-数据预加载)
- [44. 缓存策略](#44-缓存策略)
- [45. 组件复用](#45-组件复用)
- [46. 内存优化](#46-内存优化)
- [47. 事件管理](#47-事件管理)
- [48. DOM 优化](#48-dom-优化)
- [49. 动画优化](#49-动画优化)
- [50. 性能监控](#50-性能监控)

### 六、Webpack 深度优化

- [51. Webpack 架构原理](#51-webpack-架构原理)
- [52. 打包优化策略](#52-打包优化策略)
- [53. 代码分割](#53-代码分割)
- [54. Tree Shaking](#54-tree-shaking)
- [55. 缓存优化](#55-缓存优化)
- [56. 构建速度优化](#56-构建速度优化)
- [57. 体积优化](#57-体积优化)
- [58. Loader 优化](#58-loader-优化)
- [59. Plugin 开发](#59-plugin-开发)
- [60. 多环境配置](#60-多环境配置)

### 七、Rsbuild 迁移

- [61. Rsbuild 核心优势](#61-rsbuild-核心优势)
- [62. Rspack 原理](#62-rspack-原理)
- [63. 迁移方案设计](#63-迁移方案设计)
- [64. 配置转换](#64-配置转换)
- [65. 插件兼容](#65-插件兼容)
- [66. Loader 迁移](#66-loader-迁移)
- [67. 渐进式迁移](#67-渐进式迁移)
- [68. 性能对比](#68-性能对比)
- [69. 问题排查](#69-问题排查)
- [70. 最佳实践](#70-最佳实践)

### 八、模块联邦

- [71. Module Federation 原理](#71-module-federation-原理)
- [72. Host 配置](#72-host-配置)
- [73. Remote 配置](#73-remote-配置)
- [74. 依赖共享策略](#74-依赖共享策略)
- [75. 版本管理](#75-版本管理)
- [76. 异步加载](#76-异步加载)
- [77. 类型安全](#77-类型安全)
- [78. 错误处理](#78-错误处理)
- [79. 性能优化](#79-性能优化)
- [80. 部署策略](#80-部署策略)

### 九、性能监控体系

- [81. Web Vitals 指标](#81-web-vitals-指标)
- [82. 性能采集](#82-性能采集)
- [83. 性能上报](#83-性能上报)
- [84. 性能分析工具](#84-性能分析工具)
- [85. Chrome DevTools](#85-chrome-devtools)
- [86. Lighthouse](#86-lighthouse)
- [87. 性能基线](#87-性能基线)
- [88. 告警机制](#88-告警机制)
- [89. 性能回归测试](#89-性能回归测试)
- [90. 持续优化](#90-持续优化)

### 十、渲染性能优化

- [91. 浏览器渲染管线](#91-浏览器渲染管线)
- [92. 重排重绘优化](#92-重排重绘优化)
- [93. 合成层优化](#93-合成层优化)
- [94. will-change 应用](#94-will-change-应用)
- [95. transform 优化](#95-transform-优化)
- [96. 防抖节流](#96-防抖节流)
- [97. requestAnimationFrame](#97-requestanimationframe)
- [98. Web Worker](#98-web-worker)
- [99. 内存泄漏排查](#99-内存泄漏排查)
- [100. 性能调优工具](#100-性能调优工具)

### 十一、实战案例

- [101. FCP 2.8s→1.2s 实战](#101-fcp-28s12s-实战)
- [102. 患者切换 1.2s→300ms](#102-患者切换-12s300ms)
- [103. 万级列表优化](#103-万级列表优化)
- [104. 医疗系统优化](#104-医疗系统优化)
- [105. Webpack→Rsbuild 迁移](#105-webpackrsbuild-迁移)
- [106. 模块联邦落地](#106-模块联邦落地)
- [107. 性能优化全流程](#107-性能优化全流程)
- [108. 故障排查案例](#108-故障排查案例)
- [109. 性能调优实战](#109-性能调优实战)
- [110. 监控体系建设](#110-监控体系建设)

### 十二、进阶提升

- [111. 性能优化思维](#111-性能优化思维)
- [112. 架构设计能力](#112-架构设计能力)
- [113. 技术选型能力](#113-技术选型能力)
- [114. 性能预算制定](#114-性能预算制定)
- [115. 团队规范建设](#115-团队规范建设)
- [116. 性能文化建设](#116-性能文化建设)
- [117. 技术分享经验](#117-技术分享经验)
- [118. 最佳实践总结](#118-最佳实践总结)
- [119. 行业趋势](#119-行业趋势)
- [120. 未来展望](#120-未来展望)

---

## 一、IntersectionObserver 懒加载

### 1. IntersectionObserver API

**回答要点：**

**核心概念：**

- 异步观察目标元素与祖先元素或顶级文档视窗的交叉状态
- 不阻塞主线程，性能优于 scroll 事件监听

**基本用法：**

```javascript
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 元素进入视口
        const target = entry.target
        loadContent(target)
        observer.unobserve(target)
      }
    })
  },
  {
    root: null, // 相对于视口
    rootMargin: '0px 0px 200px 0px', // 提前 200px 加载
    threshold: 0.1, // 10% 可见时触发
  }
)

// 观察元素
document.querySelectorAll('.lazy-item').forEach(item => {
  observer.observe(item)
})
```

### 2. 区域懒加载原理

**回答要点：**

**实现原理：**

```
┌─────────────────────────┐
│       可视区域           │
│  ┌───────────────────┐  │
│  │   提前加载区域     │  │ rootMargin
│  └───────────────────┘  │
│                         │
│    [目标元素] ← 观察     │
│                         │
└─────────────────────────┘

当元素进入 rootMargin 区域时触发加载
```

**医疗场景应用：**

```javascript
// 患者列表区域懒加载
class PatientListLazyLoader {
  constructor() {
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      root: document.getElementById('patient-list'),
      rootMargin: '500px', // 提前 500px 加载
      threshold: [0, 0.1, 0.5],
    })
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const section = entry.target
        this.loadSection(section)

        // 加载完成后取消观察
        this.observer.unobserve(section)
      }
    })
  }

  async loadSection(section) {
    const sectionId = section.dataset.sectionId

    // 显示加载状态
    section.classList.add('loading')

    try {
      // 异步加载数据
      const data = await fetchSectionData(sectionId)

      // 渲染内容
      this.renderSection(section, data)

      section.classList.remove('loading')
    } catch (error) {
      console.error('Load section failed:', error)
      section.classList.add('error')
    }
  }
}
```

### 3. 懒加载策略设计

**回答要点：**

**策略设计：**

```typescript
interface LazyLoadStrategy {
  // 触发时机
  trigger: 'visible' | 'near-visible' | 'idle'

  // 提前加载距离
  preloadDistance: number

  // 优先级
  priority: 'high' | 'medium' | 'low'

  // 并发控制
  maxConcurrent: number

  // 错误重试
  retryCount: number
  retryDelay: number
}

// 不同区域的不同策略
const strategies: Record<string, LazyLoadStrategy> = {
  'first-screen': {
    trigger: 'visible',
    preloadDistance: 0,
    priority: 'high',
    maxConcurrent: 3,
    retryCount: 2,
  },
  'below-fold': {
    trigger: 'near-visible',
    preloadDistance: 500,
    priority: 'medium',
    maxConcurrent: 2,
    retryCount: 1,
  },
  'off-screen': {
    trigger: 'idle',
    preloadDistance: 1000,
    priority: 'low',
    maxConcurrent: 1,
    retryCount: 1,
  },
}
```

---

## 二、虚拟滚动技术

### 11. 虚拟滚动原理

**回答要点：**

**核心原理：**

```
┌─────────────────────────────┐
│    可视区域 (viewport)       │
│  ┌───────────────────────┐  │
│  │   可视项 (visible)     │  │
│  │   item 10-20          │  │
│  └───────────────────────┘  │
│                             │
│  缓冲区域 (buffer)           │
│  ┌───────────────────────┐  │
│  │   item 8-9, 21-22     │  │
│  └───────────────────────┘  │
│                             │
│  幻影元素 (phantom)          │
│  高度 = 总项数 × 单项高度     │
└─────────────────────────────┘

只渲染可视区域 + 缓冲区，其他用占位
```

### 12. 固定高度实现

**回答要点：**

**Vue 3 实现：**

```vue
<template>
  <div ref="containerRef" class="virtual-list" @scroll="handleScroll">
    <!-- 幻影元素，撑开滚动条 -->
    <div class="phantom" :style="{ height: totalHeight + 'px' }"></div>

    <!-- 可视区域内容 -->
    <div class="content" :style="{ transform: `translateY(${offsetY}px)` }">
      <div
        v-for="item in visibleData"
        :key="item.id"
        class="list-item"
        :style="{ height: itemHeight + 'px' }"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  data: Array<{ id: string; name: string }>
  itemHeight: number
  bufferSize?: number
}

const props = withDefaults(defineProps<Props>(), {
  bufferSize: 5,
})

const containerRef = ref<HTMLElement>()
const scrollTop = ref(0)

// 计算属性
const totalHeight = computed(() => props.data.length * props.itemHeight)

const startIndex = computed(() => {
  return Math.floor(scrollTop.value / props.itemHeight)
})

const endIndex = computed(() => {
  const containerHeight = containerRef.value?.clientHeight || 0
  const visibleCount = Math.ceil(containerHeight / props.itemHeight)
  return Math.min(startIndex.value + visibleCount + props.bufferSize, props.data.length)
})

const visibleData = computed(() => {
  const start = Math.max(0, startIndex.value - props.bufferSize)
  return props.data.slice(start, endIndex.value)
})

const offsetY = computed(() => {
  const start = Math.max(0, startIndex.value - props.bufferSize)
  return start * props.itemHeight
})

// 滚动处理
function handleScroll() {
  scrollTop.value = containerRef.value?.scrollTop || 0
}
</script>

<style scoped>
.virtual-list {
  height: 100%;
  overflow-y: auto;
  position: relative;
}

.phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}

.list-item {
  border-bottom: 1px solid #eee;
  padding: 10px;
}
</style>
```

### 13. 动态高度实现

**回答要点：**

**实现方案：**

```typescript
class DynamicVirtualList {
  private heights: Map<string, number> = new Map()
  private positions: Map<string, number> = new Map()
  private averageHeight: number = 50

  constructor(
    private data: any[],
    private containerHeight: number,
    private bufferSize: number = 5
  ) {
    this.calculatePositions()
  }

  private calculatePositions() {
    let position = 0

    this.data.forEach((item, index) => {
      const height = this.heights.get(item.id) || this.averageHeight
      this.positions.set(item.id, position)
      position += height
    })
  }

  getVisibleRange(scrollTop: number) {
    const startIndex = this.findStartIndex(scrollTop)
    const endIndex = this.findEndIndex(startIndex, scrollTop)

    return {
      start: Math.max(0, startIndex - this.bufferSize),
      end: Math.min(this.data.length, endIndex + this.bufferSize),
    }
  }

  private findStartIndex(scrollTop: number): number {
    let left = 0
    let right = this.data.length - 1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const position = this.positions.get(this.data[mid].id) || 0

      if (position >= scrollTop) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }

    return left
  }

  private findEndIndex(startIndex: number, scrollTop: number): number {
    let height = 0
    let index = startIndex

    while (height < this.containerHeight && index < this.data.length) {
      const itemHeight = this.heights.get(this.data[index].id) || this.averageHeight
      height += itemHeight
      index++
    }

    return index
  }

  // 测量实际高度
  measureItem(itemId: string, actualHeight: number) {
    this.heights.set(itemId, actualHeight)
    this.calculatePositions()
  }
}
```

---

## 三、数据 Diff 局部更新

### 21. Diff 算法原理

**回答要点：**

**核心思想：**

- 对比新旧数据，找出变化部分
- 只更新变化的节点，避免全量渲染
- 时间复杂度从 O(n³) 优化到 O(n)

**Vue 3 Diff 算法：**

```typescript
function patchKeyedChildren(
  c1: VNode[], // 旧节点
  c2: VNode[], // 新节点
  container: any
) {
  let i = 0
  const l2 = c2.length
  let e1 = c1.length - 1
  let e2 = l2 - 1

  // 1. 从头部开始对比
  while (i <= e1 && i <= e2) {
    if (isSameVNodeType(c1[i], c2[i])) {
      patch(c1[i], c2[i], container)
    } else {
      break
    }
    i++
  }

  // 2. 从尾部开始对比
  while (i <= e1 && i <= e2) {
    if (isSameVNodeType(c1[e1], c2[e2])) {
      patch(c1[e1], c2[e2], container)
    } else {
      break
    }
    e1--
    e2--
  }

  // 3. 处理新增节点
  if (i > e1) {
    if (i <= e2) {
      const nextPos = e2 + 1
      while (i <= e2) {
        patch(null, c2[i], container)
        i++
      }
    }
  }
  // 4. 处理删除节点
  else if (i > e2) {
    while (i <= e1) {
      unmount(c1[i], container)
      i++
    }
  }
  // 5. 处理乱序（最长递增子序列）
  else {
    // 复杂 diff 逻辑
  }
}
```

### 24. 局部更新策略

**回答要点：**

**医疗场景应用：**

```typescript
// 患者信息局部更新
class PatientDataDiff {
  private cache: Map<string, any> = new Map()

  updatePatient(newData: PatientData) {
    const oldData = this.cache.get(newData.id)

    if (!oldData) {
      // 新患者，全量渲染
      this.cache.set(newData.id, newData)
      return { type: 'full', data: newData }
    }

    // 计算 diff
    const changes = this.calculateDiff(oldData, newData)

    if (changes.length === 0) {
      return { type: 'none' }
    }

    // 更新缓存
    this.cache.set(newData.id, newData)

    // 返回局部更新指令
    return {
      type: 'partial',
      changes,
    }
  }

  private calculateDiff(oldData: any, newData: any): Change[] {
    const changes: Change[] = []

    for (const key in newData) {
      if (oldData[key] !== newData[key]) {
        changes.push({
          field: key,
          oldValue: oldData[key],
          newValue: newData[key],
        })
      }
    }

    return changes
  }
}

// Vue 组件中使用
function usePatientDataDiff() {
  const patientData = ref<PatientData | null>(null)
  const dirtyFields = ref<Set<string>>(new Set())

  function updateData(newData: PatientData) {
    if (!patientData.value) {
      patientData.value = newData
      return
    }

    // 计算 diff
    const changes = calculateDiff(patientData.value, newData)

    if (changes.length > 0) {
      // 标记脏字段
      changes.forEach(change => {
        dirtyFields.value.add(change.field)
      })

      // 局部更新
      Object.assign(patientData.value, newData)

      // 清除标记
      setTimeout(() => {
        dirtyFields.value.clear()
      }, 0)
    }
  }

  return { patientData, dirtyFields, updateData }
}
```

---

## 四、FCP 优化

### 31. FCP 指标详解

**回答要点：**

**FCP (First Contentful Paint)：**

- 定义：浏览器渲染第一个 DOM 内容的时间点
- 包括：文本、图片、SVG、canvas 等
- 不包括：iframe、背景色

**性能等级：**

```
优秀：≤ 1.0s
良好：1.0s - 1.8s
需要改进：1.8s - 3.0s
差：> 3.0s

优化前：2.8s (需要改进)
优化后：1.2s (良好) ✓
```

### 32. FCP 优化策略

**回答要点：**

**优化策略清单：**

```typescript
// 1. 减少关键资源数量
// 内联关键 CSS
// 延迟加载非关键 JS

// 2. 减小关键资源大小
// 压缩 CSS/JS
// 图片优化（WebP、压缩）
// Tree Shaking

// 3. 优化关键资源加载顺序
// preload 关键资源
// prefetch 后续资源
// preconnect 第三方域名

// 4. 减少关键请求的往返次数
// HTTP/2
// 资源合并
// CDN 加速
```

**具体实施：**

```html
<!-- 关键 CSS 内联 -->
<style>
  /* 首屏关键样式 */
  .header { ... }
  .patient-info { ... }
</style>

<!-- 预加载关键资源 -->
<link rel="preload" href="/fonts/main.woff2" as="font" crossorigin />
<link rel="preload" href="/css/critical.css" as="style" />

<!-- 预连接第三方域名 -->
<link rel="preconnect" href="https://api.example.com" />
<link rel="dns-prefetch" href="https://cdn.example.com" />

<!-- 延迟加载非关键 JS -->
<script src="/app.js" defer></script>
```

---

## 五、患者切换优化

### 41. 切换性能分析

**回答要点：**

**性能瓶颈分析：**

```
患者切换耗时 1.2s 组成：
├─ 状态清理：400ms
├─ 数据请求：500ms
├─ 组件渲染：200ms
└─ 其他：100ms

优化目标：300ms 以内
```

### 42. 状态清理优化

**回答要点：**

**优化方案：**

```typescript
// 优化前：全量清理
function clearAllState() {
  patientInfo.value = null
  medicalRecords.value = []
  prescriptions.value = []
  labResults.value = []
  // ... 清理 20+ 个状态
}

// 优化后：按需清理 + 对象池
class StateManager {
  private objectPool: Map<string, any[]> = new Map()

  clearPatientState(patientId: string) {
    // 1. 复用对象，避免频繁创建销毁
    this.recycleToPool(patientInfo.value)

    // 2. 批量清理
    batchClear(['patientInfo', 'medicalRecords', 'prescriptions'])

    // 3. 延迟清理非关键状态
    requestIdleCallback(() => {
      this.clearNonCriticalState()
    })
  }

  private recycleToPool(obj: any) {
    if (obj) {
      const pool = this.objectPool.get(obj.constructor.name) || []
      pool.push(obj)
      this.objectPool.set(obj.constructor.name, pool)
    }
  }

  getFromPool(className: string): any {
    const pool = this.objectPool.get(className)
    if (pool && pool.length > 0) {
      return pool.pop()
    }
    return null
  }
}
```

### 43. 数据预加载

**回答要点：**

**预加载策略：**

```typescript
class PatientDataPreloader {
  private preloadQueue: string[] = []
  private cache: Map<string, PatientData> = new Map()

  // 患者列表悬停时预加载
  onPatientHover(patientId: string) {
    if (!this.cache.has(patientId)) {
      this.preloadQueue.push(patientId)
      this.executePreload()
    }
  }

  private async executePreload() {
    // 限制并发数
    const concurrent = 3
    const batches = this.chunkArray(this.preloadQueue, concurrent)

    for (const batch of batches) {
      await Promise.all(batch.map(id => this.preloadPatient(id)))
    }
  }

  private async preloadPatient(patientId: string) {
    try {
      // 并行请求多个接口
      const [info, records, prescriptions] = await Promise.all([
        fetchPatientInfo(patientId),
        fetchMedicalRecords(patientId),
        fetchPrescriptions(patientId),
      ])

      this.cache.set(patientId, {
        info,
        records,
        prescriptions,
      })
    } catch (error) {
      console.error('Preload failed:', error)
    }
  }

  // 切换患者时使用缓存
  async switchPatient(patientId: string) {
    const cached = this.cache.get(patientId)

    if (cached) {
      // 使用缓存，立即显示
      renderPatient(cached)

      // 后台更新数据
      this.refreshPatientData(patientId)
    } else {
      // 首次加载
      await this.loadPatient(patientId)
    }
  }
}
```

---

## 六、Webpack 深度优化

### 51. Webpack 架构原理

**回答要点：**

**核心流程：**

```
1. 初始化参数
   ↓
2. 开始编译（创建 Compiler）
   ↓
3. 确定入口（从 entry 开始）
   ↓
4. 编译模块（Loader 转换）
   ↓
5. 完成编译（生成 Chunks）
   ↓
6. 输出资源（Plugin 处理）
   ↓
7. 输出完成
```

### 52. 打包优化策略

**回答要点：**

**优化配置：**

```javascript
// webpack.config.js
module.exports = {
  // 1. 代码分割
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },

    // 2. Tree Shaking
    usedExports: true,
    sideEffects: true,

    // 3. 运行时分离
    runtimeChunk: 'single',
  },

  // 4. 缓存优化
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },

  // 5. 优化解析
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.ts', '.vue'],
  },
}
```

---

## 七、Rsbuild 迁移

### 61. Rsbuild 核心优势

**回答要点：**

**核心优势：**

```
1. 构建速度
   - 基于 Rspack（Rust 实现）
   - 比 Webpack 快 5-10 倍
   - 冷启动优化显著

2. 开箱即用
   - 内置常用 Loader/Plugin
   - 零配置启动
   - 合理的默认配置

3. 兼容性好
   - 兼容 Webpack 生态
   - 支持大部分 Loader/Plugin
   - 迁移成本低

4. 体积优化
   - 更好的 Tree Shaking
   - 智能代码分割
   - 默认开启压缩
```

### 63. 迁移方案设计

**回答要点：**

**迁移步骤：**

```typescript
// 阶段 1：评估兼容性（1 周）
const assessment = {
  loaders: ['vue-loader', 'ts-loader', 'css-loader'],
  plugins: ['DefinePlugin', 'CopyPlugin'],
  features: ['HMR', 'Code Splitting', 'Tree Shaking'],
}

// 阶段 2：配置转换（1 周）
// rsbuild.config.ts
import { defineConfig } from '@rsbuild/core'
import { pluginVue } from '@rsbuild/plugin-vue'

export default defineConfig({
  plugins: [pluginVue()],

  source: {
    alias: {
      '@': './src',
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
  },

  output: {
    distPath: {
      root: 'dist',
    },
    cleanDistPath: true,
  },

  tools: {
    rspack: config => {
      // 兼容 Webpack 配置
      return config
    },
  },
})

// 阶段 3：渐进式迁移（2 周）
// 先迁移非核心模块
// 验证功能正常
// 逐步迁移核心模块

// 阶段 4：性能优化（1 周）
// 对比构建时间
// 对比产物体积
// 调优配置
```

### 68. 性能对比

**回答要点：**

**对比数据：**

```
构建时间对比：
┌─────────────┬──────────┬──────────┬─────────┐
│   指标       │ Webpack  │ Rsbuild  │ 提升     │
├─────────────┼──────────┼──────────┼─────────┤
│ 冷启动      │ 45s      │ 8s       │ 82% ↓   │
│ 热更新      │ 3s       │ 0.5s     │ 83% ↓   │
│ 生产构建    │ 120s     │ 25s      │ 79% ↓   │
│ HMR         │ 2s       │ 0.3s     │ 85% ↓   │
└─────────────┴──────────┴──────────┴─────────┘

产物体积对比：
┌─────────────┬──────────┬──────────┬─────────┐
│   指标       │ Webpack  │ Rsbuild  │ 优化     │
├─────────────┼──────────┼──────────┼─────────┤
│ JS 体积     │ 2.5MB    │ 2.1MB    │ 16% ↓   │
│ CSS 体积    │ 500KB    │ 450KB    │ 10% ↓   │
│ Chunk 数量  │ 25       │ 20       │ 20% ↓   │
└─────────────┴──────────┴──────────┴─────────┘
```

---

## 八、模块联邦

### 71. Module Federation 原理

**回答要点：**

**核心概念：**

```
┌──────────────────────────────────────┐
│          Host (主应用)                │
│  ┌──────────────────────────────┐    │
│  │   Remote A (收费系统)         │    │
│  │   - 动态加载                  │    │
│  │   - 独立部署                  │    │
│  └──────────────────────────────┘    │
│  ┌──────────────────────────────┐    │
│  │   Remote B (药房系统)         │    │
│  │   - 按需加载                  │    │
│  │   - 共享依赖                  │    │
│  └──────────────────────────────┘    │
└──────────────────────────────────────┘

共享依赖：Vue、Element Plus 等只加载一次
```

### 74. 依赖共享策略

**回答要点：**

**配置示例：**

```javascript
// Host 配置
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    chargeApp: 'chargeApp@http://localhost:8001/remoteEntry.js',
    pharmacyApp: 'pharmacyApp@http://localhost:8002/remoteEntry.js',
  },
  shared: {
    vue: {
      singleton: true, // 单例，只加载一次
      requiredVersion: '^3.3.0',
      eager: true, // 预加载
    },
    'element-plus': {
      singleton: true,
      requiredVersion: '^2.0.0',
    },
    axios: {
      singleton: true,
      requiredVersion: '^1.0.0',
    },
  },
})

// Remote 配置
new ModuleFederationPlugin({
  name: 'chargeApp',
  filename: 'remoteEntry.js',
  exposes: {
    './ChargeApp': './src/App.vue',
    './ChargeRouter': './src/router',
  },
  shared: {
    vue: {
      singleton: true,
      requiredVersion: '^3.3.0',
    },
  },
})
```

---

## 九、性能监控体系

### 81. Web Vitals 指标

**回答要点：**

**核心指标：**

```
1. LCP (Largest Contentful Paint)
   - 最大内容绘制时间
   - 目标：≤ 2.5s

2. FID (First Input Delay)
   - 首次输入延迟
   - 目标：≤ 100ms

3. CLS (Cumulative Layout Shift)
   - 累积布局偏移
   - 目标：≤ 0.1

4. FCP (First Contentful Paint)
   - 首次内容绘制
   - 目标：≤ 1.8s

5. INP (Interaction to Next Paint)
   - 交互到下次绘制
   - 目标：≤ 200ms
```

**监控代码：**

```typescript
import { onFCP, onLCP, onCLS, onFID, onINP } from 'web-vitals'

function sendToAnalytics(metric: any) {
  // 上报到监控系统
  fetch('/api/performance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: metric.name,
      value: metric.value,
      delta: metric.delta,
      rating: metric.rating,
      id: metric.id,
    }),
  })
}

onFCP(sendToAnalytics)
onLCP(sendToAnalytics)
onCLS(sendToAnalytics)
onFID(sendToAnalytics)
onINP(sendToAnalytics)
```

---

## 十、实战案例

### 101. FCP 2.8s→1.2s 实战

**回答要点：**

**优化过程：**

```
优化前分析（2.8s）：
├─ 关键资源：8 个 CSS + 12 个 JS
├─ 首屏资源：1.5MB
├─ 阻塞渲染：5 个同步脚本
└─ 字体加载：3 个字体文件

优化措施：
1. CSS 优化（-600ms）
   - 内联关键 CSS
   - 延迟加载非关键 CSS
   - 移除未使用样式

2. JS 优化（-500ms）
   - 异步加载非关键脚本
   - 代码分割
   - Tree Shaking

3. 资源优化（-300ms）
   - 图片转 WebP
   - 字体子集化
   - Gzip 压缩

4. 加载策略（-200ms）
   - preload 关键资源
   - preconnect 第三方
   - 懒加载首屏外内容

优化后：1.2s ✓
```

### 102. 患者切换 1.2s→300ms

**回答要点：**

**优化策略：**

```typescript
// 优化前：1.2s
async function switchPatient(patientId: string) {
  // 1. 清理状态（400ms）
  clearAllState()

  // 2. 请求数据（500ms）
  const data = await fetchPatientData(patientId)

  // 3. 渲染组件（200ms）
  renderPatient(data)

  // 4. 初始化（100ms）
  initModules()
}

// 优化后：300ms
async function switchPatient(patientId: string) {
  // 1. 使用缓存（0ms）
  const cached = cache.get(patientId)
  if (cached) {
    renderPatient(cached) // 立即显示
    refreshInBackground(patientId) // 后台更新
    return
  }

  // 2. 预加载数据（-200ms，在悬停时已预加载）
  const data = await preloadCache.get(patientId)

  // 3. 局部更新（-100ms）
  partialUpdate(data)

  // 4. 延迟初始化（-200ms）
  requestIdleCallback(() => initModules())
}

// 优化效果：
// 有缓存：50ms（渲染）+ 100ms（局部更新）= 150ms
// 无缓存：200ms（数据）+ 100ms（渲染）= 300ms
```

---

## 十一、进阶提升

### 111. 性能优化思维

**回答要点：**

**优化原则：**

```
1. 测量优先
   - 先测量，再优化
   - 找到真正的瓶颈
   - 数据驱动决策

2. 渐进优化
   - 先解决大问题
   - 再优化小问题
   - 持续改进

3. 用户体验优先
   - 感知性能 > 实际性能
   - 首屏优先
   - 交互响应优先

4. 平衡取舍
   - 性能 vs 开发效率
   - 体积 vs 功能
   - 缓存 vs 实时性
```

### 112. 架构设计能力

**回答要点：**

**性能架构设计：**

```
┌──────────────────────────────────────┐
│          性能优化架构                 │
├──────────────────────────────────────┤
│  加载层                              │
│  - 资源预加载                         │
│  - 懒加载策略                         │
│  - 缓存策略                           │
├──────────────────────────────────────┤
│  渲染层                              │
│  - 虚拟滚动                           │
│  - 局部更新                           │
│  - 组件优化                           │
├──────────────────────────────────────┤
│  构建层                              │
│  - 代码分割                           │
│  - Tree Shaking                       │
│  - 压缩优化                           │
├──────────────────────────────────────┤
│  监控层                              │
│  - 性能采集                           │
│  - 告警机制                           │
│  - 数据分析                           │
└──────────────────────────────────────┘
```

---

## 总结

### 核心优化成果

**性能指标：**

```
FCP：2.8s → 1.2s (提升 57%)
患者切换：1.2s → 300ms (提升 75%)
构建速度：45s → 8s (提升 82%)
热更新：3s → 0.5s (提升 83%)
```

### 关键技术

**性能优化：**

```
IntersectionObserver 区域懒加载
虚拟滚动（固定高度 + 动态高度）
数据 Diff 局部更新
缓存策略 + 预加载
```

**构建优化：**

```
Webpack → Rsbuild 迁移
模块联邦依赖共享
Tree Shaking + 代码分割
缓存优化
```

### 最佳实践

```
1. 测量驱动优化
2. 渐进式改进
3. 用户体验优先
4. 持续监控
5. 团队规范
```
