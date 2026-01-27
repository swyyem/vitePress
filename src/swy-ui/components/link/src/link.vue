<template>
  <a
    :class="linkKls"
    :href="disabled || !href ? undefined : href"
    :target="disabled || !href ? undefined : target"
    @click="handleClick"
  >
    <swy-icon v-if="icon">
      <component :is="icon" />
    </swy-icon>
    <span v-if="$slots.default" :class="ns.e('inner')">
      <slot />
    </span>

    <slot v-if="$slots.icon" name="icon" />
  </a>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { SwyIcon } from '@swy-ui/components/icon'
import { useGlobalConfig } from '@swy-ui/components/config-provider'
import { useNamespace } from '@swy-ui/hooks'
import { isBoolean } from '@swy-ui/utils'
import { linkProps, linkEmits } from './link'

defineOptions({
  name: 'SwyLink',
})

const props = defineProps(linkProps)
const emit = defineEmits(linkEmits)

const globalConfig = useGlobalConfig('link')
const ns = useNamespace('link')

const linkKls = computed(() => [
  ns.b(),
  ns.m(props.type ?? globalConfig.value?.type ?? 'default'),
  ns.is('disabled', props.disabled),
  ns.is('underline', underline.value === 'always'),
  ns.is('hover-underline', underline.value === 'hover' && !props.disabled),
])

// Boolean compatibility
const underline = computed(() => {
  if (isBoolean(props.underline)) {
    return props.underline ? 'hover' : 'never'
  }
  return props.underline ?? globalConfig.value?.underline ?? 'hover'
})

const handleClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>
