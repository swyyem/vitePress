<template>
  <ul :class="timelineKls">
    <slot />
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { timelineProps } from './timeline'

defineOptions({
  name: 'SwyTimeline',
})

defineProps(timelineProps)

const ns = useNamespace('timeline')

const timelineKls = computed(() => [ns.b()])
</script>
