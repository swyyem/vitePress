/** File: description-item.vue - Vue Component */

<template>
  <div :class="[ns.e('item'), { 'is-vertical': direction === 'vertical' }]" :style="itemStyle">
    <div
      :class="[
        ns.e('label'),
        ns.is('bordered-label', border),
        labelClassName,
        ns.is('vertical-label', direction === 'vertical'),
      ]"
      :style="labelStyle"
    >
      <slot name="label">{{ label }}</slot>
    </div>
    <div
      :class="[ns.e('content'), ns.is('bordered-content', border), className]"
      :style="contentStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, inject } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { descriptionsItemProps } from './description-item'

defineOptions({
  name: 'SwyDescriptionsItem',
})

const props = defineProps(descriptionsItemProps)
const ns = useNamespace('descriptions')

// 获取父组件注入的状态
const descriptionsContext = inject('descriptionsContext', {
  border: false,
  direction: 'horizontal',
})

const border = computed(() => descriptionsContext.border)
const direction = computed(() => descriptionsContext.direction)

const itemStyle = computed(() => {
  if (direction.value === 'vertical') {
    return {
      gridColumn: `span ${props.span}`,
    }
  }
  return {
    gridColumn: `span ${props.span}`,
    display: 'flex',
    alignItems: 'center',
  }
})

const labelStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  minWidth: typeof props.minWidth === 'number' ? `${props.minWidth}px` : props.minWidth,
  textAlign: props.labelAlign as any,
}))

const contentStyle = computed(() => ({
  textAlign: props.align as any,
  flex: direction.value === 'horizontal' ? 1 : undefined,
}))
</script>
