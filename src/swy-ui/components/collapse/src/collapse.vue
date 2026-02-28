/** File: collapse.vue - Vue Component */

<template>
  <div
    :class="[
      ns.b(),
      ns.is('arrow-placement-left', arrowPlacement === 'left'),
      ns.is('ghost', ghost),
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { provide, ref, watch } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { collapseProps, collapseEmits } from './collapse'

defineOptions({
  name: 'SwyCollapse',
})

const props = defineProps(collapseProps)
const emit = defineEmits(collapseEmits)

const ns = useNamespace('collapse')

const activeNames = ref(Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue])

watch(
  () => props.modelValue,
  val => {
    activeNames.value = Array.isArray(val) ? val : [val]
  }
)

const handleItemClick = (name: string | number) => {
  if (props.accordion) {
    activeNames.value = activeNames.value[0] === name ? [] : [name]
  } else {
    const index = activeNames.value.indexOf(name)
    if (index > -1) {
      activeNames.value.splice(index, 1)
    } else {
      activeNames.value.push(name)
    }
  }

  const value = props.accordion ? activeNames.value[0] || '' : activeNames.value
  emit('update:modelValue', value)
  emit('change', value)
}

provide('collapse', {
  activeNames,
  handleItemClick,
})
</script>
