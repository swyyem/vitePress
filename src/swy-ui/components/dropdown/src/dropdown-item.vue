<template>
  <li
    :class="[ns.b('dropdown-menu__item'), ns.is('disabled', disabled), ns.m('divided', divided)]"
    @click="handleClick"
  >
    <slot />
  </li>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { dropdownItemProps } from './dropdown-item'

defineOptions({
  name: 'SwyDropdownItem',
})

const props = defineProps(dropdownItemProps)

const ns = useNamespace('swy')

const dropdown = inject<any>('dropdown')

const handleClick = () => {
  if (!props.disabled && props.command) {
    dropdown?.handleCommand(props.command)
  }
}
</script>
