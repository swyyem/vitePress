# vue2 与vue3 的区别

## 一、核心区别：架构与响应式原理（最根本的区别）

### 1. 响应式系统的重写

**Vue 2：基于 `Object.defineProperty`**

1. **工作机制：** 像是一个“物业管理员”，只能对单个已知属性进行监听。它通过递归遍历数据对象，对每一个属性使用 Object.defineProperty 来设置 getter 和 setter。

2. **先天不足：**

- **无法检测属性的添加或删除：** 你必须使用 Vue.set 或 Vue.delete 这些特殊API才能让新属性变成响应式的。
- **无法监听数组索引和长度的变化：** 直接通过下标修改数组元素 (arr[index] = newValue) 或修改 length 是无效的，需要用到数组的变异方法（如 push, pop, splice）或 Vue.set。

**Vue 3：基于 `Proxy`**

1. **工作机制：** 像是一个“全能拦截器”，代理整个对象。你访问、修改、添加、删除对象的任何属性，都会被这个“拦截器”捕获到。
2. **巨大优势：**

- **全面监听：** 天生支持对象和数组的增、删、改、查，包括通过索引操作数组。再也不需要 Vue.set/Vue.delete 了。
- **性能更好：** 无需递归遍历初始对象，只在真正访问到某个嵌套属性时才会对其进行响应式转换（惰性处理），大大提升了初始化性能。
- **支持更多数据结构：** 原生支持 Map, Set, WeakMap, WeakSet 等。

**通俗比喻：**

- Vue 2 像给房子的每一扇门（属性） 单独配了一个门卫，新加一扇门你得现找门卫。
- Vue 3 像给整个房子（对象） 罩上了一个魔法结界，任何进出房子的行为都被监控。

## 二、开发体验与代码组织方式的区别

### 2. Composition API (组合式 API) vs Options API (选项式 API)

- 这是对开发者影响最大的变化。

**Vue 2 (Options API)：**

- **组织方式：** 像填表格，你把代码按照功能类型分到不同的“格子”里（data, methods, computed, watch, 生命周期）。
- **问题：** 当一个功能复杂时，它的逻辑会被拆分到多个不同的选项中。阅读代码时，你需要上下反复滚动来理解一个完整的功能。

```vue
<!-- Vue 2 组件：管理用户搜索 -->
<script>
export default {
  data() {
    // 数据在这里
    return {
      searchQuery: '',
      users: [],
      loading: false,
    };
  },
  methods: {
    // 方法在这里
    fetchUsers() {
      this.loading = true;
      // ... 请求数据，最后 this.users = data
    },
  },
  watch: {
    // 监听在这里
    searchQuery: function (newVal) {
      this.fetchUsers();
    },
  },
  mounted() {
    // 生命周期在这里
    this.fetchUsers();
  },
};
</script>
```

**Vue 3 (Composition API)：**

- **组织方式：** 像搭乐高，你可以把同一个功能相关的数据、方法、计算属性、生命周期等代码块组合在一起。
- **优势：**
  1. 逻辑复用极佳： 可以轻松地将一个功能的逻辑提取成一个可复用的“组合式函数” (composable)。
  2. 代码组织更灵活： 相关功能的代码紧紧挨在一起，更易于阅读和维护。
  3. 更好的 TypeScript 支持。

```vue
<!-- Vue 3 组件：同样的用户搜索功能 -->
<script setup>
import { ref, onMounted, watch } from 'vue';

// --- 用户搜索功能 ---
const searchQuery = ref('');
const users = ref([]);
const loading = ref(false);

const fetchUsers = async () => {
  loading.value = true;
  // ... 请求数据，最后 users.value = data
  loading.value = false;
};

// 与搜索功能相关的监听和生命周期都放在一起
watch(searchQuery, fetchUsers);
onMounted(fetchUsers);

// --- 另一个功能也可以这样组织在旁边 ---
// const { count, doubleCount } = useCounter();
</script>
```

**注意： Vue 3 完全支持 Options API，Composition API 是增量式的，让你多一种更强大的选择。**

## 三、性能与体积的优化

### 3. 更小的体积

- Vue 3 通过 Tree-shaking 优化，核心库体积更小。如果你不使用某些功能（如 v-model 的某些修饰符、过渡组件），这些代码最终不会被打包到你的生产环境中。

### 4. 更好的性能

- **虚拟 DOM 重写：** 优化了 diff 算法，在模板编译时进行了更多的静态分析，生成更高效的渲染函数。
- **编译时优化：** 如静态提升、PatchFlags 等，减少了运行时开销。

### 5. 片段 (Fragments)

- **Vue 2：** 组件模板必须有且只有一个根元素。
- **Vue 3：** 组件模板可以包含多个根节点，无需再包裹一个无用的` <div>`。

```vue
<!-- Vue 3 中合法 -->
<template>
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</template>
```

## 四、其他重要区别

### 6. 生命周期钩子

- 大部分钩子改名，在前面加了 `on`，如 `mounted` -> `onMounted`。
- `beforeDestroy` 和 `destroyed` 被更名为 `onBeforeUnmount` 和 `onUnmounted`，语义更准确。

### 7. 更好的 TypeScript 支持

- Vue 3 本身就是用 TypeScript 重写的，提供了完美的类型推断，开发体验远超 Vue 2。

### 8.新的组件：Teleport 和 Suspense

- **Teleport：** 可以将组件的一部分模板“传送”到 DOM 中其他位置（如全局模态框）。
- **Suspense：** 提供了一种声明式的方法来等待异步组件依赖的异步数据。

## 五、面试回答策略（如何组织你的答案）

1. **开头总起：** “Vue 3 相对于 Vue 2 是一次全面的升级，主要体现在性能、代码组织和开发体验上。”
2. **分点阐述（挑最重要的说）：**

- **第一，也是根本区别，是响应式原理的重构。** Vue 2 基于 Object.defineProperty，有先天不足；Vue 3 基于 Proxy，解决了所有限制，性能也更好。
- **第二，是全新的代码组织方式 Composition API。** 它解决了 Options API 在复杂组件中逻辑关注点分散的问题，让代码更易于组织和复用，尤其适合大型项目和 TypeScript。
- **第三，是性能和体积的优化。** 通过 Tree-shaking 和虚拟 DOM 的重写，带来了更小的打包体积和更快的运行速度。
- **第四，是一些开发体验的增强。** 比如支持多根节点的模板、新的内置组件 Teleport 和 Suspense，以及更好的 TypeScript 集成。

3. **结尾总结：** “总而言之，Vue 3 在保留 Vue 2 核心思想的同时，通过底层革新和上层 API 的完善，让它变得更高效、更灵活、更易于维护和扩展。”
