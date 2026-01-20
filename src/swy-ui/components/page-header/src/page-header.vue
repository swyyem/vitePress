<template>
  <div :class="pageHeaderKls">
    <div :class="ns.e('left')" @click="handleBack">
      <el-icon v-if="icon" :class="ns.e('icon')">
        <component :is="icon" />
      </el-icon>
      <div :class="ns.e('back')">
        <slot name="back">{{ back }}</slot>
      </div>
      <el-divider direction="vertical" />
      <div :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div v-if="$slots.content || content" :class="ns.e('content')">
      <slot name="content">{{ content }}</slot>
    </div>
    <div v-if="$slots.extra" :class="ns.e('extra')">
      <slot name="extra" />
    </div>
  </div>
</template>

<script lang="ts" setup>
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
