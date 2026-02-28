/** File: col.vue - Vue Component */

<template>
  <component :is="tag" :class="colKls" :style="colStyle">
    <slot />
  </component>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, inject } from 'vue'
import { isNumber, isObject } from '@swy-ui/utils'
import { useNamespace } from '@swy-ui/hooks'
import { rowContextKey } from '@swy-ui/components/row'
import { colProps } from './col'

defineOptions({
  name: 'SwyCol',
})

const props = defineProps(colProps)

const ns = useNamespace('col')
const { gutter } = inject(rowContextKey, { gutter: computed(() => 0) })

const colKls = computed(() => {
  const classes: string[] = []
  const pos = ['span', 'offset', 'pull', 'push'] as const

  pos.forEach(prop => {
    const size = props[prop]
    if (isNumber(size)) {
      if (prop === 'span') classes.push(ns.b(`${props[prop]}`))
      else if (size > 0) classes.push(ns.b(`${prop}-${props[prop]}`))
    }
  })

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
  sizes.forEach(size => {
    if (isNumber(props[size])) {
      classes.push(ns.b(`${size}-${props[size]}`))
    } else if (isObject(props[size])) {
      Object.entries(props[size]).forEach(([prop, sizeProp]) => {
        classes.push(
          prop !== 'span' ? ns.b(`${size}-${prop}-${sizeProp}`) : ns.b(`${size}-${sizeProp}`)
        )
      })
    }
  })

  // this is for the fix
  if (gutter.value) {
    classes.push(ns.is('guttered'))
  }
  return [ns.b(), classes]
})

const colStyle = computed(() => {
  const style: Record<string, string> = {}
  if (gutter.value) {
    style.paddingLeft = style.paddingRight = `${gutter.value / 2}px`
  }
  return style
})
</script>
