# 原子组件

:::demo

```vue
<template>
  <ProField valueType="inputNumber" v-model="num" />
</template>
<script lang="ts" setup>
import { ref } from "vue";

const num = ref(1);
</script>
```
