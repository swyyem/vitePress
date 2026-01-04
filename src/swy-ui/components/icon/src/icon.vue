<template>
  <i :class="ns.b()" :style="style" v-bind="$attrs">
    <slot />
  </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { addUnit } from '@swy-ui/utils'
import { useNamespace } from '@swy-ui/hooks'
import { iconProps } from './icon'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'ElIcon',
  inheritAttrs: false,
})
const props = defineProps(iconProps)
const ns = useNamespace('icon')

const style = computed<CSSProperties>(() => {
  const { size, color } = props
  const fontSize = addUnit(size)
  if (!fontSize && !color) return {}

  return {
    fontSize,
    '--color': color,
  }
})
</script>
