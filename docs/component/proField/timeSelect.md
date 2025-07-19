# 原子组件

:::demo

```vue
<template>
  <ProField valueType="timeSelect" v-model="value" :fieldProps="{}" />
</template>
<script lang="ts" setup>
import { ref } from "vue";

const value = ref("");
</script>
```
