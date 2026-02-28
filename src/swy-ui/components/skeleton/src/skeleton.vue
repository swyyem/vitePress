/** File: skeleton.vue - Vue Component */

<template>
  <div v-if="loading">
    <div v-for="i in count" :key="i" :class="[ns.b(), ns.is('animated', animated)]">
      <div :class="[ns.e('item'), ns.e('first-line')]" />
      <div v-for="row in rows" :key="row" :class="[ns.e('item'), ns.e('paragraph')]" />
    </div>
  </div>
  <slot v-else />
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { useNamespace } from '@swy-ui/hooks'
import { skeletonProps } from './skeleton'

defineOptions({
  name: 'SwySkeleton',
})

defineProps(skeletonProps)

const ns = useNamespace('skeleton')
</script>
