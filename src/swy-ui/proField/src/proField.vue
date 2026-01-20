<template>
  <component
    :is="componentMap[props.valueType]"
    ref="_ref"
    v-bind="props.fieldProps"
    v-model="modelValue"
    @click="handleClick"
    @change="handleChange"
    @input="handleInput"
    @blur="handleBlur"
    @focus="handleFocus"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-for="(_, name) in $slots" :key="name" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { proFieldProps, proFieldEmits, componentMap } from './proField'
import { useProField } from './use-proField'
defineOptions({
  name: 'ProField',
})

const props = defineProps(proFieldProps)
const emit = defineEmits(proFieldEmits)

// v-model 双向绑定支持
const modelValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const { _ref, _fieldProps, handleClick, handleChange, handleInput, handleBlur, handleFocus } =
  useProField(props, emit)

defineExpose({
  /** @description proField 元素 */
  ref: _ref,
  fieldProps: _fieldProps,
})
</script>
