/** File: button-group.vue - Vue Component */

<template>
  <div :class="[ns.b('group'), ns.bm('group', props.direction)]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { provide, reactive, toRef } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { buttonGroupProps } from './button-group'
import { buttonGroupContextKey } from './constants'

defineOptions({
  name: 'SwyButtonGroup',
})
const props = defineProps(buttonGroupProps)
provide(
  buttonGroupContextKey,
  reactive({
    size: toRef(props, 'size'),
    type: toRef(props, 'type'),
  })
)
const ns = useNamespace('button')
</script>
