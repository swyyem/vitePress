<template>
  <ul :class="[ns.b(), ns.is('center', props.center)]">
    <slot />
  </ul>
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { timelineProps } from './timeline'

defineOptions({
  name: 'SwyTimeline',
})

const props = defineProps(timelineProps)
const ns = useNamespace('timeline')

provide('timeline', { props })
</script>
