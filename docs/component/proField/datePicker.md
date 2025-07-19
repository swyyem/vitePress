# 日期选择器组件

:::demo

```vue
<template>
  <ProField
    valueType="datePicker"
    v-model="value1"
    :fieldProps="{
      disabledDate: disabledDate,
    }"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";

const value1 = ref("");

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};
</script>
```
