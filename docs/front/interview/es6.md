# ES6 革命性新特性

## 1. let 和 const - 更安全的变量声明

- ES5的问题：

```javascript
// var 有变量提升，作用域混乱
console.log(name); // undefined (不会报错！)
var name = '小明';
```

- ES6的解决方案：

```javascript
// let - 块级作用域
console.log(name); // 报错！暂时性死区
let name = '小明';

// const - 常量
const PI = 3.14159;
PI = 3; // 报错！常量不能重新赋值
```

## 2. 箭头函数 - 简化的函数写法

- ES5函数：

```javascript
var add = function (a, b) {
  return a + b;
};

var obj = {
  name: '小明',
  sayHi: function () {
    var self = this;
    setTimeout(function () {
      console.log('你好，我是' + self.name); // 需要保存this
    }, 1000);
  },
};
```

- ES6箭头函数：

```javascript
// 简洁语法
const add = (a, b) => a + b;

// 自动绑定this
const obj = {
  name: '小明',
  sayHi: function () {
    setTimeout(() => {
      console.log('你好，我是' + this.name); // this指向obj
    }, 1000);
  },
};
```

## 3. 模板字符串 - 更优雅的字符串拼接

- ES5字符串拼接：

```javascript
var name = '小明';
var age = 18;
var str = '我叫' + name + '，今年' + age + '岁';
console.log(str);
```

- ES6模板字符串：

```javascript
const name = '小明';
const age = 18;
const str = `我叫${name}，今年${age}岁`;
console.log(str);

// 多行字符串也很方便
const html = `
  <div>
    <h1>标题</h1>
    <p>内容</p>
  </div>
`;
```

## 4. 解构赋值 - 快速提取数据

- ES5取值：

```javascript
var user = { name: '小明', age: 18 };
var name = user.name;
var age = user.age;

var arr = [1, 2, 3];
var first = arr[0];
var second = arr[1];
```

- ES6解构：

```javascript
// 对象解构
const user = { name: '小明', age: 18 };
const { name, age } = user;

// 数组解构
const arr = [1, 2, 3];
const [first, second] = arr;

// 函数参数解构
function getUserInfo({ name, age }) {
  return `姓名：${name}，年龄：${age}`;
}
```

## 5. 默认参数 - 更智能的函数参数

- ES5处理默认参数：

```javascript
function greet(name) {
  name = name || '匿名用户';
  return '你好，' + name;
}
```

- ES6默认参数：

```javascript
function greet(name = '匿名用户') {
  return `你好，${name}`;
}

console.log(greet()); // "你好，匿名用户"
console.log(greet('小明')); // "你好，小明"
```

## 6. 模块化 - 更好的代码组织

- ES5没有原生模块：

```javascript
// 使用IIFE或命名空间模式
var MyModule = (function () {
  var privateVar = '私有变量';

  return {
    publicMethod: function () {
      return privateVar;
    },
  };
})();
```

- ES6模块化：

```javascript
// math.js - 导出
export const PI = 3.14159;
export function add(a, b) {
  return a + b;
}

// app.js - 导入
import { PI, add } from './math.js';
console.log(add(PI, 2));
```

## 7. Promise - 优雅处理异步

- ES5回调地狱：

```javascript
getUser(function (user) {
  getOrders(user.id, function (orders) {
    getOrderDetails(orders[0].id, function (details) {
      // 更多嵌套...
    });
  });
});
```

- ES6Promise：

```javascript
getUser()
  .then(user => getOrders(user.id))
  .then(orders => getOrderDetails(orders[0].id))
  .then(details => {
    // 处理结果
  })
  .catch(error => {
    // 统一错误处理
  });
```

## 8. 类（Class） - 更清晰的面向对象

- ES5构造函数：

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHi = function () {
  return '你好，我是' + this.name;
};
```

- ES6类：

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHi() {
    return `你好，我是${this.name}`;
  }

  // 静态方法
  static createAnonymous() {
    return new Person('匿名', 0);
  }
}
```

# 其他重要ES6特性

## 9. 扩展运算符

```javascript
// 数组展开
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// 对象展开
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// 函数参数
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
```

## 10. 增强的对象字面量

```javascript
// ES5
var name = '小明';
var user = {
  name: name,
  sayHi: function () {
    // ...
  },
};

// ES6
const name = '小明';
const user = {
  name, // 属性简写
  sayHi() {
    // 方法简写
    // ...
  },
  [1 + 2]: '计算属性', // 计算属性名
};
```

## 11. Map 和 Set

```javascript
// Map - 比Object更好的键值对
const map = new Map();
map.set('name', '小明');
map.set(1, '数字键');

// Set - 自动去重的集合
const set = new Set([1, 2, 2, 3, 3]); // [1, 2, 3]
```

# ES5 的重要特性（不能忘记）

## 1. 严格模式 'use strict'

```javascript
'use strict';
x = 10; // 报错！未声明的变量
delete Object.prototype; // 报错！
```

## 2. 数组新增方法

```javascript
// forEach, map, filter, reduce 等
var numbers = [1, 2, 3, 4, 5];

var doubled = numbers.map(function (num) {
  return num * 2;
});

var evens = numbers.filter(function (num) {
  return num % 2 === 0;
});
```

## 3. JSON 支持

```javascript
// JSON.parse() 和 JSON.stringify()
var obj = { name: '小明', age: 18 };
var jsonStr = JSON.stringify(obj); // 对象转JSON字符串
var newObj = JSON.parse(jsonStr); // JSON字符串转对象
```

## 4. 函数绑定（bind）

```javascript
var obj = {
  name: '小明',
  sayHi: function () {
    console.log('你好，' + this.name);
  },
};

var sayHi = obj.sayHi.bind(obj);
sayHi(); // "你好，小明" - this正确绑定
```

## 面试回答技巧

```text
当面试官问"ES5和ES6是JavaScript的一次重大升级，主要改进包括：

语法增强：

let/const 提供了块级作用域和常量

箭头函数让函数写法更简洁，自动绑定this

模板字符串解决了字符串拼接的痛点

解构赋值让数据提取更便捷

编程范式：
5. Class语法让面向对象编程更清晰
6. 模块化提供了官方的代码组织方案
7. Promise解决了回调地狱问题

数据结构：
8. Map/Set提供了更合适的数据结构
9. 扩展运算符让数据操作更灵活

ES5的重要特性包括严格模式、数组高阶方法、JSON支持等。

现代前端开发基本上都以ES6+为标准，这些特性让代码更简洁、可读性更好、更易维护。"

记住核心升级：
ES6 = 更安全(let/const) + 更简洁(箭头函数) + 更强大(Promise/Class)
```
