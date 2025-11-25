# 实现继承的几种方式

你可以把继承想象成 **_“孩子如何获得父母的财产和技能”_**。

**_继承就是让一个对象（子类）能够访问并使用另一个对象（父类）的属性和方法，实现代码复用和逻辑分层。_**

## 1. 原型链继承 - “家族信托基金”

**_比喻：_** 孩子可以通过家族信托基金，直接使用父母留下的钱，但不能随意修改基金规则。

```javascript
// 父类（父母）
function Parent() {
  this.name = '父亲';
  this.assets = ['房子', '车子'];
}
Parent.prototype.say = function () {
  console.log('我是' + this.name);
};

// 子类（孩子）
function Child() {
  this.name = '儿子';
}

// 关键：让孩子的原型指向父亲的一个实例
Child.prototype = new Parent();

// 测试
const child1 = new Child();
const child2 = new Child();

child1.say(); // "我是儿子" - 可以访问父类方法
console.log(child1.assets); // ["房子", "车子"] - 可以访问父类属性

// 问题：引用类型属性被共享了！
child1.assets.push('股票');
console.log(child2.assets); // ["房子", "车子", "股票"] - 孩子的资产也变了！
```

- **_优点：_**
  - 简单易懂
  - 可以继承父类原型上的方法

- **_缺点：_**
  - 所有实例共享引用类型的属性（如数组、对象）
  - 无法向父类构造函数传参

## 2. 构造函数继承 - “现金遗产继承”

**_比喻：_** 父母给每个孩子都留了一份独立的现金遗产，互不影响。

```javascript
function Parent(name) {
  this.name = name;
  this.assets = ['房子', '车子'];
  this.say = function () {
    console.log('我是' + this.name);
  };
}

function Child(name) {
  // 关键：在子类构造函数中调用父类构造函数
  Parent.call(this, name); // 相当于复制了一份父类的属性
}

// 测试
const child1 = new Child('大儿子');
const child2 = new Child('二儿子');

child1.assets.push('股票');
console.log(child1.assets); // ["房子", "车子", "股票"]
console.log(child2.assets); // ["房子", "车子"] - 不受影响！

// 问题：方法不能复用
console.log(child1.say === child2.say); // false - 每个实例都有独立的say方法
```

- **_优点：_**
  - 解决了引用属性共享问题
  - 可以向父类传参

- **_缺点：_**
  - 方法都在构造函数中定义，无法复用
  - 不能继承父类原型上的方法

## 3. 组合继承 - “房产+基金组合继承”

**_比喻：_** 既继承房产（构造函数继承），又享受家族基金（原型链继承），这是最常用的方式。

```javascript
function Parent(name) {
  this.name = name;
  this.assets = ['房子', '车子'];
}

// 方法放在原型上实现复用
Parent.prototype.say = function () {
  console.log('我是' + this.name);
};

function Child(name, age) {
  // 1. 继承属性（构造函数继承）
  Parent.call(this, name); // 第一次调用Parent
  this.age = age;
}

// 2. 继承方法（原型链继承）
Child.prototype = new Parent(); // 第二次调用Parent
Child.prototype.constructor = Child; // 修复构造函数指向

// 测试
const child1 = new Child('小明', 10);
const child2 = new Child('小红', 8);

child1.say(); // "我是小明" - 可以调用父类方法
child1.assets.push('自行车');
console.log(child1.assets); // ["房子", "车子", "自行车"]
console.log(child2.assets); // ["房子", "车子"] - 不受影响
```

- **_优点：_**
  - 融合了前两种方式的优点
  - 既是实例的属性，又共享方法

- **_缺点：_**
  - 调用了两次父类构造函数

## 4. 原型式继承 - “克隆继承”

**_比喻：_** 直接克隆父母的资产清单，快速创建类似的对象。

```javascript
// Object.create() 的模拟实现
function createObject(parent) {
  function F() {}
  F.prototype = parent;
  return new F();
}

const parent = {
  name: '父亲',
  assets: ['房子', '车子'],
  say: function () {
    console.log('我是' + this.name);
  },
};

const child1 = createObject(parent);
const child2 = createObject(parent);

child1.name = '大儿子';
child1.assets.push('股票'); // 同样有引用共享问题

console.log(child2.assets); // ["房子", "车子", "股票"]
```

- **_适用场景：_**
  - 不需要构造函数的简单对象继承
  - ES5 的 `Object.create()` 就是这种模式

## 5. 寄生式继承 - “增强版克隆”

**_比喻：_** 在克隆的基础上，给对象增加一些特有的能力。

```javascript
function createEnhancedObject(parent) {
  // 1. 克隆对象
  const clone = Object.create(parent);

  // 2. 增强对象（添加新方法）
  clone.specialSkill = function () {
    console.log('我有特殊技能！');
  };

  return clone;
}

const parent = {
  name: '父亲',
  say: function () {
    console.log('我是' + this.name);
  },
};

const child = createEnhancedObject(parent);
child.say(); // "我是父亲"
child.specialSkill(); // "我有特殊技能！"
```

- **_特点：_**
  - 在原型式继承基础上增强功能
  - 同样有引用共享问题

## 6. 寄生组合式继承 - “完美继承方案”

**_比喻：_** 用最经济的方式实现最完整的继承，ES6 class 的底层实现原理。

```javascript
function inherit(Child, Parent) {
  // 1. 创建父类原型的副本（避免直接赋值导致引用共享）
  const prototype = Object.create(Parent.prototype);

  // 2. 修复constructor指向
  prototype.constructor = Child;

  // 3. 设置子类原型
  Child.prototype = prototype;
}

function Parent(name) {
  this.name = name;
  this.assets = ['房子', '车子'];
}

Parent.prototype.say = function () {
  console.log('我是' + this.name);
};

function Child(name, age) {
  // 继承属性
  Parent.call(this, name);
  this.age = age;
}

// 继承方法
inherit(Child, Parent);

// 测试
const child = new Child('小明', 10);
child.say(); // "我是小明"
console.log(child instanceof Parent); // true
```

- **_优点：_**
  - 只调用一次父类构造函数
  - 避免了不必要的属性创建
  - 是最理想的继承方式

## 7. ES6 Class 继承 - “现代语法糖”

**_比喻：_** 用现代化的法律文书来规范遗产继承，简洁明了。

```javascript
class Parent {
  constructor(name) {
    this.name = name;
    this.assets = ['房子', '车子'];
  }

  say() {
    console.log('我是' + this.name);
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name); // 必须调用super
    this.age = age;
  }

  // 子类特有方法
  play() {
    console.log('我在玩耍');
  }
}

// 测试
const child = new Child('小明', 10);
child.say(); // "我是小明"
child.play(); // "我在玩耍"
console.log(child instanceof Parent); // true
```

- **_特点：_**
  - 语法简洁，易于理解
  - 底层基于寄生组合式继承
  - `extends` 实现继承，`super` 调用父类

## 面试标准答案总结

**_"JavaScript 继承主要有以下几种方式：_**

- **_原型链继承_**：通过修改原型链实现，但引用属性会被共享
- **_构造函数继承_**：在子类中调用父类构造函数，但方法无法复用
- **_组合继承_**：结合前两种方式，最常用但会调用两次父类构造函数
- **_原型式继承_**：基于已有对象创建新对象
- **_寄生式继承_**：在原型式基础上增强功能
- **_寄生组合式继承_**：最完美的继承方式，只调用一次父类构造函数
- **_ES6 Class 继承_**：现代语法，底层基于寄生组合式继承

**_推荐使用 ES6 的 class 语法，它简洁易懂且性能最优。"_**
