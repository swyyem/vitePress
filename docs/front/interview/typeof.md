# 怎样判断变量的类型

**判断变量类型没有一把“万能钥匙”，我们需要根据不同的场景，尤其是要区分原始类型和引用类型，来选择最合适的“工具”。**

## 方法一：typeof 探测器（快速识别基本类型）

`typeof` 探测器可以判断变量的类型，但是它只能识别原始类型。

- 优点：对基本类型（数字、字符串、布尔、undefined、函数）识别得很准。
- 缺点：无法区分 **_数组_**、**_对象_** 和 **_null_**，它会把它们都报告成 `"object"`。

```javascript
console.log(typeof 42); // "number"    -> 发现一条鱼
console.log(typeof 'hello'); // "string"    -> 发现一只鹦鹉
console.log(typeof true); // "boolean"   -> 发现一个开关
console.log(typeof undefined); // "undefined" -> 发现一个空笼子

console.log(typeof function () {}); // "function" -> 发现一个会表演的宠物（特例，很准！）

// 下面是它不太好用的地方：
console.log(typeof []); // "object"    -> 它把狗窝识别成了“物体”，但不知道是哪种物体
console.log(typeof {}); // "object"    -> 它把猫也识别成了“物体”
console.log(typeof null); // "object"    -> 一个著名的BUG！它把一个空笼子错误地识别成了“物体”
```

## array.isArray()

`array.isArray()` 方法可以判断一个变量是否是数组。

- 优点：对数组识别得非常准。

```javascript
console.log(Array.isArray([])); // true  -> 没错，这是个狗窝！
console.log(Array.isArray({})); // false -> 这不是狗窝，是只猫。
console.log(Array.isArray(123)); // false -> 这明明是条鱼，不是狗窝。
```

## instanceof 探测器（快速识别引用类型）

- 优点：适合检查通过构造函数或类创建的对象实例。
- 缺点：在多个执行环境（如多个iframe）中可能不可靠，且对基本类型无效。

```javascript
// 假设我们有一种“猫”这个种类
class Cat {}

const myPet = new Cat();

console.log(myPet instanceof Cat); // true  -> 你这只宠物确实是猫的后代
console.log([] instanceof Array); // true  -> 这个狗窝确实是数组家族的后代
console.log({} instanceof Object); // true  -> 这只猫（或任何对象）都是对象家族的后代

// 但它对基本类型不好用
console.log('hello' instanceof String); // false -> 原始字符串不是String对象的实例
```

## Object.prototype.toString()

`Object.prototype.toString()` 方法可以判断一个变量的类型。

- 优点：百分百准确，能区分所有内置类型。
- 缺点：写法有点长，有点啰嗦。

```javascript
console.log(Object.prototype.toString.call(42)); // "[object Number]"
console.log(Object.prototype.toString.call('hello')); // "[object String]"
console.log(Object.prototype.toString.call(true)); // "[object Boolean]"
console.log(Object.prototype.toString.call([])); // "[object Array]"   <- 看，能分清数组了！
console.log(Object.prototype.toString.call({})); // "[object Object]"
console.log(Object.prototype.toString.call(null)); // "[object Null]"    <- 看，能分清null了！
console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]"
console.log(Object.prototype.toString.call(function () {})); // "[object Function]"
```

## 回答技巧

```text
“我一般会根据不同的场景选择不同的方法：

最常用的是 typeof，因为它简单快捷，特别适合判断基本数据类型和函数。但要注意它无法区分数组、对象和null。

当需要专门判断数组时，我会用 Array.isArray()，这是现代、可靠的方法。

如果涉及到通过构造函数（比如 new）创建的实例对象，我会用 instanceof 来检查它的原型链。

在需要最精确、最全面的类型判断时，我会祭出终极武器——Object.prototype.toString.call()，它能准确返回所有内置类型。

所以，没有一种方法是万能的，关键是看使用场景。”
```
