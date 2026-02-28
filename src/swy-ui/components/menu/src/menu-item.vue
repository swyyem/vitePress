/** File: menu-item.vue - Vue Component */

<template>
  <li
    :class="[ns.b('menu-item'), ns.is('active', isActive), ns.is('disabled', disabled)]"
    :style="{
      color: isActive ? menu?.activeTextColor : menu?.textColor,
    }"
    @click="handleClick"
  >
    <slot />
  </li>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { inject, computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { menuItemProps } from './menu-item'

defineOptions({
  name: 'SwyMenuItem',
})

const props = defineProps(menuItemProps)

const ns = useNamespace('swy')

const menu = inject<any>('menu')

const isActive = computed(() => {
  return menu?.activeIndex.value === props.index
})

const handleClick = () => {
  if (!props.disabled) {
    menu?.handleSelect(props.index, [props.index])
  }
}
</script>
