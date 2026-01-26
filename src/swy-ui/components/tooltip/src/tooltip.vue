<template>
  <div :class="ns.b()" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div :class="ns.e('trigger')">
      <slot />
    </div>
    <transition name="swy-tooltip-fade">
      <div v-if="shouldShow" :class="[ns.e('popper'), ns.m(placement), ns.m(effect)]">
        {{ content }}
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { tooltipProps } from './tooltip'

defineOptions({
  name: 'SwyTooltip',
})

const props = defineProps(tooltipProps)

const ns = useNamespace('tooltip')

const internalVisible = ref(false)
let timer: any = null

const shouldShow = computed(() => {
  if (props.disabled) return false
  if (props.visible !== null) return props.visible
  return internalVisible.value
})

const handleMouseEnter = () => {
  if (props.disabled || props.visible !== null) return

  if (props.showAfter > 0) {
    timer = setTimeout(() => {
      internalVisible.value = true
    }, props.showAfter)
  } else {
    internalVisible.value = true
  }
}

const handleMouseLeave = () => {
  if (props.disabled || props.visible !== null) return

  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  internalVisible.value = false
}
</script>
