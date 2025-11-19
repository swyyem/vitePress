# new 操作符内部原理详解

## 直观理解：工厂比喻

- 想象一个汽车工厂：
  - 构造函数 = 汽车设计图纸
  - new = 生产线
  - 实例对象 = 生产出来的汽车

```javascript
// 设计图纸（构造函数）
function Car(brand, color) {
  this.brand = brand; // 品牌
  this.color = color; // 颜色
  this.speed = 0; // 速度
}

// 生产线（new）
const myCar = new Car('宝马', '黑色');

console.log(myCar.brand); // "宝马"
console.log(myCar.color); // "黑色"
```

## new 内部执行的 4 个关键步骤

### 步骤分解

```javascript
// 当我们执行：const obj = new MyClass('参数')
// JavaScript 内部实际上做了这些事情：

// 步骤1：创建一个空对象
const newObj = {};

// 步骤2：链接原型链
newObj.__proto__ = MyClass.prototype;

// 步骤3：绑定this并执行构造函数
MyClass.call(newObj, '参数');

// 步骤4：返回新对象
return newObj;
```

### 手动实现 new

```javascript
// 手动实现 new 操作符
function myNew(constructor, ...args) {
  console.log('=== new 内部执行过程 ===');

  // 1. 创建一个空对象
  const newObj = {};
  console.log('步骤1：创建空对象', newObj);

  // 2. 将新对象的原型指向构造函数的 prototype
  newObj.__proto__ = constructor.prototype;
  console.log('步骤2：设置原型链', newObj.__proto__);

  // 3. 将构造函数的 this 绑定到新对象，并执行构造函数
  const result = constructor.apply(newObj, args);
  console.log('步骤3：执行构造函数，this指向新对象');

  // 4. 如果构造函数返回对象，则返回该对象；否则返回新对象
  const finalResult = typeof result === 'object' && result !== null ? result : newObj;
  console.log('步骤4：返回最终结果', finalResult);

  return finalResult;
}
```

### 完整示例演示

```javascript
// 构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHello = function () {
    console.log(`你好，我是${this.name}，今年${this.age}岁`);
  };
}

// 在原型上添加方法
Person.prototype.species = '人类';
Person.prototype.introduce = function () {
  console.log(`我叫${this.name}，属于${this.species}`);
};

// 使用我们自己的 new 实现
const person1 = myNew(Person, '张三', 25);

console.log(person1.name); // "张三"
console.log(person1.age); // 25
person1.sayHello(); // "你好，我是张三，今年25岁"
person1.introduce(); // "我叫张三，属于人类"

// 验证原型链
console.log(person1.__proto__ === Person.prototype); // true
console.log(person1 instanceof Person); // true
```

## 构造函数返回值的情况

### 情况1：构造函数返回对象

```javascript
function Person(name) {
  this.name = name;

  // 如果返回对象，则 new 操作符返回这个对象
  return { custom: '自定义对象' };
}

const person = new Person('张三');
console.log(person); // { custom: '自定义对象' }
console.log(person.name); // undefined（因为返回的是自定义对象）
```

### 情况2：构造函数返回原始值

```javascript
function Person(name) {
  this.name = name;

  // 如果返回原始值，会被忽略，仍然返回新创建的对象
  return '字符串会被忽略';
}

const person = new Person('李四');
console.log(person); // Person { name: '李四' }
console.log(person.name); // "李四"
```

### 情况3：构造函数没有返回值

```javascript
function Person(name) {
  this.name = name;
  // 没有 return，默认返回新创建的对象
}

const person = new Person('王五');
console.log(person); // Person { name: '王五' }
```

## 实际应用场景

### 场景1：创建多个相似对象

```javascript
// 用户管理系统
function User(name, email, role = 'user') {
  this.id = Date.now().toString(36); // 生成唯一ID
  this.name = name;
  this.email = email;
  this.role = role;
  this.createdAt = new Date();
  this.isActive = true;
}

// 原型方法
User.prototype.deactivate = function () {
  this.isActive = false;
  console.log(`用户 ${this.name} 已被停用`);
};

User.prototype.getInfo = function () {
  return `${this.name} (${this.email}) - ${this.role}`;
};

// 创建用户实例
const admin = new User('管理员', 'admin@example.com', 'admin');
const user1 = new User('张三', 'zhangsan@example.com');
const user2 = new User('李四', 'lisi@example.com');

console.log(admin.getInfo()); // "管理员 (admin@example.com) - admin"
console.log(user1.getInfo()); // "张三 (zhangsan@example.com) - user"
```

### 场景2：实现继承

```javascript
// 基类：动物
function Animal(name) {
  this.name = name;
  this.energy = 100;
}

Animal.prototype.eat = function () {
  this.energy += 10;
  console.log(`${this.name} 吃东西，能量+10`);
};

Animal.prototype.sleep = function () {
  this.energy += 20;
  console.log(`${this.name} 睡觉，能量+20`);
};

// 派生类：狗
function Dog(name, breed) {
  // 调用父类构造函数
  Animal.call(this, name);
  this.breed = breed;
}

// 设置原型链继承
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// 添加子类特有方法
Dog.prototype.bark = function () {
  console.log(`${this.name} (${this.breed}) 汪汪叫！`);
};

// 创建实例
const myDog = new Dog('旺财', '金毛');
myDog.eat(); // "旺财 吃东西，能量+10"
myDog.bark(); // "旺财 (金毛) 汪汪叫！"
console.log(myDog.energy); // 110
```

## 面试常见问题与回答

### 1. new 操作符具体做了什么？

```text
"new 操作符主要做了四件事：

创建空对象：在内存中创建一个新的空对象

设置原型链：将这个空对象的原型指向构造函数的 prototype 属性

绑定this执行：将构造函数的 this 绑定到这个新对象，并执行构造函数代码

返回对象：如果构造函数没有返回对象，则返回这个新对象"
```

### 2. 如果不使用 new 会怎样？

```javascript
function Person(name) {
  this.name = name;
}

// 正确使用
const person1 = new Person('张三'); // Person { name: '张三' }

// 错误使用（忘记 new）
const person2 = Person('李四');
console.log(person2); // undefined
console.log(window.name); // "李四"（污染全局变量）
```

### 3. 如何判断函数是否被 new 调用？

```javascript
function Person(name) {
  // 方法1：检查 this 指向
  if (!(this instanceof Person)) {
    throw new Error('必须使用 new 调用构造函数');
  }

  // 方法2：ES6 new.target
  if (new.target !== Person) {
    throw new Error('必须使用 new 调用构造函数');
  }

  this.name = name;
}

// 正确
const p1 = new Person('张三');

// 错误（会抛出异常）
const p2 = Person('李四');
```

### 4. 箭头函数能用 new 吗？

```javascript
const Person = name => {
  this.name = name; // 错误！箭头函数没有自己的 this
};

// 这会报错
const person = new Person('张三');
// TypeError: Person is not a constructor
```

**_原因： 箭头函数没有 [[Construct]] 内部方法，不能被 new 调用。_**

## 错误用法和注意事项

### 常见错误

```javascript
// 错误1：构造函数忘记返回值判断
function BadExample() {
  return { custom: '对象' };
  // 后面的代码不会执行
  this.name = '这行代码不会执行';
}

// 错误2：在构造函数中返回原始值
function ConfusingExample() {
  this.value = '会被覆盖';
  return 123; // 返回原始值会被忽略
}

const obj = new ConfusingExample();
console.log(obj.value); // "会被覆盖"（仍然能访问）

// 错误3：污染全局变量
function DangerousExample() {
  this.name = '正确';
  globalVar = '危险'; // 没有 var/let/const，成为全局变量
}
```

### 最佳实践

```javascript
// 1. 构造函数首字母大写
function User(config) {
  // 2. 安全检查
  if (!(this instanceof User)) {
    return new User(config);
  }

  // 3. 参数验证
  if (!config || typeof config !== 'object') {
    throw new Error('参数必须是对象');
  }

  // 4. 初始化属性
  this.name = config.name || '匿名用户';
  this.email = config.email || '';
  this.createdAt = new Date();

  // 5. 不要返回任何值（除非有特殊需求）
}

// 使用
const user = new User({ name: '张三', email: 'zhang@example.com' });
// 或者（因为有安全检查）
const user2 = User({ name: '李四' });
```
