/** File: descriptions.vue - Vue Component */

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
      <div :class="[ns.e('table'), ns.is('bordered', border)]" :style="tableStyle">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed, provide, reactive } from 'vue'
import { useNamespace } from '@swy-ui/hooks'
import { descriptionsProps } from './descriptions'

defineOptions({
  name: 'SwyDescriptions',
})

const props = defineProps(descriptionsProps)

const ns = useNamespace('descriptions')

// 注入上下文给 DescriptionsItem
const context = reactive({
  border: computed(() => props.border),
  direction: computed(() => props.direction),
})

provide('descriptionsContext', context)

const tableStyle = computed(() => {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${props.column}, 1fr)`,
    gap: props.border ? '0' : '16px',
    border: props.border ? '1px solid #ebeef5' : 'none',
  }
})
</script>
