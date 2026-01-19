<template>
  <section :class="[ns.b(), ns.is('vertical', isVertical)]">
    <slot />
  </section>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { containerProps } from './container'

defineOptions({
  name: 'SwyContainer',
})

const props = defineProps(containerProps)
const slots = useSlots()

const ns = useNamespace('container')

const isVertical = computed(() => {
  if (props.direction === 'vertical') return true
  if (props.direction === 'horizontal') return false

  // 自动检测是否包含 Header 或 Footer
  if (slots.default) {
    const vNodes = slots.default()
    return vNodes.some((vNode: any) => {
      const tag = vNode.type?.name || ''
      return tag === 'SwyHeader' || tag === 'SwyFooter'
    })
  }
  return false
})
</script>
