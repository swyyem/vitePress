<template>
  <li :class="[ns.b(), ns.is('center', center)]">
    <div :class="ns.e('tail')" />
    <div
      v-if="!$slots.dot"
      :class="[
        ns.e('node'),
        ns.em('node', type || ''),
        ns.em('node', size || ''),
        ns.is('hollow', hollow),
      ]"
      :style="{ backgroundColor: color, borderColor: color }"
    >
      <swy-icon v-if="icon" :name="icon" :class="ns.e('icon')" />
    </div>
    <div v-if="$slots.dot" :class="ns.e('dot')">
      <slot name="dot" />
    </div>
    <div :class="ns.e('wrapper')">
      <div v-if="!hideTimestamp && placement === 'top'" :class="[ns.e('timestamp'), ns.is('top')]">
        {{ timestamp }}
      </div>
      <div :class="ns.e('content')">
        <slot />
      </div>
      <div
        v-if="!hideTimestamp && placement === 'bottom'"
        :class="[ns.e('timestamp'), ns.is('bottom')]"
      >
        {{ timestamp }}
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import SwyIcon from '@swy-ui/components/icon'
import { timelineItemProps } from './timeline-item'

defineOptions({
  name: 'SwyTimelineItem',
})

defineProps(timelineItemProps)
const ns = useNamespace('timeline-item')

// 获取父组件状态（如果需要 center 支持）
const timeline = inject('timeline', { props: { center: false } })
const center = computed(() => timeline.props.center)
</script>
