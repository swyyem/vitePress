<template>
  <header :class="ns.b()" :style="{ height }">
    <slot />
  </header>
</template>

<script lang="ts" setup>
import { useNamespace } from '@swy-ui/hooks'
import { headerProps } from './header'

defineOptions({
  name: 'SwyHeader',
})

defineProps(headerProps)

const ns = useNamespace('header')
</script>
