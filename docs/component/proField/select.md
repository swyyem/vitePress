# 下拉选择组件

:::demo

```vue
<template>
  <ProField
    valueType="select"
    v-model="value"
    :fieldProps="{
      options: options,
    }"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";

const value = ref("");

const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
</script>
```
