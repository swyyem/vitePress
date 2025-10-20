# 📌 Vue 面试题：`v-for` 与 `v-if` 一起使用（通俗、全面）

---

## 一、核心结论（一句话）

- **`v-for` 的优先级高于 `v-if`**：Vue 会先循环再对每一项执行 `v-if` 判断。
- **不要把过滤逻辑放在 `v-if` 上以避免性能问题**，推荐在 `computed` 或外部预处理列表后再 `v-for`。

---

## 二、为什么顺序重要（原理）

当你写：

```vue
<div v-for="item in items" :key="item.id" v-if="item.show">
  {{ item.name }}
</div>
```

Vue 的处理顺序是：**先执行 `v-for`（遍历 items 生成每个虚拟节点） → 然后对每个节点执行 `v-if` 判断是否渲染**。

这意味着：即便 `v-if` 最终把很多项过滤掉，Vue 仍然会为每一项创建虚拟 DOM 节点并计算 `v-if` 条件——如果 `items` 很大，这会带来不必要的开销。

---

## 三、常见错误示例与问题

### 1. 在 `v-for` 上直接写 `v-if`（性能差）

```vue
<!-- 不推荐：遍历大量 items 时会有性能问题 -->
<div v-for="item in items" :key="item.id" v-if="item.visible">
  {{ item.name }}
</div>
```

问题：会遍历并计算所有 `items`，即使多数被 `v-if` 过滤掉。

### 2. 使用索引作为 `key`（导致复用错误）

```vue
<div v-for="(item, index) in items" :key="index">
  {{ item.name }}
</div>
```

问题：在列表变更（增删、排序）时，索引 key 会导致组件复用混乱，建议使用稳定唯一的 id。

---

## 四：推荐做法（性能友好）

### ✅ 方案 A：在 `computed` 中预过滤（最推荐）

```vue
<template>
  <div v-for="item in visibleItems" :key="item.id">
    {{ item.name }}
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const items = ref([
  { id: 1, name: 'A', visible: true },
  { id: 2, name: 'B', visible: false },
  // ...
]);

const visibleItems = computed(() => items.value.filter(i => i.visible));
</script>
```

优点：只遍历并渲染真正需要显示的项，避免在模板层做昂贵计算。

---

### ✅ 方案 B：先用外层 `v-if` 判断（避免循环）

当整个列表可能不需要渲染时，把 `v-if` 放在包裹元素上：

```vue
<template>
  <div v-if="shouldShowList">
    <div v-for="item in items" :key="item.id">
      {{ item.name }}
    </div>
  </div>
</template>
```

适用场景：整个列表根据某条件整体隐藏/显示时。

---

### ✅ 方案 C：在 `<template>` 中组合（语义）

如果需要在 `v-for` 内部放多元素并针对每个元素都判断，可用 `<template>` 包裹：

```vue
<template v-for="item in items" :key="item.id">
  <div v-if="item.visible">
    {{ item.name }}
  </div>
  <div v-else>隐藏的占位或其他内容</div>
</template>
```

注意：这并不能提升性能，它只是语义更清晰。若要优化，还是应在计算层过滤。

---

## 五：特殊场景与补充技巧

- **需要保留被过滤项的组件实例/状态时**，不要用 `computed.filter`（会销毁/重建实例），可考虑 `v-show`（只是切样式不销毁）或配合 `<keep-alive>` 缓存组件状态。
- **大量数据分页显示**：结合分页（后端分页或前端分页）减少渲染项。
- **虚拟滚动（virtual scrolling）**：对成千上万项，使用虚拟列表组件（如 third-party 虚拟滚动库）避免一次渲染大量 DOM。
- **使用稳定的 `:key`**：尽量使用唯一且稳定的 id，避免使用索引作为 key。
- **Vue 3 的 `v-memo`**：对于昂贵的渲染，可以考虑 `v-memo` 缓存部分模板（Vue 3.2+）。

---

## 六、面试答题模板（简洁）

> `v-for` 的优先级高于 `v-if`，也就是说 Vue 先遍历再逐项判断 `v-if`，因此把过滤逻辑放在 `v-if` 上会导致不必要的遍历和虚拟 DOM 创建。最佳实践是先在 `computed` 中过滤好数据，然后在模板中 `v-for` 渲染过滤后的数组；对于需要保留实例状态的场景，可以使用 `v-show` 或 `keep-alive`。此外要注意 `key` 的唯一性与性能优化（分页、虚拟滚动）。

---

## 七、示例汇总（对比）

### 不推荐（性能差）

```vue
<div v-for="item in items" :key="item.id" v-if="item.visible">
  {{ item.name }}
</div>
```

### 推荐（计算属性过滤）

```vue
<div v-for="item in visibleItems" :key="item.id">
  {{ item.name }}
</div>
```

### 如果要保留组件实例（使用 v-show）

```vue
<div v-for="item in items" :key="item.id">
  <MyItemComponent v-show="item.visible" :item="item" />
</div>
```

---

## 八、快速总结（面试可背）

- `v-for` 优先级高于 `v-if`；
- 若用 `v-if` 在 `v-for` 上做过滤，Vue 仍会遍历并为每一项计算 `v-if`，可能带来性能问题；
- 推荐把过滤逻辑放入 `computed`，只对需要显示的项进行渲染；
- 关注 `key` 的稳定性、分页、虚拟滚动等优化手段。

---

## 参考链接

- Vue 列表渲染（中文）：https://cn.vuejs.org/guide/essentials/list.html
- v-memo（Vue 官方）：https://vuejs.org/api/built-in-directives.html#v-memo
