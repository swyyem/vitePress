<template>
  <component :is="tag" :class="rowKls" :style="rowStyle">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { rowProps } from './row'
import { rowContextKey } from './constants'

defineOptions({
  name: 'SwyRow',
})

const props = defineProps(rowProps)

const ns = useNamespace('row')
const gutter = computed(() => props.gutter)

provide(rowContextKey, {
  gutter,
})

const rowKls = computed(() => [
  ns.b(),
  props.justify !== 'start' ? ns.is(`justify-${props.justify}`) : '',
  props.align !== 'top' ? ns.is(`align-${props.align}`) : '',
])

const rowStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.gutter) {
    style.marginLeft = style.marginRight = `-${props.gutter / 2}px`
  }
  return style
})

defineExpose({
  /** @description 栅格间隔 */
  gutter,
})
</script>
