<template>
  <div :class="[ns.b(), ns.m(size)]">
    <div v-if="title || $slots.title || $slots.extra" :class="ns.e('header')">
      <div :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="$slots.extra" :class="ns.e('extra')">
        <slot name="extra" />
      </div>
    </div>
    <div :class="ns.e('body')">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useNamespace } from '@swy-ui/hooks'
import { descriptionsProps } from './descriptions'

defineOptions({
  name: 'SwyDescriptions',
})

defineProps(descriptionsProps)

const ns = useNamespace('descriptions')
</script>
