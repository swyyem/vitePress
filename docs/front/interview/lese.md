# 浏览器垃圾回收

**_浏览器就像一座城市，垃圾回收就是城市的环卫工人，它会自动清理不再使用的内存空间（垃圾），防止内存泄漏，让城市（浏览器）保持流畅运行。_**

## 垃圾回收为什么要存在？

**_比喻：_** 如果城市没有环卫工人，垃圾会堆积成山，最终城市无法运转。
**_实际问题：_**

```javascript
function createProblem() {
  let bigData = new Array(1000000).fill('大量数据'); // 占用大量内存
  // 函数执行完后，bigData 不再使用，但如果没有垃圾回收...
}
createProblem();
// 如果bigData不被清理，每次调用都会浪费内存，最终浏览器卡死崩溃
```

## 两种主要的垃圾回收算法

### 1. 引用计数法 - “记账式清理”

**_比喻：_** 给每个物品贴标签，记录有多少人在使用它。当没人使用时，就立即清理。
**_工作原理：_**

- 每个对象都有一个“引用计数”
- 被引用时计数+1，取消引用时计数-1
- 当计数为0时，立即回收

```javascript
let obj1 = { name: '张三' }; // 引用计数 = 1 (obj1引用)
let obj2 = obj1; // 引用计数 = 2 (obj1, obj2都引用)

obj1 = null; // 引用计数 = 1 (只有obj2引用)
obj2 = null; // 引用计数 = 0 → 可以回收！
```

**_致命缺陷：循环引用：_**

```javascript
function problem() {
  let personA = { name: 'A' };
  let personB = { name: 'B' };

  personA.friend = personB; // A引用B
  personB.friend = personA; // B引用A → 形成循环引用！
}

problem();
// 函数执行完，personA和personB应该被回收
// 但引用计数都为1（互相引用），永远无法回收 → 内存泄漏！
```

**_现状：_** 现代浏览器已基本淘汰这种算法。

### 2. 标记清除法 - “定期大扫除”

**_比喻：_** 环卫工人定期从市政府（根对象）出发，标记所有能到达的房子（活动对象），然后清理掉所有未标记的房子（垃圾对象）。
**_工作原理（两个阶段）：_**

#### 阶段一：标记阶段

从根对象（全局变量）出发，遍历所有能访问到的对象，并标记为“活动对象”。

**_根对象包括：_**

- 全局变量（window）
- 当前函数局部变量和参数
- DOM节点引用
- 正在执行的函数上下文

```javascript
// 标记过程示例
let globalUser = { name: '全局用户' }; // ✓ 从根对象可访问（被标记）

function process() {
  let localData = { info: '局部数据' }; // ✓ 从执行上下文可访问（被标记）
  let temp = { value: '临时数据' }; // ✓ 当前可访问（被标记）
}

process();
// 函数执行完后，localData和temp不再可访问 → 等待回收
```

#### 阶段二：清除阶段

清理所有未被标记的对象，释放内存空间。

```javascript
function createGarbage() {
  let useful = { data: '有用数据' }; // 会被标记（在函数执行期间）
  let garbage = { data: '垃圾数据' }; // 会被标记（在函数执行期间）

  return useful; // 只有useful被返回，garbage不再可访问
}

let savedData = createGarbage();
// 垃圾回收时：
// - savedData (通过global可访问) → 被标记，保留
// - garbage (无法从任何根对象访问) → 未标记，被清理
```

**_优点：_** 完美解决循环引用问题

```javascript
function noProblem() {
  let objA = { name: 'A' };
  let objB = { name: 'B' };

  objA.friend = objB;
  objB.friend = objA; // 循环引用
}

noProblem();
// 函数执行完，objA和objB都无法从根对象访问
// 即使它们互相引用，也不会被标记 → 都会被回收！
```

## V8引擎的垃圾回收优化

现代浏览器（特别是Chrome的V8引擎）对标记清除进行了大量优化：

### 1. 分代假说 - “垃圾分类处理”

- **_内存空间被分为三块：_** 新生代、老生代、老生代缓冲区

**_观察发现：_**

- **_新生对象_** → 很快变成垃圾（临时变量）
- **_年老对象_** → 会存活很久（全局变量、缓存）

**_解决方案：_** 将堆内存分为两个区域：

- **_新生代（Young Generation）- “临时垃圾站”_**
  - 存放新创建的对象
  - 区域小，垃圾回收频繁（副垃圾回收器）
  - 使用 `Scavenge 算法`（复制算法）

```javascript
// 大多数函数内的变量都在这里
function temporary() {
  let temp1 = { a: 1 }; // 进入新生代
  let temp2 = { b: 2 }; // 进入新生代
  // 函数执行完，这些很可能很快被回收
}
```

- **_老生代（Old Generation）- “长期存放区”_**
  - 存放存活时间长的对象
  - 区域大，垃圾回收不频繁（主垃圾回收器）
  - 使用 `标记-清除/整理 算法`

```javascript
let globalCache = {}; // 进入老生代（长期存在）

function saveToCache(key, value) {
  globalCache[key] = value; // 长期保存
}
```

### 2. 回收过程详解

**_新生代回收：Scavenge算法_**

- 将新生代分为两个等大的空间：From（使用中）、To（闲置）
- 将From中存活的对象复制到To空间
- 清空整个From空间，然后交换From和To的角色

```javascript
// 比喻：搬家式清理
// From空间 → 旧房子
// To空间 → 新房子
// 存活对象 → 重要家具（搬到新房子）
// 垃圾对象 → 废弃家具（直接扔掉）
```

**_老生代回收：标记-清除/整理_**

- **_标记-清除_**：标记死亡对象，然后清除（会产生内存碎片）
- **_标记-整理_**：标记存活对象，向一端移动，然后清理边界外的内存

## 内存泄漏的常见场景及避免方法

### 1. 意外的全局变量

```javascript
function leak() {
  temp = '未声明的变量'; // 成为全局变量！永远不会被回收
  this.globalData = '糟糕'; // 在非严格模式下，this指向window
}
```

**_修复：_**

```javascript
function safe() {
  'use strict'; // 严格模式
  let temp = '局部变量'; // 函数结束自动回收
}
```

### 2. 遗忘的定时器和回调

```javascript
// 内存泄漏！
let data = { large: new Array(1000000) };
setInterval(() => {
  console.log(data); // data一直被引用，无法回收
}, 1000);

// 正确做法
let timer = setInterval(() => {
  // 业务逻辑
}, 1000);

// 不需要时清理
clearInterval(timer);
```

### 3. DOM引用泄露

```javascript
// 元素被移除，但引用还在
let elements = {
  button: document.getElementById('myButton'),
};

// 移除DOM
document.body.removeChild(document.getElementById('myButton'));

// 但elements.button仍然引用着DOM节点 → 无法回收！

// 正确做法
elements.button = null; // 释放引用
```

### 4. 闭包滥用

```javascript
function createClosure() {
  let bigData = new Array(1000000);

  return function () {
    // 闭包持有bigData引用，即使外部不再使用
    console.log('闭包');
  };
}

let closure = createClosure();
// 不再需要时
closure = null; // 释放闭包引用
```

## 面试标准答案

**_"浏览器垃圾回收机制主要基于标记清除算法，核心思想是：_**

- 1. **_标记阶段_**：从根对象（全局变量、执行上下文等）出发，标记所有可达的对象
- 2. **_清除阶段_**：清理所有未被标记的对象，释放内存

**_V8引擎的优化策略：_**

- **_分代回收_**：分为新生代（频繁回收）和老生代（较少回收）
- **_新生代_**使用Scavenge算法（复制存活对象）
- **_老生代_**使用标记-清除/整理算法

**_避免内存泄漏的关键：_**

- 及时清除定时器和事件监听
- 避免意外的全局变量
- 合理使用闭包，及时释放引用
- 清理不必要的DOM引用

**_垃圾回收是自动进行的，但理解其原理有助于我们编写更高效的代码。"_**
