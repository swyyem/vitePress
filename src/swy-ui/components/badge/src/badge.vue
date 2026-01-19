<template>
  <div :class="ns.b()">
    <slot />
    <transition name="swy-zoom-in-center">
      <sup
        v-if="showContent"
        v-show="!hidden && (value || value === 0 || isDot)"
        :class="contentClasses"
      >
        {{ displayValue }}
      </sup>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { isNumber } from 'lodash-unified'
import { badgeProps } from './badge'

defineOptions({
  name: 'SwyBadge',
})

const props = defineProps(badgeProps)

const ns = useNamespace('badge')
const slots = useSlots()

const showContent = computed(() => {
  return !!props.value || props.value === 0 || props.isDot
})

const displayValue = computed(() => {
  if (props.isDot) return ''

  const value = props.value
  if (isNumber(value) && isNumber(props.max)) {
    return value > props.max ? `${props.max}+` : value
  }

  return value
})

const contentClasses = computed(() => [
  ns.e('content'),
  ns.em('content', props.type),
  ns.is('fixed', !!slots.default),
  ns.is('dot', props.isDot),
  ns.is('hide-zero', !showContent.value),
])
</script>
