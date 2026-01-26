<template>
  <component :is="tag" :class="colKls" :style="colStyle">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { colProps } from './col'

defineOptions({
  name: 'SwyCol',
})

const props = defineProps(colProps)

const ns = useNamespace('col')
const row = inject<{ gutter?: number }>('row', {})

const colKls = computed(() => {
  const classes: string[] = [ns.b()]

  if (props.span) {
    classes.push(`${ns.namespace.value}-col-${props.span}`)
  }

  if (props.offset) {
    classes.push(`${ns.namespace.value}-col-offset-${props.offset}`)
  }

  if (props.pull) {
    classes.push(`${ns.namespace.value}-col-pull-${props.pull}`)
  }

  if (props.push) {
    classes.push(`${ns.namespace.value}-col-push-${props.push}`)
  }

  return classes
})

const colStyle = computed(() => {
  const style: Record<string, string> = {}
  if (row.gutter) {
    style.paddingLeft = style.paddingRight = `${row.gutter / 2}px`
  }
  return style
})
</script>
