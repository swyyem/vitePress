# 提及组件

:::demo

```vue
<template>
  <ProField
    valueType="mention"
    v-model="value"
    :fieldProps="{
      options: options,
      placeholder: 'Please Input',
    }"
  />
</template>
<script setup lang="ts">
import { ref } from "vue";

const value = ref("@");

const options = ref([
  {
    label: "Fuphoenixes",
    value: "Fuphoenixes",
  },
  {
    label: "kooriookami",
    value: "kooriookami",
  },
  {
    label: "Jeremy",
    value: "Jeremy",
  },
  {
    label: "btea",
    value: "btea",
  },
]);
</script>
```
