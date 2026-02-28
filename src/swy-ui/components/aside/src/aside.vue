/** File: aside.vue - Vue Component */

<template>
  <aside :class="ns.b()" :style="{ width }">
    <slot />
  </aside>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { useNamespace } from '@swy-ui/hooks'
import { asideProps } from './aside'

defineOptions({
  name: 'SwyAside',
})

defineProps(asideProps)

const ns = useNamespace('aside')
</script>
