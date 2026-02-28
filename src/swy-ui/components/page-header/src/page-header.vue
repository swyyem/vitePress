/** File: page-header.vue - Vue Component */

<template>
  <div :class="pageHeaderKls">
    <div v-if="breadcrumb && breadcrumb.length" :class="ns.e('breadcrumb')">
      <span v-for="(item, index) in breadcrumb" :key="index">
        <span v-if="index > 0" :class="ns.e('breadcrumb-separator')">/</span>
        <span :class="ns.e('breadcrumb-item')">{{ item.title }}</span>
      </span>
    </div>

    <div :class="ns.e('header')">
      <div :class="ns.e('left')" @click="handleBack">
        <span :class="ns.e('back')">
          <span :class="ns.e('icon')">←</span>
          <span>{{ backText }}</span>
        </span>
        <span :class="ns.e('divider')"></span>
        <div :class="ns.e('title')">
          <slot name="title">{{ title }}</slot>
        </div>
      </div>

      <div v-if="$slots.extra" :class="ns.e('extra')">
        <slot name="extra" />
      </div>
    </div>

    <div v-if="$slots.content || content" :class="ns.e('content')">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
// ========== Dependencies Import ==========
import { computed } from 'vue'
import { useNamespace } from '@swy-ui/hooks/use-namespace/index'
import { pageHeaderEmits, pageHeaderProps } from './page-header'

defineOptions({
  name: 'SwyPageHeader',
})

defineProps(pageHeaderProps)
const emit = defineEmits(pageHeaderEmits)

const ns = useNamespace('page-header')

const pageHeaderKls = computed(() => [ns.b()])

const handleBack = () => {
  emit('back')
}
</script>
