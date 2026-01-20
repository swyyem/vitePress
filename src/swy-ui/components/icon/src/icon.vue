<template>
  <component :is="iconComponent" :class="iconKls" :style="iconStyle" v-bind="$attrs" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { iconProps } from './icon'
import * as Icons from './icons'

defineOptions({
  name: 'SwyIcon',
  inheritAttrs: false,
})

const props = defineProps(iconProps)
const ns = useNamespace('icon')

// 图标组件映射
const iconComponent = computed(() => {
  if (typeof props.name === 'string') {
    // 如果是字符串，从图标库中查找
    const iconName = props.name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')

    return Icons[iconName as keyof typeof Icons] || null
  }
  // 如果是组件，直接返回
  return props.name
})

const iconKls = computed(() => [
  ns.b(),
  {
    [ns.m(props.size)]: props.size,
  },
])

const iconStyle = computed(() => ({
  ...(props.color ? { color: props.color } : {}),
  ...(props.size && !['small', 'default', 'large'].includes(props.size)
    ? { fontSize: props.size }
    : {}),
}))
</script>
