---
outline: deep
---

## 基础用法

基础的按钮用法。

<!-- <script setup>
// import { registerContext } from '@script-preview';
// function add(a, b) {
//   return a + b;
// }
// 脚本内需要调用的函数或变量可以在这里注册
// registerContext({
//   add
// });
</script> -->

:::demo

```vue
<template>
  <xl-button>默认按钮</xl-button>
  <xl-button type="primary">主要按钮</xl-button>
  <xl-button type="success">成功按钮</xl-button>
  <xl-button type="info">信息按钮</xl-button>
  <xl-button type="warning">警告按钮</xl-button>
  <xl-button type="danger">危险按钮</xl-button>
</template>
```

:::

:::demo

```vue
<template>
  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
</template>
```

:::
<!-- ../src/components -->
<preview path='@component/ElButton.vue'  title="title" description="content" />

::: script-preview expand=true
<!-- console.log('1 + 2 =', add(1, 2)); -->
console.log('Hello VitePress!');
console.error('This is an error message.');

:::

::: code-group

```sh [npm]
$ npm create vue@latest
```

```sh [pnpm]
$ pnpm create vue@latest
```

```sh [yarn]
# For Yarn (v1+)
$ yarn create vue

# For Yarn Modern (v2+)
$ yarn create vue@latest

# For Yarn ^v4.11
$ yarn dlx create-vue@latest
```

```sh [bun]
$ bun create vue@latest
```

:::


