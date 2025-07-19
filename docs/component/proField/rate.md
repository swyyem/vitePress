# 评分组件

:::demo

```vue
<template>
  <ProField
    valueType="rate"
    v-model="value1"
    :fieldProps="{
      colors: colors,
    }"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";

const value1 = ref(0);
const colors = ref(["#99A9BF", "#F7BA2A", "#FF9900"]); // same as { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
</script>
```
