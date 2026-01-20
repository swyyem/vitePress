<template>
  <li :class="timelineItemKls">
    <div :class="ns.e('tail')" />
    <div
      v-if="!$slots.dot"
      :class="[ns.e('node'), ns.em('node', type || ''), ns.em('node', size || '')]"
    >
      <el-icon v-if="icon" :class="ns.e('icon')">
        <component :is="icon" />
      </el-icon>
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
import { computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { timelineItemProps } from './timeline-item'

defineOptions({
  name: 'SwyTimelineItem',
})

defineProps(timelineItemProps)

const ns = useNamespace('timeline-item')

const timelineItemKls = computed(() => [ns.b()])
</script>
