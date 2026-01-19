<template>
  <footer :class="ns.b()" :style="{ height }">
    <slot />
  </footer>
</template>

<script lang="ts" setup>
import { useNamespace } from '@swy-ui/hooks'
import { footerProps } from './footer'

defineOptions({
  name: 'SwyFooter',
})

defineProps(footerProps)

const ns = useNamespace('footer')
</script>
