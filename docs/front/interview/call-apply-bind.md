# JavaScript 中 call、apply 和 bind 的区别与实现

**_这三个方法都是用于改变函数执行时的 this 指向，但在使用方式和效果上有重要区别。下面我将详细解释它们，并提供代码示例和模拟实现。_**

## 核心区别

| 方法  |     参数传递     |       执行时机       |     返回值     |
| :---: | :--------------: | :------------------: | :------------: |
| call  |   参数逐个传递   |       立即执行       |  函数的返回值  |
| apply | 参数作为数组传递 |       立即执行       |  函数的返回值  |
| bind  |   参数逐个传递   | 返回新函数，稍后执行 | 绑定后的新函数 |

## 详细解析与示例

### 1. call 方法

```javascript
// 基本用法
function greet(message, punctuation) {
  console.log(`${message}, ${this.name}${punctuation}`);
}

const person = { name: 'Alice' };

// 使用 call 改变 this 指向
greet.call(person, 'Hello', '!'); // 输出: "Hello, Alice!"
```

### 2. apply 方法

```javascript
// 基本用法
function introduce(age, hobby) {
  console.log(`我叫${this.name}，今年${age}岁，喜欢${hobby}`);
}

const person = { name: 'Bob' };

// 使用 apply 改变 this 指向
introduce.apply(person, [25, '游泳']); // 输出: "我叫Bob，今年25岁，喜欢游泳"
```

### 3. bind 方法

```javascript
// 基本用法
function sayHello(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

const person = { name: 'Charlie' };

// 使用 bind 创建新函数
const boundFunction = sayHello.bind(person, 'Hi');

// 稍后执行
boundFunction(); // 输出: "Hi, Charlie"
```

## 手动实现

### 实现 call

```javascript
Function.prototype.myCall = function (context, ...args) {
  // 如果 context 为 null 或 undefined，则指向全局对象
  context = context || window;

  // 创建唯一属性键，避免覆盖原有属性
  const fnKey = Symbol('fn');

  // 将当前函数作为 context 的方法
  context[fnKey] = this;

  // 执行函数
  const result = context[fnKey](...args);

  // 删除临时添加的方法
  delete context[fnKey];

  return result;
};

// 测试
function test(a, b) {
  console.log(this.name, a + b);
}

const obj = { name: 'Test' };
test.myCall(obj, 1, 2); // 输出: "Test 3"
```

### 实现 apply

```javascript
Function.prototype.myApply = function (context, argsArray = []) {
  // 如果 context 为 null 或 undefined，则指向全局对象
  context = context || window;

  // 创建唯一属性键
  const fnKey = Symbol('fn');

  // 将当前函数作为 context 的方法
  context[fnKey] = this;

  // 执行函数
  const result = context[fnKey](...argsArray);

  // 删除临时添加的方法
  delete context[fnKey];

  return result;
};

// 测试
function sum(a, b, c) {
  console.log(this.prefix, a + b + c);
  return a + b + c;
}

const context = { prefix: '结果是:' };
sum.myApply(context, [1, 2, 3]); // 输出: "结果是: 6"
```

### 实现 bind

```javascript
Function.prototype.myBind = function (context, ...bindArgs) {
  const self = this;

  return function (...callArgs) {
    // 合并绑定时的参数和调用时的参数
    const allArgs = bindArgs.concat(callArgs);

    // 使用 apply 执行原函数
    return self.apply(context, allArgs);
  };
};

// 测试
function multiply(a, b, c) {
  console.log(this.base * a * b * c);
}

const boundMultiply = multiply.myBind({ base: 2 }, 3);
boundMultiply(4, 5); // 输出: 120 (2 * 3 * 4 * 5)
```

## 实际应用场景

### 1. 借用数组方法处理类数组对象

```javascript
// 类数组对象没有数组的方法
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
};

// 使用 call 或 apply 借用数组方法
const realArray = Array.prototype.slice.call(arrayLike);
console.log(realArray); // ['a', 'b', 'c']

// 或者使用更现代的方法
const realArray2 = Array.from(arrayLike);
```

### 2. 函数柯里化

```javascript
// 使用 bind 实现函数柯里化
function add(a, b, c) {
  return a + b + c;
}

// 柯里化：预先绑定部分参数
const addFive = add.bind(null, 2, 3);
console.log(addFive(5)); // 10 (2 + 3 + 5)
```

### 3. 事件处理函数中的 this 绑定

```javascript
class Button {
  constructor(text) {
    this.text = text;
    this.element = document.createElement('button');
    this.element.textContent = text;

    // 使用 bind 确保回调函数中的 this 指向当前实例
    this.element.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick() {
    console.log(`点击了: ${this.text}`);
  }
}
```

## 面试常见问题

```text
1. 这三个方法的区别是什么？
调用方式：call 和 bind 接受参数列表，apply 接受参数数组

执行时机：call 和 apply 立即执行，bind 返回新函数

返回值：call 和 apply 返回原函数返回值，bind 返回绑定后的函数

2. 什么情况下会用到这些方法？
需要改变函数执行上下文时

实现函数借用（如类数组转数组）

实现函数柯里化

在事件处理函数中保持正确的 this 指向

3. 如何手动实现这些方法？
核心思路都是将函数作为传入对象的属性调用，利用隐式绑定规则改变 this 指向。
```
