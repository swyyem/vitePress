# 作用域链

- 通俗理解： 当你在代码中使用一个变量时，JavaScript会按照一个固定的"寻宝路线图"去查找这个变量在哪里声明。这个路线图就是作用域链。

## 作用域链的查找规则

- 查找顺序： 从当前作用域 → 父级作用域 → 祖父级作用域 → ... → 全局作用域

```javascript
// 全局作用域 - 省城
const globalVar = '我在省城';

function outer() {
  // outer函数作用域 - 市区
  const outerVar = '我在市区';

  function inner() {
    // inner函数作用域 - 县城
    const innerVar = '我在县城';

    console.log(innerVar); // 1. 先在县城找 → 找到了
    console.log(outerVar); // 2. 县城没有，去市区找 → 找到了
    console.log(globalVar); // 3. 市区没有，去省城找 → 找到了
    console.log(notExist); // 4. 到处都找不到 → 报错！
  }

  inner();
}

outer();
```

## 代码演示：作用域链的实际表现

- 基本的链式查找

```javascript
const global = '全局变量';

function level1() {
  const level1Var = '第一层变量';

  function level2() {
    const level2Var = '第二层变量';

    function level3() {
      const level3Var = '第三层变量';

      // 这里可以访问所有外层变量
      console.log(level3Var); // 自己的变量
      console.log(level2Var); // 爸爸的变量
      console.log(level1Var); // 爷爷的变量
      console.log(global); // 祖宗的变量
    }

    level3();
  }

  level2();
}

level1();
```

- 变量屏蔽（就近原则）

```javascript
const name = '全局名字';

function showName() {
  const name = '函数内部名字'; // 这个name"挡住"了外层的name

  console.log(name); // "函数内部名字" - 用自己的，不用外层的
}

showName();
console.log(name); // "全局名字" - 外层的没受影响
```

- 闭包的作用域链

```javascript
function createCounter() {
  let count = 0; // 这个变量被"锁在"闭包的作用域链里

  return function () {
    count++; // 内部函数通过作用域链找到count
    return count;
  };
}

const counter = createCounter();
// 即使createCounter执行完了，返回的函数依然通过作用域链记得count
console.log(counter()); // 1
console.log(counter()); // 2
```

## 作用域链的创建过程

- 通俗理解： 函数在定义时就确定了自己的作用域链，而不是在执行时

```javascript
const globalVar = '全局';

function outer() {
  const outerVar = 'outer的变量';

  // inner函数在定义时，就确定了作用域链：inner → outer → global
  function inner() {
    console.log(outerVar); // 通过作用域链找到outerVar
    console.log(globalVar); // 通过作用域链找到globalVar
  }

  return inner;
}

const myInner = outer();
// 即使在这里执行，inner依然能通过作用域链找到outerVar
myInner(); // 输出："outer的变量" 和 "全局"
```

## 块级作用域的影响（ES6 let/const

```javascript
function demonstrateBlockScope() {
  if (true) {
    var varVariable = 'var声明的'; // 函数作用域
    let letVariable = 'let声明的'; // 块级作用域
    const constVariable = 'const声明的'; // 块级作用域
  }

  console.log(varVariable); // "var声明的" - 可以访问
  // console.log(letVariable); // 报错！letVariable不在这个作用域
  // console.log(constVariable); // 报错！constVariable不在这个作用域
}

demonstrateBlockScope();
```

## 总结

- 作用域链是JavaScript中变量查找的机制。当访问一个变量时，会从当前作用域开始查找，如果找不到就向上一层作用域查找，一直找到全局作用域，如果还找不到就报错。
- 我理解作用域链就像'寻宝地图'：
- 先在自己房间找（当前作用域）
- 找不到就去客厅找（父作用域）
- 再找不到就去小区找（全局作用域）
- 关键点是作用域链在函数定义时就确定了，而不是执行时。这就是闭包能够记住外部变量的原因。
- 在ES6之后，除了函数作用域，还有块级作用域（let/const），这让作用域链的查找更加精确。
- 作用域链 = 变量查找的路线图，从内到外，定义时确定
