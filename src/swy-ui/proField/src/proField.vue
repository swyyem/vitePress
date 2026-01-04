<template>
  <component
    :is="componentMap[props.valueType]"
    ref="_ref"
    v-bind="props.filedProps"
    @click="handleClick"
  >
    11111
  </component>
</template>

<script lang="ts" setup>
import { proFieldProps, proFieldEmits, componentMap } from './proField'
import { useProField } from './use-proField'
defineOptions({
  name: 'ProField',
})

const props = defineProps(proFieldProps)
const emit = defineEmits(proFieldEmits)

const { _ref, _filedProps, handleClick } = useProField(props, emit)
// console.log('props:', props.filedProps)
// console.log(_ref, _filedProps, handleClick)

defineExpose({
  /** @description proField 元素 */
  ref: _ref,
  filedProps: _filedProps,
})
</script>
