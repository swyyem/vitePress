# 📘 Vue 常用修饰符总结（通俗易懂 + 面试必背）

---

## 一、什么是修饰符？

> 修饰符（modifier）是 Vue 提供的一种语法糖，作用是**在指令后添加“点语法”来修改默认行为**。  
> 比如：`v-on:click.stop`、`v-model.lazy`。

---

## 二、事件修饰符（v-on）

用于**控制事件传播**或**改变默认行为**。

| 修饰符     | 作用                                            | 示例                                              |
| ---------- | ----------------------------------------------- | ------------------------------------------------- |
| `.stop`    | 阻止事件冒泡                                    | `<button @click.stop="doSomething">按钮</button>` |
| `.prevent` | 阻止默认事件                                    | `<form @submit.prevent="onSubmit">`               |
| `.capture` | 使用事件捕获模式                                | `<div @click.capture="onClick">`                  |
| `.self`    | 仅在自身触发时才执行回调                        | `<div @click.self="onSelfClick">`                 |
| `.once`    | 事件只触发一次                                  | `<button @click.once="sayHi">`                    |
| `.passive` | 提高滚动性能（表示不会调用 `preventDefault()`） | `<div @scroll.passive="onScroll">`                |

💡 **组合使用示例：**

```vue
<button @click.stop.prevent="submitForm">提交</button>
```

---

## 三、按键修饰符（键盘事件）

用于**监听特定按键**。

| 修饰符                         | 说明                | 示例                                 |
| ------------------------------ | ------------------- | ------------------------------------ |
| `.enter`                       | 回车键              | `<input @keyup.enter="submit">`      |
| `.esc`                         | ESC 键              | `<input @keyup.esc="clear">`         |
| `.tab`                         | Tab 键              | `<input @keydown.tab="switchFocus">` |
| `.delete`                      | Delete 或 Backspace | `<input @keyup.delete="remove">`     |
| `.space`                       | 空格键              | `<input @keyup.space="toggle">`      |
| `.up` `.down` `.left` `.right` | 方向键              | `<input @keyup.up="moveUp">`         |

✨ 可以组合使用：

```vue
<input @keyup.enter.ctrl="save" />
```

---

## 四、系统修饰键

用于**监听系统级组合键**。

| 修饰符   | 含义                               | 示例                                    |
| -------- | ---------------------------------- | --------------------------------------- |
| `.ctrl`  | Ctrl 键                            | `<input @keyup.ctrl.enter="save">`      |
| `.alt`   | Alt 键                             | `<button @click.alt="showHelp">`        |
| `.shift` | Shift 键                           | `<div @click.shift="multiSelect">`      |
| `.meta`  | Mac 的 Command / Windows 的 Win 键 | `<button @click.meta="openMenu">`       |
| `.exact` | 精确控制哪些修饰键被按下时才触发   | `<button @click.ctrl.exact="onlyCtrl">` |

---

## 五、表单修饰符（v-model）

用于控制数据绑定的行为。

| 修饰符    | 作用                                       | 示例                              |
| --------- | ------------------------------------------ | --------------------------------- |
| `.lazy`   | 在 `change` 事件触发时同步，而不是 `input` | `<input v-model.lazy="msg">`      |
| `.number` | 将输入值自动转为数字类型                   | `<input v-model.number="age">`    |
| `.trim`   | 自动去除首尾空格                           | `<input v-model.trim="username">` |

示例：

```vue
<input v-model.trim.number.lazy="price" />
```

等价于：在输入完成后更新数据 → 去掉空格 → 转成数字。

---

## 六、鼠标修饰符

| 修饰符    | 说明           | 示例                                |
| --------- | -------------- | ----------------------------------- |
| `.left`   | 只响应鼠标左键 | `<button @click.left="onLeft">`     |
| `.right`  | 只响应鼠标右键 | `<button @click.right="onRight">`   |
| `.middle` | 只响应鼠标中键 | `<button @click.middle="onMiddle">` |

---

## 七、Vue 3 新特性：组件接收修饰符

在 Vue 3 中，修饰符可以传递到子组件：

```vue
<MyInput v-model.trim="username" />
```

子组件内部：

```js
defineProps({
  modelModifiers: Object,
});
```

即可在逻辑中根据修饰符决定行为。

---

## 八、面试答题模板

> Vue 的修饰符是用于改变指令默认行为的语法糖。常见的包括：
>
> - 事件修饰符：`.stop`、`.prevent`、`.once`、`.self`、`.passive`；
> - 按键修饰符：`.enter`、`.esc` 等；
> - 系统修饰符：`.ctrl`、`.shift`、`.meta`；
> - 表单修饰符：`.lazy`、`.number`、`.trim`；
> - 鼠标修饰符：`.left`、`.right`、`.middle`。  
>   Vue 3 还支持自定义组件接收修饰符，让数据绑定更灵活。

---

## 九、总结表格

| 类型       | 修饰符                                                   | 功能概述             |
| ---------- | -------------------------------------------------------- | -------------------- |
| 事件修饰符 | `.stop` `.prevent` `.once` `.self` `.capture` `.passive` | 控制事件触发行为     |
| 按键修饰符 | `.enter` `.esc` `.delete` `.space` `.up` `.down` 等      | 监听特定键盘按键     |
| 系统修饰符 | `.ctrl` `.alt` `.shift` `.meta` `.exact`                 | 监听组合键           |
| 表单修饰符 | `.lazy` `.number` `.trim`                                | 控制表单输入绑定方式 |
| 鼠标修饰符 | `.left` `.right` `.middle`                               | 限定鼠标按键         |

---

## 🔗 参考链接

- Vue 官方文档（事件修饰符）: https://cn.vuejs.org/guide/essentials/event-handling.html
- Vue 官方文档（表单输入绑定）: https://cn.vuejs.org/guide/essentials/forms.html
