# 核心思想：ES6 引入了 let 和 const 是为了解决 var 的设计缺陷，让变量声明更严谨、更可控。

你可以把它们三个想象成三种不同类型的“盒子”，用来装你的数据。

## 一张图快速总结

|   特性   |  var (老式、不推荐)   | let (现代、推荐) | const (现代、推荐) |
| :------: | :-------------------: | :--------------: | :----------------: |
|  作用域  | 函数作用域 块级作用域 |    块级作用域    |
| 变量提升 | 提升并初始化undefined |  提升但不初始化  |   提升但不初始化   |
| 重复声明 |        ✅ 允许        |    ❌ 不允许     |     ❌ 不允许      |
|  初始值  |       可以不设        |     可以不设     |      必须设置      |
| 重新赋值 |        ✅ 允许        |     ✅ 允许      |     ❌ 不允许      |

## 分点详解（带生活比喻）

### 1. 作用域：盒子能起作用的范围

- `var` **_- 函数级盒子_**
  - **_规则：_** `var` 声明的变量，只在**_整个函数内部_**有效。如果不在函数内，就是全局变量。
  - **_通俗理解：_** 就像一个“房间里的盒子”，你在房间里任何地方都能看到它。如果你在一個 if 小隔间里声明了它，整个房间也都能看到它。
  - **_代码示例：：_**
    ```javascript
    function varTest() {
      if (true) {
        var x = 10; // 这个盒子在整個函数内都有效
      }
      console.log(x); // 输出 10 （在if小隔间外也能拿到）
    }
    varTest();
    console.log(x); // 报错：x is not defined （在房间外就拿不到了）
    ```

- `let`**_ / _**`const`**_ - 块级盒子_**
  - **_规则：_** `let` 和 `const` 声明的变量，只在它所在的 `{}` **_代码块_** 内有效。
  - **_通俗理解：_** 就像一个“保险箱里的盒子”，只有在这个保险箱（比如 `if`、`for`、或者单纯一对 `{}`）里面才能访问它。
  - **_代码示例：：_**
    ```javascript
    function letTest() {
      if (true) {
        let y = 20; // 这个盒子只在if这个块里有效
        const z = 30;
      }
      console.log(y); // 报错：y is not defined （在保险箱外拿不到）
      console.log(z); // 报错：z is not defined
    }
    ```

`for`**_循环的经典对比：_**

```javascript
// 使用 var - 糟糕的情况
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 输出 3, 3, 3
}
// 因为 i 是函数级作用域，循环结束后 i=3，所有回调都共享这一个 i。

// 使用 let - 正确的情况
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 输出 0, 1, 2
}
// 因为 let 是块级作用域，每次循环都会创建一个新的 i，互不干扰。
```

### 2. 变量提升：盒子是否提前占好位置

- `var` **_- 提前占位并贴上“空”的标签_**
  - **_规则：_** 使用 `var` 声明的变量，在代码执行前会被提升到其作用域的顶部，并初始化为 `undefined`。
  - **_通俗理解：_** 在正式开工前，JavaScript 引擎就知道你要用这个盒子，所以提前给你准备好了，但里面先放了个“空”（`undefined`）。
  - **_代码示例：：_**
    ```javascript
    console.log(a); // 输出：undefined （而不是报错）
    var a = 5;
    // 相当于：
    // var a = undefined; // 提升
    // console.log(a); // undefined
    // a = 5;
    ```

- `let`**_ / _**`const`**_ - 提前占位但“禁止访问”_**
  - **_规则：_** 它们也会被提升，但**_不会被初始化_**。在声明语句之前访问它们，会抛出错误。这个阶段称为 **_“暂时性死区”_**。
  - **_通俗理解：_** 引擎也知道你要用这个盒子，也提前占了位置，但在你正式声明它之前，它被锁起来了，你碰都碰不到，一碰就报警。
  - **_代码示例：：_**

    ```javascript
    console.log(b); // 报错：Cannot access 'b' before initialization
    let b = 10;

    console.log(c); // 报错
    const c = 20;
    ```

### 3. 重复声明与重新赋值

- `var` **_- 宽松的管理_**
  - 可以在同一作用域内多次声明同一个变量，不会报错。
    ```javascript
    var name = 'Alice';
    var name = 'Bob'; // 没问题，之前的‘Alice’被覆盖了
    console.log(name); // Bob
    ```

- `let`**_ - 严格的管理_**
  - 在同一作用域内不允许重复声明。

    ```javascript
    let age = 25;
    let age = 30; // 报错：Identifier 'age' has already been declared
    ```

  - 但可以**_重新赋值_**。

    ```javascript
    let age = 25;
    age = 30; // 没问题
    console.log(age); // 30
    ```

- `const`**_ - 最严格的管理_**
  - `const` 意为“常量”。
  - 同样**_不允许重复声明_**。
  - **_必须在声明时就赋值_**。

    ```javascript
    const PI; // 报错：Missing initializer in const declaration
    ```

  - **_最重要的一点：声明后不允许重新赋值。_**。

    ```javascript
    const PI = 3.14;
    PI = 3.14159; // 报错：Assignment to constant variable.
    ```

  - `const` **_的深度理解：它锁定的是“地址”，不是“值”_**。
    - 对于基本类型（数字、字符串、布尔等），值就保存在变量指向的地址里，所以等同于常量。
    - 对于引用类型（对象、数组），`const` 锁定的是这个**_对象的地址，但对象本身的内容是可以修改的_**。

  ```javascript
  const person = { name: 'Alice' };
  person.name = 'Bob'; // ✅ 没问题！修改的是对象内部的值
  console.log(person); // { name: 'Bob' }

  person = { name: 'Charlie' }; // ❌ 报错！试图改变 person 指向的整个新对象
  ```

  ```javascript
  const hobbies = ['reading'];
  hobbies.push('gaming'); // ✅ 没问题！修改的是数组内部的内容
  console.log(hobbies); // ['reading', 'gaming']

  hobbies = ['coding']; // ❌ 报错！试图改变 hobbies 指向的整个新数组
  ```

  ## 面试总结与答题技巧

  ### 回答时，可以按照这个思路：
  - 1. **_首先点明核心_**： “`let` 和 `const` 是 ES6 引入的，为了解决 `var` 的一些问题，比如块级作用域和变量提升带来的不确定性。”
  - 2. **_然后分点阐述_**：
    - 2.1. **_作用域：_** `let` 和 `const` 都是块级作用域，只在它所在的 {} 内有效。
    - 2.2. **_变量提升：_** `var` 会被提升到作用域的顶部，但初始化为 `undefined`。`let` 和 `const` 也会被提升，但初始化为未定义。
    - 2.3. **_重复声明：_** `var` 可以重复声明，但 `let` 和 `const` 不可以。
    - 2.4. `let`**_vs _**`const`**_:_** `let` 和 `const` 可以重新赋值，但 `const` 不可以。
  - 3. **_最后给出建议：_**： “在现代开发中，默认使用 `const`，只有当明确知道这个变量需要被重新赋值时，才使用 `let`。基本可以不再使用 `var` 了。”
