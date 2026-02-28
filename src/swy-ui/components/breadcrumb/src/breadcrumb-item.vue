/** File: breadcrumb-item.vue - Vue Component */

<template>
  <span :class="ns.b()">
    <span :class="ns.e('inner')" @click="handleClick">
      <slot />
    </span>
    <span :class="ns.e('separator')">{{ separator }}</span>
  </span>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { inject } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { breadcrumbItemProps } from './breadcrumb-item'

defineOptions({
  name: 'SwyBreadcrumbItem',
})

const props = defineProps(breadcrumbItemProps)

const ns = useNamespace('breadcrumb-item')

const breadcrumb = inject<any>('breadcrumb')
const separator = breadcrumb?.separator || '/'

const handleClick = () => {
  if (props.to) {
    console.log('Navigate to:', props.to)
    // 这里可以集成 Vue Router
  }
}
</script>
