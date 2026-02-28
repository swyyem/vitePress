/** File: main.vue - Vue Component */

<template>
  <main :class="ns.b()">
    <slot />
  </main>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { useNamespace } from '@swy-ui/hooks'

defineOptions({
  name: 'SwyMain',
})

const ns = useNamespace('main')
</script>
