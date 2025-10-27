# javascript的数据类型

**JavaScript 的数据类型分为两大类：原始类型和对象类型。原始类型是值本身不可变的“基本数据”，而对象类型是属性集合的“复杂数据”，通过引用来访问。**

## 1. 两大分类：原始类型 vs 引用类型

|   特征   |             原始类型             |                        引用类型                        |
| :------: | :------------------------------: | :----------------------------------------------------: |
| 通俗比喻 | “实际的值”（就像你钱包里的现金） | “保险箱的钥匙”（钥匙可以复制，但开的都是同一个保险箱） |
| 存储方式 |            存储在栈中            |          存储在堆中，栈里存储的是堆的内存地址          |
| 拷贝行为 | 值拷贝：复制一份全新的、独立的值 |       引用拷贝：复制的是内存地址，指向同一个对象       |
|  可变性  |     不可变：值本身无法被改变     |               可变：对象的属性可以被修改               |

## 2. 八种内置数据类型（ES2020 标准）

自从 ES6 引入 `Symbol` 和 ES2020 引入 `BigInt` 后，JavaScript 共有 8 种 内置数据类型。

### **A. 原始类型**

1. **undefined**：

- **含义：** 表示“未定义”或“不存在值”。
- **场景：** 一个变量声明了但未赋值，默认值就是 `undefined`。
- **示例：** `let a; console.log(a); // undefined`

2. **null**：

- **含义：** 表示“空值”或“无对象”。
- **场景：** 通常作为一个有意赋值的空值，表示一个空对象指针。
- **面试坑点：** `typeof null` 返回 `"object"`，这是 JavaScript 的一个历史遗留 Bug。

3. **boolean**：

- **含义：** 逻辑值，只有两个：`true` 和 `false`。
- **场景：** 用于条件判断。

4. **number**：

- **含义：** 代表整数和浮点数。
- **特殊值：** `NaN`（不是一个数字）、`Infinity`（无穷大）。
- **注意：** JavaScript 不区分整型和浮点型，统一用 `number` 表示。

5. **string**：

- **含义：** 代表文本数据，一串字符。
- **特点：** 字符串是不可变的，一旦创建，无法改变其中的字符。

6. **symbol (ES6+)：**：

- **含义：** 表示唯一的、不可变的值。
- **场景：** 主要用于对象的唯一属性名，防止属性名冲突。

7. **bigint (ES2020+)：**：

- **含义：** 用于表示 JavaScript 中大于 `Number.MAX_SAFE_INTEGER` 的整数。用于表示任意精度的整数
- **场景：** 解决 `number` 类型无法安全表示大于 `2^53 - 1` 的整数的问题。
- **创建：** 在整数末尾加 `n`，如 `123n`。

### B. 引用类型

8. **object**：

- **含义：** 是一组键值对的集合，是其他对象的基类。
- **子类型：**
  - **Array:** 数组，一种特殊的对象，键为数字索引。
  - **Function：** 函数，也是一种对象，可以被调用。
  - **Date**, **RegExp**, **Map**, **Set**, **WeakMap**, **WeakSet**, **Promise**, **Error**, **Math**, **JSON**, **Proxy**, **Reflect**, **Intl**, **Generator**, **AsyncFunction**, **AsyncGenerator**, **BigInt**, **BigInt64Array**, **BigUint64Array**, **SharedArrayBuffer**, **Atomics**, **WebAssembly** 等。

## 考点一：值传递 vs 引用传递

```javascript
// 原始类型 - 值传递（复印一份文件）
let a = 10;
let b = a; // b 是 a 的一个副本
b = 20;
console.log(a); // 10, a 的值不受影响

// 引用类型 - 引用传递（共享一把钥匙）
let obj1 = { name: 'Alice' };
let obj2 = obj1; // obj2 和 obj1 指向同一个内存地址（同一把钥匙）
obj2.name = 'Bob';
console.log(obj1.name); // 'Bob', 因为修改的是同一个对象
```

## 考点二：类型判断 typeof 与 instanceof

- **typeof：** 主要用于判断原始类型（除了 `null`），判断引用类型除了 `function` 外都返回 `"object"`。

```javascript
console.log(typeof undefined); // "undefined"
console.log(typeof 123); // "number"
console.log(typeof 'hello'); // "string"
console.log(typeof true); // "boolean"
console.log(typeof Symbol()); // "symbol"
console.log(typeof 123n); // "bigint"
console.log(typeof null); // "object" (著名的Bug!)
console.log(typeof []); // "object"
console.log(typeof {}); // "object"
console.log(typeof function () {}); // "function" (特殊)
```

- **instanceof：** 主用于检查一个`对象`是否是某个构造函数的实例。`只能用于引用类型`。

```javascript
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log(function () {} instanceof Function); // true
console.log(123 instanceof Number); // false (原始类型不行)
```

### 更全面的判断：

- **判断数组**：`Array.isArray([]) // true`
- **判断**`null`：`variable === null`

## 考点三：深浅拷贝

由于引用类型的特性，直接赋值会导致数据共享问题，所以需要拷贝

1. **浅拷贝：** 只拷贝对象的第一层属性。如果属性是引用类型，则拷贝的仍然是引用。

- **方法**：`Object.assign()`, 展开运算符 `...`

```javascript
let shallowCopy = { ...obj1 };
```

2. **深拷贝：** 完全拷贝所有层级，创建一个完全独立的对象。

- **方法**：`JSON.parse(JSON.stringify(obj))`（最简单，但不能处理函数、`Symbol`、`undefined`和循环引用），或者使用工具库如 Lodash 的 `_.cloneDeep`。

## 面试回答技巧总结

1. **先总后分**：开头先点明“分为原始类型和引用类型两大类”，然后展开。
2. **记住数量**：明确说出“目前共有 8 种数据类型”，并列举出来，这显得你很关注语言标准。
3. **善用比喻**：用“现金”和“钥匙”的比喻来解释值传递和引用传递，非常直观。
4. **掌握核心考点**：

- 能清晰解释 `a = b` 在两种类型下的不同结果。
- 能说出 `typeof` 的优缺点和 `instanceof` 的用途。
- 知道 `null` 是 `typeof` 的一个特例。

5. **联系实际**：如果能提到 `Symbol` 用于防止属性名冲突，`BigInt` 用于大数运算，会是非常好的加分项。
