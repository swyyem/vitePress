# Vue2与Vue3实现数据双向绑定的原理

- 核心思想：从“依赖收集”到“精准触发”

1. Vue2：明星有个大微信群，每次有新闻（数据变化），就在群里@所有人（通知所有组件）。
1. Vue3：明星有个精准的通讯录，每次有新闻，只打电话给真正关心这条新闻的粉丝（通知对应的组件）。

## Vue2 的原理：`Object.defineProperty` + 依赖收集

- Vue2 通过 `Object.defineProperty` 来“劫持”数据的获取和修改，从而在getter中收集依赖，在setter中触发更新。

### 1. 数据劫持与依赖收集

```javascript
// 简化的响应式原理核心代码
class Observer {
  constructor(data) {
    this.walk(data);
  }

  walk(data) {
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
    });
  }

  defineReactive(obj, key, val) {
    const dep = new Dep(); // 每个属性都有自己的“依赖管理器”(Dep)

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 【依赖收集】当有组件（Watcher）读取这个属性时，就把这个Watcher加入到Dep中
        if (Dep.target) {
          dep.depend(); // 相当于：dep.addSub(Dep.target)
        }
        return val;
      },
      set(newVal) {
        if (newVal === val) return;
        val = newVal;
        // 【触发更新】当属性值变化时，通知所有依赖它的Watcher去更新
        dep.notify();
      },
    });
  }
}

// 依赖管理器（Dep）
class Dep {
  constructor() {
    this.subs = []; // 存放所有依赖（Watcher）
  }

  depend() {
    if (Dep.target) {
      this.subs.push(Dep.target);
    }
  }

  notify() {
    this.subs.forEach(sub => sub.update()); // 通知所有Watcher更新
  }
}
Dep.target = null; // 全局变量，指向当前正在计算的Watcher

// 观察者（Watcher）
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;
    Dep.target = this; // 关键：将当前Watcher赋值给Dep.target
    this.value = vm[key]; // 触发属性的getter，进行依赖收集
    Dep.target = null; // 收集完毕，重置
  }

  update() {
    this.cb.call(this.vm, this.vm[this.key]);
  }
}
```

### 2. Vue2 的局限性与解决方案

- 局限性1：无法检测对象属性的添加/删除

```javascript
// Vue2 无法自动响应
this.userInfo.age = 25; // ❌ 不是响应式的
delete this.userInfo.name; // ❌ 不是响应式的

// 解决方案：使用 Vue.set / this.$set
Vue.set(this.userInfo, 'age', 25); // ✅
this.$delete(this.userInfo, 'name'); // ✅
```

- 局限性2：数组变异方法的hack

```javascript
// Vue2 重写了数组方法来实现响应式
const originalArrayProto = Array.prototype;
const arrayProto = Object.create(originalArrayProto);

['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(method => {
  arrayProto[method] = function (...args) {
    const result = originalArrayProto[method].apply(this, args);
    this.__ob__.dep.notify(); // 手动通知更新
    return result;
  };
});
```

## Vue3 的原理：`Proxy` + 更精细的依赖管理

- Vue3 使用 `Proxy` 代理整个对象，可以拦截各种操作，从根本上解决了 Vue2 的局限性。

### 1. Proxy 的基本响应式实现

```javascript
// 简化的 Vue3 响应式原理
function reactive(target) {
  return createReactiveObject(target);
}

function createReactiveObject(target) {
  // 用 Proxy 包装目标对象
  return new Proxy(target, {
    get(obj, key, receiver) {
      const res = Reflect.get(obj, key, receiver);
      // 【依赖收集】当读取属性时，追踪这个属性与当前effect的关系
      track(obj, key);
      // 如果值是对象，递归代理
      if (res !== null && typeof res === 'object') {
        return reactive(res);
      }
      return res;
    },
    set(obj, key, value, receiver) {
      const oldValue = obj[key];
      const result = Reflect.set(obj, key, value, receiver);
      // 只有值真正改变时才触发更新
      if (oldValue !== value) {
        // 【触发更新】当属性变化时，只触发依赖于这个属性的effect
        trigger(obj, key);
      }
      return result;
    },
    deleteProperty(obj, key) {
      const hadKey = Object.prototype.hasOwnProperty.call(obj, key);
      const result = Reflect.deleteProperty(obj, key);
      if (hadKey) {
        // 删除属性也能触发更新！
        trigger(obj, key);
      }
      return result;
    },
  });
}

// 依赖收集和触发系统
const targetMap = new WeakMap(); // 全局的依赖存储结构

function track(target, key) {
  if (!activeEffect) return;
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  dep.add(activeEffect); // 将当前effect添加到依赖集合
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => effect()); // 只触发依赖于这个key的effect
  }
}

let activeEffect = null;
function effect(fn) {
  activeEffect = fn;
  fn(); // 执行函数，触发getter，收集依赖
  activeEffect = null;
}
```

### 2. Vue3 响应式的优势演示

```javascript
// Vue3 可以完美处理各种情况
const state = reactive({
  user: { name: '小明' },
  hobbies: ['篮球', '音乐'],
});

// 1. 动态添加属性 - 自动响应！
state.user.age = 18; // ✅
state.newProperty = '新属性'; // ✅

// 2. 数组操作 - 自动响应！
state.hobbies.push('游泳'); // ✅
state.hobbies[1] = '游戏'; // ✅

// 3. 删除属性 - 自动响应！
delete state.user.name; // ✅

// 4. 使用 effect 监听变化
effect(() => {
  console.log('用户年龄:', state.user.age); // 只会在这个属性变化时触发
});
```

## 对比总结

| 特性     | Vue2                    | Vue3                           |
| :------- | :---------------------- | :----------------------------- |
| 核心技术 | `Object.defineProperty` | `Proxy`                        |
| 数据监听 | 只能劫持已有属性        | 可监听整个对象，包括动态添加   |
| 数组处理 | 需要重写数组方法        | 原生支持数组索引修改、长度变化 |
| 性能表现 | 递归遍历所有属性        | 惰性代理，按需响应             |
| 内存占用 | 一次性转换所有数据      | 延迟代理，内存更优             |
| API设计  | Options API 为主        | Composition API + Options API  |

## 实际代码示例对比

### Vue2 实现

```vue
<template>
  <div>
    <input v-model="user.name" />
    <p>{{ user.name }}</p>
    <button @click="addAge">添加年龄</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: { name: '小明' },
    };
  },
  methods: {
    addAge() {
      // Vue2 中必须使用 $set
      this.$set(this.user, 'age', 18);
    },
  },
};
</script>
```

### Vue3 实现

```vue
<template>
  <div>
    <input v-model="user.name" />
    <p>{{ user.name }}</p>
    <button @click="addAge">添加年龄</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const user = reactive({ name: '小明' });

const addAge = () => {
  // Vue3 中可以直接添加，自动响应
  user.age = 18;
};
</script>
```

## 面试回答技巧

```text
"Vue2 使用 Object.defineProperty 来实现数据响应式，它的工作原理是：

数据劫持：通过 getter/setter 拦截属性的读取和修改

依赖收集：在 getter 中收集依赖这个属性的 Watcher

派发更新：在 setter 中通知所有 Watcher 更新视图

但 Vue2 有局限性：

无法检测对象属性的添加/删除，需要 Vue.set/Vue.delete

数组变异需要通过重写方法实现

需要对数据递归遍历，性能有损耗

Vue3 使用 Proxy 重写了响应式系统：

全面拦截：Proxy 可以拦截对象的各种操作，包括属性添加、删除等

惰性代理：只在访问时创建代理，性能更好

精准更新：建立了属性与 effect 的精确映射，更新更高效

Vue3 的响应式从根本上解决了 Vue2 的痛点，提供了更好的性能和开发体验。"

记住核心对比：
Vue2 = DefineProperty + 递归遍历 + 数组hack
Vue3 = Proxy + 惰性代理 + 精准更新
```
