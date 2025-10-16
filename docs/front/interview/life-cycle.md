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
