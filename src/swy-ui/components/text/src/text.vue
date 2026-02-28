/** File: text.vue - Vue Component */

<template>
  <component :is="tag" ref="textRef" :class="textKls" :style="lineClampStyle">
    <slot />
  </component>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, ref, onMounted, onUpdated, useAttrs } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { useFormSize } from '@swy-ui/components/form'
import { isUndefined } from '@swy-ui/utils'
import { textProps } from './text'

defineOptions({
  name: 'SwyText',
})

const props = defineProps(textProps)
const textRef = ref<HTMLElement>()

const textSize = useFormSize()
const ns = useNamespace('text')

const textKls = computed(() => [
  ns.b(),
  ns.m(props.type),
  ns.m(textSize.value),
  ns.is('truncated', props.truncated),
  ns.is('line-clamp', !isUndefined(props.lineClamp) && props.lineClamp !== ''),
])

const lineClampStyle = computed(() => {
  if (props.lineClamp) {
    return {
      '-webkit-line-clamp': props.lineClamp,
    }
  }
  return {}
})

const bindTitle = () => {
  const attrs = useAttrs()
  if (attrs.title) return

  let shouldAddTitle = false
  const el = textRef.value
  if (!el) return

  const text = el.textContent || ''

  if (props.truncated) {
    const width = el.offsetWidth
    const scrollWidth = el.scrollWidth
    if (width && scrollWidth && scrollWidth > width) {
      shouldAddTitle = true
    }
  } else if (props.lineClamp) {
    const height = el.offsetHeight
    const scrollHeight = el.scrollHeight
    if (height && scrollHeight && scrollHeight > height) {
      shouldAddTitle = true
    }
  }

  if (shouldAddTitle) {
    el.setAttribute('title', text)
  } else {
    el.removeAttribute('title')
  }
}

onMounted(bindTitle)
onUpdated(bindTitle)
</script>
