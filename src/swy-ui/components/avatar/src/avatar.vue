<template>
  <span :class="[ns.b(), ns.m(shape), ns.m(sizeClass), hasIcon && ns.m('icon')]" :style="sizeStyle">
    <img v-if="src" :src="src" :alt="alt" @error="handleError" />
    <component v-else-if="icon" :is="icon" />
    <slot v-else />
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { avatarProps, avatarEmits, avatarSizes } from './avatar'

defineOptions({
  name: 'SwyAvatar',
})

const props = defineProps(avatarProps)
const emit = defineEmits(avatarEmits)

const ns = useNamespace('avatar')

const hasIcon = computed(() => !!props.icon)

const sizeClass = computed(() => {
  if (typeof props.size === 'string' && avatarSizes.includes(props.size as any)) {
    return props.size
  }
  return ''
})

const sizeStyle = computed(() => {
  if (typeof props.size === 'number') {
    return {
      '--swy-avatar-size': `${props.size}px`,
    }
  }
  return {}
})

const handleError = (event: Event) => {
  emit('error', event)
}
</script>
