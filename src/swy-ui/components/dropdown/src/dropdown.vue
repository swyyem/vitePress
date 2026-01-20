<template>
  <div
    :class="[ns.b(), ns.m(size), ns.is('disabled', disabled)]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <div :class="ns.e('trigger')">
      <slot />
    </div>
    <transition name="swy-dropdown-fade">
      <div v-if="visible" :class="[ns.e('popper'), 'swy-dropdown-menu', ns.m(size)]">
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { dropdownProps, dropdownEmits } from './dropdown'

defineOptions({
  name: 'SwyDropdown',
})

const props = defineProps(dropdownProps)
const emit = defineEmits(dropdownEmits)

const ns = useNamespace('dropdown')

const visible = ref(false)

provide('dropdown', {
  size: props.size,
  handleCommand: (command: string | number) => {
    visible.value = false
    emit('command', command)
  },
})

const handleMouseEnter = () => {
  if (props.trigger === 'hover' && !props.disabled) {
    visible.value = true
  }
}

const handleMouseLeave = () => {
  if (props.trigger === 'hover' && !props.disabled) {
    visible.value = false
  }
}

const handleClick = () => {
  if (props.trigger === 'click' && !props.disabled) {
    visible.value = !visible.value
  }
}
</script>
