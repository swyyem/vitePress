# 原子组件

:::demo

```vue
<template>
  <ProField
    valueType="inputTag"
    v-model="input"
    :fieldProps="{
      placeholder: 'Please Input',
      ariaLabel: 'Please click the Enter key after input',
    }"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";

const input = ref<string[]>();
</script>
```
