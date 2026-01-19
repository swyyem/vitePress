<template>
  <div :class="[ns.b(), ns.m(direction)]" role="separator">
    <div
      v-if="$slots.default && direction !== 'vertical'"
      :class="[ns.e('text'), ns.is(contentPosition)]"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@swy-ui/hooks'
import { dividerProps } from './divider'

defineOptions({
  name: 'SwyDivider',
})

defineProps(dividerProps)

const ns = useNamespace('divider')
</script>
