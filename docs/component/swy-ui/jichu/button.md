# 文本组件

## 描述

:::demo

```vue
<template>
  <SwyButton type="primary" @click="clickButton">默认按钮</SwyButton>
  <SwyRadioGroup v-model="SwyModel" @change="changeModel">
    <SwyRadio value="0" label="默认"></SwyRadio>
    <SwyRadio value="1" label="哈哈哈"></SwyRadio>
  </SwyRadioGroup>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const SwyModel = ref(false)

const clickButton = () => {
  console.log('clickButton')
}

const changeModel = () => {
  // console.log('changeModel', SwyModel.value)
}
</script>
```
