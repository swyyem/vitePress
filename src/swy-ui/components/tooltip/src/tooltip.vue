<template>
  <div :class="ns.b()" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div :class="ns.e('trigger')">
      <slot />
    </div>
    <transition name="swy-tooltip-fade">
      <div v-if="visible" :class="[ns.e('popper'), ns.m(placement), ns.m(effect)]">
        {{ content }}
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { tooltipProps } from './tooltip'

defineOptions({
  name: 'SwyTooltip',
})

const props = defineProps(tooltipProps)

const ns = useNamespace('tooltip')

const visible = ref(false)
let timer: any = null

const handleMouseEnter = () => {
  if (props.disabled) return

  if (props.showAfter > 0) {
    timer = setTimeout(() => {
      visible.value = true
    }, props.showAfter)
  } else {
    visible.value = true
  }
}

const handleMouseLeave = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  visible.value = false
}
</script>
