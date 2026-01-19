<template>
  <a
    :class="[
      ns.b(),
      ns.m(type),
      ns.is('disabled', disabled),
      ns.is('underline', underline && !disabled),
    ]"
    :href="disabled || !href ? undefined : href"
    @click="handleClick"
  >
    <span v-if="icon" :class="ns.e('icon')">
      <component :is="icon" />
    </span>
    <span v-if="$slots.default" :class="ns.e('inner')">
      <slot />
    </span>
  </a>
</template>

<script lang="ts" setup>
import { useNamespace } from '@swy-ui/hooks'
import { linkProps, linkEmits } from './link'

defineOptions({
  name: 'SwyLink',
})

const props = defineProps(linkProps)
const emit = defineEmits(linkEmits)

const ns = useNamespace('link')

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>
