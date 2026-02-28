/** File: header.vue - Vue Component */

<template>
  <header :class="ns.b()" :style="{ height }">
    <slot />
  </header>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { useNamespace } from '@swy-ui/hooks'
import { headerProps } from './header'

defineOptions({
  name: 'SwyHeader',
})

defineProps(headerProps)

const ns = useNamespace('header')
</script>
