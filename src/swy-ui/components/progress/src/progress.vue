/** File: progress.vue - Vue Component */

<template>
  <div :class="[ns.b(), ns.m(type), ns.is(status), ns.is('without-text', !showText)]">
    <div v-if="type === 'line'" :class="ns.b('bar')">
      <div :class="ns.be('bar', 'outer')" :style="{ height: `${strokeWidth}px` }">
        <div :class="ns.be('bar', 'inner')" :style="barStyle">
          <div v-if="showText && textInside" :class="ns.be('bar', 'innerText')">
            {{ displayText }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="showText && !textInside" :class="ns.e('text')">
      {{ displayText }}
    </div>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { progressProps } from './progress'

defineOptions({
  name: 'SwyProgress',
})

const props = defineProps(progressProps)

const ns = useNamespace('progress')

const textInside = computed(() => props.type === 'line' && props.strokeWidth > 20)

const barStyle = computed(() => {
  return {
    width: `${props.percentage}%`,
    backgroundColor: typeof props.color === 'string' ? props.color : '',
  }
})

const displayText = computed(() => {
  if (props.format) {
    return props.format(props.percentage)
  }
  return `${props.percentage}%`
})
</script>
