# 深拷贝与浅拷贝

- 浅拷贝只复制对象的第一层属性，对于引用类型复制的是内存地址，所以修改拷贝对象的引用类型属性会影响原对象。

- 深拷贝会递归复制所有层级的属性，创建完全独立的新对象，修改任何属性都不会影响原对象。

- 在实际开发中，我一般用扩展运算符`...`或`Object.assign()`做浅拷贝，用`JSON.parse(JSON.stringify())`做简单的深拷贝。对于复杂对象会使用`lodash.cloneDeep`或者`手动实现递归拷贝`。

- 选择哪种方式要根据具体场景：如果确定对象没有嵌套引用类型，用浅拷贝性能更好；如果需要完全独立的对象，就必须用深拷贝。

## 浅拷贝：只复制"钥匙"，不复制"房子"

- 通俗理解： 只拷贝第一层的基本数据类型，对于引用类型（对象、数组），拷贝的只是地址引用。

```javascript
// 原始对象
const original = {
  name: '小明',
  age: 18,
  hobbies: ['篮球', '游戏'], // 这是个数组（引用类型）
};

// 浅拷贝
const shallowCopy = Object.assign({}, original);

// 修改浅拷贝后的对象
shallowCopy.name = '小红'; // 修改基本类型 - 不影响原对象
shallowCopy.hobbies.push('游泳'); // 修改引用类型 - 会影响原对象！

console.log(original.name); // "小明" - 没变，好的！
console.log(original.hobbies); // ["篮球", "游戏", "游泳"] - 被影响了，不好！
```

### 浅拷贝的方法

```javascript
// 1. 扩展运算符（最常用）
const copy1 = { ...original };

// 2. Object.assign()
const copy2 = Object.assign({}, original);

// 3. Array.slice()（数组浅拷贝）
const arr = [1, 2, { name: 'test' }];
const arrCopy = arr.slice();

// 问题： 修改copy.hobbies会影响original.hobbies，因为它们指向同一个数组
```

## 深拷贝：完全复制整栋"房子"

- 通俗理解： 递归地拷贝所有层级，创建完全独立的新对象，与原对象毫无关联。

```javascript
// 原始对象
const original = {
  name: '小明',
  age: 18,
  hobbies: ['篮球', '游戏'],
  address: {
    city: '北京',
    street: '长安街',
  },
};

// 深拷贝
const deepCopy = JSON.parse(JSON.stringify(original));

// 修改深拷贝后的对象
deepCopy.name = '小红';
deepCopy.hobbies.push('游泳');
deepCopy.address.city = '上海';

console.log(original.name); // "小明" - 没变
console.log(original.hobbies); // ["篮球", "游戏"] - 没变
console.log(original.address.city); // "北京" - 没变
```

### 深拷贝的方法

- 1. JSON方法（最常用，但有局限性）

```javascript
const deepCopy = JSON.parse(JSON.stringify(original));

// 局限性：
// 不能拷贝函数、undefined、Symbol
// 不能处理循环引用
// 会丢失Date、RegExp等特殊对象的原型
```

- 2. 手动实现深拷贝

```javascript
function deepClone(obj) {
  // 如果不是对象或者是null，直接返回
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // 处理数组
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  // 处理对象
  const result = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
}
```

- 3. 使用现成库 Lodash方法

```javascript
// lodash的深拷贝
const deepCopy = _.cloneDeep(original);
```

## 可视化理解

- 想象这样一个对象：

```javascript
const person = {
  name: '小明', // 基本类型 - 直接存储在对象中
  hobbies: ['篮球', '游戏'], // 引用类型 - 存储的是内存地址
};
```

- 浅拷贝后的内存结构：

```text
person: { name: "小明", hobbies: → 内存地址A }
shallowCopy: { name: "小红", hobbies: → 内存地址A }

两个hobbies指向同一个数组！
```

- 深拷贝后的内存结构：

```text
person: { name: "小明", hobbies: → 内存地址A }
deepCopy: { name: "小红", hobbies: → 内存地址B }

两个hobbies指向不同的数组！
```

## 实战对比

```javascript
// 场景：购物车
const cart = {
  user: '小明',
  items: [{ name: '手机', price: 2999 }],
  total: 2999,
};

// 浅拷贝 - 有问题！
const badCopy = { ...cart };
badCopy.items.push({ name: '耳机', price: 299 }); // 会影响原购物车！

// 深拷贝 - 正确！
const goodCopy = JSON.parse(JSON.stringify(cart));
goodCopy.items.push({ name: '耳机', price: 299 }); // 不会影响原购物车
```
