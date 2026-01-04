# 文本组件

## 描述

:::demo

```vue
<template>
  <SwyButton type="primary">默认按钮</SwyButton>
  <SwyRadio v-model="SwyModel" @change="changeModel"></SwyRadio>
  <ProField
    ref="qqqqq"
    valueType="SwyRadio"
    v-model="aaa"
    @click="onChange"
    :filedProps="{
      type: 'primary',
    }"
  >
    默认按钮
  </ProField>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const SwyModel = ref(false)
const qqqqq = ref()
const aaa = ref(false)

const changeModel = () => {
  console.log('changeModel')
}

const onChange = () => {
  console.log('change')
  console.log(qqqqq.value)
}
</script>
```
