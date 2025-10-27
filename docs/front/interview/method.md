# 父组件调用子组件方法

## **父组件通过一种“桥梁”拿到子组件的实例，然后就可以直接调用这个实例上的方法。**

## 二、为什么需要这么做？（使用场景）

在Vue/React的默认数据流中，是 **“自上而下”** 的：

- 父 → 子：通过 Props 传递数据。
- 子 → 父：通过 自定义事件 传递消息。

但有些特殊场景下，这种“通信”的方式会显得很麻烦：

1. **直接操作子组件的DOM或状态：例如，父组件触发子组件内部的输入框聚焦、让一个子组件动画播放/暂停、让一个可滚动的列表滚动到顶部。**
2. **获取子组件的数据：子组件内部有一些计算好的数据，父组件需要直接读取。**
3. **触发子组件的某个内部行为：这个方法与子组件内部状态强相关，不适合通过Props来驱动。**

- **`面试点睛：一定要先强调你理解并遵循单向数据流，但在某些特定、合理的场景下，才会使用这种“命令式”的方法。`**

## 三、如何实现？（不同技术栈的方案）

### 1. Vue 2 的实现方式

使用 `ref` 和 `$refs`。

- **子组件 Child.vue**

```vue
<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello from Child!'
    }
  },
  methods: {
    // 1. 定义一个子组件的方法
    showMessage() {
      console.log(this.message);
      this.message = ‘方法被父组件调用了！’;
    },
    // 另一个方法，可以接收参数
    changeMessage(newMsg) {
      this.message = newMsg;
    }
  }
}
</script>
```

- **父组件 Parent.vue**

```vue
<template>
  <div>
    <!-- 2. 给子组件绑定一个 ref 属性 -->
    <ChildComponent ref="myChildRef" />

    <!-- 3. 在父组件的方法中，通过 this.$refs 来调用 -->
    <button @click="callChildMethod">点击调用子组件方法</button>
  </div>
</template>

<script>
import ChildComponent from './Child.vue';

export default {
  components: { ChildComponent },
  methods: {
    callChildMethod() {
      // this.$refs.myChildRef 就是子组件的实例
      this.$refs.myChildRef.showMessage(); // 调用无参方法
      this.$refs.myChildRef.changeMessage(‘父组件传递的新消息’); // 调用有参方法
    }
  }
}
</script>
```

### 2. Vue 3 的实现方式 (Composition API)

同样使用 `ref`，但在 `<script setup>` 中用法更简洁。

- **子组件 Child.vue**

```vue
<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const message = ref('Hello from Child!');

// 1. 使用 defineExpose 宏显式暴露方法，父组件才能调用
defineExpose({
  showMessage: () => {
    console.log(message.value);
  },
  changeMessage: newMsg => {
    message.value = newMsg;
  },
});
</script>
```

- **父组件 Parent.vue**

```vue
<template>
  <div>
    <!-- 2. 同样绑定 ref -->
    <ChildComponent ref="myChildRef" />

    <button @click="callChildMethod">点击调用子组件方法</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChildComponent from './Child.vue';

// 3. 声明一个与子组件同名的 ref，初始值为 null
const myChildRef = ref(null);

const callChildMethod = () => {
  // 通过 .value 访问
  myChildRef.value?.showMessage();
  myChildRef.value?.changeMessage(‘父组件的新消息’);
};
</script>
```

### 3. React 的实现方式

使用 `useRef` 和 `useImperativeHandle`。

- **子组件 Child.jsx**

```jsx
import React, { forwardRef, useImperativeHandle, useState } from 'react';

// 1. 使用 forwardRef 包裹组件，使其能够接收 ref
const Child = forwardRef((props, ref) => {
  const [message, setMessage] = useState('Hello from Child!');

  // 2. 使用 useImperativeHandle 自定义暴露给父组件的实例值
  useImperativeHandle(ref, () => ({
    // 这里返回的对象，就是父组件 ref.current 能拿到的东西
    showMessage: () => {
      console.log(message);
    },
    changeMessage: newMsg => {
      setMessage(newMsg);
    },
  }));

  return (
    <div>
      <p>{message}</p>
    </div>
  );
});

export default Child;
```

- **父组件 Parent.jsx**

```jsx
import React, { useRef } from 'react';
import Child from './Child';

const Parent = () => {
  // 3. 创建一个 ref 对象
  const childRef = useRef(null);

  const callChildMethod = () => {
    // 通过 .current 访问子组件暴露的方法
    if (childRef.current) {
      childRef.current.showMessage();
      childRef.current.changeMessage(‘父组件的新消息’);
    }
  };

  return (
    <div>
      {/* 4. 将 ref 传递给子组件 */}
      <Child ref={childRef} />
      <button onClick={callChildMethod}>点击调用子组件方法</button>
    </div>
  );
};

export default Parent;
```

## 四、面试官可能会追问的问题（及回答思路）

```text
Q：这种方式和通过Props传递一个函数有什么区别？

A： Props传递函数是“子调父”的经典模式，是回调。而ref是“父调子”，是命令。前者更符合数据流，后者更直接。如果只是通知父组件一个事件，用Props函数；如果是父组件主动命令子组件做一件事，用ref。

Q：使用这种模式有什么需要注意的（缺点）？

A： 主要有两点：

破坏了组件的封装性：父组件需要知道子组件内部的实现细节（方法名、参数），使得父子组件耦合度变高。如果子组件方法改变，父组件也要跟着改。

不利于数据流的追踪和调试：数据流动不再是清晰的自上而下，调试时很难追踪一个方法是在哪里、为什么被调用。

Q：什么时候应该避免使用这种方式？

A： 凡是能用Props和事件解决的，就尽量不要用ref。比如，父组件只是想控制子组件的显示/隐藏，应该通过Prop传递一个isVisible；父组件只是想获取子组件的表单数据，应该让子组件在变化时通过事件@change或onChange主动上报。
```

## 总结（给面试官的最终答案）

```text
“父组件调用子组件方法”是一种打破单向数据流的命令式通信方式。

核心：通过ref（在Vue/React中都是类似概念）获取子组件实例，然后调用其方法。

Vue实现：通过ref属性和$refs对象（Vue 2），或<script setup>中的ref和defineExpose（Vue 3）。

React实现：通过useRef、forwardRef和useImperativeHandle配合实现。

使用场景：用于需要直接命令子组件执行特定动作的场景，如操作DOM（聚焦）、控制动画、触发子组件内部逻辑。

注意事项：它会增加组件间的耦合度，应谨慎使用，优先考虑通过Props和事件的声明式通信来解决大部分问题。
```
