# 基础用法

<br>
<br>

:::demo

```vue
<template>
  <ProSelect
    v-model="select"
    :contentWidth="300"
    :filterable="true"
    :valueEnum="defaultValueEnum"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const select = ref(12);

const defaultValueEnum = [
  {
    label: `测试12`,
    value: 12,
  },
  {
    label: `测试13`,
    value: 13,
  },
];
</script>
```
