# 文本组件

## 描述


> 基于 [element-plus](https://element-plus.gitee.io/#/zh-CN/component/input)]二次封装,

:::demo

```vue
<template>
  <ProField
    valueType="text"
    v-model="input"
    :fieldProps="{
      clearable: true,
      placeholder: 'Please Input',
    }"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";

const input = ref("");
</script>
```
