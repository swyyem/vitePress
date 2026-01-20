<template>
  <component :is="tag" :class="spaceKls" :style="spaceStyle">
    <template v-for="(item, index) in items" :key="index">
      <div v-if="index > 0 && separator" :class="ns.e('separator')">
        <component v-if="typeof separator === 'object'" :is="separator" />
        <span v-else>{{ separator }}</span>
      </div>
      <div :class="ns.e('item')">
        <slot :name="`item-${index}`" :item="item">
          <component :is="item" v-if="typeof item === 'object'" />
          <span v-else>{{ item }}</span>
        </slot>
      </div>
    </template>
  </component>
</template>

<script lang="ts" setup>
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

const spaceKls = computed(() => [
  ns.b(),
  ns.m(props.direction),
  ns.m(props.size),
  ns.is('wrap', props.wrap),
  ns.is('fill', props.fill),
  {
    [ns.m(`align-${props.alignment}`)]: props.alignment,
  },
])

const spaceStyle = computed(() => {
  const style: Record<string, string> = {}

  if (typeof props.size === 'number') {
    style.gap = `${props.size}px`
  }

  return style
})
</script>
