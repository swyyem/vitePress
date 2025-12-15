# 虚拟下拉选择组件

:::demo

```vue
<template>
  <ProField
    valueType="selectV2"
    v-model="value"
    :fieldProps="{
      options: options,
    }"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

const value = ref()
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}))
</script>
```
