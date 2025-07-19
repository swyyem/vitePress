# 复选框组件

:::demo

```vue
<template>
  <ProField
    valueType="checkbox"
    v-model="value"
    :fieldProps="{
      options: options,
      props: props,
      onChange: handleChange,
    }"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";

const value = ref([]);

const props = {
  expandTrigger: "hover" as const,
};

const handleChange = (value) => {
  console.log(value);
};

const options = [
  {
    value: "consistency",
    label: "Consistency",
  },
  {
    value: "feedback",
    label: "Feedback",
  },
  {
    value: "efficiency",
    label: "Efficiency",
  },
  {
    value: "controllability",
    label: "Controllability",
  },
];
</script>
```
