/** File: space.vue - Vue Component */

<template>
  <component :is="tag" :class="spaceKls" :style="spaceStyle">
    <template v-for="(item, index) in items" :key="index">
      <div v-if="index > 0 && hasSplit" :class="ns.e('separator')">
        <slot name="split" />
      </div>
      <div :class="ns.e('item')">
        <component :is="item" />
      </div>
    </template>
  </component>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, useSlots } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { spaceProps } from './space'

defineOptions({
  name: 'SwySpace',
})

const props = defineProps(spaceProps)
const slots = useSlots()

const ns = useNamespace('space')

const items = computed(() => {
  const defaultSlot = slots.default?.() || []
  return defaultSlot.filter(item => item.type !== Comment)
})

const hasSplit = computed(() => !!slots.split)

const spaceKls = computed(() => [
  ns.b(),
  ns.m(props.direction),
  ns.is('wrap', props.wrap),
  ns.is('fill', props.fill),
  props.align ? ns.is(`align-${props.align}`) : '',
])

const getSizeValue = (size: string | number) => {
  if (typeof size === 'number') return `${size}px`
  const sizeMap: Record<string, string> = {
    small: '8px',
    default: '12px',
    large: '16px',
  }
  return sizeMap[size] || '12px'
}

const spaceStyle = computed(() => {
  const style: Record<string, string> = {}
  const gap = getSizeValue(props.size)
  style.gap = gap
  return style
})
</script>
