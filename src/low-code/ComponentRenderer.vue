<template>
  <component :is="instance.type" v-bind="cleanProps" :style="mergedStyle">
    <template v-if="slotText">{{ slotText }}</template>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getComponentMeta } from './component-registry'
import type { ComponentInstance } from './types'

const props = defineProps<{
  instance: ComponentInstance
}>()

const meta = computed(() => getComponentMeta(props.instance.type))

/** 过滤掉 slotContent、undefined 值，组装传给组件的 props */
const cleanProps = computed(() => {
  const result: Record<string, unknown> = {}
  const metaProps = meta.value?.props || []
  for (const p of metaProps) {
    if (p.key === 'slotContent') continue
    const val = props.instance.props[p.key]
    if (val !== undefined && val !== '') {
      result[p.key] = val
    }
  }
  /* select 组件需要 options 数据做演示 */
  if (props.instance.type === 'SwySelect' && !result.options) {
    result.options = [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
      { label: '选项三', value: '3' },
    ]
  }
  return result
})

const slotText = computed(() => {
  return props.instance.slotContent || props.instance.props.slotContent || ''
})

/** 自定义样式合并 */
const mergedStyle = computed(() => {
  const cs = props.instance.customStyle
  if (!cs) return undefined
  const style: Record<string, string> = {}
  for (const [k, v] of Object.entries(cs)) {
    if (v) style[k] = v
  }
  return Object.keys(style).length ? style : undefined
})
</script>
