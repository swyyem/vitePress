# 分段控制器组件

:::demo

```vue
<template>
  <ProField
    valueType="segmented"
    v-model="value"
    :fieldProps="{
      options: options,
      size: 'small',
    }"
  />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const value = ref('Mon')

const options = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
</script>
```
