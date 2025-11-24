# 一、核心思想：一个“承诺”对象

想象一下现实生活中的“承诺”：

- **_我向你承诺（Promise），下周给你一本《三体》。_**

- 这个承诺有三种状态：
  - **_待定（Pending）_**：现在书还没到我手上，我也不知道下周能不能买到。承诺的结果尚未可知。
  - **_已完成（Fulfilled）_**：下周我成功买到书，并把书给了你。承诺被**_兑现（Resolve）_**了，并且带有一个结果值（那本书）。
  - **_已拒绝（Rejected）_**：下周书店断货了，我买不到书。承诺被**_拒绝（Reject）_**了，并且带有一个原因（断货了）。

`Promise` 对象就是把这个过程数字化了，它用来表示一个**_异步操作_**的最终完成（或失败）及其结果值。

## 二、为什么需要 Promise？—— 解决“回调地狱”

在 Promise 出现之前，我们处理异步（比如依次读A文件、B文件、C文件）主要靠回调函数，代码会变成这样：

```javascript
// 经典的“回调地狱”（Callback Hell）
readFile('A.txt', function (err, dataA) {
  if (err) throw err;
  readFile('B.txt', function (err, dataB) {
    if (err) throw err;
    readFile('C.txt', function (err, dataC) {
      if (err) throw err;
      // 处理 dataA, dataB, dataC
    });
  });
});
```

这种代码：

- **_难以阅读和维护_**：缩进层层嵌套，形成“金字塔形状”。
- **_错误处理麻烦_**：需要在每一层单独处理错误。

### Promise 的解决方式：链式调用

```javascript
readFilePromise('A.txt') // 返回一个 Promise
  .then(dataA => readFilePromise('B.txt')) // 用上一个Promise的结果，发起下一个异步操作
  .then(dataB => readFilePromise('C.txt'))
  .then(dataC => {
    // 处理最终结果
  })
  .catch(err => {
    // 统一处理链中任何一个环节发生的错误
  });
```

代码变成了**_横向增长_**的链条，而不是纵向嵌套，清晰多了！

## 三、Promise 的三种状态（面试核心）

这是一个必问题。一定要记牢状态的变化是**_不可逆_**的。

- `pending`**_（待定）_**：初始状态，既没有被兑现，也没有被拒绝。
- `fulfilled`**_（已兑现）_**：意味着操作成功完成。也称为 `resolved`。
- `rejected`**_（已拒绝）_**：意味着操作失败。

**_状态流转：_**

- `pending` -> `fulfilled` （操作成功，调用 `resolve`）
- `pending` -> `rejected` （操作失败，调用 `reject`）

一旦状态从 `pending` 变为 `fulfilled` 或 `rejected`，这个 Promise 的状态就**_凝固（settled）_**了，不会再改变。

## 四、基本用法和API

### 1. 创建一个 Promise

```javascript
const myPromise = new Promise((resolve, reject) => {
  // 这里是执行异步操作的地方，比如 Ajax 请求、读取文件、定时器等。

  setTimeout(() => {
    const randomNum = Math.random();
    if (randomNum > 0.5) {
      resolve(`成功！数字是：${randomNum}`); // 状态变为 fulfilled
    } else {
      reject(`失败！数字太小了：${randomNum}`); // 状态变为 rejected
    }
  }, 1000);
});
```

### 2. 消费一个 Promise（使用 `.then()`, `.catch()`, `.finally()`）

- `.then()`：接收两个回调函数（都是可选的）。
  - 第一个是 `onFulfilled`，在 Promise 成功时调用。
  - 第二个是 `onRejected`，在 Promise 失败时调用。（通常用 `.catch` 代替）

  ```javascript
  myPromise.then(
    successMessage => {
      console.log(successMessage);
    }, // 处理成功情况
    errorMessage => {
      console.error(errorMessage);
    } // 处理失败情况（不常用）
  );
  ```

- `.catch()`：专门用于捕获错误，是 `.then(null, onRejected)` 的语法糖。**_它会捕获链中前面任何一个_** `.then` **_里抛出的错误。_**

  ```javascript
  myPromise
    .then(successMessage => {
      console.log(successMessage);
    })
    .catch(errorMessage => {
      console.error(errorMessage);
    }); // 统一捕获错误
  ```

- `.finally()`：无论 Promise 最终是成功还是失败，**_都会执行_**的回调。常用于清理工作，比如隐藏加载动画。
  ```javascript
  myPromise
    .then(result => {
      /* ... */
    })
    .catch(error => {
      /* ... */
    })
    .finally(() => {
      console.log('请求结束，无论成败');
    });
  ```

## 五、重要的静态方法（面试高频）

### 1. `Promise.all([promise1, promise2, ...])`

- **_功能_**：接收一个 Promise 数组，返回一个新的 Promise。
- **_结果_**：当**_所有_**输入的 Promise 都成功时，它才成功，结果是一个包含所有成功结果的数组。**_如果有一个失败，它就立即失败_**，原因是第一个失败 Promise 的原因。
- **_比喻_**：等一桌子菜上齐了再开饭，有一道菜没做出来，大家就都别吃了。
- **_适用场景_**：多个并行的、无依赖的异步任务，需要全部成功才能继续。

### 2. `Promise.race([promise1, promise2, ...])`

- **_功能_**：接收一个 Promise 数组，返回一个新的 Promise。
- **_结果_**：**_竞速_**。哪一个 Promise 最先完成（成功或失败），就采用它的结果。
- **_比喻_**：赛跑，谁第一个冲过终点，就以谁的成绩为准。
- **_适用场景_**：给异步操作设置超时

```javascript
const fetchData = fetch('/api/data');
const timeout = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('请求超时')), 5000);
});

Promise.race([fetchData, timeout])
  .then(data => console.log(data))
  .catch(err => console.error(err)); // 如果5秒内没响应，就会捕获超时错误
```

### 3. `Promise.allSettled([promise1, promise2, ...])` （ES2020）

- **_功能_**：接收一个 Promise 数组，返回一个新的 Promise。
- **_结果_**：等到**_所有_**输入的 Promise 都已敲定（无论成功或失败）。返回一个对象数组，每个对象描述了对应 Promise 的结果。
- **_比喻_**：等一桌子菜，不管做成啥样（糊了也好，成功了也好），都端上来，我再看看每个菜的情况。
- **_适用场景_**：需要知道每个异步操作的最终结果，即使其中某些失败了。

### 4. `Promise.any([promise1, promise2, ...])` （ES2021）

- **_功能_**：接收一个 Promise 数组，返回一个新的 Promise。
- **_结果_**：只要其中有**_一个_** Promise 成功，它就成功。如果**_所有_** Promise 都失败，它才失败。
- **_比喻_**：找多个朋友帮忙，只要有一个帮成了，就算成功。所有人都帮不了，才算失败。
- **_与 race 的区别_**：`race` 关心第一个完成的（即使是失败），`any` 关心第一个成功的。

## 六、面试回答技巧总结

```text
当被问到“谈谈你对 Promise 的理解”时，可以按这个逻辑组织答案：

一句话定义：“Promise 是 JavaScript 中用于处理异步操作的对象，它代表一个未来才会知道结果的事件。”

解释三大状态：强调 pending，fulfilled，rejected 以及状态的不可逆性。

说明解决的问题：“它主要解决了传统回调函数嵌套导致的‘回调地狱’问题，通过 .then 的链式调用让异步代码更扁平、更易读。”

介绍基本用法：简述如何 new Promise，以及如何使用 .then，.catch，.finally 来消费 Promise。

提及常用静态方法：重点说出 Promise.all 和 Promise.race 的区别和用途，如果能提到 allSettled 和 any 会是加分项。

（可选）点出缺点：“Promise 一旦创建无法取消，错误需要通过回调函数捕获，如果不设置回调函数，内部抛出的错误不会反应到外部。”
```
