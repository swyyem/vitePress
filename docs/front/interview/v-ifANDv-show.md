# 💡 Vue 面试题：v-if 与 v-show 的区别，以及是否有最新 API 替代

---

## 🧩 一、核心区别一句话总结

> `v-if` 是 **条件渲染**（控制元素是否存在于 DOM）。  
> `v-show` 是 **显示隐藏**（通过 CSS 控制样式 `display`）。

---

## 🧠 二、原理与本质区别

| 对比项           | v-if                                   | v-show                           |
| ---------------- | -------------------------------------- | -------------------------------- |
| **本质**         | 控制组件/DOM 是否渲染                  | 控制样式是否显示                 |
| **DOM 是否存在** | 条件为 `false` 时，节点不在 DOM 中     | 节点始终存在于 DOM 中            |
| **切换原理**     | 创建/销毁 DOM 节点                     | 修改 `display: none`             |
| **性能开销**     | 高（频繁切换会频繁销毁重建）           | 低（仅修改样式）                 |
| **首次渲染性能** | 若条件为 `false`，不渲染，节省初始开销 | 无论条件，都会渲染               |
| **常见场景**     | 不常切换的模块，如登录状态、页面切换   | 频繁切换的元素，如弹窗、下拉菜单 |

---

## 🧱 三、通俗示例讲解

```vue
<!-- 使用 v-if -->
<Dialog v-if="showDialog" />

<!-- 使用 v-show -->
<Dialog v-show="showDialog" />
```

**区别说明：**

- `v-if`: 当 `showDialog = false` 时，弹窗组件**不会存在于 DOM**，Vue 会将其销毁；
- `v-show`: 弹窗组件始终存在，只是通过 `display: none` 隐藏。

📘 通俗比喻：

- `v-if` 就像 “**拆房子再重建**”；
- `v-show` 就像 “**拉窗帘再打开**”。

---

## ⚙️ 四、性能与使用建议

| 使用场景      | 推荐指令                   | 理由                            |
| ------------- | -------------------------- | ------------------------------- |
| 频繁切换显示  | ✅ `v-show`                | 不会频繁创建/销毁 DOM，切换流畅 |
| 偶尔显示/隐藏 | ✅ `v-if`                  | 初始时可避免不必要渲染          |
| 过渡/动画效果 | ✅ `v-if` + `<transition>` | 更好控制进入/离开动画           |
| 大型组件      | ✅ `v-if`                  | 节省内存与渲染性能              |

---

## 🪄 五、实际项目中的组合使用

```vue
<template>
  <div v-if="dataLoaded">
    <UserPanel v-show="showPanel" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const dataLoaded = ref(false);
const showPanel = ref(false);

onMounted(async () => {
  await new Promise(r => setTimeout(r, 500));
  dataLoaded.value = true;
});
</script>
```

说明：

- `v-if` 控制是否加载组件；
- `v-show` 控制组件的显示隐藏；
- 实现“先加载一次，再频繁切换”的效果。

---

## 🧭 六、Vue 3 中是否有新 API 替代？

Vue 3 并未废弃 `v-if` / `v-show`，但提供了一些 **更灵活的组合式 API** 和 **优化指令**，可在特定场景下替代或增强它们的功能。

### 1️⃣ `<Suspense>` —— 异步条件渲染（替代异步版 v-if）

```vue
<Suspense>
  <template #default>
    <AsyncComponent />
  </template>

  <template #fallback>
    <LoadingSpinner />
  </template>
</Suspense>
```

### 2️⃣ `v-memo` —— 缓存模板结果（Vue 3.2+）

```vue
<div v-memo="[someDeps]">
  <ExpensiveComponent v-show="visible" />
</div>
```

### 3️⃣ `<keep-alive>` —— 缓存组件状态（防止 v-if 销毁）

```vue
<keep-alive>
  <MyDialog v-if="showDialog" />
</keep-alive>
```

### 4️⃣ `<teleport>` —— 改善渲染层级（辅助 v-if / v-show）

```vue
<teleport to="body">
  <Modal v-if="showModal" />
</teleport>
```

---

## 🧮 七、生命周期与渲染差异补充

| 生命周期 / 行为   | v-if               | v-show           |
| ----------------- | ------------------ | ---------------- |
| created / mounted | 每次重新渲染会触发 | 仅首次渲染时触发 |
| unmounted (销毁)  | 每次隐藏时会销毁   | 不会销毁         |
| 内存占用          | 隐藏时内存占用低   | 隐藏时仍占内存   |

---

## 💬 八、面试答题模板

> `v-if` 是真正的条件渲染，控制节点是否存在于 DOM；  
> `v-show` 是通过 CSS 控制显隐，节点始终在 DOM 中。
>
> 如果显示切换频繁，用 `v-show`；  
> 如果条件变化少或首次不需要渲染，用 `v-if`。
>
> Vue 3 没有新的指令替代它们，但提供了 `<Suspense>`（异步渲染）、`v-memo`（模板缓存）、`keep-alive`（组件缓存）等特性，能在特定场景下优化渲染性能。

---

## ✅ 九、总结一句话

> **v-if 控制“是否存在”，v-show 控制“显不显”。**  
> **频繁切换用 v-show，不常切换用 v-if。**
>
> Vue 3 提供了 `<Suspense>`、`v-memo`、`keep-alive` 等增强方案，可配合使用。

---

## 📘 参考文档

- [Vue 条件渲染（中文）](https://cn.vuejs.org/guide/essentials/conditional.html)
- [Vue Suspense](https://vuejs.org/guide/built-ins/suspense.html)
- [v-memo 指令](https://vuejs.org/api/built-in-directives.html#v-memo)
- [keep-alive](https://vuejs.org/guide/built-ins/keep-alive.html)
- [teleport](https://vuejs.org/guide/built-ins/teleport.html)
