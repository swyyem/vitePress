# 🚦 Vue 面试题：$route 与 $router 的区别（通俗 + 全面）

---

## 🧩 一、核心区别一句话总结

> `$route` 是 **当前路由对象**，包含路径、参数、查询等信息；  
> `$router` 是 **路由实例对象**，包含用于编程式导航的各种方法。

---

## 🧠 二、原理与定义区别

| 对比项         | `$route`               | `$router`                         |
| -------------- | ---------------------- | --------------------------------- |
| **定义**       | 当前激活的路由信息对象 | VueRouter 的实例                  |
| **来源**       | 路由变化时自动更新     | 创建 Vue 实例时注入的全局路由实例 |
| **是否可修改** | ❌ 只读属性            | ✅ 可主动操作路由                 |
| **作用范围**   | 当前页面状态           | 全局导航控制                      |
| **典型用途**   | 获取路径、参数、查询等 | 跳转页面、前进、后退等            |

---

## 🧱 三、通俗理解

- `$route`：**描述“你现在在哪”**
- `$router`：**决定“你要去哪里”**

📘 举个例子：

```js
$route; // 当前的地址信息
$router; // 能开车带你去别的地方的导航器
```

---

## 📦 四、常用属性与方法对比

### `$route` 常用属性

```js
$route.path; // 当前路由路径，如 "/user/123"
$route.params; // 动态路由参数，如 { id: '123' }
$route.query; // 查询参数，如 { page: 2 }
$route.name; // 路由名称
$route.fullPath; // 完整路径（含参数）
$route.meta; // 自定义元信息（权限、标题等）
```

### `$router` 常用方法

```js
$router.push('/home'); // 跳转到某个路径
$router.push({ name: 'User', params: { id: 1 } }); // 命名路由跳转

$router.replace('/login'); // 替换当前历史记录（不留痕）
$router.go(-1); // 后退一步
$router.back(); // 返回上一页
$router.forward(); // 前进一步
```

---

## ⚙️ 五、实战示例

```vue
<template>
  <div>
    <h2>当前用户 ID：{{ $route.params.id }}</h2>
    <button @click="goHome">返回首页</button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

function goHome() {
  router.push('/home'); // 使用 router 控制导航
  console.log(route.params.id); // 使用 route 获取参数
}
</script>
```

🧩 对应逻辑：

- `route`（或 `$route`）是当前状态；
- `router`（或 `$router`）是路由控制器。

---

## 🧭 六、Vue 3 组合式 API 新写法

Vue 3 中推荐使用 `useRouter()` 和 `useRoute()` 替代 `$router` / `$route`。

```js
import { useRouter, useRoute } from 'vue-router';

const router = useRouter(); // 等价于 this.$router
const route = useRoute(); // 等价于 this.$route
```

### 优点：

- 更符合组合式 API 风格；
- 在 `setup()` 中可以直接使用，无需依赖 `this`；
- 支持更好的类型推断。

---

## 🧮 七、区别总结表

| 对比项     | `$route`                 | `$router`                    |
| ---------- | ------------------------ | ---------------------------- |
| 类型       | 对象（当前路由信息）     | VueRouter 实例               |
| 是否可读写 | 只读                     | 可调用方法                   |
| 获取方式   | this.$route / useRoute() | this.$router / useRouter()   |
| 职责       | 保存当前路由状态         | 控制路由导航行为             |
| 示例       | `$route.path` 获取路径   | `$router.push('/home')` 跳转 |
| 是否响应式 | ✅ 是                    | ❌ 不是                      |
| 何时更新   | 每次路由变化时           | 不会变化                     |

---

## 💬 八、面试高频答题模板

> `$route` 是当前激活的路由对象，主要用来获取路由信息，如 path、params、query、meta 等；  
> `$router` 是 VueRouter 的实例对象，提供编程式导航的方法，如 push、replace、go 等。
>
> 简单来说：
>
> - `$route` 关注“**路由数据**”；
> - `$router` 关注“**路由行为**”。
>
> 在 Vue 3 中，我们使用 `useRoute()` 和 `useRouter()` 来代替它们，符合组合式 API 的设计理念。

---

## ✅ 九、总结一句话

> `$route` 表示“你现在在哪”，`$router` 负责“带你去哪里”。

---

## 📘 十、参考文档

- [Vue Router 官方文档（中文）](https://router.vuejs.org/zh/)
- [useRoute 与 useRouter API](https://router.vuejs.org/guide/advanced/composition-api.html)
