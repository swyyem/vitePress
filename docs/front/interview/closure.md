# 闭包

- 闭包是指函数能够记住并访问其词法作用域中的变量，即使函数在其作用域外执行。
- 我理解闭包就像函数的'背包'，函数出生时会背上所在环境的变量，走到哪带到哪。
- 为什么要用闭包：
- 创建私有变量，实现数据封装
- 保存状态，比如计数器、缓存数据
- 创建函数工厂，生成特定功能的函数
- 闭包的缺点：
- 可能引起内存泄漏，因为闭包会阻止变量被垃圾回收
- 性能开销，需要维护作用域链
- 使用不当可能导致代码难以理解
- 在实际开发中，我会有意识地使用闭包来实现模块化和数据封装，但同时会注意及时释放不再需要的引用，避免内存问题。

## 什么是闭包？

### 核心概念：函数的"背包"

- 通俗理解： 当一个函数出生时，它会背一个"背包"，这个背包里装着它出生时所在环境的所有变量。即使这个函数离开了原来的环境，它依然可以打开背包使用里面的东西。

```javascript
function outer() {
  const secret = '我的秘密'; // 这个变量在outer函数内部

  // inner函数出生在outer内部，它背上了secret这个"背包"
  function inner() {
    console.log(secret); // 即使outer执行完了，inner依然能访问secret
  }

  return inner;
}

// outer执行完，按理说secret变量应该被销毁了
const myFunction = outer();

// 但是inner函数依然能记住并使用secret！
myFunction(); // 输出："我的秘密"
```

- 更生活化的例子

```javascript
// 就像给一个人一个计数器
function createCounter() {
  let count = 0; // 这个变量被"装进背包"

  return function () {
    count++; // 每次调用都记得之前的count值
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
// 每次调用counter，它都记得count的值！
```

## 为什么要使用闭包？有什么缺点？

### 为什么要使用闭包（优点）

- 创建私有变量：闭包可以创建私有变量，即在函数内部定义的变量，只能在该函数内部访问。

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // 私有变量，外部无法直接访问

  return {
    deposit: function (amount) {
      balance += amount;
      return balance;
    },
    withdraw: function (amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      return '余额不足';
    },
    getBalance: function () {
      return balance;
    },
  };
}

const myAccount = createBankAccount(1000);
console.log(myAccount.getBalance()); // 1000
myAccount.deposit(500);
console.log(myAccount.getBalance()); // 1500

// 外部无法直接修改balance！
// myAccount.balance = 10000; // 这样不行！
console.log(myAccount.getBalance()); // 还是1500
```

- 保存状态

```javascript
// 在事件处理中保存状态
function createButtonHandler(buttonName) {
  let clickCount = 0;

  return function () {
    clickCount++;
    console.log(`${buttonName} 被点击了 ${clickCount} 次`);
  };
}

const button1Handler = createButtonHandler('按钮1');
const button2Handler = createButtonHandler('按钮2');

button1Handler(); // "按钮1 被点击了 1 次"
button1Handler(); // "按钮1 被点击了 2 次"
button2Handler(); // "按钮2 被点击了 1 次"
// 每个按钮都有自己的计数器！
```

- 函数工厂

```javascript
function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### 为什么要使用闭包（缺点）

- 内存泄漏（最主要问题）

```javascript
function createHeavyObject() {
  const largeData = new Array(1000000).fill('大量数据'); // 占用大量内存

  return function () {
    console.log('我持有着largeData的引用，即使你不用它，我也不能释放！');
  };
}

const holder = createHeavyObject();
// 即使我们不再需要largeData，它也不会被垃圾回收！
// 因为闭包一直持有对largeData的引用
```

- 性能考虑

```javascript
function outer() {
  const a = 1,
    b = 2,
    c = 3,
    d = 4; // 很多变量

  return function () {
    // 即使只使用其中一个变量，整个作用域链都要被保存
    return a + 10;
  };
}
```

### 如何避免闭包的问题

- 及时释放引用

```javascript
function processData() {
  const bigData = '大量数据';

  const processor = function () {
    // 使用bigData...
  };

  processor();

  // 使用完后手动释放
  bigData = null; // 帮助垃圾回收
}
```

- 避免不必要的闭包

```javascript
// 不好的写法：创建了不必要的闭包
function createUnnecessaryClosure() {
  const temp = '临时数据';

  document.getElementById('btn').onclick = function () {
    // 这个函数闭包捕获了temp，但其实不需要
    console.log('按钮点击');
  };
}

// 好的写法：避免不必要的闭包
function betterApproach() {
  const temp = '临时数据';

  function handleClick() {
    console.log('按钮点击');
  }

  document.getElementById('btn').onclick = handleClick;
}
```
