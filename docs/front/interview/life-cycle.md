# Vue2和Vue3的生命周期

- 把Vue组件想象成人的一生：
- 1. 出生阶段：创建和挂载
- 2. 成长阶段：更新和变化
- 3. 离开阶段：销毁和清理

## Vue2 生命周期

### 完整生命周期图（Vue2

```text
创建阶段：beforeCreate → created → beforeMount → mounted
更新阶段：beforeUpdate → updated
销毁阶段：beforeDestroy → destroyed
```

### 详细阶段解释

- 1. 创建阶段 - "怀孕到出生"

```javascript
export default {
  data() {
    return {
      message: 'Hello Vue2',
      count: 0,
    };
  },

  // 1. 刚开始怀孕 - 什么都还没有
  beforeCreate() {
    console.log('beforeCreate');
    console.log(this.message); // undefined
    console.log(this.$el); // undefined
    // 用途：初始化非响应式变量
  },

  // 2. 胎儿形成 - 有了数据，但还没身体
  created() {
    console.log('created');
    console.log(this.message); // 'Hello Vue2'
    console.log(this.$el); // undefined
    // 用途：API调用、数据初始化、事件监听
  },

  // 3. 准备出生 - 模板编译完成，但还没挂载到页面
  beforeMount() {
    console.log('beforeMount');
    console.log(this.message); // 'Hello Vue2'
    console.log(this.$el); // 原始的DOM元素
    // 用途：最后的数据调整
  },

  // 4. 正式出生 - 已经显示在页面上
  mounted() {
    console.log('mounted');
    console.log(this.message); // 'Hello Vue2'
    console.log(this.$el); // 渲染后的DOM元素
    // 用途：DOM操作、第三方库初始化、定时器
  },
};
```

- 2. 更新阶段 - "成长变化"

```javascript
export default {
  methods: {
    updateMessage() {
      this.message = 'Updated Message';
    },
  },

  // 5. 准备变化 - 数据已改变，但DOM还没更新
  beforeUpdate() {
    console.log('beforeUpdate');
    console.log(this.message); // 'Updated Message'
    // 用途：获取更新前的DOM状态
  },

  // 6. 变化完成 - DOM已更新
  updated() {
    console.log('updated');
    console.log(this.message); // 'Updated Message'
    // 用途：基于新DOM的操作
  },
};
```

- 3. 销毁阶段 - "生命结束"

```javascript
export default {
  // 7. 准备离开 - 组件还在，即将被销毁
  beforeDestroy() {
    console.log('beforeDestroy');
    console.log(this.message); // 还能访问数据
    // 用途：清理定时器、取消事件监听、取消API请求
    clearInterval(this.timer);
    window.removeEventListener('resize', this.handleResize);
  },

  // 8. 已经离开 - 组件完全销毁
  destroyed() {
    console.log('destroyed');
    console.log(this.message); // 还能访问数据，但DOM已移除
    // 用途：最后的清理工作
  },
};
```

## Vue3 生命周期

### 主要变化

- 1. Composition API - 在setup中使用
- 2. 命名变化：beforeDestroy → beforeUnmount，destroyed → unmounted
- 3. 使用方式：选项式API和组合式API两种写法

### 选项式API（类似Vue2）

```javascript
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue';

export default {
  setup() {
    // 组合式API写法
  },

  // 选项式API - 和Vue2基本一样，只是改名了
  beforeCreate() {
    /* 同Vue2 */
  },
  created() {
    /* 同Vue2 */
  },
  beforeMount() {
    /* 同Vue2 */
  },
  mounted() {
    /* 同Vue2 */
  },
  beforeUpdate() {
    /* 同Vue2 */
  },
  updated() {
    /* 同Vue2 */
  },
  beforeUnmount() {
    /* 替代 beforeDestroy */
  },
  unmounted() {
    /* 替代 destroyed */
  },
};
```

### 组合式API（Vue3推荐）

```javascript
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue';

export default {
  setup() {
    const message = ref('Hello Vue3');
    const count = ref(0);

    // 1. 创建阶段
    // beforeCreate 和 created 在setup中直接写代码即可
    console.log('这相当于 created');

    // 2. 挂载阶段
    onBeforeMount(() => {
      console.log('onBeforeMount - 准备挂载');
    });

    onMounted(() => {
      console.log('onMounted - 挂载完成');
      // DOM操作、初始化第三方库
    });

    // 3. 更新阶段
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate - 准备更新');
    });

    onUpdated(() => {
      console.log('onUpdated - 更新完成');
    });

    // 4. 卸载阶段
    onBeforeUnmount(() => {
      console.log('onBeforeUnmount - 准备卸载');
      // 清理工作
    });

    onUnmounted(() => {
      console.log('onUnmounted - 已卸载');
    });

    return {
      message,
      count,
    };
  },
};
```

### `<script setup>` 语法糖（最现代写法）

```vue
<template>
  <div>
    <p>{{ message }}</p>
    <button @click="updateMessage">更新</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const message = ref('Hello Vue3');

// beforeCreate 和 created 的代码直接写在这里
console.log('组件初始化');

// 生命周期函数
onMounted(() => {
  console.log('组件已挂载');
  // 初始化操作
});

onUnmounted(() => {
  console.log('组件已卸载');
  // 清理操作
});

const updateMessage = () => {
  message.value = '消息已更新';
};
</script>
```

## Vue2 vs Vue3 生命周期对比

### 名称变化对照表

| Vue2            | Vue3               | 说明              |
| :-------------- | :----------------- | :---------------- |
| `beforeCreate`  | `setup()` 内部代码 | 在setup中直接编写 |
| `created`       | `setup()` 内部代码 | 在setup中直接编写 |
| `beforeMount`   | `onBeforeMount`    | 功能相同          |
| `mounted`       | `onMounted`        | 功能相同          |
| `beforeUpdate`  | `onBeforeUpdate`   | 功能相同          |
| `updated`       | `onUpdated`        | 功能相同          |
| `beforeDestroy` | `onBeforeUnmount`  | 改名，功能相同    |
| `destroyed`     | `onUnmounted`      | 改名，功能相同    |

## 实际使用场景对比

### 场景1：数据初始化

1. Vue2写法：

```javascript
export default {
  data() {
    return {
      users: [],
      loading: false,
    };
  },
  created() {
    this.loadUsers(); // 在created中调用
  },
  methods: {
    async loadUsers() {
      this.loading = true;
      this.users = await fetchUsers();
      this.loading = false;
    },
  },
};
```

2. Vue3写法：

```javascript
<script setup>
import { ref, onMounted } from 'vue';

const users = ref([]);
const loading = ref(false);

// 直接写，相当于created
const loadUsers = async () => {
  loading.value = true;
  users.value = await fetchUsers();
  loading.value = false;
};

// 立即执行
loadUsers();
</script>
```

### 场景2：定时器和清理

1. Vue2写法：

```javascript
export default {
  data() {
    return {
      timer: null,
      count: 0,
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.count++;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer); // 清理定时器
  },
};
```

2. Vue3写法：

```javascript
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const count = ref(0);
let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    count.value++;
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);  // 清理定时器
});
</script>
```

### 生命周期执行顺序实战

1. 父子组件生命周期顺序

```vue
<!-- 父组件 -->
<template>
  <ChildComponent v-if="showChild" />
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showChild = ref(true);

// 执行顺序：
// 1. 父组件 onBeforeMount
// 2. 子组件 onBeforeMount
// 3. 子组件 onMounted
// 4. 父组件 onMounted
</script>
```

## 面试回答技巧

```text
"Vue生命周期指的是组件从创建到销毁的完整过程，主要分为创建、挂载、更新、卸载四个阶段。

Vue2有8个生命周期钩子：

创建阶段：beforeCreate、created、beforeMount、mounted

更新阶段：beforeUpdate、updated

销毁阶段：beforeDestroy、destroyed

Vue3的主要变化：

命名变化：beforeDestroy → beforeUnmount，destroyed → unmounted

Composition API：提供了onXxx形式的生命周期函数

setup替代：beforeCreate和created被setup函数替代

使用场景：

created/onMounted：API调用、数据初始化

mounted/onMounted：DOM操作、第三方库初始化

beforeUnmount/onBeforeUnmount：清理定时器、事件监听

Vue3的Composition API让生命周期使用更灵活，特别是在逻辑复用方面优势明显。"

记住核心变化：
Vue3 = 改名(beforeUnmount/unmounted) + 新API(onXxx) + setup语法
```
