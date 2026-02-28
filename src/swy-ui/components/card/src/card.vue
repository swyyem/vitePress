/** File: card.vue - Vue Component */

<template>
  <div :class="[ns.b(), ns.is(`${shadow || globalConfig?.shadow || 'always'}-shadow`)]">
    <div v-if="$slots.header || header" :class="[ns.e('header'), headerClass]">
      <slot name="header">{{ header }}</slot>
    </div>
    <div :class="[ns.e('body'), bodyClass]" :style="bodyStyle">
      <slot />
    </div>
    <div v-if="$slots.footer || footer" :class="[ns.e('footer'), footerClass]">
      <slot name="footer">{{ footer }}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { useNamespace } from '@swy-ui/hooks'
import { useGlobalConfig } from '@swy-ui/components/config-provider'
import { cardProps } from './card'

const globalConfig = useGlobalConfig('card')

defineOptions({
  name: 'SwyCard',
})

defineProps(cardProps)

const ns = useNamespace('card')
</script>
