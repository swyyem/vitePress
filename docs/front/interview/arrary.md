# js数组的方法

**把数组想象成一个“队伍”或“清单”,你可以对这个“队伍”做很多事情：查看、增删队员、重新排序、筛选队员、把整个队伍变成别的东西等等。**

## 一、队伍内容变更（增删改）

- 这些方法会改变原来的数组。

### 1. 从尾部操作（像栈：后进先出）

```javascript
let fruits = ['苹果', '香蕉'];

// push - 在尾部添加一个或多个元素
fruits.push('橘子'); // ['苹果', '香蕉', '橘子']
// 返回值：新的数组长度

// pop - 从尾部删除最后一个元素
let last = fruits.pop(); // ['苹果', '香蕉']
// 返回值：被删除的元素 ('橘子')
```

### 2. 从头部操作（像队列：先进先出）

```javascript
let fruits = ['苹果', '香蕉'];

// unshift - 在头部添加一个或多个元素
fruits.unshift('橘子'); // ['橘子', '苹果', '香蕉']
// 返回值：新的数组长度

// shift - 从头部删除第一个元素
let first = fruits.shift(); // ['苹果', '香蕉']
// 返回值：被删除的元素 ('橘子')
```

### 3. 万能神器：splice - 任意位置的增删改

```javascript
let fruits = ['苹果', '香蕉', '橘子', '芒果'];

// 删除：从索引1开始，删除2个元素
let removed = fruits.splice(1, 2); // fruits: ['苹果', '芒果']
// removed: ['香蕉', '橘子']

// 添加：从索引1开始，删除0个元素，添加新元素
fruits.splice(1, 0, '葡萄', '梨');
// fruits: ['苹果', '葡萄', '梨', '芒果']

// 替换：从索引1开始，删除1个元素，添加新元素
fruits.splice(1, 1, '樱桃');
// fruits: ['苹果', '樱桃', '梨', '芒果']
```

## 二、队伍顺序变换

### 1. sort - 排序（改变原数组）

```javascript
let numbers = [3, 1, 4, 1, 5];
numbers.sort(); // [1, 1, 3, 4, 5]

// 复杂排序需要比较函数
let scores = [90, 45, 80, 100];
scores.sort((a, b) => b - a); // 降序：[100, 90, 80, 45]
```

### 2. reverse - 反转（改变原数组）

```javascript
let letters = ['a', 'b', 'c'];
letters.reverse(); // ['c', 'b', 'a']
```

## 三、查找和判断队员

- 这些方法不会改变原数组。

### 1. 根据值查找

```javascript
let fruits = ['苹果', '香蕉', '橘子', '香蕉'];

// indexOf - 查找元素的第一个索引
fruits.indexOf('香蕉'); // 1
fruits.indexOf('西瓜'); // -1 (没找到)

// lastIndexOf - 查找元素的最后一个索引
fruits.lastIndexOf('香蕉'); // 3

// includes - 判断是否包含某个元素
fruits.includes('橘子'); // true
```

### 2. 根据条件查找（ES6+）

```javascript
let numbers = [1, 5, 10, 15, 20];

// find - 找到第一个满足条件的元素
let firstBig = numbers.find(num => num > 10); // 15

// findIndex - 找到第一个满足条件的元素的索引
let firstBigIndex = numbers.findIndex(num => num > 10); // 3

// findLast / findLastIndex (ES2023) - 从后往前找
```

### 3. 条件判断

```javascript
let numbers = [2, 4, 6, 8];

// some - 是否有至少一个元素满足条件
numbers.some(num => num > 5); // true (有6, 8)

// every - 是否所有元素都满足条件
numbers.every(num => num % 2 === 0); // true (都是偶数)
```

## 四、生成新队伍（转换和筛选）

- 这些方法返回新数组，不改变原数组。

### 1. map - 映射（一一对应转换）

```javascript
let numbers = [1, 2, 3];
let doubled = numbers.map(num => num * 2); // [2, 4, 6]
// 原数组不变：numbers 还是 [1, 2, 3]
```

### 2. filter - 筛选（过滤出符合条件的）

```javascript
let numbers = [1, 2, 3, 4, 5];
let evens = numbers.filter(num => num % 2 === 0); // [2, 4]
```

### 3. slice - 切片（截取一部分）

```javascript
let fruits = ['苹果', '香蕉', '橘子', '芒果'];

// 从索引1开始，到索引3之前（不包含3）
let someFruits = fruits.slice(1, 3); // ['香蕉', '橘子']

// 复制整个数组的简便方法
let copy = fruits.slice(); // ['苹果', '香蕉', '橘子', '芒果']
```

### 4. concat - 合并

```javascript
let arr1 = [1, 2];
let arr2 = [3, 4];
let combined = arr1.concat(arr2); // [1, 2, 3, 4]
```

## 五、把队伍变成别的东西（聚合计算）

- 这些方法把数组计算成一个值。

### 1. reduce - 从左到右累积

```javascript
let numbers = [1, 2, 3, 4];

// 求和
let sum = numbers.reduce((total, current) => total + current, 0); // 10

// 过程：0+1=1 → 1+2=3 → 3+3=6 → 6+4=10
```

### 2. reduceRight - 从右到左累积

```javascript
let letters = ['a', 'b', 'c'];
let result = letters.reduceRight((acc, cur) => acc + cur); // 'cba'
```

## 六、其他实用方法

### 1. 数组转字符串

```javascript
let fruits = ['苹果', '香蕉', '橘子'];

// join - 用指定分隔符连接
fruits.join('、'); // "苹果、香蕉、橘子"

// toString - 默认用逗号连接
fruits.toString(); // "苹果,香蕉,橘子"
```

### 2. 判断是否是数组

```javascript
Array.isArray([1, 2, 3]); // true
Array.isArray('hello'); // false
```

### 3. ES6+ 新方法

```javascript
// flat - 数组扁平化
let nested = [1, [2, [3]]];
nested.flat(2); // [1, 2, 3]

// flatMap - 先map后flat(1)
[1, 2, 3].flatMap(x => [x, x * 2]); // [1, 2, 2, 4, 3, 6]
```

## 面试回答策略

1. **先分类再说方法：** "JS数组方法很多，我可以按功能分类来说："
2. **按类别阐述：**

- "**会改变原数组** 的方法主要有操作头尾的 `push/pop/shift/unshift`，还有万能的 `splice`，以及排序相关的 `sort/reverse`。"
- "**返回新数组** 的方法有 `map`（转换）、`filter`（筛选）、`slice`（切片）、`concat`（合并）等。"
- "**查找判断**类的方法有 `indexOf/includes`（按值找）、`find/findIndex`（按条件找）、`some/every`（条件判断）。"
- "**聚合计算** 的方法主要是 `reduce`，可以把数组计算成一个值。"

3. **重点强调区别：** "特别要注意哪些方法会改变原数组，哪些不会，这在工作中很容易出错。"
4. **举例说明：** "比如我想把用户列表里所有成年用户的名字提取出来，可以先用 `filter` 筛选年龄≥18的，再用 `map` 提取name属性。"

### 记忆技巧：

- **改变原数组：** `push pop shift unshift splice sort reverse`
- **返回新数组：** `map filter slice concat flat flatMap`
- **查找判断：** `indexOf find includes some every`
- **聚合计算：** `reduce`
