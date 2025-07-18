# 原子组件

:::demo

```vue
<template>
  <ProField
    valueType="colorPicker"
    v-model="color1"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const color1 = ref('#409EFF')
</script>
```
