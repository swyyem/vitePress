/** File: breadcrumb.vue - Vue Component */

<template>
  <div :class="ns.b()">
    <slot />
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { provide } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { breadcrumbProps } from './breadcrumb'

defineOptions({
  name: 'SwyBreadcrumb',
})

const props = defineProps(breadcrumbProps)

const ns = useNamespace('breadcrumb')

provide('breadcrumb', {
  separator: props.separator,
})
</script>
