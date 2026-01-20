<template>
  <ul
    :class="[ns.b(), ns.m(mode)]"
    :style="{
      backgroundColor: backgroundColor,
      color: textColor,
    }"
  >
    <slot />
  </ul>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { menuProps, menuEmits } from './menu'

defineOptions({
  name: 'SwyMenu',
})

const props = defineProps(menuProps)
const emit = defineEmits(menuEmits)

const ns = useNamespace('menu')

const activeIndex = ref(props.defaultActive)

const handleSelect = (index: string, indexPath: string[]) => {
  activeIndex.value = index
  emit('select', index, indexPath)
}

provide('menu', {
  activeIndex,
  mode: props.mode,
  textColor: props.textColor,
  activeTextColor: props.activeTextColor,
  handleSelect,
})
</script>
