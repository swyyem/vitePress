<template>
  <aside :class="ns.b()" :style="{ width }">
    <slot />
  </aside>
</template>

<script lang="ts" setup>
import { useNamespace } from '@swy-ui/hooks'
import { asideProps } from './aside'

defineOptions({
  name: 'SwyAside',
})

defineProps(asideProps)

const ns = useNamespace('aside')
</script>
