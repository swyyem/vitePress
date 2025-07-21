<template>
  <div>
    {{ props }}
    自定义组件
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'CustomComponent',
})

const props = defineProps({
  fieldProps: {
    type: Object,
  },
})
</script>

<style scoped></style>
