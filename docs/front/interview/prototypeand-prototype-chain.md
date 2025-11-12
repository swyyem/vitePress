# 原型和原型链

**\_想象一下，每个人都有自己的亲生父母，也继承了父母的某些特征（比如眼睛颜色、身高基因）。同时，你还可以追溯你的爷爷奶奶，甚至更早的祖先。在JavaScript中，对象就像一个人，它有一个隐藏的属性叫 **proto**（读作"dunder proto"），这个属性指向它的原型对象（可以理解为它的"亲生父母"）。\_**

## 什么是原型（Prototype）

### 1. 函数的 prototype 属性

- 每个函数（特别是构造函数）都有一个自带的属性叫 prototype（原型属性）。你可以把它想象成这个函数的"传家宝"或者"家族徽章"。

```javascript
// 创建一个"人"的构造函数
function Person(name) {
  this.name = name;
}

// 给Person函数的"传家宝"（prototype）上添加一个能力
Person.prototype.sayHello = function () {
  console.log(`你好，我是${this.name}`);
};

// Person的"传家宝"上还有一个默认的属性
console.log(Person.prototype.constructor === Person); // true
```

### 2. 对象的 **proto** 属性

- 当你用 new 关键字创建一个对象时，这个对象就会自动获得一个 `__proto__` 属性，指向构造函数的 prototype。

```javascript
// 用new创建一个"人"的实例
const person1 = new Person('小明');
const person2 = new Person('小红');

// 这两个人的 __proto__ 都指向 Person.prototype
console.log(person1.__proto__ === Person.prototype); // true
console.log(person2.__proto__ === Person.prototype); // true
```

### 关系图

```text
person1 = { name: '小明', __proto__ } → 指向 → Person.prototype
person2 = { name: '小红', __proto__ } → 指向 → Person.prototype
```

## 什么是原型链（Prototype Chain）？

**_现在有趣的部分来了！原型对象自己也有 `__proto__`，可以指向更上一层的原型，这样就形成了一条链子_**

### 让我们扩展家族树：

```javascript
// Person.prototype 也是一个对象，它也有 __proto__
// 默认指向 Object.prototype（所有对象的祖先）

console.log(Person.prototype.__proto__ === Object.prototype); // true

// Object.prototype 就是终点了，它的 __proto__ 是 null
console.log(Object.prototype.__proto__); // null
```

### 完整的原型链：

```text
person1 → Person.prototype → Object.prototype → null
```

## 原型链如何工作？（查找机制）

- 当你访问一个对象的属性或方法时，JavaScript会沿着原型链向上查找：

```javascript
// person1 自己有 name 属性吗？有！直接使用。
console.log(person1.name); // "小明"

// person1 自己有 sayHello 方法吗？没有！
// 那就去它的 __proto__（Person.prototype）上找
// 找到了！就调用
person1.sayHello(); // "你好，我是小明"

// person1 有 toString 方法吗？没有！
// Person.prototype 有 toString 吗？也没有！
// 那就继续往上，去 Person.prototype.__proto__（Object.prototype）上找
// 找到了！Object.prototype 上有 toString 方法
console.log(person1.toString()); // "[object Object]"
```

- 在自己身上找 → 找到就返回
- 没找到？去爸爸（`__proto__`）身上找 → 找到就返回
- 还没找到？去爷爷身上找 → 找到就返回
- 一直找到 null（家族起源）还没找到？ → 返回 undefined

## 回答

```text
"我用一个家族遗传的比喻来理解：

原型（Prototype）：

每个函数都有一个 prototype 属性，就像是这个函数家族的'传家宝'，里面放着给后代继承的属性和方法。

每个对象都有一个 __proto__ 属性，指向创建它的构造函数的 prototype，就像是找到了自己的'亲生父母'。

原型链（Prototype Chain）：

当访问一个对象的属性时，如果对象自身没有，就会通过 __proto__ 去它的原型上找，如果还没有，就继续往上一级原型找，这样形成的一条链式结构就是原型链。

这条链的终点是 Object.prototype，它的 __proto__ 是 null。

实际应用：

这就是JavaScript实现继承的方式。比如我们创建的数组可以使用 toString、hasOwnProperty 等方法，就是因为通过原型链找到了 Object.prototype 上的这些方法。

ES6的 class 语法本质也是基于原型继承的语法糖。

理解原型链对于理解JavaScript的继承机制和对象属性查找非常重要。"
```
