<template>
  <main :class="ns.b()">
    <slot />
  </main>
</template>

<script lang="ts" setup>
import { useNamespace } from '@swy-ui/hooks'

defineOptions({
  name: 'SwyMain',
})

const ns = useNamespace('main')
</script>
