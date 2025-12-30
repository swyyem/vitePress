<template>
  <div>11111</div>
</template>

<script lang="ts" setup>
import { createComponentMap } from './utils'
defineOptions({
  name: 'ProField',
})

const componentMap = createComponentMap()

console.log('所有组件的默认属性:', componentMap)
</script>
