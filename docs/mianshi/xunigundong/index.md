# 虚拟滚动 & 构建优化 & 性能调优高级面试题集

## 📑 快速导航目录

### 一、虚拟滚动核心原理

- [1. 虚拟滚动的原理是什么？](#1-虚拟滚动的原理是什么)
- [2. 为什么需要虚拟滚动？](#2-为什么需要虚拟滚动)
- [3. 虚拟滚动的核心算法](#3-虚拟滚动的核心算法)
- [4. 固定高度虚拟滚动实现](#4-固定高度虚拟滚动实现)
- [5. 动态高度虚拟滚动](#5-动态高度虚拟滚动)
- [6. 10 万级数据优化策略](#6-10-万级数据优化策略)
- [7. 虚拟滚动的性能瓶颈](#7-虚拟滚动的性能瓶颈)
- [8. 如何优化滚动流畅度？](#8-如何优化滚动流畅度)
- [9. 虚拟滚动内存管理](#9-虚拟滚动内存管理)
- [10. 虚拟滚动边界处理](#10-虚拟滚动边界处理)
- [11. 分组列表虚拟滚动](#11-分组列表虚拟滚动)
- [12. 表格虚拟滚动实现](#12-表格虚拟滚动实现)
- [13. 树形数据虚拟滚动](#13-树形数据虚拟滚动)
- [14. 虚拟滚动动画处理](#14-虚拟滚动动画处理)
- [15. 虚拟滚动 SSR 支持](#15-虚拟滚动-ssr-支持)

### 二、自研 Hook 设计

- [16. useVirtualList 设计思路](#16-usevirtuallist-设计思路)
- [17. Hook 参数设计](#17-hook-参数设计)
- [18. 返回值设计](#18-返回值设计)
- [19. 响应式数据处理](#19-响应式数据处理)
- [20. 性能优化策略](#20-性能优化策略)
- [21. 类型安全设计](#21-类型安全设计)
- [22. 错误边界处理](#22-错误边界处理)
- [23. 单元测试编写](#23-单元测试编写)
- [24. Hook 文档编写](#24-hook-文档编写)
- [25. 与第三方库对比](#25-与第三方库对比)

### 三、Webpack → Rsbuild 迁移

- [26. 为什么迁移到 Rsbuild？](#26-为什么迁移到-rsbuild)
- [27. Rsbuild 的核心优势](#27-rsbuild-的核心优势)
- [28. 迁移方案设计](#28-迁移方案设计)
- [29. 配置转换策略](#29-配置转换策略)
- [30. 插件兼容性处理](#30-插件兼容性处理)
- [31. Loader 迁移方案](#31-loader-迁移方案)
- [32. 构建产物对比](#32-构建产物对比)
- [33. 性能提升量化](#33-性能提升量化)
- [34. 迁移风险评估](#34-迁移风险评估)
- [35. 回滚方案设计](#35-回滚方案设计)
- [36. 渐进式迁移策略](#36-渐进式迁移策略)
- [37. 团队协作规范](#37-团队协作规范)
- [38. CI/CD 适配](#38-cicd-适配)
- [39. 监控体系建立](#39-监控体系建立)
- [40. 迁移经验总结](#40-迁移经验总结)

### 四、模块联邦方案

- [41. Module Federation 原理](#41-module-federation-原理)
- [42. 与微前端对比](#42-与微前端对比)
- [43. 依赖共享方案](#43-依赖共享方案)
- [44. 版本管理策略](#44-版本管理策略)
- [45. 异步加载优化](#45-异步加载优化)
- [46. 组件共享方案](#46-组件共享方案)
- [47. 样式隔离处理](#47-样式隔离处理)
- [48. 类型共享方案](#48-类型共享方案)
- [49. 错误处理机制](#49-错误处理机制)
- [50. 性能监控方案](#50-性能监控方案)

### 五、浏览器渲染管线

- [51. 浏览器渲染流程](#51-浏览器渲染流程)
- [52. 关键渲染路径](#52-关键渲染路径)
- [53. 重排与重绘](#53-重排与重绘)
- [54. 合成层优化](#54-合成层优化)
- [55. GPU 加速原理](#55-gpu-加速原理)
- [56. 帧率优化策略](#56-帧率优化策略)
- [57. 长任务优化](#57-长任务优化)
- [58. 主线程优化](#58-主线程优化)
- [59. 渲染阻塞问题](#59-渲染阻塞问题)
- [60. 性能分析工具](#60-性能分析工具)

### 六、Web Vitals 指标

- [61. Web Vitals 核心指标](#61-web-vitals-核心指标)
- [62. LCP 优化方案](#62-lcp-优化方案)
- [63. FID/INP 优化](#63-fidinp-优化)
- [64. CLS 优化方案](#64-cls-优化方案)
- [65. FCP 优化方案](#65-fcp-优化方案)
- [66. TTFB 优化方案](#66-ttfb-优化方案)
- [67. 指标监控方案](#67-指标监控方案)
- [68. 指标上报策略](#68-指标上报策略)
- [69. 性能预算制定](#69-性能预算制定)
- [70. 性能回归检测](#70-性能回归检测)

### 七、首屏加载优化

- [71. 首屏加载分析](#71-首屏加载分析)
- [72. 代码分割策略](#72-代码分割策略)
- [73. 资源预加载](#73-资源预加载)
- [74. 图片优化方案](#74-图片优化方案)
- [75. 字体优化方案](#75-字体优化方案)
- [76. CDN 优化策略](#76-cdn-优化策略)
- [77. 缓存策略设计](#77-缓存策略设计)
- [78. SSR/SSG 方案](#78-ssrssg-方案)
- [79. 流式渲染](#79-流式渲染)
- [80. 40% 优化拆解](#80-40-优化拆解)

### 八、Webpack 深度优化

- [81. Webpack 构建流程](#81-webpack-构建流程)
- [82. Loader 开发](#82-loader-开发)
- [83. Plugin 开发](#83-plugin-开发)
- [84. Tree Shaking 优化](#84-tree-shaking-优化)
- [85. 代码分割优化](#85-代码分割优化)
- [86. 缓存策略](#86-缓存策略)
- [87. 多线程构建](#87-多线程构建)
- [88. DllPlugin 方案](#88-dllplugin-方案)
- [89. 打包体积优化](#89-打包体积优化)
- [90. 构建性能分析](#90-构建性能分析)

### 九、构建工具对比

- [91. Vite vs Webpack](#91-vite-vs-webpack)
- [92. Rsbuild vs Vite](#92-rsbuild-vs-vite)
- [93. Turbopack 原理](#93-turbopack-原理)
- [94. esbuild 原理](#94-esbuild-原理)
- [95. SWC 原理](#95-swc-原理)
- [96. Rspack 原理](#96-rspack-原理)
- [97. 构建工具选型](#97-构建工具选型)
- [98. 迁移成本评估](#98-迁移成本评估)
- [99. 生态兼容性](#99-生态兼容性)
- [100. 未来趋势](#100-未来趋势)

### 十、性能监控体系

- [101. 监控指标设计](#101-监控指标设计)
- [102. 数据采集方案](#102-数据采集方案)
- [103. 性能看板设计](#103-性能看板设计)
- [104. 告警机制设计](#104-告警机制设计)
- [105. 性能分析工具](#105-性能分析工具)
- [106. 用户体验监控](#106-用户体验监控)
- [107. 错误追踪系统](#107-错误追踪系统)
- [108. A/B 测试方案](#108-ab-测试方案)
- [109. 性能优化验证](#109-性能优化验证)
- [110. 持续优化机制](#110-持续优化机制)

### 十一、实战场景

- [111. 10 万数据表格](#111-10-万数据表格)
- [112. 无限滚动列表](#112-无限滚动列表)
- [113. 聊天消息列表](#113-聊天消息列表)
- [114. 文件树组件](#114-文件树组件)
- [115. 日历组件优化](#115-日历组件优化)
- [116. 图表组件优化](#116-图表组件优化)
- [117. 表单组件优化](#117-表单组件优化)
- [118. 大型后台系统](#118-大型后台系统)
- [119. 移动端优化](#119-移动端优化)
- [120. 低性能设备优化](#120-低性能设备优化)

### 十二、高级优化技巧

- [121. Web Worker 优化](#121-web-worker-优化)
- [122. Service Worker 缓存](#122-service-worker-缓存)
- [123. HTTP/2 优化](#123-http2-优化)
- [124. HTTP/3 优化](#124-http3-优化)
- [125. 边缘计算优化](#125-边缘计算优化)
- [126. 预渲染优化](#126-预渲染优化)
- [127. 渐进式增强](#127-渐进式增强)
- [128. 降级方案设计](#128-降级方案设计)
- [129. 性能测试方案](#129-性能测试方案)
- [130. 优化最佳实践](#130-优化最佳实践)

---

## 一、虚拟滚动核心原理

### 1. 虚拟滚动的原理是什么？

**回答要点：**

- **核心思想**：只渲染可视区域内的 DOM 节点
- **实现方式**：
  1. 计算可视区域能显示多少项
  2. 根据滚动位置计算起始索引
  3. 只渲染可视区域 + 缓冲区的项
  4. 使用占位元素保持滚动条高度

**工作流程：**

```
滚动事件触发
  ↓
计算可视区域起始/结束索引
  ↓
截取数据子集
  ↓
更新渲染列表
  ↓
更新占位元素高度
```

### 2. 为什么需要虚拟滚动？

**回答要点：**

**问题场景：**

- 10 万条数据 = 10 万个 DOM 节点
- 每个节点 1KB → 100MB 内存
- DOM 操作耗时：创建 10 万节点 ≈ 3-5 秒
- 页面卡顿、滚动不流畅、内存占用高

**虚拟滚动优势：**

```
传统渲染：
- DOM 节点：100,000 个
- 内存占用：~100MB
- 首次渲染：3-5s
- 滚动 FPS：10-20

虚拟滚动：
- DOM 节点：~50 个
- 内存占用：~5MB
- 首次渲染：<100ms
- 滚动 FPS：60
```

### 3. 虚拟滚动的核心算法

**回答要点：**

```typescript
interface VirtualScrollOptions {
  itemHeight: number // 每项高度
  bufferSize?: number // 缓冲数量
  containerHeight: number // 容器高度
}

function calculateVisibleRange(scrollTop: number, options: VirtualScrollOptions) {
  const { itemHeight, bufferSize = 5, containerHeight } = options

  // 计算起始索引
  const startIndex = Math.floor(scrollTop / itemHeight)

  // 计算可视数量
  const visibleCount = Math.ceil(containerHeight / itemHeight)

  // 计算结束索引（包含缓冲区）
  const endIndex = Math.min(startIndex + visibleCount + bufferSize * 2, totalItems)

  // 计算偏移量
  const offsetY = startIndex * itemHeight

  return {
    startIndex: Math.max(0, startIndex - bufferSize),
    endIndex,
    offsetY,
    visibleCount,
  }
}
```

### 4. 固定高度虚拟滚动实现

**回答要点：**

```vue
<template>
  <div ref="container" class="virtual-list" @scroll="onScroll">
    <div class="phantom" :style="{ height: totalHeight + 'px' }">
      <div class="content" :style="{ transform: `translateY(${offsetY}px)` }">
        <div
          v-for="item in visibleData"
          :key="item.id"
          class="list-item"
          :style="{ height: itemHeight + 'px' }"
        >
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps<{
  data: any[];
  itemHeight: number;
}>();

const container = ref<HTMLElement>();
const scrollTop = ref(0);
const bufferSize = 5;

const visibleCount = computed(() => {
  return Math.ceil(containerHeight / props.itemHeight);
});

const startIndex = computed(() => {
  return Math.floor(scrollTop.value / props.itemHeight);
});

const visibleData = computed(() => {
  const start = Math.max(0, startIndex.value - bufferSize);
  const end = startIndex.value + visibleCount.value + bufferSize;
  return props.data.slice(start, end);
});

const offsetY = computed(() => {
  return Math.max(0, (startIndex.value - bufferSize) * props.itemHeight);
});

const totalHeight = computed(() => {
  return props.data.length * props.itemHeight;
});

function onScroll(e: Event) {
  const target = e.target as HTMLElement;
  scrollTop.value = target.scrollTop;
}
</script>
```

### 5. 动态高度虚拟滚动

**回答要点：**

**核心难点：**

- 每项高度不固定
- 需要测量实际高度
- 位置计算复杂

**解决方案：**

```typescript
class DynamicVirtualList {
  private heights: Map<number, number> = new Map()
  private positions: number[] = []

  // 测量元素高度
  async measureHeight(index: number): Promise<number> {
    if (this.heights.has(index)) {
      return this.heights.get(index)!
    }

    // 渲染并测量
    const height = await this.renderAndMeasure(index)
    this.heights.set(index, height)
    this.updatePositions()
    return height
  }

  // 更新位置数组
  private updatePositions() {
    this.positions = []
    let position = 0

    for (let i = 0; i < this.totalItems; i++) {
      this.positions[i] = position
      position += this.heights.get(i) || this.estimatedHeight
    }

    this.totalHeight = position
  }

  // 二分查找起始索引
  private findStartIndex(scrollTop: number): number {
    let low = 0
    let high = this.positions.length - 1

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      const midPosition = this.positions[mid]

      if (midPosition === scrollTop) {
        return mid
      } else if (midPosition < scrollTop) {
        low = mid + 1
      } else {
        high = mid - 1
      }
    }

    return low - 1
  }
}
```

### 6. 10 万级数据优化策略

**回答要点：**

**优化策略：**

1. **数据分片**：

   ```typescript
   // 不要一次性传递 10 万数据
   const pageSize = 1000
   const currentPage = ref(0)

   const pageData = computed(() => {
     const start = currentPage.value * pageSize
     return data.slice(start, start + pageSize)
   })
   ```

2. **Web Worker 处理**：

   ```typescript
   // 在 Worker 中处理数据
   const worker = new Worker('data-processor.js')
   worker.postMessage({ data: rawData, operation: 'filter' })
   worker.onmessage = e => {
     processedData.value = e.data
   }
   ```

3. **虚拟滚动优化**：

   ```typescript
   // 减少缓冲区
   const bufferSize = 3 // 默认 5，降低到 3

   // 使用 requestAnimationFrame
   let ticking = false
   function onScroll(e) {
     if (!ticking) {
       requestAnimationFrame(() => {
         updateVirtualList()
         ticking = false
       })
       ticking = true
     }
   }
   ```

4. **内存优化**：
   ```typescript
   // 及时清理不需要的数据
   onUnmounted(() => {
     visibleData.value = []
     heights.clear()
   })
   ```

### 7. 虚拟滚动的性能瓶颈

**回答要点：**

**常见瓶颈：**

1. **滚动事件频繁触发**：
   - 问题：每秒触发 60+ 次
   - 解决：节流、requestAnimationFrame

2. **DOM 操作过多**：
   - 问题：每次滚动都更新 DOM
   - 解决：使用 transform、减少重排

3. **计算复杂度高**：
   - 问题：动态高度需要遍历计算
   - 解决：二分查找、缓存位置

4. **内存泄漏**：
   - 问题：未清理的引用
   - 解决：及时清理、WeakMap

5. **响应式开销**：
   - 问题：Vue 响应式追踪
   - 解决：shallowRef、markRaw

### 8. 如何优化滚动流畅度？

**回答要点：**

**优化方案：**

1. **使用 transform 代替 top**：

   ```css
   /* ❌ 触发重排 */
   .content {
     position: absolute;
     top: 100px;
   }

   /* ✅ 触发合成 */
   .content {
     transform: translateY(100px);
   }
   ```

2. **will-change 提示**：

   ```css
   .content {
     will-change: transform;
   }
   ```

3. **减少 DOM 层级**：

   ```html
   <!-- ❌ 层级过深 -->
   <div>
     <div>
       <div>
         <div class="item"></div>
       </div>
     </div>
   </div>

   <!-- ✅ 扁平化 -->
   <div class="item"></div>
   ```

4. **使用 CSS contain**：

   ```css
   .list-item {
     contain: layout style paint;
   }
   ```

5. **防抖滚动事件**：
   ```typescript
   const onScroll = throttle(e => {
     updateVirtualList()
   }, 16) // 60fps ≈ 16ms
   ```

### 9. 虚拟滚动内存管理

**回答要点：**

**内存管理策略：**

```typescript
class VirtualListManager {
  private nodePool: Map<string, HTMLElement> = new Map()
  private heights: Map<number, number> = new Map()

  // 节点复用
  getNode(id: string): HTMLElement {
    if (this.nodePool.has(id)) {
      return this.nodePool.get(id)!
    }

    const node = document.createElement('div')
    this.nodePool.set(id, node)
    return node
  }

  // 清理缓存
  clearCache() {
    this.nodePool.clear()
    this.heights.clear()
  }

  // 使用 WeakMap 避免内存泄漏
  private elementData = new WeakMap<HTMLElement, any>()

  setData(element: HTMLElement, data: any) {
    this.elementData.set(element, data)
  }

  getData(element: HTMLElement): any {
    return this.elementData.get(element)
  }
}
```

### 10. 虚拟滚动边界处理

**回答要点：**

**边界场景：**

1. **数据为空**：

   ```typescript
   if (data.length === 0) {
     return {
       visibleData: [],
       offsetY: 0,
       totalHeight: 0,
     }
   }
   ```

2. **滚动到底部**：

   ```typescript
   const endIndex = Math.min(startIndex + visibleCount + bufferSize, data.length)
   ```

3. **容器高度变化**：

   ```typescript
   const resizeObserver = new ResizeObserver(entries => {
     for (const entry of entries) {
       containerHeight.value = entry.contentRect.height
       updateVisibleRange()
     }
   })

   resizeObserver.observe(container.value)
   ```

4. **动态数据更新**：
   ```typescript
   watch(
     () => props.data,
     () => {
       // 重新计算
       heights.clear()
       updatePositions()
     },
     { deep: true }
   )
   ```

### 11. 分组列表虚拟滚动

**回答要点：**

```typescript
interface GroupItem {
  type: 'header' | 'item'
  group?: string
  data?: any
}

function calculateGroupPositions(items: GroupItem[]) {
  const positions: number[] = []
  let position = 0

  for (let i = 0; i < items.length; i++) {
    positions[i] = position

    if (items[i].type === 'header') {
      position += groupHeaderHeight
    } else {
      position += itemHeight
    }
  }

  return { positions, totalHeight: position }
}
```

### 12. 表格虚拟滚动实现

**回答要点：**

```vue
<template>
  <div class="virtual-table">
    <div class="header">
      <div v-for="col in columns" :key="col.key" class="header-cell">
        {{ col.title }}
      </div>
    </div>
    <div class="body" @scroll="onScroll">
      <div class="phantom" :style="{ height: totalHeight + 'px' }">
        <div class="content" :style="{ transform: `translateY(${offsetY}px)` }">
          <div v-for="row in visibleData" :key="row.id" class="table-row">
            <div v-for="col in columns" :key="col.key" class="table-cell">
              {{ row[col.key] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

### 13. 树形数据虚拟滚动

**回答要点：**

**难点：**

- 展开/折叠改变可见项
- 层级缩进
- 动态高度

**解决方案：**

```typescript
function flattenTree(tree: TreeNode[], expanded: Set<string>) {
  const result: FlatNode[] = []

  function traverse(nodes: TreeNode[], level: number) {
    for (const node of nodes) {
      result.push({ ...node, level })

      if (expanded.has(node.id) && node.children) {
        traverse(node.children, level + 1)
      }
    }
  }

  traverse(tree, 0)
  return result
}
```

### 14. 虚拟滚动动画处理

**回答要点：**

**动画优化：**

```typescript
// 使用 FLIP 技术
function animateItem(element: HTMLElement, from: number, to: number) {
  const first = from
  const last = to
  const invert = last - first

  element.style.transform = `translateY(${invert}px)`

  requestAnimationFrame(() => {
    element.style.transition = 'transform 0.3s'
    element.style.transform = ''
  })
}
```

### 15. 虚拟滚动 SSR 支持

**回答要点：**

**SSR 方案：**

```typescript
// 服务端渲染首屏
if (typeof window === 'undefined') {
  // SSR 环境
  return {
    visibleData: data.slice(0, 20),
    offsetY: 0,
    totalHeight: data.length * itemHeight,
  }
}

// 客户端激活
onMounted(() => {
  // 恢复滚动位置
  container.value.scrollTop = savedScrollTop
})
```

---

## 二、自研 Hook 设计

### 16. useVirtualList 设计思路

**回答要点：**

**设计原则：**

1. **简单易用**：API 简洁，符合直觉
2. **高性能**：最小化重渲染
3. **类型安全**：完整 TypeScript 支持
4. **可扩展**：支持自定义配置

```typescript
function useVirtualList<T>(list: Ref<T[]>, options: VirtualListOptions): VirtualListReturn<T>
```

### 17. Hook 参数设计

**回答要点：**

```typescript
interface VirtualListOptions {
  itemHeight: number | ((item: any, index: number) => number)
  bufferSize?: number
  containerHeight?: number
  overscan?: number
}

// 使用示例
const { list, scrollTo } = useVirtualList(data, {
  itemHeight: 50,
  bufferSize: 5,
  overscan: 3,
})
```

### 18. 返回值设计

**回答要点：**

```typescript
interface VirtualListReturn<T> {
  list: ComputedRef<Array<{ index: number; data: T }>>
  scrollTo: (index: number) => void
  scrollOffset: Ref<number>
  visibleCount: ComputedRef<number>
}
```

### 19. 响应式数据处理

**回答要点：**

```typescript
import { ref, computed, shallowRef } from 'vue'

function useVirtualList<T>(list: Ref<T[]>, options: Options) {
  // 使用 shallowRef 避免深度响应式
  const scrollOffset = shallowRef(0)

  const visibleList = computed(() => {
    const { start, end } = calculateRange(scrollOffset.value, options)
    return list.value.slice(start, end).map((item, i) => ({
      index: start + i,
      data: item,
    }))
  })

  return { list: visibleList }
}
```

### 20. 性能优化策略

**回答要点：**

**优化技巧：**

1. **使用 shallowRef**：避免不必要的深度追踪
2. **计算缓存**：computed 自动缓存
3. **事件节流**：减少滚动事件触发
4. **DOM 复用**：节点池复用

### 21. 类型安全设计

**回答要点：**

```typescript
function useVirtualList<T>(
  list: MaybeRefOrGetter<T[]>,
  options: VirtualListOptions<T>
): VirtualListReturn<T> {
  // 完整类型推导
}

interface VirtualListOptions<T> {
  itemHeight: number | ((item: T, index: number) => number)
}
```

### 22. 错误边界处理

**回答要点：**

```typescript
function useVirtualList<T>(list: Ref<T[]>, options: Options) {
  try {
    // 核心逻辑
  } catch (error) {
    console.error('VirtualList error:', error)
    return {
      list: computed(() => []),
      scrollTo: () => {},
    }
  }
}
```

### 23. 单元测试编写

**回答要点：**

```typescript
import { describe, it, expect } from 'vitest'
import { useVirtualList } from './useVirtualList'

describe('useVirtualList', () => {
  it('should return visible items', () => {
    const data = ref(Array.from({ length: 100 }, (_, i) => i))
    const { list } = useVirtualList(data, {
      itemHeight: 50,
      containerHeight: 500,
    })

    expect(list.value.length).toBeLessThan(20)
  })

  it('should update on scroll', () => {
    // 测试滚动更新
  })
})
```

### 24. Hook 文档编写

**回答要点：**

**文档结构：**

- API 说明
- 使用示例
- 配置选项
- 性能建议
- 常见问题

### 25. 与第三方库对比

**回答要点：**

| 特性     | 自研       | vue-virtual-scroller | @tanstack/vue-virtual |
| -------- | ---------- | -------------------- | --------------------- |
| 体积     | 2KB        | 15KB                 | 10KB                  |
| 灵活性   | 高         | 中                   | 高                    |
| 性能     | 优化空间大 | 好                   | 好                    |
| 维护成本 | 高         | 低                   | 低                    |
| 定制性   | 完全定制   | 有限                 | 有限                  |

---

由于内容较多，我将继续生成 HTML 版本，包含所有核心题目。
