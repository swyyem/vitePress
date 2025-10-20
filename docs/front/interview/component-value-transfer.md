# Vue 组件间的"沟通方式"

- 把组件想象成不同房间的人，他们需要互相传递物品和信息：

## 一、父组件 → 子组件传递数据

### 1. Props - 最常用的"传纸条"方式

- 父组件（发送方）：

```vue
<template>
  <div>
    <!-- 传递静态数据 -->
    <ChildComponent title="用户列表" />

    <!-- 传递动态数据 -->
    <ChildComponent :users="userList" :is-loading="loading" :count="10" />

    <!-- 传递整个对象 -->
    <ChildComponent v-bind="userInfo" />
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: { ChildComponent },
  data() {
    return {
      userList: ['小明', '小红', '小刚'],
      loading: false,
      userInfo: {
        name: '小明',
        age: 18,
        email: 'xiaoming@example.com',
      },
    };
  },
};
</script>
```

- 子组件（接收方）：

```vue
<template>
  <div>
    <h2>{{ title }}</h2>
    <div v-if="isLoading">加载中...</div>
    <ul>
      <li v-for="user in users" :key="user">
        {{ user }}
      </li>
    </ul>
    <p>用户信息：{{ name }} - {{ age }}岁</p>
  </div>
</template>

<script>
export default {
  // 数组形式（简单但不推荐）
  // props: ['users', 'isLoading', 'title']

  // 对象形式（推荐）
  props: {
    // 基础类型检查
    title: {
      type: String,
      default: '默认标题',
    },
    // 数字类型，必需
    count: {
      type: Number,
      required: true,
    },
    // 数组类型，带默认值
    users: {
      type: Array,
      default: () => [],
    },
    // 对象类型
    userInfo: {
      type: Object,
      default: () => ({}),
    },
    // 自定义验证函数
    age: {
      type: Number,
      validator: value => value >= 0 && value <= 150,
    },
  },
};
</script>
```

### 2. Vue3 的 Props 写法

```vue
<!-- 父组件 -->
<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const userList = ref(['小明', '小红']);
const count = ref(5);
</script>

<template>
  <ChildComponent :users="userList" :count="count" />
</template>
```

```vue
<!-- 子组件 -->
<script setup>
// Vue3 -  defineProps 编译器宏
const props = defineProps({
  users: {
    type: Array,
    default: () => [],
  },
  count: {
    type: Number,
    default: 0,
  },
});

// 在模板中直接使用
console.log(props.users);
</script>

<template>
  <div>
    <p>用户数量: {{ count }}</p>
    <ul>
      <li v-for="user in users" :key="user">
        {{ user }}
      </li>
    </ul>
  </div>
</template>
```

## 二、子组件 → 父组件传递数据

### 1. $emit - 子组件的"广播"

- 子组件（发送事件）：

```vue
<template>
  <div>
    <input v-model="inputValue" placeholder="输入内容" />
    <button @click="handleSubmit">提交</button>
    <button @click="handleCancel">取消</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
    };
  },
  methods: {
    handleSubmit() {
      // 向父组件发射事件，并传递数据
      this.$emit('submit', this.inputValue);
      this.$emit('update:value', this.inputValue); // 用于 v-model
    },
    handleCancel() {
      this.$emit('cancel');
      this.inputValue = '';
    },
  },
};
</script>
```

- 父组件（监听事件）：

```vue
<template>
  <div>
    <!-- 监听子组件事件 -->
    <ChildComponent @submit="handleChildSubmit" @cancel="handleChildCancel" />

    <!-- 使用 v-model (语法糖) -->
    <ChildComponent v-model="formData" />

    <!-- 等同于 -->
    <ChildComponent :value="formData" @update:value="formData = $event" />
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: { ChildComponent },
  data() {
    return {
      formData: '',
    };
  },
  methods: {
    handleChildSubmit(data) {
      console.log('收到子组件数据:', data);
      // 处理业务逻辑
    },
    handleChildCancel() {
      console.log('子组件取消了操作');
    },
  },
};
</script>
```

### 2. Vue3 的 emit 写法

```vue
<!-- 子组件 -->
<script setup>
// Vue3 - defineEmits 编译器宏
const emit = defineEmits(['submit', 'cancel', 'update:value']);

const inputValue = ref('');

const handleSubmit = () => {
  emit('submit', inputValue.value);
  emit('update:value', inputValue.value);
};

const handleCancel = () => {
  emit('cancel');
  inputValue.value = '';
};
</script>
```

```vue
<!-- 父组件 -->
<script setup>
import { ref } from 'vue';

const formData = ref('');

const handleChildSubmit = data => {
  console.log('收到数据:', data);
};
</script>

<template>
  <ChildComponent v-model="formData" @submit="handleChildSubmit" @cancel="console.log('取消')" />
</template>
```

## 三、父子组件方法调用

### 1. 父组件调用子组件方法 - Ref

- 子组件（暴露方法）：

```vue
<template>
  <div>
    <p>计数: {{ count }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    // 子组件的方法
    increment() {
      this.count++;
      console.log('计数增加:', this.count);
    },
    reset() {
      this.count = 0;
      console.log('计数重置');
    },
    // 带参数的方法
    setCount(value) {
      this.count = value;
    },
  },
};
</script>
```

- 父组件（通过ref调用）：

```vue
<template>
  <div>
    <!-- 给子组件设置ref -->
    <ChildComponent ref="childRef" />

    <button @click="callChildMethod">调用子组件方法</button>
    <button @click="resetChild">重置子组件</button>
    <button @click="setChildCount">设置子组件计数</button>
  </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: { ChildComponent },
  methods: {
    callChildMethod() {
      // 通过ref调用子组件方法
      this.$refs.childRef.increment();
    },
    resetChild() {
      this.$refs.childRef.reset();
    },
    setChildCount() {
      this.$refs.childRef.setCount(10);
    },
  },
};
</script>
```

### 2. Vue3 的 ref 调用写法

```vue
<!-- 父组件 -->
<script setup>
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

// 创建模板ref
const childRef = ref(null);

const callChildMethod = () => {
  // 调用子组件方法
  childRef.value?.increment();
};

const setChildCount = () => {
  childRef.value?.setCount(100);
};
</script>

<template>
  <ChildComponent ref="childRef" />
  <button @click="callChildMethod">调用子组件方法</button>
</template>
```

```vue
<!-- 子组件 (Vue3 <script setup> 默认关闭，需要使用defineExpose) -->
<script setup>
import { ref } from 'vue';

const count = ref(0);

const increment = () => {
  count.value++;
};

const setCount = value => {
  count.value = value;
};

// 暴露方法给父组件
defineExpose({
  increment,
  setCount,
});
</script>
```

## 四、其他通信方式

### 1. Provide/Inject - 跨层级"广播"

- 祖先组件（提供数据）：

```vue
<template>
  <div>
    <ParentComponent />
  </div>
</template>

<script>
export default {
  // Vue2 选项式
  provide() {
    return {
      appName: '我的应用',
      user: this.userInfo,
      // 提供响应式数据的方法
      getReactiveData: () => this.reactiveData,
    };
  },
  data() {
    return {
      userInfo: { name: '小明', role: 'admin' },
      reactiveData: { theme: 'dark' },
    };
  },
};
</script>
```

- 后代组件（注入数据）：

```vue
<script>
export default {
  // 注入祖先提供的数据
  inject: ['appName', 'user', 'getReactiveData'],
  created() {
    console.log(this.appName); // '我的应用'
    console.log(this.user.name); // '小明'
    console.log(this.getReactiveData().theme); // 'dark'
  },
};
</script>
```

### 2. Vue3 的 Provide/Inject

```vue
<!-- 祖先组件 -->
<script setup>
import { provide, ref, reactive } from 'vue';

const appName = ref('我的应用');
const user = reactive({ name: '小明', role: 'admin' });

// 提供响应式数据
provide('appName', appName);
provide('user', user);
provide('updateUser', newUser => {
  Object.assign(user, newUser);
});
</script>
```

```vue
<!-- 后代组件 -->
<script setup>
import { inject } from 'vue';

const appName = inject('appName');
const user = inject('user');
const updateUser = inject('updateUser');

// 修改数据
const changeUser = () => {
  updateUser({ name: '小红', role: 'user' });
};
</script>
```

## 五、通信方式选择指南

| 场景                    | 推荐方式                | 说明                     |
| :---------------------- | :---------------------- | :----------------------- |
| 父子组件                | Props + $emit           | 最常用，符合数据流       |
| 父调子方法              | Ref                     | 直接调用子组件方法       |
| 深层嵌套 Provide/Inject | 避免props逐层传递       |
| 兄弟组件                | 事件总线 / Vuex / Pinia | 通过共同父组件或状态管理 |
| 任意组件                | Vuex / Pinia            | 全局状态管理             |

## 面试回答技巧

```text
"Vue组件通信主要有以下几种方式：

1. 父子组件通信：

父传子：使用 props，父组件通过属性传递数据，子组件声明接收

子传父：使用 $emit，子组件触发事件，父组件监听处理

2. 方法调用：

父调子：使用 ref 获取子组件实例，直接调用其方法

子调父：通过 $emit 触发父组件方法

3. 跨层级通信：

Provide/Inject：祖先组件提供数据，后代组件注入使用

事件总线：简单的全局事件通信（Vue3较少使用）

状态管理：Vuex/Pinia 管理全局状态

4. 其他方式：

$parent / $children：直接访问父子实例（不推荐）

$attrs / $listeners：传递未声明的属性和事件

在实际开发中，我主要根据组件关系选择合适的通信方式，优先使用 Props/Events 保持数据流的清晰性。"

记住核心原则：
Props向下，Events向上，复杂场景用状态管理
```
