# Vue 3 & TypeScript & React 18+ 高级面试题集

## 一、Vue 3 响应式系统

### 1. 基础原理

#### 1. Vue 3 的响应式系统是如何实现的？与 Vue 2 有什么区别？

**回答要点：**

- **Vue 3**：使用 ES6 `Proxy` 对象实现响应式
- **Vue 2**：使用 `Object.defineProperty` 实现响应式
- **核心差异**：
  - Proxy 可以拦截整个对象，包括属性的添加/删除
  - defineProperty 只能监听已存在的属性，新增属性需要 `Vue.set`
  - Proxy 性能更好，不需要递归遍历对象所有属性
  - Proxy 支持数组索引和 length 属性的监听

**示例代码：**

```javascript
// Vue 3 响应式核心实现
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key) // 收集依赖
      const res = Reflect.get(target, key, receiver)
      return typeof res === 'object' ? reactive(res) : res // 深层响应式
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      trigger(target, key) // 触发更新
      return result
    },
  })
}
```

#### 2. `Proxy` 相比 `Object.defineProperty` 有哪些优势？

**回答要点：**

1. **拦截范围更广**：可以拦截 13 种操作（get、set、has、deleteProperty 等）
2. **支持动态属性**：新增/删除属性自动响应，无需 `$set`/`$delete`
3. **数组支持完整**：可以监听数组索引和 length 变化
4. **性能更优**：按需代理，不需要初始化时递归遍历
5. **Map/Set/Date 等支持**：可以直接代理特殊数据结构

#### 3. 请手写一个简易的 `reactive` 实现

**回答要点：**

```javascript
const targetMap = new WeakMap()
let activeEffect = null

function track(target, key) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  dep.add(activeEffect)
}

function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => effect())
  }
}

function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key)
      const res = Reflect.get(target, key, receiver)
      return typeof res === 'object' && res !== null ? reactive(res) : res
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      if (oldValue !== value) {
        trigger(target, key)
      }
      return result
    },
  })
}

function effect(fn) {
  activeEffect = fn
  fn()
  activeEffect = null
}
```

#### 4. `ref` 和 `reactive` 的底层实现有什么区别？

**回答要点：**

- **ref**：
  - 本质是一个对象 `{ value: xxx }`
  - 内部使用 `Object.defineProperty` 实现 value 的 getter/setter
  - 适用于基本类型和对象类型
  - 模板中自动解包
- **reactive**：
  - 直接返回 Proxy 对象
  - 只能用于对象类型（Object、Array、Map、Set 等）
  - 不能直接替换整个对象（会丢失响应式）
  - 深层响应式（自动递归代理）

**底层实现对比：**

```javascript
// ref 的核心实现
function ref(value) {
  return {
    __v_isRef: true,
    _value: value,
    get value() {
      track(this, 'value')
      return this._value
    },
    set value(newValue) {
      this._value = newValue
      trigger(this, 'value')
    },
  }
}

// reactive 的核心实现
function reactive(target) {
  return createReactiveObject(target)
}
```

#### 5. Vue 3 是如何追踪依赖的？`track` 和 `trigger` 的作用是什么？

**回答要点：**

- **数据结构**：`WeakMap<Target, Map<Key, Set<Effect>>>`
  - WeakMap：避免内存泄漏，对象销毁时自动清理
  - 第一层 Map：以目标对象为 key
  - 第二层 Map：以属性名为 key
  - Set：存储该属性的所有依赖（effect 函数）

- **track（依赖收集）**：
  - 在 getter 中调用
  - 将当前活跃的 effect 添加到依赖集合
  - 建立"属性 → effect"的映射关系

- **trigger（触发更新）**：
  - 在 setter 中调用
  - 从依赖集合中找到所有相关的 effect
  - 执行这些 effect 函数（触发视图更新）

### 2. 深入理解

#### 6. 什么是 WeakMap 在响应式系统中的作用？

**回答要点：**

- **防止内存泄漏**：WeakMap 的 key 是弱引用
- **自动垃圾回收**：当对象没有任何强引用时，即使它在 WeakMap 中作为 key，也会被 GC 回收
- **适合存储元数据**：不会阻止对象被回收，适合存储对象的响应式元信息

```javascript
// 如果使用普通 Map
const map = new Map()
const obj = { name: 'test' }
map.set(obj, deps)
obj = null // obj 仍被 map 引用，无法被 GC

// 使用 WeakMap
const weakMap = new WeakMap()
const obj = { name: 'test' }
weakMap.set(obj, deps)
obj = null // obj 可以被 GC，weakMap 中的条目自动清理
```

#### 7. 如何处理循环引用的对象？Vue 3 是如何避免栈溢出的？

**回答要点：**

- **使用缓存**：通过 `toRaw` 检查对象是否已经被代理过
- **WeakMap 缓存**：`rawToReactive` 映射存储原始对象到响应式对象的对应关系
- **避免重复代理**：如果对象已经有对应的响应式代理，直接返回

```javascript
const rawToReactive = new WeakMap()
const reactiveToRaw = new WeakMap()

function reactive(target) {
  // 如果已经代理过，直接返回
  const existingProxy = rawToReactive.get(target)
  if (existingProxy) {
    return existingProxy
  }

  // 如果是 Proxy 对象，直接返回
  if (reactiveToRaw.has(target)) {
    return target
  }

  const proxy = new Proxy(target, handlers)
  rawToReactive.set(target, proxy)
  reactiveToRaw.set(proxy, target)
  return proxy
}
```

#### 8. `shallowReactive` 和 `shallowRef` 的使用场景是什么？

**回答要点：**

- **shallowReactive**：
  - 只代理对象的第一层属性
  - 适用场景：大型对象只需要监听部分属性、冻结的数据结构
  - 性能优化：避免深层递归代理的开销

- **shallowRef**：
  - 只监听 value 的变化，不深度监听
  - 适用场景：大型列表数据、不需要深层响应式的场景
  - 配合 `triggerRef` 手动触发更新

```javascript
// shallowReactive 示例
const state = shallowReactive({
  user: { name: 'Tom', age: 20 }, // 替换整个 user 会触发更新
})
state.user.name = 'Jerry' // 不会触发更新
state.user = { name: 'Jerry', age: 21 } // 会触发更新

// shallowRef 示例
const list = shallowRef([])
list.value.push(item) // 不会触发更新
list.value = [...list.value, item] // 会触发更新
triggerRef(list) // 手动触发更新
```

#### 9. `toRaw` 和 `markRaw` 的区别和使用场景？

**回答要点：**

- **toRaw**：
  - 获取响应式对象的原始对象
  - 用于临时读取/修改，不触发响应式
  - 适用场景：性能优化、与第三方库交互

- **markRaw**：
  - 标记对象永远不被转换为响应式
  - 返回对象本身
  - 适用场景：不可变数据、第三方类实例、大型只读数据

```javascript
// toRaw 使用场景
const reactiveObj = reactive({ count: 0 })
const rawObj = toRaw(reactiveObj)
rawObj.count = 100 // 不会触发更新

// markRaw 使用场景
const immutableData = markRaw({ huge: 'data' })
const state = reactive({
  config: immutableData, // 不会被代理，节省性能
})

// 第三方类实例
class MyClass {
  constructor() {
    this.value = 0
  }
}
const instance = markRaw(new MyClass())
state.myInstance = instance // 不会被响应式化
```

#### 10. 如何在不触发响应式的情况下修改数据？

**回答要点：**

1. **使用 `toRaw`**：获取原始对象后修改
2. **使用 `shallowRef`**：只修改内层属性不触发更新
3. **批量更新**：在 `batch` 或 `nextTick` 中修改
4. **临时禁用**：使用标志位控制

```javascript
// 方法1：toRaw
const raw = toRaw(reactiveObj)
raw.property = newValue

// 方法2：shallowRef
const data = shallowRef({ nested: { value: 1 } })
data.value.nested.value = 2 // 不触发更新

// 方法3：直接修改内部属性
const state = reactive({ count: 0 })
state.__v_skip = true // 标记跳过（内部方法）
```

### 3. 源码级问题

#### 11. `effect` 函数是如何工作的？请描述其执行流程

**回答要点：**

1. **创建 effect**：包装传入的函数，创建 ReactiveEffect 实例
2. **执行函数**：设置 `activeEffect = effect`，执行 fn()
3. **依赖收集**：fn() 执行时访问响应式数据，触发 getter，调用 track()
4. **建立关联**：将 effect 添加到对应属性的依赖集合
5. **清理 effect**：执行完毕，重置 `activeEffect = null`
6. **触发更新**：数据变化时，trigger() 遍历依赖集合，执行所有 effect

```javascript
class ReactiveEffect {
  constructor(fn, scheduler) {
    this.fn = fn
    this.scheduler = scheduler
    this.active = true
  }

  run() {
    if (!this.active) {
      return this.fn()
    }

    try {
      activeEffect = this
      cleanupEffect(this) // 清理旧依赖
      return this.fn() // 执行函数，触发依赖收集
    } finally {
      activeEffect = null
    }
  }

  stop() {
    if (this.active) {
      cleanupEffect(this)
      this.active = false
    }
  }
}
```

#### 12. 什么是 `scheduler`？它在什么场景下使用？

**回答要点：**

- **scheduler 是一个调度函数**，控制 effect 何时执行
- **默认行为**：立即执行 effect
- **自定义场景**：
  - `computed`：使用 scheduler 标记脏状态，延迟计算
  - `watch`：使用 scheduler 实现异步/批量更新
  - 性能优化：防抖、节流、批处理

```javascript
// computed 中的 scheduler
const computedEffect = new ReactiveEffect(getterFn, () => {
  // scheduler：标记为 dirty，不立即执行
  computed._dirty = true
  trigger(computed, 'value')
})

// watch 中的 scheduler
const watchEffect = new ReactiveEffect(fn, () => {
  queueJob(job) // 加入异步队列，批量执行
})
```

#### 13. `computed` 的缓存机制是如何实现的？

**回答要点：**

- **核心变量**：`_dirty` 标记、`_cacheable` 缓存值
- **惰性求值**：只在首次访问或依赖变化时重新计算
- **实现流程**：
  1. 首次访问：`_dirty = true`，执行 getter，缓存结果
  2. 依赖变化：trigger 设置 `_dirty = true`
  3. 再次访问：如果 `_dirty = false`，直接返回缓存值

```javascript
function computed(getter) {
  let _dirty = true
  let _value

  const effect = new ReactiveEffect(
    getter,
    () => {
      _dirty = true
    } // scheduler：标记脏
  )

  return {
    get value() {
      if (_dirty) {
        _value = effect.run()
        _dirty = false
      }
      track(computed, 'value')
      return _value
    },
  }
}
```

#### 14. `watch` 和 `watchEffect` 的底层实现有什么区别？

**回答要点：**

- **watchEffect**：
  - 立即执行，自动收集依赖
  - 无法访问新旧值
  - 适合副作用操作

- **watch**：
  - 惰性执行（默认），需要指定监听源
  - 可以访问新旧值
  - 可以监听多个数据源
  - 内部使用 getter 函数包裹

```javascript
// watchEffect 实现
function watchEffect(effect, options) {
  return doWatch(effect, null, options)
}

// watch 实现
function watch(source, cb, options) {
  return doWatch(source, cb, options)
}

function doWatch(source, cb, options) {
  let getter

  if (isRef(source)) {
    getter = () => source.value
  } else if (isReactive(source)) {
    getter = () => source
    options.deep = true
  } else if (isFunction(source)) {
    getter = source
  }

  // 如果有 cb，就是 watch，否则是 watchEffect
  const job = () => {
    const newValue = getter()
    if (cb) {
      cb(newValue, oldValue)
    }
  }

  const effect = new ReactiveEffect(getter, job)
}
```

#### 15. 如何从源码层面排查"视图不更新"的问题？

**回答要点：**
**排查步骤：**

1. **检查是否使用了响应式 API**：`ref`/`reactive`/`computed`
2. **检查依赖是否被正确追踪**：在 getter 中打断点，看 track 是否调用
3. **检查更新是否被触发**：在 setter 中打断点，看 trigger 是否调用
4. **检查 effect 是否被正确执行**：查看依赖集合中是否有 effect
5. **检查是否有异步问题**：使用 `nextTick` 等待 DOM 更新

**常见原因：**

- 使用 `shallowRef` 修改了内层属性
- 解构丢失响应式（应使用 `toRefs`）
- 直接替换 reactive 对象
- 在非响应式对象上修改
- 闭包捕获了旧值

```javascript
// 错误示例
const { count } = reactive({ count: 0 }) // 解构丢失响应式
count++ // 不会触发更新

// 正确示例
const state = reactive({ count: 0 })
const { count } = toRefs(state) // 保持响应式
count.value++
```

## 二、虚拟 DOM 与 Diff 算法

### 1. 核心概念

#### 16. 什么是虚拟 DOM？它解决了什么问题？

**回答要点：**

- **虚拟 DOM**：用 JavaScript 对象描述真实 DOM 树的结构
- **解决的问题**：
  1. **减少 DOM 操作**：DOM 操作昂贵，虚拟 DOM 先在内存中计算差异
  2. **跨平台渲染**：可以渲染到不同平台（Web、Native、SSR）
  3. **批量更新**：多次状态变化合并为一次 DOM 更新
  4. **声明式编程**：开发者只需关心状态，不需手动操作 DOM

```javascript
// 虚拟 DOM 结构示例
const vnode = {
  type: 'div',
  props: { id: 'app', class: 'container' },
  children: [
    { type: 'h1', props: null, children: 'Hello' },
    { type: 'p', props: null, children: 'World' },
  ],
}
```

#### 17. Vue 3 的虚拟 DOM 结构与 Vue 2 有什么不同？

**回答要点：**

- **Vue 2**：

  ```javascript
  {
    tag: 'div',
    data: { attrs: {}, on: {} },
    children: [],
    text: undefined,
    elm: undefined,
    key: undefined
  }
  ```

- **Vue 3**（优化后）：

  ```javascript
  {
    __v_isVNode: true,
    type: 'div',
    props: { id: 'app' },
    key: undefined,
    ref: null,
    children: [],
    shapeFlag: 7, // 二进制标记节点类型
    patchFlag: 1, // Patch Flags 标记动态内容
    dynamicProps: ['id'] // 动态属性列表
  }
  ```

- **优化点**：
  1. 扁平化结构，减少嵌套
  2. 引入 `shapeFlag` 和 `patchFlag` 优化 Diff
  3. 静态节点提升
  4. Block Tree 结构

#### 18. 请描述 Vue 3 的 Diff 算法流程

**回答要点：**
**Diff 算法核心步骤：**

1. **节点类型比较**：
   - 类型不同：直接替换节点
   - 类型相同：更新属性，Diff 子节点

2. **子节点 Diff 策略**：
   - 旧子节点为空，新子节点有：挂载新节点
   - 新子节点为空，旧子节点有：卸载旧节点
   - 都有子节点：进入核心 Diff 算法

3. **核心 Diff 算法（双端比较 + 最长递增子序列）**：
   - 从两端向中间比较（头头、尾尾、头尾、尾头）
   - 处理乱序节点：构建索引映射
   - 计算最长递增子序列，最小化移动
   - 挂载新节点，删除旧节点

```javascript
function patchChildren(c1, c2, container) {
  if (c1 === c2) return

  const isC1Array = Array.isArray(c1)
  const isC2Array = Array.isArray(c2)

  if (isC1Array && isC2Array) {
    // 数组到数组：核心 Diff 算法
    patchKeyedChildren(c1, c2, container)
  } else if (isC1Array && !isC2Array) {
    // 数组到文本：删除旧节点，设置文本
    unmountChildren(c1)
    setElementText(container, c2)
  } else if (!isC1Array && isC2Array) {
    // 文本到数组：清空文本，挂载新节点
    setElementText(container, '')
    mountChildren(c2, container)
  }
}
```

#### 19. 什么是"最长递增子序列"在 Diff 算法中的作用？

**回答要点：**

- **作用**：最小化 DOM 移动次数
- **原理**：找到不需要移动的最长节点序列，只移动其他节点
- **示例**：

  ```
  旧：[A, B, C, D, E]
  新：[A, C, B, D, E]

  最长递增子序列：[A, C, D, E] 或 [A, B, D, E]（索引递增）
  只需要移动 B 或 C
  ```

- **算法实现**：
  ```javascript
  function getSequence(arr) {
    const result = [0]
    const p = result.slice()

    for (let i = 0; i < arr.length; i++) {
      const arrI = arr[i]
      if (arrI !== 0) {
        let j = result.length - 1
        let resultJ = result[j]

        // 二分查找
        while (j >= 0 && arr[resultJ] > arrI) {
          j--
          resultJ = result[j]
        }

        if (arr[resultJ] < arrI) {
          result.push(i)
          p[i] = resultJ
          continue
        }

        result[j] = i
      }
    }

    // 回溯构建序列
    let l = result.length
    let last = result[l - 1]
    while (l-- > 0) {
      result[l] = last
      last = p[last]
    }

    return result
  }
  ```

#### 20. 静态节点提升（Static Hoisting）是如何优化的？

**回答要点：**

- **原理**：编译时将静态节点提升到渲染函数外部
- **优化效果**：
  - 避免重复创建静态 VNode
  - 减少内存分配
  - 跳过静态节点的 Diff

- **编译前**：

  ```javascript
  function render() {
    return h('div', [
      h('span', '静态文本'), // 每次渲染都创建
      h('p', dynamicText),
    ])
  }
  ```

- **编译后**：

  ```javascript
  const hoisted_1 = h('span', '静态文本') // 提升到外部

  function render() {
    return h('div', [
      hoisted_1, // 复用，不重新创建
      h('p', dynamicText),
    ])
  }
  ```

- **性能提升**：静态节点越多，优化效果越明显

### 2. Diff 算法详解

#### 21. Vue 3 的 Diff 算法相比 Vue 2 有哪些性能提升？

**回答要点：**

1. **Patch Flags**：编译时标记动态内容，运行时跳过静态节点
2. **Block Tree**：将模板打平为一维数组，减少遍历层级
3. **静态提升**：静态节点不参与 Diff
4. **事件缓存**：静态事件处理器缓存
5. **最长递增子序列**：最小化 DOM 移动

**性能对比**：

- Vue 2：O(n³) 复杂度（理论最坏情况）
- Vue 3：O(n) 复杂度（启发式算法）
- 更新性能提升 1.3~2 倍
- 内存使用减少约 50%

#### 22. 请解释"双端比较"算法的原理

**回答要点：**
**双端比较策略**：同时从新旧列表的两端开始比较

1. **旧头 vs 新头**：相同则更新，指针都向后
2. **旧尾 vs 新尾**：相同则更新，指针都向前
3. **旧头 vs 新尾**：相同则移动节点到末尾，旧头向后，新尾向前
4. **旧尾 vs 新头**：相同则移动节点到开头，旧尾向前，新头向后
5. **以上都不匹配**：使用 key 查找，找不到则创建新节点

```javascript
let oldStartIdx = 0
let oldEndIdx = c1.length - 1
let newStartIdx = 0
let newEndIdx = c2.length - 1

while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
  if (sameVnode(c1[oldStartIdx], c2[newStartIdx])) {
    // 旧头 === 新头
    patch(c1[oldStartIdx], c2[newStartIdx])
    oldStartIdx++
    newStartIdx++
  } else if (sameVnode(c1[oldEndIdx], c2[newEndIdx])) {
    // 旧尾 === 新尾
    patch(c1[oldEndIdx], c2[newEndIdx])
    oldEndIdx--
    newEndIdx--
  } else if (sameVnode(c1[oldStartIdx], c2[newEndIdx])) {
    // 旧头 === 新尾：移动到末尾
    patch(c1[oldStartIdx], c2[newEndIdx])
    move(c1[oldStartIdx], c2[newEndIdx])
    oldStartIdx++
    newEndIdx--
  } else if (sameVnode(c1[oldEndIdx], c2[newStartIdx])) {
    // 旧尾 === 新头：移动到开头
    patch(c1[oldEndIdx], c2[newStartIdx])
    move(c1[oldEndIdx], c2[newStartIdx])
    oldEndIdx--
    newStartIdx++
  } else {
    // 都不匹配，使用 key 查找
    // ...
  }
}
```

#### 23. 什么是 `key` 的作用？为什么不能使用 `index` 作为 `key`？

**回答要点：**

- **key 的作用**：
  1. 唯一标识 VNode，帮助 Diff 算法识别节点
  2. 复用 DOM 元素，提升性能
  3. 保持组件状态（输入框内容、滚动位置等）

- **为什么不能用 index**：

  ```javascript
  // 错误示例
  <div v-for="(item, index) in list" :key="index">
    {{ item.name }}
  </div>

  // 问题：列表增删时，index 会变化
  // 原列表：[A, B, C]  key: 0, 1, 2
  // 删除 B 后：[A, C]    key: 0, 1
  // C 的 key 从 2 变成 1，会被误认为是新节点
  // 导致不必要的 DOM 操作和状态丢失
  ```

- **正确的 key**：使用唯一标识（如 id）
  ```javascript
  <div v-for="item in list" :key="item.id">
    {{ item.name }}
  </div>
  ```

#### 24. 如何处理列表的增删改操作？Diff 算法是如何优化的？

**回答要点：**
**增加节点**：

- 尾部添加：直接挂载，性能最优
- 头部添加：所有节点后移，需要移动 DOM
- 中间添加：后面节点都需要移动

**删除节点**：

- 尾部删除：直接卸载，性能最优
- 头部删除：所有节点前移
- 中间删除：后面节点都需要移动

**修改节点**：

- 位置不变：只更新属性
- 位置变化：移动 DOM 节点

**优化策略**：

1. 使用 key 精准识别节点
2. 最长递增子序列减少移动
3. 复用 DOM 元素

#### 25. 什么是"快速 Diff"算法？

**回答要点：**

- **快速 Diff**：Vue 3 采用的优化 Diff 策略
- **核心思想**：通过预处理减少不必要的比较

**优化步骤**：

1. **相同前缀处理**：从头开始比较，相同部分直接 patch
2. **相同后缀处理**：从尾开始比较，相同部分直接 patch
3. **中间部分处理**：只对变化部分进行完整 Diff

```javascript
// 示例
旧：[A, B, C, D, E]
新：[A, B, X, Y, E]

// 步骤1：处理相同前缀 [A, B]
// 步骤2：处理相同后缀 [E]
// 步骤3：只 Diff 中间部分 [C, D] → [X, Y]
```

**性能提升**：大部分场景下，列表变化只在末尾，快速 Diff 可以跳过大量比较

### 3. 性能优化

#### 26. Vue 3 的编译时优化有哪些？

**回答要点：**

1. **静态节点提升（Static Hoisting）**：静态节点提升到渲染函数外
2. **Patch Flags**：标记动态节点类型，运行时跳过静态节点
3. **Block Tree**：将模板打平，收集动态节点
4. **静态属性提升**：静态 props 对象缓存
5. **事件缓存**：静态事件处理器缓存
6. **hoistStatic**：编译选项，控制静态提升

**优化效果**：

- 更新性能提升 2~5 倍
- 内存使用减少约 50%
- 首次渲染略有提升

#### 27. 什么是 Patch Flags？它们是如何工作的？

**回答要点：**

- **Patch Flags**：编译时为动态节点添加的二进制标记
- **作用**：运行时只更新标记的动态部分，跳过静态部分

**常见 Flags**：

```javascript
export const PatchFlags = {
  TEXT: 1, // 动态文本节点
  CLASS: 2, // 动态 class
  STYLE: 4, // 动态 style
  PROPS: 8, // 动态 props（非 class/style）
  FULL_PROPS: 16, // 动态 props（key 不确定）
  HYDRATE_EVENTS: 32, // 事件监听器
  STABLE_FRAGMENT: 64, // 稳定 fragment
  KEYED_FRAGMENT: 128, // 带 key 的 fragment
  UNKEYED_FRAGMENT: 256, // 不带 key 的 fragment
  NEED_PATCH: 512, // 需要 patch
  DYNAMIC_SLOTS: 1024, // 动态 slot
  HOISTED: -1, // 静态节点
}
```

**工作原理**：

```javascript
// 编译前
<div class="static" :id="dynamicId">{{ text }}</div>

// 编译后
h('div',
  { class: 'static', id: dynamicId },
  text,
  PatchFlags.TEXT | PatchFlags.PROPS, // 标记动态内容
  ['id'] // 动态属性名
)

// 运行时
if (patchFlag & PatchFlags.TEXT) {
  // 只更新文本
}
if (patchFlag & PatchFlags.PROPS) {
  // 只更新 props
}
```

#### 28. 请描述 Block Tree 的概念和作用

**回答要点：**

- **Block Tree**：Vue 3 引入的优化结构
- **问题**：传统虚拟 DOM 是树形结构，Diff 需要递归遍历
- **解决**：将树形结构打平为一维数组，只收集动态节点

**Block 的定义**：

- 带有 `patchFlag` 的节点
- 包含 `dynamicChildren` 数组（动态子节点）
- 根节点、v-for、v-if/v-else 会创建 Block

**示例**：

```javascript
// 模板
<div>
  <div class="static">静态内容</div>
  <p>{{ dynamicText }}</p>
  <div>
    <span :class="dynamicClass">嵌套动态</span>
  </div>
</div>

// Block Tree 结构
{
  type: 'div',
  dynamicChildren: [
    { type: 'p', children: dynamicText, patchFlag: 1 },
    { type: 'span', class: dynamicClass, patchFlag: 2 }
  ]
}
```

**优化效果**：

- Diff 时只需遍历 `dynamicChildren`
- 跳过所有静态节点
- 时间复杂度从 O(n) 降到 O(动态节点数)

#### 29. 静态节点和动态节点是如何区分的？

**回答要点：**

- **编译时分析**：编译器遍历 AST，标记节点类型
- **判断规则**：
  1. **静态节点**：不包含任何动态绑定（`:prop`、`@event`、`{{ }}`）
  2. **动态节点**：包含任何动态内容
  3. **静态根节点**：所有子节点都是静态节点

**编译器处理**：

```javascript
// 编译器标记
function transformElement(node, context) {
  // 检查是否有动态绑定
  const hasDynamicProps = props.some(
    p => p.type === NodeTypes.DIRECTIVE || p.value.type === NodeTypes.INTERPOLATION
  )

  if (!hasDynamicProps) {
    node.patchFlag = PatchFlags.HOISTED // 标记为静态
  } else {
    node.patchFlag = calculatePatchFlags(props) // 计算动态标记
  }
}
```

#### 30. 如何从源码层面分析和优化渲染性能？

**回答要点：**
**分析工具**：

1. **Vue DevTools**：查看组件渲染时间
2. **Performance API**：记录渲染耗时
3. **Chrome DevTools**：分析 DOM 操作

**优化策略**：

1. **使用 v-once**：标记不需要更新的节点

   ```html
   <div v-once>{{ staticContent }}</div>
   ```

2. **使用 v-memo**：缓存节点（Vue 3.2+）

   ```html
   <div v-memo="[dep1, dep2]">{{ expensiveContent }}</div>
   ```

3. **组件拆分**：将频繁更新的部分独立成组件

4. **使用 shallowRef**：减少响应式开销

5. **虚拟滚动**：大列表只渲染可视区域

**源码级调试**：

```javascript
// 在 render 函数中打断点
function renderComponent(instance) {
  console.time('render')
  const vnode = instance.render()
  console.timeEnd('render')
  return vnode
}
```

## 三、编译优化

### 1. 编译原理

#### 31. Vue 3 的编译器工作流程是什么？

**回答要点：**
**编译三阶段**：

1. **Parse（解析）**：
   - 将模板字符串转换为 AST（抽象语法树）
   - 识别标签、属性、指令、插值等
   - 处理 HTML 特殊语法（自闭合标签、注释等）

2. **Transform（转换）**：
   - 遍历 AST，应用各种转换函数
   - 静态分析：标记静态节点、静态根
   - 优化分析：计算 Patch Flags、收集动态属性
   - 插件机制：可扩展转换逻辑

3. **Generate（生成）**：
   - 将优化后的 AST 转换为 JavaScript 代码
   - 生成渲染函数
   - 处理静态提升、事件缓存等优化

```javascript
// 编译器入口
function compile(template, options) {
  // 1. Parse
  const ast = baseParse(template, options)

  // 2. Transform
  transform(ast, {
    ...options,
    nodeTransforms: [
      transformElement,
      transformExpressions,
      transformText,
      // ...
    ],
  })

  // 3. Generate
  const code = generate(ast, options)

  return {
    ast,
    code: code.code,
  }
}
```

#### 32. 模板是如何被编译成渲染函数的？

**回答要点：**
**编译示例**：

```html
<!-- 模板 -->
<div id="app" class="container">
  <h1>{{ title }}</h1>
  <p v-if="show">{{ message }}</p>
  <button @click="handleClick">点击</button>
</div>
```

```javascript
// 生成的渲染函数
import {
  createVNode as _createVNode,
  toDisplayString as _toDisplayString,
  openBlock as _openBlock,
  createBlock as _createBlock,
} from 'vue'

export function render(_ctx, _cache) {
  return (
    _openBlock(),
    _createBlock(
      'div',
      {
        id: 'app',
        class: 'container',
      },
      [
        _createVNode('h1', null, _toDisplayString(_ctx.title), 1 /* TEXT */),
        _ctx.show
          ? (_openBlock(),
            _createBlock('p', { key: 0 }, _toDisplayString(_ctx.message), 1 /* TEXT */))
          : _createVNode('!'),
        _createVNode(
          'button',
          {
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick(...args)),
          },
          '点击'
        ),
      ]
    )
  )
}
```

**关键点**：

- `createVNode`：创建虚拟节点
- `openBlock` + `createBlock`：创建 Block
- `toDisplayString`：处理插值表达式
- Patch Flags 标记动态内容
- 事件缓存优化

#### 33. 什么是 AST（抽象语法树）？它在编译中的作用是什么？

**回答要点：**

- **AST**：Abstract Syntax Tree，代码的树状抽象表示
- **作用**：
  1. **结构化表示**：将字符串模板转换为可操作的数据结构
  2. **静态分析**：分析节点的动态/静态属性
  3. **优化转换**：应用各种优化策略
  4. **代码生成**：基于 AST 生成目标代码

**AST 节点示例**：

```javascript
{
  type: 1, // Element
  tag: "div",
  props: [
    {
      type: 6, // Attribute
      name: "id",
      value: { content: "app" }
    }
  ],
  children: [
    {
      type: 1,
      tag: "h1",
      children: [
        {
          type: 5, // Interpolation
          content: {
            type: 4, // SimpleExpression
            content: "title",
            isStatic: false
          }
        }
      ]
    }
  ]
}
```

#### 34. Vue 3 的编译器做了哪些静态分析优化？

**回答要点：**

1. **静态节点标记**：识别不含动态绑定的节点
2. **静态根提升**：将整个静态子树提升
3. **Patch Flags 计算**：标记节点的动态类型
4. **动态属性收集**：记录所有动态属性名
5. **事件缓存**：静态事件处理器缓存为内联函数
6. **hoistStatic 选项**：控制静态提升层级

**静态分析示例**：

```javascript
// 编译器判断静态节点
function isStaticNode(node) {
  if (node.type === NodeTypes.ELEMENT) {
    // 检查是否有动态 props
    if (node.props.some(isDynamicProp)) return false
    // 递归检查子节点
    return node.children.every(isStaticNode)
  }
  if (node.type === NodeTypes.TEXT) {
    return true
  }
  if (node.type === NodeTypes.INTERPOLATION) {
    return false // 插值是动态的
  }
  return false
}
```

#### 35. 请描述编译阶段的三个主要步骤

**回答要点：**
**详细流程**：

**Step 1: Parse（解析）**

- 词法分析：识别标签、属性、文本
- 语法分析：构建 AST 树
- 处理边界情况：自闭合标签、注释、CDATA

**Step 2: Transform（转换）**

- 深度优先遍历 AST
- 应用 nodeTransforms（节点转换）
- 应用 directiveTransforms（指令转换）
- 静态提升分析
- Patch Flags 计算

**Step 3: Generate（生成）**

- 遍历 AST 生成代码
- 处理静态提升代码
- 生成渲染函数
- 生成源码映射（Source Map）

```javascript
// Transform 阶段的核心逻辑
function transformNode(node, context) {
  // 应用所有节点转换函数
  for (const transform of context.nodeTransforms) {
    transform(node, context)
  }

  // 处理 props
  for (const prop of node.props) {
    if (prop.type === NodeTypes.DIRECTIVE) {
      // 应用指令转换
      const directiveTransform = context.directiveTransforms[prop.name]
      if (directiveTransform) {
        directiveTransform(prop, node, context)
      }
    }
  }

  // 递归转换子节点
  for (const child of node.children) {
    transformNode(child, context)
  }
}
```

### 2. 优化策略

#### 36. 什么是"树打平"优化？它解决了什么问题？

**回答要点：**

- **树打平**：Block Tree 优化，将树形结构打平为一维数组
- **解决的问题**：
  1. 传统 Diff 需要递归遍历整棵树
  2. 大部分节点是静态的，不需要比较
  3. 递归遍历性能开销大

**优化前**（树形结构）：

```
diff(root) {
  diff(child1) {
    diff(grandchild1)
    diff(grandchild2)
  }
  diff(child2) {
    diff(grandchild3)
  }
}
```

**优化后**（一维数组）：

```
dynamicChildren = [child1, grandchild1, child2]
for (const child of dynamicChildren) {
  diff(child) // 只遍历动态节点
}
```

**性能提升**：更新时跳过 80%+ 的静态节点

#### 37. 编译时是如何标记动态节点和静态节点的？

**回答要点：**
**标记规则**：

1. **静态节点**（PatchFlags.HOISTED = -1）：
   - 没有任何动态绑定
   - 所有子节点都是静态的

2. **动态文本**（PatchFlags.TEXT = 1）：
   - 只有 `{{ }}` 插值是动态的

3. **动态 Class**（PatchFlags.CLASS = 2）：
   - 只有 `:class` 是动态的

4. **动态 Style**（PatchFlags.STYLE = 4）：
   - 只有 `:style` 是动态的

5. **动态 Props**（PatchFlags.PROPS = 8）：
   - 有动态属性（非 class/style）
   - 属性名是静态的

6. **完整 Props**（PatchFlags.FULL_PROPS = 16）：
   - 属性名是动态的（如 `:[key]="value"`）

**计算逻辑**：

```javascript
function calculatePatchFlags(props) {
  let flags = 0

  for (const prop of props) {
    if (prop.name === 'class' && isDynamic(prop)) {
      flags |= PatchFlags.CLASS
    } else if (prop.name === 'style' && isDynamic(prop)) {
      flags |= PatchFlags.STYLE
    } else if (isDynamic(prop)) {
      if (isDynamicName(prop)) {
        flags |= PatchFlags.FULL_PROPS
      } else {
        flags |= PatchFlags.PROPS
      }
    }
  }

  return flags
}
```

#### 38. 什么是 `hoistStatic` 优化？

**回答要点：**

- **hoistStatic**：编译选项，控制是否启用静态提升
- **默认值**：`true`（生产环境启用）
- **作用**：将静态节点/属性提升到渲染函数外部

**配置示例**：

```javascript
compile(template, {
  hoistStatic: true, // 启用静态提升
})
```

**提升层级**：

1. **静态节点**：整个 VNode 提升
2. **静态 props 对象**：props 对象提升
3. **静态子树**：如果父节点是静态的，子树也提升

**生成代码**：

```javascript
// hoistStatic: true
const _hoisted_1 = { class: 'static-class' }
const _hoisted_2 = /*#__PURE__*/ _createVNode('div', null, '静态内容')

function render() {
  return _createVNode('div', _hoisted_1, [_hoisted_2])
}

// hoistStatic: false
function render() {
  return _createVNode('div', { class: 'static-class' }, [_createVNode('div', null, '静态内容')])
}
```

#### 39. 编译优化对运行时性能有什么影响？

**回答要点：**
**性能提升数据**（官方基准测试）：

| 优化项      | 首次渲染 | 更新渲染   |
| ----------- | -------- | ---------- |
| 静态提升    | +10%     | -          |
| Patch Flags | +5%      | +100%~300% |
| Block Tree  | -        | +100%~500% |
| 事件缓存    | +5%      | -          |
| 综合优化    | +20%     | +200%~500% |

**影响分析**：

1. **首次渲染**：提升较小（10%~20%），主要是减少 VNode 创建
2. **更新渲染**：提升显著（2~5 倍），跳过静态节点 Diff
3. **内存使用**：减少约 50%，静态节点只创建一次
4. **包体积**：略有增加（优化代码），但 gzip 后差异很小

**适用场景**：

- 静态内容多的页面：优化效果显著
- 动态内容多的页面：优化效果有限
- 列表渲染：主要依赖虚拟滚动优化

#### 40. 如何通过编译产物分析优化效果？

**回答要点：**
**分析方法**：

1. **查看生成的代码**：

   ```javascript
   import { compile } from 'vue/compiler-sfc'

   const { code } = compile(`<div>{{ msg }}</div>`, {
     mode: 'module',
   })
   console.log(code)
   ```

2. **检查静态提升**：
   - 搜索 `const _hoisted_`
   - 查看提升的节点数量

3. **检查 Patch Flags**：
   - 搜索数字标记（1, 2, 4, 8, 16）
   - 验证动态内容是否正确标记

4. **检查 Block Tree**：
   - 搜索 `openBlock` 和 `createBlock`
   - 查看 `dynamicChildren` 数组

5. **使用 Vue SFC Playground**：
   - 访问：https://sfc.vuejs.org/
   - 实时查看编译产物

**优化验证**：

```javascript
// 优化前
function render() {
  return h('div', [h('span', 'static'), h('p', this.msg)])
}

// 优化后
const _hoisted_1 = h('span', 'static')
function render() {
  return h('div', [_hoisted_1, h('p', this.msg, 1)])
}
// 静态节点被提升，动态节点有 Patch Flag
```

## 四、TypeScript 深度应用

### 1. 类型系统

#### 41. TypeScript 中的 `interface` 和 `type` 有什么区别？

**回答要点：**

| 特性     | interface | type            |
| -------- | --------- | --------------- |
| 扩展     | `extends` | `&`（交叉类型） |
| 声明合并 | ✅ 支持   | ❌ 不支持       |
| 基本类型 | ❌ 不支持 | ✅ 支持         |
| 元组     | ❌ 不支持 | ✅ 支持         |
| 计算属性 | ❌ 不支持 | ✅ 支持         |
| 条件类型 | ❌ 不支持 | ✅ 支持         |

**使用建议**：

- **优先使用 interface**：定义对象结构、类、API 接口
- **使用 type**：联合类型、交叉类型、工具类型、复杂类型

```typescript
// interface：适合对象结构
interface User {
  name: string
  age: number
}

interface Admin extends User {
  role: string
}

// type：适合复杂类型
type Status = 'pending' | 'success' | 'error'
type Result<T> = { success: true; data: T } | { success: false; error: string }
type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }
```

#### 42. 什么是泛型约束？如何实现一个类型安全的工具函数？

**回答要点：**

- **泛型约束**：使用 `extends` 限制泛型的类型范围
- **目的**：在保持灵活性的同时，确保类型安全

```typescript
// 基础泛型约束
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const user = { name: 'Tom', age: 20 }
getProperty(user, 'name') // ✅
getProperty(user, 'email') // ❌ 类型错误

// 复杂约束
interface HasLength {
  length: number
}

function logLength<T extends HasLength>(value: T): void {
  console.log(value.length)
}

logLength('hello') // ✅ string 有 length
logLength([1, 2, 3]) // ✅ array 有 length
logLength(123) // ❌ number 没有 length

// 实际应用：类型安全的 pick
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce(
    (acc, key) => {
      acc[key] = obj[key]
      return acc
    },
    {} as Pick<T, K>
  )
}
```

#### 43. 如何使用 TypeScript 实现类型守卫？

**回答要点：**
**类型守卫**：在运行时检查类型，在编译时缩窄类型

**方式1：typeof**

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string'
}
```

**方式2：instanceof**

```typescript
function isError(value: unknown): value is Error {
  return value instanceof Error
}
```

**方式3：in**

```typescript
interface Fish {
  swim(): void
}
interface Bird {
  fly(): void
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}
```

**方式4：自定义谓词**

```typescript
interface ApiResponse<T> {
  code: number
  data: T
}

function isSuccessResponse<T>(
  response: ApiResponse<T> | { code: number; message: string }
): response is ApiResponse<T> {
  return 'data' in response
}
```

#### 44. 什么是条件类型？请举例说明其应用场景

**回答要点：**

- **条件类型**：`T extends U ? X : Y`，根据类型条件选择不同的类型
- **应用场景**：工具类型、类型推断、类型转换

```typescript
// 基础示例
type IsString<T> = T extends string ? true : false
type A = IsString<'hello'> // true
type B = IsString<123> // false

// 推断类型
type Flatten<T> = T extends Array<infer U> ? U : T
type C = Flatten<number[]> // number
type D = Flatten<string> // string

// 提取函数返回类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any

// 实际应用：Promise 解包
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
type E = UnwrapPromise<Promise<string>> // string

// 复杂应用：DeepPartial
type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T
```

#### 45. 如何实现一个深度只读类型 `DeepReadonly<T>`？

**回答要点：**

```typescript
type DeepReadonly<T> = T extends Function
  ? T
  : T extends object
    ? { readonly [P in keyof T]: DeepReadonly<T[P]> }
    : T

// 使用示例
interface Config {
  name: string
  settings: {
    theme: 'light' | 'dark'
    fontSize: number
  }
  onChange: () => void
}

type ReadonlyConfig = DeepReadonly<Config>
// {
//   readonly name: string;
//   readonly settings: {
//     readonly theme: 'light' | 'dark';
//     readonly fontSize: number;
//   };
//   readonly onChange: () => void;
// }

// Vue 3 中的实际应用
const state = reactive({ count: 0 })
type StateType = DeepReadonly<typeof state>
```

### 2. Vue + TypeScript

#### 46. 如何在 Vue 3 组件中正确使用 TypeScript 类型？

**回答要点：**
**方式1：`<script setup>` + 泛型**

```vue
<script setup lang="ts" generic="T extends { id: number }">
interface Props {
  items: T[]
  selected: T | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  select: [item: T]
  delete: [id: number]
}>()
</script>
```

**方式2：`defineProps` + 类型**

```vue
<script setup lang="ts">
const props = defineProps<{
  title: string
  count?: number
}>()

const emit = defineEmits<{
  (e: 'update', value: string): void
  (e: 'delete', id: number): void
}>()
</script>
```

**方式3：`withDefaults`**

```vue
<script setup lang="ts">
interface Props {
  title: string
  count?: number
  theme?: 'light' | 'dark'
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  theme: 'light',
})
</script>
```

#### 47. `defineProps<T>()` 和 `withDefaults` 的类型推导原理是什么？

**回答要点：**

- **defineProps**：编译宏，由编译器在编译时处理
- **类型推导**：
  1. 编译器解析泛型参数 `T`
  2. 提取必需属性和可选属性
  3. 生成对应的 props 声明
  4. 返回类型化的 props 对象

- **withDefaults**：
  1. 接收 `defineProps` 的返回值
  2. 接收默认值对象
  3. 将必需属性标记为可选
  4. 合并默认值

```typescript
// 编译器转换前
const props = withDefaults(defineProps<Props>(), {
  count: 0,
})

// 编译器转换后（伪代码）
const props = __defaults(__defineProps<Props>(), { count: 0 })
```

#### 48. 如何为自定义 Hook 编写完整的类型声明？

**回答要点：**

```typescript
// useFetch.ts
import { ref, computed, Ref } from 'vue'

interface UseFetchOptions {
  immediate?: boolean
  watch?: Ref<any>
}

interface UseFetchReturn<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<Error | null>
  fetchData: () => Promise<void>
}

export function useFetch<T>(url: string, options: UseFetchOptions = {}): UseFetchReturn<T> {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchData = async () => {
    loading.value = true
    try {
      const response = await fetch(url)
      data.value = await response.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  if (options.immediate) {
    fetchData()
  }

  return {
    data,
    loading,
    error,
    fetchData,
  }
}

// 使用
const { data, loading } = useFetch<User[]>('/api/users', {
  immediate: true,
})
```

#### 49. 什么是模板类型检查？它的工作原理是什么？

**回答要点：**

- **模板类型检查**：在 `.vue` 文件的 `<template>` 中进行类型检查
- **工具**：Volar（Vue 官方语言服务器）
- **工作原理**：
  1. 解析模板中的表达式
  2. 提取变量和属性
  3. 与 `<script>` 中的类型对比
  4. 报告类型错误

**示例**：

```vue
<script setup lang="ts">
const user = { name: 'Tom', age: 20 }
</script>

<template>
  <!-- ✅ 类型正确 -->
  <div>{{ user.name }}</div>

  <!-- ❌ 类型错误：Property 'email' does not exist -->
  <div>{{ user.email }}</div>

  <!-- ❌ 类型错误：Operator '+' cannot be applied -->
  <div>{{ user.name + 1 }}</div>
</template>
```

#### 50. 如何在 `.d.ts` 文件中扩展第三方库的类型？

**回答要点：**
**方式1：模块扩展**

```typescript
// types/vue-router.d.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    roles?: string[]
  }
}
```

**方式2：全局类型扩展**

```typescript
// types/global.d.ts
export {}

declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: boolean
  }
}
```

**方式3：组件类型扩展**

```typescript
// types/components.d.ts
import { ComponentCustomProperties } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $http: typeof axios
    $translate: (key: string) => string
  }
}
```

**配置 tsconfig.json**：

```json
{
  "compilerOptions": {
    "typeRoots": ["./node_modules/@types", "./types"]
  }
}
```

### 3. 高级类型

#### 51. 什么是映射类型？请实现一个 `Partial<T>` 的自定义版本

**回答要点：**

- **映射类型**：基于已有类型创建新类型，遍历属性并转换

```typescript
// 内置 Partial
type Partial<T> = {
  [P in keyof T]?: T[P]
}

// 自定义实现
type MyPartial<T> = {
  [P in keyof T]?: T[P]
}

// 其他映射类型
type Required<T> = {
  [P in keyof T]-?: T[P] // -? 移除可选
}

type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type Record<K extends keyof any, T> = {
  [P in K]: T
}

// 高级映射：添加前缀
type WithPrefix<T, Prefix extends string> = {
  [P in keyof T as `${Prefix}${Capitalize<string & P>}`]: T[P]
}

type UserEvents = WithPrefix<
  {
    click: () => void
    change: (value: string) => void
  },
  'on'
>
// { onClick: () => void; onChange: (value: string) => void }
```

#### 52. 如何使用 `infer` 关键字提取函数返回类型？

**回答要点：**

- **infer**：在条件类型中推断类型

```typescript
// 提取返回类型
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never

function getUser() {
  return { name: 'Tom', age: 20 }
}

type User = MyReturnType<typeof getUser>
// { name: string; age: number }

// 提取参数类型
type MyParameters<T> = T extends (...args: infer P) => any ? P : never

function createUser(name: string, age: number) {}
type CreateParams = MyParameters<typeof createUser>
// [name: string, age: number]

// 提取 Promise 类型
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

async function fetchData() {
  return { data: [] }
}

type FetchResult = UnwrapPromise<ReturnType<typeof fetchData>>
// { data: any[] }

// 实际应用：EventEmitter
type EventMap = {
  change: (value: string) => void
  submit: (data: object) => void
}

type EventPayload<T extends keyof EventMap> = EventMap[T] extends (payload: infer P) => void
  ? P
  : never

type ChangePayload = EventPayload<'change'> // string
```

#### 53. 什么是模板字面量类型？请举例说明

**回答要点：**

- **模板字面量类型**：使用模板语法操作字符串类型

```typescript
// 基础示例
type EventName = `on${'Click' | 'Change' | 'Submit'}`
// 'onClick' | 'onChange' | 'onSubmit'

// 字符串操作
type Capitalize<S extends string> = S extends `${infer F}${infer R}` ? `${Uppercase<F>}${R}` : S

type A = Capitalize<'hello'> // 'Hello'

// 实际应用：CSS 属性
type CSSUnit = 'px' | 'em' | 'rem' | '%'
type CSSSize = `${number}${CSSUnit}`

const width: CSSSize = '100px' // ✅
const height: CSSSize = '50%' // ✅
const margin: CSSSize = '10' // ❌

// 高级应用：路径类型
type Path<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ? Path<T[K], `${Prefix}${K & string}.`>
        : `${Prefix}${K & string}`
    }[keyof T]
  : never

interface User {
  name: string
  address: {
    city: string
    zip: string
  }
}

type UserPath = Path<User>
// 'name' | 'address.city' | 'address.zip'
```

#### 54. 如何实现一个类型安全的状态管理？

**回答要点：**

```typescript
// 类型安全的 Store
type ActionMap = {
  [key: string]: (...args: any[]) => any
}

type MutationMap = {
  [key: string]: (state: any, payload: any) => void
}

interface StoreOptions<S, M extends MutationMap, A extends ActionMap> {
  state: S
  mutations: M
  actions: A
}

class TypedStore<S, M extends MutationMap, A extends ActionMap> {
  private state: S
  private mutations: M
  private actions: A

  constructor(options: StoreOptions<S, M, A>) {
    this.state = options.state
    this.mutations = options.mutations
    this.actions = options.actions
  }

  commit<K extends keyof M>(type: K, payload: Parameters<M[K]>[1]) {
    this.mutations[type](this.state, payload)
  }

  dispatch<K extends keyof A>(type: K, ...args: Parameters<A[K]>) {
    return this.actions[type](...args)
  }
}

// 使用
const store = new TypedStore({
  state: { count: 0 },
  mutations: {
    increment: (state, payload: number) => {
      state.count += payload
    },
  },
  actions: {
    asyncFetch: async (count: number) => {
      // ...
    },
  },
})

store.commit('increment', 5) // ✅ 类型安全
store.commit('increment', '5') // ❌ 类型错误
```

#### 55. TypeScript 4.9+ 的新特性有哪些？

**回答要点：**

1. **satisfies 操作符**（4.9）：

   ```typescript
   const config = {
     width: 100,
     height: '100px',
   } satisfies Record<string, string | number>
   ```

2. **自动访问器**（4.9）：

   ```typescript
   class User {
     accessor name: string
   }
   ```

3. **const 类型参数**（5.0）：

   ```typescript
   function createConst<T extends string>(arr: readonly T[]): T[] {
     return [...arr]
   }
   ```

4. **装饰器**（5.0）：

   ```typescript
   function sealed(target: any) {
     Object.seal(target)
   }

   @sealed
   class MyClass {}
   ```

5. **extends 多类型**（5.0）：

   ```typescript
   function fn<T extends A & B>(value: T) {}
   ```

6. **const 类型断言**（5.0）：
   ```typescript
   const config = { readonly: true } as const
   ```

## 五、React 18+ 对比与理解

### 1. 响应式对比

#### 56. Vue 3 和 React 18 的响应式机制有什么本质区别？

**回答要点：**

| 对比项     | Vue 3                 | React 18             |
| ---------- | --------------------- | -------------------- |
| 响应式方式 | 自动追踪（Proxy）     | 手动声明（useState） |
| 更新粒度   | 组件级 + 细粒度       | 组件级               |
| 依赖收集   | 自动（getter/setter） | 手动（依赖数组）     |
| 状态存储   | 响应式对象            | 不可变数据           |
| 重新渲染   | 精确到属性            | 整个组件             |

**核心差异：**

- **Vue**：数据驱动，自动追踪依赖，精确更新
- **React**：状态驱动，手动管理依赖，组件级更新

```javascript
// Vue 3：自动追踪
const state = reactive({ count: 0 })
// 修改时自动触发更新
state.count++

// React 18：手动声明
const [count, setCount] = useState(0)
// 必须调用 setter 触发更新
setCount(count + 1)
```

#### 57. React 的 `useState` 和 Vue 的 `ref` 在使用上有什么不同？

**回答要点：**

| 特性     | React useState | Vue ref            |
| -------- | -------------- | ------------------ |
| 解构     | 需要手动解构   | 自动解包（模板中） |
| 更新方式 | 调用 setter    | 直接赋值           |
| 批量更新 | 自动批处理     | 自动批处理         |
| 类型推导 | 需要泛型       | 自动推导           |
| 对象更新 | 需要合并       | 直接修改属性       |

```javascript
// React
const [user, setUser] = useState({ name: 'Tom', age: 20 })
// 更新时需要合并
setUser({ ...user, age: 21 })

// Vue
const user = ref({ name: 'Tom', age: 20 })
// 直接修改属性
user.value.age = 21
```

#### 58. 什么是 React 的 Fiber 架构？它解决了什么问题？

**回答要点：**

- **Fiber**：React 16 引入的协调引擎
- **解决的问题**：
  1. **可中断渲染**：将渲染任务拆分为小单元
  2. **优先级调度**：高优先级任务优先执行
  3. **并发渲染**：支持并发特性

**Fiber 节点结构**：

```javascript
const fiberNode = {
  type: 'div',
  key: null,
  stateNode: domNode,
  child: childFiber,
  sibling: siblingFiber,
  return: parentFiber,
  alternate: workInProgress,
  pendingProps: {},
  memoizedProps: {},
  memoizedState: {},
  flags: 0,
  lanes: 0,
  childLanes: 0,
}
```

**工作流程**：

1. **Render 阶段**（可中断）：构建 Fiber 树
2. **Commit 阶段**（不可中断）：执行 DOM 操作

#### 59. Vue 3 的响应式追踪和 React 的重新渲染机制有什么差异？

**回答要点：**

**Vue 3**：

- **依赖收集**：访问响应式数据时自动收集
- **精确更新**：只更新依赖变化的组件
- **细粒度**：可以精确到 DOM 节点

```javascript
// Vue：精确更新
<template>
  <div>{{ count }}</div> <!-- 只更新这个节点 -->
  <div>{{ message }}</div> <!-- 不更新 -->
</template>
```

**React**：

- **自上而下**：父组件更新，子组件默认也更新
- **需要优化**：使用 `memo`、`useMemo`、`useCallback`
- **组件级**：整个组件重新渲染

```javascript
// React：组件级更新
function Parent() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Child1 count={count} /> {/* 重新渲染 */}
      <Child2 /> {/* 也重新渲染，需要 memo 优化 */}
    </div>
  )
}
```

#### 60. 为什么 React 需要 `useMemo` 而 Vue 不需要？

**回答要点：**

- **React**：
  - 组件级更新，每次渲染都重新执行函数
  - 需要手动缓存计算结果和回调函数
  - 避免不必要的子组件重新渲染

- **Vue**：
  - 自动追踪依赖，只有依赖变化才重新计算
  - `computed` 自动缓存
  - 不需要手动优化

```javascript
// React：需要手动优化
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data)
}, [data])

const handleClick = useCallback(() => {
  doSomething()
}, [])

// Vue：自动优化
const expensiveValue = computed(() => {
  return computeExpensiveValue(data.value)
}) // 自动缓存

const handleClick = () => {
  doSomething()
} // 不需要 useCallback
```

### 2. 并发特性

#### 61. 什么是 React 18 的并发渲染（Concurrent Rendering）？

**回答要点：**

- **并发渲染**：React 可以同时准备多个版本的 UI
- **核心能力**：
  1. **可中断**：渲染过程可以暂停和恢复
  2. **优先级**：高优先级任务优先执行
  3. **并发**：多个任务同时进行

**启用方式**：

```javascript
// React 18
import { createRoot } from 'react-dom/client'

const root = createRoot(container)
root.render(<App />) // 自动启用并发
```

**新 API**：

- `startTransition`：标记低优先级更新
- `useTransition`：获取过渡状态
- `useDeferredValue`：延迟值
- `Suspense`：加载状态

#### 62. `useTransition` 和 `useDeferredValue` 的使用场景是什么？

**回答要点：**

**useTransition**：

```javascript
const [isPending, startTransition] = useTransition()

function handleClick() {
  startTransition(() => {
    // 低优先级更新
    setTab('new-tab')
  })

  // 高优先级更新立即执行
  setInputValue('')
}
```

**使用场景**：

- 搜索建议：输入立即响应，结果延迟显示
- Tab 切换：UI 立即切换，内容延迟加载
- 大数据渲染：保持 UI 响应

**useDeferredValue**：

```javascript
const deferredQuery = useDeferredValue(query)

return (
  <div>
    <input value={query} onChange={handleChange} />
    <SearchResults query={deferredQuery} />
  </div>
)
```

**区别**：

- `useTransition`：控制更新的优先级
- `useDeferredValue`：延迟值的变化

#### 63. React 的 Suspense 和 Vue 的 Suspense 有什么不同？

**回答要点：**

| 特性     | React Suspense     | Vue Suspense     |
| -------- | ------------------ | ---------------- |
| 状态     | 实验性（部分稳定） | 实验性           |
| 使用方式 | 包装异步组件       | 包装异步组件     |
| 错误处理 | 需要 ErrorBoundary | 需要 fallback    |
| 数据获取 | 配合 React.lazy    | 配合 async setup |
| 并发支持 | 完全支持           | 有限支持         |

**React**：

```javascript
<Suspense fallback={<Loading />}>
  <AsyncComponent />
</Suspense>
```

**Vue**：

```vue
<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <Loading />
  </template>
</Suspense>
```

#### 64. 什么是时间切片（Time Slicing）？它是如何工作的？

**回答要点：**

- **时间切片**：将长时间任务分割为多个小任务
- **目的**：保持主线程响应，避免阻塞用户交互

**工作原理**：

1. 将渲染任务拆分为 Fiber 节点
2. 每个节点执行时间约 5ms
3. 检查是否有高优先级任务
4. 如果有，暂停当前任务
5. 执行高优先级任务
6. 空闲时继续执行

```javascript
// 简化的时间切片逻辑
function workLoop(deadline) {
  let shouldYield = false

  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1
  }

  if (nextUnitOfWork) {
    requestIdleCallback(workLoop)
  }
}
```

#### 65. React 18 的自动批处理（Automatic Batching）是什么？

**回答要点：**

- **批处理**：将多个 `setState` 合并为一次更新
- **React 17**：只在事件处理器中批处理
- **React 18**：所有场景都自动批处理

```javascript
// React 17
function handleClick() {
  setCount(c => c + 1) // 不触发渲染
  setFlag(f => !f) // 不触发渲染
  // 事件结束时批量渲染一次
}

fetch().then(() => {
  setCount(c => c + 1) // 触发渲染
  setFlag(f => !f) // 触发渲染
  // 两次独立渲染
})

// React 18
fetch().then(() => {
  setCount(c => c + 1) // 不触发渲染
  setFlag(f => !f) // 不触发渲染
  // Promise 回调中也批量渲染
})
```

**手动退出批处理**：

```javascript
import { flushSync } from 'react-dom'

flushSync(() => {
  setCount(c => c + 1) // 立即渲染
})
```

### 3. Hooks 对比

#### 66. React Hooks 和 Vue Composition API 的设计哲学有什么不同？

**回答要点：**

| 对比项   | React Hooks    | Vue Composition API |
| -------- | -------------- | ------------------- |
| 执行时机 | 每次渲染都执行 | setup 只执行一次    |
| 调用规则 | 必须在顶层调用 | 可以在条件语句中    |
| 闭包陷阱 | 容易遇到       | 不会遇到            |
| 依赖管理 | 手动指定       | 自动追踪            |
| 心智模型 | 函数式响应     | 响应式对象          |

**React Hooks**：

```javascript
// 每次渲染都重新执行
function Component() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // 依赖变化时执行
  }, [count])

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

**Vue Composition API**：

```vue
<script setup>
import { ref, watch } from 'vue'

// setup 只执行一次
const count = ref(0)

watch(count, newVal => {
  // 自动追踪，不需要依赖数组
})
</script>
```

#### 67. `useEffect` 和 `watchEffect` 的执行时机有什么不同？

**回答要点：**

**useEffect（React）**：

- **执行时机**：渲染完成后异步执行
- **清理函数**：返回函数用于清理
- **依赖数组**：手动指定依赖

```javascript
useEffect(() => {
  console.log('Effect')

  return () => {
    console.log('Cleanup')
  }
}, [dependency]) // 手动指定
```

**watchEffect（Vue）**：

- **执行时机**：同步执行（首次），依赖变化时执行
- **清理函数**：通过参数传入
- **依赖追踪**：自动收集

```vue
<script setup>
watchEffect(onCleanup => {
  console.log('Effect')

  onCleanup(() => {
    console.log('Cleanup')
  })
  // 自动追踪依赖
})
</script>
```

#### 68. 为什么 React 需要 `useCallback` 而 Vue 不需要？

**回答要点：**

- **React 问题**：
  - 每次渲染创建新函数
  - 函数引用变化导致子组件重新渲染
  - 需要 `useCallback` 缓存函数引用

- **Vue 优势**：
  - 函数不会导致组件重新渲染
  - 依赖变化时精确更新
  - 不需要缓存函数引用

```javascript
// React：需要 useCallback
const handleClick = useCallback(() => {
  doSomething()
}, []) // 缓存函数引用

;<Child onClick={handleClick} /> // 避免子组件重新渲染

// Vue：不需要
const handleClick = () => {
  doSomething()
} // 函数引用变化不影响渲染
```

#### 69. 如何实现一个跨框架的响应式状态管理？

**回答要点：**
**方案：使用 Proxy 实现独立响应式系统**

```typescript
// shared-state.ts
class ReactiveState {
  private listeners: Set<() => void> = new Set()
  private state: any

  constructor(initialState: any) {
    this.state = new Proxy(initialState, {
      get: (target, key) => {
        return target[key]
      },
      set: (target, key, value) => {
        target[key] = value
        this.notify()
        return true
      },
    })
  }

  getState() {
    return this.state
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  private notify() {
    this.listeners.forEach(listener => listener())
  }
}

// React 使用
function ReactComponent() {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    return store.subscribe(() => {
      setState(store.getState())
    })
  }, [])
}

// Vue 使用
const vueState = ref(store.getState())
store.subscribe(() => {
  vueState.value = store.getState()
})
```

#### 70. React 和 Vue 的组件通信方式有什么异同？

**回答要点：**

| 通信方式 | React         | Vue            |
| -------- | ------------- | -------------- |
| 父到子   | Props         | Props          |
| 子到父   | Callback      | Emit           |
| 跨层级   | Context       | Provide/Inject |
| 兄弟     | 状态管理      | 状态管理       |
| 全局     | Redux/Zustand | Pinia/Vuex     |

**React Context**：

```javascript
const ThemeContext = createContext('light')

function Provider() {
  return (
    <ThemeContext.Provider value="dark">
      <Child />
    </ThemeContext.Provider>
  )
}

function Child() {
  const theme = useContext(ThemeContext)
}
```

**Vue Provide/Inject**：

```vue
<!-- Parent -->
<script setup>
provide('theme', ref('dark'))
</script>

<!-- Child -->
<script setup>
const theme = inject('theme')
</script>
```

## 六、源码层面问题排查

### 1. 调试技巧

#### 71. 如何定位"视图不更新"的问题？请描述排查步骤

**回答要点：**
**排查步骤**：

1. **检查响应式 API**：

   ```javascript
   // ❌ 错误：普通对象
   let count = 0

   // ✅ 正确：响应式对象
   const count = ref(0)
   ```

2. **检查依赖追踪**：

   ```javascript
   // 在 computed 或 watch 中打断点
   computed(() => {
     debugger // 检查是否执行
     return state.value
   })
   ```

3. **检查 trigger 调用**：

   ```javascript
   // 在 Vue 源码中打断点
   // node_modules/@vue/reactivity/dist/reactivity.cjs.js
   function trigger(target, type, key) {
     debugger // 检查是否触发
   }
   ```

4. **检查 effect 执行**：

   ```javascript
   // 查看依赖集合
   console.log(targetMap.get(target))
   ```

5. **使用 Vue DevTools**：
   - 查看组件状态
   - 检查响应式数据
   - 追踪更新流程

**常见原因**：

- 解构丢失响应式
- 使用 `shallowRef` 修改内层
- 直接替换 `reactive` 对象
- 闭包捕获旧值

#### 72. 什么是内存泄漏？如何检测和修复 Vue 应用中的内存泄漏？

**回答要点：**

- **内存泄漏**：不再使用的对象无法被垃圾回收

**常见原因**：

1. **未清理的定时器**：

   ```javascript
   onMounted(() => {
     const timer = setInterval(() => {}, 1000)
     // ❌ 未清理
   })

   // ✅ 正确
   onUnmounted(() => {
     clearInterval(timer)
   })
   ```

2. **未移除的事件监听器**：

   ```javascript
   onMounted(() => {
     window.addEventListener('resize', handler)
   })

   onUnmounted(() => {
     window.removeEventListener('resize', handler)
   })
   ```

3. **闭包引用**：
   ```javascript
   // ❌ 闭包持有大对象
   const largeData = new Array(1000000)
   useEffect(() => {
     const timer = setInterval(() => {
       console.log(largeData) // 持有引用
     }, 1000)
   }, [])
   ```

**检测方法**：

1. **Chrome DevTools**：
   - Memory 面板
   - Heap Snapshot 对比
   - Allocation instrumentation

2. **Performance Monitor**：
   - 观察 JS Heap 使用
   - 检查是否持续增长

**修复策略**：

- 及时清理定时器、监听器
- 使用 `WeakRef` 避免强引用
- 避免不必要的全局变量
- 组件卸载时清理资源

#### 73. 如何分析组件的渲染性能瓶颈？

**回答要点：**
**工具使用**：

1. **Vue DevTools**：
   - Timeline 查看渲染时间
   - Component 查看更新频率

2. **Chrome Performance**：
   - 记录性能数据
   - 分析长任务
   - 查看 FPS

3. **自定义性能监控**：
   ```javascript
   // 在组件中
   const start = performance.now()
   // 渲染逻辑
   const end = performance.now()
   console.log(`渲染时间: ${end - start}ms`)
   ```

**优化策略**：

1. **减少渲染次数**：
   - 使用 `v-once` 标记静态内容
   - 拆分频繁更新的组件

2. **优化渲染范围**：
   - 使用 `v-memo` 缓存节点
   - 使用 `shallowRef` 减少响应式开销

3. **虚拟滚动**：
   - 大列表只渲染可视区域
   - 使用 `vue-virtual-scroller`

4. **异步渲染**：
   - 使用 `requestIdleCallback`
   - 分片渲染大数据

#### 74. 什么是"过度渲染"？如何优化？

**回答要点：**

- **过度渲染**：组件更新了不应该更新的部分

**React 中的过度渲染**：

```javascript
// ❌ 父组件更新导致所有子组件更新
function Parent() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Child1 />
      <Child2 />
    </div>
  )
}

// ✅ 使用 memo 优化
const Child1 = memo(() => <div>Child1</div>)
```

**Vue 中的过度渲染**：

```vue
<!-- ❌ 整个组件更新 -->
<template>
  <div>{{ count }}</div>
  <div>{{ staticText }}</div>
</template>

<!-- ✅ 使用 v-once -->
<template>
  <div>{{ count }}</div>
  <div v-once>{{ staticText }}</div>
</template>
```

**优化方法**：

1. **组件拆分**：将频繁更新的部分独立
2. **使用 memo/v-once**：标记静态内容
3. **精确依赖**：只监听必要的数据
4. **虚拟滚动**：减少 DOM 节点

#### 75. 如何使用 Chrome DevTools 分析 Vue 应用性能？

**回答要点：**
**步骤**：

1. **打开 Performance 面板**：
   - F12 → Performance
   - 点击录制按钮
   - 执行操作
   - 停止录制

2. **分析结果**：
   - **FPS**：查看帧率是否低于 60
   - **CPU**：查看长任务（红色）
   - **NET**：查看网络请求

3. **火焰图分析**：
   - 查看函数调用栈
   - 识别性能瓶颈
   - 优化耗时操作

4. **Memory 面板**：
   - Heap Snapshot：查看内存使用
   - Allocation timeline：查看内存分配
   - 检测内存泄漏

**关键指标**：

- **FCP**（First Contentful Paint）：首次内容绘制
- **LCP**（Largest Contentful Paint）：最大内容绘制
- **TTI**（Time to Interactive）：可交互时间
- **FID**（First Input Delay）：首次输入延迟

### 2. 源码分析

#### 76. 如何阅读和理解 Vue 3 源码？请描述你的方法

**回答要点：**
**阅读方法**：

1. **从入口开始**：

   ```
   packages/vue/src/index.ts
   → packages/runtime-core/src/index.ts
   → packages/reactivity/src/index.ts
   ```

2. **核心模块顺序**：
   - **reactivity**：响应式系统
   - **runtime-core**：运行时核心
   - **runtime-dom**：DOM 相关
   - **compiler-core**：编译器

3. **调试技巧**：
   - 使用 `debugger` 断点
   - 使用 `console.log` 追踪
   - 使用 Vue DevTools

4. **实践验证**：
   - 手写简化版实现
   - 编写测试用例
   - 对比官方文档

**工具推荐**：

- Sourcegraph：在线代码搜索
- VS Code：本地调试
- Vue Playground：在线测试

#### 77. 什么是"响应式丢失"？从源码角度如何解释和解决？

**回答要点：**

- **响应式丢失**：响应式数据在某些场景下失去响应式特性

**常见场景**：

1. **解构丢失**：

   ```javascript
   // ❌ 解构后变成普通值
   const { count } = reactive({ count: 0 })

   // ✅ 使用 toRefs
   const { count } = toRefs(reactive({ count: 0 }))
   ```

2. **Props 解构**（Vue 3.3 之前）：

   ```javascript
   // ❌ Vue 3.3 之前
   const { title } = defineProps(['title'])

   // ✅ Vue 3.3+
   const { title } = defineProps(['title']) // 支持响应式解构
   ```

3. **数组方法**：

   ```javascript
   const list = reactive([1, 2, 3])
   const mapped = list.map(x => x * 2) // ❌ 不是响应式

   // ✅ 使用 computed
   const mapped = computed(() => list.map(x => x * 2))
   ```

**源码解释**：

```javascript
// reactive 返回的是 Proxy
const state = reactive({ count: 0 })
// Proxy { count: 0 }

// 解构后得到的是原始值
const { count } = state
// 0（不是 Proxy）

// toRefs 将每个属性转换为 ref
const { count } = toRefs(state)
// { count: RefImpl<number> }
```

#### 78. 如何排查 `computed` 不更新的问题？

**回答要点：**
**排查步骤**：

1. **检查依赖是否响应式**：

   ```javascript
   // ❌ 依赖不是响应式
   const count = 0
   const double = computed(() => count * 2)

   // ✅ 使用 ref
   const count = ref(0)
   const double = computed(() => count.value * 2)
   ```

2. **检查依赖是否被访问**：

   ```javascript
   // ❌ 没有访问 .value
   const double = computed(() => count * 2)

   // ✅ 访问 .value
   const double = computed(() => count.value * 2)
   ```

3. **检查依赖是否被 track**：

   ```javascript
   // 在 computed getter 中打断点
   computed(() => {
     debugger
     // 查看 track 是否被调用
     return state.value
   })
   ```

4. **检查 `_dirty` 标记**：
   ```javascript
   // computed 内部
   console.log(computed._dirty) // 应该是 true
   ```

**常见原因**：

- 依赖不是响应式数据
- 没有正确访问 `.value`
- 依赖被意外覆盖
- 循环依赖

#### 79. 什么是"循环依赖"？在响应式系统中如何避免？

**回答要点：**

- **循环依赖**：A 依赖 B，B 依赖 A，导致无限循环

**示例**：

```javascript
const a = ref(0)
const b = computed(() => a.value + 1)

// ❌ 循环依赖
watch(b, newVal => {
  a.value = newVal // 触发 b 重新计算
})
```

**避免方法**：

1. **单向数据流**：

   ```javascript
   // ✅ 单向依赖
   const a = ref(0)
   const b = computed(() => a.value + 1)
   ```

2. **使用标志位**：

   ```javascript
   let updating = false

   watch(b, newVal => {
     if (updating) return
     updating = true
     a.value = newVal
     updating = false
   })
   ```

3. **拆分逻辑**：
   ```javascript
   const source = ref(0)
   const derived = computed(() => source.value * 2)
   // 不要反过来修改 source
   ```

**源码保护**：

```javascript
// Vue 源码中的保护机制
function trigger(target, type, key) {
  const effects = depsMap.get(key)
  const effectsToRun = new Set()

  effects.forEach(effect => {
    if (effect !== activeEffect) {
      // 避免自身触发
      effectsToRun.add(effect)
    }
  })

  effectsToRun.forEach(effect => effect())
}
```

#### 80. 如何从源码层面理解 `nextTick` 的实现？

**回答要点：**

- **nextTick**：等待下一次 DOM 更新刷新后执行回调

**实现原理**：

```javascript
// Vue 3 源码简化版
const pendingCallbacks: Array<Function> = [];
let isFlushing = false;

function nextTick(fn?: () => void): Promise<void> {
  return new Promise((resolve) => {
    pendingCallbacks.push(() => {
      fn?.();
      resolve();
    });

    if (!isFlushing) {
      isFlushing = true;
      queueMicrotask(flushCallbacks); // 使用微任务
    }
  });
}

function flushCallbacks() {
  const callbacks = pendingCallbacks.slice();
  pendingCallbacks.length = 0;

  for (let i = 0; i < callbacks.length; i++) {
    callbacks[i]();
  }

  isFlushing = false;
}
```

**使用场景**：

```javascript
// 等待 DOM 更新
state.count++
await nextTick()
console.log(el.textContent) // 获取更新后的 DOM

// 批量更新
count1.value++
count2.value++
await nextTick()
// 两次更新合并为一次 DOM 更新
```

**优先级**：

1. Promise.then（微任务）
2. MutationObserver
3. setImmediate
4. setTimeout

### 3. 性能调优

#### 81. 什么是"响应式开销"？如何减少不必要的响应式追踪？

**回答要点：**

- **响应式开销**：响应式系统带来的性能消耗

**开销来源**：

1. **依赖收集**：每次访问都调用 `track`
2. **触发更新**：每次修改都调用 `trigger`
3. **Proxy 拦截**：每次操作都经过 Proxy

**减少开销**：

1. **使用 shallowRef**：

   ```javascript
   // ❌ 深层响应式，开销大
   const state = reactive({
     nested: { deep: { value: 0 } },
   })

   // ✅ 浅层响应式
   const state = shallowRef({
     nested: { deep: { value: 0 } },
   })
   ```

2. **使用 markRaw**：

   ```javascript
   // ❌ 大型对象被响应式化
   const state = reactive({
     hugeData: largeObject,
   })

   // ✅ 标记不响应式
   const state = reactive({
     hugeData: markRaw(largeObject),
   })
   ```

3. **冻结数据**：

   ```javascript
   const staticData = Object.freeze({
     config: {
       /* ... */
     },
   })
   ```

4. **使用 toRaw**：
   ```javascript
   const raw = toRaw(reactiveObj)
   raw.property = value // 不触发更新
   ```

#### 82. 大列表渲染优化的策略有哪些？

**回答要点：**

**策略1：虚拟滚动**

```javascript
// 只渲染可视区域
const visibleItems = computed(() => {
  const start = Math.floor(scrollTop / itemHeight)
  const end = start + Math.ceil(viewportHeight / itemHeight)
  return items.slice(start, end)
})
```

**策略2：分页加载**

```javascript
const pageSize = 50
const currentPage = ref(1)

const visibleItems = computed(() => {
  return items.slice(0, currentPage.value * pageSize)
})
```

**策略3：时间分片**

```javascript
async function renderChunks(items) {
  for (let i = 0; i < items.length; i += 100) {
    const chunk = items.slice(i, i + 100)
    renderChunk(chunk)
    await new Promise(resolve => requestIdleCallback(resolve))
  }
}
```

**策略4：Web Worker**

```javascript
// 在主线程外处理数据
const worker = new Worker('data-processor.js')
worker.postMessage(items)
worker.onmessage = e => {
  processedItems.value = e.data
}
```

**策略5：CSS 优化**

```css
/* 使用 contain 优化渲染 */
.list-item {
  contain: layout style paint;
}
```

#### 83. 如何实现虚拟滚动？需要考虑哪些性能问题？

**回答要点：**
**核心实现**：

```vue
<template>
  <div class="viewport" @scroll="onScroll">
    <div class="spacer" :style="{ height: totalHeight + 'px' }">
      <div class="content" :style="{ transform: `translateY(${offsetY}px)` }">
        <div v-for="item in visibleItems" :key="item.id">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const viewportHeight = 600
const itemHeight = 50

const scrollTop = ref(0)
const totalItems = 10000

const visibleCount = Math.ceil(viewportHeight / itemHeight) + 2
const startIndex = computed(() => Math.floor(scrollTop.value / itemHeight))
const visibleItems = computed(() => {
  return items.slice(startIndex.value, startIndex.value + visibleCount)
})

const offsetY = computed(() => startIndex.value * itemHeight)
const totalHeight = computed(() => totalItems * itemHeight)

function onScroll(e) {
  scrollTop.value = e.target.scrollTop
}
</script>
```

**性能考虑**：

1. **动态行高**：需要测量实际高度
2. **滚动缓冲**：上下各多渲染几个
3. **回收机制**：复用 DOM 节点
4. **事件节流**：减少 scroll 事件触发
5. **内存管理**：及时清理不可见节点

#### 84. 什么是"防抖"和"节流"？在 Vue 中如何正确使用？

**回答要点：**

**防抖（Debounce）**：

- 多次触发，只执行最后一次
- 适用场景：搜索框输入、窗口 resize

```javascript
function debounce(fn, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

// Vue 中使用
const searchInput = ref('')
const debouncedSearch = debounce(query => {
  fetchResults(query)
}, 300)

watch(searchInput, newVal => {
  debouncedSearch(newVal)
})
```

**节流（Throttle）**：

- 固定时间内只执行一次
- 适用场景：滚动事件、鼠标移动

```javascript
function throttle(fn, interval) {
  let lastTime = 0
  return function (...args) {
    const now = Date.now()
    if (now - lastTime >= interval) {
      fn.apply(this, args)
      lastTime = now
    }
  }
}

// Vue 中使用
const throttledScroll = throttle(e => {
  handleScroll(e.target.scrollTop)
}, 100)

onMounted(() => {
  window.addEventListener('scroll', throttledScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledScroll)
})
```

#### 85. 如何优化首屏加载时间？

**回答要点：**

**策略1：代码分割**

```javascript
// 路由懒加载
const routes = [
  {
    path: '/dashboard',
    component: () => import('./views/Dashboard.vue'),
  },
]
```

**策略2：资源预加载**

```html
<link rel="preload" href="/fonts/main.woff2" as="font" crossorigin />
<link rel="prefetch" href="/next-page.js" />
```

**策略3：Tree Shaking**

```javascript
// ✅ 支持 Tree Shaking
import { ref, reactive } from 'vue'

// ❌ 不支持
import * as Vue from 'vue'
```

**策略4：压缩优化**

```javascript
// vite.config.js
export default {
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
}
```

**策略5：SSR/SSG**

```javascript
// Nuxt.js
export default {
  ssr: true, // 服务端渲染
  target: 'static', // 静态生成
}
```

**关键指标**：

- **LCP** < 2.5s
- **FCP** < 1.8s
- **TTI** < 3.8s

## 七、全家桶深度应用

### 1. Vue Router

#### 86. Vue Router 4 的路由守卫执行顺序是什么？

**回答要点：**
**完整执行顺序**：

1. **导航被触发**
2. **失守组件的 `beforeRouteLeave`**
3. **全局 `beforeEach`**
4. **重用组件的 `beforeRouteUpdate`**
5. **路由独享的 `beforeEnter`**
6. **解析异步路由组件**
7. **进入组件的 `beforeRouteEnter`**
8. **全局 `beforeResolve`**
9. **导航被确认**
10. **全局 `afterEach`**
11. **触发 DOM 更新**
12. **调用 `beforeRouteEnter` 的 `next` 回调**

```javascript
// 示例
const router = createRouter({
  routes: [
    {
      path: '/user',
      component: User,
      beforeEnter: (to, from) => {
        // 路由独享守卫
      },
    },
  ],
})

router.beforeEach((to, from) => {
  // 全局前置守卫
})

router.beforeResolve((to, from) => {
  // 全局解析守卫
})

router.afterEach((to, from) => {
  // 全局后置钩子
})
```

#### 87. 如何实现路由级别的懒加载和预加载？

**回答要点：**

**懒加载**：

```javascript
// 方式1：动态 import
const routes = [
  {
    path: '/dashboard',
    component: () => import('./views/Dashboard.vue'),
  },
]

// 方式2：webpack chunkName
const routes = [
  {
    path: '/dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
  },
]
```

**预加载**：

```javascript
// 方式1：使用 rel="prefetch"
<link rel="prefetch" href="/dashboard.js">

// 方式2：空闲时预加载
router.afterEach((to, from) => {
  if (to.name === 'Home') {
    // 预加载常用路由
    import('./views/Dashboard.vue');
    import('./views/Settings.vue');
  }
});

// 方式3：使用 IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      import('./views/NearbyPage.vue');
      observer.unobserve(entry.target);
    }
  });
});
```

#### 88. 什么是动态路由匹配？如何处理通配符路由？

**回答要点：**

**动态路由**：

```javascript
const routes = [
  { path: '/user/:id', component: User },
  { path: '/user/:id/post/:postId', component: Post },
]

// 获取参数
const route = useRoute()
console.log(route.params.id) // 123
console.log(route.params.postId) // 456
```

**通配符路由**（Vue Router 4 使用 catch-all）：

```javascript
const routes = [
  // 匹配所有路径
  { path: '/:pathMatch(.*)*', component: NotFound },

  // 匹配 /user- 开头的路径
  { path: '/user-:id(.*)', component: User },
]

// 获取通配符参数
const route = useRoute()
console.log(route.params.pathMatch) // ['admin', 'settings']
```

#### 89. 如何设计一个权限路由系统？

**回答要点：**

```typescript
// router/permission.ts
import router from './index'
import { useUserStore } from '@/stores/user'

const whiteList = ['/login', '/register']

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const hasToken = userStore.token

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const hasRoles = userStore.roles && userStore.roles.length > 0

      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息和权限
          const { roles } = await userStore.getUserInfo()

          // 动态添加路由
          const accessRoutes = generateRoutes(roles)
          accessRoutes.forEach(route => router.addRoute(route))

          // 重新导航
          next({ ...to, replace: true })
        } catch (error) {
          await userStore.resetToken()
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

// 生成路由
function generateRoutes(roles: string[]) {
  const asyncRoutes = [
    {
      path: '/admin',
      component: Layout,
      meta: { roles: ['admin'] },
      children: [{ path: 'dashboard', component: Dashboard }],
    },
  ]

  return filterAsyncRoutes(asyncRoutes, roles)
}

function filterAsyncRoutes(routes: any[], roles: string[]) {
  const result: any[] = []

  routes.forEach(route => {
    if (hasPermission(roles, route)) {
      if (route.children) {
        route.children = filterAsyncRoutes(route.children, roles)
      }
      result.push(route)
    }
  })

  return result
}
```

#### 90. Vue Router 的导航解析流程是什么？

**回答要点：**

**完整流程**：

1. **导航被触发**
2. **调用失守组件的 `beforeRouteLeave`**
3. **调用全局 `beforeEach`**
4. **调用重用组件的 `beforeRouteUpdate`**
5. **调用路由的 `beforeEnter`**
6. **解析异步组件**
7. **调用进入组件的 `beforeRouteEnter`**
8. **调用全局 `beforeResolve`**
9. **导航被确认**
10. **调用全局 `afterEach`**
11. **DOM 更新**
12. **调用 `beforeRouteEnter` 的 `next` 回调**

**关键源码**：

```javascript
// 导航守卫队列
function runGuardQueue(guards: Lazy<any>[]): Promise<void> {
  return guards.reduce(
    (promise, guard) => promise.then(() => guard()),
    Promise.resolve()
  );
}

// 导航流程
async function navigate(to: RouteLocationNormalized) {
  // 1. 离开守卫
  await runGuardQueue(extractLeaveGuards(from));

  // 2. 全局前置守卫
  await runGuardQueue(router.beforeEach);

  // 3. 更新守卫
  await runGuardQueue(extractUpdateGuards(from, to));

  // 4. 进入守卫
  await runGuardQueue(extractEnterGuards(to));

  // 5. 全局解析守卫
  await runGuardQueue(router.beforeResolve);

  // 6. 确认导航
  // ...
}
```

### 2. Pinia 状态管理

#### 91. Pinia 相比 Vuex 有哪些优势？

**回答要点：**

| 对比项   | Pinia               | Vuex            |
| -------- | ------------------- | --------------- |
| 类型支持 | ✅ 完整 TS 支持     | ⚠️ 部分支持     |
| 模块化   | ✅ 自动拆分         | ❌ 需要手动配置 |
| DevTools | ✅ 完整支持         | ✅ 支持         |
| 体积     | ~1KB                | ~10KB           |
| SSR      | ✅ 支持             | ✅ 支持         |
| Actions  | ✅ 支持 async/await | ⚠️ 需要 Promise |
| 语法     | 更简洁              | 较繁琐          |

**Pinia 优势**：

1. **更好的 TypeScript 支持**：自动类型推导
2. **去掉了 mutations**：直接使用 actions
3. **模块化设计**：每个 store 独立
4. **更小的体积**：只有 1KB
5. **更好的 DevTools 支持**：时间旅行、编辑状态

#### 92. Pinia 的响应式状态是如何实现的？

**回答要点：**

```typescript
// Pinia 源码简化版
function createPinia() {
  const pinia = {
    _s: new Map<string, Store>(), // 存储 store
    state: ref({}), // 全局状态
    install(app: App) {
      app.provide(piniaSymbol, pinia)
    },
  }

  return pinia
}

function defineStore(id: string, options: StoreDefinition) {
  return function useStore() {
    const pinia = inject(piniaSymbol)

    if (!pinia._s.has(id)) {
      // 创建 store
      const state = reactive(options.state())
      const getters = computed(() => options.getters?.(state))
      const actions = options.actions

      const store = {
        id,
        state,
        getters,
        ...actions,
      }

      pinia._s.set(id, store)
    }

    return pinia._s.get(id)
  }
}
```

**核心机制**：

1. **state** 使用 `reactive` 实现响应式
2. **getters** 使用 `computed` 实现缓存
3. **actions** 普通函数，支持异步

#### 93. 如何设计一个可扩展的状态管理架构？

**回答要点：**

**分层架构**：

```
stores/
├── modules/
│   ├── user.ts       # 用户模块
│   ├── order.ts      # 订单模块
│   └── product.ts    # 产品模块
├── plugins/
│   ├── persist.ts    # 持久化插件
│   └── logger.ts     # 日志插件
└── index.ts          # 入口
```

**模块化设计**：

```typescript
// stores/modules/user.ts
export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: null,
    roles: [],
  }),

  getters: {
    isLoggedIn: state => !!state.token,
    isAdmin: state => state.roles.includes('admin'),
  },

  actions: {
    async login(credentials: LoginParams) {
      const { token } = await api.login(credentials)
      this.token = token
    },

    async logout() {
      this.token = ''
      this.userInfo = null
    },
  },
})
```

**插件系统**：

```typescript
// 持久化插件
function piniaPersist({ key, storage }: PersistOptions) {
  return ({ store }) => {
    // 恢复状态
    const saved = storage.getItem(key)
    if (saved) {
      store.$patch(JSON.parse(saved))
    }

    // 监听变化
    store.$subscribe((mutation, state) => {
      storage.setItem(key, JSON.stringify(state))
    })
  }
}

// 使用
pinia.use(
  piniaPersist({
    key: 'user-store',
    storage: localStorage,
  })
)
```

#### 94. 什么是 Store 的序列化？如何实现？

**回答要点：**

- **序列化**：将 Store 状态转换为 JSON 字符串存储

**实现方式**：

```typescript
// 手动序列化
const userStore = useUserStore()

// 序列化
const serialized = JSON.stringify(userStore.$state)
localStorage.setItem('user', serialized)

// 反序列化
const saved = localStorage.getItem('user')
if (saved) {
  userStore.$state = JSON.parse(saved)
}

// 自动序列化插件
function autoPersist(options: PersistOptions) {
  return ({ store }) => {
    const { key = store.$id, storage = localStorage } = options

    // 恢复
    const saved = storage.getItem(key)
    if (saved) {
      store.$patch(JSON.parse(saved))
    }

    // 监听
    store.$subscribe((_, state) => {
      storage.setItem(key, JSON.stringify(state))
    })
  }
}
```

**注意事项**：

- `ref` 和 `reactive` 会被正确序列化
- `Map`、`Set`、`Date` 需要特殊处理
- 函数不能被序列化
- 循环引用会导致错误

#### 95. 如何测试 Pinia Store？

**回答要点：**

```typescript
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/user'

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with default state', () => {
    const store = useUserStore()
    expect(store.token).toBe('')
    expect(store.userInfo).toBeNull()
  })

  it('should login successfully', async () => {
    const store = useUserStore()

    // Mock API
    vi.spyOn(api, 'login').mockResolvedValue({
      token: 'test-token',
    })

    await store.login({ username: 'test', password: '123' })

    expect(store.token).toBe('test-token')
    expect(store.isLoggedIn).toBe(true)
  })

  it('should logout', async () => {
    const store = useUserStore()
    store.token = 'test-token'

    await store.logout()

    expect(store.token).toBe('')
    expect(store.isLoggedIn).toBe(false)
  })

  it('should have admin role', () => {
    const store = useUserStore()
    store.roles = ['admin', 'user']

    expect(store.isAdmin).toBe(true)
  })
})
```

### 3. 工程化

#### 96. 如何配置 Vite 优化构建性能？

**回答要点：**

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  build: {
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          utils: ['lodash-es', 'dayjs'],
        },
      },
    },

    // 压缩
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },

    // 资源限制
    chunkSizeWarningLimit: 1000,
  },

  // 优化依赖预构建
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia'],
    exclude: ['local-package'],
  },

  // 开发服务器
  server: {
    // 热更新
    hmr: {
      overlay: true,
    },

    // 代理
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
```

#### 97. 什么是 Tree Shaking？如何确保代码可以被 Tree Shaking？

**回答要点：**

- **Tree Shaking**：移除未使用的代码
- **原理**：基于 ES Module 的静态分析

**确保 Tree Shaking**：

1. **使用 ES Module**：

   ```javascript
   // ✅ 支持
   import { ref } from 'vue'

   // ❌ 不支持
   const Vue = require('vue')
   ```

2. **避免副作用**：

   ```javascript
   // package.json
   {
     "sideEffects": false
   }

   // 或者指定有副作用的文件
   {
     "sideEffects": [
       "*.css",
       "*.scss"
     ]
   }
   ```

3. **使用纯函数标记**：

   ```javascript
   // @__PURE__ 标记
   export const createElement = /*@__PURE__*/ (() => {
     return function (type, props) {
       return { type, props }
     }
   })()
   ```

4. **导出时使用命名导出**：

   ```javascript
   // ✅ 支持 Tree Shaking
   export function foo() {}
   export function bar() {}

   // ❌ 不支持
   export default { foo, bar }
   ```

#### 98. 如何实现组件库的按需加载？

**回答要点：**

**方式1：unplugin-vue-components**

```javascript
// vite.config.js
import Components from 'unplugin-vue-components/vite'

export default {
  plugins: [
    Components({
      resolvers: [ElementPlusResolver(), AntDesignVueResolver()],
    }),
  ],
}
```

**方式2：手动按需导入**

```javascript
// ✅ 按需导入
import { ElButton, ElInput } from 'element-plus'

// ❌ 全量导入
import ElementPlus from 'element-plus'
```

**方式3：配置 package.json**

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./button": "./dist/button.js",
    "./input": "./dist/input.js"
  }
}
```

**方式4：使用 Babel 插件**

```javascript
// babel.config.js
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
}
```

#### 99. 如何配置 Monaco/ESLint 保证代码质量？

**回答要点：**

**ESLint 配置**：

```javascript
// eslint.config.js
import vue from 'eslint-plugin-vue'
import typescript from '@typescript-eslint/eslint-plugin'

export default [
  {
    files: ['**/*.vue'],
    plugins: { vue },
    rules: {
      'vue/no-unused-vars': 'error',
      'vue/require-default-prop': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    plugins: { '@typescript-eslint': typescript },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
]
```

**Monaco Editor 集成**：

```typescript
import * as monaco from 'monaco-editor'
import { loader } from '@monaco-editor/loader'

// 配置语言服务
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  target: monaco.languages.typescript.ScriptTarget.ESNext,
  module: monaco.languages.typescript.ModuleKind.ESNext,
  strict: true,
})

// 添加类型定义
monaco.languages.typescript.typescriptDefaults.addExtraLib(
  `
  declare module 'vue' {
    export function ref<T>(value: T): Ref<T>;
  }
`,
  'ts:vue.d.ts'
)
```

#### 100. 什么是 Monorepo？如何管理多包项目？

**回答要点：**

- **Monorepo**：单个仓库管理多个包
- **工具**：pnpm workspace、Lerna、Turborepo

**pnpm workspace 配置**：

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

**目录结构**：

```
monorepo/
├── packages/
│   ├── core/
│   ├── utils/
│   └── components/
├── apps/
│   ├── web/
│   └── docs/
├── package.json
└── pnpm-workspace.yaml
```

**优势**：

1. **代码共享**：包之间直接引用
2. **统一版本**：统一的依赖管理
3. **原子提交**：跨包修改一起提交
4. **简化 CI**：一次构建所有包

**常用命令**：

```bash
# 安装所有依赖
pnpm install

# 运行所有包的 build
pnpm -r run build

# 只运行某个包
pnpm --filter @monorepo/core build
```

## 八、实战场景题

### 1. 性能优化场景

#### 101. 一个包含 10000 条数据的表格，如何优化渲染性能？

**回答要点：**

**策略1：虚拟滚动**

```vue
<template>
  <div class="table-viewport" @scroll="onScroll">
    <div class="spacer" :style="{ height: totalHeight + 'px' }">
      <table class="content" :style="{ transform: `translateY(${offsetY}px)` }">
        <tr v-for="item in visibleData" :key="item.id">
          <td v-for="col in columns" :key="col.key">
            {{ item[col.key] }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
const rowHeight = 40
const visibleCount = 20

const scrollTop = ref(0)
const startIndex = computed(() => Math.floor(scrollTop.value / rowHeight))

const visibleData = computed(() => {
  return data.slice(startIndex.value, startIndex.value + visibleCount)
})

const offsetY = computed(() => startIndex.value * rowHeight)
const totalHeight = computed(() => data.length * rowHeight)

function onScroll(e) {
  scrollTop.value = e.target.scrollTop
}
</script>
```

**策略2：分页加载**

```typescript
const pageSize = 50
const currentPage = ref(1)

const pageData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return data.slice(start, start + pageSize)
})
```

**策略3：列虚拟化**

```vue
<template>
  <table>
    <tr v-for="item in data" :key="item.id">
      <td v-for="col in visibleColumns" :key="col.key">
        {{ item[col.key] }}
      </td>
    </tr>
  </table>
</template>
```

**策略4：Web Worker 处理数据**

```typescript
const worker = new Worker('data-processor.js')

worker.postMessage({ data, operation: 'sort' })
worker.onmessage = e => {
  processedData.value = e.data
}
```

**策略5：使用 markRaw**

```typescript
// 表格数据不需要响应式
const tableData = markRaw(fetchData())
```

#### 102. 如何实现一个高性能的无限滚动组件？

**回答要点：**

```vue
<template>
  <div ref="container" class="infinite-scroll" @scroll="onScroll">
    <div class="content">
      <div v-for="item in visibleItems" :key="item.id" class="item">
        {{ item.content }}
      </div>
    </div>
    <div v-if="loading" class="loading">加载中...</div>
  </div>
</template>

<script setup>
const props = defineProps<{
  items: any[];
  itemHeight: number;
  bufferSize?: number;
}>();

const container = ref<HTMLElement>();
const scrollTop = ref(0);
const loading = ref(false);
const hasMore = ref(true);

const bufferSize = props.bufferSize || 5;
const viewportHeight = 600;
const visibleCount = Math.ceil(viewportHeight / props.itemHeight);

const startIndex = computed(() => {
  return Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - bufferSize);
});

const endIndex = computed(() => {
  return Math.min(
    props.items.length,
    startIndex.value + visibleCount + bufferSize * 2
  );
});

const visibleItems = computed(() => {
  return props.items.slice(startIndex.value, endIndex.value);
});

const offsetY = computed(() => {
  return startIndex.value * props.itemHeight;
});

async function onScroll(e: Event) {
  const target = e.target as HTMLElement;
  scrollTop.value = target.scrollTop;

  // 接近底部时加载
  const scrollBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
  if (scrollBottom < 200 && hasMore.value && !loading.value) {
    await loadMore();
  }
}

async function loadMore() {
  loading.value = true;
  try {
    const newData = await fetchData();
    if (newData.length === 0) {
      hasMore.value = false;
    } else {
      props.items.push(...newData);
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.infinite-scroll {
  height: 600px;
  overflow-y: auto;
}

.content {
  position: relative;
}

.item {
  height: v-bind('itemHeight + "px"');
}
</style>
```

#### 103. 大型表单的性能优化策略有哪些？

**回答要点：**

**策略1：表单拆分**

```vue
<!-- 拆分为多个子表单 -->
<BaseInfoForm v-model="baseInfo" />
<DetailForm v-model="detailInfo" />
<AttachForm v-model="attachInfo" />
```

**策略2：使用 shallowRef**

```typescript
// 表单数据不需要深层响应式
const formData = shallowRef({
  base: { name: '', age: 0 },
  detail: { address: '', phone: '' },
})
```

**策略3：防抖验证**

```typescript
const errors = ref({})

const validateField = debounce((field: string, value: any) => {
  errors.value[field] = validate(field, value)
}, 300)

watch(
  formData,
  newVal => {
    validateField('name', newVal.name)
  },
  { deep: true }
)
```

**策略4：懒加载验证规则**

```typescript
const rules = computed(() => {
  // 只在需要时加载验证规则
  if (activeTab.value === 'base') {
    return baseRules
  }
  return detailRules
})
```

**策略5：虚拟列表**

```vue
<!-- 表单项很多时使用虚拟滚动 -->
<VirtualList :items="formFields" :item-height="60" v-slot="{ item }">
  <FormField :field="item" />
</VirtualList>
```

#### 104. 如何优化图片加载和渲染性能？

**回答要点：**

**策略1：懒加载**

```vue
<template>
  <img v-for="img in images" :key="img.id" v-lazy="img.url" :alt="img.alt" />
</template>

<script setup>
// 使用 IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

onMounted(() => {
  document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
  });
});
</script>
```

**策略2：图片压缩**

```javascript
// Vite 图片优化
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default {
  plugins: [
    ViteImageOptimizer({
      jpg: { quality: 80 },
      png: { quality: 80 },
      webp: { quality: 80 },
    }),
  ],
}
```

**策略3：使用 WebP**

```html
<picture>
  <source srcset="image.webp" type="image/webp" />
  <source srcset="image.jpg" type="image/jpeg" />
  <img src="image.jpg" alt="" />
</picture>
```

**策略4：渐进式加载**

```vue
<template>
  <div class="image-container">
    <img :src="blurHash" class="blur" />
    <img :src="imageUrl" class="full" @load="onLoad" />
  </div>
</template>

<style>
.image-container {
  position: relative;
}

.blur {
  filter: blur(20px);
  transition: opacity 0.3s;
}

.full {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s;
}

.full.loaded {
  opacity: 1;
}
</style>
```

**策略5：CDN 加速**

```javascript
// 使用 CDN
const imageBaseUrl = 'https://cdn.example.com/images'
const imageUrl = `${imageBaseUrl}/${imageId}.webp`
```

#### 105. 什么是"渲染阻塞"？如何解决？

**回答要点：**

- **渲染阻塞**：长时间任务阻止浏览器渲染

**原因**：

1. 大量 DOM 操作
2. 复杂计算
3. 同步 XHR
4. 长列表渲染

**解决方案**：

**1. 时间分片**

```javascript
async function renderChunks(items) {
  for (let i = 0; i < items.length; i += 100) {
    const chunk = items.slice(i, i + 100)
    renderChunk(chunk)
    await new Promise(resolve => requestIdleCallback(resolve))
  }
}
```

**2. Web Worker**

```javascript
const worker = new Worker('processor.js')
worker.postMessage(data)
worker.onmessage = e => {
  render(e.data)
}
```

**3. 异步组件**

```vue
<script setup>
const HeavyComponent = defineAsyncComponent(() => import('./HeavyComponent.vue'))
</script>
```

**4. Suspense**

```vue
<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <Loading />
  </template>
</Suspense>
```

**5. 虚拟滚动**

```vue
<VirtualList :items="largeList" :item-height="50" />
```

### 2. 架构设计场景

#### 106. 如何设计一个可扩展的组件库架构？

**回答要点：**

**架构设计**：

```
component-lib/
├── packages/
│   ├── core/          # 核心组件
│   ├── utils/         # 工具函数
│   ├── theme/         # 主题系统
│   └── locale/        # 国际化
├── docs/              # 文档
├── playground/        #  playground
└── scripts/           # 构建脚本
```

**核心设计原则**：

1. **组件独立性**

   ```typescript
   // 每个组件独立打包
   export { Button } from './button'
   export { Input } from './input'
   ```

2. **主题可扩展**

   ```typescript
   // 主题系统
   const theme = {
     colors: {
       primary: '#1890ff',
       success: '#52c41a',
     },
     spacing: {
       sm: '8px',
       md: '16px',
     },
   }

   // 支持覆盖
   const customTheme = merge(defaultTheme, userTheme)
   ```

3. **插件系统**

   ```typescript
   // 插件接口
   interface Plugin {
     install(app: App): void
   }

   // 使用
   app.use(MyPlugin)
   ```

4. **TypeScript 支持**

   ```typescript
   // 完整的类型定义
   export interface ButtonProps {
     type?: 'primary' | 'success' | 'danger'
     size?: 'small' | 'medium' | 'large'
     disabled?: boolean
     onClick?: (e: MouseEvent) => void
   }
   ```

5. **按需加载**
   ```javascript
   // 支持 Tree Shaking
   export { default as Button } from './components/Button'
   export { default as Input } from './components/Input'
   ```

#### 107. 如何实现微前端架构？需要考虑哪些问题？

**回答要点：**

**方案选择**：

1. **qiankun**：基于 single-spa
2. **MicroApp**：京东出品
3. **Wujie**：无界方案
4. **iframe**：简单隔离

**qiankun 实现**：

**主应用**：

```typescript
import { registerMicroApps, start } from 'qiankun'

registerMicroApps([
  {
    name: 'app1',
    entry: '//localhost:8081',
    container: '#subapp-container',
    activeRule: '/app1',
  },
  {
    name: 'app2',
    entry: '//localhost:8082',
    container: '#subapp-container',
    activeRule: '/app2',
  },
])

start({
  sandbox: {
    strictStyleIsolation: true,
    experimentalStyleIsolation: true,
  },
})
```

**子应用**：

```typescript
// main.ts
export async function bootstrap() {}

export async function mount(props: any) {
  render(props)
}

export async function unmount() {
  instance.unmount()
}
```

**关键问题**：

1. **CSS 隔离**：Shadow DOM、CSS Modules
2. **JS 沙箱**：Proxy 沙箱、Snapshot 沙箱
3. **通信机制**：EventBus、Props、Global State
4. **路由同步**：主应用控制子应用路由
5. **资源加载**：公共依赖提取

#### 108. 如何设计一个多主题系统？

**回答要点：**

**方案1：CSS 变量**

```css
:root {
  --primary-color: #1890ff;
  --bg-color: #ffffff;
  --text-color: #333333;
}

[data-theme='dark'] {
  --primary-color: #177ddc;
  --bg-color: #141414;
  --text-color: #ffffff;
}

.button {
  background: var(--primary-color);
  color: var(--text-color);
}
```

**方案2：动态样式表**

```typescript
function setTheme(theme: ThemeConfig) {
  const style = document.createElement('style')
  style.textContent = `
    :root {
      --primary-color: ${theme.primary};
      --bg-color: ${theme.background};
    }
  `
  document.head.appendChild(style)
}
```

**方案3：Less/Sass 变量**

```less
// theme.less
@primary-color: #1890ff;

.button {
  background: @primary-color;
}

// 编译时替换
```

**Vue 实现**：

```vue
<script setup>
const theme = (ref < 'light') | ('dark' > 'light')

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
}
</script>
```

#### 109. 如何实现组件的国际化？

**回答要点：**

**方案1：vue-i18n**

```typescript
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'zh-CN',
  messages: {
    'zh-CN': {
      hello: '你好',
      welcome: '欢迎',
    },
    'en-US': {
      hello: 'Hello',
      welcome: 'Welcome',
    },
  },
})

app.use(i18n)
```

**使用**：

```vue
<template>
  <div>
    {{ $t('hello') }}
    <p>{{ t('welcome') }}</p>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
```

**方案2：自定义实现**

```typescript
// locale/zh-CN.ts
export default {
  hello: '你好',
  welcome: '欢迎',
}

// locale/index.ts
import zhCN from './zh-CN'
import enUS from './en-US'

const messages: Record<string, any> = { 'zh-CN': zhCN, 'en-US': enUS }
let currentLocale = 'zh-CN'

export function t(key: string): string {
  return messages[currentLocale][key] || key
}

export function setLocale(locale: string) {
  currentLocale = locale
}
```

#### 110. 如何设计一个插件系统？

**回答要点：**

**插件接口**：

```typescript
interface Plugin {
  name: string
  version: string
  install(context: PluginContext): void
  uninstall?(): void
}

interface PluginContext {
  app: App
  config: Config
  utils: Utils
}
```

**插件管理器**：

```typescript
class PluginManager {
  private plugins: Map<string, Plugin> = new Map()

  register(plugin: Plugin) {
    this.plugins.set(plugin.name, plugin)
  }

  async install(context: PluginContext) {
    for (const plugin of this.plugins.values()) {
      await plugin.install(context)
    }
  }

  async uninstall(name: string) {
    const plugin = this.plugins.get(name)
    if (plugin?.uninstall) {
      await plugin.uninstall()
    }
    this.plugins.delete(name)
  }
}
```

**使用示例**：

```typescript
const manager = new PluginManager()

manager.register({
  name: 'logger',
  version: '1.0.0',
  install({ app }) {
    app.config.globalProperties.$log = console.log
  },
})

await manager.install({ app, config, utils })
```

### 3. 问题排查场景

#### 111. 线上出现白屏，如何快速定位问题？

**回答要点：**

**排查步骤**：

1. **检查控制台错误**

   ```javascript
   // 全局错误捕获
   window.addEventListener('error', e => {
     console.error('Error:', e.error)
     reportError(e.error)
   })

   window.addEventListener('unhandledrejection', e => {
     console.error('Unhandled rejection:', e.reason)
     reportError(e.reason)
   })
   ```

2. **检查网络请求**
   - 查看资源是否加载成功
   - 检查 API 请求是否失败

3. **检查路由**
   - 路由配置是否正确
   - 组件是否存在

4. **使用 Source Map**

   ```javascript
   // vite.config.js
   export default {
     build: {
       sourcemap: true, // 生产环境生成 sourcemap
     },
   }
   ```

5. **性能监控**
   ```javascript
   // 监控首屏时间
   const observer = new PerformanceObserver(list => {
     for (const entry of list.getEntries()) {
       if (entry.name === 'first-contentful-paint') {
         reportFCP(entry.startTime)
       }
     }
   })
   observer.observe({ type: 'paint', buffered: true })
   ```

**常见原因**：

- JS 语法错误（兼容性问题）
- 资源加载失败（CDN 问题）
- 路由配置错误
- 组件渲染错误

#### 112. 组件在某些情况下不渲染，如何排查？

**回答要点：**

**排查清单**：

1. **检查 v-if 条件**

   ```vue
   <!-- 条件是否为 false -->
   <div v-if="shouldRender">Content</div>
   ```

2. **检查 v-show**

   ```vue
   <!-- display: none -->
   <div v-show="isVisible">Content</div>
   ```

3. **检查组件注册**

   ```typescript
   // 是否正确注册
   import MyComponent from './MyComponent.vue'
   // 全局注册
   app.component('MyComponent', MyComponent)
   // 或局部注册
   components: {
     MyComponent
   }
   ```

4. **检查 Props**

   ```vue
   <!-- Props 类型是否正确 -->
   <MyComponent :data="someData" />
   ```

5. **检查错误边界**

   ```vue
   <template>
     <div v-if="error">Error: {{ error }}</div>
     <slot v-else />
   </template>

   <script setup>
   import { onErrorCaptured } from 'vue'

   const error = ref(null)

   onErrorCaptured(err => {
     error.value = err.message
     return false
   })
   </script>
   ```

6. **使用 DevTools**
   - 检查组件树
   - 查看组件状态
   - 追踪更新

#### 113. 内存占用持续增长，如何分析和解决？

**回答要点：**

**分析工具**：

1. **Chrome DevTools Memory**
   - Heap Snapshot
   - Allocation timeline
   - Comparison

2. **Performance Monitor**
   - JS Heap 使用量
   - DOM Nodes 数量
   - Event Listeners

**常见原因**：

1. **未清理的定时器**

   ```typescript
   onMounted(() => {
     const timer = setInterval(() => {}, 1000)
   })

   onUnmounted(() => {
     clearInterval(timer)
   })
   ```

2. **未移除的事件监听**

   ```typescript
   onMounted(() => {
     window.addEventListener('resize', handler)
   })

   onUnmounted(() => {
     window.removeEventListener('resize', handler)
   })
   ```

3. **闭包引用**

   ```typescript
   // ❌ 持有大对象
   const largeData = new Array(1000000)
   useEffect(() => {
     const timer = setInterval(() => {
       console.log(largeData)
     }, 1000)
   }, [])
   ```

4. **DOM 引用**
   ```typescript
   // ❌ 持有 DOM 引用
   let element = document.getElementById('app')
   // 即使 DOM 被移除，element 仍持有引用
   ```

**解决方案**：

- 及时清理资源
- 使用 WeakMap/WeakRef
- 避免全局变量
- 组件卸载时清理

#### 114. 响应式数据更新但视图不刷新，如何从源码层面排查？

**回答要点：**

**排查步骤**：

1. **检查 track 是否调用**

   ```javascript
   // 在 reactivity.cjs.js 中
   function track(target, type, key) {
     console.log('Track:', target, key)
     // 打断点
   }
   ```

2. **检查 trigger 是否调用**

   ```javascript
   function trigger(target, type, key) {
     console.log('Trigger:', target, key)
     // 打断点
   }
   ```

3. **检查 effect 是否在依赖集合中**

   ```javascript
   const depsMap = targetMap.get(target)
   console.log('Deps:', depsMap.get(key))
   ```

4. **检查 effect 是否执行**
   ```javascript
   class ReactiveEffect {
     run() {
       console.log('Effect running')
       // 打断点
     }
   }
   ```

**常见原因**：

- 解构丢失响应式
- 使用 `shallowRef` 修改内层
- 直接替换 `reactive` 对象
- 依赖未被访问
- effect 被 stop

#### 115. 如何在生产环境捕获和上报错误？

**回答要点：**

**全局错误捕获**：

```typescript
// 全局 JS 错误
window.addEventListener('error', event => {
  reportError({
    type: 'js-error',
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    stack: event.error?.stack,
  })
})

// Promise 错误
window.addEventListener('unhandledrejection', event => {
  reportError({
    type: 'promise-error',
    message: event.reason?.message,
    stack: event.reason?.stack,
  })
})
```

**Vue 错误处理**：

```typescript
app.config.errorHandler = (error, instance, info) => {
  reportError({
    type: 'vue-error',
    message: error.message,
    component: instance?.$options?.name,
    info,
  })
}
```

**性能监控**：

```typescript
// Web Vitals
import { onLCP, onFID, onCLS } from 'web-vitals'

onLCP(metric => reportMetric(metric))
onFID(metric => reportMetric(metric))
onCLS(metric => reportMetric(metric))
```

**上报方式**：

```typescript
function reportError(error: ErrorInfo) {
  // 方式1：图片打点
  const img = new Image()
  img.src = `/api/error?data=${encodeURIComponent(JSON.stringify(error))}`

  // 方式2：fetch
  fetch('/api/error', {
    method: 'POST',
    body: JSON.stringify(error),
  })

  // 方式3：sendBeacon
  navigator.sendBeacon('/api/error', JSON.stringify(error))
}
```

## 九、底层机制深度题

### 1. 响应式源码

#### 116. 请描述 `reactive` 函数的完整执行流程

**回答要点：**

```typescript
// reactive 完整流程
function reactive(target: object) {
  // 1. 检查是否已经是响应式对象
  if (isReactive(target)) {
    return target
  }

  // 2. 检查是否有缓存
  const existingProxy = rawToReactive.get(target)
  if (existingProxy) {
    return existingProxy
  }

  // 3. 检查是否可以代理
  if (!canObserve(target)) {
    return target
  }

  // 4. 创建 Proxy
  const proxy = new Proxy(target, mutableHandlers)

  // 5. 缓存
  rawToReactive.set(target, proxy)
  reactiveToRaw.set(proxy, target)

  return proxy
}

// Proxy handlers
const mutableHandlers = {
  get(target, key, receiver) {
    // 1. 依赖收集
    track(target, TrackOpTypes.GET, key)

    // 2. 获取值
    const res = Reflect.get(target, key, receiver)

    // 3. 深层响应式
    if (isObject(res)) {
      return reactive(res)
    }

    return res
  },

  set(target, key, value, receiver) {
    const oldValue = target[key]

    // 1. 设置值
    const result = Reflect.set(target, key, value, receiver)

    // 2. 触发更新
    if (hasChanged(value, oldValue)) {
      trigger(target, TriggerOpTypes.SET, key, value, oldValue)
    }

    return result
  },
}
```

#### 117. `Proxy` 的 handler 有哪些陷阱（traps）？

**回答要点：**

**13 种陷阱**：

```typescript
const handler = {
  // 属性读取
  get(target, key, receiver) {},

  // 属性设置
  set(target, key, value, receiver) {},

  // in 操作符
  has(target, key) {},

  // delete 操作
  deleteProperty(target, key) {},

  // Object.keys 等
  ownKeys(target) {},

  // Object.getOwnPropertyDescriptor
  getOwnPropertyDescriptor(target, key) {},

  // Object.defineProperty
  defineProperty(target, key, descriptor) {},

  // Object.preventExtensions
  preventExtensions(target) {},

  // Object.getPrototypeOf
  getPrototypeOf(target) {},

  // Object.setPrototypeOf
  setPrototypeOf(target, prototype) {},

  // Object.isExtensible
  isExtensible(target) {},

  // 函数调用
  apply(target, thisArg, args) {},

  // new 操作
  construct(target, args, newTarget) {},
}
```

**Vue 3 使用的陷阱**：

- `get`：依赖收集
- `set`：触发更新
- `has`：支持 `in` 操作符
- `ownKeys`：支持 `Object.keys`
- `deleteProperty`：支持 `delete`

#### 118. 什么是 `ReactiveFlags`？它们的作用是什么？

**回答要点：**

```typescript
export const enum ReactiveFlags {
  SKIP = '__v_skip', // 标记跳过响应式
  IS_REACTIVE = '__v_isReactive', // 标记是响应式对象
  IS_READONLY = '__v_isReadonly', // 标记是只读对象
  RAW = '__v_raw', // 获取原始对象
}
```

**使用场景**：

```typescript
// 检查是否是响应式对象
function isReactive(value: unknown): boolean {
  return !!(value && (value as Target)[ReactiveFlags.IS_REACTIVE])
}

// 获取原始对象
function toRaw<T>(observed: T): T {
  const raw = observed && (observed as Target)[ReactiveFlags.RAW]
  return raw ? toRaw(raw) : observed
}

// 标记跳过响应式
const obj = { __v_skip: true }
const reactive = reactive(obj) // 不会被代理
```

#### 119. 如何手写一个支持数组的响应式系统？

**回答要点：**

```typescript
function reactiveArray(target: any[]) {
  const instrumentations = {
    ['push'](this: any[], ...args: any[]) {
      track(this, TrackOpTypes.GET, 'length')
      const result = arrayProto.push.apply(this, args)
      trigger(this, TriggerOpTypes.ARRAY_MUTATE, 'length')
      return result
    },

    ['pop'](this: any[]) {
      track(this, TrackOpTypes.GET, 'length')
      const result = arrayProto.pop.apply(this)
      trigger(this, TriggerOpTypes.ARRAY_MUTATE, 'length')
      return result
    },

    ['splice'](this: any[], ...args: any[]) {
      track(this, TrackOpTypes.GET, 'length')
      const result = arrayProto.splice.apply(this, args)
      trigger(this, TriggerOpTypes.ARRAY_MUTATE, 'length')
      return result
    },
  }

  return new Proxy(target, {
    get(target, key, receiver) {
      if (key in instrumentations) {
        return instrumentations[key]
      }

      track(target, TrackOpTypes.GET, key)
      const res = Reflect.get(target, key, receiver)

      return isObject(res) ? reactive(res) : res
    },

    set(target, key, value, receiver) {
      const oldValue = target[key as any]
      const result = Reflect.set(target, key, value, receiver)

      if (key === 'length' || hasChanged(value, oldValue)) {
        trigger(target, TriggerOpTypes.SET, key, value, oldValue)
      }

      return result
    },
  })
}
```

#### 120. `track` 函数是如何收集依赖的？请描述数据结构

**回答要点：**

**数据结构**：

```
WeakMap<Target, Map<Key, Set<Effect>>>

- WeakMap: 以目标对象为 key
- Map: 以属性名为 key
- Set: 存储 effect 函数
```

**track 实现**：

```typescript
const targetMap = new WeakMap()
let activeEffect: ReactiveEffect | null = null

function track(target: object, type: TrackOpTypes, key: unknown) {
  if (!activeEffect) return

  // 1. 获取 target 的 depsMap
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  // 2. 获取 key 的 dep
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }

  // 3. 添加 effect
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}
```

**示例**：

```typescript
const state = reactive({ count: 0 });

// effect 执行时
computed(() => {
  console.log(state.count); // 触发 track
});

// targetMap 结构
WeakMap {
  state => Map {
    'count' => Set {\ effect1, effect2 }
  }
}
```

### 2. 渲染源码

#### 121. `createVNode` 函数的执行流程是什么？

**回答要点：**

```typescript
function createVNode(
  type: VNodeTypes,
  props: (Data & VNodeProps) | null = null,
  children: unknown = null,
  patchFlag: number = 0,
  dynamicProps: string[] | null = null
): VNode {
  // 1. 检查是否已存在 VNode
  if (isVNode(type)) {
    return cloneVNode(type)
  }

  // 2. 处理 class 和 style
  if (props) {
    props = normalizeProps(props)
  }

  // 3. 处理 children
  children = normalizeChildren(type, children)

  // 4. 处理 shapeFlag
  const shapeFlag = normalizeShapeFlag(type)

  // 5. 创建 VNode
  const vnode = {
    __v_isVNode: true,
    type,
    props,
    key: props?.key,
    ref: props?.ref,
    children,
    component: null,
    el: null,
    shapeFlag,
    patchFlag,
    dynamicProps,
  }

  return vnode
}
```

#### 122. 什么是 `patch` 过程？请描述其主要步骤

**回答要点：**

**patch 流程**：

```typescript
function patch(
  n1: VNode | null,
  n2: VNode,
  container: RendererElement,
  anchor: RendererNode | null = null
) {
  // 1. 相同 VNode，直接返回
  if (n1 === n2) return

  // 2. 类型不同，卸载旧节点
  if (n1 && !isSameVNodeType(n1, n2)) {
    unmount(n1)
    n1 = null
  }

  // 3. 根据类型处理
  const { type, shapeFlag } = n2

  switch (type) {
    case Text:
      processText(n1, n2, container)
      break
    case Comment:
      processCommentNode(n1, n2, container)
      break
    case Fragment:
      processFragment(n1, n2, container)
      break
    case Static:
      processStaticNode(n1, n2, container)
      break
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(n1, n2, container)
      } else if (shapeFlag & ShapeFlags.COMPONENT) {
        processComponent(n1, n2, container)
      } else if (shapeFlag & ShapeFlags.TELEPORT) {
        processTeleport(n1, n2, container)
      } else if (shapeFlag & ShapeFlags.SUSPENSE) {
        processSuspense(n1, n2, container)
      }
  }
}
```

#### 123. `mountComponent` 和 `updateComponent` 的区别是什么？

**回答要点：**

**mountComponent（首次挂载）**：

```typescript
function mountComponent(vnode: VNode, container: RendererElement, anchor: RendererNode | null) {
  // 1. 创建组件实例
  const instance = createComponentInstance(vnode)

  // 2. 初始化 props、slots
  setupComponent(instance)

  // 3. 设置 effect
  setupRenderEffect(instance, container, anchor)
}
```

**updateComponent（更新）**：

```typescript
function updateComponent(n1: VNode, n2: VNode) {
  const instance = (n2.component = n1.component)

  // 1. 更新 props
  instance.update()

  // 2. 重新渲染
  // effect 会自动执行
}
```

**区别**：

- `mountComponent`：创建实例、初始化、首次渲染
- `updateComponent`：更新 props、触发重新渲染

#### 124. 什么是渲染上下文？它是如何创建的？

**回答要点：**

**渲染上下文**：组件实例的渲染环境

```typescript
interface ComponentRenderContext {
  _: ComponentInternalInstance // 组件实例
  $: ComponentInternalInstance // 简写
  $props: Data // props
  $attrs: Data // attrs
  $slots: Slots // slots
  $parent: ComponentInternalInstance | null // 父实例
  $root: ComponentInternalInstance | null // 根实例
  $emit: EmitFn // emit 函数
  $options: ComponentOptions // 选项
  $forceUpdate: () => void // 强制更新
  $nextTick: () => Promise<void> // nextTick
}
```

**创建过程**：

```typescript
function createComponentInstance(vnode: VNode) {
  const component = vnode.type as Component

  const instance: ComponentInternalInstance = {
    uid: uid++,
    vnode,
    type: component,
    parent: currentInstance,
    appContext: vnode.appContext,
    root: null!,
    next: null,
    subTree: null!,
    effect: null!,
    update: null!,
    scope: new EffectScope(true),
    render: null,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // ...
  }

  return instance
}
```

#### 125. 如何从源码层面理解 `setup` 的执行时机？

**回答要点：**

**执行时机**：组件实例创建后，渲染前

```typescript
function setupComponent(instance: ComponentInternalInstance) {
  // 1. 初始化 props
  initProps(instance)

  // 2. 初始化 slots
  initSlots(instance)

  // 3. 执行 setup
  setupStatefulComponent(instance)
}

function setupStatefulComponent(instance: ComponentInternalInstance) {
  const Component = instance.type as ComponentOptions

  // 1. 创建渲染上下文
  instance.ctx = createRenderContext(instance)

  // 2. 获取 setup 函数
  const { setup } = Component

  if (setup) {
    // 3. 执行 setup
    const setupResult = setup(shallowReadonly(instance.props), {
      attrs: instance.attrs,
      slots: instance.slots,
      emit: instance.emit,
      expose: exposed => {
        instance.exposed = exposed
      },
    })

    // 4. 处理返回值
    handleSetupResult(instance, setupResult)
  } else {
    finishComponentSetup(instance)
  }
}
```

**关键点**：

- `setup` 在 `beforeCreate` 之前执行
- `setup` 中不能使用 `this`
- `setup` 返回的对象会暴露给模板

### 3. 编译源码

#### 126. 模板编译的三个阶段是什么？

**回答要点：**

**Phase 1: Parse（解析）**

- 将模板字符串转换为 AST
- 词法分析 + 语法分析
- 处理 HTML 特殊语法

**Phase 2: Transform（转换）**

- 遍历 AST，应用转换函数
- 静态分析
- 优化标记

**Phase 3: Generate（生成）**

- 将 AST 转换为 JavaScript 代码
- 生成渲染函数
- 处理优化

```typescript
function compile(template: string, options: CompilerOptions) {
  // 1. Parse
  const ast = baseParse(template, options)

  // 2. Transform
  transform(ast, {
    ...options,
    nodeTransforms: [
      transformElement,
      transformExpressions,
      transformText,
      transformSlotOutlet,
      // ...
    ],
  })

  // 3. Generate
  return generate(ast, options)
}
```

#### 127. 什么是 `transform` 阶段？它做了什么？

**回答要点：**

**transform 阶段**：AST 转换和优化

**主要工作**：

1. **元素转换**

   ```typescript
   function transformElement(node: ElementNode, context: TransformContext) {
     // 处理 props
     // 处理 children
     // 标记动态/静态
   }
   ```

2. **表达式转换**

   ```typescript
   function transformExpressions(node: ExpressionNode, context: TransformContext) {
     // 解析插值表达式
     // 标记是否静态
   }
   ```

3. **指令转换**

   ```typescript
   function transformVIf(node: ElementNode, context: TransformContext) {
     // 处理 v-if/v-else/v-else-if
   }

   function transformVFor(node: ElementNode, context: TransformContext) {
     // 处理 v-for
   }
   ```

4. **静态提升**
   ```typescript
   function hoistStatic(node: Node, context: TransformContext) {
     if (isStaticNode(node)) {
       context.hoists.push(node)
     }
   }
   ```

#### 128. 如何生成渲染函数代码？

**回答要点：**

```typescript
function generate(ast: RootNode, options: CompilerOptions = {}): CodegenResult {
  const context = createCodegenContext(ast, options)

  // 1. 生成 preamble（导入语句）
  genPreamble(context)

  // 2. 生成导出语句
  context.push(`export function render(_ctx, _cache) {`)
  context.indent()

  // 3. 生成 AST 代码
  genNode(ast, context)

  // 4. 生成静态提升代码
  if (context.hoists.length) {
    genHoists(context)
  }

  context.deindent()
  context.push(`}`)

  return {
    code: context.code,
    map: context.map,
  }
}

function genNode(node: ASTNode, context: CodegenContext) {
  switch (node.type) {
    case NodeTypes.ELEMENT:
      genElement(node, context)
      break
    case NodeTypes.TEXT:
      genText(node, context)
      break
    case NodeTypes.INTERPOLATION:
      genInterpolation(node, context)
      break
    // ...
  }
}
```

#### 129. 编译时如何优化事件绑定？

**回答要点：**

**事件缓存优化**：

```typescript
// 编译前
<button @click="handleClick">Click</button>

// 编译后
_createVNode("button", {
  onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick(...args))
}, "Click")
```

**实现原理**：

```typescript
function transformOn(node: ElementNode, context: TransformContext) {
  // 检查是否是静态事件
  if (isStaticHandler(node)) {
    // 生成缓存代码
    const cacheIndex = context.cached.length
    context.cached.push(null)

    return {
      key: propName,
      value: createCacheExpression(cacheIndex, handler),
    }
  }
}

function createCacheExpression(index: number, handler: Expression) {
  return {
    type: NodeTypes.JS_CACHE_EXPRESSION,
    index,
    value: handler,
  }
}
```

**优势**：

- 避免每次渲染创建新函数
- 保持引用稳定
- 减少子组件不必要的更新

#### 130. 什么是"块级优化"？

**回答要点：**

**块级优化（Block Tree）**：将模板打平为一维数组

**原理**：

1. 创建 Block 节点（带 patchFlag 的节点）
2. 收集所有动态子节点到 `dynamicChildren`
3. Diff 时只遍历 `dynamicChildren`

**示例**：

```vue
<template>
  <div>
    <span>静态文本</span>
    <p>{{ dynamicText }}</p>
    <div>
      <span :class="dynamicClass">嵌套动态</span>
    </div>
  </div>
</template>
```

**编译后**：

```javascript
export function render() {
  return (
    _openBlock(),
    _createBlock(
      'div',
      null,
      [
        _createVNode('span', null, '静态文本', -1 /* HOISTED */),
        _createVNode('p', null, _toDisplayString(dynamicText), 1 /* TEXT */),
        _createVNode(
          'div',
          null,
          [_createVNode('span', { class: dynamicClass }, '嵌套动态', 2 /* CLASS */)],
          64 /* STABLE_FRAGMENT */
        ),
      ],
      64 /* STABLE_FRAGMENT */
    )
  )
}
```

**Block 结构**：

```javascript
{
  type: 'div',
  dynamicChildren: [
    { type: 'p', patchFlag: 1 },
    { type: 'span', patchFlag: 2 }
  ]
}
```

**优势**：

- 跳过静态节点
- 减少 Diff 次数
- 性能提升 2-5 倍

## 十、综合应用题

### 1. 跨框架理解

#### 131. 如果让你设计一个响应式系统，你会怎么做？

**回答要点：**

**设计思路**：

```typescript
class ReactiveSystem {
  private targetMap = new WeakMap()
  private activeEffect: Effect | null = null

  // 创建响应式对象
  reactive<T extends object>(target: T): T {
    return new Proxy(target, this.createHandlers())
  }

  // 创建 ref
  ref<T>(value: T): Ref<T> {
    return {
      __v_isRef: true,
      _value: value,
      get value() {
        this.track('value')
        return this._value
      },
      set value(newValue: T) {
        this._value = newValue
        this.trigger('value')
      },
    } as Ref<T>
  }

  // 依赖收集
  track(target: object, key: string) {
    if (!this.activeEffect) return

    let depsMap = this.targetMap.get(target)
    if (!depsMap) {
      this.targetMap.set(target, (depsMap = new Map()))
    }

    let dep = depsMap.get(key)
    if (!dep) {
      depsMap.set(key, (dep = new Set()))
    }

    dep.add(this.activeEffect)
  }

  // 触发更新
  trigger(target: object, key: string) {
    const depsMap = this.targetMap.get(target)
    if (!depsMap) return

    const dep = depsMap.get(key)
    if (dep) {
      dep.forEach(effect => effect())
    }
  }

  // 创建 effect
  effect(fn: Function) {
    const effect = () => {
      this.activeEffect = effect
      try {
        return fn()
      } finally {
        this.activeEffect = null
      }
    }
    effect()
  }

  private createHandlers() {
    return {
      get: (target: object, key: string) => {
        this.track(target, key)
        const value = target[key as keyof typeof target]
        return typeof value === 'object' ? this.reactive(value) : value
      },
      set: (target: object, key: string, value: any) => {
        target[key as keyof typeof target] = value
        this.trigger(target, key)
        return true
      },
    }
  }
}
```

#### 132. Vue 3 和 React 18 的设计哲学有什么根本差异？

**回答要点：**

| 对比项   | Vue 3        | React 18     |
| -------- | ------------ | ------------ |
| 核心理念 | 渐进式框架   | 库（UI 层）  |
| 响应式   | 自动追踪     | 手动声明     |
| 更新方式 | 精确到属性   | 组件级       |
| 学习曲线 | 平缓         | 较陡         |
| 灵活性   | 约定优于配置 | 配置优于约定 |
| 生态     | 官方全家桶   | 社区驱动     |

**根本差异**：

1. **响应式 vs 不可变**
   - Vue：可变数据，自动追踪
   - React：不可变数据，手动管理

2. **模板 vs JSX**
   - Vue：模板语法，编译时优化
   - React：JSX，运行时灵活

3. **自动 vs 手动**
   - Vue：自动优化，开箱即用
   - React：手动优化，灵活控制

4. **设计目标**
   - Vue：易用性、性能、渐进式
   - React：灵活性、可组合性、并发

#### 133. 如何实现一个同时支持 Vue 和 React 的组件？

**回答要点：**

**方案：使用 Web Components**

```typescript
// 使用 Lit 框架
class MyButton extends LitElement {
  static properties = {
    label: { type: String },
    onClick: { type: Function },
  }

  render() {
    return html`
      <button @click=${this.onClick}>${this.label}</button>
    `
  }
}

customElements.define('my-button', MyButton)
```

**Vue 中使用**：

```vue
<template>
  <my-button :label="'Click me'" :on-click="handleClick" />
</template>
```

**React 中使用**：

```jsx
function App() {
  return <my-button label="Click me" onClick={handleClick} />
}
```

**方案2：适配器模式**

```typescript
// 核心逻辑
function createButtonLogic() {
  const state = { count: 0 }

  function increment() {
    state.count++
  }

  return { state, increment }
}

// Vue 适配器
export function VueButton() {
  const { state, increment } = createButtonLogic()
  const count = ref(state.count)

  watch(
    () => state.count,
    v => (count.value = v)
  )

  return { count, increment }
}

// React 适配器
export function ReactButton() {
  const { state, increment } = createButtonLogic()
  const [count, setCount] = useState(state.count)

  useEffect(() => {
    setCount(state.count)
  }, [state.count])

  return { count, increment }
}
```

#### 134. 什么是"响应式编程"？它在不同框架中的体现

**回答要点：**

- **响应式编程**：基于数据流和变化传播的编程范式

**核心概念**：

- **Observable**：可观察的数据流
- **Observer**：观察者
- **Subscription**：订阅关系

**Vue 中的体现**：

```typescript
// 自动响应式
const state = reactive({ count: 0 })
const double = computed(() => state.count * 2)

watch(state, () => {
  console.log('State changed')
})
```

**React 中的体现**：

```typescript
// 手动响应式
const [count, setCount] = useState(0)
const double = useMemo(() => count * 2, [count])

useEffect(() => {
  console.log('Count changed')
}, [count])
```

**RxJS 中的体现**：

```typescript
const subject = new BehaviorSubject(0)

subject.subscribe(value => {
  console.log('Value:', value)
})

subject.next(1)
subject.next(2)
```

**共同点**：

- 数据驱动视图
- 自动更新
- 声明式编程

**差异**：

- Vue：自动追踪
- React：手动声明
- RxJS：流式处理

#### 135. 未来前端框架的发展趋势是什么？

**回答要点：**

**趋势1：编译时优化**

- Svelte：编译为纯 JS
- Vue：编译时标记
- Solid：细粒度更新

**趋势2：信号（Signals）**

- Angular Signals
- Preact Signals
- Vue Refs

```typescript
// Signals 模式
const count = signal(0)
const double = computed(() => count() * 2)

effect(() => {
  console.log(count())
})
```

**趋势3：服务端组件**

- React Server Components
- Vue SSR 优化

**趋势4：边缘计算**

- 边缘渲染
- 边缘函数

**趋势5：AI 辅助开发**

- AI 代码生成
- 智能优化
- 自动调试

### 2. 开放性问题

#### 136. 请描述你阅读 Vue 3 源码的经历和收获

**回答要点：**

**阅读路径**：

1. **reactivity**：响应式系统
   - Proxy 实现
   - 依赖收集
   - computed/watch

2. **runtime-core**：运行时核心
   - 组件实例
   - 渲染流程
   - Diff 算法

3. **compiler-core**：编译器
   - AST 转换
   - 代码生成
   - 优化策略

**收获**：

- 深入理解响应式原理
- 掌握虚拟 DOM Diff
- 了解编译优化技巧
- 提升调试能力

**实践**：

- 手写简化版实现
- 从源码层面排查问题
- 性能优化

#### 137. 你如何保持对底层技术的深入理解？

**回答要点：**

**方法1：阅读源码**

- 定期阅读框架源码
- 关注核心模块
- 做笔记和总结

**方法2：动手实践**

- 手写核心功能
- 实现简化版框架
- 编写测试用例

**方法3：技术输出**

- 写技术博客
- 分享经验
- 参与开源

**方法4：持续学习**

- 关注 RFC
- 参与社区讨论
- 学习新技术

**方法5：项目实战**

- 在项目中应用
- 解决实际问题
- 总结经验教训

#### 138. 请分享一个你从源码层面解决的实际问题

**回答要点：**

**案例：响应式丢失问题**

**问题**：表单数据修改后视图不更新

**排查**：

1. 检查响应式 API：使用了 `reactive`
2. 检查依赖追踪：发现解构导致丢失
3. 查看源码：理解 `toRefs` 的实现

**解决**：

```typescript
// ❌ 错误
const { name, age } = reactive({ name: '', age: 0 })

// ✅ 正确
const state = reactive({ name: '', age: 0 })
const { name, age } = toRefs(state)
```

**收获**：

- 深入理解响应式原理
- 掌握排查技巧
- 避免类似问题

#### 139. 你如何评估一个框架的性能？

**回答要点：**

**评估维度**：

1. **渲染性能**
   - 首次渲染时间
   - 更新渲染时间
   - 大量数据渲染

2. **内存使用**
   - 内存占用
   - 内存泄漏
   - GC 频率

3. **包体积**
   - 核心库大小
   - Tree Shaking 支持
   - 按需加载

4. **启动速度**
   - FCP
   - LCP
   - TTI

**工具**：

- Chrome DevTools
- Lighthouse
- WebPageTest
- 自定义 Benchmark

**基准测试**：

```javascript
// 渲染 10000 条数据
const start = performance.now()
renderLargeList(10000)
const end = performance.now()
console.log(`渲染时间: ${end - start}ms`)
```

#### 140. 你对前端框架的未来有什么看法？

**回答要点：**

**观点1：融合趋势**

- Vue 和 React 互相学习
- 共同推动 Web 发展

**观点2：编译时优化**

- 更多框架采用编译优化
- 性能持续提升

**观点3：AI 辅助**

- AI 生成代码
- 智能优化
- 自动调试

**观点4：边缘计算**

- 边缘渲染
- 降低延迟

**观点5：Web Standards**

- Web Components
- 原生 API 增强
- 框架逐渐标准化

**总结**：

- 框架会持续演进
- 核心思想不变
- 开发者需持续学习

---

## 面试准备建议

### 学习方法

1. **源码阅读**: 从 `packages/reactivity` 开始，逐步深入
2. **动手实践**: 手写核心功能，加深理解
3. **对比分析**: 对比 Vue 2/3、Vue/React 的差异
4. **性能测试**: 使用工具量化优化效果

### 重点掌握

- 响应式系统的完整流程
- Diff 算法的核心逻辑
- 编译优化的关键点
- TypeScript 高级类型应用
- 性能调优的实战经验

### 面试技巧

- 用具体案例说明问题排查能力
- 展示源码级别的思考方式
- 强调性能优化的量化结果
- 体现跨框架的技术视野
