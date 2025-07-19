# 金钱组件

:::demo

```vue
<template>
  <ProField valueType="price" v-model="state1" :fieldProps="{
    currency: 'CNY',
  }" />
</template>
<script lang="ts" setup>
import { ref } from "vue";

const state1 = ref(0);
</script>
```
