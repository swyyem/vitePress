# 核心思想：谁调用，就指向谁（绝大多数情况）

**_把 `this` 想象成一个代词，就像“我”这个词。_**

- “我”指的是谁，取决于**_说这句话的人_**在什么环境下说的。
- `this` 指的是谁，取决于**_调用这个函数的对象_**是谁。

**_记住最关键的一句话：`this` 的指向是在函数被调用时确定的，而不是在函数定义时确定的。_**

## 四种绑定规则的“段位”（从低到高）

你可以把这四种规则想象成游戏里的规则优先级，优先级高的会覆盖优先级低的。

### 1. 默认绑定（菜鸟段位）- 没人管的时候

- **_规则_**： 在严格模式 `(‘use strict’)` 下，`this` 是 `undefined`。在非严格模式下，`this` 指向全局对象（浏览器中是 `window`）。
- **_通俗理解_**： 一个函数“孤零零”地直接调用，没人带领它。

```javascript
function showThis() {
  console.log(this);
}

showThis(); // 在浏览器中输出：Window （非严格模式）
// 相当于 window.showThis()，但window被省略了
```

- **_面试场景_**： 在模块化开发（如ES6 Module、Webpack）中，默认就是严格模式，这里的 `this` 会是 `undefined`，很容易出错。

### 2. 隐式绑定（黄金段位）- 谁调用就指向谁

- **_规则_**： 函数作为对象的方法被调用时，`this` 指向`调用它的那个对象`。
- **_通俗理解_**： 函数找到了一个“老板”，this就指向这个“老板”。

```javascript
const person = {
  name: 'Alice',
  sayHi: function () {
    console.log(`Hello, I'm ${this.name}`);
  },
};

person.sayHi(); // 输出：Hello, I'm Alice
// “老板”是 person 对象，所以 this 指向 person
```

- **_陷阱（隐式丢失）_**：

这是面试官最爱问的！当函数被“分离”出来单独调用时，就会丢失原来的“老板”，退回到“默认绑定”规则。

```javascript
const person = {
  name: 'Alice',
  sayHi: function () {
    console.log(`Hello, I'm ${this.name}`);
  },
};

const outerSayHi = person.sayHi; // ！！！关键：只是把函数赋值给了变量
outerSayHi(); // 输出：Hello, I'm
// 现在函数是“孤零零”调用的，this 指向全局（window）或 undefined
```

- **_常见丢失场景_**：
  - **_函数赋值给变量_**（如上例）
  - **_回调函数_**（非常重要！）

```javascript
setTimeout(person.sayHi, 1000);
// 1秒后输出：Hello, I'm
// 因为 setTimeout 拿到的是 person.sayHi 这个函数本身，执行时并没有 person 这个上下文。
```

### 3. 显式绑定（钻石段位）- 我命令你指向谁

- **_规则_**： 使用 `call`, `apply`, `bind` 方法，强制指定函数内部的 `this` 指向。
- **_通俗理解_**： 我不在乎谁调用，我直接用“命令”告诉函数，你的 `this` 必须是谁。
  - `call` **_和_** `apply`：立即调用函数，并指定 `this`。
    - `func.call(thisArg, arg1, arg2...)` （参数一个一个传）
    - `func.apply(thisArg, [arg1, arg2...])` （参数用数组传）

  ```javascript
  function introduce(lang) {
    console.log(`I use ${lang} and I'm ${this.name}`);
  }

  const developer = { name: 'Bob' };

  // 用 call 命令：this 必须是 developer，参数是 'JavaScript'
  introduce.call(developer, 'JavaScript'); // I use JavaScript and I'm Bob

  // 用 apply 命令：效果一样，参数用数组传
  introduce.apply(developer, ['Python']); // I use Python and I'm Bob
  ```

  - `bind`：**_不立即调用_**，而是返回一个绑定了永久 `this` 的新函数
    - `const newFunc = func.bind(thisArg)`

  ```javascript
  const developer = { name: 'Bob' };

  // 创建一个新函数 boundIntroduce，它的 this 被永久绑定为 developer
  const boundIntroduce = introduce.bind(developer);

  boundIntroduce('Java'); // I use Java and I'm Bob

  // 解决刚才 setTimeout 的隐式丢失问题！
  setTimeout(introduce.bind(developer), 1000); // 1秒后正确输出
  ```

### 4. new 绑定（王者段位）- 创造一个全新的世界

- **_规则_**： 使用 `new` 关键字调用构造函数时，`this` 会**_绑定到新创建的那个实例对象上_**。
- **_通俗理解_**： `new` 像一个造物主，它创建了一个全新的对象，并让函数里的 `this` 指向这个新对象。

```javascript
function Person(name) {
  // 当用 new 调用时，这里的 this 自动指向新创建的空对象 {}
  this.name = name;
  // 最后会自动 return this;
}

const me = new Person('Charlie');
console.log(me.name); // Charlie
// this 指向了 new 创建出来的新对象 me
```

## 特殊情况的“外挂”（箭头函数）

### 箭头函数是上述规则的“外挂”，它不遵守以上任何一条规则。

- **_规则_**： 箭头函数没有自己的 `this`，它的 `this` **_继承自定义它时所在的外层作用域_**。
- **_通俗理解_**： 箭头函数里的 `this` 是“透明的”，你直接看它外面的那个普通函数的 `this` 是谁，它就是谁。

```javascript
const obj = {
  name: 'David',
  regularFunc: function () {
    console.log('Regular:', this.name); // 这里的 this 是 obj （隐式绑定）
  },
  arrowFunc: () => {
    console.log('Arrow:', this.name); // 这里的 this 是外层作用域的 this！
  },
};

obj.regularFunc(); // Regular: David
obj.arrowFunc(); // Arrow:
// 因为 obj 是在全局定义的，外层作用域是全局，this 指向 window
```

### 箭头函数的最大用处：解决回调函数中的 `this` 丢失问题。

```javascript
const person = {
  name: 'Alice',
  sayHi: function () {
    // 外层普通函数的 this 指向 person （隐式绑定）
    setTimeout(() => {
      // 箭头函数继承外层 sayHi 函数的 this，也就是 person
      console.log(`Hello, I'm ${this.name}`); // Hello, I'm Alice
    }, 1000);
  },
};

person.sayHi();
```

## 面试总结与答题技巧

1. **_首先判断函数类型_**：是普通函数还是箭头函数？
2. **_如果是箭头函数_**：直接看它**_外层最近的一个普通函数_**的 `this` 是谁。
3. **_如果是普通函数_**：按优先级判断：
   - **_new 绑定_**：函数是否在 `new` 中调用？是则 `this` 指向新对象。
   - **_显式绑定_**：是否用了 `call`, `apply`, `bind`？是则 `this` 指向指定的对象。
   - **_隐式绑定_**：函数是否作为某个对象的方法调用？是则 `this` 指向那个对象。
   - **_默认绑定_**：以上都不是，在严格模式下是 `undefined`，非严格模式下是全局对象。

**_经典面试题回答示例：_**

```text
“this 的指向主要取决于函数的调用方式。普通函数谁调用它就指向谁，但如果用了 call、apply 或 bind，就可以强制改变它的指向。而用 new 调用时，this 会指向新创建的实例。特别需要注意的是箭头函数，它自己没有 this，用的是它定义时所在的外层作用域的 this。在实际开发中，最常见的问题就是回调函数导致的‘隐式丢失’，我们可以用 bind 或者箭头函数来解决。”
```
