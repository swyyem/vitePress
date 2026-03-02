# Utils 工具函数

SwyUI 内置的通用工具函数集，可通过 `@swy-ui/utils` 导入使用。

```ts
import { isArray, unique, camelize, ... } from '@swy-ui/utils'
```

---

## 类型判断

### isArray / isObject / isString / isFunction

判断值是否为特定类型，均来自 `@vue/shared`，支持 TypeScript 类型收窄。

```ts
import { isArray, isObject, isString, isFunction } from '@swy-ui/utils'

isArray([1, 2, 3]) // true
isArray('hello') // false
isObject({ a: 1 }) // true
isObject(null) // false（null 不算 object）
isString('hello') // true
isFunction(() => {}) // true
```

:::demo

```vue
<template>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:14px;">
    <div
      v-for="item in results"
      :key="item.expr"
      style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:#f5f7fa;border-radius:4px;"
    >
      <code style="flex:1;color:#476582;">{{ item.expr }}</code>
      <span :style="{ color: item.val ? '#67c23a' : '#f56c6c', fontWeight: '600' }">
        {{ String(item.val) }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isArray, isObject, isString, isFunction } from '@swy-ui/utils'

const results = [
  { expr: 'isArray([1, 2, 3])', val: isArray([1, 2, 3]) },
  { expr: "isArray('hello')", val: isArray('hello') },
  { expr: 'isObject({ a: 1 })', val: isObject({ a: 1 }) },
  { expr: 'isObject(null)', val: isObject(null) },
  { expr: "isString('hello')", val: isString('hello') },
  { expr: 'isFunction(() => {})', val: isFunction(() => {}) },
]
</script>
```

:::

---

### isUndefined / isBoolean / isNumber

```ts
import { isUndefined, isBoolean, isNumber } from '@swy-ui/utils'

isUndefined(undefined) // true
isUndefined(null) // false
isBoolean(false) // true
isNumber(42) // true
isNumber('42') // false
```

:::demo

```vue
<template>
  <div style="display:flex;flex-direction:column;gap:8px;font-size:14px;">
    <div
      v-for="item in results"
      :key="item.expr"
      style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:#f5f7fa;border-radius:4px;"
    >
      <code style="flex:1;color:#476582;">{{ item.expr }}</code>
      <span :style="{ color: item.val ? '#67c23a' : '#f56c6c', fontWeight: '600' }">
        {{ String(item.val) }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isUndefined, isBoolean, isNumber } from '@swy-ui/utils'

const results = [
  { expr: 'isUndefined(undefined)', val: isUndefined(undefined) },
  { expr: 'isUndefined(null)', val: isUndefined(null) },
  { expr: 'isBoolean(false)', val: isBoolean(false) },
  { expr: 'isNumber(42)', val: isNumber(42) },
  { expr: "isNumber('42')", val: isNumber('42') },
]
</script>
```

:::

---

### isEmpty

判断值是否为"空"：`null / undefined / 0 / '' / [] / {}`。

```ts
import { isEmpty } from '@swy-ui/utils'

isEmpty(null) // true
isEmpty(undefined) // true
isEmpty('') // true
isEmpty([]) // true
isEmpty({}) // true
isEmpty(0) // true
isEmpty('hello') // false
isEmpty([1]) // false
isEmpty({ a: 1 }) // false
```

:::demo

```vue
<template>
  <div style="display:flex;flex-direction:column;gap:8px;font-size:14px;">
    <div
      v-for="item in results"
      :key="item.expr"
      style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:#f5f7fa;border-radius:4px;"
    >
      <code style="flex:1;color:#476582;">{{ item.expr }}</code>
      <span :style="{ color: item.val ? '#67c23a' : '#f56c6c', fontWeight: '600' }">
        {{ String(item.val) }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isEmpty } from '@swy-ui/utils'

const results = [
  { expr: 'isEmpty(null)', val: isEmpty(null) },
  { expr: 'isEmpty(undefined)', val: isEmpty(undefined) },
  { expr: "isEmpty('')", val: isEmpty('') },
  { expr: 'isEmpty([])', val: isEmpty([]) },
  { expr: 'isEmpty({})', val: isEmpty({}) },
  { expr: 'isEmpty(0)', val: isEmpty(0) },
  { expr: "isEmpty('hello')", val: isEmpty('hello') },
  { expr: 'isEmpty([1])', val: isEmpty([1]) },
]
</script>
```

:::

---

### isStringNumber

判断字符串是否可转为合法数字。

```ts
import { isStringNumber } from '@swy-ui/utils'

isStringNumber('42') // true
isStringNumber('3.14') // true
isStringNumber('abc') // false
isStringNumber('') // false
```

:::demo

```vue
<template>
  <div style="display:flex;flex-direction:column;gap:8px;font-size:14px;">
    <div
      v-for="item in results"
      :key="item.expr"
      style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:#f5f7fa;border-radius:4px;"
    >
      <code style="flex:1;color:#476582;">{{ item.expr }}</code>
      <span :style="{ color: item.val ? '#67c23a' : '#f56c6c', fontWeight: '600' }">
        {{ String(item.val) }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isStringNumber } from '@swy-ui/utils'

const results = [
  { expr: "isStringNumber('42')", val: isStringNumber('42') },
  { expr: "isStringNumber('3.14')", val: isStringNumber('3.14') },
  { expr: "isStringNumber('abc')", val: isStringNumber('abc') },
  { expr: "isStringNumber('')", val: isStringNumber('') },
]
</script>
```

:::

---

## 字符串工具

### camelize

将连字符（kebab-case）字符串转换为驼峰命名（camelCase）。

```ts
import { camelize } from '@swy-ui/utils'

camelize('hello-world') // 'helloWorld'
camelize('font-size') // 'fontSize'
camelize('my-component-name') // 'myComponentName'
```

:::demo

```vue
<template>
  <div style="display:flex;flex-direction:column;gap:8px;font-size:14px;">
    <div
      v-for="item in results"
      :key="item.input"
      style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:#f5f7fa;border-radius:4px;"
    >
      <code style="color:#476582;min-width:200px;">"{{ item.input }}"</code>
      <span style="color:#909399;">→</span>
      <code style="color:#67c23a;">"{{ item.output }}"</code>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { camelize } from '@swy-ui/utils'

const results = [
  { input: 'hello-world', output: camelize('hello-world') },
  { input: 'font-size', output: camelize('font-size') },
  { input: 'my-component-name', output: camelize('my-component-name') },
]
</script>
```

:::

---

### hyphenate / kebabCase

将驼峰命名（camelCase）转换为连字符命名（kebab-case），`kebabCase` 是 `hyphenate` 的别名。

```ts
import { hyphenate, kebabCase } from '@swy-ui/utils'

hyphenate('helloWorld') // 'hello-world'
hyphenate('fontSize') // 'font-size'
kebabCase('myComponentName') // 'my-component-name'
```

:::demo

```vue
<template>
  <div style="display:flex;flex-direction:column;gap:8px;font-size:14px;">
    <div
      v-for="item in results"
      :key="item.input"
      style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:#f5f7fa;border-radius:4px;"
    >
      <code style="color:#476582;min-width:200px;">"{{ item.input }}"</code>
      <span style="color:#909399;">→</span>
      <code style="color:#67c23a;">"{{ item.output }}"</code>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { hyphenate, kebabCase } from '@swy-ui/utils'

const results = [
  { input: 'helloWorld', output: hyphenate('helloWorld') },
  { input: 'fontSize', output: hyphenate('fontSize') },
  { input: 'myComponentName', output: kebabCase('myComponentName') },
]
</script>
```

:::

---

### capitalize

将字符串首字母大写。

```ts
import { capitalize } from '@swy-ui/utils'

capitalize('hello') // 'Hello'
capitalize('world') // 'World'
capitalize('vue') // 'Vue'
```

:::demo

```vue
<template>
  <div style="display:flex;flex-direction:column;gap:8px;font-size:14px;">
    <div
      v-for="item in results"
      :key="item.input"
      style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:#f5f7fa;border-radius:4px;"
    >
      <code style="color:#476582;min-width:120px;">"{{ item.input }}"</code>
      <span style="color:#909399;">→</span>
      <code style="color:#67c23a;">"{{ item.output }}"</code>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { capitalize } from '@swy-ui/utils'

const results = [
  { input: 'hello', output: capitalize('hello') },
  { input: 'world', output: capitalize('world') },
  { input: 'vue', output: capitalize('vue') },
]
</script>
```

:::

---

### escapeStringRegexp

转义字符串中的正则表达式特殊字符，使其可以安全地用于 `new RegExp()`。

```ts
import { escapeStringRegexp } from '@swy-ui/utils'

escapeStringRegexp('hello.world') // 'hello\\.world'
escapeStringRegexp('(price: $5.00)') // '\\(price: \\$5\\.00\\)'

// 典型用法：动态搜索
const query = '3.14'
const regex = new RegExp(escapeStringRegexp(query))
regex.test('value is 3.14') // true（不会被 . 匹配到其他字符）
```

---

## 数组工具

### unique

数组去重，返回新数组，内部使用 `Set`。

```ts
import { unique } from '@swy-ui/utils'

unique([1, 2, 2, 3, 3]) // [1, 2, 3]
unique(['a', 'b', 'a', 'c']) // ['a', 'b', 'c']
```

:::demo

```vue
<template>
  <div style="display:flex;flex-direction:column;gap:8px;font-size:14px;">
    <div
      v-for="item in results"
      :key="item.label"
      style="padding:10px 14px;background:#f5f7fa;border-radius:4px;"
    >
      <div style="color:#909399;margin-bottom:4px;font-size:12px;">{{ item.label }}</div>
      <div style="display:flex;align-items:center;gap:10px;">
        <code style="color:#476582;">{{ JSON.stringify(item.input) }}</code>
        <span style="color:#909399;">→</span>
        <code style="color:#67c23a;">{{ JSON.stringify(item.output) }}</code>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { unique } from '@swy-ui/utils'

const results = [
  { label: '数字去重', input: [1, 2, 2, 3, 3, 1], output: unique([1, 2, 2, 3, 3, 1]) },
  { label: '字符串去重', input: ['a', 'b', 'a', 'c'], output: unique(['a', 'b', 'a', 'c']) },
]
</script>
```

:::

---

### castArray / ensureArray

将任意值强制转换为数组格式：已是数组则原样返回，否则包裹为单元素数组。`ensureArray` 是其别名。

```ts
import { castArray } from '@swy-ui/utils'

castArray('hello') // ['hello']
castArray([1, 2, 3]) // [1, 2, 3]
castArray(undefined) // []
castArray(null) // []
castArray(42) // [42]
```

:::demo

```vue
<template>
  <div style="display:flex;flex-direction:column;gap:8px;font-size:14px;">
    <div
      v-for="item in results"
      :key="item.expr"
      style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:#f5f7fa;border-radius:4px;"
    >
      <code style="flex:1;color:#476582;">{{ item.expr }}</code>
      <span style="color:#909399;">→</span>
      <code style="color:#67c23a;">{{ JSON.stringify(item.val) }}</code>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { castArray } from '@swy-ui/utils'

const results = [
  { expr: "castArray('hello')", val: castArray('hello') },
  { expr: 'castArray([1, 2, 3])', val: castArray([1, 2, 3]) },
  { expr: 'castArray(undefined)', val: castArray(undefined as any) },
  { expr: 'castArray(42)', val: castArray(42) },
]
</script>
```

:::

---

### extractFirst

从值或数组中提取第一个元素，若非数组则直接返回本身。

```ts
import { extractFirst } from '@swy-ui/utils'

extractFirst([10, 20, 30]) // 10
extractFirst('hello') // 'hello'
extractFirst(42) // 42
```

---

## 对象工具

### keysOf

获取对象的所有键，返回类型为 `(keyof T)[]`，保留 TypeScript 类型信息。

```ts
import { keysOf } from '@swy-ui/utils'

keysOf({ name: 'Alice', age: 18 }) // ['name', 'age']
```

### entriesOf

获取对象的键值对数组，类型为 `[keyof T, T[keyof T]][]`。

```ts
import { entriesOf } from '@swy-ui/utils'

entriesOf({ name: 'Alice', age: 18 })
// [['name', 'Alice'], ['age', 18]]
```

:::demo

```vue
<template>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:14px;">
    <div style="padding:12px 14px;background:#f5f7fa;border-radius:4px;">
      <div style="color:#909399;font-size:12px;margin-bottom:6px;">
        keysOf({ name: 'Alice', age: 18 })
      </div>
      <code style="color:#67c23a;">{{ JSON.stringify(keys) }}</code>
    </div>
    <div style="padding:12px 14px;background:#f5f7fa;border-radius:4px;">
      <div style="color:#909399;font-size:12px;margin-bottom:6px;">
        entriesOf({ name: 'Alice', age: 18 })
      </div>
      <code style="color:#67c23a;">{{ JSON.stringify(entries) }}</code>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { keysOf, entriesOf } from '@swy-ui/utils'

const obj = { name: 'Alice', age: 18 }
const keys = keysOf(obj)
const entries = entriesOf(obj)
</script>
```

:::

---

### getProp

通过路径（支持点语法）安全读写对象属性，返回一个带 getter/setter 的对象。

```ts
import { getProp } from '@swy-ui/utils'

const obj = { user: { name: 'Alice', roles: ['admin'] } }

const prop = getProp(obj, 'user.name')
console.log(prop.value) // 'Alice'

prop.value = 'Bob'
console.log(obj.user.name) // 'Bob'（同步修改了原对象）
```

:::demo

```vue
<template>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:14px;">
    <div style="padding:12px 14px;background:#f5f7fa;border-radius:4px;">
      <div style="color:#909399;font-size:12px;margin-bottom:4px;">
        const obj = { user: { name: '{{ obj.user.name }}' } }
      </div>
      <div>
        读取
        <code style="color:#476582;">getProp(obj, 'user.name').value</code>
        →
        <code style="color:#67c23a;">"{{ readVal }}"</code>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:10px;">
      <SwyButton type="primary" size="small" @click="changeName">修改 user.name 为 'Bob'</SwyButton>
      <span style="color:#606266;">
        obj.user.name =
        <code style="color:#e6a23c;">{{ obj.user.name }}</code>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { getProp } from '@swy-ui/utils'

const obj = reactive({ user: { name: 'Alice' } })
const readVal = ref(getProp(obj, 'user.name').value)

function changeName() {
  const prop = getProp(obj, 'user.name')
  prop.value = 'Bob'
  readVal.value = obj.user.name
}
</script>
```

:::

---

## 缓动函数

### easeInOutCubic

三次缓入缓出函数，常用于动画插值（如平滑滚动、数值过渡）。

```ts
import { easeInOutCubic } from '@swy-ui/utils'

/**
 * @param t  当前时间（从 0 开始）
 * @param b  起始值
 * @param c  目标值（注意：传入的是目标值，内部会计算变化量 c - b）
 * @param d  总持续时间
 * @returns  t 时刻对应的插值结果
 */
easeInOutCubic(0, 0, 300, 1000) // 0      (起点)
easeInOutCubic(500, 0, 300, 1000) // 150    (中点，加速→减速过渡)
easeInOutCubic(1000, 0, 300, 1000) // 300    (终点)
```

:::demo

```vue
<template>
  <div style="display:flex;flex-direction:column;gap:16px;">
    <div style="display:flex;align-items:center;gap:10px;">
      <SwyButton type="primary" @click="startAnim" :disabled="animating">播放动画</SwyButton>
      <span style="font-size:14px;color:#606266;">
        当前值：
        <strong style="color:#409eff;">{{ Math.round(current) }}</strong>
        / 300
      </span>
    </div>
    <!-- 进度条可视化 -->
    <div style="height:12px;background:#f0f0f0;border-radius:6px;overflow:hidden;width:100%;">
      <div
        style="height:100%;background:linear-gradient(90deg,#409eff,#79bbff);border-radius:6px;transition:none;"
        :style="{ width: (current / 300) * 100 + '%' }"
      />
    </div>
    <!-- 缓动曲线点示意 -->
    <div style="font-size:12px;color:#909399;">
      t=0: {{ pts[0] }} | t=250: {{ pts[1] }} | t=500: {{ pts[2] }} | t=750: {{ pts[3] }} | t=1000:
      {{ pts[4] }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { easeInOutCubic } from '@swy-ui/utils'

const current = ref(0)
const animating = ref(false)
const duration = 1000
const from = 0
const to = 300

const pts = [0, 250, 500, 750, 1000].map(t => Math.round(easeInOutCubic(t, from, to, duration)))

function startAnim() {
  animating.value = true
  current.value = 0
  const start = performance.now()
  function frame(now: number) {
    const elapsed = Math.min(now - start, duration)
    current.value = easeInOutCubic(elapsed, from, to, duration)
    if (elapsed < duration) {
      requestAnimationFrame(frame)
    } else {
      current.value = to
      animating.value = false
    }
  }
  requestAnimationFrame(frame)
}
</script>
```

:::

---

## 随机数工具

### generateId

生成一个 0～9999 之间的随机整数，可用于临时 key。

> ⚠️ 已标记为 `@deprecated`，建议改用 `useId` / `useIdInjection`。

```ts
import { generateId } from '@swy-ui/utils'

generateId() // 例：3721
generateId() // 例：8043
```

### getRandomInt

生成 0 到 max-1 之间的随机整数。

> ⚠️ 已标记为 `@deprecated`。

```ts
import { getRandomInt } from '@swy-ui/utils'

getRandomInt(10) // 0~9 之间的随机整数
getRandomInt(100) // 0~99 之间的随机整数
```

:::demo

```vue
<template>
  <div style="display:flex;flex-direction:column;gap:12px;font-size:14px;">
    <div style="display:flex;align-items:center;gap:10px;">
      <SwyButton @click="refresh">重新生成</SwyButton>
    </div>
    <div style="display:flex;gap:16px;">
      <div
        style="padding:12px 20px;background:#f5f7fa;border-radius:4px;text-align:center;min-width:140px;"
      >
        <div style="color:#909399;font-size:12px;margin-bottom:4px;">generateId()</div>
        <div style="font-size:24px;font-weight:600;color:#409eff;">{{ id }}</div>
      </div>
      <div
        style="padding:12px 20px;background:#f5f7fa;border-radius:4px;text-align:center;min-width:140px;"
      >
        <div style="color:#909399;font-size:12px;margin-bottom:4px;">getRandomInt(100)</div>
        <div style="font-size:24px;font-weight:600;color:#67c23a;">{{ rand }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { generateId, getRandomInt } from '@swy-ui/utils'

const id = ref(generateId())
const rand = ref(getRandomInt(100))

function refresh() {
  id.value = generateId()
  rand.value = getRandomInt(100)
}
</script>
```

:::

---

## 浏览器检测

### isFirefox

判断当前浏览器是否为 Firefox。

```ts
import { isFirefox } from '@swy-ui/utils'

isFirefox() // true / false
```

:::demo

```vue
<template>
  <div style="display:flex;flex-direction:column;gap:8px;font-size:14px;">
    <div style="padding:12px 14px;background:#f5f7fa;border-radius:4px;">
      <span style="color:#606266;">当前浏览器 isFirefox()：</span>
      <strong :style="{ color: firefox ? '#67c23a' : '#f56c6c' }">{{ firefox }}</strong>
    </div>
    <div style="padding:12px 14px;background:#f5f7fa;border-radius:4px;">
      <span style="color:#606266;">User-Agent：</span>
      <span style="font-size:12px;color:#909399;word-break:break-all;">{{ ua }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isFirefox } from '@swy-ui/utils'

const firefox = isFirefox()
const ua = navigator.userAgent
</script>
```

:::

---

## API 汇总

### 类型判断

| 函数                  | 参数      | 返回               | 说明                    |
| --------------------- | --------- | ------------------ | ----------------------- |
| `isArray(val)`        | `unknown` | `boolean`          | 是否为数组              |
| `isObject(val)`       | `unknown` | `boolean`          | 是否为对象（排除 null） |
| `isString(val)`       | `unknown` | `boolean`          | 是否为字符串            |
| `isFunction(val)`     | `unknown` | `boolean`          | 是否为函数              |
| `isUndefined(val)`    | `any`     | `val is undefined` | 是否为 undefined        |
| `isBoolean(val)`      | `any`     | `val is boolean`   | 是否为 boolean          |
| `isNumber(val)`       | `any`     | `val is number`    | 是否为 number           |
| `isEmpty(val)`        | `unknown` | `boolean`          | 是否为空值              |
| `isElement(val)`      | `unknown` | `val is Element`   | 是否为 DOM 元素         |
| `isStringNumber(val)` | `string`  | `boolean`          | 字符串是否为合法数字    |
| `isWindow(val)`       | `unknown` | `val is Window`    | 是否为 Window 对象      |

### 字符串工具

| 函数                      | 参数     | 返回            | 说明                   |
| ------------------------- | -------- | --------------- | ---------------------- |
| `camelize(str)`           | `string` | `string`        | kebab-case → camelCase |
| `hyphenate(str)`          | `string` | `string`        | camelCase → kebab-case |
| `kebabCase(str)`          | `string` | `string`        | `hyphenate` 的别名     |
| `capitalize(str)`         | `string` | `Capitalize<T>` | 首字母大写             |
| `escapeStringRegexp(str)` | `string` | `string`        | 转义正则特殊字符       |

### 数组工具

| 函数                | 参数       | 返回  | 说明               |
| ------------------- | ---------- | ----- | ------------------ |
| `unique(arr)`       | `T[]`      | `T[]` | 数组去重           |
| `castArray(val)`    | `T \| T[]` | `T[]` | 强制转为数组       |
| `ensureArray(val)`  | `T \| T[]` | `T[]` | `castArray` 的别名 |
| `extractFirst(val)` | `T \| T[]` | `T`   | 提取第一个元素     |

### 对象工具

| 函数                           | 参数               | 返回                      | 说明               |
| ------------------------------ | ------------------ | ------------------------- | ------------------ |
| `keysOf(obj)`                  | `T extends object` | `(keyof T)[]`             | 获取对象所有键     |
| `entriesOf(obj)`               | `T extends object` | `[keyof T, T[keyof T]][]` | 获取对象键值对     |
| `hasOwn(obj, key)`             | `object, string`   | `boolean`                 | 判断是否为自身属性 |
| `getProp(obj, path, default?)` | `object, string`   | `{ value }`               | 按路径读写属性     |

### 其他

| 函数                      | 参数       | 返回      | 说明                            |
| ------------------------- | ---------- | --------- | ------------------------------- |
| `easeInOutCubic(t,b,c,d)` | `number×4` | `number`  | 三次缓入缓出插值                |
| `generateId()`            | —          | `number`  | 生成随机整数 ID（已废弃）       |
| `getRandomInt(max)`       | `number`   | `number`  | 生成 0~max-1 随机整数（已废弃） |
| `isFirefox()`             | —          | `boolean` | 是否为 Firefox 浏览器           |
