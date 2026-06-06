---
## 一、微前端架构方向
---

**Q1：qiankun 的 JS 沙箱原理是什么？你遇到过沙箱逃逸的问题吗？**

> **答：** qiankun 提供了三种沙箱：
>
> | 沙箱类型        | 原理                            | 适用场景                    |
> | --------------- | ------------------------------- | --------------------------- |
> | SnapshotSandbox | 激活时快照 window，卸载时恢复   | 单实例、不支持 Proxy 的环境 |
> | LegacySandbox   | Proxy 代理 window，记录增/改/删 | 单实例                      |
> | ProxySandbox    | 每个子应用一个 fakeWindow 代理  | 多实例并存                  |
>
> **遇到的逃逸问题：**
>
> - 子应用通过 `document.createElement('script')` 动态插入的脚本会逃逸沙箱 → 解决方案：重写 `document.createElement`，拦截 script 标签注入
> - `addEventListener` 挂在真实 window 上未被劫持 → 子应用卸载时未自动清理 → 需要手动在 `unmount` 生命周期中做事件解绑
> - 第三方库（如 ECharts）直接访问 `window.devicePixelRatio` 等属性 → 在 fakeWindow 上补齐这些只读属性的 getter

---

**Q2：微前端场景下，子应用之间的 CSS 样式隔离你是怎么做的？**

> **答：** 三层隔离策略：
>
> 1. **qiankun 内置隔离**：开启 `experimentalStyleIsolation`，会给子应用的所有样式加上 `div[data-qiankun="appName"]` 前缀选择器
> 2. **CSS Modules / Scoped**：组件级别用 Vue 的 `<style scoped>` 或 CSS Modules 防止类名冲突
> 3. **Element Plus 命名空间**：给子应用的 Element Plus 配置自定义 namespace（如 `ep-doctor`），避免和其他子应用的组件样式互相覆盖
>
> **踩过的坑：**
>
> - Element Plus 的弹窗（Dialog/Popover）挂载在 `document.body`，脱离了 qiankun 的样式隔离容器 → 通过配置 `teleported: false` 或指定 `append-to` 为子应用容器解决
> - 主应用的全局 reset.css 会影响子应用 → 给 reset 加上主应用的根选择器约束

---

**Q3：模块联邦（Module Federation）共享依赖时，版本不一致怎么办？**

> **答：**
>
> ```javascript
> // 主应用暴露共享依赖
> shared: {
>   vue: { singleton: true, requiredVersion: '^3.4.0' },
>   'element-plus': { singleton: true, strictVersion: true },
>   pinia: { singleton: true }
> }
> ```
>
> - `singleton: true`：强制全局只加载一份，避免 Vue 多实例导致响应式系统失效
> - `strictVersion: true`：版本不匹配时直接报错而非静默降级
> - **管理策略**：主应用负责统一升级基础依赖，子应用的 `package.json` 中将共享依赖标记为 `peerDependencies`，CI 流水线中加入版本一致性检查脚本
>
> **如果子应用确实需要不同版本？** → 不加入 shared，让该子应用自己打包一份（牺牲体积换隔离性）

---

**Q4：子应用的生命周期管理中，你遇到过内存泄漏的问题吗？**

> **答：** 遇到过，主要有三类：
>
> | 泄漏类型   | 原因                                     | 解决方案                                              |
> | ---------- | ---------------------------------------- | ----------------------------------------------------- |
> | 事件监听器 | 子应用卸载后 window 上的 listener 未清理 | 封装 `useEventListener` Hook，在 `unmount` 自动清理   |
> | 定时器     | setInterval/setTimeout 未清除            | 封装 `useSafeTimer`，组件卸载自动 clear               |
> | WebSocket  | 连接未断开                               | 在 qiankun 的 `beforeUnmount` 钩子中调用 `ws.close()` |
> | 闭包引用   | 全局事件回调闭包中引用了大对象           | 用 WeakRef/WeakMap 持有引用                           |
>
> **检测手段：** Chrome DevTools → Memory → 拍摄 Heap Snapshot → 对比子应用加载前后的对象增量，看哪些对象未被 GC

---

**Q5：qiankun 子应用首次加载慢，你做了哪些优化？**

> **答：**
>
> 1. **预加载**：主应用空闲时通过 `prefetchApps()` 提前拉取子应用资源
> 2. **模块联邦减体积**：共享 Vue/Element Plus 后，子应用产物从 1.2MB 降到 300KB
> 3. **按路由懒加载子应用内部模块**：不是进入子应用就加载全部 46 个模块
> 4. **资源缓存**：子应用静态资源配置强缓存 + contenthash，二次加载直接命中缓存
> 5. **骨架屏过渡**：加载期间展示子应用的骨架屏，减少用户感知的白屏时间

---

## 二、性能优化方向

---

**Q6：虚拟滚动中动态行高是怎么处理的？如果行高在渲染前无法确定呢？**

> **答：**
>
> ```
> 流程：
> ① 初始化时给所有行一个预估高度（如 48px）
> ② 行渲染后，通过 ResizeObserver 获取真实高度
> ③ 将真实高度写入 heightCache[index]
> ④ 重新计算总高度和当前 scrollOffset 对应的 startIndex
> ```
>
> **关键问题：** 用户快速滚动到中间位置时，中间那些行还没渲染过，没有真实高度怎么办？
>
> - 用**预估高度 × 行数**估算位置，先定位到大致区域
> - 渲染出来后拿到真实高度，做一次**微调修正**（调整 scrollTop 偏移量，避免内容跳动）
>
> **防止跳动的技巧：** 每次高度校正后，如果在可视区域上方，修正 `paddingTop`；如果在下方，不影响当前视图

---

**Q7：首屏渲染降低 40% 具体怎么做到的？有量化数据吗？**

> **答：** 优化前后对比（Lighthouse + Performance API 实测）：
>
> | 指标      | 优化前 | 优化后 | 手段                      |
> | --------- | ------ | ------ | ------------------------- |
> | FCP       | 2.8s   | 1.2s   | 骨架屏 + 关键 CSS 内联    |
> | LCP       | 4.1s   | 2.2s   | 组件懒加载 + 接口并行     |
> | TTI       | 5.3s   | 3.0s   | 代码分割 + 延迟非关键模块 |
> | JS Bundle | 1.8MB  | 680KB  | 模块联邦 + Tree-shaking   |
>
> **核心策略：**
>
> - 接诊页 46 个模块改为**按区域懒加载**：上半屏立即渲染，下半屏 `IntersectionObserver` 进入视口才加载
> - 患者信息 + 历史病历 + 医嘱三个接口**并行请求**（之前是串行）
> - 药品字典等大数据做 IndexedDB 本地缓存，减少重复拉取

---

**Q8：防抖和节流在你项目中分别用在什么场景？有什么注意点？**

> **答：**
>
> | 场景             | 使用策略    | 参数                                       |
> | ---------------- | ----------- | ------------------------------------------ |
> | 药品远程搜索     | 防抖 300ms  | `leading: false` 确保停止输入才搜索        |
> | 滚动计算可视区域 | RAF 节流    | `requestAnimationFrame` 保证与屏幕刷新同步 |
> | 表单自动保存     | 防抖 2000ms | `leading: true` 第一次变更立即保存         |
> | 窗口 resize      | 节流 200ms  | 避免频繁重新计算布局                       |
>
> **注意点：**
>
> - 防抖搜索要做**竞态取消**：用户快速输入 A→AB→ABC，只有最后一次 "ABC" 的响应是有效的，之前的请求结果即使先返回也要丢弃 → 用 `AbortController` 或版本号机制
> - 组件卸载时要清理 timer，否则会内存泄漏

---

**Q9：Webpack 迁移 Rsbuild 过程中，最大的坑是什么？**

> **答：** 三个主要的坑：
>
> 1. **Loader 不兼容**：Webpack 的某些 loader（如 `vue-svg-loader`）没有 Rspack 版本 → 需要找替代方案或自己写 Rspack plugin
> 2. **模块联邦 + qiankun 的 publicPath 冲突**：qiankun 动态注入 `__webpack_public_path__`，但 Rsbuild 的变量名不同 → 需要在 entry 中手动兼容
> 3. **开发模式的 HMR WebSocket 端口冲突**：主应用和子应用都开 dev server，WebSocket 端口互相打架 → 给每个子应用配置独立的 `devServer.client.webSocketURL`
>
> **迁移策略：** 不是一步到位，而是先搭一个 Rsbuild 配置跑通最小集，然后逐个模块迁移，CI 上同时保留两套构建做对比验证。

---

**Q10：10w+ 数据虚拟滚动时，搜索/筛选后列表跳动怎么处理？**

> **答：**
>
> - 筛选后数据量变化 → 总高度变化 → `scrollTop` 可能超出新的最大滚动范围 → 需要 `clamp` 到合法范围
> - 重置 `scrollTop = 0` 并清空 heightCache 中已过期的缓存
> - 用 `nextTick` + `scrollTo({ behavior: 'instant' })` 避免过渡动画导致的闪烁
> - 如果需要保持搜索前的位置（如只是高亮匹配项），则用**数据索引映射**：记录原始数据的 index → 滚动到该 index 对应的 offset

---

## 三、组件设计与状态管理方向

---

**Q11：formStore 的联动关系是有向图，怎么检测循环依赖？**

> **答：**
>
> ```typescript
> // 初始化时构建依赖邻接表
> const graph: Map<string, string[]> = new Map()
> schema.forEach(field => {
>   if (field.dependency) {
>     const deps = graph.get(field.dependency.field) || []
>     deps.push(field.field)
>     graph.set(field.dependency.field, deps)
>   }
> })
>
> // Kahn 算法 - 拓扑排序
> function detectCycle(graph): boolean {
>   const inDegree = new Map()
>   // ... 计算入度，BFS 削减，最后看是否还有剩余节点
>   return remainingNodes > 0 // true = 有环
> }
> ```
>
> 如果检测到环，开发环境直接 `console.error` 报出具体的环路径（A → B → C → A），帮助业务排查配置错误。

---

**Q12：ProField 的 valueType 自动映射是怎么实现的？34 种类型怎么管理？**

> **答：**
>
> ```typescript
> // 注册表模式
> const fieldRegistry = new Map<string, Component>()
>
> // 注册
> fieldRegistry.set('input', ProInput)
> fieldRegistry.set('select', ProSelect)
> fieldRegistry.set('datePicker', ProDatePicker)
> // ... 共 34 种
>
> // 使用时自动映射
> const FieldComponent = computed(() => {
>   return fieldRegistry.get(props.valueType) || ProInput // 兜底
> })
> ```
>
> **架构设计：**
>
> - 支持**业务侧扩展注册**：`ProField.register('customType', CustomComponent)`
> - 每个 Field 统一实现 `readonly`（阅读模式）和 `edit`（编辑模式）两种渲染
> - 防抖校验：输入时不实时校验，停止输入 300ms 后才触发，避免表单频繁报红

---

**Q13：useSelect 中远程搜索的竞态问题怎么解决？**

> **答：**
>
> ```typescript
> function useRemoteSearch(fetchFn) {
>   let requestId = 0 // 版本号
>
>   const search = debounce(async (keyword: string) => {
>     const currentId = ++requestId // 每次搜索递增
>     loading.value = true
>
>     const result = await fetchFn(keyword)
>
>     // 只有最新一次请求的结果才会被采用
>     if (currentId === requestId) {
>       options.value = result
>       loading.value = false
>     }
>     // 否则直接丢弃（旧请求的响应晚于新请求）
>   }, 300)
>
>   return { search, loading, options }
> }
> ```
>
> 也可以用 `AbortController`：
>
> ```typescript
> let controller: AbortController | null = null
> // 每次新搜索前取消上一次
> controller?.abort()
> controller = new AbortController()
> fetch(url, { signal: controller.signal })
> ```

---

**Q14：组件库的 TypeScript 类型设计有哪些难点？**

> **答：** 三个主要难点：
>
> 1. **ProTable 的 columns 类型与 dataSource 联动**：
>
> ```typescript
> // 用户传入 dataSource 后，column 的 field 应该被约束为 dataSource 的 key
> interface ProTableProps<T extends Record<string, any>> {
>   dataSource: T[]
>   columns: ProColumn<T>[]
> }
> type ProColumn<T> = {
>   field: keyof T // 自动推导！
>   render?: (row: T) => VNode
> }
> ```
>
> 2. **表单 Schema 的类型与 valueType 关联**：不同 valueType 对应不同的 props 类型（select 有 options，input 有 maxLength）→ 用**条件类型 + 类型映射**
> 3. **`.d.ts` 生成时泛型丢失**：`vue-tsc` 对复杂泛型组件的类型导出有 bug → 手动补充 `declare` 声明文件

---

**Q15：Pinia 在你项目里的角色是什么？为什么 formStore 不直接用 Pinia？**

> **答：**
>
> - **Pinia 的角色**：管理**全局/跨页面状态**（当前患者信息、用户权限、系统配置等）
> - **formStore 不用 Pinia 的原因**：
>   1. 表单状态是**组件实例级别**的，不是全局的——页面上可能同时有多个独立表单
>   2. formStore 需要根据 Schema **动态创建响应式字段**，Pinia 的 `defineStore` 是静态定义
>   3. formStore 需要精细控制**联动触发的时序**——先计算 visible → 再计算 required → 最后触发 validate，Pinia 没有这种调度能力
>
> 本质上 formStore 更像一个**领域专用的响应式状态机**，而不是通用状态管理器。

---

## 四、工程化与构建方向

---

**Q16：UMD / ESM / CJS 三种格式产物分别用在什么场景？**

> **答：**
>
> | 格式 | 使用场景                        | 特点                        |
> | ---- | ------------------------------- | --------------------------- |
> | ESM  | 现代打包工具（Vite/Webpack 5+） | 支持 Tree-shaking，按需引入 |
> | CJS  | Node.js 环境 / SSR / Jest 测试  | `require()` 方式引入        |
> | UMD  | CDN `<script>` 标签直接引用     | 兼容 AMD/CJS/全局变量       |
>
> **构建配置要点：**
>
> - ESM 产物标记 `"sideEffects": false`，让业务项目能 Tree-shake 未使用的组件
> - UMD 需要 `external` 掉 Vue 和 Element Plus，避免重复打包
> - `package.json` 中配置 `"main"(CJS)`、`"module"(ESM)`、`"exports"` 三种入口

---

**Q17：.d.ts 类型声明自动生成遇到了什么问题？**

> **答：**
>
> 1. **Vue SFC 的类型提取**：`.vue` 文件需要 `vue-tsc` 才能正确提取 `defineProps` 的类型 → 配置 `"declaration": true` + `"emitDeclarationOnly": true`
> 2. **路径别名解析**：源码中用 `@/` 别名，生成的 `.d.ts` 里也是 `@/` → 业务侧识别不了 → 需要用 `tsc-alias` 或 `rollup-plugin-dts` 把路径替换为相对路径
> 3. **泛型组件的类型丢失**：`<script setup generic="T">` 的泛型参数在 `.d.ts` 中可能变成 `any` → 手动补充 `declare` 或升级 `vue-tsc` 版本
> 4. **类型合并**：每个组件单独生成 `.d.ts` 后，需要用 `rollup-plugin-dts` 合并为一个入口文件，减少 node_modules 中的文件数

---

**Q18：Husky + lint-staged 的质量卡点流程是怎样的？**

> **答：**
>
> ```
> git commit 触发
>     │
>     ▼
> husky → pre-commit 钩子
>     │
>     ▼
> lint-staged（只检查暂存区文件）
>     ├── *.{ts,vue} → eslint --fix
>     ├── *.{ts,vue,css} → prettier --write
>     └── *.{ts,vue} → vue-tsc --noEmit（类型检查）
>     │
>     ▼
> commit-msg 钩子 → commitlint 校验提交信息格式
>     │
>     ▼
> 通过 → commit 成功
> 不通过 → commit 被阻止，终端报错
> ```
>
> **为什么只检查暂存区？** → 避免全量检查耗时太久导致开发体验差

---

## 五、WebSocket 与实时通信方向

---

**Q19：WebSocket 断线重连和消息补偿怎么实现的？**

> **答：**
>
> ```typescript
> class ReconnectableWS {
>   private retryCount = 0
>   private maxRetry = 5
>   private lastSeq = 0 // 最后收到的消息序列号
>
>   connect() {
>     this.ws = new WebSocket(url)
>
>     this.ws.onclose = () => {
>       if (this.retryCount < this.maxRetry) {
>         // 指数退避重连：1s → 2s → 4s → 8s → 16s
>         setTimeout(() => this.connect(), 2 ** this.retryCount * 1000)
>         this.retryCount++
>       } else {
>         // 降级为轮询
>         this.fallbackToPolling()
>       }
>     }
>
>     this.ws.onopen = () => {
>       this.retryCount = 0
>       // 重连后请求补偿：告诉服务端我最后收到的 seq
>       this.ws.send(JSON.stringify({ type: 'sync', lastSeq: this.lastSeq }))
>     }
>
>     this.ws.onmessage = msg => {
>       const data = JSON.parse(msg.data)
>       this.lastSeq = data.seq // 更新序列号
>       this.emit(data.type, data.payload)
>     }
>   }
> }
> ```
>
> **消息补偿：** 服务端维护消息队列（如 Redis Stream），重连后根据 `lastSeq` 把断线期间的消息按序推送过来。

---

**Q20：危急值弹窗如何保证医生一定能看到？不会被误关？**

> **答：**
>
> 设计上做了四层保障：
>
> 1. **强制模态**：弹窗不可点击遮罩关闭、不可 Esc 关闭，必须点击「已阅」按钮
> 2. **已阅确认上报**：点击「已阅」后向后端发送确认请求，后端记录确认时间和操作人
> 3. **超时升级**：如果 5 分钟未确认，后端推送给科室主任 + 触发短信提醒
> 4. **页面切换保活**：即使医生切换到其他子应用，弹窗挂在主应用层级（通过跨应用事件通知主应用弹窗），不会被子应用切换所销毁
>
> **技术实现：** 危急值消息有独立的优先级通道（WebSocket 上用不同的 `type` 字段区分），即使普通消息积压，危急值消息也会被优先处理和展示。

---

## 六、Vue 3 底层原理方向

---

**Q21：Vue 3 的响应式系统（Proxy）和 Vue 2（Object.defineProperty）的本质区别是什么？你在项目中遇到过响应式失效的情况吗？**

> **答：**
>
> | 对比维度 | Vue 2 (defineProperty)       | Vue 3 (Proxy)                   |
> | -------- | ---------------------------- | ------------------------------- |
> | 检测方式 | 逐个属性劫持 getter/setter   | 整个对象代理                    |
> | 新增属性 | 无法检测，需 `$set`          | 自动检测                        |
> | 数组索引 | 无法检测 `arr[0] = x`        | 自动检测                        |
> | 性能     | 初始化遍历所有属性（深递归） | 懒代理，访问时才递归            |
> | 删除属性 | 无法检测，需 `$delete`       | 自动检测（deleteProperty trap） |
>
> **项目中遇到的响应式失效：**
>
> 1. `formStore` 中动态新增字段用 `obj[newKey] = value` → 虽然 Vue 3 能检测到，但如果 `obj` 本身不是响应式的就失效 → 确保通过 `reactive()` 或 `ref()` 创建
> 2. 解构 `props` 导致丢失响应式 → 用 `toRefs(props)` 或 `computed`
> 3. 异步回调中访问 `ref` 忘记 `.value` → TypeScript 类型约束能提前发现

---

**Q22：Vue 3 的 watchEffect 和 watch 有什么区别？你在 formStore 里为什么选 watchEffect？**

> **答：**
>
> | 对比     | watch                            | watchEffect       |
> | -------- | -------------------------------- | ----------------- |
> | 数据源   | 必须显式指定                     | 自动收集依赖      |
> | 初始执行 | 默认不执行（`immediate: false`） | 立即执行一次      |
> | 旧值访问 | 有 `(newVal, oldVal)`            | 没有旧值          |
> | 适用场景 | 明确知道监听什么                 | 依赖关系复杂/动态 |
>
> **formStore 选 watchEffect 的原因：**
>
> ```typescript
> // 联动逻辑中，字段 A 的 visible 可能依赖字段 B、C、D 的值
> // 用 watch 需要手动列出所有依赖，且依赖是动态变化的
> watchEffect(() => {
>   // 自动追踪内部访问的所有响应式数据
>   fieldState.visible = evaluateCondition(schema.dependency)
>   // 如果 dependency 引用了 formValues.type、formValues.level 等
>   // watchEffect 会自动追踪它们，无需手动声明
> })
> ```
>
> **注意点：** watchEffect 的调度用了 `flush: 'post'`，确保在 DOM 更新后执行，避免读到过期的 DOM 状态。

---

**Q23：Vue 3 的 Composition API 对比 Options API，在大型组件中有什么具体优势？能举个你项目的例子吗？**

> **答：** 核心优势是**按逻辑关注点组织代码**而非按选项类型分散。
>
> 以 ProSelect 为例：
>
> ```
> Options API 的组织方式（逻辑被打散）：
> ─────────────────────────────────
> data()     → 搜索状态 + 分页状态 + 选中状态 + 键盘状态 全混在一起
> methods    → 搜索方法 + 分页方法 + 选中方法 + 键盘方法 全混在一起
> watch      → 各种 watcher 混在一起
> computed   → 各种计算属性混在一起
>
> Composition API 的组织方式（按逻辑聚合）：
> ─────────────────────────────────
> useRemoteSearch()  → 搜索相关的 state + method + watch 全在一起
> usePagination()    → 分页相关的全在一起
> useSelection()     → 选中相关的全在一起
> useKeyboard()      → 键盘导航全在一起
> ```
>
> **具体好处：**
>
> - 每个 Hook 可以独立测试（用 Vitest 测 `useRemoteSearch`，不需要挂载组件）
> - 可以跨组件复用（ProSelect 和 ProTable 都用 `useVirtualScroll`）
> - 1000+ 行的组件不再是维护噩梦，每个 Hook 200 行左右

---

**Q24：你了解 Vue 3 的虚拟 DOM Diff 算法吗？它和 React 的 Diff 有什么区别？**

> **答：**
>
> Vue 3 用的是**双端对比 + 最长递增子序列**算法：
>
> ```
> 旧: [A, B, C, D, E, F, G]
> 新: [A, B, F, C, D, E, G]
>
> 步骤：
> ① 从头部开始比对：A=A ✓, B=B ✓ → 前 2 个不动
> ② 从尾部开始比对：G=G ✓ → 最后 1 个不动
> ③ 中间部分 [C,D,E,F] vs [F,C,D,E]：
>    → 建立新节点的 key→index 映射表
>    → 找到最长递增子序列 [C,D,E]（位置不需要动）
>    → 只移动 F 到前面
> ```
>
> **和 React 的区别：**
>
> | Vue 3                                   | React                         |
> | --------------------------------------- | ----------------------------- |
> | 双端对比（头头、尾尾、头尾、尾头）      | 单向从左到右                  |
> | 最长递增子序列最小化移动                | 简单的 key 复用，可能多余移动 |
> | 编译时标记静态节点（PatchFlag）跳过对比 | 纯运行时 Diff                 |
> | Block Tree 跳过静态子树                 | 需要 React.memo 手动优化      |
>
> **在我项目中的体现：** ProTable 渲染大量行时，Vue 3 的编译优化（静态提升、PatchFlag）让非数据列的 DOM 不参与 Diff，性能比 Vue 2 好很多。

---

**Q25：Vue 3 的 `<script setup>` 编译后做了什么？为什么它比普通 `<script>` 更快？**

> **答：**
>
> `<script setup>` 编译后的产物对比：
>
> ```javascript
> // 编译前
> <script setup>
> const msg = ref('hello');
> function onClick() { msg.value = 'world'; }
> </script>
>
> // 编译后（简化版）
> export default {
>   setup(__props, { expose }) {
>     const msg = ref('hello');
>     function onClick() { msg.value = 'world'; }
>     // 直接返回，无需 return { msg, onClick }
>     return { msg, onClick };
>   }
> }
> ```
>
> **为什么更快：**
>
> 1. **减少运行时开销**：不需要运行时遍历 return 对象进行 Proxy 包装
> 2. **编译时优化**：编译器知道哪些变量是模板引用的，可以做更精确的依赖追踪
> 3. **更好的类型推导**：TypeScript 能直接推导 Props/Emits 类型，无需额外的 `defineComponent` 包装
> 4. **Tree-shaking 友好**：未被模板使用的导入会被编译器标记为可摇除

---

## 七、TypeScript 高级应用方向（4 题）

---

**Q26：你提到编写了 500+ 行 TS 类型定义，能举一个最复杂的类型设计例子吗？**

> **答：** ProTable 的 columns 类型是最复杂的——要根据 `valueType` 推导出不同的 column 配置项：
>
> ```typescript
> // 基础字段类型映射
> interface ValueTypeMap {
>   input: { maxLength?: number; placeholder?: string }
>   select: { options: Option[]; multiple?: boolean }
>   datePicker: { format?: string; valueFormat?: string }
>   number: { min?: number; max?: number; precision?: number }
>   // ... 34 种
> }
>
> // Column 类型根据 valueType 自动推导 fieldProps
> type ProColumn<T, V extends keyof ValueTypeMap = 'input'> = {
>   field: keyof T
>   valueType?: V
>   fieldProps?: ValueTypeMap[V] // ← 自动推导！
>   render?: (row: T) => VNode
> }
>
> // 联合类型使得用户写 columns 时有完整提示
> type ProColumns<T> = Array<{ [V in keyof ValueTypeMap]: ProColumn<T, V> }[keyof ValueTypeMap]>
> ```
>
> 这样当用户写 `valueType: 'select'` 时，`fieldProps` 自动提示 `options`、`multiple` 等属性。

---

**Q27：TypeScript 中的 `infer`、条件类型、模板字面量类型你怎么用的？**

> **答：** 举三个实际用到的例子：
>
> ```typescript
> // 1. infer - 提取 Promise 的内部类型（接口返回值自动推导）
> type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
> // 用法：type Data = UnwrapPromise<ReturnType<typeof fetchPatientList>>
>
> // 2. 条件类型 - 根据 valueType 推导字段值类型
> type FieldValue<V extends string> = V extends 'select'
>   ? string | string[]
>   : V extends 'number'
>     ? number
>     : V extends 'datePicker'
>       ? string | Date
>       : V extends 'switch'
>         ? boolean
>         : string
>
> // 3. 模板字面量类型 - 事件名自动推导
> type EventName<T extends string> = `on${Capitalize<T>}`
> // EventName<'change'> = 'onChange'
> // EventName<'focus'> = 'onFocus'
>
> // 用于组件库的事件 props 类型自动生成
> type EmitEvents<T extends string[]> = {
>   [K in T[number] as EventName<K>]?: (...args: any[]) => void
> }
> ```

---

**Q28：如何给第三方库（如 Element Plus）做类型扩展？**

> **答：** 通过 TypeScript 的**声明合并（Declaration Merging）** ：
>
> ```typescript
> // types/element-plus.d.ts
>
> // 1. 扩展 ElTable 的 Props（加入我们自定义的属性）
> declare module 'element-plus' {
>   interface TableProps<T> {
>     virtualScroll?: boolean // 我们扩展的
>     rowEstimatedHeight?: number // 我们扩展的
>   }
> }
>
> // 2. 扩展全局组件类型（让模板中有智能提示）
> declare module 'vue' {
>   interface GlobalComponents {
>     ProTable: (typeof import('./components/ProTable'))['default']
>     ProForm: (typeof import('./components/ProForm'))['default']
>     ProSelect: (typeof import('./components/ProSelect'))['default']
>   }
> }
>
> // 3. 扩展 ComponentCustomProperties（this.$xxx）
> declare module 'vue' {
>   interface ComponentCustomProperties {
>     $proConfig: ProGlobalConfig
>   }
> }
> ```

---

**Q29：TS 中的 `as const`、`satisfies`、`NoInfer` 你用过吗？分别解决什么问题？**

> **答：**
>
> ```typescript
> // 1. as const - 缩窄字面量类型（用在组件库的默认值配置）
> const SIZES = ['small', 'default', 'large'] as const
> type Size = (typeof SIZES)[number] // 'small' | 'default' | 'large'
> // 而不是 string[]
>
> // 2. satisfies - 既保留字面量类型又做约束检查
> const fieldMap = {
>   input: { component: ProInput, defaultWidth: 200 },
>   select: { component: ProSelect, defaultWidth: 240 },
> } satisfies Record<string, { component: Component; defaultWidth: number }>
> // fieldMap.input.defaultWidth 的类型是 200（字面量），不是 number
>
> // 3. NoInfer - 阻止泛型推导（Vue 3.4+）
> function useField<T>(defaultValue: T, validator: (val: NoInfer<T>) => boolean) {}
> // 让 T 只从 defaultValue 推导，validator 参数不参与推导
> // 避免传入 validator 时把 T 推宽
> ```

---

## 八、工程化深度方向（4 题）

---

**Q30：Vite 的 dev 和 build 为什么用不同的策略？这带来过什么问题？**

> **答：**
>
> | 阶段  | 策略                             | 工具         |
> | ----- | -------------------------------- | ------------ |
> | Dev   | 原生 ESM + 按需编译（no-bundle） | esbuild 转译 |
> | Build | 打包成 bundle                    | Rollup 打包  |
>
> **带来的问题（dev 正常 build 出错）：**
>
> 1. **全局 CSS 引入顺序不一致**：Dev 模式 CSS 按 import 顺序加载，Build 模式 Rollup 可能调整 chunk 顺序 → 样式优先级变化 → 用 `@layer` 或显式控制引入顺序
> 2. **CJS 依赖兼容问题**：Dev 模式 Vite 的预构建（esbuild）会自动转换 CJS，但 Build 模式某些边缘 case Rollup 处理不了 → 加入 `optimizeDeps.include` 预构建
> 3. **环境变量差异**：`import.meta.env` 在 Dev 是运行时注入，Build 是编译时替换 → 动态拼接环境变量名（如 `import.meta.env[key]`）在 Build 时会丢失

---

**Q31：你们组件库的版本发布流程是怎样的？如何处理 breaking change？**

> **答：**
>
> ```
> 发布流程：
> ─────────────────────────────────────────────────
> feature 分支开发 → PR 合入 main → CI 自动化检查
>      │
>      ▼
> 手动触发 release 流程（或 tag 触发）
>      │
>      ▼
> ① changeset 生成 changelog
> ② 根据 commit 类型自动决定版本号
>    - fix: → patch (1.0.1)
>    - feat: → minor (1.1.0)
>    - feat!: / BREAKING CHANGE → major (2.0.0)
> ③ 构建产物（UMD/ESM/CJS + .d.ts）
> ④ 发布到私有 npm registry
> ⑤ 通知下游项目（企业微信 Bot）
> ```
>
> **Breaking Change 处理策略：**
>
> - 提供**迁移期**：新旧 API 并存一个 minor 版本，旧 API 标记 `@deprecated`
> - 提供 **codemod 脚本**：自动化替换旧用法
> - changelog 中详细说明迁移步骤
> - 大版本升级前在 Storybook 上搭建对比 demo

---

**Q32：Vitest 和 Jest 有什么区别？你为什么选 Vitest？**

> **答：**
>
> | 对比       | Jest                             | Vitest                          |
> | ---------- | -------------------------------- | ------------------------------- |
> | 运行时     | Node（需要 babel 转译）          | 基于 Vite（原生 ESM）           |
> | 配置       | 需要单独配 `jest.config` + babel | 复用 `vite.config`，零配置      |
> | 速度       | 冷启动慢（编译全部）             | 按需编译，HMR 级别重跑          |
> | Vue SFC    | 需要 `vue-jest` 额外适配         | 原生支持 `.vue` 文件            |
> | TypeScript | 需要 `ts-jest` 或 `@swc/jest`    | 原生支持，无额外配置            |
> | 兼容性     | Jest API                         | 完全兼容 Jest API（可无缝迁移） |
>
> **选 Vitest 的原因：**
>
> 1. 组件库本身用 Vite 构建，配置复用、路径别名一致，不存在 "测试环境和开发环境不一致" 的问题
> 2. 速度快 3-5 倍，Watch 模式下只重跑变更相关的测试
> 3. 原生支持 ESM，不需要 mock `import.meta`

---

**Q33：Tree-shaking 的原理是什么？你的组件库如何保证能被正确 Tree-shake？**

> **答：**
>
> **原理：** 基于 ESM 的静态分析——`import/export` 在编译时确定，打包工具可以分析哪些导出没有被引用，从而删除死代码。
>
> **组件库保证 Tree-shaking 的做法：**
>
> ```json
> // package.json
> {
>   "module": "dist/es/index.mjs", // ESM 入口
>   "sideEffects": ["**/*.css"], // 只有 CSS 有副作用
>   "exports": {
>     ".": {
>       "import": "./dist/es/index.mjs",
>       "require": "./dist/lib/index.cjs"
>     },
>     "./es/*": "./dist/es/*" // 支持按路径引入单组件
>   }
> }
> ```
>
> **关键注意点：**
>
> 1. 不能有顶层副作用代码（如 `console.log()`、自执行函数）
> 2. 组件注册不能用 `app.use(全量插件)`，要支持 `import { ProTable } from 'xxx'` 单独引入
> 3. CSS 必须标记为 sideEffects，否则会被摇掉
> 4. 避免 barrel file（`index.ts` 里 `export * from './xxx'` 全量导出）导致无法摇除 → 改为按需导出

---

## 九、设计模式与架构思维方向（4 题）

---

**Q34：你在组件库中用到了哪些设计模式？**

> **答：** 至少用了 5 种：
>
> | 模式           | 应用场景                     | 具体实现                                        |
> | -------------- | ---------------------------- | ----------------------------------------------- |
> | **策略模式**   | ProField 的 valueType 映射   | 不同 valueType 对应不同渲染策略，运行时动态选择 |
> | **观察者模式** | formStore 的联动通知         | 字段值变化 → 通知所有依赖它的字段重新计算       |
> | **组合模式**   | useSelect 由多个子 Hook 组合 | 每个 Hook 独立可测试，组合后形成完整功能        |
> | **工厂模式**   | 根据 Schema 动态创建表单字段 | `createField(schema)` 返回对应的组件实例配置    |
> | **发布订阅**   | 微前端跨应用通信             | EventBus 发布事件，各子应用订阅感兴趣的事件     |
> | **单例模式**   | WebSocket 连接管理           | 全局只有一个 WS 实例，避免重复连接              |

---

**Q35：如果让你重新设计 formStore，你会改进什么？**

> **答：** 三个改进方向：
>
> 1. **引入依赖图的可视化调试工具**
>    - 当前联动关系复杂时，排查 bug 要翻代码看 Schema → 开发一个 DevTools 插件，可视化展示字段依赖图，点击节点高亮联动路径
> 2. **用 Signal 替代 watchEffect**
>    - Vue 3.5+ 可能原生支持 Signal，比 watchEffect 更细粒度，避免不必要的重新执行
>    - 或者用类似 `computed` 的惰性求值，只在字段被访问时才计算联动状态
> 3. **支持异步联动**
>    - 当前联动都是同步计算的，但有些场景需要异步（如选了省份后异步加载城市列表）
>    - 需要加入 loading 状态 + 竞态处理 + 超时兜底
>
> ```typescript
> // 改进后的联动定义
> dependency: {
>   field: 'province',
>   effect: 'options',
>   async resolve(provinceValue) {
>     return await fetchCities(provinceValue); // 异步联动
>   },
>   debounce: 300,
>   fallback: [] // 超时兜底
> }
> ```

---

**Q36：组件库的 API 设计原则是什么？你怎么平衡易用性和灵活性？**

> **答：** 我遵循的原则叫**"渐进式复杂度"**：
>
> ```
> 层次1：开箱即用（覆盖 80% 场景）
> ─────────────────────────────
> <ProTable :columns="columns" :request="fetchData" />
> → 传入 columns 和数据源就能用，自带分页/排序/筛选
>
> 层次2：配置化定制（覆盖 15% 场景）
> ─────────────────────────────
> <ProTable
>   :columns="columns"
>   :request="fetchData"
>   :toolbar="{ export: true, columnSetting: true }"
>   :pagination="{ pageSize: 50 }"
> />
> → 通过 props 配置高级功能
>
> 层次3：插槽/renderProps 完全自定义（覆盖 5% 场景）
> ─────────────────────────────
> <ProTable>
>   <template #cell-name="{ row }">
>     <CustomNameCell :data="row" />
>   </template>
>   <template #toolbar-extra>
>     <MyCustomButton />
>   </template>
> </ProTable>
> → 保留逃生舱口，任何位置都能自定义渲染
> ```
>
> **核心原则：简单场景不啰嗦，复杂场景不受限。**

---

**Q37：微前端和 iframe 有什么区别？你们为什么选 qiankun 而不是 iframe？**

> **答：**
>
> | 对比     | iframe                        | qiankun 微前端         |
> | -------- | ----------------------------- | ---------------------- |
> | 隔离性   | 天然完美隔离                  | 需要 JS/CSS 沙箱方案   |
> | 通信     | `postMessage`（繁琐）         | props + 事件（更直接） |
> | 路由同步 | 主子路由难以联动              | 共享路由历史           |
> | SEO      | 完全不可爬                    | 可做 SSR               |
> | 性能     | 每个 iframe 独立的渲染进程    | 共享同一个渲染进程     |
> | 用户体验 | 弹窗无法溢出 iframe、滚动穿透 | 和单页应用体验一致     |
> | 白屏加载 | 整页重新加载                  | 增量加载、可预加载     |
>
> **选 qiankun 的原因：**
>
> - 医疗系统对**交互体验**要求高：弹窗需要全屏居中、拖拽需要跨区域、键盘快捷键需要全局监听——iframe 全部做不到
> - 需要多个子系统**共享患者上下文**——iframe 间通信太重
> - 需要统一的路由管理——医生快速在子系统间切换

---

## 十、业务场景与软技能方向（3 题）

---

**Q38：医疗系统对数据安全要求极高，你在前端做了哪些安全措施？**

> **答：** 分四个层面：
>
> | 层面         | 措施                                                                                   |
> | ------------ | -------------------------------------------------------------------------------------- |
> | **传输安全** | 全站 HTTPS + WebSocket WSS + 敏感接口加签（HMAC）                                      |
> | **存储安全** | 患者信息不存 localStorage（只存脱敏后的索引）；IndexedDB 中的缓存数据 24h 过期自动清除 |
> | **操作安全** | 处方开具/病历签名需二次验证（指纹/PIN码）；关键操作全程审计日志                        |
> | **展示安全** | 患者姓名/身份证/手机号默认脱敏展示（李\*\*、130\*\*\*\*8888）；截屏时敏感区域加水印    |
> | **权限控制** | 按钮级别的 RBAC 权限；科室隔离（内科医生看不到外科的患者）                             |
>
> **前端水印实现：**
>
> ```typescript
> // Canvas 生成水印 → 转为 base64 → 作为 background-image 平铺
> // 用 MutationObserver 监听 DOM 变化，防止通过 DevTools 删除水印节点
> ```

---

**Q39：你们团队几个人？你怎么推动组件库在团队中被采纳的？**

> **答：** 前端团队 8 人，组件库核心开发 2 人（我主导 + 1 人配合）。
>
> **推动采纳的策略（不是写完就完了）：**
>
> 1. **降低接入成本**：
>    - 提供 `npx create-pro-page` 脚手架一键生成页面模板
>    - Storybook 文档中每个组件都有「复制代码」按钮
> 2. **建立信任**：
>    - 每周 demo 会议展示组件能力
>    - 先在非核心业务试点，证明稳定后再推广到核心系统
> 3. **减少阻力**：
>    - 兼容老代码：ProTable 支持传入 Element Plus 的 Table 原生 props（透传）
>    - 提供迁移指南：从旧的 `<el-table>` 迁移到 `<pro-table>` 的 codemod 脚本
> 4. **持续维护**：
>    - GitHub Issues 48h 内响应
>    - 每两周一个 patch 版本修复 bug
>    - 建立企微群即时答疑

---

**Q40：如果让你重新做这个项目，你会做出哪些不同的技术决策？**

> **答：** 会有三个大的改变：
>
> 1. **构建工具直接选 Rsbuild 而非 Vite Library Mode**
>    - Vite 的 Library Mode 对多入口、CSS 拆分的支持不够完善，中途踩了很多坑
>    - Rsbuild 对组件库场景有更成熟的方案
> 2. **类型系统从第一天就用 `vue-tsc --declaration` 而非后期补**
>    - 早期为了快速迭代没有严格出类型声明，后面补的时候很多泛型要重构
>    - 教训：类型是 API 的一部分，应该和代码同步设计
> 3. **formStore 直接基于有向无环图（DAG）库设计**
>    - 当前自己实现的拓扑排序 + 联动引擎，随着联动类型增加越来越复杂
>    - 如果用现成的 DAG 调度库（如 `graphlib`），代码更清晰、边界处理更完善
> 4. **尽早引入 E2E 测试（Playwright）**
>    - 单元测试覆盖不了组件的交互流程（如虚拟滚动 + 键盘导航的组合场景）
>    - Playwright 的组件测试模式（`@playwright/experimental-ct-vue`）更适合这种场景

---

## 十一、JavaScript 核心原理

---

**Q41：说说事件循环（Event Loop）的完整流程？宏任务和微任务你能列举哪些？**

> **答：**
>
> ```
> 完整流程：
> ┌─────────────────────────────────────────────────────────┐
> │ 1. 执行全部同步代码（调用栈）                             │
> │ 2. 调用栈空 → 清空微任务队列（全部执行完）               │
> │    → 微任务中产生新微任务 → 继续清空                      │
> │ 3. 执行一个宏任务                                        │
> │ 4. 回到第 2 步                                           │
> └─────────────────────────────────────────────────────────┘
> ```
>
> | 类型       | 常见 API                                                                                                   |
> | ---------- | ---------------------------------------------------------------------------------------------------------- |
> | **微任务** | `Promise.then/catch/finally`、`queueMicrotask`、`MutationObserver`、`process.nextTick`（Node，优先级更高） |
> | **宏任务** | `setTimeout`、`setInterval`、`setImmediate`（Node）、`requestAnimationFrame`、I/O 回调、`MessageChannel`   |
>
> **项目关联：** 我在 formStore 中利用微任务的批量特性——同一个 tick 内多个字段变更，只在微任务阶段统一触发一次重新计算，避免多次重渲染（类似 Vue 的 nextTick 原理）。

---

**Q42：闭包是什么？你在项目中哪里利用了闭包？有没有遇到闭包陷阱？**

> **答：**
>
> **闭包本质：** 函数 + 它所能访问的词法作用域（即使外层函数已执行完毕）。
>
> **项目中的应用：**
>
> ```typescript
> // 1. useRemoteSearch 中的防抖 - 利用闭包保存 timer
> function useRemoteSearch() {
>   let timer: ReturnType<typeof setTimeout> // 闭包变量
>   return function debounced(keyword: string) {
>     clearTimeout(timer)
>     timer = setTimeout(() => fetchData(keyword), 300)
>   }
> }
>
> // 2. pLimit 调度器 - queue 和 running 都是闭包变量
> function pLimit(concurrency: number) {
>   let running = 0 // 闭包
>   const queue = [] // 闭包
>   // ...
> }
> ```
>
> **遇到的闭包陷阱（经典 for 循环问题）：**
>
> ```typescript
> // ❌ 错误：每个 handler 闭包捕获的 i 都是同一个引用
> for (var i = 0; i < buttons.length; i++) {
>   buttons[i].onclick = () => console.log(i); // 全部输出最终值
> }
>
> // ✅ 解决方案1：let 块级作用域
> for (let i = 0; i < buttons.length; i++) { ... }
>
> // ✅ 解决方案2：IIFE 创建新作用域
> for (var i = 0; i < buttons.length; i++) {
>   ((j) => { buttons[j].onclick = () => console.log(j); })(i);
> }
> ```
>
> **虚拟滚动中的陷阱：** scroll 事件回调闭包中引用了 `options.value`，但 `options` 在异步更新后引用已变 → 改为用 `ref` 包裹，闭包里通过 `.value` 访问最新值。

---

**Q43：原型链的查找机制是什么？`prototype` 和 `__proto__` 的区别？**

> **答：**
>
> ```
> 查找链路（以 new Dog() 为例）：
>
> dog 实例
>   └── __proto__ → Dog.prototype
>                     └── __proto__ → Animal.prototype
>                                       └── __proto__ → Object.prototype
>                                                         └── __proto__ → null
>
> 访问 dog.eat() 时：自下而上查找，找到就停，找不到返回 undefined
> ```
>
> |        | `prototype`                             | `__proto__`                          |
> | ------ | --------------------------------------- | ------------------------------------ |
> | 存在于 | 函数对象上                              | 所有对象上                           |
> | 作用   | 定义实例的原型                          | 指向创建该对象的构造函数的 prototype |
> | 关系   | `Dog.prototype === new Dog().__proto__` | ✓                                    |
>
> **在组件库中的体现：** 我用 `class ReconnectableWS extends EventEmitter` 实现 WebSocket 管理，本质就是原型链继承——实例访问 `on`、`emit` 方法沿原型链找到 `EventEmitter.prototype` 上的实现。

---

**Q44：`this` 的指向规则有哪些？箭头函数的 this 为什么不同？**

> **答：**
>
> | 调用方式            | this 指向                                 |
> | ------------------- | ----------------------------------------- |
> | 普通函数调用 `fn()` | `undefined`（严格模式）/ `window`         |
> | 方法调用 `obj.fn()` | `obj`                                     |
> | `new` 调用          | 新创建的实例                              |
> | `call/apply/bind`   | 指定的第一个参数                          |
> | 箭头函数            | **词法作用域的 this**（定义时所在上下文） |
>
> ```typescript
> // 项目中的实际场景
> class FormStore {
>   private fields = reactive({});
>
>   // ❌ 普通方法作为回调传入时 this 丢失
>   watch(someRef, this.handleChange); // this 在回调执行时是 undefined
>
>   // ✅ 解决方案1：箭头函数 - this 绑定到类实例
>   handleChange = () => { this.fields... };
>
>   // ✅ 解决方案2：bind
>   watch(someRef, this.handleChange.bind(this));
> }
> ```
>
> **qiankun 沙箱中的 this：** Proxy 拦截了对 `window` 的访问，某些第三方库通过 `this.globalVar` 访问全局变量时可能拿到 fakeWindow 而非真实 window → 需要特殊处理。

---

**Q45：JS 的垃圾回收机制是什么？什么是内存泄漏？你如何在项目中排查？**

> **答：**
>
> **主要回收算法：**
>
> | 算法      | 原理                                 | 现代 V8 |
> | --------- | ------------------------------------ | ------- |
> | 引用计数  | 引用数为 0 就回收（循环引用有 bug）  | 已废弃  |
> | 标记-清除 | 从根对象出发标记可达对象，清除不可达 | 主算法  |
> | 分代回收  | 新生代（频繁小 GC）+ 老生代（大 GC） | V8 优化 |
>
> **项目中遇到的内存泄漏类型：**
>
> ```typescript
> // 1. 全局变量意外挂载
> window.patientCache = [
>   /* 大量数据 */
> ] // 不会被 GC
>
> // 2. 闭包持有大对象引用
> const heavyData = fetchAllPatients()
> setInterval(() => {
>   console.log(heavyData.length) // heavyData 无法被回收
> }, 1000)
>
> // 3. DOM 引用未清除
> const el = document.getElementById('chart')
> el.remove() // DOM 从树上摘除
> // 但 el 这个 JS 引用还在，GC 无法回收对应的 DOM 节点
>
> // ✅ 改用 WeakRef 持有 DOM 引用
> const elRef = new WeakRef(document.getElementById('chart'))
> ```
>
> **排查工具：** Chrome DevTools → Memory → Heap Snapshot → 对比前后两次快照的对象增量 → 找到 `Detached DOM nodes`（已摘除但未被回收的 DOM）。

---

**Q46：`Promise.all`、`Promise.race`、`Promise.allSettled`、`Promise.any` 的区别？**

> **答：**
>
> | 方法                 | 行为                                         | 适用场景                                   |
> | -------------------- | -------------------------------------------- | ------------------------------------------ |
> | `Promise.all`        | 全部成功才 resolve，有一个 reject 就 reject  | 并行请求，全部成功才处理                   |
> | `Promise.race`       | 第一个完成（无论成功失败）就结束             | 超时控制：`Promise.race([fetch, timeout])` |
> | `Promise.allSettled` | 全部完成（不管成功失败），返回每个结果的状态 | 批量操作，需要知道每个的结果               |
> | `Promise.any`        | 第一个成功就 resolve，全部失败才 reject      | 多源容灾：优先用最快的数据源               |
>
> **项目中的实际应用：**
>
> ```typescript
> // 医疗平台：接诊页并行加载三个接口，全部完成才渲染
> const [patient, orders, history] = await Promise.all([
>   fetchPatientInfo(id),
>   fetchMedicalOrders(id),
>   fetchHistoryRecords(id),
> ])
>
> // 请求超时控制
> const withTimeout = (promise: Promise<any>, ms: number) =>
>   Promise.race([
>     promise,
>     new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
>   ])
>
> // 批量处方状态更新，不能因为一个失败就全部失败
> const results = await Promise.allSettled(prescriptions.map(p => updatePrescriptionStatus(p.id)))
> results.forEach(r => {
>   if (r.status === 'rejected') showError(r.reason)
> })
> ```

---

## 十二、浏览器渲染原理

---

**Q47：浏览器从输入 URL 到页面渲染完成，发生了什么？**

> **答：**
>
> ```
> 1. DNS 解析
>    → 浏览器缓存 → 系统 hosts → DNS 服务器递归查询
>
> 2. TCP 三次握手 + TLS 握手（HTTPS）
>    → 建立安全连接
>
> 3. 发送 HTTP 请求 → 服务器返回 HTML
>
> 4. 解析 HTML → 构建 DOM 树
>    → 遇到 CSS → 下载并构建 CSSOM 树（阻塞渲染！）
>    → 遇到 JS → 下载并执行（阻塞 DOM 解析！）
>    → async/defer 可异步加载
>
> 5. DOM + CSSOM → Render Tree（只含可见节点）
>
> 6. Layout（回流）→ 计算每个节点的几何信息（位置、大小）
>
> 7. Paint（重绘）→ 填充像素（颜色、背景、阴影）
>
> 8. Composite（合成）→ 把图层合并输出到屏幕
> ```
>
> **项目关联：** 医疗平台首屏优化：
>
> - CSS 内联关键路径样式（Critical CSS）→ 减少阻塞
> - 非关键 JS 加 `defer`
> - 图片加 `loading="lazy"`
> - 骨架屏在 Render Tree 阶段就有内容展示

---

**Q48：什么是回流（Reflow）和重绘（Repaint）？如何避免？**

> **答：**
>
> | 操作       | 触发条件                                        | 性能代价                                  |
> | ---------- | ----------------------------------------------- | ----------------------------------------- |
> | **回流**   | 改变几何属性（width/height/position/font-size） | 最贵，触发重新 Layout → Paint → Composite |
> | **重绘**   | 改变外观属性（color/background/visibility）     | 中等，跳过 Layout                         |
> | **只合成** | transform/opacity                               | 最便宜，只在 GPU 层操作                   |
>
> **避免回流的技巧：**
>
> ```typescript
> // ❌ 在循环中多次读写 DOM（强制同步回流）
> for (let i = 0; i < 1000; i++) {
>   el.style.width = el.offsetWidth + 1 + 'px' // 读写交替！
> }
>
> // ✅ 批量读，批量写
> const width = el.offsetWidth
> for (let i = 0; i < 1000; i++) {
>   el.style.width = width + i + 'px'
> }
>
> // ✅ 用 transform 代替改变 position
> // ❌ top/left 触发回流
> el.style.top = y + 'px'
> // ✅ transform 只触发合成
> el.style.transform = `translateY(${y}px)`
> ```
>
> **虚拟滚动中的优化：** 用 `transform: translateY(offset)` 代替 `padding-top` 移动滚动容器，避免触发回流。

---

**Q49：`requestAnimationFrame` 和 `setTimeout` 有什么区别？什么时候用 rAF？**

> **答：**
>
> | 对比     | setTimeout                 | rAF                            |
> | -------- | -------------------------- | ------------------------------ |
> | 执行时机 | 下一个宏任务队列           | 下一帧渲染前                   |
> | 频率     | 不精确（受主线程阻塞影响） | 与屏幕刷新率同步（通常 60fps） |
> | 后台 Tab | 正常执行（耗电）           | 自动暂停（省电）               |
> | 适用     | 普通延时                   | 动画、帧同步操作               |
>
> **项目应用：**
>
> ```typescript
> // 虚拟滚动的 scroll 事件处理
> let rafId: number
> container.addEventListener('scroll', () => {
>   cancelAnimationFrame(rafId)
>   rafId = requestAnimationFrame(() => {
>     // 每帧最多执行一次，与屏幕刷新同步
>     updateVisibleRange()
>   })
> })
> ```
>
> 比 `throttle(fn, 16)` 更精确，因为 rAF 的执行时机是由浏览器渲染管线决定的，不是定时器模拟的。

---

**Q50：什么是浏览器的合成层（Composite Layer）？如何利用它做性能优化？**

> **答：**
>
> **合成层触发条件：**
>
> - `transform: translateZ(0)` 或 `will-change: transform`（显式提升）
> - `opacity < 1` + 动画
> - `position: fixed`
> - `<video>`、`<canvas>`、`<iframe>`
>
> **为什么快？** 合成层在 GPU 独立绘制，不影响主线程，动画只需要 Composite 阶段，跳过 Layout 和 Paint。
>
> **项目中的应用：**
>
> ```css
> /* 虚拟滚动容器 - 提升为合成层，避免滚动时影响其他元素 */
> .virtual-scroll-container {
>   will-change: transform;
>   transform: translateZ(0);
> }
>
> /* 危急值弹窗动画 */
> .alert-modal-enter {
>   animation: slideIn 0.3s ease;
>   /* 确保动画在合成层上执行，不触发重绘 */
>   transform: translateY(0);
>   opacity: 1;
> }
> ```
>
> ⚠️ **注意：** 合成层过多会占用 GPU 内存，不能滥用 `will-change`。

---

## 十三、网络与 HTTP 方向

---

**Q51：HTTP/1.1、HTTP/2、HTTP/3 有什么区别？对前端性能影响是什么？**

> **答：**
>
> | 特性   | HTTP/1.1 | HTTP/2 | HTTP/3 |
> | ------ | -------- | ------ | ------ |
> | 传输层 | TCP      | TCP    | QUIC（ |

抱歉被截断了！从 Q51 继续：

---

**Q51：HTTP/1.1、HTTP/2、HTTP/3 有什么区别？对前端性能影响是什么？**

> **答：**
>
> | 特性       | HTTP/1.1        | HTTP/2               | HTTP/3           |
> | ---------- | --------------- | -------------------- | ---------------- |
> | 传输层     | TCP             | TCP                  | QUIC（基于 UDP） |
> | 多路复用   | ❌（队头阻塞）  | ✅（一个连接多个流） | ✅（流间不阻塞） |
> | 头部压缩   | ❌              | ✅ HPACK             | ✅ QPACK         |
> | 服务端推送 | ❌              | ✅                   | ✅               |
> | 连接建立   | 1-RTT + TLS握手 | 1-RTT + TLS          | 0-RTT 恢复连接   |
>
> **对前端的影响：**
>
> ```
> HTTP/1.1 时代的优化手段：
>   → 雪碧图（合并请求）
>   → 域名分片（突破 6 个连接限制）
>   → 资源合并打包（减少请求数）
>
> HTTP/2 时代这些都过时了：
>   → 多路复用：多个请求并行，不用合并
>   → 头部压缩：请求头从 ~800B 降到几十 B
>   → 可以适当拆包（反而有利于缓存命中）
> ```
>
> **项目关联：** 医疗平台的 WebSocket 用了 WSS（WebSocket over TLS），配合 HTTP/2 的服务端推送，实现了检验结果的低延迟通知。

---

**Q52：前端如何做接口请求的缓存和幂等处理？**

> **答：**
>
> **缓存策略（按场景分）：**
>
> ```typescript
> // 1. 内存缓存 - 适合同页面高频重复请求（如字典数据）
> const cache = new Map<string, { data: any; expireAt: number }>()
>
> async function cachedFetch(url: string, ttl = 60000) {
>   const hit = cache.get(url)
>   if (hit && hit.expireAt > Date.now()) return hit.data
>
>   const data = await fetch(url).then(r => r.json())
>   cache.set(url, { data, expireAt: Date.now() + ttl })
>   return data
> }
>
> // 2. IndexedDB 缓存 - 适合跨页面/跨会话（如药品字典）
> // 3. HTTP 缓存头 - 交给浏览器（Cache-Control、ETag）
> // 4. SWR 策略 - 先返回缓存，再异步更新（用于次要数据）
> ```
>
> **幂等处理（防止重复提交）：**
>
> ```typescript
> // 按钮 loading 锁（最常用）
> const submitting = ref(false)
> async function submitPrescription() {
>   if (submitting.value) return // 幂等锁
>   submitting.value = true
>   try {
>     await api.submit(form)
>   } finally {
>     submitting.value = false
>   }
> }
>
> // 请求级别去重（相同参数的请求只发一次）
> const pendingMap = new Map<string, Promise<any>>()
> function deduplicateFetch(key: string, fetcher: () => Promise<any>) {
>   if (pendingMap.has(key)) return pendingMap.get(key)!
>   const p = fetcher().finally(() => pendingMap.delete(key))
>   pendingMap.set(key, p)
>   return p
> }
> ```
>
> **医疗场景的特殊处理：** 处方提交加了幂等 Token（前端生成 UUID 放请求头），后端通过 Token 去重，即使网络重试也不会重复开药。

---

**Q53：CORS 跨域的原理是什么？你在项目中怎么处理的？**

> **答：**
>
> **CORS 完整流程：**
>
> ```
> 简单请求（GET/POST + 普通请求头）：
>   浏览器 → 带 Origin 请求头 → 服务器
>   服务器 → 带 Access-Control-Allow-Origin 响应头 → 浏览器
>   ✓ 直接通过
>
> 复杂请求（PUT/DELETE/自定义请求头）：
>   浏览器 → 预检请求（OPTIONS）→ 服务器
>   服务器 → 允许的方法/头信息 → 浏览器
>   浏览器 → 真实请求 → 服务器
>   （预检结果可缓存 Access-Control-Max-Age）
> ```
>
> **项目中的处理方案：**
>
> ```typescript
> // 开发环境：Vite 代理（最常用）
> // vite.config.ts
> server: {
>   proxy: {
>     '/api': {
>       target: 'http://hospital-backend:8080',
>       changeOrigin: true,
>       rewrite: path => path.replace(/^\/api/, '')
>     }
>   }
> }
>
> // 生产环境：Nginx 反向代理（同源）
> // location /api/ { proxy_pass http://backend:8080/; }
> ```
>
> ⚠️ **微前端场景的坑：** 子应用通过模块联邦加载主应用资源，如果域名不同同样有 CORS 问题 → 资源服务器统一配置 `Access-Control-Allow-Origin`。

---

## 十四、CSS 与布局方向

---

**Q54：BFC（块级格式化上下文）是什么？能解决哪些问题？**

> **答：**
>
> **BFC 的触发条件（满足一个即可）：**
>
> ```css
> overflow: hidden/auto/scroll;
> display: flex / inline-flex / grid;
> position: absolute / fixed;
> float: left / right;
> display: flow-root; /* 专门为触发 BFC 设计，无副作用 */
> ```
>
> **BFC 能解决的 3 个经典问题：**
>
> ```css
> /* 1. 父元素塌陷（子元素浮动后父元素高度为 0）*/
> .parent {
>   overflow: hidden;
> } /* 触发 BFC，包裹浮动子元素 */
>
> /* 2. 外边距合并（兄弟/父子元素 margin 合并）*/
> .wrapper {
>   display: flow-root;
> } /* BFC 内部不与外部合并 */
>
> /* 3. 防止文字环绕浮动元素 */
> .text-block {
>   overflow: hidden;
> } /* BFC 不与浮动元素重叠 */
> ```
>
> **项目关联：** 组件库的弹窗遮罩层用了 `position: fixed` 天然创建 BFC，保证弹窗内的浮动元素不影响外部布局。

---

**Q55：CSS `position` 各属性的区别？`sticky` 的原理和失效场景？**

> **答：**
>
> | 值         | 定位基准             | 脱离文档流 | 常用场景                 |
> | ---------- | -------------------- | ---------- | ------------------------ |
> | `static`   | 正常文档流           | 否         | 默认                     |
> | `relative` | 自身原始位置         | 否         | 微调位置、创建层叠上下文 |
> | `absolute` | 最近的非 static 祖先 | 是         | 弹窗、tooltip            |
> | `fixed`    | 视口                 | 是         | 导航栏、悬浮按钮         |
> | `sticky`   | 最近的可滚动祖先     | 否         | 表头吸顶                 |
>
> **sticky 失效的场景（高频考点）：**
>
> ```css
> /* 失效原因1：父元素高度等于子元素高度，没有滚动空间 */
> /* 失效原因2：父元素有 overflow: hidden/auto/scroll */
> .parent {
>   overflow: hidden;
> } /* sticky 子元素失效！ */
>
> /* 失效原因3：没设置 top/bottom/left/right 阈值 */
> .header {
>   position: sticky;
> } /* 必须加 top: 0 才生效 */
> ```
>
> **项目关联：** ProTable 的列头吸顶就用了 `position: sticky; top: 0`，但被父级 `overflow: auto` 破坏了 → 改为监听 scroll 事件，用 JS 动态添加 `box-shadow` 模拟吸顶效果。

---

**Q56：Flex 布局和 Grid 布局分别适合什么场景？你在 ProForm 的响应式布局中怎么做的？**

> **答：**
>
> | 对比     | Flexbox                         | Grid                   |
> | -------- | ------------------------------- | ---------------------- |
> | 维度     | 一维（行或列）                  | 二维（行和列同时）     |
> | 适合     | 导航栏、卡片排列、水平/垂直居中 | 整体页面布局、表单栅格 |
> | 子项排列 | 由内容决定                      | 由容器的轨道决定       |
>
> **ProForm 的响应式 Grid 布局实现：**
>
> ```typescript
> // 字段配置
> const schema = [
>   { field: 'name', label: '姓名', span: 8 }, // 占 8/24
>   { field: 'age', label: '年龄', span: 8 },
>   { field: 'dept', label: '科室', span: 24 }, // 独占一行
> ]
>
> // 动态生成 Grid 样式
> const gridStyle = computed(() => ({
>   display: 'grid',
>   gridTemplateColumns: `repeat(${props.columns ?? 3}, 1fr)`,
>   gap: '16px 24px',
> }))
>
> // 响应式断点（用 ResizeObserver 监听容器宽度）
> const columns = computed(() => {
>   if (containerWidth.value < 576) return 1
>   if (containerWidth.value < 992) return 2
>   return 3
> })
> ```
>
> 为什么用容器宽度而不是窗口宽度？→ 表单可能嵌套在侧边栏里，窗口断点不准确。

---

## 十五、安全方向

---

**Q57：XSS 和 CSRF 的原理是什么？你的项目做了哪些防御？**

> **答：**
>
> **XSS（跨站脚本攻击）：**
>
> ```
> 攻击者注入恶意脚本 → 受害者浏览器执行 → 窃取 Cookie/Token
>
> 三种类型：
> • 存储型：恶意脚本存入数据库（评论区注入 <script>）→ 危害最大
> • 反射型：恶意脚本在 URL 参数中（点击钓鱼链接）
> • DOM型：前端 JS 直接把不可信数据插入 DOM
> ```
>
> **CSRF（跨站请求伪造）：**
>
> ```
> 用户登录 A 网站 → 访问恶意网站 B →
> B 自动发请求到 A（带上了用户的 Cookie）→
> A 误以为是用户本人操作
> ```
>
> **项目中的防御措施：**
>
> | 攻击类型 | 防御手段                                                                                                                  |
> | -------- | ------------------------------------------------------------------------------------------------------------------------- |
> | XSS      | Vue 模板默认转义（`{{ }}` 自动 HTML 转义）；富文本用 `DOMPurify` 白名单过滤；`Content-Security-Policy` 响应头禁止内联脚本 |
> | CSRF     | Token 放在请求头（`X-CSRF-Token`）而非 Cookie；`SameSite=Strict` Cookie 属性；后端校验 Referer                            |
>
> **医疗系统的额外措施：** 所有敏感操作（处方提交、病历签名）使用独立的短期 Token（5 分钟有效），即使 Token 被盗也窗口极小。

---

**Q58：前端如何防止接口数据被抓包篡改？**

> **答：** 分三层防御：
>
> ```typescript
> // 1. 传输层：HTTPS（防止中间人窃听）
> //    + 证书固定（App 场景）防止自签名证书代理
>
> // 2. 请求签名（防篡改）
> function signRequest(params: object, secret: string): string {
>   const sorted = Object.keys(params)
>     .sort()
>     .map(k => `${k}=${params[k]}`)
>     .join('&')
>   return HMAC_SHA256(sorted + timestamp + nonce, secret)
> }
> // 请求头携带 signature + timestamp + nonce
> // 后端验证签名是否匹配 + timestamp 是否在 5 分钟内（防重放）
>
> // 3. 响应校验（防止响应被篡改）
> // 后端返回数据时附带 hash，前端验证
> const { data, checksum } = response
> if (SHA256(JSON.stringify(data)) !== checksum) {
>   throw new Error('数据完整性校验失败')
> }
> ```
>
> **医疗场景补充：** 处方数据在前端做了完整性校验 + 医生电子签名（非对称加密），即使数据被篡改，后端的签名验证也会拒绝。

---

## 十六、综合与算法思维方向

---

**Q59：手写一个 `deepClone`，要处理哪些边界情况？**

> **答：**
>
> ```typescript
> function deepClone<T>(target: T, map = new WeakMap()): T {
>   // 1. 原始类型直接返回
>   if (target === null || typeof target !== 'object') return target
>
>   // 2. 处理循环引用
>   if (map.has(target as object)) return map.get(target as object)
>
>   // 3. 特殊对象类型
>   if (target instanceof Date) return new Date(target.getTime()) as any
>   if (target instanceof RegExp) return new RegExp(target) as any
>   if (target instanceof Map) {
>     const newMap = new Map()
>     map.set(target, newMap)
>     target.forEach((v, k) => newMap.set(deepClone(k, map), deepClone(v, map)))
>     return newMap as any
>   }
>   if (target instanceof Set) {
>     const newSet = new Set()
>     map.set(target, newSet)
>     target.forEach(v => newSet.add(deepClone(v, map)))
>     return newSet as any
>   }
>
>   // 4. 数组和普通对象
>   const cloned = Array.isArray(target) ? [] : Object.create(Object.getPrototypeOf(target))
>   map.set(target as object, cloned)
>
>   // 5. 拷贝 Symbol 键
>   ;[...Object.keys(target), ...Object.getOwnPropertySymbols(target)].forEach(key => {
>     cloned[key as any] = deepClone((target as any)[key], map)
>   })
>
>   return cloned
> }
> ```
>
> **需要处理的边界：** 循环引用、Date、RegExp、Map、Set、Symbol 键、原型链保持

---

**Q60：如何实现一个支持过期时间的 localStorage？**

> **答：**
>
> ```typescript
> interface StorageItem<T> {
>   value: T
>   expireAt: number | null // null 表示永不过期
> }
>
> const storage = {
>   set<T>(key: string, value: T, ttl?: number): void {
>     const item: StorageItem<T> = {
>       value,
>       expireAt: ttl ? Date.now() + ttl : null,
>     }
>     localStorage.setItem(key, JSON.stringify(item))
>   },
>
>   get<T>(key: string): T | null {
>     const raw = localStorage.getItem(key)
>     if (!raw) return null
>
>     const item: StorageItem<T> = JSON.parse(raw)
>
>     // 检查是否过期
>     if (item.expireAt && item.expireAt < Date.now()) {
>       localStorage.removeItem(key) // 惰性删除
>       return null
>     }
>
>     return item.value
>   },
>
>   remove(key: string): void {
>     localStorage.removeItem(key)
>   },
> }
>
> // 使用示例
> storage.set('patientToken', 'xxx', 30 * 60 * 1000) // 30分钟过期
> storage.get<string>('patientToken') // 过期返回 null
> ```
>
> **项目关联：** 医疗平台用这个方案缓存药品字典数据（24 小时过期），比每次进页面重新请求快很多。

---

---

## 十七、JavaScript 诡异行为与陷阱

---

**Q61：下面这段代码输出什么？为什么？**

```javascript
async function async1() {
  console.log('A')
  await async2()
  console.log('B')
}
async function async2() {
  console.log('C')
}
console.log('D')
async1()
new Promise(resolve => {
  console.log('E')
  resolve()
}).then(() => console.log('F'))
console.log('G')
```

> **答：D → A → C → E → G → B → F**
>
> **逐步解析（这是面试最爱考的类型）：**
>
> ```
> 1. 同步：console.log('D')                  → D
> 2. 调用 async1()，同步执行到 await 前
>    console.log('A')                         → A
>    执行 async2()，同步：console.log('C')    → C
>    await async2() 等价于 Promise.resolve(undefined).then(...)
>    → 把 "B" 的后续代码放入微任务队列
> 3. 回到主线程，new Promise 同步执行
>    console.log('E')                         → E
>    resolve() → 把 .then('F') 放入微任务队列
> 4. console.log('G')                         → G
> 5. 同步代码执行完毕，清空微任务队列：
>    先执行 await 后的回调：console.log('B') → B
>    再执行 .then 回调：console.log('F')      → F
> ```
>
> **陷阱：** 很多人以为 `B` 和 `F` 的顺序相反。关键在于 `await async2()` 先于 `resolve()` 进入微任务队列。

---

**Q62：`[] == ![]` 的结果是什么？请完整推导过程。**

> **答：`true`**
>
> ```
> 推导过程（== 的类型转换规则）：
>
> 1. ![] → false（[] 是真值，取反为 false）
>    所以变成 [] == false
>
> 2. 有布尔值时，先把布尔值转数字：
>    false → 0
>    变成 [] == 0
>
> 3. 有对象时，对象转原始值（ToPrimitive）：
>    [].toString() → ''（空数组转字符串为空字符串）
>    变成 '' == 0
>
> 4. 字符串转数字：
>    '' → 0
>    变成 0 == 0 → true ✓
> ```
>
> **追问：`{} == !{}` 呢？**
>
> ```
> !{} → false → {} == false
> {} 的 ToPrimitive → '[object Object]' == 0
> '[object Object]' → NaN
> NaN == 0 → false
> ```
>
> **这类题的考察重点：** 隐式类型转换规则 → `==` 的 Abstract Equality Comparison 算法

---

**Q63：如何让 `(a == 1 && a == 2 && a == 3)` 为 true？**

> **答：** 利用 `==` 触发 `valueOf` 或 `Symbol.toPrimitive`：
>
> ```javascript
> // 方案1：重写 valueOf
> const a = {
>   _val: 0,
>   valueOf() {
>     return ++this._val
>   },
> }
> console.log(a == 1 && a == 2 && a == 3) // true
>
> // 方案2：Symbol.toPrimitive
> const a = {
>   _val: 0,
>   [Symbol.toPrimitive]() {
>     return ++this._val
>   },
> }
>
> // 方案3：Object.defineProperty 劫持 window 属性（全局环境）
> let _val = 0
> Object.defineProperty(window, 'a', {
>   get() {
>     return ++_val
>   },
> })
>
> // 方案4：Proxy
> const a = new Proxy(
>   { val: 0 },
>   {
>     get(target, key) {
>       if (key === Symbol.toPrimitive) return () => ++target.val
>     },
>   }
> )
> ```
>
> **真实价值：** 这道题考察的是 JS 的对象转原始值机制、`valueOf/toString` 调用顺序、Proxy 拦截能力——在组件库的插槽渲染函数设计中，`Symbol.toPrimitive` 可以用来实现组件的隐式转换。

---

**Q64：WeakMap 和 Map 的本质区别是什么？什么场景必须用 WeakMap？**

> **答：**
>
> | 对比     | Map                    | WeakMap                         |
> | -------- | ---------------------- | ------------------------------- |
> | Key 类型 | 任意                   | 只能是对象（或 Symbol）         |
> | GC 影响  | 强引用，key 不会被 GC  | 弱引用，key 无其他引用时自动 GC |
> | 可遍历   | ✅ `.keys()/.values()` | ❌ 不可遍历                     |
> | 大小获取 | `.size`                | ❌ 无 `.size`                   |
>
> **必须用 WeakMap 的场景：**
>
> ```typescript
> // 1. deepClone 中的循环引用检测（前面 Q59 用的就是这个）
> const visited = new WeakMap(); // 用 Map 会导致 clone 完后对象无法被 GC
>
> // 2. 为 DOM 元素附加私有数据（不影响 GC）
> const elementMeta = new WeakMap<Element, { observer: ResizeObserver }>();
> function attachObserver(el: Element) {
>   const observer = new ResizeObserver(...);
>   elementMeta.set(el, { observer });
>   // el 被移除后，elementMeta 中对应的条目自动清除，observer 也被 GC
> }
>
> // 3. Vue 3 响应式系统内部
> // targetMap: WeakMap<object, Map<key, Set<effect>>>
> // target 对象被 GC 后，对应的 effect 依赖自动清理
> ```
>
> **项目应用：** 虚拟滚动中用 WeakMap 缓存 DOM 节点的行高测量结果，节点被销毁后自动释放缓存，不用手动清理。

---

**Q65：`var`、`let`、`const` 的区别，以及为什么 `typeof undeclaredVar` 不报错？**

> **答：**
>
> | 特性     | var                         | let                          | const                      |
> | -------- | --------------------------- | ---------------------------- | -------------------------- |
> | 作用域   | 函数级                      | 块级                         | 块级                       |
> | 变量提升 | ✅ 提升且初始化为 undefined | ✅ 提升但**不初始化**（TDZ） | 同 let                     |
> | 重复声明 | ✅                          | ❌                           | ❌                         |
> | 全局挂载 | ✅ window.x                 | ❌                           | ❌                         |
> | 修改     | ✅                          | ✅                           | ❌（引用不可变，内容可变） |
>
> **TDZ（暂时性死区）：**
>
> ```javascript
> console.log(x) // ReferenceError（TDZ 中访问）
> let x = 1
> ```
>
> **`typeof undeclaredVar` 不报错的原因：**
>
> - `typeof` 是唯一对 TDZ 之外的未声明变量不抛错的操作符
> - 历史遗留设计，用于安全检测环境能力（如 `typeof window !== 'undefined'`）
> - 但对 TDZ 中的变量 `typeof` **会报错**！
>
> ```javascript
> typeof undeclaredVar // 'undefined' ← 不报错
> typeof x // ReferenceError ← let x = 1 在下面，TDZ 中
> let x = 1
> ```

---

**Q66：以下代码有什么问题？如何修复？**

```typescript
const obj = { count: 0 }
const { count } = obj
count++ // 能修改 obj.count 吗？

const arr = [1, 2, 3]
const [first, ...rest] = arr
rest.push(4) // 会影响 arr 吗？
```

> **答：**
>
> **第一段：`count++` 不能修改 `obj.count`**
>
> ```typescript
> // 解构赋值是「值拷贝」，不是引用
> const { count } = obj
> // 等价于 const count = obj.count; → count 是独立的变量
> count++ // 只改了局部变量
> console.log(obj.count) // 还是 0
>
> // 修复方案：直接操作
> obj.count++
> ```
>
> **第二段：`rest.push(4)` 不影响 `arr`**
>
> ```typescript
> // rest 是新数组（浅拷贝），和 arr 是不同的数组实例
> // 但如果数组元素是对象，则是同一个引用！
> const arr = [{ id: 1 }]
> const [first] = arr
> first.id = 99 // 这会影响 arr[0].id！（浅拷贝的坑）
> ```
>
> **项目关联：** formStore 中表单字段的默认值用的是 `JSON.parse(JSON.stringify(defaultValues))` 深拷贝，防止联动重置时把默认值对象也改了。

---

## 十八、Vue 3 / 框架原理刁钻题

---

**Q67：Vue 3 的 `ref` 和 `reactive` 底层实现有什么不同？为什么 `reactive` 不能用原始类型？**

> **答：**
>
> ```typescript
> // ref 的简化实现
> function ref(value) {
>   return {
>     get value() {
>       track()
>       return value
>     }, // 手动追踪
>     set value(newVal) {
>       value = newVal
>       trigger()
>     },
>   }
>   // 本质：用对象包裹原始值，通过 getter/setter 实现响应式
> }
>
> // reactive 的简化实现
> function reactive(target) {
>   return new Proxy(target, {
>     // 直接代理对象
>     get(t, key) {
>       track(t, key)
>       return Reflect.get(t, key)
>     },
>     set(t, key, val) {
>       Reflect.set(t, key, val)
>       trigger(t, key)
>       return true
>     },
>   })
> }
> ```
>
> **为什么 `reactive` 不能用原始类型？**
>
> - `Proxy` 只能代理对象（`typeof target === 'object'`）
> - `new Proxy(1, handler)` 直接报错
> - 所以 `ref` 内部对对象类型也会调用 `reactive` 做嵌套响应式
>
> **刁钻追问：`ref.value` 是对象时，修改内部属性会触发响应式吗？**
>
> ```typescript
> const r = ref({ count: 0 })
> r.value.count++ // ✅ 会触发！
> // 因为 ref 内部对对象值调用了 reactive()
> // r.value 返回的是 reactive 包裹后的对象
> ```

---

**Q68：Vue 3 中，`watch` 监听一个 reactive 对象的某个属性，为什么必须用函数形式？**

```typescript
const state = reactive({ count: 0, name: 'Alice' })

// 哪种写法正确？
watch(state.count, val => {}) // 写法A
watch(
  () => state.count,
  val => {}
) // 写法B
```

> **答：** **写法B 正确**，写法A 无效。
>
> **原因：**
>
> ```typescript
> // 写法A 发生的事：
> const temp = state.count // 求值，得到 0（原始值）
> watch(0, handler) // 监听一个数字 0，无意义！
>
> // 写法B 发生的事：
> watch(() => state.count, handler)
> // 传入的是「函数」，Vue 会在每次依赖变化时重新执行该函数
> // 函数执行时访问 state.count 触发 track，建立依赖关系
> ```
>
> **对比：**
>
> ```typescript
> const state = reactive({ count: 0 })
>
> // ✅ 监听整个 reactive 对象（自动深层监听）
> watch(state, handler)
>
> // ✅ 监听某个属性（必须用 getter 函数）
> watch(() => state.count, handler)
>
> // ✅ ref 可以直接传（因为 ref 本身就是响应式对象）
> const count = ref(0)
> watch(count, handler)
> ```

---

**Q69：Vue 3 的 `v-for` 为什么必须加 `key`？不加 `key` 和加错 `key` 分别会出什么问题？**

> **答：**
>
> **不加 key（默认就地复用）：**
>
> ```
> 旧: [A, B, C, D]
> 新: [X, A, B, C, D]（头部插入 X）
>
> Vue 默认策略：逐位对比
> → 位置0: A 更新为 X（只改内容）
> → 位置1: B 更新为 A
> → 位置2: C 更新为 B
> → 位置3: D 更新为 C
> → 位置4: 新增 D
>
> 结果：4次更新 + 1次新增（低效！）
> 如果有输入框等有状态的 DOM，内容会错位！
> ```
>
> **加正确 key：**
>
> ```
> Vue 通过 key 识别节点身份：
> → 识别出 X 是新节点，A/B/C/D 只是移动
> → 只做1次插入，4个节点不用重新渲染
> ```
>
> **加错 key（用 index）的陷阱：**
>
> ```typescript
> // ❌ 用 index 作为 key
> <div v-for="(item, index) in list" :key="index">
>   <input v-model="item.value" />
> </div>
>
> // 头部删除 list[0] 后：
> // 原 index 0,1,2 → 新 index 0,1
> // Vue 认为 key=0 和 key=1 的节点"没变"，只删掉了 key=2
> // 但输入框的 DOM 没有跟着数据移动！
> // 原来 index=1 的输入框内容显示在了 index=0 的数据下面 → 数据与 UI 错位
> ```
>
> **正确做法：** 用数据的唯一 ID 作为 key（如 `patient.id`、`drug.code`）

---

**Q70：Vue 3 的 `nextTick` 实现原理是什么？和 `queueMicrotask` 有什么关系？**

> **答：**
>
> ```typescript
> // Vue 3 的 nextTick 简化实现
> const resolvedPromise = Promise.resolve()
> let currentFlushPromise: Promise<void> | null = null
>
> export function nextTick(fn?: () => void): Promise<void> {
>   const p = currentFlushPromise || resolvedPromise
>   return fn ? p.then(fn) : p
> }
>
> // Vue 3 的调度队列（scheduler）
> const queue: SchedulerJob[] = []
> let isFlushing = false
>
> export function queueJob(job: SchedulerJob) {
>   if (!queue.includes(job)) {
>     queue.push(job)
>   }
>   if (!isFlushing) {
>     isFlushing = true
>     // 核心：用 Promise.then 排入微任务队列
>     currentFlushPromise = resolvedPromise.then(flushJobs)
>   }
> }
> ```
>
> **和 queueMicrotask 的关系：**
>
> - Vue 3 的 nextTick 底层用 `Promise.then`（微任务）
> - 组件更新任务（`queueJob`）也放在微任务队列
> - 你调用 `nextTick(fn)` 就是把 fn 排在更新任务**之后**执行
>
> ```
> 同步代码修改数据
>   → queueJob（组件更新）放入微任务
>   → nextTick(fn) 的 fn 排在更新任务后面
>   → 微任务执行：先更新DOM，再执行fn
>   → 此时 fn 里能拿到最新 DOM
> ```

---

**Q71：Pinia 和 Vuex 的本质区别是什么？Pinia 是如何做到不需要 mutations 的？**

> **答：**
>
> | 对比       | Vuex 4                    | Pinia                            |
> | ---------- | ------------------------- | -------------------------------- |
> | TypeScript | 需要大量手动类型声明      | 自动推导，零配置                 |
> | 修改数据   | 必须通过 mutation（同步） | 直接修改 state（actions 可异步） |
> | 模块化     | 嵌套 modules（繁琐）      | 每个 store 独立，扁平化          |
> | Devtools   | 支持时间旅行              | 支持，更好用                     |
> | 包大小     | ~10KB                     | ~2KB                             |
>
> **Pinia 不需要 mutations 的原因：**
>
> ```typescript
> // Vuex 强制 mutation 的原因：严格模式下追踪每次修改
> // 但这导致代码极其繁琐
>
> // Pinia 的做法：直接用 reactive() 包裹 state
> // 任何对 state 的修改都会被 Vue 的响应式系统追踪
> // Devtools 通过 Vue 的响应式 track 来记录变化
>
> const useStore = defineStore('main', {
>   state: () => ({ count: 0 }),
>   actions: {
>     async increment() {
>       this.count++ // 直接修改！Devtools 自动记录
>       await someAsyncOp()
>       this.count += 10 // 异步中也可以直接改
>     },
>   },
> })
>
> // 组件中甚至可以直接改（不推荐但可以）：
> const store = useStore()
> store.count = 100 // Pinia 允许这样做
> ```

---

## 十九、工程化与构建刁钻题

---

**Q72：ESM 的 `import` 和 CommonJS 的 `require` 有什么本质区别？混用会出什么问题？**

> **答：**
>
> | 对比         | ESM import                                   | CommonJS require             |
> | ------------ | -------------------------------------------- | ---------------------------- |
> | 解析时机     | **编译时**（静态分析）                       | **运行时**（动态加载）       |
> | 加载方式     | 异步（顶层 await 支持）                      | 同步（阻塞）                 |
> | 绑定类型     | **实时绑定**（导出值变化，导入方看到最新值） | **值拷贝**（导入后是快照）   |
> | 循环依赖     | 可以处理（未初始化的绑定）                   | 得到部分导出（已执行的部分） |
> | Tree-shaking | ✅ 支持                                      | ❌ 不支持                    |
>
> **实时绑定 vs 值拷贝的区别：**
>
> ```javascript
> // ESM - 实时绑定
> // counter.mjs
> export let count = 0
> export function increment() {
>   count++
> }
>
> // main.mjs
> import { count, increment } from './counter.mjs'
> increment()
> console.log(count) // 1 ← 看到了最新值！
>
> // CJS - 值拷贝
> // counter.js
> let count = 0
> module.exports = { count, increment: () => count++ }
>
> // main.js
> const { count, increment } = require('./counter')
> increment()
> console.log(count) // 0 ← 还是拷贝时的值！
> ```
>
> **混用的问题：**
>
> - 在 ESM 中 `import` 一个 CJS 模块，只能 default import（整体导入）
> - CJS 中 `require` 一个 ESM 模块会报错（ESM 是异步的，不能同步 require）
> - 解决方案：用动态 `import()` 或让打包工具处理转换

---

**Q73：Vite 的依赖预构建（Pre-bundling）是做什么的？为什么要做？**

> **答：**
>
> **预构建解决了两个问题：**
>
> ```
> 问题1：CJS/UMD → ESM 转换
> ─────────────────────────
> 浏览器只能原生运行 ESM
> 但 lodash、element-plus 等旧包是 CJS 格式
> → esbuild 预构建转为 ESM
>
> 问题2：模块数量爆炸
> ─────────────────────────
> lodash 的 ESM 版（lodash-es）有 600+ 个模块文件
> 浏览器需要发 600+ 个 HTTP 请求！（即使 HTTP/2 也有并发限制）
> → esbuild 预构建将 lodash-es 合并为 1 个文件
> → 1 个请求搞定
> ```
>
> **预构建的流程：**
>
> ```
> 启动 dev server
>   → 扫描 index.html 找到入口
>   → 静态分析 import，找到所有第三方依赖
>   → esbuild 构建（速度极快，比 Webpack 快 10-100x）
>   → 缓存到 node_modules/.vite/deps/
>   → 下次启动直接用缓存
> ```
>
> **什么时候重新预构建？**
>
> - `package.json` 的 dependencies 变化
> - `vite.config.ts` 的 `optimizeDeps` 配置变化
> - 手动 `vite --force`

---

**Q74：你们的 CI/CD 流水线是怎么设计的？如何保证只有通过测试的代码才能合入主干？**

> **答：**
>
> ```
> 完整流水线：
>
> ┌────── PR 创建 ──────────────────────────────────────────┐
> │                                                         │
> │  ① 代码检查（并行执行）                                  │
> │     ├── ESLint + TypeScript 类型检查（~30s）             │
> │     ├── Prettier 格式检查                               │
> │     └── commitlint 提交信息格式检查                     │
> │                                                         │
> │  ② 单元测试（Vitest）                                   │
> │     └── 覆盖率 < 80% → 失败阻塞                         │
> │                                                         │
> │  ③ 构建检查                                             │
> │     └── vite build → 产物体积对比（超出阈值告警）         │
> │                                                         │
> │  ④ E2E 测试（Playwright）                               │
> │     └── 核心流程回归测试                                 │
> │                                                         │
> │  全部通过 → 允许合并到 main                              │
> └─────────────────────────────────────────────────────────┘
>
> ┌────── 合入 main ────────────────────────────────────────┐
> │  ① 自动打 tag → 触发 release 流水线                     │
> │  ② 构建产物 → 发布 npm 私有仓库                          │
> │  ③ 更新 Storybook 文档站                                │
> │  ④ 企微通知相关业务团队                                  │
> └─────────────────────────────────────────────────────────┘
> ```
>
> **关键设计：** 测试分层执行——快速检查（type check + lint）先跑，慢的（E2E）后跑，失败快速反馈，不浪费 CI 资源。

---

**Q75：`source map` 是什么？生产环境应该如何处理 source map？**

> **答：**
>
> **source map 的作用：** 将压缩混淆后的代码位置映射回源代码位置，用于线上错误定位。
>
> **生产环境的处理策略：**
>
> ```typescript
> // vite.config.ts - 不同场景的配置
>
> // 方案1：完全不生成（适合安全要求极高的场景）
> build: {
>   sourcemap: false
> }
>
> // 方案2：生成但不上传（最常用）
> build: {
>   sourcemap: true
> }
> // → 构建后把 .map 文件上传到内部错误监控系统（Sentry）
> // → 删除服务器上的 .map 文件，不对外暴露
>
> // 方案3：hidden（map 文件存在但不引用）
> build: {
>   sourcemap: 'hidden'
> }
> // → js 文件末尾没有 sourceMappingURL 注释
> // → 只有手动指定 map 文件才能使用
> ```
>
> **与 Sentry 结合：**
>
> ```bash
> # CI 流程中：构建 → 上传 source map → 删除 map 文件
> vite build
> sentry-cli releases files upload-sourcemaps ./dist --url-prefix '~/assets'
> rm ./dist/assets/*.map
> ```
>
> **医疗项目的考量：** 患者数据相关的业务逻辑绝对不能泄露源码，所以生产环境 source map 只上传到内网 Sentry，服务器上不保留。

---

## 二十、性能与架构刁钻题

---

**Q76：Long Task 是什么？如何检测和拆解长任务？**

> **答：**
>
> **Long Task：** 在主线程上执行超过 50ms 的任务（浏览器规范定义）。超过 50ms 用户就会感知到卡顿（输入延迟、动画丢帧）。
>
> **检测手段：**
>
> ```typescript
> // 1. Performance API（精确）
> const observer = new PerformanceObserver(list => {
>   list.getEntries().forEach(entry => {
>     if (entry.duration > 50) {
>       console.warn('Long Task:', entry.duration, 'ms', entry)
>     }
>   })
> })
> observer.observe({ entryTypes: ['longtask'] })
>
> // 2. Chrome DevTools → Performance → 红色标记的任务
> ```
>
> **拆解长任务的方案：**
>
> ```typescript
> // 方案1：scheduler.yield（现代浏览器）
> async function processLargeData(data: any[]) {
>   for (let i = 0; i < data.length; i++) {
>     process(data[i])
>     // 每处理 100 条让出主线程
>     if (i % 100 === 0) await scheduler.yield()
>   }
> }
>
> // 方案2：setTimeout 分片
> function processInChunks(data: any[], chunkSize = 100) {
>   let index = 0
>   function processChunk() {
>     const end = Math.min(index + chunkSize, data.length)
>     for (; index < end; index++) process(data[index])
>     if (index < data.length) setTimeout(processChunk, 0)
>   }
>   processChunk()
> }
>
> // 方案3：Web Worker（彻底移出主线程）
> ```
>
> **项目关联：** ProTable 初始化时如果有 10w 行数据需要建立索引（排序/过滤），放在 Web Worker 里做，主线程不阻塞。

---

**Q77：你如何量化「性能优化」的效果？用什么指标？**

> **答：** 用 Web Vitals 核心指标量化：
>
> | 指标        | 含义                           | 优秀标准 | 我们的优化结果 |
> | ----------- | ------------------------------ | -------- | -------------- |
> | **LCP**     | 最大内容绘制（主内容加载时间） | < 2.5s   | 4.1s → 2.2s    |
> | **FID/INP** | 交互延迟（点击到响应）         | < 200ms  | 320ms → 95ms   |
> | **CLS**     | 累积布局偏移（内容跳动）       | < 0.1    | 0.35 → 0.05    |
> | **FCP**     | 首次内容绘制                   | < 1.8s   | 2.8s → 1.2s    |
> | **TTI**     | 可交互时间                     | < 5s     | 5.3s → 3.0s    |
>
> **收集方式：**
>
> ```typescript
> import { onLCP, onFID, onCLS, onINP } from 'web-vitals'
>
> function sendToAnalytics({ name, value, delta, id }) {
>   // 上报到内部监控系统
>   analytics.track('web-vitals', { name, value, page: location.pathname })
> }
>
> onLCP(sendToAnalytics)
> onFID(sendToAnalytics)
> onCLS(sendToAnalytics)
> onINP(sendToAnalytics)
> ```
>
> **追问：INP 和 FID 的区别？**
>
> - FID：只测量第一次交互的延迟
> - INP：测量整个页面生命周期内所有交互的第 75 百分位值（更全面，Chrome 2024 已用 INP 替换 FID）

---

**Q78：如果页面有内存泄漏但你不知道在哪，如何系统性地排查？**

> **答：** 系统性排查 5 步法：
>
> ```
> Step 1：确认泄漏存在
> ─────────────────────
> Chrome DevTools → Performance → Memory 勾选
> 执行操作（如反复进入/退出某个页面）
> 看 JS Heap 是否持续增长（正常应该回落）
>
> Step 2：定位泄漏对象类型
> ─────────────────────
> Memory → Take Heap Snapshot（操作前后各一次）
> Comparison 视图 → 看哪些对象数量在增加
> 重点关注：Detached DOM nodes / closure / array
>
> Step 3：找到引用链
> ─────────────────────
> 点击泄漏对象 → Retainers 面板
> 看谁持有它的引用（从下到上读引用链）
>
> Step 4：验证猜想
> ─────────────────────
> 在代码中找到对应位置 → 加 console.log 确认
> 修复后再拍快照对比
>
> Step 5：自动化回归
> ─────────────────────
> 用 Playwright 写内存泄漏测试：
> 执行操作 N 次 → 强制 GC → 检查 heap size 是否稳定
> ```
>
> **项目中真实排查的案例：** 医生站切换患者后内存持续增长 → 发现是 ECharts 图表实例在患者切换时未调用 `chart.dispose()` → 每次切换都创建新图表但旧的 canvas 和监听器没有释放

---

## 二十一、操作系统与底层刁钻题

---

**Q79：浏览器的进程和线程架构是什么？为什么 JS 是单线程的？**

> **答：**
>
> **Chrome 多进程架构：**
>
> ```
> Browser Process（主进程）
>   → 管理 Tab、地址栏、网络请求
>
> Renderer Process（渲染进程，每个 Tab 独立）
>   ├── Main Thread（主线程）
>   │     → JS 引擎 + DOM + CSS + Layout + Paint
>   ├── Compositor Thread（合成线程）
>   │     → 滚动、动画（不阻塞主线程）
>   ├── Raster Thread（光栅线程）
>   └── Worker Threads（Web Worker）
>
> GPU Process（GPU 进程）
> Network Process（网络进程）
> Plugin Process（插件进程）
> ```
>
> **JS 为什么是单线程：**
>
> - 历史设计决策：浏览器脚本语言需要操作 DOM，如果多线程并发操作 DOM 会产生竞争条件（A 在删节点，B 在读节点）
> - 解决方案：DOM 只在主线程操作，通过事件循环协调异步任务
> - Web Worker 是"主线程外"的 JS，但没有 DOM 访问权限，通过 `postMessage` 和主线程通信
>
> **实际影响：** 这就是为什么长时间 JS 计算会卡死页面——占用了主线程，合成线程虽然还能处理滚动，但 Layout/Paint 无法进行。

---

**Q80：EventSource（SSE）和 WebSocket 有什么区别？什么场景你会选择 SSE？**

> **答：**
>
> | 对比        | SSE (Server-Sent Events) | WebSocket            |
> | ----------- | ------------------------ | -------------------- |
> | 通信方向    | 单向（服务端→客户端）    | 双向全双工           |
> | 协议        | HTTP/1.1（普通 HTTP）    | 升级为 WS 协议       |
> | 自动重连    | ✅ 浏览器原生支持        | ❌ 需要手动实现      |
> | 断点续传    | ✅ Last-Event-ID         | ❌ 需要自己实现      |
> | 代理/防火墙 | 更友好（标准 HTTP）      | 某些企业防火墙会阻断 |
> | 数据格式    | 只能文本                 | 文本 + 二进制        |
> | HTTP/2      | 可复用连接               | 独立连接             |
>
> **选 SSE 的场景：**
>
> ```typescript
> // 医疗场景：AI 诊断报告流式输出（只需服务端→客户端）
> const eventSource = new EventSource('/api/ai-diagnosis/stream')
>
> eventSource.onmessage = e => {
>   report.value += e.data // 逐字追加诊断内容
> }
>
> eventSource.addEventListener('done', () => {
>   eventSource.close() // 报告生成完毕
> })
>
> // 断线自动重连，且服务端可以从断点继续发送（Last-Event-ID）
> ```
>
> **结论：** 需要双向通信（如聊天、协同编辑）→ WebSocket；只需服务端推送（消息通知、AI 流式输出、进度推送）→ SSE 更简单

---

## 二十二、刁钻八股

---

### Q81. `[] == ![]` 结果是什么？为什么？

**答案：`true`**

执行步骤：

1. `![]` → `false`（空数组是真值，取反得 `false`）
2. `[] == false` → 触发抽象相等比较，`false` 转数字 `0`
3. `[] == 0` → 数组调用 `ToPrimitive`：`[].toString()` → `""`
4. `"" == 0` → `""` 转数字 `0`
5. `0 == 0` → **`true`**

> 陷阱：`===` 严格相等不触发类型转换，`[] === ![]` → `false`

---

### Q82. `typeof null === 'object'` 是 Bug 还是设计？能修复吗？

**答案：历史遗留 Bug，无法修复**

- JS 最初用 32 位存储值，低 3 位为类型标记，`000` 表示对象
- `null` 的机器码全为 `0`，被误判为对象类型
- ES6 提案曾想修复（`typeof null === 'null'`），但会破坏大量历史代码，被拒绝

正确判空：

```js
value === null // 唯一可靠方式
Object.prototype.toString.call(null) // '[object Null]'
```

---

### Q83. 以下代码输出什么？（原型链 + 构造函数陷阱）

```js
function Foo() {
  return this
}
const a = Foo()
const b = new Foo()
console.log(a === window, b instanceof Foo)
```

**答案：`true, true`**

- `Foo()` 普通调用，`this` 指向全局 `window`
- `new Foo()` 若构造函数**返回的不是对象**，则忽略返回值，返回新建实例
- 这里 `return this`，`new` 调用时 `this` 是新实例（对象），所以返回该实例

> 追问：如果 `return { x: 1 }`，`b instanceof Foo` → `false`，因为返回了一个普通对象，原型链断开

---

### Q84. 事件循环执行顺序，输出结果？

```js
console.log('1')
setTimeout(() => console.log('2'), 0)
Promise.resolve().then(() => {
  console.log('3')
  setTimeout(() => console.log('4'), 0)
})
Promise.resolve().then(() => console.log('5'))
console.log('6')
```

**答案：`1 6 3 5 2 4`**

| 阶段       | 执行内容                                        |
| ---------- | ----------------------------------------------- |
| 同步       | `1`, `6`                                        |
| 微任务队列 | `3`（then1执行，注册setTimeout4），`5`（then2） |
| 宏任务1    | `2`（setTimeout0注册在前）                      |
| 宏任务2    | `4`（then1内注册的setTimeout）                  |

---

### Q85. `var` 变量提升与暂时性死区，以下代码输出？

```js
var x = 1
function test() {
  console.log(x)
  var x = 2
  console.log(x)
}
test()
```

**答案：`undefined`, `2`**

- 函数内 `var x` 被提升到函数顶部，遮蔽外层 `x`
- 执行时第一个 `console.log(x)` 读的是函数内尚未赋值的 `x`（`undefined`）

> 对比 `let`：若改为 `let x = 2`，则第一个 `console.log` 抛出 `ReferenceError`（暂时性死区 TDZ）

---

### Q86. 实现一个函数 `curry`，支持以下所有调用方式

```js
add(1)(2)(3) === 6
add(1, 2)(3) === 6
add(1)(2, 3) === 6
add(1, 2, 3) === 6
```

**答案：**

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    return function (...args2) {
      return curried.apply(this, args.concat(args2))
    }
  }
}
const add = curry((a, b, c) => a + b + c)
```

> 陷阱：`fn.length` 只统计**有默认值之前**的参数个数，`(a, b=1, c)` → `length === 1`

---

### Q87. 深拷贝有哪些边界情况？`JSON.parse(JSON.stringify())` 会漏掉什么？

**漏掉的情况：**

| 类型                     | JSON序列化结果 |
| ------------------------ | -------------- |
| `undefined`              | 属性被忽略     |
| 函数                     | 属性被忽略     |
| `Symbol` 键              | 被忽略         |
| `Date`                   | 变成字符串     |
| `RegExp` / `Map` / `Set` | 变成 `{}`      |
| 循环引用                 | 直接报错       |
| `NaN` / `Infinity`       | 变成 `null`    |

完整深拷贝需处理以上所有情况 + WeakMap 解决循环引用：

```js
function deepClone(target, map = new WeakMap()) {
  if (target === null || typeof target !== 'object') return target
  if (map.has(target)) return map.get(target)
  const clone = Array.isArray(target) ? [] : {}
  map.set(target, clone)
  for (const key of Reflect.ownKeys(target)) {
    clone[key] = deepClone(target[key], map)
  }
  return clone
}
```

---

### Q88. 讲一下浏览器从输入 URL 到页面渲染的完整流程

**核心阶段（每阶段都可能被追问）：**

```
DNS解析 → TCP三次握手 → TLS握手(HTTPS) → 发送HTTP请求
→ 服务端响应 → 浏览器解析HTML(构建DOM树)
→ 解析CSS(构建CSSOM树) → 合并DOM+CSSOM = 渲染树
→ Layout(回流，计算几何位置) → Paint(绘制像素)
→ Composite(合成层合并，GPU加速)
```

> 高频追问：
>
> - **JS 如何阻塞渲染？** `<script>` 阻塞 HTML 解析；加 `defer` 延迟到 DOM 构建完；加 `async` 下载完立即执行
> - **CSS 是否阻塞渲染？** CSS 不阻塞 DOM 解析，但阻塞渲染树构建（Paint 前必须有 CSSOM）
> - **白屏优化？** SSR / 骨架屏 / 预连接 `<link rel="preconnect">`

---

### Q89. `HTTP/1.1` vs `HTTP/2` vs `HTTP/3` 核心区别？

| 特性       | HTTP/1.1       | HTTP/2            | HTTP/3             |
| ---------- | -------------- | ----------------- | ------------------ |
| 传输协议   | TCP            | TCP               | QUIC(UDP)          |
| 多路复用   | 无（队头阻塞） | 有（同一TCP连接） | 有（流级别隔离）   |
| 头部压缩   | 无             | HPACK             | QPACK              |
| 服务器推送 | 无             | 有                | 有                 |
| 队头阻塞   | 有             | TCP层仍有         | 解决（QUIC流独立） |
| 连接建立   | 1-2 RTT        | 1-2 RTT           | 0-1 RTT            |

---

### Q90. Vue3 的 `ref` 和 `reactive` 底层实现有何不同？

**`reactive`：**

- 基于 `Proxy`，直接代理对象
- 访问属性触发 `track`，修改触发 `trigger`
- 不能包裹基本类型

**`ref`：**

- 创建 `RefImpl` 类的实例
- `.value` 访问/设置时调用 `trackRefValue` / `triggerRefValue`
- 若 `.value` 是对象，内部自动调用 `reactive()` 包装

```js
// ref 简化实现
class RefImpl {
  private _value: any;
  constructor(raw) {
    this._value = isObject(raw) ? reactive(raw) : raw;
  }
  get value() { trackRefValue(this); return this._value; }
  set value(newVal) { this._value = newVal; triggerRefValue(this); }
}
```

> 陷阱：`reactive` 解构会失去响应性，`ref` 在 `<template>` 中自动解包（不用 `.value`），但在 `reactive` 对象中嵌套的 `ref` 也自动解包

---

### Q91. 什么是 CSS BFC？如何触发？能解决哪些问题？

**BFC（块格式化上下文）：独立的布局区域，内部与外部互不影响**

**触发条件（满足一个即可）：**

- `float` 不为 `none`
- `position` 为 `absolute / fixed`
- `display` 为 `flex / grid / inline-block / table-cell`
- `overflow` 不为 `visible`

**能解决：**

| 问题                 | 原理                         |
| -------------------- | ---------------------------- |
| 清除浮动（高度塌陷） | BFC 计算高度时包含浮动子元素 |
| 防止 margin 合并     | 两个 BFC 之间 margin 不合并  |
| 自适应两栏布局       | BFC 不与浮动元素重叠         |

---

### Q92. `WeakMap` 和 `Map` 的区别？`WeakMap` 为什么不能遍历？

| 特性     | Map    | WeakMap            |
| -------- | ------ | ------------------ |
| 键类型   | 任意   | 只能是对象         |
| 引用类型 | 强引用 | 弱引用（不阻止GC） |
| 可遍历   | ✅     | ❌                 |
| Size属性 | ✅     | ❌                 |

**不能遍历的原因：** WeakMap 的键是弱引用，GC 随时可能回收键对象，若允许遍历则结果不确定，违反语言规范的确定性要求。

**实际应用场景：**

```js
// DOM 节点关联数据，节点删除后自动GC
const nodeDataMap = new WeakMap()
nodeDataMap.set(domNode, { clicks: 0 })
```

---

### Q93. 实现 `Promise.all` 和 `Promise.race`，并说明边界情况

```js
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    if (!promises.length) return resolve([])
    const results = []
    let count = 0
    promises.forEach((p, i) => {
      Promise.resolve(p).then(val => {
        results[i] = val // 注意：用索引赋值保证顺序
        if (++count === promises.length) resolve(results)
      }, reject) // 任一失败立即 reject
    })
  })
}

Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(p => Promise.resolve(p).then(resolve, reject))
  })
}
```

> 陷阱：`Promise.all` 传空数组 `[]` 应立即 `resolve([])`；传非 Promise 的值需用 `Promise.resolve()` 包装

---

### Q94. `==` 类型转换规则，以下哪些为 `true`？

```js
null == undefined // ?
null == 0 // ?
undefined == false // ?
NaN == NaN // ?
```

**答案：**

- `null == undefined` → **`true`**（规范特例，仅这两者互等）
- `null == 0` → **`false`**（null 只和 undefined 相等）
- `undefined == false` → **`false`**（undefined 只和 null 相等）
- `NaN == NaN` → **`false`**（NaN 与任何值都不相等，包括自身）

检测 NaN 的正确方式：`Number.isNaN(value)` 而非 `isNaN(value)`（后者会先做类型转换）

---

### Q95. Webpack 的 `Tree-shaking` 为什么只能处理 ESM，不能处理 CJS？

**根本原因：ESM 是静态结构，CJS 是动态结构**

| 特性                 | ESM                          | CJS                            |
| -------------------- | ---------------------------- | ------------------------------ |
| `import/export` 时机 | 编译时（静态）               | 运行时（动态）                 |
| 依赖图分析           | 可在编译阶段完成             | 无法确定                       |
| 示例                 | `import { fn } from './lib'` | `const lib = require('./lib')` |

```js
// CJS 动态 require，无法静态分析
const method = condition ? 'a' : 'b'
const fn = require('./lib')[method] // Webpack 不知道用了哪个
```

> 追问：**副作用（side effects）** 如何影响 Tree-shaking？`package.json` 中 `"sideEffects": false` 告知 Webpack 所有模块无副作用，可安全删除未使用导出

---

### Q96. `requestAnimationFrame` vs `setTimeout(fn, 0)` 的本质区别？

| 对比项     | setTimeout(fn, 0)      | requestAnimationFrame      |
| ---------- | ---------------------- | -------------------------- |
| 执行时机   | 宏任务队列，延迟不精确 | 每次屏幕刷新前（约16.6ms） |
| 掉帧处理   | 可能堆积多次执行       | Tab切换/隐藏时自动暂停     |
| 与渲染同步 | 不同步                 | 同步（在Layout/Paint之前） |
| 适合场景   | 延迟执行、轮询         | 动画、滚动优化             |

> 陷阱：`setTimeout` 最小延迟受浏览器限制（嵌套5层后最小4ms），且受主线程阻塞影响；rAF 保证在正确的渲染时机执行

---

### Q97. Vue3 中 `computed` 是懒执行的，如何理解？和 `watchEffect` 有何区别？

**computed 懒执行：**

- 创建时不立即执行，只在**首次读取 `.value`** 时计算
- 内部维护 `_dirty` 标志，依赖变化时置为 `true`，再次读取才重新计算
- 本质是特殊的 `ReactiveEffect`，带缓存

**watchEffect 立即执行：**

- 创建时**立即执行一次**，自动收集依赖
- 依赖变化后**异步（微任务）重新执行**

```
computed:     读取 → 计算 → 缓存 → 依赖变 → dirty=true → 再次读取才重算
watchEffect:  创建 → 立即执行 → 依赖变 → 微任务重执行
```

> 陷阱：`computed` 的 getter 中不能有异步操作（打破缓存机制），异步场景用 `watch` 或 `watchEffect`

---

### Q98. `for...in` 和 `for...of` 的区别？哪些对象可以 `for...of`？

| 对比     | for...in                       | for...of                      |
| -------- | ------------------------------ | ----------------------------- |
| 遍历内容 | 可枚举属性的**键**（含原型链） | **值**（只可迭代对象）        |
| 适合     | 普通对象                       | 数组/Map/Set/Generator/String |
| 原型链   | 会遍历继承属性                 | 不涉及                        |

**可 `for...of` 的条件：** 对象实现了 `[Symbol.iterator]` 接口

```js
// 让普通对象支持 for...of
const obj = { a: 1, b: 2 }
obj[Symbol.iterator] = function* () {
  for (const key of Object.keys(this)) yield [key, this[key]]
}
for (const [k, v] of obj) console.log(k, v)
```

---

### Q99. 以下代码有什么内存泄漏风险？如何修复？

```js
function setup() {
  const heavyData = new Array(1000000).fill('x')
  window.addEventListener('resize', () => {
    console.log(heavyData.length)
  })
}
setup()
```

**风险：**

1. 闭包引用 `heavyData`，只要事件监听存在，`heavyData` 永不被 GC
2. `window.addEventListener` 不会随组件销毁自动移除，持续占用内存

**修复方案：**

```js
function setup() {
  const heavyData = new Array(1000000).fill('x')
  const handler = () => console.log(heavyData.length)
  window.addEventListener('resize', handler)

  // 组件销毁时清除
  return () => window.removeEventListener('resize', handler)
}

// Vue3 中
onMounted(() => {
  const cleanup = setup()
  onUnmounted(cleanup)
})
```

---

### Q100. 手写一个防抖函数，要求支持 `immediate` 立即执行模式，并说明与节流的本质区别

```js
function debounce(fn, delay, immediate = false) {
  let timer = null
  return function (...args) {
    const callNow = immediate && !timer
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      if (!immediate) fn.apply(this, args)
    }, delay)
    if (callNow) fn.apply(this, args) // 立即执行
  }
}

function throttle(fn, interval) {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last >= interval) {
      last = now
      fn.apply(this, args)
    }
  }
}
```

**本质区别：**

|          | 防抖                           | 节流                         |
| -------- | ------------------------------ | ---------------------------- |
| 核心逻辑 | 重置计时器，只执行**最后一次** | 固定时间间隔**最多执行一次** |
| 类比     | 电梯等人（有人进来就重新等）   | 地铁发车（固定间隔，不等人） |
| 适合场景 | 搜索输入、窗口resize           | 滚动监听、按钮防连击         |

---

## 二十三、深度八股 + 刁钻进阶

---

### Q101. `async/await` 的底层是什么？和 Generator 有什么关系？

**答案：`async/await` 是 Generator + 自动执行器的语法糖**

```js
// async/await 本质等价于：
async function fetchData() {
  const res = await fetch('/api')
  return res.json()
}

// 等价于（手动 Generator 版）：
function* fetchData() {
  const res = yield fetch('/api')
  return res.json()
}
// 需要一个 "执行器" 自动驱动 Generator
function run(gen) {
  const g = gen()
  function next(val) {
    const { value, done } = g.next(val)
    if (done) return Promise.resolve(value)
    return Promise.resolve(value).then(next)
  }
  return next()
}
```

> 陷阱：`await` 后面不是 Promise 时，会自动用 `Promise.resolve()` 包裹；`await` 本质上是 `yield` + 微任务调度

---

### Q102. 以下代码输出什么？（async/await 执行顺序）

```js
async function async1() {
  console.log('A')
  await async2()
  console.log('B')
}
async function async2() {
  console.log('C')
}
console.log('D')
async1()
console.log('E')
```

**答案：`D A C E B`**

| 阶段   | 执行                                                                 |
| ------ | -------------------------------------------------------------------- |
| 同步   | `D` → 调用 `async1` → `A` → 调用 `async2` → `C` → `await` 挂起 → `E` |
| 微任务 | `B`（`await` 恢复，进入微任务队列）                                  |

> 陷阱：`async2()` 本身是同步打印 `C`，`await` 的暂停发生在 `async2` 返回之后

---

### Q103. `Object.create(null)` vs `{}` 有什么区别？

```js
const a = {}
const b = Object.create(null)

a.toString // ƒ toString() { [native code] }
b.toString // undefined
a.__proto__ // Object.prototype
b.__proto__ // undefined（无原型链）
```

**使用场景：**

- `Object.create(null)` 创建**纯净对象**，无原型污染
- 适合做 Map/字典（不会与 `toString`、`hasOwnProperty` 等冲突）
- JSON.stringify、for...in 等不受原型链干扰

> 追问：`Object.create(proto, descriptors)` 第二参数是属性描述符，可定义 getter/setter/enumerable 等

---

### Q104. 实现 `instanceof` 操作符

```js
function myInstanceof(instance, Constructor) {
  // 基本类型直接返回 false
  if (typeof instance !== 'object' && typeof instance !== 'function') return false
  if (instance === null) return false

  let proto = Object.getPrototypeOf(instance)
  while (proto !== null) {
    if (proto === Constructor.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
  return false
}
```

> 陷阱：`instanceof` 检测的是**原型链**，不是类型；跨 iframe 的同名构造函数 `instanceof` 会失败（不同作用域的 `Array.prototype`）

---

### Q105. `Object.defineProperty` 和 `Proxy` 的核心差异？Vue2 为何升级 Vue3？

| 对比     | Object.defineProperty | Proxy            |
| -------- | --------------------- | ---------------- |
| 拦截粒度 | 单个属性              | 整个对象         |
| 新增属性 | 无法检测（需 `$set`） | 可检测           |
| 数组变更 | 无法检测索引赋值      | 可检测           |
| 删除属性 | 无法检测              | 可检测           |
| 嵌套对象 | 递归遍历（初始化时）  | 懒代理（访问时） |
| 性能     | 初始化开销大          | 按需代理，更高效 |

> Vue2 的 `$set`、数组7个变异方法（`push/pop/shift...`）都是为了绕过 `defineProperty` 的限制

---

### Q106. 实现 `new` 操作符的完整过程

```js
function myNew(Constructor, ...args) {
  // 1. 创建新对象，原型指向构造函数的 prototype
  const obj = Object.create(Constructor.prototype)
  // 2. 执行构造函数，绑定 this
  const result = Constructor.apply(obj, args)
  // 3. 若构造函数返回对象，则用该对象；否则用新创建的 obj
  return result instanceof Object ? result : obj
}
```

**四步口诀：** 建对象 → 链原型 → 绑this → 判返回值

---

### Q107. 什么是 JS 的尾调用优化（TCO）？实际有用吗？

**尾调用：** 函数的最后一步是调用另一个函数（返回值直接是函数调用）

```js
// 尾调用（可优化）
function f() {
  return g()
}

// 非尾调用（不可优化，g()的结果还要 +1）
function f() {
  return g() + 1
}
```

**优化原理：** 正常调用会创建新的调用栈帧；尾调用可复用当前栈帧，避免栈溢出

```js
// 尾递归优化的阶乘
function factorial(n, acc = 1) {
  if (n <= 1) return acc
  return factorial(n - 1, n * acc) // 尾调用
}
```

> 现实情况：V8 等现代引擎对 TCO 支持不一（严格模式下才开启），实际开发中用**迭代替递归**更可靠

---

### Q108. CSS `position: sticky` 的工作原理和常见失效场景

**原理：** 在滚动容器内，元素在达到 `top/left` 阈值前表现为 `relative`，超过后表现为 `fixed`（相对于最近的滚动祖先）

**常见失效场景：**

```css
/* 1. 父元素 overflow 不为 visible */
.parent {
  overflow: hidden;
} /* sticky 失效！ */

/* 2. 父元素高度等于子元素高度，没有滚动空间 */

/* 3. 未设置 top/left/right/bottom 其中之一 */
.sticky {
  position: sticky;
} /* 无效，必须设置阈值 */

/* 4. 祖先元素设置了 transform */
.ancestor {
  transform: translateZ(0);
} /* 创建新层叠上下文，sticky相对此祖先 */
```

---

### Q109. CSS `will-change` 的作用和滥用风险

**作用：** 提前告知浏览器元素将发生的变化，让浏览器**提前创建合成层**，避免运行时重新分层

```css
.animated {
  will-change: transform, opacity;
}
```

**滥用风险：**

- 每个合成层消耗**独立的 GPU 内存**
- 大量使用会导致内存占用暴增，反而降低性能
- 应在动画**开始前**设置，**结束后**移除

```js
// 正确用法：按需设置
el.addEventListener('mouseenter', () => {
  el.style.willChange = 'transform'
})
el.addEventListener('animationend', () => {
  el.style.willChange = 'auto'
})
```

---

### Q110. 以下代码输出什么？（闭包 + 循环经典陷阱）

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)
}
// var 改为 let 呢？
```

**var 版本：** 输出 `3 3 3`

- `var` 函数作用域，3个回调共享同一个 `i`，循环结束时 `i === 3`

**let 版本：** 输出 `0 1 2`

- `let` 块级作用域，每次迭代创建独立的 `i` 绑定

**修复 var 的方法：**

```js
// IIFE 创建闭包
for (var i = 0; i < 3; i++) {
  ;(j => setTimeout(() => console.log(j), 0))(i)
}
```

---

### Q111. `Symbol` 的实际使用场景有哪些？

```js
// 1. 防止属性名冲突（作为对象属性键）
const id = Symbol('id')
obj[id] = 123 // 不会与 obj.id 冲突

// 2. 定义 "私有" 属性（不完全私有，但不会被 for..in 遍历）
const _private = Symbol('private')
class Foo {
  [_private] = 'secret'
}

// 3. 内置 Symbol 实现自定义行为
class MyArray {
  [Symbol.iterator]() {
    /* 自定义迭代 */
  }
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return 42
    return 'MyArray'
  }
}

// 4. 枚举替代（唯一值，避免字符串碰撞）
const STATUS = { LOADING: Symbol('loading'), DONE: Symbol('done') }
```

---

### Q112. 浏览器的进程架构是什么？JS 引擎在哪一层？

```
浏览器进程（Browser Process）
├── 渲染进程（Renderer Process）← 每个Tab独立
│   ├── 主线程（Main Thread）
│   │   ├── JS引擎（V8）← 执行JS
│   │   ├── 渲染引擎（Blink）← 解析HTML/CSS
│   │   └── 事件循环
│   ├── 合成线程（Compositor Thread）
│   ├── 光栅化线程池（Raster Threads）
│   └── Web Worker线程（独立JS线程）
├── GPU进程
├── 网络进程（Network Process）
└── 插件进程
```

> 追问：**为什么JS是单线程？** 避免多线程操作DOM时的竞态条件；**Web Worker** 是独立线程但无法操作DOM

---

### Q113. `localStorage`、`sessionStorage`、`Cookie`、`IndexedDB` 的区别？

|            | localStorage | sessionStorage | Cookie         | IndexedDB      |
| ---------- | ------------ | -------------- | -------------- | -------------- |
| 大小       | ~5MB         | ~5MB           | ~4KB           | 几百MB+        |
| 生命周期   | 永久         | 标签页关闭     | 可设过期       | 永久           |
| 服务端访问 | ❌           | ❌             | ✅（自动携带） | ❌             |
| 跨标签     | ✅           | ❌             | ✅             | ✅             |
| 结构化数据 | ❌（字符串） | ❌             | ❌             | ✅（任意类型） |
| 适合场景   | 用户配置     | 临时状态       | 认证/跟踪      | 离线数据库     |

---

### Q114. 实现一个 `LRU` 缓存（最近最少使用），时间复杂度 O(1)

```js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.map = new Map() // Map 保持插入顺序
  }
  get(key) {
    if (!this.map.has(key)) return -1
    const val = this.map.get(key)
    this.map.delete(key)
    this.map.set(key, val) // 移到末尾（最近使用）
    return val
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key)
    else if (this.map.size >= this.capacity) {
      // 删除最久未使用（Map第一个元素）
      this.map.delete(this.map.keys().next().value)
    }
    this.map.set(key, value)
  }
}
```

> 关键：利用 `Map` 的**有序性**（按插入顺序），`keys().next().value` 取第一个键

---

### Q115. TypeScript 中 `interface` 和 `type` 的核心区别？

| 对比              | interface          | type                 |
| ----------------- | ------------------ | -------------------- |
| 声明合并          | ✅（同名自动合并） | ❌（重复定义报错）   |
| 继承方式          | `extends`          | 交叉类型 `&`         |
| 联合类型          | ❌                 | ✅ `type A = B \| C` |
| 映射类型          | ❌                 | ✅                   |
| 元组/基本类型别名 | ❌                 | ✅                   |
| 计算属性          | 有限支持           | ✅                   |

```ts
// interface 声明合并（用于扩展第三方库类型）
interface Window {
  myProp: string
}
interface Window {
  anotherProp: number
}
// 合并后 Window 同时有两个属性

// type 的强大：条件类型、映射类型
type Readonly<T> = { readonly [P in keyof T]: T[P] }
type NonNullable<T> = T extends null | undefined ? never : T
```

---

### Q116. 什么是 TypeScript 的 `infer` 关键字？

**`infer` 用于在条件类型中推断并捕获类型变量**

```ts
// 提取函数返回值类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never

// 提取 Promise 的值类型
type Awaited<T> = T extends Promise<infer U> ? U : T

// 提取数组元素类型
type ArrayElement<T> = T extends (infer E)[] ? E : never

// 提取函数第一个参数类型
type FirstArg<T> = T extends (first: infer F, ...rest: any[]) => any ? F : never

// 实用：将元组转联合类型
type TupleToUnion<T extends any[]> = T extends (infer U)[] ? U : never
// TupleToUnion<[string, number, boolean]> → string | number | boolean
```

---

### Q117. Vue3 的 `Teleport` 和 `Suspense` 分别解决什么问题？

**Teleport：解决 DOM 层级问题**

```html
<!-- 弹窗组件在深层嵌套中，但渲染到 body 下，避免 z-index/overflow 问题 -->
<Teleport to="body">
  <Modal v-if="show" />
</Teleport>
```

**Suspense：解决异步组件加载状态管理**

```html
<Suspense>
  <template #default>
    <AsyncComponent />
    <!-- 异步组件，setup() 中有 await -->
  </template>
  <template #fallback>
    <LoadingSpinner />
    <!-- 加载中显示 -->
  </template>
</Suspense>
```

> 陷阱：`Suspense` 是实验性API；异步 `setup()` 函数需返回 Promise；错误处理需配合 `onErrorCaptured`

---

### Q118. 什么是 CSS 层叠上下文（Stacking Context）？哪些属性会创建它？

**层叠上下文：** 页面上的三维分层，决定元素的覆盖顺序（z 轴）

**创建层叠上下文的属性：**

```css
/* 常见触发条件 */
position: relative/absolute/fixed/sticky + z-index ≠ auto
opacity < 1
transform ≠ none
filter ≠ none
will-change: transform/opacity
isolation: isolate  /* 专门创建层叠上下文 */
```

**层叠顺序（从低到高）：**

```
背景/边框 < 负z-index < 块级元素 < 浮动元素 < 行内元素 < z-index:0 < 正z-index
```

> 陷阱：子元素的 `z-index` 只在**同一层叠上下文**内比较；父元素 `z-index` 低，子元素无论多大也无法覆盖另一个父元素

---

### Q119. 实现数组扁平化，支持指定深度

```js
// 方法1：递归
function flatten(arr, depth = 1) {
  if (depth === 0) return arr.slice()
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flatten(val, depth - 1))
    } else {
      acc.push(val)
    }
    return acc
  }, [])
}

// 方法2：原生（Infinity 表示全部展开）
;[1, [2, [3, [4]]]].flat(Infinity)

// 方法3：栈迭代（无递归，性能更好）
function flattenAll(arr) {
  const stack = [...arr]
  const result = []
  while (stack.length) {
    const item = stack.pop()
    Array.isArray(item) ? stack.push(...item) : result.unshift(item)
  }
  return result
}
```

---

### Q120. XSS 攻击的三种类型及防御手段

| 类型   | 触发方式                               | 示例                              |
| ------ | -------------------------------------- | --------------------------------- |
| 存储型 | 恶意脚本存入数据库，所有用户访问时执行 | 论坛发帖含 `<script>`             |
| 反射型 | 服务端将URL参数直接输出到HTML          | `?name=<script>alert(1)</script>` |
| DOM型  | 前端JS直接将URL参数写入DOM             | `document.write(location.hash)`   |

**防御手段：**

```js
// 1. 输入过滤（转义特殊字符）
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[c]));
}

// 2. CSP（Content Security Policy）HTTP头
Content-Security-Policy: script-src 'self'; object-src 'none'

// 3. HttpOnly Cookie（防止JS读取）
Set-Cookie: token=xxx; HttpOnly; Secure; SameSite=Strict

// 4. 使用 textContent 而非 innerHTML
el.textContent = userInput; // 安全
el.innerHTML = userInput;   // 危险！
```

---

### Q121. CSRF 攻击原理和防御？和 XSS 的根本区别？

**CSRF：** 利用用户已登录的 Cookie，诱导用户访问恶意页面，在用户不知情时发起请求

```html
<!-- 恶意网站上的代码 -->
<img src="https://bank.com/transfer?to=hacker&amount=10000" />
```

**防御：**

1. **CSRF Token：** 服务端生成随机 token 嵌入表单/请求头，攻击者无法获取
2. **SameSite Cookie：** `SameSite=Strict/Lax` 限制跨站 Cookie 携带
3. **验证 Referer/Origin：** 检查请求来源
4. **双重 Cookie：** 将 token 同时放 Cookie 和请求参数，验证一致性

**与 XSS 的根本区别：**

- XSS：注入恶意**代码**，以用户身份在**同一站点**执行
- CSRF：利用用户**凭证**，以用户身份向**目标站点**发请求（无需代码注入）

---

### Q122. 说说 Vue3 的 `v-model` 在组件上的实现原理

**本质：** `v-model` 是 `modelValue` prop + `update:modelValue` 事件的语法糖

```html
<!-- 父组件 -->
<MyInput v-model="name" />
<!-- 等价于 -->
<MyInput :modelValue="name" @update:modelValue="name = $event" />

<!-- 多个 v-model（Vue3新特性）-->
<MyForm v-model:title="title" v-model:content="content" />
```

```vue
<!-- 子组件 MyInput.vue -->
<script setup>
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <input :value="modelValue" @input="emit('update:modelValue', $event.target.value)" />
</template>
```

> Vue2 的 `v-model` 只能绑定一个，Vue3 支持多个 `v-model:xxx`；另可通过 `defineModel()` 宏（Vue3.4+）简化

---

### Q123. 讲一下 HTTP 缓存机制（强缓存 + 协商缓存的完整流程）

```
请求发出
  ↓
检查强缓存（Cache-Control: max-age / Expires）
  ├── 未过期 → 直接使用本地缓存（200 from cache），不发请求
  └── 已过期 → 发请求，携带协商缓存标识
              ↓
        协商缓存验证
        ├── ETag → If-None-Match（精确，优先级高）
        └── Last-Modified → If-Modified-Since（时间精度1秒）
              ↓
        服务端比对
        ├── 未修改 → 304 Not Modified（只返回头，不返回体）
        └── 已修改 → 200 + 新资源
```

**常用配置：**

```http
# 强缓存（1年，适合带hash的静态资源）
Cache-Control: max-age=31536000, immutable

# 不缓存（适合 HTML 入口文件）
Cache-Control: no-cache  （每次都协商验证）
Cache-Control: no-store  （完全不缓存）
```

---

### Q124. 二叉树的层序遍历（BFS）用队列实现

```js
function levelOrder(root) {
  if (!root) return []
  const result = []
  const queue = [root]

  while (queue.length) {
    const levelSize = queue.length
    const level = []

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()
      level.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    result.push(level)
  }
  return result
}
```

> 变体题：Z字形层序遍历（奇数层正序、偶数层倒序），只需在偶数层时 `level.reverse()`

---

### Q125. 什么是 `requestIdleCallback`？和 `requestAnimationFrame` 如何配合？

**`requestIdleCallback`：** 在浏览器**空闲时间**执行低优先级任务，不阻塞渲染

```js
requestIdleCallback(
  deadline => {
    // deadline.timeRemaining() 返回当前帧剩余空闲时间(ms)
    while (deadline.timeRemaining() > 0 && tasks.length > 0) {
      doTask(tasks.shift())
    }
    // 还有任务，下次空闲继续
    if (tasks.length > 0) requestIdleCallback(processTask)
  },
  { timeout: 2000 }
) // 最长等待时间
```

**React Fiber 的类比实现：**

- React 用 `MessageChannel` + `postMessage` 模拟 `requestIdleCallback`（因为兼容性问题）
- 将渲染工作切分为**时间片（5ms）**，每帧空闲时执行，可中断

---

### Q126. 手写 `flat`、`reduce`、`map` 的 polyfill

```js
// Array.prototype.myReduce
Array.prototype.myReduce = function (fn, initialValue) {
  let acc = initialValue !== undefined ? initialValue : this[0]
  const start = initialValue !== undefined ? 0 : 1
  for (let i = start; i < this.length; i++) {
    acc = fn(acc, this[i], i, this)
  }
  return acc
}

// Array.prototype.myMap（基于 reduce）
Array.prototype.myMap = function (fn) {
  return this.myReduce((acc, val, i) => {
    acc.push(fn(val, i, this))
    return acc
  }, [])
}

// Array.prototype.myFlat
Array.prototype.myFlat = function (depth = 1) {
  return this.myReduce((acc, val) => {
    if (Array.isArray(val) && depth > 0) {
      acc.push(...val.myFlat(depth - 1))
    } else {
      acc.push(val)
    }
    return acc
  }, [])
}
```

---

### Q127. `Proxy` 可以拦截哪些操作？举3个实际应用场景

**13种拦截操作（常用）：**

```js
const handler = {
  get(target, key, receiver) {}, // 读取属性
  set(target, key, value, receiver) {}, // 设置属性
  has(target, key) {}, // in 操作符
  deleteProperty(target, key) {}, // delete 操作
  apply(target, thisArg, args) {}, // 函数调用
  construct(target, args) {}, // new 操作
  ownKeys(target) {}, // Object.keys 等
}
```

**实际场景：**

```js
// 1. 数据验证
const validator = new Proxy(
  {},
  {
    set(obj, prop, value) {
      if (prop === 'age' && typeof value !== 'number') throw TypeError('age must be number')
      obj[prop] = value
      return true
    },
  }
)

// 2. 实现私有属性（下划线开头不可访问）
const private = new Proxy(obj, {
  get(target, key) {
    if (key.startsWith('_')) throw Error('Access denied')
    return Reflect.get(target, key)
  },
})

// 3. 链式调用任意路径（Optional chaining 模拟）
function makeSafe(target) {
  return new Proxy(target ?? {}, {
    get(obj, key) {
      return makeSafe(obj[key])
    },
  })
}
```

---

### Q128. 什么是 `Object.freeze` vs `const` vs `readonly`（TS）？各自的作用范围？

```js
// const：变量绑定不可重新赋值，但对象内容可变
const obj = { a: 1 }
obj.a = 2 // ✅ 允许
obj = {} // ❌ 报错

// Object.freeze：浅冻结，对象自身属性不可修改/增删
Object.freeze(obj)
obj.a = 2 // ❌ 静默失败（严格模式报错）
obj.b = 3 // ❌ 静默失败
obj.nested.x = 1 // ✅ 嵌套对象仍可修改！（浅冻结）

// 深度冻结实现
function deepFreeze(obj) {
  Object.freeze(obj)
  Object.values(obj).forEach(v => v && typeof v === 'object' && deepFreeze(v))
  return obj
}
```

```ts
// TypeScript readonly：编译时检查，不影响运行时
interface Foo {
  readonly id: number
}
// Readonly<T> 工具类型将所有属性设为 readonly
```

---

### Q129. 什么是 CSS `contain` 属性？如何用它优化性能？

**`contain`：** 告知浏览器元素的渲染独立于文档其他部分，可跳过不必要的重排/重绘

```css
.widget {
  contain: layout; /* 布局隔离：内部布局不影响外部 */
  contain: paint; /* 绘制隔离：内部绘制不超出边界 */
  contain: size; /* 尺寸隔离：不依赖内容决定大小 */
  contain: strict; /* = size + layout + paint */
  contain: content; /* = layout + paint（最常用） */
}
```

**实际价值：**

- 虚拟列表的列表项：`contain: strict` → 修改一项不触发整个列表回流
- 独立 Widget：`contain: content` → 内部状态变化不影响页面其他部分
- 配合 `content-visibility: auto` 实现**视口外内容懒渲染**

---

### Q130. 用一道题串联：实现 `compose` 函数（函数式编程核心）

```js
// compose(f, g, h)(x) === f(g(h(x)))
// 从右往左执行

function compose(...fns) {
  if (fns.length === 0) return x => x
  if (fns.length === 1) return fns[0]
  return fns.reduce(
    (f, g) =>
      (...args) =>
        f(g(...args))
  )
}

// 从左往右执行的版本：pipe
const pipe = (...fns) =>
  fns.reduce(
    (f, g) =>
      (...args) =>
        g(f(...args))
  )

// 使用示例
const add1 = x => x + 1
const double = x => x * 2
const square = x => x * x

const transform = compose(square, double, add1)
transform(3) // square(double(add1(3))) = square(double(4)) = square(8) = 64
```

> 这道题考察：函数式编程思想、高阶函数、`reduce` 深度理解、闭包；在 Redux 中间件、工具链（webpack loader）中大量使用

---

## 二十四、综合深挖 + 场景题

---

### Q131. `String.prototype.slice` vs `substring` vs `substr` 区别，各有什么陷阱？

| 方法                    | 参数           | 负数处理       | 说明                       |
| ----------------------- | -------------- | -------------- | -------------------------- |
| `slice(start, end)`     | 起始、结束索引 | 从末尾倒数     | 推荐使用                   |
| `substring(start, end)` | 起始、结束索引 | 负数当 0 处理  | 参数会自动排序（小的在前） |
| `substr(start, len)`    | 起始索引、长度 | 起始负数从末尾 | 已废弃，避免使用           |

```js
const s = 'abcdef'
s.slice(2, -1) // 'cde'（-1 从末尾数）
s.substring(2, -1) // 'ab'（-1 变 0，等同 substring(0,2)）
s.substr(-3, 2) // 'de'（从倒数第3位取2个）

// 常见陷阱
s.substring(3, 1) // 'bc'（自动交换参数顺序）
s.slice(3, 1) // ''（不交换，结果为空）
```

---

### Q132. 以下代码输出什么？（变量提升 + 函数提升优先级）

```js
console.log(typeof foo)
var foo = 1
function foo() {}
console.log(typeof foo)
```

**答案：`'function'`, `'number'`**

**原因：**

- 编译阶段：**函数声明优先于变量声明**被提升
- 执行阶段：`foo = 1` 覆盖了函数

```js
// 实际执行顺序（引擎视角）
function foo() {} // 函数提升（优先级更高）
var foo // 变量声明（忽略，已存在）
console.log(typeof foo) // 'function'
foo = 1 // 赋值覆盖
console.log(typeof foo) // 'number'
```

> 陷阱：若使用 `let/const` 则进入 TDZ，`typeof` 也会抛出 `ReferenceError`

---

### Q133. 实现 `Object.assign` 的 polyfill，并说明它是深拷贝还是浅拷贝？

```js
Object.myAssign = function (target, ...sources) {
  if (target == null) throw new TypeError('Cannot convert undefined or null to object')
  const to = Object(target)
  for (const source of sources) {
    if (source == null) continue // 忽略 null/undefined 源
    // 只复制自身可枚举属性（不含 Symbol）
    for (const key of Object.keys(source)) {
      to[key] = source[key]
    }
    // 注意：原生 Object.assign 也复制 Symbol 键
    for (const sym of Object.getOwnPropertySymbols(source)) {
      if (Object.prototype.propertyIsEnumerable.call(source, sym)) {
        to[sym] = source[sym]
      }
    }
  }
  return to
}
```

**是浅拷贝：** 只复制属性引用，嵌套对象仍共享引用

```js
const a = { nested: { x: 1 } }
const b = Object.assign({}, a)
b.nested.x = 99
console.log(a.nested.x) // 99（共享引用）
```

---

### Q134. Vue3 的 `keep-alive` 工作原理？`activated/deactivated` 什么时候触发？

**原理：**

1. `KeepAlive` 是一个内置组件，包裹动态组件
2. 内部维护一个 **`Map` 缓存**（key → vnode）和 **`Set` 记录已缓存的 key**
3. 组件卸载时不销毁，而是将 DOM 移入**内存中的容器**（`_vei` 持有引用）
4. 再次激活时从缓存取出 vnode，移回真实 DOM

```html
<KeepAlive :include="['Home', 'About']" :max="10">
  <component :is="currentComponent" />
</KeepAlive>
```

**生命周期触发时机：**

- `activated`：组件从缓存中被激活（首次挂载也触发）
- `deactivated`：组件被缓存（切走时，不是真正销毁）

> LRU 策略：超过 `max` 时，删除最久未使用的缓存

---

### Q135. `GET` 和 `POST` 的区别？只是语义不同吗？

**语义差异（HTTP规范）：**

- GET：幂等、可缓存、参数在 URL
- POST：非幂等、不缓存、参数在 Body

**实际技术差异：**

| 对比       | GET                              | POST                  |
| ---------- | -------------------------------- | --------------------- |
| 浏览器缓存 | 默认会缓存                       | 默认不缓存            |
| 历史记录   | 参数保存在历史                   | 不保存                |
| URL长度    | 受浏览器/服务器限制（约2KB-8KB） | Body无理论上限        |
| 编码类型   | ASCII                            | 支持二进制            |
| 两次请求?  | 否                               | 部分场景 OPTIONS 预检 |
| 幂等性     | ✅                               | ❌                    |

> 陷阱：GET 可以有 Body（HTTP规范没禁止），POST 也可以把参数放 URL；这些都是**约定俗成**，不是技术硬限制

---

### Q136. CSS `flex: 1` 是什么的缩写？各参数有什么陷阱？

```css
flex: 1;
/* 等价于 */
flex-grow: 1; /* 剩余空间分配比例 */
flex-shrink: 1; /* 空间不足时收缩比例 */
flex-basis: 0%; /* 基础尺寸（注意！不是 auto）*/
```

**陷阱：`flex-basis: 0%` vs `auto`**

```css
flex: 1; /* flex-basis: 0%，元素从0开始按比例分配全部空间 */
flex: auto; /* flex-basis: auto，先按内容占空间，剩余再按比例分配 */
flex: none; /* flex: 0 0 auto，完全不伸缩 */
```

```css
/* 常见面试陷阱：两列布局 */
.left {
  flex: 0 0 200px;
} /* 固定宽度 */
.right {
  flex: 1;
} /* 占满剩余 */
```

---

### Q137. 什么是 `Service Worker`？PWA 离线缓存如何实现？

**Service Worker：** 独立于页面的后台线程，可拦截网络请求、推送通知、后台同步

```js
// sw.js - Service Worker 生命周期
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => cache.addAll(['/index.html', '/app.js', '/style.css']))
  )
})

self.addEventListener('activate', event => {
  // 清除旧版本缓存
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== 'v1').map(k => caches.delete(k))))
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    // Cache First 策略：先走缓存，没有再请求网络
    caches.match(event.request).then(cached => cached || fetch(event.request))
  )
})
```

**注册：**

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}
```

---

### Q138. 实现一个带取消功能的请求封装（AbortController）

```js
class CancelableRequest {
  constructor() {
    this.controllers = new Map()
  }

  request(url, key) {
    // 取消同key的上一次请求（如搜索防抖）
    if (this.controllers.has(key)) {
      this.controllers.get(key).abort()
    }

    const controller = new AbortController()
    this.controllers.set(key, controller)

    return fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('Request canceled')
          return null
        }
        throw err
      })
      .finally(() => this.controllers.delete(key))
  }

  cancelAll() {
    this.controllers.forEach(c => c.abort())
    this.controllers.clear()
  }
}
```

---

### Q139. 什么是 JavaScript 的「原型污染」攻击？如何防御？

**攻击原理：** 通过修改 `Object.prototype`，影响所有对象

```js
// 攻击示例（通常来自不安全的 merge/assign）
function merge(target, source) {
  for (const key in source) {
    target[key] = source[key] // 危险！
  }
}

const malicious = JSON.parse('{"__proto__":{"isAdmin":true}}')
merge({}, malicious)

// 所有对象都被污染！
console.log({}.isAdmin) // true
```

**防御方案：**

```js
// 1. 使用 Object.create(null)（无原型）
const safe = Object.create(null)

// 2. 检查键名
function safeMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue
    target[key] = source[key]
  }
}

// 3. 使用 Map 替代对象作为字典
// 4. 使用 JSON.parse 的 reviver 过滤危险键
```

---

### Q140. `v-for` 中 `key` 的作用？不加 `key` 会怎样？用 `index` 作为 `key` 的问题？

**`key` 的作用：** Vue Diff 算法的**身份标识符**，用于节点复用和最小化 DOM 操作

**不加 key：** 默认使用"就地复用"策略，按顺序更新，可能导致：

- 状态错乱（input 框内容不跟着元素移动）
- 动画失效
- 性能下降

**用 index 作为 key 的问题（删除/插入中间元素）：**

```
初始：[A(0), B(1), C(2)]
删除A后：[B(0), C(1)]

// Vue 认为 key=0 的元素还在，只是内容从A变成了B
// 实际应该复用 B，但 Vue 会更新 key=0 的 DOM 节点内容
// 导致：组件 unmount/remount，状态（如输入框）丢失
```

**正确做法：** 使用数据中唯一的、稳定的 `id`

---

### Q141. JavaScript 的垃圾回收机制，V8 如何实现分代回收？

**标记清除（主要算法）：**

1. 从 GC Roots（全局对象、栈变量）出发，标记所有可达对象
2. 清除未标记对象，回收内存

**V8 分代回收：**

```
堆内存
├── 新生代（Young Generation，1-8MB）← 短命对象
│   ├── From 空间（使用中）
│   └── To 空间（空闲）
│   算法：Scavenge（复制算法）
│   触发：对象在两次 GC 中存活 → 晋升到老生代
│
└── 老生代（Old Generation，数百MB）← 长命对象
    算法：标记清除 + 标记整理（压缩内存碎片）
    触发：老生代空间不足
```

> 增量标记（Incremental Marking）：将标记过程分多个小步执行，避免长时间暂停（Stop-The-World）

---

### Q142. 实现 `setTimeout` 的精确执行（解决定时器漂移问题）

```js
// 普通定时器会累积误差
function accurateInterval(fn, interval) {
  let expected = Date.now() + interval

  function tick() {
    const drift = Date.now() - expected
    fn()
    expected += interval
    // 下次执行时间减去已经漂移的时间
    setTimeout(tick, Math.max(0, interval - drift))
  }

  setTimeout(tick, interval)
}

// 使用
accurateInterval(() => console.log(Date.now()), 1000)
```

> 生产场景：WebSocket 心跳、倒计时组件都需要此技巧；还可配合 `Worker` + `MessageChannel` 规避页面后台 throttling

---

### Q143. TypeScript 中 `any`、`unknown`、`never`、`void` 的区别？

| 类型      | 含义                     | 能赋值给其他类型?    | 使用前需断言? |
| --------- | ------------------------ | -------------------- | ------------- |
| `any`     | 任意类型，绕过类型检查   | ✅（危险）           | ❌            |
| `unknown` | 未知类型，安全的 any     | ❌（需先断言/缩窄）  | ✅            |
| `never`   | 不可能的类型（永不返回） | ✅（赋值给任何类型） | —             |
| `void`    | 无返回值（undefined）    | 只能赋值给 undefined | —             |

```ts
// unknown 的正确用法
function process(val: unknown) {
  if (typeof val === 'string') val.toUpperCase() // 类型收窄后安全使用
}

// never 的实际用法：穷举检查
type Shape = 'circle' | 'square'
function getArea(shape: Shape) {
  if (shape === 'circle') return Math.PI
  if (shape === 'square') return 1
  const _exhaustive: never = shape // 如果 Shape 新增类型却没处理，这里报错
}
```

---

### Q144. 实现一个简单的 EventEmitter（发布订阅模式）

```js
class EventEmitter {
  constructor() {
    this.events = new Map()
  }

  on(event, listener) {
    if (!this.events.has(event)) this.events.set(event, [])
    this.events.get(event).push(listener)
    return this // 支持链式调用
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args)
      this.off(event, wrapper)
    }
    wrapper._original = listener // 便于 off 时识别
    return this.on(event, wrapper)
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return false
    this.events.get(event).forEach(fn => fn(...args))
    return true
  }

  off(event, listener) {
    if (!this.events.has(event)) return this
    const listeners = this.events
      .get(event)
      .filter(fn => fn !== listener && fn._original !== listener)
    this.events.set(event, listeners)
    return this
  }
}
```

---

### Q145. 浏览器的 `重排（Reflow）` 和 `重绘（Repaint）` 哪些操作会触发？

**触发重排（更昂贵，必然触发重绘）：**

- 读取布局属性：`offsetWidth/Height`、`clientWidth`、`getBoundingClientRect()`、`scrollTop`
- 修改几何属性：width/height/margin/padding/border/position/font-size
- DOM 增删、窗口 resize、字体变化

**只触发重绘（较便宜）：**

- `color`、`background-color`、`visibility`、`outline`

**不触发重排重绘（最优）：**

- `transform`、`opacity`（走合成层，GPU 处理）

**优化技巧：**

```js
// 批量读写分离（避免强制同步布局）
// 坏：交替读写
el.style.width = el.offsetWidth + 10 + 'px' // 强制刷新
el.style.height = el.offsetHeight + 10 + 'px'

// 好：先读后写
const w = el.offsetWidth
const h = el.offsetHeight
el.style.cssText = `width:${w + 10}px;height:${h + 10}px`
```

---

### Q146. 实现链表反转（迭代 + 递归两种方式）

```js
// 迭代版本（O(n) 时间，O(1) 空间）
function reverseList(head) {
  let prev = null,
    curr = head
  while (curr) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  return prev
}

// 递归版本（O(n) 时间，O(n) 栈空间）
function reverseList(head) {
  if (!head || !head.next) return head
  const newHead = reverseList(head.next)
  head.next.next = head
  head.next = null
  return newHead
}
```

> 变体：反转链表的前 K 个节点 / 每 K 个一组反转

---

### Q147. Vue3 中如何正确处理组件间的大量状态共享？各方案优缺点？

| 方案                | 适合场景     | 缺点                                   |
| ------------------- | ------------ | -------------------------------------- |
| `props/emit`        | 父子组件     | 超过3层很繁琐                          |
| `provide/inject`    | 跨层祖孙     | 非响应式（需手动传 ref）               |
| `Pinia`             | 全局状态     | 需引入库，小项目重                     |
| `useXxx` composable | 模块状态共享 | 状态在每次调用处独立（除非模块级单例） |
| `mitt` 事件总线     | 任意组件通信 | 不易追踪，调试困难                     |

**Composable 全局单例模式：**

```ts
// useUser.ts（模块级单例）
const user = ref(null) // 模块级变量，所有调用者共享

export function useUser() {
  async function fetchUser() {
    user.value = await api.getUser()
  }
  return { user, fetchUser }
}
```

---

### Q148. `Object.keys` vs `Object.getOwnPropertyNames` vs `Reflect.ownKeys` 的区别？

```js
const obj = Object.create({ inherited: true });
Object.defineProperty(obj, 'nonEnum', { value: 1, enumerable: false });
obj[Symbol('sym')] = 2;
obj.normal = 3;

Object.keys(obj)                    // ['normal']（自身可枚举字符串键）
Object.getOwnPropertyNames(obj)     // ['nonEnum', 'normal']（自身所有字符串键，含不可枚举）
Reflect.ownKeys(obj)                // ['nonEnum', 'normal', Symbol(sym)]（自身所有键，含Symbol）
for...in(obj)                       // 'normal', 'inherited'（可枚举，含原型链）
```

---

### Q149. 什么是 `CORS` 预检请求（OPTIONS）？哪些请求会触发？

**简单请求（不触发预检）的条件（必须全部满足）：**

- 方法：GET / POST / HEAD
- 请求头：只含 `Accept`、`Content-Type`（值限于 form 类型）等安全头
- `Content-Type`：`text/plain` / `multipart/form-data` / `application/x-www-form-urlencoded`

**触发预检的情况：**

```
- 方法为 PUT / DELETE / PATCH
- Content-Type: application/json
- 自定义请求头：Authorization、X-Token 等
```

**预检流程：**

```
浏览器发 OPTIONS 请求
  → 服务端返回 Access-Control-Allow-* 头
  → 浏览器验证通过 → 发真实请求
  → 服务端处理并返回 Access-Control-Allow-Origin
```

> 优化：服务端设置 `Access-Control-Max-Age: 86400`，缓存预检结果，避免每次都发 OPTIONS

---

### Q150. 实现 `useDebounce` 和 `useThrottle` Vue3 Composable

```ts
// useDebounce.ts
import { ref, watch } from 'vue'

export function useDebounce<T>(value: Ref<T>, delay: number): Ref<T> {
  const debouncedValue = ref<T>(value.value) as Ref<T>
  let timer: ReturnType<typeof setTimeout>

  watch(value, newVal => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      debouncedValue.value = newVal
    }, delay)
  })

  onUnmounted(() => clearTimeout(timer))
  return debouncedValue
}

// useThrottle.ts
export function useThrottle<T extends (...args: any[]) => any>(fn: T, interval: number): T {
  let last = 0
  return ((...args: any[]) => {
    const now = Date.now()
    if (now - last >= interval) {
      last = now
      return fn(...args)
    }
  }) as T
}
```

---

### Q151. V8 引擎的 JIT 编译是如何工作的？什么是「隐藏类（Hidden Class）」？

**JIT（Just-In-Time）编译流程：**

```
JS源码 → 解析器(Parser) → AST
→ Ignition(解释器) → 字节码（快速启动）
→ TurboFan(优化编译器) → 机器码（热点代码，基于类型假设优化）
→ 反优化(Deoptimize)（当类型假设失败时，退回字节码）
```

**隐藏类（Hidden Class）优化：**

```js
// 好：属性按固定顺序添加，共享隐藏类
function Point(x, y) {
  this.x = x
  this.y = y
}
const p1 = new Point(1, 2)
const p2 = new Point(3, 4) // 与 p1 共享隐藏类，属性访问极快

// 坏：属性顺序不同，各自创建隐藏类
const a = {}
a.x = 1
a.y = 2 // HiddenClass A
const b = {}
b.y = 1
b.x = 2 // HiddenClass B（不同！）
```

---

### Q152. 以下代码中，`console.log` 输出什么？（Generator 执行流程）

```js
function* gen() {
  const x = yield 1
  const y = yield x + 10
  return x + y
}

const g = gen()
console.log(g.next()) // ?
console.log(g.next(5)) // ?
console.log(g.next(20)) // ?
```

**答案：**

```js
{ value: 1, done: false }   // yield 1 暂停，返回 1
{ value: 15, done: false }  // next(5) 将 5 传给 x，x=5，yield 5+10=15
{ value: 25, done: true }   // next(20) 将 20 传给 y，y=20，return 5+20=25
```

> 关键：`next(val)` 的参数是**上一个 `yield` 的返回值**，第一次调用 `next()` 的参数被忽略

---

### Q153. CSS 动画：`transition` vs `animation` vs `Web Animations API`

| 对比     | transition                     | animation(@keyframes) | Web Animations API         |
| -------- | ------------------------------ | --------------------- | -------------------------- |
| 触发方式 | 状态变化时                     | 自动/手动             | JS控制                     |
| 复杂程度 | 简单（A→B）                    | 多关键帧              | 任意复杂度                 |
| JS控制   | 有限                           | 有限                  | 完全控制（暂停/反转/速率） |
| 性能     | 好（GPU加速transform/opacity） | 好                    | 好                         |

```js
// Web Animations API
const anim = el.animate(
  [
    { transform: 'translateX(0)', opacity: 1 },
    { transform: 'translateX(100px)', opacity: 0 },
  ],
  {
    duration: 500,
    easing: 'ease-out',
    fill: 'forwards',
  }
)

// 完全控制
anim.pause()
anim.currentTime = 250
anim.playbackRate = 2
anim.reverse()
anim.cancel()
```

---

### Q154. 什么是「幽灵依赖（Phantom Dependency）」？pnpm 如何解决？

**幽灵依赖：** 项目代码中引用了**未在 `package.json` 声明**的依赖（这些依赖是其他包的依赖，被 npm/yarn 提升到 `node_modules` 顶层）

```
// npm 平铺结构：A 依赖 B，B 被提升到顶层
node_modules/
  ├── A/
  └── B/  ← 未声明，但可直接 require('B')

// 风险：B 升级/删除后，代码报错
```

**pnpm 的解决方案：**

- 使用**符号链接（symlink）**，`node_modules` 只有直接依赖的软链
- 实际文件存储在全局 `store` 中，硬链接复用
- 无法访问未声明的依赖（报 `Cannot find module`）

---

### Q155. 手写一个函数判断两个对象是否深度相等

```js
function deepEqual(a, b) {
  // 基本类型 或 引用相同
  if (a === b) return true

  // 类型不同
  if (typeof a !== typeof b) return false

  // null 检查
  if (a === null || b === null) return false

  // 处理特殊类型
  if (a instanceof Date) return a.getTime() === b.getTime()
  if (a instanceof RegExp) return a.toString() === b.toString()

  // 数组/对象
  if (typeof a !== 'object') return false

  const keysA = Reflect.ownKeys(a)
  const keysB = Reflect.ownKeys(b)

  if (keysA.length !== keysB.length) return false

  return keysA.every(key => deepEqual(a[key], b[key]))
}
```

---

### Q156. Vue3 的 `defineComponent` 有什么用？不用它行吗？

**主要作用：TypeScript 类型推断辅助**

```ts
// 不用 defineComponent：TS 无法正确推断 this 类型
export default {
  methods: {
    greet() { this.msg.toUpperCase() } // this 类型不明确
  }
}

// 用 defineComponent：TS 正确推断
export default defineComponent({
  props: { msg: String },
  methods: {
    greet() { this.msg?.toUpperCase() } // TS 知道 msg 是 string | undefined
  }
})

// Script Setup（推荐）：不需要 defineComponent，TS 天然支持
<script setup lang="ts">
const props = defineProps<{ msg: string }>()
</script>
```

> 运行时：`defineComponent` 本质上直接返回传入的对象，**没有任何运行时开销**

---

### Q157. 动态规划经典题：爬楼梯 / 背包问题 的思路

**爬楼梯（n阶，每次1或2步）：**

```js
function climbStairs(n) {
  // dp[i] = 到达第i阶的方法数
  // dp[i] = dp[i-1] + dp[i-2]（从i-1迈1步 或 从i-2迈2步）
  if (n <= 2) return n
  let [a, b] = [1, 2]
  for (let i = 3; i <= n; i++) [a, b] = [b, a + b]
  return b
}
// 本质：斐波那契数列
```

**0/1 背包（不可重复选）：**

```js
function knapsack(weights, values, capacity) {
  const n = weights.length
  // dp[i][w] = 前i个物品，容量w时的最大价值
  const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0))

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i - 1][w] // 不选第i个
      if (w >= weights[i - 1]) {
        // 选第i个
        dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1])
      }
    }
  }
  return dp[n][capacity]
}
```

---

### Q158. `Vite` 为什么开发时比 Webpack 快？生产环境为何还用 Rollup 打包？

**开发时快的原因：**

| 对比       | Webpack            | Vite                                    |
| ---------- | ------------------ | --------------------------------------- |
| 启动方式   | 打包所有模块再启动 | 直接启动，按需编译                      |
| 模块系统   | 自定义 require     | 原生 ESM（浏览器负责依赖解析）          |
| 依赖预构建 | 每次重新分析       | esbuild 预构建（Go编写，比JS快10-100x） |
| HMR 范围   | 失效模块链路长     | 只更新变更模块（ESM精确边界）           |

**生产用 Rollup 的原因：**

- 原生 ESM 在生产环境请求太多（每个模块一个请求）
- Rollup 对 Tree-shaking、代码分割、输出格式支持更成熟
- 未来 Vite 可能用 Rolldown（Rollup 的 Rust 重写版）统一开发/生产

---

### Q159. 实现一个简单的模板引擎（字符串插值 + 条件判断）

```js
function template(tpl, data) {
  return (
    tpl
      // 处理 if 语句
      .replace(/\{\{#if\s+(.+?)\}\}([\s\S]*?)\{\{\/if\}\}/g, (_, cond, content) => {
        return new Function('data', `with(data){ return ${cond}; }`)(data) ? content : ''
      })
      // 处理变量插值
      .replace(/\{\{(.+?)\}\}/g, (_, expr) => {
        try {
          return new Function('data', `with(data){ return ${expr.trim()}; }`)(data) ?? ''
        } catch {
          return ''
        }
      })
  )
}

// 使用
const result = template('Hello {{name}}! {{#if age > 18}}Adult{{/if}}', { name: 'Alice', age: 20 })
// 'Hello Alice! Adult'
```

---

### Q160. 说说前端监控系统的完整架构设计（错误监控 + 性能监控 + 用户行为）

**数据采集层：**

```js
// 1. JS错误监控
window.addEventListener('error', e => { /* 同步错误、资源加载错误 */ });
window.addEventListener('unhandledrejection', e => { /* Promise错误 */ });

// 2. 性能指标
new PerformanceObserver(list => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === 'largest-contentful-paint') // LCP
    if (entry.entryType === 'layout-shift') // CLS
    if (entry.entryType === 'first-input') // FID/INP
  }
}).observe({ entryTypes: ['largest-contentful-paint', 'layout-shift', 'first-input'] });

// 3. 用户行为
// 路由变化、点击埋点、曝光埋点（IntersectionObserver）
```

**数据上报：**

```js
// 推荐：sendBeacon（页面关闭时不丢数据）
navigator.sendBeacon('/monitor', JSON.stringify(data))
// 备选：1x1 gif（兼容性好，不跨域）
new Image().src = `/monitor.gif?data=${encodeURIComponent(JSON.stringify(data))}`
```

**架构流程：**

```
采集SDK → 数据聚合（本地合并，减少请求）→ 上报服务器
→ 消息队列（Kafka）→ 流式处理（Flink）→ 存储（ClickHouse）
→ 告警系统（阈值触发）→ 可视化大盘（Grafana）
```

---

## 二十五、终极深挖

---

### Q161. 手写 `Promise.allSettled` 和 `Promise.any`，说明与 `all/race` 的区别

```js
// allSettled：等所有 Promise 完成（无论成功/失败），永不 reject
Promise.myAllSettled = function (promises) {
  return Promise.all(
    promises.map(p =>
      Promise.resolve(p).then(
        value => ({ status: 'fulfilled', value }),
        reason => ({ status: 'rejected', reason })
      )
    )
  )
}

// any：任意一个 fulfilled 就 resolve；全部 rejected 才 reject
Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    let rejectedCount = 0
    const errors = []
    promises.forEach((p, i) => {
      Promise.resolve(p).then(resolve, err => {
        errors[i] = err
        if (++rejectedCount === promises.length) {
          reject(new AggregateError(errors, 'All promises were rejected'))
        }
      })
    })
  })
}
```

| 方法         | 成功条件                 | 失败条件          |
| ------------ | ------------------------ | ----------------- |
| `all`        | 全部 fulfilled           | 任一 rejected     |
| `race`       | 任一 settled（最快）     | 最快的是 rejected |
| `allSettled` | 全部 settled（永不失败） | —                 |
| `any`        | 任一 fulfilled           | 全部 rejected     |

---

### Q162. `Proxy` 的 `get` 陷阱中，为什么要用 `Reflect.get` 而不是直接 `target[key]`？

```js
const handler = {
  get(target, key, receiver) {
    // 错误写法
    return target[key] // ❌ 若 target 有 getter，this 指向 target 而非代理

    // 正确写法
    return Reflect.get(target, key, receiver) // ✅ receiver 保持正确的 this
  },
}

// 反例：this 指向问题
const parent = {
  get foo() {
    return this.bar
  },
}
const child = { bar: 'child-bar' }
Object.setPrototypeOf(child, parent)

const proxy = new Proxy(child, {
  get(target, key, receiver) {
    return target[key] // 访问 foo 时，this 是 child，不是 proxy
  },
})
// Reflect.get(target, key, receiver) 中 receiver 是 proxy，this 正确传递
```

> `Reflect` 是所有 `Proxy` 陷阱的镜像 API，确保默认行为正确执行

---

### Q163. 什么是 `WeakRef` 和 `FinalizationRegistry`？实际使用场景？

```js
// WeakRef：弱引用，不阻止 GC 回收对象
let obj = { name: 'heavy object' }
const ref = new WeakRef(obj)

obj = null // 允许 GC 回收

// 使用时需判断是否还存活
const value = ref.deref()
if (value) {
  console.log(value.name)
} else {
  console.log('已被GC回收')
}

// FinalizationRegistry：对象被 GC 后执行回调
const registry = new FinalizationRegistry(heldValue => {
  console.log(`${heldValue} 已被回收，清理相关资源`)
})

let target = { data: '...' }
registry.register(target, 'target-object') // 注册，GC后触发回调
target = null
```

**实际场景：** 缓存系统（允许缓存被 GC 释放）、DOM 节点关联数据、避免内存泄漏的订阅管理

---

### Q164. 以下代码输出什么？（`this` 绑定优先级）

```js
function foo() {
  console.log(this.a)
}
const obj1 = { a: 1, foo }
const obj2 = { a: 2, foo }

obj1.foo() // ?
obj1.foo.call(obj2) // ?
const bar = new obj1.foo() // ?
const baz = foo.bind(obj1)
baz.call(obj2) // ?
```

**答案：** `1` / `2` / `undefined` / `1`

**`this` 绑定优先级（从高到低）：**

1. `new` 绑定（创建新对象）
2. `call/apply/bind` 显式绑定
3. 对象方法调用（隐式绑定）
4. 默认绑定（全局/undefined）

> `new` 调用时：`this.a` 未定义（新对象上没有 `a`），输出 `undefined`；`bind` 后无法被 `call` 覆盖

---

### Q165. 解释 Vue3 编译器（compiler）的工作流程：template → render function

```
Template 字符串
    ↓ parse（解析）
AST（抽象语法树，描述模板结构）
    ↓ transform（转换）
  - 静态提升（hoistStatic）：纯静态节点提取到 render 外
  - 补丁标志（patchFlag）：标记动态部分（TEXT/CLASS/PROPS等）
  - 块追踪（Block tree）：只追踪动态节点，跳过静态
    ↓ generate（代码生成）
render 函数（JavaScript 代码字符串）
    ↓ 运行时执行
VNode 树
```

**编译优化示例：**

```html
<!-- 模板 -->
<div class="static">{{ msg }}</div>

<!-- 编译后（简化） -->
import { createElementVNode as _c, toDisplayString as _s, openBlock as _o } from 'vue' const
_hoisted = _c("div", { class: "static" }) // 静态节点提升 export function render(_ctx) { return
(_o(), _c("div", { class: "static" }, _s(_ctx.msg), /* TEXT patchFlag */)) }
```

---

### Q166. 什么是「时间切片（Time Slicing）」？如何用 JS 实现？

**问题：** 大量 JS 计算阻塞主线程，导致页面卡顿（超过 16ms 就会掉帧）

**时间切片：** 将长任务分割为多个小任务，每帧只执行一部分

```js
async function timeSlice(tasks, chunkTime = 16) {
  const start = performance.now()

  for (let i = 0; i < tasks.length; i++) {
    tasks[i]() // 执行任务

    // 每帧最多执行 16ms，超过就让出主线程
    if (performance.now() - start > chunkTime) {
      await new Promise(resolve => setTimeout(resolve, 0)) // 让出主线程
      // 或使用：await scheduler.yield()（Chrome 115+）
    }
  }
}

// React Fiber 的实现：5ms 时间片 + MessageChannel
const channel = new MessageChannel()
channel.port2.onmessage = workLoop // 每次 message 事件执行一小段工作
function scheduleWork() {
  channel.port1.postMessage(null)
}
```

---

### Q167. TypeScript 条件类型分发（Distributive Conditional Types）陷阱

```ts
type IsString<T> = T extends string ? 'yes' : 'no'

// 联合类型触发分发
type A = IsString<string | number> // 'yes' | 'no'（分发！）
// 等价于 IsString<string> | IsString<number> = 'yes' | 'no'

// 阻止分发：将 T 包裹在元组中
type IsStringExact<T> = [T] extends [string] ? 'yes' : 'no'
type B = IsStringExact<string | number> // 'no'（不分发，整体判断）

// 实用场景：过滤联合类型
type NonNullable<T> = T extends null | undefined ? never : T
type C = NonNullable<string | null | undefined> // string（null/undefined 被 never 过滤）
```

---

### Q168. 浏览器的 `IntersectionObserver` API 实现图片懒加载的原理

```js
// 传统方式：监听 scroll，计算 getBoundingClientRect（触发回流！）
// IntersectionObserver：异步观察，不触发回流

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src // 赋值真实src
        img.classList.remove('lazy')
        observer.unobserve(img) // 加载后停止观察
      }
    })
  },
  {
    root: null, // 视口作为容器
    rootMargin: '100px', // 提前100px开始加载
    threshold: 0.1, // 10%可见时触发
  }
)

document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img))
```

> 对比 `MutationObserver`（观察 DOM 变化）和 `ResizeObserver`（观察尺寸变化），三者都是异步非阻塞

---

### Q169. CSS `@layer` 层叠层是什么？解决什么问题？

**问题：** 第三方库样式和业务样式的优先级冲突，通常靠增加选择器权重解决（越来越臃肿）

**`@layer` 解决方案：** 明确声明样式层的优先级顺序，后声明的层优先级更高

```css
/* 声明层的优先级顺序（后者覆盖前者） */
@layer reset, base, components, utilities;

@layer reset {
  * {
    box-sizing: border-box;
  }
}
@layer base {
  a {
    color: blue;
  }
}
@layer utilities {
  .text-red {
    color: red;
  } /* 最高优先级，无论选择器权重 */
}

/* 无层的样式比所有层的优先级都高 */
a {
  color: green;
} /* 覆盖所有 @layer 中的 a 样式 */
```

---

### Q170. 手写快速排序，并分析最坏情况和优化方案

```js
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return
  const pivotIndex = partition(arr, left, right)
  quickSort(arr, left, pivotIndex - 1)
  quickSort(arr, pivotIndex + 1, right)
}

function partition(arr, left, right) {
  // 随机选择基准（优化：避免有序数组的 O(n²) 最坏情况）
  const randIndex = left + Math.floor(Math.random() * (right - left + 1))
  ;[arr[randIndex], arr[right]] = [arr[right], arr[randIndex]]

  const pivot = arr[right]
  let i = left - 1

  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      i++
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
  }
  ;[arr[i + 1], arr[right]] = [arr[right], arr[i + 1]]
  return i + 1
}
```

| 情况      | 时间复杂度      | 触发条件                    |
| --------- | --------------- | --------------------------- |
| 最优/平均 | O(n log n)      | 基准每次均分                |
| 最坏      | O(n²)           | 已排序数组 + 固定选末尾基准 |
| 优化      | O(n log n) 均摊 | 随机基准 / 三数取中         |

---

### Q171. HTTP 的 `keep-alive` 是什么？和 HTTP/2 多路复用有何本质区别？

**HTTP/1.1 keep-alive（持久连接）：**

- 同一 TCP 连接上**串行**发送多个请求
- 解决了频繁建立 TCP 连接的开销
- 但仍存在**队头阻塞**：前一个请求未响应，后续请求必须等待

**HTTP/2 多路复用：**

- 同一 TCP 连接上**并行**发送多个请求（通过帧/流机制）
- 每个请求是独立的"流"，互不阻塞
- 仍有 **TCP 层的队头阻塞**（一个包丢失，所有流都等）

```
HTTP/1.1 keep-alive：
TCP连接: [req1] → [res1] → [req2] → [res2]  （串行）

HTTP/2 多路复用：
TCP连接: [req1帧][req2帧][req3帧] → [res2帧][res1帧][res3帧]  （并行，乱序）
```

---

### Q172. 实现 `flat` 的迭代版本（不用递归，支持任意深度）

```js
function flatDeep(arr) {
  const stack = [...arr]
  const result = []

  while (stack.length) {
    const item = stack.pop()
    if (Array.isArray(item)) {
      // 展开推入栈（注意顺序，用 push+reverse 或 unshift）
      stack.push(...item)
    } else {
      result.unshift(item) // 从头插入保持顺序
    }
  }
  return result
}

// 更高效版本（避免 unshift 的 O(n) 开销）
function flatDeepV2(arr) {
  const stack = [...arr]
  const result = []
  while (stack.length) {
    const item = stack.pop()
    Array.isArray(item) ? stack.push(...item) : result.push(item)
  }
  return result.reverse()
}
```

---

### Q173. Vue3 的 `watchEffect` vs `watch` 详细对比，各自适用场景？

```ts
// watchEffect：自动追踪依赖，立即执行
watchEffect(() => {
  console.log(count.value, name.value) // 自动追踪 count 和 name
})

// watch：显式指定依赖，懒执行（默认），可获取新旧值
watch(
  [count, name], // 监听源（可以是函数）
  ([newCount, newName], [oldCount, oldName]) => {
    console.log('变化了')
  },
  { immediate: true, deep: true }
)
```

| 对比     | watchEffect              | watch                  |
| -------- | ------------------------ | ---------------------- |
| 依赖追踪 | 自动                     | 手动指定               |
| 执行时机 | 立即                     | 懒（默认）             |
| 新旧值   | ❌                       | ✅                     |
| 深层监听 | 自动（访问到哪监听到哪） | 需 `deep: true`        |
| 适合场景 | 副作用与多个响应式值联动 | 需要旧值对比、精确控制 |

---

### Q174. 什么是 `monorepo`？Turborepo vs nx vs pnpm workspace 如何选择？

**Monorepo：** 多个项目/包放在同一个 Git 仓库中管理

**优势：** 代码复用、统一版本管理、原子化提交、方便重构

```
monorepo/
├── packages/
│   ├── ui/          # 组件库
│   ├── utils/       # 工具函数
│   └── types/       # 类型定义
├── apps/
│   ├── web/         # 主应用
│   └── docs/        # 文档站
├── pnpm-workspace.yaml
└── turbo.json
```

| 工具             | 核心能力                           | 适合场景            |
| ---------------- | ---------------------------------- | ------------------- |
| `pnpm workspace` | 包管理、依赖提升                   | 基础依赖管理        |
| `Turborepo`      | 任务编排、智能缓存                 | CI/CD加速，简单配置 |
| `nx`             | 全功能（代码生成、影响分析、缓存） | 大型企业项目        |

---

### Q175. 以下 TypeScript 代码有什么问题？如何修复？

```ts
interface ApiResponse<T> {
  data: T
  code: number
}

async function fetchUser(): Promise<ApiResponse<User>> {
  const res = await fetch('/api/user')
  return res.json() // ⚠️ 有问题！
}
```

**问题：** `res.json()` 返回 `Promise<any>`，TypeScript 不会报错，但运行时可能类型不匹配

**修复方案：**

```ts
async function fetchUser(): Promise<ApiResponse<User>> {
  const res = await fetch('/api/user')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = (await res.json()) as ApiResponse<User> // 类型断言
  return data
}

// 更安全：运行时验证（配合 zod）
import { z } from 'zod'
const UserSchema = z.object({ id: z.number(), name: z.string() })
const user = UserSchema.parse(await res.json()) // 运行时校验
```

---

### Q176. 解释 `TCP` 三次握手和四次挥手，为什么挥手需要四次？

**三次握手（建立连接）：**

```
客户端 → SYN(seq=x)          → 服务端  // 我想连接
客户端 ← SYN-ACK(seq=y,ack=x+1) ← 服务端  // 好的，确认
客户端 → ACK(ack=y+1)        → 服务端  // 收到，连接建立
```

**四次挥手（断开连接）：**

```
客户端 → FIN         → 服务端  // 我发完了
客户端 ← ACK         ← 服务端  // 收到
客户端 ← FIN         ← 服务端  // 我也发完了（可能有剩余数据要发）
客户端 → ACK         → 服务端  // 收到，等待 2MSL 后关闭
```

**为什么挥手四次？** 因为 TCP 是**全双工**的，两个方向的数据流需要分别关闭。服务端收到 FIN 后可能还有数据要发送，不能立即 FIN，需要等数据发完再单独发 FIN。

> **TIME_WAIT 为什么等 2MSL？** 确保最后一个 ACK 送达（若丢失，对方重发 FIN，2MSL 内能收到）

---

### Q177. 实现 `数组去重` 的 6 种方式，分析各自复杂度

```js
const arr = [1, 2, 2, 3, NaN, NaN, { a: 1 }, { a: 1 }]

// 1. Set（O(n)，无法处理对象去重）
;[...new Set(arr)] // NaN 会去重，{a:1} 不会

// 2. filter + indexOf（O(n²)，NaN 无法去重）
arr.filter((v, i) => arr.indexOf(v) === i)

// 3. reduce（O(n²)）
arr.reduce((acc, v) => (acc.includes(v) ? acc : [...acc, v]), [])

// 4. Map（O(n)，处理基本类型）
const map = new Map()
arr.filter(v => !map.has(v) && map.set(v, 1))

// 5. 对象键（O(n)，键会变字符串，类型信息丢失）
Object.keys(arr.reduce((acc, v) => ((acc[v] = 1), acc), {}))

// 6. 深度去重（对象按内容）
function deepUnique(arr) {
  return arr.filter((v, i) => arr.findIndex(w => JSON.stringify(w) === JSON.stringify(v)) === i)
}
```

---

### Q178. `MutationObserver` 使用场景和性能注意事项

```js
// 观察 DOM 变化（异步批量回调，不阻塞主线程）
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      console.log('子节点变化', mutation.addedNodes, mutation.removedNodes)
    }
    if (mutation.type === 'attributes') {
      console.log('属性变化', mutation.attributeName, mutation.oldValue)
    }
  })
})

observer.observe(document.body, {
  childList: true, // 观察子节点增删
  subtree: true, // 观察所有后代
  attributes: true, // 观察属性变化
  attributeOldValue: true, // 记录旧属性值
  characterData: true, // 观察文本变化
})

// 使用完务必断开
observer.disconnect()
```

**实际场景：** Vue 编译器的 DOM 操作检测、富文本编辑器、第三方脚本注入防护

---

### Q179. 什么是 `requestIdleCallback` 的 polyfill 实现？React 为何不用原生的？

```js
// 简单 polyfill（基于 setTimeout）
window.requestIdleCallback =
  window.requestIdleCallback ||
  function (cb) {
    const start = Date.now()
    return setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
        // 给 50ms 预算（简单模拟）
      })
    }, 1)
  }
```

**React 为何不用原生 `requestIdleCallback`？**

1. **兼容性差：** Safari 长期不支持
2. **触发频率低：** 浏览器空闲时才触发，可能 50ms 才执行一次
3. **无法保证优先级：** React 需要更细粒度的优先级控制

**React 的方案（`MessageChannel`）：**

```js
// 利用 MessageChannel 的宏任务特性，每帧至少执行一次
const channel = new MessageChannel()
channel.port2.onmessage = () => {
  // 执行 5ms 的工作，超时就中断
  const deadline = performance.now() + 5
  while (workQueue.length && performance.now() < deadline) {
    performWork(workQueue.shift())
  }
  if (workQueue.length) channel.port1.postMessage(null)
}
```

---

### Q180. CSS `grid` 布局的核心概念，实现一个「圣杯布局」

```css
/* 圣杯布局：header + (left sidebar + main + right sidebar) + footer */
.container {
  display: grid;
  grid-template-areas:
    'header  header  header'
    'sidebar main    aside'
    'footer  footer  footer';
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 60px 1fr 60px;
  min-height: 100vh;
  gap: 10px;
}

.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: main;
}
.aside {
  grid-area: aside;
}
.footer {
  grid-area: footer;
}
```

**核心概念：**

```css
grid-template-columns: repeat(3, 1fr); /* 三列等宽 */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* 自适应列数 */
grid-column: 1 / span 2; /* 跨越2列 */
place-items: center; /* 水平+垂直居中 */
```

---

### Q181. 以下代码有 Bug，请找出并修复（经典面试陷阱）

```js
const obj = {
  data: [1, 2, 3],
  double: function () {
    return this.data.map(function (n) {
      return n * this.multiplier // Bug 在这里
    })
  },
  multiplier: 2,
}
console.log(obj.double()) // [NaN, NaN, NaN]
```

**Bug：** `map` 回调中的 `this` 是 `undefined`（严格模式）或 `window`，而非 `obj`

**3 种修复方式：**

```js
// 方法1：箭头函数（继承外层 this）
return this.data.map(n => n * this.multiplier)

// 方法2：保存 this 引用
const self = this
return this.data.map(function (n) {
  return n * self.multiplier
})

// 方法3：map 第二参数绑定 this
return this.data.map(function (n) {
  return n * this.multiplier
}, this)
```

---

### Q182. 什么是前端的「状态机」？如何用 XState 管理复杂状态？

**状态机（FSM）：** 系统在有限个状态之间转换，每个状态对应特定行为

```js
// 手动实现：登录流程状态机
const loginMachine = {
  initial: 'idle',
  states: {
    idle: { on: { SUBMIT: 'loading' } },
    loading: { on: { SUCCESS: 'success', ERROR: 'error' } },
    success: { on: { LOGOUT: 'idle' } },
    error: { on: { RETRY: 'loading', RESET: 'idle' } },
  },
}

function transition(state, event) {
  return loginMachine.states[state]?.on[event] ?? state
}

// 使用
let state = 'idle'
state = transition(state, 'SUBMIT') // 'loading'
state = transition(state, 'SUCCESS') // 'success'
state = transition(state, 'SUBMIT') // 'success'（无效转换，保持原状态）
```

**状态机的优势：** 不可能出现无效状态，逻辑清晰，易测试

---

### Q183. 解释 HTTPS 的握手过程（TLS 1.3 简化版）

```
TLS 1.3 握手（1-RTT）：

客户端 → ClientHello（支持的加密套件 + 密钥分享）→ 服务端
客户端 ← ServerHello（选定套件 + 服务器密钥分享 + 证书 + 验证）← 服务端
客户端 → 验证证书（CA公钥解密，检查有效期/域名）
客户端 → Finished → 服务端
   ↑ 此时双方已可加密通信（对称加密，AES-GCM等）
```

**关键概念：**

- **非对称加密**（RSA/ECDHE）：用于密钥交换，慢
- **对称加密**（AES）：用于实际数据传输，快
- **证书链**：服务端证书 → 中间CA → 根CA（浏览器内置信任）
- **前向保密（PFS）**：ECDHE 每次握手生成新密钥，历史会话不受私钥泄露影响

---

### Q184. 手写 `二分查找`，并扩展：查找第一个/最后一个等于目标值的位置

```js
// 基础：查找目标值
function binarySearch(arr, target) {
  let left = 0,
    right = arr.length - 1
  while (left <= right) {
    const mid = left + ((right - left) >> 1) // 防溢出，等同 (left+right)/2
    if (arr[mid] === target) return mid
    if (arr[mid] < target) left = mid + 1
    else right = mid - 1
  }
  return -1
}

// 变体1：查找第一个等于 target 的位置
function findFirst(arr, target) {
  let left = 0,
    right = arr.length - 1,
    result = -1
  while (left <= right) {
    const mid = left + ((right - left) >> 1)
    if (arr[mid] === target) {
      result = mid
      right = mid - 1
    } // 继续向左找
    else if (arr[mid] < target) left = mid + 1
    else right = mid - 1
  }
  return result
}

// 变体2：查找最后一个等于 target 的位置
function findLast(arr, target) {
  let left = 0,
    right = arr.length - 1,
    result = -1
  while (left <= right) {
    const mid = left + ((right - left) >> 1)
    if (arr[mid] === target) {
      result = mid
      left = mid + 1
    } // 继续向右找
    else if (arr[mid] < target) left = mid + 1
    else right = mid - 1
  }
  return result
}
```

---

### Q185. Vue3 的 `defineExpose` 有什么用？`<script setup>` 默认封闭性的原因？

```vue
<!-- 子组件 Child.vue -->
<script setup>
const count = ref(0)
const reset = () => {
  count.value = 0
}

// 不暴露的内容，父组件无法访问
// defineExpose 显式控制暴露的 API
defineExpose({ count, reset })
</script>
```

**`<script setup>` 默认封闭的原因：**

- `<script setup>` 编译后的组件实例是**封闭作用域**
- 防止父组件随意访问子组件内部状态，破坏封装性
- 遵循「最小权限原则」，只暴露必要的 API

**实际使用场景：**

```vue
<!-- 父组件 -->
<Child ref="childRef" />
<button @click="childRef.reset()">重置</button>
```

---

### Q186. 实现一个带重试机制的 `fetch` 封装

```ts
async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 3,
  delay = 1000,
  backoff = 2 // 指数退避倍数
): Promise<Response> {
  try {
    const res = await fetch(url, options)
    if (!res.ok && retries > 0) {
      throw new Error(`HTTP ${res.status}`)
    }
    return res
  } catch (err) {
    if (retries <= 0) throw err

    console.log(`请求失败，${delay}ms 后重试，剩余 ${retries} 次`)
    await new Promise(resolve => setTimeout(resolve, delay))

    return fetchWithRetry(url, options, retries - 1, delay * backoff, backoff)
  }
}

// 使用
const data = await fetchWithRetry('/api/data', {}, 3, 500)
```

---

### Q187. `CSS变量（Custom Properties）` 和 `Sass变量` 的本质区别？

| 对比       | CSS 变量 (`--color`)   | Sass 变量 (`$color`) |
| ---------- | ---------------------- | -------------------- |
| 作用时机   | 运行时（浏览器执行）   | 编译时（构建时替换） |
| 可被JS修改 | ✅                     | ❌                   |
| 响应式     | ✅（媒体查询中可修改） | ❌                   |
| 继承/层叠  | ✅（遵循CSS继承）      | ❌                   |
| 浏览器支持 | IE11不支持             | 编译后全支持         |

```js
// JS 动态修改 CSS 变量（主题切换）
document.documentElement.style.setProperty('--primary-color', '#ff6b6b');

// CSS 响应式变量
:root { --cols: 3; }
@media (max-width: 768px) {
  :root { --cols: 1; } /* 运行时生效 */
}
.grid { grid-template-columns: repeat(var(--cols), 1fr); }
```

---

### Q188. 什么是「竞态条件（Race Condition）」？在前端如何处理？

**场景：** 快速切换 Tab，先发出的请求后返回，旧数据覆盖新数据

```js
// 问题代码
async function fetchTabData(tabId) {
  const data = await fetch(`/api/tab/${tabId}`)
  this.content = await data.json() // 旧请求后返回会覆盖新数据！
}

// 解决方案1：取消旧请求（AbortController）
let controller
async function fetchTabData(tabId) {
  controller?.abort()
  controller = new AbortController()
  try {
    const res = await fetch(`/api/tab/${tabId}`, { signal: controller.signal })
    this.content = await res.json()
  } catch (e) {
    if (e.name !== 'AbortError') throw e
  }
}

// 解决方案2：版本号对比（忽略过期响应）
let requestId = 0
async function fetchTabData(tabId) {
  const id = ++requestId
  const data = await fetch(`/api/tab/${tabId}`).then(r => r.json())
  if (id === requestId) this.content = data // 只处理最新请求
}
```

---

### Q189. 解释 `Event Loop` 在 Node.js 和浏览器中的差异

**浏览器事件循环（简化）：**

```
宏任务 → 清空微任务 → 渲染 → 下一宏任务
```

**Node.js 事件循环（libuv，6个阶段）：**

```
timers        → 执行 setTimeout/setInterval 回调
pending cbs   → 系统级 I/O 错误回调
idle/prepare  → 内部使用
poll          → 等待/执行 I/O 回调（主要阶段）
check         → setImmediate 回调
close cbs     → 关闭事件回调（socket.on('close')）
```

**关键差异：**

```js
// Node.js 中：process.nextTick 在每阶段切换时执行（优先级高于 Promise 微任务）
process.nextTick(() => console.log('nextTick'))
Promise.resolve().then(() => console.log('Promise'))
// 输出：nextTick → Promise

// setImmediate vs setTimeout(fn, 0)：
// 在 I/O 回调中，setImmediate 先执行
// 在主模块，顺序不确定（取决于系统调度）
```

---

### Q190. 手写一个 `useVirtualList` 虚拟列表 Composable 的核心逻辑

```ts
function useVirtualList(list: Ref<any[]>, itemHeight: number, containerHeight: number) {
  const scrollTop = ref(0)

  const visibleCount = Math.ceil(containerHeight / itemHeight)
  const bufferCount = 3 // 缓冲区，减少白屏

  const startIndex = computed(() =>
    Math.max(0, Math.floor(scrollTop.value / itemHeight) - bufferCount)
  )

  const endIndex = computed(() =>
    Math.min(list.value.length, startIndex.value + visibleCount + bufferCount * 2)
  )

  const visibleList = computed(() =>
    list.value.slice(startIndex.value, endIndex.value).map((item, i) => ({
      item,
      index: startIndex.value + i,
    }))
  )

  // 偏移量：将可见区域移到正确位置
  const offsetY = computed(() => startIndex.value * itemHeight)

  // 总高度：用于撑开滚动容器
  const totalHeight = computed(() => list.value.length * itemHeight)

  function onScroll(e: Event) {
    scrollTop.value = (e.target as HTMLElement).scrollTop
  }

  return { visibleList, offsetY, totalHeight, onScroll }
}
```

---

### Q191. `JWT` 的结构和安全注意事项，为什么不能在 JWT 中存敏感信息？

**JWT 结构：** `Header.Payload.Signature`

```js
// Header（Base64编码，非加密）
{ "alg": "HS256", "typ": "JWT" }

// Payload（Base64编码，非加密！）
{ "sub": "123", "name": "Alice", "exp": 1716000000 }

// Signature（HMAC-SHA256签名，验证完整性）
HMACSHA256(base64(header) + '.' + base64(payload), secret)
```

**安全注意事项：**

1. **Payload 可被任何人解码**（`atob(payload)` 即可），不要存密码/身份证
2. 签名只保证**完整性**（未被篡改），不保证保密性
3. `alg: none` 攻击：服务端必须强制验证算法
4. **存储位置：** `httpOnly Cookie`（防XSS）> `localStorage`（有XSS风险）
5. 短期过期 + refresh token 机制
6. 敏感操作仍需服务端二次验证

---

### Q192. 实现一个简单的 `useState` Hook（React 原理）

```js
// React Hooks 简化实现原理
let hooks = []
let cursor = 0

function useState(initialValue) {
  const index = cursor // 捕获当前 hook 的索引

  if (hooks[index] === undefined) {
    hooks[index] = initialValue // 首次初始化
  }

  const setState = newValue => {
    hooks[index] = typeof newValue === 'function' ? newValue(hooks[index]) : newValue
    rerender() // 触发重新渲染
  }

  cursor++
  return [hooks[index], setState]
}

// 为什么 Hooks 不能在条件语句中使用？
// 因为 Hooks 依赖调用顺序（数组索引）来关联状态
// 条件中使用会导致索引错乱！
```

---

### Q193. CSS `transform` 为什么不触发回流？合成层（Composite Layer）是什么？

**回流触发条件：** 改变**几何信息**（位置、大小），浏览器需要重新计算布局

**transform 不触发回流的原因：**

1. `transform` 由**合成线程（Compositor Thread）** 处理，不经过主线程的 Layout/Paint 阶段
2. 元素提升为合成层后，变换在 **GPU** 上完成，对其他元素无影响

**提升合成层的条件：**

```css
transform: translateZ(0) / translate3d(0,0,0) /* 强制提升 */
will-change: transform
position: fixed
<video>, <canvas>, <iframe>
```

**合成层的代价：**

- 每个合成层占用独立 GPU 内存
- 层过多反而导致内存占用高、合并开销大（层爆炸问题）

---

### Q194. 实现「发布-订阅」和「观察者模式」，说明两者区别

```js
// 观察者模式：Subject 直接调用 Observer（耦合）
class Subject {
  observers = []
  subscribe(observer) {
    this.observers.push(observer)
  }
  notify(data) {
    this.observers.forEach(obs => obs.update(data))
  }
}
class Observer {
  update(data) {
    console.log('收到', data)
  }
}

// 发布订阅模式：通过事件总线解耦（Publisher 和 Subscriber 互不知晓）
class EventBus {
  events = {}
  on(event, cb) {
    ;(this.events[event] ??= []).push(cb)
  }
  emit(event, data) {
    this.events[event]?.forEach(cb => cb(data))
  }
  off(event, cb) {
    this.events[event] = this.events[event]?.filter(f => f !== cb)
  }
}
```

| 对比     | 观察者模式                 | 发布订阅模式                     |
| -------- | -------------------------- | -------------------------------- |
| 耦合度   | Subject 持有 Observer 引用 | 通过事件总线完全解耦             |
| 通信方式 | 直接调用                   | 异步/同步均可                    |
| 典型应用 | Vue响应式依赖追踪          | Node.js EventEmitter / Vue $emit |

---

### Q195. `package.json` 中 `exports` 字段的作用？和 `main`、`module` 的区别？

```json
{
  "name": "my-lib",
  "main": "./dist/index.cjs", // CJS 入口（旧方式，Node.js）
  "module": "./dist/index.mjs", // ESM 入口（非标准，Bundler识别）
  "exports": {
    // 现代方式（Node.js 12+）
    ".": {
      "import": "./dist/index.mjs", // ESM import 时
      "require": "./dist/index.cjs", // CJS require 时
      "types": "./dist/index.d.ts" // TypeScript 类型
    },
    "./utils": {
      "import": "./dist/utils.mjs" // 子路径导出
    }
  }
}
```

**`exports` 的优势：**

1. **封装性：** 未在 `exports` 中声明的路径无法被外部引用（`require('my-lib/src/internal')` 报错）
2. **条件导出：** 根据环境自动选择正确格式
3. **子路径映射：** 允许 `import { x } from 'my-lib/utils'`

---

### Q196. 手写一个简单的「响应式系统」（Vue3 响应式核心原理）

```js
let activeEffect = null

function effect(fn) {
  activeEffect = fn
  fn() // 执行一次，触发 get，完成依赖收集
  activeEffect = null
}

function reactive(obj) {
  const depsMap = new Map() // { key: Set<effect> }

  return new Proxy(obj, {
    get(target, key) {
      // 依赖收集（track）
      if (activeEffect) {
        if (!depsMap.has(key)) depsMap.set(key, new Set())
        depsMap.get(key).add(activeEffect)
      }
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      Reflect.set(target, key, value)
      // 触发更新（trigger）
      depsMap.get(key)?.forEach(fn => fn())
      return true
    },
  })
}

// 测试
const state = reactive({ count: 0 })
effect(() => console.log('count:', state.count)) // 输出: count: 0
state.count++ // 输出: count: 1（自动触发）
```

---

### Q197. 什么是「幂等性」？前端哪些场景需要保证接口幂等？

**幂等性：** 相同的请求执行一次和多次的效果相同

| HTTP 方法 | 幂等?      | 说明                         |
| --------- | ---------- | ---------------------------- |
| GET       | ✅         | 只读                         |
| DELETE    | ✅         | 删除已删除的资源仍返回成功   |
| PUT       | ✅         | 覆盖写                       |
| POST      | ❌         | 创建新资源，重复提交创建多条 |
| PATCH     | ❌（通常） | 增量更新可能不幂等           |

**前端保证幂等的方案：**

```js
// 1. 请求唯一ID（Idempotency Key）
const requestId = crypto.randomUUID()
fetch('/api/order', {
  method: 'POST',
  headers: { 'Idempotency-Key': requestId },
  body: JSON.stringify(orderData),
})
// 服务端根据 requestId 去重

// 2. 按钮防重复点击（加载状态）
// 3. 乐观更新 + 失败回滚
```

---

### Q198. 解释 `Vite` 的依赖预构建（Pre-bundling）做了什么？为什么用 esbuild？

**预构建解决的问题：**

1. **CommonJS/UMD → ESM 转换：** 浏览器只支持 ESM，但很多依赖是 CJS 格式（如 `lodash`）
2. **减少网络请求：** `lodash-es` 有 600+ 个模块文件，逐一请求太慢，预构建合并为 1 个文件

```
首次启动 Vite：
依赖扫描（正则分析 import） → esbuild 预构建 → 写入 node_modules/.vite/deps/
再次启动：读取缓存（基于依赖 hash）

触发重新预构建的时机：
- package.json 依赖变化
- vite.config.ts 中 optimizeDeps 配置变化
- 手动删除 .vite 缓存目录
```

**为什么用 esbuild（Go编写）而非 Rollup（JS）？**

- esbuild 比 Webpack/Rollup 快 10-100 倍
- 预构建只需要快速打包，不需要 Rollup 的高质量 Tree-shaking

---

### Q199. 实现一个「任务队列」，支持优先级和并发控制

```ts
type Priority = 'high' | 'normal' | 'low'

class TaskQueue {
  private queues = { high: [], normal: [], low: [] } as Record<Priority, (() => Promise<any>)[]>
  private running = 0
  private concurrency: number

  constructor(concurrency = 2) {
    this.concurrency = concurrency
  }

  add<T>(task: () => Promise<T>, priority: Priority = 'normal'): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queues[priority].push(async () => {
        try {
          resolve(await task())
        } catch (e) {
          reject(e)
        }
      })
      this.run()
    })
  }

  private run() {
    while (this.running < this.concurrency) {
      const task = this.queues.high.shift() || this.queues.normal.shift() || this.queues.low.shift()
      if (!task) break
      this.running++
      task().finally(() => {
        this.running--
        this.run()
      })
    }
  }
}

// 使用
const queue = new TaskQueue(2)
queue.add(() => fetch('/api/critical'), 'high')
queue.add(() => fetch('/api/normal'))
queue.add(() => fetch('/api/analytics'), 'low')
```

---

### Q200. 如果让你从零设计一个「前端框架」，核心需要解决哪些问题？
