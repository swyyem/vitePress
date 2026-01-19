<template>
  <component
    :is="tag"
    :class="[
      ns.b(),
      ns.m(type),
      ns.m(size),
      ns.is('truncated', truncated),
      ns.is('line-clamp', lineClamp),
    ]"
    :style="lineClampStyle"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { textProps } from './text'

defineOptions({
  name: 'SwyText',
})

const props = defineProps(textProps)

const ns = useNamespace('text')

const lineClampStyle = computed(() => {
  if (props.lineClamp) {
    return {
      '-webkit-line-clamp': props.lineClamp,
    }
  }
  return {}
})
</script>
