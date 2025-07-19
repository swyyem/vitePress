# 开关组件

:::demo

```vue
<template>
  <ProField valueType="switch" v-model="value" :fieldProps="{}" />
</template>
<script lang="ts" setup>
import { ref } from "vue";

const value = ref(true);
</script>
```
