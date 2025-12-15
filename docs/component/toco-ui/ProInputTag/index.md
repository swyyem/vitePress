# 基础用法

<br>
<br>

:::demo

```vue
<template>
  <ProInputTag v-model="select" placeholder="请输入" ref="selectRef" :onRemoveTag="handleRemove" />
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const selectRef = ref()
const select = ref()

const handleRemove = (val: any) => {
  console.log('=remove=', val)
}
</script>
```
